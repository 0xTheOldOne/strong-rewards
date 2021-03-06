<template>
  <div class="component">
    <b-tab v-if="network.display">
      <template #title>
        <small>
          <img :src="network.name + '.png'" class="logo" />
          <span class="ticker">
            <span class="hidden-xs">{{ network.name.charAt(0).toUpperCase() + network.name.slice(1) }}</span> ({{ network.nodes.length }})
          </span>
        </small>
      </template>
      <b-card-text v-if="network.display">
        <b-row>
          <b-col>
            <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
              <div class="options">
                <b-form-checkbox :checked="projectionAutoCompound" @change="updateProjectionAutoCompound" size="sm" style="width: auto !important">
                  {{
                    $t("components.projection_chart.create_at_ten", {
                      token: tickerLiteral.toUpperCase(),
                    })
                  }}
                </b-form-checkbox>
                <b-form-select :value="projectionPeriod" :options="options" @change="updateProjectionPeriodInMonths" size="sm" style="width: auto !important" class="ml-3"></b-form-select>
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
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Highcharts from "../../assets/scripts/highcharts";
import ComingSoon from "@/components/ComingSoon.vue";

let chartOptions = {
  chart: {
    height: 300,
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
        format: "{text} $STRONG",
      },
      title: {
        text: "",
      },
    },
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
        valueSuffix: " token(s)",
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
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 768,
        },
        chartOptions: {
          chart: {
            height: 300,
            marginLeft: 38,
            marginRight: 0,
          },
          yAxis: [
            {
              min: 0,
              labels: {
                format: "{text}S",
              },
              title: {
                text: "",
              },
            },
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
                format: "{text} USD",
              },
              title: {
                text: "",
              },
              opposite: true,
            },
          ],
        },
      },
    ],
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
      required: true,
    },
  },
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    ...mapState({
      userLocale: (state) => state.userLocale,
      requestPending: (state) => state.coinGeckoRequestPending,
      price: (state) => state.price,
      ticker: (state) => state.ticker,
      tickerLiteral: (state) => state.tickerLiteral,
      walletTokens: (state) => state.walletTokens,
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
    options: function () {
      return [
        { value: 1, text: "1 " + this.$tc("misc.month", 1) },
        { value: 3, text: "3 " + this.$tc("misc.month", 3) },
        { value: 6, text: "6 " + this.$tc("misc.month", 6) },
        { value: 12, text: "1 " + this.$tc("misc.year", 1) },
      ];
    },
    node_count_name: function () {
      return this.$t("components.projection_chart.series.node_count.name");
    },
    node_count_tooltip_header_format: function () {
      return this.$t("components.projection_chart.series.node_count.tooltip.header_format");
    },
    node_count_tooltip_value_suffix: function () {
      return this.$t("components.projection_chart.series.node_count.tooltip.value_suffix");
    },
    compound_projection_name: function () {
      return this.$t("components.projection_chart.series.compound_projection.name");
    },
    fees_projection_name: function () {
      return this.$t("components.projection_chart.series.fees_projection.name");
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
          chartOptions.series[0].name = this.node_count_name;
          chartOptions.series[0].tooltip.headerFormat = this.node_count_tooltip_header_format;
          chartOptions.series[0].tooltip.valueSuffix = this.node_count_tooltip_value_suffix;
          chartOptions.series[1].name = this.compound_projection_name;
          chartOptions.series[1].tooltip.valueSuffix = " $" + this.tickerLiteral.toUpperCase();
          chartOptions.series[2].name = this.fees_projection_name;
          chartOptions.chart.renderTo = "graph-" + this.network.name;

          // TODO : dates

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
      var previousValue = parseFloat(this.walletTokens);
      var numberOfNodes = this.network.nodes.length;

      for (let i = 0; i <= this.daysBetweenDates; i++) {
        if (this.projectionAutoCompound && previousValue >= 10 && numberOfNodes < this.network.maxNodesPerWallet) {
          previousValue -= 10;
          numberOfNodes += 1;
        }

        var nextPointDate = new Date(this.startProjectionDate.getFullYear(), this.startProjectionDate.getMonth(), this.startProjectionDate.getDate() + i);
        var value = parseFloat(this.network.rewards) * numberOfNodes;

        // First point is current state
        if (i > 0) {
          previousValue += value;
        }

        nodes.push([i, numberOfNodes]);
        data.push([Date.parse(nextPointDate), previousValue]);
      }

      // Node count
      chartOptions.series[0].data = nodes;
      chartOptions.yAxis[1].visible = false;
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
    walletTokens: function (newVal, oldVal) {
      this.drawChart();
    },
    "network.nodes": function (newVal, oldVal) {
      this.drawChart();
    },
    userLocale: function (newVal, oldVal) {
      this.drawChart();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../assets/style/variables.less";

.component {
  .options {
    @scale: 0.8;
    @margin: (100 - @scale * 100) / 2;
    transform: scale(@scale);
    margin-right: ~"-@{margin}%";

    background-color: fade(white, 50%);
    padding: 0.25rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 2;

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
}
</style>
