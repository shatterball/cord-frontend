import Vue from "vue";
import VueRouter from "vue-router";
import LoginPane from "@/views/LoginPane.vue";
import MainPane from "@/views/MainPane.vue";
import RegisterPane from "@/views/RegisterPane";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPane
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPane
  },
  {
    path: "/",
    name: "root",
    component: MainPane
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
