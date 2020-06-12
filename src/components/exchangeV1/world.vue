<template>
  <div>
    <dv-loading v-if="!nameMap">Loading...</dv-loading>
    <div id="worldMap" ref="world_map" :style="{height:height,width:width}"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/world";
import { findWorldData } from "./exchangeApi/exchangeApi";
export default {
  data() {
    return { nameMap: undefined, dataArr: undefined };
  },
  props: {
    width: {
      type: String,
      default: "500px"
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  mounted() {
    this.drawChart();
    init();
    setInterval(this.drawChart, 5000);
  },
  beforeDestroy() {
    clearInterval(this.drawChart);
  },
  methods: {
    init() {
      const self = this; //因为箭头函数会改变this指向，指向windows。所以先把this保存
      setTimeout(() => {
        window.onresize = function() {
          self.chart = echarts.init(self.$refs.world_map);
          self.chart.resize();
        };
      }, 20);
    },
    async drawChart() {
      let name = this.nameMap;
      let data = this.dataArr;
      if (!name || name == "") {
        let data1 = await findWorldData();
        this.$emit("echangeReturn", 0);
        if (!data1 || data1 == 0 || data1 == "") {
          this.$emit("echangeReturn", -1);
        } else {
          this.$emit("echangeReturn", 1);
        }
        this.nameMap = data1.namemap;
        this.dataArr = data1.dataArr;

        name = this.nameMap;
        data = this.dataArr;
      }
      // console.log("+++++++++++++++++++++++++++");
      // console.log(name);
      // console.log(data);
      // 初始化echarts实例
      this.worldchart = echarts.init(document.getElementById("worldMap"));
      this.worldchart.on("click", function(params) {
        console.log(params);
      });
      // 进行相关配置
      this.chartOption = {
        tooltip: {
          // 鼠标移到图里面的浮动提示框
          formatter(params, ticket, callback) {
            // params.data 就是series配置项中的data数据遍历
            let Value;
            if (params.data) {
              Value = params.data.value;
            } else {
              // 为了防止没有定义数据的时候报错写的
              Value = 0;
            }
            let htmlStr = `
          <div style='font-size:16px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:2px;'>
	          区域数据：${Value}<br/>
          </p>
        `;
            return htmlStr;
          },
          backgroundColor: "rgba(115,134,252, 0.5)", //提示标签背景颜色
          textStyle: { color: "#fff" } //提示标签字体颜色
        },
        // visualMap: {
        //   // 左下角的颜色区域
        //   type: "piecewise", // 定义为分段型 visualMap
        //   min: 0,
        //   max: 1000,
        //   itemWidth: 15,
        //   bottom: 5,
        //   right: 5,
        //   textStyle: { color: "#fff" }, //提示字体颜色
        //   pieces: [
        //     // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
        //     { gt: 900000, lte: 2000000, label: "好", color: "#DCD800" }, // (900, 1000]
        //     { gt: 500000, lte: 900000, label: "正常", color: "#F9F400" }, // (500, 900]
        //     { gt: 3000, lte: 500000, label: "警告", color: "#FCF54C" }, // (310, 500]
        //     { gt: 200, lte: 3000, label: "较差", color: "#FEF889" }, // (200, 300]
        //     { gt: 1, lte: 200, label: "差", color: "#FFFAB3" }, // (10, 200]
        //     { value: 0, label: "无数据", color: "#FFFBD1" } // [0]
        //   ]
        // },
        geo: {
          // 地理坐标系组件用于地图的绘制
          map: "world",
          center: [30.8, 26.8],
          roam: true, // 是否开启鼠标缩放和平移漫游
          zoom: 2.0, // 当前视角的缩放比例（地图的放大比例）
          label: {
            show: false
          },
          emphasis: {
            // 高亮状态下的多边形和标签样式
            label: { show: false }
          },
          itemStyle: {
            // 地图区域的多边形 图形样式。
            borderColor: "rgba(115,134,252, 0.8)",
            borderWidth: 1,
            areaColor: "rgba(105,133,208,0.2)",
            shadowBlur: 10,
            shadowColor: "rgba(115,134,252, 1)",
            emphasis: {
              // 高亮状态下的多边形和标签样式
              shadowBlur: 10,
              shadowOffsetX: -15,
              shadowOffsetY: 10,
              areaColor: "#e0ffff",
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          nameMap: name
        },
        series: [
          {
            name: "", // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
            type: "map",
            geoIndex: 0,
            // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
            data: data
          }
        ]
      };
      // 使用刚指定的配置项和数据显示地图数据
      this.worldchart.setOption(this.chartOption);
    }
  }
};
</script>