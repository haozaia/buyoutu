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
      <el-divider content-position="left">变更时间</el-divider>
      <el-row>
        <el-col span="12">
          <el-form-item prop="numberOfTimeChanges" label="更改时间次数：">
            <el-input v-model="dengmiQueryForm.numberOfTimeChanges"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item prop="reasonsForChange" label="	更变原因：">
            <el-input v-model="dengmiQueryForm.reasonsForChange"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-divider content-position="left">发布对象</el-divider>
      <el-row>
        <el-col span="12">
          <el-form-item prop="compere" label="主持人：">
            <el-cascader
              ref="refHandle"
              style="width:100%;"
              @change="hostChange"
              v-model="dengmiQueryForm.compere"
              :options="LDList"
              :show-all-levels="false"
              :props="{value:'label'}"
              collapse-tags
              clearable
              filterable
            ></el-cascader>
            <!-- </el-select> -->
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item prop="supportStaff" label="配合人：">
            <el-cascader
              :title="dengmiQueryForm.supportStaff"
              ref="refHandle"
              style="width:100%;"
              v-model="dengmiQueryForm.supportStaff"
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
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item prop="followPeople" label="跟进人：">
            <el-cascader
              :title="dengmiQueryForm.followPeople"
              ref="refHandle"
              style="width:100%;"
              v-model="dengmiQueryForm.followPeople"
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
      </el-row>
      <el-divider content-position="left">对接时间安排</el-divider>
      <el-row>
        <div class="uploadWapper">
          <el-upload
            class="upload-demo"
            :show-file-list="false"
            :on-success="handlesuccess"
            name="multipartFiles"
            :action="api.timeMoreFileUpload"
            :data="UpData"
            :before-upload="uploadbefore"
          >
            <el-button size="small" type="primary">上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip inline downTip fontSize20"
            >&nbsp;&nbsp;&nbsp;&nbsp;文件大小不超过50M</div>
          </el-upload>
        </div>
        <div class="el-tabs padding10">
          <div class="query-result">
            <div style="padding-top:10px;"></div>
            <div class="table-wrapper">
              <el-table stripe :data="downloadList" style="width: 100%">
                <el-table-column prop="name" label="文件名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="time" label="创建时间">
                  <template slot-scope="{row}">{{ row.time.slice(0,10)}}</template>
                </el-table-column>
                <el-table-column prop="inputerName" label="操作" width="200">
                  <template slot-scope="scope">
                    <div>
                      <el-button @click="deleteDownload(scope.$index)" type="text" size="medium">删除</el-button>
                      <el-button @click="downloadFile(scope.row.location)" type="text" size="medium">下载</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
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
  props: ["close", "change", "changeId"],
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
      UpData: {
        id: "",
        type: "1"
      },
      dengmiQueryForm: {
        numberOfTimeChanges: "",
        buttTimeArrangeInput: "",
        reasonsForChange: "",
        compere: "",
        supportStaff: "",
        followPeople: "",
        beizhu2:"",
      },
      rules: {
        numberOfTimeChanges: [
           { validator: validateCtext, trigger: "blur" }
        ],
         compere: [
          { required: true, message: "请选择主持人", trigger: "blur" }
        ],
      },
      proList: [],
      LDList: [],
      firstVal: "",
      sectVal: "",
      comList: "",
      downloadList: []
    };
  },
  created() {
    var self = this;
    self.buttRenyuan();
    if (self.changeId) {
      self.fiveInfo();
    }
  },
  mounted() {},
  methods: {
    hostChange(val){
       var self = this;
       var obj = this.LDList.find(item => {
        // 这里的dataSourceOptions就是上面遍历的数据源
        return item.label === val[0]; // 筛选出匹配数据
      });
      console.log(obj)
      var   _obj = obj.children.find(item => {
        // 这里的dataSourceOptions就是上面遍历的数据源
        return item.label === val[1]; // 筛选出匹配数据
      });
      var   __obj = _obj.children.find(item => {
        // 这里的dataSourceOptions就是上面遍历的数据源
        return item.label === val[2]; // 筛选出匹配数据
      });
        
        self.dengmiQueryForm.beizhu2 =__obj.value
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
        console.log(self.LDList)
      });
    },
    //上传前
    uploadbefore(file) {
      var self = this;
      const isLt2M = file.size / 1024 / 1024 < 50;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 50MB!");
      }
      return isLt2M;
    },
    //上传成功
    handlesuccess(response, file, fileList) {
      var self = this;
      // console.log(fileList)
      this.downloadList.push(response.data);
      if (response.code !== 0) {
        this.$message.error(response.msg);
      } else {
        this.$message({
          message: "恭喜你，导入成功！",
          type: "success"
        });
      }
    },

    //附件删除
    deleteDownload(val) {
      var self = this;
      this.downloadList.splice(val, 1);
    },
    //附件下载
    downloadFile(url) {
      window.location.href = url;
    },
    //单条详情
    fiveInfo() {
      var self = this;
      let params = {
        id: self.changeId
      };
      this.axios({
        url: this.api.timeLook,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.dengmiQueryForm = res.data.data;
        var datas = res.data.data;
          datas.compere = JSON.parse(datas.compere);
          datas.supportStaff = JSON.parse(datas.supportStaff);
          datas.followPeople = JSON.parse(datas.followPeople);
          self.downloadList = JSON.parse(datas.buttTimeArrangeAccessory)=='[null]'?'':JSON.parse(datas.buttTimeArrangeAccessory);
      });
    },

    // 往来单位下拉框
    buttZhengfulist() {
      var self = this;
      let params = {
        mobile: this.$store.state.mobile,
        pageNumber: 1,
        pageSize: 500
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
      let params = {
        id: self.dengmiQueryForm.belongToProjectId
      };
      this.axios({
        url: this.api.buttInfomalist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.LDList = res.data.data.list;
      });
    },

    submitForm(formName) {
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this;
          console.log(formName);
          let params = {
            beizhu1:this.$store.state.userName,
            belongToMatchupsId: self.change
          };
          Object.assign(params, self.dengmiQueryForm);
          params.compere = JSON.stringify(params.compere);
          params.supportStaff = JSON.stringify(params.supportStaff);
          params.followPeople = JSON.stringify(params.followPeople);
          params.buttTimeArrangeAccessory = JSON.stringify(self.downloadList);
          if (self.changeId) {
            params.id = self.changeId;
            this.axios({
              url: this.api.timeUpdate,
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
            console.log(params.beizhu1)
            this.axios({
              url: this.api.timeAdd,
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