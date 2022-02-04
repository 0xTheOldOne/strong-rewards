<template>
  <div class="mt-5">
    <div v-if="githubError != ''">
      <b-card title="Something went wrong... Oops." img-top tag="article" style="max-width: 20rem">
        <b-card-text>
          <b-alert show variant="danger">
            <p>An error occured while retrieving those informations because GitHub API wasn't responding correctly :</p>
            <code>{{ githubError }}</code>
          </b-alert>
          <i></i>
        </b-card-text>
      </b-card>
    </div>
    <div v-else>
      <b-skeleton-wrapper :loading="!loaded">
        <template #loading>
          <b-card style="max-width: 20rem">
            <div class="d-flex justify-content-center mb-2">
              <b-skeleton type="avatar"></b-skeleton>
            </div>
            <p>
              <b-skeleton width="85%"></b-skeleton>
              <b-skeleton width="55%"></b-skeleton>
              <b-skeleton width="70%"></b-skeleton>
              <b-skeleton width="85%"></b-skeleton>
              <b-skeleton width="55%"></b-skeleton>
            </p>
            <p>
              <b-skeleton width="85%"></b-skeleton>
              <b-skeleton width="55%"></b-skeleton>
              <b-skeleton width="70%"></b-skeleton>
            </p>
          </b-card>
        </template>

        <b-card :title="githubResponse.login" :img-src="githubResponse.avatar_url" :img-alt="githubResponse.login" img-top tag="article" style="max-width: 20rem" class="mb-3">
          <b-card-text v-html="bio" class="mb-3"></b-card-text>
          <b-card-text class="mb-4 mt-4 text-center">
            <div class="social twitter" v-if="githubResponse.twitter_username != ''">
              <a :href="'https://twitter.com/' + githubResponse.twitter_username" target="_blank" rel="noopener noreferrer" title="My Twitter account (french native speaker)">
                <b-icon icon="twitter" class="hover"></b-icon>
              </a>
            </div>
            <div class="social github" v-if="githubUser.twitter_username != ''">
              <a :href="'https://github.com/' + githubUser" target="_blank" rel="noopener noreferrer" title="My GitHub profile (most of the repositories are private so you will not see a lot of things unfortunatly...">
                <b-icon icon="github" class="hover"></b-icon>
              </a>
            </div>
            <div class="social mail">
              <a href="mailto:oxtheoldone@protonmail.com" target="_blank" rel="noopener noreferrer" title="Use with caution, only if you want to talk about this app">
                <b-icon icon="envelope" class="hover"></b-icon>
              </a>
            </div>
          </b-card-text>
        </b-card>

        <!-- Not for now... -->
        <!-- <b-card img-top tag="article" style="max-width: 20rem" class="mb-5">
          <b-card-text>
            <small>
              <p class="text-justify">Since a few people suggested that on Twitter, here are some wallet addresses if you want to send a tip (again, i'm not asking for this since i coded this tool in order to help people to get into StrongBlock but people suggested it so here we go) :</p>
              <div class="address-container">
                <div class="network"><img src="etherum.png" class="logo" />ERC20 wallet :</div>
                <div class="address hover">0x6D768Eb34608F6Ec148EaCb0B834cCe33bBBe234</div>
              </div>
              <div class="address-container">
                <div class="network"><img src="avalanche.png" class="logo" />AVALANCHE wallet :</div>
                <div class="address hover">not available</div>
              </div>
              <div class="address-container">
                <div class="network"><img src="fantom.png" class="logo" />FANTOM wallet :</div>
                <div class="address hover">not available</div>
              </div>
            </small>
          </b-card-text>
        </b-card> -->
      </b-skeleton-wrapper>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Author",
  data() {
    return {
      loaded: false,
      githubUser: "0xTheOldOne",
      githubError: "",
      githubResponse: {
        login: "the author",
      },
    };
  },
  created() {
    this.loaded = false;
    axios
      .get("https://api.github.com/users/" + this.githubUser)
      .then((response) => {
        this.githubResponse = response.data;
        this.loaded = true;
      })
      .catch((e) => {
        this.githubError = e;
      });
  },
  computed: {
    bio: function () {
      if (this.githubResponse != null && this.githubResponse.bio != null) {
        return this.githubResponse.bio.replace(" - ", "<br />");
      }
      return "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";

.card {
  margin: 0 auto;
}

.social {
  margin: 0px 0.5em;
  display: inline-block;

  svg {
    @size: 2em;
    width: @size;
    height: @size;
  }

  &.twitter {
    svg {
      fill: #00acee;
    }
  }

  &.github {
    svg {
      fill: #333;
    }
  }

  &.mail {
    svg {
      fill: #505264;
    }
  }
}

.address-container {
  margin-bottom: 1rem;

  .address {
    font-family: "Source Code Pro", monospace;
    background-color: @text-color;
    border: 1px solid @border-color;
    margin: 0.25rem 0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
}
</style>
