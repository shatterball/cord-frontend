import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.directive('$model', {
  bind: function(el, binding, vnode) {
    el.oninput = () => (vnode.context[binding.expression] = el.value);
  },
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
