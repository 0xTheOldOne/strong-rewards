import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
const vuexPersistKey = "store";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: vuexPersistKey,
  storage: window.localStorage,
  reducer: (state) => ({
    networks: state.networks,
    nft: state.nft,
  }),
});

export default new Vuex.Store({
  state: {
    coinGeckoRefreshRateInMs: 5 * 60 * 1000,
    coinGeckoIsReachable: false,
    coinGeckoRequestPending: false,
    etherScanApiKey: "GK5ISJEBJAIJR1Q97MB6HSVYWB1IJ9UR46",
    currency: "usd",
    currencies: {
      usd: { id: 1, val: "usd", symbol: "$" },
      eur: { id: 2, val: "eur", symbol: "€" },
    },
    ticker: "strong",
    price: 0.0,
    networks: {
      etherum: {
        name: "etherum",
        count: 1,
        rewards: 0.09143,
        display: true,
      },
      polygon: {
        name: "polygon",
        count: 0,
        rewards: 0.1,
        display: false,
      },
      sentinel: {
        name: "sentinel",
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
    initializeFromLocalStorage(state) {
      console.log("Retrieving settings from localStorage...");

      if (localStorage.getItem(vuexPersistKey) != null && localStorage.getItem(vuexPersistKey) != undefined) {
        state = JSON.parse(localStorage.getItem(vuexPersistKey));
      } else {
        localStorage.setItem(vuexPersistKey, JSON.stringify(state));
      }

      console.log("Retrieving settings from localStorage... DONE");
    },
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
      console.warn(payload);
      state.networks[payload.network].count = payload.count;
    },
    setNodeRewards(state, payload) {
      state.networks[payload.network].rewards = payload.rewards;
    },
    setNftCount(state, payload) {
      state.nft[payload.level] = payload.count;
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
