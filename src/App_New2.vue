<template>
<div>
  <div id="app">
    <Header v-if="$route.name !== 'login'" />
    <router-view />
    <Footer v-if="$route.name !== 'changepassword' && $route.name !== 'login' && $route.name !== 'changePassword_c'" />
  </div>
</div>
</template>

<script>
import Footer from "./components/Footer/Footer.vue";
import Header from "./components/Header/Header.vue";
export default {
  components:{
    Header,
    Footer,
  }
}
</script>
<style>
body{
  margin: 0;
  padding: 0;
}
*{
  list-style: none;
}
i{
  font-style: normal;
}
</style>
