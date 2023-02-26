<template>
  <div class="comment">
    <el-col :span="24">
      <el-col :span="24">
        <el-button @click="openDialogVisible">评论一个...</el-button>
      </el-col>
      <el-col :span="24">
        <el-dialog
            :before-close="handleClose"
            :visible.sync="dialogVisible"
            title="评价一下方便大家。"
            width="70%">
          <template>
            <el-row :gutter="10">
              <el-form ref="commentForm" :model="commentData" :rules="rules" label-width="100px" size="medium">
                <el-col :span="23">
                  <el-form-item label="宝贝评价：" label-width="90px" prop="goodsRank" style="margin-left: 90px">
                    <el-col :span="12">
                      <el-rate v-model="commentData.goodsRank"
                               :max='5'
                               style="float: left;padding-left: 20px;line-height: 36px;padding-top: 5px"></el-rate>
                    </el-col>

                  </el-form-item>
                </el-col>
                <el-col :span="23">
                  <el-form-item prop="goodsDesc">
                    <el-input v-model="commentData.goodsDesc"
                              :autosize="{minRows: 4, maxRows: 4}"
                              :style="{width: '100%'}"
                              placeholder="从多角度评价宝贝，可以帮助更多想买的人"
                              type="textarea"></el-input>
                  </el-form-item>
                </el-col>
                <!--      图片-->
                <el-col :span='24'>
                  <el-col :span='23'>
                    <el-form-item label='上传图片：' label-width='120px' style="margin-left: 60px">
                      <el-upload
                          ref='images'
                          :auto-upload='false'
                          :drag='true'
                          :file-list='imagesfileList'
                          :limit="4"
                          :on-change='handleImageChange'
                          :show-file-list='false'
                          :with-credentials='true'
                          accept='image/*'
                          class='avatar-uploader'
                          list-type='picture-card'
                          multiple>
                        <el-col :span='24'>
                          <el-col
                              v-for='(item,index) in PhotoAlbum '
                              v-if='PhotoAlbum.length!==0' :key='index'
                              :span='4'>
                            <el-avatar :size="178" :src='item' alt='' class='avatar' fit="cover"
                                       shape='square'></el-avatar>
                          </el-col>
                          <el-col :span='7'>
                            <el-tooltip content='只能上传jpg/jpeg文件，且不超过5M' effect='light'>
                              <i class='el-icon-upload'><br>
                                <span style='font-size: small;color: #d1cdcd'>发图帮助他人更加真实的了解商品</span>
                              </i>
                            </el-tooltip>
                          </el-col>
                        </el-col>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :offset="21" :span='2'>
                    <el-button style='margin-top: 0px' type='primary' @click.native='submitUpload'>点击上传</el-button>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-form-item size="large">
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="openDialogVisible">关闭</el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </template>
          <!--          <span slot="footer" class="dialog-footer">-->
          <!--            <el-button @click="openDialogVisible">取 消</el-button>-->
          <!--            <el-button type="primary" @click="openDialogVisible">确 定</el-button>-->
          <!--          </span>-->
        </el-dialog>
      </el-col>
    </el-col>
    <el-col v-infinite-scroll="loadParent"
            :span="24"
            class="infinite-list"
            infinite-scroll-distance="20"
            infinite-scroll-immediate="false"
            style="overflow:auto;height: 850px;list-style-type: none">
      <el-col v-for="(item, index) in   fullData.records" :key="item._id + '' + index" :span="24"
              style="margin-top: 20px">
        <el-col :span="12">
          <el-col :span="5">
            <el-avatar :size="40" :src="item.buyerAvatar" style="float: right"></el-avatar>
          </el-col>
          <el-col :span="18" style="text-align: left;margin-left: 15px">
            <el-col :span="24">
              {{ item.buyerName }}
              &nbsp;
              <el-rate
                  v-model="item.goodsRank"
                  disabled
                  show-text
                  text-color="#ff9900">
              </el-rate>
            </el-col>
            <el-col :span="24">
              <!--           购买商品信息-->
              <span style="font-size: small">{{ item.goodsName }}</span>
              <!--            评论日期-->
              <span style="float: right;padding-right: 40px;font-size: small">{{ item.createTime }}</span>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="12">
          <div class="comment-right">
            <el-badge :hidden="item.childNum===0" :max="99" :value="item.childNum" class="item">
              <i
                  class="el-icon-chat-dot-round"
                  @click="isShowSecReply('P',item.id)"
              >回复</i>
            </el-badge>
            &nbsp;
            &nbsp;&nbsp;
            <i
                v-if="userId === item.buyerId"
                class="el-icon-delete"
                @click="deleteComment(item.id, undefined)"
            >删除</i>
          </div>
        </el-col>
        <el-col :span="24">
          <el-col :offset="3" :span="19" style="text-align: left;">
          <span>
            {{ item.goodsDesc }}
          </span>
          </el-col>
          <el-col :offset="3" :span="19" style="margin-top: 10px">
            <!--  遍历图片数组-->
            <el-avatar v-for="i in item.images" :size="120" :src="i" shape="square"
                       style="float: left;margin-left: 10px"></el-avatar>
          </el-col>
        </el-col>
        <el-col :span="24" Style="height: 10px">
          <a href="JavaScript:void(0)"
             style="float: right;padding-right: 4%;text-decoration: none;color: #dad8d8;font-size: small"
             type="text"
             @click="showReplies(item.id,index)">查看回复...</a>
        </el-col>
        <!--      一级评论输入框-->
        <el-col v-show="isShowSec === 'P'+item.id" :span="24" class="reply-comment" style="margin-top: 8px">
          <el-col :offset="1" :span="15">
            <el-input
                v-model.trim="replyContext"
                :maxlength="contentLength"
                :placeholder="placeholderText"
                class="input"
            ></el-input>
          </el-col>
          <el-col :span="5" style="padding-left: 10px;">
            <el-button
                class="reply-button"
                size="mini"
                style="float: left;"
                type="info"
                @click="addReplies(item.id, index)">
              回复
            </el-button>
            <el-button
                style="float:  left;margin-left: 16px"
                class="reply-button"
                size="mini"
                type="info"
                @click="isShowSecReply">
              关闭
            </el-button>
          </el-col>
        </el-col>
        <!--      次级评论-->
        <el-col v-show="childrenPanel.id==='CP'+item.id" :span="24" style="height: 330px;margin-top: 20px;">
          <el-col v-infinite-scroll="loadChildReplies"
                  :span="24"
                  class="infinite-list"
                  infinite-scroll-distance="5"
                  infinite-scroll-immediate="false"
                  style="overflow:auto;height: 320px;list-style-type: none">
            <el-col v-for="(reply, ChildIndex) in item.replies.records"
                    :key="reply.id + '' + ChildIndex"
                    :offset="1"
                    :span="18"
                    class="second-comment"
                    style="margin-top: 7px; border: 1px solid #d0c9cb;border-radius: 5px; padding: 4px">
              <el-col :span="4">
                <!-- 次级评论头像,该用户没有头像则显示默认头像 -->
                <el-avatar :size="40" :src="reply.userAvatar" style="float: right"></el-avatar>
              </el-col>
              <el-col :span="20">
                <el-col :span="24" class="content">
                  <el-col :span="8" style="text-align: left;padding-left: 10px;">
                    <!-- 次级评论用户昵称 -->
                    <span>{{ reply.userName }}</span>
                  </el-col>
                  <el-col :span="12" style="text-align: left;padding-left: 10px;font-size: xx-small">
                    <span>{{ reply.createTime }}</span>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :offset="1" :span="12" style="text-align: left;padding-left: 20px">
                    <span class="to_reply" style="font-size: small"><strong>{{ reply.userName }}</strong></span>
                    回复
                    <span class="to_reply" style="font-size: small"><b>{{ reply.yourName }}</b></span>:&nbsp;&nbsp;
                    <span style="font-size: small">{{ reply.repliesDesc }}</span>
                  </el-col>
                  <el-col :span="10" class="comment-right" style="font-size: xx-small">
                    <i
                        class="el-icon-chat-dot-round"
                        @click="isShowSecReply('C',reply.id)"
                    >回复</i>
                    &nbsp;&nbsp;
                    <i
                        v-if="userId === reply.userId"
                        class="el-icon-delete"
                        @click="deleteComment(item.id, reply.id)"
                    >删除</i>
                  </el-col>
                  <el-col v-show="isShowSec ==='C'+reply.id" :span="24" class="reply-comment">
                    <el-input
                        v-model.trim="replyContext"
                        :maxlength="contentLength"
                        :placeholder="placeholderText"
                        class="input"></el-input>
                    <el-button
                        class="reply-button"
                        size="mini"
                        type="info"
                        @click="addChildReples(index, ChildIndex)"
                    >回复
                    </el-button>
                    <el-button
                        class="reply-button"
                        size="mini"
                        type="info"
                        @click="isShowSecReply"
                    >关闭
                    </el-button>
                  </el-col>
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-col>

      </el-col>
      <!-- 暂无评论的空状态 -->
      <el-empty v-show="fullData===undefined||fullData.records===undefined" :description="emptyText"></el-empty>
    </el-col>
  </div>
