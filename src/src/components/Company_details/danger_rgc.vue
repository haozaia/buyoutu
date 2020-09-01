<template>
  <div slot="danger_rgc" class="danger_rgc">
    <div class="companyContent">
      <div class="table-list" v-if="tableData2 != 0">
        <header class="block-header">
          <div class="block-titles fontSize20">
            <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
            <span class="inline">法律诉讼</span>
            <span class="inline colorH fontSize18">&nbsp;{{total2}}</span>

          </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData2" style="width: 100%">
                <el-table-column prop="riqi" label="日期" width="180"></el-table-column>
                <el-table-column prop="anyou" label="案由"></el-table-column>
                <el-table-column prop="anhao" label="案号"></el-table-column>
                <el-table-column prop="anjiansf" label="案件身份"></el-table-column>
                <el-table-column prop="anjianmc" label="案件名称">
                  <template slot-scope="scope">
                    <span v-if="scope.row.beizhu4 ">
                      <a
                        target="_blank"
                        @click="handleTarget(scope.row.beizhu4)"
                      >{{scope.row.anjianmc}}</a>
                    </span>
                    <span v-else>{{scope.row.anjianmc}}</span>
                  </template>
                </el-table-column>
              </el-table>
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
      </div>
      <div class="table-list" v-if="tableData1 != 0">
        <header class="block-header">
          <div class="block-titles fontSize20">
            <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
            <span class="inline">开庭公告</span>
            <span class="inline colorH fontSize18">&nbsp;{{total1}}</span>

          </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData1" style="width: 100%">
                <el-table-column prop="kaitingrq" label="开庭日期" width="180">
                  <template slot-scope="scope">{{scope.row.kaitingrq.substring(0, 11)}}</template>
                </el-table-column>
                <el-table-column prop="anhao" label="案号"></el-table-column>
                <el-table-column prop="yuangao/ssr" label="原告/上诉人"></el-table-column>
                <el-table-column prop="fayuan" label="法院"></el-table-column>
                <el-table-column prop="beigao/ssr" label="被告/上诉人"></el-table-column>
              </el-table>
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
      </div>

      <div class="table-list" v-if="tableData != 0">
        <header class="block-header">
          <div class="block-titles fontSize20">
            <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
            <span class="inline">金融监管处罚</span>
            <span class="inline colorH fontSize18">&nbsp;{{total}}</span>
          </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
                <el-table-column prop="faburq" label="发布日期" width="180"></el-table-column>
                <el-table-column prop="jianguancflx" label="监管处罚类型"></el-table-column>
                <el-table-column prop="jianguanjg" label="监管机构"></el-table-column>
                <el-table-column prop="shejidx" label="涉及对象"></el-table-column>
                <el-table-column prop="jianguancfwj" label="监管处罚文件"></el-table-column>
              </el-table>
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

      <!-- <div class="table-list">
        <header>
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>法院公告</span>
          </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
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
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
      </div>-->
      <el-dialog
        :title=" Base64.decode($route.query.name) +'- 风险合规'"
        :visible.sync="dialogVisible"
        width="938px"
      >
        <div class="iframeWappers">
          <iframe class="iframeTables" scrolling="auto" seamless frameborder="0" :src="href"></iframe>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      gongsiname: "",
      total: 0,
      total1: 0,
      total2: 0,
      page: 1,
      page1: 1,
      page2: 1,
      tableData: [],
      tableData1: [],
      tableData2: [],
      href: ""
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.getList();
    self.getList1();
    self.getList2();
  },
  methods: {
    handleTarget(url) {
      var self = this;
      self.href = url;
      self.dialogVisible = true;
    },
    toRescue(url) {
      if (url) {
        console.log(url.substr(0, 7).toLowerCase() == "http://", 222);
        return url.substr(0, 7).toLowerCase() == "http://";
      } else {
        console.log(false, 33);
        return false;
      }
    },
    toRescues(url) {
      if (url) {
        console.log(url.substr(0, 8).toLowerCase() == "https://", 222);
        return url.substr(0, 8).toLowerCase() == "https://";
      } else {
        console.log(false, 33);
        return false;
      }
    },
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
        url: this.api.jrjgcflistapi,
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
        url: this.api.ktgglistapi,
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
        url: this.api.flsslistapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData2 = res.data.data;
        self.total2 = res.data.count;
      });
    }
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";
.danger_rgc {
  .iframeWappers {
    position: relative;
    overflow: hidden;
    height: 470px;
    width: 100%;
  }
  .iframeTables {
    width: calc(100% + 30px);
    height: 624px;
    position: absolute;
    top: -130px;
  }
}
</style>