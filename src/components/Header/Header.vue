<template>
<!-- 新版 -->
<div id="header">
  <!-- 头部logo -->
  <div class="header-l">
    <img src="../../assets/images/LogoFTE.png" @click="gohome" style="height:68px;cursor:pointer;" alt />
  </div>

  <div class="header-c">
    <input v-model="search" @keyup.enter="Entr_Search" class="header_input color3 colorF1E fontSize20" type="text" placeholder="请输入搜索关键字">
    <button class="header_btn colorR" @click="searchInfo" ></button>
  </div>
  <div class="hot">
    <!-- <p class="fontSize20 color53">热门搜索：<span @click="JiJian()">{{ RM1 }}</span><span @click="goSearchList(RM3)">{{ this.RM3 }}</span></p> -->
    <!-- <p class="fontSize20 color53">热门搜索：<span @click="JiJian()">{{ RM1 }}</span>&nbsp;&nbsp;<span @click="goIndustryLeader()">{{ this.RM3 }}</span></p> -->
    <p class="fontSize20 color53">热门搜索：<span @click="goIndustryLeader()">{{ this.RM3 }}</span></p>
  </div>
  <div class="header-r">
    <div class="HeaderRclick">
    <a class="colorH HeaderRteaHot fontSize20" @click="routerPush('mapSearch')">地图搜索</a>
    <span class="color9 TeSpan" ></span>
    <a class="MoreApplications fontSize20">更多应用
      <div  class="MoreApplications_ul">
        <ul>
          
          <li @click="routerPush('favoriteList')">
            <p class="fontSize20">我的收藏</p>
          </li>
          <li @click="routerPush('IndustryResearchReport')">
            <p class="fontSize20">行业研报</p>
          </li>
          <li @click="routerPush('Prospectus')">
            <p class="fontSize20">招股书</p>
          </li>
          <li @click="routerPush('privatePlacement')">
            <p class="fontSize20">融资事件</p>
          </li>
          <li @click="distributionMap">
            <p class="fontSize20">行业统计</p>
          </li>
          <li @click="distribuMap">
            <p class="fontSize20">行业分布</p>
          </li>
           <div class="divider" v-if="unitCode==3||unitCode==8||unitCode==1"></div>
          <li v-if="unitCode==3||unitCode==8||unitCode==1" @click="routerPush('VipData')">
            <p class="fontSize20">企业导出</p>
          </li>
          <li v-if="unitCode==3||unitCode==8||unitCode==1" @click="routerPush('importCom')">
            <p class="fontSize20">企业导入</p>
          </li>
          <!-- <li v-if="unitCode==3||unitCode==8||unitCode==1" @click="routerPush('fiveAddTwo')">
            <p class="fontSize20">项目5+2</p>
          </li>
          <li v-if="unitCode==3||unitCode==8||unitCode==1" @click="routerPush('proMeeting')">
            <p class="fontSize20">项目对接会</p>
          </li>
          <li v-if="unitCode==3||unitCode==8||unitCode==1" @click="routerPush('proExamine')">
            <p class="fontSize20">项目审核</p>
          </li> -->
          <!-- <div class="divider" v-if="unitCode==2||unitCode==8||unitCode==1"></div> -->
          <!-- <li  v-if="unitCode==2||unitCode==8||unitCode==1" @click="routerPush('GovernmentManagement')">
            <p class="fontSize20">未合作政府</p>
          </li> -->
          <!-- <li @click="routerPush('GovernmentCooperative')">
            <p class="fontSize20">已合作政府</p>
          </li> -->
        </ul>
      </div>
    </a>
    <!-- <a class="color3 HeaderRtea fontSize20"  @click="myFavorite">我的收藏</a> -->
    </div>
    <span class="color3 fontSize20"><span>{{ this.userName }}</span></span>
    <div class="header-hover">
      <img src="../../assets/images/user2.png" style="width:54px;height:54px;" alt />
      <!-- <div class="header-user">
        <div class="user-t">
          <img src="../../assets/images/user2.png" style="width:54px;height:54px;"/>
          <div class="usert-r">
            <p class="color3 fontSize20">用户：<span>{{ this.userName }}</span></p>
            <p class="colorH fontSize20">到期时间：<span>{{ this.EndTime }}</span></p>
          </div>
        </div>
        <div class="user-b">
          <ul>
            <li @click="Guser">
              <p class="fontSize20">用户信息</p>
            </li>
            <li @click="Gpassword">
              <p class="fontSize20">修改密码</p>
            </li>
            <li @click="outlogin">
              <p class="fontSize20">账户退出</p>
            </li>
          </ul>
        </div>
      </div> -->
      <div class="header-user">
        <div class="user-b">
          <ul>
            <li @click="Guser">
              <p class="fontSize20">用户信息</p>
            </li>
            <li @click="Gpassword">
              <p class="fontSize20">修改密码</p>
            </li>
            <!-- <li v-if="unitCode==3" @click="qydaochu">
              <p class="fontSize20">企业导出</p>
            </li>
            <li v-if="unitCode==3" @click="qydaoru">
              <p class="fontSize20">企业导入</p>
            </li> -->
            <li @click="outlogin">
              <p class="fontSize20">账户退出</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
      center
      :fullscreen="false"
      id="distributionMapDialog"
      v-if = "dialogVisibles"
      width="1614px"
      :modal-append-to-body="false"
      top="4vh"
      :visible.sync="dialogVisibles"
    >
      <distributionMap  ></distributionMap>
    </el-dialog>
  <el-dialog
      center
      :fullscreen="false"
      id="distributionMapDialog"
      v-if = "distribuMapVisibles"
      width="1614px"
      :modal-append-to-body="false"
      top="4vh"
      :visible.sync="distribuMapVisibles"
    >
      <distribuMap ></distribuMap>
    </el-dialog>
    <!-- <div class="test_left"></div> -->
