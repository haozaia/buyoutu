<template>
  <div id="proExamineDialog">
    <el-form
      :model="dengmiQueryForm"
      label-position="left"
      ref="dengmiQueryForm"
      label-width="200px"
      class="demo-ruleForm"
      size="mini"
      :rules="rules"
      disabled="true"
    >
      <el-divider content-position="left">基本信息</el-divider>
      <el-row>
        <el-col span="8">
          <el-form-item prop="theme" label="主题：">
            <el-input v-model="dengmiQueryForm.theme"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="belongToProjectId" label="所属项目：">
            <el-select
              v-model="dengmiQueryForm.belongToProject"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in proList"
                :key="item.id"
                :label="item.projectName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="collectCompany" label="往来单位：">
            <el-select
              v-model="dengmiQueryForm.collectCompany"
              placeholder="请选择"
              style="width:100%;"
              @change="postlist(dengmiQueryForm.collectId)"
            >
              <el-option
                v-for="item in comList"
                :key="item.id"
                :label="item.collectCompany"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item prop="attachProject" label="附带项目：">
            <el-select
              v-model="dengmiQueryForm.attachProject"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in proList"
                :key="item.projectName"
                :label="item.projectName"
                :value="item.projectName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="nButt" label="N次对接：">
            <el-input v-model="dengmiQueryForm.nButt"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="left">对接会进度</el-divider>

      <el-row>
        <el-col span="8">
          <el-form-item prop="govermentApply" label="政府报名N家：">
            <el-input v-model="dengmiQueryForm.govermentApply"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="officerApply" label="官员报名N家：">
            <el-input v-model="dengmiQueryForm.officerApply"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="buttFeedback" label="对接反馈N次：">
            <el-input v-model="dengmiQueryForm.buttFeedback"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item prop="followAfterBut" label="对接后跟进N次：">
            <el-input v-model="dengmiQueryForm.followAfterBut"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="buttTime" label="对接会时间Y/N：">
            <el-input v-model="dengmiQueryForm.buttTime"></el-input>
          </el-form-item>
        </el-col>

        <el-col span="8">
          <el-form-item prop="contract" label="政企签约N次：">
            <el-input v-model="dengmiQueryForm.contract"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="left">对接会发起</el-divider>
      <el-row>
        <el-col span="8">
          <el-form-item prop="buttStartTime" label="开始时间：">
            <el-date-picker
              style="width:100%"
              v-model="dengmiQueryForm.buttStartTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="buttEndTime" label="结束时间：">
            <el-date-picker
              style="width:100%"
              v-model="dengmiQueryForm.buttEndTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="affirmWay" label="确认方式：">
            <el-select v-model="dengmiQueryForm.affirmWay" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in select3"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col span="8">
          <el-form-item prop="supportLeader" label="支持领导：">
            <!-- <el-select v-model="dengmiQueryForm.supportLeader" placeholder="请选择" style="width:100%;"> -->

            <el-cascader
              :title="dengmiQueryForm.supportLeader"
              ref="refHandle"
              style="width:100%;"
              @change="diyuChange"
              v-model="dengmiQueryForm.supportLeader"
              :options="LDList"
              :show-all-levels="false"
              :props="{multiple:true,value:'label'}"
              collapse-tags
              clearable
              filterable
            ></el-cascader>
            <!-- </el-select> -->
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="buttPlace" label="对接会地点：">
            <el-select v-model="dengmiQueryForm.buttPlace" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in select1"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="projectPresentMembers" label="项目方出席人员：">
            <el-select
              v-model="dengmiQueryForm.projectPresentMembers"
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
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item prop="projectClass" label="项目等级：">
            <el-select v-model="dengmiQueryForm.projectClass" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in select2"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="projectPresentMembersDuty" label="出席人员职务：">
            <el-input v-model="dengmiQueryForm.projectPresentMembersDuty"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item prop="govermentNeedlevel" label="政府级别要求：">
            <el-input v-model="dengmiQueryForm.govermentNeedlevel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-checkbox v-model="dengmiQueryForm.strength">实力</el-checkbox>
        </el-col>
        <el-col :span="6">
          <el-checkbox v-model="dengmiQueryForm.growth">成长性</el-checkbox>
        </el-col>
        <el-col :span="6">
          <el-checkbox v-model="dengmiQueryForm.demanding">高要求</el-checkbox>
        </el-col>
        <el-col :span="6">
          <el-checkbox v-model="dengmiQueryForm.cognitionDegree">认知度</el-checkbox>
        </el-col>
      </el-row>
      <el-divider content-position="left">发布对象</el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="publishOperateButt" label="运营部对接部：">
            <el-input
              :title="dengmiQueryForm.publishOperateButt"
              v-model="dengmiQueryForm.publishOperateButt"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="publisherAuditor" label="发起人审核人：">
            <el-input
              :title="dengmiQueryForm.publisherAuditor"
              v-model="dengmiQueryForm.publisherAuditor"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-row style="margin-bottom:0">
        <el-col span="4" class="floatR">
          <el-button @click="submitForm('dengmiQueryForm')" type="primary">保存</el-button>
          <el-button @click="resetForm('dengmiQueryForm')" type="primary">清空</el-button>
        </el-col>
      </el-row>-->
    </el-form>
    <el-row style="margin-bottom:0">
      <el-col span="2" class="floatR">
        <el-button @click="open()" type="primary">审核</el-button>
      </el-col>
    </el-row>
    <el-dialog title="审核" :visible.sync="shenheVisible" width="400px" center>
      <el-form :model="form">
        <el-form-item label="是否通过" label-width="100px">
          <el-select v-model="shenheForm.operation" placeholder="请选择">
            <el-option label="同意" value="同意"></el-option>
            <el-option label="作废" value="作废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核意见" label-width="100px">
          <el-input
            v-model="shenheForm.leadershipPosition"
            type="textarea"
            :rows="3"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="zuofei" @click="shenheVisible = false">取 消</el-button>
        <el-button type="primary" @click="buttUpdatprocess()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["close", "id", "collectId"],
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
      shenheForm: {
        operation: "同意",
        leadershipPosition: ""
      },
      shenheVisible: false,
      dengmiQueryForm: {
        collectId: "",
        belongToProjectId: "",
        theme: "",
        attachProject: "",
        secondIntentionArea: "",
        firstIntentionArea: "",
        nButt: "",
        govermentApply: "",
        buttFeedback: "",
        followAfterBut: "",
        buttTime: "",
        contract: "",
        buttStartTime: "",
        buttEndTime: "",
        buttPlace: "",
        projectClass: "",
        affirmWay: "",
        supportLeader: "",
        projectPresentMembers: "",
        projectPresentMembersDuty: "",
        govermentNeedlevel: "",
        strength: "",
        growth: "",
        demanding: "",
        cognitionDegree: ""
      },
      rules: {
        theme: [{ required: true, message: "请输入主题", trigger: "blur" }],
        belongToProjectId: [
          { required: true, message: "请选择所属项目", trigger: "blur" }
        ],
        collectId: [
          { required: true, message: "请选择往来单位", trigger: "blur" }
        ]
      },
      select1: [],
      select2: [],
      select3: [],
      select4: [],
      cities: [],
      favoriteList: [],
      diyuList: [],
      options: [],
      proList: [],
      LDList: [],
      MemList: [],
      firstVal: "",
      sectVal: "",
      comList: ""
    };
  },
  created() {
    var self = this;
    self.collectionSelect("butt_place_type");
    self.collectionSelect("project_class_type");
    self.collectionSelect("affirm_way_type");
    // self.Keyindustries();
    self.favorite();
    self.diyu();
    self.buttRenyuan();
    self.companylist();
    self.collectionInfolist();
    setTimeout(() => {
      self.fiveInfo();
    }, 100);
  },
  mounted() {},
  methods: {
    // 审核意见弹出框
    buttUpdatprocess() {
      var self = this;
      let params = {
        id: self.id,
        mobile: this.$store.state.mobile,
        operation: self.shenheForm.operation,
        leadershipPosition: self.shenheForm.leadershipPosition
      };
      if (self.shenheForm.leadershipPosition.length < 100) {
        this.axios({
          url: this.api.buttUpdatprocess,
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
            self.close(123);
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        });
      } else {
        this.$message({
          message: "最多填写100个字哦~",
          type: "warning"
        });
      }
    },
    //审核
    open() {
      var self = this;
      self.shenheVisible = true;
    },
    //单条详情
    fiveInfo() {
      var self = this;
      let params = {
        id: self.collectId
      };
      this.axios({
        url: this.api.buttLookmatchups,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.dengmiQueryForm = res.data.data;
        var datas = res.data.data;
        datas.supportLeader = JSON.parse(datas.supportLeader);
        datas.strength = datas.strength ? true : false;
        datas.growth = datas.growth ? true : false;
        datas.demanding = datas.demanding ? true : false;
        datas.cognitionDegree = datas.cognitionDegree ? true : false;
      });
    },
    //地域控制3条
    diyuChange(val) {
      var self = this;
      console.log(val);
    },
    // diyuChangeSec(val) {
    //   var self = this;
    //   console.log(self.sectVal);
    //   if (self.dengmiQueryForm.secondIntentionArea.length == 3) {
    //     console.log(111);
    //     self.sectVal = self.dengmiQueryForm.secondIntentionArea;
    //   } else if (self.dengmiQueryForm.secondIntentionArea.length > 3) {
    //     alert("最多只能选择三条!");
    //     if (self.sectVal.length == 3) {
    //       self.dengmiQueryForm.secondIntentionArea = self.sectVal.splice(0, 3);
    //     } else {
    //       self.dengmiQueryForm.secondIntentionArea = val.splice(0, 3);
    //     }
    //   }
    // },
    // //重点产业下拉框
    // Keyindustries() {
    //   this.axios({
    //     url: this.api.GovernmentMajorindustriesapi,
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   }).then(res => {
    //     this.cities = res.data.data;
    //   });
    // },
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
    // 收藏企业下拉框
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
    // 所属项目下拉框
    collectionInfolist() {
      var self = this;
      let params = {
        mobile: this.$store.state.mobile,
        pageNumber: 1,
        pageSize: 500
      };
      this.axios({
        url: this.api.collectionInfolist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.proList = res.data.data.list;
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
        this.LDList = res.data.data;
        console.log(self.LDList);
      });
    },
    // 项目领导列表下拉框
    postlist(val) {
      var self = this;
      console.log(val);
      let params = {
        collectId: val
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
    // 往来单位下拉框
    companylist() {
      var self = this;
      let params = {
        mobile: this.$store.state.mobile,
        pageNumber: 1,
        pageSize: 500
      };
      this.axios({
        url: this.api.companylist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.comList = res.data.data.list;
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
          case "butt_place_type":
            self.select1 = res.data.data; //地点
            break;
          case "project_class_type":
            self.select2 = res.data.data; //等级
            break;
          case "affirm_way_type":
            self.select3 = res.data.data; //确认方式
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
          console.log(formName);
          let params = {
            userName: this.$store.state.userName,
            mobile: this.$store.state.mobile
          };
          Object.assign(params, self.dengmiQueryForm);
          params.supportLeader = JSON.stringify(params.supportLeader);
          this.axios({
            url: this.api.buttAddmatchups,
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
#proExamineDialog {
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
.zuofei {
  padding: 9px 15px;
  height: 36px !important;
  width: 80px !important;
  vertical-align: middle !important;
  font-size: 20px !important;
  padding: 0 !important;
}
.zuofei:hover {
  color: #cf111b;
  border-color: #cf111b;
  background-color: #fdd2d4;
}
#proExamineDialog {
  .el-dialog__body {
    padding: 20px 30px 0px;
  }
}
</style>