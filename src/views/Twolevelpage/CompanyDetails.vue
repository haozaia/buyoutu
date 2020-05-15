<template>
  <div id="CompanyDetails">
    <div class="Company_ctr">
      <!-- 公司详情头部 -->
      <div class="company_t">
        <div id="C_content" >
          <div class="C_container" >
            <div class="C_title">
              <span class="Title_left"></span>{{Base64.decode($route.query.name)}}
            </div>
          </div>
        </div>
        <!-- <div class="company_top">
          <div class="company_right">
            <p class="p1">
              <b>{{Base64.decode($route.query.name)}}</b>
            </p>
          </div>
        </div> -->
        <div class="company_center">
          <ul class="center_tag fontSize20">
            <li>
              联系电话：
              <!-- <span style="padding-right:10%;">{{companyList.dianhua}}</span> -->
              <el-popover
                style="display:inline-block;"
                trigger="click"
                placement="right"
                v-if="userRole=='S'"
              >
                <div v-if="tableData.length >1 ">
                  <el-table :data="tableData" style="width: 100%" stripe>
                    <el-table-column prop="jianc" label="名称" align="center"></el-table-column>
                    <el-table-column prop="xingbie" label="性别" align="center"></el-table-column>
                    <el-table-column prop="shouji" label="手机" width="120" align="center"></el-table-column>
                    <el-table-column prop="shouji2" label="手机2" width="120" align="center"></el-table-column>
                    <el-table-column prop="zuoji" label="座机" width="120" align="center"></el-table-column>
                    <el-table-column prop="youxiang" label="邮件" width="200" align="center"></el-table-column>
                    <el-table-column prop="zhiwu" label="职务" width="160" align="center"></el-table-column>
                  </el-table>
                  <p v-if="companyList.lianxidh||companyList.dianhua">
                    <b>联系方式(来自互联网)</b>
                    : {{companyList.lianxidh}}
                    <span
                      v-if="companyList.lianxidh"
                    >;</span>
                    {{companyList.dianhua}}
                  </p>
                  <p v-if="nianbaoDh">
                    <b>联系方式(来自年报)</b>
                    <!-- : {{nianbaoDh.telephone}} <span v-if="nianbaoDh.telephone">;</span>  -->
                    <!-- {{nianbaoDh.email}} -->
                  </p>
                </div>

                <div v-if="tableData.length ==1">
                  <table
                    stripe
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    class="el-table"
                    style="width: 100%;border-radius: 5px;"
                  >
                    <tr class>
                      <td colspan="1" rowspan="1" v-if="tableData[0].jianc">
                        <div class="cell">
                          <b>名称</b> ：
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].jianc">
                        <div class="cell">{{tableData[0].jianc}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].xingbie">
                        <div class="cell">
                          <b>性别</b> ：
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].xingbie">
                        <div class="cell">{{tableData[0].xingbie}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].shouji">
                        <div class="cell">
                          <b>手机</b> ：
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].shouji">
                        <div class="cell">{{tableData[0].shouji}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].shouji2">
                        <div class="cell">
                          <b>手机2</b> ：
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].shouji2">
                        <div class="cell">{{tableData[0].shouji2}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].zuoji">
                        <div class="cell">
                          <b>座机</b> ：
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].zuoji">
                        <div class="cell">{{tableData[0].zuoji}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].youxiang">
                        <div class="cell">
                          <b>邮件</b> ：
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].youxiang">
                        <div class="cell">{{tableData[0].youxiang}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].zhiwu">
                        <div class="cell">
                          <b>职务</b> ：
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].zhiwu">
                        <div class="cell">{{tableData[0].zhiwu}}</div>
                      </td>
                    </tr>
                  </table>
                  <div colspan="1" rowspan="1">
                    <div class="cell" v-if="companyList.lianxidh||companyList.dianhua||nianbaoDh">
                      <b>其它联系方式</b>
                      ： {{companyList.lianxidh}}
                      <span v-if="companyList.lianxidh">;</span>
                      {{companyList.dianhua }}
                      <!-- {{ nianbaoDh.telephone}} <span v-if="nianbaoDh.telephone">;</span>  -->
                      <!-- {{nianbaoDh.email}} -->
                    </div>
                  </div>
                </div>

                <div v-if="tableData.length ==0">
                  <div v-if="companyList.lianxidh||companyList.dianhua ||nianbaoDh">
                    <b></b>
                    {{companyList.lianxidh}}
                    <span v-if="companyList.lianxidh">;</span>
                    {{companyList.dianhua }}
                    {{nianbaoDh.telephone?nianbaoDh.telephone:''}} 
                  </div>
                  <div v-else>
                    <p style="text-align:center;">暂无数据~</p>
                  </div>
                </div>

                <div slot="reference" class="name-wrapper">
                  <span class="inline fontSize18 phoneShow">点击查看</span>
                  <!-- <el-tag size="medium" style="cursor:pointer"  type="danger">点击查看</el-tag> -->
                </div>
              </el-popover>
              <el-popover style="display:inline-block;" trigger="click" placement="left" v-else>
                <div>当前账号无权限查看</div>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" style="cursor:pointer" type="info">点击查看</el-tag>
                </div>
              </el-popover>
            </li>
            <li>{{companyList.lianxiyx?"联系邮箱：":"注册资本："}}{{companyList.lianxiyx?companyList.lianxiyx:companyList.zhucezb}}</li>
            <li>
              {{companyList.gongsiwz?"公司网址：":"成立时间："}}
              <span v-if="companyList.gongsiwz">
                <a
                  target="_blank"
                  v-if="toRescue(companyList.gongsiwz)"
                  :href="companyList.gongsiwz"
                >{{companyList.gongsiwz}}</a>
                <a
                  target="_blank"
                  v-else
                  :href="'http://'+companyList.gongsiwz"
                >{{companyList.gongsiwz}}</a>
              </span>
              <span v-else>{{companyList.chenglisj}}</span>
            </li>
            <li><span class="comLxfs">{{companyList.tongxindz ? "通信地址：":"注册地址："}}</span> <section class="comLxfsSec"> {{companyList.tongxindz?companyList.tongxindz:companyList.zhucedz}}</section></li>
            <li>{{companyList.suoshuzbsc ? "资本市场：":"法人代表："}}
              <a v-if="companyList.finacelink" :href="companyList.finacelink" target="_blank"> {{companyList.suoshuzbsc?companyList.suoshuzbsc:companyList.fadingdbr}}</a>
              <span v-else>
              {{companyList.suoshuzbsc?companyList.suoshuzbsc:companyList.fadingdbr}}
              </span>

              </li>
            <li v-if="companyList.yingyeqx ">
              营业期限：
              {{companyList.yingyeqx}}
            </li>
             <p>
              公司性质：
              <span id="Tags" class="inline" v-for="(item,index) in gongsixz" :key="index">{{item}}</span>
            </p>
            <p v-if="yewuld.length !==0">
            <span class="comYwldTit">业务亮点： </span>
              <section class="inline comYwld">
              <span v-for="(item,index) in yewuld" :key="index">
                <span v-if="item" id="Tags" class="inline">{{item}}</span>
              </span>
              </section>
            </p>
          </ul>
        </div>
      </div>
      <div class="company_c">
        <template>
          <div id="particulars">
            <div class="radio-wrap ">
              <div class="radio-group fontSize22">
                <span
                  v-for="(tab ,index) in tabs"
                  disabled="true"
                  :class="[iscur==index ? 'cur' : '', tab.disFlag ? '' : 'isDisabled']"
                  @click="iscur=index,tabChange('select' + (index + 1))"
                  :key="tab.index"
                >{{tab.name}}</span>
              </div>
              <!-- <div style="margin:10px 0;"></div> -->
              <keep-alive>
                <component v-bind:is="tabView"></component>
              </keep-alive>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>


