<template>
  <div class="homeIndex_box">
    <div v-if="newsData && newsData.length > 0" id="newsHome">
      <transition name="el-fade-in">
        <div class="newsInfo" v-if="newsNum && newsNum > 0">
          <span style="color:#00d9ff">有 {{newsNum}} 条新的新闻待查收</span>
          <span style="color:#00d9ff" @click="findAllDataFirst">&nbsp;&nbsp;刷新&nbsp;&nbsp;</span>
        </div>
      </transition>
      <NewsBar
        v-for="(items,index) in newsData"
        :key="index"
        :tittle="items.text"
        :news-time="items.updated_at"
        :url="items.url"
      />
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import NewsBar from "./NewsBar";
import Loading from "./Loading";
import { findData } from "../newsApi/NewsApi";

export default {
  components: {
    NewsBar,
    Loading
  },
  data() {
    return {
      newsData: undefined,
      newsBegin: 0,
      newsEnd: 0,
      newsNum: 0
    };
  },
  created() {
    this.findAllDataFirst();
    setInterval(this.findAllDataFirst, 10000); //定时刷新
    // setInterval(this.findNews, 10000); //定时查更新数据
  },
  beforeDestroy() {
    // clearInterval(this.findNews);
    clearInterval(this.findAllDataFirst);
  },
  methods: {
    // 数据交互axios
    async findAllDataFirst() {
      console.log("++++++");
      this.newsData = await findData("");

      this.$emit("newsReturn", 0);
      if (!this.newsData || this.newsData == "" || this.newsData == 0) {
        this.$emit("newsReturn", -1);
      } else {
        this.$emit("newsReturn", 1);
      }

      this.newsBegin = Number(this.newsData[0].id.replace(/[^0-9]/gi, ""));
      this.newsEnd = this.newsBegin;
      this.newsNum = this.newsEnd - this.newsBegin;
    },
    async findNews() {
      let data = await findData("");
      // console.log(data);

      this.$emit("newsReturn", 0);
      if (!this.newsData || this.newsData == "" || this.newsData == 0) {
        this.$emit("newsReturn", -1);
      }
      if (this.newsData) {
        this.$emit("newsReturn", 1);
      }

      this.newsEnd = Number(data[0].id.replace(/[^0-9]/gi, ""));
      this.newsNum = this.newsEnd - this.newsBegin;
    }
  }
};
</script>

<style lang = "less" src = "../newsResource/NewsIndex.less">
</style>
