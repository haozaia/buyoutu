<template>
  <div id="proMeeting">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title">
          <span class="Title_left"></span>项目对接会
          <el-button class="download" @click="openAdd()" type="primary">新建</el-button>
        </div>
        <div class="GovernmentManagement_block"></div>
        <div class="el-tabs padding10">
          <div class="query-result">
            <div style="padding-top:10px;"></div>
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
                <el-table-column prop="buttStatus" label="审核" width="80">
                  <template slot-scope="{row}">
                    <a class="curPoi" @click="openStatus(row.id)">
                      <i v-if="row.buttStatus == 2" style="color:#67c23a" class="el-icon-success"></i>
                      <i
                        v-else-if="row.buttStatus == 3"
                        style="color:#cf111b"
                        class="el-icon-error"
                      ></i>
                      <i v-else class="el-icon-s-comment"></i>
                    </a>
                  </template>
                </el-table-column>
                <el-table-column prop="userName" label="创建人"></el-table-column>
                <el-table-column prop="theme" label="主题" :show-overflow-tooltip="true">
                   <template slot-scope="{row}">
                    <a @click="changeFiveDis(row.id)" class="curPoi">{{row.theme}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="belongToProject" label="所属项目" :show-overflow-tooltip="true">
                  <template slot-scope="{row}">
                    <a @click="changeFiveDisXM(row.belongToProjectId)" class="curPoi">{{row.belongToProject}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="govermentSector" label="往来单位" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <router-link
                      style="color:#606266;text-decoration:none;"
                      tag="a"
                      target="_blank"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.collectCompany)}}"
                    >{{ scope.row.collectCompany }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" label="对接会日期">
                  <template slot-scope="{row}">{{ row.createTime.slice(0,10)}}</template>
                </el-table-column>
                <el-table-column prop="inputerName" label="操作">
                  <template slot-scope="scope">
                    <div>
                      <el-button
                        @click="openSignUp(scope.row.id)"
                        v-if="scope.row.buttStatus == 2&& unitCode==5 "
                        type="text"
                        size="medium"
                      >报名</el-button>
                      <el-button
                        @click="openTime(scope.row.id)"
                        v-if="scope.row.buttStatus == 2 && (unitCode==6||unitCode==7)"
                        type="text"
                        size="medium"
                      >时间</el-button>
                      <el-button
                        @click="openAdvance(scope.row.id,scope.row.theme,scope.row.collectCompany,scope.row.collectId)"
                        v-if="scope.row.buttStatus == 2&& unitCode==5"
                        type="text"
                        size="medium"
                      >推进</el-button>
                      <el-button @click="deleteFive(scope.row.id)" v-if="mobile ==scope.row.mobile"  type="text" size="medium">删除</el-button>
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
      title="项目对接会详情"
      center
      :show-close="false"
      id="chainMAPS"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="1500px"
    >
      <div class="close" @click="dialog_close">×</div>
      <component v-bind:is="tabView" :close="Fun" :change="changeId"></component>
    </el-dialog>
    <el-dialog
      title="项目对接会详情"
      center
      :show-close="false"
      id="chainMAPS"
      v-if="dialogVisibleDis"
      :visible.sync="dialogVisibleDis"
      width="1500px"
    >
      <div class="close" @click="dialogVisibleDis=false">×</div>
      <select2 :close="Fun" :change="changeId"></select2>
    </el-dialog>
    <el-dialog
      title="项目对接会报名"
      center
      :show-close="false"
      id="chainMAPS"
      v-if="SignUpVisible"
      :visible.sync="SignUpVisible"
      width="1200px"
    >
      <div class="close" @click="SignUpVisible = false">×</div>
      <proMeetingSignUp :close="Fun" :SignUpId="SignUpId"></proMeetingSignUp>
    </el-dialog>
    <el-dialog
      title="项目对接会时间"
      center
      :show-close="false"
      id="chainMAPS"
      v-if="TimeVisible"
      :visible.sync="TimeVisible"
      width="1200px"
    >
      <div class="close" @click="TimeVisible = false">×</div>
      <proMeetingTime :close="Fun" :SignUpId="TimeId"></proMeetingTime>
    </el-dialog>
    <el-dialog
      title="项目对接会跟进"
      center
      :show-close="false"
      id="chainMAPS"
      v-if="AdvanceVisible"
      :visible.sync="AdvanceVisible"
      width="1200px"
    >
      <div class="close" @click="AdvanceVisible = false">×</div>
      <proMeetingAdvance :close="Fun" :projectMatchupsId="projectMatchupsId" :projectMatchups="projectMatchups" :collectCompany='collectCompany' :collectId="collectId"></proMeetingAdvance>
    </el-dialog>
    
    <el-dialog title="审批列表" :visible.sync="dialogTableVisible" width="1100px" id="operation">
      <el-table :data="gridData">
        <el-table-column property="approver" label="审批人" align="center"></el-table-column>
        <el-table-column property="phases" label="审批原因" width="300" align="center"></el-table-column>
        <el-table-column property="operation" label="审批状态" align="center">
          <template slot-scope="{row}">
            <div v-if="row.operation">
              <span v-if="row.operation == '同意'" class="colorL">{{row.operation}}</span>
              <span v-else-if="row.operation == '作废'" class="colorH">{{row.operation}}</span>
            </div>
            <span v-else>审批中</span>
          </template>
        </el-table-column>
        <el-table-column property="leadershipPosition" label="审批意见" width="300" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column property="auditTime" label="审批时间" align="center">
          <template slot-scope="{row}" v-if="row.auditTime">{{ row.auditTime.slice(0,10)}}</template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      title="5+2详情"
      center
      :show-close="false"
      id="chainMAPS"
      top="4vh"
      v-if="dialogVisibleDisXM"
      :visible.sync="dialogVisibleDisXM"
      width="1500px"
    >
      <div class="close" @click="dialogVisibleDisXM = false">×</div>
      <select3 :close="Fun" :change="changeId"></select3>
    </el-dialog>
  </div>
</template>
<script>
import select1 from "./proMeetingAddDialog.vue";
import select2 from "./proMeetingAddDialogDis.vue";
import proMeetingSignUp from "./proMeetingSignUp.vue";
import proMeetingTime from "./proMeetingTime.vue";
import proMeetingAdvance from "./proMeetingAdvance.vue";
import select3 from "./fiveDownloadDis.vue";
export default {
  data() {
    return {
      tabView: "select1",
      dialogVisible: false,
      dialogVisibles: false,
      dialogTableVisible: false,
      unitCode: "", //当前登录用户部门唯一标识
      currentId: "", //当前登录用户ID
      tableData: [], //列表数据
      total: 0,
      page: 1,
      suibian: true, //分页变量3
      changeId: "",
      gridData: [],
      SignUpVisible: false,
      SignUpId: "",
      TimeVisible: false,
      TimeId: "",
      dialogVisibleDis:'',
      dialogVisibleDisXM:'',
      AdvanceVisible:false,
      projectMatchupsId:'',
      projectMatchups:'',
      collectCompany:'',
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
    proMeetingSignUp,
    proMeetingTime,
    proMeetingAdvance,
     select3
  },
  mounted() {
    var self = this;
     self.mobile = this.$store.state.mobile;
    this.unitCode = localStorage.getItem("unitCode");
    this.currentId = localStorage.getItem("id");
    this.GovernmentinfoList(); //政府管理列表
  },
  methods: {
    //项目详情
    changeFiveDisXM(id) {
      var self = this;
      self.changeId=id
      self.dialogVisibleDisXM = true;
    },
    //报名弹窗
    openSignUp(SignUpId) {
      var self = this;
      self.SignUpId = SignUpId;
      self.SignUpVisible = true;
    },
    //查看详情
    changeFiveDis(id) {
      var self = this;
      self.changeId=id
      self.dialogVisibleDis = true;
    },
    //对接会时间
    openTime(TimeId) {
      var self = this;
      self.TimeId = TimeId;
      self.TimeVisible = true;
    },
    openAdvance(projectMatchupsId,projectMatchups,collectCompany,collectId) {
      var self = this;
      self.projectMatchupsId = projectMatchupsId;
      self.projectMatchups = projectMatchups;
      self.collectCompany = collectCompany;
      self.collectId = collectId;
      self.AdvanceVisible = true;
    },
    //打开审批详情
    openStatus(collectId) {
      var self = this;
      let params = {
        collectId: collectId
      };
      this.axios({
        url: this.api.buttProcesslist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.gridData = res.data.data.list;
        console.log(res.data);
        self.dialogTableVisible = true;
      });
    },
    openAdd() {
      var self = this;
      self.changeId = "";
      self.dialogVisible = true;
    },
    deleteFive(id) {
      var self = this;
      let params = {
        id: id,
        userMobile: this.$store.state.mobile
      };
      this.$confirm("是否确认删除", "提示", {
        confirmButtonText: "确定",
        showCancelButton: true,
        cancelButtonClass: "cancelCollection",
        // cancelButtonText: '取消',
        type: "warning"
      })
        .then(() => {
          this.axios({
            url: this.api.buttDelmatchups,
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
            if (res.data.msg == "删除成功") {
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
    },
    dialog_close() {
      this.dialogVisible = false;
    },
    Fun(msg) {
      var self = this;
      self.dialogVisible = false;
      self.GovernmentinfoList();
    },
    //项目对接会列表
    GovernmentinfoList() {
      var self = this;
      let params = {
        pageNumber: self.page,
        pageSize: 20,
        mobile: this.$store.state.mobile
      };
      this.axios({
        url: this.api.buttMatchupslist,
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
#proMeeting {
  .el-button--text {
    color: #cf111b;
  }
  .el-button--medium {
    font-size: 20px;
  }
}
#operation {
  .el-dialog__body {
    padding: 0 20px 30px 20px;
  }
}
</style>