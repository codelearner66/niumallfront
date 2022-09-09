<template>
  <el-row>
    <el-divider></el-divider>
    <el-col :offset=3 :span="18">
      <el-col :span="24">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-suitcase"></i> 未支付</span>
            <el-col :span="24" style="height: 400px; background-color: #798690">
              <order :orders="noPay.records"></order>
            </el-col>
          </el-tab-pane>


          <el-tab-pane>
          <span slot="label">
            <i class="el-icon-collection"></i> 已付款
          </span>
            消息中心
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
      noPay: {},
      payed: [],
    }
  },
  created() {
    this.getNoPayData();
  },
  methods: {
    getNoPayData() {
      getRequest("/userOrder/" + 1, {}).then(response => {
        this.noPay = response.data;
        console.log("this.noPay", this.noPay);
        let records = this.noPay.records;
        console.log(JSON.parse(records[0].orderContent));
      })
    }
  }
}
</script>

<style scoped>

</style>