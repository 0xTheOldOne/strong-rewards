<template>
  <b-container fluid="md">
    <b-row>
      <b-col class="mb-4">
        <b-card>
          <b-card-text>
            <div class="disclaimer mb-3 pb-3">
              <p class="text-center">
                <b-badge variant="warning" class="mb-3">
                  ⚠️ Disclaimer ⚠️
                </b-badge>
              </p>
              <p>
                This tool is <b>not</b> an official StrongBlock app. It's just something that i wanted to share with the StrongBlock community 🙏<br />
                This tool was <b>not</b> created in order to compete with <a href="https://twitter.com/phtevenstrong" target="_blank" rel="noopener noreferrer">The Calculator Guy</a>'s existant calculator or any other tool that may look like this app.
              </p>
            </div>
            
            <p>
              When i wrote this app i was just starting to earn/compound strong tokens in order to create strong nodes and i tought that it could be cool to have some earnings calculator, especially if you're new to StrongBlock because this can help if you don't know how it works.
            </p>
            <p>
              Also, i thought that it could be cool if my app was able to connect to a wallet and see how many tokens you have in your wallet, how many nodes too or how many earnings you had but i <b>don't</b> know how to do that at the moment and i <b>don't</b> want this app to be able to interact with people's wallets because nowadays we see a lot of scammers trying to do so and people could be in fear about that and that's not what i want, stay safe !
            </p>
            <p class="text-center">
              <b>This app will not retrieve this kind of informations, i hope it's ok for you !</b>
            </p>
            <p>
              Please keep in mind that it was originally created in order to practice VueJs basics so maybe it's not perfect...
            </p>
            <p>
              Last thing about all of this is i code on my free time (<i>i have a full-time job and a new born, so i don't have a lot of free time unfortunatly</i>... 😅) so this tool is provided "as is" and i'll update it when i can.
            </p>
            <p>Thank you for your understanding and many thanks for using {{ appName }} ! 🥳</p>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="mb-4">
          <b-card-text>
            ☑️ To do, ordered by priority :
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
                  <b-icon icon="check-circle" variant="success" class="mr-1" />
                  Add an ETH gas tracker
                </li>
                <li>
                  <b-icon icon="check-circle" variant="success" class="mr-1" />
                  Add a projection chart of earnings
                </li>
                <li>
                  <b-icon icon="check-circle" variant="success" class="mr-1" />
                  Add an auto-compound option to this chart so you can see when you will be able to create the next node
                </li>
                <li>
                  <b-icon icon="check-circle" variant="success" class="mr-1" />
                  Add translation (i18n) for non english speakers
                </li>
                <li>
                  <b-icon icon="circle" class="mr-1" />
                  Add a load/save configuration button so you can easily share a <code>.json</code> file with all your settings
                </li>
                <li>
                  <b-icon icon="check-circle" variant="success" class="mr-1" />
                  Maybe add a Twitter share button
                </li>
                <li>
                  <b-icon icon="circle" class="mr-1" />
                  Add a NFT tab
                </li>
                <li>
                  <b-icon icon="circle" class="mr-1" />
                  Add a Polygon nodes tab with decay system (this mean i'll need to add a node creation date in order to compute rewards)
                </li>
                <li>
                  <b-icon icon="circle" class="mr-1" />
                  Add a Sentinel nodes tab (i don't have this kind of nodes and i'm not whitelisted for this)
                </li>
                <!-- <li>
                  <b-icon icon="circle" class="mr-1" />
                  Sync network tabs on home page (if the Etherum settings tab is active, then the Etherum projection chart must be active too)
                </li> -->
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
      <b-col class="mb-4">
        <b-card>
          <b-card-text>
            📝 Technical informations :
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
                  Data state is stored to <code>localStorage</code> using <a href="https://github.com/championswimmer/vuex-persist" target="_blank" rel="noopener noreferrer">Championswimmer's plugin</a> (vuex-persist) so you can retrieve your settings everytime you use this app (data remains, across PC reboots, untill you clear browser data)
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Internationalization (i18n) is made with <a href="https://kazupon.github.io/vue-i18n/" target="_blank" rel="noopener noreferrer">Kazupon's plugin</a> (vue-i18n), following <a href="https://phrase.com/blog/posts/ultimate-guide-to-vue-localization-with-vue-i18n/" target="_blank" rel="noopener noreferrer">this</a> tutorial
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Country flags come from <a href="https://flagicons.lipis.dev/" target="_blank" rel="noopener noreferrer">Flagicons</a> 
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Charts are made with <a href="https://www.highcharts.com/demo/" target="_blank" rel="noopener noreferrer">Highcharts</a> and <a href="https://www.highcharts.com/demo/stock" target="_blank" rel="noopener noreferrer">Highcharts Stock</a>
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Rest API consuming is done with <a href="https://github.com/axios/axios" target="_blank" rel="noopener noreferrer">Axios</a>
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Gas fees are fetched from <a href="https://etherscan.io/apis" target="_blank" rel="noopener noreferrer">Etherscan API</a>
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Github avatar and bio are fetched from <a href="https://docs.github.com/en/rest/reference/users" target="_blank" rel="noopener noreferrer">GitHub Rest API</a>
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Strong token price in USD is fetched using <a href="https://github.com/miscavage/CoinGecko-API" target="_blank" rel="noopener noreferrer">Miscavage's wrapper</a> on <a href="https://www.coingecko.com/api/docs/v3" target="_blank" rel="noopener noreferrer">CoinGecko API</a>
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  Emojis were found in <a href="https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md" target="_blank" rel="noopener noreferrer">Ikatyang's emoji cheat sheet</a>
                </li>
                <li>
                  <b-icon icon="chevron-right" />
                  I use <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">Google Analytics</a> to get stats on the people using this app (number of visits and country mostly)
                </li>
              </ul>
            </p>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mb-4">
        <b-card>
          <b-card-text>
            🐞 Known bugs :
            <ul class="icons">
              <li>On desktop (not mobile), when you change an input on home page, Google Chrome scrolls to the top of the page... Maybe it's the same on other browsers.</li>
              <li>Node count is not refreshed when you click on "<b-icon icon="arrow-repeat" /> {{ $t("pages.home.reset_settings.button_text") }}"</li>
            </ul>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import axios from "axios";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Author",
  computed: {
    ...mapState({
      appName: (state) => state.appName,
    })
  },
  // data() {
  //   return {
  //     loaded: false,
  //     githubUser: "0xTheOldOne",
  //     githubRepo: "strong-rewards",
  //     githubHistoryDepth: 5,
  //     githubError: "",
  //     githubResponse: {
  //       commits: [],
  //     },
  //   };
  // },
  // created() {
  //   this.loaded = false;
  //   axios
  //     .get("https://api.github.com/repos/" + this.githubUser + "/" + this.githubRepo + "/commits")
  //     .then((response) => {
  //       this.githubResponse = response.data.slice(0, this.githubHistoryDepth);
  //       this.loaded = true;
  //     })
  //     .catch((e) => {
  //       this.githubError = e;
  //     });
  // },
  // computed: {
  //   bio: function () {
  //     if (this.githubResponse != null && this.githubResponse.bio != null) {
  //       return this.githubResponse.bio.replace(" - ", "<br />");
  //     }
  //     return "";
  //   },
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";

.disclaimer {
  border-bottom: 1px solid @border-color;
}

.commit {
  font-size: .9rem;

  .sha {
    font-family: "Source Code Pro", monospace;
  }
}
</style>
