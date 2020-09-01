<template>
  <div id="proVisit">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title">
          <span class="Title_left"></span>已推荐未对接
          <el-button class="download" @click="download()" type="primary">导出</el-button>
          <el-button class="download" @click="openAdd()" type="primary">新建</el-button>
        </div>
        <div class="form-wrapper">
          <form class="form-inline" role="form">
            <div class="form-group">
              <!-- <div class="form-group inline">
                <el-date-picker
                  v-model="value1"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>-->
              <div class="form-group inline">
                <el-cascader
                  clearable
                  placeholder="请选择地区"
                  ref="refHandle"
                  :options="options1"
                  :props="{ checkStrictly: true }"
                  @change="handleChange1"
                  v-model="selected"
                  filterable
                ></el-cascader>
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
                <el-table-column prop="govermentName" label="政府名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="recommendTime" label="推荐时间" width="180">
                  <template
                    slot-scope="{row}"
                  >{{ row.recommendTime?row.recommendTime.slice(0,10):''}}</template>
                </el-table-column>
                <el-table-column prop="belongToProject" label="项目名称" :show-overflow-tooltip="true">
                  <template slot-scope="{row}">
                    <a @click="changeFiveDis(row.beizhu1)" class="curPoi">{{row.belongToProject}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="collectCompany" label="往来单位" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <router-link
                      style="color:#606266;text-decoration:none;"
                      tag="a"
                      target="_blank"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.collectCompany)}}"
                    >{{ scope.row.collectCompany }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="undockedCause" label="未对接原因" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column
                  prop="investmentElements"
                  label="投资要素"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="inputerName" label="操作">
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
      title="已推荐未对接详情"
      center
      :show-close="false"
      id="chainMAPS"
      top="15vh"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="600px"
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
import select1 from "./RecommendNotDockDialog.vue";
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
      options1: [],
      suoshusf: "",
      suoshucs: "",
      suoshuqx: "",
      mobile: "",
      dialogVisibleDis: ""
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
    self.City();
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
    //省市区转换
    handleChange1(value) {
      this.suoshusf = value[0] ? value[0] : "";
      this.suoshucs = value[1] ? value[1] : "";
      this.suoshuqx = value[2] ? value[2] : "";
    },
    //获取城市
    City() {
      this.axios({
        url: this.api.LXshengshiquapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.options1 = res.data.data;
      });
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
    openAdd() {
      var self = this;
      self.changeId = "";
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
    //对接会报名列表
    GovernmentinfoList() {
      var self = this;
      let params = {
        // matchupsId: self.SignUpId
        pageNumber: self.page,
        pageSize: 20,
        unitCode: self.unitCode,
        mobile: self.mobile,
        // strvisitTime: self.value1[0] ? self.value1[0] : "",
        // endvisitTime: self.value1[1] ? self.value1[1] : "",
        suoshuqx: self.suoshuqx,
        suoshusf: self.suoshusf,
        suoshucs: self.suoshucs
      };
      this.axios({
        url: this.api.recomList,
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