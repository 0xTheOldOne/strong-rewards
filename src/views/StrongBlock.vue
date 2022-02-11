<template>
  <b-container fluid="md">
    <b-row>
      <b-col>
        <div class="title">🤔 What is StrongBlock ?</div>

        <div class="video-wrapper mb-4">
          <iframe class="video" src="https://www.youtube.com/embed/tjQpaHakzYA?autoplay=1"></iframe>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div>
          <div class="title">
            📈 ${{ this.ticker.toUpperCase() }} chart against {{ this.currencies[this.currency].val.toUpperCase() }} ({{ this.currencies[this.currency].symbol }})
            <div style="float: right">
              <small>
                <b-badge href="https://www.coingecko.com/en/coins/strong" class="light">See it on <img src="coingecko.png" class="logo" />CoinGecko</b-badge>
              </small>
            </div>
          </div>
          <CoinGeckoChart :ticker="ticker" :currency="currency" period="max" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import CoinGeckoChart from "@/components/CoinGeckoChart.vue";

export default {
  name: "StrongBlock",
  components: {
    CoinGeckoChart,
  },
  computed: {
    ...mapState({
      currencies: (state) => state.currencies,
      currency: (state) => state.currency,
      ticker: (state) => state.ticker,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9, for an aspect ratio of 1:1 change to this value to 100% */
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1.25rem solid #fff;
    border-radius: 0.25rem;
  }
}
</style>
