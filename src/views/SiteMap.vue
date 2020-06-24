<template>
  <div class="map">
    <!-- <h1>个人博客's Map</h1>
    <div>
      <router-link to="/index">个人博客首页</router-link> &gt;&gt;
      <router-link to="/sitemap">站点地图</router-link>
    </div>-->
    <!-- <div> -->
    <p>Blog's Map</p>

    <MapBlogs />
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  components: {
    MapBlogs: () => import("../components/MapBlogs")
  }
};
</script>
<style scoped>
.map {
  padding: 10px 0px 50px 0px;
  box-sizing: border-box;
  background: #eee;
  opacity: 0.8;
  border-radius: 8px;
  box-shadow: 5px 5px 5px;
}
p {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
}
@media (min-width: 900px) {
  .map {
    font-size: 30px;
    min-width: 600px;
  }
}
</style>

