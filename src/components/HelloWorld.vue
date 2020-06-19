<template>
  <div class="home-container">
    <div class="home-top">
      <div class="home-top-logo">
          <img  :src="logoImg" alt="">
      </div>
      <div class="home-top-router">
        <span class="home-top-router-text" @click="toAliom()">Aliom</span>
        <span class="home-top-router-text" @click="toAisw()">Aisw</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      logoImg:"http://image.greenchoicechina.com/2020/03/23/1c8fb07d-2b5b-4d8d-b20f-d27517f0021d.png"
    }
  },
  methods:{
    toAliom(){
      this.$router.push("/Aliom");
    },
    toAisw(){
      this.$router.push("/Aisw");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-container{
  padding: 20px 50px;
  }
  .home-top-router{
    margin-top: 50px;
  }
  .home-top-router-text{
    display: inline-block;
    position: relative;
    padding: 10px 30px;
    margin: 45px 0;
    color: #21ebff;
    font-size: 20px;
    text-transform: uppercase;
    transition: 0.5s;
    overflow: hidden;
  }
  .home-top-router-text:hover{
    background: #21ebff;
    color: #fff;
    box-shadow: 0 0 50px #21ebff;
    transition-delay:0.2s;
  }
  .home-top-router-text:nth-child(1){
    filter: hue-rotate(115deg);
  }
   .home-top-router-text:nth-child(2){
    filter: hue-rotate(270deg);
    margin-left: 100px;
  }
  .home-top-router-text::before{
    content:'';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid #21ebff;
    border-left: 2px solid #21ebff;
    transition: 0.1s;
    transition-delay:0.2s ;
  }

.home-top-router-text:hover::before{
  width: 100%;
  height: 100%;
  transition-delay: 0.2s;
}

  .home-top-router-text::after{
    content:'';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #21ebff;
    border-right: 2px solid #21ebff;
    transition: 0.1s;
    transition-delay:0.2s ;
  }
  .home-top-router-text:hover::after{
  width: 100%;
  height: 100%;
  transition-delay:0s ;
}
</style>
