<template>
  <div id="every_day">
    <span>Sentence of the Day</span>
    <p v-html="getContent"></p>
  </div>
</template>
<script>
let axios = require("axios");
export default {
  data() {
    return {
      content: "Loading~~~"
    };
  },
  computed: {
    getContent: function() {
      return this.content;
    }
  },
  created(){
    // 请求数据
    axios({
      url: "/api/queryEveryDay",
      method: "get"
    }).then(resp => {
        this.content = resp.data.data.content;
      }).catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
#every_day{
    position: relative;
    width: 100%;
    height: 80px;
    border-radius: 8px;
    background: white;
    opacity: .9;
    box-shadow: 5px 5px 5px #333;    
    /* border-color: #bfbfbf #8e8e8e #5f5f5f #bfbfbf; */
    box-sizing: border-box;
    text-align: center;
    padding: 10px;
    background: #008c8c;
    color : #eee;
    opacity: .8;
}
#every_day > span{
    font-size: 12px;
}
#every_day > p{
    font-weight: 600;
}
</style>