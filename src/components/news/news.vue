<style scoped lang="less" src="./resources/css/style.less"></style>
<template>
 <div class="news-container">
     <vue-seamless-scroll :data="list" class="seamless-warp" :class-option="classOption">
    <div v-for="(items,index) in list" :key="index" class="news-list">
      <p class="news-title">
        <span v-html="items.text">{{items.text}}</span>
        <span v-if="items.url==null"></span>
        <span v-else>
          <a :href="items.url" class="news-more">更多</a>
        </span>
      </p>
      <p class="news-date">{{items.updated_at}}</p>
    </div>
  </vue-seamless-scroll>
  </div>

</template>

<script>
import { news } from "../news/api/newsApi";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name:"news",
  data() {
    return {
      list: []
    };
  },
  components: {
    vueSeamlessScroll
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // 请求参数
      let param = {};
      news.newsList(param).then(res => {
        // 处理时间戳，返回正常时间
        for (var i = 0; i < res.data.length; i++) {
          var date = new Date(res.data[i].updated_at * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + "年";
          var M =(date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1): date.getMonth() + 1) + "月";
          var D =(date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "日" +" ";
          var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +":";
          var m =(date.getMinutes() < 10? "0" + date.getMinutes(): date.getMinutes()) + ":";
          var s = date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds();
          res.data[i].updated_at = Y + M + D + h + m + s;
        }
        this.list = res.data;
      });
    }
  },
  computed: {
    classOption() {
      return {
        step: 0.7, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  }
};
</script>

