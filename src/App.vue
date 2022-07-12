<template>
  <div id="app">
    <headers/>
    <router-view/>
    <el-divider></el-divider>
    <div style="width: 100%;height: 100px; color: antiquewhite"></div>
  </div>

</template>
<script>
import headers from "@/components/header";
export  default {
  name:'app',
  components:{
    headers
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
el-divider{
  color: #de4949;
}
</style>
