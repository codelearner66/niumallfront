<template>
  <el-row id="goodsMain">
    <el-col v-for="(item,index) in goodsList" :key="index"
            :span="4" class="goodsStyle"
            @mouseenter.native="handleEnter(index)"
            @mouseleave.native="handleLeave(index)">
      <el-col :span="24" style="height: 270px">
        <router-link :to="{name:'goodsDetails',params:{id:item.id}}">
          <img :src="item.homeRecommendedImages" alt="展示图片" height="100%" style="border-radius: 10px" width="100%">
        </router-link>
      </el-col>

      <el-col :span="24" style="height: 60px">
        <el-col style="margin-top: 4px">
         <span style="font-size:smaller">
           <el-tooltip :content="item.simpleDesc" class="item" effect="light" placement="right-end">
             <router-link :class="[flag[index] ? 'navClassHover' : 'navClass']"
                          :to="{name:'goodsDetails',params:{id:item.id}}">
              {{ item.simpleDesc | ellipsis }}
             </router-link>
           </el-tooltip>
         </span>
        </el-col>
        <el-col :span="24">
          <router-link :to="{name:'goodsDetails',params:{id:item.id}}" class="navClass navPrices">
            <p :style="{color:changeColor[index]}" class="navPrices" style="width: 100%;">
              <i class="icon-renminbi1688">{{ item.price }} <span>起</span></i>
              <span style="float:right; margin-left:20%">
              <i class="el-icon-view">  {{ item.accessCount }}</i>
            </span>
            </p>
          </router-link>
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "goods",
  props: ["goodsList"],//商品类别 根据类别进行加载显示
  data() {
    return {
      // flag: false,
      navClass: 'navClass',
      navClassHover: 'navClassHover',
      flag: [],
      changeColor: [],
      path: []
    }
  },
  created() {
    this.flag = new Array(50);
    this.changeColor = new Array(50);
    for (let i = 0; i < this.flag.length; i++) {
      this.flag[i] = false;
      this.changeColor[i] = 'tomato'
    }
    //构造商品路由地址
    this.path.splice(0, this.path.length)
    for (let i = 0; i < this.goodsList.length; i++) {
      this.path.push("/goodsDetails/" + this.goodsList[i].id);
    }
    console.log("路由路径：：   ", this.path)
  },
  methods: {
    handleEnter(id) {
      this.flag.splice(id, 1, true)
      this.changeColor.splice(id, 1, "white");
    },
    handleLeave(id) {
      this.flag.splice(id, 1, false)
      this.changeColor.splice(id, 1, "tomato");
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 18) {
        return value.slice(0, 18) + "...";
      }
      return value;
    }
  }
}
</script>

<style scoped>
.goodsStyle {
  height: 350px;
  box-shadow: #798690 0 0 8px;
  border-radius: 10px;
  padding: 2px;
  margin: 5px;
}

.goodsStyle:hover {
  background-color: #e56060;
  color: white;
}

#goodsMain:first-child {
  margin-left: -1.45%;
}

.navClass {
  text-decoration: none;
  line-height: 20px;
  color: #2c3e50;
}

.navClassHover {
  text-decoration: none;
  color: #eff1f3;
  line-height: 20px;
}

.navClass:hover {
  color: #de4949;
}

.navPrices {
  color: tomato;
  float: left;
  margin-left: 10px;
  width: 90%;
  font-size: medium;
}

.navPrices span {
  vertical-align: text-top;
  font-size: 5px;
}

.navPricesColor {
  color: white;
}
</style>