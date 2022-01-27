<template>
  <div class="reward">
    <h5>{{ periodOfRewards }} rewards</h5>
    <div class="token">{{ tokensEarnedOnPeriod }}&nbsp;${{ tokenSymbol.toUpperCase() }}</div>
    <div class="fiat">
      {{ asFiat(tokensEarnedOnPeriod) }}&nbsp;{{ fiatSymbol }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Rewards",
  props: {
    periodOfRewards: String,
    tokensEarnedOnPeriod: Number,
    tokenPriceAsFiat: Number,
    fiatSymbol: String,
    tokenSymbol: String
  },
  methods: {
    asFiat: function (tokens) {
      return (tokens * this.tokenPriceAsFiat).toFixed(2);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";

.rewards {
  margin-top: 1rem;

  .reward {
    border: 1px solid @border-color;
    background-color: @background-color;
    border-radius: 1rem;
    padding: 1rem;

    .token {
    }

    .fiat {
    }
  }
}
</style>
