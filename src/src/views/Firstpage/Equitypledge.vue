<template>
<div id="Equitypledge">
  <div id="C_content">
    <div class="C_title">
      <span class="Title_left"></span>股权质押
    </div>
    <!-- 搜索、查询 -->

    <!-- 质押详情 -->
    <div class="el-tabs">
      <div class="form-wrapper">
        <form class="form-inline" role="form">
          <div class="form-group">
            <div class="ui-input ui-input-search PuKey">
              <input
                class="key"
                v-model="gongsiname"
                placeholder="公司名称/代码"
                type="text"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="ui-input ui-input-search PuKey">
              <input
                class="key"
                v-model="gudongmc"
                placeholder="股东名称/接收质押方"
                type="text"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="form-group">
            <el-button @click="tablelist()" type="primary">查询</el-button>
          </div>
        </form>
      </div>
      <div class="query-result">
        <template>
          <div class="table-wrapper">
          <el-table :data="zhiyalist" stripe style="width: 100%">
            <el-table-column prop="gongsiname" label="公司名称" align="center" @cell-click="pageto">
              <template slot-scope="scope">
                <router-link
                  target="_blank"
                  tag="a"
                  style="color:#606266;text-decoration:none;"
                  :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                >{{ scope.row.gongsiname }}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="gudongmc" label="股东名称" align="center"></el-table-column>
            <el-table-column prop="jieshouzyf" label="接受质押方" align="center"></el-table-column>
            <el-table-column prop="zhiyags" label="质押股数(万股)" width="160" align="center"></el-table-column>
            <el-table-column prop="gonggaorq" label="公告日期" width="160" align="center"></el-table-column>
            <el-table-column prop="zhiyaqsrq" label="质押起始日期" width="160" align="center"></el-table-column>
            <el-table-column prop="zhiyagzscgfbl" label="质押占所持股比(%)" width="160" align="center"></el-table-column>
            <!-- <el-table-column prop="leijizygzzgbbl" label="质押股占总股本比(%)" align="center"></el-table-column> -->
            <!-- <el-table-column prop="leijizygzzyfcgbl" label="累计质押股占质押方持股比例(%)" align="center"></el-table-column>
            <el-table-column prop="leijizygzzgbbl" label="累计质押股占总股本比例(元)" align="center"></el-table-column>-->
          </el-table>
          </div>
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="20"
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
  data() {
    return {
      zhiyalist: [],
      gongsiname: "",
      gongsimc: "",
      gudongmc: "",
      total: 0
    };
  },
  mounted() {
    this.tablelist();
  },
  methods: {
    pageto(row, column, cell, event) {
      // console.log(row)
    },
    tablelist() {
      let params = {
        page: this.page,
        limit: 20,
        gongsiname: this.gongsiname,
        gudongmc: this.gudongmc
      };
      this.axios({
        url: this.api.Equitypledge,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data)
        this.zhiyalist = res.data.data;
        this.total = res.data.count;
      });
    },
    handleCurrentChange(val) {
      var self = this;
      self.page = val;
      self.tablelist(val, 20);
    }
  }
};
</script>

<style lang="scss">
// @import "../../styles/css/Equitypledge.scss";
@import "../../styles/css/Techindustry.scss";
#Equitypledge{
  .el-table__row>td:first-child{
    text-align: left !important;
  }
}
.el-tabs {
  .form-wrapper {
    background: #fff;
    // margin-bottom: 2px;
  }
}
</style>