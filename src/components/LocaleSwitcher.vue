<template>
  <div class="locale-switcher">
    <span class="mr-1 hidden-xs">🌐</span>
    <select v-model="$i18n.locale">
      <option :value="locale.code" v-for="locale in locales" :key="locale.code">{{ locale.name }}</option>
    </select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getSupportedLocales } from "../locales/helper";
import { getBrowserLocale } from "../locales/helper";

export default {
  name: "LocaleSwitcher",
  data() {
    return {
      locales: getSupportedLocales(),
      browserLocale: getBrowserLocale({ countryCodeOnly: true }),
    };
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
  mounted() {
    this.setLocale(this.browserLocale);
  },
  computed: {
    ...mapState({
      userLocale: (state) => state.i18n.userLocale,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";
.locale-switcher {
  display: inline-block;
}
</style>
