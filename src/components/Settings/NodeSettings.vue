<template>
  <div class="component">
    <b-tab v-if="network.display">
      <template #title>
        <small>
          <img :src="network.name + '.png'" class="logo" />
          <span class="hidden-xs">{{ network.name.charAt(0).toUpperCase() + network.name.slice(1) }}</span> ({{ network.nodes.length }})
        </small>
      </template>
      <b-card-text v-if="network.display">
        <div class="content">
          <b-row>
            <b-col sm="6" cols="12">
              <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
                <b-form-group>
                  <div v-if="network.name != 'polygon'">
                    <b-form-input v-model.number="network.rewards" type="number" placeholder="Node rewards" min="0" required @change="updateNodeRewards($event)"></b-form-input>
                  </div>
                  <div class="description" v-else>
                    <code>0.125</code>
                    on first day<br />
                    <code>0.124</code>
                    on second day, till 5<sup>th</sup> day<br />
                    then <code>f(x) = 0.125 - 0.0004x</code>
                  </div>

                  <template #label>
                    {{ $t("components.node_settings.input_rewards_title") }}
                  </template>
                  <template #description>
                    <p>
                      {{
                        $t("components.node_settings." + network.name + ".input_rewards_description", {
                          ticker: tickerLiteral.toUpperCase(),
                        })
                      }}
                    </p>
                    <div v-if="network.name == 'etherum'">
                      <p class="mt-1">
                        {{ $t("components.node_settings." + network.name + ".input_rewards_description_info") }}
                        <a href="https://etherscan.io/chart/blocks?output=csv" target="_blank" rel="noopener noreferrer"> {{ $t("components.node_settings." + network.name + ".input_rewards_description_link") }} </a>.
                      </p>
                    </div>
                    <div v-if="network.name == 'polygon'">
                      <p class="mt-1">
                        {{ $t("components.node_settings." + network.name + ".input_rewards_description_info") }}
                        <span v-b-modal.modal-decay-assumption-table>{{ $t("components.node_settings." + network.name + ".input_rewards_description_link") }} </span>.
                      </p>
                      <b-modal id="modal-decay-assumption-table" hide-footer centered title="Decay assumption">
                        <b-container fluid>
                          <b-row>
                            <b-col>
                              <b-img src="decay-assumption.png" fluid-grow alt="Fluid-grow image"></b-img>
                            </b-col>
                          </b-row>
                        </b-container>
                      </b-modal>
                    </div>
                  </template>
                </b-form-group>
              </b-overlay>
            </b-col>
            <b-col sm="6" cols="12">
              <b-form-group>
                <b-form-input v-bind:value="node_count" type="number" min="0" :max="network.maxNodesPerWallet" step="1" required @change="updateNodeCount($event)"></b-form-input>
                <template #label> {{ $t("components.node_settings.input_nodeCount_title") }} {{ network.nodes.length }} </template>
                <template #description v-if="network.nodes.length > 0 && walletTokens >= 10">
                  {{
                    $t("components.node_settings.input_nodeCount_description_countReached", {
                      ticker: tickerLiteral.toUpperCase(),
                      token: $tc("misc.token", Math.floor(walletTokens), { count: walletTokens }),
                    })
                  }}
                </template>
                <template #description v-else-if="network.nodes.length > 0 && walletTokens < 10">
                  {{
                    $t("components.node_settings.input_nodeCount_description", {
                      ticker: tickerLiteral.toUpperCase(),
                      count: daysToCompound,
                      days: $tc("misc.day", Math.floor(walletTokens), { count: walletTokens }),
                      wallet: walletTokens,
                      token: $tc("misc.token", Math.floor(walletTokens), { count: walletTokens }),
                    })
                  }}
                </template>
                <template #description v-else>
                  {{
                    $t("components.node_settings.input_nodeCount_description_zeroNode", {
                      ticker: tickerLiteral.toUpperCase(),
                    })
                  }}
                </template>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="false && network.nodes.length > 0">
            <b-col cols="12" class="node-list mt-3">
              <div v-for="node in network.nodes" :key="node.id" class="node">
                <b-row>
                  <b-col sm="1" cols="2" class="text-center">
                    <img :src="node.type + '.png'" :alt="network.type" class="logo" />
                  </b-col>
                  <b-col sm="10" cols="8">
                    <div class="flex-box">
                      <input v-model="node.creation_date" :id="node.id" @change="editDateById" type="date" :max="today" />
                      <div class="hidden-xs centered">
                        <div>{{ node.reward_per_day }} {{ tickerLiteral.toUpperCase() }}/day</div>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="1" cols="2" class="text-right">
                    <b-button variant="danger" @click="deleteById(node.id)">
                      <b-icon icon="trash"></b-icon>
                    </b-button>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-card-text>
      <b-card-text v-else>
        <b-row>
          <b-col>
            <ComingSoon />
          </b-col>
        </b-row>
      </b-card-text>
    </b-tab>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ComingSoon from "@/components/ComingSoon.vue";

