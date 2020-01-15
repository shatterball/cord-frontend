import Vue from "vue";
import Router from "vue-router";
import MainPane from "@/components/MainPane";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/main",
      name: "mainPane",
      component: MainPane
    }
  ]
});
