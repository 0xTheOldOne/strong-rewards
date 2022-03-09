<template>
  <div class="component">
    <b-tab v-if="network.display">
      <template #title>
        <small>
          <img :src="network.name + '.png'" class="logo" />
          <span class="hidden-xs">{{ network.name.charAt(0).toUpperCase() + network.name.slice(1) }}</span> ({{ network.nodes }})
        </small>
      </template>
      <b-card-text v-if="network.display">
        <b-row class="content">
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
              <b-form-input v-model.number="network.nodes" type="range" min="0" :max="network.maxNodesPerWallet" step="1" required @change="updateNodeCount($event)" class="hidden-xs"></b-form-input>
              <b-form-input v-model.number="network.nodes" type="number" min="0" :max="network.maxNodesPerWallet" step="1" required @change="updateNodeCount($event)" class="visible-xs"></b-form-input>
              <template #label> {{ $t("components.node_settings.input_nodeCount_title") }} {{ network.count }} </template>
              <template #description v-if="network.nodes > 0 && walletTokens >= 10">
                {{
                  $t("components.node_settings.input_nodeCount_description_countReached", {
                    ticker: ticker.toUpperCase(),
                    token: $tc("misc.token", Math.floor(walletTokens), { count: walletTokens }),
                  })
                }}
              </template>
              <template #description v-else-if="network.nodes > 0 && walletTokens < 10">
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
  computed: {
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      ticker: (state) => state.ticker,
      walletTokens: (state) => state.walletTokens,
    }),
    daysToCompound: function () {
      var result = -1;

      if (this.network.nodes > 0) {
        if (this.walletTokens >= 10) {
          result = 0; // 10 tokens already earned
        } else if (this.walletTokens > 0) {
          result = ((10 - this.walletTokens) / (this.network.nodes * this.network.rewards)).toFixed(2);
        } else {
          result = (10 / (this.network.nodes * this.network.rewards)).toFixed(2);
        }
      } else {
        return 0; // No node, can't earn
      }

      return result;
    },
  },
  methods: {
    updateNodeRewards(event) {
      this.$store.commit({
        type: "setNodeRewards",
        network: this.network.name,
        rewards: event,
      });
    },
    updateNodeCount(event) {
      this.$store.commit({
        type: "setNodeCount",
        network: this.network.name,
        count: event,
      });
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
