<template>
  <div id="vipreport">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title">
          分析报表
          <p>
            可查看全国各省市区的国家奖励
            省级奖励
            市级奖励数量。点击区域名称可查看详情
          </p>
        </div>
        <div class="jianglilx">
          <button class="button" @click="count('a')">国家奖励</button>
          <button class="button" @click="count('b')">省级奖励</button>
          <button class="button" @click="count('c')">市级奖励</button>
        </div>
        <div class="returnfu">
          <button class="return" @click="returnlb">返回上一级</button>
          <button class="qiehuan" @click="qiehuan">切换样式</button>
        </div>
        <div v-if="shengChart" id="chartmain">
          <div id="charts"></div>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <div class="close" @click="dialog_close">×</div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="所有奖励" name="s">
            <div class="title_h">
              <i class="icon icon-tips"></i>
              <span>{{ this.titlexx }}&nbsp;&nbsp;&nbsp;所有奖励列表</span>
            </div>
            <template>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="gongsiname" label="企业名称" align="center">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                    >{{ scope.row.gongsiname }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="suoshudy" label="地域" align="center"></el-table-column>
                <el-table-column prop="gongsilx" label="公司类型" align="center"></el-table-column>
                <el-table-column prop="zhuczb" label="注册资本(万元)" align="center"></el-table-column>
                <el-table-column prop="jianglimc" label="奖励名称" align="center"></el-table-column>
                <el-table-column prop="jianglixm" label="奖励项目" align="center"></el-table-column>
                <el-table-column prop="liangdian" label="奖励类别" align="center"></el-table-column>
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="10"
                :total="total"
              ></el-pagination>
            </template>
          </el-tab-pane>
          <el-tab-pane label="国家奖励" name="a">
            <div class="title_h">
              <i class="icon icon-tips"></i>
              <span>{{ this.titlexx }}&nbsp;&nbsp;&nbsp;国家奖励列表</span>
            </div>
            <template>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="gongsiname" label="企业名称" align="center">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                    >{{ scope.row.gongsiname }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="suoshudy" label="地域" align="center"></el-table-column>
                <el-table-column prop="gongsilx" label="公司类型" align="center"></el-table-column>
                <el-table-column prop="zhuczb" label="注册资本(万元)" align="center"></el-table-column>
                <el-table-column prop="jianglimc" label="奖励名称" align="center"></el-table-column>
                <el-table-column prop="jianglixm" label="奖励项目" align="center"></el-table-column>
                <el-table-column prop="liangdian" label="奖励类别" align="center"></el-table-column>
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="10"
                :total="total"
              ></el-pagination>
            </template>
          </el-tab-pane>
          <el-tab-pane label="省级奖励" name="b">
            <div class="title_h">
              <i class="icon icon-tips"></i>
              <span>{{ this.titlexx }}&nbsp;&nbsp;&nbsp;省级奖励列表</span>
            </div>
            <template>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="gongsiname" label="企业名称" align="center">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                    >{{ scope.row.gongsiname }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="suoshudy" label="地域" align="center"></el-table-column>
                <el-table-column prop="gongsilx" label="公司类型" align="center"></el-table-column>
                <el-table-column prop="zhuczb" label="注册资本(万元)" align="center"></el-table-column>
                <el-table-column prop="jianglimc" label="奖励名称" align="center"></el-table-column>
                <el-table-column prop="jianglixm" label="奖励项目" align="center"></el-table-column>
                <el-table-column prop="liangdian" label="奖励类别" align="center"></el-table-column>
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="10"
                :total="total"
              ></el-pagination>
            </template>
          </el-tab-pane>
          <el-tab-pane label="市级奖励" name="c">
            <div class="title_h">
              <i class="icon icon-tips"></i>
              <span>{{ this.titlexx }}&nbsp;&nbsp;&nbsp;市级奖励列表</span>
            </div>
            <template>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="gongsiname" label="企业名称" align="center">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                    >{{ scope.row.gongsiname }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="suoshudy" label="地域" align="center"></el-table-column>
                <el-table-column prop="gongsilx" label="公司类型" align="center"></el-table-column>
                <el-table-column prop="zhuczb" label="注册资本(万元)" align="center"></el-table-column>
                <el-table-column prop="jianglimc" label="奖励名称" align="center"></el-table-column>
                <el-table-column prop="jianglixm" label="奖励项目" align="center"></el-table-column>
                <el-table-column prop="liangdian" label="奖励类别" align="center"></el-table-column>
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="10"
                :total="total"
              ></el-pagination>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      activeName: "s",
      option: "",
      titlexx: "",
      paramsName: "",
      paramsValue: "", // 省
      paramsValueShi: "", // 市
      paramsValueQu: "", //  区
      tableData: [],
      shengChart: true, //省份柱状图显示
      // 柱状图信息字段
      // suoshudy: '',
      // beizhu2: '',
      // beizhu3: '',
      ziduanqufen: "",
      // 弹框列表字段(区域跟区分字段同一参数)
      page: 1,
      // 柱状图
      arrx: [],
      arry: [],
      total: 0,
      index: 0,
      i: 1
    };
  },
  mounted() {
    this.count();
    this.Reportechart();
  },
  methods: {
    count(ziduanqufen) {
      var self = this;
      let params = {
        page: this.page,
        limit: 10,
        suoshudy: this.paramsValue,
        beizhu2: this.paramsValueShi,
        beizhu3: this.paramsValueQu,
        ziduanqufen: ziduanqufen
      };
      this.axios({
        url: this.api.VIPreporttb,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res)
        console.log(res.data.data, "res");
        var arrx = [];
        var arry = [];
        for (var i = 0; i < res.data.data.length; i++) {
          var arr = res.data.data[i].name;
          var arr1 = res.data.data[i].value;
          arrx.push(arr);
          arry.push(arr1);
        }
        this.arrx = arrx;
        this.arry = arry;
        setTimeout(function() {
          self.Reportechart();
        }, 100);
      });
    },
    Reportechart() {
      var self = this;
      var dataX = self.arrx;
      // console.log(dataX,"dadadada")
      var dataY = self.arry;
      var myChart = this.$echarts.init(document.getElementById("charts"));
      myChart.off("click");
      var option1 = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
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
            data: dataX,
            axisTick: {
              alignWithLabel: false
            },
            triggerEvent: true,
            axisLabel: {
              interval: 0, //代表显示所有x轴标签
              rotate: 40
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
            name: "获奖总数",
            type: "bar",
            barWidth: "60%",
            data: dataY
          }
        ]
      };
      var option2 = {
        backgroundColor: "#323a5e",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "14%",
          top: "16%",
          containLabel: true
        },
        // legend: {
        //   data: ["获奖总数"],
        //   right: 10,
        //   top: 12,
        //   textStyle: {
        //     color: "#fff"
        //   },
        //   itemWidth: 50,
        //   itemHeight: 10
        //   // itemGap: 35
        // },
        xAxis: {
          type: "category",
          data: dataX,
          axisLine: {
            lineStyle: {
              color: "white"
            }
          },
          axisLabel: {
            // interval: 0,
            rotate: 40,
            textStyle: {
              fontFamily: "Microsoft YaHei"
            }
          }
        },

        yAxis: {
          type: "value",
          max: "1200",
          axisLine: {
            show: false,
            lineStyle: {
              color: "white"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.3)"
            }
          },
          axisLabel: {}
        },
        dataZoom: [
          {
            show: true,
            height: 12,
            xAxisIndex: [0],
            bottom: "8%",
            start: 10,
            end: 90,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5"
            },
            textStyle: {
              color: "#fff"
            },
            borderColor: "#90979c"
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            name: "获奖总数",
            type: "bar",
            barWidth: "60%",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#fccb05"
                  },
                  {
                    offset: 1,
                    color: "#f5804d"
                  }
                ]),
                barBorderRadius: 12
              }
            },
            data: dataY
          }
        ]
      };
      var category = dataX
      var dottedBase = [];
      var barData = dataY
      var rateData = dataY
      var option3 = {
        backgroundColor: "#191E40",
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.1)",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              backgroundColor: "#7B7DDC"
            }
          }
        },
        formatter: function (params) {
          //  console.log(params)
        if(params[0].value){
          if(params[0].value<20000){
            let number=params[0].value*1
            return params[0].axisValue + ' : ' + number;
          }else{
            return params[0].axisValue + ' : ' + params[0].value;
          }
          }else{
          return params[0].axisValue + ' : ' + '0';
          }
        },
        grid: {
          x: "12%",
          width: "82%",
          y: "12%"
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: "#B4B4B4"
            }
          },
          axisLabel: {
              interval: 0, //代表显示所有x轴标签
              rotate: 40
            },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },

            axisLabel: {
              formatter: "{value} "
            }
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },
            axisLabel: {
              formatter: "{value} "
            }
          }
        ],

        series: [
          {
            name: "获奖数量",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#F02FC2"
              }
            },
            data: rateData
          },

          {
            name: "已贯通",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#956FD4" },
                  { offset: 1, color: "#3EACE5" }
                ])
              }
            },
            data: barData
          }
        ]
      };

      var app = {
        currentIndex: -1
      };
      if (self.i == 1) {
        myChart.setOption(option1, true);
      } else if (self.i == 2) {
        myChart.setOption(option2, true);
      } else if (self.i == 3){
         myChart.setOption(option3, true);
      }
      //图表点击事件
      myChart.on("click", function(params) {
        console.log(params)
        if (params.componentType == "xAxis") {
          if (self.index == 0) {
            self.paramsValue = params.value;
          } else if (self.index == 1) {
            self.paramsValueShi = params.value;
          } else if (self.index == 2) {
            self.paramsValueQu = params.value;
          }
          self.titlexx =
            self.paramsValue + self.paramsValueShi + self.paramsValueQu;
          // console.log(this.titlexx,"999")
          self.bqclick(params.value);
        } else {
          // console.log(params)
          if (self.index == 0) {
            self.paramsValue = params.name;
            self.index = 1;
          } else if (self.index == 1) {
            self.paramsValueShi = params.name;
            self.index = 2;
          } else if (self.index == 2) {
            self.paramsValueQu = params.name;
          }
          self.paramsName = params.name;
          self.zzclick();
        }
      });
    },
    zzclick() {
      // console.log(this.paramsName,"柱子")
      // console.log(this.index)
      this.count();
    },
    bqclick(paramsValue) {
      console.log(this.paramsValue, "标签");
      this.dialogVisible = true;
      this.activeName = "s";
      // console.log(this.paramsValue,"this.paramsValue")
      // console.log(this.paramsValueShi,"this.paramsValueShi")
      // console.log(this.paramsValueQu,"this.paramsValueQu")
      this.request("");
    },
    handleClick(tab, event) {
      var self = this;
      console.log(tab.name, "label");
      this.request(tab.name);
    },
    //弹框信息
    request(ziduanqufen) {
      var self = this;
      let params = {
        page: this.page,
        limit: 10,
        ziduanqufen: ziduanqufen,
        suoshudy: this.paramsValue,
        beizhu2: this.paramsValueShi,
        beizhu3: this.paramsValueQu
      };
      this.axios({
        url: this.api.VIPreportlist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res);
        self.tableData = res.data.data;
        this.total = res.data.count;
      });
    },
    handleCurrentChange(val) {
      var self = this;
      self.loading = true;
      self.page = val;
      self.request(self.activeName);
    },
    dialog_close() {
      this.dialogVisible = false;
    },
    returnlb() {
      var self = this;
      if (self.index != 0) {
        self.index--;
        if (self.index == 1) {
          self.paramsValueQu = "";
          self.paramsValueShi = "";
        } else if (self.index == 0) {
          self.paramsValueShi = "";
          self.paramsValue = "";
        }
        setTimeout(function() {
          self.count();
        }, 100);
      }
    },
    qiehuan() {
      var self = this;
      if (self.i == 1) {
        self.i = 2;
        self.Reportechart();
      } else if(self.i == 2) {
        self.i = 3;
        self.Reportechart();
      }else if(self.i == 3) {
        self.i =1
        self.Reportechart();
      }
      console.log(self.i);
    }
  }
};
</script>

<style lang="scss" >
.C_title {
  p {
    line-height: 20px;
    color: #666;
    font-size: 14px;
  }
}
#chartmain {
  width: 100%;
  height: 100%;
  background: #fff;
  #charts {
    width: 100%;
    height: 600px;
    margin: auto;
  }
}
.jianglilx {
  text-align: center;
  padding: 10px 0;
  background: #fff;
  .button {
    color: #666;
    border: 1px solid #ccc;
    padding: 3px 10px;
    font-size: 14px;
    background: #fff;
    outline: none;
    border-radius: 3px;
    margin-right: 30px;
  }
  .button:hover {
    border: 1px solid #c03532;
    background: #c03532;
    color: #fff;
    cursor: pointer;
  }
}
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/VipReport.scss";
</style>
