<template>
  <b-container>
    <b-row>
      <b-col>
        <Calculator />
        <!-- <highcharts :options="chartOptions"></highcharts> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Calculator from "@/components/Calculator.vue";
import Chart from "highcharts-vue";

export default {
  name: "Home",
  components: {
    Calculator,
    highcharts: Chart,
  },
  data() {
    return {
      chartOptions: {
        series: [
          {
            data: [1, 2, 3], // sample data
            dataLabels: {
              enabled: false,
            },
          },
        ],
        title: null,
        subtitle: null,
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
      },
    };
  },
};
</script>
