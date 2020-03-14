<template>
  <div id="blog-list">
    <ul>
      <li class="blog" v-for="blog in blogs" :key="blog.id">
        <span @click="toDetail(blog.id)" class="blog-title">{{blog.title}}</span>
        <p v-html="blog.content"></p>
        <div class="blog-foot">
          Issued: {{blog.ctime}} | Page Views: {{blog.views}} |
          <span
            v-for="tag in blog.tags"
            :key="tag.id"
          >{{tag}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
let axios = require("axios");
import {mapState} from 'vuex'
// 设置一个函数，让其他组件能够修改blogs值
// 此组件与page组件有关联，相互调用方法
export default {
  name: "blogList",
  data() {
    return {
      // 每页展示三个就好
      // limit: 3,
      blogs: [],
      // tagId: ""
    };
  },
  methods: {
    changeBlogs(blogs) {
      this.blogs = blogs;
    },
    toDetail(bid) {
      // console.log(params);
      this.$store.commit("changeBid", bid);
      localStorage.setItem("bid", bid);
      this.$router.push({
        name: "blog_detail",
        query: { bid }
      });
    },
    getBlogsBegin() {
      axios({
        url: "/api/getBlogByPage?offset=0&limit=" + this.pager.limit,
        method: "get"
      })
        .then(resp => {
          for (let i = 0; i < resp.data.data.length; i++) {
            // 注意，分割的为中文逗号
            resp.data.data[i].tags = resp.data.data[i].tags.split("，");
          }
          this.blogs = resp.data.data;
          // for (let i = 0; i < resp.data.data.length; i++) {
          //   this.blogs[i].link = "/blog_detail?bid=" + resp.data.data[i].id;
          // }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getBlogsByTagsBegin() {
      axios({
        url:
          "/api/queryBlogsByTagsByPage?offset=0&limit=" +
          this.pager.limit +
          "&tagId=" +
          this.tagId,
        method: "get"
      })
        .then(resp => {
          for (let i = 0; i < resp.data.data.length; i++) {
            // 注意，分割的为中文逗号
            resp.data.data[i].tags = resp.data.data[i].tags.split("，");
          }
          this.blogs = resp.data.data;
          // for (let i = 0; i < resp.data.data.length; i++) {
          //   this.blogs[i].link = "/blog_detail?bid=" + resp.data.data[i].id;
          // }
        })
        .catch(error => {
          console.log(error);
        });
    },
    begin() {
      // search时不希望触发监听index的变化函数
      if (this.$route.query.search) {
        return;
      }
      // 展示page
      // this.$root.$emit('pageShow', true);
      this.$store.commit("changePager", { display: true });
      // 初始化tagId
      // this.$store.commit('changeTagId', "");
      if(localStorage.getItem('tagId')){
        this.$store.commit('changeTagId', +localStorage.getItem('tagId'));
      }
      // 拿到tagId
      // if (this.$route.params.tagId) {
        // this.$store.commit('changeTagId', this.$route.params.tagId);
      // }
      if (this.tagId != "") {
        // 调用pageTool的方法，获得该tags下的blogs总数   防止双方组件的tagId不一致，使用此方法
        // 更好的方法是使用vuex,有空再修改修改
        this.$root.$emit("changeTotal", true, this.tagId);
        // 获得blogs
        this.getBlogsByTagsBegin();
      } else {
        // 调用pageTool的方法，获得blogs总数
        this.$root.$emit("changeTotal", false);
        // 获得blogs
        this.getBlogsBegin();
      }
    }
  },
  watch: {
    $route: "begin"
  },
  computed: {
    ...mapState(['pager', 'tagId'])
  },
  created() {
    //绑定给外部组件修改blogs的接口
    this.$root.$on("changeBlogs", item => {
      this.blogs = item;
    });
    this.begin();
  }
};
</script>
<style scoped>
#blog-list {
  position: relative;
  width: 100%;
  margin-top: 20px;
}
#blog-list .blog {
  margin-top: 20px;
  position: relative;
  display: inline-block;
  width: 100%;
  background: white;
  opacity: 0.8;
  border-radius: 8px;
  box-shadow: 5px 5px 5px;
  border-color: #bfbfbf #333 #333333 #bfbfbf;
  padding: 10px 0px 0px 0px;
  box-sizing: border-box;
  transition: all 0.3s;
}
#blog-list .blog:hover {
  box-shadow: 8px 8px 8px;
  transform: scale(1.05);
}

/* 5f5f5f */
#blog-list .blog .blog-title {
  display: inline-block;
  color: #008c8c;
  width: 100%;
  height: 20px;
  font-size: 20px;
  padding: 15px 0px 10px 10px;
  cursor: pointer;
  box-sizing: border-box;
}
#blog-list .blog > p {
  display: inline-block;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  box-sizing: border-box;
  word-wrap: break-word;
}
#blog-list .blog .blog-foot {
  display: inline-block;
  width: 100%;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background: #008c8c;
  box-sizing: border-box;
  padding: 5px 0px 5px 9px;
  color: white;
}
#blog-list .blog .blog-foot > span {
  margin-left: 10px;
}
</style>