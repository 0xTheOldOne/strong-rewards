<template>
  <b-container>
    <b-row>
      <b-col>
        <p>
          <b-badge variant="warning" class="mr-2">
            <b-icon icon="exclamation-triangle" class="mr-1" />Disclaimer<b-icon icon="exclamation-triangle" class="ml-2" />
          </b-badge>
          This app was <u>not</u> created in order to compete with <a href="https://twitter.com/phtevenstrong" target="_blank" rel="noopener noreferrer">The Calculator Guy</a>'s existant calculator.
        </p>
        <p>
          When i wrote this app i was just starting to earn/compound strong tokens in order to create strong nodes and i tought that it could be cool to have some earnings calculator, especially if you're new to StrongBlock because this can help if you don't know how it works.
        </p>
        <p>
          Also, i thought that it could be cool if the app was able to connect to a wallet and see how many tokens you have in your wallet, how many nodes too and how many earnings you had but i <b>don't</b> know how to do that at the moment and i <b>don't</b> want this app to be able to interact with people wallets because nowadays we see a lot of scammers trying to do so people could be in fear about that and that's not what i want concerning this app. This app will not retrieve those kind of informations then, i hope it's ok for you !
        </p>
        <p>
          Please keep in mind that it was originally created in order to practice VueJs basics so maybe it's not perfect...
        </p>
        <p>
          Last thing about all of this is i do this on my free time (<i>i have a full-time job and a new born, so i don't have a lot of free time unfortunatly</i>) so this app is provided "as is" and i'll update it when i have enough time.
        </p>
        <p>Thank you for your understanding and many thanks for using Strong Calculator !</p>
        <p class="mt-5">
          <u>Technical informations :</u>
          <ul class="icons">
            <li>
              <b-icon icon="chevron-right" />
              The app layout is made with <a href="https://bootstrap-vue.org/" target="_blank" rel="noopener noreferrer">bootstrap-vue</a>
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
        <p>
          <u>To do :</u>
          <ul class="icons">
             <li>
              <b-icon icon="check-circle" variant="success" class="mr-1" />
              Add token price chart
            </li>
            <li>
              <b-icon icon="circle" class="mr-1" />
              Refactor components in order to share calculation values across the app 
            </li>
            <li>
              <b-icon icon="circle" class="mr-1" />
              Store values with <a href="https://vuex.vuejs.org/" target="_blank" rel="noopener noreferrer">VueX</a> store in order to use those values across all the app
            </li>
            <li>
              <b-icon icon="circle" class="mr-1" />
              Add a projection chart of earnings
            </li>
            <li>
              <b-icon icon="circle" class="mr-1" />
              Add an auto-compound option to this chart so you can see when you will be able to create the next node
            </li>
            <li>
              <b-icon icon="circle" class="mr-1" />
              Add monthly fees to the earnings projections (depends on the visualization i choose, it could be a mess with a lot of nodes)
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
          I don't own NFTs or <img src="polygon.png" class="logo" />Polygon nodes or <img src="sentinel.png" class="logo" />Sentinel nodes at the moment so i don't know how they work.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";
</style>
