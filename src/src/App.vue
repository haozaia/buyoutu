<template>
  <!-- 新版 -->
  <div style="height:100%">
    <div id="app" style="height:100%">
      <!-- 红底白字，文字闪动版 -->
      <!-- <div class="recommend" v-if="recommendShow">
        <div class="gengxImg">
          白色图标
          <img src="./assets/images/recommend/gengxin.png" alt="">
        </div>
        <p class="zhinengTitle"><span class="zhinengTitle_font">{{ this.ReNumber }}</span><i>家</i></p>
        <p class="zhinengcontainer">
            最近更新 {{ this.ReNumber }} 家企业
        </p>
        <div class="zndetails">
          红色箭头
          <button class="zhinengdetails" @click="details">&nbsp;详情&nbsp;<img src="./assets/images/recommend/jiantou.png" alt=""></button>
        </div>
        白色箭头
        <b @click="close"><img src="./assets/images/recommend/close.png" alt=""></b>
      </div>-->
      <!-- 白底红字，中间突出红色 -->
      <!-- <div class="recommend" v-if="recommendShow">
        <div class="gengxImg">
          <img src="./assets/images/recommend/gengxin2.png" alt="">
        </div>
        <div class="zhinengRedbox">
          <p class="zhinengTitle"><span class="zhinengTitle_font">{{ this.ReNumber }}</span><i>家</i></p>
          <p class="zhinengcontainer">
              最近更新 {{ this.ReNumber }} 家企业
          </p>
        </div>
        <div class="zndetails">
          <button class="zhinengdetails" @click="details">&nbsp;详情&nbsp;<img src="./assets/images/recommend/wjiantou.png" alt=""></button>
        </div>
        <b @click="close"><img src="./assets/images/recommend/redclose.png" alt=""></b>
      </div>-->
      <!-- 红底白字，长方形 -->
      <div class="recommend" v-if="recommendShow">
        <div class="gengxImg">
          <!-- 白色图标 -->
          <img src="./assets/images/recommend/gengxin.png" alt />
        </div>
        <p class="zhinengTitle">
          <span class="zhinengTitle_font">{{ this.ReNumber }}</span>
          <i>家</i>
        </p>
        <p class="zhinengcontainer">最近更新 {{ this.ReNumber }} 家企业</p>
        <div class="zndetails">
          <!-- 红色箭头 -->
          <button class="zhinengdetails" @click="details">
            &nbsp;详情&nbsp;
            <img src="./assets/images/recommend/jiantou.png" alt />
          </button>
        </div>
        <!-- 白色箭头 -->
        <b @click="close">
          <img src="./assets/images/recommend/close.png" alt />
        </b>
      </div>

      <div class="governmentRelated" v-if="governmentRelatedShow">
        <div class="followedup">
          <b @click="checkclose">
            <img src="./assets/images/recommend/close.png" alt />
          </b>
          <p>
            您有{{ this.msgcount }}条未处理信息，请尽快处理!&nbsp;&nbsp;
            <i @click="openmsgBox">查看</i>
          </p>
        </div>
      </div>
      <div class="governmentRelated" v-if="proRelatedShow">
        <div class="followedup">
          <b @click="checkProClose">
            <img src="./assets/images/recommend/close.png" alt />
          </b>
          <p>
            您有{{ this.procount }}条消息待审核，请尽快处理!&nbsp;&nbsp;
            <i @click="openproBox">查看</i>
          </p>
        </div>
      </div>

      <el-dialog :visible.sync="dialogVisible" width="60%" class="Appdialog">
        <div class="title_h">
          <!-- <i class="icon icon-tips"></i> -->
          <span class="fontSize24" style="letter-spacing:2px">智能推荐 最近更新</span>
        </div>
        <div class="dialogClose" @click="dialog_close">×</div>
        <template>
          <el-table
            :empty-text="tishi"
            stripe
            :data="tableData"
            v-loading="loading"
            style="width: 100%"
          >
            <el-table-column prop="gongsiname" label="企业名称" width="380" align="left">
              <template slot-scope="scope">
                <router-link
                  target="_blank"
                  tag="a"
                  style="color:#606266;text-decoration:none;"
                  :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                >{{ scope.row.gongsiname }}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="suoshusf" label="所属省份" align="center"></el-table-column>
            <el-table-column prop="fadingdbr" label="法定代表人" align="center">
              <template slot-scope="{row}">{{ row.fadingdbr || '-' }}</template>
            </el-table-column>
            <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center">
              <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
            </el-table-column>
            <el-table-column prop label="来源" width="100" align="center">
              详情
              <template slot-scope="scope">
                <el-popover
                  v-if="scope.row.beizhu2 == 2"
                  trigger="hover"
                  placement="left"
                  width="500"
                >
                  <p>
                    <b></b>
                    {{ scope.row.laiyuan }}
                  </p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">详情</el-tag>
                  </div>
                </el-popover>
                <a
                  v-else
                  :href="scope.row.laiyuan"
                  target="_blank"
                  style="color:#606266;text-decoration:none;"
                >详情</a>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- 分页dom start -->
        <div id="Pagination" v-show="total > 10">
          <el-pagination
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            @current-change="handleCurrentChange"
            :page-size="10"
            :current-page="page"
          ></el-pagination>
          <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
        </div>
        <!-- 分页dom end -->
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
      <el-dialog :visible.sync="dialogMsgBox" width="40%" class="Appdialog msgdialog">
        <div class="title_h">
          <!-- <i class="icon icon-tips"></i> -->
          <span class="fontSize24" style="letter-spacing:2px">待处理信息</span>
        </div>
        <div class="dialogClose" @click="msgBox_close">×</div>
        <template>
          <el-table stripe :data="messageData" style="width: 100%">
            <template slot="empty">
              <p>暂无待办事项</p>
            </template>
            <el-table-column prop="messageRemindingContent" label="待办事项" align="left"></el-table-column>
            <el-table-column width="180" label="操作" align="center">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.messageRemindingModule != 'merchants_department_next_visit_government_remind'"
                  class="msgSubstyle"
                  @click="msgSub(scope.row)"
                >去处理</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- 分页dom start -->
        <div id="Pagination" v-show="total > 10">
          <el-pagination
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            @current-change="handleCurrentChange"
            :page-size="10"
            :current-page="page"
          ></el-pagination>
          <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
        </div>
        <!-- 分页dom end -->
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>

      <Header v-if="$route.name !== 'login'" />
      <div v-if="$route.name !== 'login'" style="height:100px;" class="heightTX"></div>
      <div class="test_left" id="leftNav" v-if="$route.name !== 'login'">
        <nav-menu></nav-menu>
      </div>
      <div style="height:100%" :class="$route.name !== 'login' ? 'contentWapper': ''">
        <router-view :key="$route.fullPath" />
      </div>
      <section class="crmNevWapper " v-if="$route.name !== 'login'&&(unitCode==3||unitCode==8||unitCode==1||unitCode==2||unitCode==5||unitCode==6||unitCode==7)">
        <div class="crmNev">
           <ul>
             <li v-if="unitCode==3||unitCode==8||unitCode==1" @click="routerPush('favoriteList')">
                 <p style="margin:2px;">
                <span class="whiteBall"></span>项目管理
              </p>
             </li>
             <li v-if="unitCode==3||unitCode==8||unitCode==1" @click="routerPush('proVisit')">
                <p style="margin:2px;">
                <span class="whiteBall"></span>项目拜访
              </p>
             </li>
             <li v-if="unitCode==3||unitCode==8||unitCode==1||unitCode==5||unitCode==2" @click="routerPush('fiveAddTwo')">
                <p style="margin:2px;">
                <span class="whiteBall"></span>项目5+2
              </p>
             </li>
             <li v-if="unitCode==3||unitCode==8||unitCode==1||unitCode==7||unitCode==5||unitCode==6||unitCode==2" @click="routerPush('proMeeting')">
                <p style="margin:2px;">
                <span class="whiteBall"></span>项目对接会
              </p>
             </li>
             <li v-if="unitCode==3||unitCode==8||unitCode==1||unitCode==7" @click="routerPush('proExamine')">
                <p style="margin:2px;">
                <span class="whiteBall"></span>待审核项目
              </p>
             </li>
             <li v-if="unitCode==2||unitCode==8||unitCode==1" @click="routerPush('GovernmentManagement')">
                <p style="margin:2px;">
                <span class="whiteBall"></span>未合作客户
              </p>
             </li>
             <li v-if="unitCode==2||unitCode==8||unitCode==1||unitCode==7||unitCode==5||unitCode==3||unitCode==6" @click="routerPush('GovernmentCooperative')">
               <p style="margin:2px;">
                <span class="whiteBall"></span>已合作客户
              </p>
             </li>
             <li v-if="unitCode==5||unitCode==8||unitCode==1" @click="routerPush('DaiShenhe')">
               <p style="margin:2px;">
                <span class="whiteBall"></span>待审核客户
              </p>
             </li>
             <li v-if="unitCode==8||unitCode==1||unitCode==5" @click="routerPush('RecommendNotDock')">
               <p style="margin:2px;">
                <span class="whiteBall"></span>已推荐未对接
              </p>
             </li>
             <li v-if="unitCode==8||unitCode==1||unitCode==5" @click="routerPush('RecommendDock')">
                <p style="margin:2px;">
                <span class="whiteBall"></span>已推荐已对接
              </p>
             </li>
             <li v-if="unitCode==8||unitCode==2||unitCode==1" @click="routerPush('Product')">
             <li  @click="routerPush('GovernmentFeedback')">
                <p style="margin:2px;">
                <span class="whiteBall"></span>政府反馈
              </p>
             </li>
             <li v-if="unitCode==8||unitCode==1||unitCode==6" @click="routerPush('EnterpriseFeedback')">
                <p style="margin:2px;">
                <span class="whiteBall"></span>企业反馈
              </p>
             </li>
             <!-- <li v-if="unitCode==8||unitCode==2||unitCode==1" @click="routerPush('Product')">
                <p style="margin:2px;">
                <span class="whiteBall"></span>产品管理
              </p>
             </li> -->
           </ul>
        </div>
        <img src="./assets/images/recommend/jiao.svg" class="crmNevImg" alt="">
        <span class="crmNevBut" ></span>
      </section>
      <!-- <Footer v-if="$route.name !== 'changepassword' && $route.name !== 'login' && $route.name !== 'changePassword_c'" /> -->
    </div>
  </div>
