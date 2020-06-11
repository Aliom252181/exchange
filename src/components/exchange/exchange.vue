
<template>
  <div class="news-container">
    <div id="chartLineBox"></div>
  </div>
</template>

<script>
import { exChange } from "../exchange/api/exchangeApi";
import echarts from "echarts";
export default {
  name: "exChange",
  data() {
    return {
      title: "",
      exchangeRate1: [],
      exchangeRate2: [],
      date: [],
      list: undefined
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
      exChange.exChangeList(param).then(res => {
        var resData = res.data.data;

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
          res.data.data[i].id = Y + M + D + h + m;
        }
        this.list = resData;

        // 将接口的数据处理并返回给图表
        for (var i = 0; i < this.list.length; i++) {
          this.exchangeRate1.push(this.list[i].USDCNH); //美元兑换离岸人民币汇率
          this.exchangeRate2.push(this.list[i].USDCNY); //美元兑换在岸人民币汇率
          this.date.push(this.list[i].id);
        }

        //1.通过id获取html元素，调用echarts的init（）方法进行初始化
        this.chartLine = echarts.init(document.getElementById("chartLineBox"));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "美元兑换人民币汇率",
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
            right: "2%",
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
            data: this.date,
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
            // min: "dataMin",
            max: 7.152,
            min: 7.080,
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
              name: "美元兑换离岸人民币汇率",
              type: "line",
              data: this.exchangeRate1,
              symbol: "none",
              itemStyle: {
                normal: {
                  color: "#00FF00",
                  lineStyle: {
                    color: "#00FF00"
                  }
                }
              }
            },
            {
              name: "美元兑换在岸人民币汇率",
              type: "line",
              data: this.exchangeRate2,
              symbol: "none",
              itemStyle: {
                normal: {
                  color: "#FF1493",
                  lineStyle: {
                    color: "#FF1493"
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
            document.getElementById("chartLineBox")
          );
          this.chartLine.resize();
        });
      });
    }
  },
  computed: {}
};
</script>
<style scoped lang="less" src="./resources/css/style.less"></style>

