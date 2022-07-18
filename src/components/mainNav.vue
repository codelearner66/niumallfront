<template>
<el-row>
  <el-col :offset="3" :span="18" style="height: 400px;box-shadow: #5d5c5c 0 0 10px">
         <el-col :span="3" style="height: 400px">
           <h5 style="color: tomato">主题市场</h5>
            <el-col :span="24" v-for="(item,index) in navData" :key="index">
              <router-link class="main_nav" :to="{path:path[index]}" style="text-decoration: none">{{item.goodsCategoryName}}</router-link>
            </el-col>
         </el-col>
         <el-col :span="17" style="background-color: #e5dfde; height: 400px">
           <el-carousel :interval="5000" height="400px">
             <el-carousel-item v-for="item in 4" :key="item">
               <h3>{{ item }}</h3>
             </el-carousel-item>
           </el-carousel>
         </el-col>
        <el-col :span="4"  style=" height: 400px">
           <el-col :span="24" style="margin-top: 45px">
             <el-avatar shape="square" :size="50" :src="headerPath" fit="fill"></el-avatar>
           </el-col>
          <el-col :span="24" style="margin-top: 20px">
            <router-link class="main_nav" to="/myInfor" style="font-size: x-small">Hi: {{this.userInfor.nickName}}</router-link>
          </el-col>
          <el-col :span="24" style="margin-top: 20px">
              <h5 style="color: tomato">公告</h5>
            <el-divider/>
          </el-col>
        </el-col>
  </el-col>
</el-row>
</template>

<script>
import {getRequest, postRequest} from "@/apis/api";

export default {
  name: "mainNav",
  data() {
    return {
      isCollapse: true,
      navData: [],
      path:[],
      userInfor:{},
      headerPath:''
    };
  },
  created() {
    this.getNavData();
    this.getUserInfor();
  },
  methods: {
    getNavData(){
      getRequest("/getRootCategory",{}).then(response=>{
       this.navData= response.data;
        for (let i = 0; i < this.navData.length; i++) {
          this.path.push("/Category/"+this.navData[i].id);
        }
      }).catch(error=>{
        this.$message(error.msg);
      })
    },

    getUserInfor(){
      getRequest("/getUserInfor",{}).then(response=>{
        this.userInfor=response.data;
        this.headerPath=this.userInfor.avatar;
        console.log(this.headerPath)
      })
    }
  }
}
</script>

<style scoped>
.main_nav{
  color: #2c3e50;
  text-decoration: none;
  line-height: 40px;
}

.main_nav:hover{
  color: #de4949;
}
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