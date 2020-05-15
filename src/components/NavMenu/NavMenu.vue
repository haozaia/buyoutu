<template>
  <div id="NavContent">
    <el-col>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        text-color="#fff"
        router
        active-text-color="#fff"
        unique-opened
        @select="handleSelect"
      >
        <el-menu-item index="home">
          <img class="icons" src="../../assets/images/navIcon/icon_shouye.svg" /> 首页
        </el-menu-item>
        <el-menu-item index="industryMonitoring">
          <img class="icons" src="../../assets/images/navIcon/icon_hangye_jk.svg" />
          行业监控
        </el-menu-item>
        <el-menu-item index="Monitoring">
          <img class="icons" src="../../assets/images/navIcon/icon_chanye_jk.svg" />
          产业链监控
        </el-menu-item>

        <el-menu-item index="areaMonitoring">
          <img class="icons" src="../../assets/images/navIcon/icon_quyu_jk.svg" />
          区域监控
        </el-menu-item>
        <el-menu-item index="chainMap">
          <img class="icons" src="../../assets/images/navIcon/icon_chanyemap.svg" />
          产业地图
        </el-menu-item>

        <router-link to="/Park" >
          <el-menu-item  @click="addKeyP()">
             <img class="icons" src="../../assets/images/navIcon/icon_yuanqu_jk.svg" />
            园区监控
          </el-menu-item>
        </router-link>

        <router-link to="/techindustry" >
          <el-menu-item  index="techindustry"  @click="addKey()">
            <img class="icons" src="../../assets/images/navIcon/icon_gaoxin_qiye.svg" />
            高新技术企业
          </el-menu-item>
        </router-link>
        

        <el-submenu index="6" class="oneNav">
          <template slot="title">
            <img class="icons" src="../../assets/images/navIcon/icon_touzijiazhi.svg" /> 投资价值公司
          </template>
          <router-link to="/government">
            <el-menu-item index="6-1">
              <p style="margin:2px;">
                <span class="whiteBall"></span>政府奖励企业
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/standardsetting">
            <el-menu-item index="6-2">
              <p style="margin:2px;">
                <span class="whiteBall"></span>标准制定企业
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/majorconstruction">
            <el-menu-item index="6-3">
              <p style="margin:2px;">
                <span class="whiteBall"></span>重大在建项目企业
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/specializedenterprises">
            <el-menu-item index="6-4">
              <p style="margin:2px;">
                <span class="whiteBall"></span>专项证照企业
              </p>
            </el-menu-item>
          </router-link>
        </el-submenu>

        <el-submenu index="12" class="oneNav">
          <template slot="title">
            <img class="icons" src="../../assets/images/navIcon/icon_paiming_qiye.svg" /> 企业排名
          </template>
          <router-link to="/FortuneFv">
            <el-menu-item index="12-1">
              <p style="margin:2px;">
                <span class="whiteBall"></span>世界500强
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/ChinaFv">
            <el-menu-item index="12-2">
              <p style="margin:2px;">
                <span class="whiteBall"></span>中国500强
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/ServiceFv">
            <el-menu-item index="12-3">
              <p style="margin:2px;">
                <span class="whiteBall"></span>中国服务业500强
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/PrivateFv">
            <el-menu-item index="12-4">
              <p style="margin:2px;">
                <span class="whiteBall"></span>中国民营企业500强
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/MorFv">
            <el-menu-item index="12-5">
              <p style="margin:2px;">
                <span class="whiteBall"></span>美国500强
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/NewEconomyFv">
            <el-menu-item index="12-6">
              <p style="margin:2px;">
                <span class="whiteBall"></span>新经济500强
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/Industryranking">
            <el-menu-item index="12-7">
              <p style="margin:2px;">
                <span class="whiteBall"></span>行业排名
              </p>
            </el-menu-item>
          </router-link>
        </el-submenu>

          <el-menu-item  index="NewJJ"  @click="newjj()">
            <img class="icons" src="../../assets/images/navIcon/icon_xinjijina.svg" />
            新基建
          </el-menu-item>

        <el-submenu index="7" class="twoNav">
          <template slot="title">
            <img class="icons" src="../../assets/images/navIcon/icon_shangshi_company.svg" /> 上市公司
          </template>
          <el-submenu index="7-1">
            <template slot="title">
              <span class="whiteBall"></span>A股公司
            </template>
            <router-link to="/equitypledge">
              <el-menu-item index="7-1-1">
                <p style="margin: 0 0 0 -3px;">股权质押</p>
              </el-menu-item>
            </router-link>
            <router-link to="/equityincentive">
              <el-menu-item index="7-1-2">
                <p style="margin: 0 0 0 -3px;">股权激励</p>
              </el-menu-item>
            </router-link>
            <router-link to="/sharerepurchase">
              <el-menu-item index="7-1-3">
                <p style="margin: 0 0 0 -3px;">股份回购</p>
              </el-menu-item>
            </router-link>
          </el-submenu>

          <el-submenu index="7-2">
            <template slot="title">
              <span class="whiteBall"></span>海外上市公司
            </template>
            <router-link to="/stockExchange">
              <el-menu-item index="7-2-1">
                <p style="margin: 0 0 0 -3px;">美股中概股</p>
              </el-menu-item>
            </router-link>
            <router-link to="/ah">
              <el-menu-item index="7-2-2">
                <p style="margin: 0 0 0 -3px;">A+H公司</p>
              </el-menu-item>
            </router-link>
            <router-link to="/hongKongGEM">
              <el-menu-item index="7-2-3">
                <p style="margin: 0 0 0 -3px;">香港创业板</p>
              </el-menu-item>
            </router-link>
            <router-link to="/hongKongRedChips">
              <el-menu-item index="7-2-4">
                <p style="margin: 0 0 0 -3px;">香港红筹股</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="7-3">
            <template slot="title">
              <span class="whiteBall"></span>三板公司
            </template>
            <router-link to="/innovationlayer">
              <el-menu-item index="7-3-1">
                <p style="margin: 0 0 0 -3px;">三板创新层</p>
              </el-menu-item>
            </router-link>
            <router-link to="/listedcompany">
              <el-menu-item index="7-3-2">
                <p style="margin: 0 0 0 -3px;">三板拟挂牌公司</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </el-submenu>

        <el-submenu index="8" class="twoNav">
          <template slot="title">
            <img class="icons" src="../../assets/images/navIcon/icon_touzi_jigou.svg" /> 投资机构
          </template>
          <el-submenu index="8-1">
            <template slot="title">
              <span class="whiteBall"></span>投资机构
            </template>
            <router-link to="/privateOfferingFund">
              <el-menu-item index="8-1-1">
                <p style="margin: 0 0 0 -3px;">私募基金</p>
              </el-menu-item>
            </router-link>
            <router-link to="/lp">
              <el-menu-item index="8-1-2">
                <p style="margin: 0 0 0 -3px;">私募基金LP</p>
              </el-menu-item>
            </router-link>
            <router-link to="/parentfund">
              <el-menu-item index="8-1-3">
                <p style="margin: 0 0 0 -3px;">母基金</p>
              </el-menu-item>
            </router-link>

            <router-link to="/privateindustry">
              <el-menu-item index="8-1-5">
                <p style="margin: 0 0 0 -3px;">民营产业集团</p>
              </el-menu-item>
            </router-link>
          </el-submenu>

          <el-submenu index="8-2">
            <template slot="title">
              <span class="whiteBall"></span>政府投资平台
            </template>
            <router-link to="/localfinancing">
              <el-menu-item index="8-2-1">
                <p style="margin: 0 0 0 -3px;">地方融资平台</p>
              </el-menu-item>
            </router-link>
            <router-link to="/investmentPlatform">
              <el-menu-item index="8-2-2">
                <p style="margin: 0 0 0 -3px;">政府高新投资平台</p>
              </el-menu-item>
            </router-link>
            <router-link to="/guidanceFund">
              <el-menu-item index="8-2-3">
                <p style="margin: 0 0 0 -3px;">政府产业引导基金</p>
              </el-menu-item>
            </router-link>
          </el-submenu>

          <el-submenu index="8-3">
            <template slot="title">
              <span class="whiteBall"></span>投融资事件
            </template>
            <router-link to="/Declareipo">
              <el-menu-item index="8-3-2">
                <p style="margin: 0 0 0 -3px;">申报IPO公司</p>
              </el-menu-item>
            </router-link>
            <router-link to="/privatePlacement">
              <el-menu-item index="8-3-3">
                <p style="margin: 0 0 0 -3px;">融资事件</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ahlist: [],
      total: 0,
      key:0,
      activeIndex: "home",
      RM1: "新基建"
    };
  },
  mounted() {
    var self = this;
    self.activeIndex = localStorage.getItem("NavMenu")
      ? localStorage.getItem("NavMenu")
      : "home";
  },
  watch: {
    "$store.state.NavMenu": function(val) {
      var self = this;
      //你需要执行的代码
      // console.log(123)
      self.activeIndex = val;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      localStorage.setItem("NavMenu", key);
      this.$store.state.NavMenu = key;
    },
    addKey(){
      var self=this
      this.$router.push({name: 'techindustzy'})
    },
    addKeyP(){
      var self=this
      this.$router.push({name: 'Pazk'})
    },
    newjj() {
      var self = this
      let RM1Search = this.$router.push({
        path: "/NewJJ",
        query: { name: Base64.encode(self.RM1)}
      });
    },
  },
};
</script>

