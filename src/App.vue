<template>
  <div id="app">
    <headers/>
    <router-view/>
    <hr style=" height:1px;border-left:none; border-bottom:none;border-top:1px solid #becdd8;margin-top: 20px;margin-bottom: 20px;"/>
    <footerNav/>
  </div>
</template>
<script>
import headers from "@/components/header";
import footerNav from "@/components/footerNav";

export default {
  name: 'app',
  components: {
    headers,
    footerNav
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
