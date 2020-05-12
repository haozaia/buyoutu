<template>
  <div slot="operation">
    <div class="companyContent">
      <section class="block box-shadow" id="recruitmentInformation">
        <header class="block-header">
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>企业年报信息</span>
          </div>
        </header>
        <div class="recruitTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="recruitTable" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="50">
                  <template slot-scope="scope">
                      {{scope.$index +1}}
                    </template>
                </el-table-column>
                <el-table-column prop="reportyear" label="报送年度"></el-table-column>
                <el-table-column prop="publicdate" label="公示日期"></el-table-column>
                <el-table-column label="详情">
                  <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/annualReportsDetails', query: { BaseName: Base64.encode(scope.row.entname),reportyear: Base64.encode(scope.row.reportyear) }}"
                      >查看</router-link>
                    </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>  
  
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      recruitTable: [],
      recruitTables: [],
      pieDate: [],
      page: 1,
      LineX: [],
      LineY: [],
      gongsiname: "",
      total: 0,
      companyList:{}
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.getList();
  },
  methods: {
    handleCurrentChange(val) {
      var self = this;
      console.log(`当前页: ${val}`);
      self.page = val;
      console.log(self.page);
      self.getList(val, 20);
    },
    getList() {
      var self = this;
      let params = {
        entname: self.gongsiname,
      };
      this.axios({
        url: this.api.NBbaselistapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
          self.recruitTable = res.data.data;
          self.total = res.data.count;
      });
    },
  }
};
</script>  