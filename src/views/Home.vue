<template>
  <el-row class="home">
    <el-divider/>
    <search/>
    <main-nav/>
    <el-col :span="24" style="margin-top: 15px">
      <el-col :span="21" :offset="3">
        <goods v-bind:goodsList="goodsListData"/>
      </el-col>
    </el-col>
    <el-col :span="24">
      <el-pagination
          layout="prev, pager, next"
          :page-size="this.size"
          :current-page="current"
          :total="this.total"
          @current-change="pageCurrentChange">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import mainNav from "@/components/mainNav";
import search from "@/components/search"
import {getRequest} from "@/apis/api";
import goods from "@/components/goods";

export default {
  name: 'Home',
  components: {
    mainNav,
    search,
    goods
  },
  data() {
    return {
      goodsListData: [],
      //商品总数
      total: 100,
      size: 50,
      //总页数
      page: [],
      current: 1
    }
  },
  created() {
    this.getGoods();
  },
  methods: {
    getGoods() {
      getRequest("/getPages?pages=" + this.current, {}).then(response => {
        this.goodsListData = response.data.records;
        this.total = parseInt(response.data.total);
        this.current = parseInt(response.data.current)
      }).catch(error => {
        this.$message(error.msg)
      })
    },
    pageCurrentChange(currentPage) {
      this.current = currentPage;
      this.getGoods();
    }
  }
}
</script>
