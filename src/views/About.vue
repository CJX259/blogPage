<template>
  <div>
    <div id="about">
      <h1>关于我</h1>
      <p>
        <br />不会修电脑的程序员
        <br />努力进入大厂实习
        <br />近一年前端学习
        <br />欢迎技术讨论!
        <br />
      </p>
      <h1>关于博客</h1>
      <p>
        <br />建立于2020.3.3
        <br />一切都要从一只蝙蝠说起
        <br />先是使用vue库搭建网页
        <br />后用手脚架将网页重构，组件化，便于维护
        <br />后台服务使用nodejs搭建
      </p>
    </div>
    <Comments />
  </div>
</template>
<script>
export default {
  components: {
    Comments:  ()=> import("../components/Comments")
  }
};
</script>
<style scoped>
#about {
  width: 100%;
  background: #fff;
  margin: 0px 0px 0px 0px;
  opacity: 0.9;
  border-radius: 8px;
  box-shadow: 5px 5px 5px;
  border-color: #bfbfbf #333 #333333 #bfbfbf;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid;
  border-color: #bfbfbf #333 #333333 #bfbfbf;
}
#about h1 {
  padding: 10px 0px 10px 15px;
  border-bottom: 1px solid gray;
}
#about p {
  padding: 10px 0px 10px 20px;
  font-weight: 500;
  font-size: 16px;
}
</style>