</template>

<script>
import Footer from "./components/Footer/Footer.vue";
import Header from "./components/Header/Header.vue";
import NavMenu from "./components/NavMenu/NavMenu.vue";
// Vue.config.silent = true
export default {
  data() {
    return {
      ReNumber: "",
      mobile: "", //是否展示智能推荐窗口用户手机号码参数
      recommendShow: false, //判断是否展示智能推荐窗口
      governmentRelatedShow: false, //未查看消息提示框
      proRelatedShow: false, //未查看消息提示框
      msgcount: "", //未查看消息数量
      dialogMsgBox: false, //未查看消息内容弹框
      dialogVisible: false, //列表信息弹框是否打开
      tableData: [], //列表信息弹框数据
      tuijianCode: "", //推荐批次
      total: 0,
      page: 1,
      suibian: true, //分页变量3,
      realName: "", //用户姓名
      loading: true,
      tishi: "正在为您查询...",
      CloseYN: true,
      id: "",
      messageData: [], //未查看信息内容
      nomsg: false,
      chuliBtn: 0, //去处理是否显示
      unitCode:''
    };
  },
  components: {
    Header,
    Footer,
    NavMenu
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (newVal === "/home") {
        this.CloseYN = true;
        this.mobile = localStorage.getItem("mobile");
        this.realName = localStorage.getItem("realName");
        this.id = localStorage.getItem("id");
        this.$store.state.userName = localStorage.getItem("realName");
        this.$store.state.mobile = localStorage.getItem("mobile");
        this.$store.state.unitCode = localStorage.getItem("unitCode");
        this.unitCode = localStorage.getItem("unitCode");
        this.$nextTick(function() {
          document.getElementsByClassName("contentWapper")[0].style.minHeight =
            document.getElementById("leftNav").offsetHeight - 20 + "px";
        });
      }
      if (newVal !== "/login" && newVal !== "/" && this.CloseYN !== false) {
        this.RecommendBox();
        this.Relatedxinxi();
        this.proXinxi();
        this.unitCode = localStorage.getItem("unitCode");
        this.$store.state.userName = localStorage.getItem("realName");
        this.$store.state.mobile = localStorage.getItem("mobile");
        this.$store.state.unitCode = localStorage.getItem("unitCode");
        this.id = localStorage.getItem("id");
      } else {
        this.recommendShow = false;
        this.governmentRelatedShow = false;
        this.proRelatedShow = false;
        localStorage.setItem("recommendNOorOFF", 1);
        localStorage.setItem("seenYN", 1); //待查看信息窗口是否显示
        localStorage.setItem("proYN", 1); //待查看信息窗口是否显示
        // this.CloseYN = true
      }
    }
    // recommendShow:function(newVal,oldVal) {
    //   // console.log(newVal)
    //   if(newVal == false){
    //     document.getElementsByClassName("governmentRelated")[0].offsetTop + 100 + "px"
    //   }
    // }
  },
  created() {
    this.$store.state.userName = localStorage.getItem("realName");
    this.$store.state.mobile = localStorage.getItem("mobile");
    this.$store.state.unitCode = localStorage.getItem("unitCode");
      this.unitCode = localStorage.getItem("unitCode");

    this.id = localStorage.getItem("id");
  },
  mounted() {
    // console.log(this.$route.name,"newValnewValnewVal")
    if (
      this.$route.name !== "login" &&
      this.$route.name !== "" &&
      this.CloseYN !== false
    ) {
      this.mobile = localStorage.getItem("mobile");
      this.realName = localStorage.getItem("realName");
      this.id = localStorage.getItem("id");
      this.RecommendBox();
      this.Relatedxinxi();
      this.proXinxi();
    } else {
      this.recommendShow = false;
      this.governmentRelatedShow = false;
      this.proRelatedShow = false;
      // this.CloseYN = true
    }
    this.$nextTick(function() {
      if (document.getElementsByClassName("contentWapper")[0]) {
        document.getElementsByClassName("contentWapper")[0].style.minHeight =
          document.getElementById("leftNav").offsetHeight - 20 + "px";
      }
    });
  },
  updated() {},
  methods: {
    //侧边路由跳转
    routerPush(val){
      this.$router.push(val)
    },
    //  是否展示智能推荐窗口
    RecommendBox() {
      var self = this;
      var flag = localStorage.getItem("recommendNOorOFF");
      // var longleftrotateY = localStorage.getItem("longleftrotateY")
      let params = {
        mobile: self.mobile
      };
      this.axios({
        url: this.api.RecommendBox,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data,"res222")
        // if (res.data.data === true) {
        //   self.recommendShow = true;
        //   this.BoxXinxi();
        // }
        setTimeout(function() {
          if (flag == 0 && localStorage.getItem("longleftrotateY") == 1) {
            self.recommendShow = true;
            self.BoxXinxi();
          }
        }, 1000);
      });
    },
    //  智能推荐窗口信息
    BoxXinxi() {
      var self = this;
      this.axios({
        url: this.api.RecommendBoxXinxi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res,"信息res")
        self.ReNumber = res.data.data.count;
        self.tuijianCode = res.data.data.batch;
      });
    },
    //未查看信息弹框内容请求
    Relatedxinxi() {
      var self = this;
      // if(localStorage.getItem("seenYN") == 0)
      let params = {
        currentUserId: self.id
      };
      this.axios({
        url: this.api.Governmentofficialsinfomylistapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res.data.data, "信息res");
        self.msgcount = res.data.data.length;
        self.messageData = res.data.data;
        if (
          res.data.code == 0 &&
          localStorage.getItem("seenYN") == 0 &&
          res.data.data.length != 0
        ) {
          self.governmentRelatedShow = true;
        }
      });
    },
    //未查看审批弹框内容请求
    proXinxi() {
      var self = this;
      // if(localStorage.getItem("seenYN") == 0)
      let params = {
        mobile: self.mobile
      };
      this.axios({
        url: this.api.buttShenhecount,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data,"信息res")
        self.procount = res.data.data.totalRow;
        if (
          res.data.code == 0 &&
          localStorage.getItem("proYN") == 0 &&
          res.data.data.totalRow != 0
        ) {
          self.proRelatedShow = true;
        }
      });
    },
    // 处理信息
    msgSub(val) {
      var self = this;
      console.log(val, "已处理信息啊 啊 啊 ");
      if (
        val.messageRemindingModule ==
        "merchants_department_government_check_remind"
      ) {
        self.dialogMsgBox = false;
        this.$router.push("/GovernmentManagement");
        console.log("到了未合作");
      } else if (
        val.messageRemindingModule ==
          "operation_department_leader_check_remind" ||
        val.messageRemindingModule ==
          "operation_department_operator_check_remind"
      ) {
        self.dialogMsgBox = false;
        this.$router.push("/DaiShenhe");
        console.log("到了待审核");
      }
      // let params = {
      //   messageId: val.id
      // }
      // this.axios({
      //   url: this.api.Governmentofficialsinfohandleapi,
      //   method: "post",
      //   data: this.$qs.stringify(params),
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // }).then(res => {
      //   // console.log(res)
      //   if(res.data.code == 0){
      //     this.$message.success('已处理')
      //     this.msgdata()
      //     this.Relatedxinxi()
      //   }
      // })
    },
    //处理后刷新列表
    msgdata() {
      var self = this;
      // if(localStorage.getItem("seenYN") == 0)
      let params = {
        currentUserId: self.id
      };
      this.axios({
        url: this.api.Governmentofficialsinfomylistapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.messageData = res.data.data;
        if (res.data.data.length == 0) {
          // console.log("执行等于0后的处理")
          this.$message("暂无待办事项");
          self.governmentRelatedShow = false;
          self.dialogMsgBox = false;
        }
      });
    },
    //  智能推荐窗口详情按钮
    details() {
      var self = this;
      // alert("不要急，还没做完！")
      this.dialogVisible = true; //列表信息弹窗
      this.recommendShow = false; //智能推荐窗口关闭
      localStorage.setItem("recommendNOorOFF", 1);
      this.CloseYN = false;
      self.loading = true;
      let params = {
        mobile: self.mobile,
        userName: self.realName,
        tuijianCode: self.tuijianCode,
        page: self.page,
        limit: 10
      };
      this.axios({
        url: this.api.RecommendBoxList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res,"弹框信息")
        self.tableData = res.data.data;
        self.total = res.data.count;
        self.loading = false;

        if (res.data.count == 0) {
          self.tishi = "暂无数据";
        }
        var right = document.getElementsByClassName("btn-next");
        right[0].disabled = "";
        // 分页--下一页disabled
        var cot = Math.ceil(self.total / 10);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        } else if (self.page == 1) {
          self.suibian = true;
        }
        // 分页--下一页disabled
      });
    },
    // 分页--回到首页按钮  starte
    paginationsy() {
      if (this.page === 1) {
      } else {
        // this.page = 1
        this.handleCurrentChange(1);
      }
    },
    // 分页--回到首页按钮  end
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      //分页--判断当前页是否为最后一页，禁用右按钮  start
      var cot = Math.ceil(self.total / 10);
      self.suibian = false; //是否禁用首页按钮
      //分页--判断当前页是否为最后一页，禁用右按钮  end
      // console.log(self.page);
      self.details();
    },
    // 智能推荐窗口关闭按钮
    close() {
      this.recommendShow = false;
      localStorage.setItem("recommendNOorOFF", 1);
      this.CloseYN = false;
    },
    //未查看信息关闭按钮
    checkclose() {
      this.governmentRelatedShow = false;
      localStorage.setItem("seenYN", 1);
    },
    checkProClose() {
      this.proRelatedShow = false;
      localStorage.setItem("proYN", 1);
    },
    //弹框关闭按钮
    dialog_close() {
      this.dialogVisible = false;
    },
    //查看未处理消息（关闭）
    msgBox_close() {
      this.dialogMsgBox = false;
    },
    //查看未处理消息（打开）
    openmsgBox() {
      this.dialogMsgBox = true;
    },
    openproBox() {
      this.$router.push("/proExamine");
      this.proRelatedShow = false;
      localStorage.setItem("proYN", 1);
    }
    // 待回访信息跳转
    // msgdetails(msg){
    //   console.log(msg)
    //   if(msg.messageRemindingModule == "merchants_department_next_visit_government_remind"){
    //     console.log("待回访消息")
    //     // self.$router.resolve({
    //     //   path: "/GovernmentDetails",
    //     //   query: { name: Base64.encode() }
    //     // });
    //   }else if(msg.messageRemindingModule == "merchants_department_government_check_remind"){
    //     console.log("待审核消息")
    //   }
    // },
  }
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
/* .ceshi{
  height: 150px;
} */
.test_left {
  overflow-y: auto;
  width: 260px;
  background: #2a2a2a;
  position: fixed;
  top: 100px;
  left: 0;
  bottom: 0;
  z-index: 6;
  overflow-x: hidden;
}
.test_left::-webkit-scrollbar {
  width: 0 !important;
}
.test_left {
  -ms-overflow-style: none;
}
.test_left {
  overflow: -moz-scrollbars-none;
}
.contentWapper {
  min-width: 1180px;
  margin: 10px 10px 10px 270px;
  min-height: 666px;
  height: auto;
  background: #fff;
  border-radius: 6px;
}
footer {
  position: absolute;
  bottom: 0;
}
* {
  list-style: none;
}
i {
  font-style: normal;
}
.crmNevWapper:hover{
   .crmNevImg{
    display: inline-block;
   }
    .crmNev{
    display: inline-block;
    vertical-align: top;
    }
}
.crmNevWapper {
  position: fixed;
  top: 66vh;
  right: 0;
  z-index: 6;
  display: inline-block;
  vertical-align: top;
  .crmNevBut {
    display: inline-block;
    background: #d0121b;
    width: 10px;
    height: 60px;
    border-radius: 6px;
  }
  .crmNevImg{
      display: none;
      height: 10px;
      position: relative;
      bottom: 25px;
  }
  .crmNev{
    display: none;
    position: relative;
    bottom: -29px;
    transform: translateY(-70%);
    ul{
      float: right;
      background: #2a2a2a;
      padding: 18px 30px;
      font-size: 22px;
      line-height: 48px;
      color: #fff;
      border-radius: 10px;
      .whiteBall {
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 1px;
        margin-right: 10px;
        margin-bottom: 4px;
        display: inline-block;
        vertical-align: middle;
      }
      li{
        cursor: pointer;
      }
    }
  }
}
// 白底红字，中间红色突出
// .recommend {
//   width:300px;
//   height:300px;
//   background:rgba(255,255,255,1);
//   box-shadow:0px 0px 9px 1px rgba(135,135,135,0.5);
//   opacity:0.9;
//   padding: 20px;
//   position: fixed;
//   right: 10px;
//   bottom: 10px;
//   z-index: 3;
//   .gengxImg{
//     width: 182px;
//   }
//   .zhinengRedbox{
//     opacity: 1;
//     background: #D1111B;
//         margin: 30px 40px 10px 40px;
//     padding: 10px 0;
//     .zhinengTitle{
//       font-size: 60px;
//       color: #fff;
//       // line-height: 80px;
//       text-align: center;
//       .zhinengTitle_font{
//         line-height: 40px;
//         color: #f35626;
//         background-image: -webkit-linear-gradient(92deg,#f35626,#feab3a);
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//         -webkit-animation: hue .5s infinite linear;
//       }
//       @-webkit-keyframes hue {
//         from {
//           -webkit-filter: hue-rotate(0deg);
//         }
//         to {
//           -webkit-filter: hue-rotate(-360deg);
//         }
//       }
//       i{
//         font-size: 36px;
//       }
//     }
//     .zhinengcontainer{
//       text-align: center;
//       color: #fff;
//       font-size: 24px;
//       line-height: 34px;
//     }

