<template>
  <div>
    <div id="blogDetail">
      <h1>{{content.title}}</h1>
      <span>作者：陈建希 发布于：{{content.ctime}} 浏览({{content.views}}) 标签：{{content.tags}}</span>
      <div id="blog_content" v-html="content.content"></div>
    </div>
    <Comments />
  </div>
</template>
<script>
let axios = require("axios");
import { mapState } from "vuex";
export default {
  data() {
    return {
      content: {}
      // bid: ""
    };
  },
  computed: {
    ...mapState(["bid"])
  },
  components: {
    Comments: _ => import("../components/Comments")
  },
  methods: {
    getBlog() {
      // this.bid = "";

      // if (this.$route.params.bid) {
      //   this.bid = this.$route.params.bid;
      //   axios({
      //     url: "/api/getBlogById?bid=" + this.bid,
      //     method: "get"
      //   }).then(resp => {
      //     let data = resp.data.data[0];
      //     this.content = data;
      //   });
      // }
      if (this.bid) {
        axios({
          url: "/api/getBlogById?bid=" + this.bid,
          method: "get"
        }).then(resp => {
          let data = resp.data.data[0];
          this.content = data;
        });
      } else if (localStorage.getItem("bid")) {
        // this.bid = +localStorage.getItem("bid");
        this.$store.commit('changeBid', +localStorage.getItem('bid'));
        axios({
          url: "/api/getBlogById?bid=" + this.bid,
          method: "get"
        }).then(resp => {
          let data = resp.data.data[0];
          this.content = data;
        });
      }
    }
  },
  watch: {
    $route: "getBlog"
  },
  created() {
    this.getBlog();
  }
};
</script>
<style scoped>
#blogDetail {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 4px 4px 4px;
  border: 1px solid grey;
  opacity: 0.9;
  /* max-height: 500px; */
  /* overflow-y: scroll; */
  /* overflow-x: hidden; */
}
#blogDetail::-webkit-scrollbar {
  width: 10px;
  height: 8px;
}
#blogDetail::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: #eee;
}
#blogDetail::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #555;
}
#blogDetail > h1 {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 10px 0px 5px 20px;
}

#blogDetail > span {
  display: inline-block;
  width: 98%;
  height: 30px;
  line-height: 30px;
  padding: 5px 0px 5px 20px;
  border-bottom: 1px solid gray;
}

#blogDetail > div {
  width: 98%;
  padding: 10px 20px 30px 20px;
  box-sizing: border-box;
  word-wrap: break-word;
}
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
#blogComment ul li {
  list-style: none;
  background: #d9edf7;
  border: 1px dashed #7ca4c1;
  margin: 10px 0px 0px 0px;
  padding: 10px 0px 10px 10px;
  border-radius: 5px;
}

#blogComment ul li span {
  /*background: pink;*/
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