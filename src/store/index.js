import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    islogin: false,
    messageCount: 0
  },
  mutations: {
    increment(state) {
      state.islogin = true
    },
    noLogin(state) {
      state.islogin = false
    },
    setMessageCount(state, num) {
      state.messageCount = num;
    },
    setMessageCount1(state, num) {
      state.messageCount = parseInt(state.messageCount) + num;
    }
  },
  getters: {
    getIsLogin(state) {
      let token = Cookies.get("token");
      // console.log("stote中的token： ",token)
      return state.islogin || (token != undefined && token.length != 0 && token != '');
    },
    getMessageCount(state) {
      return state.messageCount;
    }
  },
  actions: {},
  modules: {
    // islogin:moduleLogin
  }
})
//全局登陆状态管理
// const moduleLogin ={
//   state:{
//     islogin: false
//   },
//   mutations:{
//     setLogin(state){
//       state.islogin=true
//     }
//   },
//   actions:{
//
//   },
//   getters:{
//
//   }
// }
