<template>
<el-row>
  <el-col :offset="4" :span="16" style="margin-top: 15px;margin-bottom: 10px">
    <el-col :span="5">
      <router-link to="/">
        <img width="133px" height="50px" src="../assets/logo.png" alt="logo"/>
      </router-link>
    </el-col>
    <el-col :span="15">
      <el-input type="search"  placeholder="搜索心仪的商品" style="border-radius: 7px">
        <i slot="suffix"  class="el-icon-search" style="margin-top: 13px;margin-bottom: 10px" @click="handleClick"/>
      </el-input>
    </el-col>
  </el-col>
</el-row>
</template>

<script>
export default {
  name: "search",
  methods:{
    handleClick(){
      alert("点击了搜索！")
    }
  }
}
</script>

<style scoped>

</style>