<template>
  <div slot="intellectual">
    <div class="companyContent">
      <div >
        <div class="table-list"  v-if="tableData != 0">
          <header>
            <div class="block-title">
              <i class="icon icon-tips"></i>
              <span>专利</span>
            </div>
          </header>
          <div class="licenceTable lineTable el-tabs">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData" style="width: 100%">
                  <el-table-column prop="shenqinggbr" label="申请公布日" width="180"></el-table-column>
                  <el-table-column prop="zhuanlimc" label="专利名称"></el-table-column>
                  <el-table-column prop="shenqingh" label="申请号">
                    <template slot-scope="{row}">
                    {{ row.shenqingh || '-' }}
                  </template>
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
        <div class="table-list" v-if="tableData1 != 0">
          <header>
            <div class="block-title">
              <i class="icon icon-tips"></i>
              <span>商标信息</span>
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
                    <template slot-scope="{row}">
                    {{ row.shangpinfwlb || '-' }}
                  </template>
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

        <div class="table-list" v-if="tableData2 != 0">
          <header>
            <div class="block-title">
              <i class="icon icon-tips"></i>
              <span>软件著作权</span>
            </div>
          </header>
          <div class="licenceTable lineTable el-tabs">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData2" style="width: 100%">
                  <el-table-column prop="pizhunrq" label="批准日期" width="180"></el-table-column>
                  <el-table-column prop="ruanjianqc" label="软件全称"></el-table-column>
                  <el-table-column prop="ruanjianjc" label="软件简称"></el-table-column>
                  <el-table-column prop="dengjih" label="登记号"></el-table-column>
                  <el-table-column prop="fenleih" label="分类号">
                    <template slot-scope="{row}">
                    {{ row.fenleih || '-' }}
                  </template>
                  </el-table-column>
                  <el-table-column prop="banbenh" label="版本号"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange2"
            :page-size="20"
            :total="total2"
            background
          ></el-pagination>
        </div>

        <div class="table-list" v-if="tableData3 != 0">
          <header>
            <div class="block-title">
              <i class="icon icon-tips"></i>
              <span>网站备案列表</span>
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
                    <template slot-scope="{row}">
                    {{ row.danweixz || '-' }}
                  </template>
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
      total: 0,
      total1: 0,
      total2: 0,
      total3: 0,
      page: 1,
      page1: 1,
      page2: 1,
      page3: 1,
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: []
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.getList();
    self.getList1();
    self.getList2();
    self.getList3();
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
    handleCurrentChange2(val) {
      var self = this;
      self.page2 = val;
      self.getList2(val, 20);
    },
    getList2() {
      var self = this;
      let params = {
        page: self.page2,
        gongsiname: self.gongsiname,
        limit: 20
      };
      this.axios({
        url: this.api.ruanjianzzq,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData2 = res.data.data;
        self.total2 = res.data.count;
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