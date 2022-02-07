<template>
  <div class="mb-5">
    <div id="calculator">
      <div id="parameters">
        <div class="title">Settings</div>
        <b-card no-body>
          <b-tabs card>
            <b-tab active>
              <template #title><img src="strongblock.png" class="logo" />StrongBlock</template>
              <b-card-text>
                <b-row>
                  <b-col sm="12" xs="12">
                    <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
                      <b-form-group :label="'$' + ticker.toUpperCase() + ' token price is :'">
                        <b-form-input v-model.number="price" type="number" :placeholder="'$' + ticker.toUpperCase() + ' token price'" required></b-form-input>
                        <template #description> This value is fetched from CoinGecko, in {{ currencies[currency].val.toUpperCase() }} ({{ currencies[currency].symbol }}) every {{ refreshPeriod }}. </template>
                      </b-form-group>
                    </b-overlay>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-tab>
            <NodeSettings :network="networks.etherum" />
            <NodeSettings :network="networks.polygon" />
            <NodeSettings :network="networks.sentinel" />
          </b-tabs>
        </b-card>
      </div>

      <div id="tokenRewards">
        <div class="title">Periodical rewards</div>
        <div class="rewards">
          <Rewards :days="1" />
          <Rewards :days="7" />
          <Rewards :days="30" />
          <Rewards :days="365" />
        </div>
      </div>

      <div id="tokenChart">
        <div class="title">${{ this.ticker.toUpperCase() }} chart against {{ this.currencies[this.currency].val.toUpperCase() }} ({{ this.currencies[this.currency].symbol }})</div>
        <CoinGeckoChart :ticker="ticker" :currency="currency" period="max" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Rewards from "./Rewards.vue";
import NodeSettings from "./NodeSettings.vue";
import CoinGeckoChart from "./CoinGeckoChart.vue";

export default {
  name: "Calculator",
  components: {
    Rewards,
    NodeSettings,
    CoinGeckoChart,
  },
  computed: {
    refreshPeriod() {
      var period = this.refreshRateInMs / 1000;
      var unit = "second";

      if (period > 60) {
        unit = "minute";
        period = period / 60;
      }

      return period + " " + unit + (period > 1 ? "s" : "");
    },
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      refreshRateInMs: (state) => state.coinGeckoRefreshRateInMs,
      currencies: (state) => state.currencies,
      currency: (state) => state.currency,
      ticker: (state) => state.ticker,
      price: (state) => state.price,
      networks: (state) => state.networks,
    }),
  },
  methods: {
    asFiat: function (tokens) {
      return (tokens * this.price).toFixed(2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";

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
</style>
