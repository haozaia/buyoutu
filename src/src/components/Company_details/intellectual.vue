<template>
  <div slot="intellectual">
    <div class="companyContent">
      <div>
        <div class="table-list" v-if="tableData != 0">
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">专利</span>
            <span class="inline colorH fontSize18">&nbsp;{{total}}</span>
            </div>
          </header>
          <div class="licenceTable lineTable el-tabs">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData" style="width: 100%">
                  <el-table-column prop="shenqinggbr" label="申请公布日" width="180"></el-table-column>
                  <el-table-column prop="zhuanlimc" label="专利名称"></el-table-column>
                  <el-table-column prop="shenqingh" label="申请号">
                    <template slot-scope="{row}">{{ row.shenqingh || '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="shenqinggbh" label="申请公布号"></el-table-column>
                  <el-table-column prop="zhuanlilx" label="专利类型"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="20"
            :total="total"
            background
          ></el-pagination>
        </div>
       
      </div>
    </div>
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
      gongsiname: "",
      total: 0,
      page: 1,
      tableData: [],
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.getList();
    // self.getList1();
    // self.getList2();
    // self.getList3();
  },
  methods: {
    handleCurrentChange(val) {
      var self = this;
      self.page = val;
      self.getList(val, 20);
    },
    getList() {
      var self = this;
      let params = {
        page: self.page,
        gongsiname: self.gongsiname,
        limit: 20
      };
      this.axios({
        url: this.api.zhuanli,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData = res.data.data;
        self.total = res.data.count;
      });
    },
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";
</style>