<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-container fluid="md">
        <b-navbar-brand href="#">
          <span class="mr-1">🧮</span>
          <span class="mr-3">Strong Calculator</span>
          <small>
            <b-badge class="ml-2 mr-2 light" variant="success">{{ appVersion }}</b-badge>
            <br class="visible-xs" />
            <GasFees />
          </small>
        </b-navbar-brand>

        <!-- right nav-items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-toggle target="nav-collapse">
            <template #default="{ expanded }">
              <b-icon v-if="expanded" icon="chevron-up"></b-icon>
              <b-icon v-else icon="list"></b-icon>
            </template>
          </b-navbar-toggle>

          <b-nav-item size="sm" class="hidden-xs">
            <CoinGeckoUpdater variant="right" />
          </b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>

    <b-navbar toggleable="md" type="dark" variant="primary" style="padding: 0 1rem; font-size: 90%">
      <b-container fluid="md">
        <b-collapse id="nav-collapse" is-nav>
          <!-- left nav-items -->
          <b-navbar-nav class="menu">
            <b-nav-item href="#">
              <router-link to="/">Home</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/strongblock">What is StrongBlock ?</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/about">Concerning the app</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/author">About the author</router-link>
            </b-nav-item>
            <b-nav-item size="sm" class="visible-xs">
              <CoinGeckoUpdater />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <router-view class="mt-4 mb-4" />
  </div>
</template>

<script>
// @ is an alias to /src
import { version } from "../package";
import "particles.js";
import CoinGeckoUpdater from "@/components/CoinGeckoUpdater.vue";
import GasFees from "@/components/GasFees";

export default {
  name: "App",
  components: {
    CoinGeckoUpdater,
    GasFees,
  },
  data() {
    return {
      appVersion: version,
    };
  },
  mounted() {
    this.initParticles();
  },
  methods: {
    initParticles() {
      window.particlesJS.load("particles", "particles.json", function () {
        console.log("callback - particles.js config loaded");
      });
    },
  },
};
</script>

<style lang="less">
@import "./assets/style/site.less";
.menu {
  .nav-link {
    & > * {
      padding: 0;
      border-width: 0;
      font-size: 0.9rem;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