</template>
<script>
import {getRequest, postRequest} from "@/apis/api";
import Vue from 'vue'


export default {
  props: {
    propsGoodsId: {
      //评论所属文章 id
      type: String
    },
    emptyText: {
      // 评论为空的时候显示的文字
      type: String,
      default: "期待你的评论！"
    },
    buttonText: {
      // 按钮文字
      type: String,
      default: "评论"
    },
    contentLength: {
      // 评论长度
      type: Number,
      default: 150
    },
    placeholderText: {
      // 默认显示文字
      type: String,
      default: "请输入最多150字的评论..."
    }
  },

  data() {
    return {
      goodsId: undefined,
      fullData: {},
      parentPanel: {
        id: '',
        index: -1,
        loadCheck: true,
        parentPages: 1
      },
      //子评论显示
      childrenPanel: {
        id: '',
        index: -1,
        loadCheck: true
      },
      childPages: 1,
      context: "", // 评论内容
      replyContext: '',
      isShowSec: "", //是否显示次级回复框
      isClickId: "", //记录点击回复的评论id
      userId: "1", // 浏览器指纹
      firstIdx: 1,
      secIdx: 1,
      //弹窗 新建评论
      dialogVisible: false,
      PhotoAlbum: [],
      imagesfileList: [],
      commentData: {
        goodsId: 101,
        goodsName: '5566667dfgd',
        isImages: false,
        images: undefined,
        goodsRank: 0,
        goodsDesc: undefined,
      },
      rules: {
        goodsRank: [],
        goodsDesc: [],
      }
    };
  },
  created() {
    this.goodsId = parseInt(this.propsGoodsId);
    // 获取评论数据
    this.getCommentList();
  },

  methods: {
    handleClose() {
      this.openDialogVisible();
    },
    openDialogVisible() {
      if (this.dialogVisible) {
        return this.dialogVisible = false;
      } else {
        getRequest("/canComment?goodsId=" + this.goodsId, {}).then(response => {
          if (response.code === 200 && response.data) {
            this.dialogVisible = true;
          } else {
            this.$message.error("只有购买过本商品才可以评论哦~~~")
            this.dialogVisible = false;
          }
        }).catch(error => {
          this.$message.error("只有购买过本商品才可以评论哦~~~")
        })
      }
    },
    handleImageChange(file, fileList) {
      this.imagesfileList = fileList;
    },
    submitUpload() {
      //判断是否有文件再上传
      if (this.imagesfileList.length === 0) {
        return this.$message.warning('请选取文件后再上传');
      }
      // 下面的代码将创建一个空的FormData对象:
      const formData = new FormData();
      // 你可以使用FormData.append来添加键/值对到表单里面；
      this.imagesfileList.forEach((file) => {
        console.log(file);
        if (file.size > 1024 * 1024 * 5) {
          return this.$message.error("图片文件过大！")
        }
        formData.append('file', file.raw);
      });
      //追加数据
      //  formData.append('0', 66);
      postRequest('/uploadeCommentsImages', formData).then(response => {
        if (response.code === 200) {
          this.PhotoAlbum.splice(0, this.PhotoAlbum.length);
          response.data.forEach(item => {
            this.PhotoAlbum.push(item);
          });
          this.commentData.images = JSON.stringify(response.data);
          this.commentData.isImages = this.PhotoAlbum.length > 0;
          this.$refs.images.clearFiles(); //上传成功之后清除历史记录
          this.$message.success('图片上传成功！');
        } else {
          this.$message.error('图片上传出错！');
        }
      }).catch(error => {
        this.$message.error('图片上传出错: ' + error.msg);
      }).finally(f => {
        this.imagesfileList.splice(0, this.imagesfileList.length);
      });
    },
    submitForm() {
      if (this.commentData.goodsDesc === undefined || this.commentData.goodsDesc === '') {
        return this.$message.error("评论不能为空");
      }
      getRequest("/isCommented?goodsId=" + this.goodsId).then(response => {
        if (!response.data) {
          this.commentData.goodsId = this.goodsId;
          postRequest("/addGoodsComment", this.commentData).then(response => {
            if (response.code === 200) {
              this.$message.success("评价成功！");
            } else {
              this.$message.error("评论出错");
            }
          }).catch(error => {
            this.$message.error("评论出错" + error.msg);
          })
        } else {
          this.$message.error("只能评论一次，您已经评论过了！");
        }
      })
    },
    resetForm() {
      this.$refs['commentForm'].resetFields()
    },
    // 获取本篇文章所有评论
    getCommentList() {
      getRequest("/getGoodsCommentsById?id=" + this.goodsId + "&pages=" + this.parentPanel.parentPages, {}).then(response => {
        let tempList = this.fullData === undefined || this.fullData.records === undefined ? [] : this.fullData.records;
        if (response.code === 200) {
          this.fullData = response.data;
          var assign = {
            images: [],
            replies: {}
          };
          for (let i = 0; i < this.fullData.records.length; i++) {
            var item = this.fullData.records[i];
            if (this.fullData.records[i].isImages === 1) {
              this.fullData.records[i].images = JSON.parse(this.fullData.records[i].images);
              Object.assign(this.fullData.records[i], {replies: {}});
            } else {
              this.fullData.records[i] = {...this.fullData.records[i], ...assign};
            }
            tempList.push(this.fullData.records[i]);
          }
          this.fullData.records = tempList;
        }
      }).catch(error => {
        console.log("发生错误！");
      }).finally(() => {
        this.$forceUpdate();
        this.parentPanel.loadCheck = true;
      })
    },
    //获取指定的回复
    getReplies(parentId, index) {
      getRequest("/getRepliesServiceById?id=" + parentId + "&pages=" + this.childPages).then(response => {
        let templist = this.fullData.records[index].replies === undefined || this.fullData.records[index].replies.records === undefined ? {} : this.fullData.records[index].replies.records;
        if (response.code === 200) {
          //遍历到指定评论 将恢复数据添加进去
          if (templist !== undefined && templist.length > 0 && parseInt(this.fullData.records[index].replies.current) < parseInt(response.data.current)) {
            this.fullData.records[index].replies = response.data;
            response.data.records.forEach(item => {
              templist.push(item);
            });
            this.fullData.records[index].replies.records = templist;
          } else {
            this.fullData.records[index].replies = response.data;
          }
        } else {
          this.$message.error("获取回复数据出错1： " + response.msg);
        }
      }).catch(error => {
        this.$message.error("获取回复数据出错2： " + error.msg);
      }).finally(() => {
        this.$forceUpdate();
        this.childrenPanel.loadCheck = true;
      })
    },
    showReplies(parentId, index) {
      if (this.childrenPanel.id === "CP" + this.fullData.records[index].id) {
        this.childrenPanel.index = -1;
        return this.childrenPanel.id = "";
      } else {
        this.getReplies(parentId, index);
        setTimeout(() => {
          this.childrenPanel.id = "CP" + this.fullData.records[index].id;
          this.childrenPanel.index = index;
        }, 300)
      }
    },

    loadChildReplies() {
      if (this.childrenPanel.loadCheck) {
        this.childrenPanel.loadCheck = false;
        this.childPages = parseInt(this.fullData.records[this.childrenPanel.index].replies.current) + 1;
        var s = this.childrenPanel.id.replace("CP", "");
        if (this.childPages !== 1 && this.childPages <= parseInt(this.fullData.records[this.childrenPanel.index].replies.pages)) {
          this.getReplies(parseInt(s.trim()), this.childrenPanel.index);
        }
      }
    },
    loadParent() {
      if (this.parentPanel.loadCheck) {
        this.parentPanel.loadCheck = false;
        this.parentPanel.parentPages = parseInt(this.fullData.current) + 1;
        if (this.parentPanel.parentPages !== 1 && this.parentPanel.parentPages <= parseInt(this.fullData.pages)) {
          this.getCommentList();
        }
      }
    },
    isShowSecReply(pre, id) {
      if (id) {
        this.isShowSec = pre + id;
        if (this.isClickId === this.isShowSec) {
          this.isShowSec = "";
        } else {
          this.isShowSec = pre + id;
        }
        this.isClickId = this.isShowSec;
      } else {
        this.isShowSec = this.isClickId = "";
      }
    },
    async addReplies(id, index) {
      console.log("商品id  下标 ", id, index);
      var record = this.fullData.records[index];
      var tempData = {
        //todo 商品类型应该动态指定
        rootId: this.goodsId,
        commentId: id,
        yoursId: record.buyerId,
        yourName: record.buyerName,
        repliesDesc: this.replyContext
      }
      this.addCommentReplies(tempData);
    },
    async addChildReples(parentIndex, index) {
      var record = this.fullData.records[parentIndex];
      var childRecord = record.replies.records[index];
      var tempData = {
        //todo 商品类型应该动态指定
        rootId: this.goodsId,
        commentId: record.id,
        yoursId: childRecord.userId,
        yourName: childRecord.userName,
        repliesDesc: this.replyContext
      }
      this.addCommentReplies(tempData);
    },
    addCommentReplies(tempData) {
      postRequest("/addReplies", tempData).then(response => {
        this.$message.success("评论成功，审核过后其他人将会看到。")
      }).catch(error => {
        this.$message.error("发生了错误： " + error.msg);
      }).finally(() => {
        this.replyContext = "";
      })
    },
    deleteComment(_id, replyId) {
      if (replyId) {
        // 删除二级评论，提交请求到后端

        // 成功后从本地记录中删除该评论
        const temp = this.comments.find(item => item._id == _id).replyInfo;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i]._id == replyId) {
            temp.splice(i, 1);
            break;
          }
        }
      } else {
        // 删除一级评论，提交请求到后端

        // 成功后从本地记录中删除该评论
        for (let i = 0; i < this.comments.length; i++) {
          if (this.comments[i]._id == _id) {
            this.comments.splice(i, 1);
          }
        }
      }
    },
    async addComment(id, replyName) {
      let res = {};
      // 评论添加成功，返回的数据
      //本地更新评论列表
      if (replyName) {
        // 添加二级评论
        if (!this.replyContext) {
          this.$message.warning("评论或留言不能为空哦！");
          return;
        }
        // 模拟数据提交成功后返回数据
        res.data = {
          username: this.username,
          userId: this.userId,
          avatarUrl: this.avatarUrl,
          _id: "sec" + this.secIdx++, // 评论id
          replyName,
          date: "2022.09.01", //创建日期
          favour: [], //点赞的用户id
          content: this.replyContext //评论内容
        };
        const comment = this.comments.find(item => item._id == id);
        if (!comment.replyInfo) {
          comment.replyInfo = [];
        }
        comment.replyInfo.push(res.data);
        this.replyContext = "";
      } else {
        // 添加一级评论，提交数据到后端
        if (!this.context) {
          this.$message.warning("评论或留言不能为空哦！");
          return;
        }
        // 模拟数据提交成功后返回数据
        res.data = {
          username: this.username,
          avatarUrl: this.avatarUrl,
          userId: this.userId,
          _id: "first" + this.firstIdx++, // 评论id
          date: "2022.09.01", //创建日期
          articleId: this.articleId, // 评论的文章id
          favour: [], //点赞的用户id
          content: this.context //评论内容
        };
        this.comments.push(res.data);
        this.context = "";
      }
      this.isShowSec = this.isClickId = "";
    }
  }
};
</script>

