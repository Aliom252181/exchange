
<template>
  <div class="dataV-container">
    <div class="dataV-top">
      <div class="dataV-top-title">外汇市场新闻及分析</div>
      <dv-decoration-5 class="dv-decoration-5" style="width:100%;height:60px;" />
    </div>
    <div class="dataV-top-button">
      <button class="dataV-top-button-style" @click="toIndex()">主&nbsp;&nbsp;页</button>
    </div>

    <div class="dv-border-box-container">
      <dv-border-box-8 class="dv-border-box-8">
        <div class="dv-border-box-container-child">
          <PanelGroup />
        </div>
      </dv-border-box-8>
    </div>
    <div class="dataV-main-container">
      <div class="display-flex">
        <!-- 即时新闻版块 --start-->
        <dv-border-box-11 class="dv-border-box-1" title="即时新闻">
          <news class="component-container" />
        </dv-border-box-11>
        <!-- 即时新闻版块 --end-->

        <!-- 全球地图版块---start -->
        <div class="dv-border-box-main-container">
          <dv-border-box-10 class="dv-border-box-main">
            <worldMap />
          </dv-border-box-10>
        </div>
        <!-- 全球地图版块---end -->
      </div>

      <!--行情图表版块 --start -->
      <dv-border-box-11 class="dv-border-box-2" title="行情图表">
        <globalTrends />
      </dv-border-box-11>
      <!--行情图表版块 --end -->
    </div>

    <!-- 美元兑换人民币版块 --start-->
    <div class="dataV-main-chart-container">
      <dv-border-box-11 class="dv-border-box-top" title="汇率兑换">
        <exChange class="component-container" />
      </dv-border-box-11>
    </div>
    <!-- 美元兑换人民币版块 --end-->
  </div>
</template>

<script>
import PanelGroup from "./PannelGroup";
import news from "./news/news"; // 新闻组件
import exChange from "./exchange/exchange"; // 美元兑人民币汇率图表组件
import globalTrends from "./globalTrends/globalTrends"; // 全球汇率图表
import worldMap from "./worldMap/worldMap"; // 全球地图组件

export default {
  components: {
    news,
    exChange,
    globalTrends,
    worldMap,
    PanelGroup
  },

  data() {
    return {};
  },
  mounted() {
    // if(this.timer){
    //   clearInterval(this.timer)
    // }else{
    //   this.timer = setInterval(()=>{
    //     this.reload()
    //   },30000)
    // }
  },
  destroyed() {
    // clearInterval(this.timer)
  },
  methods: {
    toIndex() {
      this.$router.push("/dashboard/dashboard");
    }
  }
};
</script>
<style scoped>
.dataV-container {
  width: 100%;
  background-image: url("../assets/bg.001.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.dataV-top-title {
  width: 100%;
  color: #fff;
  text-align: center;
  position: relative;
  top: 20px;
  left: 0;
  font-size: 20px;
}

.dataV-main-chart-container {
  margin: 50px 20px 0 20px;
}
.dataV-main-container {
  margin: 50px 20px 0 20px;
}

/*手机 宽度 <768*/
@media (max-width: 768px) {
  .border-box-content {
    flex: 1;
    height: 600px;
  }
  .card-panel-description{
    display: block !important;
  }
}
/*平板 宽度 768~992*/
@media (max-width: 992px) and (min-width: 768px) {
  .dv-border-box-1 {
    width: 100%;
  }
  .dv-border-box-main-container {
    width: 100%;
  }
  .dv-border-box-2 {
    width: 100%;
  }
}
/*桌面显示器 中等屏幕 笔记本 宽度 992-1200*/
@media (max-width: 1000px) and (min-width: 992px) {
  .display-flex{
    display: flex;
  }
  .dv-border-box-1 {
    width: 300px;
  }
  .dv-border-box-main-container {
    width: calc(100% - 300px);
  }
  .dv-border-box-2 {
    width: 100%;
  }
}
@media (max-width: 1500px) and (min-width: 1000px) {
  .display-flex{
    display: flex;
  }
  .dv-border-box-1 {
    width: 400px;
  }
  .dv-border-box-main-container {
    width: calc(100% - 400px);
  }
  .dv-border-box-2 {
    width: 100%;
  }
}
/*台式机 大屏幕 >1500*/
@media (min-width: 1500px) {
  .display-flex{
    width: calc(100% - 500px);
    display: flex;
  }
  .dataV-main-container {
    display: flex;
  }
  .dv-border-box-1 {
    width: 400px;
  }
  .dv-border-box-main {
    flex: 1;
  }
  .dv-border-box-2 {
    width: 500px;
  }
}
.dataV-main-chart-container {
  height: 600px;
}
.dv-border-box-top {
  height: 600px;
}
.dv-border-box-1 {
  height: 600px;
}
.dv-border-box-2 {
  height: 600px;
}
.dv-border-box-main {
  height: 565px;
  margin: 30px 0;
}

.block {
  display: block;
}
.space-around {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
}
.dataV-top-button {
  text-align: right;
  position: absolute;
  width: 100%;
  top: 45px;
  padding: 0 50px;
  display: none;
}

.dataV-top-button-style {
  color: #fff;
  background: #080b18;
  border: none;
  outline: none;
  padding: 10px 40px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 0px 20px #2959dc inset;
}
.dataV-top-button-style:hover {
  background: #080b18;
  border: none;
  outline: none;
  box-shadow: none;
  border: 1px solid #ccc;
}
.dv-border-box-container {
  width: 100%;
  display: flex;
}
.dv-border-box-8 {
  height: 150px;
  color: #fff;
  margin: 50px 20px 0 20px;
}
.dv-border-box-container-child {
  display: flex;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  height: 150px;
}
.dv-border-box-main-container {
  flex: 1;
}
</style>
