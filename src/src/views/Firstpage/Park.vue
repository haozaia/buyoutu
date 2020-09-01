<template>
  <div id="Park">
    <div id="C_content">
      <!-- <div class="C_title"><span class="Title_left"></span><span><i>{{this.NowPark}}</i> 共<i id="Tag">{{ this.total }}</i></span>个</div> -->
      <div class="C_title">
        <span class="Title_left"></span>
        <span><i>{{this.NowPark}}</i> 共<i id="Tag">{{ this.total }}</i></span>个
        <span class="GoParkMap" @click="GoParkMap">进入地图版</span>
        <!-- <span v-show="AllParkShow == false" class="GoParkMap" @click="GoParkMap">进入地图版</span>
        <span v-show="AllParkShow == true" class="GoParkMap" @click="GoParkEl">返回园区列表</span>
        <div v-show="AllParkShow == true" class="form-group Search_Down_input Te_form-group Map_Form">
          <el-select v-model="Park_paiming" @change="ParkyuanquLv" class="park_teInput Search_Down_input" placeholder="请选择园区级别">
            <el-option
              v-for="item in Park_paimingOptions"
              :key="item.value"
              :label="item.value"
              :value="item.lable"
              :props="{ checkStrictly: true }"
            ></el-option>
          </el-select>
        </div> -->
      </div>
      <!-- <div class="C_title"><span class="Title_left"></span>产业园区<span> - <i>{{this.NowPark}}</i> 共为您查询到<i id="Tag">{{ this.total }}</i></span>个</div> -->
      <!-- <div class="C_title"><span class="Title_left"></span>产业园区</div> -->
      <!-- <div v-show="this.AllParkShow == false" class="park-content"> -->
      <div class="park-content">
        <div class="form-wrapper">
          <form class="form-inline" role="form">
            <div class="form-group Search_Down_input">
              <el-cascader
                clearable
                placeholder="请选择地区"
                ref="refHandle"
                :options="options1"
                :props="{ checkStrictly: true }"
                @change="handleChange1"
                v-model="selected"
                filterable
              ></el-cascader>

            </div>
            <div class="form-group Search_Down_input Te_form-group">
              <el-select v-model="paiming" class="park_teInput Search_Down_input" placeholder="请选择园区级别">
                <el-option
                  v-for="item in paimingOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.lable"
                  :props="{ checkStrictly: true }"
                ></el-option>
              </el-select>
              <!-- <el-cascader
                ref="refHandle"
                style="width:200px;"
                v-model="city_search"
                :options="city_data"
                :props="{ checkStrictly: true }"
                @change="handleChange"
                clearable
                filterable
              ></el-cascader> -->
            </div>
            <!-- <div class="form-group">
              <div class="ui-input ui-input-search">
                <i class="el-icon-search"></i>
                <input
                  class="key"
                  v-model="gongsiname"
                  placeholder="请输入园区名称"
                  type="text"
                  autocomplete="off"
                />
              </div>
            </div> -->
            <el-input class="fontSize20 Ml30 Search_Entry_Div Searchinput240" v-model="gongsiname" clearable placeholder="请输入园区名称"></el-input>
            <el-input class="fontSize20 Ml30 Search_Entry_Div Searchinput240" v-model="zhudaocy" clearable placeholder="请输入主导产业"></el-input>
            <el-button @click="searchlist(1, 20)" type="primary">查询</el-button>
            <el-button @click="Czhi" type="primary">重置</el-button>
          </form>
        </div>
        <div class="el-tabs">
          <div class="query-result">
            <template>
              <div class="table-wrapper">
              <el-table  :empty-text="tishi" stripe :data="tableData" v-loading="loading" style="width: 100%">
                <el-table-column prop="yuanqumc" label="园区名称" width="380" align="left">
                  <template slot-scope="scope">
                    <router-link
                    @click.native="partpart"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/Parkdetails', query: { yuanquname: Base64.encode(scope.row.yuanqumc),Park_Id: Base64.encode(scope.row.parkId),location: Base64.encode(scope.row.location),mianji: Base64.encode(scope.row.mianji),zhudaocy: Base64.encode(scope.row.zhudaocy)}}"
                    >{{ scope.row.yuanqumc }}</router-link>
                    </template>
                    <!-- city_sheng: Base64.encode(this.city_sheng),paiming: Base64.encode(this.paiming),gongsiname: Base64.encode(this.gongsiname),city_shi: Base64.encode(this.city_shi),city_qu: Base64.encode(this.city_qu) -->
                </el-table-column>
                <el-table-column prop="suoshusf" label="省份" align="center"></el-table-column>
                <el-table-column prop="suoshucs" label="城市" align="center">
                  <template slot-scope="{row}">
                    {{ row.suoshucs || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="suoshuqx" label="区/县" align="center">
                  <template slot-scope="{row}">
                    {{ row.suoshuqx || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="yuanqufl" label="级别" align="center">
                  <template slot-scope="{row}">
                    {{ row.yuanqufl || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="pizhunclsj" label="批准时间" align="center">
                  <template slot-scope="{row}">
                    {{ row.pizhunclsj || '-' }}
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="space" label="占地面积（亩）" align="center"></el-table-column> -->
              </el-table>
              </div>
            </template>
          </div>
          <!-- 分页dom start -->
            <div id="Pagination" v-show="total > 20">
              <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
              <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
            </div>
          <!-- 分页dom end -->
        </div>
      </div>
      <div v-if="AllParkShow" id="AllParkMaps">
        
      </div>
    </div>
  </div>
</template>

<script>
// import AMap from "AMap";
import { provinceAndCityDataPlus,CodeToText } from "element-china-area-data";
export default {
  data(){
    return{
      AllParkShow: false,
      city_sheng: '',
      city_shi: '',
      city_qu: '',
      gongsiname: '',
      zhudaocy: '',
      options: provinceAndCityDataPlus,
      // selectedOptions: [],
      tableData: [],
      loading:true,
      total: 0,
      page:1,
      tishi: "正在查询...",
      suibian:true,    //分页变量3
      NowPark: "国家级、省级园区",
      paimingOptions: [{
        value: '全部园区',
        lable: 'T',
      },{
        value: '国家级经济技术开发区',
        lable: '9',
      },{
        value: '国家级高新技术产业开发区',
        lable: '8',
      },{
        value: '国家级海关特殊监管区域',
        lable: '7',
      },{
        value: '国家级边境/跨境经济合作区',
        lable: '6',
      },{
        value: '省级开发区',
        lable: '4',
      }],
      // Park_paimingOptions: [{
      //   value: '国家级经济技术开发区',
      //   lable: '9',
      // },{
      //   value: '国家级高新技术产业开发区',
      //   lable: '8',
      // },{
      //   value: '国家级海关特殊监管区域',
      //   lable: '7',
      // },{
      //   value: '国家级边境/跨境经济合作区',
      //   lable: '6',
      // }],
      paiming:'T',
      // Park_paiming: "9",
      park_ssq: '',
      options1: [],
      selected: "",
      // Mapinfo_data: [], //标记点
    }
  },
  mounted() {
    this.ParkSearchXx()
    this.yuanqulist()
    this.City()
    
  },
  watch:{
    page(val) {
    var self=this
      if(val == 1){
          self.suibian=true
      }
    },
    city_sheng() {
      if (this.$refs.refHandle) { 
        this.$refs.refHandle.dropDownVisible = false; 
      } 
    },
    city_shi() {
      if (this.$refs.refHandle) { 
        this.$refs.refHandle.dropDownVisible = false; 
      } 
    },
    city_qu() {
      if (this.$refs.refHandle) { 
        this.$refs.refHandle.dropDownVisible = false; 
      } 
    },
    Mapinfo_data() {}
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
          this.options1 = res.data.data
      })
    },
    // 分页--回到首页按钮  start
    ParkSearchXx() {
      var self = this
      self.park_ssq = localStorage.getItem('ParkCity')
      if(self.park_ssq == null){
      }else{
          this.selected = self.park_ssq.split(",")
          this.handleChange1(this.selected)
          localStorage.removeItem('ParkCity')
      }
      if(localStorage.getItem('Parkgongsiname') != null){
        self.gongsiname = localStorage.getItem('Parkgongsiname')
        localStorage.removeItem('Parkgongsiname')
      }
      if(localStorage.getItem('ParkzdcySarch') != null){
        self.zhudaocy = localStorage.getItem('ParkzdcySarch')
        localStorage.removeItem('ParkzdcySarch')
      }
      if(localStorage.getItem('Parkpaiming') != null){
        self.paiming = localStorage.getItem('Parkpaiming')
        localStorage.removeItem('Parkpaiming')
      }
      if(localStorage.getItem('YuanQuname') != null){
        self.gongsiname = localStorage.getItem('YuanQuname')
        localStorage.removeItem('YuanQuname')
      }
      if(localStorage.getItem('zdcySearch') != null){
        self.zhudaocy = localStorage.getItem('zdcySearch')
        localStorage.removeItem('zdcySearch')
      }
      if(localStorage.getItem('YuanQulv') != null){
        self.paiming = localStorage.getItem('YuanQulv')
        localStorage.removeItem('YuanQulv')
      }
      // console.log(self.park_ssq,"拿到localstorage内的值")
      // console.log(self.park_ssq.indexOf(","))
    },
        paginationsy() {
            if(this.page === 1) {
            }else{
                // this.page = 1
                this.handleCurrentChange(1)
            }
        },
        // 分页--回到首页按钮  end
        handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;

       //分页--判断当前页是否为最后一页，禁用右按钮  start
        var cot =  Math.ceil(self.total/20)
        self.suibian=false  //是否禁用首页按钮
        //分页--判断当前页是否为最后一页，禁用右按钮  end
      self.yuanqulist(val, 20);
    },
    handleChange1(value) {
      this.city_sheng = value[0]
      this.city_shi = value[1]
      this.city_qu = value[2]
    },












    // 进入地图
    GoParkMap() {
      var self = this
      self.$router.push({
        path: "/ParkTotalMap",
      })
      self.AllParkShow = true;
      let params={
        yuanqujb : self.Park_paiming
      }
      this.axios({
        url: this.api.Park_AllBiao,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data,"Park_AllBiao")
        self.Mapinfo_data = res.data.data
        this.ShowMap()
      })
    },
    // 地图版
    ShowMap() {
      var self = this
      document.getElementById("AllParkMaps").style.minHeight =
      document.getElementById("leftNav").offsetHeight - 102 + "px";
      // 百度地图API功能
      var map = new BMap.Map("AllParkMaps",{enableMapClick:false});    // 创建Map实例+禁用景点详情
      var point = new BMap.Point(116.404, 39.915)
      map.centerAndZoom(point, 5);  // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

      // 多个标注 start
      var data_info = self.Mapinfo_data;
      var opts = {
        width: 300, // 信息窗口宽度
        // height: 80, // 信息窗口高度
        BackgroundColor: "#000",
        // title : "公司名称：" , // 信息窗口标题
        offset: { height: -12, width: -6 },
        enableMessage: true //设置允许信息窗发送短息
      };
      for (var i = 0; i < data_info.length; i++) {
        var data_info_location = data_info[i].location.split(",")
        var marker = new BMap.Marker(new BMap.Point(data_info_location[0],data_info_location[1]));  // 创建标注
        // console.log(data_info[i].chenglisj,"zhucedz")
          var content = `<a style="cursor:pointer;color:#cf111b;width:100%;font-weight:600;margin-bottom:6px;display:inline-block;" class="GoDetails">${
            data_info[i].yuanqumc            
          }<span class="Park_yuanqumc" style="display:none;">${ data_info[i].yuanqumc}</span><span class="Park_location" style="display:none;">${ data_info[i].location}</span><span class="Park_mianji" style="display:none;">${ data_info[i].mianji}</span><span class="Park_zhudaocy" style="display:none;">${ data_info[i].zhudaocy}</span><span class="Park_Id" style="display:none;">${ data_info[i].parkId}</span></a>${
            data_info[i].mianji
              ? "</br><a>园区面积：" + data_info[i].mianji + " (公顷)"
              : ""
          }</a>${
            data_info[i].zhudaocy
              ? "</br><a>主导产业：" + data_info[i].zhudaocy
              : ""
          }</a>`;
        // console.log(self.messageName,"messageName")
        map.addOverlay(marker); // 将标注添加到地图中
        addClickHandler(content, marker);
      }

      function addClickHandler(content, marker) {
        marker.addEventListener("click", function(e) {
          openInfo(content, e);
        });
      }
      function openInfo(content, e) {
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, point); //开启信息窗口
        // console.log(content,"content")
        setTimeout(() => {
          // console.log(document.querySelector(".GoDetails"),"sss")
          var GoDetails = document.querySelector(".GoDetails");
          GoDetails.addEventListener("click", function(e) {
            var Park_yuanqumc = GoDetails.getElementsByClassName("Park_yuanqumc")[0].innerHTML
            var Park_location = GoDetails.getElementsByClassName("Park_location")[0].innerHTML
            var Park_mianji = GoDetails.getElementsByClassName("Park_mianji")[0].innerHTML
            var Park_zhudaocy = GoDetails.getElementsByClassName("Park_zhudaocy")[0].innerHTML
            var Park_Id = GoDetails.getElementsByClassName("Park_Id")[0].innerHTML
            // console.log(Park_yuanqumc)
            // console.log(Park_location)
            // console.log(Park_mianji)
            // console.log(Park_zhudaocy)
            // console.log(Park_Id)
            self.$router.push({
              path: '/Parkdetails',
              query: { yuanquname: Base64.encode(Park_yuanqumc),location: Base64.encode(Park_location),mianji: Base64.encode(Park_mianji),zhudaocy: Base64.encode(Park_zhudaocy),Park_Id: Base64.encode(Park_Id)}
            })
            // let routeUrl = self.$router.resolve({
            //   path: "/Parkdetails",
            //   query: { name: Base64.encode(e.path[0].childNodes[0].data) }
            // });
            // window.open(routeUrl.href, "_blank");
            
          });
        });
      }
    },
    // // 进入地图
    // GoParkMap() {
    //   // debugger
    //   var self = this
    //   self.AllParkShow = true;
    //   console.log(self.Park_paiming)
    //   let params={
    //     yuanqujb : self.Park_paiming
    //   }
    //   this.axios({
    //     url: this.api.Park_AllBiao,
    //     method: "post",
    //     data: this.$qs.stringify(params),
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   }).then(res => {
    //     console.log(res.data.data,"Park_AllBiao")
    //     self.Mapinfo_data = res.data.data
    //     this.ShowMap()
    //   })
    // },
    // // 地图版
    // ShowMap() {
    //   var self = this
    //   document.getElementById("AllParkMaps").style.minHeight =
    //   document.getElementById("leftNav").offsetHeight - 102 + "px";
    //   // 百度地图API功能
    //   var map = new BMap.Map("AllParkMaps",{enableMapClick:false});    // 创建Map实例+禁用景点详情
    //   var point = new BMap.Point(116.404, 39.915)
    //   map.centerAndZoom(point, 5);  // 初始化地图,设置中心点坐标和地图级别
    //   map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    //   // 多个标注 start
    //   var data_info = self.Mapinfo_data;
    //   var opts = {
    //     width: 300, // 信息窗口宽度
    //     // height: 80, // 信息窗口高度
    //     BackgroundColor: "#000",
    //     // title : "公司名称：" , // 信息窗口标题
    //     offset: { height: -12, width: -6 },
    //     enableMessage: true //设置允许信息窗发送短息
    //   };
    //   for (var i = 0; i < data_info.length; i++) {
    //     var data_info_location = data_info[i].location.split(",")
    //     var marker = new BMap.Marker(new BMap.Point(data_info_location[0],data_info_location[1]));  // 创建标注
    //     // console.log(data_info[i].chenglisj,"zhucedz")
    //       var content = `<a style="cursor:pointer;color:#cf111b;width:100%;font-weight:600;margin-bottom:6px;display:inline-block;" class="GoDetails">${
    //         data_info[i].yuanqumc            
    //       }<span class="Park_yuanqumc" style="display:none;">${ data_info[i].yuanqumc}</span><span class="Park_location" style="display:none;">${ data_info[i].location}</span><span class="Park_mianji" style="display:none;">${ data_info[i].mianji}</span><span class="Park_zhudaocy" style="display:none;">${ data_info[i].zhudaocy}</span><span class="Park_Id" style="display:none;">${ data_info[i].parkId}</span></a>${
    //         data_info[i].mianji
    //           ? "</br><a>园区面积：" + data_info[i].mianji + " (公顷)"
    //           : ""
    //       }</a>${
    //         data_info[i].zhudaocy
    //           ? "</br><a>主导产业：" + data_info[i].zhudaocy
    //           : ""
    //       }</a>`;
    //     // console.log(self.messageName,"messageName")
    //     map.addOverlay(marker); // 将标注添加到地图中
    //     addClickHandler(content, marker);
    //   }

    //   function addClickHandler(content, marker) {
    //     marker.addEventListener("click", function(e) {
    //       openInfo(content, e);
    //     });
    //   }
    //   function openInfo(content, e) {
    //     var p = e.target;
    //     var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    //     var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
    //     map.openInfoWindow(infoWindow, point); //开启信息窗口
    //     // console.log(content,"content")
    //     setTimeout(() => {
    //       // console.log(document.querySelector(".GoDetails"),"sss")
    //       var GoDetails = document.querySelector(".GoDetails");
    //       GoDetails.addEventListener("click", function(e) {
    //         var Park_yuanqumc = GoDetails.getElementsByClassName("Park_yuanqumc")[0].innerHTML
    //         var Park_location = GoDetails.getElementsByClassName("Park_location")[0].innerHTML
    //         var Park_mianji = GoDetails.getElementsByClassName("Park_mianji")[0].innerHTML
    //         var Park_zhudaocy = GoDetails.getElementsByClassName("Park_zhudaocy")[0].innerHTML
    //         var Park_Id = GoDetails.getElementsByClassName("Park_Id")[0].innerHTML
    //         console.log(Park_yuanqumc)
    //         console.log(Park_location)
    //         console.log(Park_mianji)
    //         console.log(Park_zhudaocy)
    //         console.log(Park_Id)
    //         self.$router.push({
    //           path: '/Parkdetails',
    //           query: { yuanquname: Base64.encode(Park_yuanqumc),location: Base64.encode(Park_location),mianji: Base64.encode(Park_mianji),zhudaocy: Base64.encode(Park_zhudaocy),Park_Id: Base64.encode(Park_Id)}
    //         })
    //         // let routeUrl = self.$router.resolve({
    //         //   path: "/Parkdetails",
    //         //   query: { name: Base64.encode(e.path[0].childNodes[0].data) }
    //         // });
    //         // window.open(routeUrl.href, "_blank");
            
    //       });
    //     });
    //   }
    // },
    //进入表格
    GoParkEl() {
      var self = this
      self.AllParkShow = false;
    },













    partpart() {
      if(this.selected != ''){
        localStorage.setItem('ParkCity',this.selected)
      }else{
        localStorage.removeItem('ParkCity')
      }
      if(this.paiming != ''){
        localStorage.setItem('Parkpaiming',this.paiming)
      }else{
        localStorage.removeItem('Parkpaiming')
      }
      if(this.gongsiname != ''){
        localStorage.setItem('Parkgongsiname',this.gongsiname)
      }else{
        localStorage.removeItem('Parkgongsiname')
      }
      if(this.zhudaocy != ''){
        localStorage.setItem('ParkzdcySarch',this.zhudaocy)
      }else{
        localStorage.removeItem('zdcySearch')
      }
    },
    yuanqulist() {
      var self = this
      self.loading = true;
      if(self.city_sheng === '全部'){
        self.city_sheng = ''
      }else if(self.city_shi === '全部'){
        self.city_shi = ''
      }
      if(self.paiming == "T"){
        self.paiming = ""
      }
      let params = {
        page: self.page,
        limit: 20,
        province:this.city_sheng,
        city:this.city_shi,
        area:this.city_qu,
        name:this.gongsiname,
        parkLevel: this.paiming,
        zhudaocy: this.zhudaocy
      }
      this.axios({
        url: this.api.yuanqu,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res =>{
        self.loading = false;
        var right = document.getElementsByClassName('btn-next')
        right[0].disabled=''
        self.tableData = res.data.data;
        if(res.data.count == 0) {
          self.tishi = "暂无数据"
        }
        self.total = res.data.count;
        // 分页--下一页disabled
        var cot =  Math.ceil(self.total/20)
        if(cot <= self.page){
            right[0].disabled="disabled"
        }
        if(self.page==1){
            self.suibian=true
        }
        // 分页--下一页disabled
        if(self.paiming == "9"){
          self.NowPark = "国家级经济技术开发区"
        }else if(self.paiming == "8"){
          self.NowPark = "国家级高新技术产业开发区"
        }else if(self.paiming == "7") {
          self.NowPark = "国家级海关特殊监管区域"
        }else if(self.paiming == "6") {
          self.NowPark = "国家级边境/跨境经济合作区"
        }else if(self.paiming == "4") {
          self.NowPark = "省级园区"
        }else if(self.paiming == "T" || self.paiming == ""){
          self.NowPark = "国家级、省级园区"
        }
      })
    },
    searchlist() {
      var self = this;
      self.page = 1;
      if(self.paiming != ''){
        localStorage.setItem('YuanQulv',self.paiming)
      }
      if(self.gongsiname != '') {
        localStorage.setItem('YuanQuname',self.gongsiname)
      }
      if(self.zhudaocy != '') {
        localStorage.setItem('zdcySearch',self.zhudaocy)
      }
      this.yuanqulist()
    },
    ParkyuanquLv() {
      // console.log("124")
      var self = this
      self.GoParkMap()
    },
    Czhi() {
      this.selectedOptions = ''
      this.paiming = ''
      this.gongsiname = ''
      this.zhudaocy = ''
    },
  }
};
</script>

<style lang="scss">
@import "../../styles/css/Park.scss";

.el-tabs{
  margin: 0 !important;
}
#Park{
  .el-table__row>td:first-child{
    text-align: left !important;
  }
  .GoParkMap{
    cursor: pointer;
    font-weight: 600;
    color: #cf111b;
    margin-left: 5px;
    font-size: 20px;
  }
  .Searchinput240{
    width: 240px;
  }
  // 地图
  // #AllParkMaps{
    // min-height: 600px;
  // }
  .Te_form-group{
    .el-input__inner{
      width: 215px;
      overflow : hidden;
      text-overflow : ellipsis;
      white-space : nowrap;
    }
    .el-select__caret{
      padding-left: 2px;
    }
  }
  .Map_Form{
    display: inline-block;
    margin-left: 20px;
    .el-input__suffix{
      right: 26px;
    }
  }

  // 地图信息窗口
  .BMap_bubble_title {
    color: white;
    font-size: 13px;
    font-weight: bold;
    text-align: left;
    padding-left: 5px;
    padding-top: 5px;
    border-bottom: 1px solid gray;
    background-color: #0066b3;
  }
  /* 消息内容 */
  .BMap_bubble_content {
    background-color: #fffdf5;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 10px;
  }
  /* 内容 */
  .BMap_pop div:nth-child(9) {
    top: 35px !important;
    border-radius: 7px;
  }
  .BMap_top {
    display: none;
  }
  .BMap_bottom {
    display: none;
  }
  .BMap_center {
    display: none;
  }
  // /* 隐藏边角 */
  .BMap_pop div:nth-child(1) div {
    display: none;
  }
  .BMap_pop div:nth-child(3) {
    display: none;
  }
  .BMap_pop div:nth-child(5) {
    display: none;
  }
  .BMap_pop div:nth-child(7) {
    display: none;
  }
  .BMap_shadow div:nth-child(7) {
    display: none;
  }
}
</style>