﻿// const http = 'https://www.buyoutu.com:8080/rest/api/v1'
// const http = 'https://10.10.20.199:8080/rest/api/v1'
// const http = 'https://10.10.30.118:8080/rest/api/v1'
//  const http = 'http://120.26.71.90:8801/rest/api/v1'
const http = '/api1'

const globalAPI = {
  ImgHttp:"http://120.26.71.90:8080/",
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
  waishanglst: http + "/agency/foreign/dtcompaniesapi.json",    //区域监控--外商投资列表
  VIPphonelist: http + "/svip/companycontactway/downloadexcelapi.json",    //VIP电话导出
  VIPphone1: http + "/svip/companycontactway/uploadexcelapi.json",    //VIP电话文件上传
  VIPphone2: http + "/svip/companycontactway/downloadtemplateapi.json",    //VIP电话模板下载
  VIPreporttb: http + "/touzhijiazhi/ZhengFu/count.json",    //VIP报表柱状图
  VIPreportlist: http + "/touzhijiazhi/ZhengFu/listapi.json",    //VIP报表弹框列表

  zhishu: http + "/touzhijiazhi/Gaikuang/lunzhuanapi.json",    //Home_B 股市信息轮播
  tuijianLunbo: http + "/tuijian/slideshow/todayapi.json",    //Home智能推荐轮播
  IndustryMonitoring: http + "/hangyejk/jiankong/sanjiapi.json",    //行业监测
  // IndustryMonitoring: http + "/hangyejk/jiankong/newlistapi.json",    //行业监测
  IndustryTop: http + "/hangyejk/jiankong/newddlistapi.json",    //行业监测顶部
  IndustryTwoList: http + "/hangyejk/jiankong/sanjilistapi.json",    //行业监测二级行业列表
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
  RecommendList: http + "/tuijian/listapi.json",//智能推荐列表
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

  foreigncapitalapi: http + "/agency/foreign/foreigncapitalapi.json",//全外资企业
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
  UnicornOneHundred: http + "/paiming/neweconomyapi.json",//独角兽100强
  fortuneFvmap: http + "/paiming/provincesdistributedapi.json",//500强企业地图接口
  stateenterprise: http + "/agency/foreign/dtcompaniesapi.json",//国企
  stateenterpriseshengfen: http + "/agency/foreign/provincesapi.json",//国企省份
  yuanqu: http + "/park/industry/listapi.json",//产业园区
  Hangyelist: http + "/touzhijiazhi/Gaikuang/industryrankcompaniesapi.json",//行业列表g
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
  Newjj_HangYe: http + "/newinfrastructure/twoleveltipsapi.json",//新基建细分排名-行业下拉框
  Newjj_List: http + "/newinfrastructure/subrankapi.json",//新基建细分排名-列表
  NewjjUnicorm: http + "/newinfrastructure/unicornsapi.json",//新基建独角兽-列表
  RecommendBox: http + "/tuijian/isrecommendapi.json",//智能推荐窗口是否显示
  RecommendBoxXinxi: http + "/tuijian/recommendpopupapi.json",//智能推荐窗口信息
  RecommendBoxList: http + "/tuijian/recommendlistapi.json",//智能推荐弹框列表数据
  autopartshundredlistapi: http + "/paiming/autopartshundredlistapi.json",//中国（全球）汽车零部件百强列表
  Home_export: http + "/touzhijiazhi/Export/exportshouyesearchapi.json",//首页导出
  Park_export: http + "/touzhijiazhi/Export/exportyuanquqiyeapi.json",//园区详情导出
  Park_MapList: http + "/park/industry/searchnearbylistapi.json",//园区地图列表
  Park_MapBiao: http + "/park/industry/searchnearbyapi.json",//园区地图标注坐标
  Park_leftBing: http + "/park/industry/industrystatistics.json",//园区地图饼状图左
  Park_rightBing: http + "/park/industry/registeredstatistical.json",//园区地图饼状图右
  Park_AllBiao: http + "/park/industry/parkslocationapi.json",//所有园区标记点
  
  Eschanyelianlistapi: http + "/hangyejk/jiankong/chanyelianlistapi.json",//产业链监控一级
  Eserjichanyelianlistapi: http + "/hangyejk/jiankong/erjichanyelianlistapi.json",//产业链监控二级
  
  nainbaoDis: http + "/companyinfo/nianbao/isshowapi.json",//1.1年报模块是否展示接口
  jingpinDis: http + "/companyinfo/jingpin/isshowapi.json",//1.2竞品信息模块是否展示接口
  zhengfujiangliDis: http + "/companyinfo/zhengfujiangli/isshowapi.json",//1.3政府奖励模块是否展示接口
  fengxianheguiDis: http + "/companyinfo/fengxianhegui/isshowapi.json",//1.4风险合规模块是否展示接口
  zhishichanquanDis: http + "/companyinfo/zhishichanquan/isshowapi.json",//1.5知识产权模块是否展示接口
  kebiDis: http + "/companyinfo/kebi/isshowapi.json",//1.6可比公司是否置灰接口
  newsDis: http + "/companyinfo/news/isshowapi.json",//1.7新闻
  fengxianheguiNew: http + "/fengxianhegui/newsapi.json",//1.7qiye新闻
  
  ruanjianzzqIssHOW: http + "/companyinfo/ruanjianzzq/isshowapi.json",//1.1软件著作是否显示接口
  zhuanliIsShow: http + "/companyinfo/zhuanli/isshowapi.json",//1.2专利是否显示接口
  shangbiaoxxIsShow: http + "/companyinfo/shangbiaoxx/isshowapi.json",//1.3商标信息是否显示接口
  
  
  ComKebilist: http + "/kebilist.json",//1.7qiye相似公司
  
  
  
  CokeywordsearchapimKebilist: http + "/park/industry/keywordsearchapi.json",//地圖搜索
  Industrysapi: http + "/park/industry/industrysapi.json",//行业二级联动
  exportbyqiyesearchesapi: http + "/touzhijiazhi/Export/exportbyqiyesearchesapi.json",//地图搜索导出
  
  
  exportlistjingpingapi: http + "/touzhijiazhi/Export/exportlistjingpingapi.json",//竞品导出
  
  addindustry: http + "/collection/addindustry.json",//行业或产业链收藏增加
  collectionistrue: http + "/collection/collectionistrue.json",//行业或产业链判断收藏
  delindustry: http + "/collection/delindustry.json",//行业或产业链取消收藏
  industrylist: http + "/collection/industrylist.json",//行业或产业链收藏列表
  
  addcompany: http + "/collection/addcompany.json",//公司收藏
  companyistrue: http + "/collection/companyistrue.json",//判断公司收藏
  updatecompany: http + "/collection/updatecompany.json",//公司修改电话、已对接状态
  collectionCount: http + "/collection/count.json",//判断条数（修改）
  
  
  companylist: http + "/collection/companylist.json",//公司收藏列表
  companyUserList: http + "/collection/userList.json",//下属
  delcompany: http + "/collection/delcompany.json",//公司单个取消收藏
  updatespecial: http + "/collection/updatespecial.json",//公司单个取消特别
  
  exporthangye: http + "/touzhijiazhi/Export/exporthangye",//产业数据导出
  
  addpost: http + "/collection/addpost.json",//增加备注
  delpost: http + "/collection/delpost.json",//删除备注
  updatepost: http + "/collection/updatepost.json",//修改备注
  postlist: http + "/collection/postlist.json",//1.3.4备注列表
  
  collectionZhiwu: http + "/collection/zhiwei.json",//1.4.1职务
  collectionJieduan: http + "/collection/jieduan.json",//1.4.2阶段
  
  collectionDownload: http + "/collection/download",//导入模板下载
  collectionIimport: http + "/collection/import",//导入文件
  exportuijian: http + "/touzhijiazhi/Export/exportuijian",//智能推荐导出
  
  //政府管理
  GovernmentGovernmentinfo: http + "/government/governmentinfo/addapi.json",//添加
  GovernmentGovernmentinfoList: http + "/government/governmentinfo/listapi.json",//列表
  GovernmentMajorindustriesapi: http + "/government/governmentinfo/majorindustriesapi.json",//重点产业下拉
  Governmentdetailsapi: http + "/government/governmentinfo/detailsapi.json",//政府详情
  Governmentupdateapi: http + "/government/governmentinfo/updateapi.json",//政府修改
  Governmentupdeleteapi: http + "/government/governmentinfo/deleteapi.json",//政府删除
  GovernmentofficialsinfoList: http + "/government/officialsinfo/listapi.json",//政府人员信息列表
  Governmentofficialsinfoaddapi: http + "/government/officialsinfo/addapi.json",//政府人员信息添加
  Governmentofficialsinfodeleteapi: http + "/government/officialsinfo/deleteapi.json",//政府人员信息删除
  Governmentofficialsinfodutiesapi: http + "/government/officialsinfo/dutiesapi.json",//政府人员信息职务下拉框
  Governmentofficialsinfogetdutiesapi: http + "/government/officialsinfo/getdutiesapi.json",//政府人员信息职务下拉框
  Governmentofficialsinfoupdateapi: http + "/government/officialsinfo/updateapi.json",//政府人员信息修改
  Governmentofficialsinfodetailsapi: http + "/government/officialsinfo/detailsapi.json",//政府人员信息详情
  Governmentofficialsinfodictsvalueapi: http + "/government/governmentinfo/dictsvalueapi.json",//政府领导审核（获取跟进类别、推进合作阶段、以及审核领导数据接口）
  Governmentofficialsinfosubmitauditapi: http + "/government/governmentinfo/submitauditapi.json",//政府领导审核（获取跟进类别、推进合作阶段、以及审核领导数据接口）
  Governmentofficialsinfoauditapi: http + "/government/governmentinfo/auditapi.json",//审核人进行审核接口
  Governmentofficialsinfomylistapi: http + "/messageremind/mylistapi.json",//未查看信息弹框内容
  Governmentofficialsinfohandleapi: http + "/messageremind/handleapi.json",//未查看信息提交
  Governmentofficialsinfoflowprocessapi: http + "/government/governmentinfo/flowprocessapi.json",//审核流程信息
  Governmentofficialsinfooperatorsapi: http + "/government/governmentinfo/operatorsapi.json",//指定审核人员下拉框列表
  Governmentofficialsinfoassignapi: http + "/government/governmentinfo/assignapi.json",//指定审核人员提交
  Governmentofficialsinfooperatorauditapi: http + "/government/governmentinfo/operatorauditapi.json",//运营部负责人审核
  Governmentofficialsinfoischeckapi: http + "/government/governmentinfo/ischeckapi.json",//是否可查看联系跟进
  GovernmentofficialsinfouserList: http + "/collection/userList.json",//未合作客户中按姓名筛选
  GovernmentoAreaselectapi: http + "/government/governmentinfo/areaselectapi.json",//已合作省市区接口（带地理位置划分的区域）
  
  //产品管理
  Productlistapi: http + "/government/product/listapi.json",//产品列表
  Productsaveapi: http + "/government/product/saveapi.json",//产品保存（弹框）
  Productdeleteapi: http + "/government/product/deleteapi.json",//产品删除（列表）
  Productdetailsapi: http + "/government/product/detailsapi.json",//产品详情（弹框内展示、回显）
  
  //移交
  transfercustcmauthorityapi: http + "/government/governmentinfo/cmauthorityapi.json",//是否有移交功能
  transferunituserapi: http + "/government/governmentinfo/unituserapi.json",//移交客户弹框中 指定移交人下拉框内容
  transfercustomermigrationapi: http + "/government/governmentinfo/customermigrationapi.json",//提交指定转移人
  
  //委托招商合同
  contractqueryapi: http + "/government/contract/queryapi.json",//合同列表
  contractsaveapi: http + "/government/contract/saveapi.json",//保存合同
  contractdeleteapi: http + "/government/contract/deleteapi.json",//删除合同
  contractdetailsapi: http + "/government/contract/detailsapi.json",//修改合同（详情回显）
  contractdictsvalueapi: http + "/government/governmentinfo/dictsvalueapi.json",//签约方式、开票类型、招投标下拉框
  contracttypeapi: http + "/collection/type.json",//我司领导、我司部门领导
  contractofficialnamesapi: http + "/government/officialsinfo/namesapi.json",//政府签约人代表
  contractlistapi: http + "/government/product/listapi.json",//合同内产品选择下拉框

  


  exporthangye: http + "/touzhijiazhi/Export/exporthangye",//1.1.1产业地图导出
  exportgaoxin: http + "/touzhijiazhi/Export/exportgaoxin",//1.1.2高新技术企业导出
  exportzhengfu: http + "/touzhijiazhi/Export/exportzhengfu",//1.1.3政府奖励企业导出
  exportbiaozhu: http + "/touzhijiazhi/Export/exportbiaozhu",//1.1.4标准制定企业导出
  exportzhuanxiang: http + "/touzhijiazhi/Export/exportzhuanxiang",//1.1.5专项证照企业导出
  exportdujiaos: http + "/touzhijiazhi/Export/exportdujiaos",//1.1.6中国独角兽100强导出
  exportfive: http + "/touzhijiazhi/Export/exportfive",//1.1.7500强导出
  exporqiche: http + "/touzhijiazhi/Export/exporqiche",//1.1.8中国汽车零部件企业百强导出
  exporthangyepai: http + "/touzhijiazhi/Export/exporthangyepai",//1.1.9行业排名
  exportzonglan: http + "/touzhijiazhi/Export/exportzonglan",//1.1.10新基建总览导出
  exportxifen: http + "/touzhijiazhi/Export/exportxifen",//1.1.11新基建细分导出 
  exportone: http + "/touzhijiazhi/Export/exportone",//1.1.12新基建独角兽100强导出
  exportquyu: http + "/touzhijiazhi/Export/exportquyu",//1.1.13区域监控导出
  fileList: http + "/file/list.json",//1.1.13区域监控导出


  collectionSelect: http + "/collection/type.json",//5+2下拉框
  collectionAddinformation: http + "/collection/addinformation.json ",//添加项目详情5+2
  collectionUpdateinfo: http + "/collection/updateinfo.json",//5+2修改项目详情
  collectionDelinfo: http + "/collection/delinfo.json",//5+2删除项目详情
  collectionInfolist: http + "/collection/infolist.json",//5+2项目详情列表
  collectionDiyu: http + "/collection/diyu.json",//5+2地域列表
  collectionMoreFileUpload: http + "/collection/moreFileUpload",//5+2附件上传
  collectionFujian: http + "/collection/fujian.json",//5+2附件列表
  collectionUpdatefujian: http + "/collection/updatefujian.json",//5+2附件删除
  collectionDownloadfujian: http + "/collection/downloadfujian",//5+2附件下载
  collectionCompany: http + "/collection/company.json",//5+2收藏企业
  collectionInfo: http + "/collection/info.json",//5+2/单挑详情

  collectionAddsyn: http + "/collection/addsyn.json",//1.13简化5+2添加
  collectionUpdatesyn: http + "/collection/updatesyn.json",//1.14简化5+2修改
  collectionLooksyn: http + "/collection/looksyn.json",//简化5+2详情
  collectionDelsyn: http + "/collection/delsyn.json",//1.16简化5+2删除

  industryChainFb: http + "/industryChain/fenbu",//产业分布
  industryFbList: http + "/industryChain/fenbulist",//产业分布数据表


  GaikuangAllcount: http + "/touzhijiazhi/Gaikuang/allcount.json",//公司详情发展经营条数

  //项目对接会
  buttRenyuan: http + "/butt/renyuan.json",//1.1.1组织结构图
  buttAddmatchups: http + "/butt/addmatchups.json",//1.1.2添加
  buttUpdatematchups: http + "/butt/updatematchups.json",//1.1.3修改
  buttDelmatchups: http + "/butt/delmatchups.json",//1.1.4删除
  buttLookmatchups: http + "/butt/lookmatchups.json",//1.1.5查看
 //1.1.6往来单位列表  238行
 //1.1.7所属项目列表   293行
 //1.1.8支持领导列表  247行
  buttMatchupslist: http + "/butt/matchupslist.json",//1.1.9列表
  buttShenhecount: http + "/butt/shenhecount.json",//1.1.10待审核条数

  //审批流程
  buttProcesslist: http + "/butt/processlist.json",//1.2.1流程列表列表
  buttUpdatprocess: http + "/butt/updatprocess.json",//1.2.2审核修改
  buttShenhelist: http + "/butt/shenhelist.json",//1.2.3审核列表列表

  //政府报名
  buttZhengfulist: http + "/butt/zhengfulist.json",//1.3.1往来单位
  buttInfomalist: http + "/button/infomalist.json",//1.3.2政府人员列表
  buttBoolea: http + "/button/boolea.json",//1.3.3判断是否可以报名
  buttAddapply: http + "/button/addapply.json",//1.3.4政府报名添加
  buttLookupdateapply: http + "/button/lookupdateapply.json",//1.3.5政府报名查看
  buttUpdateapply: http + "/button/updateapply.json",//1.3.6修改政府报名
  buttDelapply: http + "/button/delapply.json",//2.1.1删除
  buttApplylist: http + "/button/applylist.json",//2.1.2备注列表
  
  //企业拜访
  waitAdd: http + "/wait/add.json",//1.1.1增加
  waitUpdate: http + "/wait/update.json",//1.1.2修改
  waitDel: http + "/wait/del.json",//1.1.3删除
  waitLook: http + "/wait/look.json",//1.1.4查看
  //1.1.5拜访企业列表列表     companylist
  waitList: http + "/wait/list.json",//1.1.6拜访列表

  //对接会时间
  timeMoreFileUpload: http + "/time/moreFileUpload",//2.2.1添加附件
  timeList: http + "/time/list.json",//2.2.2对接会列表
  timeAdd: http + "/time/add.json",//2.2.3对接会时间添加
  timeLook: http + "/time/look.json",//2.2.4对接会时间查看
  timeUpdate: http + "/time/update.json",//2.2.5对接会时间修改
  timeDel: http + "/time/del.json",//2.2.6删除

  
  collectionBolean: http + "/collection/bolean.json",//查询该公司是否有笔记
  
  //对接会推进
  followList: http + "/follow/list.json",//2.3.1项目跟进列表
  followAdd: http + "/follow/add.json",//2.3.2添加
  followLook: http + "/follow/look.json",//2.3.3查看
  followUpdate: http + "/follow/update.json",//2.3.4修改
  followDel: http + "/follow/del.json",//2.3.5删除
  
   //推荐未对接政府
   recomList: http + "/recom/list.json",//2.4.1列表
   recomAdd: http + "/recom/add.json",//2.4.2添加
   recomLook: http + "/recom/look.json",//2.4.3查看
   recomUpdate: http + "/recom/update.json",//2.4.4修改
   recomDel: http + "/recom/del.json",//2.4.5删除
   recomExport: http + "/touzhijiazhi/Export/recom.json",//2.4.1导出

   //推荐已对接政府
   buttDuijielist: http + "/butt/duijielist.json",//2.5.1列表
   zhengfuExport: http + "/touzhijiazhi/Export/zhengfu.json",//2.5.2导出

   //政府反馈
   projectFeedupdate: http + "/project/feedupdate.json",//1.1.1修改
   projectFeedlook: http + "/project/feedlook.json",//1.1.2查看
   projectFeedlist: http + "/project/feedlist.json",//1.1.3政府反馈列表

   //企业项目反馈
   projectInspectupdate: http + "/project/inspectupdate.json",//1.1.1修改
   projectInspectlook: http + "/project/inspectlook.json",//1.1.2查看
   projectInspectlist: http + "/project/inspectlist.json",//1.2.3企业项目反馈列表
   
   //公司相关人员
   MgaoguanttCompany: http + "/touzhijiazhi/Mgaoguantt/companylist.json",//公司相关人员相关公司
   

}
export default globalAPI