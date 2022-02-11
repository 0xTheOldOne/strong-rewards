<template>
  <b-tab>
    <template #title>
      <small>
        <img :src="network.name + '.png'" class="logo" />
        <span class="ticker">{{ network.name.charAt(0).toUpperCase() + network.name.slice(1) }} ({{ network.nodes }})</span>
      </small>
    </template>
    <b-card-text v-if="network.display">
      <b-row>
        <b-col sm="6" xs="12">
          <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
            <b-form-group label="Rewards per node, per day :" :description="'This is a rough estimation of rewards based on an average of 6400 Etherum blocs completed per day. You earn 0.1 $' + ticker.toUpperCase() + ' per 7000 Etherum blocks completed.'">
              <b-form-input v-model.number="network.rewards" type="number" placeholder="Node rewards" required @change="updateNodeRewards($event)"></b-form-input>
            </b-form-group>
          </b-overlay>
        </b-col>
        <b-col sm="6" xs="12">
          <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
            <b-form-group :label="'Node count : ' + network.nodes">
              <b-form-input v-model.number="network.nodes" type="range" min="0" :max="network.maxNodesPerWallet" placeholder="Node count" required @change="updateNodeCount($event)"></b-form-input>
              <template #description>
                {{ daysToCompound(ticker, network.rewards, network.nodes) }}
              </template>
            </b-form-group>
          </b-overlay>
        </b-col>
      </b-row>
    </b-card-text>
    <b-card-text v-else>
      <b-row>
        <b-col>
          <b-alert variant="warning" show>
            <b-icon icon="hourglass" animation="cylon-vertical" class="mr-1" />
            Coming soon...
          </b-alert>
        </b-col>
      </b-row>
    </b-card-text>
  </b-tab>
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
    updateNodeRewards(event) {
      this.$store.commit({
        type: "setNodeRewards",
        network: this.network.name,
        rewards: event,
      });
    },
    updateNodeCount(event) {
      this.$store.commit({
        type: "setNodeCount",
        network: this.network.name,
        count: event,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";
</style>
