<style scoped src="./resources/css/style.css"></style>
<template>
  <div class="globalTrends-container">
    <div class="globalTrends-container-top">
      <span>美元指数</span>
      <span class="globalTrends-container-top-value">{{UsDollarIndex}}</span>
    </div>
    <div id="chartLineContainer"></div>
  </div>
</template>

<script>
import { globalTrends } from "../globalTrends/api/globalTrendsApi";
import echarts from "echarts";
export default {
  data() {
    return {
      title: "",
      xData: [], //横坐标数据
      yData: [], //纵坐标数据
      list: [], //存放res返回的数据
      UsDollarIndex: "" //美元指数
    };
  },
  components: {},
  mounted() {
    this.getChart();
  },
  created() {},
  methods: {
    getChart() {
      let param = {};
      globalTrends.globalTrendsList(param).then(res => {
        console.log(res.data)
        var resData = res.data;
        this.UsDollarIndex = resData[0].c;
        resData.splice(22, 1);
        resData.splice(0, 1);
        console.log(resData);

        // 将时间戳处理成标准时间格式
        for (var i = 0; i < resData.length; i++) {
          var date = new Date(resData[i].id); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + "/";
          var M =
            (date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1) + "/";
          var D =
            (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
          var h =
            (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
            ":";
          var m =
            date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes();
          // var s = date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds();
          resData[i].t = Y + M + D + h + m;

          this.list.push(resData[i]);
        }

        // 将接口的数据处理并返回给图表
        this.list.forEach((item,index) => {
          item.name = item.name.trim();
          if(item.name != "" || item.name == null){
             this.xData.push(item.name); //名称
              this.yData.push(item.c); //数值
          }
        });

        //1.通过id获取html元素，调用echarts的init（）方法进行初始化
        this.chartLine = echarts.init(
          document.getElementById("chartLineContainer")
        );

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "",
            textStyle: {
              fontSize: 18,
              color: "#fff"
            },
            textAlign: "left"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross"
            }
          },
          grid: {
            right: "50px",
            left: "50px"
          },
          legend: {
            right: "10",
            data: [
              {
                name: "汇率",
                // 强制设置图形为圆。
                icon: "circle",
                // 设置文本为红色
                textStyle: {
                  color: "#ccc"
                }
              }
            ]
          },
          xAxis: {
            type: "category",
            data: this.xData,
            axisLine: {
              lineStyle: {
                color: "#ccc"
              },
              axisLabel: {
                interval: 50
              }
            }
          },
          yAxis: {
            type: "value",
            max: "dataMax",
            min: "dataMin",
            //boundaryGap: [0.2, 0.2],
            splitNumber: 10,
            //minInterval: 0.001
            axisLine: {
              lineStyle: {
                color: "#ccc"
              },
              axisLabel: {
                interval: 50
              }
            }
          },
          series: [
            {
              name: "汇率",
              type: "bar",
              data: this.yData,
              symbol: "none",
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: "top", //在上方显示
                    textStyle: {
                      //数值样式
                      color: "#fff",
                      fontSize: 8
                    }
                  },
                  //  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  //   color: function (params){
                  //       var colorList = ['#00bcd4','#f44336','#E91E63','#9C27B0','#9C27B0','#9C27B0','#03A9F4'];
                  //       return colorList[params.dataIndex];
                  //   },

                  color: "#00bcd4",
                  lineStyle: {
                    color: "#00bcd4"
                  }
                }
              }
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        this.chartLine.setOption(option);

        //监听窗口的改变，响应式的改变图表的大小
        window.addEventListener("resize", function() {
          this.chartLine = echarts.init(
            document.getElementById("chartLineContainer")
          );
          this.chartLine.resize();
        });
      });
    }
  },
  computed: {}
};
</script>

