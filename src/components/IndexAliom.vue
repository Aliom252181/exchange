<template>
  <div class="screen-homeOfAll">
    <div class="top-screen">
      <div style="width:30%;height:100%">
        <dv-decoration-8 style="height:40%" />
        <div class="buttonList">
          <button class="buttonList_button">
            <span class="buttonList_button_span" @click="jumpTo('/dashboard/dashboard')">首 页</span>
          </button>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <dv-decoration-5 class="pageTopTittle"></dv-decoration-5>
      <div class="tittle-center">金融信息</div>
      <div style="width:30%;height:100%">
        <dv-decoration-8 :reverse="true" style="height:40%" />
        <div class="buttonList">
          <div></div>
          <div></div>
          <div></div>
          <button class="buttonList_button1" @click="jumpTo('/login')">
            <span class="buttonList_button_span1">登 录</span>
          </button>
        </div>
      </div>
    </div>
    <div class="middle-screen">
      <div class="middle-left">
        <div class="middle-left-item">
          <dv-border-box-12>
            <div style="width:calc(100% - 20px);height:calc(100% - 20px)">
              <exchange
                class="echangeItems overflow_none"
                :width="width"
                :height="height"
                @echangeReturn="getMyEchartStatus"
              />
            </div>
          </dv-border-box-12>
        </div>
        <div class="middle-left-item">
          <dv-border-box-12>
            <div style="width:calc(100% - 20px);height:calc(100% - 20px)">
              <China
                class="echangeItems overflow_none"
                :width="width"
                :height="height"
                @echangeReturn="getChinaEchartStatus"
              />
            </div>
          </dv-border-box-12>
        </div>
      </div>
      <div class="middle-middle">
        <div class="middle-middle-top">
          <World
            style="height:90%"
            class="echangeItems1 overflow_none"
            :width="width"
            :height="height"
            @echangeReturn="getWorldEchartStatus"
          />
          <div class="middle-middle-bottom">
            <dv-decoration-11 style="width:auto;height:20px;flex-direction:row">服务器状态</dv-decoration-11>
            <div
              style="display: flex;flex-direction:row;margin:10px 30px;flex-wrap: wrap;justify-content:center"
            >
              新闻服务：
              <div class="status_div" :style="{ backgroundColor: newsServerStatus}"></div>&nbsp;汇率服务：
              <div class="status_div" :style="{ backgroundColor: exchangeEchartStatus}"></div>&nbsp;世界数据：
              <div class="status_div" :style="{ backgroundColor: worldEchartStauts}"></div>&nbsp;中国数据：
              <div class="status_div" :style="{ backgroundColor: chinaEchartStatus}"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle-right">
        <dv-border-box-11 class="height_700" title="News Report">
          <div class="news_box_div">
            <News class="newsItems" @newsReturn="getMyNewsStatus" />
          </div>
        </dv-border-box-11>
      </div>
    </div>
  </div>
</template>

