<template>
  <el-row>
    <el-col :span="24" v-if="flag"
            v-loading.fullscreen.lock="flag">

    </el-col>
    <el-col :span="24" v-if="!flag">
      <el-table
          :data="orders"
          border
          tooltip-effect="light"
          style="width: 100%;"
          max-height="400px">
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
              <span style="color: #FF0036">{{ scope.row.orderStatus }}</span>
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
            width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

  </el-row>
</template>
<script>
import {getRequest} from "@/apis/api";

export default {
  name: "order",
  props: ["orders"],
  data() {
    return {
      flag: true,
      orderStatus: ['未支付', '已支付'],
      goods: [],
      addr: [],
    }
  },
  created() {
    setTimeout(() => {
      console.log('orders:   =====>', this.orders)
      for (let i = 0; i < this.orders.length; i++) {
        this.goods.push(JSON.parse(this.orders[i].orderContent));

        this.orders[i].orderStatus = this.orderStatus[this.orders[i].orderStatus - 1];
        //todo 地址和商品信息不对照
        getRequest("/getUserAddrById/" + this.orders[i].addrId).then(response => {
          this.addr.push(response.data);
        }).catch(error => {
          this.$message.error(error.msg);
        })
      }
    }, 800)
    setTimeout(() => {
      this.flag = false;
    }, 1000)
    console.log("addr:", this.addr)
  },
  methods: {}
}
</script>

<style scoped>

</style>