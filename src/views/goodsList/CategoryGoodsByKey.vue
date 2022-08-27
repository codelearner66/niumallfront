<template>
  <el-row>
    <el-col :span="24" style="margin-top: 15px">
      <el-col :span="21" :offset="3">
        <goods v-bind:goodsList="goodsListData"/>
      </el-col>
    </el-col>
    <el-col :span="24" style="margin-top: 15px" v-show="this.goodsListData.length<=0">
      <el-empty description="您搜索的商品不存在......">
        <el-button type="text" @click="this.$r">返回</el-button>
      </el-empty>
    </el-col>
    <el-col :span="24" v-show="this.goodsListData.length>0">
      <el-pagination
          layout="prev, pager, next"
          :page-size="this.size"
          :current-page="current"
          :total="this.total"
          @current-change="pageCurrentChange"
      >
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import goods from "@/components/goods";
import {getRequest} from "@/apis/api";

export default {
  name: "CategoryGoodsByKey",
  components: {
    goods: goods
  },
  data() {
    return {
      //搜索关键字
      key: '',
      //数据总条数
      total: 100,
      size: 20,
      //当前页
      current: 1,
      //  商品数据
      goodsListData: []
    }
  },
  created() {
    this.key = this.$route.params.key;
    this.getGoodsByKey();
  },
  methods: {
    getGoodsByKey() {
      getRequest("/getGoodsDetilsByKey?key=" + this.key + "&pages=" + this.current, {}).then(response => {
        this.goodsListData = response.data.records;
        this.total = parseInt(response.data.total);
        this.current = parseInt(response.data.current)
      }).catch(error => {
        this.$message(error.msg)
      })
    },
    pageCurrentChange(currentPage) {
      this.current = currentPage;
      this.getGoodsByKey();
    }
  }
}
</script>

<style scoped>

</style>