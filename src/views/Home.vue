<template>
  <div class="home">
    <el-divider/>
    <search/>
    <main-nav/>
  </div>
</template>
<script>
import mainNav from "@/components/mainNav";
import  search from "@/components/search"
export default {
  name: 'Home',
  components: {
    mainNav,
    search
  },
  data() {
    return {}
  },
  methods:{}
}
</script>
