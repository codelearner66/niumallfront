<template>
  <el-row>
    <el-col :span="24" style="height: 600px;background-color: #c2e8e8">
      <el-col :offset="4" :span="16" style="margin-top: 15px">
        <el-col :span="24">
          <JwChat-index
              ref="jwChat"
              v-model="inputMsg"
              :config="config"
              :showRightBox='true'
              :taleList="taleList"
              :toolConfig="tool"
              :winBarConfig="winBarConfig"
              scrollType="scroll"
              style="padding-left: 15%"
              @clickTalk="talkEvent"
              @enter="bindEnter">
            <!--            <template-->
            <!--            slot="header">-->
            <!--              666-->
            <!--            </template>-->
            <template>
              <div style="width:14rem;text-align:right;" @click="toolEvent('自定义')">
                <!--                <b slot="tools">插槽</b>-->
                <!--                <JwChat-icon type="icon-lishi" title="自定义"/>-->
                <div style="width: 14rem;text-align:center;margin-top: 2rem">
                  <div style="width: 14rem;text-align:center;">
                    <el-input v-model="searchInput"
                              class="searchClass"
                              placeholder="请输入用户昵称或id"
                              size="mini"
                              style="width: 10rem;height: 0.5rem">
                      <i slot="suffix" class="el-icon-search" style="margin-top: 0.3rem;margin-bottom: 0.3rem"
                         @click="handleClick"/>
                    </el-input>
                  </div>

                  <div style="width: 14rem;margin-top: 1.2rem;">
                    <div v-if="allUserList!==undefined&&allUserList.length!==0">
                      <JwChat-item v-for="(item,index) in allUserList"
                                   :key="index"
                                   :config="item"
                                   :size="30"
                                   style=" border : 1px solid #f2f6f6;
                    width: 10rem;
                    border-radius: 0.6rem;
                    margin: 0.6rem auto 0;
                    height: 35px;
                    box-shadow:2px 5px 4px 5px rgba(223,227,227,0.99) "
                                   @click="changeCurrentUser(item)"/>
                      <!--   点击切换聊天框     -->

                      <div style="width: 14rem;margin-top: 1.2rem;">
                        <el-pagination
                            :current-page="parseInt(allUser.current)"
                            :page-size="10"
                            :total="parseInt(allUser.total)"
                            layout="prev, pager, next"
                            small
                            @current-change="getAllUser">
                        </el-pagination>
                      </div>
                    </div>
                    <div v-else>
                      <el-empty description="这里空空如也了..."
                                image="https://img.zcool.cn/community/014ec35add6220a80120927bb3b5c6.gif"></el-empty>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </JwChat-index>
        </el-col>

      </el-col>
    </el-col>

  </el-row>
</template>
<script>
import {getRequest, postRequest} from "@/apis/api";
import {webSocket} from "@/apis/webSocket";
import success from "@/views/goods/success";

