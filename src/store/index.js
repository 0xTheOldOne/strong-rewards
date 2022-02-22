import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
const vuexPersistKey = "store";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: vuexPersistKey,
  storage: window.localStorage,
  reducer: (state) => ({
    screenOrientationToast: state.screenOrientationToast,
    walletTokens: state.walletTokens,
    networks: state.networks,
    nft: state.nft,
    projectionPeriodInMonths: state.projectionPeriodInMonths,
    projectionAutoCompound: state.projectionAutoCompound,
  }),
});

var display_etherum = true;
var display_polygon = false;
var display_sentinel = false;

export default new Vuex.Store({
  state: {
    i18n: {
      userLocale: "",
    },
    screenOrientationToast: false,
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
    walletTokens: 0.0,
    networks: {
      etherum: {
        name: "etherum",
        nodes: 1,
        maxNodesPerWallet: 100,
        rewards: 0.09143,
        monthlyFees: 14.95,
        display: true,
      },
      polygon: {
        name: "polygon",
        nodes: 0,
        maxNodesPerWallet: 100,
        rewards: 0.1,
        monthlyFees: 14.95,
        display: false,
      },
      sentinel: {
        name: "sentinel",
        nodes: 0,
        maxNodesPerWallet: 100,
        rewards: 0.1,
        monthlyFees: 14.95,
        display: false,
      },
    },
    nft: {
      bronze: 0,
      silver: 0,
      gold: 0,
      platinium: 0,
      display: false,
    },
    projectionPeriodInMonths: 1,
    projectionAutoCompound: false,
  },
  mutations: {
    resetLocalStorage(state) {
      console.debug("Reset localStorage...");

      // Delete localStorage state
      localStorage.removeItem(vuexPersistKey);

      // Default values
      state.walletTokens = 0;
      state.networks.etherum.display = display_etherum;
      state.networks.etherum.nodes = 0;
      state.networks.polygon.display = display_polygon;
      state.networks.polygon.nodes = 0;
      state.networks.sentinel.display = display_sentinel;
      state.networks.sentinel.nodes = 0;

      this.commit("initializeFromLocalStorage");

      console.debug("Reset localStorage... DONE");
    },
    initializeFromLocalStorage(state) {
      console.debug("Retrieving settings from localStorage...");

      if (localStorage.getItem(vuexPersistKey) != null && localStorage.getItem(vuexPersistKey) != undefined) {
        state = JSON.parse(localStorage.getItem(vuexPersistKey));
      } else {
        localStorage.setItem(vuexPersistKey, JSON.stringify(state));
      }

      console.debug("Retrieving settings from localStorage... DONE");
    },
    setScreenOrientationToast(state, payload) {
      console.debug(payload);
      state.screenOrientationToast = payload.seen;
    },
    setRefreshRate(state, payload) {
      console.debug(payload);
      state.coinGeckoRefreshRateInMs = payload.refreshRate;
    },
    setRequestPending(state, payload) {
      console.debug(payload);
      state.coinGeckoRequestPending = payload.requestPending;
    },
    setReachable(state, payload) {
      console.debug(payload);
      state.coinGeckoIsReachable = payload.reachable;
    },
    setPrice(state, payload) {
      console.debug(payload);
      state.price = payload.price;
    },
    setWalletTokens(state, payload) {
      console.debug(payload);
      state.walletTokens = payload.tokens;
    },
    setNodeCount(state, payload) {
      console.debug(payload);
      state.networks[payload.network].count = payload.count;
    },
    setNodeRewards(state, payload) {
      console.debug(payload);
      state.networks[payload.network].rewards = payload.rewards;
    },
    setNftCount(state, payload) {
      console.debug(payload);
      state.nft[payload.level] = payload.count;
    },
    setProjectionPeriodInMonths(state, payload) {
      console.debug(payload);
      state.projectionPeriodInMonths = payload.period;
    },
    setProjectionAutoCompound(state, payload) {
      console.debug(payload);
      state.projectionAutoCompound = payload.value;
    },
  },
  getters: {
    rewardsPerDay(state) {
      var rewards = [];

      rewards.push(state.networks.etherum.display ? state.networks.etherum.count * state.networks.etherum.rewards : 0);
      rewards.push(state.networks.polygon.display ? state.networks.polygon.count * state.networks.polygon.rewards : 0);
      rewards.push(state.networks.sentinel.display ? state.networks.sentinel.count * state.networks.sentinel.rewards : 0);

      return rewards.reduce((partialSum, toAdd) => partialSum + toAdd, 0).toFixed(4);
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
