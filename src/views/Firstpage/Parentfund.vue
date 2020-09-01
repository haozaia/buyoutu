<template>
  <div id="Parentfund">
    <section class="block box-shadow overviewLayer">
      <!-- <header class="block-header">
        <div class="block-title">
          <i class="icon icon-tips unset"></i>
          <span>母基金列表</span>
        </div>
      </header> -->
      <div id="C_content">
      <div class="C_title">
        <span class="Title_left"></span>母基金列表
      </div>
      </div>
      <div class="el-tabs padding10">
        
        <div class="query-result">
        <div style="padding-top:25px;"></div>
          <div class="table-wrapper">
            <el-table stripe :data="tableData" style="width: 100%">
              <el-table-column prop="gongsiname" label="基金名称">
                <template slot-scope="scope">
                  <router-link
                    style="color:#606266;text-decoration:none;"
                     target="_blank" tag="a" 
                    :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                  >{{ scope.row.gongsiname }}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="guanlijtzjjs" label="管理及投资基金数"></el-table-column>
              <el-table-column prop="xiashujjstgss" sortable="custom" label="下属基金所投公司数"></el-table-column>
              <el-table-column prop="shejiaggss" label="涉及A股公司数"></el-table-column>
              <el-table-column prop="shejisanbgss" label="涉及三板公司数"></el-table-column>
              <el-table-column prop="shejisibgss" label="涉及四板公司数"></el-table-column>
            </el-table>
          </div>
        </div>

       <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="20"
          :total="total"
        ></el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      total:0,
      page:1
    };
  },
  mounted() {
    var self = this;
    self.tableList();
  },
  methods: {
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      // console.log(self.page);
      self.tableList();
    },
    sortChange: function(column) {
      // console.log(column + "-" + column.prop + "-" + column.order);
    },

    tableList() {
      var self = this;
      let params = {
        page: self.page,
        limit: 20
      };
      this.axios({
        data: this.$qs.stringify(params),
        url: this.api.ParentFund,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData = res.data.data;
        self.total = res.data.count;
      });
    }
  }
};
</script>

<style lang="scss">
#Parentfund{
  .el-table__row>td:first-child{
    text-align: left !important;
  }
}
</style>