//todo 固定 客服位置和 快捷命令
let websocket = null;
let pages = 0;
//当前窗口用户
const currentUser = {
  id: '',
  img: '',
  name: '',
  dept: '',
  readNum: ''
}
//当前用户
const localUser = {
  id: '',
  img: '',
  name: ''
}
export default {
  name: "userChat",
  data() {
    return {
      searchInput: '',
      allUser: {},
      allUserList: [],
      allUserPages: 1,
      inputMsg: '',
      taleList: [
        {
          "date": "2021/03/02 13:14:21",
          "mine": false,
          "name": "NiuMall商城",
          "img": require("../../assets/images/header.png"),
          "text": {
            system: {
              title: '在接入人工前，智能助手将为您首次应答。',
              subtitle: '猜您想问:',
              content: [
                {
                  id: `system1`,
                  text: '发货了没'
                },
                {
                  id: `system2`,
                  text: '我的退款进度如何了'
                },
                {
                  id: 'system',
                  text: '其他问题，人工快来！'
                }
              ]
            }
          }
        }
      ],
      tool: {
        // show: ['file', 'history', 'img', ['文件1', '', '美图']],
        showEmoji: true,
        callback: this.toolEvent
      },
      config: {
        img: require("../../assets/images/header.png"),
        name: 'NiuMall商城',
        dept: '快速，省心，品质',
        callback: this.bindCover,
        historyConfig: {
          show: true,
          tip: '加载更多',
          callback: this.bindLoadHistory,
        },
        quickList: [
          {text: '这里是NiuMall，您想了解什么问题。'},
          {text: 'NiuMall是最好的聊天组件'},
          {text: '谁将烟焚散，散了纵横的牵绊；听弦断，断那三千痴缠。'},
          {text: '长夏逝去。山野间的初秋悄然涉足。'},
          {text: '江南风骨，天水成碧，天教心愿与身违。'},
          {text: '总在不经意的年生。回首彼岸。纵然发现光景绵长。'},
          {text: '外面的烟花奋力的燃着，屋里的人激情的说着情话'},
          {text: '假如你是云，我就是雨，一生相伴，风风雨雨；'},
          {text: '即使泪水在眼中打转，我依旧可以笑的很美，这是你学不来的坚强。'},
          {text: ' 因为不知来生来世会不会遇到你，所以今生今世我会加倍爱你。'},
        ]
      },
      winBarConfig: {
        active: '1',
        width: '160px',
        listHeight: '60px',
        list: [],
        callback: this.bindWinBar,
      }
    }
  },
  mounted() {
    websocket = webSocket();
    const {list} = this.winBarConfig;
    window.addEventListener('onMessage', evt => {
      // console.log("evt", evt.detail.data);
      if (evt.detail.data !== "连接成功") {
        let parse = JSON.parse(evt.detail.data);
        let fromid = parse.fromid;
        let count = parse.count;
        let flag = false;
        let temp = {
          id: parse.fromid,
          img: parse.url,
          name: parse.fromname,
          dept: parse.lastInfo,
          readNum: parse.count
        }
        // console.log("count", count, "fromid", fromid);
        for (let listElement of this.winBarConfig.list) {
          if (listElement.id === fromid) {
            flag = true;
          }
        }
        if (fromid !== undefined && count !== undefined) {
          this.winBarConfig.list = list.reduce((p, i) => {
            // console.log("i.id: ", i.id, "  fromid:  ", fromid);
            // console.log("i   ==> ", i)
            if (fromid !== i.id) {
              p.push(i);
              if (!flag) {
                p.push(temp);
                flag = true;
              }
            } else {
              // console.log("currentUser  ", currentUser, "fromid  ", fromid)
              if (fromid !== currentUser.id) {
                p.push(temp);
              } else {
                p.push(i);
                this.getAllUnreadInfoDetails(temp);
              }
            }
            return p;
          }, []);
          this.$store.commit("setMessageCount1", 1);
        }
      }
    })
  },
  created() {
    const {list} = this.winBarConfig;
    //页面加载时添加左侧用户
    getRequest("/websocket/getNotReadUserList").then(data => {
      if (data != null) {
        let tempList = data.data;
        for (let i = 0; i < tempList.length; i++) {
          let temp = {
            id: tempList[i].fromid,
            img: tempList[i].url,
            name: tempList[i].fromname,
            dept: tempList[i].lastInfo,
            readNum: tempList[i].count
          };
          list.push(temp);
        }
      }
    });
    getRequest("/getUserInfor", null).then(success => {
      localUser.id = success.data.id;
      localUser.name = success.data.nickName;
      localUser.img = success.data.avatar
    });
    setTimeout(() => {
      this.getAllUser(1);
    }, 400)
  },
  methods: {
    bindEnter() {
      const msg = this.inputMsg
      if (!msg) return;
      const msgObj = {
        "date": new Date().toLocaleString(),
        "text": {"text": msg},
        "mine": true,
        "name": localUser.name,
        "img": localUser.img
      }
      this.taleList.push(msgObj);
      this.sentMessage(msgObj);
    },
    sentMessage(obj) {
      websocket.send(JSON.stringify({
        //发送者昵称
        'fromname': localUser.name,
        //发送者id
        'fromid': localUser.id,
        //接收者昵称
        'toname': currentUser.name,
        //接收者id
        'toid': currentUser.id,
        //消息主题
        'content': obj.text.text,
        //发送时间
        'sendtime': undefined
      }));
    },
    /**
     * @description:
     * @param {*} type 当前点击的按钮
     * @param {*} plyload 附加文件或者需要处理的数据
     * @return {*}
     */
    toolEvent(type, plyload) {
      console.log('tools', type, plyload)
    },
    /**
     * 点击用户消息的回调
     */
    talkEvent(play = {}) {
      console.log("66666", play);
      const {type, data = {}} = play
      if (type === 'systemItem') {
        console.log("快捷键被点击了");
        const msgObj = {
          "date": new Date().toLocaleString(),
          "text": {"text": play.data.text},
          "mine": true,
          "name": localUser.name,
          "img": localUser.img
        }
        currentUser.id = 1;
        if (currentUser.id != localUser.id) {
          currentUser.name = 'NiuMall商城'
          this.taleList.push(msgObj);
          this.sentMessage(msgObj);
        } else {
          this.$message.error("不能给自己发消息");
        }

      }

    },
    /**
     * @description: 点击加载更多的回调函数
     * @param {*}
     * @return {*}
     */
    async bindLoadHistory() {
      pages = pages + 1;
      getRequest("/websocket/getAllreadInfoDetails?fromId=" + currentUser.id + "&toId=-11&page=" + pages).then(success => {
        console.log("success============>", success);
        let data = success.data;
        let tempList = [];
        for (let i = 0; i < data.length; i++) {
          let temp = {
            "date": data[i].sendtime,
            "text": {"text": data[i].content},
            "mine": data[i].fromid !== currentUser.id,
            "name": data[i].fromname,
            "img": data[i].fromid !== currentUser.id ? localUser.img : currentUser.img
          };
          tempList.push(temp);
        }
        this.taleList.forEach(item => {
          tempList.push(item);
        })
        this.taleList = tempList;
      })
      //  加载完成后通知组件关闭加载动画
      this.config.historyConfig.tip = "加载完成";
      this.config.historyConfig.show = true;
      this.$nextTick(() => {
        this.$refs.jwChat.finishPullDown();
      })
    },
    bindCover(type) {
      console.log('header', type)
    },
    //点击左边用户时的回调
    bindWinBar(play = {}) {
      const {type, data = {}} = play
      if (type === 'winBar') {
        const {id, dept, name, img} = data;
        this.config = {...this.config, id, dept, name, img};
        this.winBarConfig.active = id;
        pages = 1;
        this.getAllUnreadInfoDetails(data);
      }
      if (type === "winBtn") {
        const {target: {id} = {}} = data;
        const {list} = this.winBarConfig;
        this.winBarConfig.list = list.reduce((p, i) => {
          if (id != i.id) p.push(i);
          return p;
        }, []);
      }
    },
    // 获取用户未读消息
    getAllUnreadInfoDetails(fromId) {
      const {id, dept, name, img} = fromId;
      currentUser.id = id;
      currentUser.dept = dept;
      currentUser.name = name;
      currentUser.img = img;
      getRequest("/websocket/getAllreadInfoDetails?fromId=" + currentUser.id + "&toId=-11&page=" + 1).then(success => {
        // console.log("success============>", success);
        let data = success.data;
        let tempList = [];
        for (let i = 0; i < data.length; i++) {
          let temp = {
            "date": data[i].sendtime,
            "text": {"text": data[i].content},
            "mine": data[i].fromid !== currentUser.id,
            "name": data[i].fromname,
            "img": data[i].fromid !== currentUser.id ? localUser.img : currentUser.img
          };
          tempList.push(temp);
        }
        tempList.concat(this.taleList);
        this.taleList.length = 0;
        this.taleList = tempList;
      })
      //加载完成更新状态
      postRequest("/websocket/readedInfo", {
        //发送者昵称
        'fromname': localUser.name,
        //发送者id
        'fromid': currentUser.id,
        //接收者昵称
        'toname': currentUser.name,
        //接收者id
        'toid': localUser.id,
        //消息主题
        'content': undefined,
        //发送时间
        'sendtime': undefined
      }).then(success => {
        // console.log("更新状态成功： ", success)
        const {list} = this.winBarConfig;
        this.winBarConfig.list = list.reduce((p, i) => {
          if (currentUser.id !== i.id) {
            p.push(i)
          } else {
            i.readNum = 0;
            p.push(i);
          }
          return p;
        }, []);
      });
      setTimeout(() => {
        this.getMessageNum();
      }, 300);
    },
    getAllUser(pages) {
      getRequest("/websocket/getAllUserList/" + pages, pages).then(success => {
        this.allUser = success.data;
        let list = success.data.data;
        list.forEach(item => {
          this.allUserList.push({
            'id': item.fromid,
            'img': item.url,
            'name': item.fromname,
            'dept': '',
            callback: undefined
          })
        })
      }).catch(error => {
        this.$message({
          showClose: true,
          type: "error",
          message: '数据加载出错，刷新后重试！',
          duration: 1500
        });
      })
    },
    changeCurrentUser(item) {
      console.log("item   :", item);
      const {list} = this.winBarConfig;
      const {id, dept, name, img} = item;
      let tempUser = {
        id: id,
        img: img,
        name: name,
        dept: dept,
        readNum: 0
      }
      let flag = false;
      list.forEach(temp => {
        //当前会话列表中有该用户 只切换会话
        if (item.id === temp.id) {
          console.log("已存在，切换当前用户");
          this.config = {...this.config, id, dept, name, img};
          this.winBarConfig.active = id;
          pages = 1;
          this.getAllUnreadInfoDetails(item);
          flag = true;
        }
      })
      //点击的用户是不在左侧的新聊天会话
      if (!flag) {
        this.winBarConfig.list = list.reduce((p, i) => {
          p.push(i);
          if (!flag) {
            p.push(tempUser);
            flag = true;
            this.getAllUnreadInfoDetails(tempUser);
          }
          return p;
        }, []);
        if (this.winBarConfig.list.length === 0) {
          this.winBarConfig.list.push(tempUser);
        }
      }
      console.log("flag: ", flag)
    },
    handleClick() {
      getRequest("/websocket/getUserListByKey/" + this.searchInput.trim(), "").then(success => {
        console.log("搜索成功： key=" + this.searchInput, "返回值： ", success)
        let list = success.data;
        this.allUserList.splice(0, this.allUserList.length);
        list.forEach(item => {
          this.allUserList.push({
            'id': item.fromid,
            'img': item.url,
            'name': item.fromname,
            'dept': '',
            callback: undefined
          })
        })
      })
    },
    //加载未读消息总数
    getMessageNum() {
      getRequest("/websocket/getAllUnreadCount", "").then(success => {
        if (success.code === 200) {
          console.log("getAllUnreadCount :", success.data);
          this.$store.commit("setMessageCount", success.data);
        }
      })
    }
  }
}
</script>

