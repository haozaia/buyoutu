<template>
  <div id="chanyefb">
    <!-- <div class="container">
      <header>
        <div class="block-title">
          <i class="icon icon-tips"></i>
          <span>本地产业链分布</span>
        </div>
      </header>
    </div> -->
    <div id="chartmain" v-loading="loading1">
      <div v-if="flag" id="charts"></div>
      <div v-else><p class="flag_p">暂无数据</p></div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div class="title_h">
        <!-- <i class="icon icon-tips"></i> -->
        <span class="fontSize20">{{ this.suoshusf }} {{ this.suoshucs }} {{ this.suoshuqx }}&nbsp;&nbsp;&nbsp;{{ this.paramsName }}</span>
      </div>
      <div class="close" @click="dialog_close">×</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="A股公司" name="2">
          <template>
            <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
              <el-table-column prop="name" label="公司名称" width="500" align="center">
                <template slot-scope="scope">
                  <router-link
                    target="_blank"
                    tag="a"
                    style="color:#606266;text-decoration:none;"
                    :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                  >{{ scope.row.name }}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="fadingdbr" label="法定代表人" align="center"></el-table-column>
              <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center"></el-table-column>
              <el-table-column prop="chenglisj" label="成立时间" align="center">
                <template slot-scope="{row}">
                  {{ row.chenglisj || '-' }}
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="10"
              :total="total"
            ></el-pagination> -->
          </template>
          <!-- 分页dom start -->
            <div id="Pagination" v-show="total > 10">
              <el-pagination layout="prev, pager, next" prev-text="上一页"  next-text="下一页" @current-change="handleCurrentChange"  :page-size="10" :current-page="page"></el-pagination>
              <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
            </div>
          <!-- 分页dom end -->
        </el-tab-pane>
        <el-tab-pane label="三板公司" name="3">
          <!-- <div class="title_h">
            <i class="icon icon-tips"></i>
            <span class="fontSize20">{{ this.paramsName }}&nbsp;&nbsp;&nbsp;三板公司列表</span>
          </div> -->
          <template>
            <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
              <el-table-column prop="name" label="公司名称" width="500" align="center">
                <template slot-scope="scope">
                  <router-link
                    target="_blank"
                    tag="a"
                    style="color:#606266;text-decoration:none;"
                    :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                  >{{ scope.row.name }}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="fadingdbr" label="法定代表人" align="center"></el-table-column>
              <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center"></el-table-column>
              <el-table-column prop="chenglisj" label="成立时间" align="center">
                <template slot-scope="{row}">
                  {{ row.chenglisj || '-' }}
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="10"
              :total="total"
            ></el-pagination> -->
          </template>
          <!-- 分页dom start -->
            <div id="Pagination"  v-show="total > 10">
              <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="10" :current-page="page"></el-pagination>
              <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
            </div>
          <!-- 分页dom end -->
        </el-tab-pane>
        <el-tab-pane label="四板公司" name="4">
          <!-- <div class="title_h">
            <i class="icon icon-tips"></i>
            <span class="fontSize20">{{ this.paramsName }}&nbsp;&nbsp;&nbsp;四板公司列表</span>
          </div> -->
          <template>
            <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
              <el-table-column prop="name" label="公司名称" width="500" align="center">
                <template slot-scope="scope">
                  <router-link
                    target="_blank"
                    tag="a"
                    style="color:#606266;text-decoration:none;"
                    :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                  >{{ scope.row.name }}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="fadingdbr" label="法定代表人" align="center"></el-table-column>
              <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center"></el-table-column>
              <el-table-column prop="chenglisj" label="成立时间" align="center">
                <template slot-scope="{row}">
                  {{ row.chenglisj || '-' }}
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="10"
              :total="total"
            ></el-pagination> -->
          </template>
          <!-- 分页dom start -->
            <div id="Pagination"  v-show="total > 10">
              <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="10" :current-page="page"></el-pagination>
              <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
            </div>
          <!-- 分页dom end -->
        </el-tab-pane>
        <el-tab-pane label="已私募融资公司" name="5">
          <!-- <div class="title_h">
            <i class="icon icon-tips"></i>
            <span class="fontSize20">{{ this.paramsName }}&nbsp;&nbsp;&nbsp;私募公司列表</span>
          </div> -->
          <template>
            <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
              <el-table-column prop="name" label="公司名称" width="500" align="center">
                <template slot-scope="scope">
                  <router-link
                    target="_blank"
                    tag="a"
                    style="color:#606266;text-decoration:none;"
                    :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                  >{{ scope.row.name }}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="fadingdbr" label="法定代表人" align="center"></el-table-column>
              <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center"></el-table-column>
              <el-table-column prop="chenglisj" label="成立时间" align="center">
                <template slot-scope="{row}">
                  {{ row.chenglisj || '-' }}
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-pagination+63


              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="10"
              :total="total"
            ></el-pagination> -->
          </template>
          <!-- 分页dom start -->
              <div id="Pagination"  v-show="total > 10">
                <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="10" :current-page="page"></el-pagination>
                <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
              </div>
          <!-- 分页dom end -->
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<style lang="scss">
@import "../../styles/Monitor/region/css/container/container.scss";
@import "../../styles/Monitor/region/css/container/chanyefb.scss";
// .el-tabs__nav-wrap .is-top{
//   border-bottom: 2px solid #ccc
// }
#chartmain {
  .flag_p {
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    color: #ccc;
    min-height: 580px;
  }
}
</style>
<script>
import echarts from "echarts";

