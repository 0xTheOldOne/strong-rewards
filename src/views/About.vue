<template>
  <b-container>
    <b-row>
      <b-col>
        <p><b-badge variant="warning">Disclaimer</b-badge> This app was <u>not</u> created in order to compete with <a href="https://twitter.com/phtevenstrong" target="_blank" rel="noopener noreferrer">The Calculator Guy</a>'s existant calculator (check his pinned tweet for free calcs !).</p>
        <p>Thanks for using Strong Calculator !</p>
        <p>When i wrote this app i was just starting to earn/compound strong tokens in order to create strong nodes and i tought that it could be cool to have some earnings calculator ! Please keep in mind that it was originally created in order to practice VueJs basics so maybe it's not perfect...</p>
        <p>
          <u>Technical informations :</u>
          <ul>
            <li>The app layout is made with <a href="https://bootstrap-vue.org/" target="_blank" rel="noopener noreferrer">bootstrap-vue</a></li>
            <li>Charts are made with <a href="https://github.com/highcharts/highcharts-vue" target="_blank" rel="noopener noreferrer">highcharts-vue</a></li>
            <li>Strong token price in USD is fetched using <a href="https://github.com/miscavage/CoinGecko-API" target="_blank" rel="noopener noreferrer">a wrapper</a> on <a href="https://www.coingecko.com/api/docs/v3" target="_blank" rel="noopener noreferrer">CoinGecko API</a></li>
            <li>Github avatar and bio are fetched using <a href="https://github.com/axios/axios" target="_blank" rel="noopener noreferrer">Axios</a> and <a href="https://docs.github.com/en/rest/reference/users" target="_blank" rel="noopener noreferrer">GitHub Rest API</a></li>
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
