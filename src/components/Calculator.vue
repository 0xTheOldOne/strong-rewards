<template>
  <div id="calculator">
    <div v-if="requestPending">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div v-else>
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
          <b-form-group label="Node count :">
            <b-form-input v-model.number="nodeCount" type="number" placeholder="Node count" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col><Rewards title="daily" :days="1" :dayRewards="nodeRewards" :nodeCount="nodeCount" :priceAsFiat="price" :fiatSymbol="currencies[currency].symbol" :tokenSymbol="ticker" /></b-col>
        <b-col><Rewards title="weekly" :days="7" :dayRewards="nodeRewards" :nodeCount="nodeCount" :priceAsFiat="price" :fiatSymbol="currencies[currency].symbol" :tokenSymbol="ticker" /></b-col>
        <b-col><Rewards title="monthly" :days="30" :dayRewards="nodeRewards" :nodeCount="nodeCount" :priceAsFiat="price" :fiatSymbol="currencies[currency].symbol" :tokenSymbol="ticker" /></b-col>
        <b-col><Rewards title="annually" :days="365" :dayRewards="nodeRewards" :nodeCount="nodeCount" :priceAsFiat="price" :fiatSymbol="currencies[currency].symbol" :tokenSymbol="ticker" /></b-col>
      </b-row>
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
    };
  },
  mounted: function () {
    this.polling();
    this.timer = setInterval(() => {
      this.polling();
    }, this.refreshRateInMs);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
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
  margin-top: 1rem;

  .reward {
    border: 1px solid @border-color;
    background-color: @background-color;
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;

    .token {
    }

    .fiat {
    }
  }
}
</style>
