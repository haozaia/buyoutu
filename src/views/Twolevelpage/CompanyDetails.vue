<template>
  <div id="CompanyDetails">
    <div class="Company_ctr">
      <!-- 公司详情头部 -->
      <div class="company_t">
        <div id="C_content">
          <div class="C_container">
            <div class="C_title">
              <span class="Title_left"></span>
              {{Base64.decode($route.query.name)}}
              <!-- @click="addCool" -->
              <div class="floatR CollectionWapper" v-if="buttjoin&&unitCode == 3" style="cursor:auto">
                <span class="fontSize20 colorH">已对接</span>
              </div>
              <div class="floatR" v-else>
              <div
                class="inline fontSize20 floatR CollectionWapper"
                @click="openDialog"
                v-if="isColl"
              >
                <img class="Collection inline" src="../../assets/images/Collection/info.svg" />
                <span class="inline">
                  备注(<span class="colorH">{{remarkTotal}}</span>)
                </span>
              </div>

              <div
                class="inline fontSize20 floatR CollectionWapper"
                @click="openDialogs(coolId,Base64.decode($route.query.name))"
                v-if="isColl&&noteFlag"
              >
                <span class="inline colorH">
                  笔记
                </span>
              </div>
              <div
                class="inline fontSize20 floatR CollectionWapper"
                @click="openDialogs(coolId,Base64.decode($route.query.name))"
                v-else
              >
                <span class="inline" >
                  笔记
                </span>
              </div>

              <div class="inline floatR" v-if='unitCode == 3'>
              <div
                class="inline fontSize20 floatR CollectionWapper"
                @click="addCool(1)"
                v-if="!isSpecial"
              >
                <img class="Collection inline" src="../../assets/images/Collection/specialW.svg" />
                <span class="inline">特别关注</span>
              </div>
              <div
                class="inline fontSize20 floatR CollectionWapper"
                @click="delSpecial(0)"
                v-else
              >
                <img class="Collection inline" src="../../assets/images/Collection/specialR.svg" />
                <span class="inline">特别关注</span>
              </div>
              </div>
              <div
                class="inline fontSize20 floatR CollectionWapper"
                @click="addCool(isSpecial)"
                v-if="!isColl"
              >
                <img class="Collection inline" src="../../assets/images/Collection/CollectionW.svg" />
                <span class="inline">收藏</span>
              </div>
              <div class="inline fontSize20 floatR CollectionWapper" @click="handleClickTo" v-else>
                <img class="Collection inline" src="../../assets/images/Collection/CollectionR.svg" />
                <span class="inline colorH">收藏</span>
              </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="company_top">
          <div class="company_right">
            <p class="p1">
              <b>{{Base64.decode($route.query.name)}}</b>
            </p>
          </div>
        </div>-->
        <div class="company_center">
          <ul class="center_tag fontSize20">
            <li>
              联系电话：
              <!-- <span style="padding-right:10%;">{{companyList.dianhua}}</span> -->
              <el-popover
                style="display:inline-block;"
                trigger="click"
                placement="right"
                v-if="unitCode==1||unitCode==3||unitCode==8"
              >
                <div v-if="tableData.length >1 ">
                  <el-table :data="tableData" style="width: 100%" stripe>
                    <el-table-column prop="jianc" label="名称" align="center"></el-table-column>
                    <el-table-column prop="xingbie" label="性别" align="center"></el-table-column>
                    <el-table-column prop="shouji" label="手机" width="120" align="center"></el-table-column>
                    <el-table-column prop="shouji2" label="手机2" width="120" align="center"></el-table-column>
                    <el-table-column prop="zuoji" label="座机" width="120" align="center"></el-table-column>
                    <el-table-column prop="youxiang" label="邮件" width="200" align="center"></el-table-column>
                    <el-table-column prop="zhiwu" label="职务" width="160" align="center"></el-table-column>
                  </el-table>
                  <p v-if="companyList.lianxidh||companyList.dianhua">
                    <b>更多联系方式：</b>
                     {{companyList.lianxidh}}
                    <span
                      v-if="companyList.lianxidh"
                    >;</span>
                    {{companyList.dianhua}}
                  </p>
                  <!-- <p v-if="nianbaoDh">
                    <b>联系方式(来自年报)</b>
                    : {{nianbaoDh.telephone}} <span v-if="nianbaoDh.telephone">;</span> 
                    {{nianbaoDh.email}}
                  </p> -->
                </div>

                <div id="el-tableDh" v-if="tableData.length ==1">
                  <table
                    stripe
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    class="el-table"
                    style="width: 100%;border-radius: 5px;"
                  >
                    <tr class>
                      <td colspan="1" rowspan="1" v-if="tableData[0].jianc">
                        <div class="cell">
                          <b>名称</b> :
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].jianc">
                        <div class="cell">{{tableData[0].jianc}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].xingbie">
                        <div class="cell">
                          <b>性别</b> :
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].xingbie">
                        <div class="cell">{{tableData[0].xingbie}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].shouji">
                        <div class="cell">
                          <b>手机</b> :
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].shouji">
                        <div class="cell">{{tableData[0].shouji}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].shouji2">
                        <div class="cell">
                          <b>手机2</b> :
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].shouji2">
                        <div class="cell">{{tableData[0].shouji2}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].zuoji">
                        <div class="cell">
                          <b>座机</b> :
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].zuoji">
                        <div class="cell">{{tableData[0].zuoji}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].youxiang">
                        <div class="cell">
                          <b>邮件</b> :
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].youxiang">
                        <div class="cell">{{tableData[0].youxiang}}</div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].zhiwu">
                        <div class="cell">
                          <b>职务</b> :
                        </div>
                      </td>
                      <td colspan="1" rowspan="1" v-if="tableData[0].zhiwu">
                        <div class="cell">{{tableData[0].zhiwu}}</div>
                      </td>
                    </tr>
                  </table>
                  <div colspan="1" rowspan="1">
                    <div class="cell" v-if="companyList.lianxidh||companyList.dianhua">
                      <b>其它联系方式</b>
                      ：
                      {{companyList.lianxidh}}
                      <span
                        v-if="companyList.lianxidh"
                      >;</span>
                      {{companyList.dianhua }}
                    </div>
                  </div>
                </div>

                <div v-if="tableData.length ==0">
                  <div v-if="companyList.lianxidh||companyList.dianhua ">
                    {{companyList.lianxidh}}
                    <span v-if="companyList.lianxidh">;</span>
                    {{companyList.dianhua }}
                  </div>
                  <div v-else>
                    <p style="text-align:center;">暂无数据~</p>
                  </div>
                </div>

                <div slot="reference" class="name-wrapper">
                  <span v-if="tableData.length !=0" class="inline fontSize18 phoneShow">点击查看</span>
                  <span v-else-if='companyList.lianxidh||companyList.dianhua' class="inline fontSize18 phoneShow">点击&nbsp;查看</span>
                  <!-- <el-tag size="medium" style="cursor:pointer"  type="danger">点击查看</el-tag> -->
                </div>
              </el-popover>
              <el-popover style="display:inline-block;" trigger="click" placement="left" v-else>
                <div>当前账号无权限查看</div>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" style="cursor:pointer" type="info">点击查看</el-tag>
                </div>
              </el-popover>
            </li>
            <li>{{companyList.lianxiyx?"联系邮箱：":"注册资本："}}{{companyList.lianxiyx?companyList.lianxiyx:companyList.zhucezb}}</li>
            <li>
              {{companyList.gongsiwz!='暂无'?"公司网址：":"成立时间："}}
              <span
                v-if="companyList.gongsiwz!='暂无'"
                class="companyListGongsiwz"
                :title="companyList.gongsiwz"
              >
                <a
                  target="_blank"
                  v-if="toRescue(companyList.gongsiwz)"
                  :href="companyList.gongsiwz"
                >{{companyList.gongsiwz}}</a>
                <a
                  target="_blank"
                  v-else-if="toRescues(companyList.gongsiwz)"
                  :href="companyList.gongsiwz"
                >{{companyList.gongsiwz}}</a>
                <a
                  target="_blank"
                  v-else
                  :href="'http://'+companyList.gongsiwz"
                >{{companyList.gongsiwz}}</a>
              </span>
              <span v-else>{{companyList.chenglisj}}</span>
            </li>
            <li>
              <span class="comLxfs">{{companyList.tongxindz ? "通信地址：":"注册地址："}}</span>
              <section
                class="comLxfsSec"
                :title="companyList.tongxindz?companyList.tongxindz:companyList.zhucedz"
              >{{companyList.tongxindz?companyList.tongxindz:companyList.zhucedz}}</section>
            </li>
            <li>
              {{companyList.suoshuzbsc ? "资本市场：":"法人代表："}}
              <a
                v-if="companyList.finacelink"
                :href="companyList.finacelink"
                target="_blank"
              >{{companyList.suoshuzbsc?companyList.suoshuzbsc:companyList.fadingdbr}}</a>
              <span v-else>{{companyList.suoshuzbsc?companyList.suoshuzbsc:companyList.fadingdbr}}</span>
            </li>

            <li v-if="gongsixz[0]">公司性质：{{gongsixz[0]}}</li>
            <p v-if="yewuld.length !==0">
              <span class="comYwldTit">业务亮点：</span>
              <section class="inline comYwld">
                <span v-for="(item,index) in yewuld" :key="index">
                  <span v-if="item" id="Tags" class="inline">{{item}}</span>
                </span>
              </section>
            </p>
          </ul>
        </div>
      </div>
      <div class="company_c">
        <template>
          <div id="particulars">
            <div class="radio-wrap">
              <div class="radio-group fontSize22">
                <span
                  v-for="(tab ,index) in tabs"
                  disabled="true"
                  class="tabName"
                  :class="[iscur==index ? 'cur' : '', tab.disFlag ? '' : 'isDisabled']"
                  @click="iscur=index,tabChange('select' + (index + 1))"
                  :key="tab.index"
                >{{tab.name}}<span class="fontSize16" v-if="tab.value" :class="[iscur==index ?'colorH' : 'color6']">&nbsp;{{tab.value?tab.value:0}}</span></span>
                
              </div>
              <!-- <div style="margin:10px 0;"></div> -->
              <keep-alive>
                <component v-bind:is="tabView"></component>
              </keep-alive>
            </div>
          </div>
        </template>
      </div>
    </div>
    <el-dialog title :visible.sync="dialogTableVisible" @close="handleClose" width="1400px">
      <div slot="title" class="header-title fontSize24">
        <p class="inline">
         {{Base64.decode($route.query.name)}}  &nbsp;&nbsp;备注列表 (<span class="colorH">{{remarkTotal}}</span>)
        </p>
      </div>
      <ul class="remarkWapper">
        <li class="remark" v-for="(item,index) in postList" :key="index">
          <section class="remarkLeft inline">
           <p>
              <span v-if="item.managerName">姓名:</span>
              {{item.managerName}} &nbsp;&nbsp;
              <span v-if="item.beizhu2">职位:</span>
              {{item.beizhu2}} &nbsp;&nbsp;
              <span v-if="item.beizhu1">沟通阶段:</span>
              {{item.beizhu1}} &nbsp;&nbsp;
              <span v-if="item.managerMobile">电话1:</span>
              {{item.managerMobile}} &nbsp;&nbsp;
              <span v-if="item.wechatNumber">微信号:</span>
              {{item.wechatNumber}} &nbsp;
              <span v-if="item.managerMobile1">电话2:</span>
              {{item.managerMobile1}} &nbsp;
              <span v-if="item.telephone">固定电话:</span>
              {{item.telephone}} &nbsp; 备注：{{item.postscript?item.postscript:'无'}}
            </p>
            <p class="fontSize14 color9 time">{{item.createTime.substring(0,10)}}</p>
          </section>
          <section class="remarkRight">
            <span class="curPoi modify" @click="toUpdateRemark(item,item.id)">
              <i class="el-icon-edit"></i>
            </span>
            <span class="curPoi" @click="delRemark(item.id)">
              <i class="el-icon-delete"></i>
            </span>
          </section>
        </li>
      </ul>
      
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="manageForm"
        label-width="100px"
        class="rowManage"
      >
      <el-row :gutter="10" >
        <el-col :span="4">
        <el-form-item prop="managerName">
          <el-input v-model="ruleForm.managerName" placeholder="高管姓名"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4">
         <el-form-item prop="positionLevel">
          
          <el-cascader
                v-model="gaoGuanZW"
                :options="positionOptions"
                @change="handleChangeZW"
                placeholder="高管职位"
                style="width:100%"
                :props="{ children:'list',label:'position',value:'position'}"
              ></el-cascader>
         </el-form-item>
        </el-col>
        <el-col :span="4">
           <el-form-item prop="proceduresLevel">
          <el-select v-model="ruleForm.proceduresLevel" placeholder="沟通阶段" style="width:100%">
            <el-option
              v-for="item in talkOptions"
              :key="item.projectProcedures"
              :label="item.projectProcedures"
              :value="item.proceduresLevel"
            ></el-option>
          </el-select>
           </el-form-item>
        </el-col>
        <el-col :span="4">
             <el-form-item prop="managerMobile">
          <el-input v-model.number="ruleForm.managerMobile" placeholder="手机1"></el-input>
             </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="wechatNumber">
              <el-input v-model="ruleForm.wechatNumber" placeholder="微信号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
               <el-form-item prop="managerMobile1">
          <el-input v-model="ruleForm.managerMobile1" placeholder="手机2"></el-input>
               </el-form-item>
        </el-col>
        <el-col :span="4">
                 <el-form-item prop="telephone">
          <el-input v-model="ruleForm.telephone" placeholder="固话(xxx-xxxxxxxx)"></el-input>
                 </el-form-item>
        </el-col>
      </el-row>
        <el-form-item prop="postscript">
        <el-input
          type="textarea"
          placeholder="请在这里填写内容（最多100字）…"
          :autosize="{ minRows: 3, maxRows: 9}"
          v-model="ruleForm.postscript"
        ></el-input>
        </el-form-item>
      </el-form>

      <el-button class="subt floatR" @click="submits('manageForm')" type="primary">提交</el-button>
      <div class="clear"></div>
    </el-dialog>
    <el-dialog
      title="5+2笔记"
      center
      :show-close="false"
      v-if="dialogVisibles"
      id="chainMAPS"
      :visible.sync="dialogVisibles"
      width="1200px"
    >
      <div class="close" @click="dialogVisibles=false">×</div>
      <fiveSimplifyDialog :close="Fun" :fiveId="fiveId" :fiveName="fiveName" :synId="synId" ></fiveSimplifyDialog>
    </el-dialog>
    <el-dialog :title=" Base64.decode($route.query.name) +'- 财务报表'" :visible.sync="dialogVisible" width="1000px" >
          <div class="iframeWapper">
          <iframe class="iframeTable" scrolling="auto" seamless frameborder="0" :src="companyList.finacelink"></iframe>
        </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
