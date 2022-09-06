<template>
  <el-row style="background-color: #f3f3f3;height: 900px">
    <el-divider/>
    <el-col :offset="4" :span="16">
      <el-col :span="24"
              style="background-color: #ffffff;height: 130px;padding-top: 13px;padding-bottom: 13px;box-shadow: 10px 10px 15px rgba(106,106,104,0.82)">
        <el-col :span="5">
          <el-tooltip
              effect="light"
              content="点击更换头像" placement="top">
            <a href="javaScript:void(0)" @click="upDataHeader=true">
              <el-avatar :size="100" :src="userInfo.avatar"></el-avatar>
            </a>
          </el-tooltip>
          <el-dialog
              title="上传头像"
              :visible.sync="upDataHeader">
            <el-col slot="default" :span="24">
              <el-upload
                  class="avatar-uploader"
                  action="http://localhost:8081/uploadHeader"
                  :auto-upload="true"
                  :with-credentials="true"
                  :limit='1'
                  ref="upload"
                  :show-file-list="false"
                  :drag="true"
                  :on-success="handleUpdataSuccess"
                  :before-upload="beforeUpload">
                <el-col :span="24">
                  <el-col :span="6">
                    <img :src="imageUrl" class="avatar">
                  </el-col>
                  <el-col :span="16">
                    <el-tooltip content="只能上传jpg/jpeg文件，且不超过500kb" effect="light">
                      <i class="el-icon-upload"><br>
                        <span style="font-size: small">
                              将文件拖到此处，或<em>点击上传</em>
                            </span>
                      </i>
                    </el-tooltip>
                  </el-col>
                </el-col>
              </el-upload>
            </el-col>
            <span slot="footer" class="dialog-footer">
             <el-button @click="upDataHeader = false">关闭</el-button>
          </span>
          </el-dialog>
        </el-col>
        <el-col :span="19">
          <el-col :span="24" style="text-align: left; font-size: medium;margin-top: 20px">
            {{ userInfo.nickName }}
          </el-col>
          <el-col :span="24" style="margin-top: 15px">
            <el-col :span="9" style="text-align: left">
                <span>
                   <i style="font-size: 20px; line-height: 20px; color: #ffffff; border-radius:50%;background-color: #f6466c"
                      class="icon-renminbi1688"> </i>
                  <span style="color: #FF0036;font-size: small;margin-left: 10px;">  我的余额 {{ 10000 }}</span>
                  <span>
                    <el-button class="buttonStyle animate__animated animate__wobble" @click="balance=true" size="small"
                               plain>去充值</el-button>
                  </span>
                </span>
            </el-col>
          </el-col>
          <el-dialog
              title="余额充值"
              width="60%"
              :visible.sync="balance">
            <div slot="default" style="margin-bottom: 40px;">
              <el-col :offset="4" :span="16">
                <el-col :span="4"
                        style="height: 50px;line-height:50px;margin-left: 20px;margin-top: 10px; border: 1px solid tomato"
                        v-for="(item,index) in balanceSum" :key="index">
                  {{ item }}
                </el-col>
              </el-col>
            </div>
            <span slot="footer" class="dialog-footer">
             <el-button @click="balance = false">关闭</el-button>
          </span>
          </el-dialog>
        </el-col>
      </el-col>
      <el-col :span="24" style=" background-color: #ffffff;height:500px; margin-top: 15px;">
        <el-col :span="24" style="text-align: left;font-weight: bold; font-size: medium;margin-top: 30px;">
         <span style="margin-left: 20px;">
           基本信息
         </span>
        </el-col>
        <el-col :span="24" style="margin-top: 20px;">
          <el-col :span="24" style="height: 40px; line-height: 40px">
            <el-col :span="4">
            <span>
              用户昵称:
            </span>
            </el-col>
            <el-col :span="20">
              <el-col v-if="!nickName"
                      :span="4"
                      style="font-size: small; text-align: left;"
                      @mouseenter.native="buttonColor='tomato'"
                      @mouseleave.native="buttonColor='#ffffff'">
                {{ userInfo.nickName }}
              </el-col>
              <el-col v-else :span="14">
                <el-col :span="15">
                  <el-input type="text" clearable v-model="nickName" :placeholder="userInfo.nickName"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button plain size="small" class="buttonStyle" @click="updataUser">保存</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button plain size="small" class="buttonStyle" @click="nickName=''">取消</el-button>
                </el-col>
              </el-col>
              <el-col @mouseenter.native="buttonColor='tomato'"
                      @mouseleave.native="buttonColor='#ffffff'"
                      :span="10"
                      style="text-align: left;font-size: small">
                <el-button v-if="buttonColor==='tomato'" :style="{color:buttonColor}"
                           @click="nickName = userInfo.nickName;" type="text">
                  <i class="el-icon-edit">编辑</i>
                </el-button>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" style="height: 40px; line-height: 40px">
            <el-col :span="4">
            <span>
              用&nbsp;户&nbsp;&nbsp;&nbsp;ID:
            </span>
            </el-col>
            <el-col :span="20">
              <el-col
                  :span="5"
                  style="font-size: small; text-align: left;">
                {{ userInfo.userName }}
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" style="height: 40px; line-height: 40px">
            <el-col :span="4">
            <span>
              性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:
            </span>
            </el-col>
            <el-col :span="20">
              <el-col
                  :span="1"
                  v-if="!sexRadio"
                  style="font-size: small; text-align: left;"
                  @mouseenter.native="sex=4"
                  @mouseleave.native="sex=-1">
                {{ userInfo.sex == 0 ? '男' : '女' }}
              </el-col>
              <el-col v-if="sexRadio===true" :span="14">
                <el-col :span="6">
                  <el-radio v-model="sex" label="0">男</el-radio>
                  <el-radio v-model="sex" label="1">女</el-radio>
                </el-col>
                <el-col :span="4">
                  <el-button plain size="small" @click="updataUser" class="buttonStyle">保存</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button plain size="small" class="buttonStyle" @click="sexRadio=false">取消</el-button>
                </el-col>
              </el-col>
              <el-col @mouseenter.native="sex=4"
                      @mouseleave.native="sex=-1"
                      :span="10"
                      style="text-align: left;font-size: small">
                <el-button
                    v-if="sex===4&&sexRadio===false"
                    style="color: #de4949" @click="sexRadio=true" type="text">
                  <i class="el-icon-edit">编辑</i>
                </el-button>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" style="height: 40px; line-height: 40px">
            <el-col :span="4">
            <span>
             手&nbsp;&nbsp; 机&nbsp;&nbsp;号:
            </span>
            </el-col>
            <el-col :span="20">
              <el-col v-if="(!phoneNumber)||(!phoneFlag)"
                      :span="3"
                      style="font-size: small; text-align: left;"
                      @mouseenter.native="phoneFlag=true"
                      @mouseleave.native="phoneFlag=false">
                {{ userInfo.phonenumber }}
              </el-col>
              <el-col v-if="phoneNumber" :span="14">
                <el-col :span="15">
                  <el-input type="text" clearable v-model="phoneNumber" :placeholder="userInfo.phoneNumber"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button plain size="small" @click="updataUser" class="buttonStyle">保存</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button plain size="small" class="buttonStyle" @click="phoneNumber='';phoneFlag=false">取消
                  </el-button>
                </el-col>
              </el-col>
              <el-col :span="10"
                      @mouseenter.native="phoneFlag=true"
                      @mouseleave.native="phoneFlag=false"
                      style="text-align: left;font-size: small;height: 40px;">
                <el-button
                    v-if="(!phoneNumber)&&phoneFlag"
                    @click="phoneNumber=userInfo.phonenumber"
                    type="text"
                    style="color: #de4949">
                  <i class="el-icon-edit">编辑</i>
                </el-button>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" style="height: 40px; line-height: 40px">
            <el-col :span="4">
            <span>
             邮 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 箱:
            </span>
            </el-col>
            <el-col :span="20">
              <el-col v-if="(!email)||(!emailFlag)"
                      :span="4"
                      style="font-size: small; text-align: left;"
                      @mouseenter.native="emailFlag=true"
                      @mouseleave.native="emailFlag=false">
                {{ userInfo.email }}
              </el-col>
              <el-col v-if="email" :span="14">
                <el-col :span="15">
                  <el-input type="text" clearable v-model="email" :placeholder="userInfo.email"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button plain size="small" @click="updataUser" class="buttonStyle">保存</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button plain size="small" class="buttonStyle" @click="email='';emailFlag=false">取消</el-button>
                </el-col>
              </el-col>
              <el-col :span="10"
                      @mouseenter.native="emailFlag=true"
                      @mouseleave.native="emailFlag=false"
                      style="text-align: left;font-size: small;height: 40px;">
                <el-button
                    v-if="(!email)&&emailFlag"
                    @click="email=userInfo.email"
                    type="text"
                    style="color: #de4949">
                  <i class="el-icon-edit">编辑</i>
                </el-button>
              </el-col>
            </el-col>
          </el-col>
        </el-col>

        <hr style=" height:1px;border-left:none; border-bottom:none;border-top:1px solid #becdd8;"/>

        <el-col :span="24">
          <el-col :span="24" style="text-align: left;font-weight: bold; font-size: medium;margin-top: 10px;">
                <span style="margin-left: 10px;">
                  其他信息
               </span>
          </el-col>
          <!--          修改地址-->
          <el-dialog
              title="修改地址"
              width="60%"
              top="10px"
              :visible.sync="madFlag">
            <div slot="default">
              <el-col :span="24">
                <el-col :span="24" style="height: 40px; line-height: 40px;">
                  <el-col :span="4">
                    用户名：
                  </el-col>
                  <el-col :span="15">
                    <el-input type="text"
                              :maxlength="15"
                              :minlength="6"
                              show-word-limit
                              clearable
                              v-model="addrForm.nickName"
                              :placeholder="userAddrInfo[addrId].name"></el-input>
                  </el-col>
                </el-col>
                <el-col :span="24" style="margin-top: 20px;height: 40px; line-height: 40px;">
                  <el-col :span="4">
                    手机号：
                  </el-col>
                  <el-col :span="15">
                    <el-input type="text"
                              :maxlength="11"
                              show-word-limit
                              clearable
                              v-model="addrForm.mobile" :placeholder="userAddrInfo[this.addrId].mobile"></el-input>
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="24" style="margin-top: 20px;height: 40px; line-height: 40px;">
                <el-col :span="4">
                  地 址：
                </el-col>
                <el-col :span="8">
                  <el-cascader v-model="addr" :props="props"></el-cascader>
                </el-col>
              </el-col>
            </div>
            <span slot="footer" style="height: 40px; line-height: 40px">
              <el-button plain type="text" @click="updataAddr">
                  更新
                </el-button>
              <el-button type="text" @click="handleClose">取消</el-button>
            </span>
          </el-dialog>
          <!--          新建地址-->
          <el-dialog
              title="新建地址"
              width="60%"
              top="10px"
              :visible.sync="newAddr">
            <div slot="default">
              <el-col :span="24">
                <el-col :span="24" style="height: 40px; line-height: 40px;">
                  <el-col :span="4">
                    用户名：
                  </el-col>
                  <el-col :span="15">
                    <el-input type="text"
                              :maxlength="15"
                              :minlength="6"
                              show-word-limit
                              clearable
                              v-model="addrForm.nickName"
                              placeholder="请输入收件人姓名..."></el-input>
                  </el-col>
                </el-col>
                <el-col :span="24" style="margin-top: 20px;height: 40px; line-height: 40px;">
                  <el-col :span="4">
                    手机号：
                  </el-col>
                  <el-col :span="15">
                    <el-input type="text"
                              :maxlength="11"
                              show-word-limit
                              clearable
                              v-model="addrForm.mobile"
                              placeholder="请输入手机号..."></el-input>
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="24" style="margin-top: 20px;height: 40px; line-height: 40px;">
                <el-col :span="4">
                  地 址：
                </el-col>
                <el-col :span="8">
                  <el-cascader v-model="addr" :props="props"></el-cascader>
                </el-col>
              </el-col>
            </div>
            <span slot="footer" style="height: 40px; line-height: 40px">
              <el-button type="text" @click="addUserAddr">
                  添加
                </el-button>
              <el-button type="text" @click="newAddr=false">取消</el-button>
            </span>
          </el-dialog>
          <el-col :span="24" style="margin-top: 20px;">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item name="1">
                <template slot="title">
                  <span style="margin-left: 50px; font-size: medium; ">
                    地址管理 <i class="el-icon-location"></i>
                  </span>
                </template>
                <el-col :span="24">
                  <el-col :span="24" style="height:10px">
                    <el-col :offset="23" :span="1">
                      <el-tooltip content="新建地址" effect="light" placement="top">
                        <el-button icon="el-icon-plus" type="text" @click="newAddrHandle"></el-button>
                      </el-tooltip>

                    </el-col>
                  </el-col>
                  <el-col :span="9" :offset="2" v-for="(item,index) in userAddrInfo" :key="index">
                    <el-descriptions :column="2" size="mini" border>
                      <template slot="title">
                        <span>
                           地址{{ index + 1 }}
                        </span>
                      </template>
                      <template slot="extra">
                        <el-menu mode="horizontal">
                          <el-submenu index="1">
                            <template slot="title">
                              操作
                            </template>
                            <el-menu-item index="1-1">
                              <el-menu-item index="2">
                                <el-button type="text" size="mini" @click="deleteAddr(index)">删除</el-button>
                              </el-menu-item>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                              <el-menu-item index="2">
                                <el-button type="text" size="mini" @click="handleAddr(index)">修改</el-button>
                              </el-menu-item>
                            </el-menu-item>
                          </el-submenu>
                        </el-menu>

                      </template>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-user">
                            用户名:
                          </i>
                        </template>

                        {{ item.name }}
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-phone-outline">
                            手机号：
                          </i>
                        </template>
                        {{ item.mobile }}
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-phone-outline">
                            地 址：
                          </i>
                        </template>
                        {{ item.state }} {{ item.city }}{{ item.district }}{{ item.address }}
                      </el-descriptions-item>
                    </el-descriptions>
                  </el-col>
                </el-col>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template slot="title">
                 <span style="margin-left: 50px; font-size: medium; ">
                   修改密码 <i class="header-icon el-icon-info"></i>
                 </span>
                </template>
                <el-col :span="24">
                  <el-col style="margin-top: 15px;line-height: 40px" :offset="4" :span="16">
                    <el-col :span="4">
                      原密码
                    </el-col>
                    <el-col :span="20">
                      <el-input placeholder="请输入密码..." v-model="oldPassword" clearable
                                @change.native="checkPasswordHandle" show-password></el-input>
                    </el-col>
                  </el-col>
                  <el-col style="margin-top: 15px;line-height: 40px" :offset="4" :span="16">
                    <el-col :span="4">
                      新密码
                    </el-col>
                    <el-col :span="20">
                      <el-input :disabled="checkpassword" clearable placeholder="请输入新密码..." v-model="newPassword1"
                                show-password></el-input>
                    </el-col>
                  </el-col>
                  <el-col style="margin-top: 15px;line-height: 40px;margin-bottom: 15px" :offset="4" :span="16">
                    <el-col :span="4">
                      重复密码
                    </el-col>
                    <el-col :span="20">
                      <el-input :disabled="checkpassword" clearable @change.native="updataPassword"
                                placeholder="重复请输入新密码..." v-model="newPassword2" show-password></el-input>
                    </el-col>
                  </el-col>
                </el-col>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import {getRequest, postRequest} from "@/apis/api";

