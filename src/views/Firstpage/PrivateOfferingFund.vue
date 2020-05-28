<template>
  <div id="PrivateOfferingFund">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title"><span class="Title_left"></span>私募基金专区</div>
        <div class="el-tab">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="最新募集基金" name="second">
              <section class="block box-shadow overviewLayer">
                <!-- <header class="block-header">
                  <div class="block-title">
                    <i class="icon icon-tips middle"></i>
                    <span>最新募集资金列表</span>
                  </div>
                </header> -->
                <div class="el-tabs padding10">
                  <div class="query-result">
                    <div style="padding-top:25px;"></div>
                    <div class="table-wrapper">
                      <el-table stripe :data="tableData1" style="width: 100%">
                        <el-table-column prop="jijinname" label="基金名称" width="480"></el-table-column>
                        <el-table-column prop="shifouba" label="是否备案"></el-table-column>
                        <el-table-column prop="zhucezb" label="注册资本(万元)"></el-table-column>
                        <el-table-column prop="guanlir" label="管理人">
                          <template slot-scope="scope">
                            <router-link
                              target="_blank"
                              tag="a"
                              style="color:#606266;text-decoration:none;"
                              :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.guanlir) }}"
                            >{{ scope.row.guanlir }}</router-link>
                          </template>
                        </el-table-column>
                        <el-table-column prop="chenglisj" sortable="custom" label="成立时间"></el-table-column>
                      </el-table>
                    </div>
                  </div>

                  <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange1"
                    :page-size="20"
                    :total="total1"
                  ></el-pagination>
                </div>
              </section>
            </el-tab-pane>
            <el-tab-pane label="行业投资排名" name="three">
              <section class="block box-shadow overviewLayer">
                <header class="block-header">
                  <div class="block-title">
                    <i class="icon icon-tips middle"></i>
                    <span>行业投资排名列表</span>
                  </div>
                </header>
                <div class="el-tabs padding10">
                  <div class="query-result">
                    <div class="table-wrapper">
                      <el-table stripe :data="tableData2" style="width: 100%">
                        <el-table-column prop="simujjglr" label="私募基金管理人" width="480">
                          <template slot-scope="scope">
                            <router-link
                              target="_blank"
                              tag="a"
                              style="color:#606266;text-decoration:none;"
                              :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.simujjglr) }}"
                            >{{ scope.row.simujjglr }}</router-link>
                          </template>
                        </el-table-column>
                        <el-table-column prop="touzigszs" sortable="custom" label="投资公司总数"></el-table-column>
                        <el-table-column prop="touziaggss" sortable="custom" label="投资A股公司数"></el-table-column>
                        <el-table-column prop="touzisanbgss" sortable="custom" label="投资三板公司数"></el-table-column>
                        <el-table-column prop="touzisibgss" sortable="custom" label="投资四板公司数"></el-table-column>
                        <el-table-column prop="touzifgpssgss" sortable="custom" label="投资非挂牌非上市公司数"></el-table-column>
                      </el-table>
                    </div>
                  </div>

                  <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange2"
                    :page-size="20"
                    :total="total2"
                  ></el-pagination>
                </div>
              </section>
            </el-tab-pane>
            <el-tab-pane label="私募投资活跃排名" name="five">
              <section class="block box-shadow overviewLayer">
                <header class="block-header">
                  <div class="block-title">
                    <i class="icon icon-tips middle"></i>
                    <span>私募投资活跃排名列表</span>
                  </div>
                </header>
                <div class="el-tabs padding10">
                  <div class="query-result">
                    <div class="table-wrapper">
                      <el-table stripe :data="tableData3" style="width: 100%">
                        <el-table-column prop="simujjglr" label="私募基金管理人" width="360">
                          <template slot-scope="scope">
                            <router-link
                              target="_blank"
                              tag="a"
                              style="color:#606266;text-decoration:none;"
                              :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.simujjglr) }}"
                            >{{ scope.row.simujjglr }}</router-link>
                          </template>
                        </el-table-column>
                        <el-table-column prop="touzifgpssgss" sortable="custom" label="投资非挂牌非上市公司数"></el-table-column>
                        <el-table-column prop="touzinipogss" sortable="custom" label="投资拟IPO公司数"></el-table-column>
                      </el-table>
                    </div>
                  </div>

                  <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange3"
                    :page-size="20"
                    :total="total3"
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
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china.js";
export default {
  name: "PrivateOfferingFund",
  data() {
    return {
      activeName: "second",
      tableData1: [],
      tableData2: [],
      tableData3: [],
      page: 1,
      chinaMap: [],
      total1: 0,
      total2: 0,
      total3: 0,
      activeData: [],
      ipoData: []
    };
  },
  mounted() {
    var self = this;

    self.LatestFundsRaised(1);
    self.LatestFundsRaised(2);
    self.LatestFundsRaised(3);
    self.getData1();
    self.getData2();
    self.getData3();
  },
  updated() {},
  beforeDestroy() {},

  methods: {
    //投资活跃
    getData1() {
      var self = this;
      this.axios({
        url: this.api.activeData,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.activeData = res.data.data;
          self.drawActiveLineOption();
      });
    },
    getData2() {
      var self = this;
      this.axios({
        url: this.api.ipoData,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.ipoData = res.data.data;
         self.drawOrganizationLine();
      });
    },
    getData3() {
      var self = this;
      this.axios({
        url: this.api.shengfenData,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // self.chinaMap = res.data.data;
        let data = res.data.data;
        self.chinaMap = data.map(function(singleEl) {
         singleEl.name = singleEl.name
            .replace("省", "")
            .replace("市", "")
            .replace("壮族自治区", "")
            .replace("维吾尔自治区", "")
            .replace("回族自治区", "")
            .replace("自治区","")
            .replace(" ", "");;
          return singleEl;
        });
        // console.log(self.chinaMap);
        self.drawChinaMap();

      });
    },
    handleCurrentChange1(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      // console.log(self.page);
      self.LatestFundsRaised(1, val);
    },
    handleCurrentChange2(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      // console.log(self.page);
      self.LatestFundsRaised(2, val);
    },
    handleCurrentChange3(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      // console.log(self.page);
      self.LatestFundsRaised(3, val);
    },
    //最新募集基金
    LatestFundsRaised(index, page) {
      var self = this;
      self.page = 1;
      var url = "";
      if (index == 1) {
        url = this.api.LatestFundsRaised;
      } else if (index == 2) {
        url = this.api.investmentRanking;
      } else if (index == 3) {
        url = this.api.ActiveRanking;
      }
      let params = {
        page: page,
        limit: 20
      };
      this.axios({
        url: url,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (index == 1) {
          self.tableData1 = res.data.data;
          self.total1 = res.data.count;
        } else if (index == 2) {
          self.tableData2 = res.data.data;
          self.total2 = res.data.count;
        } else if (index == 3) {
          self.tableData3 = res.data.data;
          self.total3 = res.data.count;
        }

        self.total = res.data.count;
      });
    },
    handleClick(tab, event) {
      var self = this;
      // console.log(tab, event);
    },
    drawActiveLineOption() {
      var self = this;
      self.charts = this.$echarts.init(document.getElementById("activityLine"));
      self.charts.setOption({
        title: {
          text: "私募基金管理人(备案与未备案)数量",
          x: "center",
          y: "top"
        },
        color: ["#87CEFA"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "投资5家以上",
              "投资10家以上",
              "投资30家以上",
              "投资50家以上",
              "投资100家以上",
              "投资300家以上",
              "投资500家以上"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "34%",
            data: self.activeData
          }
        ]
      });
      // self.charts.resize();
    },
    drawOrganizationLine() {
      var self = this;
      self.charts = this.$echarts.init(
        document.getElementById("organizationLine")
      );
      self.charts.setOption({
        title: {
          text: "私募基金管理人(备案与未备案)数量",
          x: "center",
          y: "top"
        },
        color: ["#87CEFA"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "投资5家以上",
              "投资10家以上",
              "投资15家以上",
              "投资20家以上",
              "投资25家以上",
              "投资30家以上",
              "投资35家以上"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "34%",
            data: self.ipoData
          }
        ]
      });
      // self.charts.resize();
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
        backgroundColor: "#efefef",
        tooltip:  {
             trigger: 'item',
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
  .el-table__row>td:first-child{
    text-align: left !important;
  }
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
}
</style>