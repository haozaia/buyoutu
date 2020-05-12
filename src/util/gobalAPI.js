﻿const http = 'https://www.buyoutu.com:8080/rest/api/v1'
// const http = 'https://10.10.20.199:8080/rest/api/v1'
// const http = 'https://10.10.30.118:8080/rest/api/v1'
// const http = '/api1'

const globalAPI = {
  GongxinjsqyTe: http + '/touzhijiazhi/Gongxinjsqy/listapi.json',
  Jibenxx: http + '/touzhijiazhi/Jibenxx/list.json',
  dateapi: http + '/touzhijiazhi/Gongxinjsqy/dateapi.json',
  shengfenapi: http + '/touzhijiazhi/Gongxinjsqy/shengfenapi.json',
  fenbuapi: http + '/touzhijiazhi/Gongxinjsqy/fenbuapi.json',
  Gaikuang: http + '/touzhijiazhi/Gaikuang/list.json',
  Mgaoguantt: http + '/touzhijiazhi/Mgaoguantt/list.json',
  Muqianzxgdxx: http + '/touzhijiazhi/Muqianzxgdxx/list.json',
  Biangengjl: http + '/touzhijiazhi/Biangengjl/list.json',
  nameapi: http + "/CompanyInfo/searchHightLightField",
  Equityincentive: http + "/agu/Guquanjl/listapi.json",
  Sharerepurchase: http + "/agu/Gufenhg/listapi.json",
  StockExchange: http + "/haiwaishangshi/Meiguzgg/listapi.json",
  AH: http + "/haiwaishangshi/Ahgs/listapi.json",
  HongKongRedChips: http + "/haiwaishangshi/Xiangganghcg/listapi.json",
  HongKongGEM: http + "/haiwaishangshi/Xianggangcybzzb/listapi.json",
  Declareipo: http + "/tourongzishijian/Shenbaoipogs/listapi.json",
  InvestmentPlatform: http + "/investment/invest/listapi.json",
  GuidanceFund: http + "/investment/introduct/listapi.json",
  PrivatePlacement: http + "/tourongzishijian/Simurz/listapi.json",
  PrivatePlacementlunci: http + "/tourongzishijian/Simurz/roundsapi.json",
  Innovationlayer: http + "/chuangxinfazhan/Sanbancxc/listapi.json",
  Equitypledge: http + "/agu/Guquanzy/listapi.json",
  Localfinancing: http + "/investment/Difangtrzpt/listapi.json", //地方投融资平台
  Innovationlayergaikuo: http + "/chuangxinfazhan/Sanbancxc/surveyapi.json", //创新层概括
  Listedcompany: http + "/chuangxinfazhan/Sanbanngpgs/listapi.json", //拟挂牌公司监控
  suoshuhangye: http + "/chuangxinfazhan/Sanbanngpgs/sshylistapi.json", //拟挂牌公司所属行业查询
  Login: http + "/login",  //账号密码登录
  Loginb: http + "/mobileVerifyCode",  //获取验证码
  loginc: http + "/mobileLogin",    //手机号登录
  User: http + "/updateLoginUser",    //修改用户信息
  checkMobileCode: http + "/checkMobileCode",    //修改用户密码--手机验证
  changeUserPassword: http + "/changeUserPassword",    //修改用户密码--密码修改
  AreaMonitoring: http + "/quyujiankong/chanyefb/privinceapi.json",    //区域监控--省份
  Areatongji: http + "/quyujiankong/chanyefb/cnfaapi.json",    //区域监控--统计数
  Chanyefb: http + "/quyujiankong/chanyefb/icdapi.json",    //区域监控--产业分布
  modulelistapi: http + "/quyujiankong/cfaapi.json",    //区域监控--A股至已私募融资
  Gongxinjsqy: http + "/touzhijiazhi/Gongxinjsqy/listapi1.json",    //区域监控--A股至已私募融资
  ChartTk: http + "/quyujiankong/cfaapi.json",    //区域监控--chart弹框
  Huodejiangli: http + "/touzhijiazhi/ZhengFu/listapi1.json",    //区域监控--获得奖励企业
  zzleixing: http + "/touzhijiazhi/License/typeapi.json",    //区域监控--拥有证照--证照类型下拉框
  zehngzhaolst: http + "/touzhijiazhi/License/listapi1.json",    //区域监控--拥有证照企业列表
  bznianfen: http + "/touzhijiazhi/Standard/dataapi.json",    //区域监控--标准制定--获取年份下拉框
  biaozhunlst: http + "/touzhijiazhi/Standard/listapi1.json",    //区域监控--标准制定企业列表
  waishanglc: http + "/agency/foreign/typeapi.json",    //区域监控--外商投资--轮次
  waishangzcd: http + "/agency/foreign/zhuceapi.json",    //区域监控--外商投资--境外投资者国籍(或地区)/注册地
  waishanglst: http + "/agency/foreign/listapi.json",    //区域监控--外商投资列表
  VIPphonelist: http + "/svip/companycontactway/downloadexcelapi.json",    //VIP电话导出
  VIPphone1: http + "/svip/companycontactway/uploadexcelapi.json",    //VIP电话文件上传
  VIPphone2: http + "/svip/companycontactway/downloadtemplateapi.json",    //VIP电话模板下载
  VIPreporttb: http + "/touzhijiazhi/ZhengFu/count.json",    //VIP报表柱状图
  VIPreportlist: http + "/touzhijiazhi/ZhengFu/listapi.json",    //VIP报表弹框列表

  zhishu: http + "/touzhijiazhi/Gaikuang/lunzhuanapi.json",    //Home_B 股市信息轮播
  IndustryMonitoring: http + "/hangyejk/jiankong/listapi.json",    //行业监测
  Industrychaxun: http + "/hangyejk/jiankong/likeapi.json",    //行业监测查询
  GovernmentSearch: http + "/touzhijiazhi/ZhengFu/typeapi.json",
  GovernmentList: http + "/touzhijiazhi/ZhengFu/listapi.json",
  MajorconsSelect: http + "/touzhijiazhi/Program/shengfenapi.json",
  MajorconsList: http + "/touzhijiazhi/Program/listapi.json",
  specializeSelect: http + "/touzhijiazhi/License/typeapi.json",
  specializeList: http + "/touzhijiazhi/License/listapi.json",
  standardseSelect: http + "/touzhijiazhi/Standard/dataapi.json",
  standardseList: http + "/touzhijiazhi/Standard/listapi.json",
  countapi: http + "/agency/foreign/countapi.json",
  ForeigninvesSf: http + "/agency/foreign/typeapi.json",
  ForeigninvesZc: http + "/agency/foreign/zhuceapi.json",
  ForeigninvesList: http + "/agency/foreign/dtcompaniesapi.json",
  privateindustryList: http + "/agency/estate/listapi.json",
  LatestFundsRaised: http + "/agency/fund/listapi.json", //最新私募基金
  investmentRanking: http + "/agency/fund/hangyeapi.json",
  ActiveRanking: http + "/agency/fund/paiapi.json",
  FundLP: http + "/agency/newlp/listapi.json",//最新私募基金LP
  FundLPselect: http + "/agency/newlp/typeapi.json",
  FundLPtypeList: http + "/agency/pailp/listapi.json",
  FundLPtypeselect: http + "/agency/pailp/typeapi.json",
  ParentFund: http + "/agency/mu/listapi.json",//母基金
  activeData: http + "/agency/fund/countapi.json",
  ipoData: http + "/agency/fund/ipoapi.json",
  shengfenData: http + "/agency/fund/shengfenapi.json",
  getlpnumberapi: http + "/agency/fund/getlpnumberapi.json",
  lpdistributionapi: http + "/agency/fund/lpdistributionapi.json",
  historyList: http + "/touzhijiazhi/Gaikuang/fazhanlist.json",
  ManagementSituationList: http + "/jingying/zhaopin/listapi.json",
  ManagementSituationPie: http + "/jingying/zhaopin/countapi.json",
  ManagementSituationLine: http + "/jingying/zhaopin/dataapi.json",
  WinnerList: http + "/jiangli/zhengzhao/listapi.json",
  zhuanli: http + "/zhishichanquan/zhuanli/listapi.json",
  shangbiaoxx: http + "/zhishichanquan/shangbiaoxx/listapi.json",
  ruanjianzzq: http + "/zhishichanquan/ruanjianzzq/listapi.json",
  wangzhanba: http + "/zhishichanquan/wangzhanba/listapi.json",
  jrjgcflistapi: http + "/fengxianhegui/jrjgcflistapi.json",
  ktgglistapi: http + "/fengxianhegui/ktgglistapi.json",
  flsslistapi: http + "/fengxianhegui/flsslistapi.json",
  homeLine: http + "/touzhijiazhi/Gaikuang/findcountapi.json",
  homeMap: http + "/touzhijiazhi/Gaikuang/dituapi.json",
  homeMapC: http + "/touzhijiazhi/Gaikuang/rongziapi.json",
  homeMarquee: http + "/system/announcement/showapi.json",
  belongCapitalMarket: http + "/industryChain/belongCapitalMarket",//产业链公司查询
  companyPhone: http + "/touzhijiazhi/Gaikuang/adminapi.json",//产业链公司查询
  vipdiyuapi: http + "/touzhijiazhi/Gaikuang/vipdiyuapi.json",//产业链公司查询
  VipDate: http + "/touzhijiazhi/ZhengFuRenYuan/typeapi.json",//vip电话省份
  VipFrom: http + "/touzhijiazhi/ZhengFuRenYuan/listapi.json",//vip电话列表
  zhengfuList: http + "/touzhijiazhi/License/base64listapi.json",//证照奖励-政府
  zhengzhaoList: http + "/touzhijiazhi/ZhengFu/base64listapi.json",//证照奖励-公司拥有证照
  biaozhunList: http + "/touzhijiazhi/Standard/base64listapi.json",//证照奖励-公司拥有标准制定
  companyYwld: http + "/touzhijiazhi/Ywld/infoapi.json",//证照奖励-公司拥有标准制定
  VipDatelistapi: http + "/touzhijiazhi/Export/listapi.json",//VIPDATA
  VipDateshegnfenapi: http + "/touzhijiazhi/Export/shegnfenapi.json",//VIPDATA
  VipDatehagnyeapi: http + "/touzhijiazhi/Export/hangyeapi.json",//VIPDATA
  VipDategognsiapi: http + "/touzhijiazhi/Export/gognsiapi.json",//VIPDATA
  VipDateexportapi: http + "/touzhijiazhi/Export/exportapi.json",//VIPDATA
  Vipxiansuo: http + "/touzhijiazhi/XianSuo/listapi.json",//VIP线索列表
  Vipxsshengshi: http + "/touzhijiazhi/XianSuo/typeapi.json",//VIP线索省市区
  JingpinList: http + "/jingying/jingpin/listapi.json",//VIPDATA
  ChainMapList: http + "/touzhijiazhi/Chanye/listapi.json",//产业链地图
  ChainMapListCompany: http + "/industryChain/belongchanye",//产业链地图
  nianbaoapi: http + "/touzhijiazhi/Gaikuang/nianbaoapi.json",//年报电话
  waishangSF: http + "/agency/foreign/provincesapi.json",//外商省份
  industryChainSheng: http + "/industryChain/sheng",//产业链省份
  industryChainShi: http + "/industryChain/shi",//产业链市区
  searchbelongCapitalMarket: http + "/industryChain/searchbelongCapitalMarket",//产业高级检索
  industryChainChanyesheng: http + "/industryChain/chanyesheng",//产业链
  industryChainChanyefenbu: http + "/industryChain/chanyefenbu",//产业省份分布
  GetOneClass: http + "/touzhijiazhi/Export/yijihyapi.json",//行业排名一级行业下拉框
  GetTwoClass: http + "/touzhijiazhi/Export/erjihyapi.json",//行业排名二级行业下拉框

  luodilistapiList: http + "/luodilistapi.json",//落地项目

  explortlist: http + "/touzhijiazhi/Export/explortlist.json",//企业导出

  //年报模块
  NBbaselistapi: http + "/baselistapi.json",//1.1.1企业年报信息
  NBassetlistapi: http + "/assetlistapi.json",//1.1.2年报资产明细
  NBchangerecordlistapi: http + "/changerecordlistapi.json",//1.1.3年报修改信息
  NBinvestlistapi: http + "/investlistapi.json",//1.1.4年报对外投资信息
  NBsecuritylistapi: http + "/securitylistapi.json",//1.1.5年报社保信息
  NBsharelistapi: http + "/sharelistapi.json",//1.1.6年报股东信息
  NBstocklistapi: http + "/stocklistapi.json",//1.1.7年报股权变更
  NBwebsitelistapi: http + "/websitelistapi.json",//1.1.8年报网站或网店信息
  Exportcount: http + "/touzhijiazhi/Export/exportcount.json",//1.3.6导出总数显示

  //老乡企业模块
  LXshengshiquapi: http + "/shengshiquapi.json",//1.1.1省市区接口icdapi
  LXshengshiapi: http + "/shengshiapi.json",//1.1.2省市接口
  LXzibenapi: http + "/zibenapi.json",//1.1.3所属资本市场
  LXzhuceztapi: http + "/zhuceztapi.json",//1.1.4注册状态
  LXhangyeapi: http + "/hangyeapi.json",//1.1.5获行业
  LXlaoxianglistapi: http + "/laoxianglistapi.json",//1.1.6老乡企业列表

  fortuneFv: http + "/paiming/topfivehuandredlistapi.json",//500强企业
  fortuneFvmap: http + "/paiming/provincesdistributedapi.json",//500强企业地图接口
  stateenterprise: http + "/agency/foreign/dtcompaniesapi.json",//国企
  stateenterpriseshengfen: http + "/agency/foreign/provincesapi.json",//国企省份
  yuanqu: http + "/park/industry/listapi.json",//产业园区
  Hangyelist: http + "/touzhijiazhi/Gaikuang/industryrankcompaniesapi.json",//行业列表
  Hangyedown: http + "/touzhijiazhi/Gaikuang/industrylistapi.json",//行业下拉
  Yuanqucompany: http + "/park/enterprises/listapi.json",//产业园区公司

  monitorPark: http + "/park/industry/yuanqu.json",//1.1.1园区接口
  monitorParklist: http + "/park/industry/gongsilistapi.json",//1.1.2园区公司列表

  ESsearchlistbyzibenscdy: http + "/industryChain/searchlistbyzibenscdy",//1.1.1行业监控，产业链监控，产业链地图
  ESexplortlistbyes: http + "/touzhijiazhi/Export/explortlistbyes.json",//导出列表
  ESexportbyesapi: http + "/touzhijiazhi/Export/exportbyesapi.json",//下载
  EsExporyijihyapi: http + "/touzhijiazhi/Export/yijihyapi.json",//一级行业
  ESerjihyapi: http + "/touzhijiazhi/Export/erjihyapi.json",//二级行业
  NewTitle: http + "/newinfrastructure/tipsapi.json",//新基建title接口
  NewList: http + "/newinfrastructure/listapi.json",//新基建折叠面板列表
  Home_export: http + "/touzhijiazhi/Export/exportshouyesearchapi.json",//首页导出
  Park_export: http + "/touzhijiazhi/Export/exportyuanquqiyeapi.json",//园区详情导出

  Eschanyelianlistapi: http + "/hangyejk/jiankong/chanyelianlistapi.json",//产业链监控一级
  Eserjichanyelianlistapi: http + "/hangyejk/jiankong/erjichanyelianlistapi.json",//产业链监控二级

  nainbaoDis: http + "/companyinfo/nianbao/isshowapi.json",//1.1年报模块是否展示接口
  jingpinDis: http + "/companyinfo/jingpin/isshowapi.json",//1.2竞品信息模块是否展示接口
  zhengfujiangliDis: http + "/companyinfo/zhengfujiangli/isshowapi.json",//1.3政府奖励模块是否展示接口
  fengxianheguiDis: http + "/companyinfo/fengxianhegui/isshowapi.json",//1.4风险合规模块是否展示接口
  zhishichanquanDis: http + "/companyinfo/zhishichanquan/isshowapi.json",//1.5知识产权模块是否展示接口

  
  exportlistjingpingapi: http + "/touzhijiazhi/Export/exportlistjingpingapi.json",//竞品导出


}
export default globalAPI