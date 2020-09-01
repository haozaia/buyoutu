<template>
  <div id="fiveAndTwo">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title">
          <span class="Title_left"></span>项目5+2
          <el-button class="download" @click="openAdd()" type="primary">新建</el-button>
        </div>
        <div class="GovernmentManagement_block"></div>
        <div class="el-tabs padding10">
          <div class="query-result">
            <div style="padding-top:10px;"></div>
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="80">
                  <template slot-scope="scope">
                      {{scope.$index +1}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="项目来源"></el-table-column>
                <el-table-column prop="projectName" label="项目名称">
                  <template slot-scope="{row}">
                    <a @click="changeFiveDis(row.id)" class="curPoi">{{row.projectName}}</a>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="govermentSector" label="往来单位" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <router-link
                      style="color:#606266;text-decoration:none;"
                      tag="a"
                      target="_blank"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.collectCompany)}}"
                    >{{ scope.row.collectCompany }}</router-link>
                  </template>
                </el-table-column> -->

                <el-table-column prop="belongToIndustry" label="所属产业" :show-overflow-tooltip="true">
                  <template slot-scope="{row}">
                   <span>{{JSON.parse(row.belongToIndustry).join(" ,") }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="userName" label="业务员"></el-table-column>

                <el-table-column prop="createTime" label="创建时间" width="150">
                  <template slot-scope="{row}">{{ row.createTime.slice(0,10)}}</template>
                </el-table-column>
                <el-table-column prop="inputerName" label="操作">
                  <template slot-scope="scope">
                    <div>
                      <el-button @click="changeFive(scope.row.id)" v-if="mobile ==scope.row.mobile" type="text" size="medium">修改</el-button>
                      <el-button @click="downloadFive(scope.row.id,scope.row.mobile)" type="text" size="medium">附件</el-button>
                      <el-button @click="deleteFive(scope.row.id)" v-if="mobile ==scope.row.mobile" type="text" size="medium">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination" v-show="total > 20">
            <el-pagination
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="handleCurrentChange"
              :page-size="20"
              :current-page="page"
            ></el-pagination>
            <el-button
              size="small"
              :disabled="suibian"
              class="paginationsy"
              @click="paginationsy"
            >首页</el-button>
          </div>
          <!-- 分页dom end -->
        </div>
      </div>
    </div>
    <el-dialog
      title="5+2详情"
      center
      :show-close="false"
      id="chainMAPS"
      top="4vh"
      v-if = "dialogVisible"
      :visible.sync="dialogVisible"
      width="1500px"
    >
      <div class="close" @click="dialog_close">×</div>
      <component v-bind:is="tabView" :close="Fun" :change="changeId"></component>
    </el-dialog>
    <el-dialog
      title="5+2详情"
      center
      :show-close="false"
      id="chainMAPS"
      top="4vh"
      v-if = "dialogVisibleDis"
      :visible.sync="dialogVisibleDis"
      width="1500px"
    >
      <div class="close" @click="dialogVisibleDis = false">×</div>
      <select3  :close="Fun" :change="changeId"></select3>
    </el-dialog>
    <el-dialog
      title="附件管理"
      center
      :show-close="false"
      id="chainMAPS"
      v-if = "dialogVisibles"
      :visible.sync="dialogVisibles"
      width="1000px"
    >
      <div class="close" @click="dialog_closes">×</div>
      <select2  :change="changeId" :changeMobile="changeMobile"></select2>
    </el-dialog>
  </div>
</template>
<script>
import select1 from "./fiveTwoDialog.vue";
import select2 from "./fiveDownload.vue";
import select3 from "./fiveDownloadDis.vue";
export default {
  data() {
    return {
      tabView: "select1",
      dialogVisible: false,
      dialogVisibles: false,
      unitCode: "", //当前登录用户部门唯一标识
      currentId: "", //当前登录用户ID
      tableData: [], //列表数据
      total: 0,
      page: 1,
      suibian: true, //分页变量3
      changeId: "",
      mobile:'',
      dialogVisibleDis:'',
      changeMobile:"",
    };
  },
  watch: {
    selected() {
      if (this.$refs.cascader) {
        this.$refs.cascader.dropDownVisible = false;
      }
    }
  },
  components: {
    select1,
    select2,
    select3,
  },
  mounted() {
    var self = this;
     self.mobile = this.$store.state.mobile;
    console.log(self.mobile)
    this.unitCode = localStorage.getItem("unitCode");
    this.currentId = localStorage.getItem("id");
    this.GovernmentinfoList(); //政府管理列表
  },
  methods: {
    openAdd() {
      var self = this;
      self.changeId=""
      self.dialogVisible = true;
    },
    changeFive(id) {
      var self = this;
      self.changeId=id
      self.dialogVisible = true;
    },
    changeFiveDis(id) {
      var self = this;
      self.changeId=id
      self.dialogVisibleDis = true;
    },
    deleteFive(id) {
      var self = this;
      this.$confirm("是否确认删除", "提示", {
        confirmButtonText: "确定",
        showCancelButton: true,
        cancelButtonClass: "cancelCollection",
        // cancelButtonText: '取消',
        type: "warning"
      })
        .then(() => {
          this.axios({
            url: this.api.collectionDelinfo,
            method: "post",
            data: this.$qs.stringify(params),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => {
            this.$message({
            type: "success",
            message: res.data.msg
          });
          if(res.data.msg == "删除成功"){
            self.GovernmentinfoList();
          }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      let params = {
        id: id,
        userMobile: this.$store.state.mobile
      };
    },
    downloadFive(id,mobile) {
      var self = this;
      self.changeId=id
      self.changeMobile=mobile
      console.log(self.changeMobile);
      self.dialogVisibles = true;
    },
    dialog_close() {
      this.dialogVisible = false;
    },
    dialog_closes() {
      this.dialogVisibles = false;
    },
    Fun(msg) {
      var self = this;
      console.log(msg);
      self.dialogVisible = false;
      self.GovernmentinfoList();
    },
    //5+2列表
    GovernmentinfoList() {
      var self = this;
      let params = {
        page: self.page,
        limit: 20,
        mobile: this.$store.state.mobile
      };
      this.axios({
        url: this.api.collectionInfolist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        var right = document.getElementsByClassName("btn-next");
        right[0].disabled = "";
        // console.log(res,"22")
        this.tableData = res.data.data.list;
        let s = JSON.stringify(self.tableData);
        let a = JSON.parse(s.replace(/:null/g, ':""'));
        console.log(a);
        this.total = res.data.data.totalRow;
        // 分页--下一页disabled
        var cot = Math.ceil(self.total / 20);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        }
        if (self.page == 1) {
          self.suibian = true;
        }
        // 分页--下一页disabled
      });
    },

    paginationsy() {
      if (this.page === 1) {
      } else {
        // this.page = 1
        this.handleCurrentChange(1);
      }
    },
    // 分页--回到首页按钮  end
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      //分页--判断当前页是否为最后一页，禁用右按钮  start
      var cot = Math.ceil(self.total / 20);
      self.suibian = false; //是否禁用首页按钮
      //分页--判断当前页是否为最后一页，禁用右按钮  end
      self.GovernmentinfoList(val, 20);
    }
    // //新建
    // increase() {
    //     this.$router.push("/GovernmentIncrease")
    // }
  }
};
</script>
<style lang="scss">
#fiveAndTwo {
  .el-button--text {
    color: #cf111b;
  }
  .el-button--medium {
    font-size: 20px;
  }
}
</style>