<script>
import select1 from "../../../src/components/Company_details/company_profile.vue";
import select2 from "../../../src/components/Company_details/development_history.vue";
import select3 from "./annualReportsDetails.vue";
import select4 from "../../../src/components/Company_details/operation.vue";
import select5 from "../../../src/components/Company_details/sameCompany.vue";

import select6 from "../../../src/components/Company_details/award_permit.vue";
import select7 from "../../../src/components/Company_details/intellectual.vue";
import select8 from "../../../src/components/Company_details/danger_rgc.vue";
import select9 from "../../../src/components/Company_details/ComNews.vue";

// import select8 from "../../../src/components/Company_details/stockReference.vue";
// import select9 from "../../../src/components/Company_details/danger_rgc.vue";
// import select10 from "../../../src/components/Company_details/danger_rgc.vue";
// import select11 from "../../../src/components/Company_details/company_news.vue";
// import select14 from "../../../src/components/Company_details/TopManagement.vue";
// import select15 from "../../../src/components/Company_details/financial_index.vue";
// import select16 from "../../../src/components/Company_details/financial_statements.vue";
// import select17 from "../../../src/components/Company_details/previous_issue.vue";
// import select18 from "../../../src/components/Company_details/ownership_structure.vue";
// import select19 from "../../../src/components/Company_details/equity_changes.vue";
// import select21 from "../../../src/components/Company_details/historical_stock.vue";
// import select22 from "../../../src/components/Company_details/research_report.vue";
// import select23 from "../../../src/components/Company_details/company_news.vue";
// import select12 from "../../../src/components/Company_details/stockReference.vue";

