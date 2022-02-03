<template>
  <div>
    <div v-if="requestPending">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div id="calculator" v-else>
      <div id="parameters">
        <div class="title">Calculator parameters</div>
        <b-row>
          <b-col sm="4" xs="12">
            <b-form-group :label="'$' + ticker.toUpperCase() + ' token price is :'" :description="'This value is fetched from CoinGecko, in ' + currencies[currency].val.toUpperCase() + ' (' + currencies[currency].symbol + ') every ' + refreshRateInMs / 1000 + ' seconds.'">
              <b-form-input v-model.number="price" type="number" :placeholder="'$' + ticker.toUpperCase() + ' token price'" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="4" xs="12">
            <b-form-group label="Rewards per node, per day :" :description="'This is a rough estimation of rewards based on an average of 6400 Etherum blocs completed per day. You earn 0.1 $' + ticker.toUpperCase() + ' per 7000 Etherum blocks completed.'">
              <b-form-input v-model.number="nodeRewards" type="number" placeholder="Node rewards" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="4" xs="12">
            <b-form-group label="Node count :" :description="daysToCompound">
              <b-form-input v-model.number="nodeCount" type="number" placeholder="Node count" required></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>

      <div id="tokenRewards">
        <div class="title">Periodical rewards</div>
        <div class="rewards">
          <Rewards title="daily" :days="1" :dayRewards="nodeRewards" :nodeCount="nodeCount" :priceAsFiat="price" :fiatSymbol="currencies[currency].symbol" :tokenSymbol="ticker" />
          <Rewards title="weekly" :days="7" :dayRewards="nodeRewards" :nodeCount="nodeCount" :priceAsFiat="price" :fiatSymbol="currencies[currency].symbol" :tokenSymbol="ticker" />
          <Rewards title="monthly" :days="30" :dayRewards="nodeRewards" :nodeCount="nodeCount" :priceAsFiat="price" :fiatSymbol="currencies[currency].symbol" :tokenSymbol="ticker" />
          <Rewards title="annually" :days="365" :dayRewards="nodeRewards" :nodeCount="nodeCount" :priceAsFiat="price" :fiatSymbol="currencies[currency].symbol" :tokenSymbol="ticker" />
        </div>
      </div>

      <div id="tokenChart">
        <div class="title">${{ this.ticker.toUpperCase() }} chart against {{ this.currencies[this.currency].val.toUpperCase() }} ({{ this.currencies[this.currency].symbol }})</div>
        <div v-if="requestPending">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
        <div v-if="chartData == null">
          <b-alert variant="danger">An error occured while retrieving ${{ this.ticker.toUpperCase() }} chart on CoinGecko...</b-alert>
        </div>
        <div v-else>
          {{ chartData }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// https://github.com/miscavage/CoinGecko-API
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

import Chart from "highcharts-vue";
import Rewards from "@/components/Rewards.vue";

export default {
  name: "Calculator",
  components: {
    Rewards,
    highcharts: Chart,
  },
  data() {
    return {
      timer: null,
      refreshRateInMs: 10000,
      error: false,
      requestPending: false,
      currency: "usd",
      currencies: {
        usd: { id: 1, val: "usd", symbol: "$" },
        // "eur": { id: 2, val: "eur", symbol: "€" },
      },
      ticker: "strong",
      price: 0.0,
      nodeRewards: 0.09143,
      nodeCount: 1,
      nftBronzeCount: null,
      nftSilverCount: null,
      nftGoldCount: null,
      nftPlatiniumCount: null,
      chartData: null,
    };
  },
  mounted: function () {
    this.polling();
    this.fetchChart();
    this.timer = setInterval(() => {
      this.polling();
    }, this.refreshRateInMs);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    daysToCompound: function () {
      if (this.nodeCount > 0) {
        return "In order to create another node, you need to earn 10 $" + this.ticker.toUpperCase() + " tokens and it will be done in approximatly " + (10 / (this.nodeCount * this.nodeRewards)).toFixed(2) + " day(s).";
      } else {
        return "Without node you can't earn tokens...";
      }
    },
  },
  methods: {
    asFiat: function (tokens) {
      return (tokens * this.price).toFixed(2);
    },
    polling: function () {
      this.requestPending = true;
      this.fetchPrice();
      this.requestPending = false;
    },
    fetchPrice: async function () {
      let response = await CoinGeckoClient.simple.price({
        ids: [this.ticker],
        vs_currencies: this.currencies,
      });

      if (response.success) {
        this.price = response.data.strong[this.currency];
      }
    },
    fetchChart: async function () {
      let response = await CoinGeckoClient.coins.fetchMarketChart(this.ticker);

      if (response.success) {
        this.chartData = response.data.prices;
      }
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
