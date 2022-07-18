<template>

</template>

<script>
import {getRequest} from "@/apis/api";

export default {
  name: "CategoryGoods",
  data(){
    return{
      pid:'',
      childrenData:[]
    }
  },
  created() {
    this.pid = this.$route.params.pid;
    console.log(this.pid);
    this.getChildData();
  },
  methods:{
    getChildData(){
      getRequest("/getChildCategory?id="+this.pid,{
        id:this.pid
      }).then(resopnse=>{
        this.childrenData=resopnse.data;
        console.log("获取数据",this.childrenData)
      }).catch(error=>{
        this.$message(error.msg)
      })
    }
  }
}
</script>

<style scoped>

</style>