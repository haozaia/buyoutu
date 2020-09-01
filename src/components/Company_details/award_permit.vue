<template>
  <div slot="award_permit">
    <div class="companyContent">
      <div>
        <section class="block box-shadow" id="recruitmentInformation" v-if="tableData != 0">
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">政府奖励</span>
            <span class="inline colorH fontSize18">&nbsp;{{totals}}</span>
            </div>
          </header>
          <div class="licenceTable lineTable el-tabs">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData" style="width: 100%">
                  <el-table-column prop="jianglimc" label="奖励名称"></el-table-column>
                  <el-table-column prop="jianglixm" label="奖励项目">
                    <template slot-scope="{row}">{{ row.jianglixm || '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="ziduanqufen" label="奖励级别">
                    <template slot-scope="scope">
                      <span v-if="scope.row.ziduanqufen=='a'">国家级</span>
                      <span v-if="scope.row.ziduanqufen=='b'">省级</span>
                      <span v-if="scope.row.ziduanqufen=='c'">市级</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="suoshudy" label="所属地域"></el-table-column>
                </el-table>
              </div>
            </div>
            <el-pagination
              v-show="total>10"
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="10"
              :total="totals"
              background
            ></el-pagination>
          </div>
        </section>

        <section class="block box-shadow" id="recruitmentInformation" v-if="licenceTable != 0">
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">公司拥有证照</span>
            <span class="inline colorH fontSize18">&nbsp;{{total}}</span>
            </div>
          </header>
          <div class="licenceTable lineTable el-tabs">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="licenceTable" style="width: 100%">
                  <el-table-column prop="gongsiname" label="公司名称"></el-table-column>
                  <el-table-column prop="zhengzhaolx" label="证照类型"></el-table-column>
                  <el-table-column prop="xukezbh" label="牌照编号"></el-table-column>
                  <el-table-column prop="fazhengrq" label="发证日期"></el-table-column>
                  <el-table-column prop="fazhengjg" label="发证机构"></el-table-column>
                  <!-- <el-table-column prop="chakanzz" label="查看证照"></el-table-column> -->
                </el-table>
              </div>
            </div>
            <el-pagination
              v-show="totals>10"
              layout="prev, pager, next"
              @current-change="handleCurrentChanges"
              :page-size="10"
              :total="totalss"
              background
            ></el-pagination>
          </div>
        </section>

        <section class="block box-shadow" id="recruitmentInformation" v-if="tableData1 != 0">
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">公司制定标准</span>
            <span class="inline colorH fontSize18">&nbsp;{{totalss}}</span>
            </div>
          </header>
          <div class="licenceTable lineTable el-tabs">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData1" style="width: 100%">
                  <el-table-column prop="liangdian" label="标准类型"></el-table-column>
                  <el-table-column prop="gongsilx" label="公司类型"></el-table-column>
                  <el-table-column prop="zhuczb" label="注册资本(万元)"></el-table-column>
                  <el-table-column prop="zhuguanbm" label="主管单位">
                    <template slot-scope="{row}">{{ row.zhuguanbm || '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="biaozhunmc" label="标准名称"></el-table-column>
                  <el-table-column prop="biaozhunh" label="标准编号"></el-table-column>
                  <el-table-column prop="faburq" label="发布日期"></el-table-column>
                  <el-table-column prop label="详情" width="100">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="left" width="500">
                        <p>
                          <b>起草单位</b>
                          : {{ scope.row.qicaodw }}
                        </p>
                        <br />
                        <p>
                          <b>归口单位</b>
                          : {{ scope.row.guikoudw }}
                        </p>
                        <br />
                        <p>
                          <b>中国标准分类号</b>
                          : {{ scope.row.zhongguobz }}
                        </p>
                        <br />
                        <p>
                          <b>采标情况</b>
                          : {{ scope.row.caibiaoqk }}
                        </p>
                        <br />
                        <p>
                          <b>起草人</b>
                          : {{ scope.row.qicaoren }}
                        </p>
                        <br />
                        <p>
                          <b>国际标准分类号</b>
                          : {{ scope.row.guojibiaozflh }}
                        </p>
                        <div slot="reference" class="name-wrapper">
                          <el-tag size="medium">详情</el-tag>
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <el-pagination
              v-show="total>10"
              layout="prev, pager, next"
              @current-change="handleCurrentChangess"
              :page-size="10"
              :total="totalss"
              background
            ></el-pagination>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
      licenceTable: [],
      gongsiname: "",
      total: 0,
      page: 1,
      tableData: [],
      tableData1: [],
      totals: 0,
      totalss: 0,
      pages: 1,
      pagess: 1
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.getList();
    self.tableList();
    self.tableList1();
  },
  methods: {
    handleCurrentChanges(val) {
      var self = this;
      self.page = val;
      console.log(self.page);
      self.getList(val, 20);
    },
    handleCurrentChange(val) {
      var self = this;
      self.pages = val;
      console.log(self.page);
      self.tableList();
    },
    handleCurrentChangess(val) {
      var self = this;
      self.pages = val;
      console.log(self.pagess);
      self.tableList1();
    },
    getList() {
      var self = this;
      let params = {
        page: self.page,
        gongsiname: self.gongsiname,
        limit: 10
      };
      this.axios({
        url: this.api.zhengfuList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.licenceTable = res.data.data;
        self.total = res.data.count;
      });
    },
    tableList() {
      var self = this;
      let params = {
        page: self.pages,
        limit: 10,
        gongsiname: self.gongsiname
      };
      this.axios({
        url: this.api.zhengzhaoList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.tableData = res.data.data;
        self.totals = res.data.count;
      });
    },
    tableList1() {
      var self = this;
      let params = {
        page: self.pages,
        limit: 10,
        gongsiname: self.gongsiname
      };
      this.axios({
        url: this.api.biaozhunList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.tableData1 = res.data.data;
        self.totalss = res.data.count;
      });
    }
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";
</style>