<template>
  <div slot="company_profile">
    <div class="companyContent">
      <div class="Profile">
        <section>
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">基础概况</span>
            </div>
          </header>
          <div class="basic">
            <ul>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/fadman.svg" />
                <span class="inline">法定代表人：</span>
                <span class="inline">{{information.fadingdbr}}</span>
              </li>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/gongshang.svg" />
                <span class="inline">工商注册号：</span>
                <span class="inline">{{information.gongshangzch?information.gongshangzch:'-'}}</span>
              </li>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/money.svg" />
                <span class="inline">注册资本：</span>
                <span class="inline">{{information.zhucezb}}</span>
              </li>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/zuzhi.svg" />
                <span class="inline">组织机构代码：</span>
                <span class="inline">{{information.zuzhijgdm}}</span>
              </li>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/hangye.svg" />
                <span class="inline">行业：</span>
                <span class="inline" v-if='information.suoshuejhy && information.youxiandj>95 '>{{information.suoshuhy}}<span class="hangyeGang">-</span><span id="TagPag">主营：{{information.suoshuejhy}}</span></span>
                <span class="inline" v-else-if='information.suoshuhy'>{{information.suoshuhy}}</span>
                <span class="inline" v-else>-</span>
              </li>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/xinyong.svg" />
                <span class="inline">统一信用代码：</span>
                <span class="inline">{{information.tongyixydm}}</span>
              </li>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/zhuangtai.svg" />
                <span class="inline">注册状态：</span>
                <span class="inline">{{information.zhucezt}}</span>
              </li>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/nashuiman.svg" />
                <span class="inline">纳税人识别号：</span>
                <span class="inline">{{information.nashuirsbh}}</span>
              </li>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/time.svg" />
                <span class="inline">成立时间：</span>
                <span class="inline">{{information.chenglisj}}</span>
              </li>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/leixing.svg" />
                <span class="inline">企业类型：</span>
                <span class="inline">{{information.gongsilx}}</span>
              </li>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/web.svg" />
                <span class="inline">网址：</span>
                <!-- <span>{{information.gongsiwz}}</span> -->
                <span class="inline" v-if="information.gongsiwz!='暂无'">
                  <a
                    target="_blank"
                    v-if="toRescue(information.gongsiwz)"
                    :href="information.gongsiwz"
                  >{{information.gongsiwz}}</a>
                   <a
                    target="_blank"
                    v-else-if="toRescues(information.gongsiwz)"
                    :href="information.gongsiwz"
                  >{{information.gongsiwz}}</a>
                  <a
                    target="_blank"
                    v-else
                    :href="'http://'+information.gongsiwz"
                  >{{information.gongsiwz}}</a>
                </span>
                <span v-else>{{information.gongsiwz}}</span>
              </li>
              <li>
                <img class="inline" src="../../assets/images/companyIcon/phone.svg" />
                <span class="inline">电话：</span>
                <span class="inline" v-if='information.dianhua'>{{information.dianhua}}</span>
                <span class="inline"  v-else-if='information.lianxidh'>{{information.lianxidh}}</span>
                <span class="inline" v-else>-</span>
              </li>

              <li>
               
                <span class="inline inlinezcdzWapper"> <img class="inline" src="../../assets/images/companyIcon/loginloa.svg" />注册地址：<span class="inlinezcdz" :title="information.zhucedz">{{information.zhucedz}}</span></span>
              </li>
              
              <li style="vertical-align: top;">
               
                <span class="inline inlinezcdzWapper"> <img class="inline" src="../../assets/images/companyIcon/local.svg" />联系地址：<span class="inlinezcdz" :title="information.tongxindz?information.tongxindz:'-'">{{information.tongxindz?information.tongxindz:'-'}}</span></span>
              </li>
            </ul>
          </div>
        </section>

        

        <section v-if='information.qiyejj'>
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">企业简介</span>
            </div>
          </header>
          <li class="comJyfw">
            <span class="fontSize20">{{information.qiyejj}}</span>
          </li>
        </section>

        

        <!-- <section v-if="MuqianzxgdxxList.length != 0">
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>目前最新股东信息</span>
          </div>
          <div class="holder">
            <el-table stripe :data="MuqianzxgdxxList" style="width: 100%">
              <el-table-column prop="gudong" label="股东"></el-table-column>
              <el-table-column prop="chuzibl" label="出资比例"></el-table-column>
              <el-table-column prop="renjiaocz" label="认缴出资"></el-table-column>
              <el-table-column prop="gudonglx" label="股东类型"></el-table-column>
            </el-table>
          </div>
        </section>-->

        <!-- <section v-if="BiangengjlList.length != 0">
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>变更记录</span>
          </div>
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(item,index) in BiangengjlList"
                :key="index"
                :timestamp="item.biangengsj"
                placement="top"
              >
                <el-card>
                  <h4>{{item.biangengxm}}</h4>
                  <p>
                    {{item.biangengq}}
                    <br />变更为
                    <br />
                    {{item.biangengh}}
                  </p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </section>-->
      </div>
    </div>
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      information: {},
      gaoguan: "",
      MgaoguanttList: [],
      MuqianzxgdxxList: [],
      BiangengjlList: [],
      mainid: "",
      gaoguanIndex: "",
      key: ""
    };
  },
  mounted() {
    var self = this;
    self.mainid = this.$route.query.name;
    // console.log(this.$route.query.name, "111");
    self.Gaikuang();
    // self.Mgaoguantt();
    self.Muqianzxgdxx();
    self.Biangengjl();
  },
  methods: {
    toRescue(url) {
      if (url) {
        console.log(url.replace(/\s+/g,"").substr(0, 7) , 111);
        console.log(url.substr(0, 7).replace(/\s+/g,"").toLowerCase() == "http://", 111);
        return url.replace(/\s+/g,"").substr(0, 7).toLowerCase() == "http://";
      } else {
        return false;
      }
    },
        toRescues(url) {
      if (url) {
        console.log(url.substr(0, 8).toLowerCase() == "https://", 222);
        return url.replace(/\s+/g,"").substr(0, 8).toLowerCase() == "https://";
      } else {
        return false;
      }
    },
    //获取高管信息
    getInfo(index) {
      var self = this;
      self.dialogVisible = true;
      self.key = 1;
      self.gaoguanIndex = index;
      // console.log(self.gaoguanIndex)
    },
    //查询公司概况
    Gaikuang() {
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
        self.information = res.data.data[0];
        // console.log(self.information);
      });
    },
    //查询高管
    Mgaoguantt() {
      var self = this;
      let params = {
        gognsiname: self.mainid
      };
      this.axios({
        url: this.api.Mgaoguantt,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        res.data.data.map(x => {
          x.xingshi = x.xingming.charAt(0);
          self.MgaoguanttList.push(x);

          // console.log(self.MgaoguanttList)
        });
        console.log(self.MgaoguanttList[0].xiangxixx);
      });
    },
    //查询股东信息
    Muqianzxgdxx() {
      var self = this;
      let params = {
        gognsiname: self.mainid
      };
      this.axios({
        url: this.api.Muqianzxgdxx,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.MuqianzxgdxxList = res.data.data;
        // console.log(self.MuqianzxgdxxList, 123);
      });
    },
    //查询变更记录
    Biangengjl() {
      var self = this;
      let params = {
        gognsiname: self.mainid
      };
      this.axios({
        url: this.api.Biangengjl,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.BiangengjlList = res.data.data;
        // console.log(self.BiangengjlList);
      });
    }
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";
@import "../../styles/css/Techindustry.scss";
.companyContent {
  padding: 0 30px 30px;
}
.comJyfw {
  margin-left: 30px;
  line-height: 32px;
}
.icon-tips {
  width: 20px;
  margin-right: 10px;
}
.block-titles {
  font-weight: 700;
  line-height: 56px;
  padding-top: 8px;
}
.basic{
  .inlinezcdzWapper{
    width: 100%;
  }
  .inlinezcdz{
      display: inline-block;width: calc(100% - 184px);white-space: nowrap;overflow: hidden; text-overflow: ellipsis; vertical-align: bottom;
  }
}
.hangyeGang{
  width:16px;
height:2px;
font-size:20px;
font-family:Source Han Sans SC;
font-weight:400;
color:#999;
line-height:24px;
padding: 0 10px;
}
</style>