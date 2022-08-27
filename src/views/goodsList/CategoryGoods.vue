<template>
  <el-row>
    <el-col :span="24">
      <el-col :span="18" :offset="3"
              style="max-height: 300px;height: 100px;border: 1px solid #aaca;padding: 5px 5px 5px 5px">
        <el-col :span="1"><span style="color: tomato;font-size: medium;padding-left: 10px;">品牌: </span></el-col>
        <el-col :span="21">
          <el-checkbox-group v-model="checkedCategory" size="small">
            <el-tooltip class="item" effect="light" :content="item.goodsCategoryDescribe" placement="top"
                        v-for="(item,index) in childrenData" :key="index">
              <el-checkbox :label="item.id" style="margin-top: 2px;margin-bottom: 4px" border>
                {{ item.goodsCategoryName }}
              </el-checkbox>
            </el-tooltip>

          </el-checkbox-group>
        </el-col>
        <el-col :span="2">
          <el-col :span="12">
            <el-button @click="handleChecked" class="category" style="padding: 0" type="text">
              <i class="el-icon-search">搜索</i>
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="text" @click="handleMore" class="category" style="padding: 0">
              更多<i v-show="!Ifmore" class="el-icon-arrow-down"></i>
              <i v-show="Ifmore" class="el-icon-arrow-up"></i>
            </el-button>
            <el-col :span="24" v-show="Ifmore">
              <el-button class="category" type="text" @click="handleCheckAllChange">全选</el-button>
            </el-col>
          </el-col>
        </el-col>

      </el-col>
    </el-col>
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
          @current-change="pageCurrentChange"
      >
      </el-pagination>
    </el-col>
  </el-row>

</template>

<script>
import {getRequest} from "@/apis/api";
import goods from "@/components/goods";
import Goods from "@/components/goods";

export default {
  name: "CategoryGoods",
  components: {Goods},
  data() {
    return {
      //夫类别id
      pid: '',
      Ifmore: false,
      //被选中的 品牌id
      checkedCategory: [],
      checkedCategoryTrue: [],
      //商品总数
      total: 100,
      size: 20,
      //总页数
      page: [],
      current: 1,
      //子品牌
      childrenData: [],
      //商品列表
      goodsListData: [],
      //全选品牌
      checkAll: false,
      //标记是初始搜索还是品牌搜索
      flag: false
    }
  },
  comments() {
    goods:goods
  },
  created() {
    this.pid = this.$route.params.pid;
    console.log(this.pid);
    this.getChildData();
    this.getGoodsListData();
  },
  methods: {
    getChildData() {
      getRequest("/getChildCategory?id=" + this.pid, {
        id: this.pid
      }).then(resopnse => {
        this.childrenData = resopnse.data;
        console.log("获取数据", this.childrenData)
      }).catch(error => {
        this.$message(error.msg)
      })
    },
    getGoodsListData() {
      this.flag = false;
      this.goodsListData.splice(0, this.goodsListData.length);
      getRequest("/getGoodsDetilsListByCategory?cId=" + this.pid + "&pages=" + this.current, {}).then(response => {
        this.page = response.data;
        console.log("page:     >>>>>>", this.page)
        this.goodsListData = response.data.records;
        this.total = parseInt(response.data.total);
      }).catch(error => {
        this.$message(error.msg)
      })
    },
    handleChecked() {
      this.flag = true;
      this.checkedCategoryTrue = this.checkedCategory;
      this.current = 1;
      // console.log("被选中元素： ",this.checkedCategoryTrue)
      if (this.checkedCategoryTrue.length > 0) {
        this.goodsListData.splice(0, this.goodsListData.length);
        this.getData();
      }
    },
    getData() {
      getRequest("/getGoodsDetilsListByBrand?cId=" + (this.checkedCategoryTrue || []).join(',') + "&pages=" + this.current, {}).then(response => {
        this.goodsListData = response.data.records;
        this.total = parseInt(response.data.total);
        this.page = parseInt(response.data.pages);
        this.current = parseInt(response.data.current)
      }).catch(error => {
        this.$message(error.msg)
      })
    },
    pageCurrentChange(currentPage) {
      this.current = currentPage;
      if (this.flag) {
        this.getData();
        this.flag = true;
      } else {
        this.getGoodsListData();
      }

    },
    handleMore() {
      this.Ifmore = !this.Ifmore;
    },
    handleCheckAllChange() {
      if (!this.checkAll) {
        this.checkedCategory.splice(0, this.checkedCategory.length)
        for (let i = 0; i < this.childrenData.length; i++)
          this.checkedCategory.push(this.childrenData[i].id);
        this.checkAll = true
      } else {
        this.checkAll = false;
        this.checkedCategory.splice(0, this.checkedCategory.length)
      }

    }
  }
}
</script>

<style scoped>
.category {
  text-decoration: none;
  font-size: xx-small;
  color: #2c3e50;
}

.category:hover {
  color: tomato;
}

.item {
  margin: 4px;
}
</style>