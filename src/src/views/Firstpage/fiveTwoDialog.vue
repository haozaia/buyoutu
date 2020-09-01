<template>
  <div id="fiveTwoDialog">
    <el-form
      :model="dengmiQueryForm"
      label-position="left"
      ref="dengmiQueryForm"
      label-width="200px"
      class="demo-ruleForm"
      size="mini"
      :rules="rules"
    >
      <el-divider content-position="left">基本信息</el-divider>
      <el-row>
        <el-col span="8">
          <el-form-item prop="projectName" label="项目名称：">
            <el-input v-model="dengmiQueryForm.projectName"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="projectSource" label="项目来源：">
            <el-select
              v-model="dengmiQueryForm.projectSource"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in select1"
                :key="item.value"
                :label="item.name"
                :value="item.value*1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="collectCompany" label="往来单位：">
            <el-select
              v-model="dengmiQueryForm.collectCompany"
              filterable
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in favoriteList"
                :key="item.company"
                :label="item.company"
                :value="item.company"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item prop="belongToIndustry" label="所属产业：">
            <el-select
              placeholder
              filterable
              multiple
              :multiple-limit="8"
              v-model="dengmiQueryForm.belongToIndustry"
              style="width:100%;"
            >
              <el-option v-for="(item,index) in cities" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="left">项目5要素</el-divider>
      <el-row>
        <el-col span="8">
          <el-form-item prop="currencyCategorie" label="货币类型：">
            <el-select
              v-model="dengmiQueryForm.currencyCategorie"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in select2"
                :key="item.value"
                :label="item.name"
                :value="item.value*1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="investReason" label="投资原因：">
            <el-select v-model="dengmiQueryForm.investReason" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in select3"
                :key="item.value"
                :label="item.name"
                :value="item.value*1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="minInvestment" label="总投资额(亿元)：">
            <el-input v-model="dengmiQueryForm.minInvestment"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item prop="maxInvestment" label="一期投资额(亿元)：">
            <el-input v-model="dengmiQueryForm.maxInvestment"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="minAnnualValue" label="最低年产值(亿元)：">
            <el-input v-model="dengmiQueryForm.minAnnualValue"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="maxAnnualValue" label="最高年产值(亿元)：">
            <el-input v-model="dengmiQueryForm.maxAnnualValue"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item prop="minAnnualTax" label="最低年税收(亿元)：">
            <el-input v-model="dengmiQueryForm.minAnnualTax"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="maxAnnualTax" label="最高年税收(亿元)：">
            <el-input v-model="dengmiQueryForm.maxAnnualTax"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="firstIntentionArea" label="意向区域首选：">
            <el-cascader
              :title="dengmiQueryForm.firstIntentionArea"
              ref="refHandle"
              style="width:100%;"
              @change="diyuChange"
              v-model="dengmiQueryForm.firstIntentionArea"
              :options="diyuList"
              :show-all-levels="false"
              :props="{ checkStrictly: true,multiple:true,multipleLimit:3}"
              collapse-tags
              clearable
              filterable
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item prop="areaRigidRequirement" label="选址地址硬性要求：">
            <el-input v-model="dengmiQueryForm.areaRigidRequirement"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="govermentRequire" label="对政府要求:">
            <el-input v-model="dengmiQueryForm.govermentRequire"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="secondIntentionArea" label="意向区域次选：">
            <!-- <el-input v-model="dengmiQueryForm.secondIntentionArea"></el-input> -->
            <el-cascader
              :title="dengmiQueryForm.secondIntentionArea"
              ref="refHandle"
              @change="diyuChangeSec"
              style="width:100%;"
              v-model="dengmiQueryForm.secondIntentionArea"
              :options="diyuList"
              :show-all-levels="false"
              :props="{ checkStrictly: true,multiple:true,multipleLimit:3}"
              collapse-tags
              clearable
              filterable
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item prop="withoutRegardArea" label="不考虑区域：">
            <el-cascader
              :title="dengmiQueryForm.withoutRegardArea"
              ref="refHandle"
              style="width:100%;"
              v-model="dengmiQueryForm.withoutRegardArea"
              :options="diyuList"
              :show-all-levels="false"
              :props="{ checkStrictly: true,multiple:true,multipleLimit:3}"
              collapse-tags
              clearable
              filterable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="contactGoverment" label="已深度接触政府：">
            <el-cascader
              :title="dengmiQueryForm.contactGoverment"
              ref="refHandle"
              style="width:100%;"
              v-model="dengmiQueryForm.contactGoverment"
              :options="diyuList"
              :show-all-levels="false"
              :props="{ checkStrictly: true,multiple:true,multipleLimit:3}"
              collapse-tags
              clearable
              filterable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="floorSpace" label="占地面积：">
            <el-input v-model="dengmiQueryForm.floorSpace"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item prop="factoryNeeds" label="厂房需求详情：">
            <el-input v-model="dengmiQueryForm.factoryNeeds"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="fundStructure" label="资金结构：">
            <el-input v-model="dengmiQueryForm.fundStructure"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="capitalSource" label="资金来源：">
            <el-input v-model="dengmiQueryForm.capitalSource"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="left">企业+N信息</el-divider>
      <el-row>
        <el-col span="8">
          <el-form-item prop="existingProduction" label="现有产值(亿元)：">
            <el-input v-model="dengmiQueryForm.existingProduction"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="existingScale" label="现有场地：" class="existingScale">
            <el-input v-model="dengmiQueryForm.existingScale"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="teamScale" label="团队规模：">
            <el-input v-model="dengmiQueryForm.teamScale"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item prop="environmental" label="环评环保补充：">
            <el-input v-model="dengmiQueryForm.environmental"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="isEnvironmental" label="环评环保通过：">
            <el-select
              v-model="dengmiQueryForm.isEnvironmental"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option label="通过" value="0"></el-option>
              <el-option label="未通过" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="targetMarket" label="目标市场：">
            <el-select v-model="dengmiQueryForm.targetMarket" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in select4"
                :key="item.value"
                :label="item.name"
                :value="item.value*1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item prop="projectGroundTime" label="计划落地时间：">
            <el-date-picker
              style="width:100%"
              v-model="dengmiQueryForm.projectGroundTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="16">
          <el-form-item prop="otherSupplementary" label="其他补充：">
            <el-input v-model="dengmiQueryForm.otherSupplementary"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-checkbox v-model="dengmiQueryForm.policyReasonableStatus">政策的合理性</el-checkbox>
        </el-col>
        <el-col :span="8">
          <el-checkbox v-model="dengmiQueryForm.acceptStatus">是否认可东方龙商务</el-checkbox>
        </el-col>
        <el-col :span="8">
          <el-checkbox v-model="dengmiQueryForm.decisionMakerStatus">对接人是否是最高决策人</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-checkbox v-model="dengmiQueryForm.foreignLayoutStatus">是否有对外布局意向</el-checkbox>
        </el-col>
        <el-col :span="8">
          <el-checkbox v-model="dengmiQueryForm.operabilityAtatus">是否有意向区域，投资体量和生产必要素，具有可操作性</el-checkbox>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:0">
        <el-col span="4" class="floatR">
          <el-button @click="submitForm('dengmiQueryForm')" type="primary">保存</el-button>
          <el-button @click="resetForm('dengmiQueryForm')" type="primary">清空</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["close", "change"],
  name: "dengmiQuery",
  data() {
    const validateCtext = (rule, value, callback) => {
      var self = this;
      if (value == "" || value == null) {
        callback();
      } else {
        if (!/^\d+(\.\d{0,2})?$/.test(value)) {
          callback(new Error("请输入数字,最多为6位，且最多保留两位小数"));
        }else if(value.toString().split(".")[0].length>6){
          callback(new Error("整数部分最多为6位"));
        } else {
          callback();
        }
      }
    };
    return {
      dengmiQueryForm: {
        collectCompany: "",
        projectName: "",
        projectSource: "",
        currencyCategorie: "",
        investReason: "",
        minInvestment: "",
        maxInvestment: "",
        minAnnualValue: "",
        maxAnnualValue: "",
        minAnnualTax: "",
        maxAnnualTax: "",
        fundStructure: "",
        capitalSource: "",
        firstIntentionArea: "",
        areaRigidRequirement: "",
        govermentRequire: "",
        secondIntentionArea: "",
        withoutRegardArea: "",
        contactGoverment: "",
        floorSpace: "",
        factoryNeeds: "",
        existingProduction: "",
        existingScale: "",
        teamScale: "",
        environmental: "",
        isEnvironmental: "1",
        targetMarket: "",
        projectGroundTime: "",
        otherSupplementary: "",
        policyReasonableStatus: "",
        operabilityAtatus: "",
        decisionMakerStatus: "",
        foreignLayoutStatus: "",
        acceptStatus: ""
      },
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        projectSource: [
          { required: true, message: "请选择项目来源", trigger: "blur" }
        ],
        collectCompany: [
          { required: true, message: "请选择往来单位", trigger: "blur" }
        ],
        minInvestment: [{ validator: validateCtext, trigger: "blur" }],
        maxInvestment: [{ validator: validateCtext, trigger: "blur" }],
        minAnnualValue: [{ validator: validateCtext, trigger: "blur" }],
        maxAnnualValue: [{ validator: validateCtext, trigger: "blur" }],
        minAnnualTax: [{ validator: validateCtext, trigger: "blur" }],
        maxAnnualTax: [{ validator: validateCtext, trigger: "blur" }],
        existingProduction: [{ validator: validateCtext, trigger: "blur" }]
      },
      select1: [],

      select2: [],
      select3: [],
      select4: [],
      cities: [],
      favoriteList: [],
      diyuList: [],
      options: [],
      firstVal: "",
      sectVal: ""
    };
  },
  created() {
    var self = this;
    self.collectionSelect("project_source_type");
    self.collectionSelect("currency_categories_type");
    self.collectionSelect("invest_reason_type");
    self.collectionSelect("target_market_type");
    self.Keyindustries();
    self.favorite();
    self.diyu();
    if (self.change) {
      self.fiveInfo();
    }
  },
  mounted() {},
  methods: {
    //单条详情
    fiveInfo() {
      var self = this;
      let params = {
        id: self.change,
        unitCode: this.$store.state.unitCode
      };
      this.axios({
        url: this.api.collectionInfo,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.dengmiQueryForm = res.data.data;
        var datas = res.data.data;
        datas.belongToIndustry = JSON.parse(datas.belongToIndustry);
        datas.secondIntentionArea = JSON.parse(datas.secondIntentionArea);
        datas.firstIntentionArea = JSON.parse(datas.firstIntentionArea);
        datas.contactGoverment = JSON.parse(datas.contactGoverment);
        datas.withoutRegardArea = JSON.parse(datas.withoutRegardArea);
        datas.isEnvironmental = datas.isEnvironmental.toString();
        datas.policyReasonableStatus = datas.policyReasonableStatus == 1?true:false;
          datas.operabilityAtatus = datas.operabilityAtatus ==1?true:false;
          datas.decisionMakerStatus = datas.decisionMakerStatus == 1?true:false;
          datas.foreignLayoutStatus = datas.foreignLayoutStatus == 1?true:false;
          datas.acceptStatus = datas.acceptStatus == 1?true:false;
      });
    },
    //地域控制3条
    diyuChange(val) {
      var self = this;
      console.log(self.firstVal);
      if (self.dengmiQueryForm.firstIntentionArea.length == 3) {
        console.log(111);
        self.firstVal = self.dengmiQueryForm.firstIntentionArea;
      } else if (self.dengmiQueryForm.firstIntentionArea.length > 3) {
        this.$alert("最多只能选择三条！", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
        if (self.firstVal.length == 3) {
          self.dengmiQueryForm.firstIntentionArea = self.firstVal.splice(0, 3);
        } else {
          self.dengmiQueryForm.firstIntentionArea = val.splice(0, 3);
        }
      }
    },
    diyuChangeSec(val) {
      var self = this;
      console.log(self.sectVal);
      if (self.dengmiQueryForm.secondIntentionArea.length == 3) {
        console.log(111);
        self.sectVal = self.dengmiQueryForm.secondIntentionArea;
      } else if (self.dengmiQueryForm.secondIntentionArea.length > 3) {
        this.$alert("最多只能选择三条！", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
        if (self.sectVal.length == 3) {
          self.dengmiQueryForm.secondIntentionArea = self.sectVal.splice(0, 3);
        } else {
          self.dengmiQueryForm.secondIntentionArea = val.splice(0, 3);
        }
      }
    },
    // //重点产业下拉框
    Keyindustries() {
      this.axios({
        url: this.api.GovernmentMajorindustriesapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.cities = res.data.data;
      });
    },
    //地域下拉框
    diyu() {
      this.axios({
        url: this.api.collectionDiyu,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.diyuList = res.data.data;
      });
    },
    // //重点产业下拉框
    favorite() {
      var self = this;
      let params = {
        mobile: this.$store.state.mobile
      };
      this.axios({
        url: this.api.collectionCompany,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.favoriteList = res.data.data;
      });
    },
    //下拉框
    collectionSelect(type) {
      var self = this;
      let params = {
        type: type
      };
      this.axios({
        url: this.api.collectionSelect,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        switch (type) {
          case "project_source_type":
            self.select1 = res.data.data;
            break;
          case "currency_categories_type":
            self.select2 = res.data.data;
            break;
          case "invest_reason_type":
            self.select3 = res.data.data;
            break;
          case "target_market_type":
            self.select4 = res.data.data;
            break;
          default:
            console.log(res.data);
        }
      });
    },
    submitForm(formName) {
      var self = this;

      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this;
          let params = {
            userName: this.$store.state.userName,
            mobile: this.$store.state.mobile
          };
          Object.assign(params, self.dengmiQueryForm);
          params.belongToIndustry = JSON.stringify(params.belongToIndustry);
          params.secondIntentionArea = JSON.stringify(
            params.secondIntentionArea
          );
          params.firstIntentionArea = JSON.stringify(params.firstIntentionArea);
          params.contactGoverment = JSON.stringify(params.contactGoverment);
          params.withoutRegardArea = JSON.stringify(params.withoutRegardArea);
          

          params.policyReasonableStatus = params.policyReasonableStatus == true?'1':0;
          params.operabilityAtatus = params.operabilityAtatus == true?'1':0;
          params.decisionMakerStatus = params.decisionMakerStatus == true?'1':0;
          params.foreignLayoutStatus = params.foreignLayoutStatus == true?'1':0;
          params.acceptStatus = params.acceptStatus == true?'1':0;
          if (self.change) {
            params.id = self.change;
            params.userMobile = this.$store.state.mobile;
            this.axios({
              url: this.api.collectionUpdateinfo,
              method: "post",
              data: this.$qs.stringify(params),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.$refs[formName].resetFields();
                self.close(123);
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning"
                });
              }
            });
          } else {
            this.axios({
              url: this.api.collectionAddinformation,
              method: "post",
              data: this.$qs.stringify(params),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.$refs[formName].resetFields();
                self.close(123);
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning"
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style  lang='scss'>
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #cf111b;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #cf111b;
  border-color: #cf111b;
}
#fiveTwoDialog {
  padding: 0 20px;
  .el-cascader__search-input::placeholder {
    color: #999;
    font-size: 20px;
  }
  .el-cascader__tags {
    height: 24px;
    overflow: hidden;
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
  .el-form {
    .el-row {
      margin-bottom: 16px;
    }
  }
  .el-col {
    padding-right: 10px;
  }
  .el-divider__text {
    font-size: 18px;
    color: #cf111b;
  }
  .el-input__inner {
    height: auto !important;
    line-height: auto !important;
  }
  .el-checkbox__label{
     color: #cf111b;
  }
}
.existingScale /deep/ .el-form-item__label{
        color: #cf111b;
    }
</style>