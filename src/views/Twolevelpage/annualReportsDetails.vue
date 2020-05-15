<template>
  <div id="annualReportsDetails" v-if="hidden == false">
    <div class="cellWapper">
      <div class="content">
        <!-- <div class="report_title">
          <h1 class="tc f24">
            <div
              id="reportName"
              style="color: #ca7976;font-weight:normal;font-size:30px;padding-left:20px;padding-right:20px;position:relative"
            >
              {{recruitTable.reportyear}}年度报告
              <span
                style="font-size:14px;color:#999;position:absolute;top:10px;right:0"
              >
                填报时间:
                <span id="anCheDate">{{recruitTable.publicdate}}</span>
              </span>
            </div>
          </h1>

          <div class="f12 tc g9 mt10">
            <p style="padding-top:0">
              <span id="font" style="font-size:14px">企业年报信息由该企业提供，企业对其年报信息的真实性、合法性负责</span>
            </p>
          </div>
        </div>-->
        <!-- //基本信息 -->
        <div id="annualReportHidden" >
          <div class="annual_primary details clearfix" v-if="recruitTable">
            <div class="classify" id="annualBaseInfoColor1">
              <div class="block"></div>基本信息
            </div>
            <div>
              <div class="overview">
                <dl>
                  <dt class="item">是否有投资信息或购买其他公司股权：</dt>
                  <dd
                    class="result"
                    id="forInvestment"
                  >{{recruitTable.isinvest? recruitTable.isinvest : "否"}}</dd>
                </dl>
                <!-- <dl>
                  <dt class="item_right">是否有网站或网店：</dt>
                  <dd
                    class="result"
                    id="webIsOrNot"
                  >{{recruitTable.isweb? recruitTable.isweb : "否"}}</dd>
                </dl> -->
                <dl>
                  <dt class="item">是否有对外提供担保信息：</dt>
                  <dd
                    class="result"
                    id="forGuaranteeinfo"
                  >{{recruitTable.isguaranty? recruitTable.isguaranty : "否"}}</dd>
                </dl>
                <dl>
                  <dt class="item_right">有限责任公司本年度是否发生股东股权转让：</dt>
                  <dd
                    class="result"
                    id="alterStockInfo"
                  >{{recruitTable.isstockalter? recruitTable.isstockalter : "否"}}</dd>
                </dl>
                <!-- <dl style="width:100%">
                  <dt class="item">企业主营业务活动:</dt>
                  <dd class="result" id="mainBusiAct">{{recruitTable.businessscope}}</dd>
                </dl> -->
              </div>
            </div>
          </div>
           <!-- 产业资产状况信息 -->
          <div class="annual_assert" id="oneAss"  v-if="NBasse">
            <div class="classify" id="annualAssetsColor1">
              <div class="block"></div>企业资产状况信息(万元)
            </div>
            <table class="display" id="needPaging_assert">
              <tbody>
                <tr>
                  <th>资产总额</th>
                  <td id="assGroDisIs">{{NBasse.totalasset}}</td>
                  <th>所有者权益合计</th>
                  <td id="totEquDisIs">{{NBasse.totalownerequity}}</td>
                </tr>
                <tr>
                  <th>营业总收入</th>
                  <td id="vendIncDisIs" style="background:#f7f8fa">{{NBasse.totalsale}}</td>
                  <th>利润总额</th>
                  <td id="proGroDisIs" style="background:#f7f8fa">{{NBasse.totalprofit}}</td>
                </tr>
                <tr>
                  <th>营业总收入中主营业务收入</th>
                  <td id="maiBusIncDisIs">{{NBasse.totalmainbusiness}}</td>
                  <th>净利润</th>
                  <td id="netIncDisIs">{{NBasse.totalnetprofit}}</td>
                </tr>
                <tr>
                  <th>纳税总额</th>
                  <td id="ratGroDisIs" style="background:#f7f8fa">{{NBasse.totaltax}}</td>
                  <th>负债总额</th>
                  <td id="liaGroDisIs" style="background:#f7f8fa">{{NBasse.totalliability}}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 网站信息 -->
          <!-- <div class="annual_onlineshop">
            <div class="classify rel" id="annualWebAll">
              <span id="annualWebColor">
                <div class="block"></div>网站或网店信息
              </span>
              <span class="personCount">
                <span id="webCount">共计 {{NBweb.length}} 条信息</span>
              </span>
            </div>

            <div id="needPaging_onlineshop" class="clearfix">
              <ul class="webSite-list" style="float: left;" id="webSiteList">
                <li v-for="(item,index) in NBweb" :key="index">
                  <span >
                    <div
                      style="font-size:14px;color:#333333;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                      :title="item.sitename"
                    >{{item.sitename}}</div>
                    <span style="font-size:12px;color:#666666;">
                      · 类型 :
                      <span style="font-size:12px;color:#333333;" title="网站">网站</span>
                    </span>
                    <div style="font-size:12px;color:#666666;position:relative;top:-10px;">
                      · 网址 :
                      <span
                        style="font-size:12px;color:#333333;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                        :title="item.domain"
                      >{{item.domain}}</span>
                    </div>
                  </span>
                </li>
              </ul>
            </div>
          </div> -->
          <!-- 股东出资信息 -->
          <div class="annual_share"  v-if="tableData.length !=0">
            <div class id="annualSponColor">
              <div class="classify" style="float:left;margin-bottom:10px;">
                <div class="block"></div>股东及出资信息
              </div>
            </div>
            <el-table stripe :data="tableData" style="width: 100%">
              <!-- <el-table-column prop="xuhao" label="序号" width="70">
                <template slot-scope="scope">{{scope.$index +1}}</template>
              </el-table-column>-->
              <el-table-column prop="stockname" label="股东" width="200" align="center"></el-table-column>
              <el-table-column prop="subamount" label="认缴出资(万元)" align="center"></el-table-column>
              <el-table-column prop="subdate" label="认缴时间" align="center"></el-table-column>
              <!-- <el-table-column prop="submode" label="认缴方式" align="center"></el-table-column> -->
              <el-table-column prop="actamount" label="实缴出资(万元)" align="center"></el-table-column>
              <el-table-column prop="actdate" label="实缴时间" align="center"></el-table-column>
              <!-- <el-table-column prop="actmode" label="实缴方式" align="center"></el-table-column> -->
            </el-table>
            <el-pagination
            v-show="total >10"
              layout="prev, pager, next"
              background
              @current-change="handleCurrentChange"
              :page-size="10"
              :total="total"
              :current-page="page"
            ></el-pagination>
          </div>
          <!-- 对外投资情况 -->
          <div class="annual_invest"  v-if="NBinve.length !=0">
            <div class="classify rel" id="annualToOutAll">
              <span id="annualToOutColor">
                <div class="block"></div>对外投资信息
              </span>
              <span class="personCount">
                <span id="invCount">共计 {{NBinve.length}} 条信息</span>
              </span>
            </div>

            <div id="needPaging_inv" class="clearfix">
              <ul class="webSite-list" style="float: left;" id="forInvsmentList">

                <li v-for="(item,index) in NBinve" :key="index">
                  <a>
                    <div
                      style="color:#333333;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                      :title="item.investname"
                    ><router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(item.investname) }}"
                      >{{item.investname}}</router-link>
                    </div>
                    <span style="color:#666666;">
                      · 年份 :
                      <span
                        style="color:#333333;"
                        :title="item.reportyear"
                      >{{item.reportyear}}</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
         
          <!-- 股权变更信息 -->
          <div class="annual_guarantee" id="oneForGua"  v-if="tableData1.length !=0">
            <div class="classify" id="annualGuaranteeColor">
              <div class="block"></div>股权变更信息
            </div>

            <el-table stripe :data="tableData1" style="width: 100%">
              <el-table-column prop="stockname" label="股东" align="center"></el-table-column>
              <el-table-column prop="ratiobefore" label="变更前股权比例" align="center"></el-table-column>
              <el-table-column prop="ratioafter" label="变更后股权比例" align="center"></el-table-column>
              <el-table-column prop="changedate" label="股权变更日期" align="center"></el-table-column>
            </el-table>
            <el-pagination
            v-show="total1>10"
              layout="prev, pager, next"
              background
              @current-change="handleCurrentChange1"
              :page-size="10"
              :total="total1"
              :current-page="page1"
            ></el-pagination>
          </div>
          <!-- 社保信息 -->
          <div class="annual_AnnPbBase" id="annSocsecinfo_container"  v-if="NBsecur.length !=0">
            <div class="classify" id="annualSocsecColor">
              <div class="block"></div>社保信息
            </div>
            <table class="display dataTable" id="needPaging_annSocsecinfo">
              <tbody>
                <tr>
                  <th width="25%" class="tr">城镇职工基本养老保险</th>
                  <td width="25%" class="tl" id="so110">{{NBsecur.staffso110}}人</td>
                  <th width="25%" class="tr">失业保险</th>
                  <td width="25%" class="tl" id="so210">{{NBsecur.staffso210}}人</td>
                </tr>
                <tr>
                  <th class="tr">职工基本医疗保险</th>
                  <td class="tl" id="so310">{{NBsecur.staffso310}}人</td>
                  <th class="tr">工伤保险</th>
                  <td class="tl" id="so410">{{NBsecur.staffso410}}人</td>
                </tr>
                <tr>
                  <th class="tr">生育保险</th>
                  <td class="tl" id="so510">{{NBsecur.staffso510}}人</td>
                  <th></th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 修改信息 -->
          <!-- <div class="annual_modify"  v-if="tableData2.length !=0">
            <div class="classify" id="modifyMark">
              <div class="block"></div>修改信息
            </div>
            <el-table stripe :data="tableData2" style="width: 100%">
              <el-table-column prop="xuhao" label="序号" width="70">
                <template slot-scope="scope">{{scope.$index +1}}</template>
              </el-table-column>
              <el-table-column prop="changeitem" label="修改信息" align="center"></el-table-column>
              <el-table-column prop="changeAfter" label="修改前"></el-table-column>
              <el-table-column prop="changeBefore" label="修改后"></el-table-column>
              <el-table-column prop="changedate" label="修改日期"></el-table-column>
            </el-table>
            <el-pagination
              layout="prev, pager, next"
              background
              @current-change="handleCurrentChange2"
              :page-size="10"
              :total="total2"
              :current-page="page2"
            ></el-pagination>
          </div> -->
        </div>
       
      </div>
    </div>
  </div>
   <div v-else style="padding:40px 0; background:#fff;">
          <p style="text-align:center; color:#666;font-size:14px">暂无数据~</p>
        </div>
