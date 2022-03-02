<template>
  <div>TODO : days till new node</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DaysTillNewNode",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
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
</style>
