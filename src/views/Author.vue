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
            <div class="social mail">
              <a href="mailto:oxtheoldone@protonmail.com" target="_blank" rel="noopener noreferrer">
                <b-icon icon="envelope"></b-icon>
              </a>
            </div>
          </b-card-text>
        </b-card>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";

.card {
  margin: 0 auto;
}

.social {
  @duration: 0.15s;
  @scale: 1.25;
  margin: 0px 0.5em;
  display: inline-block;

  svg {
    @size: 2em;
    width: @size;
    height: @size;

    transition: -webkit-transform @duration;
    transition: transform @duration;
    transition: transform @duration, -webkit-transform @duration;
  }

  &:hover {
    svg {
      -webkit-transform: scale(@scale);
      transform: scale(@scale);
    }
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
</style>
