<template>
  <div id="C_content">
    <div class="C_title"><span class="Title_left"></span>区域监控
      <div class="AreaMonitoring_block">
        <span @click="GoMapSearch" class="GoMapSearch">进入地图</span>
        <span class="demonstration">当前区域：</span>
        <!-- <el-cascader
          :options="options1"
          @change="handleChange1"
          v-model="selected"
        ></el-cascader> -->
        <el-cascader
          ref="elcascaders"
          :options="options1"
          :props="{ checkStrictly: true }"
          @change="handleChange1"
          v-model="selected"
          filterable
        ></el-cascader>
      </div>
    </div>
    <div class="qyjk_top">
      <div class="qyjk_top2">
        <ul>
          <li v-for="(item,index) in tongjilist" :key="index">
            <span>{{ item.value }}</span>
            <p>{{ item.name }}</p>
            <i class="rightborder"></i>
          </li>
        </ul>
      </div>
    </div>
    <!-- 切换 -->
    <template>
      <div id="particulars">
        <div class="radio-wrap">
          <div class="radio-group">
            <ul>
              <li v-for="(tab ,index) in tabs"
                  :key="tab.index">
                <span
                  :class="{suibian1:iscur==index}"
                  class="span"
                  @click="iscur=index,tabChange('select' + (index + 1))"
                >{{tab.name}}</span>
              </li>
            </ul>
                <!-- <span
                  :class="{suibian1:iscur==index}"
                  v-for="(tab ,index) in tabs"
                  :key="tab.index"
                  class="span"
                  
                  @click="iscur=index,tabChange('select' + (index + 1))"
                >{{tab.name}}</span> -->
          </div>
          <!-- <keep-alive > -->
          <component v-if="show" v-bind:is="tabView"></component>
          <!-- </keep-alive> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
// import { regionDataPlus } from 'element-china-area-data'
// provinceAndCityData是省市二级联动数据（不带“全部”选项）
// regionData是省市区三级联动数据（不带“全部”选项）
// provinceAndCityDataPlus是省市区三级联动数据（带“全部”选项）
// regionDataPlus是省市区三级联动数据（带“全部”选项）
// "全部"选项绑定的value是空字符串""
// CodeToText是个大对象，属性是区域码，属性值是汉字 用法例如：CodeToText['110000']输出北京市
// TextToCode是个大对象，属性是汉字，属性值是区域码 用法例如：TextToCode['北京市'].code输出110000,TextToCode['北京市']['市辖区'].code输出110100,TextToCode['北京市']['市辖区']['朝阳区'].code输出110105
// import { regionData,CodeToText } from "element-china-area-data";
import select1 from "../../../components/Area_monitoring/Chanyefb.vue";
import select2 from "../../../components/Area_monitoring/Agu.vue";
import select3 from "../../../components/Area_monitoring/Sanban.vue";
// import select4 from "../../../components/Area_monitoring/Niguapai.vue";

import select4 from "../../../components/Area_monitoring/Siban.vue";
import select5 from "../../../components/Area_monitoring/Yisimu.vue";
// import select7 from "../../../components/Area_monitoring/Guoyou.vue";
import select6 from "../../../components/Area_monitoring/Gaoxin.vue";
// import select9 from "../../../components/Area_monitoring/Chenggong.vue";
import select7 from "../../../components/Area_monitoring/Huodejiangli.vue";
import select8 from "../../../components/Area_monitoring/Yongyouzz.vue";
import select9 from "../../../components/Area_monitoring/Biaozhunzd.vue";
import select10 from "../../../components/Area_monitoring/Waishangtz.vue";
// import select12 from "../../../components/Area_monitoring/Touzibendiqu.vue";
// import select15 from "../../../components/Area_monitoring/Dingzengrz.vue";
// import select16 from "../../../components/Area_monitoring/Xinwengg.vue";

