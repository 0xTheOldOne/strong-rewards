<template>
  <b-container fluid="md">
    <b-row class="mb-4">
      <b-col>
        <div>
          <div class="title">📈 ${{ this.tickerLiteral.toUpperCase() }} chart against {{ this.currencies[this.currency].val.toUpperCase() }} ({{ this.currencies[this.currency].symbol }})</div>
          <CoinGeckoChart :ticker="ticker" :currency="currency" period="max" />
        </div>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col sm="8" cols="12">
        <div class="title">🤔 What is StrongBlock ?</div>
        <b-card>
          <b-card-text>
            <div class="video-wrapper">
              <iframe class="video" src="https://www.youtube.com/embed/tjQpaHakzYA?autoplay=1"></iframe>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col sm="4" cols="12">
        <div class="title">🔗 StrongBlock links</div>
        <b-card>
          <b-card-text>
            <div class="links">
              <ul class="icons">
                <li>
                  <a href="https://strongblock.com/" target="_blank" rel="noopener noreferrer"><img src="strongblock_circled.png" class="logo" />Official website</a>
                </li>
                <li>
                  <a href="https://etherscan.io/token/0xDc0327D50E6C73db2F8117760592C8BBf1CDCF38" target="_blank" rel="noopener noreferrer"><img src="strongblock_circled.png" class="logo" />$STRNGR token is minted !</a>
                </li>
                <li>
                  <a href="https://strongblockio.medium.com/strongblock-nodes-as-a-service-upgrades-to-strngr-token-b33d72a3d15a" target="_blank" rel="noopener noreferrer"><img src="strongblock_circled.png" class="logo" />StrongBlock Nodes-as-a-Service upgrades to $STRNGR token</a>
                </li>
                <li>
                  <a href="https://strongblock.com/dont-fall-for-it.html" target="_blank" rel="noopener noreferrer"><img src="strongblock_circled.png" class="logo" />Official "Don't fall for it!" campain</a>
                </li>
                <li>
                  <a href="https://github.com/StrongBlock/StrongChain" target="_blank" rel="noopener noreferrer"><img src="strongblock_circled.png" class="logo" />StrongBlock Light Paper 2022 </a>
                </li>
                <li>
                  <a :href="'https://www.coingecko.com/en/coins/' + ticker" target="_blank" rel="noopener noreferrer"><img src="coingecko.png" class="logo" />${{ tickerLiteral.toUpperCase() }} on CoinGecko</a>
                </li>
              </ul>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col>
        <div class="title">📍 2022 Roadmap</div>
        <b-card>
          <b-card-text>
            <a href="https://github.com/StrongBlock/StrongChain" target="_blank" rel="noopener noreferrer">
              <b-img src="roadmap_2022.jpg" fluid />
            </a>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from "vuex";
import CoinGeckoChart from "@/components/CoinGecko/CoinGeckoChart.vue";

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
      tickerLiteral: (state) => state.tickerLiteral,
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
