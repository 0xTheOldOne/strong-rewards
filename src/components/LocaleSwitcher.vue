<template>
  <div>
    <span class="locale-switcher" v-b-modal.modal-i18n>
      <b-img :src="'https://flagicons.lipis.dev/flags/4x3/' + $i18n.locale + '.svg'" class="logo" rounded v-if="$i18n.locale != 'en'" />
      <b-img :src="'https://flagicons.lipis.dev/flags/4x3/gb.svg'" class="logo" rounded v-else />
      {{ $t("components.localeswitcher.title") }}
    </span>

    <b-modal id="modal-i18n" hide-footer centered :title="$t('components.localeswitcher.title')">
      <b-container fluid>
        <b-row v-model="$i18n.locale" class="pt-4">
          <b-col sm="4" cols="6" v-for="locale in locales" :key="locale.code" @click="setLocale(locale.code)" class="mb-4">
            <b-card :img-src="'https://flagicons.lipis.dev/flags/4x3/' + locale.code + '.svg'" v-if="locale.code != 'en'">
              <div class="text-center">
                <b-icon icon="check-circle" variant="success" class="mr-1" v-if="locale.code == $i18n.locale" />
                {{ locale.name }}
              </div>
            </b-card>
            <b-card :img-src="'https://flagicons.lipis.dev/flags/4x3/gb.svg'" v-else>
              <div class="text-center">
                <b-icon icon="check-circle" variant="success" class="mr-1" v-if="locale.code == $i18n.locale" />
                {{ locale.name }}
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
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
      this.$bvModal.hide("modal-i18n");
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

  img.logo {
    margin: 0px !important;
    margin-right: 0.125rem !important;
  }
}
</style>
