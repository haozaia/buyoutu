<template>
  <div slot="previous_issue" id="previous_issue">
    <div class="companyContent">
      <section class="block box-shadow" id="recruitmentInformation">
        <header>
          <ul id="Overview-tabs" class="tabs">
            <li class="tab-item">
              <a href="#enterpriseNumber" :class="{active:0==ins}" @click="active(0)">
                <span>利润表</span>
              </a>
            </li>
            <li class="tab-item">
              <a href="#totalInvestment" :class="{active:1==ins}" @click="active(1)">
                <span>资产负债表</span>
              </a>
            </li>
            <li class="tab-item">
              <a href="#totalInvestment" :class="{active:2==ins}" @click="active(2)">
                <span>现金流量表</span>
              </a>
            </li>
          </ul>
        </header>
        <form class="radio-wapper">
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </form>
        <p class="translate">单位：万</p>
        <div class="licenceTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <div class="table-header">
                <el-table stripe :data="licenceTables" style="width: 20%">
                  <el-table-column prop="data" label="账务/时间对比"></el-table-column>
                </el-table>
              </div>

              <el-table stripe :data="licenceTable" style="width: 80%">
                <el-table-column prop="date" :label="times[0]">王亮</el-table-column>
                <el-table-column prop="name" :label="times[1]" width="180">实际控制人</el-table-column>
                <el-table-column prop="address" :label="times[2]">2016-06-30</el-table-column>
                <el-table-column prop="money" :label="times[3]">--</el-table-column>
                <el-table-column
                  prop="years"
                  show-overflow-tooltip
                  :label="times[4]"
                >朱军、朱艳与王靓签署《一致行动协议》</el-table-column>
              </el-table>
            </div>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
      times: [
        "2019-06-31",
        "2018-12-31",
        "2018-6-31",
        "2017-12-31",
        "2017-6-31",
        "2016-12-31",
        "2016-6-31"
      ],
      width: "50",
      licenceTable: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      licenceTables: [
        { data: "一、营业收入" },
        { data: "营业收入" },
        { data: "二、营业总成本" },
        { data: "营业成本" },
        { data: "营业税费/营业税金及附加" },
        { data: "销售费用" },
        { data: "管理费用" },
        { data: "财务费用" },
        { data: "资产减值损失" },
        { data: "投资净收益" },
        { data: "三、营业利润" },
        { data: "加:营业外收入" },
        { data: "减:营业外支出" },
        { data: "四、利润总额" },
        { data: "减:所得税" },
        { data: "五、净利润" },
        { data: "归属于母公司所有者的净利润" },
        { data: "少数股东损益" },
        { data: "基本每股收益(元/股)" },
        { data: "六、综合收益总额" },
        { data: "归属于母公司所有者的综合收益总额" },
        { data: "归属于少数股东的综合收益总额" },
        { data: "七、其他综合收益的税后净额" }
      ],
      ins: 0,
      radio: "1",
      tableData: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    };
  },
  mounted() {},
  methods: {
    active(num) {
      this.ins = num;
    }
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
#previous_issue {
  .radio-wapper {
    background-color: #f6f9fa;
    padding: 10px 20px;
  }
  .translate {
    padding-left: 20px;
  }
  #financeReport .sy-table-left {
    width: 200px;
  }
  .table-header {
    .el-table--fit {
      border-right: 0;
      float: left;
      border-bottom: 0;
      tr:nth-child(1) {
        font-weight: 700;
      }
      tr:nth-child(3) {
        font-weight: 700;
      }
      tr:nth-child(11) {
        font-weight: 700;
      }
      tr:nth-child(14) {
        font-weight: 700;
      }
      tr:nth-child(16) {
        font-weight: 700;
      }
      tr:nth-child(20) {
        font-weight: 700;
      }
      tr:nth-child(23) {
        font-weight: 700;
      }
    }
  }
  .el-table--fit {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>