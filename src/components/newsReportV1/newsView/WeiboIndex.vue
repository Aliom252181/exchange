<template>
  <div class="homeIndex_box">
    <div v-if="newsData && newsData.length > 0" id="newsHome">
      <NewsBar
        v-for="(items,index) in newsData"
        :key="index"
        :tittle="items.text"
        :news-time="items.hotValue"
        :iconImage="items.icon"
        :url="items.link"
      />
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import NewsBar from "./NewsBar";
import Loading from "./Loading";
import { findWeiboHot } from "../newsApi/NewsApi";

export default {
  components: {
    NewsBar,
    Loading
  },
  data() {
    return {
      newsData: undefined
    };
  },
  created() {
    this.findAllData();
    setInterval(this.findAllData, 3000);
  },
  beforeDestroy() {
    clearInterval(this.findAllData);
  },
  methods: {
    // 调用查询axios
    async findAllData() {
      let data = await findWeiboHot("");
      if (data == 0) {
        console.log("微博热点查询失败");
      } else {
        this.newsData = data;
      }
    },
    // 搜索
    searchNews() {
      console.log("123");
    }
  }
};
</script>

<style src = "../newsResource/NewsIndex.css">
</style>
