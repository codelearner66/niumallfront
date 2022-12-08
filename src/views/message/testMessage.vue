<template>
  <el-row>
    <el-divider></el-divider>
    <el-col :offset="4" :span="16">
      <el-col :span="8" style="height: 400px;background-color: #c4c8ca">
        <a style="text-decoration: none;color: #3b4446" href="javascript:void(0)" @click="messageHandler(1)">
          <el-col :span="24" style="height: 50px; background-color: white;padding-top: 5px">
            <el-col :span="3" style="height: 50px;">
              <el-avatar :size="40" :src="circleUrl"></el-avatar>
            </el-col>
            <el-col :span="21">
              <el-col :span="24" style="height: 20px;">
                <span style="float:left;margin-left: 10px;font-size: 10px">用户昵称</span>
                <span style="float:right;margin-right: 5px;font-size: xx-small">2022-09-15</span>
              </el-col>
              <el-col :span="24" style="height: 20px;">
                <span style="float:left;margin-left: 20px;font-size:small;">最后消息</span>
                <span style="float:right;margin-right: 5px;font-size: 5px;padding-top: 14px">
                <el-badge is-dot class="item"></el-badge>
              </span>
              </el-col>
            </el-col>
          </el-col>
          <hr style="margin: 0 0 0 0; height:1px; border-left:none; border-bottom:none;border-top:1px solid #becdd8;"/>
        </a>
        <a style="text-decoration: none;color: #3b4446" href="javascript:void(0)" @click="messageHandler(1)">
          <el-col :span="24" style="height: 50px; background-color: white;padding-top: 5px">
            <el-col :span="3" style="height: 50px;">
              <el-avatar :size="40" :src="circleUrl"></el-avatar>
            </el-col>
            <el-col :span="21">
              <el-col :span="24" style="height: 20px;">
                <span style="float:left;margin-left: 10px;font-size: 10px">用户昵称</span>
                <span style="float:right;margin-right: 5px;font-size: xx-small">2022-09-15</span>
              </el-col>
              <el-col :span="24" style="height: 20px;">
                <span style="float:left;margin-left: 20px;font-size:small;">最后消息</span>
                <span style="float:right;margin-right: 5px;font-size: 5px;padding-top: 14px">
                <el-badge is-dot class="item"></el-badge>
              </span>
              </el-col>
            </el-col>
          </el-col>
          <hr style="margin: 0 0 0 0; height:1px;border-left:none; border-bottom:none;border-top:1px solid #becdd8;"/>
        </a>
        <a style="text-decoration: none;color: #3b4446" href="javascript:void(0)" @click="messageHandler(1)">
          <el-col :span="24" style="height: 50px; background-color: white;padding-top: 5px">
            <el-col :span="3" style="height: 50px;">
              <el-avatar :size="40" :src="circleUrl"></el-avatar>
            </el-col>
            <el-col :span="21">
              <el-col :span="24" style="height: 20px;">
                <span style="float:left;margin-left: 10px;font-size: 10px">用户昵称</span>
                <span style="float:right;margin-right: 5px;font-size: xx-small">2022-09-15</span>
              </el-col>
              <el-col :span="24" style="height: 20px;">
                <span style="float:left;margin-left: 20px;font-size:small;">最后消息</span>
                <span style="float:right;margin-right: 5px;font-size: 5px;padding-top: 14px">
                <el-badge is-dot class="item"></el-badge>
              </span>
              </el-col>
            </el-col>
          </el-col>
          <hr style="margin: 0 0 0 0; height:1px;border-left:none; border-bottom:none;border-top:1px solid #becdd8;"/>
        </a>
      </el-col>
      <el-col :span="16" style="height: 400px;background-color: #2068a0">
        <el-col :span="24" style="height: 400px;">
          <!--          <el-col :span="24">-->
          <!--            <el-col :span="8">-->
          <!--              <hr style=" height:1px;border-left:none; border-bottom:none;border-top:1px dashed #cad9e6;"/>-->
          <!--            </el-col>-->
          <!--            <el-col :span="8" style="font-size: xx-small;color: #FF0036">-->
          <!--              看了又看-->
          <!--            </el-col>-->
          <!--            <el-col :span="8">-->
          <!--              <hr style="height:1px;border-left:none; border-bottom:none;border-top:1px dashed #cad9e6;"/>-->
          <!--            </el-col>-->
          <!--          </el-col>-->
          <!--          <el-col :span="24"-->
          <!--                  class="infinite-list"-->
          <!--                  v-infinite-scroll="loadMessage"-->
          <!--                  infinite-scroll-distance="10"-->
          <!--                  style="height: 320px;-->
          <!--                  overflow-y:auto;-->
          <!--                  list-style-type: none">-->
          <!--            <span v-for="index in 40" key="index" v-if="index%2!==0" style="float: left;width: 150px"> 这是消息{{ index }}}</span><br>-->
          <!--            <span v-for="index in 40" key="index" v-if="index%2===0" style="float: right;width: 100px"> 这是消息{{ index }}}</span><br>-->
          <!--          </el-col>-->
          <JwChat :taleList="list" @enter="bindEnter" @clickTalk="talkEvent" v-model="inputMsg"
                  :toolConfig="tool"
                  :quickList="quickList">
            <template slot="tools">
              <div style="width:20rem;text-align:right;" @click="toolEvent('自定义')">
                <b slot="tools">插槽</b>
                <JwChat-icon type="icon-lishi" title="自定义"/>
              </div>
            </template>
          </JwChat>
        </el-col>
      </el-col>

    </el-col>
  </el-row>
