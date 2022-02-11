<template>
  <b-tab>
    <template #title>
      <small>
        <img :src="network.name + '.png'" class="logo" />
        <span class="ticker hidden-xs">{{ network.name.charAt(0).toUpperCase() + network.name.slice(1) }} ({{ network.nodes }})</span>
      </small>
    </template>
    <b-card-text v-if="network.display">
      <b-row>
        <b-col>
          <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
            <div class="projection-options">
              <small>
                <b-form-checkbox :checked="projectionAutoCompound" @change="updateProjectionAutoCompound" size="sm" style="width: auto !important">Create new node at 10 ${{ ticker.toUpperCase() }}</b-form-checkbox>
              </small>
              <small>
                <b-form-select :value="projectionPeriod" :options="options" @change="updateProjectionPeriodInMonths" size="sm" style="width: auto !important"></b-form-select>
              </small>
            </div>
            <div :id="'graph-' + network.name">
              <div class="text-center">
                <div class="spinner-border text-primary" role="status"></div>
              </div>
            </div>
          </b-overlay>
        </b-col>
      </b-row>
    </b-card-text>
    <b-card-text v-else>
      <b-row>
        <b-col>
          <ComingSoon />
        </b-col>
      </b-row>
    </b-card-text>
  </b-tab>
</template>

<script>
import { mapState } from "vuex";
import Highcharts from "../assets/scripts/highcharts";
import ComingSoon from "@/components/ComingSoon.vue";

let chartOptions = {
  chart: {
    renderTo: "graph",
    type: "area",
  },
  xAxis: [
    {
      type: "datetime",
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%d/%m/%Y", this.value);
        },
        rotation: -45,
      },
      title: {
        enabled: false,
      },
    },
    {
      type: "linear",
      labels: {
        formatter: function () {
          return this.value + " day(s)";
        },
        rotation: -45,
      },
      title: {
        enabled: false,
      },
    },
  ],
  yAxis: [
    {
      min: 0,
      labels: {
        format: "{text} node(s)",
      },
      title: {
        text: "",
      },
    },
    {
      min: 0,
      labels: {
        format: "{text} $STRONG",
      },
      title: {
        text: "",
      },
    },
    {
      min: 0,
      labels: {
        format: "{text} USD",
      },
      title: {
        text: "",
      },
      opposite: true,
    },
  ],
  plotOptions: {
    line: {
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 2,
        states: {
          hover: {
            enabled: true,
          },
        },
      },
    },
    area: {
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 2,
        states: {
          hover: {
            enabled: true,
          },
        },
      },
    },
    series: {
      animation: false,
    },
  },
  series: [
    {
      type: "line",
      data: [],
      step: true,
      xAxis: 1,
      yAxis: 1,
      name: "Node count",
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        useHTML: true,
        headerFormat: "After {point.key} day(s)<br />",
        pointFormat: "{series.name}: {point.y}",
        valueDecimals: 0,
        valueSuffix: " node(s)",
        shared: true,
      },
      color: "#1668b0",
    },
    {
      type: "area",
      data: [],
      step: false,
      yAxis: 0,
      name: "Compound projections",
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        xDateFormat: "%e %B %Y (%A)",
        pointFormat: "{series.name}: {point.y}",
        valueDecimals: 2,
        valueSuffix: " STRONG",
        shared: true,
      },
      color: "#0F9D58",
    },
    {
      type: "area",
      data: [],
      step: true,
      yAxis: 1,
      name: "Fees projections",
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
      color: "#DB4437",
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
  name: "ProjectionChart",
  components: {
    ComingSoon,
  },
  props: {
    network: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      options: [
        { value: 1, text: "One month" },
        { value: 3, text: "Three months" },
        { value: 6, text: "Six months" },
        { value: 12, text: "One year" },
      ],
      selected: [],
    };
  },
  computed: {
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      price: (state) => state.price,
      ticker: (state) => state.ticker,
      projectionPeriod: (state) => state.projectionPeriodInMonths,
      projectionAutoCompound: (state) => state.projectionAutoCompound,
    }),
    startProjectionDate: function () {
      return new Date();
    },
    endProjectionDate: function () {
      var date = new Date();
      date.setMonth(this.startProjectionDate.getMonth() + this.projectionPeriod);
      return date;
    },
    daysBetweenDates: function () {
      return (this.endProjectionDate.getTime() - this.startProjectionDate.getTime()) / (1000 * 3600 * 24);
    },
    rewardAxisLabelText: function () {
      return "Rewards for " + this.network.nodes + " " + this.network.name + " nodes";
    },
    feesAxisLabelText: function () {
      return "Maintenance fees for " + this.network.nodes + " " + this.network.name + " nodes";
    },
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
      if (this.network.display) {
        console.debug(this.network.name + " - drawChart()...");

        try {
          chartOptions.chart.renderTo = "graph-" + this.network.name;
          this.computeChartData();
          new Highcharts.Chart(chartOptions);
        } catch (error) {
          console.error(error);
        }

        console.debug(this.network.name + " - drawChart()... DONE");
      }
    },
    handleResize: function () {
      this.drawChart();
    },
    updateProjectionPeriodInMonths(event) {
      this.$store.commit({
        type: "setProjectionPeriodInMonths",
        period: event,
      });
      this.drawChart();
    },
    updateProjectionAutoCompound(event) {
      this.selected = [event];
      this.$store.commit({
        type: "setProjectionAutoCompound",
        value: event,
      });
      this.drawChart();
    },
    computeChartData() {
      var data = [];
      var nodes = [];
      var previousValue = 0;
      var numberOfNodes = this.network.nodes;

      for (let i = 0; i < this.daysBetweenDates; i++) {
        if (this.projectionAutoCompound && previousValue >= 10 && numberOfNodes < this.network.maxNodesPerWallet) {
          previousValue -= 10;
          numberOfNodes += 1;
        }

        var nextPointDate = new Date(this.startProjectionDate.getFullYear(), this.startProjectionDate.getMonth(), this.startProjectionDate.getDate() + i);
        var value = parseFloat(this.network.rewards) * numberOfNodes;

        previousValue += value;

        data.push([Date.parse(nextPointDate), previousValue]);
        nodes.push([i, numberOfNodes]);
      }

      // Node count
      chartOptions.series[0].data = nodes;
      chartOptions.yAxis[0].visible = false;
      chartOptions.xAxis[1].visible = false;

      // Rewards
      chartOptions.series[1].data = data;
    },
    calculateFees() {
      var data = [];

      for (let i = 0; i < this.daysBetweenDates; i++) {
        var nextPointDate = new Date(this.startProjectionDate.getFullYear(), this.startProjectionDate.getMonth(), this.startProjectionDate.getDate() + i);
        var value = parseFloat(this.network.monthlyFees);

        data.push([Date.parse(nextPointDate), value]);
      }

      return data;
    },
  },
  watch: {
    "network.nodes": function (newVal, oldVal) {
      this.drawChart();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";
.projection-options {
  background-color: fade(white, 50%);
  padding: 0.25rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;

  * {
    font-size: 0.7rem !important;
  }

  small {
    display: inline-block;
    margin-left: 0.5rem;
  }

  .custom-checkbox {
    .custom-control-label {
      vertical-align: sub !important;

      &:before,
      &:after {
        top: 0.05rem !important;
      }
    }
  }
}
</style>
