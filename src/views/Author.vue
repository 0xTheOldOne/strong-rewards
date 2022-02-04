<template>
  <b-container class="mt-5">
    <b-row>
      <b-col md="4" xs="12">
        <div v-if="githubError != ''">
          <b-card title="Something went wrong... Oops.">
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

            <b-card :title="githubResponse.login" :img-src="githubResponse.avatar_url" :img-alt="githubResponse.login" img-top class="mb-4">
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
          </b-skeleton-wrapper>
        </div>
      </b-col>
      <b-col md="8" xs="12">
        <b-card img-top tag="article" class="mb-4">
          <b-card-text>
            <p class="text-justify">Since a few people suggested that on Twitter, here are some wallet addresses if you want to send a tip (again, i'm not asking for this since i coded this tool in order to help people to get into StrongBlock but several people suggested that i add a tip address so here we go)...</p>
            <p class="text-justify">So, i created a MetaMask account only for this purpose and the following networks will work with this address :</p>
            <table class="networks mt-3 mb-3">
              <tr>
                <td><img src="etherum.png" class="logo" /></td>
                <td>
                  ERC20 wallet<br />
                  <small>This is the default network on MetaMask</small>
                </td>
              </tr>
              <tr>
                <td><img src="bsc.png" class="logo" /></td>
                <td>
                  BEP20 wallet (Binance Smart Chain)<br />
                  <small>I added Binance Smart Chain network to my MetaMask account using <a href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain" target="_blank" rel="noopener noreferrer">this tutorial</a></small>
                </td>
              </tr>
              <tr>
                <td><img src="avalanche.png" class="logo" /></td>
                <td>
                  AVALANCHE wallet (C Chain i guess)<br />
                  <small>I added Avalanche network to my MetaMask account using <a href="https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche" target="_blank" rel="noopener noreferrer">this tutorial</a></small>
                </td>
              </tr>
            </table>
            <p class="text-justify">All those networks are working with a unique address, so feel free so send something on this address if you want :</p>
            <div class="address-container">
              <div class="address hover">
                <img src="metamask.png" class="logo" />0x6D768Eb34608F6Ec148EaCb0B834cCe33bBBe234<br />
                <img src="donation-address.png" class="mt-3 mb-3" />
              </div>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
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

table.networks {
  tr {
    td {
      &:first-child {
        width: 3rem;
        text-align: center;
        vertical-align: top;
      }
    }
  }
}

.address-container {
  margin-bottom: 1rem;

  .address {
    font-family: "Source Code Pro", monospace;
    background-color: white;
    border: 1px solid @border-color;
    margin: 0.25rem 0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    text-align: center;
  }
}
</style>
