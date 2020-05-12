<template>
  <div slot="intellectual">
    <div class="companyContent">
      <div class="table-list borderBottom10">
        <header>
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>实际控制人变更</span>
          </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="自然人/公司名称">王亮</el-table-column>
                <el-table-column prop="name" label="股东地位" width="180">实际控制人</el-table-column>
                <el-table-column prop="address" label="成为控股股东/实控人时间">2016-06-30</el-table-column>
                <el-table-column prop="money" label="退出控股股东/实控人时间">--</el-table-column>
                <el-table-column prop="years" label="股东关联关系">朱军、朱艳与王靓签署《一致行动协议》</el-table-column>
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
            <span>股权变动</span>
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
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
      <div class="table-list borderBottom10">
        <header>
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>限售解禁</span>
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
      tableData: [{}, {}, {}, {}, {}, {}],

      tableData1: []
    };
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
</style>