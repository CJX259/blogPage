<template>
  <div id="pageTools" v-if="pager.display">
    <ul>
      <li v-for="(key, index) of pageList" :key="index">
        <span
          @click="changePage(key.pageNum)"
          v-bind:class="{selectOn: key.text==pager.nowPage}"
        >{{key.text}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
let axios = require("axios");
import { mapState } from "vuex";
export default {
  name: "pageTools",
  data() {
    return {
      pageList: [],
      // totalPage : 0
    };
  },
  methods: {
    refresh: function() {
      //更改总页数
      this.$store.commit('changePager', {totalPage : Math.ceil(this.pager.total / this.pager.limit)})
      this.pageList = [];
      this.pageList.push({ text: "首页", pageNum: 1 });
      if (this.pager.nowPage - 1 > 0) {
        this.pageList.push({
          text: "上页",
          pageNum: this.pager.nowPage - 1
        });
      }
      if (this.pager.nowPage - 2 > 0) {
        this.pageList.push({
          text: this.pager.nowPage - 2,
          pageNum: this.pager.nowPage - 2
        });
      }
      if (this.pager.nowPage - 1 > 0) {
        this.pageList.push({
          text: this.pager.nowPage - 1,
          pageNum: this.pager.nowPage - 1
        });
      }
      this.pageList.push({
        text: this.pager.nowPage,
        pageNum: this.pager.nowPage
      });
      if (this.pager.nowPage + 1 <= this.pager.totalPage) {
        this.pageList.push({
          text: this.pager.nowPage + 1,
          pageNum: this.pager.nowPage + 1
        });
      }
      if (this.pager.nowPage + 2 <= this.pager.totalPage) {
        this.pageList.push({
          text: this.pager.nowPage + 2,
          pageNum: this.pager.nowPage + 2
        });
      }
      if (this.pager.nowPage + 1 <= this.pager.totalPage) {
        this.pageList.push({
          text: "下页",
          pageNum: this.pager.nowPage + 1
        });
      }
      this.pageList.push({ text: "尾页", pageNum: this.pager.totalPage });
    },
    getBlogsCount() {
      this.$store.commit("changePager", { nowPage: 1 });
      axios({
        url: "/getTotalBlogs",
        method: "get"
      }).then(resp => {
        this.$store.commit("changePager", { total: resp.data.data[0].count });
        // this.pager.total = resp.data.data[0].count;
        this.refresh();
      });
    },
    // 此函数调用时的tagId可能与blogList中的tagId不相同
    getBlogsByTagCount(tagId) {
      axios({
        url: "/getBlogsByTagMappingCount?tagId=" + tagId,
        method: "get"
      }).then(resp => {
        this.$store.commit("changePager", { total: resp.data.data[0].count });
        // this.pager.total = resp.data.data[0].count;
        this.refresh();
      });
    },
    getBlogs() {
      axios({
        url:
          "/getBlogByPage?offset=" +
          (this.pager.nowPage - 1) * this.pager.limit +
          "&limit=" +
          this.pager.limit,
        method: "get"
      }).then(resp => {
        for (let i = 0; i < resp.data.data.length; i++) {
          // 注意，分割的为中文逗号
          resp.data.data[i].tags = resp.data.data[i].tags.split("，");
          // resp.data.data[i].link = "/blog_detail?bid=" + resp.data.data[i].id;
        }
        this.$root.$emit("changeBlogs", resp.data.data);
        // 拿到数据之后更新page
        this.refresh();
        // blogList.blogs = resp.data.data;
      });
    },
    getBlogsByTag() {
      axios({
        url:
          "/queryBlogsByTagsByPage?tagId=" +
          this.tagId +
          "&offset=" +
          (this.pager.nowPage - 1) * this.pager.limit +
          "&limit=" +
          this.pager.limit,
        method: "get"
      }).then(resp => {
        for (let i = 0; i < resp.data.data.length; i++) {
          // 注意，分割的为中文逗号
          resp.data.data[i].tags = resp.data.data[i].tags.split("，");
          // resp.data.data[i].link = "/blog_detail?bid=" + resp.data.data[i].id;
        }
        this.$root.$emit("changeBlogs", resp.data.data);
        // blogList.blogs = resp.data.data;
        this.refresh();
        // console.log(blogList.blogs);
      });
    }
  },
  computed: {
    ...mapState(["pager", "tagId"]),
    changePage: function() {
      return function(pageNum) {
        this.$store.commit("changePager", { nowPage: pageNum });
        if (this.tagId == "") {
          this.getBlogs();
        } else {
          this.getBlogsByTag();
        }
      };
    }
  },
  created() {
    // 绑定修改total的方法，给blogList请求blogs时调用
    this.$root.$on("changeTotal", (isTag, tagId) => {
      if (!isTag) {
        this.getBlogsCount();
      } else {
        this.getBlogsByTagCount(tagId);
      }
    });
    // 设置blog总数
    if (this.tagId == "") {
      this.getBlogsCount();
    } else {
      this.getBlogsByTagCount(this.tagId);
    }
  }
};
</script>
<style scoped>
#pageTools {
  position: relative;
  display: block;
  width: 100%;
  margin: 20px 0px 0px 0px;
}
#pageTools > ul {
  position: relative;
  display: block;
  width: 100%;
  text-align: center;
}

#pageTools > ul > li {
  opacity: 0.8;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  /* border: 1px solid; */
  border-radius: 4px;
  cursor: pointer;
  background: #eee;
  overflow: hidden;
  margin-left: 5px;
  box-shadow: 3px 3px 3px;
}
#pageTools > ul > li > span {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.selectOn {
  background: #008c8c;
  color: white;
}
.selectOff {
  background: white;
  color: #000;
}
.unAllow{
  color :red;
  /* pointer-events: none; */
}

</style>