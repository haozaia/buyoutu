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
          <el-form-item prop="collectId" label="拜访单位：">
            <el-select
              v-model="dengmiQueryForm.collectId"
              placeholder="请选择"
              style="width:100%;"
              filterable
            >
              <el-option
                v-for="item in favoriteList"
                :key="item.id"
                :label="item.collectCompany"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="visitStatus" label="拜访状态：">
            <el-select v-model="dengmiQueryForm.visitStatus" placeholder="请选择" style="width:100%;">
              <el-option label="已拜访" value="已拜访"></el-option>
              <el-option label="未拜访" value="未拜访"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="visitTime" label="拜访日期：">
            <el-date-picker
              v-model="dengmiQueryForm.visitTime"
              style="width:100%;"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      <el-col >
          <el-form-item prop="firstIntentionArea" label="所在区域：">
            <el-cascader
                ref="refHandle"
                style="width:100%;"
                v-model="dengmiQueryForm.firstIntentionArea"
                :options="city_data"
                :props="{ checkStrictly: true}"
                @change="handleChange"
                clearable
                filterable
              ></el-cascader>
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
        collectId: "",
        visitTime: "",
        visitStatus: "未拜访",
        firstIntentionArea:"",
      },
      city_data: [],
      rules: {
        collectId: [
          { required: true, message: "请选择拜访单位", trigger: "blur" }
        ],
        firstIntentionArea: [
          { required: true, message: "请选择所在地址", trigger: "blur" }
        ]
      },
      favoriteList: [],
      firstVal: "",
      sectVal: "",
      comList: ""
    };
  },
  created() {
    var self = this;
    self.favorite();
    console.log(self.changeId);
    self.citylist()
    if (self.changeId) {
      self.fiveInfo();
    }
  },
  mounted() {},
  methods: {
    //请求城市列表
    citylist() {
      var self = this;
      this.axios({
        url: this.api.LXshengshiquapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.city_data = res.data.data;

      });
    },
    //省市赋值
    handleChange(value) {
      var self = this;
      self.sheng = value[0] ? value[0] : "";
      self.shi = value[1] ? value[1] : "";
      self.qu = value[2] ? value[2] : "";
    },
    //单条详情
    fiveInfo() {
      var self = this;
      let params = {
        id: self.changeId
      };
      this.axios({
        url: this.api.waitLook,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.dengmiQueryForm = res.data.data;
        var datas = res.data.data;
        console.log(datas.projectProvince)
              var cityList=[]
      cityList.push(datas.projectProvince)
      if(datas.projectCity){
        cityList.push(datas.projectCity)
      }
      if(datas.projectArea){
         cityList.push(datas.projectArea)
      }
      self.dengmiQueryForm.firstIntentionArea=cityList
      self.handleChange(cityList)
      });
    },

    // //拜访企业下拉框
    favorite() {
      var self = this;
      let params = {
        mobile: this.$store.state.mobile
      };
      this.axios({
        url: this.api.companylist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.favoriteList = res.data.data.list;
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
            collectId: self.dengmiQueryForm.collectId,
            visitTime: self.dengmiQueryForm.visitTime,
            visitStatus: self.dengmiQueryForm.visitStatus,
            projectProvince: self.sheng,
            projectCity: self.shi,
            projectArea: self.qu,
          };
          if (self.changeId) {
            params.id = self.changeId;
            this.axios({
              url: this.api.waitUpdate,
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
              url: this.api.waitAdd,
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