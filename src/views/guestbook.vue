<template>
  <div>
    <div id="guestbook">
      <h1>欢迎留言~</h1>
      <p>
        <span>你可以发表对本网站的看法</span>
        <br />
        <span>欢迎提出各种建议</span>
        <br />
        <span>也欢迎各种技术讨论</span>
        <br />
      </p>
    </div>
    <Comments />
  </div>
</template>
<script>
export default {
  components: {
    Comments: _ => import("../components/Comments")
  }
};
</script>
<style scoped>
#guestbook{
    width: 100%;
    padding: 20px 20px 20px 20px;
    box-sizing: border-box;
    background: #fff;
    opacity: .9;
    border-radius: 8px;
    box-shadow: 5px 5px 5px;
    border: 1px solid;
    border-color: #bfbfbf #333 #333333 #bfbfbf;
}
</style>