import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name:"",
    suoshusf: "",
    suoshucs: "",
    suoshuqx: "",
    X: "",
    City: "",
    Ctry: "",
    Country: false,
    NavMenu:'home',
    // loading: true,
  },
  mutations: {},
  actions: {}
});
