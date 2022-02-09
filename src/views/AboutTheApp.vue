<template>
  <b-container fluid="md">
    <b-row>
      <b-col class="mb-4">
        <b-card>
          <b-card-text>
            <p>
              <b-badge variant="warning" class="mr-2">
                <b-icon icon="exclamation-triangle" class="mr-1" />Disclaimer<b-icon icon="exclamation-triangle" class="ml-2" />
              </b-badge>
              This tool was <u>not</u> created in order to compete with <a href="https://twitter.com/phtevenstrong" target="_blank" rel="noopener noreferrer">The Calculator Guy</a>'s existant calculator.
            </p>
            <p>
              When i wrote this app i was just starting to earn/compound strong tokens in order to create strong nodes and i tought that it could be cool to have some earnings calculator, especially if you're new to StrongBlock because this can help if you don't know how it works.
            </p>
            <p>
              Also, i thought that it could be cool if my app was able to connect to a wallet and see how many tokens you have in your wallet, how many nodes too or how many earnings you had but i <b>don't</b> know how to do that at the moment and i <b>don't</b> want this app to be able to interact with people's wallets because nowadays we see a lot of scammers trying to do so and people could be in fear about that and that's not what i want, stay safe ! This app will not retrieve those kind of informations then, i hope it's ok for you !
            </p>
            <p>
              Please keep in mind that it was originally created in order to practice VueJs basics so maybe it's not perfect...
            </p>
            <p>
              Last thing about all of this is i code on my free time (<i>i have a full-time job and a new born, so i don't have a lot of free time unfortunatly</i>) so this tool is provided "as is" and i'll update it when i have enough time.
            </p>
            <p>Thank you for your understanding and many thanks for using Strong Calculator !</p>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="mb-4">
          <b-card-text>
            <u>To do, ordered by priority :</u>
            <p class="mb-3">
              <ul class="icons mt-2">
                <li>
                  <b-icon icon="check-circle" variant="success" class="mr-1" />
                  Add token price chart
                </li>
                <li>
                <b-icon icon="check-circle" variant="success" class="mr-1" />
                  Store values with <a href="https://vuex.vuejs.org/" target="_blank" rel="noopener noreferrer">VueX</a> store in order to use those values across the app
                </li>
                <li>
                  <b-icon icon="check-circle" variant="success" class="mr-1" />
                  Refactor rewards component in order to use VueX store values
                </li>
                <li>
                  <b-icon icon="check-circle" variant="success" class="mr-1" />
                  Store VueX state in localStorage using <a href="https://github.com/championswimmer/vuex-persist" target="_blank" rel="noopener noreferrer">vuex-persist</a> plugin so you can retrieve your settings the next time you want to use the app
                </li>
                <li>
                  <b-icon icon="circle" class="mr-1" />
                  Add a projection chart of earnings
                </li>
                <li>
                  <b-icon icon="circle" class="mr-1" />
                  Add monthly fees to the earnings projections (depends on the visualization i choose, it could be a mess with a lot of nodes)
                </li>
                <li>
                  <b-icon icon="circle" class="mr-1" />
                  Add an auto-compound option to this chart so you can see when you will be able to create the next node
                </li>
                <li>
                  <b-icon icon="question-circle" class="mr-1" />
                  Maybe add some internationalization (i18n) for non english speakers
                </li>
                <li>
                  <b-icon icon="question-circle" class="mr-1" />
                  Maybe add NFT tab
                </li>
                <li>
                  <b-icon icon="question-circle" class="mr-1" />
                  Maybe add Polygon nodes tab
                </li>
                <li>
                  <b-icon icon="question-circle" class="mr-1" />
                  Maybe add Sentinel nodes tab
                </li>
                <li>
                  <b-icon icon="question-circle" class="mr-1" />
                  Maybe add an ETH gas tracker
                </li>
              </ul>
            </p>
            <p>
              <b-badge variant="primary" class="mr-2">Nota bene</b-badge>
              I don't own NFTs or <img src="polygon.png" class="logo" />Polygon nodes or <img src="sentinel.png" class="logo" />Sentinel nodes at the moment so i don't know how they work, yet...
            </p>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6" xs="12" class="mb-4">
        <b-card>
          <b-card-text>
            <u>Technical informations :</u>
            <p class="mb-3">
              <ul class="icons mt-2">
                <li>
                  <b-icon icon="chevron-right" />
                  The app layout is made with <a href="https://bootstrap-vue.org/" target="_blank" rel="noopener noreferrer">bootstrap-vue</a>
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Data are shared across the different parts of the app using a centralized data store called <a href="https://vuex.vuejs.org/" target="_blank" rel="noopener noreferrer">VueX</a>
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Data state is stored to <code>localStorage</code> using <a href="https://github.com/championswimmer/vuex-persist" target="_blank" rel="noopener noreferrer">championswimmer' plugin</a> so you can retrieve your settings everytime you use this app (data remains, across PC reboots, untill you clear browser data)
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Charts are made with <a href="https://www.highcharts.com/" target="_blank" rel="noopener noreferrer">Highcharts</a>
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Strong token price in USD is fetched using <a href="https://github.com/miscavage/CoinGecko-API" target="_blank" rel="noopener noreferrer">Miscavage's wrapper</a> on <a href="https://www.coingecko.com/api/docs/v3" target="_blank" rel="noopener noreferrer">CoinGecko API</a>
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Github avatar and bio are fetched using <a href="https://github.com/axios/axios" target="_blank" rel="noopener noreferrer">Axios</a> and <a href="https://docs.github.com/en/rest/reference/users" target="_blank" rel="noopener noreferrer">GitHub Rest API</a>
                </li>
              </ul>
            </p>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col sm="6" xs="12" class="mb-4">
        <b-card>
          <b-card-text>
            <u>Details about the {{githubHistoryDepth}} last updates :</u>
            <b-overlay :show="!loaded" variant="transparent" opacity="0.8" blur="5px" rounded="sm">
              <div v-if="loaded" class="commits mt-2">
                <div class="commit mb-2" v-for="commit in githubResponse" :key="commit.sha">
                    <div class="message">{{commit.commit.message}}</div>
                    <div class="date">
                      <b-badge class="sha mr-2">{{commit.sha.substring(0,7)}}</b-badge>
                      <small>{{new Date(commit.commit.author.date).toLocaleString()}}</small>
                    </div>
                </div>
              </div>
            </b-overlay>
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
      githubRepo: "strong-rewards",
      githubHistoryDepth: 5,
      githubError: "",
      githubResponse: {
        commits: [],
      },
    };
  },
  created() {
    this.loaded = false;
    axios
      .get("https://api.github.com/repos/" + this.githubUser + "/" + this.githubRepo + "/commits")
      .then((response) => {
        this.githubResponse = response.data.slice(0, this.githubHistoryDepth);
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

.commit {
  font-size: .9rem;

  .sha {
    font-family: "Source Code Pro", monospace;
  }
}
</style>
