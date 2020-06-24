<template>
  <ul id="blogs">
    <li v-for="(blog) in blogs" :key="blog.id">
      <span class="blog" @click="toDetail(blog.id)">{{blog.title}}</span>
      <span>{{blog.ctime}}</span>
    </li>
  </ul>
</template>
<script>
let axios = require("axios");
export default {
  data() {
    return {
      blogs: []
    };
  },
  methods: {
    toDetail(bid) {
      // console.log(params);
      this.$store.commit("changeBid", bid);
      localStorage.setItem("bid", bid);
      this.$router.push({
        name: "blog_detail",
        query: { bid }
      });
    }
  },
  created() {
    axios({
      url: "/getAllBlogs",
      method: "get"
    }).then(resp => {
      // for (let i = 0; i < resp.data.data.length; i++) {
      //   resp.data.data[i].link = "/blog_detail?bid=" + resp.data.data[i].id;
      // }
      this.blogs = resp.data.data;
    });
  }
};
</script>
<style scoped>
ul {
  width: 100%;
  margin-top: 20px;
}

li {
  min-height: 30px;
  width: 72%;
  line-height: 30px;
  font-size: 16px;
  text-align: center;
  border-bottom: 1px solid grey;
  margin: 0 auto;
}
li span {
  /* float:right; */
  display: inline-block;

  /* margin-right: 10px; */
  /* display: inline-block; */
  width: 50%;
}
#blogs .blog {
  font-weight: 600;
  display: inline-block;
  width: 50%;
  color: #010101;
  cursor: pointer;
}

</style>