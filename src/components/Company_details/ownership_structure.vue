<template>
  <div slot="ownership_structure" id="ownership_structure">
    <div class="companyContent">
      <div class="table-list borderBottom10">
        <header>
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>股本结构</span>
          </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="时间">王亮</el-table-column>
                <el-table-column prop="name" label="总股本(万股)" width="180">实际控制人</el-table-column>
                <el-table-column prop="address" label="无限售股(万股)">2016-06-30</el-table-column>
                <el-table-column prop="money" label="有限售股(万股)">--</el-table-column>
                <el-table-column prop="years" label="变动原因">朱军、朱艳与王靓签署《一致行动协议》</el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
      <div class="table-list borderBottom10">
        <header>
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>分红情况</span>
          </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData1" style="width: 100%">
                <el-table-column prop="date" label="序号" width="50"></el-table-column>
                <el-table-column prop="name" label="申请日期" width="180"></el-table-column>
                <el-table-column prop="address" label="商标"></el-table-column>
                <el-table-column prop="money" label="商标名称"></el-table-column>
                <el-table-column prop="years" label="注册号"></el-table-column>
                <el-table-column prop="types" label="流程状态"></el-table-column>
                <el-table-column prop="types" label="商品服务列表"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <el-pagination class="borderBottom10" background layout="prev, pager, next" :total="1000"></el-pagination>
        <section class="structure">
          <div id="unlimitedSalePie" class="inlineBlock" :style="{height:'260px',width:'33%'}"></div>
          <div id="controllingPies" class="inlineBlock" :style="{height:'260px',width:'33%'}"></div>
          <div id="dongJianPies" class="inlineBlock" :style="{height:'260px',width:'33%'}"></div>
        </section>
      </div>
      <div class="table-list borderBottom10">
        <header>
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>股权结构</span>
            <div class="input-wapper">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData1" style="width: 100%">
                <el-table-column prop="date" label="序号" width="50"></el-table-column>
                <el-table-column prop="name" label="批准日期" width="180"></el-table-column>
                <el-table-column prop="address" label="软件全称"></el-table-column>
                <el-table-column prop="money" label="软件简称"></el-table-column>
                <el-table-column prop="years" label="登记号"></el-table-column>
                <el-table-column prop="types" label="分类号"></el-table-column>
                <el-table-column prop="types" label="版本号"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
      value: "",
      tableData: [{}, {}, {}, {}, {}, {}],
      tableData1: [],
      options: [
        {
          value: "选项1",
          label: "2019-6-30"
        },
        {
          value: "选项2",
          label: "2018-12-31"
        },
        {
          value: "选项3",
          label: "2018-6-30"
        },
        {
          value: "选项4",
          label: "2017-12-31"
        },
        {
          value: "选项5",
          label: "2017-6-31"
        }
      ]
    };
  },
  mounted() {
    var self = this;
    self.controllingPies();
    self.unlimitedSalePie();
    self.dongJianPies()
  },
  updated() {},
  beforeDestroy() {},

  methods: {
    controllingPies() {
      var self = this;
      self.charts = this.$echarts.init(
        document.getElementById("controllingPies")
      );
      self.charts.setOption({
        title: {
          text: "控股股东和实际控股人股份",
          x: "center",
          bottom: "bottom"
        },
         tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
        color: ["#00C0EF", "#E7EBF5"],
        series: [
          {
            name: "股份占比",
            type: "pie",
            radius: "55%",
            data: [
              { value: 335, name: "控股股东和实际控股人股份" },
              { value: 30, name: "其他股份" }
            ],
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
    unlimitedSalePie() {
      var self = this;
      self.charts = this.$echarts.init(
        document.getElementById("unlimitedSalePie")
      );
      self.charts.setOption({
        title: {
          text: "无限售股份",
          x: "center",
          bottom: "bottom"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#FF7568", "#E7EBF5"],

        series: [
          {
            name: "股份占比",
            type: "pie",
            radius: ["35%", "55%"],
            data: [
              { value: 335, name: "无限售股份" },
              { value: 30, name: "其他股份" }
            ],

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
     dongJianPies() {
      var self = this;
      self.charts = this.$echarts.init(
        document.getElementById("dongJianPies")
      );
      self.charts.setOption({
        title: {
          text: "董监高股份",
          x: "center",
          bottom: "bottom"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#FF7568", "#E7EBF5"],

        series: [
          {
            name: "股份占比",
            type: "pie",
            radius: ["35%", "55%"],
            data: [
              { value: 335, name: "董监高股份" },
              { value: 30, name: "其他股份" }
            ],

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
    }
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
</style>