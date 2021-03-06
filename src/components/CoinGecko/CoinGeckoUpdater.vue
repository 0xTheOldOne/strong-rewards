<template>
  <div :class="'component ' + variant">
    <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
      <div class="status">
        <div class="hidden-xs">
          <b-badge pill variant="success" class="light-version" v-if="reachable">{{ $t("components.coingeckoupdater.online") }}</b-badge>
          <b-badge pill variant="danger" class="light-version" v-else>{{ $t("components.coingeckoupdater.offline") }}</b-badge>
        </div>
        <div class="visible-xs">
          <span v-if="reachable">{{ $t("components.coingeckoupdater.online") }}</span>
          <span v-else>{{ $t("components.coingeckoupdater.offline") }}</span>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
const CoinGecko = require("coingecko-api"); // https://github.com/miscavage/CoinGecko-API
const CoinGeckoClient = new CoinGecko();

export default {
  name: "CoinGeckoUpdater",
  props: {
    variant: {
      type: String,
      default: "left",
    },
  },
  data() {
    return {
      timer: null,
      timerTicks: 0,
      timerTicksRateInMs: 1000, //100,
    };
  },
  mounted: function () {
    this.fetchPriceFromCoinGecko();

    this.timer = setInterval(() => {
      this.timerTicks++;

      if (this.timerTicks * this.timerTicksRateInMs >= this.refreshRateInMs) {
        this.timerTicks = 0;
        this.fetchPriceFromCoinGecko();
      }
    }, this.timerTicksRateInMs);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    fetchPriceFromCoinGecko: async function () {
      this.$store.commit({
        type: "setRequestPending",
        requestPending: true,
      });

      // Fetching ticker price on coingecko against desired currencies
      let response = await CoinGeckoClient.simple.price({
        ids: [this.ticker],
        vs_currencies: [this.currency],
      });

      this.$store.commit({
        type: "setReachable",
        reachable: response.success,
      });

      if (response.success) {
        this.$store.commit({
          type: "setPrice",
          price: response.data[this.ticker][this.currency],
        });
      }

      this.$store.commit({
        type: "setRequestPending",
        requestPending: false,
      });
    },
  },
  computed: {
    ...mapState({
      reachable: (state) => state.coinGeckoIsReachable,
      requestPending: (state) => state.coinGeckoRequestPending,
      refreshRateInMs: (state) => state.coinGeckoRefreshRateInMs,
      currencies: (state) => state.currencies,
      currency: (state) => state.currency,
      ticker: (state) => state.ticker,
      tickerLiteral: (state) => state.tickerLiteral,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../assets/style/variables.less";

.component {
  .status {
    * {
      font-weight: normal;
    }
  }

  &.right {
    text-align: right;

    .refresh-container {
      display: block;
      margin-top: 0.25rem;
    }
  }

  &.left {
    .status {
      display: inline-block;

      .badge {
        margin-right: 1rem;
        margin-bottom: 0.25rem;
      }
    }
  }
}
</style>
