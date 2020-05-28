<template>
<div id="Techindustry">
  <div id="C_content">
    <div class="C_container">
      <div class="C_title"> <span class="Title_left"></span>高新技术企业</div>
      <div class="el-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="高新技术企业列表" name="first">
            <div class="ind-title fontSize20">
              <p >
                <i class="icon icon-tips"></i>
                <span>高新技术企业列表</span> 高新技术企业共
                <span id="Tag">{{ this.total }}</span> 家
              </p>
            </div>
            
            <div class="form-wrapper">
              <form class="form-inline" role="form">
                <div class="form-group">
                  <span class="control-label">年份 ：</span>
                  <el-select v-model="year" placeholder="请选择年份">
                    <el-option label="选择所有" value></el-option>
                    <el-option
                      v-for="item in years"
                      :key="item.huogxrzdnf"
                      :label="item.huogxrzdnf"
                      :value="item.huogxrzdnf"
                    ></el-option>
                  </el-select>
                </div>

                <div class="form-group">
                  <span class="control-label">地域 ：</span>
                  <el-select v-model="suoshusf" placeholder="请选择省份">
                    <el-option label="选择所有" value></el-option>
                    <el-option
                      v-for="item in options"
                      :key="item.suoshusf"
                      :label="item.suoshusf"
                      :value="item.suoshusf"
                    ></el-option>
                  </el-select>
                </div>
                <div class="form-group">
                  <div class="ui-input ui-input-search PuKey">
                    <input
                      class="key"
                      v-model="name"
                      placeholder="请输入企业关键字"
                      type="text"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <el-button @click="Gongxinjsqy(1, 20)" type="primary">查询</el-button>
                </div>
              </form>
            </div>
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData" v-loading="loading" style="width: 100%">
                  <el-table-column prop="gongsiname" label="企业名称" width="400" align="left">
                    <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname)}}"
                      >{{ scope.row.gongsiname }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="suoshusf" label="所属省份" ></el-table-column>
                  <el-table-column prop="beizhu1" label="法定代表人"></el-table-column>
                  <el-table-column prop="zhuczb" label="注册资本(万元)">
                     <template slot-scope="{row}">{{ row.zhuczb || '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="huogxrzdnf" label="获高新认证的年份"></el-table-column>
                </el-table>
              </div>
            </div>
             <!-- 分页dom start -->
                    <div id="Pagination" v-loading="loading">
                        <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
                        <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
                    </div>
              <!-- 分页dom end -->
          </el-tab-pane>
          <el-tab-pane label="高新技术企业分布" name="second">
            <div class="form-group profileList">
              <span class="control-label">年份 ：</span>
              <el-select v-model="value3" placeholder="请选择年份" @change="selectYear()">
                <el-option label="选择所有" value></el-option>
                <el-option
                  v-for="item in years"
                  :key="item.huogxrzdnf"
                  :label="item.huogxrzdnf"
                  :value="item.huogxrzdnf"
                ></el-option>
              </el-select>
            </div>
            <!-- echarts -->
            <div id="myProfile" style="width:90%;height:500px;margin:0 auto;"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import "echarts/theme/macarons.js";
import "../../styles/js/Firstpage/Techindustry";
import Axios from "axios";
// let Base64 = require('js-base64').Base64;
export default {
  data() {
    return {
      total: 0,
      page:1,
      year: "",
      suoshusf: "",
      value3: "",
      name: "",
      activeName: "first",
      options: [],
      years: [],
      tableData: [],
      ProfileData: [],
      echartsList: [],
      loading: true,
      suibian:true    //分页变量3
    };
  },
  mounted() {
    var self = this;
    self.Gongxinjsqy(1, 20);
    self.dateapi();
    self.shengfenapi();
  },
  //监测页数变化start
  watch:{
    page(val) {
      var self=this
            if(val == 1){
                self.suibian=true
            }
        }
  },
  //end
  created() {},
  methods: {
    selectYear(selVal) {
      // console.log(this.value3)
      this.fenbuapi();
    },
    // 分页--回到首页按钮  start
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
      self.page = val;
            self.suibian=false  //是否禁用首页按钮
      // console.log(self.page);
      self.Gongxinjsqy(val, 20);
    },
    //获取公司列表
    Gongxinjsqy(page, limit) {
      var self = this;
       self.loading = true;
      var right = document.getElementsByClassName('btn-next')
        right[0].disabled=""
      let params = {
        page: page,
        limit: limit,
        suoshusf: self.suoshusf,
        huogxrzdnf: self.year,
        gongsiname: self.name
      };
      self.page = page;
      Axios({
        url: this.api.GongxinjsqyTe,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.loading = false;
        self.tableData = res.data.data;
        self.total = res.data.count;
          // 分页--下一页disabled
                var cot =  parseInt(self.total/20)+1
                if(cot <= self.page){
                    right[0].disabled="disabled"
                }else if(self.page==1){
                    self.suibian=true
                }
                // 分页--下一页disabled
                
      });
    },
    //获取年份
    dateapi() {
      var self = this;
      Axios({
        url: this.api.dateapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.years = res.data.data;
        // console.log(self.years[0].hougaoxrzdnf);
      });
    },
    //获取省
    shengfenapi() {
      var self = this;
      let params = {};
      Axios({
        url: this.api.shengfenapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.options = res.data.data;
      });
    },
    //获取企业分布
    fenbuapi() {
      var self = this;
      let params = {
        huogxrzdnf: self.value3
      };
      Axios({
        url: this.api.fenbuapi,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.ProfileData = res.data.data;
        // console.log(JSON.stringify(self.ProfileData));
        setTimeout(() => {
          self.drawProfile();
        }, 100);
      });
    },
    handleClick(tab) {
      var self = this;
      if (tab.index == 1) {
        // console.log(111)
        self.fenbuapi();
      }
    },
    drawProfile() {
      var chart = this.$echarts.init(
        document.getElementById("myProfile"),
        "macarons"
      );
      // for (var n in this.ProfileData) {
      //   this.ProfileData[n]["name"] =
      //     this.ProfileData[n]["name"] + "/n"  + this.ProfileData[n]["value"];
      // }
      chart.setOption({
        title: {
          text: "高新技术企业分布",
          show: true,
          left: "50%",
          top: "8",
          textAlign: "center",
          textStyle: {
            color: "#c03532",
            fontSize: "30",
            fontWeight: "normal",
            lineHeight: 10,
            fontWeight:600,
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}"
        },

        series: [
          {
            type: "treemap",
            width: "100%",
            height: "85%",
            roam: false, //是否开启拖拽漫游（移动和缩放）
            nodeClick: false, //点击节点后的行为,false无反应
            breadcrumb: {
              show: false
            },
            label: {
              lineHeight:40,
              fontSize: 28,
              show:true,
              //描述了每个矩形中，文本标签的样式。
          // normal: {
          //   show: true,
          //   position: ["10%", "50%"],
          //   fontSize:function(params) {
          //     console.log(params,"33")
          //     if(params.value >0 && params.value <4200){
          //       return "30"
          //     }else if(params.value <4200){
          //       return "60"
          //     }
          //   },
          //   },
            formatter: function(params) {
              console.log(params,"22")
              var arr = [
                  params.name,
                  params.value 
              ];
              return arr.join('\n');
            }
            },
            autoresize: true,
            itemStyle: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                },
                fontSize:function(params) {
                  if(params.value >0 && params.value <4200){
                    return "30"
                  }else if(params.value <4200){
                    return "60"
                  }
                },
                borderWidth: 1,
                borderColor: "#fff"
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            data: this.ProfileData
          }
        ]
      });
      chart.resize();
      // console.log(this.tabledata.gongsiname,"gongsiname")
    }
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/Techindustry.scss";
#Techindustry{
    .el-table__row>td:first-child{
        text-align: left !important;
    }
}
</style>