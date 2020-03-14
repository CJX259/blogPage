<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
let axios = require('axios');
export default {
  components : {
    haed (){
      return import("./components/Header")
    }
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
* a{
  color : #008c8c;
}
*::selection{
  background-color: #008c8c;
  color : #fff;
}
</style>
