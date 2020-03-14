<template>
  <div class="right-module new-comments">
    <p>New Comments</p>
    <div v-for="comment in comments" :key="comment.id">
      <span class="comment-user">{{comment.user}}</span>
      <span class="comment-date">{{comment.date}}</span>
      <span class="comment-content">{{comment.content}}</span>
    </div>
  </div>
</template>
<script>
let axios = require("axios");
export default {
  data() {
    return {
      comments: []
    };
  },
  created() {
    axios({
      url: "/api/getNewComments?limit=3",
      method: "get"
    }).then(resp => {
      for (let i = 0; i < resp.data.data.length; i++) {
        resp.data.data[i].user = resp.data.data[i].user_name;
        resp.data.data[i].date = resp.data.data[i].ctime;
        resp.data.data[i].content = resp.data.data[i].comments;
      }
      this.comments = resp.data.data;
    });
  }
};
</script>
<style scoped>
.new-comments > p{
  font-weight: 700;
  padding: 0px 0px 0px 10px;
  color : #eee;
}

.new-comments > div{
  width: 100%;
  border-bottom: 1px solid grey;
}
.new-comments span{
  padding: 10px 0px 0px 10px;
  color : #eee;
  width: 43%;
  display: inline-block;
}
.new-comments .comment-date{
  text-align: right;
}
.new-comments .comment-content{
  width: 90%;
  color: #a2a2a2;
  font-size: 14px;
  padding-bottom: 10px;
}
</style>