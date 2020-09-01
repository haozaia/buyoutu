<template>
  <div id="Huodejiangli">
    <div class="container">
      <!-- <header>
        <div class="block-title">
          <i class="icon icon-tips"></i>
          <span>获得奖励企业</span>
        </div>
      </header> -->
      <div class="el-tabs">
        <div class="form-wrapper">
          <form class="form-inline" role="form">
            <div class="form-group">
              <span class="control-label">奖励筛选：</span>
              <el-select v-model="jlvalue" clearable placeholder="请选择奖励类别">
                <el-option label="选择所有" value></el-option>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="form-group">
              <div class="ui-input ui-input-search PuKey">
                <i class="el-icon-search"></i>
                <input
                  class="key"
                  v-model="gongsiname"
                  placeholder="公司名称/奖励名称"
                  type="text"
                  autocomplete="off"
                />
              </div>
            </div>
            <!-- <div class="form-group">
              <button class="btn btn-query btn-action" type="button" role="button">
                <span @click="tablelist()" class="chaxun">查询</span>
                <i class="icon-loading icon-loading-white a-spin"></i>
              </button>
            </div> -->
            <el-button @click="tablelist()" type="primary">查询</el-button>
          </form>
        </div>
      </div>
      <section class="block box-shadow overviewLayer">
        <div class="el-tabs padding10">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table :empty-text="tishi" stripe :data="jllist" style="width: 100%"  v-loading="loading">
                <el-table-column prop="gongsiname" label="企业名称">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                    >{{ scope.row.gongsiname }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="jianglimc" label="奖励名称"></el-table-column>
                <el-table-column prop="jianglixm" label="奖励项目"></el-table-column>
                <el-table-column prop="suoshudy" width="160" label="所属地域"></el-table-column>
                <el-table-column prop="zhuczb" width="180" label="注册资本(万元)"></el-table-column>
                <el-table-column prop="beizhu4" width="170" label="成立时间">
                  <template slot-scope="{row}">
                    {{ row.beizhu4 || '-' }}
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
      </section>
    </div>
  </div>
</template>
<style lang="scss">
@import "../../styles/Monitor/region/css/container/container.scss";
@import "../../styles/Monitor/region/css/container/Huodejiangli.scss";
#Huodejiangli{
    .el-table__row>td:first-child{
        text-align: left !important;
    }
}
</style>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "a",
          label: "国家奖励"
        },
        {
          value: "b",
          label: "省级奖励"
        },
        {
          value: "c",
          label: "市级奖励"
        }
      ],
      jlvalue: "",
      gongsiname: "",
      jllist: [],
      total: 0,
      suoshudy: "",
      suoshucs: "",
      suoshuqx: "",
      loading: true,
      page: 1,
      limit: 20, //分页变量2
      suibian: true, //分页变量3
      tishi: "正在查询..."
    };
  },
  mounted() {
    // console.log(this.jlvalue)
    this.suoshudy = this.$store.state.suoshusf;
    this.suoshucs = this.$store.state.suoshucs
    this.suoshuqx = this.$store.state.suoshuqx
    this.tablelist();
  },
  watch: {
    "$store.state.suoshusf": function() {
      var self = this;
      this.suoshudy = this.$store.state.suoshusf;
      self.loading = true;
      this.page = 1; //分页
      this.tablelist();
    }
  },
  methods: {
    // 分页--回到首页按钮  start
    paginationsy() {
      if (this.page === 1) {
      } else {
        // this.page = 1
        this.handleCurrentChange(1);
      }
    },
    // 分页--回到首页按钮  end
    tablelist() {
      var self = this
      // 分页--调用没数据的接口后，重置分页 start
      var right = document.getElementsByClassName("btn-next");
      right[0].disabled = "";
      // 分页--调用没数据的接口后，重置分页 end
      this.loading = true;
      let params = {
        page: this.page,
        limit: 20,
        suoshudy: this.suoshudy,
        suoshucs: self.suoshucs,
        suoshuqx: self.suoshuqx,
        gongsiname: this.gongsiname,
        ziduanqufen: this.jlvalue
      };
      this.axios({
        url: this.api.Huodejiangli,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res);
        this.jllist = res.data.data;
        if(res.data.count == 0) {
          self.tishi = "暂无数据"
        }
        this.total = res.data.count;
        this.loading = false;
        //分页--总条数<=20，禁用右按钮  start
        var cot = parseInt(self.total / 20) + 1;
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        } else if (self.page == 1) {
          self.suibian = true;
        }
        //分页--总条数<=20，禁用右按钮  end
      });
    },
    handleCurrentChange(val) {
      var self = this;
      self.loading = true;
      self.page = val;
      self.suibian = false; //是否禁用首页按钮
      self.tablelist(val);
    }
  }
};
</script>