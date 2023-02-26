<template>
  <el-row :gutter="10">
    <el-form ref="commentForm" :model="commentData" :rules="rules" label-width="100px" size="medium">
      <el-col :span="23">
        <el-form-item label="宝贝评价：" style="margin-left: 90px" label-width="90px" prop="goodsRank">
          <el-col :span="12">
            <el-rate style="float: left;padding-left: 20px;line-height: 36px;padding-top: 5px"
                     v-model="commentData.goodsRank" :max='5'></el-rate>
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
          <el-form-item style="margin-left: 60px" label='上传图片：' label-width='120px'>
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
                  <el-avatar :size="178" :src='item' alt='' class='avatar' fit="cover" shape='square'></el-avatar>
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
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
import {getRequest, postRequest} from "@/apis/api";

export default {
  name: "userComment01",
  data() {
    return {
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
    }
  },

  created() {
  },
  methods: {
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
          console.log('相册列表： ', this.PhotoAlbum);
          this.commentData.images = JSON.stringify(response.data);
          console.log('相册列表：this.commentData.images ', this.commentData.images);
          this.commentData.isImages = this.PhotoAlbum.length > 0;
          this.$refs.images.clearFiles(); //上传成功之后清除历史记录
          // this.imagesfileList.splice(0, this.imagesfileList.length);
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
      getRequest("/isCommented?goodsId=" + this.commentData.goodsId).then(response => {
        if (!response.data) {
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
  }
}
</script>

<style scoped>
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