<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button @click="handleclick" >点我</el-button>
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {}
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
