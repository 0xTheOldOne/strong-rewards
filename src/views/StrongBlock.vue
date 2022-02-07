<template>
  <b-container fluid="md" class="mt-5">
    <b-row>
      <b-col>
        <b-card title="What is StrongBlock ?">
          <b-card-text>
            <div class="video-wrapper mt-5" align="center">
              <iframe class="video" src="https://www.youtube.com/embed/tjQpaHakzYA?autoplay=1"> </iframe>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: "StrongBlock",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style/variables.less";
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9, for an aspect ratio of 1:1 change to this value to 100% */
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
