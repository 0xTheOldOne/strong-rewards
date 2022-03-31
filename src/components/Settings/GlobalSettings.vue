<template>
  <div class="component">
    <b-tab active>
      <template #title>
        <small>
          <img src="strongblock.png" class="logo" />
          <span class="hidden-xs">StrongBlock</span>
        </small>
      </template>
      <b-card-text>
        <b-row class="content">
          <b-col sm="6" cols="12">
            <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm" class="mb-5">
              <b-form-group class="mb-3">
                <b-form-input :value="price" type="number" @change="updatePrice" min="0" required number></b-form-input>
                <template #label>
                  {{
                    $t("pages.home.node_settings.input_price_title", {
                      token: ticker.toUpperCase(),
                    })
                  }}
                </template>
                <template #description>
                  {{
                    $t("pages.home.node_settings.input_price_description", {
                      currency: currencies[currency].val.toUpperCase(),
                      symbol: currencies[currency].symbol,
                      period: refreshPeriod,
                      unit: $tc(refreshUnit, refreshPeriod),
                    })
                  }}
                </template>
              </b-form-group>
              <b-form-group>
                <b-form-input :value="walletTokens" type="number" min="0" @change="updateWalletTokens"></b-form-input>
                <template #label>
                  {{
                    $t("pages.home.node_settings.input_walletTokens_title", {
                      token: ticker.toUpperCase(),
                    })
                  }}
                </template>
                <template #description>
                  {{ $t("pages.home.node_settings.input_walletTokens_description") }}
                </template>
              </b-form-group>
            </b-overlay>

            <div class="text-center">
              <GasFees />
            </div>
          </b-col>
          <b-col sm="6" cols="12">
            <DaysTillNewNode />
          </b-col>
        </b-row>
      </b-card-text>
    </b-tab>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import DaysTillNewNode from "@/components/Indicators/DaysTillNewNode.vue";
import GasFees from "@/components/Etherscan/GasFees.vue";
import ComingSoon from "@/components/ComingSoon.vue";

export default {
  name: "GlobalSettings",
  components: {
    ComingSoon,
    DaysTillNewNode,
    GasFees,
  },
  computed: {
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      refreshRateInMs: (state) => state.coinGeckoRefreshRateInMs,
      currencies: (state) => state.currencies,
      currency: (state) => state.currency,
      ticker: (state) => state.ticker,
      price: (state) => state.price,
      networks: (state) => state.networks,
      walletTokens: (state) => state.walletTokens,
    }),
    refreshPeriod() {
      var period = this.refreshRateInMs / 1000;
      if (period > 60) {
        period = period / 60;
      }
      return period;
    },
    refreshUnit() {
      var period = this.refreshRateInMs / 1000;
      var unit = "second";

      if (period > 60) {
        unit = "minute";
      }
      return "misc." + unit;
    },
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
  methods: {
    updatePrice: function (price) {
      this.$store.commit({
        type: "setPrice",
        price: price,
      });
    },
    updateWalletTokens: function (tokens) {
      this.$store.commit({
        type: "setWalletTokens",
        tokens: tokens,
      });
    },
    asFiat: function (tokens) {
      return (tokens * this.price).toFixed(2);
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
