<template>
  <div>
      <div class="status">
        <b-badge variant="info">Gas price : {{ Gwei }} {{ gasEmoji }}</b-badge>

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
      gasEmoji: '😀',
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
    evalGasFees: function () {
      const fees = this.Gwei
      switch (true) {
        case (fees < 50):
          this.gasEmoji = '🤩';
          break;
        case (fees < 75):
          this.gasEmoji = '😀';
          break;
        case (fees < 100):
          this.gasEmoji = '🥶';
          break;
        case (fees > 100):
          this.gasEmoji = '🤯';
          break;
        default :
          this.gasEmoji = '😀';
          break;
      }
    },
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
        this.evalGasFees();
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