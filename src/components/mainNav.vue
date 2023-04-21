<template>
  <el-row>
    <el-col :offset="3" :span="18" class="common" style="box-shadow: #5d5c5c 0 0 10px">
      <!--    侧边导航-->
      <el-col :span="3" class="common">
        <h5 style="color: tomato">主题市场</h5>
        <el-col :span="24" class="infinite-list" style="overflow-y: auto;height: 360px;">
          <el-col v-for="(item,index) in navData" :key="index" :span="24">
            <router-link :to="{path:path[index]}" class="main_nav" style="text-decoration: none;">
              {{ item.goodsCategoryName }}
            </router-link>
          </el-col>
        </el-col>
      </el-col>
      <!--    轮播导航-->
      <el-col :span="17" class="common" style="background-color: #e8e6e6;">
        <el-carousel :interval="5000" height="450px" type="card">
          <el-carousel-item v-for="(item,index) in slideShow" :key="index">
            <router-link :to="{name:'goodsDetails',params:{id:slideShowPath[index]}}">
              <img :src="item" alt="轮播图" style="width: 100%;height: 100%">
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <!--    头像/公告-->
      <el-col :span="4" style=" height: 400px">
        <el-col :span="24" style="margin-top: 45px">
          <el-avatar :size="50" :src="headerPath" alt="用户头像" fit="fill" shape="square"></el-avatar>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <router-link class="main_nav" style="font-size: x-small" to="/myInfo">Hi: {{ this.userInfor.nickName }}
          </router-link>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <el-col :span="24" style="font-size:xx-small;text-align: left">
            <span style="color: tomato;font-size: medium;padding-left: 10px; ">公告: </span>新鲜事儿都在这里～ <br>
            <el-col :span="24" style="margin-top: 8px">
              <el-tag size="mini" type="danger">消息</el-tag>
              <el-link :show-overflow-tooltip="true"
                       :underline="false"
                       style="margin-left: 8px;
                            width:70%;
                                   line-height: 25px;
                                   white-space: nowrap;
                                   overflow: hidden;
                                   text-overflow: ellipsis;
                                   font-size: 5pt;"
                       type="info">
                <marquee>当心电信诈骗，注意保护个人财产！
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  请勿向其他人泄露支付密码，不要轻易相信私人帐号。
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  预祝您购物愉快，阖家欢乐！
                </marquee>
              </el-link>
            </el-col>
            <el-col :span="24">
              <el-col v-for="(item,index) in notificationList" :key="index">
                <li style="line-height: 22px;list-style-type:none">
                  <a href='javaScript:void(0)' style="text-decoration: none;color: #de5a8d;padding-left: 5px"
                     @click='handleDialogNotification(item)'>
                    <span class='message-title'>{{ item.title }}</span>
                  </a>
                  <span style="float: right;margin-right: 5px">
                    <el-badge class="item" is-dot>
                    {{ Math.floor(Math.random() * 100000) }} <el-icon class="el-icon-view"></el-icon>
                  </el-badge>
                  </span>

                </li>
              </el-col>
              <el-drawer
                  :visible.sync="dialogNotificationVisible"
                  direction="rtl"
                  size="50%">
                <div style='width: 95%;margin:  0 auto'>
                  <mavon-editor
                      ref='mld'
                      :subfield='false'
                      :toolbarsFlag='false'
                      codeStyle='monokai'
                      default_open='preview'
                      style='min-height: 600px'
                      v-html='dialogNotificationData.html'
                  />
                </div>
                <template slot="title">
                  <span style="color: #de4949;font-size: 20px">公告</span>
                </template>
                <div class="demo-drawer__footer" style="margin-top: 40px;">
                  <div style="height: 30px;">
                    <el-button style="margin-left: 70px" type="primary" @click="handleDialogNotification">确 定
                    </el-button>
                  </div>

                </div>
              </el-drawer>
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
import {mavonEditor} from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
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
      slideShowPath: [],

      //预览对话框
      dialogNotificationVisible: false,
      //预览对话框数据
      dialogNotificationData: {},
      notificationList: [],
    };
  },
  created() {
    this.getNavData();
    this.getUserInfor();
    this.getSlideShow();
    getRequest('/getModifyNotification', {}).then(response => {
      if (response.code === 200) {
        this.notificationList = response.data;
      }
    });
  },
  components: {
    mavonEditor
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
      }).catch(error => {
        this.userInfor = "请先登录....";
        this.headerPath = "error";
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
    },
    handleDialogNotification(item) {
      this.dialogNotificationVisible = !this.dialogNotificationVisible;
      if (this.dialogNotificationVisible) {
        this.dialogNotificationData = item;
      } else {
        this.dialogNotificationData = {};
      }
    },
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

.infinite-list::-webkit-scrollbar {
  display: none;
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