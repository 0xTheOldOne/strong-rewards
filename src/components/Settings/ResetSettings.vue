<template>
  <div class="component" @click="resetLocalStorage">
    <b-badge pill variant="success" class="light-version">
      <b-icon icon="arrow-repeat" />
      <span class="hidden-xs">{{ $t("pages.home.reset_settings.button_text") }}</span>
    </b-badge>
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
@import "../../assets/style/variables.less";

.component {
  cursor: pointer;
  height: 100%;
  display: inline-flex;
  align-items: center;

  * {
    font-weight: normal;
  }
}
</style>
