<template>
  <div>
    <!--    <j-comment-->
    <!--        :key-map="keyMap"-->
    <!--        :showNumber="2"-->
    <!--        :comment-datas="commentDatas"-->
    <!--        @submitComment="submitComment">-->
    <!--    </j-comment>-->
  </div>
</template>

<script>
export default {
  name: "coment",
  data() {
    return {
      code: "",
      keyMap: {
        pid: "parent_comment_id",
        id: "id",
        isAdmin: "admin_comment"
      },
      commentDatas: [
        {
          id: 1,
          admin_comment: 0,
          avatar:
              "https://img2.baidu.com/it/u=134769530,4268043097&fm=253&fmt=auto&app=138&f=JPEG?w=533&h=333",
          create_time: "2020-05-31 23:03:55",
          email: "",
          nickname: "nickname1",
          parent_comment_id: null,
          content: "我是评论1"
        },
        {
          id: 2,
          admin_comment: 0,
          avatar:
              "https://img2.baidu.com/it/u=3133697304,2308274678&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
          create_time: "2020-06-1 23:03:55",
          email: "",
          nickname: "nickname2",
          parent_comment_id: 1,
          content: "我是评论2"
        },
        {
          id: 3,
          admin_comment: 0,
          avatar:
              "https://img2.baidu.com/it/u=3772577665,2044310843&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=727",
          create_time: "2020-05-2 23:03:55",
          email: "",
          nickname: "nickname3",
          parent_comment_id: null,
          content: "我是评论3"
        },
        {
          id: 4,
          admin_comment: 0,
          avatar:
              "https://img0.baidu.com/it/u=3966731730,957573008&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500",
          create_time: "2020-06-2 23:03:55",
          email: "",
          nickname: "nickname4",
          parent_comment_id: 2,
          content:
              "我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,我是评论,"
        }
      ],
    };
  },
  methods: {
    submitComment(item) {
      console.log("item: ", item);
    }
  }
}
</script>

<style scoped>

</style>