<template>
  <header class="header">
    <div class="header_content">
      <span @click="toHome" class="title">Jessy's Blog | Tech Blog</span>|
      <ul class="menu">
        <li>
          <span class="blog-title" @click="toHome">Blogs</span>
        </li>
        <li>
          <span class="blog-title" @click="toMap">Map</span>
        </li>
        <li>
          <span class="blog-title" @click="toAbout">About</span>
        </li>
        <li>
          <span class="blog-title" @click="toGuessbook">Comments</span>
        </li>
      </ul>
      <div class="search-bar">
        <input type="text" v-model="search" placeholder="Enter a keyword to search" />
        <button @click="submitSearch()">Search</button>
      </div>
    </div>
  </header>
</template>

<script>
let axios = require("axios");
// import { mapMutaion } from "vuex";
export default {
  data() {
    return {
      search: ""
    };
  },
  methods: {
    toHome() {
      this.$store.commit("clearTagId");
      // this.$store.commit("changePage", {nowPage: 1});
      // localStorage.setItem('tagId', '');
      this.$router.push({
        path: "/index"
      });
    },
    toMap() {
      this.$store.commit("clearTagId");
      // localStorage.setItem('tagId', '');
      this.$router.push({
        path: "/sitemap"
      });
    },
    toAbout() {
      this.$store.commit("clearTagId");
      // localStorage.setItem('tagId', '');
      this.$router.push({
        path: "/about"
      });
    },
    toGuessbook() {
      this.$store.commit("clearTagId");
      // localStorage.setItem('tagId', '');
      this.$router.push({
        path: "/guestbook"
      });
    }
  },
  computed: {
    submitSearch() {
      return function() {
        this.$store.commit("changePager", { nowPage: 1 });
        this.$store.commit("clearTagId");
        axios({
          url: "/search?search=" + this.search,
          method: "get"
        }).then(resp => {
          // this.$root.$emit("pageShow", false);
          this.$store.commit("changePager", { display: false });
          // pageTools.display = false;
          // pageTools.refresh();
          for (let i = 0; i < resp.data.data.blogList.length; i++) {
            resp.data.data.blogList[i].link =
              "/blog_detail?bid=" + resp.data.data.blogList[i].id;
            resp.data.data.blogList[i].tags = resp.data.data.blogList[
              i
            ].tags.split("，");
          }
          this.$root.$emit("changeBlogs", resp.data.data.blogList);
          this.$router.push({
            path: "/index",
            query: {
              search: this.search
            }
          });
        });
      };
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  position: relative;
  height: 50px;
  opacity: 0.8;
  background: #191818;
}
.header_content {
  width: 1050px;
  height: 100%;
  position: relative;
  margin: 0 auto;
}
.header_content .title {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  height: 100%;
  width: 220px;
  line-height: 50px;
  color: white;
  font-size: 18px;
  cursor: pointer;
}
.header_content .menu {
  position: absolute;
  display: inline-block;
  left: 230px;
  top: 0;
  width: 400px;
  height: 100%;
}
.header_content .menu > li {
  float: left;
  width: 80px;
  height: 100%;
  text-align: center;
  transition: all 0.2s;
}
.header_content .menu > li:hover {
  background: grey;
  border-bottom: 1px solid #eee;
}
.header_content .menu > li > .blog-title {
  font-size: 14px;
  color: white;
  line-height: 50px;
  cursor: pointer;
}
.header_content .search-bar {
  position: absolute;
  right: 0;
  top: 0;
  height: 50px;
}
.header_content .search-bar > button {
  position: absolute;
  right: 50px;
  top: 50%;
  height: 30px;
  width: 60px;
  margin-top: -15px;
  background-color: white;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  border: none;
}
.header_content .search-bar > input {
  position: absolute;
  right: 120px;
  width: 200px;
  height: 30px;
  top: 50%;
  margin-top: -15px;
  outline: none;
  border-radius: 5px;
  padding: 0 10px;
  border: none;
}
</style>