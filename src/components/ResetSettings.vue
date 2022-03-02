<template>
  <div>
    <div class="reset-settings" @click="resetLocalStorage">
      <b-badge class="hidden-xs">♻️ {{ $t("pages.home.reset_settings.button_text") }}</b-badge>
      <span class="visible-xs">♻️ {{ $t("pages.home.reset_settings.button_text") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetSettings",
  methods: {
    resetLocalStorage() {
      this.$store.commit({
        type: "resetLocalStorage",
      });

      this.$bvToast.show("reset-toast");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";

.reset-settings {
  cursor: pointer;

  * {
    font-weight: normal;
  }
}
</style>
