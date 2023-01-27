<template>
  <el-row id="header-back">
    <el-col :span="2">
      <img alt="logo图标" src="../assets/logo.png" style="height: 40px;width: 106px"/>
    </el-col>
    <el-col id="header" :offset="3" :span="18">
      <el-col :span="2">
        <router-link class="router-header" to="/">
          &nbsp;<span class="headerspan"><i class="el-icon-s-home" style="color: hotpink"/>首页</span>
        </router-link>
      </el-col>
      <el-col :span="3">
        <span style="font-size: xx-small;line-height: 40px">
          嗷呜呜... 欢迎来niuMall
        </span>
      </el-col>
      <el-col :span="2">
        <el-button v-if="!this.$store.getters.getIsLogin" class="router-header" type="text" @click="loginbuton">
          <span class="headerspan">请登录...</span>
        </el-button>
      </el-col>
      <el-col :span="1">
        <el-button v-if="!this.$store.getters.getIsLogin" class="router-header" type="text" @click="register">
          <span class="headerspan">免费注册</span>
        </el-button>
      </el-col>
      <el-col :offset="this.$store.getters.getIsLogin?5:2" :span="2">
        <router-link class="router-header" to="/myInfo" type="text">
          <span class="headerspan"><i class="el-icon-user" style="color: hotpink"/> 我的信息</span>
        </router-link>
      </el-col>
      <el-col :span="2">
        <router-link class="router-header" to="/shopCartList">
          <i class="el-icon-shopping-cart-2" style="color: hotpink"></i> <span class="headerspan">购物车</span>
        </router-link>
      </el-col>
      <el-col :span="2">
        <router-link class="router-header" to="/myOrders">
          <span class="headerspan"> <i class="el-icon-s-order" style="color: hotpink"></i> 我的订单</span>
        </router-link>
      </el-col>
      <el-col :span="2">
        <router-link class="router-header" to="/message">
          <el-badge :hidden="this.$store.getters.getMessageCount == 0" :value="this.$store.getters.getMessageCount"
                    class="headerspan"><i class="el-icon-s-comment"
                                          style="color: hotpink"></i> 消息
          </el-badge>
        </router-link>
      </el-col>
      <el-col :span="2">
        <el-button v-if="this.$store.getters.getIsLogin" style="padding: 0 0 0 0;" type="text" @click="logout">
          <span class="headerspan"> <i class="el-icon-close" style="color: hotpink"></i> 登出</span>
        </el-button>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import router from "@/router";
import Cookies from 'js-cookie'
import {getRequest, postRequest} from "@/apis/api";
import {Message} from "element-ui";

export default {
  name: "headers",
  data() {
    return {
      logoUrl: '../assets/logo.png'
    }
  },
  created() {
    this.getMessageNum();
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
              type: "success",
              message: '已成功退出！',
              duration: 1500
            });
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: '登出发生错误！',
              duration: 1500
            });
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
    },
    getMessageNum() {
      getRequest("/websocket/getAllUnreadCount", "").then(success => {
        if (success.code === 200) {
          console.log("getAllUnreadCount :", success.data);
          this.$store.commit("setMessageCount", success.data);
        }
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