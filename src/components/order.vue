<template>
  <el-row>
    <el-empty v-if="orders===undefined||orders.length===0" description="这里空空如也了..."></el-empty>
    <el-col v-else :span="24">
      <el-table
          :data="orders"
          style="width: 100%;margin: 0 auto"
          tooltip-effect="light"
          @selection-change="handleSelectionChange">
        <el-table-column
            align="center"
            type="selection"
            width="50">
        </el-table-column>
        <el-table-column
            align="center"
            label="宝贝"
            width="400">
          <template slot-scope="scope">
            <el-col :span="24">
              <el-col :span="24" class="order_header"
                      style="height: 30px;background-color: #a3e8ca;font-size: xx-small;line-height: 30px">
                <el-col :span="5" style="float: left">
                  {{ String(scope.row.createTime).slice(0, 10) }}
                </el-col>
                <el-col :span="18" style="float: left;font-size: xx-small;">
                  <el-tooltip content="点击复制订单号" effect="light" placement="top">
                    <a style="text-decoration: none;font-size: xx-small;" @click="handleCopy(scope.$index)">
                      订单号：{{ scope.row.orderId }}
                    </a>
                  </el-tooltip>

                </el-col>
              </el-col>
              <el-col :span="24" style="margin-top: 4px">
                <el-col :span="5">
                  <router-link :to="{name:'goodsDetails',params:{id:scope.row.goodsId}}">
                    <el-avatar :size="80" :src="goods[scope.$index].homeRecommendedImages" shape="square"></el-avatar>
                  </router-link>
                </el-col>
                <el-col :span="19" style="font-size: xx-small;text-align: left">
                  <el-col :span="24" style="height: 25px;padding-left: 4px">
                    <router-link :to="{name:'goodsDetails',params:{id:scope.row.goodsId}}"
                                 style="text-decoration: none; line-height: 25px;color: #1f2327; font-size: xx-small">
                      商品名: {{ goods[scope.$index].title }}
                    </router-link>
                  </el-col>
                  <el-col :span="24" style="height: 20px;padding-left: 4px">
                    型号: {{ goods[scope.$index].model }}
                  </el-col>
                  <el-col :span="24" style="height: 20px;padding-left: 4px">
                    描述: {{ goods[scope.$index].simpleDesc }}
                  </el-col>
                </el-col>

              </el-col>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="单价"
            width="150">
          <template slot-scope="scope">
            <el-col :span="24" style="font-size: xx-small;color: #e83e62">
              <i class="icon-rmb">{{ goods[scope.$index].price }}</i>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="数量"
            width="80">
          <template slot-scope="scope">
            <p>
              {{ scope.row.payment / goods[scope.$index].price }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="实付款"
            width="160">
          <template slot-scope="scope">
            <el-col :span="24">
              <el-col :span="24">
                <b><i class="icon-rmb" style="font-size: xx-small;color: tomato">{{ scope.row.payment }}</i> </b>
              </el-col>
              <el-col :span="24">
                <span style="font-size: xx-small;color: rgba(202,69,97,0.84)">{{
                    payMentType[scope.row.paymentType]
                  }}</span>
              </el-col>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="交易状态"
            width="100">
          <template slot-scope="scope">
            <el-col :span="24">
              <span style="color: #FF0036;font-size: xx-small">{{ orderStatus[scope.row.orderStatus - 1] }}</span>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="订单操作"
            width="150">
          <template slot-scope="scope">
            <!--            支付/取消订单-->
            <el-col v-if="scope.row.orderStatus===1" :span="24">
              <el-button size="small" type="text" @click="handleClick(scope.row)">立即支付</el-button>
              <el-button size="small" type="text" @click="cancelOrder(scope.row)">取消订单</el-button>
            </el-col>
            <!--            退款-->
            <el-col v-if="scope.row.orderStatus===2" :span="24">
              <el-button size="small" type="text" @click="refundInfo(scope.row)">申请退款</el-button>
            </el-col>
            <!--            收获-->
            <el-col v-if="scope.row.orderStatus===3||scope.row.orderStatus===4" :span="24">
              <el-button size="small" type="text" @click="confirmReceipt(scope.row)">确认收货</el-button>
            </el-col>
            <!--            售后-->
            <el-col v-if="scope.row.orderStatus===8||scope.row.orderStatus===10" :span="24">
              <el-button size="small" type="text" @click="contactService()">联系客服</el-button>
            </el-col>
            <el-col :span="24">
              <el-button size="small" type="text" @click="viewDetails(scope.row,scope.$index)">其他信息</el-button>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <el-dialog
          :before-close="handleDialogClose"
          :visible.sync="flag"
          title="其他信息"
          top="50px"
          width="70%">
        <el-col v-if="flag" :span="24">
          <el-col :span="24">
            <el-col v-show="activeGoods.orderStatus<=5" :span="24">
              <el-steps :active="activeGoods.orderStatus" align-center finish-status="success">
                <el-step :description="activeGoods.createTime" title="拍下商品"></el-step>
                <el-step :description="activeGoods.paymentTime" title="付款成功"></el-step>
                <el-step :description="activeGoods.consignTime?activeGoods.consignTime:'未发货'" title="卖家发货"></el-step>
                <el-step :description="activeGoods.endTime?activeGoods.endTime:'未确认收货'" title="确认收获"></el-step>
                <el-step :description="activeGoods.endTime?activeGoods.endTime:'未收货'" title="交易完成"></el-step>
              </el-steps>
            </el-col>
            <el-col :span="24" style="margin-top: 20px">
              <el-col :span="8">
                <el-col :span="24"
                        style="text-align: left;padding-left: 10px;color: #1f2327;background-color: #c2c9ce;height: 30px;line-height: 30px">
                  订单信息
                </el-col>
                <el-col :span="24" style="border-left: 1px solid #e3e0e3;border-bottom: 1px solid #e3e0e3">
                  <el-col :span="10">
                    <el-col :span="24" style="height: 60px;line-height: 60px">
                      收货地址：
                    </el-col>
                    <el-col :span="24" style="height: 40px;font-size: x-small;">
                      订单编号：
                    </el-col>
                    <el-col :span="24" style="height: 40px;font-size: x-small;line-height: 40px">
                      支付流水：
                    </el-col>
                  </el-col>
                  <!--                  -->
                  <el-col :span="14">
                    <el-col v-if="addr.length>0" :span="24" style="height: 60px;font-size: small;padding-top: 5px;">
                      {{ addr[activeIndex].state }}
                      {{ addr[activeIndex].city }}
                      {{ addr[activeIndex].district }}
                      {{ addr[activeIndex].address }}
                    </el-col>
                    <el-col :span="24" style="height: 40px;font-size: x-small;">
                      {{ orders[activeIndex].orderId }}
                    </el-col>
                    <el-col :span="24" style="height: 40px;font-size: x-small;line-height: 40px">
                      {{ orders[activeIndex].paymentId }}
                    </el-col>
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="16">
                <el-col :span="24"
                        style="text-align: left;;color: #1f2327;background-color: #c2c9ce;height: 30px;line-height: 30px;padding-left: 40px">
                  &nbsp;
                </el-col>
                <el-col :span="24" style="border-left: 1px solid #e3e0e3;padding-left: 5px;height: 140px">
                  <el-col :span="24" style="text-align: left;padding-left: 10%;margin-top: 10px;">
                    订单状态:
                    <el-tag type="danger">{{ orderStatus[activeGoods.orderStatus - 1] }}</el-tag>
                  </el-col>
                  <el-col :span="24" style="line-height:25px;text-align: left;padding-left: 10%;margin-top: 10px">
                    快递 <span
                      style="color: #d35973">{{ activeGoods.shippingName === undefined ? '暂无' : activeGoods.shippingName }}</span>
                    : {{ activeGoods.shippingCode === undefined ? '暂无' : activeGoods.shippingCode }}
                  </el-col>
                  <el-col :span="24" style="line-height:25px;text-align: left;padding-left: 10%;margin-top: 10px">
                    用户 <span style="color: #d35973">{{ addr[activeIndex].name }}</span> : {{ addr[activeIndex].mobile }}
                  </el-col>
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <span slot="footer" class="dialog-footer">
           <el-button type="primary" @click="handleDialogClose">关闭</el-button>
        </span>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import {getRequest, postRequest} from "@/apis/api";
import router from "@/router";

export default {
  name: "order",
  props: ["orders", 'pages'],
  data() {
    return {
      flag: false,
      activeIndex: 0,
      activeGoods: {},
      orderStatus: ['未支付', '已支付', '未发货',
        '已发货', '交易成功', '交易关闭', '用户取消订单',
        '退款中', '已退款', '退款异常'],
      payMentType: ['余额支付', '支付宝支付'],
      goods: [],
      addr: [],
      multipleSelection: []
    }
  },
  created() {
    setTimeout(() => {
      this.goods = new Array(this.orders.length);
      this.addr = new Array(this.orders.length)
      for (let i = 0; i < this.orders.length; i++) {
        this.goods[i] = JSON.parse(this.orders[i].orderContent);
        getRequest("/getUserAddrById/" + this.orders[i].addrId).then(response => {
          if (response.code == 200) {
            this.addr[i] = response.data;
          } else {
            this.addr[i] = {
              addrId: "140213205",
              address: "删除",
              city: "信",
              delFlag: 0,
              district: "息已",
              id: "-1",
              mobile: "XXXXXXXXXXX",
              name: "*****",
              phone: "XXXXXXXXXXX",
              receiverZip: "******",
              state: "地址",
              userId: "*********"
            }
          }
        }).catch(error => {
          this.$message.error(error.msg);
        })
      }
    }, 100)
  },
  methods: {
    handleSelectionChange(val) {
      // this.multipleSelection 缓存的是订单信息
      this.multipleSelection = val;
      // console.log("this.multipleSelection:  ",this.multipleSelection);
    },
    //重新支付
    handleClick(item) {
      console.log("item===========>", item);
      getRequest("/pay/api/trade/" + item.orderId, {}).then(response => {
        document.write(response.data)
      }).catch(error => {
        this.$message.error(error.msg);
      })
    },
    //取消订单
    cancelOrder(item) {
      postRequest("/pay/api/trade/close/" + item.orderId, {}).then(response => {
        if (response.code == 200) {
          this.$message.success("操作成功")
        }
      }).catch(error => {
        this.$message.error(error.msg);
      })
    },
    //  申请退款
    refundInfo(item) {
      console.log('退款信息', item);
      this.$prompt('请输入退款理由，方便管理员进行处理！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: (item) => {
          if (item === undefined || item.length < 6) {
            return '理由不能过短或为空！'
          } else {
            return true;
          }
        },
        inputPlaceholder: '请输入退款理由....'
      }).then(({value}) => {
        postRequest("/refundOrder", {
          orderNo: item.orderId,
          reason: value
        }).then(response => {
          if (response.code == 200) {
            this.$message.success("申请退款成功，管理员会尽快处理！")
          } else {
            this.$message.info(response.msg);
          }
        }).catch(error => {
          this.$message.error(error.msg);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    //确认收货完成订单
    confirmReceipt(item) {
      console.log("item======>", item)
      let orderId = item.orderId;
      postRequest("/confirmReceipt", {
        orderId: orderId
      }).then(response => {
        if (response.code == 200) {
          this.$message.success("操作成功！")
        }
      }).catch(error => {
        this.$message.error(error.msg);
      })
    },
    //点击复制订单id
    handleCopy(index) {
      let orderId = this.orders[index].orderId;
      // 模拟 输入框
      var cInput = document.createElement("input");
      cInput.value = orderId;
      document.body.appendChild(cInput);
      cInput.select(); // 选取文本框内容

      // 执行浏览器复制命令
      // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
      // Input要在正常的编辑状态下原生复制方法才会生效

      document.execCommand("copy");

      this.$message({
        type: "success",
        message: "复制成功"
      });
      // 复制成功后再将构造的标签 移除
      document.body.removeChild(cInput);
    },
    contactService() {
      router.push("message");
    },
    viewDetails(item, index) {
      this.activeGoods = item;
      this.activeIndex = index;
      console.log("this.activeGoods: ", this.addr[index])
      this.handleDialogClose();
    },
    handleDialogClose() {
      this.flag = !this.flag;
    }
  }
}
</script>

<style scoped>

</style>