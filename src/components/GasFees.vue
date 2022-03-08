<template>
  <div class="component">
    <b-form-group>
      <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
        <a href="https://etherscan.io/gasTracker" target="_blank" rel="noopener noreferrer">
          ⛽ {{ $t("components.gasfees.label") }} :
          <!-- <b-badge pill :class="gweiVariant"> -->
          <span class="value">{{ gwei }}</span> gwei
          <!-- </b-badge> -->
        </a>
      </b-overlay>
    </b-form-group>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
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
        this.gweiVariant = "red";
      } else if (this.gwei >= 80) {
        this.gweiVariant = "orange";
      } else if (this.gwei >= 50) {
        this.gweiVariant = "yellow";
      } else if (this.gwei < 50) {
        this.gweiVariant = "green";
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

.component {
  @padding: 0.75rem;
  display: inline-block;
  border: 1px solid fade(@text-color-secondary, 25%);
  padding: 0.5 * @padding @padding;
  border-radius: 2 * @padding;

  * {
    color: @text-color-secondary !important;
    text-decoration: none !important;
    font-weight: normal !important;
  }

  .badge {
    color: @text-color !important;

    &.red {
      background-color: #d32f2f;
    }
    &.orange {
      background-color: #fb8c00;
    }
    &.yellow {
      background-color: #fdd835;
    }
    &.green {
      background-color: #28a745;
    }

    * {
      color: @text-color !important;
    }
  }

  .value {
    font-family: "Source Code Pro", monospace;
    display: inline-block;
    min-width: 20px;
  }
}
</style>
