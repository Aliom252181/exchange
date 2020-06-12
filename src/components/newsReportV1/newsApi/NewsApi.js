import axios from "axios";
import { timeStampTurnTime } from "../newsUtil/TimeStampTurnTime";

//金融新闻
export function findData(params) {
  return axios
    .get("/api/news")
    .then(response => {
      let res = response.data;
      // let country = [
      //   { countryName: "中国", local: "104.195397,35.86166" },
      //   { countryName: "美国", local: "-95.712891,37.09024" },
      //   { countryName: "日本", local: "138.252924,36.204824" },
      //   { countryName: "菲律宾", local: "121.774017,12.879721" },
      //   { countryName: "台湾", local: "104.195397,35.86166" },
      //   { countryName: "英国", local: "-3.435973,55.378051" },
      //   { countryName: "加拿大", local: "-106.346771,56.130366" },
      //   { countryName: "新西兰", local: "174.885971,-40.900557" },
      //   { countryName: "俄罗斯", local: "105.318756,61.52401" }
      // ];
      for (let i = 0; i < res.length; i++) {
        res[i].updated_at = timeStampTurnTime(res[i].updated_at);
      }
      return res;
    })
    .catch(function() {
      return 0;
      console.log(" findData-API:error");
    });
}

//微博热点
export function findWeiboHot(params) {
  return axios
    .get("/api/Weibo")
    .then(response => {
      let res = response.data;
      for (let i = 0; i < res.length; i++) {
        if (res[i].hotValue.search("热度") == -1) {
          res[i].hotValue = res[i].hotValue + " 热度";
        }
      }
      return res;
    })
    .catch(function() {
      return 0;
      console.log("findWeiboHot-API:error");
    });
}

//汇率查询
export function findExchangeRate(params) {
  return axios
    .get("/api/exchangeRate")
    .then(response => {
      let res = response.data.data;
      return res;
    })
    .catch(function() {
      return 0;
      console.log("findExchangeRate-API:error");
    });
}
