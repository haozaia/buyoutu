<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title"><span class="Title_left"></span>外商投资企业</div>
      <div class="el-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <div class="ind-title">
              <p>
                <i class="icon icon-tips"></i>
                <span>外商投资企业名单</span> 企业数量共
                <i class="icon-data">{{total}}</i>家
              </p>
            </div>
            <div class="form-wrapper">
              <form class="form-inline" role="form">
                <div class="form-group">
                  <span class="control-label">所属省份：</span>
                  <el-select v-model="suoshusf" placeholder="请选择所属省份">
                    <el-option label="选择所有" value></el-option>
                    <el-option
                      v-for="item in option"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- <div class="form-group">
                  <span class="control-label">所属行业 :</span>

                  <el-select v-model="suoshuhy" filterable size="small" placeholder="请选择所属行业">
                    <el-option label="选择所有" value></el-option>
                    <el-option
                      v-for="item in hyoptions"
                      :key="item.suoshuhy"
                      :label="item.suoshuhy"
                      :value="item.suoshuhy"
                    ></el-option>
                  </el-select>
                </div> -->
                <div class="form-group">
                  <el-select placeholder="请选择一级行业" filterable clearable v-model="form.One" @change="getOneclass" style="margin-right:20px;">
                    <el-option
                      v-for="item in OneClass"
                      :key="item.yijihy"
                      :label="item.yijihy"
                      :value="item.yijihy"
                    ></el-option>
                  </el-select>
                  <el-select placeholder="请选择二级行业" filterable clearable v-model="form.Two" @change="getTwoclass">
                    <el-option
                      v-for="item in TwoClass"
                      :key="item.erjihy"
                      :label="item.erjihy"
                      :value="item.erjihy"
                    ></el-option>
                  </el-select>
                </div>
                <div class="form-group">
                  <!-- <button
                    class="btn btn-query btn-action"
                    @click="search()"
                    type="button"
                    role="button"
                  >
                    <span class="chaxun">查询</span>
                    <i class="icon-loading icon-loading-white a-spin"></i>
                  </button> -->
                  <el-button @click="search()" type="primary">查询</el-button>
                </div>
              </form>
            </div>
            <div class="query-result">
              <div class="table-wrapper">
                <!-- <el-table stripe :data="tableData" style="width: 100%">
                  <el-table-column prop="gongsiname" label="公司名称" width>
                    <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails',  query: { name: scope.row.gongsiname }}"
                      >{{ scope.row.gongsiname }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="touzixzlc" label="注册省份"></el-table-column>
                  <el-table-column prop="zhucezb" label="注册资本（万美元）"></el-table-column>
                  <el-table-column prop="touzize" label="投资总额（万美元）"></el-table-column>
                  <el-table-column prop="jingwaitzz" label="境外投资者(中文)"></el-table-column>
                  <el-table-column prop="jingwaitzzgjzcd" label="境外投资者国籍(或地区)/注册地"></el-table-column>
                  <el-table-column prop="suoshuhy" label="产品名称"></el-table-column>
                </el-table> -->
                <el-table stripe :data="tableData" v-loading="loading" style="width: 100%">
                  <el-table-column prop="name" label="企业名称" width="480">
                    <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                      >{{ scope.row.name }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="suoshusf" label="所属省份" width="180"></el-table-column>
                  <el-table-column prop="gongsilx" label="公司类型"></el-table-column>
                  <el-table-column prop="zhucezb" label="注册资本(万元)"></el-table-column>
                  <!-- <el-table-column prop="lianxiyx" label="联系邮箱"></el-table-column> -->
                  <el-table-column prop="fadingdbr" label="法人代表"></el-table-column>
                </el-table>
              </div>
            </div>
            <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="20"
              :total="total"
              background
               :current-page="page"
            ></el-pagination>
          <!-- </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china.js";
import "../../../node_modules/echarts/map/js/world.js";
// import option from "../../styles/js/map-option";
// import worldOption from "../../styles/js/world";

export default {
  name: "Government",
  data() {
    return {
      jingwaitzzgjzcd: "",
      touzixzlc: "",
      total: 0,
      page: 1,
      activeName: "second",
      gongsiname: "",
      option: [],
      options: [],
      region: [],
      tableData: [],
      ziduanqufen: "a",
      chart: null,
      ins: 0,
      inss: 0,
      type: 1,
      chinaMap: [],
      chinaX: [],
      chinaY: [],
      worldMap: [],
      worldX: [],
      worldY: [],
      loading:true,
      suoshusf:'',
      // suoshuhy: '',
      // hyoptions: [],
      OneClass:{},
      TwoClass:{},
      form:{
        One:"",
        Two:""
      },
    };
  },
  mounted() {
    var self = this;
    // self.country(1);
    // self.country(3);
    self.select();
    self.tableList();
    setTimeout(function() {
      // self.drawChinaMap();
      // self.drawChinaLine();
      // self.drawWorldMap();
      // self.drawWorldLine();
    }, 300);
    // self.hangyeDown()
    this.getOneclass();
  },
  // updated() {
  //   if (!this.chart) {
  //     this.initChart();
  //   }
  // },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },

  methods: {
    select() {
      var self = this;
      this.axios({
        url: this.api.waishangSF,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.option = res.data.data;
      });
    },

     search(){
      var self=this
      self.page=1
      self.tableList()
    },
    // hangyeDown() {
    //   var self = this
    //   this.axios({
    //     url: this.api.Hangyedown,
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   }).then(res => {
    //     // console.log(res.data.data,"res")
    //     self.hyoptions = res.data.data
    //   })
    // },
    getOneclass() {
      var self = this;
      self.form.Two = ""
      this.axios({
        url: this.api.GetOneClass,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then( res=> {
        // console.log(res.data.data,"getOneclass")
        self.OneClass = res.data.data
        self.getTwoclass()
      })
    },
    getTwoclass() {
      var self = this;
      let params = {
        yijihy: self.form.One
      };
      this.axios({
        url: this.api.GetTwoClass,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then( res=> {
        // console.log(res.data.data,"getTwoclass")
        self.TwoClass = res.data.data
        // self.getTwoclass()
      })
    },
    tableList() {
      var self = this;
      self.loading=true
      let params = {
        leixing:"3",
        page:self.page,
        limit:20,
        suoshusf:self.suoshusf,
        suoshuhy: self.form.One,
        suoshuejhy: self.form.Two,
      };
      this.axios({
        url: this.api.ForeigninvesList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.loading=false
        self.tableData = res.data.data;
        self.total = res.data.count;
      });
    },
    handleCurrentChange(val) {
      var self = this;
      self.page = val;
      // console.log(self.page);
      self.tableList(val, 20);
    },
    handleClick(tab, event) {
      var self = this;
      if (tab.index == 0) {
        setTimeout(function() {
        }, 200);
      }
    },
    country(type) {
      var self = this;
      let params = {
        type: type
      };
      this.axios({
        data: this.$qs.stringify(params),
        url: this.api.countapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        if (type == 1) {
          self.chinaMap = res.data.data;
          const chinaData = self.getMaxSort(res.data.data);
          self.chinaX = chinaData.map(function(singleEl) {
            return singleEl.name;
          });
          self.chinaY = chinaData.map(function(singleEl) {
            return singleEl.value;
          });
          setTimeout(function() {
            // self.drawChinaMap();
            // self.drawChinaLine();
          }, 100);
        } else if (type == 2) {
          self.chinaMap = res.data.data;
          const chinaData = self.getMaxSort(res.data.data);
          self.chinaX = chinaData.map(function(singleEl) {
            return singleEl.name;
          });
          self.chinaY = chinaData.map(function(singleEl) {
            return singleEl.value;
          });
          setTimeout(function() {
            // self.drawChinaMap();
            // self.drawChinaLine();
          }, 100);
        } else if (type == 3) {
          self.worldMap = res.data.data;
          const chinaData = self.getMaxSort(res.data.data);
          self.worldX = chinaData.map(function(singleEl) {
            return singleEl.name;
          });
          self.worldY = chinaData.map(function(singleEl) {
            return singleEl.value;
          });
          setTimeout(function() {
            // self.drawWorldMap();
            // self.drawWorldLine();
          }, 100);
        } else if (type == 4) {
          self.worldMap = res.data.data;
          const chinaData = self.getMaxSort(res.data.data);
          self.worldX = chinaData.map(function(singleEl) {
            return singleEl.name;
          });
          self.worldY = chinaData.map(function(singleEl) {
            return singleEl.value;
          });
           setTimeout(function() {
            // self.drawWorldMap();
            // self.drawWorldLine();
          }, 100);
        }

        // console.log(self.chinaMap)
      });
    },
    active(num) {
      var self = this;
      self.ins = num;
      if (self.ins == 0) {
        // self.country(1);
      } else if (self.ins == 1) {
        // self.country(2);
      }
    },
    actives(num) {
      var self = this;
      self.inss = num;
      if (self.inss == 0) {
        // self.country(3);
      } else if (self.inss == 1) {
        // self.country(4);
      }
    },
    drawChinaMap() {
      var self = this;
      // console.log(self.chinaMap, "123");
      this.chart = this.$echarts.init(document.getElementById("chinaMap"));
      this.chart.setOption({
        backgroundColor: "#FFFFFF",
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            name: "企业数量",
            type: "map",
            mapType: "china",
            roam: false,
            label: {
              normal: {
                show: false,
                textStyle: { color: "#fff" }
              },
              emphasis: {
                show: true,
                textStyle: { color: "#fff" }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5,
                borderColor: "#FFFFFF",
                areaColor: "#87CEFA"
              },
              emphasis: {
                borderWidth: 0.1,
                borderColor: "#4b0082",
                areaColor: "#EE7741"
              }
            },
            data: self.chinaMap
          }
        ]
      });
    },
    getMaxSort(arr) {
      console.log(arr.length);
      var max;
      for (var i = 0; i < arr.length; i++) {
        for (var j = i; j < arr.length; j++) {
          if (arr[i].value > arr[j].value) {
            max = arr[j];
            arr[j] = arr[i];
            arr[i] = max;
          }
        }
      }
      return arr;
    },
    drawWorldMap() {
      var self = this;
      this.worldChart = this.$echarts.init(document.getElementById("worldMap"));
      this.worldChart.setOption({
        tooltip: {
          trigger: "item"
        },

        series: [
          {
            name: "世界级企业",
            type: "map",
            mapType: "world",
            roam: false,
            label: {
              normal: {
                show: false,
                textStyle: { color: "#666" }
              },
              emphasis: {
                show: true,
                textStyle: { color: "#fff" }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5,
                borderColor: "#FFFFFF",
                areaColor: "#87CEFA"
              },
              emphasis: {
                borderWidth: 0.1,
                borderColor: "#4b0082",
                areaColor: "#c03532"
              }
            },
            data: self.worldMap
          }
        ]
      });
    },

    drawChinaLine() {
      var self = this;
      this.chartLine = this.$echarts.init(document.getElementById("chinaLine"));
      this.chartLine.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#87CEFA"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          position: "top"
        },
        yAxis: {
          type: "category",
          data: self.chinaX
        },
        series: [
          {
            name: "2011年",
            type: "bar",
            data: self.chinaY
          }
        ]
      });
    },
    drawWorldLine() {
      var self = this;
      this.chartLine = this.$echarts.init(document.getElementById("worldLine"));
      this.chartLine.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#87CEFA"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          position: "top"
        },
        yAxis: {
          type: "category",
          data: self.worldX
        },
        series: [
          {
            name: "2011年",
            type: "bar",
            data: self.worldY
          }
        ]
      });
    },
    
  }
};
</script>

