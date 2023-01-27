<template>
  <el-row style="height: 600px">
    <el-col :span="24" v-if="flag"
            v-loading.fullscreen.lock="flag">

    </el-col>
    <el-col :span="24" v-if="!flag">
      <el-table
          :data="orders"
          border
          tooltip-effect="light"
          style="width: 100%;"
          max-height="600"
          height="600">
        <el-table-column
            label="序号"
            align="center"
            width="100">
          <template slot-scope="scope">
            <el-col :span="24">
              {{ (pages - 1) * 10 + scope.$index + 1 }}
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
            fixed
            show-overflow-tooltip
            align="center"
            label="订单编号"
            width="150">
          <template slot-scope="scope">
            <a style="text-decoration: none" @click="handleCopy(scope.$index)">
              {{ scope.row.orderId }}
            </a>
          </template>
        </el-table-column>
        <el-table-column
            label="商品信息"
            align="center"
            width="220">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <el-col :span="24">
                <el-col :span="5">
                  <el-image :src="goods[scope.$index].homeRecommendedImages" style="width: 50px;height: 50px"/>
                </el-col>
                <el-col :span="19">
                  商品名: {{ goods[scope.$index].model }}
                </el-col>
              </el-col>
              <el-col :span="24" style="height: 40px;line-height: 40px;">
                <el-col :span="5">
                  简介:
                </el-col>
                <el-col :span="18">
                  {{ goods[scope.$index].simpleDesc }}
                </el-col>
              </el-col>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ goods[scope.$index].model }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
            label="数量"
            align="center"
            width="100">
          <template slot-scope="scope">
            <p>
              {{ scope.row.payment / goods[scope.$index].price }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
            label="支付状态"
            align="center"
            width="120">
          <template slot-scope="scope">
            <el-col :span="24">
              <span style="color: #FF0036">{{ orderStatus[scope.row.orderStatus - 1] }}</span>
            </el-col>
          </template>
        </el-table-column>

        <el-table-column
            label="支付方式"
            align="center"
            width="180">
          <template slot-scope="scope">
            <el-col :span="24">
              <span style="color: rgba(202,69,97,0.84)">{{ payMentType[scope.row.paymentType] }}</span>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
            label="金额"
            prop="payment"
            align="center"
            width="180">
        </el-table-column>
        <el-table-column
            label="地址"
            align="center"
            width="250">
          <el-col :span="24" slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <el-col :span="24">
                <el-col :span="5">
                  地址:
                </el-col>
                <el-col :span="19">
                  {{ addr[scope.$index].state }}
                  {{ addr[scope.$index].city }}
                  {{ addr[scope.$index].district }}
                  {{ addr[scope.$index].address }}
                </el-col>
              </el-col>
              <el-col :span="24" style="height: 40px;line-height: 40px;">
                <el-col :span="5">
                  收货人:
                </el-col>
                <el-col :span="18">
                  {{ addr[scope.$index].name }}
                </el-col>
              </el-col>
              <el-col :span="24" style="height: 40px;line-height: 40px;">
                <el-col :span="5">
                  手机号:
                </el-col>
                <el-col :span="18">
                  {{ addr[scope.$index].mobile }}
                </el-col>
              </el-col>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">
                  {{ addr[scope.$index].state }}
                  {{ addr[scope.$index].city }}
                  {{ addr[scope.$index].district }}
                  {{ addr[scope.$index].address }}
                </el-tag>
              </div>
            </el-popover>
          </el-col>
        </el-table-column>

        <el-table-column
            label="创建日期"
            prop="createTime"
            align="center"
            width="180">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="150">
          <template slot-scope="scope">
            <!--            支付/取消订单-->
            <el-col :span="24" v-if="scope.row.orderStatus===1">
              <el-button @click="handleClick(scope.row)" type="text" size="small">立即支付</el-button>
              <el-button @click="cancelOrder(scope.row)" type="text" size="small">取消订单</el-button>
            </el-col>
            <!--            退款-->
            <el-col :span="24" v-if="scope.row.orderStatus===2">
              <el-button @click="refundInfo(scope.row)" type="text" size="small">申请退款</el-button>
            </el-col>
            <!--            收获-->
            <el-col :span="24" v-if="scope.row.orderStatus===3||scope.row.orderStatus===4">
              <el-button @click="confirmReceipt(scope.row)" type="text" size="small">确认收货</el-button>
            </el-col>
            <!--            售后-->
            <el-col :span="24" v-if="scope.row.orderStatus===8||scope.row.orderStatus===10">
              <el-button @click="contactService()" type="text" size="small">联系客服</el-button>
            </el-col>
            <el-col :span="24" v-if="scope.row.orderStatus===9">
              <el-button @click="handleClick(scope.row)" type="text" size="small">完成订单</el-button>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
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
      flag: true,
      orderStatus: ['未支付', '已支付', '未发货',
        '已发货', '交易成功', '交易关闭', '用户取消订单',
        '退款中', '已退款', '退款异常'],
      payMentType: ['余额支付', '支付宝支付'],
      goods: [],
      addr: [],
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
    setTimeout(() => {
      this.flag = false;
    }, 800)
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>