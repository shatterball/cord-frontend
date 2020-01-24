import Vue from "vue";
import VueRouter from "vue-router";
import LoginPane from "@/views/LoginPane.vue";
import MainPane from "@/views/MainPane.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPane
  },
  {
    path: "/",
    name: "main",
    component: MainPane
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
