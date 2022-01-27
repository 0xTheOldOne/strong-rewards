<template>
  <div>
    <div v-if="loaded">
      <b-card title="Loading details..." img-top tag="article" style="max-width: 20rem" class="mb-2">
        <b-card-text class="text-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </b-card-text>
      </b-card>
    </div>
    <div v-else-if="githubError != ''">
      <b-card title="About the author" img-top tag="article" style="max-width: 20rem" class="mb-2">
        <b-card-text>
          <b-alert show variant="danger">
            An error occured while retrieving the informations about the author because GitHub API wasn't responding correctly...<br />
            <code>{{ githubError }}</code>
          </b-alert>
          <i></i>
        </b-card-text>
      </b-card>
    </div>
    <div v-else>
      <b-card :title="githubResponse.login" :img-src="githubResponse.avatar_url" :img-alt="githubResponse.login" img-top tag="article" style="max-width: 20rem" class="mb-2">
        <b-card-text>{{ githubResponse.bio }}</b-card-text>
        <b-card-text class="text-center">
          <div class="social twitter" v-if="githubResponse.twitter_username != ''">
            <a :href="'https://twitter.com/' + githubResponse.twitter_username" target="_blank" rel="noopener noreferrer">
              <b-icon icon="twitter"></b-icon>
            </a>
          </div>
          <div class="social github" v-if="githubUser.twitter_username != ''">
            <a :href="'https://github.com/' + githubUser" target="_blank" rel="noopener noreferrer">
              <b-icon icon="github"></b-icon>
            </a>
          </div>
        </b-card-text>
      </b-card>
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
    axios
      .get("https://api.github.com/users/" + this.githubUser)
      .then((response) => {
        this.githubResponse = response.data;
      })
      .catch((e) => {
        this.githubError = e;
      });
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
}
</style>