<script>
import News from "./newsReportV1/newsView/NewsIndex";
import Exchange from "./exchangeV1/exchange";
import China from "./exchangeV1/China";
import World from "./exchangeV1/world";
export default {
  components: {
    News,
    Exchange,
    China,
    World
  },
  data() {
    return {
      width: "100%",
      height: "100%",
      newsServerStatus: "red",
      exchangeEchartStatus: "red",
      chinaEchartStatus: "red",
      worldEchartStauts: "red"
    };
  },
  methods: {
    jumpTo(params) {
      this.$router.push({ path: params });
    },
    getMyNewsStatus(a) {
      if (a == 0) {
        this.newsServerStatus = "yellow";
      } else if (a == 1) {
        this.newsServerStatus = "aquamarine";
      } else {
        this.newsServerStatus = "red";
      }
    },
    getMyEchartStatus(a) {
      if (a == 0) {
        this.exchangeEchartStatus = "yellow";
      } else if (a == 1) {
        this.exchangeEchartStatus = "aquamarine";
      } else {
        this.exchangeEchartStatus = "red";
      }
    },
    getChinaEchartStatus(a) {
      if (a == 0) {
        this.chinaEchartStatus = "yellow";
      } else if (a == 1) {
        this.chinaEchartStatus = "aquamarine";
      } else {
        this.chinaEchartStatus = "red";
      }
    },
    getWorldEchartStatus(a) {
      if (a == 0) {
        this.worldEchartStauts = "yellow";
      } else if (a == 1) {
        this.worldEchartStauts = "aquamarine";
      } else {
        this.worldEchartStauts = "red";
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.border-box-content {
  padding: 0 !important;
}
.middle-middle-top {
  height: 100%;
  width: 100%;
}
.middle-middle-bottom {
  height: 10%;
  color: white;
}
.buttonList_button {
  height: 2rem;
  width: 5rem;
  color: rgb(255, 255, 255);
  border: 2px #3f96a5 solid;
  background-color: #141e66;
  transform: skew(30deg);
}
.buttonList_button1 {
  height: 2rem;
  width: 5rem;
  color: rgb(255, 255, 255);
  border: 2px #3f96a5 solid;
  background-color: #141e66;
  transform: skew(-30deg);
}
.buttonList_button_span {
  display: inline-block;
  transform: skew(-30deg);
}
.buttonList_button_span1 {
  display: inline-block;
  transform: skew(30deg);
}
.status_div {
  width: 1rem;
  height: 1rem;
  border: 1px solid white;
  border-radius: 1rem;
  background-color: red;
}
.buttonList {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 20px;
}
.transform180 {
  transform: rotate(180deg);
  width: 5px;
  height: 100%;
}

.screen-homeOfAll {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: calc(100vh - 84px); */
  height: 100vh;
  background-image: url("../assets/bg.001.png");
  background-size: 100% 100%;
  /* background-color: black; */
}
.tittle-center {
  position: absolute;
  font-size: 30px;
  color: white;
  font-weight: 700;
  left: 50%;
  top: 15px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.top-screen {
  height: 10%;
  display: flex;
  justify-content: space-around;
}
.middle-screen {
  display: flex;
  flex-direction: row;
  height: 90%;
}
.middle-left {
  width: 25%;
}
.middle-left-item {
  width: 100%;
  height: 50%;
}
.middle-middle {
  width: 50%;
}
.middle-right {
  width: 25%;
}
.news_box_div {
  height: calc(100% - 70px);
  padding: 50px 0px 10px 30px;
}
.newsItems {
  color: white;
  height: 100%;
  margin-right: 15px;
  overflow-y: auto;
}
.echangeItems {
  color: white;
  margin: 10px 0 0 10px;
  height: 100%;
  width: 100%;
}
.echangeItems1 {
  color: white;
  margin: 10px 0 0 0;
  height: 100%;
  width: 100%;
}
.overflow_none {
  overflow: hidden;
}
.pageTopTittle {
  width: 34%;
  height: 100%;
  color: white;
  font-size: 2rem;
  margin-top: 10px;
}
.border-box-content {
  padding: 20px;
  display: flex;
  flex-direction: row;
}
@media screen and (max-width: 900px) {
  .middle-middle-top {
    height: 350px;
    width: 100%;
  }
  .middle-middle-bottom {
    height: 50px;
    color: white;
  }
  .transform180 {
    display: none;
  }
  .border-box-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  .height_700 {
    height: 700px;
  }
  .height800 {
    height: 800px;
  }
  .tittle-center {
    display: none;
  }
  .screen-homeOfAll {
    overflow-y: auto;
  }
  .pageTopTittle {
    width: 30%;
    height: 40px;
  }
  .middle-screen {
    display: flex;
    flex-direction: column;
    height: 1900px;
  }
  .middle-left {
    width: 100%;
    height: 800px;
  }
  .middle-left-item {
    width: 100%;
    height: 50%;
  }
  .middle-middle {
    width: 100%;
    height: 400px;
  }
  .middle-right {
    width: 100%;
    height: 700px;
  }
}
</style>
