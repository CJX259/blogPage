<template>
  <div class="right-module tags-cloud" id="tags_cloud">
    <span>Cloud Tags</span>
    <div>
      <span class="tag"
        @click="setTag(tag.id)"
        v-for="tag in tags" :key="tag.id"
        :style="{color : randomColor(), fontSize : randomSize() }"
      >{{tag.tag}}</span>
    </div>
  </div>
</template>
<script>
let axios = require('axios');
export default {
  data() {
    return {
      tags: []
    };
  },
  methods: {
    setTag(tagId){
      this.$store.commit('changePager', {nowPage : 1});
      this.$store.commit('changeTagId', tagId);
      localStorage.setItem('tagId', tagId);
      this.$router.push({
        path : "/index",
        query : {
          tagIg : tagId
        }
      })
    }
  },
  computed: {
    randomColor() {
      return function() {
        let red = Math.random() * 205 + 50;
        let green = Math.random() * 205 + 50;
        let blue = Math.random() * 205 + 50;
        return "rgb( " + red + " ," + green + "," + blue + " )";
      };
    },
    randomSize() {
      return function() {
        let size = Math.random() * 13 + 12;
        return size + "px";
      };
    }
  },
  created() {
    // 请求
    axios({
      url: "/api/getTagsCloud",
      method: "get"
    }).then(resp => {
      // for (let i = 0; i < resp.data.data.length; i++) {
        // resp.data.data[i].link = "/index?tagId=" + resp.data.data[i].id;
      // }
      this.tags = resp.data.data;
    });
  }
};
</script>
<style scoped>
.tags-cloud > span {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0px 0px 0px 10px;
  color: #eee;
  box-sizing: border-box;
  font-weight: 700;
}
.tags-cloud .tag {
  display: inline-block;
  margin-left: 5px;
  cursor: pointer;
  color: #008c8c;
}
</style>