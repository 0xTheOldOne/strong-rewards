<template>
  <b-container fluid="md">
    <b-row class="mb-4">
      <b-col>
        <div class="title">🤔 What is StrongBlock ?</div>
        <b-card>
          <b-card-text>
            <div class="video-wrapper">
              <iframe class="video" src="https://www.youtube.com/embed/tjQpaHakzYA?autoplay=1"></iframe>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col>
        <div class="title">🔗 StrongBlock links</div>
        <b-card>
          <b-card-text>
            <div class="links">
              <ul class="icons">
                <li>
                  <a href="https://strongblock.com/" target="_blank" rel="noopener noreferrer"><img src="strongblock_circled.png" class="logo" />Official website</a>
                </li>
                <li>
                  <a href="https://strongblock.com/dont-fall-for-it.html" target="_blank" rel="noopener noreferrer"><img src="strongblock_circled.png" class="logo" />Official "Don't fall for it!" campain</a>
                </li>
                <li>
                  <a href="https://github.com/StrongBlock/StrongChain" target="_blank" rel="noopener noreferrer"><img src="strongblock_circled.png" class="logo" />StrongBlock Light Paper 2022 </a>
                </li>
                <li>
                  <a href="https://www.coingecko.com/en/coins/strong" target="_blank" rel="noopener noreferrer"><img src="coingecko.png" class="logo" />StrongBlock on CoinGecko</a>
                </li>
              </ul>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col>
        <div>
          <div class="title">📈 ${{ this.ticker.toUpperCase() }} chart against {{ this.currencies[this.currency].val.toUpperCase() }} ({{ this.currencies[this.currency].symbol }})</div>
          <CoinGeckoChart :ticker="ticker" :currency="currency" period="max" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from "vuex";
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
  border: none;
  background: white url("../../public/strongblock.png") no-repeat center center;
  border-radius: 0.25rem;

  @media (max-width: @screen-xs-max) {
    background-size: contain !important;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.25rem;
  }
}

.links {
  a {
    text-decoration: none;
    color: inherit;
    line-height: 1.5rem;
  }
}
</style>