export default {
  props: ["sfvalue"],
  data() {
    return {
      name: "chanyefb",
      option: "",
      suoshusf: "",
      suoshucs: "",
      suoshuqx: "",
      loading: true,
      loading1: true,
      paramsName: "",
      dialogVisible: false,
      activeName: "2",
      tableData: [],
      suoshuzbsc: "",
      page: 1,
      total: 0,
      arrx: [],
      arrx0: [],
      arrx1: [],
      arrx2: [],
      arrx3: [],
      // arry: [],
      qufenziduan: "",
      flag: true,
      suibian:true,    //分页变量3
    };
  },
  mounted() {
    var self = this
    this.suoshusf = this.$store.state.suoshusf;
    this.suoshucs = this.$store.state.suoshucs;
    this.suoshuqx = this.$store.state.suoshuqx;
    this.echartlist();
    this.echart();
    window.onresize = function() {
      setTimeout(function() {
        self.echart();
      }, 500);
    };
  },
  destroyed(){
    window.onresize = null;
  },  
  watch: {
    "$store.state.suoshusf": function() {
      var self = this;
      this.suoshusf = this.$store.state.suoshusf;
      self.loading = true;
      self.loading1 = true;
      this.echartlist();
    }
  },
  methods: {
    echartlist() {
      var self = this;
      let params = {
        suoshusf: self.suoshusf,
        suoshucs: self.suoshucs,
        suoshuqx: self.suoshuqx
      };
      this.axios({
        url: this.api.Chanyefb,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.data[0].flag == false) {
          self.loading1 = false;
          self.flag = false;
        } else {
          var arrx = [];
          var arrx0 = [];
          var arrx1 = [];
          var arrx2 = [];
          var arrx3 = [];
          // var arry = []
          for (var i = 0; i < res.data.data.length; i++) {
            var str = res.data.data[i].chanyelian;
            // console.log(res.data.data[i].chanyelian,"222")
            if (res.data.data[i].chanyelian.length > 4) {
                arrx.push(self.insertStr(str, 4, "\n"));
              }else{
                arrx.push(str);
              }
            var str0 = res.data.data[i].value[0].number;
            var str1 = res.data.data[i].value[1].number;
            var str2 = res.data.data[i].value[2].number;
            var str3 = res.data.data[i].value[3].number;
            arrx0.push(str0);
            arrx1.push(str1);
            arrx2.push(str2);
            arrx3.push(str3);
          }
          this.arrx = arrx;
          this.arrx0 = arrx0;
          this.arrx1 = arrx1;
          this.arrx2 = arrx2;
          this.arrx3 = arrx3;
          this.loading1 = false;
          setTimeout(function() {
            self.echart();
          }, 100);
        }
      });
    },
    insertStr(soure, start, newStr) {
      return soure.slice(0, start) + newStr + soure.slice(start);
    },
    echart() {
      var self = this;
      var dataX = self.arrx;
      var dataY0 = self.arrx0;
      for(let i=0;i<dataY0.length;i++){
        if(dataY0[i] < 6){
          dataY0[i]=dataY0[i]*1+1
        }
      }
      var dataY1 = self.arrx1;
      for(let i=0;i<dataY1.length;i++){
        if(dataY1[i] < 6){
          dataY1[i]=dataY1[i]*1+1
        }
      }
      var dataY2 = self.arrx2;
      for(let i=0;i<dataY2.length;i++){
        if(dataY2[i] < 6){
          dataY2[i]=dataY2[i]*1+1
          // console.log(dataY2[i],"四板为1的数量")
        }
      }
      var dataY3 = self.arrx3;
      for(let i=0;i<dataY3.length;i++){
        if(dataY3[i] < 6){
          dataY3[i]=dataY3[i]*1+1
        }
      }
      var option = {
        backgroundColor: "#FFFFFF",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
          //  console.log(params)
           let series0;
           let series1;
           let series2;
           let series3;
            if(params[0].value){
              if(params[0].value< 7){
              // console.log("小于7")
              let number1=params[0].value*1-1
              series0 = params[0].seriesName + ' : ' + number1;
              }else {
              series0 = params[0].seriesName + ' : ' +params[0].value
              }
            }
            if(params[1].value){
              if(params[1].value< 7){
              let number2=params[1].value*1-1
                series1 = params[1].seriesName + ' : ' + number2;
              }else {
                series1 = params[1].seriesName + ' : ' +params[1].value
              }
            }
            if(params[2].value){
              if(params[2].value< 7){
              let number3=params[2].value*1-1
                series2 = params[2].seriesName + ' : ' + number3;
              }else {
                series2 = params[2].seriesName + ' : ' +params[2].value
              }
            }
            if(params[3].value){
              if(params[3].value< 7){
              let number4=params[3].value*1-1
                series3 = params[3].seriesName + ' : ' + number4;
              }else {
                series3 = params[3].seriesName + ' : ' +params[3].value
              }
            }
            return series0 + '<br/>' + series1 + '<br/>' + series2 + '<br/>' + series3
          },
          textStyle: {
            fontSize: 20,
          }
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "14%",
          top: "16%",
          containLabel: true
        },
        legend: {
          // legend居中
          x: 'center',
          data: ["A股公司", "三板公司", "四板公司", "已私募融资公司"],
          // right: 20,
          // top: 12,
          itemGap: 70,
          textStyle: {
            color: "#333333",
            fontSize:20,
          },
          itemWidth: 30,
          itemHeight: 18
          // itemGap: 35
        },
        xAxis: {
          type: "category",
          data: dataX,
          
          axisTick: {
            show: false,
          },
          axisLine: {
            show:false,
            lineStyle: {
              color: "#000",
            }
          },
          axisLabel: {
            interval: 0,
            // rotate: 40,
            textStyle: {
              padding:[12,0,0,0],
              fontFamily: "Microsoft YaHei",
              fontSize:20,
              lineHeight: 24,
            }
          }
        },

        yAxis: {
          type: "log",
          min: 1,
          logBase: 10,
          // max: "1200",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#333333",
              fontSize: 20,
            }
          },
          axisTick: {
            show: false //刻度线
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#E9E9E9", //网格线
              type: "dashed ",
              // borderWidth: 10,
              // width: 100,
              // height: 1,
            }
          },
          axisLabel: {
            textStyle: {
              fontSize:20,
            }
          }
        },
        dataZoom: [
          {
            show: true,
            height: 12,
            xAxisIndex: [0],
            bottom: "8%",
            // 滚动条
            start: 87,
            end: 100,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "80%",
            handleStyle: {
              color: "#d3dee5"
            },
            textStyle: {
              color: "transparent",
            },
            borderColor: "#90979c"
          },
          // 图表可滚轮放大缩小
          // {
          //   type: "inside",
          //   show: true,
          //   height: 15,
          //   start: 1,
          //   end: 35
          // }
        ],
        series: [
          {
            name: "A股公司",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#D5D5D5"
                  },
                  {
                    offset: 1,
                    color: "#A2A2A2"
                  }
                ]),
                barBorderRadius: 12
              }
            },
            data: dataY0,
          },
          {
            name: "三板公司",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#FBCE9A"
                  },
                  {
                    offset: 1,
                    color: "#F6BE26"
                  }
                ]),
                barBorderRadius: 11
              }
            },
            data: dataY1,
          },
          {
            name: "四板公司",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#5FB9E9"
                  },
                  {
                    offset: 1,
                    color: "#5899CB"
                  }
                ]),
                barBorderRadius: 11
              }
            },
            data: dataY2,
          },
          {
            name: "已私募融资公司",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  
                  {
                    offset: 0,
                    color: "#EA6167"
                  },
                  {
                    offset: 1,
                    color: "#CF111B"
                  }
                ]),
                barBorderRadius: 11
              }
            },
            data: dataY3,
          }
        ]
      };
      document.getElementById("charts").removeAttribute("_echarts_instance_");
      let myChart = this.$echarts.init(document.getElementById("charts"));
      myChart.setOption(option, true);

      myChart.on("click", function(params) {
        self.paramsName = params.name;
        self.click();
      });
    },
    click() {
      var self = this;
      self.activeName = "2";
      self.dialogVisible = true;
      self.page = 1
      self.qufenziduan = "2"
      this.request("2");
    },
    handleClick(tab, event) {
      var self = this;
      // console.log(tab.name,"name");
      self.page = 1;
      this.request(tab.name);
      this.qufenziduan = tab.name;
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
      // console.log(`当前页: ${val}`);
      self.page = val;
       //分页--判断当前页是否为最后一页，禁用右按钮  start
        var cot =  Math.ceil(self.total/10)
        self.suibian=false  //是否禁用首页按钮
        //分页--判断当前页是否为最后一页，禁用右按钮  end
      // console.log(self.page);
      if(self.qufenziduan == ''){
        self.request("2");
      }
      if(self.qufenziduan != ''){
        console.log(self.qufenziduan,"字段不为空的时候")
        self.request(self.qufenziduan);
      }
    },
    request(suoshuzbsc) {
      var self = this;
      // console.log(right[0].getAttribute("disabled"),"right")
      // right[0].disabled=''
      if(self.paramsName){
        self.paramsName = self.paramsName.replace("\n","")
      }
      // console.log(this.paramsName,"sszbsc")
      self.loading = true;
      let params = {
        page: this.page,
        limit: 10,
        suoshusf: this.suoshusf,
        suoshucs: this.suoshucs,
        suoshuqx: this.suoshuqx,
        suoshucyl: self.paramsName,
        zibenscdy: suoshuzbsc
      };
      this.axios({
        url: this.api.ChartTk,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(suoshuzbsc,"name")
        var right = document.getElementsByClassName('btn-next')
        right[0].disabled=''
        self.tableData = res.data.data;
        this.total = res.data.count;
        // 下一页disabled --start
        var cot =  Math.ceil(self.total/10)
        if(suoshuzbsc == 2){
          if(cot <= self.page){
            right[0].disabled="disabled"
          }else {
            right[0].disabled=""
          }
        } else if(suoshuzbsc == 3){
          if(cot <= self.page){
            right[1].disabled="disabled"
          }else {
            right[1].disabled=""
          }
        }else if(suoshuzbsc == 4){
          if(cot <= self.page){
            right[2].disabled="disabled"
          }else{
            right[2].disabled=""
          }
        }else if(suoshuzbsc == 5){
          if(cot <= self.page){
            right[3].disabled="disabled"
          }else{
            right[3].disabled=""
          }
        }
        if(self.page==1){
            self.suibian=true
        }
        // 下一页disabled --end
        self.loading = false;
      });
    },
    dialog_close() {
      this.dialogVisible = false;
    }
  }
};
</script>