<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-container fluid="md">
        <b-navbar-brand href="#">
          <span class="mr-1">🧮</span>
          <span class="mr-3">Strong Calculator</span>
          <b-badge class="mr-2 light" variant="success">
            <small>{{ appVersion }}</small>
          </b-badge>
          <br class="visible-xs" />
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
          <b-navbar-nav class="settings">
            <b-nav-item>
              <GasFees class="mr-2" />
              <TokenPrice class="mr-2" />
            </b-nav-item>
          </b-navbar-nav>

          <!-- right nav-items -->
          <b-navbar-nav class="settings ml-auto"></b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-navbar toggleable="md" type="dark" variant="primary" style="padding: 0 1rem; font-size: 90%">
      <b-container fluid="md">
        <b-collapse id="nav-collapse" is-nav>
          <!-- left nav-items -->
          <b-navbar-nav class="menu">
            <b-nav-item href="#">
              <router-link to="/">{{ $t("menu.home") }}</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/strongblock">{{ $t("menu.strongblock") }}</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/about">{{ $t("menu.about") }}</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/author">{{ $t("menu.author") }}</router-link>
            </b-nav-item>
            <b-nav-item size="sm">
              <LocaleSwitcher />
            </b-nav-item>
            <b-nav-item size="sm" class="visible-xs">
              <ResetSettings />
            </b-nav-item>
            <b-nav-item size="sm" class="visible-xs">
              <CoinGeckoUpdater />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container fluid="md">
      <b-row>
        <b-col>
          <small>
            <b-alert show dismissible variant="warning" class="mb-0 mt-4">
              {{ $t("translation.need_help") }} <a href="https://twitter.com/messages/compose?recipient_id=1214500509060673536" target="_blank" rel="noopener noreferrer"><b-icon icon="twitter" /> {{ $t("translation.send_message") }}</a>
            </b-alert>
          </small>
        </b-col>
      </b-row>
    </b-container>

    <router-view class="mt-4 mb-4" />

    <b-toast id="reset-toast" toaster="b-toaster-top-center" auto-hide-delay="5000" append-toast no-close-button solid>
      <template #toast-title>♻️ {{ $t("pages.home.reset_settings.toast_title") }}</template>
      {{ $t("pages.home.reset_settings.toast_text") }}
    </b-toast>
  </div>
</template>

<script>
// @ is an alias to /src
import { version } from "../package";
import "particles.js";
import { mapState } from "vuex";
import CoinGeckoUpdater from "@/components/CoinGeckoUpdater.vue";
import GasFees from "@/components/GasFees";
import TokenPrice from "@/components/TokenPrice";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import ResetSettings from "@/components/ResetSettings.vue";

export default {
  name: "App",
  components: {
    CoinGeckoUpdater,
    GasFees,
    TokenPrice,
    LocaleSwitcher,
    ResetSettings,
  },
  data() {
    return {
      appVersion: version,
    };
  },
  computed: {
    ...mapState({
      screenOrientationToast: (state) => state.screenOrientationToast,
    }),
  },
  created() {
    window.addEventListener("orientationchange", this.handleOrientationChange);
  },
  destroyed() {
    window.removeEventListener("orientationchange", this.handleOrientationChange);
  },
  mounted() {
    this.initParticles();
    this.handleOrientationChange();
  },
  methods: {
    initParticles() {
      window.particlesJS.load("particles", "particles.json", function () {
        console.log("callback - particles.js config loaded");
      });
    },
    handleOrientationChange() {
      const orientation = window.screen.orientation.type;
      if (orientation === "portrait-primary") {
        // portrait mode
        if (!this.screenOrientationToast) {
          this.$bvToast.toast("In order to get the most out of this app, you should rotate your phone to landscape mode otherwise you may not have a clear view of what is displayed on graphs. Enjoy ! 🙏", {
            title: "📱 Screen orientation",
            toaster: "b-toaster-top-center",
            autoHideDelay: 60000,
            appendToast: true,
            noCloseButton: false,
            solid: true,
            variant: "warning",
          });

          this.$store.commit({
            type: "setScreenOrientationToast",
            seen: true,
          });
        }
      } else if (orientation === "landscape-primary") {
        // landscape mode
      }
    },
  },
};
</script>

<style lang="less">
@import "./assets/style/site.less";

.settings {
  .nav-link {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
}

.menu {
  .nav-item {
    position: relative;

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

    img.logo {
      height: 1rem !important;
    }
  }
}
</style>
