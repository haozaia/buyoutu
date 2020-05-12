<template>
  <div id="header">
    <!-- 头部logo -->
    <div class="header-l">
      <img
        src="../../assets/images/NewLogo.jpg"
        style="width:260px;margin-top: 31px;"
        alt
      />
    </div>
    <!-- 头部导航 -->
    <div class="header-c">
      <div class="header_nav">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          text-color="black"
        >
          <el-menu-item index="1" id="home" style="background:none;" @click="getHome()">首页</el-menu-item>
          <!-- <el-menu-item index="1">首页</el-menu-item> -->
          <!-- <el-menu-item index="2"> <router-link target="_blank" to="/Monitoring">产业链监控 </router-link></el-menu-item>
          <el-menu-item index="3"> <router-link target="_blank" to="/industryMonitoring">行业监控 </router-link></el-menu-item>
          <el-menu-item index="4"> <router-link target="_blank" to="/areaMonitoring">区域监控 </router-link></el-menu-item>
          <el-menu-item index="4"> <router-link target="_blank" to="/areaMonitoring">区域监控 </router-link></el-menu-item> -->
          <el-submenu :disabled="enterprise" index="2">
            <template slot="title">行业/区域监控</template>
            <router-link target="_blank" to="/Monitoring">
              <el-menu-item index="2-1">
                <p style="margin:5px;">产业链监控</p>
              </el-menu-item>
            </router-link>

            <router-link target="_blank" to="/industryMonitoring">
              <el-menu-item index="2-2">
                <p style="margin:5px;">行业监控</p>
              </el-menu-item>
            </router-link>

            <router-link target="_blank" to="/areaMonitoring">
              <el-menu-item index="2-3">
                <p style="margin:5px;">区域监控</p>
              </el-menu-item>
            </router-link>
          </el-submenu>

          <el-submenu :disabled="touzijiazhi" index="3">
            <template slot="title">投资价值公司</template>
            <router-link target="_blank" to="/techindustry">
              <el-menu-item :disabled="touzijiazhi" index="3-1">
                <p style="margin:5px;">高新技术企业</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/government">
              <el-menu-item :disabled="touzijiazhi" index="3-2">
                <p style="margin:5px;">政府奖励企业</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/standardsetting">
              <el-menu-item :disabled="touzijiazhi" index="3-5">
                <p style="margin:5px;">标准制定企业</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/majorconstruction">
              <el-menu-item :disabled="enterprise" index="3-3">
                <p style="margin:5px;">重大在建项目企业</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/specializedenterprises">
              <el-menu-item :disabled="enterprise" index="3-4">
                <p style="margin:5px;">专项证照企业</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu :disabled="Agu" index="4">
            <template slot="title">A股公司</template>
            <router-link target="_blank" to="/equitypledge">
              <el-menu-item index="4-1">
                <p style="margin:5px;">股权质押</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/equityincentive">
              <el-menu-item index="4-2">
                <p style="margin:5px;">股权激励</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/sharerepurchase">
              <el-menu-item index="4-3">
                <p style="margin:5px;">股份回购</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu :disabled="Finance" index="5">
            <template slot="title">海外上市公司</template>
            <router-link target="_blank" to="/stockExchange">
              <el-menu-item index="5-1">
                <p style="margin:5px;">美股中概股</p>>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/ah">
              <el-menu-item index="5-2">
                <p style="margin:5px;">A+H公司</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/hongKongGEM">
              <el-menu-item index="5-3">
                <p style="margin:5px;">香港创业板</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/hongKongRedChips">
              <el-menu-item index="5-4">
                <p style="margin:5px;">香港红筹股</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu :disabled="Finance" index="6">
            <template slot="title">创新发展</template>
            <router-link target="_blank" to="/innovationlayer">
              <el-menu-item index="6-1">
                <p style="margin:5px;">三板创新层</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/listedcompany">
              <el-menu-item index="6-2">
                <p style="margin:5px;">三板拟挂牌公司</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu :disabled="touzijigou" index="7">
            <template slot="title">投资机构</template>
            <router-link target="_blank" to="/privateOfferingFund">
              <el-menu-item :disabled="Finance" index="7-1">
                <p style="margin:5px;">私募基金</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/lp">
              <el-menu-item :disabled="Finance" index="7-2">
                <p style="margin:5px;">私募基金LP</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/parentfund">
              <el-menu-item :disabled="Finance" index="7-3">
                <p style="margin:5px;">母基金</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/foreigninvestment">
              <el-menu-item :disabled="waishangtouzi" index="7-4">
                <p style="margin:5px;">外商投资企业</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/privateindustry">
              <el-menu-item :disabled="minyingchanye" index="7-5">
                <p style="margin:5px;">民营产业集团</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu :disabled="government" index="8">
            <template slot="title">政府投资平台</template>
            <router-link target="_blank" to="/localfinancing">
              <el-menu-item index="8-1">
                <p style="margin:5px;">地方融资平台</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/investmentPlatform">
              <el-menu-item index="8-2">
                <p style="margin:5px;">政府高新投资平台</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/guidanceFund">
              <el-menu-item index="8-3">
                <p style="margin:5px;">政府产业引导基金</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu :disabled="Finance" index="9">
            <template slot="title">投融资事件</template>
            <router-link target="_blank" to="/Declareipo">
              <el-menu-item index="9-2">
                <p style="margin:5px;">申报IPO公司</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="/privatePlacement">
              <el-menu-item index="9-3">
                <p style="margin:5px;">融资事件</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu :disabled="VIP" index="10">
            <template slot="title">SVIP</template>
            <router-link target="_blank" to="VipCompany">
              <el-menu-item index="10-2">
                <p style="margin:5px;">VIP客户</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="VipGovernment">
              <el-menu-item index="10-3">
                <p style="margin:5px;">VIP政府</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="VipData">
              <el-menu-item index="10-4">
                <p style="margin:5px;">VIP数据</p>
              </el-menu-item>
            </router-link>
            <router-link target="_blank" to="nubp">
              <el-menu-item index="10-4">
                <p style="margin:5px;">VIP电话</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </div>
      <!-- 头部搜索 -->
      <div class="header_search">
        <el-input
          v-model="search"
          class="input-with-select"
          @keyup.enter.native="KeyUpDelete"
          placeholder="请输入公司名称、所属区域等关键字"
        >
          <el-button class="el-button" slot="append" @click="searchInfo"></el-button>
        </el-input>
        <!-- <input type="text">
        <button></button>-->
      </div>
    </div>
    <!-- 天气 -->
    <!-- <iframe class="weather" allowtransparency="true" frameborder="0" width="290" height="96" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=1&z=3&d=2&bd=0&k=&f=&ltf=009944&htf=cc0000&q=0&e=0&a=1&c=54511&w=290&h=96&align=center"></iframe> -->
    <div class="header-r">
      <div class="header-hover">
        <img src="../../assets/images/user.png" alt/>
        <div class="header-user">
          <ul>
            <li>
              <p class="tep">{{ userName }}</p>
              <p><i></i>付费用户</p>
            </li>
            <router-link target="_blank" to="/user" tag="a">
              <p><i></i>用户信息</p>
            </router-link>
            <router-link target="_blank" to="/changepassword" tag="a">
              <p><i></i>修改密码</p>
            </router-link>
            <li>
              <p>
                <span @click="changeZoom(2)">缩小</span>
                <el-divider direction="vertical"></el-divider>
                <span @click="changeZoom(1)">放大</span>
              </p>
            </li>
            <li @click="outlogin">
              <p>
                <i></i>退出登录
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userInfo } from "os";
export default {
  data() {
    return {
      search: "",
      activeIndex: "1",
      home: "",
      enterprise: true, //企业版A
      Finance: true, //金融版B
      government: true, //政府版C
      touzijigou: true, //投资机构
      Agu: true, //A股公司
      VIP: true,
      touzijiazhi: true, //投资价值
      waishangtouzi: true, //外商投资
      minyingchanye: true, //民营产业
      zoom: 1,
      userName: '',
    };
  },

  mounted() {
    var self = this
    self.search=this.$route.query.name?self.Base64.decode(this.$route.query.name):""
    // console.log(self.search,"999")
    let p = document.querySelectorAll(".el-menu .el-menu-item");
    for (var i = 0; i < p.length; i++) {
      if (i % 2 == 0) {
        p[i].style.background = "#fafafa";
      }
    }
  //   window.addEventListener('hashchange', function (e) { 
  //   console.log(e.oldURL);    
  //   console.log(e.newURL)
  // }, false)
    // this.home = this.$router.path
    // 判断用户等级显示相应模块
    let Userlevel = localStorage.getItem("userRole");
    let userName = localStorage.getItem('userName')
    this.userName = userName
    // console.log(this.userName,111)
    if (Userlevel === "A") {
      this.enterprise = false;
      this.Agu = false;
      this.touzijiazhi = false;
      this.touzijigou = false;
      this.waishangtouzi = false;
      this.minyingchanye = false;
    } else if (Userlevel === "B") {
      this.Agu = false;
      this.Finance = false;
      this.touzijigou = false;
    } else if (Userlevel === "C") {
      this.government = false;
      this.waishangtouzi = false;
      this.minyingchanye = false;
      this.touzijigou = false;
      this.touzijiazhi = false;
      this.enterprise = false;
    } else if (Userlevel === "S") {
      this.enterprise = false;
      this.Finance = false;
      this.government = false;
      this.waishangtouzi = false;
      this.minyingchanye = false;
      this.touzijigou = false;
      this.Agu = false;
      this.touzijiazhi = false;
      this.VIP = false;
    }
  },

  methods: {
    changeZoom(type) {
      var self = this;
      console.log(self.zoom);
      if (type == 1) {
        if (self.zoom < 2) {
          self.zoom += 0.1;
        } else {
          alert("当前已放大到最大倍数");
        }
      } else if (type == 2) {
        if (self.zoom > 0.5) {
          self.zoom -= 0.1;
        } else {
          alert("当前已缩小到最小倍数");
        }
      }
       document.body.style.zoom=self.zoom;
    },
    // 删除localStorage本地储存
    outlogin() {
      localStorage.removeItem("userRole");  //用户类型
      localStorage.removeItem("dflUuid"); //用户ID
      localStorage.removeItem("StartTime"); //开始时间
      localStorage.removeItem("EndTime"); //到期时间
      localStorage.removeItem("id");  //主键id
      localStorage.removeItem("unit");  //所在单位
      localStorage.removeItem("post");  //职位
      localStorage.removeItem("realName");  //真实姓名
      localStorage.removeItem("mobile");  //电话号码
      localStorage.removeItem("email");  //邮箱
      localStorage.removeItem("userDress");  //地址
      localStorage.removeItem("userName");  //登录用户名
      localStorage.removeItem("token");  //token
      localStorage.removeItem("home");  //登录后的首页
      this.$router.push("/");
    },
    getHome() {
      let Userlevel = localStorage.getItem("userRole");
      if (Userlevel === "A") {
        this.$router.push("/qyh");
      } else if (Userlevel === "B") {
        this.$router.push("/jrh");
      } else if (Userlevel === "C") {
        this.$router.push("/zfh");
      } else if (Userlevel === "S") {
        this.$router.push("/home");
      }
      self.activeIndex = "1";
      // console.log(self. activeIndex)
    },
    searchInfo() {
      var self = this;
      if (this.search) {
        let routeUrl = this.$router.resolve({
          path: "/searchList",
          query: { name:  Base64.encode(self.search) }
        });
        window.open(routeUrl.href, "_blank");
        this.$store.state.name = this.search;
        self.activeIndex = "1";
      } else {
      }
    },
    KeyUpDelete: function() {
      this.searchInfo();
    }
  }
};
</script>
<style lang="scss">
@import "./header.scss";
</style>

