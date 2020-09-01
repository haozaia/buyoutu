<template>
  <div slot="intellectual">
    <div class="companyContent">
      <div>
        
        <div class="table-list" v-if="tableData1 != 0">
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">商标信息</span>
            <span class="inline colorH fontSize18">&nbsp;{{total1}}</span>

            </div>
          </header>
          <div class="licenceTable lineTable el-tabs">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData1" style="width: 100%">
                  <el-table-column prop="shenqingrq" label="申请日期" width="180"></el-table-column>
                  <!-- <el-table-column prop="shangbiao" label="商标"></el-table-column> -->
                  <el-table-column prop="shangbiaomc" label="商标名称"></el-table-column>
                  <el-table-column prop="zhuceh" label="注册号"></el-table-column>
                  <el-table-column prop="liuchengzt" label="流程状态"></el-table-column>
                  <el-table-column prop="shangpinfwlb" label="商品服务列表">
                    <template slot-scope="{row}">{{ row.shangpinfwlb || '-' }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange1"
            :page-size="20"
            :total="total1"
            background
          ></el-pagination>
        </div>

        <div class="table-list" v-if="tableData3 != 0">
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">网站备案列表</span>
            <span class="inline colorH fontSize18">&nbsp;{{total3}}</span>

            </div>
          </header>
          <div class="licenceTable lineTable el-tabs">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData3" style="width: 100%">
                  <el-table-column prop="wangzhanmc" label="网站名称"></el-table-column>
                  <el-table-column prop="wangzhansy" label="网站首页"></el-table-column>
                  <el-table-column prop="yuming" label="域名"></el-table-column>
                  <el-table-column prop="beianh" label="备案号"></el-table-column>
                  <el-table-column prop="danweixz" label="单位性质">
                    <template slot-scope="{row}">{{ row.danweixz || '-' }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange3"
            :page-size="20"
            :total="total3"
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
      total1: 0,
      total3: 0,
      page1: 1,
      page3: 1,
      tableData1: [],
      tableData3: []
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.getList1();
    self.getList3();
  },
  methods: {
    handleCurrentChange1(val) {
      var self = this;
      self.page1 = val;
      self.getList1(val, 20);
    },
    getList1() {
      var self = this;
      let params = {
        page: self.page1,
        gongsiname: self.gongsiname,
        limit: 20
      };
      this.axios({
        url: this.api.shangbiaoxx,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData1 = res.data.data;
        self.total1 = res.data.count;
      });
    },
    handleCurrentChange3(val) {
      var self = this;
      self.page3 = val;
      self.getList3(val, 20);
    },
    getList3() {
      var self = this;
      let params = {
        page: self.page3,
        gongsiname: self.gongsiname,
        limit: 20
      };
      this.axios({
        url: this.api.wangzhanba,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData3 = res.data.data;
        self.total3 = res.data.count;
      });
    }
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";
</style>