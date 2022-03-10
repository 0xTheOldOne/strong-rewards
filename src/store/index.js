import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
const vuexPersistKey = "store";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: vuexPersistKey,
  storage: window.localStorage,
  reducer: (state) => ({
    userLocale: state.userLocale,
    screenOrientationToast: state.screenOrientationToast,
    traductionToast: state.traductionToast,
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
    userLocale: "",
    screenOrientationToast: false,
    traductionToast: false,
    coinGeckoRefreshRateInMs: 5 * 60 * 1000,
    coinGeckoIsReachable: false,
    coinGeckoRequestPending: false,
    etherScanApiKey: "HKXG2563Y9ZKCUZ6Y398JE8K8WHFEN1QQ3",
    currency: "usd",
    currencies: {
      usd: { id: 1, val: "usd", symbol: "$" },
      eur: { id: 2, val: "eur", symbol: "€" },
    },
    ticker: "strong",
    price: 0,
    walletTokens: 0,
    networks: {
      etherum: {
        name: "etherum",
        nodes: 0,
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
      state.userLocale = "";
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
    setUserLocale(state, payload) {
      console.debug(payload);
      state.userLocale = payload.locale;
    },
    setScreenOrientationToast(state, payload) {
      console.debug(payload);
      state.screenOrientationToast = payload.seen;
    },
    setTraductionToast(state, payload) {
      console.debug(payload);
      state.traductionToast = payload.dismissed;
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
      state.price = parseFloat(payload.price);
    },
    setWalletTokens(state, payload) {
      console.debug(payload);
      state.walletTokens = parseFloat(payload.tokens);
    },
    setNodeCount(state, payload) {
      console.debug(payload);
      state.networks[payload.network].count = payload.count;
    },
    setNodeRewards(state, payload) {
      console.debug(payload);
      state.networks[payload.network].rewards = parseFloat(payload.rewards);
    },
    setNftCount(state, payload) {
      console.debug(payload);
      state.nft[payload.level] = parseInt(payload.count);
    },
    setProjectionPeriodInMonths(state, payload) {
      console.debug(payload);
      state.projectionPeriodInMonths = parseInt(payload.period);
    },
    setProjectionAutoCompound(state, payload) {
      console.debug(payload);
      state.projectionAutoCompound = payload.value;
    },
  },
  getters: {
    rewardsPerDay(state) {
      var perDay = 0;

      if (state.networks.etherum.display && state.networks.etherum.nodes > 0) {
        perDay += state.networks.etherum.nodes * state.networks.etherum.rewards;
      }

      if (state.networks.polygon.display && state.networks.polygon.nodes > 0) {
        perDay += state.networks.polygon.nodes * state.networks.polygon.rewards;
      }

      if (state.networks.sentinel.display && state.networks.sentinel.nodes > 0) {
        perDay += state.networks.sentinel.nodes * state.networks.sentinel.rewards;
      }

      return perDay.toFixed(4);
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
