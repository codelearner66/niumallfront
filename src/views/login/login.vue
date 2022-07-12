<template>
  <el-row class="login" id='vantaRef'>
              <el-col id="main"  :offset="2" :span="16">
                <el-col :span="7" id="main-nav">
                              <button @click="isShow">
                                点我
                              </button>
                </el-col>
                <el-col :span="17">
                  <el-col v-if="this.flag" id="form-main" :offset="4"  :span="16">
                    <el-form  ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
                      <el-form-item prop="username" label="用户名" style="padding: 5px">
                        <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon></el-input>
                      </el-form-item>
                      <el-form-item id="password" prop="password" label="密码" style="margin-top: 35px">
                        <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <router-link  to="/">找回密码</router-link>
                        |
                        <router-link to="/register">注册账号</router-link>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="success" size="small" icon="el-icon-circle-check" @click="doLogin()">登 录</el-button>

                        <el-button type="warning" size="small" icon="el-icon-delete" @click="resetForm"  >重置</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                  <el-col v-if="!this.flag" id="form-main" :offset="4"  :span="16">
                    <el-form  ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
                      <el-form-item prop="username" label="用户名" style="padding: 5px">
                        <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon></el-input>
                      </el-form-item>
                      <el-form-item id="password" prop="password" label="密码" style="margin-top: 35px">
                        <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <router-link  to="/">找回密码</router-link>
                        |
                        <router-link to="/register">注册账号</router-link>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="success" size="small" icon="el-icon-circle-check" @click="doLogin()">登 录</el-button>

                        <el-button type="warning" size="small" icon="el-icon-delete" @click="resetForm"  >重置</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-col>
              </el-col>
  </el-row>
</template>

<script>
import {postRequest} from "@/apis/api";
import Cookies from "js-cookie";
import store from "@/store";
import router from "@/router";
import * as THREE from "three";
import CLOUDS from 'vanta/src/vanta.clouds'
export default {
  name: "login",
  data() {
    return {
      flag: true,
      user: {
        username: "",
        password: ""
      },
      message:{
        phoneNumber:"",
        e_code:""
      },
      rules: {
        username: [
          {required: true, message: '请输入账号...', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码...', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ]
      }
    };
  },
  // mounted() {
  //   this.vantaEffect = CLOUDS({
  //     el: "#vantaRef",
  //     THREE:THREE,
  //     mouseControls: true,
  //     touchControls: true,
  //     gyroControls: false,
  //     minHeight: 200.00,
  //     minWidth: 200.00,
  //     backgroundColor: 0xf2f2f2
  //   })
  // },
  // beforeDestroy() {
  //   if (this.vantaEffect){
  //     this.vantaEffect.destroy();
  //   }
  // },
  methods: {
    doLogin() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else {
        postRequest("/login", {
          userName: this.user.username,
          password: this.user.password
        }).then(respon => {
          console.log("回调结果：  ", respon);
          if (respon.code == 200) {
            Cookies.set("token", respon.data.token, {expires: 7});
            store.commit('increment');
            let s = router.currentRoute.query.redirect;
            console.log("当前路有消息：   ", router.currentRoute);
            router.push(s == undefined ? '/' : s);
          }
        })
      }
    },
    resetForm(){
     this.user="";
    },
    isShow(){
      return  !this.flag;
    }
  }
};
</script>
<style scoped>
.login{
  width: 100%;
  height: 900px;
}
#main{
  /*background-color: #444444;*/
  height: 500px;
  margin-top: 8%;
  border: 1px solid #2c3e50;
  border-radius: 8px;
}
#main-nav{
  background: url("../../assets/images/p.jpg") no-repeat;
  background-size:cover;
  border-radius: 8px;
  height: 500px;
}
#form-main{
  margin-top: 9%;
  padding: 5%;
}
a {
  text-decoration: none;
  font-size: 16px;
  color: #2c3e50;
}
a:hover{
  color: tomato;
}
</style>