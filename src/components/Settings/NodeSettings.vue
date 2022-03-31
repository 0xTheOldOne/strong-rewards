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
                  <b-form-input v-model.number="network.rewards" type="number" placeholder="Node rewards" min="0" required @change="updateNodeRewards($event)"></b-form-input>
                  <template #label>
                    {{ $t("components.node_settings.input_rewards_title") }}
                  </template>
                  <template #description>
                    <p>
                      {{
                        $t("components.node_settings." + network.name + ".input_rewards_description", {
                          ticker: ticker.toUpperCase(),
                        })
                      }}
                    </p>
                    <div v-if="network.name == 'etherum'">
                      <p class="mt-1">
                        {{ $t("components.node_settings." + network.name + ".input_rewards_description_etherscan") }}
                        <a href="https://etherscan.io/chart/blocks?output=csv" target="_blank" rel="noopener noreferrer"> {{ $t("components.node_settings." + network.name + ".input_rewards_description_etherscan_link") }}</a
                        >.
                      </p>
                    </div>
                  </template>
                </b-form-group>
              </b-overlay>
            </b-col>
            <b-col sm="6" cols="12">
              <b-form-group>
                <!-- <b-form-input v-model.number="network.nodes.length" type="range" min="0" :max="network.maxNodesPerWallet" step="1" required @change="updateNodeCount($event)" class="hidden-xs"></b-form-input> -->
                <!-- <b-form-input v-model.number="network.nodes.length" type="number" min="0" :max="network.maxNodesPerWallet" step="1" required @change="updateNodeCount($event)" class="visible-xs"></b-form-input> -->
                <b-form-input v-bind:value="node_count" type="number" min="0" :max="network.maxNodesPerWallet" step="1" required @change="updateNodeCount($event)"></b-form-input>
                <template #label> {{ $t("components.node_settings.input_nodeCount_title") }} {{ network.nodes.length }} </template>
                <template #description v-if="network.nodes.length > 0 && walletTokens >= 10">
                  {{
                    $t("components.node_settings.input_nodeCount_description_countReached", {
                      ticker: ticker.toUpperCase(),
                      token: $tc("misc.token", Math.floor(walletTokens), { count: walletTokens }),
                    })
                  }}
                </template>
                <template #description v-else-if="network.nodes.length > 0 && walletTokens < 10">
                  {{
                    $t("components.node_settings.input_nodeCount_description", {
                      ticker: ticker.toUpperCase(),
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
                      ticker: ticker.toUpperCase(),
                    })
                  }}
                </template>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="network.nodes.length > 0">
            <b-col cols="12" class="node-list mt-3">
              <div v-for="node in network.nodes" :key="node.index" class="node">
                <b-row>
                  <b-col sm="1" cols="2" class="text-center">
                    <img :src="node.type + '.png'" :alt="network.type" class="logo" />
                  </b-col>
                  <b-col sm="10" cols="8">
                    <input v-model="network.nodes[node.index].creation_date" :id="node.index" @change="editNodeByIndex" type="date" />
                  </b-col>
                  <b-col sm="1" cols="2" class="text-right">
                    <b-button variant="danger" @mouseenter="selectNodeByIndex(node.index)" @click="showDeleteModalByIndex(node.index)">
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
      node_count: 0,
      selected_node: {},
    };
  },
  mounted() {
    this.node_count = this.network.nodes.length;
  },
  methods: {
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
            index: oldVal,
            type: this.network.name,
            creation_date: new Date().toISOString().split("T")[0],
          },
        });
      } else if (newVal < oldVal) {
        this.$store.commit({
          type: "removeNode",
          network: this.network.name,
          index: this.node_count - 1,
        });
      }

      this.node_count = newVal;
    },
    selectNodeByIndex(index) {
      this.selected_node = this.network.nodes[index];
      this.selected_node.index = index;
    },
    showDeleteModalByIndex(index) {
      this.$bvModal
        .msgBoxConfirm("Are you sure ?", {
          cancelVariant: "secondary",
          okVariant: "success",
          hideHeaderClose: true,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.deleteNodeByIndex(this.selected_node.index);
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    deleteNodeByIndex(index) {
      this.$store.commit({
        type: "removeNode",
        network: this.network.name,
        index: index,
      });
    },
    editNodeByIndex(event) {
      this.$store.commit({
        type: "editNode",
        network: this.network.name,
        index: event.srcElement.id,
        value: event.srcElement.value,
      });
    },
  },
  computed: {
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      ticker: (state) => state.ticker,
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
    "network.nodes": function (newVal, oldVal) {
      console.warn(newVal);
      this.node_count = newVal.length;
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
        > .row {
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
              line-height: 2rem;
            }
          }

          img {
            height: 2rem;
            width: auto;
          }
        }
      }
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
