<template>
  <b-container fluid="md">
    <b-row class="mb-4">
      <b-col>
        <b-row>
          <b-col md="8" cols="12">
            <div class="title">⚙️ {{ $t("pages.home.node_settings.title") }}</div>
          </b-col>
          <b-col md="4" class="hidden-xs text-right">
            <ResetSettings />
          </b-col>
        </b-row>

        <b-card no-body>
          <b-tabs card>
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
            <NodeSettings :network="networks['etherum']" />
            <NodeSettings :network="networks['polygon']" />
            <NodeSettings :network="networks['sentinel']" />
            <!-- <NFTSettings :ntf="nft" /> -->
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col>
        <b-row>
          <b-col md="8" cols="12">
            <div class="title">💸 {{ $t("pages.home.rewards.title") }}</div>
          </b-col>
          <b-col md="4" class="hidden-xs text-right">
            <TwitterShare />
          </b-col>
        </b-row>
        <div class="rewards">
          <Rewards :days="1" />
          <Rewards :days="7" />
          <Rewards :days="30" />
          <Rewards :days="365" />
        </div>
      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col>
        <div class="title">📈 {{ $t("pages.home.projection.title") }}</div>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col>
        <b-card no-body>
          <b-tabs card>
            <ProjectionChart :network="networks['etherum']" />
            <ProjectionChart :network="networks['polygon']" />
            <ProjectionChart :network="networks['sentinel']" />
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from "vuex";
import ResetSettings from "@/components/ResetSettings.vue";
import DaysTillNewNode from "@/components/DaysTillNewNode.vue";
import GasFees from "@/components/GasFees.vue";
import TwitterShare from "@/components/TwitterShare.vue";
import Rewards from "@/components/Rewards.vue";
import NodeSettings from "@/components/NodeSettings.vue";
import NFTSettings from "@/components/NFTSettings.vue";
import ProjectionChart from "@/components/ProjectionChart.vue";

export default {
  name: "Home",
  components: {
    Rewards,
    NodeSettings,
    NFTSettings,
    ProjectionChart,
    ResetSettings,
    DaysTillNewNode,
    GasFees,
    TwitterShare,
  },
  computed: {
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
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      refreshRateInMs: (state) => state.coinGeckoRefreshRateInMs,
      currencies: (state) => state.currencies,
      currency: (state) => state.currency,
      ticker: (state) => state.ticker,
      price: (state) => state.price,
      walletTokens: (state) => state.walletTokens,
      networks: (state) => state.networks,
      nft: (state) => state.nft,
    }),
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
@import "../assets/style/variables.less";

.component {
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

.rewards {
  display: flex;
  justify-content: center;

  .component {
    flex: 1 1 150px;
    margin: 0 0.5rem;

    &:first-child {
      margin-left: 0px !important;
    }

    &:last-child {
      margin-right: 0px !important;
    }
  }

  @media (max-width: @screen-xs-max) {
    flex-flow: column;

    .reward {
      margin: 0;
      margin-bottom: 0.5rem;
    }
  }
}

.projection-options {
  float: right;
  display: flex;
  align-items: center;

  > * {
    margin-left: 0.5rem;
  }
}
</style>
