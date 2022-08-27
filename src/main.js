import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
//简单动画
import 'animate.css/animate.min.css'
import './assets/icon/iconfont.css'

Vue.config.errorHandler=function (err) {
  console.log("global", err);
  message.error("出错了");
}
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')