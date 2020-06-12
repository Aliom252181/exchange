<template>
  <el-row :gutter="40" class="panel-group" style="margin:0">
    <el-col :xs="12" :sm="12" :lg="6" style="padding:0;text-align: center;">
      <div class="card-panel-description">
        <div class="card-panel-text" style=" color: #b9b9b9;">New Visits</div>
        <count-to
          :start-val="0"
          :end-val="102400"
          :duration="2600"
          style=" margin-top: 5px;
                display: inline-block;
                font-size: 30px;
                color: #FFEB3B;"
          class="card-panel-num"
        />
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" style="padding:0;text-align: center;">
      <div class="card-panel-description">
        <div class="card-panel-text" style=" color: #b9b9b9;">Messages</div>
        <count-to
          :start-val="0"
          :end-val="81212"
          :duration="3000"
          class="card-panel-num"
          style=" margin-top: 5px;
                display: inline-block;
                font-size: 30px;
                color: #ff9800;"
        />
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" style="padding:0;text-align: center;">
      <div class="card-panel-description">
        <div class="card-panel-text" style=" color: #b9b9b9;">Purchases</div>
        <count-to
          :start-val="0"
          :end-val="9280"
          :duration="3200"
          class="card-panel-num"
          style=" margin-top: 5px;
                display: inline-block;
                font-size: 30px;
                color: #f3501c;"
        />
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" style="padding:0;text-align: center;">
      <div class="card-panel-description">
        <div class="card-panel-text" style=" color: #b9b9b9;">Shoppings</div>
        <count-to
          :start-val="0"
          :end-val="13600"
          :duration="3600"
          class="card-panel-num"
          style=" margin-top: 5px;
                display: inline-block;
                font-size: 30px;
                color: #02e2ff;"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>
<style  scoped>
.panel-group {
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: space-around;
}
.panel-group .card-panel {
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
}
.panel-group .card-panel:hover .card-panel-icon-wrapper {
  color: #fff;
}
.panel-group .card-panel:hover .icon-people {
  background: #40c9c6;
}
.panel-group .card-panel:hover .icon-message {
  background: #36a3f7;
}
.panel-group .card-panel:hover .icon-money {
  background: #f4516c;
}
.panel-group .card-panel:hover .icon-shopping {
  background: #34bfa3;
}
.panel-group .card-panel .icon-people {
  color: #40c9c6;
}
.panel-group .card-panel .icon-message {
  color: #36a3f7;
}
.panel-group .card-panel .icon-money {
  color: #f4516c;
}
.panel-group .card-panel .icon-shopping {
  color: #34bfa3;
}
.panel-group .card-panel .card-panel-icon-wrapper {
  float: left;
  margin: 14px 0 0 14px;
  padding: 16px;
  transition: all 0.38s ease-out;
  border-radius: 6px;
}
.panel-group .card-panel .card-panel-icon {
  float: left;
  font-size: 48px;
}
.panel-group .card-panel .card-panel-description {
  float: right;
  font-weight: bold;
  margin: 26px;
  margin-left: 0px;
}
.panel-group .card-panel .card-panel-description .card-panel-text {
  line-height: 18px;
  color: #b9b9b9;
  font-size: 16px;
  margin-bottom: 12px;
}
.panel-group .card-panel .card-panel-description .card-panel-num {
  margin-top: 5px;
  display: inline-block;
  font-size: 30px;
  color: #ffeb3b;
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
  }
  .card-panel-icon-wrapper .svg-icon {
    display: block;
    margin: 14px auto !important;
    float: none !important;
  }
}
</style>