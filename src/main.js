import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

//引入组件库
// import jvuewheel from '@jyeontu/jvuewheel'
// //引入样式 评论组件
// import '@jyeontu/jvuewheel/lib/jvuewhell.css'
//简单动画
import 'animate.css/animate.min.css'
import './assets/icon/iconfont.css'
import JwChat from 'jwchat';
/* 在 0.2.041 之前的版本需要引入 css */
// import 'jwchat/lib/JwChat.css';

Vue.config.errorHandler = function (err) {
    console.log("global", err);
    //Message.error("出错了");
}
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(JwChat);
//评论组件
// Vue.use(jvuewheel);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')