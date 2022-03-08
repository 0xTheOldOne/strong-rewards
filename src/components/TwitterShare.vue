<template>
  <div class="component">
    <a class="twitter-share-button" :href="'https://twitter.com/intent/tweet?url=' + encodedUrl + '&text=' + encodedText + ''">
      <b-badge pill variant="success" class="light-version hidden-xs"> <b-icon icon="twitter" /> {{ $t("components.share.button") }} </b-badge>
    </a>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "TwitterShare",
  methods: {
    asFiat: function (tokens, days) {
      return (tokens * this.price * days).toFixed(2);
    },
  },
  computed: {
    encodedText() {
      return encodeURI(
        this.$t("components.share.text", {
          ticker: this.ticker.toUpperCase(),
          price: this.price,
          nodeCount: this.nodeCount,
          nodeWord: this.$tc("misc.node", this.nodeCount),
          strongDaily: this.earnedOnPeriod,
          fiatDaily: this.asFiat(this.earnedOnPeriod, 1),
          fiatYearly: this.asFiat(this.earnedOnPeriod, 365),
        })
      );
    },
    nodeCount() {
      return this.networks.etherum.nodes + this.networks.polygon.nodes + this.networks.sentinel.nodes;
    },
    earnedOnPeriod() {
      return this.rewardsPerDay;
    },
    encodedUrl: () => encodeURI("https://strong-rewards.herokuapp.com/"),
    ...mapState({
      ticker: (state) => state.ticker,
      price: (state) => state.price,
      networks: (state) => state.networks,
    }),
    ...mapGetters({
      rewardsPerDay: "rewardsPerDay",
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";

.component {
  cursor: pointer;
  height: 100%;
  display: inline-flex;
  align-items: center;

  * {
    font-weight: normal;
  }
}
</style>
