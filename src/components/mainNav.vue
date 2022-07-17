<template>
<el-row>
  <el-col :offset="3" :span="18" style="background-color: tomato; height: 400px;box-shadow: #5d5c5c 0 0 10px">
         <el-col :span="3" style="background-color: #ff5099; height: 400px">

         </el-col>
         <el-col :span="17" style="background-color: #e5dfde; height: 400px">
           <el-carousel :interval="5000" height="400px">
             <el-carousel-item v-for="item in 4" :key="item">
               <h3>{{ item }}</h3>
             </el-carousel-item>
           </el-carousel>
         </el-col>
        <el-col :span="4"  style="background-color: tomato; height: 400px">

        </el-col>
  </el-col>
</el-row>
</template>

<script>
export default {
  name: "mainNav",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {

  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>