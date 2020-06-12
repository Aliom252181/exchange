import axios from "axios";

//图表数据
export function findEchartsData() {
  return axios
    .get("/api/exchange")//http://localhost:8089/getexchangeCNY
    .then(response => {
      let res = response.data;
      res = res.data;
      return res;
    })
    .catch(function() {
      return "";
    });
}

//世界地图数据
export function findWorldData() {
  return axios
    .get("/api/findWorld")//http://localhost:8089/getWorld
    .then(res => {
      return res.data;
    })
    .catch(function() {
      return "";
    });
}
