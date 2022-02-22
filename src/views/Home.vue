<template>
  <b-container fluid="md">
    <b-row class="mb-4">
      <b-col>
        <div class="title">
          ⚙️ {{ $t("pages.home.node_settings.title") }}
          <div class="reset-settings">
            <b-badge @click="resetLocalStorage">
              <small>♻️ {{ $t("pages.home.reset_settings.button_text") }}</small>
            </b-badge>
          </div>
        </div>
        <b-card no-body>
          <b-tabs card>
            <b-tab active>
              <template #title>
                <small>
                  <img src="strongblock.png" class="logo" />
                  <span class="ticker hidden-xs">StrongBlock</span>
                </small>
              </template>
              <b-card-text>
                <b-row class="settings">
                  <b-col sm="6" xs="12">
                    <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
                      <b-form-group>
                        <b-form-input :value="price" type="number" :placeholder="'$' + ticker.toUpperCase() + ' token price'" @change="updatePrice" min="0" required></b-form-input>
                        <template #label>
                          {{
                            $t("pages.home.node_settings.input_price_title", {
                              token: ticker.toUpperCase(),
                            })
                          }}
                        </template>
                        <template #description>
                          ⏱️
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
                    </b-overlay>
                  </b-col>
                  <b-col sm="6" xs="12">
                    <b-form-group :label="'$' + ticker.toUpperCase() + ' token(s) that are already in your wallet :'">
                      <b-form-input :value="walletTokens" type="number" :placeholder="'$' + ticker.toUpperCase() + ' in your wallet'" min="0" @change="updateWalletTokens"></b-form-input>
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
                  </b-col>
                </b-row>
              </b-card-text>
            </b-tab>
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
        <div class="title">💸 {{ $t("pages.home.rewards.title") }}</div>
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
        <div class="title">🔄 {{ $t("pages.home.projection.title") }}</div>
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
import { mapState } from "vuex";
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
    resetLocalStorage() {
      this.$store.commit({
        type: "resetLocalStorage",
      });
      this.$bvToast.toast("Values were restored to defaults.", {
        title: "♻️ Settings restored",
        toaster: "b-toaster-top-center",
        autoHideDelay: 5000,
        appendToast: true,
        noCloseButton: true,
        solid: true,
      });
    },
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

.reset-settings {
  float: right;
  cursor: pointer;
}

.settings {
  @media (max-width: @screen-xs-max) {
    .col-sm-6 {
      &:first-of-type {
        margin-bottom: 1rem;
      }
    }
  }
}

.rewards {
  display: flex;
  justify-content: center;

  .reward {
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
