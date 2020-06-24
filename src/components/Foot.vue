<template>
  <footer class="footer">
    <ul>
      <li>C/C++</li>
      <li>JAVA</li>
      <li>PYTHON</li>
      <li>JAVASCRIPT</li>
      <li>数据库</li>
      <li>算法</li>
    </ul>
    <span>Copyright © 2019-2020 建希个人博客 All rights reserved</span>
    <br>
    <a href="http://www.beian.gov.cn/portal/index">粤ICP备20041191号</a>
  </footer>
</template>
<style scoped>
.footer {
  position: relative;
  bottom: 0px;
  width: 100%;
  padding: 10px 0;
  margin-top: 117px;
  left: 0px;
  background: #333333;
  text-align: center;
}
.footer ul {
  display: flex;
  overflow: hidden;
  justify-content: center;
}
.footer ul > li {
  float: left;
  color: #a2a2a2;
  font-size: 14px;
  cursor: pointer;
  margin-left: 50px;
}
.footer span {
  color: #a2a2a2;
  font-size: 12px;
}
@media (max-width: 900px) {
  .footer {
    margin-top: 10vh;
  }
  .footer ul > li {
    float: left;
    color: #a2a2a2;
    font-size: 12px;
    margin-left: 10px;
  }
  .footer a{
    font-size: 12px;
    color: #a2a2a2;
  }
}
</style>