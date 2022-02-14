<template>
  <div class="status">
    <div>
      <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
        <b-badge variant="info" class="light">
          <span class="mr-1">💵</span>
          <span class="price">1 ${{ ticker.toUpperCase() }} = {{ price }}</span> {{ currencies[currency].symbol }}
        </b-badge>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const axios = require("axios");

export default {
  name: "GasFees",
  computed: {
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      currencies: (state) => state.currencies,
      currency: (state) => state.currency,
      ticker: (state) => state.ticker,
      price: (state) => state.price,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.status {
  display: inline-block;

  .gwei {
    font-family: "Source Code Pro", monospace;
  }
}
</style>
