<template>
  <div class="component">
    <b-tab v-if="nft.display">
      <template #title>
        <small>
          <img src="strongblock.png" class="logo" />
          <span class="ticker hidden-xs">NFT</span>
        </small>
      </template>
      <b-card-text v-if="nft.display">
        <b-row class="content">
          <b-col sm="6" cols="12">
            <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
              <!-- <b-form-group label="Rewards per node, per day :">
              <b-form-input v-model.number="network.rewards" type="number" placeholder="Node rewards" min="0" required @change="updateNodeRewards($event)"></b-form-input>
              <template #description>
                <span v-html="rewardsPerNode"></span>
              </template>
            </b-form-group> -->
            </b-overlay>
          </b-col>
          <b-col sm="6" cols="12">
            <b-overlay :show="requestPending" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
              <!-- <b-form-group :label="'Node count : ' + network.nodes.length">
              <b-form-input v-model.number="network.nodes.length" type="range" min="0" :max="network.maxNodesPerWallet" placeholder="Node count" required @change="updateNodeCount($event)"></b-form-input>
              <template #description>
                {{ daysToCompound(ticker, network.rewards, network.nodes.length) }}
              </template>
            </b-form-group> -->
            </b-overlay>
          </b-col>
        </b-row>
      </b-card-text>
      <b-card-text v-else>
        <b-row>
          <b-col>
            <ComingSoon />
          </b-col>
        </b-row>
      </b-card-text>
    </b-tab>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ComingSoon from "@/components/ComingSoon.vue";

export default {
  name: "NftSettings",
  components: {
    ComingSoon,
  },
  props: {
    nft: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  computed: {
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      ticker: (state) => state.ticker,
      tickerLiteral: (state) => state.tickerLiteral,
    }),
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../assets/style/variables.less";

.component {
  .content {
    @media (max-width: @screen-xs-max) {
      .col-sm-6 {
        &:first-of-type {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
