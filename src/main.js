import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPaperPlane,
  faBars,
  faComments,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPaperPlane, faBars, faComments, faArrowLeft);

Vue.component("font-awesome", FontAwesomeIcon);
Vue.use(router);

Vue.directive("click-outside", {
  bind: function(el, binding, vnode) {
    el.eventSetDrag = function() {
      el.setAttribute("data-dragging", "yes");
    };
    el.eventClearDrag = function() {
      el.removeAttribute("data-dragging");
    };
    el.eventOnClick = function(event) {
      var dragging = el.getAttribute("data-dragging");
      // Check that the click was outside the el and its children, and wasn't a drag
      if (!(el == event.target || el.contains(event.target)) && !dragging) {
        // call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.addEventListener("touchstart", el.eventClearDrag);
    document.addEventListener("touchmove", el.eventSetDrag);
    document.addEventListener("click", el.eventOnClick);
    document.addEventListener("touchend", el.eventOnClick);
  },
  unbind: function(el) {
    document.removeEventListener("touchstart", el.eventClearDrag);
    document.removeEventListener("touchmove", el.eventSetDrag);
    document.removeEventListener("click", el.eventOnClick);
    document.removeEventListener("touchend", el.eventOnClick);
    el.removeAttribute("data-dragging");
  }
});
Vue.directive("$model", {
  bind: function(el, binding, vnode) {
    el.oninput = () => (vnode.context[binding.expression] = el.value);
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
