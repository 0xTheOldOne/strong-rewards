import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coinGeckoRefreshRateInMs: 10000,
    coinGeckoIsReachable: false,
    coinGeckoRequestPending: false,
    currency: "usd",
    currencies: {
      usd: { id: 1, val: "usd", symbol: "$" },
      eur: { id: 2, val: "eur", symbol: "€" },
    },
    ticker: "strong",
    price: 0.0,
    networks: {
      etherum: {
        name: "Etherum",
        count: 1,
        rewards: 0.09143,
        display: true,
      },
      polygon: {
        name: "Polygon",
        count: 0,
        rewards: 0.1,
        display: false,
      },
      sentinel: {
        name: "Sentinel",
        count: 0,
        rewards: 0.1,
        display: false,
      },
    },
    nft: {
      bronze: 0,
      silver: 0,
      gold: 0,
      platinium: 0,
    },
  },
  mutations: {
    setRefreshRate(state, payload) {
      state.coinGeckoRefreshRateInMs = payload.refreshRate;
    },
    setRequestPending(state, payload) {
      state.coinGeckoRequestPending = payload.requestPending;
    },
    setReachable(state, payload) {
      state.coinGeckoIsReachable = payload.reachable;
    },
    setPrice(state, payload) {
      state.price = payload.price;
    },
    setNodeCount(state, payload) {
      state.networks[payload.network].count = payload.count;
    },
    setNodeRewards(state, payload) {
      state.networks[payload.network].rewards = payload.rewards;
    },
  },
  actions: {},
  modules: {},
});
