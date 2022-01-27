<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <div class="container">
        <b-navbar-brand href="#"
          >Strong Calculator
          <b-badge>{{ appVersion }}</b-badge>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- left nav-items -->
          <b-navbar-nav>
            <b-nav-item href="#">
              <router-link to="/">Calculator</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/about">About</router-link>
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
};
</script>

<style lang="less">
@import "./assets/style/site.less";
</style>
