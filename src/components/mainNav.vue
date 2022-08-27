<template>
  <el-row>
    <el-col :offset="3" :span="18" class="common" style="box-shadow: #5d5c5c 0 0 10px">
      <!--    侧边导航-->
      <el-col :span="3" class="common">
        <h5 style="color: tomato">主题市场</h5>
        <el-col :span="24" v-for="(item,index) in navData" :key="index">
          <router-link class="main_nav" :to="{path:path[index]}" style="text-decoration: none">
            {{ item.goodsCategoryName }}
          </router-link>
        </el-col>
      </el-col>
      <!--    轮播导航-->
      <el-col :span="17" class="common" style="background-color: #e8e6e6;">
        <el-carousel type="card" :interval="5000" height="450px">
          <el-carousel-item v-for="(item,index) in slideShow" :key="index">
            <router-link :to="{name:'goodsDetails',params:{id:slideShowPath[index]}}">
              <img :src="item" style="width: 100%;height: 100%" alt="轮播图">
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <!--    头像/公告-->
      <el-col :span="4" style=" height: 400px">
        <el-col :span="24" style="margin-top: 45px">
          <el-avatar shape="square" :size="50" :src="headerPath" fit="fill"></el-avatar>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <router-link class="main_nav" to="/myInfor" style="font-size: x-small">Hi: {{ this.userInfor.nickName }}
          </router-link>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <el-col :span="24" style="font-size:xx-small;text-align: left">
            <span style="color: tomato;font-size: medium;padding-left: 10px; ">公告: </span>新鲜事儿都在这里～ <br>
            <el-col :span="24" style="margin-top: 8px">
              <el-tag size="mini" type="danger">消息</el-tag>
              <el-link type="info"
                       :underline="false"
                       style="margin-left: 8px;
                            width:70%;
                                   line-height: 25px;
                                   white-space: nowrap;
                                   overflow: hidden;
                                   text-overflow: ellipsis;
                                   font-size: 5pt;"
                       :show-overflow-tooltip="true">
                <marquee>信息链接信息链接信息链接信信息信息息链接</marquee>
              </el-link>
            </el-col>

          </el-col>

          <el-divider/>
          <el-col :span="24">

          </el-col>
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import {getRequest} from "@/apis/api";

export default {
  name: "mainNav",
  data() {
    return {
      isCollapse: true,
      navData: [],
      path: [],
      userInfor: {},
      headerPath: '',
      slideShow: [],
      slideShowPath: []
    };
  },
  created() {
    this.getNavData();
    this.getUserInfor();
    this.getSlideShow();
  },
  methods: {
    //获取分类导航
    getNavData() {
      getRequest("/getRootCategory", {}).then(response => {
        this.navData = response.data;
        for (let i = 0; i < this.navData.length; i++) {
          this.path.push("/Category/" + this.navData[i].id);
        }
      }).catch(error => {
        this.$message(error.msg);
      })
    },
    //获取用户信息
    getUserInfor() {
      getRequest("/getUserInfor", {}).then(response => {
        this.userInfor = response.data;
        this.headerPath = this.userInfor.avatar;
        console.log(this.headerPath)
      })
    },
    //获取轮播图
    getSlideShow() {
      getRequest("/getSlideShows", {}).then(response => {
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
          this.slideShow.push(data[i].imageUrl);
          this.slideShowPath.push(data[i].gId);
        }

        console.log(response.data);
      })
    }
  }
}
</script>

<style scoped>
.common {
  height: 450px;
}

.main_nav {
  color: #2c3e50;
  text-decoration: none;
  line-height: 40px;
}

.main_nav:hover {
  color: #de4949;
}

.el-carousel__item h3 {
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
</style>