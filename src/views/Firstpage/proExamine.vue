<template>
  <div id="proExamine">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title">
          <span class="Title_left"></span>待审核项目
          <!-- <el-button class="download" @click="openAdd()" type="primary">新建</el-button> -->
        </div>
        <div class="GovernmentManagement_block"></div>
        <div class="el-tabs padding10">
          <div class="query-result">
            <div style="padding-top:10px;"></div>
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
                <el-table-column prop="userName" label="发起人"></el-table-column>
                <el-table-column prop="collectCompany" label="主题名称" ></el-table-column>
                <el-table-column prop="belongToProject" label="所属项目" ></el-table-column>
                <el-table-column prop="company" label="往来单位" ></el-table-column>
                <el-table-column prop="acceptTime" label="发起时间">
                  <template slot-scope="{row}">{{ row.acceptTime.slice(0,10)}}</template>
                </el-table-column>
                <el-table-column prop="inputerName" label="操作">
                  <template slot-scope="scope">
                    <div>
                      <el-button @click="openAdd(scope.row.id,scope.row.collectId)" type="text" size="medium">审核</el-button>
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
      title="项目对接会审批"
      center
      :show-close="false"
      id="chainMAPS"
      top="4vh"
      v-if = "dialogVisible"
      :visible.sync="dialogVisible"
      width="1500px"
    >
      <div class="close" @click="dialog_close">×</div>
      <select1  :close="Fun" :id="id" :collectId="collectId"></select1>
    </el-dialog>

  </div>
</template>
<script>
import select1 from "./proExamineDialog.vue";
export default {
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
      changeId: ""
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
  },
  mounted() {
    var self = this;
    this.unitCode = localStorage.getItem("unitCode");
    this.currentId = localStorage.getItem("id");
    this.GovernmentinfoList(); //政府管理列表
  },
  methods: {
    openAdd(id,collectId) {
      var self = this;
      self.id= id
      self.collectId= collectId
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
    //项目对接会列表
    GovernmentinfoList() {
      var self = this;
      let params = {
        pageNumber: self.page,
        pageSize: 20,
        mobile: this.$store.state.mobile
      };
      this.axios({
        url: this.api.buttShenhelist,
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
</style>