import fiveSimplifyDialog from "../Firstpage/fiveSimplifyDialog.vue";
import select1 from "../../../src/components/Company_details/company_profile.vue";
import select2 from "../../../src/components/Company_details/development_history.vue";
import select3 from "./annualReportsDetails.vue";
import select4 from "../../../src/components/Company_details/operation.vue";
import select5 from "../../../src/components/Company_details/sameCompany.vue";
import select6 from "../../../src/components/Company_details/danger_rgc.vue";
import select7 from "../../../src/components/Company_details/award_permit.vue";
import select8 from "../../../src/components/Company_details/intellectual.vue";
import select9 from "../../../src/components/Company_details/intellectualOne.vue";
import select10 from "../../../src/components/Company_details/intellectualTwo.vue";
// import select8 from "../../../src/components/Company_details/danger_rgc.vue";
// import select9 from "../../../src/components/Company_details/ComNews.vue";

// import select8 from "../../../src/components/Company_details/stockReference.vue";
// import select9 from "../../../src/components/Company_details/danger_rgc.vue";
// import select10 from "../../../src/components/Company_details/danger_rgc.vue";
// import select11 from "../../../src/components/Company_details/company_news.vue";
// import select14 from "../../../src/components/Company_details/TopManagement.vue";
// import select15 from "../../../src/components/Company_details/financial_index.vue";
// import select16 from "../../../src/components/Company_details/financial_statements.vue";
// import select17 from "../../../src/components/Company_details/previous_issue.vue";
// import select18 from "../../../src/components/Company_details/ownership_structure.vue";
// import select19 from "../../../src/components/Company_details/equity_changes.vue";
// import select21 from "../../../src/components/Company_details/historical_stock.vue";
// import select22 from "../../../src/components/Company_details/research_report.vue";
// import select23 from "../../../src/components/Company_details/company_news.vue";
// import select12 from "../../../src/components/Company_details/stockReference.vue";

