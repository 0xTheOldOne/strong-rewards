<template>
  <b-container fluid="md">
    <b-row class="mb-4">
      <b-col>
        <b-row>
          <b-col md="6" cols="12">
            <div class="title">⚙️ {{ $t("pages.home.node_settings.title") }}</div>
          </b-col>
          <b-col md="6" class="hidden-xs text-right">
            <ResetSettings />
          </b-col>
        </b-row>

        <b-card no-body>
          <b-tabs card>
            <GlobalSettings />
            <NodeSettings :network="networks['etherum']" />
            <NodeSettings :network="networks['polygon']" />
            <NodeSettings :network="networks['sentinel']" />
            <!-- <NFTSettings :ntf="nft" /> -->
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col>
        <b-row>
          <b-col md="6" cols="9">
            <div class="title">💸 {{ $t("pages.home.rewards.title") }}</div>
          </b-col>
          <b-col md="6" cols="3" class="text-right">
            <TwitterShare />
          </b-col>
        </b-row>
        <div class="rewards">
          <Rewards :days="1" />
          <Rewards :days="7" />
          <Rewards :days="30" />
          <Rewards :days="365" />
        </div>
      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col>
        <div class="title">📈 {{ $t("pages.home.projection.title") }}</div>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col>
        <b-card no-body>
          <b-tabs card>
            <ProjectionChart :network="networks['etherum']" />
            <ProjectionChart :network="networks['polygon']" />
            <ProjectionChart :network="networks['sentinel']" />
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from "vuex";
import ResetSettings from "@/components/Settings/ResetSettings.vue";
import GlobalSettings from "@/components/Settings/GlobalSettings.vue";
import NodeSettings from "@/components/Settings/NodeSettings.vue";
import NFTSettings from "@/components/Settings/NFTSettings.vue";
import TwitterShare from "@/components/Social/TwitterShare.vue";
import Rewards from "@/components/Indicators/Rewards.vue";
import ProjectionChart from "@/components/Indicators/ProjectionChart.vue";

export default {
  name: "Home",
  components: {
    ResetSettings,
    GlobalSettings,
    NodeSettings,
    NFTSettings,
    Rewards,
    ProjectionChart,
    TwitterShare,
  },
  computed: {
    ...mapState({
      requestPending: (state) => state.coinGeckoRequestPending,
      networks: (state) => state.networks,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";

.component {
  .content {
    @media (max-width: @screen-xs-max) {
      .col-sm-6 {
        &:first-of-type {
          margin-bottom: 1rem;
        }
      }
    }
  }
}

.rewards {
  display: flex;
  justify-content: center;

  .component {
    flex: 1 1 150px;
    margin: 0 0.5rem;

    &:first-child {
      margin-left: 0px !important;
    }

    &:last-child {
      margin-right: 0px !important;
    }
  }

  @media (max-width: @screen-xs-max) {
    flex-flow: column;

    .component {
      margin: 0;
      margin-bottom: 0.5rem;
    }
  }
}

.projection-options {
  float: right;
  display: flex;
  align-items: center;

  > * {
    margin-left: 0.5rem;
  }
}
</style>
