<template>
  <el-row style="height: 600px">
    <el-col :span="24" v-if="flag"
            v-loading.fullscreen.lock="flag">

    </el-col>
    <el-col :span="24" v-if="!flag" style="height: 600px">
      <el-table
          :data="orders"
          border
          tooltip-effect="light"
          style="width: 100%;"
          max-height="550"
          height="550">
        <el-table-column
            label="序号"
            align="center"
            width="100">
          <template slot-scope="scope">
            <el-col :span="24">
              {{ scope.$index + 1 }}
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
            fixed
            prop="orderId"
            show-overflow-tooltip

            align="center"
            label="订单编号"
            width="150">
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
          <p>1</p>
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
            label="支付状态"
            align="center"
            width="180">
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
            <el-col :span="24" v-if="scope.row.orderStatus===1">
              <el-button @click="handleClick(scope.row)" type="text" size="small">立即支付</el-button>
              <el-button @click="cancelOrder(scope.row)" type="text" size="small">取消订单</el-button>
            </el-col>
            <el-col :span="24" v-if="scope.row.orderStatus===2">
              <el-button @click="handleClick(scope.row)" type="text" size="small">申请退款</el-button>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

  </el-row>
</template>
<script>
import {getRequest, postRequest} from "@/apis/api";

export default {
  name: "order",
  props: ["orders"],
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
      console.log('orders:   =====>', this.orders)
      for (let i = 0; i < this.orders.length; i++) {
        this.goods[i] = JSON.parse(this.orders[i].orderContent);

        getRequest("/getUserAddrById/" + this.orders[i].addrId).then(response => {
          console.log("================>", response)
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
    console.log("addr:", this.addr)
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>