export default {
  name: "particulars",
  data() {
    // 手机号验证
const validatePhone = (rule, value, callback) => {
   var self = this;
  if (self.ruleForm.managerMobile == ""&&self.ruleForm.managerMobile1 == ""&&self.ruleForm.telephone == "") {
    callback(new Error("至少输入一个电话号码"));
  }else if(value == ''){
     callback();
  } else {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error("请输入正确的手机号"));
    } else {
       this.$refs['manageForm'].clearValidate(['managerMobile','managerMobile1','telephone']);
      callback();
    }
  }
}; 
    const wechattext = (rule, value, callback) => {
      var self = this;
      if (value == "" || value == null) {
        callback();
      } else {
        if (!/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(value)) {
          callback(
            new Error("6-20位、字母开头、数字、下划线和减号、不可设置中文")
          );
        } else {
          callback();
        }
      }
    };
const validatelePhone = (rule, value, callback) => {
   var self = this;
  if (self.ruleForm.managerMobile == ""&&self.ruleForm.managerMobile1 == ""&&self.ruleForm.telephone == "") {
    callback(new Error("至少输入一个电话号码"));
  }else if(value == ''){
     callback();
  } else {
    if (value.length>30) {
      callback(new Error("请输入正确的固话号码"));
    } else{
       this.$refs['manageForm'].clearValidate(['managerMobile','managerMobile1','telephone']);
      callback();
    }
  }
}; 
const validateCtext = (rule, value, callback) => {
   var self = this;
if(value == ''){
     callback();
  } else {
    if (self.ruleForm.postscript.length > 100 || self.ruleForm.postscript.length < 1){
      callback(new Error("请输入少于100个字"));
    } else {
      callback();
    }
  }
}; 
    return {
      remarkTotal: "0",
      //笔记
      noteFlag:false,
       fiveId: "",
      fiveName: "",
      synId: "", 

      textarea1: "",
      coolId: "",
      isUpdate: false,
      postList: [],
      dialogTableVisible: false,
      postId: "",
      dialogVisible:false,
      href: "",
      
      dialogVisibles:false,
      ruleForm: {
          managerName: '',
          positionLevel: '',
          proceduresLevel: '',
          managerMobile: '',
          managerMobile1: '',
          telephone: '',
          postscript: '',
        },
      positionOptions:[],
      talkOptions:[],
      gaoGuanZW:'',
        wechatNumber: "",
      rules: {
           managerName: [
            { required: true, message: '请输入高管姓名', trigger: 'change' },
             { min: 2, max: 10, message: '长度在 2 到 10 个字', trigger: 'change' }
          ],
           positionLevel: [
            { required: true, message: '请选择高管等级', trigger: 'change' }
          ],
           wechatNumber: [{ validator: wechattext, trigger: "change" }],
           proceduresLevel: [
            { required: true, message: '请选择对接阶段', trigger: 'change' }
          ],
           managerMobile: [{ validator: validatePhone, trigger: "change" }],
           managerMobile1: [{ validator: validatePhone, trigger: "change" }],
           telephone: [{ validator: validatelePhone, trigger: "change" }],
           postscript: [{ validator: validateCtext, trigger: "change" }],
        },

      mainid: "",
      tabView: "select1",
      iscur: 0,
      isColl: false,
      isSpecial : 0,
      userName: "",
      mobile: "",
      tabs: [
        { name: "公司概况", disFlag: true ,value:0 },
        { name: "发展/经营", disFlag: true,value:0 },
        { name: "年度报告", disFlag: false ,value:0 },
        { name: "产品/竞品", disFlag: false ,value:0 },
        { name: "相似公司", disFlag: false ,value:0 },
        { name: "风险合规", disFlag: false ,value:0 },
        { name: "证照奖励", disFlag: false ,value:0 },
        { name: "专利信息", disFlag: false ,value:0 },
        { name: "商标信息", disFlag: false ,value:0 },
        { name: "软件著作", disFlag: false ,value:0 },
        // { name: "相关行业" },
        // { name: "国内可比公司" },
        // { name: "海外可比公司" },
        // { name: "公司公告" },
        // { name: "个股速览" },
        // { name: "商业模式" },
        // { name: "行业及风险因素" },
        // { name: "高管团队" },
        // { name: "财务指标" },
        // { name: "财务报表" },
        // { name: "历次发行" },
        // { name: "股权结构" },
        // { name: "股权变动" },
        // { name: "投资族谱" },
        // { name: "历史股价" },
        // { name: "研究报告" },
        // { name: "公司新闻" }
      ],
      companyList: {},
      zibensc: {},
      gongsixz: {},
      yewuld: {},
      tableData: [],
      userRole: "",
      companty: false,
      nianbaoDh: "",
      RealName: "",
      unitCode: ""
    };
  },

  components: {
    fiveSimplifyDialog,
    select1,
    select2,
    select3,
    select4,
    select5,
    select6,
    select7,
    select8,
    select9,
    select10
    // select14,
    // select15,
    // select16,
    // select17,
    // select18,
    // select19,
    // select21,
    // select22,
    // select23,
    // select11
  },
  watch:{
    "ruleForm.managerMobile":function(curVal, oldVal) {
      if (!curVal) {
        this.ruleForm.managerMobile = "";
        return false;
      }
      // 实时把非数字的输入过滤掉
      this.ruleForm.managerMobile = curVal.match(/\d/gi) ? curVal.match(/\d/gi).join("") : "";
    },
    "ruleForm.managerMobile1":function(curVal, oldVal) {
      if (!curVal) {
        this.ruleForm.managerMobile1 = "";
        return false;
      }
      // 实时把非数字的输入过滤掉
      this.ruleForm.managerMobile1 = curVal.match(/\d/gi) ? curVal.match(/\d/gi).join("") : "";
    },
    "tabs[1].value":function(curVal, oldVal) {
     console.log(curVal,"old")
     console.log(oldVal)
    },
  },
  mounted() {
    var self = this;
    self.mainid = this.$route.query.name;
    self.RealName = localStorage.getItem("realName");
    self.username = localStorage.getItem("userName");
    self.mobile = localStorage.getItem("mobile");
    self.unitCode = localStorage.getItem("unitCode");
    self.coolInfo();
    self.getPosition();
    self.getTalk();
    self.Jibenxx();
    self.companyYwld();
    self.nainbaoDh();
    self.userRole = localStorage.getItem("userRole");
    self.GaikuangAllcount();
    self.nainbaoDis();
    self.jingpinDis();
    self.zhengfujiangliDis();
    self.fengxianheguiDis();
    self.zhishichanquanDis();
    self.newsDis();
    self.kebiDis();
    self.dangerDis();
    self.noteFlagJudge();
    console.log(self.tabs[1].value)
  },

  methods: {
        handleChangeZW(value) {
      var self = this
        var obj = self.positionOptions.find((item)=>{
          return item.position === value[0];
            });
        var objs = obj.list.find((item)=>{
          return item.position === value[1];
            });
        self.ruleForm.positionLevel=objs.positionLevel
      },
       //判断是否有笔记
    noteFlagJudge() {
      var self = this;
      let params = {
        companyName: Base64.decode(self.mainid),
        mobile: self.mobile,
      };
      this.axios({
        url: this.api.collectionBolean,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
       self.noteFlag = res.data.data.flag == 'true'?true:false
       self.synId = res.data.data.id ?res.data.data.id:''
      });
    },
        //打开笔记
    openDialogs(id,name) {
      var self = this;
      self.fiveId=id
      self.fiveName=name
      console.log(name)
      self.dialogVisibles = true;
      // self.RemarkList()
    },
    Fun(msg) {
      var self = this;
      console.log(msg);
      self.dialogVisibles = false;
      self.noteFlagJudge();
      // self.Gongxinjsqy();
    },
    getPosition() {
      var self = this;
      this.axios({
        url: this.api.collectionZhiwu,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.positionOptions = res.data.data
      });
    },
    getTalk() {
      var self = this;
      this.axios({
        url: this.api.collectionJieduan,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
         self.talkOptions = res.data.data
      });
    },
    toUpdateRemark(postscript, id) {
      var self = this;
      self.ruleForm = { ...postscript };  
      self.gaoGuanZW= postscript.beizhu2.split(':')
      console.log(self.gaoGuanZW)
      // self.ruleForm = postscript ;
      self.isUpdate = true;
      self.postId = id;
    },
    submits(formName) {
      var self = this;
      self.$refs[formName].validate((valid) => {
          if (valid) {
            if (self.isUpdate) {
        self.updateRemark();
      } else {
        self.addRemark();
      }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
    },
    //添加备注
    addRemark() {
      var self = this;
      let params = {
        collectId: self.coolId,
        mobile: self.mobile,
        collectCompany:self.mainid,
        unitCode:self.unitCode,
      };
      Object.assign(params, self.ruleForm);
       params.positionLevel = JSON.stringify(params.positionLevel);
      this.axios({
        url: this.api.addpost,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "添加备注成功!",
            type: "success"
          });
          self.RemarkList();
        setTimeout(()=>{
             this.$refs["manageForm"].resetFields();
            self.gaoGuanZW=''
          },100)
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },
    //删除备注
    delRemark(id) {
      var self = this;
      let params = {
        id: id
      };
      this.axios({
        url: this.api.delpost,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "删除备注成功!",
            type: "success"
          });
          self.RemarkList();
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },
    //修改备注
    updateRemark() {
      var self = this;
      let params = {
        id: self.postId,
        postscript: self.ruleForm.postscript,
        positionLevel: self.ruleForm.positionLevel,
        proceduresLevel: self.ruleForm.proceduresLevel,
        managerName: self.ruleForm.managerName,
        managerMobile: self.ruleForm.managerMobile,
        managerMobile1: self.ruleForm.managerMobile1,
        telephone: self.ruleForm.telephone,
        postscript: self.ruleForm.postscript,
        mobile: self.mobile,
        collectCompany:self.mainid,
        unitCode:self.unitCode,
          wechatNumber: self.ruleForm.wechatNumber,
      };
      this.axios({
        url: this.api.updatepost,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "添加备注成功!",
            type: "success"
          });
          self.RemarkList();
          self.isUpdate=false
        setTimeout(()=>{
           this.$refs["manageForm"].resetFields();
            self.gaoGuanZW=''
          },100)

        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },
    //备注列表
    RemarkList() {
      var self = this;
      let params = {
        collectId: self.coolId
      };
      this.axios({
        url: this.api.postlist,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.remarkTotal = res.data.data.count;
        self.postList = res.data.data.list;
      });
    },

    //窗口打开回调
    openDialog() {
      var self = this;
      self.dialogTableVisible = true;
      self.RemarkList()
    },
    //关闭回调
    handleClose() {
      var self = this;
      self.isUpdate = false;
      self.Gongxinjsqy();
      setTimeout(() => {
        this.$refs["manageForm"].resetFields();
        self.gaoGuanZW=''
      }, 100);
    },

  //判断是否收藏
    coolInfo() {
      var self = this;
      let params = {
        userName: self.username,
        mobile: self.mobile,
        collectCompany: self.mainid
      };
      this.axios({
        url: this.api.companyistrue,
        data: this.$qs.stringify(params),
        method: "post", 
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.isColl = res.data.data.flag == "true" ? true : false;
        self.isSpecial = res.data.data.special == "1" ? 1 : 0;
        self.buttjoin = res.data.data.buttjoin == "1" ? 1 : 0;
        // console.log(self.isColl);
        self.coolId = res.data.data.id;
        // console.log(self.coolId);
        self.RemarkList();
      });
    },
    //添加收藏
    addCool(coolS) {
      var self = this;
      // console.log(coolS)
      let params = {
        userName: self.username,
        mobile: self.mobile,
        collectCompany: self.mainid,
        special:coolS,
        unitCode:self.unitCode,
      };
      this.axios({
        url: this.api.addcompany,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "收藏成功!",
            type: "success"
          });
          self.coolInfo()
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //取消特别收藏
    delSpecial(special){
      var self = this
      let params = {
        id: self.coolId,
        special:special,
        unitCode:self.unitCode
      };
      this.axios({
        url: this.api.updatespecial,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "取消关注成功!",
            type: "success"
          });
         self.isSpecial = 0
        } else {
          tthis.$message.error(res.data.msg);
        }
      });
    },
    //清除收藏
       //取消关注
    handleClickTo(){
        var self = this;
        if(self.unitCode == 3){
          this.$confirm("是否确认取消收藏!(取消收藏后将无法再次收藏)", "提示", {
           confirmButtonText: "确定",
           showCancelButton: true,
           cancelButtonClass: "cancelCollection",
           // cancelButtonText: '取消',
           type: "warning"
         })
           .then(() => {
             self.delCool()
           })
           .catch(() => {
             this.$message({
               type: "info",
               message: "已取消删除"
             });
           });
        }else{
          this.$confirm("是否确认取消收藏!", "提示", {
           confirmButtonText: "确定",
           showCancelButton: true,
           cancelButtonClass: "cancelCollection",
           // cancelButtonText: '取消',
           type: "warning"
         })
           .then(() => {
             self.delCool()
           })
           .catch(() => {
             this.$message({
               type: "info",
               message: "已取消删除"
             });
           });
        }
    },
    delCool() {
      var self = this;
      let params = {
        id: self.coolId,
      };
      this.axios({
        url: this.api.delcompany,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "取消收藏成功!",
            type: "success"
          });
          self.isColl = false;
          self.isSpecial = 0
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },
    //判断是否有数据
    nainbaoDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.nainbaoDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[2].disFlag = res.data.data.flag;
        self.tabs[2].value = res.data.data.totalCount;
      });
    },
    jingpinDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.jingpinDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[3].disFlag = res.data.data.flag;
        self.tabs[3].value = res.data.data.totalCount;
      });
    },
    zhengfujiangliDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.zhengfujiangliDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[6].disFlag = res.data.data.flag;
        self.tabs[6].value = res.data.data.totalCount;
      });
    },
    fengxianheguiDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.shangbiaoxxIsShow,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[8].disFlag = res.data.data.flag;
        self.tabs[8].value = res.data.data.totalCount;
        
      });
    },
    zhishichanquanDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.zhuanliIsShow,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[7].disFlag = res.data.data.flag;
        self.tabs[7].value = res.data.data.totalCount;

      });
    },
     GaikuangAllcount() {
      var self = this;
      let params = {
        gognsiname: self.mainid
      };
      this.axios({
        url: this.api.GaikuangAllcount,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.count)
        self.tabs[1].value = res.data.count;
        // console.log(self.tabs[1].value)
      });
    },
    kebiDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.kebiDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[4].disFlag = res.data.data.flag;
        self.tabs[4].value = res.data.data.totalCount;

      });
    },
    dangerDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.fengxianheguiDis,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[5].disFlag = res.data.data.flag;
        self.tabs[5].value = res.data.data.totalCount;

      });
    },

    newsDis() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.ruanjianzzqIssHOW,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tabs[9].value = res.data.data.totalCount;
        self.tabs[9].disFlag = res.data.data.flag;
      });
    },
    //年报电话
    nainbaoDh() {
      var self = this;
      // console.log(self.companyList.name);
      let params = {
        name: self.mainid
      };
      this.axios({
        url: this.api.nianbaoapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data[0])
        self.nianbaoDh = res.data.data[0]
          ? res.data.data[0]
          : [{ telephone: "" }];
      });
    },
    See(e) {
      window.open(e, "_blank");
    },
    //判断网址
    toRescue(url) {
      if (url) {
        return (
          url
            .replace(/\s+/g, "")
            .substr(0, 7)
            .toLowerCase() == "http://"
        );
      } else {
        return false;
      }
    },
    toRescues(url) {
      if (url) {
        return (
          url
            .replace(/\s+/g, "")
            .substr(0, 8)
            .toLowerCase() == "https://"
        );
      } else {
        return false;
      }
    },
    tabChange: function(tab) {
      this.tabView = tab;
    },
    //公司基本信息
    Jibenxx() {
      var self = this;
      // console.log(self.unitCode)
      let params = {
        gognsiname: self.mainid,
        unitCode:self.unitCode
      };
      this.axios({
        url: this.api.Gaikuang,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        function checkAdult(x) {
          return x != "";
          //  &&x.indexOf("奖励") != -1
        }
        self.companyList = res.data.data[0];
        // console.log(self.companyList);
        self.zibensc = res.data.data[0].suoshuzbsc
          ? res.data.data[0].suoshuzbsc.split(",").filter(checkAdult)
          : "";
        self.gongsixz = res.data.data[0].gongsilx
          ? res.data.data[0].gongsilx.split(",").filter(checkAdult)
          : "";

        if (self.companyList.lianxidh) {
          self.companty = true;
        }
        // console.log(self.zibensc);
        self.tableList();
      });
    },
    //业务亮点
    companyYwld() {
      var self = this;
      let params = {
        gongsiname: self.mainid
      };
      this.axios({
        url: this.api.companyYwld,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        function checkAdult(x) {
          return x != "";
          //  &&x.indexOf("奖励") != -1
        }
        // console.log(self.tableData.length);
        self.yewuld = res.data.data[0].name
          ? res.data.data[0].name.split(",").filter(checkAdult)
          : "";
      });
    },
    //crm系统电话号码
    tableList() {
      var self = this;
      // console.log(self.companyList.name);
      let params = {
        wanglaidw: self.mainid,
        guanliren: self.RealName
      };
      this.axios({
        url: this.api.companyPhone,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData = res.data.data;
        // console.log(self.tableData.length);
        if (self.tableData.length != 0) {
          self.companty = true;
        }
      });
    }
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";
.el-table{
    td:nth-child(odd){
      .cell{
       padding-right: 0;
      }
    }
    td:nth-child(even){
      .cell{
        padding-left:0
      }
    }
    }
