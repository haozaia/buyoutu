import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/css/iconfont.css'
import echarts from 'echarts'
import axios from 'axios';
import qs from 'qs'
import globalAPI from './util/gobalAPI'
import VueJsonp from 'vue-jsonp'
import tools from './assets/js/common'
import global_ from './assets/js/global'
let Base64 = require('js-base64').Base64;

Vue.prototype.api = globalAPI
Vue.prototype.axios = axios;
Vue.prototype.Base64 = Base64;
Vue.config.silent = true
Vue.prototype.axios.interceptors.response.use(data => {
  return data;
});

Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
Vue.prototype.$qs = qs
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
Vue.use(VueJsonp)
Vue.use(ElementUI);
Vue.use(tools);

Vue.prototype.axios.interceptors.request.use(config => {

  let token = localStorage.getItem('token')
  let unitCode = localStorage.getItem('unitCode')
  if (token) {
    config.headers.common['token'] = localStorage.getItem('token');
  }
  // if (unitCode) {
  //   config.headers.common['unitCode'] = localStorage.getItem('unitCode');
  // }
  return config
})
// 发起请求后
let dialogFlag=true
Vue.prototype.axios.interceptors.response.use(
  res => {
    const status = res.data.code;
    // console.log(status)
    // console.log(status == "E000011")
    if (status == "E000011") {
      // let token = localStorage.getItem('token')
      // console.log(dialogFlag)
      if (dialogFlag) {
        dialogFlag=false
        localStorage.clear();  //token
        Vue.prototype.$alert('当前用户已登出', '提示', {
          confirmButtonText: '确定',
          showClose: false,
          callback: action => {
            router.push('/')
            dialogFlag=true
          }
        });
      }
    }
    return res;
  },
  error => {

    return Promise.reject(error);
  }
);
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
