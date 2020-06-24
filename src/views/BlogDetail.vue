<template>
  <div>
    <div id="blogDetail">
      <h1>{{content.title}}</h1>
      <span>标签：{{content.tags}}</span>
      <br />
      <span>浏览({{content.views}})</span>
      <span>作者: 建希</span>
      <br />
      <span>发布于：{{content.ctime}}</span>
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
    Comments: () => import("../components/Comments")
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
          url: "/getBlogById?bid=" + this.bid,
          method: "get"
        }).then(resp => {
          let data = resp.data.data[0];
          this.content = data;
        });
      } else if (localStorage.getItem("bid")) {
        // this.bid = +localStorage.getItem("bid");
        this.$store.commit("changeBid", +localStorage.getItem("bid"));
        axios({
          url: "/getBlogById?bid=" + this.bid,
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
#blogDetail br {
  display: none;
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
  width: 95%;
  min-height: 30px;
  line-height: 30px;
  padding: 10px 0px 15px 5%;
  border-bottom: 1px solid gray;
}

#blogDetail > span {
  display: inline-block;
  width: 98%;
  height: 30px;
  line-height: 30px;
  padding: 5px 0px 5px 20px;
  border-bottom: none;
}
#blogDetail > span:nth-last-of-type(1) {
  border-bottom: 1px solid gray;
}

#blogDetail > div {
  width: 98%;
  padding: 10px 20px 30px 20px;
  box-sizing: border-box;
  word-wrap: break-word;
}
@media (max-width: 900px) {
  #blogDetail > h1 {
    font-size: 24px;
  }

  #blogDetail > span {
    display: inline-block;
    font-size: 12px;
    width: 95%;
    height: 15px;
    line-height: 15px;
    padding: 5px 0px 5px 5%;
    border-bottom: none;
  }
}
</style>