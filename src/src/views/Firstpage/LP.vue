<template>
  <div id="PrivateOfferingFund">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title"><span class="Title_left"></span>私募基金专区</div>
        <div class="el-tab">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="私募基金LP市场概况" name="first">
              <section class="sub-block-group">
                <div class="subblockWapper paddingR10">
                  <header class="block-header">
                    <div class="block-title">
                      <i class="icon icon-tips"></i>
                      <span>投资活跃度分布</span>
                    </div>
                  </header>
                  <div
                    id="privateFundsPie"
                    class="inlineBlock"
                    :style="{height:'442px',width:'100%'}"
                  ></div>
                </div>
                <div class="subblockWapper">
                  <header class="block-header">
                    <div class="block-title">
                      <i class="icon icon-tips"></i>
                      <span>管理机构所募基金数分布</span>
                    </div>
                  </header>
                  <div class="el-tabs padding10">
                    <div class="query-result">
                      <div class="table-wrapper">
                        <el-table
                          stripe
                          :data="tableData"
                          style="width: 100%"
                          max-height="442"
                          height="442"
                          size="small"
                        >
                          <el-table-column prop="name" label="私募基金LP类型"></el-table-column>
                          <el-table-column prop="value" label="私募基金LP家数"></el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="sub-block-group">
                <header class="block-header">
                  <div class="block-title">
                    <i class="icon icon-tips"></i>
                    <span>私募基金募集地域LP分布</span>
                  </div>
                </header>
                <div id="chinaMap" :style="{height:'700px',width:'100%'}"></div>
              </section>
            </el-tab-pane>

            <el-tab-pane label="新近募集基金LP" name="second">
              <section class="block box-shadow overviewLayer el-tabs">
                <div class="el-tabs padding10">
                  <div class="query-result">
                    <div class="table-wrapper">
                      <form class="form-inline">
                        <el-input v-model="input1" placeholder="LP公司名称"></el-input>
                        <div class="form-group">
                          <span class="control-label">LP类型 ：</span>
                          <el-select v-model="value1" placeholder="全部投资基金LP">
                            <el-option label="选择所有" value></el-option>
                            <el-option
                              v-for="item in options1"
                              :key="item.lplx"
                              :label="item.lplx"
                              :value="item.lplx"
                            ></el-option>
                          </el-select>
                        </div>
                        <div class="form-group">
                          <button class="btn btn-query btn-action" type="button" role="button">
                             <el-button @click="tableList1()" type="primary">查询</el-button>
                            <i class="icon-loading icon-loading-white a-spin"></i>
                          </button>
                        </div>
                      </form>
                      <el-table stripe :data="tableData1" style="width: 100%">
                        <el-table-column prop="lpname" label="LP名称">
                        </el-table-column>
                        <el-table-column prop="lplx" sortable="custom" label="LP类型"></el-table-column>
                        <el-table-column prop="suotousmjj" sortable="custom" label="所投私募基金"></el-table-column>
                        <el-table-column prop="jijinglr" label="基金管理人">
                          <template slot-scope="scope">
                            <router-link
                              style="color:#606266;text-decoration:none;"
                              target="_blank"
                              tag="a"
                              :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.jijinglr) }}"
                            >{{ scope.row.jijinglr }}</router-link>
                          </template>
                        </el-table-column>
                        <el-table-column prop="touzisj" sortable="custom" label="投资时间"></el-table-column>
                      </el-table>
                    </div>
                  </div>

                  <el-pagination
                    layout="prev, pager, next"
                    background
                    @current-change="handleCurrentChange1"
                    :page-size="20"
                    :total="total1"
                    :current-page="page1"
                  ></el-pagination>
                </div>
              </section>
            </el-tab-pane>
            <el-tab-pane label="私募基金LP排名" name="three">
              <section class="block box-shadow overviewLayer el-tabs">
                <div class="el-tabs padding10">
                  <div class="query-result">
                    <div class="table-wrapper">
                      <form class="form-inline">
                        <el-input v-model="input2" placeholder="LP公司名称"></el-input>
                        <div class="form-group">
                          <span class="control-label">LP类型 ：</span>
                          <el-select v-model="value2" placeholder="全部投资基金LP">
                            <el-option label="选择所有" value></el-option>
                            <el-option
                              v-for="item in options2"
                              :key="item.lplx"
                              :label="item.lplx"
                              :value="item.lplx"
                            ></el-option>
                          </el-select>
                        </div>
                        <div class="form-group">
                          <button class="btn btn-query btn-action" type="button" role="button">
                             <el-button @click="tableList2()" type="primary">查询</el-button>
                            <i class="icon-loading icon-loading-white a-spin"></i>
                          </button>
                        </div>
                      </form>
                      <el-table stripe :data="tableData2" style="width: 100%">

                        <el-table-column prop="jijingdmc" label="基金股东名称">
                          <template slot-scope="scope">
                            <router-link
                              style="color:#606266;text-decoration:none;"
                              target="_blank"
                              tag="a"
                              :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.jijingdmc) }}"
                            >{{ scope.row.jijingdmc }}</router-link>
                          </template>
                        </el-table-column>
                        <el-table-column prop="lplx" sortable="custom" label="LP类型"></el-table-column>
                        <el-table-column
                          prop="touzigsxsmjjsl"
                          sortable="custom"
                          label="投资公司型私募基金数量"
                        ></el-table-column>
                        <el-table-column
                          prop="suotoujjzczbhj"
                          sortable="custom"
                          label="所投基金注册资本合计(亿元)"
                        ></el-table-column>
                        <!-- <el-table-column prop="date" label="所投基金详情列表">
                         <template slot-scope="scope">
                            <router-link
                              style="color:#606266;text-decoration:none;"
                              :to="{ path:'/CompanyDetails', query: { name: scope.row.jijinname }}"
                            >{{ scope.row.jijinname }}</router-link>
                          </template>
                        </el-table-column>-->
                      </el-table>
                    </div>
                  </div>

                  <el-pagination
                    layout="prev, pager, next"
                    background
                    @current-change="handleCurrentChange2"
                    :page-size="20"
                    :total="total2"
                    :current-page="page2"
                  ></el-pagination>
                </div>
              </section>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../node_modules/echarts/map/js/china.js";
