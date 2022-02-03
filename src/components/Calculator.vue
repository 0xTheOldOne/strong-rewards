<template>
  <div class="mb-5">
    <div v-if="requestPending">
      <div class="text-center">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    </div>
    <div id="calculator" v-else>
      <div id="parameters">
        <div class="title">Settings</div>
        <b-card no-body>
          <b-tabs card>
            <b-tab active>
              <template #title><img src="strongblock.png" class="logo" />StrongBlock</template>
              <b-card-text>
                <b-row>
                  <b-col sm="12" xs="12">
                    <b-form-group :label="'$' + ticker.toUpperCase() + ' token price is :'" :description="'This value is fetched from CoinGecko, in ' + currencies[currency].val.toUpperCase() + ' (' + currencies[currency].symbol + ') every ' + refreshRateInMs / 1000 + ' seconds.'">
                      <b-form-input v-model.number="price" type="number" :placeholder="'$' + ticker.toUpperCase() + ' token price'" required></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-tab>
            <b-tab>
              <template #title><img src="etherum.png" class="logo" />Etherum</template>
              <b-card-text>
                <b-row>
                  <b-col sm="6" xs="12">
                    <b-form-group label="Rewards per node, per day :" :description="'This is a rough estimation of rewards based on an average of 6400 Etherum blocs completed per day. You earn 0.1 $' + ticker.toUpperCase() + ' per 7000 Etherum blocks completed.'">
                      <b-form-input v-model.number="nodeRewards" type="number" placeholder="Node rewards" required></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6" xs="12">
                    <b-form-group :label="'Node count : ' + nodeCount" :description="daysToCompound">
                      <b-form-input v-model.number="nodeCount" type="range" min="0" max="100" placeholder="Node count" required></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-tab>
            <!-- <b-tab title="Tab 2">
              <b-card-text>Tab contents 2</b-card-text>
            </b-tab> -->
          </b-tabs>
        </b-card>
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
        <b-card>
          <b-card-text>
            <div id="graph">
              <div class="text-center">
                <div class="spinner-border text-primary" role="status"></div>
              </div>
            </div>
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// https://github.com/miscavage/CoinGecko-API
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

import Highcharts from "../assets/scripts/highcharts";
import Rewards from "@/components/Rewards.vue";

let chartOptions = {
  chart: {
    renderTo: "graph",
    type: "area",
  },
  xAxis: {
    type: "datetime",
    labels: {
      formatter: function () {
        return Highcharts.dateFormat("%d/%m/%Y", this.value);
      },
    },
    title: {
      enabled: false,
    },
  },
  yAxis: {
    labels: {
      format: "{text} USD",
    },
    title: {
      enabled: false,
    },
  },
  series: [
    {
      data: [],
      name: "$STRONG",
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        xDateFormat: "%e %B %Y (%A)",
        pointFormat: "{series.name}: {point.y}",
        valueDecimals: 2,
        valueSuffix: " USD",
        shared: true,
      },
      color: "#1668b0",
    },
  ],
  title: "",
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
};

export default {
  name: "Calculator",
  components: {
    Rewards,
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
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  mounted() {
    this.polling();
    this.fetchChart();
    this.timer = setInterval(() => {
      this.polling();
    }, this.refreshRateInMs);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    daysToCompound: function () {
      if (this.nodeCount > 0) {
        return "The 10 $" + this.ticker.toUpperCase() + " tokens that you need to have in order to create another node will be earned in approximatly " + (10 / (this.nodeCount * this.nodeRewards)).toFixed(2) + " day(s).";
      } else {
        return "Without node you can't earn tokens...";
      }
    },
  },
  methods: {
    handleResize: function () {
      this.drawChart();
    },
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
      let response = await CoinGeckoClient.coins.fetchMarketChart(this.ticker, {
        days: "max",
        vs_currency: this.currencies[this.currency].val,
      });

      if (response.success) {
        this.chartData = response.data.prices;
        this.drawChart();
      }
    },
    drawChart: function () {
      chartOptions.series[0].data = this.chartData;
      var chart = new Highcharts.Chart(chartOptions);
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
