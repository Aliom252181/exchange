<template>
  <div>
    <div id="china_map" ref="chinaMap" style="height:400px;width:450px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china";
export default {
  data() {
    return { echartData: 1 }; //假数据，等待功能
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
  methods: {
    init() {
      const self = this; //因为箭头函数会改变this指向，指向windows。所以先把this保存
      setTimeout(() => {
        window.onresize = function() {
          self.chart = echarts.init(self.$refs.chinaMap);
          self.chart.resize();
        };
      }, 20);
    },
    drawChinaMap() {
      this.$emit("echangeReturn", 0);
      if (!this.echartData || this.echartData == 0 || this.echartData == "") {
        this.$emit("echangeReturn", -1);
      } else {
        this.$emit("echangeReturn", 1);
      }
      // 初始化echarts实例
      this.chinachart = echarts.init(document.getElementById("china_map"));
      // 进行相关配置
      this.chartOption = {
        tooltip: {
          // 鼠标移到图里面的浮动提示框
          formatter(params, ticket, callback) {
            // params.data 就是series配置项中的data数据遍历
            let localValue, perf, downloadSpeep, usability, point;
            if (params.data) {
              localValue = params.data.value;
              perf = params.data.perf;
              downloadSpeep = params.data.downloadSpeep;
              usability = params.data.usability;
              point = params.data.point;
            } else {
              // 为了防止没有定义数据的时候报错写的
              localValue = 0;
              perf = 0;
              downloadSpeep = 0;
              usability = 0;
              point = 0;
            }
            let htmlStr = `
          <div style='font-size:16px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:2px;'>
	          区域数据：${localValue}<br/>
	          性能：${perf}<br/>
	          下载速度：${downloadSpeep}<br/>
	          可用性：${usability}<br/>
	          监测点数：${point}<br/>
          </p>
        `;
            return htmlStr;
          },
          backgroundColor: "rgba(115,134,252, 0.5)", //提示标签背景颜色
          textStyle: { color: "#fff" } //提示标签字体颜色
        },
        visualMap: {
          // 左下角的颜色区域
          type: "piecewise", // 定义为分段型 visualMap
          min: 0,
          max: 1000,
          itemWidth: 15,
          bottom: 5,
          left: 5,
          textStyle: { color: "#fff" }, //提示字体颜色
          pieces: [
            // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
            { gt: 900, lte: 1000, label: "好", color: "#6ad86e" }, // (900, 1000]
            { gt: 500, lte: 900, label: "正常", color: "#9adcfa" }, // (500, 900]
            { gt: 310, lte: 500, label: "警告", color: "#ffeb3b" }, // (310, 500]
            { gt: 200, lte: 300, label: "较差", color: "#ff9800" }, // (200, 300]
            { gt: 10, lte: 200, label: "差", color: "orangered" }, // (10, 200]
            { value: 0, label: "无数据", color: "#999" } // [0]
          ]
        },
        geo: {
          // 地理坐标系组件用于地图的绘制
          map: "china", // 表示中国地图
          roam: true, // 是否开启鼠标缩放和平移漫游
          zoom: 1.0, // 当前视角的缩放比例（地图的放大比例）
          label: {
            show: false
          },
          itemStyle: {
            // 地图区域的多边形 图形样式。
            borderColor: "rgba(115,134,252, 0.5)",
            emphasis: {
              // 高亮状态下的多边形和标签样式
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
              shadowColor: "rgba(115,134,252, 1)"
            }
          }
        },
        series: [
          {
            name: "", // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
            type: "map",
            geoIndex: 0,
            label: {
              show: true
            },
            // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
            data: [
              {
                name: "北京",
                value: 599,
                perf: "0.501s", // 性能
                downloadSpeep: "1.221MB/s", // 下载速度
                usability: "100%", // 可用性
                point: "250" // 监测点
              },
              {
                name: "上海",
                value: 142
              },
              {
                name: "黑龙江",
                value: 44
              },
              {
                name: "新疆",
                value: 999,
                perf: "0.501s", // 性能
                downloadSpeep: "1.221MB/s", // 下载速度
                usability: "100%", // 可用性
                point: "250" // 监测点
              },
              {
                name: "深圳",
                value: 92
              },
              {
                name: "湖北",
                value: 810
              },
              {
                name: "四川",
                value: 453
              }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示地图数据
      this.chinachart.setOption(this.chartOption);
    }
  },
  mounted() {
    this.drawChinaMap();
    init();
    setInterval(this.drawChinaMap, 5000);
  }
};
</script>
<style scoped>
</style>