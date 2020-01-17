import Vue from "vue";
import VueRouter from "vue-router";
import LoginPane from "@/views/LoginPane.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "loginPane",
    component: LoginPane
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