<style lang="scss">
#NavContent {
  .el-submenu__title i {
    color: #fff;
  }
  .el-submenu__icon-arrow {
    font-size: 16px;
  }
  .el-menu-item.is-active {
    height: 50px;
    line-height: 50px;
    background: rgba(207, 17, 27, 1);
  }
  .el-menu-vertical-demo {
    margin: 12px 8px 0 8px;
    border-right: none;
    background: none;
    li {
      margin-bottom: 2px;
      border-radius: 6px;
      img {
        vertical-align: middle;
        margin-right: 8px;
        text-align: center;
        font-size: 18px;
        margin-top: -2px;
      }
    }
    .el-menu-item:hover {
      width: 244px;
      background: rgba(207, 17, 27, 1);
      border-radius: 6px;
    }
    .el-submenu__title:hover {
      background: rgba(207, 17, 27, 1);
      border-radius: 6px;
    }
    .el-menu--inline {
      background: none;
    }
  }
  .icons {
    width: 22px;
    height: 22px;
  }

  a {
    text-decoration: none;
  }
  .el-menu-item {
    font-size: 22px;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    padding-left: 12px !important;
  }
  .el-submenu__title {
    font-size: 22px;
    font-weight: bold;
    padding-left: 12px !important;
  }
  .oneNav {
    .el-menu-item {
      padding-left: 32px !important;
    }
  }
  .twoNav {
    .el-submenu {
      .el-submenu__title {
        padding-left: 32px !important;
      }
    }
    .el-menu {
      .el-menu-item {
        padding-left: 52px !important;
      }
    }
  }
  .whiteBall {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #fff;
    border-radius: 1px;
    margin-right: 10px;
  }
}
</style>