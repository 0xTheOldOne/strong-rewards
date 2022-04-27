<template>
  <div class="component">
    <b-card no-body :border-variant="variant">
      <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
        <b-list-group flush>
          <b-list-group-item :variant="variant">
            <div class="period">{{ $t(title).charAt(0).toUpperCase() + $t(title).slice(1) }}</div>
          </b-list-group-item>
          <b-list-group-item :variant="variant">
            <span class="value mr-1">{{ earnedOnPeriod.toFixed(2) }}</span>
            <!-- <b-img src="strongblock_circled.png" class="logo m-0 float-right" /> -->
            <span class="">{{ tickerLiteral.toUpperCase() }}</span>
          </b-list-group-item>
          <b-list-group-item :variant="variant">
            <span class="value mr-1">{{ asFiat(earnedOnPeriod) }}</span>
            <span class="">{{ currencies[currency].symbol }}</span>
          </b-list-group-item>
          <b-list-group-item class="fees" :variant="variant">
            💸
            <span class="value mr-1">{{ -feesOnPeriod.toFixed(2) }}</span>
            <span class="">{{ currencies[currency].symbol }}</span>
          </b-list-group-item>
          <!-- <b-list-group-item :variant="variant">
            <span class="value mr-1">{{ totalOnPeriod.toFixed(2) }}</span>
            <span class="">{{ currencies[currency].symbol }}</span>
            <div class="text-center" v-if="totalOnPeriod <= 0">
              <small>⚠️<br />Maintenance fees are greater than earnings</small>
            </div>
          </b-list-group-item> -->
        </b-list-group>
      </b-overlay>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Rewards",
  props: {
    days: {
      type: Number,
      default: () => 1,
      required: true,
    },
  },
  methods: {
    asFiat: function (tokens) {
      return (tokens * this.price).toFixed(2);
    },
  },
  computed: {
    title: function () {
      var period = "unknown";
      if (this.days == 1) {
        period = "daily";
      } else if (this.days == 7) {
        period = "weekly";
      } else if (this.days == 30) {
        period = "monthly";
      } else if (this.days == 365) {
        period = "annually";
      }
      return "misc." + period;
    },
    earnedOnPeriod: function () {
      return this.rewardsPerDay * this.days;
    },
    feesOnPeriod: function () {
      return this.feesPerDay * this.days;
    },
    totalOnPeriod: function () {
      return this.asFiat(this.earnedOnPeriod) - this.feesOnPeriod;
    },
    variant: function () {
      return this.asFiat(this.earnedOnPeriod) <= this.feesOnPeriod ? "warning" : "default";
    },
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      currencies: (state) => state.currencies,
      currency: (state) => state.currency,
      ticker: (state) => state.ticker,
      tickerLiteral: (state) => state.tickerLiteral,
      price: (state) => state.price,
      networks: (state) => state.networks,
    }),
    ...mapGetters({
      rewardsPerDay: "rewardsPerDay",
      feesPerDay: "feesPerDay",
    }),
  },
  watch: {
    "network.nodes": function (newVal, oldVal) {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../assets/style/variables.less";

.component {
  .card {
    .list-group-item {
      padding: 0.75rem;
    }

    .period {
      font-size: 1rem;
    }

    .value {
      font-family: "Source Code Pro", monospace;
    }

    .fees {
      color: #d32f2f;
    }
  }
}
</style>
