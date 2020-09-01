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
          <el-form-item prop="projectName" label="所属项目：">
            <el-input v-model="dengmiQueryForm.projectName" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="followResult" label="跟进结果：">
            <el-select v-model="dengmiQueryForm.followResult" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in select1"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="inspectionTime" label="考察时间：">
            <el-date-picker
              v-model="dengmiQueryForm.inspectionTime"
              style="width:100%;"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="followRecord" label="跟进记录：">
            <el-input v-model="dengmiQueryForm.followRecord" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="followStatus" label="是否放弃：">
            <el-select v-model="dengmiQueryForm.followStatus" placeholder="请选择" style="width:100%;">
              <el-option :label="是" value="是"></el-option>
              <el-option :label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="giveUpReason" label="放弃原因：">
            <el-input v-model="dengmiQueryForm.giveUpReason" type="textarea" :rows="3"></el-input>
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
        projectName: "",
        inspectionTime: "",
        giveUpReason: "",
        followStatus: "",
        followResult: "",
        followRecord:'',
      },
      city_data: [],
      favoriteList: [],
      zfList: [],
      proList: [],
      firstVal: "",
      sectVal: "",
      comList: "",
      select1: []
    };
  },
  created() {
    var self = this;
    self.collectionSelect("follow_result_type");
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
          case "follow_result_type":
            self.select1 = res.data.data;
            break;
          default:
            console.log(res.data);
        }
      });
    },
    //单条详情
    fiveInfo() {
      var self = this;
      let params = {
        id: self.changeId
      };
      this.axios({
        url: this.api.projectInspectlook,
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
              url: this.api.projectInspectupdate,
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