<template>
  <div id="proVisit">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title">
          <span class="Title_left"></span>政府反馈
        </div>
        <div class="form-wrapper">
          <form class="form-inline" role="form">
            <div class="form-group">
              <div class="form-group inline">
                <el-input v-model="projectName" placeholder="请输入项目名称"></el-input>
              </div>
              <div class="form-group inline">
                <el-button @click="GovernmentinfoList()" type="primary">查询</el-button>
              </div>
            </div>
          </form>
        </div>
        <div class="GovernmentManagement_block"></div>
        <div class="el-tabs">
          <div class="query-result">
            <div style="padding-top:10px;"></div>
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
                <el-table-column prop="dokingGovernment" label="政府名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="projectName" label="项目名称" :show-overflow-tooltip="true">
                  <template slot-scope="{row}">
                    <a @click="changeFiveDis(row.projectNameId)" class="curPoi">{{row.projectName}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="firstFollow" label="首选跟进" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="secondFollow" label="次选跟进" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="secondDocking" label="是否可以二次对接" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="dockedSummarize" label="对接总结" :show-overflow-tooltip="true"></el-table-column>
               
                <el-table-column prop="createTime" label="创建时间" width="180">
                  <template
                    slot-scope="{row}"
                  >{{ row.createTime?row.createTime.slice(0,10):''}}</template>
                </el-table-column>
                <el-table-column prop="inputerName" label="操作" width="80">
                  <template slot-scope="scope">
                    <div>
                      <el-button
                        @click="changeFive(scope.row.id)"
                        v-if="mobile ==scope.row.mobile"
                        type="text"
                        size="medium"
                      >修改</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
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
      </div>
    </div>
    <el-dialog
      title="政府反馈详情"
      center
      :show-close="false"
      id="chainMAPS"
      top="15vh"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="1000px"
    >
      <div class="close" @click="dialog_close">×</div>
      <component v-bind:is="tabView" :close="Fun" :changeId="changeId"></component>
    </el-dialog>
    <el-dialog
      title="5+2详情"
      center
      :show-close="false"
      id="chainMAPS"
      top="4vh"
      v-if="dialogVisibleDis"
      :visible.sync="dialogVisibleDis"
      width="1500px"
    >
      <div class="close" @click="dialogVisibleDis = false">×</div>
      <select3 :close="Fun" :change="changeId"></select3>
    </el-dialog>
  </div>
</template>
<script>
import select1 from "./GovernmentFeedbackDialog.vue";
import select3 from "./fiveDownloadDis.vue";
export default {
  props: ["close", "SignUpId"],
  data() {
    return {
      tabView: "select1",
      dialogVisible: false,
      unitCode: "", //当前登录用户部门唯一标识
      currentId: "", //当前登录用户ID
      tableData: [], //列表数据
      total: 0,
      page: 1,
      suibian: true, //分页变量3
      changeId: "",
      gridData: [],
      IsZz: false,
      visitStatus: "",
      value1: [],
      mobile: "",
      dialogVisibleDis: "",
      projectName:'',
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
    select3
  },
  mounted() {
    var self = this;
    self.mobile = this.$store.state.mobile;
    this.unitCode = localStorage.getItem("unitCode");
    this.currentId = localStorage.getItem("id");
    this.GovernmentinfoList(); //拜访列表
  },
  methods: {
    changeFiveDis(id) {
      var self = this;
      self.changeId = id;
      self.dialogVisibleDis = true;
    },
    //导出
    download() {
      var self = this;
      let url =
        self.api.recomExport +
        "?mobile=" +
        self.mobile +
        "&unitCode=" +
        self.unitCode +
        "&suoshusf=" +
        self.suoshusf +
        "&suoshucs=" +
        self.suoshucs +
        "&suoshuqx=" +
        self.suoshuqx;
      window.location.href = url; //  跳转链接
    },

    handleCHANGEradio() {
      var self = this;
      self.tableData = [];
      self.total = 0;
      self.GovernmentinfoList();
      var right = document.getElementsByClassName("btn-next");
      right[0].disabled = "disabled";
    },
    changeFive(id) {
      var self = this;
      self.changeId = id;
      self.dialogVisible = true;
    },

    dialog_close() {
      this.dialogVisible = false;
    },
    Fun(msg) {
      var self = this;
      self.dialogVisible = false;
      self.GovernmentinfoList();
    },
    //政府反馈列表
    GovernmentinfoList() {
      var self = this;
      let params = {
        pageNumber: self.page,
        pageSize: 20,

        projectName: self.projectName,
      };
      this.axios({
        url: this.api.projectFeedlist,
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
        this.total = res.data.data.totalRow;
        // 分页--下一页disabled
        var cot = Math.ceil(self.total / 20);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        }
        if (self.page == 1) {
          self.suibian = true;
        }
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
#proVisit {
  .el-button--text {
    color: #cf111b;
  }
  .el-button--medium {
    font-size: 20px;
  }
  .form-wrapper {
    padding: 20px 30px 0 !important;
  }
  .form-group {
    margin-right: 10px;
  }
  .el-date-editor .el-range-input {
    font-size: 20px;
  }
}
</style>