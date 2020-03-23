<template>
  <div class="edit_blog">
    <h1>编辑每日一句</h1>
    <textarea placeholder="请输入每日一句" id="content"></textarea>
    <button @click="submit">提交</button>
  </div>
</template>
<script>
let axios = require("axios");
export default {
  methods: {
    submit() {
      var content = document.getElementById("content").value;
      axios({
        url: "/editEveryDay",
        method: "post",
        data: content
      })
        .then(function(resp) {
          alert("提交成功");
          // let result = JSON.pares(resp);
          // alert(result.msg);
          document.getElementById("content").value = "";
        })
        .catch(function(error) {
          console.log("请求失败", error);
        });
    }
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
  width: 200px;
  height: 30px;
  font-size: 20px;
  padding: 3px 10px 3px 10px;
  border-radius: 5px;
  margin: 0px 0px 20px 0px;
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
  margin: 20px 0px 0px 0px;
}
textarea {
  width: 500px;
  height: 300px;
  font-size: 16px;
}
</style>