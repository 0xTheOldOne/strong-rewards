<template>
  <div class="component">
    <div id="days-till-new-node-chart"></div>
    <div class="days">
      <small v-if="daysToCompound == 0 || walletTokens >= 10">
        {{
          $t("components.node_settings.input_nodeCount_description_countReached", {
            ticker: tickerLiteral.toUpperCase(),
            token: $tc("misc.token", Math.floor(walletTokens), { count: walletTokens }),
          })
        }}
      </small>
      <small v-else-if="daysToCompound > 0 && walletTokens < 10">
        {{
          $t("components.node_settings.input_nodeCount_description", {
            ticker: tickerLiteral.toUpperCase(),
            count: daysToCompound,
            days: $tc("misc.day", Math.floor(walletTokens), { count: walletTokens }),
            wallet: walletTokens,
            token: $tc("misc.token", Math.floor(walletTokens), { count: walletTokens }),
          })
        }}
      </small>
      <small v-else>
        {{
          $t("components.node_settings.input_nodeCount_description_zeroNode", {
            ticker: tickerLiteral.toUpperCase(),
          })
        }}
      </small>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Highcharts from "../../assets/scripts/highcharts";

let chartOptions = {
  chart: {
    height: 200,
    renderTo: "days-till-new-node-chart",
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false,
  },
  title: {
    text: "",
    align: "center",
    verticalAlign: "middle",
    y: 70,
    useHTML: false,
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: false,
      },
      startAngle: -90,
      endAngle: 90,
      center: ["50%", "105%"],
      size: "210%",
      borderColor: "transparent",
      colors: ["#1668b0", "#eceff1"],
    },
    series: {
      animation: false,
    },
  },
  series: [
    {
      type: "pie",
      innerSize: "70%",
      data: [],
    },
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 300,
        },
        chartOptions: {
          chart: {
            height: 200,
          },
          plotOptions: {
            pie: {
              center: ["50%", "105%"],
              size: "150%",
            },
          },
        },
      },
    ],
  },
};

export default {
  name: "DaysTillNewNode",
  data() {
    return {};
  },
  mounted() {
    this.drawChart();
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    drawChart: function () {
      console.debug("DaysTillNewNode - drawChart()...");

      try {
        var compoundMax = 10;
        var compound = this.walletTokens;
        var value = (compound * this.price).toFixed();
        var currencySymbol = this.currencies[this.currency].symbol;

        chartOptions.title.text = `${value} ${currencySymbol}<br />${compound} / ${compoundMax}`;
        chartOptions.series[0].data = [
          ["Earned", compound],
          ["To be earned", compoundMax - compound],
        ];
        new Highcharts.Chart(chartOptions);
      } catch (error) {
        console.error(error);
      }

      console.debug("DaysTillNewNode - drawChart()... DONE");
    },
    handleResize: function () {
      this.drawChart();
    },
  },
  computed: {
    ...mapState({
      ticker: (state) => state.ticker,
      tickerLiteral: (state) => state.tickerLiteral,
      price: (state) => state.price,
      currencies: (state) => state.currencies,
      currency: (state) => state.currency,
      walletTokens: (state) => state.walletTokens,
    }),
    ...mapGetters({
      rewardsPerDay: "rewardsPerDay",
    }),
    daysToCompound: function () {
      var result = 0;

      if (this.walletTokens >= 10) {
        result = 0; // 10 tokens already earned
      } else if (this.walletTokens > 0) {
        result = ((10 - this.walletTokens) / this.rewardsPerDay).toFixed(2);
      } else {
        result = (10 / this.rewardsPerDay).toFixed(2);
      }

      return result;
    },
  },
  watch: {
    price: function (newVal, oldVal) {
      this.drawChart();
    },
    walletTokens: function (newVal, oldVal) {
      this.drawChart();
    },
    rewardsPerDay: function (newVal, oldVal) {
      this.drawChart();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../assets/style/variables.less";

.component {
}
</style>
