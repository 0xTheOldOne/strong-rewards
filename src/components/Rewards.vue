<template>
  <b-card no-body class="reward">
    <b-list-group flush>
      <b-list-group-item>
        <div class="title">{{ title.charAt(0).toUpperCase() + title.slice(1) }} rewards</div>
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="wallet" class="mr-2" /> <span class="value">{{ earnedOnPeriod() }}</span> ${{ tokenSymbol.toUpperCase() }}
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="cash" class="mr-2" /> <span class="value">{{ asFiat(earnedOnPeriod()) }}</span> {{ fiatSymbol }}
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  name: "Rewards",
  props: {
    title: String,
    dayRewards: Number,
    days: Number,
    priceAsFiat: Number,
    fiatSymbol: String,
    tokenSymbol: String,
    nodeCount: Number,
  },
  methods: {
    earnedOnPeriod: function () {
      return (this.days * this.dayRewards * this.nodeCount).toFixed(4);
    },
    asFiat: function (tokens) {
      return (tokens * this.priceAsFiat).toFixed(2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";

.card {
  font-size: 0.9rem;
  .title {
    font-size: 1.1rem;
  }

  .value {
    font-family: "Source Code Pro", monospace;
    margin-right: 0.3em;
  }
}
</style>
