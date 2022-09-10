<template>
  <el-row>
    <el-divider></el-divider>
    <el-col :offset=3 :span="18">
      <el-col :span="24">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-suitcase"></i> 未支付</span>
            <el-col :span="24" style="height: 580px;">
              <order :orders="noPay.records"></order>
            </el-col>
            <el-col :span="24" style="height: 40px;line-height: 40px">
              <el-pagination
                  layout="prev, pager, next"
                  background
                  :current-page="Number.parseInt(noPay.current)"
                  @current-change="handleCurrentChange"
                  :total="Number.parseInt(noPay.total)">
              </el-pagination>
            </el-col>
          </el-tab-pane>


          <el-tab-pane>
          <span slot="label">
            <i class="el-icon-collection"></i> 已付款
          </span>
            <el-col :span="24" style="height: 580px;">
              <order :orders="payed.records"></order>
            </el-col>
            <el-col :span="24" style="height: 40px;line-height: 40px">
              <el-pagination
                  background
                  layout="prev, pager, next"
                  :current-page="Number.parseInt(payed.current)"
                  @current-change="handleCurrentChangePayed"
                  :total="Number.parseInt(payed.total)">
              </el-pagination>
            </el-col>
          </el-tab-pane>
          <el-tab-pane>
          <span slot="label">
            <i class="el-icon-truck"></i> 待收货
          </span>
            角色管理
          </el-tab-pane>
          <el-tab-pane>
          <span slot="label">
            <i class="el-icon-chat-line-square"></i> 退款/售后
          </span>
            定时任务补偿
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
      //未支付信息
      noPay: {},
      //已支付信息
      payed: {},
    }
  },
  created() {
    this.getNoPayData(1);
    this.getPayedData(1);
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>