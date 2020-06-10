<template>
  <div class="homeIndex_box">
    <dv-loading v-if="!echartData">Loading...</dv-loading>
    <div id="charts" :class="className" :style="{height:height,width:width}" ref="myEchart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { findEchartsData } from "./exchangeApi/exchangeApi";
import { timeStampTurnTime } from "./exchangeUtil/TimeStampTurnTime";
export default {
  data() {
    return {
      echartData: undefined,
      dataArrX: [],
      dataArrY_USDCNH: [],
      dataArrY_USDCNY: []
    };
  },
  props: {
    className: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "500px"
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  components: {
    echarts
  },
  mounted() {
    this.darwEcharts();
    this.init();
    setInterval(this.darwEcharts, 5000);
  },
  methods: {
    init() {
      const self = this; //因为箭头函数会改变this指向，指向windows。所以先把this保存
      setTimeout(() => {
        window.onresize = function() {
          self.chart = echarts.init(self.$refs.myEchart);
          self.chart.resize();
        };
      }, 20);
    },
    async darwEcharts() {
      this.echartData = await findEchartsData();

      this.$emit("echangeReturn", 0);
      if (!this.echartData || this.echartData == 0 || this.echartData == "") {
        this.$emit("echangeReturn", -1);
      } else {
        this.$emit("echangeReturn", 1);
      }

      this.dataArrX.length = 0;
      this.dataArrY_USDCNY.length = 0;
      this.dataArrY_USDCNH.length = 0;

      for (let i = 0; i < this.echartData.length; i++) {
        this.dataArrX.push(timeStampTurnTime(this.echartData[i].id));
        this.dataArrY_USDCNH.push(this.echartData[i].USDCNH);
        this.dataArrY_USDCNY.push(this.echartData[i].USDCNY);
      }

      this.$emit("echangeNow", [
        this.echartData[this.echartData.length - 1].USDCNY,
        this.echartData[this.echartData.length - 1].USDCNH
      ]);

      this.chart = echarts.init(this.$refs.myEchart);

      var colors = ["#000000", "#5793f3", "#d14a61", "#675bba"];
      var option = {
        title: {
          top: "2%",
          left: "8%",
          text: "汇率图",
          textStyle: {
            color: "#FFFFFF"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          right: "2%"
        },
        legend: {
          top: "1%",
          right: "10%",
          data: ["汇率"]
        },
        xAxis: {
          type: "category",
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[1]
            }
          },
          axisPointer: {
            label: {
              formatter: function(params) {
                return "日期" + params.value;
              }
            }
          },
          data: this.dataArrX
        },
        yAxis: {
          type: "value",
          min: "dataMin",
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[1]
            }
          }
        },
        series: [
          {
            name: "离岸人民币",
            type: "line",
            data: this.dataArrY_USDCNH,
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#e43927",
                lineStyle: {
                  color: "#e43927"
                }
              }
            }
          },
          {
            name: "在岸人民币",
            type: "line",
            data: this.dataArrY_USDCNY,
            symbol: "none",
            itemStyle: {
              normal: {
                color: "rgb(68,86,199)",
                lineStyle: {
                  color: "rgb(68,86,199)"
                }
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option);
    }
  }
};
</script>