export default {
  name: "NodeSettings",
  components: {
    ComingSoon,
  },
  props: {
    network: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  data() {
    return {
      selected_node: {},
      today: new Date().toISOString().split("T")[0],
    };
  },
  mounted() {},
  methods: {
    uuidv4() {
      // https://stackoverflow.com/a/2117523
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
    },
    updateNodeRewards(event) {
      this.$store.commit({
        type: "setNodeRewards",
        network: this.network.name,
        rewards: parseFloat(event),
      });
    },
    updateNodeCount(event) {
      var newVal = parseInt(event);
      var oldVal = this.node_count;

      if (newVal > oldVal) {
        this.$store.commit({
          type: "addNode",
          network: this.network.name,
          node: {
            id: this.uuidv4(),
            type: this.network.name,
            creation_date: this.today,
            reward_per_day: this.network.rewards,
          },
        });
      } else if (newVal < oldVal) {
        this.$store.commit({
          type: "removeNode",
          network: this.network.name,
        });
      }

      this.node_count = newVal;
    },
    deleteById(id) {
      this.$bvModal
        .msgBoxConfirm("Are you sure ?", {
          cancelVariant: "secondary",
          okVariant: "danger",
          hideHeaderClose: true,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.$store.commit({
              type: "removeNode",
              network: this.network.name,
              id: id,
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    editDateById(event) {
      this.$store.commit({
        type: "editNodeCreationDate",
        network: this.network.name,
        id: event.srcElement.id,
        value: event.srcElement.value,
      });
    },
  },
  computed: {
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      ticker: (state) => state.ticker,
      tickerLiteral: (state) => state.tickerLiteral,
      walletTokens: (state) => state.walletTokens,
    }),
    daysToCompound: function () {
      var result = -1;

      if (this.network.nodes.length > 0) {
        if (this.walletTokens >= 10) {
          result = 0; // 10 tokens already earned
        } else if (this.walletTokens > 0) {
          result = ((10 - this.walletTokens) / (this.network.nodes.length * this.network.rewards)).toFixed(2);
        } else {
          result = (10 / (this.network.nodes.length * this.network.rewards)).toFixed(2);
        }
      } else {
        return 0; // No node, can't earn
      }

      return result;
    },
  },
  watch: {
    "network.nodes": {
      handler(newVal) {
        this.node_count = newVal.length;
      },
      // force eager callback execution
      immediate: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../assets/style/variables.less";

.component {
  .card-header * {
    color: @text-color-secondary !important;
  }

  .content {
    .node-list {
      .node {
        * {
          font-size: 0.8rem;
        }

        > .row {
          @height: 2rem;
          @margin: 4px;
          margin: 0;
          margin-bottom: @margin;

          > *[class*="col-"] {
            padding: 0px @margin / 2;
          }

          input,
          button {
            width: 100%;

            &[type="date"] {
              line-height: @height;
            }
          }

          img {
            height: @height;
            width: auto;
          }

          .flex-box {
            display: flex;
            justify-content: space-between;

            .centered {
              min-width: 200px;
              height: @height;
              display: inline-flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }

    .description {
      border-left: 1.5px solid @border-color;
      padding-left: 0.5rem;
      margin-bottom: 0.5rem;
    }

    @media (max-width: @screen-xs-max) {
      .col-sm-6 {
        &:first-of-type {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
