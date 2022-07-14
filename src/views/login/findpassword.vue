<template>
  <el-row class="login" id='vantaRef'>
    <el-col id="main" :offset="2" :span="16">
      <el-col :span="7" id="main-nav">
        <el-col :span="24" style="margin-top: 85%">
          <h5>找回方式</h5>
          <el-tooltip class="el-tooltip" effect="dark" content="手机号找回" x-placement="bottom-end">
            <el-button type="text" @click="isShow(1)" style="font-size:x-large">
              <i class="el-icon-mobile-phone"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="qq邮箱找回" placement="right-end">
            <el-button type="text" @click="isShow(2)" style="font-size:x-large">
              <i class="el-icon-message"></i>
            </el-button>&nbsp;
          </el-tooltip>

        </el-col>
      </el-col>
      <el-col :span="17">
        <!--                  手机验证码登录-->
        <el-col v-if="this.kind===1" class="animate__animated  animate__fadeInRight" id="form-main" :offset="4"
                :span="16">
          <el-form ref="loginForm" :model="message" :rules="rules" status-icon label-width="80px">
            <el-form-item prop="phoneNumber" label="手机号" style="padding: 5px">
              <el-input v-model="message.phoneNumber" placeholder="请输入手机号" prefix-icon="el-icon-mobile-phone">
              <i slot="suffix"  class="sendCode" @click.once="getCode('loginForm')" style="font-size: smaller">找回密码...</i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <router-link to="/login">去登陆</router-link>
              |
              <router-link to="/register">注册账号</router-link>
            </el-form-item>
          </el-form>
        </el-col>
        <!--                  qq邮箱登录-->
        <el-col v-if="this.kind===2" class="animate__animated  animate__fadeInRight" id="form-main" :offset="4"
                :span="16">
          <el-form ref="loginForm" :model="email" :rules="rules" status-icon label-width="80px">
            <el-form-item prop="emailNumber" label="qq邮箱" style="padding: 5px">
              <el-input v-model="email.emailNumber" placeholder="请输入qq邮箱" prefix-icon="el-icon-message">
                <i slot="suffix"  class="sendCode" @click.once="getCode('loginForm')" style="font-size: smaller">找回密码...</i>
              </el-input>

            </el-form-item>
            <el-form-item>
              <router-link to="/login">去登陆</router-link>
              |
              <router-link to="/register">注册账号</router-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import {postRequest} from "@/apis/api";
import * as THREE from "three";
import CLOUDS from 'vanta/src/vanta.clouds'

export default {
  name: "findPassword",
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
      message: {
        phoneNumber: "",
        e_code: ""
      },
      email: {
        emailNumber: "",
        e_code: ""
      },
      rules: {
        phoneNumber: [
          {required: true, message: '请输入手机号...', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur'},
          {pattern: /^(13\d|14[579]|15[0-3,5-9]|166|17[0135678]|18\d|19[89])\d{8}$/, message: '请输入正确的手机号码'}
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
    isShow(n) {
      this.$nextTick(() => {
        this.$refs['loginForm'].clearValidate();
      })
      this.kind = n;
    },
    getCode(user) {
      console.log("n",this.kind==1,this.message.phoneNumber,this.email.emailNumber)
      this.$refs[user].validate((valid) => {
        if (valid){
          if(this.kind==1){
            postRequest("/findpassword", {
              'phonenumber': this.message.phoneNumber
            }).then(response => {
              if (response.code == 200) {
                this.$message.success("新密码已经已发送，请注意查收！");
                this.isSend = true;
              }
            }).catch(reason => {
              this.$message.success(reason.msg);
            })
          }
          else {
            postRequest("/findpassword", {
              email:  this.email.emailNumber
            }).then(response => {
              if (response.code == 200) {
                this.$message.success("新密码已经已发送，请注意查收！");
                this.isSend = true;
              }
            }).catch(reason => {
              this.$message.success(reason.msg);
            })
          }
        }
        else {
          this.$message.error("未知错误！")
        }
      });

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