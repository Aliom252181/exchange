import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import AliomIndex from "@/components/IndexAliom";
import AiswIndex from "@/components/IndexAisw";
import DataV from "@jiaminghi/data-view";

Vue.use(Router);
Vue.use(DataV);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/Aliom",
      name: "AliomIndex",
      component: AliomIndex
    },
    {
      path: "/Aisw",
      name: "AiswIndex",
      component: AiswIndex
    }
  ]
});
