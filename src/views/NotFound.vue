<template>
  <div>
    <div class="title">
      <p>404 NotFound!!  页面不见啦</p>
      <div>
        <button>开始游戏</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    const oScript1 = document.createElement("script");
    oScript1.src = "http://129.204.189.5/js/snakejs/base.js";
    document.body.appendChild(oScript1);
  }
};
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 18px;
  width: 400px;
  margin: 0 auto;
  text-align: center;
}
/* button {
  margin-left: 715px;
  border: 1px solid #000;
  border-radius: 2px;
  margin-top: 15px;
  padding: 5px 10px;
  background: #eee;
  outline: none;
} */
</style>