//   }
//   .zndetails{
//     text-align: center;
//     margin-top: 35px;
//     .zhinengdetails{
//       font-weight: 600;
//       outline: none;
//       margin: 0;
//       border: none;
//       background: #D1111B;
//       color: #fff;
//       padding: 2px 24px;
//       border-radius: 25px;
//       text-align: center;
//       font-size: 24px;
//       line-height: 36px;
//       box-shadow:0px 0px 9px 1px rgba(120,10,16,.5);
//       img{
//         width: 11px;
//         height: 18px;
//       }
//     }
//   }
//   b {
//     font-size: 22px;
//     position: absolute;
//     right: 20px;
//     top: 20px;
//     color: #cf111b;
//     line-height: 22px;
//     padding: 0 5px;
//     border-radius: 50%;
//     cursor: pointer;
//   }
// }
// 红底白字，文字闪动版
// .recommend {
//   padding: 20px;
//   position: fixed;
//   right: 10px;
//   bottom: 10px;
//   z-index: 3;
//   background: #D1111B;
//   box-shadow:0px 0px 9px 1px rgba(77,82,84,0.18);
//   width: 310px;
//   height: 280px;
//   .gengxImg{
//     width: 182px;
//   }
//   .zhinengTitle{
//     font-size: 72px;
//     color: #fff;
//     margin-top: 40px;
//     /* margin-bottom: 20px; */
//     line-height: 50px;
//     text-align: center;
//     // .zhinengTitle_font{
//     //   color: #fff;
//     //   animation: fontcolor 3s;
//     // }
//     // @keyframes fontcolor {
//     //   from{color: #fff;}
//     //   to{color: #e1b45c;}
//     // }
//     .zhinengTitle_font{
//       color: #f35626;
//       background-image: -webkit-linear-gradient(92deg,#f35626,#feab3a);
// 		  -webkit-background-clip: text;
// 	    -webkit-text-fill-color: transparent;
// 	    -webkit-animation: hue .5s infinite linear;
//     }
//     @-webkit-keyframes hue {
//       from {
//         -webkit-filter: hue-rotate(0deg);
//       }
//       to {
//         -webkit-filter: hue-rotate(-360deg);
//       }
//     }
//     i{
//       font-size: 24px;
//     }
//   }
//   .zhinengcontainer{
//     text-align: center;
//     color: #fff;
//     font-size: 24px;
//   }
//   .zndetails{
//     text-align: center;
//     margin-top: 35px;
//     .zhinengdetails{
//       font-weight: 600;
//       outline: none;
//       margin: 0;
//       border: none;
//       background: #fff;
//       color: #D1111B;
//       padding: 2px 18px;
//       border-radius: 25px;
//       text-align: center;
//       font-size: 28px;
//       box-shadow:0px 0px 9px 1px rgba(120,10,16,.5);
//       img{
//         width: 11px;
//         height: 18px;
//       }
//     }
//   }
//   b {
//     font-size: 22px;
//     position: absolute;
//     right: 20px;
//     top: 20px;
//     color: #cf111b;
//     line-height: 22px;
//     padding: 0 5px;
//     border-radius: 50%;
//     cursor: pointer;
//   }
// }
//红底白字，长方形
.recommend {
  opacity: 0.8;
  padding: 10px 20px;
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 3;
  background: #d1111b;
  box-shadow: 0px 0px 9px 1px rgba(77, 82, 84, 0.18);
  width: 310px;
  height: 180px;
  .gengxImg {
    width: 130px;
  }
  .zhinengTitle {
    font-size: 40px;
    color: #fff;
    margin-top: 10px;
    line-height: 50px;
    text-align: center;
    .zhinengTitle_font {
      color: #f35626;
      background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-animation: hue 0.5s infinite linear;
    }
    @-webkit-keyframes hue {
      from {
        -webkit-filter: hue-rotate(0deg);
      }
      to {
        -webkit-filter: hue-rotate(-360deg);
      }
    }
    i {
      font-size: 36px;
    }
  }
  .zhinengcontainer {
    text-align: center;
    color: #fff;
    font-size: 24px;
  }
  .zndetails {
    text-align: center;
    margin-top: 15px;
    .zhinengdetails {
      font-weight: 600;
      outline: none;
      margin: 0;
      border: none;
      background: #fff;
      color: #d1111b;
      padding: 2px 9px;
      border-radius: 25px;
      text-align: center;
      font-size: 20px;
      box-shadow: 0px 0px 9px 1px rgba(120, 10, 16, 0.5);
      img {
        width: 7px;
        height: 12px;
      }
    }
  }
  b {
    font-size: 22px;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #cf111b;
    line-height: 22px;
    padding: 0 5px;
    border-radius: 50%;
    cursor: pointer;
  }
}
.governmentRelated {
  opacity: 0.8;
  padding: 10px 20px;
  position: fixed;
  right: 10px;
  bottom: 220px;
  z-index: 3;
  background: #d1111b;
  box-shadow: 0px 0px 9px 1px rgba(77, 82, 84, 0.18);
  width: 310px;
  color: #fff;
  b {
    font-size: 22px;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #cf111b;
    line-height: 22px;
    padding: 0 5px;
    border-radius: 50%;
    cursor: pointer;
  }
  .followedup {
    p {
      i {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
.Appdialog {
  .el-dialog {
    border-radius: 8px;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
    .title_h {
      text-align: center;
      height: 60px;
      line-height: 60px;
      color: black;
      background: #eee;
      font-weight: 600;
      border-radius: 8px 8px 0 0;
    }
    .dialogClose {
      z-index: 222;
      right: -9px;
      top: -9px;
      position: absolute;
      font-size: 20px;
      background: #ccc;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      text-align: center;
      color: #fff;
      cursor: pointer;
      line-height: 25px;
    }
  }
}
.msgdialog {
  .msgSubstyle {
    cursor: pointer;
  }
  .msgSubstyle:hover {
    color: #cf111b;
  }
}
</style>
