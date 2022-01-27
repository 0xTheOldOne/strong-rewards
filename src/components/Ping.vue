<template>
  <div>
    Coin Gecko API :
    <div class="status">
      <div v-if="reachable"><b-icon icon="check-circle-fill" variant="success"></b-icon> Online</div>
      <div v-else><b-icon icon="exclamation-circle-fill" variant="danger"></b-icon> Offline</div>
    </div>
  </div>
</template>

<script>
// https://github.com/miscavage/CoinGecko-API
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

export default {
  name: "Ping",
  data() {
    return {
      timer: null,
      refreshRateInMs: 5000,
      reachable: true,
      requestPending: false,
    };
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.ping();
    }, this.refreshRateInMs);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    ping: async function () {
      this.requestPending = true;

      let response = await CoinGeckoClient.ping();
      this.reachable = !this.coinGeckoError && response.success == true && response.code == 200;

      this.requestPending = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.status {
  display: inline-block;
}
</style>
