<template>
  <el-row class="login" id='vantaRef'>
    <el-col id="main" :offset="2" :span="16">
      <el-col :span="7" id="main-nav">
        <el-col :span="24" style="margin-top: 85%">
          <h5> 其他登陆方式 </h5>
          <el-tooltip class="item" effect="dark" content="账号密码登录" placement="left-end">
            <el-button type="text" @click="isShow(1)" style="font-size:x-large">
              <i  class="el-icon-user"></i>
            </el-button>&nbsp;
          </el-tooltip>
          <el-tooltip class="el-tooltip" effect="dark" content="手机号登陆" x-placement="bottom-end">
            <el-button type="text" @click="isShow(2)" style="font-size:x-large">
              <i class="el-icon-mobile-phone"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="qq邮箱登录" placement="right-end">
            <el-button type="text" @click="isShow(3)" style="font-size:x-large">
              <i class="el-icon-message"></i>
            </el-button>&nbsp;
          </el-tooltip>

        </el-col>

      </el-col>
      <el-col :span="17">
        <!--                  账号密码登录-->
        <el-col v-if="this.kind===1" class="animate__animated  animate__fadeInRight" id="form-main" :offset="4"
                :span="16">
          <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
            <el-form-item prop="username" label="用户名" style="padding: 5px">
              <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon="el-icon-user"/>
            </el-form-item>
            <el-form-item id="password" prop="password" label="密码" style="margin-top: 35px">
              <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <router-link to="/findPassword">找回密码</router-link>
              |
              <router-link to="/register">注册账号</router-link>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" icon="el-icon-circle-check" @click="doLogin()">登 录</el-button>

              <el-button type="warning" size="small" icon="el-icon-delete" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!--                  手机验证码登录-->
        <el-col v-if="this.kind===2" class="animate__animated  animate__fadeInRight" id="form-main" :offset="4"
                :span="16">
          <el-form ref="loginForm" :model="message" :rules="rules" status-icon label-width="80px">
            <el-form-item prop="phoneNumber" label="手机号" style="padding: 5px">
              <el-input v-model="message.phoneNumber" placeholder="请输入手机号"
                        prefix-icon="el-icon-mobile-phone"></el-input>
            </el-form-item>
            <el-form-item id="password" prop="e_code" label="验证码" style="margin-top: 35px">
              <el-input v-model="message.e_code" placeholder="请输入验证码">
                <i slot="suffix" @click.once="getCode(0)" style="font-size: smaller">获取验证码...</i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <router-link to="/findPassword">找回密码</router-link>
              |
              <router-link to="/register">注册账号</router-link>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" icon="el-icon-circle-check" @click="e_codeLogin('loginForm',0)">登 录</el-button>

              <el-button type="warning" size="small" icon="el-icon-delete" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!--                  qq邮箱登录-->
        <el-col v-if="this.kind===3" class="animate__animated  animate__fadeInRight" id="form-main" :offset="4"
                :span="16">
          <el-form ref="loginForm" :model="email" :rules="rules" status-icon label-width="80px">
            <el-form-item prop="emailNumber" label="qq邮箱" style="padding: 5px">
              <el-input v-model="email.emailNumber" placeholder="请输入qq邮箱" prefix-icon="el-icon-message"></el-input>
            </el-form-item>
            <el-form-item id="e_code" prop="e_code" label="验证码" style="margin-top: 35px">
              <el-input v-model="email.e_code" placeholder="请输入验证码">
                <i slot="suffix" class="sendCode" @click.once="getCode(1)" style="font-size: smaller">获取验证码...</i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <router-link to="/findPassword">找回密码</router-link>
              |
              <router-link to="/register">注册账号</router-link>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" icon="el-icon-circle-check" @click="e_codeLogin('loginForm',1)">登
                录
              </el-button>

              <el-button type="warning" size="small" icon="el-icon-delete" @click="resetForm">重置</el-button>
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
    const checkmail = (rule, value, callback) => {
      postRequest("/isexist", {
        email: value
      }).then(respon => {
        if (respon.code == 200 && respon.msg == "帐号存在") {
          callback();
        } else {
          callback(new Error("此邮箱不存在"))
        }
      }).catch(reason => {
        callback(new Error("邮箱校验失败"))
      })
    };
    return {
      kind: 1,
      isSend: false,
      user: {
        username: "",
        password: ""
      },
      message: {
        phoneNumber: "",
        e_code: ""
      },
      email: {
        emailNumber: "",
        e_code: ""
      },
      rules: {
        username: [
          {required: true, message: '请输入账号...', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码...', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ],
        phoneNumber: [
          {required: true, message: '请输入手机号...', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur'},
          {pattern: /^(13\d|14[579]|15[0-3,5-9]|166|17[0135678]|18\d|19[89])\d{8}$/, message: '请输入正确的手机号码'}
        ],
        e_code: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ],
        emailNumber: [
          {required: true, message: '请输入您的邮箱', trigger: 'blur'},
          {type: 'email', message: "请输入正确的邮箱", trigger: 'blur'},
          {validator: checkmail, trigger: 'blur'}
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
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
      } else {
        postRequest("/login", {
          userName: this.user.username,
          password: this.user.password
        }).then(respon => {
          if (respon.code == 200) {
            this.$confirm('是否记住登录?', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              localStorage.setItem("token", respon.data.token);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消',
                duration: 1200
              });
            });
            Cookies.set("token", respon.data.token, {expires: 7});
            store.commit('increment');
            let s = router.currentRoute.query.redirect;
            // console.log("当前路有消息：   ", router.currentRoute);
            router.push(s == undefined ? '/' : s);
          }
        })
      }
    },
    e_codeLogin(user, n) {
      this.$refs[user].validate((valid) => {
        if (valid && this.isSend) {
          postRequest("/login/message", {
            email: n == 0 ? this.message.phoneNumber : this.email.emailNumber,
            e_code: n == 0 ? this.message.e_code : this.email.e_code
          }).then(respon => {
            if (respon.code == 200) {
              this.$confirm('是否记住登录?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
              }).then(() => {
                localStorage.setItem("token", respon.data);
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消',
                  duration: 1200
                });
              });
              Cookies.set("token", respon.data, {expires: 7});
              store.commit('increment');
              let s = router.currentRoute.query.redirect;
              router.push(s == undefined ? '/' : s);
            }
          })
        }
      });
    },
    resetForm() {
      this.user = "";
      this.email='';
      this.message='';
    },
    isShow(n) {
      this.$nextTick(() => {
        this.$refs['loginForm'].clearValidate();
      })
      this.kind = n;
    },
    getCode(n) {
      postRequest(n == 0 ? "/getCode" : "/getMailCode", {
        phoneNumber: n == 0 ? this.message.phoneNumber : this.email.emailNumber
      }).then(response => {
        if (response.code == 200) {
          this.$message.success("验证码已发送");
          this.isSend = true;
        }
      }).catch(reason => {
        this.$message.success(reason.msg);
      })
    }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 900px;
}

#main {
  /*background-color: #444444;*/
  height: 500px;
  margin-top: 8%;
  border: 1px solid #2c3e50;
  border-radius: 8px;
}

#main-nav {
  background: url("../../assets/images/p.jpg") no-repeat;
  background-size: cover;
  border-radius: 8px;
  height: 500px;
}

#form-main {
  margin-top: 9%;
  padding: 5%;
}

a {
  text-decoration: none;
  font-size: 16px;
  color: #2c3e50;
}

a:hover {
  color: tomato;
}
</style>