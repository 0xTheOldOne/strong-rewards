<template>
  <div>
      <div class="status">
        <b-badge variant="info">Gas price : {{ Gwei }} </b-badge>

      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const axios = require('axios');

export default {
  name: "GasFees",
  data() {
    return {
      gasFees: 0,
      timer: null,
      timerTicks: 0,
      timerTicksRateInMs: 100,
    };
  },
  mounted: function () {
    this.fetchFeesFromEtherScan();

    this.timer = setInterval(() => {
      this.timerTicks++;

      if (this.timerTicks * this.timerTicksRateInMs >= this.refreshRateInMs) {
        this.timerTicks = 0;
        this.fetchFeesFromEtherScan();
      }
    }, this.timerTicksRateInMs);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    fetchFeesFromEtherScan: async function () {
      let response = await axios.get(
          this.apiUrl,
          { params: {
              module: "gastracker",
              action: "gasoracle",
              apikey: this.apiKey,
            }}
      );
      if (response.status === 200) {
        this.$store.commit({
          type: "setGweiFees",
          Gwei: response.data.result.SafeGasPrice,
        });
      }
    },
  },
  computed: {
    ...mapState({
      reachable: (state) => state.etherScanIsReachable,
      refreshRateInMs: (state) => state.etherScanRefreshRateInMs,
      apiUrl: (state) => state.etherScanApi,
      apiKey: (state) => state.etherScanApiKey,
      Gwei: (state) => state.Gwei,
    }),
  },

}
</script>

<style scoped>
status {
  display: inline-block;
  text-align: right;
  font-size: 0.8rem;
}
</style>