<template>
  <el-row>
    <el-divider/>
    <el-col :offset="3" :span="18" style="margin-top: 20px">
      <!--  展示大图-->
      <el-col :span="8" style="height: 420px; border: 1px solid #d34886;border-radius: 10px;padding: 1px">
        <el-col :span="24" v-show="flag">
          <el-col :span="24" style="position: relative">
            <img width="100%" height="414px" style="border-radius: 10px" :src="goodsData.homeRecommendedImages"
                 alt="商品图片">
            <el-col :span="2" style="position: absolute; left:8px;top:375px">
              <el-button type="text" @click="changePhotoToVideo"
                         style="text-decoration: none;padding: 0;margin: 0; color: tomato; font-size: 30px">
                <i class="el-icon-video-play"/>
              </el-button>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24" v-show="!flag">
          <el-col :span="24" style="height: 13px;">
            <el-button type="text" @click="changeFlag"
                       style="width: 4px;margin: 0 3.8% 0 0;padding: 0;z-index: 1000; float: right; font-size: 20px; text-decoration: none;color: #de4949">
              <i class="el-icon-close"/>
            </el-button>
          </el-col>
          <video width="100%" height="400px" :src="goodsData.video" :poster="goodsData.homeRecommendedImages" controls
                 style="border-radius: 10px">
            <source :src="goodsData.video" type="video/mp4"/>
          </video>
        </el-col>
      </el-col>
      <!--  商品信息展示-->
      <el-col :span="15" style="height: 400px;margin-left: 20px;font-family:'Microsoft YaHei',serif;">
        <el-col :span="18" style="background-color: white">
          <el-col :span="24">
            <h4>{{ goodsData.title }}</h4>
          </el-col>
          <el-col :span="24"
                  style="background-color: #fbfbfb;height: 135px;border:1px solid #cc5353; border-radius: 4px;box-shadow: #de4949 0 0 10px;">
            <el-col :offset="2" :span="4">
              <img src="../../assets/logo.png" style="height: 40px;width: 106px" alt="logo图标"/>
            </el-col>
            <el-col :span="15">
              <span style="line-height: 40px; font-size: small">商品热卖中,请尽快购买...</span>
            </el-col>
            <el-col :span="24" style="background-color: #f1ece6;color: #798690">
              <el-col :span="24">
                <el-col :span="4" style="font-size:xx-small">
                  原价：
                </el-col>
                <el-col :span="10" style="text-decoration: line-through;font-size: small;text-align: left">
                  {{ goodsData.minOriginalPrice }}-{{ goodsData.maxOriginalPrice }}
                </el-col>
              </el-col>
              <el-col :span="24" style="height: 40px;line-height: 40px;color: #FF0036;font-weight: bold; ">
                <el-col :span="4">
                  优惠价：
                </el-col>
                <el-col :span="10" class="animate__animated animate__wobble" style="font-size: larger;text-align: left">
                  {{ goodsData.minPrice }}-{{ goodsData.maxPrice }}
                </el-col>
              </el-col>
              <el-col :span="24"
                      style="height: 25px;line-height: 25px; background-color: #ffffff;font-weight: lighter; color: #556578;">
                <el-col :span="4" style="font-size: xx-small">
                  邮费：
                </el-col>
                <el-col :span="20" style="font-size: small;text-align: left">
                  广西河池 - 至
                  <el-button type="text" style="color:black;padding: 0;margin: 0;" @click="handleVisible(0,true,true)">
                    <!--                    {{ provinces[0][radio1[0]].extName }}-->
                    <span v-if="addr!==0&&radio1.length!==4">{{ addrRadio }}</span>
                    <span v-else-if="radio1.length==4">{{ provinces[0][radio1[0]].extName }}</span>
                    <span v-else>请选择地址...</span>
                  </el-button>
                  <span v-if="radio1.length==4" style="padding: 0;margin: 0;">
                    {{ provinces[1][radio1[1]].extName }}
                    {{ provinces[2][radio1[2]].extName }}
                    {{ provinces[3][radio1[3]].extName }}
                    &nbsp;&nbsp;&nbsp;快递：0.00
                  </span>
                  <!--                  省选择-->
                  <el-dialog
                      title="省份"
                      :visible.sync="dialogVisible[0]"
                      width="40%"
                      top="10px"
                      :before-close="handleClose">
                    <div slot="default">
                      <el-button style="float: right" type="text" @click="clearRadio" icon="el-icon-refresh-left">重置已选
                      </el-button>
                      <el-button style="float: right" type="text" @click="isNewAddr=!isNewAddr" icon="el-icon-plus">
                        新建地址
                      </el-button>
                      <hr style="width: 100%; height:1px;border-left:none; border-bottom:none;border-top:1px solid #cad9e6;"/>
                      <el-col :span="24" v-if="isNewAddr">
                        <el-radio-group v-model="radio1[0]" @change="handChange(0)" size="small">
                          <el-radio-button style="margin-top: 15px;margin-left: 5px;padding: 3px;"
                                           v-for="(item,index) in provinces[0]" :key="index"
                                           :label="index">{{ item.extName }}
                          </el-radio-button>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="24" v-if="!isNewAddr">
                        <el-radio-group v-model="addr" size="small" @change="handleAddrChange(id)">
                          <el-radio-button style="margin-top: 15px;margin-left: 5px;padding: 3px;"
                                           v-for="(item,index) in addrData" :key="index"
                                           :label="item.id">
                            <span style="float: left">{{ item.name }}</span><span
                              style="float: right">{{ item.mobile }}</span> <br>
                            <p>{{ item.state }}{{ item.city }}{{ item.district }} {{ item.address }}</p>
                          </el-radio-button>
                        </el-radio-group>
                      </el-col>
                    </div>
                    <span slot="footer" class="dialog-footer">
                         <el-button @click="handleVisible(0,false,false)">取 消</el-button>
                         <el-button type="primary" @click="handleVisible(0,false,true)">确 定</el-button>
                     </span>
                  </el-dialog>
                  <!--                  市选择-->
                  <el-dialog
                      title="市区"
                      :visible.sync="dialogVisible[1]"
                      width="40%"
                      :before-close="handleClose">
                    <div slot="default">
                      <el-radio-group v-model="radio1[1]" @change="handChange(1)" size="small">
                        <el-radio-button style="margin-top: 15px;margin-left: 5px;padding: 3px;"
                                         v-for="(item,index) in provinces[1]" :key="index"
                                         :label="index">
                          {{ item.extName }}
                        </el-radio-button>
                      </el-radio-group>
                    </div>
                    <span slot="footer" class="dialog-footer">
                         <el-button @click="handleVisible(1,false,false)">取 消</el-button>
                         <el-button type="primary" @click="handleVisible(1,false,true)">确 定</el-button>
                     </span>
                  </el-dialog>
                  <!--                  县选择-->
                  <el-dialog
                      title="县区"
                      :visible.sync="dialogVisible[2]"
                      width="40%"
                      :before-close="handleClose">
                    <div slot="default">
                      <el-radio-group v-model="radio1[2]" @change="handChange(2)" size="small">
                        <el-radio-button style="margin-top: 15px;margin-left: 5px;padding: 3px;"
                                         v-for="(item,index) in provinces[2]" :key="index"
                                         :label="index">
                          {{ item.extName }}
                        </el-radio-button>
                      </el-radio-group>
                    </div>
                    <span slot="footer" class="dialog-footer">
                         <el-button @click="handleVisible(2,false,false)">取 消</el-button>
                         <el-button type="primary" @click="handleVisible(2,false,true)">确 定</el-button>
                     </span>
                  </el-dialog>
                  <!--                  镇选择-->
                  <el-dialog
                      title="乡镇"
                      :visible.sync="dialogVisible[3]"
                      width="40%"
                      :before-close="handleClose">
                    <div slot="default">
                      <el-radio-group v-model="radio1[3]" @change="handChange(3)" size="small">
                        <el-radio-button style="margin-top: 15px;margin-left: 5px;padding: 3px;"
                                         v-for="(item,index) in provinces[3]" :key="index"
                                         :label="index">
                          {{ item.extName }}
                        </el-radio-button>
                      </el-radio-group>
                    </div>
                    <span slot="footer" class="dialog-footer">
                         <el-button @click="handleVisible(3,false,false)">取 消</el-button>
                         <el-button type="primary" @click="handleVisible(3,false,true)">确 定</el-button>
                     </span>
                  </el-dialog>
                </el-col>
              </el-col>
            </el-col>
          </el-col>

          <el-col :span="24" style="margin-top: 8px;">
            <el-col :span="11" style="font-size: xx-small;font-weight: lighter;line-height: 20px;">
              销量：{{ goodsData.salesCount }}
            </el-col>
            <el-col :span="1" style="font-size: large;font-weight: lighter;line-height: 20px;color: #cad9e6">|</el-col>
            <el-col :span="12" style="font-size: xx-small;font-weight: lighter;line-height: 20px;">
              送niuMall积分<span style="color: #cc5353;font-weight: normal;">{{ goodsData.price / 10 }}</span>
            </el-col>
            <hr style="height:1px;border-left:none; border-bottom:none;border-top:1px dashed #cad9e6;"/>
            <el-col :span="24">
              <el-col :span="24" style="font-size: small">
                <el-col :span="7">
                  产品型号：
                </el-col>
                <el-col :span="17">
                  {{ goodsData.model }}
                </el-col>
              </el-col>
              <hr style="height:1px;border-left:none; border-bottom:none;border-top:1px dashed #cad9e6;"/>
              <el-col :span="24" style="font-size: small">
                <el-col :span="7">
                  产品简介：
                </el-col>
                <el-col :span="17">
                  <el-tooltip class="item" effect="light" :content="goodsData.simpleDesc" placement="right-end">
                    <router-link to="#" style="text-decoration: none; line-height: 20px;color: #2c3e50;">
                      {{ goodsData.simpleDesc | ellipsis }}
                    </router-link>
                  </el-tooltip>
                </el-col>
              </el-col>
              <el-col :span="24" style="font-size: small;margin-top: 10px;">
                <el-col :span="7">
                  数量：
                </el-col>
                <el-col :span="16">
                  <el-input-number v-model="num"
                                   size="small"
                                   controls-position="right"
                                   @change="numChange"
                                   :min="goodsData.buyMinNumber"
                                   :max="goodsData.buyMaxNumber">

                  </el-input-number>
                  <span style="font-size: xx-small;margin-left: 20px">
                    {{ goodsData.inventory > 100 ? "库存充足" : "库存紧张" }}
                  </span>
                </el-col>
                <el-col :span="24" style="height: 30px;line-height: 30px">
                  <el-col :span="7">
                    总价：
                  </el-col>
                  <el-col :span="16" style="height: 40px;line-height: 40px;color: #FF0036;font-weight: bold; ">
                    {{ sum }}<i class="icon-renminbi1688"/>
                  </el-col>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-top: 20px;">
              <el-button class="addShopCar" id="buy"
                         @click="handlePayment"
                         v-loading.fullscreen.lock="fullscreenLoading"
                         size="small" plain>立即购买
              </el-button>&nbsp;&nbsp;&nbsp;
              <el-button class="addShopCar" id="addShopCar" @click="addShopCart" size="small"
                         icon="el-icon-shopping-cart-2" plain>加入购物车
              </el-button>
            </el-col>
            <el-col :span="24" style="margin-top: 10px;">
              <el-col :span="15" style="font-size: xx-small">
                服务承诺 正品保证 极速退款 退货运费险 七天无理由退换
              </el-col>
              <el-col :offset="3" :span="4">
                <el-button type="text" @click="pay=!pay"
                           style="padding: 0;margin: 0; font-size: xx-small;color: #2c3e50">支付方式 <i v-if="pay"
                                                                                                    class="el-icon-arrow-up"/><i
                    v-if="!pay" class="el-icon-arrow-down"/></el-button>
                <el-col :span="24" v-if="pay" style="position: absolute;width: 80px; height: 60px;  z-index: 1000">
                  <el-button type="text" @click="handlePayType(0)"
                             style="margin:4px 0 0;padding: 0; font-size: xx-small;color: #ea3783">
                    <i class="el-icon-wallet"/> 账户余额
                  </el-button>
                  <el-button type="text" @click="handlePayType(1)"
                             style="padding: 0; font-size: xx-small; color: #ea3783;margin: 4px 0 0;"><i
                      class="icon-alipay"/> 支付宝
                  </el-button>
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="5" style="margin-left:20px;height: 437px;">
          <el-col :span="24">
            <el-col :span="8">
              <hr style=" height:1px;border-left:none; border-bottom:none;border-top:1px dashed #cad9e6;"/>
            </el-col>
            <el-col :span="8" style="font-size: xx-small;color: #FF0036">
              看了又看
            </el-col>
            <el-col :span="8">
              <hr style="height:1px;border-left:none; border-bottom:none;border-top:1px dashed #cad9e6;"/>
            </el-col>
          </el-col>
          <el-col :span="24"
                  class="infinite-list"
                  v-infinite-scroll="load"
                  infinite-scroll-distance="10"
                  style="height: 420px;overflow-y:auto; list-style-type: none">
            <el-col :span="24" v-for="(item,index) in goodsList" :key="index" class="infinite-list-item"
                    style="margin-top: 5px;height:160px">
              <el-col :span="24">
                <a @click="handleGoodsChange(index)">
                  <img :src="item.images" alt="图片" width="100%" height="120px" style="object-fit: cover">
                </a>
              </el-col>
              <el-col :span="24"
                      style="height: 14px;line-height: 14px;color: #353132;font-weight: lighter ; background-color: #ebf2f8">
                <i class="icon-renminbi1688"/>{{ item.price }}
              </el-col>
              <el-col :span="24" style="background-color: #e3ebf1">
                <el-tooltip class="item" effect="light" :content="item.simpleDesc" placement="top">
                  <a @click="handleGoodsChange(index)"
                     style="text-decoration: none; line-height: 20px;color: #1f2327; font-size: xx-small">
                    {{ item.simpleDesc | ellipsis2 }}
                  </a>
                </el-tooltip>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import {getRequest, postRequest} from "@/apis/api";
