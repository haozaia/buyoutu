import Vue from "vue";
import Router from "vue-router";
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Home from "./views/Home.vue";
import qyh from "./views/qyh.vue";
import jrh from "./views/jrh.vue";
import zfh from "./views/zfh.vue";
import Techindustry from "./views/Firstpage/Techindustry.vue";
import Techindustzy from "./views/Firstpage/Techindustry.vue";
import Government from "./views/Firstpage/Government.vue";
import Majorconstruction from "./views/Firstpage/Majorconstruction.vue";
import Specializedenterprises from "./views/Firstpage/Specializedenterprises.vue";
import Standardsetting from "./views/Firstpage/Standardsetting.vue";
import Localfinancing from "./views/Firstpage/Localfinancing.vue";
import InvestmentPlatform from "./views/Firstpage/InvestmentPlatform.vue";
import GuidanceFund from "./views/Firstpage/GuidanceFund.vue";
import Equitypledge from "./views/Firstpage/Equitypledge.vue";
import Equityincentive from "./views/Firstpage/Equityincentive.vue";
import Sharerepurchase from "./views/Firstpage/Sharerepurchase.vue";
import StockExchange from "./views/Firstpage/StockExchange.vue";
import AH from "./views/Firstpage/AH.vue";
import NewJJ from "./views/Firstpage/NewJJ.vue";
import HongKongGEM from "./views/Firstpage/HongKongGEM.vue";
import HongKongRedChips from "./views/Firstpage/HongKongRedChips.vue";
import chainMap from "./views/Firstpage/chainMap.vue";
import IndustryLeader from "./views/Firstpage/IndustryLeader.vue";
import Difangtab from "./views/Firstpage/Difangtab.vue";
import Innovationlayer from "./views/Firstpage/Innovationlayer.vue";
import Listedcompany from "./views/Firstpage/Listedcompany.vue";
import Foreigninvestment from "./views/Firstpage/Foreigninvestment.vue";
import Privateindustry from "./views/Firstpage/Privateindustry.vue";
import IPO from "./views/Firstpage/IPO.vue";
import Declareipo from "./views/Firstpage/Declareipo.vue";
import PrivatePlacement from "./views/Firstpage/PrivatePlacement.vue";
import PrivateOfferingFund from "./views/Firstpage/PrivateOfferingFund.vue";
import VipGovernment from "./views/Firstpage/VipGovernment.vue";
import VipCompany from "./views/Firstpage/VipCompany.vue";
import VipData from "./views/Firstpage/VipData.vue";
import VipPhone  from "./views/Firstpage/VipPhone.vue";
import VipRelated  from "./views/Firstpage/VipRelated.vue";
import VipClue from "./views/Firstpage/VipClue.vue";
import VipReport from "./views/Firstpage/VipReport.vue";
import LP from "./views/Firstpage/LP.vue";
import Parentfund from "./views/Firstpage/Parentfund.vue";
import CompanyDetails from "./views/Twolevelpage/CompanyDetails.vue";
import annualReportsDetails from "./views/Twolevelpage/annualReportsDetails.vue";
import Monitoring from "./views/Monitor/industrial/Monitoring.vue";
import monitor from "./views/Monitor/industrial/monitor.vue";
import monitorDetail from "./views/Monitor/industrial/monitorDetail.vue";
import IndustryMonitoring from "./views/Monitor/industry/IndustryMonitoring.vue";
import IndustrySearch from "./views/Monitor/industry/IndustrySearch.vue";
import Hysearch from "./views/Monitor/industry/Hysearch.vue";
import AreaMonitoring from "./views/Monitor/region/AreaMonitoring.vue";
import Login from "./views/Login.vue";
import User from "./views/User.vue";
import ChangePassword from "./views/ChangePassword.vue";
import searchList from "./views/Firstpage/searchList.vue";
import ChangePassword_c from "./views/ChangePassword_c.vue";
import FortuneFv from "./views/Firstpage/FortuneFv.vue";
import ChinaFv from "./views/Firstpage/ChinaFv.vue";
import ServiceFv from "./views/Firstpage/ServiceFv.vue";
import PrivateFv from "./views/Firstpage/PrivateFv.vue";
import MorFv from "./views/Firstpage/MorFv.vue";
import NewEconomyFv from "./views/Firstpage/NewEconomyFv.vue";
import StateEnterprise from "./views/Firstpage/StateEnterprise.vue";
import CentralEnterprises from "./views/Firstpage/CentralEnterprises.vue";
import Park from "./views/Firstpage/Park.vue";
import Fellowtownsman from "./views/Firstpage/Fellowtownsman.vue";
import Industryranking from "./views/Firstpage/Industryranking.vue";
import distributionMap from "./views/Firstpage/distributionMap.vue";
import Parkdetails from "./views/Firstpage/Parkdetails.vue";
import mapSearch from "./views/Firstpage/mapSearch.vue";
import ParkMap from "./views/Firstpage/ParkMap.vue";


Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/mapSearch",
      name: "mapSearch",
      component: mapSearch
    },
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/monitor",
      name: "monitor",
      component: monitor
    },
    {
      path: "/monitorDetail",
      name: "monitorDetail",
      component: monitorDetail
    },
    {
      path: "/distributionMap",
      name: "distributionMap",
      component: distributionMap
    },
    {
      path: "/VipGovernment",
      name: "VipGovernment",
      component: VipGovernment
    },
    {
      path: "/chainMap",
      name: "chainMap",
      component: chainMap
    },
    {
      path: "/industryLeader",
      name: "industryLeader",
      component: IndustryLeader
    },
    {
      path: "/VipCompany",
      name: "VipCompany",
      component: VipCompany
    },
    {
      path: "/NtkMnkjW",
      name: "VipClue",
      component: VipClue
    },
    {
      path: "/VipReport",
      name: "VipReport",
      component: VipReport
    },
    {
      path: "/VipData",
      name: "VipData",
      component: VipData
    },
    {
      path: "/nubp",
      name: "VipPhone",
      component: VipPhone
    },
    {
      path: "/VipRelated",
      name: "VipRelated",
      component: VipRelated
    },
    {
      path: "/techindustry",
      name: "techindustry",
      component: Techindustry
    },
    {
      path: "/techindustzy",
      name: "techindustzy",
      component: Techindustzy
    },
    {
      path: "/government",
      name: "government",
      component: Government
    },
    {
      path: "/majorconstruction",
      name: "majorconstruction",
      component: Majorconstruction
    },
    {
      path: "/specializedenterprises",
      name: "specializedenterprises",
      component: Specializedenterprises
    },
    {
      path: "/standardsetting",
      name: "standardsetting",
      component: Standardsetting
    },
    {
      path: "/localfinancing",
      name: "localfinancing",
      component: Localfinancing
    },
    {
      path: "/investmentPlatform",
      name: "investmentPlatform",
      component: InvestmentPlatform
    },
    {
      path: "/guidanceFund",
      name: "guidanceFund",
      component: GuidanceFund
    },
    {
      path: "/equitypledge",
      name: "equitypledge",
      component: Equitypledge
    },
    {
      path: "/equityincentive",
      name: "equityincentive",
      component: Equityincentive
    },
    {
      path: "/sharerepurchase",
      name: "sharerepurchase",
      component: Sharerepurchase
    },
    {
      path: "/stockExchange",
      name: "stockExchange",
      component: StockExchange
    },
    {
      path: "/ah",
      name: "ah",
      component: AH
    },
    {
      path: "/newjj",
      name: "newjj",
      component: NewJJ
    },
    {
      path: "/hongKongGEM",
      name: "hongKongGEM",
      component: HongKongGEM
    },
    {
      path: "/hongKongRedChips",
      name: "hongKongRedChips",
      component: HongKongRedChips
    },
    {
      path: "/innovationlayer",
      name: "innovationlayer",
      component: Innovationlayer
    },
    {
      path: "/listedcompany",
      name: "listedcompany",
      component: Listedcompany
    },
    {
      path: "/foreigninvestment",
      name: "foreigninvestment",
      component: Foreigninvestment
    },
    {
      path: "/privateindustry",
      name: "privateindustry",
      component: Privateindustry
    },
    {
      path: "/ipo",
      name: "ipo",
      component: IPO
    },
    {
      path: "/declareipo",
      name: "declareipo",
      component: Declareipo
    },
    {
      path: "/privatePlacement",
      name: "privatePlacement",
      component: PrivatePlacement
    },
    {
      path: "/privateOfferingFund",
      name: "privateOfferingFund",
      component: PrivateOfferingFund
    },
    {
      path: "/lp",
      name: "lp",
      component: LP
    },
    {
      path: "/parentfund",
      name: "parentfund",
      component: Parentfund
    },
    {
      path: "/companyDetails",
      name: "companyDetails",
      component: CompanyDetails
    },
    {
      path: "/annualReportsDetails",
      name: "annualReportsDetails",
      component: annualReportsDetails
    },
    {
      path: "/monitoring",
      name: "monitoring",
      component: Monitoring
    },
    {
      path: "/industryMonitoring",
      name: "industryMonitoring",
      component: IndustryMonitoring
    },
    {
      path: "/industrySearch",
      name: "industrySearch",
      component: IndustrySearch
    },
    {
      path: "/hysearch",
      name: "hysearch",
      component: Hysearch
    },
    {
      path: "/areaMonitoring",
      name: "areaMonitoring",
      component: AreaMonitoring
    },
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: "/changepassword",
      name: "changepassword",
      component: ChangePassword
    }, 
    {
      path: "/searchList",
      name: "searchList",
      component: searchList
    },
    {
      path: "/changePassword_c",
      name: "changePassword_c",
      component: ChangePassword_c
    },
    {
      path: "/difangtab",
      name: "difangtab",
      component: Difangtab
    },
    {
      path: "/qyh",
      name: "qyh",
      component: qyh
    },
    {
      path: "/jrh",
      name: "jrh",
      component: jrh
    },
    {
      path: "/zfh",
      name: "zfh",
      component: zfh
    },
    {
      path: "/FortuneFv",
      name: "FortuneFv",
      component: FortuneFv
    },
    {
      path: "/ChinaFv",
      name: "ChinaFv",
      component: ChinaFv
    },
    {
      path: "/ServiceFv",
      name: "ServiceFv",
      component: ServiceFv
    },
    {
      path: "/PrivateFv",
      name: "PrivateFv",
      component: PrivateFv
    },
    {
      path: "/MorFv",
      name: "MorFv",
      component: MorFv
    },
    {
      path: "/NewEconomyFv",
      name: "NewEconomyFv",
      component: NewEconomyFv
    },
    {
      path: "/StateEnterprise",
      name: "StateEnterprise",
      component: StateEnterprise
    },
    {
      path: "/CentralEnterprises",
      name: "CentralEnterprises",
      component: CentralEnterprises
    },
    {
      path: "/Park",
      name: "Park",
      component: Park
    },
    {
      path: "/Pazk",
      name: "Pazk",
      component: Park
    },
    {
      path: "/Fellowtownsman",
      name: "Fellowtownsman",
      component: Fellowtownsman
    },
    {
      path: "/Industryranking",
      name: "Industryranking",
      component: Industryranking
    },
    {
      path: "/Parkdetails",
      name: "Parkdetails",
      component: Parkdetails
    },
    {
      path: "/parkMap",
      name: "parkMap",
      component: ParkMap
    },
  ]
});
