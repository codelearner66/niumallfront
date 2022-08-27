<template>
  <div class="bg-fa of" style="padding: 40px;">
    <el-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              :image-size="400"
              description="支付成功"
    >
      <el-button type="text" class="buttonStyle" @click="handlePageToIndex">返回首页</el-button>
      <el-button type="text" class="buttonStyle" @click="handlePage">查看订单</el-button>
    </el-empty>
  </div>
</template>

<script>
export default {
  name: "success",
  methods: {
    handlePageToIndex() {
      this.$router.push('/')
    },
    handlePage() {
      this.$router.push('/myInfor')
    }
  }
}
</script>

<style scoped>
.buttonStyle {
  color: tomato;
}
</style>