import Goods from "@/components/goods";

export default {
  name: "goodsDetiails",
  components: {Goods},
  data() {
    return {
      id: '',
      num: 1,
      sum: 0,
      addr: 0,
      addrData: [],
      addrRadio: '',
      isNewAddr: false,
      goodsData: {},
      pages: 1,
      count: 0,
      goodsList: [],
      goodsPath: [],
      flag: false,
      fullscreenLoading: false,
      pay: false,
      payType: 0,
      radio1: [],
      provinces: [],
      dialogVisible: [false],
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getData();
    this.getProvinces();

    setTimeout(() => {
      this.numChange();
      this.getUserAddr();
    }, 500)
    setTimeout(() => {
      getRequest("/getGoodsDetilsListByCategory?cId=" + this.goodsData.category + "&pages=" + this.pages, {}).then(response => {
        let records = response.data.records;
        this.goodsList.splice(0, this.goodsList.length);
        for (let i = 0; i < records.length; i++) {
          this.goodsList.push(records[i]);
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '数据加载出错！'
        })
      })
    }, 500)
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 25) {
        return value.slice(0, 25) + "...";
      }
      return value;
    },
    ellipsis2(value) {
      if (!value) return "";
      if (value.length > 11) {
        return value.slice(0, 11) + "...";
      }
      return value;
    }
  },
  methods: {
    load() {
      let category = Math.round(Math.random() * 10) % 7;
      if (this.goodsData.category !== undefined) {
        category = this.goodsData.category;
      }
      console.log('分类', this.goodsData);
      getRequest("/getGoodsDetilsListByCategory?cId=" + category + "&pages=" + this.pages, {}).then(response => {
        let records = response.data.records;
        for (let i = 0; i < records.length; i++) {
          this.goodsList.push(records[i]);
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '数据加载出错！'
        })
      })
    },
    handleGoodsChange(index) {
      this.goodsData = this.goodsList[index];

    },
    getData() {
      getRequest("/getGoodsDetilsById?id=" + this.id, {}).then(response => {
            this.goodsData = response.data;
            console.log(
                "goodsData:   ", this.goodsData
            )
          }
      ).catch(error => {
        this.$message(error.msg);
      })
    },
    changeFlag() {
      this.flag = !this.flag;
    },
    changePhotoToVideo() {
      this.changeFlag();
    },
    handleClose(done) {
      done();
    },
    getUserAddr() {
      getRequest("/getUserAddr", {}).then(response => {
        this.addrData = response.data
      })
    },
    handleAddrChange() {
      for (let i = 0; i < this.addrData.length; i++) {
        if (this.addrData[i].id === this.addr) {
          this.addrRadio = this.addrData[i].state + " "
              + this.addrData[i].city + " "
              + this.addrData[i].district + " "
              + this.addrData[i].address;
        }
      }
      this.handleVisible(0, false, false)
    },
    clearRadio() {
      this.addr = 0;
      this.addrRadio = '';
      this.radio1.splice(1, this.radio1.length - 1);
      this.provinces.splice(1, this.provinces.length - 1);
    },
    handleVisible(index, isShow, isContinue) {
      if (index === 0) {
        this.getUserAddr();
      }
      this.dialogVisible.splice(index, 1, isShow);
      if (isContinue && !isShow && index !== 3) {
        this.dialogVisible.splice((index + 1) % 4, 1, !isShow);
      }

    },
    handChange(index) {
      //console.log("选中数组1： ",this.radio1)
      this.radio1.splice(index + 1, this.radio1.length - index - 1);
      // console.log("选中数组2： ",this.radio1)
      // console.log("省份信息：*************  ", this.provinces)
      this.provinces.splice(index + 1, this.provinces.length - index - 1);
      //console.log("省份信息：##########  ", this.provinces)
      switch (++index) {
        case 1: {
          this.getCity();
          break;
        }
        case 2: {
          this.getCounty();
          break;
        }
        case 3: {
          this.getTown();
          break;
        }
        case 4: {
          this.getCityById();
          break;
        }
      }
    },
    handlePayType(index) {
      this.pay = false;
      this.payType = index;
    },
    handlePayment() {
      this.fullscreenLoading = true;
      if (this.addr === 0 && this.radio1.length === 4) {
        postRequest("/addUserAddr", {
          addrId: this.provinces[3][this.radio1[3]].id,
          state: this.provinces[0][this.radio1[0]].extName,
          city: this.provinces[1][this.radio1[1]].extName,
          district: this.provinces[2][this.radio1[2]].extName,
          address: this.provinces[3][this.radio1[3]].extName,
        }).then(response => {
          this.addr = response.data;
        }).catch(error => {
          this.$message(error);
        });
      }
      if (this.addr === 0) {
        this.fullscreenLoading = false;
        this.$message({
          type: 'warning',
          message: "请选择地址..."
        });
        return;
      }
      if (this.payType === 1) {
        postRequest("/pay/api/trade/aliPay", {
          goodsId: this.id,
          sum: this.sum,
          num: this.num,
          paymentType: 1,
          userAddr: {
            id: this.addr
          }
        }).then(response => {
          document.write(response.data)
          this.fullscreenLoading = false;
        }).catch(error => {
          this.fullscreenLoading = false;
          this.$message.error(error.msg);
        })
      }
      //余额支付
      else {
        //  先检查余额是否足够
        getRequest("/checkBalance/" + this.sum, {}).then(response => {
          if (response.code === 200) {
            //  余额充足可以进一步生成订单
            this.$prompt('输入密码验证...', '系统提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputType: 'password',
              inputValidator: function (value) {
                return !(value.trim().length < 4 || value.trim().length > 15);
              },
              inputErrorMessage: '请输入登陆时使用的密码'
              //验证规则待定
            }).then(({value}) => {
              postRequest("/checkPassword", {
                password: value
              }).then(response => {
                if (response.code === 200) {
                  //开始订单业务
                  postRequest("/balanceOrder", {
                    goodsId: this.id,
                    sum: this.sum,
                    num: this.num,
                    paymentType: 0,
                    userAddr: {
                      id: this.addr
                    }
                  }).then(response => {
                    if (response.code == 200) {
                      this.fullscreenLoading = false;
                      this.$router.push("/success")
                    }
                  }).catch(error => {
                    this.fullscreenLoading = false;
                    this.$message({
                      type: 'error',
                      message: error.msg
                    });
                  })
                }
              }).catch(error => {
                this.$message({
                  type: 'warning',
                  message: '密码验证错误'
                });
              })
              this.fullscreenLoading = false;
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
              this.fullscreenLoading = false;
            })
          } else {
            this.fullscreenLoading = false;
            this.$message.error(response.msg)

          }
        })

      }
    },
    addShopCart() {
      postRequest("/shopcart/add", {
        goodsId: this.id,
        stock: this.num
      }).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.msg
          })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error.msg
        })
      })
    },
    getProvinces() {
      getRequest("/getProvince", {})
          .then(response => {
            this.provinces.splice(0, 1, response.data)
          })
          .catch(error => {
            this.$message(error.msg);
          })
    },
    getCity() {
      getRequest("/getCity?id=" + this.provinces[0][this.radio1[0]].id, {})
          .then(response => {
            this.provinces.splice(1, 1, response.data)
          })
          .catch(error => {
            this.$message(error.msg);
          })
    },
    getCounty() {
      getRequest("/getCounty?id=" + this.provinces[1][this.radio1[1]].id, {})
          .then(response => {
            this.provinces.splice(2, 1, response.data)
          })
          .catch(error => {
            this.$message(error.msg);
          })
    },
    getTown() {
      getRequest("/getTown?id=" + this.provinces[2][this.radio1[2]].id, {})
          .then(response => {
            this.provinces.splice(3, 1, response.data)
          })
          .catch(error => {
            this.$message(error.msg);
          })
    },
    getCityById() {
      getRequest("/getAreadataById?id=" + this.provinces[3][this.radio1[3]].id, {})
          .then(response => {
            this.provinces.splice(4, 1, response.data)
          })
          .catch(error => {
            this.$message(error.msg);
          })
    },
    numChange() {
      if (this.num === 0 || this.num === 1) {
        this.sum = this.goodsData.price;
      } else {
        this.sum = this.goodsData.price * this.num;
      }
    }
  }
}
</script>

<style scoped>
.addShopCar {
  color: #FF0036;
  font-weight: bold;
}

#buy:hover, #addShopCar:hover {
  border-color: #FF0036;
  color: #FF0036;
}

#buy:focus, #addShopCar:focus {
  border-color: #FF0036;
  background-color: #FF0036;
  color: white;
}

.infinite-list::-webkit-scrollbar {
  display: none;
}

</style>