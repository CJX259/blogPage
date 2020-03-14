<template>
  <div class="right-module hot-blogs">
    <span>Hot Blogs</span>
    <ul>
      <li v-for="blog in blogTitles" :key="blog.id">
        <span class="blog" @click="toDetail(blog.id)">{{blog.title}} | Page Views: {{blog.views}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
let axios = require("axios");
export default {
  data() {
    return {
      blogTitles: []
    };
  },
  methods: {
    toDetail(bid){
      this.$store.commit('changeBid', bid);
      localStorage.setItem('bid', bid);
      this.$router.push({
        name : "blog_detail",
        query : {bid}
      })
    },
  },
  created() {
    axios({
      url: "/api/getHotBlogs?limit=3",
      method: "get"
    }).then(resp => {
      // console.log(resp.data.data);
      // for (let i = 0; i < resp.data.data.length; i++) {
      //   resp.data.data[i].link = "blog_detail?bid=" + resp.data.data[i].id;
      // }
      this.blogTitles = resp.data.data;
    });
  }
};
</script>
<style scoped>
.hot-blogs {
  margin-top: 20px;
}
.hot-blogs > span {
  font-weight: 700;
  display: block;
  width: 100%;
  height: 40px;
  color: #eee;
  line-height: 40px;
  padding: 0px 0px 0px 10px;
  box-sizing: border-box;
}

.hot-blogs li {
  height: 20px;
  border-bottom: 1px solid gray;
  padding: 10px 0px 5px 10px;
}
.hot-blogs li .blog {
  color: #008c8c;
  font-size: 14px;
  cursor: pointer;
}
.hot-blogs li .blog:hover {
  color: #eee;
}
</style>