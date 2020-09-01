<template>
  <div id="proVisitDialog">
    <el-form
      :model="dengmiQueryForm"
      label-position="left"
      ref="dengmiQueryForm"
      label-width="200px"
      class="demo-ruleForm"
      size="mini"
      :rules="rules"
    >
      <el-row>
        <el-col>
          <el-form-item prop="dokingGovernment" label="政府名称：">
             <el-input v-model="dengmiQueryForm.dokingGovernment" readonly="readonly" :title="dengmiQueryForm.dokingGovernment"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="projectName" label="所属项目：">
            <el-input v-model="dengmiQueryForm.projectName" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="firstFollow" label="首选跟进：">
            <el-input v-model="dengmiQueryForm.firstFollow" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="secondFollow" label="次选跟进：">
            <el-input v-model="dengmiQueryForm.secondFollow"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="secondDocking" label="是否可以二次对接：">
            <el-input v-model="dengmiQueryForm.secondDocking"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="dockedSummarize" label="对接总结：">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="dengmiQueryForm.dockedSummarize"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:0;text-align:center">
        <el-col>
          <el-button @click="submitForm('dengmiQueryForm')" type="primary">保存</el-button>
          <el-button @click="resetForm('dengmiQueryForm')" type="primary">清空</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["close", "changeId"],
  name: "dengmiQuery",
  data() {
    return {
      dengmiQueryForm: {
        dokingGovernment:'',
        projectName:'',
        dockedSummarize:'',
        secondDocking:'',
        secondFollow:'',
        firstFollow:'',
      },
      city_data: [],
      favoriteList: [],
      zfList: [],
      proList: [],
      firstVal: "",
      sectVal: "",
      comList: ""
    };
  },
  created() {
    var self = this;
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
        url: this.api.projectFeedlook,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.dengmiQueryForm = res.data.data;
        var datas = res.data.data;
        // datas.applyStatus = datas.applyStatus == 1? true:false
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
          if (self.changeId) {
            params.id = self.changeId;
            this.axios({
              url: this.api.projectFeedupdate,
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
              url: this.api.recomAdd,
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
#proVisitDialog {
  padding: 0 20px;
  padding-top: 20px;
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