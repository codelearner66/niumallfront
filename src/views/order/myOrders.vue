<template>
  <el-row>
    <el-divider></el-divider>
    <el-col v-if="flag" :span="24"></el-col>
    <el-col v-if="!flag" :offset=3 :span="18">
      <el-col :span="24">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-suitcase"></i>所有订单</span>
            <el-col :span="24">
              <order :orders="allOrder.records" :pages="allOrder.current"></order>
            </el-col>
            <el-col :span="24" style="margin-top: 10px">
              <el-pagination
                  :current-page="Number.parseInt(allOrder.current)"
                  :total="Number.parseInt(allOrder.total)"
                  background
                  layout="prev, pager, next"
                  @current-change="handlerAllOrder">
              </el-pagination>
            </el-col>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-suitcase"></i> 未支付</span>
            <el-col :span="24">
              <order :orders="noPay.records" :pages="noPay.current"></order>
            </el-col>
            <el-col :span="24" style="margin-top: 10px">
              <el-pagination
                  :current-page="Number.parseInt(noPay.current)"
                  :total="Number.parseInt(noPay.total)"
                  background
                  layout="prev, pager, next"
                  @current-change="handleCurrentChange">
              </el-pagination>
            </el-col>
          </el-tab-pane>
          <el-tab-pane>
          <span slot="label">
            <i class="el-icon-collection"></i> 已付款
          </span>
            <el-col :span="24">
              <order :orders="payed.records" :pages="payed.current"></order>
            </el-col>
            <el-col :span="24" style="margin-top: 10px">
              <el-pagination
                  :current-page="Number.parseInt(payed.current)"
                  :total="Number.parseInt(payed.total)"
                  background
                  layout="prev, pager, next"
                  style="font-size: large"
                  @current-change="handleCurrentChangePayed">
              </el-pagination>
            </el-col>
          </el-tab-pane>
          <el-tab-pane>
          <span slot="label">
            <i class="el-icon-truck"></i> 待收货
          </span>
            <el-col :span="24">
              <order :orders="OrderShopped.records" :pages="OrderShopped.current"></order>
            </el-col>
            <el-col :span="24" style="margin-top: 10px">
              <el-pagination
                  :current-page="Number.parseInt(OrderShopped.current)"
                  :total="Number.parseInt(OrderShopped.total)"
                  background
                  layout="prev, pager, next"
                  style="font-size: large"
                  @current-change="handleOrderUnshopped">
              </el-pagination>
            </el-col>
          </el-tab-pane>
          <el-tab-pane>
          <span slot="label">
            <i class="el-icon-chat-line-square"></i> 退款/售后
          </span>
            <el-col :span="24">
              <order :orders="OrderProcessing.records" :pages="OrderProcessing.current"></order>
            </el-col>
            <el-col :span="24" style="margin-top: 10px">
              <el-pagination
                  :current-page="Number.parseInt(OrderProcessing.current)"
                  :total="Number.parseInt(OrderProcessing.total)"
                  background
                  layout="prev, pager, next"
                  style="font-size: large"
                  @current-change="handlerOrderProcessing">
              </el-pagination>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import {getRequest} from "@/apis/api";
import Order from "@/components/order";

export default {
  name: "myOrders",
  components: {
    order: Order
  },
  data() {
    return {
      flag: true,
      allOrder: {},
      //未支付信息
      noPay: {},
      //已支付信息
      payed: {},
      //待收货
      OrderShopped: {},
      //退款中
      OrderProcessing: {},
    }
  },
  created() {
    this.getAllOrder(1);
    this.getNoPayData(1);
    this.getPayedData(1);
    this.getOrderUnshopped(1);
    this.getOrderProcessing(1);
    setTimeout(() => {
      this.flag = false;
    }, 250)
  },
  methods: {
    //获取用户所有订单
    getAllOrder(index) {
      getRequest('/userALlOrder/' + index, {}).then(response => {
        this.allOrder = response.data;
      }).catch(error => {
        this.$message.error(error.msg);
      })
    },
    handlerAllOrder(index) {
      this.getAllOrder(index);
    },
    //未支付获取数据
    getNoPayData(index) {
      getRequest("/userOrder/" + index, {}).then(response => {
        this.noPay = response.data;
      }).catch(error => {
        this.$message.error(error.msg);
      })
    },
    //未支付分页
    handleCurrentChange(index) {
      this.getNoPayData(index);
    },
    /**
     * 已支付查询数据
     * @param index
     */
    getPayedData(index) {
      getRequest("/userOrderpayed/" + index, {}).then(response => {
        this.payed = response.data;
      }).catch(error => {
        this.$message.error(error.msg);
      })
    },
    handleCurrentChangePayed(index) {
      this.getPayedData(index);
    },
    /**
     * 查询待收货订单（已发货）
     */
    getOrderUnshopped(index) {
      getRequest("/userOrderShopped/" + index, {}).then(response => {
        this.OrderShopped = response.data;
        console.log("待收货订单", this.OrderShopped)
      }).catch(error => {
        this.$message.error(error.msg);
      })
    },
    handleOrderUnshopped(index) {
      this.getOrderUnshopped(index);
    },
    /**
     * 查询退款中订单
     * @param index
     */
    getOrderProcessing(index) {
      getRequest("/userOrderProcessing/" + index, {}).then(response => {
        this.OrderProcessing = response.data;
        console.log("退款中订单", this.OrderProcessing)
      }).catch(error => {
        this.$message.error(error.msg);
      })
    },
    handlerOrderProcessing(index) {
      this.getOrderProcessing(index);
    }
  }
}
</script>

<style scoped>

</style>