<template>
  <div>
    <div class="new">
      <div>
        <span v-html="tittle">{{tittle}}</span>
        <img class="iconImage" v-if="iconImage" :src="iconImage" />
        <span class="more" v-if="url" @click="toNews">更多</span>
      </div>
      <div>{{ newsTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewBar",
  props: {
    tittle: "",
    newsTime: {
      String
    },
    url: {
      String
    },
    iconImage: {
      String
    },
    icon: ""
  },
  methods: {
    toNews() {
      window.open(this.url);
    }
  }
};
</script>

<style>
/* lang = "less" src = "../newsResource/NewsBar.less" */
@import "../newsResource/NewsBar.css";
</style>
