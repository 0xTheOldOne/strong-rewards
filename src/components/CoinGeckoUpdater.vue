<template>
  <div>
    <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
      <div class="status">
        <b-badge variant="success" v-if="reachable">{{ target }} is online</b-badge>
        <b-badge variant="danger" v-else>{{ target }} is offline</b-badge>
        <div>
          Next refresh in
          <div class="refresh">{{ ((refreshRateInMs - timerTicks * timerTicksRateInMs) / 1000).toFixed(2) }}</div>
          seconds
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";
const CoinGecko = require("coingecko-api"); // https://github.com/miscavage/CoinGecko-API
const CoinGeckoClient = new CoinGecko();

export default {
  name: "CoinGeckoUpdater",
  data() {
    return {
      target: "Coin Gecko API",
      timer: null,
      timerTicks: 0,
      timerTicksRateInMs: 100,
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
          price: response.data.strong[this.currency],
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
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.status {
  display: inline-block;
  text-align: right;
  font-size: 0.8rem;

  .refresh {
    font-family: "Source Code Pro", monospace;
    min-width: 40px;
    display: inline-block;
  }
}
</style>