</template>  
  
<script>
export default {
  data() {
    return {
      gongsiname: "",
      reportyear: "",
      recruitTable: {
        id: 271,
        pid: "",
        entname: "",
        reportyear:'' ,
        contactaddress: "",
        creditcode: "",
        email: "@sxdinfo.com.cn",
        employeenum: 0,
        employeenumdis: 0,
        entstate: 0,
        entstatestr: "",
        postcode: "",
        publicdate: "",
        registercode: "",
        telephone: "",
        womennum: 0,
        womennumdis: 0,
        isinvest: 0,
        isweb: 0,
        isguaranty: 0,
        isstockalter: 0,
        businessscope: ""
      },
      NBweb: [],
      NBinve: [],
      NBasse: [],
      NBsecur: [],
      hidden: true,

      page: 1,
      page1: 1,
      page2: 1,
      total: 0,
      total1: 0,
      total2: 0,
      tableData: [],
      tableData1: [],
      tableData2: []
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.getList();
    
  },
  methods: {
    toRescue(url) {
      if (url) {
        return url.substr(0, 7).toLowerCase() == "http://";
      }
    },

    handleChange(val) {
      var self = this;
      self.isCountData = false;
      self.page = 1;
      console.log(val);
      if (val) {
        self.tableList(val);
      }
    },

    handleCurrentChange(val, index) {
      var self = this;
      self.page = val;
      self.getNBsharelistapi(index);
    },

    handleCurrentChange1(val, index) {
      var self = this;
      self.page = val;
      self.getNBstocklistapi(index);
    },

    handleCurrentChange2(val, index) {
      var self = this;
      self.page = val;
      self.getNBchangerecordlistapi(index);
    },

    getList() {
      var self = this;
      let params = {
        entname: self.gongsiname
        // reportyear: self.reportyear
      };
      this.axios({
        url: this.api.NBbaselistapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.data[0]) {
          self.recruitTable = res.data.data[0];
          self.hidden = false;
           self.getNBwebsitelistapi();
    self.getNBsharelistapi();
    self.getNBinvestlistapi();
    self.getNBassetlistapi();
    self.getNBstocklistapi();
    self.getNBsecuritylistapi();
    self.getNBchangerecordlistapi();
        } else {
          self.hidden = true;
        }
        console.log(self.hidden)
      });
    },

    getNBwebsitelistapi() {
      var self = this;
      let params = {
        entname: self.gongsiname
      };
      this.axios({
        url: this.api.NBwebsitelistapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.NBweb = res.data.data;
      });
    },

    getNBsharelistapi() {
      var self = this;
      let params = {
        entname: self.gongsiname,
        page: self.page,
        limit: 10
      };
      this.axios({
        url: this.api.NBsharelistapi,
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

    getNBinvestlistapi() {
      var self = this;
      let params = {
        entname: self.gongsiname,
        limit: 200
      };
      this.axios({
        url: this.api.NBinvestlistapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.NBinve = res.data.data;
      });
    },

    getNBassetlistapi() {
      var self = this;
      let params = {
        entname: self.gongsiname
      };
      this.axios({
        url: this.api.NBassetlistapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.NBasse = res.data.data[0];
      });
    },

    getNBstocklistapi() {
      var self = this;
      let params = {
        entname: self.gongsiname,
        page: self.page1,
        limit: 20
      };
      this.axios({
        url: this.api.NBstocklistapi,
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

    getNBsecuritylistapi() {
      var self = this;
      let params = {
        entname: self.gongsiname
      };
      this.axios({
        url: this.api.NBsecuritylistapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.NBsecur = res.data.data[0]?res.data.data[0]:[];
      });
    },

    getNBchangerecordlistapi() {
      var self = this;
      let params = {
        entname: self.gongsiname,
        page: self.page2,
        limit: 10
      };
      this.axios({
        url: this.api.NBchangerecordlistapi,
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
@import "../../styles/css/CompanyDetails/annualDetails.scss";
</style>