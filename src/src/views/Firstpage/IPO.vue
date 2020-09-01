<template>
  <div id="IPO">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title">启动IPO公司</div>
        <div class="el-tabs">
          <div class="form-wrapper">
            <form class="form-inline" role="form">
              <div class="form-group">
                <span class="control-label">轮次 :</span>
                  <el-select v-model="value" placeholder="请选择轮次">
                    <el-option
                      v-for="item in years"
                      :key="item.value"
                      :label="item.label"
                      :value="item.text"
                    ></el-option>
                  </el-select>
              </div>

              <div class="form-group">
                <div class="ui-input ui-input-search">
                  <i class="el-icon-search"></i>
                  <input class="key" placeholder="公司名称/券商名称/关键字" type="text" autocomplete="off" />
                </div>
              </div>

              <div class="form-group">
                <button class="btn btn-query btn-action" type="button" role="button">
                  <span class="chaxun">查询</span>
                  <i class="icon-loading icon-loading-white a-spin"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <section class="block box-shadow overviewLayer">
          <header class="block-header">
            <div class="block-title">
              <i class="icon icon-tips"></i>
              <span class="titleStyle">启动辅导尚未申请公司</span>
              <span class="totalText">共 </span>
              <span class="countNum">1982</span>
              <span class="textUnit"> 家</span>
            </div>
          </header>
          <div class="el-tabs padding10">
                <div class="query-result">
                  <div class="table-wrapper">
                    <el-table stripe :data="tableData" style="width: 100%">
                      <el-table-column prop="date" label="公司名称" width="150">
                        <template>
                          <router-link
                            style="color:#606266;text-decoration:none;"
                            :to="{ path:'#'}"
                          >
                            <span class="stock-name">中大股份</span>
                            <small class="stock-code">(835483)</small>
                          </router-link>
                        </template>
                      </el-table-column>
                      <el-table-column prop="years" label="启动辅导时间">2019-10-11</el-table-column>
                      <el-table-column prop="years" label="公司类型">三板公司已终止挂牌,未挂牌上市公司</el-table-column>
                      <el-table-column prop="years" label="保荐券商">海通证券股份有限公司</el-table-column>
                    </el-table>
                  </div>
                </div>

                <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
              </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IPO",
  data() {
    return {
      value:'',
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
      ],
      years: [
        { text: "制造业", value: "0" },
        { text: "互联网", value: "1" },
        { text: "卖土豆", value: "2" },
        { text: "务农", value: "3" }
      ]
    };
  },
  mounted() {
    // var self = this;
  },
  updated() {},
  beforeDestroy() {},

  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>

<style lang="scss">
#IPO {
  .C_container {
    background: #fff;
    .titleStyle {
      font-weight: 400;
    }
    .totalText {
      font-weight: 700;
      margin-left: 20px;
    }
    .countNum {
      font-weight: 700;
      padding: 0 8px;
      color: #fff;
      background: #c03532;
      border-radius: 8px;
    }
  }
  .el-tabs {
    margin-bottom: 0;
}
}
</style>