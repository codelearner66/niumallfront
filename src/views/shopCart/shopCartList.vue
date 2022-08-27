<template>
  <el-row>
    <el-col :offset="1" :span="18"
            style="margin-top: 40px; height: 900px; border: 1px solid tomato;border-radius: 10px">
      <el-col :span="24" style="padding-top: 5px;">
        <el-col :span="5"
                style="height: 50px; font-weight: bold; font-size: large;font-family: 'roboto mono', monospace;line-height: 50px">
          <span>购物车（全部  <span style="font-weight: bolder ;color: #FF0036">{{ total }}</span>）</span>
        </el-col>
        <el-col :offset="13" :span="6">
          <span style="font-size: small">已选商品(不含运费)</span>
          <span style="margin-left: 10px; color: #FF0036;font-weight: bold;">{{ SelectionSum }}</span>
          <el-tooltip content="仅支持余额支付" effect="light" placement="top">
            <el-button id="settleAccounts" @click="settleAccounts" plain="plain" type="text">结算</el-button>
          </el-tooltip>

        </el-col>
      </el-col>
      <el-col :span="24">
        <hr style=" height:1px;border-left:none; border-bottom:none;border-top:1px solid #becdd8;"/>
      </el-col>
      <el-col :span="24">
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              label="全选"
              header-align="center"
              align="center"
              width="55">
          </el-table-column>
          <el-table-column
              prop="title"
              label="商品信息"
              header-align="center"
              width="180">
            <template slot-scope="scope">
              <el-col :span="24">
                <el-col :span="8">
                  <img width="50px" height="40px" :src="scope.row.images" alt="图片">
                </el-col>
                <el-col :span="16">
                  <el-tooltip class="item" effect="light" :content="scope.row.title" placement="top">
                    <router-link :to="{name:'goodsDetails',params:{id:scope.row.goodsId}}"
                                 style="text-decoration: none; line-height: 47px;color: #1f2327; font-size: xx-small">
                      {{ scope.row.title | ellipsis2 }}
                    </router-link>
                  </el-tooltip>
                </el-col>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column
              prop="price"
              label="单价"
              header-align="center"
              align="center"
              width="180">
          </el-table-column>
          <el-table-column
              header-align="center"
              align="center"
              label="数量">
            <template slot-scope="scope">
              <el-input-number v-model="num[scope.$index]"
                               size="small"
                               controls-position="right"
                               @change="numChange(scope.$index)"
                               :min="1"
                               :max="100">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column
              prop="sum"
              header-align="center"
              align="center"
              label="金额">
            <template slot-scope="scope">
              <el-col :span="24" style="color: #FF0036;">
                <i class="icon-renminbi1688">{{ sum[scope.$index] }}</i>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column
              header-align="center"
              align="center"
              label="操作">
            <template slot-scope="scope">
              <el-col :span="24">
                <el-button style="color: #42b983" @click="handlePayout(scope.$index)" type="text" size="small">结算
                </el-button>
                <el-button style="color: #7f44ba" @click="addShopCart(scope.$index)" type="text" size="small">保存
                </el-button>
                <el-button @click="shopCartDelete(scope.$index)" style="color: #FF0036" type="text" size="small">删除
                </el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <el-dialog
            title="结算商品"
            :visible.sync="dialogTableVisible"
            width="60%">
          <el-col :span="24">
            <el-col :span="3" style="font-weight: bold;font-size: small">
              选择收货地址
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-radio-group v-model="addr" size="small" fill="#Ffffff" text-color="#FF0036">
              <el-radio-button class=" payButton" style="margin-top: 15px;margin-left: 5px;padding: 3px;"
                               v-for="(item,index) in addrData"
                               :key="index"
                               :label="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right">{{ item.mobile }}</span> <br>
                <p>{{ item.state }}{{ item.city }}{{ item.district }} {{ item.address }}</p>
              </el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="24" style="height: 40px;padding: 10px 0">
            <hr style=" height:1px;border-left:none; border-bottom:none;border-top:1px solid #becdd8;"/>
          </el-col>
          <el-col :span="24">
            <el-col :span="24">
              <el-table
                  ref="multipleTable"
                  :data="checkedOne"
                  tooltip-effect="dark"
                  style="width: 100%">
                <el-table-column
                    prop="title"
                    label="商品信息"
                    header-align="center"
                    align="center"
                    width="180">
                  <template slot-scope="scope">
                    <el-col :span="24">
                      <el-col :span="8">
                        <img width="50px" height="40px" :src="scope.row.images" alt="图片">
                      </el-col>
                      <el-col :span="16">
                        <el-tooltip class="item" effect="light" :content="scope.row.title" placement="top">
                          <router-link :to="{name:'goodsDetails',params:{id:scope.row.goodsId}}"
                                       style="text-decoration: none; line-height: 47px;color: #1f2327; font-size: xx-small">
                            {{ scope.row.title | ellipsis2 }}
                          </router-link>
                        </el-tooltip>
                      </el-col>
                    </el-col>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="单价"
                    header-align="center"
                    align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="数量"
                    header-align="center"
                    align="center">
                  <template slot-scope="scope">
                    {{ num[checkedIndex] }}
                  </template>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    label="金额">
                  <template slot-scope="scope">
                    <el-col :span="24" style="color: #FF0036;">
                      <i class="icon-renminbi1688">{{ sum[checkedIndex] }}</i>
                    </el-col>
                  </template>
                </el-table-column>
                <el-table-column
                    label="邮费"
                    header-align="center"
                    align="center">
                  <template slot-scope="scope">
                   <span style="font-size: xx-small">
                     <span style="color: #FF0036"><i class="icon-renminbi1688">0.00</i> </span> 免邮
                   </span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="付款方式"
                    header-align="center"
                    align="center">
                  <template slot-scope="scope">
                    <el-col :span="24">
                      <el-col :span="24">
                        <el-button class="payButton" @click="aliPay" plain type="text">
                          <i style="font-size: xx-small" class="icon-alipay"> 支付宝支付</i>
                        </el-button>
                      </el-col>
                      <el-col :span="24">
                        <el-button class="payButton" @click="normalPay" plain type="text">
                          <i style="font-size: xx-small" class="el-icon-wallet"> 余额支付</i>
                        </el-button>
                      </el-col>
                    </el-col>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-col>
          <el-col :span="24" style="height: 40px;padding: 10px 0">
            <hr style=" height:1px;border-left:none; border-bottom:none;border-top:1px solid #becdd8;"/>
          </el-col>
          <span slot="footer" class="dialog-footer">
                   <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
              </span>
        </el-dialog>
      </el-col>
      <el-col :span="24">
        <el-dialog
            title="选择地址"
            :visible.sync="addrVisible"
            width="60%">
          <el-col :span="24">
            <el-col :span="24">
              <el-col :span="3" style="font-weight: bold;font-size: small">
                选择收货地址
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-radio-group v-model="addr" size="small" fill="#Ffffff" text-color="#FF0036">
                <el-radio-button class=" payButton" style="margin-top: 15px;margin-left: 5px;padding: 3px;"
                                 v-for="(item,index) in addrData"
                                 :key="index"
                                 :label="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right">{{ item.mobile }}</span> <br>
                  <p>{{ item.state }}{{ item.city }}{{ item.district }} {{ item.address }}</p>
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-col>
          <span slot="footer" class="dialog-footer">
                   <el-button @click="addrVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addrVisible = false">确 定</el-button>
              </span>
        </el-dialog>
      </el-col>
      <el-col :span="24" style="margin-top: 20px">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[2,5,10]"
            :page-size="size"
            layout="total,prev, pager, next,sizes,jumper"
            :total="total">
        </el-pagination>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import {getRequest, postRequest} from "@/apis/api";

