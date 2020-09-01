<template>
  <div slot="research_report" id="research_report">
    <div class="companyContent">
      <section class="block box-shadow" id="recruitmentInformation">
        <header class="block-header">
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>公司公告列表</span>
          </div>
        </header>

        <div class="form-wrapper">
          <form class="form-inline" role="form">
            <div class="inlineBlock">
              <div class="block">
                <span class="demonstration">公告时间：</span>
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
            </div>
            <div class="input-wapper">
              <el-input v-model="input" placeholder="请输入券商名称关键字"></el-input>
            </div>
            <div class="input-wapper">
              <el-input v-model="input" placeholder="请输入行业关键字"></el-input>
            </div>
            <div class="input-wapper">
              <el-button type="primary">查询</el-button>
            </div>
          </form>
        </div>
        <div class="form-wrapper">
          <form class="form-inline" role="form">
            <el-radio-group class="demonstration" v-model="radio">
              <el-radio :label="3">全部研报</el-radio>
              <el-radio :label="6">相关公司研报</el-radio>
              <el-radio :label="9">相关行业研报</el-radio>
            </el-radio-group>
          </form>
        </div>

        <div class="licenceTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="licenceTable" style="width: 100%">
                <el-table-column prop="num" label="公司简称">东方龙商务有限公司</el-table-column>
                <el-table-column prop="name" label="标题" width="180">
                  <a
                    href="http://report.seeyii.com/proxy/reportShow.html?target=aHR0cDovL3d3dy5uZWVxLmNvbS5jbi9kaXNjbG9zdXJlLzIwMTkvMjAxOS0wOC0xNi8xNTY1OTQzNDAxXzU2ODAyMS5wZGY=&title=W+S4tOaXtuWFrOWRil3lpKnpqbDmlrDmnZA656ys5LqM5bGK6JGj5LqL5Lya56ys5YWt5qyh5Lya6K6u5Yaz6K6u5YWs5ZGK"
                    target="_blank"
                  >2019.01.02</a>
                </el-table-column>
                <el-table-column prop="address" label="日期">研发</el-table-column>
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
      input: "",
      time: "",
      radio: 3,
      licenceTable: []
    };
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
</style>