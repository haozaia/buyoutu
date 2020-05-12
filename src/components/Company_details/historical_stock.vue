<template>
  <div slot="historical_stock" id="historical_stock">
    <div class="companyContent">
    <section class="block box-shadow" id="recruitmentInformation">
      <header class="block-header">
        <div class="block-title">
          <i class="icon icon-tips"></i>
          <span>历史股价</span>
        </div>
      </header>
      <div class="licenceTable lineTable el-tabs">
        <div class="query-result">
          <div class="table-wrapper">
            <el-table stripe :data="licenceTable" style="width: 100%">
              <el-table-column prop="num" label="交易日期" >2019.01.02</el-table-column>
              <el-table-column prop="name" label="开盘价(元)" >0.00</el-table-column>
              <el-table-column prop="address" label="收盘价(元)">1.24</el-table-column>
              <el-table-column prop="money" label="最高价(元)">0.00</el-table-column>
              <el-table-column prop="peopleNum" label="最低价(元)">0.00</el-table-column>
              <el-table-column prop="contory" label="涨跌幅(%)">0.00</el-table-column>
              <el-table-column prop="contory" label="成交数量(万股)">0.00</el-table-column>
              <el-table-column prop="contory" label="成交金额(万元)">0.00</el-table-column>
            </el-table>
          </div>
        </div>
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </section>
  </div>
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
      
      licenceTable: [{}, {}, {}, {}, {},{},{},{},{},{}],
    };
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
</style>