<style scoped>
/deep/ .ChatPage .header {
  background-color: #3caaef;
}

/deep/ .wrapper .web__main .web__main-arrow:after {
  border-right-color: #CCCCFF;
}

/deep/ .wrapper .web__main .web__main-text {
  background-color: #CCCCFF;
}

/deep/ .wrapper .web__main .web__main-item--mine .web__main-text {
  background-color: #ace7ef;
  color: #3b4446;
}

/deep/ .wrapper .web__main .web__main-item--mine .web__main-text .web__main-arrow {
  border-left-color: #ace7ef;
}

/deep/ .wrapper .web__main .web__main-item--mine .web__main-text .web__main-arrow:after {
  border-left-color: #ace7ef;
}

.searchClass {
  border-radius: 20px;
  background: #f4f4f4;
}

.searchClass .el-input-group__prepend {
  border: none;
  background-color: transparent;
  padding: 0 10px 0 30px;
}

.searchClass .el-input-group__append {
  border: none;
  background-color: transparent;
}

.searchClass .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: none;
  background-color: transparent;
}

.searchClass .el-icon-search {
  font-size: 16px;
}

.searchClass .centerClass {
  height: 100%;
  line-height: 100%;
  display: inline-block;
  vertical-align: middle;
  text-align: right;
}

.searchClass .line {
  width: 1px;
  height: 26px;
  background-color: #c5c5c5;
  margin-left: 14px;
}

.searchClass:hover {
  border: 1px solid #D5E3E8;
  background: #fff;
}

.searchClass:hover .line {
  background-color: #D5E3E8;
}

.searchClass:hover .el-icon-search {
  color: #ef3636;
  font-size: 16px;
}
</style>