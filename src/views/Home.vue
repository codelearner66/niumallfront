<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button @click="handleclick" >点我</el-button>
    <amtest/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {postRequest} from "@/apis/api";
import router from "@/router";
import Cookies from 'js-cookie'
import store from "@/store";
import amtest from "@/components/amtest";
export default {
  name: 'Home',
  components: {
    HelloWorld,
    amtest
  },
  data() {
    return {

    }
  },
  methods:{
    handleclick(){
      // postRequest("/login",{
      //   userName:"ccx",
      //   password:"123456"
      // }).then(respon=>{
      //   console.log("回调结果：  ",respon);
      //   if(respon.code==200){
      //     Cookies.set("token",respon.data.token, { expires: 7 });
      //     store.commit('increment')
      //    router.push("login");
      //   }
      // })
    }
  }
}
</script>
