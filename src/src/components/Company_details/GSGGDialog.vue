<template>
  <div id="fortuneFv">
    <div id="C_content">
      <div class="el-tabs">
        <div class="query-result">
          <div style="padding-top:25px;"></div>
          <template>
            <div class="table-wrapper">
              <el-table :data="qiyelist" stripe style="width: 100%">
                <el-table-column prop="paiming" label="序号" width="80" align="center">
                     <template slot-scope="scope">
                         {{scope.$index + 1}}
                     </template>
                </el-table-column>
                <el-table-column prop="lirun" label="企业名称" align="center" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      class="toChange"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row) }}"
                    >{{scope.row}}</router-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
            v-if="total>10"
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="10"
              :total="total"
            ></el-pagination>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  props: ["userName"],
  data() {
    return {
      qiyelist: [],
      total: 0,
      page: 1
    };
  },
  mounted() {
    this.enterpriselist();
    //条数查询
    this.$Export();
  },
  methods: {
    //导出
    download() {
      var self = this;
      let url = self.api.exportdujiaos + "?";
      this.$download(url);
    },
    // toRescue(url) {
    //   if (url) {
    //     console.log(url.substr(0, 7).toLowerCase() == "http://", 222);
    //     return url.substr(0, 7).toLowerCase() == "http://";
    //   } else {
    //     console.log(false, 33);
    //     return false;
    //   }
    // },
    enterpriselist() {
      var self = this;
      let params = {
        userName: self.userName,
        pageNumber: this.page,
        pageSize: 10
      };
      this.axios({
        url: this.api.MgaoguanttCompany,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res)
        this.qiyelist = res.data.data.list;
        this.total = res.data.data.totalRow;
      });
    },
    handleCurrentChange(val) {
      var self = this;
      self.page = val;
      self.enterpriselist(val, 20);
    }
  }
};
</script>

<style lang="scss">
#fortuneFv {
  .Five {
    display: flex;
    padding: 10px;
    background: #fff;
    input {
      background: none;
      outline: none;
      border: none;
    }
    .search_l {
      margin-right: 10px;
      padding: 3px 5px;
      border: 1px solid #ccc;
      width: 220px;
      border-radius: 4px;
      i {
        display: inline-block;
        margin-right: 5px;
      }
      #code {
        width: 195px;
      }
    }
    .search_r {
      margin-right: 10px;
      padding: 3px 5px;
      border: 1px solid #ccc;
      width: 220px;
      border-radius: 4px;
    }
    .query {
      button {
        outline: none;
        color: #fff;
        border: none;
        background-color: #c03532;
        border-color: #c03532;
        padding: 5.5px 10px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
  .el-pagination {
    padding: 10px 0 !important;
    background: #fff !important;
    margin: 0;
  }
}
</style>