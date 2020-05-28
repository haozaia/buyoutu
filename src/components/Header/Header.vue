<template>
<!-- 新版222222222 -->
<div id="header">
  <div class="header-l">
    <img src="../../assets/images/newlogo2.png" @click="gohome" style="width:345px; height:68px;cursor:pointer;" alt />
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
    <a class="colorH HeaderRteaHot fontSize20" @click="fxbaobiao">地图搜索</a>
    <span class="color9 TeSpan"></span>
    <a class="color3 HeaderRtea fontSize20" @click="qydaochu">企业导出</a>
    </div>
    <span class="color3 fontSize20"><span>{{ this.userName }}</span></span>
    <div class="header-hover">
      <img src="../../assets/images/user2.png" style="width:54px;height:54px;" alt />
      <div class="header-user">
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
              <img src="../../assets/images/user3.svg" style="width:20px;height:20px;" alt="">
              <p class="fontSize20">用户信息</p>
            </li>
            <li @click="Gpassword">
              <img src="../../assets/images/modify.svg" style="width:20px;height:20px;" alt="">
              <p class="fontSize20">修改密码</p>
            </li>
            <li @click="outlogin">
              <img src="../../assets/images/Exit.svg" style="width:20px;height:20px;" alt="">
              <p class="fontSize20">账户退出</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
    <!-- <div class="test_left"></div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      userName: "",
      EndTime: "",
      RM1:"新基建",
      RM2:"口罩",
      RM3:"行业龙头",
    };
  },
  mounted() {
    this.userName = localStorage.getItem("userName");
    this.EndTime = localStorage.getItem("EndTime");
  },
  methods: {
    searchInfo() {
      console.log("111")
      var self = this;
      if (self.search) {
        let routeUrl = this.$router.push({
          path: "/searchList",
          query: { name: Base64.encode(self.search)}
        });
        this.$store.state.name = self.search;
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
      localStorage.removeItem("userRole"); //用户类型
      localStorage.removeItem("dflUuid"); //用户ID
      localStorage.removeItem("StartTime"); //开始时间
      localStorage.removeItem("EndTime"); //到期时间
      localStorage.removeItem("id"); //主键id
      localStorage.removeItem("unit"); //所在单位
      localStorage.removeItem("post"); //职位
      localStorage.removeItem("realName"); //真实姓名
      localStorage.removeItem("mobile"); //电话号码
      localStorage.removeItem("email"); //邮箱
      localStorage.removeItem("userDress"); //地址
      localStorage.removeItem("userName"); //登录用户名
      localStorage.removeItem("token"); //token
      localStorage.removeItem("home"); //登录后的首页
      localStorage.removeItem("NavMenu"); //菜单
      this.$router.push("/");
    },
    qydaochu() {
      this.$router.push("/VipData")
    },
    fxbaobiao() {
      this.$router.push("/mapSearch")
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
</style>
