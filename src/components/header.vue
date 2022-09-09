<template>
  <el-row id="header-back">
    <el-col :span="2">
      <img src="../assets/logo.png" style="height: 40px;width: 106px" alt="logo图标"/>
    </el-col>
    <el-col :offset="3"   :span="18" id="header">
      <el-col :span="2">
        <router-link to="/" class="router-header">
          &nbsp;<span class="headerspan"><i class="el-icon-s-home" style="color: hotpink"/>首页</span>
        </router-link>
      </el-col>
      <el-col :span="3">
        <span style="font-size: xx-small;line-height: 40px">
          嗷呜呜... 欢迎来niuMall
        </span>
      </el-col>
      <el-col :span="2">
        <el-button v-if="!this.$store.getters.getIsLogin" @click="loginbuton" type="text" class="router-header">
          <span class="headerspan">请登录...</span>
        </el-button>
      </el-col>
      <el-col :span="1">
        <el-button v-if="!this.$store.getters.getIsLogin" @click="register" type="text" class="router-header">
          <span class="headerspan">免费注册</span>
        </el-button>
      </el-col>
      <el-col :offset="this.$store.getters.getIsLogin?5:2" :span="2">
        <router-link to="/myInfo" class="router-header" type="text">
          <span class="headerspan"><i class="el-icon-user" style="color: hotpink"/> 我的信息</span>
        </router-link>
      </el-col>
      <el-col :span="2">
        <router-link to="/shopCartList" class="router-header">
          <i class="el-icon-shopping-cart-2" style="color: hotpink"></i> <span class="headerspan">购物车</span>
        </router-link>
      </el-col>
      <el-col :span="2">
        <router-link to="/myOrders" class="router-header">
          <span class="headerspan"> <i class="el-icon-s-order" style="color: hotpink"></i> 我的订单</span>
        </router-link>
      </el-col>
      <el-col :span="2">
        <router-link to="/myInfor" class="router-header">
          <el-badge :value="12" class="headerspan"> <i class="el-icon-s-comment" style="color: hotpink"></i> 消息</el-badge>
        </router-link>
      </el-col>
      <el-col :span="2">
        <el-button v-if="this.$store.getters.getIsLogin" @click="logout" type="text" style="padding: 0 0 0 0;">
          <span class="headerspan"> <i class="el-icon-close" style="color: hotpink"></i> 登出</span>
        </el-button>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import router from "@/router";
import Cookies from 'js-cookie'
import {postRequest} from "@/apis/api";
import {Message} from "element-ui";

export default {
  name: "headers",
  data() {
    return {
      logoUrl: '../assets/logo.png'
    }
  },
  methods: {
    loginbuton() {
      router.push("login");
    },
    register() {
      router.push("register");
    },
    logout() {
      this.$confirm('此操作将会退出登录,是否继续?', '警告', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        postRequest("/logout", {}).then(response => {
          if (response.code == 200) {
            this.$message({
              showClose: true,
              type:"success",
              message: '已成功退出！',
              duration: 1500
            });
          } else {
            Message.error("登出发生错误");
          }
          this.$store.commit('noLogin')
          Cookies.remove("token");
          localStorage.removeItem("token");
          window.location.reload();
         // router.push("/login");
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      })
    }
  }
}
</script>

<style scoped>
#header-back {
  background-color: #ffffff;
  height: 40px;
}

#header {
  height: 40px;
  line-height: 40px;
}

.router-header {
  text-decoration: none;
  padding: 0 0 0 0;
}

.headerspan {
  font-size: xx-small;
  line-height: 30px;
  color: #2c3e50;
}
</style>