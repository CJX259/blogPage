<template>
  <div class="wrapper" ref="wrapper">
    <Header></Header>
    <div class="content">
      <div class="content-left">
        <router-view></router-view>
      </div>
      <div class="content-right">
        <cloud-tags></cloud-tags>
        <hot-blogs />
        <new-comments />
      </div>
    </div>
    <foot />
  </div>
</template>

<script>
export default {
  components: {
    Header() {
      return import("../components/Header");
    },
    cloudTags() {
      return import("../components/CloudTags");
    },
    hotBlogs() {
      return import("../components/HotBlogs");
    },
    newComments() {
      return import("../components/NewComments");
    },
    foot() {
      return import("../components/Foot");
    }
  },
  computed:{
    background(){
      return require("../assets/" + "爱丽丝.jpg");
    }
  },
  beforeUpdate() {
    let oImg = new Image();
    oImg.src = this.background;
    oImg.onload = ()=> {
      this.$refs.wrapper.style.backgroundImage = "url(" + oImg.src + ")";
    };
  },
  mounted() {}
};
</script>
<style scoped>
.wrapper {
  background-image: url("../assets/爱丽丝压缩.jpg");
  overflow: hidden;
  position: relative;
  background-size: 100%;
  min-width: 1065px;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.content {
  width: 1050px;
  position: relative;
  margin: 0 auto;
  margin-top: 40px;
  display: block;
}
/* 清除浮动流 */
.content::after {
  content: "";
  clear: both;
  display: block;
}
.content .content-left {
  float: left;
  width: 64%;
  box-sizing: border-box;
}
.content .content-right {
  float: right;
  width: 30%;
  margin-left: 10px;
}
.right-module {
  box-shadow: 3px 3px 10px 3px;
  border-color: #bfbfbf #333 #333333 #bfbfbf;
  width: 100%;
  background: #191818;
  opacity: 0.8;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 15px;
  position: relative;
  margin-bottom: 20px;
  transition: all 0.3s;
}
.right-module:hover {
  transform: scale(1.05);
}
</style>