let addrData = [];
export default {
  name: "myInfo",
  data() {
    return {
      buttonColor: '#ffffff',
      imageUrl: '',
      upDataHeader: false,
      balance: false,
      balanceSum: [500, 1000, 2000, 4000, 8000, 10000, 20000],
      nickName: '',
      sex: -1,
      sexRadio: false,
      phoneNumber: '',
      phoneFlag: false,
      email: '',
      emailFlag: false,
      userInfo: {},
      userAddrInfo: [],
      addr: [],
      addrId: 0,
      addrForm: {
        nickName: '',
        mobile: '',
      },
      madFlag: false,
      newAddr: false,
      activeName: 0,
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      checkpassword: true,
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const {level} = node;
          // console.log("node===>",node);
          // console.log("level=====>",level)
          if (level === 0) {
            getRequest("/getProvince", {})
                .then(response => {
                  addrData.splice(0, 1, response.data);
                })
          }
          if (level === 1) {
            getRequest("/getCity?id=" + node.data.value, {})
                .then(response => {
                  addrData.splice(1, 1, response.data);
                  console.log("this.addrData====>", addrData)
                })
                .catch(error => {
                  this.$message(error.msg);
                })
          }
          if (level === 2) {
            getRequest("/getCounty?id=" + node.data.value, {})
                .then(response => {
                  addrData.splice(2, 1, response.data)
                })
                .catch(error => {
                  this.$message(error.msg);
                })
          }
          if (level === 3) {
            getRequest("/getTown?id=" + node.data.value, {})
                .then(response => {
                  addrData.splice(3, 1, response.data)
                })
                .catch(error => {
                  this.$message(error.msg);
                })
          }
          setTimeout(() => {
            const nodes = Array.from(addrData[level])
                .map(item => ({
                  value: item.id,
                  label: item.extName,
                  leaf: level >= 3
                }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          }, 500);
        }
      }
    }
  },
  created() {
    setTimeout(() => {
      this.getUserData();
      this.getUserAddr();
    }, 100);
    setTimeout(() => {
      this.imageUrl = this.userInfo.avatar;
    }, 2500)

  },
  methods: {
    //获取用户信息
    getUserData() {
      getRequest("/getUserInfor")
          .then(response => {
            if (response.code === 200) {
              this.userInfo = response.data;
            }
          })
          .catch(error => {
            this.$message.error(error.msg);
          })
    },
    beforeUpload(file) {
      const isJpg = file.type === 'image/jpeg';
      const isLt2m = file.size / 1024 / 1024 < 5;
      if (!isJpg) {
        this.$message.error("上传的头像格式只能是 JPG 格式！");
      }
      if (!isLt2m) {
        this.$message.error("上传的头像大小不能超过5MB!");
      }
      return isJpg && isLt2m;
    },
    handleUpdataSuccess(res, file) {
      if (res.code === 200) {
        this.userInfo.avatar = res.data;
        this.imageUrl = res.data;
        this.$refs.upload.clearFiles(); //上传成功之后清除历史记录
        this.$message.success("图片上传成功！");
      }
    },
    addUserAddr() {
      if (this.addr.length < 3) {
        this.$message.error("请选择地址");
        return;
      }
      let id = this.addr[3];
      for (let i = 0; i < this.addr.length; i++) {
        let ad = this.addr[i];
        let data = addrData[i];
        for (let j = 0; j < data.length; j++) {
          if (ad == data[j].id) {
            this.addr[i] = data[j].extName;
            break;
          }
        }
      }
      if (this.addrForm.nickName.trim() === '' || this.addrForm.mobile.trim() === '') {
        this.$message.error("请输入正确的姓名和手机号！");
        return;
      }
      postRequest("/addUserAddr", {
        addrId: id,
        name: this.addrForm.nickName,
        mobile: this.addrForm.mobile,
        state: this.addr[0],
        city: this.addr[1],
        district: this.addr[2],
        address: this.addr[3],
      }).then(response => {
        this.addr = response.data;
        this.newAddr = false;
        this.$message.success("新建成功！");

      }).catch(error => {
        this.$message(error);
      });
    },
    deleteAddr(index) {
      this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getRequest("/deleteUserAddr?id=" + this.userAddrInfo[index].id, {})
            .then(respon => {
              if (respon.code == 200) {
                this.$message.success("删除成功");
                this.userAddrInfo.splice(index, 1);
              }
            })
            .catch(error => {
              this.$message.error("地址删除失败")
            })
      }).catch(() => {
        this.$message.info("已取消删除！")
      })

    },
    updataAddr() {
      if (this.addr.length < 3) {
        this.$message.error("请选择地址");
        return;
      }
      let id = this.addr[3];
      for (let i = 0; i < this.addr.length; i++) {
        let ad = this.addr[i];
        let data = addrData[i];
        for (let j = 0; j < data.length; j++) {
          if (ad == data[j].id) {
            this.addr[i] = data[j].extName;
            break;
          }
        }
      }
      if (this.addrForm.nickName.trim() === '' || this.addrForm.mobile.trim() === '') {
        this.$message.error("请输入正确的姓名和手机号！");
        return;
      }
      postRequest("/updataUserAddr", {
        id: this.userAddrInfo[this.addrId].id,
        name: this.addrForm.nickName,
        mobile: this.addrForm.mobile,
        addrId: id,
        state: this.addr[0],
        city: this.addr[1],
        district: this.addr[2],
        address: this.addr[3],
      }).then(response => {
        this.addr = response.data;
        this.madFlag = false;
        this.$message.success("更新成功！");
      }).catch(error => {
        this.$message(error);
      });
    },
    updataUser() {
      postRequest("/updataUser", {
        id: this.userInfo.id,
        nickName: this.nickName == '' ? undefined : this.nickName,
        sex: this.sex === -1 ? undefined : this.sex,
        phoneNumber: this.phoneNumber == '' ? undefined : this.phoneNumber,
        email: this.email == '' ? undefined : this.email
      }).then(respon => {
        this.$message.success("更新成功！");
      }).catch(error => {
        this.$message.error("更新失败！");
      })
    },
    getUserAddr() {
      getRequest("/getUserAddr", {}).then(response => {
        this.userAddrInfo = response.data
      })
    },
    handleAddr(index) {
      this.addrId = index;
      this.addrForm.nickName = this.userAddrInfo[index].name;
      this.addrForm.mobile = this.userAddrInfo[index].mobile;
      // this.userAddrInfo[index].id;
      this.madFlag = true;
    },
    newAddrHandle() {
      this.newAddr = true;
      this.addrForm.nickName = '';
      this.addrForm.mobile = '';
    },
    handleClose() {
      this.madFlag = false;
      this.addrId = 0;
      this.addrForm.nickName = '';
      this.addrForm.mobile = '';
    },
    checkPasswordHandle() {
      postRequest("/checkPassword", {
        password: this.oldPassword
      }).then(respon => {
        this.checkpassword = respon.code != 200;
      })
    },
    updataPassword() {
      if (this.newPassword1.length < 6 || this.newPassword2.length < 6) {
        this.$message.warning("密码长度不足");
        this.newPassword1 = '';
        this.newPassword2 = '';
        return;
      }
      if (/^\d+$/.test(this.newPassword1) || /^\d+$/.test(this.newPassword2)) {
        this.$message.warning("密码不能全部为数字");
        return;
      }
      if (this.newPassword1 !== this.newPassword2) {
        this.$message.warning("前后两次密码不一致请检查");
        return;
      }

      this.$confirm('即将更改密码, 是否继续?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postRequest("/updataPassword",
            {
              id: this.userInfo.id,
              password: this.newPassword2
            })
            .then(response => {
              if (response.code == 200) {
                this.$message.success("密码修改成功，注意保存密码")
              }
            })
            .catch(error => {
              this.$message.success("密码修改失败");
            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },

}
</script>

<style scoped>
/deep/ .el-upload {
  width: 100%;
}

/deep/ .el-upload .el-upload-dragger {
  width: 100%;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  border: 1px dashed #d9d9d9;
  text-align: center;
}

.avatar-uploader-icon:hover {
  border-color: #de4949;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.buttonStyle {
  background: linear-gradient(15deg, tomato, rgb(7, 244, 237));
  color: #ffffff;
  float: right;
  border: 0;
  border-radius: 15px;
  box-shadow: 5px 5px 15px #3b4446;
}

.buttonStyle:hover, .buttonStyle:focus {
  background: linear-gradient(30deg, rgb(7, 244, 237), tomato);
  color: #faf8f8;
  border: 0;
}
</style>