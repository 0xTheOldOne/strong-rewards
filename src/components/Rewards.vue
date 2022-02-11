<template>
  <b-card no-body class="reward mb-3">
    <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
      <b-list-group flush>
        <b-list-group-item>
          <div class="period">{{ title.charAt(0).toUpperCase() + title.slice(1) }} rewards</div>
        </b-list-group-item>
        <b-list-group-item>
          <b-icon icon="wallet" class="mr-2" /><span class="value mr-1">{{ earnedOnPeriod }}</span> ${{ ticker.toUpperCase() }}
        </b-list-group-item>
        <b-list-group-item>
          <b-icon icon="cash" class="mr-2" /><span class="value mr-1">{{ asFiat(earnedOnPeriod) }}</span
          >{{ currencies[currency].symbol }}
        </b-list-group-item>
      </b-list-group>
    </b-overlay>
  </b-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Rewards",
  props: {
    days: Number,
  },
  methods: {
    asFiat: function (tokens) {
      return (tokens * this.price).toFixed(2);
    },
  },
  computed: {
    title: function () {
      if (this.days == 1) {
        return "daily";
      } else if (this.days == 7) {
        return "weekly";
      } else if (this.days == 30) {
        return "monthly";
      } else if (this.days == 365) {
        return "annually";
      } else {
        return "unknown day count !";
      }
    },
    earnedOnPeriod: function () {
      var total = 0;

      total += this.networks["etherum"].display ? this.networks["etherum"].nodes * this.networks["etherum"].rewards : 0;
      total += this.networks["polygon"].display ? this.networks["polygon"].nodes * this.networks["polygon"].rewards : 0;
      total += this.networks["sentinel"].display ? this.networks["sentinel"].nodes * this.networks["sentinel"].rewards : 0;

      return (total * this.days).toFixed(4);

      // return (this.days * this.networks.etherum.rewards * this.networks.etherum.count).toFixed(4);
    },
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      currencies: (state) => state.currencies,
      currency: (state) => state.currency,
      ticker: (state) => state.ticker,
      price: (state) => state.price,
      networks: (state) => state.networks,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";

.card {
  font-size: 0.9rem;

  .period {
    font-size: 1rem;
  }

  .value {
    font-family: "Source Code Pro", monospace;
  }
}
</style>
