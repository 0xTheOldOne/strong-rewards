<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <div class="container">
        <b-navbar-brand href="#">
          <b-icon icon="calculator" class="mr-2" />Strong Calculator
          <b-badge variant="success">{{ appVersion }}</b-badge>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- left nav-items -->
          <b-navbar-nav>
            <b-nav-item href="#">
              <router-link to="/">Home</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/about">About the app</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/author">About the author</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <!-- right nav-items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item size="sm">
              <Ping />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>

    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import { version } from "../package";
import "particles.js";
import Ping from "@/components/Ping.vue";

export default {
  name: "App",
  components: {
    Ping,
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
</style>
