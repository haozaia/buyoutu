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
            高新技术
          </el-menu-item>
        </router-link>
        

        <el-submenu index="6" class="oneNav">
          <template slot="title">
            <img class="icons" src="../../assets/images/navIcon/icon_touzijiazhi.svg" /> 投资价值
          </template>
          <router-link to="/government">
            <el-menu-item index="6-1">
              <p style="margin:2px;">
                <span class="whiteBall"></span>政府奖励
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/standardsetting">
            <el-menu-item index="6-2">
              <p style="margin:2px;">
                <span class="whiteBall"></span>标准制定
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/majorconstruction">
            <el-menu-item index="6-3">
              <p style="margin:2px;">
                <span class="whiteBall"></span>在建项目
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/specializedenterprises">
            <el-menu-item index="6-4">
              <p style="margin:2px;">
                <span class="whiteBall"></span>专项证照
              </p>
            </el-menu-item>
          </router-link>
        </el-submenu>

        <el-submenu index="12" class="oneNav">
          <template slot="title">
            <img class="icons" src="../../assets/images/navIcon/icon_paiming_qiye.svg" /> 企业排名
          </template>
          <router-link to="/Unicorn">
            <el-menu-item index="12-8">
              <p style="margin:2px;font-size:20px;">
                <span class="whiteBall"></span>中国独角兽100强
              </p>
            </el-menu-item>
          </router-link>
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
              <p style="margin:2px;font-size:20px;">
                <span class="whiteBall"></span>中国服务业500强
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/PrivateFv">
            <el-menu-item index="12-4">
              <p style="margin:2px;font-size:20px;">
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
          <router-link to="/Shminying">
            <el-menu-item index="12-12">
              <p style="margin:2px;font-size:20px;">
                <span class="whiteBall"></span>上海民营企业100强
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/NewEconomyFv">
            <el-menu-item index="12-6">
              <p style="margin:2px;">
                <span class="whiteBall"></span>新经济排名
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/GlobalCar">
            <el-menu-item index="12-9">
              <p style="margin:2px;font-size:20px;">
                <span class="whiteBall"></span>世界汽车零部件百强
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/ChinaAutomobile">
            <el-menu-item index="12-10">
              <p style="margin:2px;font-size:20px;">
                <span class="whiteBall"></span>中国汽车零部件百强
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/ChinaCmp">
            <el-menu-item index="12-13">
              <p style="margin:2px;font-size:20px;">
                <span class="whiteBall"></span>中国触摸屏行业50强
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

        <el-submenu index="13" class="oneNav">
          <template slot="title">
            <img class="icons" src="../../assets/images/navIcon/icon_xinjijina.svg" /> 新基建
          </template>
          <el-menu-item  index="13-1"  @click="newjj()">
            <p style="margin:2px;">
              <span class="whiteBall"></span>总览
            </p>
          </el-menu-item>
          <router-link to="/NewjjRanking">
            <el-menu-item index="13-2">
              <p style="margin:2px;">
                <span class="whiteBall"></span>细分排名
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/NewjjUnicorn">
            <el-menu-item index="13-3">
              <p style="margin:2px;">
                <span class="whiteBall"></span>独角兽100强
              </p>
            </el-menu-item>
          </router-link>
        </el-submenu>
        <el-menu-item index="recommend">
          <img class="icons" src="../../assets/images/navIcon/icon_chanyemap.svg" />
          智能推荐
        </el-menu-item>

        <!-- <el-submenu index="14" class="oneNav"  v-if="unitCode==3||unitCode==8||unitCode==1||unitCode==2||unitCode==5||unitCode==6||unitCode==7">
          <template slot="title">
            <img class="icons" src="../../assets/images/navIcon/center.svg" /> 客户中枢
          </template>
          <router-link to="/favoriteList" v-if="unitCode==3||unitCode==8||unitCode==1">
            <el-menu-item index="14-9">
              <p style="margin:2px;">
                <span class="whiteBall"></span>项目管理
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/proVisit"  v-if="unitCode==3||unitCode==8||unitCode==1">
            <el-menu-item index="14-10">
              <p style="margin:2px;">
                <span class="whiteBall"></span>项目拜访
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/fiveAddTwo" v-if="unitCode==3||unitCode==8||unitCode==1||unitCode==5||unitCode==2">
            <el-menu-item index="14-1">
              <p style="margin:2px;">
                <span class="whiteBall"></span>项目5+2
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/proMeeting"  v-if="unitCode==3||unitCode==8||unitCode==1||unitCode==7||unitCode==5||unitCode==6||unitCode==2">
            <el-menu-item index="14-2">
              <p style="margin:2px;">
                <span class="whiteBall"></span>项目对接会
              </p>
            </el-menu-item>
          </router-link>
          
          <router-link to="/proExamine" v-if="unitCode==3||unitCode==8||unitCode==1||unitCode==7">
            <el-menu-item index="14-3">
              <p style="margin:2px;">
                <span class="whiteBall"></span>待审核项目
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/GovernmentManagement" v-if="unitCode==2||unitCode==8||unitCode==1">
            <el-menu-item index="14-4">
              <p style="margin:2px;">
                <span class="whiteBall"></span>未合作客户
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/GovernmentCooperative" v-if="unitCode==2||unitCode==8||unitCode==1||unitCode==7||unitCode==5||unitCode==3||unitCode==6">
            <el-menu-item index="14-5">
              <p style="margin:2px;">
                <span class="whiteBall"></span>已合作客户
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/DaiShenhe" v-if="unitCode==5||unitCode==8||unitCode==1">
            <el-menu-item index="14-6">
              <p style="margin:2px;">
                <span class="whiteBall"></span>待审核客户
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/Product">
            <el-menu-item index="14-11">
              <p style="margin:2px;">
                <span class="whiteBall"></span>产品管理
              </p>
            </el-menu-item> 
          </router-link>
          <router-link to="/RecommendNotDock" v-if="unitCode==8||unitCode==1||unitCode==5">
            <el-menu-item index="14-7">
              <p style="margin:2px;">
                <span class="whiteBall"></span>已推荐未对接
              </p>
            </el-menu-item>
          </router-link>
          <router-link to="/RecommendDock" v-if="unitCode==8||unitCode==1||unitCode==5">
            <el-menu-item index="14-8">
              <p style="margin:2px;">
                <span class="whiteBall"></span>已推荐已对接
              </p>
            </el-menu-item>
          </router-link>
        </el-submenu> -->
        <el-submenu index="15" class="oneNav">
          <template slot="title">
            <img class="icons" src="../../assets/images/navIcon/Visualized.svg" /> 数据可视化
          </template>
           <router-link to="/distributionMapFull">
            <el-menu-item index="15-1" >
              <p style="margin:2px;">
                <span class="whiteBall"></span>行业统计
              </p>
            </el-menu-item>
        </router-link>
          <router-link to="/distribuMapFull">
            <el-menu-item index="15-2">
              <p style="margin:2px;">
                <span class="whiteBall"></span>行业分布
              </p>
            </el-menu-item>
          </router-link>
        </el-submenu>
         <!-- <div class="divider" v-if="unitCode==3||unitCode==8||unitCode==1"></div> -->

        <el-submenu index="7" class="twoNav">
          <template slot="title" >
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
                <p style="margin: 0 0 0 -3px;">创新层</p>
              </el-menu-item>
            </router-link>
            <router-link to="/listedcompany">
              <el-menu-item index="7-3-2">
                <p style="margin: 0 0 0 -3px;">拟挂牌</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="7-4">
            <template slot="title">
              <span class="whiteBall"></span>投资机构
            </template>
            <router-link to="/Declareipo">
              <el-menu-item index="7-4-1">
                <p style="margin: 0 0 0 -3px;">申报IPO公司</p>
              </el-menu-item>
            </router-link>
            <router-link to="/localfinancing">
              <el-menu-item index="7-4-2">
                <p style="margin: 0 0 0 -3px;">地方融资平台</p>
              </el-menu-item>
            </router-link>
            <router-link to="/lp">
              <el-menu-item index="7-4-2">
                <p style="margin: 0 0 0 -3px;">私募基金专区</p>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </el-submenu>

        <!-- <el-submenu index="8" class="twoNav">
          <template slot="title">
            <img class="icons" src="../../assets/images/navIcon/icon_touzi_jigou.svg" /> 投资机构
          </template>
          <el-submenu index="8-1">
            <template slot="title">
              <span class="whiteBall"></span>投资基金
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
          </el-submenu>
        </el-submenu> -->
        

        <!-- <el-menu-item index="distributionMap">
          <img class="icons" src="../../assets/images/navIcon/icon_chanyemap.svg" />
          产业分布地图
        </el-menu-item> -->


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
      RM1: "新基建",
      unitCode:'',
    };
  },
  created(){
    this.unitCode = localStorage.getItem("unitCode");
  },
  mounted() {
    var self = this;

    self.activeIndex = localStorage.getItem("NavMenu")
      ? localStorage.getItem("NavMenu")
      : "home";
       console.log(self.activeIndex)
   
  },
  watch: {
    "$store.state.NavMenu": function(val) {
      var self = this;
      //你需要执行的代码
      // console.log(123)
      self.activeIndex = val;
       console.log(self.activeIndex)
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