</template>

<script>
import JwChat from 'jwchat';

export default {
  name: "testMessage",
  data() {
    return {
      websocket: null,
      circleUrl: 'https://miumall-1306251195.cos.ap-chengdu.myqcloud.com/headers/header.jpg',
      mes: {
        fromid: 1,
        toid: 5,
        content: "hello 1号",
        type: 1,
        flag: 0,
        deleted: 0,
        sendtime: new Date()
      },
      inputMsg: '',
      list: [],
      tool: {
        callback: this.toolEvent
      },
      quickList: [
        {text: '这里是jwchat，您想了解什么问题。'},
        {text: 'jwchat是最好的聊天组件'},
        {text: '谁将烟焚散，散了纵横的牵绊；听弦断，断那三千痴缠。'},
        {text: '长夏逝去。山野间的初秋悄然涉足。'},
        {text: '江南风骨，天水成碧，天教心愿与身违。'},
        {text: '总在不经意的年生。回首彼岸。纵然发现光景绵长。'},
        {text: '外面的烟花奋力的燃着，屋里的人激情的说着情话'},
        {text: '假如你是云，我就是雨，一生相伴，风风雨雨；'},
        {text: '即使泪水在眼中打转，我依旧可以笑的很美，这是你学不来的坚强。'},
        {text: ' 因为不知来生来世会不会遇到你，所以今生今世我会加倍爱你。'},
      ]
    }
  },
  methods: {
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage
      // 连接成功
      this.websocket.onopen = this.setOnopenMessage
      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage
      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload
    },
    setErrorMessage() {
      window.console.log('WebSocket连接发生错误，状态码：' + this.websocket.readyState)
    },
    setOnopenMessage() {
      window.console.log('WebSocket连接成功，状态码：' + this.websocket.readyState)
    },
    setOnmessageMessage(event) {
      // 根据服务器推送的消息做自己的业务处理
      window.console.log(event.data);
    },
    setOncloseMessage() {
      window.console.log('WebSocket连接关闭，状态码：' + this.websocket.readyState)
    },
    onbeforeunload() {
      this.closeWebSocket()
    },
    closeWebSocket() {
      this.websocket.close()
    },
    messageHandler(index) {
      this.sendmessage();
    },
    sendmessage() {
      this.websocket.send(JSON.stringify(this.mes))
    },
    loadMessage() {
      console.log("001");
    },
    //聊天组件
    bindEnter(e) {
      console.log(e)
      const msg = this.inputMsg
      if (!msg) return;
      const msgObj = {
        "date": "2020/05/20 23:19:07",
        "text": {"text": msg},
        "mine": true,
        "name": "JwChat",
        "img": "../image/three.jpeg"
      }
      this.list.push(msgObj)
    },
    toolEvent(type, obj) {
      console.log('tools', type, obj)
    },
    talkEvent(play) {
      console.log(play)
    },
  },
  mounted() {
    let url = 'ws://localhost:8081/socket/api/messageService/';
    if ('WebSocket' in window) {
      if (localStorage.getItem('token') !== undefined) {
        url = url + localStorage.getItem('token');
        console.log(url);
        this.websocket = new WebSocket(url);
        this.initWebSocket();
      } else {
        this.$message({
          type: "error",
          message: "请先登录"
        })
      }
    } else {
      alert('当前浏览器不支持WebSocket!!!')
    }
    const img = 'https://www.baidu.com/img/flexible/logo/pc/result.png'
    const list = [
      {
        "date": "2020/04/25 21:19:07",
        "text": {"text": "起床不"},
        "mine": false,
        "name": "留恋人间不羡仙",
        "img": "/image/one.jpeg"
      },
      {
        "date": "2020/04/25 21:19:07",
        "text": {"text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>"},
        "mine": false,
        "name": "只盼流星不盼雨",
        "img": "/image/two.jpeg"
      },
      {
        "date": "2020/04/25 21:19:07",
        "text": {"text": "<img data-src='" + img + "'/>"},
        "mine": false,
        "name": "只盼流星不盼雨",
        "img": "/image/two.jpeg"
      },
      {
        "date": "2020/04/25 21:19:07",
        "text": {"text": "<img data-src='/image/three.jpeg'/>"},
        "mine": false,
        "name": "只盼流星不盼雨",
        "img": "/image/two.jpeg"
      },
      {
        "date": "2020/04/16 21:19:07",
        "text": {"text": "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />"},
        "mine": true,
        "name": "JwChat",
        "img": "/image/three.jpeg"
      },
      {
        "date": "2021/03/02 13:14:21",
        "mine": false,
        "name": "留恋人间不羡仙",
        "img": "/image/one.jpeg",
        "text": {
          system: {
            title: '在接入人工前，智能助手将为您首次应答。',
            subtitle: '猜您想问:',
            content: [
              {
                id: `system1`,
                text: '组件如何使用'
              },
              {
                id: `system2`,
                text: '组件参数在哪里查看'
              },
              {
                id: 'system',
                text: '我可不可把组件用在商业'
              }
            ]
          }
        }
      },
      {
        "date": "2020/04/25 21:19:07",
        "text": {
          "text": "<i class='el-icon-document-checked' style='font-size:2rem;'/>",
          "subLink": {
            "text": "a.txt",
            "prop": {
              underline: false
            }
          },
        },
        "mine": false,
        "name": "留恋人间不羡仙",
        "img": "../image/one.jpeg"
      },
      {
        "date": "2020/04/25 21:19:07",
        "mine": false,
        "name": "留恋人间不羡仙",
        "img": "../image/one.jpeg",
        "text": {
          shop: {
            title: `2022年寒假读一本好书小学生三四五六年级课外读
              物阅读书籍经典儿童文学 回到远古和神仙们聊天 王云超著`,
            describe: '购买1-3件时享受单件价￥18.20，超出数量以结算价为准，仅限购买一次:',
            price: '999.99',
            cover: '../image/two.jpeg',
            tags: [
              {name: '第二件半价'},
              {name: '送50元优惠'},
              {name: '满1件,送50元优惠'},
            ]
          }
        }
      }
    ]
    this.list = list
  }
}
</script>

<style scoped>
.infinite-list::-webkit-scrollbar {
  display: none;
}
</style>