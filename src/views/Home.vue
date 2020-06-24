<template>
  <div class="wrapper" ref="wrapper">
    <Header></Header>
    <div @click="showMenu" class="content">
      <div class="content-left">
        <router-view></router-view>
      </div>
      <div class="content-right">
        <cloud-tags></cloud-tags>
        <hot-blogs />
        <new-comments />
      </div>
    </div>
    <div id="top" @click="toTop"></div>
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
  // computed: {
  //   background() {
  //     return require("../assets/" + "爱丽丝.jpg");
  //   }
  // },
  beforeUpdate() {
    // let oImg = new Image();
    // oImg.src = this.background;
    // oImg.onload = () => {
    //   this.$refs.wrapper.style.backgroundImage = "url(" + oImg.src + ")";
    // };
  },
  computed: {
    showUl() {
      return this.$store.state.showUl;
    }
  },
  methods: {
    showMenu() {
      if (this.showUl) {
        return;
      }
      this.$store.commit("setShowUl", !this.showUl);
    },
    toTop() {
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    }
  },
  mounted() {}
};
</script>
<style scoped>
.wrapper {
  overflow: hidden;
  position: relative;
  background-size: 100%;
  background-attachment: fixed;
}
.content {
  position: relative;
  margin: 0 auto;
  margin-top: 40px;
}
/* 清除浮动流 */
.content::after {
  content: "";
  clear: both;
  display: block;
}
.content .content-left {
  box-sizing: border-box;
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
#top {
  width: 30px;
  height: 30px;
  background-image: url("../assets/toTop.png");
  background-position: center center;
  opacity: .6;
  border-radius: 50%;
  background-size: 30px;
  position: fixed;
  bottom: 140px;
  right: 30px;
}
@media (min-width: 900px) {
  .wrapper {
    background-image: url("../assets/爱丽丝压缩.jpg");
    min-width: 1065px;
  }
  .content {
    width: 1050px;
  }
  .content .content-left {
    float: left;
    width: 64%;
  }
  .content .content-right {
    float: right;
    width: 30%;
    margin-left: 10px;
  }
}
@media (max-width: 900px) {
  .wrapper {
    /* 一会记得关掉这个height */
    background-image: url("../assets/王也压缩.jpg");
  }
  .content {
    /* height: 70vh; */
    min-height: 70vh;
    width: 100vw;
    position: relative;
    margin: 0 auto;
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .content .content-left {
    width: 85vw;
  }
  .content .content-right {
    margin-top: 10vh;
    width: 85vw;
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
}
</style>