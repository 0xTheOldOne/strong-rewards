<template>
  <div>
    <div id="days-till-new-node-chart"></div>
    <div class="days">
      <div v-if="daysToCompound == 0 || walletTokens >= 10">
        {{
          $t("components.node_settings.input_nodeCount_description_countReached", {
            ticker: ticker.toUpperCase(),
            token: $tc("misc.token", walletTokens),
          })
        }}
      </div>
      <div v-else-if="daysToCompound > 0 && walletTokens < 10">
        {{
          $t("components.node_settings.input_nodeCount_description", {
            ticker: ticker.toUpperCase(),
            count: daysToCompound,
            days: $tc("misc.day", walletTokens),
            wallet: walletTokens,
            token: $tc("misc.token", walletTokens),
          })
        }}
      </div>
      <div v-else>
        {{
          $t("components.node_settings.input_nodeCount_description_zeroNode", {
            ticker: ticker.toUpperCase(),
          })
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import Highcharts from "../assets/scripts/highcharts";

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
    y: 80,
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

        chartOptions.title.text = `<span class="title"><span class="earned">${compound}</span><span class="divide">/</span><span class="total">${compoundMax}</span></span>`;
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
@import "../assets/style/variables.less";
</style>
