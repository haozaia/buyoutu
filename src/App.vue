<template>
<!-- 新版 -->
<div>
  <div id="app">
    <Header v-if="$route.name !== 'login'" />
    <div class="ceshi"></div>
    <div class="test_left" id="leftNav" v-if="$route.name !== 'login'">
      <nav-menu></nav-menu>
    </div>
    <div :class="$route.name !== 'login' ? 'contentWapper': ''">
      <router-view  :key="$route.fullPath" />
      
    </div>
    <!-- <Footer v-if="$route.name !== 'changepassword' && $route.name !== 'login' && $route.name !== 'changePassword_c'" /> -->
  </div>
</div>
</template>

<script>
import Footer from "./components/Footer/Footer.vue";
import Header from "./components/Header/Header.vue";
import NavMenu from "./components/NavMenu/NavMenu.vue";
export default {
  components:{
    Header,
    Footer,
    NavMenu,
  },
  
  mounted(){
    setTimeout(function(){
      document.getElementsByClassName("contentWapper")[0].style.minHeight=document.getElementById("leftNav").offsetHeight -20 +"px"
    },100)
  }
}
</script>
<style>
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
}
/* .ceshi{
  height: 150px;
} */
.test_left{
  overflow-y: auto;
  width: 260px;
  background: #2A2A2A;
  position: fixed;
  top: 100px;
  left: 0;
  bottom: 0;
  z-index: 9;
  overflow-x: hidden;
}
.test_left::-webkit-scrollbar { width: 0 !important }
.test_left { -ms-overflow-style: none; }
.test_left { overflow: -moz-scrollbars-none; }
.contentWapper{
  min-width: 1180px;
  margin: 10px 10px 10px 270px;
  min-height: 666px;
  height: auto;
  background: #fff;
  border-radius: 6px;

}
Footer{
  position: absolute;
  bottom: 0;
}
*{
  list-style: none;
}
i{
  font-style: normal;
}
</style>
