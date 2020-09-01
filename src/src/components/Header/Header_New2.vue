<template>
  <div id="header">
    <!-- 头部logo -->
    <div class="header-l">
      <img src="../../assets/images/NewLogo.jpg" style="width:260px;margin-top: 31px;" alt />
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
          <el-menu-item index="10">
            <router-link to="/chainMap">产业链地图</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/Monitoring">产业链监控</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/industryMonitoring">行业监控</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/areaMonitoring">区域监控</router-link>
          </el-menu-item>
          <el-menu-item index="13">
            <router-link to="/Park">园区监控</router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <router-link to="/techindustry">高新技术企业</router-link>
          </el-menu-item>
          <!-- <el-menu-item index="11">
            <router-link  to="/foreigninvestment">外商投资企业</router-link>
          </el-menu-item>-->
          
          

          <el-submenu :disabled="touzijiazhi" index="6">
            <template slot="title">投资价值公司</template>
            <router-link to="/government">
              <el-menu-item :disabled="touzijiazhi" index="6-1">
                <p style="margin:5px;">政府奖励企业</p>
              </el-menu-item>
            </router-link>
            <router-link to="/standardsetting">
              <el-menu-item :disabled="touzijiazhi" index="6-2">
                <p style="margin:5px;">标准制定企业</p>
              </el-menu-item>
            </router-link>
            <router-link to="/majorconstruction">
              <el-menu-item :disabled="enterprise" index="6-3">
                <p style="margin:5px;">重大在建项目企业</p>
              </el-menu-item>
            </router-link>
            <router-link to="/specializedenterprises">
              <el-menu-item :disabled="enterprise" index="6-4">
                <p style="margin:5px;">专项证照企业</p>
              </el-menu-item>
            </router-link>
            <router-link to="/Fellowtownsman">
              <el-menu-item :disabled="enterprise" index="6-5">
                <p style="margin:5px;">老乡企业</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu :disabled="touzijiazhi" index="12">
            <template slot="title">企业排名</template>
            <router-link to="/FortuneFv">
              <el-menu-item index="12-1">
                <p style="margin:5px;">世界500强</p>
              </el-menu-item>
            </router-link>
            <router-link to="/ChinaFv">
              <el-menu-item index="12-2">
                <p style="margin:5px;">中国500强</p>
              </el-menu-item>
            </router-link>
            <router-link to="/ServiceFv">
              <el-menu-item index="12-3">
                <p style="margin:5px;">中国服务业500强</p>
              </el-menu-item>
            </router-link>
            <router-link to="/PrivateFv">
              <el-menu-item index="12-4">
                <p style="margin:5px;">中国民营企业500强</p>
              </el-menu-item>
            </router-link>
            <router-link to="/MorFv">
              <el-menu-item index="12-5">
                <p style="margin:5px;">美国500强</p>
              </el-menu-item>
            </router-link>
            <router-link to="/NewEconomyFv">
              <el-menu-item index="12-6">
                <p style="margin:5px;">新经济500强</p>
              </el-menu-item>
            </router-link>
            <router-link to="/Industryranking">
              <el-menu-item index="12-7">
                <p style="margin:5px;">行业排名</p>
              </el-menu-item>
            </router-link>
            <!-- <router-link  to="/StateEnterprise">
              <el-menu-item index="12-7">
                <p style="margin:5px;">国有企业</p>
              </el-menu-item>
            </router-link>
            <router-link  to="/CentralEnterprises">
              <el-menu-item index="12-7">
                <p style="margin:5px;">央企</p>
              </el-menu-item>
            </router-link>-->
          </el-submenu>

          <el-submenu :disabled="Agu" index="7">
            <template slot="title">上市公司</template>
            <el-submenu index="7-1">
              <template slot="title">A股公司</template>
              <router-link to="/equitypledge">
                <el-menu-item index="7-1-1">
                  <p style="margin:5px;">股权质押</p>
                </el-menu-item>
              </router-link>
              <router-link to="/equityincentive">
                <el-menu-item index="7-1-2">
                  <p style="margin:5px;">股权激励</p>
                </el-menu-item>
              </router-link>
              <router-link to="/sharerepurchase">
                <el-menu-item index="7-1-3">
                  <p style="margin:5px;">股份回购</p>
                </el-menu-item>
              </router-link>
            </el-submenu>

            <el-submenu index="7-2">
              <template slot="title">海外上市公司</template>
              <router-link to="/stockExchange">
                <el-menu-item index="7-2-1">
                  <p style="margin:5px;">美股中概股</p>>
                </el-menu-item>
              </router-link>
              <router-link to="/ah">
                <el-menu-item index="7-2-2">
                  <p style="margin:5px;">A+H公司</p>
                </el-menu-item>
              </router-link>
              <router-link to="/hongKongGEM">
                <el-menu-item index="7-2-3">
                  <p style="margin:5px;">香港创业板</p>
                </el-menu-item>
              </router-link>
              <router-link to="/hongKongRedChips">
                <el-menu-item index="7-2-4">
                  <p style="margin:5px;">香港红筹股</p>
                </el-menu-item>
              </router-link>
            </el-submenu>

            <el-submenu index="7-3">
              <template slot="title">三板公司</template>
              <router-link to="/innovationlayer">
                <el-menu-item index="7-3-1">
                  <p style="margin:5px;">三板创新层</p>
                </el-menu-item>
              </router-link>
              <router-link to="/listedcompany">
                <el-menu-item index="7-3-2">
                  <p style="margin:5px;">三板拟挂牌公司</p>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </el-submenu>

          <el-submenu :disabled="touzijigou" index="8">
            <template slot="title">投资机构</template>
            <el-submenu index="8-1">
              <template slot="title">投资机构</template>
              <router-link to="/privateOfferingFund">
                <el-menu-item :disabled="Finance" index="8-1-1">
                  <p style="margin:5px;">私募基金</p>
                </el-menu-item>
              </router-link>
              <router-link to="/lp">
                <el-menu-item :disabled="Finance" index="8-1-2">
                  <p style="margin:5px;">私募基金LP</p>
                </el-menu-item>
              </router-link>
              <router-link to="/parentfund">
                <el-menu-item :disabled="Finance" index="8-1-3">
                  <p style="margin:5px;">母基金</p>
                </el-menu-item>
              </router-link>
              <!-- <router-link  to="/foreigninvestment">
                <el-menu-item :disabled="waishangtouzi" index="8-1-4">
                  <p style="margin:5px;">外商投资企业</p>
                </el-menu-item>
              </router-link>-->
              <router-link to="/privateindustry">
                <el-menu-item :disabled="minyingchanye" index="8-1-5">
                  <p style="margin:5px;">民营产业集团</p>
                </el-menu-item>
              </router-link>
            </el-submenu>

            <el-submenu index="8-2">
              <template slot="title">政府投资平台</template>
              <router-link to="/localfinancing">
                <el-menu-item index="8-2-1">
                  <p style="margin:5px;">地方融资平台</p>
                </el-menu-item>
              </router-link>
              <router-link to="/investmentPlatform">
                <el-menu-item index="8-2-2">
                  <p style="margin:5px;">政府高新投资平台</p>
                </el-menu-item>
              </router-link>
              <router-link to="/guidanceFund">
                <el-menu-item index="8-2-3">
                  <p style="margin:5px;">政府产业引导基金</p>
                </el-menu-item>
              </router-link>
            </el-submenu>

            <el-submenu index="8-3">
              <template slot="title">投融资事件</template>
              <router-link to="/Declareipo">
                <el-menu-item index="8-3-2">
                  <p style="margin:5px;">申报IPO公司</p>
                </el-menu-item>
              </router-link>
              <router-link to="/privatePlacement">
                <el-menu-item index="8-3-3">
                  <p style="margin:5px;">融资事件</p>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </el-submenu>
          <!-- <el-submenu :disabled="VIP" index="9">
            <template slot="title">SVIP</template>
            <router-link to="VipCompany">
              <el-menu-item index="9-2">
                <p style="margin:5px;">优质企业查询</p>
              </el-menu-item>
            </router-link>
            <router-link to="VipGovernment">
              <el-menu-item index="9-3">
                <p style="margin:5px;">政府查询</p>
              </el-menu-item>
            </router-link>
            <router-link to="VipData">
              <el-menu-item index="9-4">
                <p style="margin:5px;">企业查询</p>
              </el-menu-item>
            </router-link>
            3.20 <router-link  to="nubp">
              <el-menu-item index="9-5">
                <p style="margin:5px;">VIP电话导出</p>
              </el-menu-item>
            </router-link>
            <router-link to="NtkMnkjW">
              <el-menu-item index="9-6">
                <p style="margin:5px;">线索收集</p>
              </el-menu-item>
            </router-link>
            3.20 <router-link  to="VipRelated">
              <el-menu-item index="9-7">
                <p style="margin:5px;">VIP相关企业导出</p>
              </el-menu-item>
            </router-link>
            <router-link to="VipReport">
              <el-menu-item index="9-7">
                <p style="margin:5px;">分析报表</p>
              </el-menu-item>
            </router-link>
          </el-submenu> -->
        </el-menu>
      </div>
      <!-- 头部搜索 -->
      <div class="header_search">
        <!-- 下拉 -->
          <!-- 输入框 -->
        <el-input
          v-model="search"
          class="input-with-select input_display"
          @keyup.enter.native="KeyUpDelete"
          placeholder="请输入公司名称或经营范围关键字"
        >
        </el-input>
          <!-- <el-cascader
          class="down_city"
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          ></el-cascader> -->
        <div class="search_button">
        <!-- 复选 -->
            <!-- <el-radio-group class="chaxun" v-model="radio">
              <el-radio :label="3">查公司名称</el-radio>
              <el-radio :label="6">查经营范围</el-radio>
            </el-radio-group> -->
        <!-- 按钮 -->
          <el-button class="el-button fwhover" slot="append" @click="searchInfo">
          </el-button>
        </div>

        <!-- <input type="text">
        <button></button>-->
      </div>
    </div>
    <!-- 天气 -->
    <!-- <iframe class="weather" allowtransparency="true" frameborder="0" width="290" height="96" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=1&z=3&d=2&bd=0&k=&f=&ltf=009944&htf=cc0000&q=0&e=0&a=1&c=54511&w=290&h=96&align=center"></iframe> -->
    <div class="header-r">
      <div class="header-hover">
        <img src="../../assets/images/user.png" alt />
        <div class="header-user">
          <ul>
            <li>
              <p class="tep">{{ userName }}</p>
              <p>
                <i></i>付费用户
              </p>
            </li>
            <router-link to="/user" tag="a">
              <p>
                <i></i>用户信息
              </p>
            </router-link>
            <router-link to="/changepassword" tag="a">
              <p>
                <i></i>修改密码
              </p>
            </router-link>
            <li>
              <p>
                <span @click="changeZoom(2)">缩小</span>
                <el-divider direction="vertical"></el-divider>
                <span @click="changeZoom(1)">放大</span>
              </p>
            </li>
            <!-- <li>
              <p>切换样式</p>
            </li> -->
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
import { provinceAndCityDataPlus,CodeToText} from 'element-china-area-data'
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
      userName: "",
      // radio: 3,
      options: provinceAndCityDataPlus,
      selectedOptions: '',
      city_sheng: '',
      city_shi: '',
    };
  },

  mounted() {
    var self = this;
    self.search = this.$route.query.name
      ? self.Base64.decode(this.$route.query.name)
      : "";
    // console.log(self.search,"999")
    let p = document.querySelectorAll(" .el-menu a .el-menu-item");
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
    let userName = localStorage.getItem("userName");
    this.userName = userName;
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
      document.body.style.zoom = self.zoom;
    },
    // 删除localStorage本地储存
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
    },
    // 经营范围等（版本）
    // searchInfo() {
    //   var self = this;
    //   if (this.search) {
    //     let routeUrl = this.$router.push({
    //       path: "/searchList",
    //       query: { name: Base64.encode(self.search), X: self.radio, City: Base64.encode(self.city_sheng),Ctry: Base64.encode(self.city_shi)}
    //     });
    //     // window.open(routeUrl.href, "_blank");
    //     this.$store.state.name = this.search;
    //     this.$store.state.X = this.radio;
    //     this.$store.state.City = this.city_sheng;
    //     this.$store.state.Ctry = this.city_shi;
    //     self.activeIndex = "1";
    //   } else {
    //   }
    // },
    searchInfo() {
      var self = this;
      if (this.search) {
        let routeUrl = this.$router.push({
          path: "/searchList",
          query: { name: Base64.encode(self.search)}
        });
        this.$store.state.name = this.search;
        self.activeIndex = "1";
      } else {
      }
    },
    KeyUpDelete: function() {
      this.searchInfo();
    },
    // handleChange(value){
    //   console.log(value)
    //   this.city_sheng = CodeToText[value[0]]
    //   this.city_shi = CodeToText[value[1]]
    // }
  }
};
</script>
<style lang="scss">
@import "./header.scss";
</style>