#CompanyDetails .Company_ctr .company_t .company_center .center_tag p {
  width: 100%;
}
#CompanyDetails {
    
  .iframeWapper{
  position: relative;;
  overflow: hidden;
  height:470px;
  width: 100%;
}
.iframeTable{
  width: calc(100% + 30px);
  height: 830px;
  position: absolute;
  top: -336px;
}
  .remarkWapper {
    max-height: 260px;
    overflow-y: auto;
  }
  .el-dialog__header {
    padding: 10px 20px;
    background: #eee !important;
    border-radius: 6px 6px 0 0;
  }
  .el-dialog__footer{
    padding-top: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #000;
  }
  .el-dialog__headerbtn .el-dialog__close:hover {
    color: #cf111b;
  }
  .el-dialog__body {
    font-size: 20px;
    color: #000;
    padding: 0 0 20px;
  }
  .companyListGongsiwz {
    display: inline-block;
    width: calc(100% - 150px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }
  .el-textarea {
    font-size: 20px;
  }
  .el-textarea__inner:focus {
    outline: 0;
    border-color: #cf111b;
  }
  .comLxfsSec {
    display: inline-block;
    width: calc(100% - 150px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }
  .remark {
    zoom: 1;
    position: relative;
    // margin-bottom: 20px;
    padding: 19px 20px 16px ;
    .time {
      margin-top: 4px;
    }
  }
  .remark:nth-child(odd)
{
background:#F7F6F6;
}
  .el-textarea__inner {
    color: #000;
  }
  .subt {
    margin-top: 10px;
    margin-right: 20px;
  }
  .remarkRight {
    width: 160px;
    position: absolute;
    right: 20px;
    top: 19px;
    text-align: right;
    span:hover {
      color: #cf111b;
    }
  }
  .el-dialog__header {
    padding: 10px 20px;
    background: #eee !important;
    border-radius: 6px 6px 0 0;
  }
  .el-dialog {
    border-radius: 6px;
  }
  .remarkLeft {
    margin-right: 160px;
  }
  .modify {
    margin-right: 20px;
  }
  .el-row{
    margin-bottom: 10px;
  }
  .rowManage{
    padding: 20px 20px 0;
    .el-form-item__content{
      margin-left: 0 !important;
    }
    .el-form-item{
      margin-bottom: 10px;
    }
  }
}
</style>