<template>
  <b-container>
    <b-row>
      <b-col>
        <p>Thanks for using Strong Calculator !</p>
        <p>
          <b-badge variant="warning" class="mr-2">
          <b-icon icon="exclamation-triangle" class="mr-2" />Disclaimer<b-icon icon="exclamation-triangle" class="ml-2" /></b-badge>
          This app was <u>not</u> created in order to compete with <a href="https://twitter.com/phtevenstrong" target="_blank" rel="noopener noreferrer">The Calculator Guy</a>'s existant calculator.<br />
        </p>
        <p>When i wrote this app i was just starting to earn/compound strong tokens in order to create strong nodes and i tought that it could be cool to have some earnings calculator ! Please keep in mind that it was originally created in order to practice VueJs basics so maybe it's not perfect...</p>
        <p>
          <u>Technical informations :</u>
          <ul>
            <li>The app layout is made with <a href="https://bootstrap-vue.org/" target="_blank" rel="noopener noreferrer">bootstrap-vue</a></li>
            <li>Charts are made with <a href="https://github.com/highcharts/highcharts-vue" target="_blank" rel="noopener noreferrer">highcharts-vue</a></li>
            <li>Strong token price in USD is fetched using <a href="https://github.com/miscavage/CoinGecko-API" target="_blank" rel="noopener noreferrer">Miscavage's wrapper</a> on <a href="https://www.coingecko.com/api/docs/v3" target="_blank" rel="noopener noreferrer">CoinGecko API</a></li>
            <li>Github avatar and bio are fetched using <a href="https://github.com/axios/axios" target="_blank" rel="noopener noreferrer">Axios</a> and <a href="https://docs.github.com/en/rest/reference/users" target="_blank" rel="noopener noreferrer">GitHub Rest API</a></li>
          </ul>
        </p>
        <p>
          <u>To do :</u>
          <ul>
            <li>Store values with VueX store in order to use those values across all the app</li>
            <li>Add charts</li>
            <li>Add a projection chart of earnings with auto-compound option so you can see when you will be able to create the next node</li>
            <li>Add monthly fees to the earnings projections</li>
            <li>Add NFT to calculator options</li>
            <li>Maybe add ETH gas tracker</li>
          </ul>
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