<style lang="scss">

.block-header {
  background-color: #fff;
  .block-title {
    position: relative;
    height: 50px;
    color: #333;
    line-height: 50px;
    white-space: nowrap;
    padding: 0 40px;
    span {
      font-weight: 700;
    }
  }
}
.el-tab{
  .ind-title{
    p{
      font-size: 20px;
      span{
        font-size: 20px;
      }
      .icon-data{
        background-color: #CF111B;
        font-size: 20px;
      }
    }
  }
}
.tabs {
  text-align: center;
  display: block;
  margin: 0 0 -1px;
  padding: 0 0 20px;
  .tab-item {
    margin: 0;
    margin-top: 20px;
    display: inline-block;
    padding: 0 20px;
    list-style: none;
    float: none;
    a {
      text-decoration: none;
      color: #666;
      border-top-left-radius: 4px;
      cursor: pointer;
      text-align: center;
      display: inline-block;
      padding: 2px 25px;
      font-size: 14px;
      border: 1px solid #e9edef;
    }
    .active {
      border-top-left-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      display: inline-block;
      padding: 2px 25px;
      font-size: 14px;
      border: 1px solid #e9edef;
      color: #fff;
      background: #87CEFA;
      span {
        list-style: none;
      }
    }
  }
}
.echartsPat {
  display: inline-block;
}
.middle {
  vertical-align: middle;
}
.bottom10 {
  border-bottom: 10px solid #f5f8fa;
}
</style>