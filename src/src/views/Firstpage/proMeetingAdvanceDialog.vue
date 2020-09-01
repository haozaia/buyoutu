<template>
  <div id="proMeetingSignUpDialog">
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
        <el-col span="12">
          <el-form-item prop="theme" label="主题：">
            <el-input v-model="dengmiQueryForm.theme"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item prop="collectCompany" label="往来单位：">
            <el-input v-model="collectCompany" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item prop="govermentPark" label="政府园区：">
            <el-select
              v-model="dengmiQueryForm.govermentPark"
              placeholder="请选择"
              style="width:100%;"
              @change="buttInfomalist()"
            >
              <el-option
                v-for="item in proList"
                :key="item.govermentSector"
                :label="item.govermentSector"
                :value="item.govermentSector"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="12">
          <el-form-item prop="projectMatchups" label="项目对接会：">
            <el-input v-model="projectMatchups"  readonly="readonly"></el-input>
          </el-form-item>
        </el-col>

        
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="investigationWays" label="考察方式：">
            <el-select
              v-model="dengmiQueryForm.investigationWays"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in select1"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item prop="followContent" label="跟进内容：">
            <el-input v-model="dengmiQueryForm.followContent"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="projectStatus" label="项目状态：">
            <el-select
              v-model="dengmiQueryForm.projectStatus"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in select2"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      
        <el-col span="12">
          <el-form-item prop="twoWayInvestigation" label="双向考察发布：">
            <el-cascader
              :title="dengmiQueryForm.twoWayInvestigation"
              ref="refHandle"
              style="width:100%;"
              v-model="dengmiQueryForm.twoWayInvestigation"
              :options="LDLists"
              :show-all-levels="false"
              :props="{multiple:true,value:'label'}"
              collapse-tags
              clearable
              filterable
            ></el-cascader>
          </el-form-item>
        </el-col>
        </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item prop="invalidReason" label="作废原因：">
            <el-input v-model="dengmiQueryForm.invalidReason"></el-input>
          </el-form-item>
        </el-col>
      
        <el-col span="12">
          <el-form-item prop="nextContent" label="下次内容：">
            <el-input v-model="dengmiQueryForm.nextContent"></el-input>
          </el-form-item>
        </el-col>