export default {
  name: "shopCartList",
  data() {
    return {
      dialogTableVisible: false,
      total: 100,
      pages: 1,
      size: 10,
      num: [],
      sum: [],
      checkedIndex: -1,
      checkedOne: [],
      tableData: [],
      multipleSelection: [],
      SelectionSum: 0.00,
      //  地址信息
      addr: -1,
      addrVisible: false,
      addrData: []
    }
  },
  created() {
    this.getTableData(this.pages, this.size);
    this.getUserAddr();
  },
  filters: {
    ellipsis2(value) {
      if (!value) return "";
      if (value.length > 15) {
        return value.slice(0, 15) + "...";
      }
      return value;
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.SelectionSum = 0.00;
      for (let i = 0; i < val.length; i++) {
        this.SelectionSum = this.SelectionSum + parseFloat(val[i].sum);
      }
      this.multipleSelection = val;
    },
    aliPay() {
      if (this.addr === -1) {
        this.fullscreenLoading = false;
        this.$message({
          type: 'warning',
          message: "请选择地址..."
        });
        return;
      } else {
        postRequest("/pay/api/trade/aliPay", {
          goodsId: this.checkedOne[0].goodsId,
          sum: this.sum[this.checkedIndex],
          num: this.num[this.checkedIndex],
          paymentType: 1,
          userAddr: {
            id: this.addr
          }
        }).then(response => {
          getRequest("/shopcart/delete/" + this.checkedOne[0].id, {}).then(response => {
          }).catch(error => {
            this.$message({
              type: 'error',
              message: '未知错误'
            })
          })
          document.write(response.data);
        }).catch(error => {
          this.$message(error.msg);
        })
      }
    },
    normalPay() {
      if (this.addr === -1) {
        this.fullscreenLoading = false;
        this.$message({
          type: 'warning',
          message: "请选择地址..."
        });
        return;
      } else {
        //  先检查余额是否足够
        getRequest("/checkBalance/" + this.sum[this.checkedIndex], {}).then(response => {
          if (response.code === 200) {
            //  余额充足可以进一步生成订单
            this.$prompt('输入密码验证...', '系统提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputType: 'password',
              inputValidator: function (value) {
                return !(value.trim().length < 4 || value.trim().length > 15);
              },
              inputErrorMessage: '请输入登陆时使用的密码'
              //验证规则待定
            }).then(({value}) => {
              postRequest("/checkPassword", {
                password: value
              }).then(response => {
                if (response.code === 200) {
                  getRequest("/shopcart/delete/" + this.checkedOne[0].id, {}).then(response => {
                    //开始订单业务
                    postRequest("/balanceOrder", {
                      goodsId: this.checkedOne[0].goodsId,
                      sum: this.sum[this.checkedIndex],
                      num: this.num[this.checkedIndex],
                      paymentType: 0,
                      userAddr: {
                        id: this.addr
                      }
                    }).then(response => {
                      if (response.code == 200) {
                        this.$router.push("/success")
                      }
                    }).catch(error => {
                      this.$message(error.msg);
                    })
                  }).catch(error => {
                    this.$message({
                      type: 'error',
                      message: '未知错误'
                    })
                  })
                }
              }).catch(error => {
                this.$message({
                  type: 'warning',
                  message: '密码验证错误'
                });
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
            })
          }
        })
      }
    },
    settleAccounts() {

      if (this.addr !== -1) {
        getRequest("/checkBalance/" + this.SelectionSum, {}).then(response => {
          if (response.code === 200) {
            //  余额充足可以进一步生成订单
            this.$prompt('输入密码验证...', '系统提示',
                {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputType: 'password',
                  inputValidator: function (value) {
                    return !(value.trim().length < 4 || value.trim().length > 15);
                  },
                  inputErrorMessage: '请输入登陆时使用的密码'
                  //验证规则待定
                }).then(({value}) => {
              postRequest("/checkPassword", {
                password: value
              }).then(response => {
                if (response.code === 200) {
                  //开始订单业务
                  postRequest("/shopcart/settleAccounts", {
                    list: this.multipleSelection,
                    userAddr: {
                      id: this.addr
                    }
                  }).then(response => {
                    if (response.code == 200) {
                      this.$router.push("/success")
                    }
                  }).catch(error => {
                    this.$message({
                      type: 'error',
                      message: error.msg
                    });
                  })
                }
              }).catch(error => {
                this.$message({
                  type: 'warning',
                  message: '密码验证错误'
                });
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
            })
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '余额检测出错！'
          })
        })
      } else {
        this.$message({
          type: 'error',
          message: '请选择地址'
        })
        setTimeout(() => {
          this.addrVisible = true;
        }, 500)
      }
    },
    handlePayout(index) {
      this.dialogTableVisible = true;
      this.checkedIndex = index;
      this.checkedOne.splice(0, 1, this.tableData[index]);
    },
    getUserAddr() {
      getRequest("/getUserAddr", {}).then(response => {
        this.addrData = response.data
      })
    },
    getTableData(pages, size) {
      getRequest("/shopcart/getShopCartByUserId?pages=" + pages + "&size=" + size, {})
          .then(response => {
            this.tableData.splice(0, this.tableData.length);
            this.tableData = response.data.records;
            this.total = parseInt(response.data.total);
            for (let i = 0; i < response.data.records.length; i++) {
              this.num[i] = parseInt(response.data.records[i].stock);
              let number = parseFloat(response.data.records[i].price);
              this.sum[i] = this.num[i] * number;
            }
          })
          .catch(error => {
            this.$message({
              type: 'error',
              message: '数据加载出错'
            })
          })
    },
    numChange(index) {
      this.sum[index] = this.num[index] * this.tableData[index].price;
      this.tableData[index].stock = this.num[index];
      this.tableData[index].sum = this.sum[index];
      this.$refs.multipleTable.clearSelection();
    },
    shopCartDelete(index) {
      getRequest("/shopcart/delete/" + this.tableData[index].id, {})
          .then(response => {
            if (response.code === 200) {
              this.tableData.splice(index, 1);
            }
          })
          .catch(error => {
            this.$message({
              type: 'error',
              message: '购物车删除失败！'
            })
          })
    },
    addShopCart(index) {
      postRequest("/shopcart/updata", {
        id: this.tableData[index].id,
        stock: this.num[index],
        sum: this.sum[index]
      }).then(response => {
        this.$message({
          type: "success",
          message: "修改成功"
        })
      }).catch(error => {
        this.$message({
          type: "error",
          message: "修改失败"
        })
      })
    },
    handleSizeChange(val) {
      this.size = parseInt(val);
      this.pages = 1;
      this.getTableData(this.pages, this.size);
    },
    handleCurrentChange(val) {
      this.pages = val;
      this.getTableData(val, this.size);
    }
  }
}
</script>

<style scoped>
#settleAccounts {
  width: 70px;
  margin-top: 5px;
  color: #de4949;
  margin-left: 10px;
  border: 1px solid #FF0036;
}

#settleAccounts:hover {
  background-color: #FF0036;
  color: #ffffff;
}

.payButton {
  font-size: xx-small;
  color: #101010;
  border: 1px solid #ffffff;
  padding-left: 4px;
  padding-right: 4px;
}

.payButton:hover {
  color: #ffffff;
  border: 1px solid #FF0036;
  background-color: #FF0036;
}

.payButton:active {
  color: #ffffff;
  background-color: #FF0036;
}

.payButton:focus {
  color: #FF0036;
  border: 1px solid #ffffff;
}
</style>