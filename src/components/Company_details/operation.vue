<template>
  <div slot="operation">
    <div class="companyContent">
      <section class="block box-shadow" id="recruitmentInformation" v-if="recruitTable.length !=0">
        <header class="block-header">
          <div class="block-titles fontSize20">
            <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
            <span class="inline">产品信息</span>
            <span class="inline colorH fontSize18">&nbsp;{{total}}</span>
          </div>
        </header>
        <div class="recruitTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="recruitTable" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="80">
                  <template slot-scope="scope">{{scope.$index +1}}</template>
                </el-table-column>
                <el-table-column prop="chaopinmc" label="项目名称"></el-table-column>
                <el-table-column prop="rongzilc" label="最新融资轮次"></el-table-column>
                <el-table-column prop="chenglirq" label="成立时间"></el-table-column>
                <el-table-column prop="suoshudi" label="所属地"></el-table-column>
                <el-table-column prop="chanpinjc" label="项目简介"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </section>
      <section class="block box-shadow" id="recruitmentInformation" v-if="recruitTables.length !=0">
        <header class="block-header">
          <div class="block-titles fontSize20">
            <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
            <span class="inline">竞品信息</span>
            <span class="inline colorH fontSize18">&nbsp;{{totals}}</span>
            <el-button class="rtPark floatR" style="margin-right:30px;margin-top: 10px;" @click="download" v-if="unitCode==3" :disabled="primary" type="primary">导出</el-button>
          </div>
        </header>
        <div class="recruitTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="recruitTables" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="80">
                  <template slot-scope="scope">{{scope.$index +1}}</template>
                </el-table-column>
                <el-table-column prop="chaopinmc" label="竞品项目名称" width="200"></el-table-column>
                <el-table-column prop="rongzilc" label="最新融资轮次" width="200"></el-table-column>
                <el-table-column prop="chenglirq" label="成立时间" width="200"></el-table-column>
                <el-table-column prop="chanpinjc" label="项目简介"></el-table-column>
                <el-table-column prop="suoshugongs" label="所属企业">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.suoshugongs) }}"
                    >{{ scope.row.suoshugongs }}</router-link>
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
      totals: 0,
      companyList: {},
      primary: false,
      unitCode:'',
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.unitCode = localStorage.getItem("unitCode");
    self.getList("产品信息");
    self.getList("竞品信息");
  },
  methods: {
    download() {
      var self = this;
      self.primary = true;
      let url =
        self.api.exportlistjingpingapi +
        "?gongsiname=" +
        self.gongsiname.replace("+", "%2B");
      window.location.href = url; //  跳转链接
    },
    handleCurrentChange(val) {
      var self = this;
      console.log(`当前页: ${val}`);
      self.page = val;
      console.log(self.page);
      self.getList(val, 20);
    },
    getList(name) {
      var self = this;
      let params = {
        page: self.page,
        gongsiname: self.gongsiname,
        chanpinqu: name,
        limit: 20
      };
      this.axios({
        url: this.api.JingpinList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (name == "产品信息") {
          self.recruitTable = res.data.data;
          self.total = res.data.count;
        } else {
          self.recruitTables = res.data.data;
           self.totals = res.data.count;
        }
      });
    }
  }
};
</script>  