</div>
</template>
<script>
  import distributionMap from "../../views/Firstpage/distributionMap";
  import distribuMap from "../../views/Firstpage/distribuMap";
export default {
  data() {
    return {
      dialogVisibles:false,
      distribuMapVisibles:false,
      search: "",
      userName: "",
      EndTime: "",
      RM1:"新基建",
      RM2:"口罩",
      RM3:"行业龙头",
      unitCode:'',
    };
  },
    components: {
    distributionMap,
    distribuMap,
  },
  mounted() {
    this.userName = localStorage.getItem("userName");
    this.EndTime = localStorage.getItem("EndTime");
    this.unitCode = localStorage.getItem("unitCode");
    // console.log(this.unitCode,"unitCode")
    if(this.search == "" && this.$route.query.name != undefined){
      // console.log(this.$route.query.name,"window.location.href1")
      this.search = Base64.decode(this.$route.query.name);
    }
  },
  watch: {
    search(val) {
        if(val == ""){
          // console.log(this.$route.query.name,"window.location.href1")
          self.search = Base64.decode(this.$route.query.name);
        }
    }
  },
  methods: {
    searchInfo() {
      // console.log("111")
      var self = this;

      if (self.search) {
        let routeUrl = this.$router.push({
          path: "/searchList",
          query: { name: Base64.encode(self.search)}
        });
        // this.$store.state.name = self.search;
      } else {
      }
    },
    Entr_Search() {
      this.searchInfo()
    },
    gohome() {
      this.$router.push('/home')
    },
    // user操作
    Gpassword() {
      this.$router.push("/changepassword");
    },
    Guser() {
      this.$router.push("/user");
    },
    outlogin() {
      // localStorage.removeItem("userRole"); //用户类型
      // localStorage.removeItem("dflUuid"); //用户ID
      // localStorage.removeItem("StartTime"); //开始时间
      // localStorage.removeItem("EndTime"); //到期时间
      // localStorage.removeItem("id"); //主键id
      // localStorage.removeItem("unit"); //所在单位
      // localStorage.removeItem("post"); //职位
      // localStorage.removeItem("realName"); //真实姓名
      // localStorage.removeItem("mobile"); //电话号码
      // localStorage.removeItem("email"); //邮箱
      // localStorage.removeItem("userDress"); //地址
      // localStorage.removeItem("userName"); //登录用户名
      // localStorage.removeItem("token"); //token
      // localStorage.removeItem("home"); //登录后的首页
      // localStorage.removeItem("NavMenu"); //菜单
      // localStorage.removeItem("unitCode"); //菜单
      // localStorage.removeItem("longleftrotateY"); //动画开关
      // localStorage.removeItem("longleftrotateY"); //动画开关
      localStorage.clear();
      this.$router.push("/");
    },
    routerPush(val){
      this.$router.push(val)
    },
    distributionMap() {
      this.dialogVisibles = true
    },
    distribuMap() {
      this.distribuMapVisibles = true
    },
    // 新基建
    JiJian() {
      var self = this
      let RM1Search = this.$router.push({
        path: "/NewJJ",
        query: { name: Base64.encode(self.RM1)}
      });
    },
    // 口罩、呼吸机
    // goSearchList(RMSS) {
    //   var self = this
    //   let routeUrl = this.$router.push({
    //     path: "/IndustryLeader",
    //     query: { name: Base64.encode(RMSS)}
    //   });
    //   this.$store.state.name = RMSS;
    //   self.search = RMSS
    // }
    // 行业头牌
    goIndustryLeader() {
      this.$router.push('/IndustryLeader')
    }
  }
};
</script>
<style lang="scss">
@import "./header.scss";
#distributionMapDialog{
  .el-dialog__header {
    padding: 0;
}
.el-dialog__headerbtn{
  z-index: 2;
}
.el-dialog--center .el-dialog__body{
  padding: 0;
}
.el-dialog__headerbtn:hover .el-dialog__close {
    color: #cf111b;
}
.el-dialog--center{
  border-radius: 6px 6px 0 0;
}
}
</style>
