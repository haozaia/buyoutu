<template>
  <div id="proMeeting">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title">
          <el-button  @click="openAdd()" type="primary">新建</el-button>
        </div>
        <div class="GovernmentManagement_block"></div>
        <div class="el-tabs padding10">
          <div class="query-result">
            <div style="padding-top:10px;"></div>
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
                <el-table-column prop="govermentPark" label="合作政府"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="collectCompany" label="往来单位"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createTime" label="报名时间">
                  <template slot-scope="{row}">{{ row.createTime.slice(0,10)}}</template>
                </el-table-column>
                <el-table-column prop="userName" label="报名人员" width="150"></el-table-column>
                <el-table-column prop="inputerName" label="操作">
                  <template slot-scope="scope">
                    <div>
                      <el-button @click="changeFive(scope.row.id)" type="text" size="medium">修改</el-button>
                      <el-button @click="deleteFive(scope.row.id)" type="text" size="medium">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
 
        </div>
      </div>
    </div>
    <el-dialog
      title="项目对接会推进"
      center
      :show-close="false"
      id="chainMAPS"
      top="4vh"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="1200px"
    >
      <div class="close" @click="dialog_close">×</div>
      <component v-bind:is="tabView" :close="Fun" :projectMatchupsId="projectMatchupsId" :projectMatchups="projectMatchups"  :collectCompany="collectCompany"  :collectId="collectId" :changeId="changeId"></component>
    </el-dialog>
  </div>
</template>
<script>
import select1 from "./proMeetingAdvanceDialog.vue";

export default {
      props: ["close", "projectMatchupsId", "projectMatchups", "collectCompany",'collectId'],
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
      gridData:[],
      
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
    select1
  },
  mounted() {
    var self = this;
    this.unitCode = localStorage.getItem("unitCode");
    this.currentId = localStorage.getItem("id");
    this.GovernmentinfoList(); //政府管理列表
    
  },
  methods: {
    changeFive(id) {
      var self = this;
      self.changeId=id
      self.dialogVisible = true;
    },
    openAdd() {
      var self = this;
      self.changeId = "";
      self.dialogVisible = true;
    },
    deleteFive(id) {
      var self = this;
       let params = {
        id: id
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
            url: this.api.followDel,
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
    //对接会推进列表
    GovernmentinfoList() {
      var self = this;
      let params = {
        projectMatchupsId:self.projectMatchupsId
      };
      this.axios({
        url: this.api.followList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.tableData = res.data.data.list;
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