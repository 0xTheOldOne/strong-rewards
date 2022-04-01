import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
const vuexPersistKey = "store";

Vue.use(Vuex);

var display_etherum = true;
var display_polygon = true;
var display_sentinel = false;

const vuexLocal = new VuexPersistence({
  key: vuexPersistKey,
  storage: window.localStorage,
  reducer: (state) => ({
    userLocale: state.userLocale,
    screenOrientationToast: state.screenOrientationToast,
    traductionToast: state.traductionToast,
    newNodeModelToast: state.newNodeModelToast,
    walletTokens: state.walletTokens,
    networks: state.networks,
    nft: state.nft,
    projectionPeriodInMonths: state.projectionPeriodInMonths,
    projectionAutoCompound: state.projectionAutoCompound,
  }),
});

export default new Vuex.Store({
  state: {
    appName: "Strong Calc",
    userLocale: "",
    screenOrientationToast: false,
    traductionToast: false,
    newNodeModelToast: false,
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
        nodes: [],
        maxNodesPerWallet: 100,
        rewards: 0.09143,
        monthlyFees: 14.95,
        display: true,
      },
      polygon: {
        name: "polygon",
        nodes: [],
        maxNodesPerWallet: 100,
        rewards: 0.125,
        monthlyFees: 14.95,
        display: false,
      },
      sentinel: {
        name: "sentinel",
        nodes: [],
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
      state.networks.etherum.rewards = 0.09143;
      state.networks.etherum.nodes = [];
      state.networks.polygon.display = display_polygon;
      state.networks.polygon.rewards = 0.125;
      state.networks.polygon.nodes = [];
      state.networks.sentinel.display = display_sentinel;
      state.networks.sentinel.rewards = 0.1;
      state.networks.sentinel.nodes = [];

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

      // If local storage used previous node storage version (i.e. node count instead of node array)
      if (!Array.isArray(state.networks.etherum.nodes)) {
        console.warn("Local storage need to be reset to default state because it's not correctly reflecting the current data model.");
        state.newNodeModelToast = true;

        this.commit("resetLocalStorage");
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
    setNewNodeModelToast(state, payload) {
      console.debug(payload);
      state.newNodeModelToast = payload.dismissed;
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
    addNode(state, payload) {
      console.debug(payload);
      state.networks[payload.network].nodes.push(payload.node);
    },
    removeNode(state, payload) {
      console.debug(payload);

      if (payload.id != null) {
        // https://stackoverflow.com/a/15287938
        console.debug("remove by index !");
        state.networks[payload.network].nodes = state.networks[payload.network].nodes.filter(function (node) {
          return node.id !== payload.id;
        });
      } else {
        console.debug("node pop !");
        state.networks[payload.network].nodes.pop();
      }
    },
    editNodeCreationDate(state, payload) {
      console.debug(payload);

      var index = state.networks[payload.network].nodes.findIndex((node) => node.id === payload.id);
      state.networks[payload.network].nodes[index].creation_date = payload.value;
    },
  },
  getters: {
    rewardsPerDay(state) {
      var perDay = 0;

      // Etherum
      if (state.networks.etherum.display && state.networks.etherum.nodes.length > 0) {
        perDay += state.networks.etherum.nodes.length * state.networks.etherum.rewards;
      }

      // Polygon
      if (state.networks.polygon.display && state.networks.polygon.nodes.length > 0) {
        perDay += state.networks.polygon.nodes.length * state.networks.polygon.rewards;
      }

      // Sentinel
      if (state.networks.sentinel.display && state.networks.sentinel.nodes.length > 0) {
        perDay += state.networks.sentinel.nodes.length * state.networks.sentinel.rewards;
      }

      return perDay.toFixed(4);
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