<style scoped>
.comment {
  background-color: rgba(225, 232, 230, 0.30);
  min-height: 26vh;
  border-radius: 5px;
  margin-top: 2px;
  overflow: hidden;
}

.comment .active {
  color: #ca0404;
}

.comment .comment-header {
  position: relative;
  height: 50px;
  padding: 10px 5px;
  display: flex;
  align-items: center;
}

.comment .comment-header .input {
  margin-left: 10px;
  margin-right: 20px;
  flex: 1;
}

.comment .comment-header .input /deep/ .el-input__inner:focus {
  border-color: #dcdfe6;
}

.comment .comment-body {
  min-height: 70px;
  padding: 10px 20px;
  font-size: 14px;
}

.comment .comment-body .first-comment {
  display: flex;
}

.comment .comment-body .first-comment .input /deep/ .el-input__inner:focus {
  border-color: #dcdfe6;
}

.comment .comment-body .first-comment i {
  margin-right: 5px;
  margin-left: 1vw;
  cursor: pointer;
}

.comment .comment-body .first-comment i:nth-child(3) {
  color: #ca0404;
}

.comment .comment-body .first-comment .content {
  margin-left: 10px;
  position: relative;
  flex: 1;
}

.comment .comment-body .first-comment .content > span {
  font-size: 12px;
  color: #828181;
}

.comment .comment-body .first-comment .content .comment-right {
  position: absolute;
  right: 0;
  top: 0;
}

.reply-comment {
  height: 60px;
  display: flex;
  align-items: center;
}

.reply-button {
  margin-left: 20px;
  height: 35px;
  background-color: #42b983;
}

.comment .comment-body .first-comment .content .second-comment {
  display: flex;
  padding: 10px 0 10px 5px;
  border-radius: 20px;
  background: #ffffff;
}

.comment .comment-body .first-comment .content .second-comment .to_reply {
  color: #7e7f80;
}

.infinite-list::-webkit-scrollbar {
  display: none;
}

.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

.el-upload__tip {
  line-height: 1.2;
}

/deep/ .el-upload {
  width: 100%;

}

/deep/ .el-upload .el-upload-dragger {
  width: 100%;
  border: 0 solid #FFFFFF;
  height: 146px;

}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  border: 1px dashed #d9d9d9;
  text-align: center;
}

.avatar-uploader-icon:hover {
  border-color: #de4949;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.demo-ruleForm >>> .el-input__inner {
  border: 0;
  height: 30px;
  line-height: 30px;
  padding: 0 0 0 0;
}
</style>