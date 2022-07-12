<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
          <el-form ref="loginForm" :model="user" status-icon label-width="80px">
            <h3>注册</h3>
            <hr>
            <el-form-item prop="username" label="用户名">
              <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="设置密码">
              <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <router-link to="/">找回密码</router-link> |
            <router-link to="/login">登录帐号</router-link>
            <el-form-item>
              <el-button type="primary" icon @click="doRegister()">注册账号</el-button>
            </el-form-item>
          </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name:"register",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: ""
      },
    };
  },
  created() {},
  methods: {
    doRegister() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.email) {
        this.$message.error("请输入邮箱！");
        return;
      } else if (this.user.email != null) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.user.email)) {
          this.$message.error("请输入有效的邮箱！");
        } else if (!this.user.password) {
          this.$message.error("请输入密码！");
          return;
        } else {
          // this.$router.push({ path: "/" }); //无需向后台提交数据，方便前台调试
          axios
              .post("/register", {
                name: this.user.username,
                email: this.user.email,
                password: this.user.password
              })
              .then(res => {
                // console.log("输出response.data", res.data);
                // console.log("输出response.data.status", res.data.status);
                if (res.data.status === 200) {
                  this.$router.push({ path: "/" });
                } else {
                  alert("您输入的用户名已存在！");
                }
              });
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 740px;
  margin: 0 auto;
  background: url("../../assets/images/bg1.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
}
.login-wrap {
  background-color: rgba(199, 194, 194, 0.5);
  background-size: cover;
  width: 400px;
  height: 400px;
  margin: 10% auto;
  overflow: hidden;
  /*padding-top: 10px;*/
  line-height: 40px;
}

h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}

.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>