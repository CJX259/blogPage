<template>
  <div>
    <div id="blogComment">
      <span>{{commentsCount}} Comments</span>
      <ul>
        <li v-for="(key) of commentList" :key="key.id">
          <!-- 点击回复时把此评论的name传入，设置addComment的parentName -->
          <span class="user_name">
            {{key.user_name}}:
            <span v-if="key.parent == 1" class="user_name">@{{key.parent_name}}</span>
          </span>
          <span class="date">{{key.ctime}}</span>
          <p>
            {{key.comments}}
            <span class="res" @click.prevent="huifu(key.user_name)">[回复]</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="addComment" id="addComment">
      <!-- <input type="hidden" v-model="commentId"> -->
      <input type="text" placeholder="Nick Name" v-model="name" />
      <input type="text" placeholder="Email" v-model="email" />
      <textarea placeholder="content" v-model="comment"></textarea>
      <input type="text" v-model="inputRandomCode" />
      <span v-html="randomSvg" v-on:click="changeCode"></span>
      <button @click="sendComment">提交留言</button>
    </div>
  </div>
</template>
<script>
let axios = require("axios");
import { mapState } from "vuex";
export default {
  data() {
    return {
      commentList: [],
      commentsCount: 0,
      randomSvg: "",
      rightCode: "",
      // commentId: 0,
      name: "",
      email: "",
      comment: "",
      inputRandomCode: "",
      parentName: "0",
      parent: -1
      // bid: null
    };
  },
  computed:{
    ...mapState(['bid'])
  },
  methods: {
    huifu(parentName) {
      this.parent = 1;
      this.parentName = parentName;
      window.scrollTo(0, document.body.scrollHeight);
      //   location.href = "#addComment";
    },
    changeCode() {
      axios({
        url: "/api/getRandomCode",
        method: "get"
      })
        .then(resp => {
          this.randomSvg = resp.data.data.data;
          this.rightCode = resp.data.data.text;
        })
        .catch(e => {
          console.log(e);
        });
    },
    sendComment() {
      if (
        this.name == "" ||
        this.email == "" ||
        this.comment == "" ||
        this.inputRandomCode == ""
      ) {
        alert("内容不能为空");
        return;
      }
      if (this.inputRandomCode.toLowerCase() != this.rightCode.toLowerCase()) {
        alert("验证码错误");
        return;
      }
      // about的bid固定为-1

      axios({
        url:
          "/api/sendComment?bid=" +
          this.bid +
          "&parent=" +
          this.parent +
          "&name=" +
          this.name +
          "&email=" +
          this.email +
          "&comment=" +
          this.comment +
          "&parentName=" +
          this.parentName,
        method: "get"
      }).then(resp => {
        alert("留言成功");
        // 此处想要触发vue重新渲染
        this.getComments();
        // location.reload();
      });
    },
    initData() {
      this.commentList = [];
      this.commentsCount = 0;
      this.randomSvg = "";
      this.rightCode = "";
      // commentId= 0;
      this.name = "";
      this.email = "";
      this.comment = "";
      this.inputRandomCode = "";
      this.parentName = "0";
      this.parent = -1;
      // this.bid = null;
    },
    getBid() {
      // 每次get都需要把之前的内容清空
      // this._data不可迭代，没办法,只能手动了
      this.initData();
      // if (this.$route.query.bid) {
      //   this.bid = this.$route.query.bid;
      // } 
      if (
        this.$route.path == "/about" ||
        this.$route.path == "/guestbook"
      ) {
        // this.bid = -1;
        this.$store.commit('changeBid', -1);
      }
    },
    getComments() {
      this.getBid();
      axios({
        url: "/api/getCommentsByBlogId?bid=" + this.bid,
        method: "get"
      }).then(resp => {
        this.commentList = resp.data.data;
      });
      axios({
        url: "/api/getCommentsCountByBlogId?bid=" + this.bid,
        method: "get"
      }).then(resp => {
        this.commentsCount = resp.data.data[0].count;
      });
      this.changeCode();
    }
  },
  watch: {
    $route: "getComments"
  },
  created() {
    //！！！！！
    //   此处拿bid需要修改
    this.getComments();
    // 拿comments
  }
};
</script>
<style scoped>
#blogComment {
  width: 100%;
  margin: 20px 0px 0px 0px;
  opacity: 0.9;
  background: #fff;
  box-shadow: 4px 4px 4px;
  padding: 20px 10px 20px 10px;
  box-sizing: border-box;
  border-radius: 8px;
}

#blogComment ul {
  width: 98%;
}

#blogComment .user_name {
  font-weight: 600;
}

#blogComment .date {
  float: right;
  margin-right: 10px;
}
#blogComment .res {
  font-weight: 600;
  float: right;
  margin-right: 10px;
  color: #008c8c;
  cursor: pointer;
}
#blogComment ul li {
  list-style: none;
  background: #d9edf7;
  border: 1px dashed #7ca4c1;
  margin: 10px 0px 0px 0px;
  padding: 10px 0px 10px 10px;
  border-radius: 5px;
}

#blogComment ul li span {
  /* background: pink; */
  padding: 5px 0px 5px 10px;
}

#blogComment ul li p {
  margin: 20px 0px 0px 10px;
}

.addComment {
  margin-top: 20px;
  box-shadow: 4px 4px 4px;
  width: 100%;
  border: 1px solid grey;
  background: #fff;
  opacity: 0.9;
  border-radius: 8px;
  box-sizing: border-box;
}

.addComment input {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  margin: 15px 0px 5px 10px;
  outline: none;
  padding-left: 5px;
}

.addComment textarea {
  width: 620px;
  height: 100px;
  margin: 5px 0px 5px 10px;
  font-size: 16px;
  padding: 5px 5px 5px 5px;
  resize: none;
}

.addComment button {
  display: block;
  width: 100px;
  background: white;
  margin: 5px 0px 10px 10px;
  height: 30px;
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 4px;
}

#addComment > span {
  cursor: pointer;
}
</style>