export default {
  name: "PrivateOfferingFund",
  data() {
    return {
      input1: "",
      input2: "",
      value1: "",
      value2: "",
      page1: 1,
      page2: 1,
      activeName: "first",
      total1: 0,
      total2: 0,
      options1: [],
      options2: [],
      tableData: [],
      tableData1: [],
      tableData2: [],
      chinaMap: [],
      pieOption: {},
    };
  },
  mounted() {
    var self = this;
    self.tableList1();
    self.select1();
    self.tableList2();
    self.select2();
    self.Gaikuang();
    self.getData3();

  },
  updated() {},
  beforeDestroy() {},

  methods: {
    getData3() {
      var self = this;
      this.axios({
        url: this.api.lpdistributionapi,
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // self.chinaMap = res.data.data;
        let data = res.data.data;
        self.chinaMap = data.map(function(singleEl) {
          singleEl.name = singleEl.suoshusf.replace("省", "").replace("市", "");
          singleEl.value = singleEl.number;
          return singleEl;
        });
        // console.log(self.chinaMap);
        self.drawChinaMap();
      });
    },

    Gaikuang() {
      var self = this;
      this.axios({
        url: this.api.getlpnumberapi,
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData = res.data.data;
        self.drawPrivateFundsPie();
        // console.log(self.tableData);
      });
    },

    handleClick(tab, event) {
      // var self = this;
      console.log(tab, event);
    },
    handleCurrentChange1(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.tableList1(val);
    },
    select1() {
      var self = this;
      this.axios({
        url: this.api.FundLPselect,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options1 = res.data.data;
      });
    },

    tableList1(page) {
      var self = this;
      let params = {
        page: page,
        limit: 20,
        lpname: self.input1,
        lplx: self.value1
      };
      self.page1=page?page:1
      this.axios({
        url: this.api.FundLP,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.tableData1 = res.data.data;
        self.total1 = res.data.count;
      });
    },

    handleCurrentChange2(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.tableList2(val);
    },
    select2() {
      var self = this;
      this.axios({
        url: this.api.FundLPtypeselect,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options2 = res.data.data;
      });
    },

    tableList2(page) {
      var self = this;
      let params = {
        page: page,
        limit: 20,
        lpname: self.input2,
        lplx: self.value2
      };
      self.page2=page?page:1
      this.axios({
        url: this.api.FundLPtypeList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.tableData2 = res.data.data;
        self.total2 = res.data.count;
      });
    },

    //
    drawPrivateFundsPie() {
      var self = this;
      // console.log(self.tableData)
      self.charts = this.$echarts.init(
        document.getElementById("privateFundsPie")
      );
      self.charts.setOption({
        tooltip: {
          textStyle: {
            fontSize: 18
          },
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: self.tableData,
            label:{            //饼图图形上的文本标签
                            normal:{
                                show:true,
                                textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 20    //文字的字体大小
                                },
                            }
                        },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      self.charts.resize();
    },
    drawChinaMap() {
      var self = this;

      let max = Math.max.apply(
        Math,
        self.chinaMap.map(function(o) {
          return o.value;
        })
      );
      var options= {
        backgroundColor: "#fff",
        tooltip:  {
             trigger: 'item',
             textStyle: {
            fontSize: 18
          },
             formatter: function (params) {
              if(params.value){
              return params.seriesName + '<br/>' + params.name + ' : ' + params.value;
              }else{
              return params.seriesName + '<br/>' + params.name + ' : ' + '0';
              }
                 
             }
         },
        visualMap: {
          //视觉映射组件
          show: true,
          min: 0,
          max: max,
          left: "5%",
          top: "94%",
          inverse: true, //是否反转 visualMap 组件
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: false, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
          seriesIndex: 0, //指定取哪个系列的数据，即哪个系列的 series.data,默认取所有系列
          orient: "horizontal",
          inRange: {
            color: ["#dbfefe", "#1066d5"] // 蓝绿
          }
        },

        series: [
          {
            name: "企业数量",
            type: "map",
            map: "china",
            geoIndex: 0,
            label: {
              normal: {
                show: true,
                 fontSize: "20",
                textStyle: { color: "#333" }
              },
              emphasis: {
                show: true,
                textStyle: { color: "#000" }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5
                // areaColor: "#87CEFA"
              },
              emphasis: {
                borderWidth: 0.1,
                areaColor: "#EE7741"
              }
            },
            data: self.chinaMap
          }
        ]
      };
      document.getElementById('chinaMap').removeAttribute('_echarts_instance_');
        let myChart = this.$echarts.init(document.getElementById('chinaMap'));
      myChart.setOption(options,true);
    }
  }
};
</script>

<style lang="scss">
#PrivateOfferingFund {
  .sub-block-group {
    background: #fff;
    border-bottom: 10px solid #f5f8fa;
    clear: both;
    .subblockWapper {
      padding: 0 5px;
      display: inline-block;
      width: 49%;
    }
    .paddingR10 {
      border-right: 10px solid #f5f8fa;
    }
  }
  .inlineBlock {
    display: inline-block;
  }
  .form-group {
    padding: 10px 0 0 30px;
  }
  .el-input {
    width: 200px;
  }
  .form-group {
    display: inline-block;
  }
}
</style>