</el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="stage" label="阶段：">
            <el-select v-model="dengmiQueryForm.stage" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in select3"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="left">实地考察</el-divider>
      <el-row>
        <el-col span="12">
          <el-form-item prop="proSupremeLeader" label="项目最高领导：">
            <el-select
              v-model="dengmiQueryForm.proSupremeLeader"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in MemList"
                :key="item.managerName"
                :label="item.managerName"
                :value="item.managerName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item prop="proSupremeLeaderDuty" label="项目最高领导职务：">
            <el-input v-model="dengmiQueryForm.proSupremeLeaderDuty"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item prop="proPersonnel" label="项目人员：">
            <el-select v-model="dengmiQueryForm.proPersonnel" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in MemList"
                :key="item.managerName"
                :label="item.managerName"
                :value="item.managerName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="12">
          <el-form-item prop="proOtherPersonnel" label="项目其他人员：">
            <el-input v-model="dengmiQueryForm.proOtherPersonnel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col span="12">
          <el-form-item prop="govSupremeLeader" label="政府最高领导：">
            <el-select
              v-model="dengmiQueryForm.govSupremeLeader"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in LDList"
                :key="item.id"
                :label="item.govermentOfficialName"
                :value="item.govermentOfficialName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item prop="govSupremeLeaderDuty" label="政府最高领导职务：">
            <el-input v-model="dengmiQueryForm.govSupremeLeaderDuty"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item prop="govPersonnel" label="政府人员：">
            <el-select v-model="dengmiQueryForm.govPersonnel" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in LDList"
                :key="item.id"
                :label="item.govermentOfficialName"
                :value="item.govermentOfficialName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="12">
          <el-form-item prop="govOtherPersonnel" label="政府其他人员：">
            <el-input v-model="dengmiQueryForm.govOtherPersonnel"></el-input>
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
  props: ["close", "projectMatchupsId", "projectMatchups", "collectCompany",'collectId' ,"changeId"],
  name: "dengmiQuery",
  data() {
    const validateCtext = (rule, value, callback) => {
      var self = this;
      if (value == "" || value == null) {
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
        govermentPark: "",
        theme: "",
        investigationWays: "",
        followContent: "",
        projectStatus: "",
        twoWayInvestigation: "",
        invalidReason: "",
        nextContent: "",
        stage: "",
        proSupremeLeader: "",
        proSupremeLeaderDuty: "",
        proPersonnel: [],
        proOtherPersonnel: "",
        govSupremeLeader: "",
        govSupremeLeaderDuty: "",
        govPersonnel: [],
        govOtherPersonnel: ""
      },
      rules: {
        theme: [
          { required: true, message: "请填写主题", trigger: "blur" }
        ],
        govermentPark: [
          { required: true, message: "请选择政府园区", trigger: "blur" }
        ],
      },
      proList: [],
      LDList: [],
      LDLists: [],
      MemList: [],
      select1: [],
      select2: [],
      select3: [],
      firstVal: "",
      sectVal: "",
      comList: ""
    };
  },

  created() {
    var self = this;
    self.buttZhengfulist();
     this.postlist()
     self.buttRenyuan()
      self.collectionSelect("investigation_ways_type");
      self.collectionSelect("project_status_type");
      self.collectionSelect("stage_type");
    if (self.changeId) {
      self.fiveInfo();
    }
  },
  mounted() {},
  methods: {
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
          case "investigation_ways_type":
            self.select1 = res.data.data;
            break;
          case "project_status_type":
            self.select2 = res.data.data;
            break;
          case "stage_type":
            self.select3 = res.data.data;
            break;
          default:
            console.log(res.data);
        }
      });
    },
    // 项目领导列表下拉框
    postlist(val) {
      var self = this;
      console.log(val);
      let params = {
        collectId: self.collectId
      };
      this.axios({
        url: this.api.postlist,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.MemList = res.data.data.list;
      });
    },
    // 组织结构下拉框
    buttRenyuan() {
      var self = this;
      this.axios({
        url: this.api.buttRenyuan,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.LDLists = res.data.data;
      });
    },
    //单条详情
    fiveInfo() {
      var self = this;
      let params = {
        id: self.changeId
      };
      this.axios({
        url: this.api.followLook,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.dengmiQueryForm = res.data.data;
        var datas = res.data.data;
          datas.twoWayInvestigation = JSON.parse(datas.twoWayInvestigation);
          datas.govPersonnel = JSON.parse(datas.govPersonnel)=='""'?"":JSON.parse(datas.govPersonnel);
          datas.proPersonnel = JSON.parse(datas.proPersonnel)=='""'?"":JSON.parse(datas.proPersonnel);
          setTimeout(()=>{
            self.buttInfomalist()

          },1000)
      });
    },

    // 往来单位下拉框
    buttZhengfulist() {
      var self = this;
      let params = {
        mobile: this.$store.state.mobile,
        pageNumber: 1,
        pageSize: 10000
      };
      this.axios({
        url: this.api.buttZhengfulist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.proList = res.data.data.list;
      });
    },
    // 出席人员下拉框
    buttInfomalist(zhengFuId) {
      var self = this;
      var Obj =   this.proList.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.govermentSector === self.dengmiQueryForm.govermentPark;//筛选出匹配数据
      });
      console.log(this.proList)
      let params = {
        id: Obj.id
      };
      this.axios({
        url: this.api.buttInfomalist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.LDList = res.data.data;
      });
    },

    submitForm(formName) {
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this;
          console.log(formName);
          let params = {
            userName: this.$store.state.userName,
            mobile: this.$store.state.mobile,
            collectCompany: self.collectCompany,
            projectMatchups: self.projectMatchups,
            projectMatchupsId: self.projectMatchupsId,
          };
          Object.assign(params, self.dengmiQueryForm);
          params.twoWayInvestigation = JSON.stringify(params.twoWayInvestigation);
          params.govPersonnel = JSON.stringify(params.govPersonnel);
          params.proPersonnel = JSON.stringify(params.proPersonnel);
          if (self.changeId) {
            params.id = self.changeId;
            this.axios({
              url: this.api.followUpdate,
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
              url: this.api.followAdd,
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
#proMeetingSignUpDialog {
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
.el-checkbox__inner::after {
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 12px;
  left: 7px;
}
</style>