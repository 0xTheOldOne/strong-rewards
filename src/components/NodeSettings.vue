<template>
  <div v-if="network.display">
    <b-tab>
      <template #title><img :src="network.name + '.png'" class="logo" />{{ network.name }}</template>
      <b-card-text>
        <b-row>
          <b-col sm="6" xs="12">
            <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
              <b-form-group label="Rewards per node, per day :" :description="'This is a rough estimation of rewards based on an average of 6400 Etherum blocs completed per day. You earn 0.1 $' + ticker.toUpperCase() + ' per 7000 Etherum blocks completed.'">
                <b-form-input v-model.number="network.rewards" type="number" placeholder="Node rewards" required></b-form-input>
              </b-form-group>
            </b-overlay>
          </b-col>
          <b-col sm="6" xs="12">
            <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
              <b-form-group :label="'Node count : ' + network.count">
                <b-form-input v-model.number="network.count" type="range" min="0" max="100" placeholder="Node count" required></b-form-input>
                <template #description>
                  {{ daysToCompound(ticker, network.rewards, network.count) }}
                </template>
              </b-form-group>
            </b-overlay>
          </b-col>
        </b-row>
      </b-card-text>
    </b-tab>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NodeSettings",
  props: {
    network: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      ticker: (state) => state.ticker,
    }),
  },
  methods: {
    daysToCompound: function (ticker, rewards, count) {
      if (count > 0) {
        return "The 10 $" + ticker.toUpperCase() + " tokens that you need to have in order to create another node will be earned in approximatly " + (10 / (count * rewards)).toFixed(2) + " day(s).";
      } else {
        return "Without node you can't earn tokens...";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";
</style>
