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

      </el-row>

      <el-divider content-position="left">项目5要素(货币单位为亿元)</el-divider>
      <el-row>
        <el-col span="8">
          <el-form-item prop="minInvestment" label="最低投资额(亿元)：">
            <el-input v-model="dengmiQueryForm.minInvestment"></el-input>
          </el-form-item>
        </el-col>
     
        <el-col span="8">
          <el-form-item prop="maxInvestment" label="最高投资额(亿元)：">
            <el-input v-model="dengmiQueryForm.maxInvestment"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="minAnnualValue" label="最低年产值(亿元)：">
            <el-input v-model="dengmiQueryForm.minAnnualValue"></el-input>
          </el-form-item>
        </el-col>
         </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item prop="maxAnnualValue" label="最高年产值(亿元)：">
            <el-input v-model="dengmiQueryForm.maxAnnualValue"></el-input>
          </el-form-item>
        </el-col>
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
        </el-row>
      <el-row>
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
  props: ["close","fiveId","fiveName", "synId"],
  name: "dengmiQuery",
  data() {
    const validateCtext = (rule, value, callback) => {
      var self = this;
      if (value == ""|| value == null) {
        callback();
      } else {
        if (!/^\d+(\.\d{0,2})?$/.test(value)) {
          callback(new Error("请输入数字且最多保留两位小数"));
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
        otherSupplementary: ""
      },
      rules: {
        minInvestment: [{ validator: validateCtext, trigger: "blur" }],
        maxInvestment: [{ validator: validateCtext, trigger: "blur" }],
        minAnnualValue: [{ validator: validateCtext, trigger: "blur" }],
        maxAnnualValue: [{ validator: validateCtext, trigger: "blur" }],
        minAnnualTax: [{ validator: validateCtext, trigger: "blur" }],
        maxAnnualTax: [{ validator: validateCtext, trigger: "blur" }],
        existingProduction: [{ validator: validateCtext, trigger: "blur" }],
         projectName:  [{ required: true, message: '请填写项目名称', trigger: 'blur' }],
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
      sectVal: "",
    };
  },
  created() {
    var self = this;
    // self.collectionSelect("project_source_type");
    // self.collectionSelect("currency_categories_type");
    // self.collectionSelect("invest_reason_type");
    // self.collectionSelect("target_market_type");
    // self.Keyindustries();
    // self.favorite();
    console.log(self.fiveName)
    console.log(self.synId)
    self.diyu();
    if (self.synId) {
      console.log(6696666)
      self.fiveInfo();
    }
  },
  mounted() {},
  methods: {
    //单条详情
    fiveInfo() {
      var self = this;
      let params = {
        id: self.synId
      };
      this.axios({
        url: this.api.collectionLooksyn,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.dengmiQueryForm = res.data.data;
        var datas= res.data.data;
          datas.secondIntentionArea = JSON.parse(
            datas.secondIntentionArea
          );
          datas.firstIntentionArea = JSON.parse(datas.firstIntentionArea);
        //  datas.belongToIndustry = JSON.parse(datas.belongToIndustry);
        //   datas.contactGoverment = JSON.parse(datas.contactGoverment);
        //   datas.withoutRegardArea = JSON.parse(datas.withoutRegardArea);
        //   datas.isEnvironmental=datas.isEnvironmental.toString()

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
        alert("最多只能选择三条!");
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
        alert("最多只能选择三条!");
        if (self.sectVal.length == 3) {
          self.dengmiQueryForm.secondIntentionArea = self.sectVal.splice(0, 3);
        } else {
          self.dengmiQueryForm.secondIntentionArea = val.splice(0, 3);
        }
      }
    },
    // //重点产业下拉框
    /* Keyindustries() {
      this.axios({
        url: this.api.GovernmentMajorindustriesapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.cities = res.data.data;
      });
    }, */
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
    /* favorite() {
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
    }, */
    //下拉框
    /* collectionSelect(type) {
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
    }, */
    submitForm(formName) {
      var self = this;
      console.log(self.fiveName,'fiveName')
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this;
          let params = {
            userName: this.$store.state.userName,
            mobile: this.$store.state.mobile,
            collectCompany:self.fiveName,
            collectId:self.fiveId,
          };
        
          Object.assign(params, self.dengmiQueryForm);
          params.secondIntentionArea = JSON.stringify(
            params.secondIntentionArea
          );
          params.firstIntentionArea = JSON.stringify(params.firstIntentionArea);
          params.collectCompany=self.fiveName
          if(self.synId){
            params.id=self.synId
            this.axios({
              url: this.api.collectionUpdatesyn,
              method: "post",
              data: this.$qs.stringify(params),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(res => {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.$refs[formName].resetFields();
              self.close(123);
            });
          }else{
             
              console.log(params,'collectCompany')
            this.axios({
              url: this.api.collectionAddsyn,
              method: "post",
              data: this.$qs.stringify(params),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(res => {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.$refs[formName].resetFields();
              self.close(123);
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
}
</style>