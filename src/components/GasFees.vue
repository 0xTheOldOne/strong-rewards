<template>
  <div class="status">
    <div>
      <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
        <a href="https://etherscan.io/gasTracker" target="_blank" rel="noopener noreferrer">
          <b-badge :variant="gweiVariant" class="light">
            <span class="mr-1">⛽</span>
            <span class="gwei">{{ gwei }}</span> gwei
          </b-badge>
        </a>
      </b-overlay>
    </div>
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
          apikey: this.apiKey, // 100.000 calls per day on free version of API
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";
.status {
  display: inline-block;

  * {
    color: @text-color;
    text-decoration: none;
  }

  .gwei {
    font-family: "Source Code Pro", monospace;
  }
}
</style>
