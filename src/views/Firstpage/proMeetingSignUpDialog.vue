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
      <el-divider content-position="left">合同内容</el-divider>
      <el-row>
        <el-col span="12">
          <el-form-item prop="collectId" label="往来单位：">
            <el-select
              v-model="dengmiQueryForm.collectId"
              placeholder="请选择"
              style="width:100%;"
              filterable
              @change="buttInfomalist()"
            >
              <el-option
                v-for="item in proList"
                :key="item.id"
                :label="item.govermentSector"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        
      </el-row>

      <el-divider content-position="left">强烈申请</el-divider>

      <el-row>
        <el-col span="12">
          <el-form-item prop="recommendedReason" label="强烈推荐理由：">
            <el-input v-model="dengmiQueryForm.recommendedReason"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item prop="presentMembers" label="出席人员：">
            <el-select
              v-model="dengmiQueryForm.presentMembers"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in LDList"
                :key="item.govermentOfficialName"
                :label="item.govermentOfficialName"
                :value="item.govermentOfficialName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col span="12">
          <el-form-item prop="presentMembersDuty" label="预计出席人员级别：">
            <el-input v-model="dengmiQueryForm.presentMembersDuty"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item prop="otherStaffs" label="其他人员：">
            <el-input v-model="dengmiQueryForm.otherStaffs"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-divider content-position="left">不能报名</el-divider>
      <el-row>
        <el-col span="12">
            <el-checkbox v-model="dengmiQueryForm.applyStatus">不能报名</el-checkbox>
        </el-col>
        <el-col span="12">
          <el-form-item prop="notApplyReason" label="不能报名理由：">
            <el-input v-model="dengmiQueryForm.notApplyReason"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->


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
  props: ["close", "change","changeId"],
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
        collectId: "",
        recommendedReason:'',
        presentMembers:'',
        presentMembersDuty:'',
        otherStaffs:'',
        applyStatus:'',
        notApplyReason:'',
      },
      rules: {
        collectId: [
          { required: true, message: "请选择往来单位", trigger: "blur" }
        ],
      },
      proList:[],
      LDList:[],
      firstVal: "",
      sectVal: "",
      comList:'',
    };
  },
  created() {
    var self = this;
    self.buttZhengfulist()
    if (self.changeId) {
      self.fiveInfo();
    }
  },
  mounted() {},
  methods: {
    //单条详情
    fiveInfo() {
      var self = this;
      let params = {
        id: self.changeId
      };
      this.axios({
        url: this.api.buttLookupdateapply,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.dengmiQueryForm = res.data.data;
        var datas = res.data.data;
        datas.applyStatus = datas.applyStatus == 1? true:false
        self.buttInfomalist()
      });
    },
    //地域控制3条
    diyuChange(val) {
      var self = this;
      console.log(val);
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

    // 往来单位下拉框
    buttZhengfulist() {
      var self = this;
      let params = {
        mobile: this.$store.state.mobile,
         pageNumber:1,
        pageSize:500,
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
      // var Obj =   this.proList.find((item)=>{//这里的userList就是上面遍历的数据源
      //     return item.govermentSector === self.dengmiQueryForm.presentMembers;//筛选出匹配数据
      // });
      // console.log( this.proList)
      let params = {
        id: self.dengmiQueryForm.collectId
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
      console.log(formName)
          let params = {
            userName: this.$store.state.userName,
            mobile: this.$store.state.mobile,
            matchupsId: self.change
          };
          Object.assign(params, self.dengmiQueryForm);
          params.applyStatus = params.applyStatus==true?1:0
          if(self.changeId){
            params.id=self.changeId
            this.axios({
              url: this.api.buttUpdateapply,
              method: "post",
              data: this.$qs.stringify(params),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(res => {
             
              if(res.data.code == 0){
                 this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.$refs[formName].resetFields();
              self.close(123);
              }else{
                this.$message({
                  message: res.data.msg,
                  type: "warning"
                });
              }
            });
          }else{
            this.axios({
              url: this.api.buttAddapply,
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
    border: 2px solid #FFF;
    border-left: 0;
    border-top: 0;
    height: 12px;
    left: 7px;
}
</style>