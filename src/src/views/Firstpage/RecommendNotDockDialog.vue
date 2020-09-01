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
          <el-form-item prop="govermentId" label="政府名称：">
            <el-select
              v-model="dengmiQueryForm.govermentId"
              placeholder="请选择"
              filterable
              style="width:100%;"
            >
              <el-option
                v-for="item in zfList"
                :key="item.id"
                :label="item.govermentSector"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="belongToProject" label="所属项目：">
            <el-select
              v-model="dengmiQueryForm.belongToProject"
              placeholder="请选择"
              style="width:100%;"
              @change="postCom"
              filterable
            >
              <el-option
                v-for="item in proList"
                :key="item.id"
                :label="item.projectName"
                :value="item.projectName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="collectCompany" label="往来单位：">
            <el-input v-model="dengmiQueryForm.collectCompany" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="recommendTime" label="推荐时间：">
            <el-date-picker
              v-model="dengmiQueryForm.recommendTime"
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
          <el-form-item prop="undockedCause" label="未对接原因：">
            <el-input v-model="dengmiQueryForm.undockedCause"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="investmentElements" label="投资要素：">
            <el-input v-model="dengmiQueryForm.investmentElements"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="remark" label="备注：">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="dengmiQueryForm.remark"
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
        recommendTime: "",
        govermentId: "",
        belongToProject: "",
        collectCompany: "",
        remark: "",
        investmentElements: "",
        undockedCause: "",
        beizhu1: ""
      },
      city_data: [],
      rules: {
        collectCompany: [
          { required: true, message: "请选择拜访单位", trigger: "blur" }
        ],
        belongToProject: [
          { required: true, message: "请选择所在地址", trigger: "blur" }
        ],
        govermentId: [
          { required: true, message: "请选择所在地址", trigger: "blur" }
        ]
      },
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
    self.favorite();
    self.citylist();
    self.buttZhengfulist();
    self.collectionInfolist();
    if (self.changeId) {
      self.fiveInfo();
    }
  },
  mounted() {},
  methods: {
    // 项目对应往来单位
    postCom(event) {
      var self = this;
      var obj = this.proList.find(item => {
        // 这里的dataSourceOptions就是上面遍历的数据源
        return item.projectName === event; // 筛选出匹配数据
      });
      self.dengmiQueryForm.beizhu1 = obj.id;
      console.dir(self.dengmiQueryForm.beizhu1);
      let params = {
        id: obj.id
      };
      this.axios({
        url: this.api.collectionInfo,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.dengmiQueryForm.collectCompany = res.data.data.collectCompany;
      });
    },
    // 所属项目下拉框
    collectionInfolist() {
      var self = this;
      let params = {
        mobile: this.$store.state.mobile,
        pageNumber: 1,
        pageSize: 500,
        code: 1
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
        this.zfList = res.data.data.list;
      });
    },
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
        url: this.api.recomLook,
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
          let params = {
            userName: this.$store.state.userName,
            mobile: this.$store.state.mobile
          };
          Object.assign(params, self.dengmiQueryForm);
          if (self.changeId) {
            params.id = self.changeId;
            this.axios({
              url: this.api.recomUpdate,
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