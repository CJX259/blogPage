<template>
  <div class="edit_blog">
    <h1>编辑文章</h1>
    <input type="text" placeholder="标题" id="title" />
    <input type="text" placeholder="标签，用逗号隔开" id="tags" />
    <!--以下为富文本-->
    <div id="content"></div>
    <button @click="submit">提交</button>
  </div>
</template>
<script>
import E from 'wangeditor'
let axios = require("axios");
export default {
  data (){
    return {
      editor: {}
    }
  },
  methods: {
    submit() {
      var title = document.getElementById("title").value;
      var tags = document.getElementById("tags").value;
      var content = this.editor.txt.html();
      var data = {
        title,
        tags,
        content
      };
      axios({
        url: "/api/editBlog",
        method: "post",
        data
      }).then(function(resp) {
        alert("成功");
      });
    }
  },
  mounted() {
    this.editor = new E("#content");
    this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    this.editor.create();
  }
};
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
.edit_blog {
  position: relative;
  display: block;
  width: 1000px;
  margin: 0px auto 0px auto;
}
h1 {
  margin: 20px 0px 20px 0px;
}
input {
  width: 400px;
  height: 30px;
  font-size: 20px;
  padding: 3px 10px 3px 10px;
  border-radius: 5px;
  margin: 0px 0px 20px 0px;
  outline: none;
  border: 1px solid #000;
}
button {
  position: relative;
  display: block;
  height: 50px;
  width: 500px;
  line-height: 50px;
  text-align: center;
  background: #1e88e5;
  color: white;
  font-size: 24px;
  border-radius: 8px;
  margin: 20px auto 0px auto;
}
/* textarea {
  width: 1000px;
  height: 500px;
  font-size: 16px;
} */
</style>