<template>
  <div id="Park">
    <div id="C_content">
      <div class="C_title"><span class="Title_left"></span>产业园区<span> - <i>{{this.NowPark}}</i> 共为您查询到<i id="Tag">{{ this.total }}</i></span>个</div>
      <!-- <div class="C_title"><span class="Title_left"></span>产业园区</div> -->
      <div class="park-content">
        <!-- <div class="ind-title">
          <p >
            <i class="icon icon-tips"></i>
            <span>产业园区列表</span> 
            已为您查询到产业园区
            <span id="Tag">{{ this.total }}</span> 个
          </p>
        </div> -->
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
              ></el-cascader>
            </div>
            <div class="form-group Search_Down_input">
              <el-select v-model="paiming" class="park_teInput Search_Down_input" placeholder="请选择园区级别">
                <el-option
                  v-for="item in paimingOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.lable"
                  @change="yuanquLv"
                ></el-option>
              </el-select>
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
            <el-input class="fontSize20 Ml30 Search_Entry_Div Search_Entry_input" v-model="gongsiname" clearable placeholder="请输入园区名称"></el-input>
            <!-- <div class="form-group">
              <button
                class="btn btn-query btn-action"
                @click="searchlist(1, 20)"
                type="button"
                role="button">
                <span class="chaxun">查询</span>
                <i class="icon-loading icon-loading-white a-spin"></i>
              </button>
            </div> -->
            <el-button @click="searchlist(1, 20)" type="primary">查询</el-button>
            <el-button @click="Czhi" type="primary">重置</el-button>
          </form>
        </div>
        <div class="el-tabs">
          <div class="query-result">
            <template>
              <div class="table-wrapper">
              <el-table  :empty-text="tishi" stripe :data="tableData" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="园区名称" width="380" align="left">
                  <template slot-scope="scope">
                    <router-link
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/Parkdetails', query: { yuanquname: Base64.encode(scope.row.name),park:scope.row.parkId,location: Base64.encode(scope.row.location)}}"
                    >{{ scope.row.name }}</router-link>
                    </template>
                    <!-- city_sheng: Base64.encode(this.city_sheng),paiming: Base64.encode(this.paiming),gongsiname: Base64.encode(this.gongsiname),city_shi: Base64.encode(this.city_shi),city_qu: Base64.encode(this.city_qu) -->
                </el-table-column>
                <el-table-column prop="province" label="省份" align="center"></el-table-column>
                <el-table-column prop="city" label="城市" align="center"></el-table-column>
                <el-table-column prop="area" label="区" align="center">
                  <template slot-scope="{row}">
                    {{ row.area || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="entCount" label="企业家数" align="center">
                  <template slot-scope="{row}">
                    {{ row.entCount || '-' }}
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
    </div>
  </div>
</template>

<script>
import AMap from "AMap";
import { provinceAndCityDataPlus,CodeToText } from "element-china-area-data";
export default {
  data(){
    return{
      city_sheng: '',
      city_shi: '',
      city_qu: '',
      gongsiname: '',
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
        value: '国家级',
        lable: '6',
      },{
        value: '省级',
        lable: '4',
      }],
      paiming:'T',
      park_ssq: '',
      options1: [],
      selected: "",
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
      if(localStorage.getItem('YuanQuname') != null){
        self.gongsiname = localStorage.getItem('YuanQuname')
        localStorage.removeItem('YuanQuname')
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
      // console.log(self.page);
      self.yuanqulist(val, 20);
    },
    handleChange1(value) {
      // console.log(value)
      this.city_sheng = value[0]
      this.city_shi = value[1]
      this.city_qu = value[2]
      // console.log(this.selectedOptions)
      localStorage.setItem('ParkCity',this.selected)
      
      // localStorage.setItem('ParkShi',this.city_shi)
      // localStorage.setItem('ParkQu',this.city_qu)
      // console.log(this.city_sheng)
      // console.log(this.city_shi)
      // console.log(this.city_qu)
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
        parkLevel: this.paiming
      }
      this.axios({
        url: this.api.yuanqu,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res =>{
        // console.log(res)
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
        if(self.paiming == "6"){
          self.NowPark = "国家级园区"
        }else if(self.paiming == "4"){
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
      this.yuanqulist()
    },
    yuanquLv() {

    },
    Czhi() {
      this.selectedOptions = ''
      this.paiming = ''
      this.gongsiname = ''
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
}
</style>