export default {
  name: "particulars",
  data() {
    return {
      mainid: "",
      tabView: "select1",
      iscur: 0,
      tabs: [
        { name: "公司概况", disFlag: true },
        { name: "发展/经营", disFlag: true },
        { name: "年度报告", disFlag: false },
        { name: "产品/竞品", disFlag: false },
        { name: "相似公司", disFlag: false },
        { name: "证照奖励", disFlag: false },
        { name: "知识产权", disFlag: false },
        { name: "风险合规", disFlag: false },
        { name: "公司新闻", disFlag: false },
        // { name: "相关行业" },
        // { name: "国内可比公司" },
        // { name: "海外可比公司" },
        // { name: "公司公告" },
        // { name: "个股速览" },
        // { name: "商业模式" },
        // { name: "行业及风险因素" },
        // { name: "高管团队" },
        // { name: "财务指标" },
        // { name: "财务报表" },
        // { name: "历次发行" },
        // { name: "股权结构" },
        // { name: "股权变动" },
        // { name: "投资族谱" },
        // { name: "历史股价" },
        // { name: "研究报告" },
        // { name: "公司新闻" }
      ],
      companyList: {},
      zibensc: {},
      gongsixz: {},
      yewuld: {},
      tableData: [],
      userRole: "",
      companty: false,
      nianbaoDh: "",
      RealName: ""
    };
  },
  components: {
    select1,
    select2,
    select3,
    select4,
    select5,
    select6,
    select7,
    select8,
    select9,
    // select10,
    // select14,
    // select15,
    // select16,
    // select17,
    // select18,
    // select19,
    // select21,
    // select22,
    // select23,
    // select11
  },
  mounted() {
    var self = this;
    self.mainid = this.$route.query.name;
    self.RealName = localStorage.getItem("realName");
    self.Jibenxx();
    self.companyYwld();
    self.nainbaoDh();
    self.userRole = localStorage.getItem("userRole");
    self.nainbaoDis();
    self.jingpinDis();
    self.zhengfujiangliDis();
    self.fengxianheguiDis();
    self.zhishichanquanDis();
    self.newsDis();
    self.kebiDis();
  },

  methods: {
    nainbaoDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.nainbaoDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[2].disFlag = res.data.data;
      });
    },
    jingpinDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.jingpinDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[3].disFlag = res.data.data;
      });
    },
    zhengfujiangliDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.zhengfujiangliDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[5].disFlag = res.data.data;
      });
    },
    fengxianheguiDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.fengxianheguiDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[7].disFlag = res.data.data;
      });
    },
    zhishichanquanDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.zhishichanquanDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[6].disFlag = res.data.data;
      });
    },
    kebiDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.kebiDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[4].disFlag = res.data.data;
      });
    },
    newsDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.newsDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[8].disFlag = res.data.data;
      });
    },
    nainbaoDh() {
      var self = this;
      console.log(self.companyList.name);
      let params = {
        name: self.mainid
      };
      this.axios({
        url: this.api.nianbaoapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data[0])
        self.nianbaoDh = res.data.data[0]?res.data.data[0]:[{telephone:''}];
      });
    },
    See(e) {
      window.open(e, "_blank");
    },

    toRescue(url) {
      if (url) {
        return url.substr(0, 7).toLowerCase() == "http://";
      }
    },
    tabChange: function(tab) {
      this.tabView = tab;
    },
    Jibenxx() {
      var self = this;
      let params = {
        gognsiname: self.mainid
      };
      this.axios({
        url: this.api.Gaikuang,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        function checkAdult(x) {
          return x != "";
          //  &&x.indexOf("奖励") != -1
        }
        self.companyList = res.data.data[0];
        // console.log(self.companyList);
        self.zibensc = res.data.data[0].suoshuzbsc
          ? res.data.data[0].suoshuzbsc.split(",").filter(checkAdult)
          : "";
        self.gongsixz = res.data.data[0].gongsilx
          ? res.data.data[0].gongsilx.split(",").filter(checkAdult)
          : "";

        if (self.companyList.lianxidh) {
          self.companty = true;
        }
        console.log(self.zibensc);
        self.tableList();
      });
    },
    companyYwld() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.companyYwld,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        function checkAdult(x) {
          return x != "";
          //  &&x.indexOf("奖励") != -1
        }
        // console.log(self.tableData.length);
        self.yewuld = res.data.data[0].name
          ? res.data.data[0].name.split(",").filter(checkAdult)
          : "";
      });
    },
    tableList() {
      var self = this;
      console.log(self.companyList.name);
      let params = {
        wanglaidw: self.mainid,
        guanliren: self.RealName
      };
      this.axios({
        url: this.api.companyPhone,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData = res.data.data;
        // console.log(self.tableData.length);
        if (self.tableData.length != 0) {
          self.companty = true;
        }
      });
    }
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";
#CompanyDetails .Company_ctr .company_t .company_center .center_tag p{
   width: calc(98.2% + 2px);
}
</style>