export default {
  name: "particulars",
  data() {
    return {
      mainid: "",
      show: true,
      // loading:true,
      tabView: "select1",
      iscur: 0,
      tabs: [
        { name: "产业分布" },
        { name: "A股公司" },
        { name: "三板公司" },
        // { name: "拟挂牌上市公司" },
        { name: "四板公司" },
        { name: "已私募融资公司" },
        // { name: "国有企业" },
        { name: "高新技术企业" },
        // { name: "成功ＩＰＯ公司" },
        { name: "获得奖励企业" },
        { name: "拥有证照企业" },
        { name: "标准制定企业" },
        { name: "外商投资企业" }
        // { name: "投资本地区的机构" },
        // { name: "定增融资监控" },
        // { name: "新闻公告监控" },
      ],
      // sfvalue: '上海市',
      options: [],
      options1: [],
      tongjilist: [],
      // options1: regionDataPlus,
      // selectedOptions: ['310000'],
      city_sheng: '上海市',
      city_shi: '',
      city_qu: '',
      selected: '上海市'
    };
  },
  components: {
    select1,
    select2,
    select3,
    // select4,
    select4,
    select5,
    select6,
    select7,
    select8,
    select9,
    select10
    // select12,
    // select13,
    // select14,
    // select15,
    // select16,
  },
  mounted() {
    this.City()
    this.$store.state.suoshusf = this.city_sheng;
    this.$store.state.suoshucs = this.city_shi;
    this.$store.state.suoshuqx = this.city_qu;
    // console.log(this.selectedOptions[0], "selectedOptions");
    localStorage.setItem("suoshusf", this.city_sheng);
    localStorage.setItem("suoshucs", this.city_shi);
    localStorage.setItem("suoshuqx", this.city_qu);
    // this.shengfen()
    this.xinxi();
  },
  watch: {
    // city_shi() {
    //   if (this.$refs.refHandle) { 
    //     this.$refs.refHandle.dropDownVisible = false; 
    //   } 
    // },
    // city_qu() {
    //   if (this.$refs.refHandle) { 
    //     this.$refs.refHandle.dropDownVisible = false; 
    //   } 
    // },
  },
  methods: {
    City() {
      this.axios({
        url: this.api.LXshengshiquapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data,"res")
          this.options1 = res.data.data
          // console.log(this.options1,"options1")
          // this.options1.splice(33,1) //删除香港
          // this.options1.splice(30,1) //删除钓鱼岛
          // this.options1.splice(23,1) //删除澳门
          // this.options1.splice(4,1) //删除台湾
          // console.log(this.options1)
      })
    },
    tabChange: function(tab) {
      this.tabView = tab;
    },
    // shengfen() {
    //   this.axios({
    //     url: this.api.AreaMonitoring,
    //     method: 'get',
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   }).then(res => {
    //     this.options = res.data.data.suoshusf
    //   })
    // },
    xinxi() {
      var self = this
      let params = {
        suoshusf: this.city_sheng,
        suoshucs: this.city_shi,
        suoshuqx: this.city_qu,
      };
      this.axios({
        url: this.api.Areatongji,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.tongjilist = res.data.data;
      });
    },
    // shengfvalue(val) {
      // this.$store.state.loading = this.loading
      // this.$store.state.suoshusf = this.sfvalue;
      // localStorage.setItem("suoshusf", this.sfvalue);
      // var self = this;
      // self.xinxi();
      // self.show = false;
      // setTimeout(function() {
        //   self.show = true;
      // }, 100);
    // },
    handleChange1(value) {
      var self = this;
      // this.$refs.elcascaders.dropDownVisible = false
      // localStorage.setItem("AreaMonitoringSelected",self.selected)
      if(self.selected == '上海市'){
        this.city_sheng = '上海市'
        this.city_shi = ''
        this.city_qu = ''
      } else {
        // console.log(value[0],"1")
        // console.log(value[1],"2")
        // console.log(value[2],"3")
        this.city_sheng = value[0]
        this.city_shi = value[1]
        this.city_qu = value[2]
      }
      this.$store.state.loading = this.loading
      this.$store.state.suoshusf = this.city_sheng;
      this.$store.state.suoshucs = this.city_shi;
      this.$store.state.suoshuqx = this.city_qu;
      // this.$store.commit("suoshusf",this.city_sheng)
      localStorage.setItem("suoshusf", this.city_sheng);
      localStorage.setItem("suoshucs", this.city_shi);
      localStorage.setItem("suoshuqx", this.city_qu);
      self.xinxi();

      self.show = false;
      setTimeout(function() {
        self.show = true;
      }, 100);
    },
    GoMapSearch() {
      var self = this
      console.log(JSON.stringify(self.selected),"selected")
      var quyucity = JSON.stringify(self.selected)
      self.$router.push({
        path: '/mapSearch',
        query: {quyuCity: quyucity},
      })
    },
  }
};
</script>

<style lang="scss">
@import "../../../styles/Monitor/region/css/AreaMonitoring.scss";
#particulars .radio-wrap .radio-group .suibian1 {
  color: #fff !important;
  background: #CF111B;
  border-radius:4px;
}
.el-loading-spinner{
  top: 10%;
}
</style>