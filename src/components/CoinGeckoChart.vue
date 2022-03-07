<template>
  <b-card>
    <b-card-text>
      <div id="graph-price">
        <div class="text-center">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import Highcharts from "../assets/scripts/highstock";
const CoinGecko = require("coingecko-api"); // https://github.com/miscavage/CoinGecko-API
const CoinGeckoClient = new CoinGecko();

let chartOptions = {
  chart: {
    renderTo: "graph-price",
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
  rangeSelector: {
    selected: 2,
    inputEnabled: false,
  },
  series: [
    {
      data: [],
      step: false,
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
  name: "CoinGeckoChart",
  props: {
    ticker: {
      type: String,
      default: () => "bitcoin",
      required: true,
    },
    currency: {
      type: String,
      default: () => "usd",
    },
    period: {
      type: String,
      default: () => "max",
    },
  },
  data() {
    return {
      chartData: null,
    };
  },
  mounted() {
    this.fetchChart();
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    fetchChart: async function () {
      let response = await CoinGeckoClient.coins.fetchMarketChart(this.ticker, {
        days: this.period,
        vs_currency: this.currency,
      });

      if (response.success) {
        this.chartData = response.data.prices;
        this.drawChart();
      }
    },
    drawChart: function () {
      chartOptions.series[0].data = this.chartData;
      new Highcharts.stockChart(chartOptions);
    },
    handleResize: function () {
      this.drawChart();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";
</style>
