<template>
  <el-row class="login" id='vantaRef'>
    <el-col id="main"  :offset="2" :span="16">
      <el-col :span="7" id="main-nav"></el-col>

      <el-col :span="17">
        <el-col v-if="this.flag"  class="animate__animated  animate__fadeInRight" id="form-main" :offset="4"  :span="16">
          <el-form  ref="user" :model="user" :rules="rules" status-icon label-width="80px">
            <el-form-item prop="username" label="用户名" style="padding: 5px">
              <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱" style="padding: 5px">
              <el-input v-model="user.email" placeholder="请输入邮箱" prefix-icon="el-icon-message"></el-input>
            </el-form-item>
            <el-form-item id="password" prop="password" label="密码" style="padding: 5px">
              <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item id="rePassword" prop="rePassword" label="确认密码" style="padding: 5px">
              <el-input v-model="user.rePassword" show-password placeholder="请再次输入密码..."></el-input>
            </el-form-item>
            <el-form-item>
              <router-link to="/findPassword">找回密码</router-link>
              |
              <router-link to="/login">去登陆</router-link>
            </el-form-item>

            <el-form-item>
              <el-button type="success" size="small" icon="el-icon-circle-check" @click="doRegister('user')">注 册</el-button>
              <el-button type="warning" size="small" icon="el-icon-delete" @click="resetForm"  >重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import {postRequest} from "@/apis/api";
import router from "@/router";

export default {
  name: "register",
  data() {
    var checkmail= (rule, value, callback) =>{
        postRequest("/isexist",{
          email:value
        }).then(respon=>{
          if (respon.code==200&&respon.msg=="帐号不存在"){
            callback();
          }
          else {
            callback(new Error("此邮箱已被注册"))
          }
        }).catch(reason => {
          callback(new Error("邮箱校验失败"))
        })
    }
    var checkName=(rule,value,callback)=>{
      postRequest("/isexist",{
        userName:value
      }).then(respon=>{
        if (respon.code==200&&respon.msg=="帐号不存在"){
          callback();
        }
        else {
          callback(new Error("此帐号已被注册"))
        }
      }).catch(reason => {
        callback(new Error("用户名校验失败"))
      })
    }
    var checkPassword=(rule,value,callback)=>{
      if (this.user.password==''||value!==this.user.password){
        callback(new Error("两次密码不相同"));
      }
      callback();
    }
    return {
      flag: true,
      user: {
        username: "",
        email:"",
        password: "",
        rePassword:"",
        rememberMe:true
      },
      rules: {
        username: [
          {required: true, message: '请输入账号...', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'},
          {validator:checkName,message: "帐号已被注册", trigger: 'blur'}
        ],
        email: [
            {required: true, message: '请输入您的邮箱', trigger: 'blur'},
            {type:'email',message:"请输入正确的邮箱",trigger:'blur'},
            {validator:checkmail,trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码...', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ],
        rePassword: [
          {required: true, message: '请输入密码...', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'},
          {validator:checkPassword,trigger: 'blur'}
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
    resetForm(){
      this.user=''
    },
    doRegister(user){
     this.$refs[user].validate((valid)=>{
       if (valid){
         postRequest("/baseRegister",{
           userName:this.user.username,
           email:this.user.email,
           password:this.user.password
         }).then(response=>{
           if (response.code==200){
             this.$message({
               showClose: true,
               type:"success",
               message: "注册成功即将跳转登录...",
               duration: 1500
             });
             setTimeout(()=>{
               router.push("/login")
             },3000)
           }
         })
       }
       else {
         this.$message({
           showClose: true,
           type:"error",
           message: "注册失败...",
           duration: 1500
         });
         return false;
       }
     })
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
  margin-top: 3%;
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