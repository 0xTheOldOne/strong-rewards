<template>
  <div class="status">
    <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
      <b-badge :variant="gweiVariant" class="light"><span class="mr-1">⛽</span> {{ gwei }} gwei</b-badge>
    </b-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";
const axios = require("axios");

export default {
  name: "GasFees",
  data() {
    return {
      timer: null,
      timerTicksRateInMs: 30 * 1000,
      requestPending: false,
      gwei: 0,
      gweiVariant: "",
    };
  },
  mounted: function () {
    this.fetchFeesFromEtherScan();

    this.timer = setInterval(() => {
      this.fetchFeesFromEtherScan();
    }, this.timerTicksRateInMs);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    fetchFeesFromEtherScan: async function () {
      this.requestPending = true;

      let response = await axios.get("https://api.etherscan.io/api", {
        params: {
          module: "gastracker",
          action: "gasoracle",
          apikey: this.apiKey,
        },
      });

      if (response.status === 200) {
        this.gwei = response.data.result.SafeGasPrice;
      }

      if (this.gwei >= 100) {
        this.gweiVariant = "danger";
      } else if (this.gwei >= 80) {
        this.gweiVariant = "warning";
      } else if (this.gwei >= 50) {
        this.gweiVariant = "info";
      } else if (this.gwei < 50) {
        this.gweiVariant = "success";
      }

      this.requestPending = false;
    },
  },
  computed: {
    ...mapState({
      apiKey: (state) => state.etherScanApiKey,
    }),
  },
};
</script>

<style scoped>
.status {
  display: inline-block;
}
</style>
