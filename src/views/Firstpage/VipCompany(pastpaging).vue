<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title">VIP企业</div>
      <div class="el-tab">
        <el-tabs @tab-click="handleClick">
          <div class="form-wrapper">
            <form class="form-inline" role="form">
              <div class="form-group">
                <span class="control-label">地域 :</span>
                
                <el-select v-model="zhengzhaolx" placeholder="请选择所在地域">
                  <el-option label="选择所有" value></el-option>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group">
                <div class="ui-input ui-input-search">
                  <i class="el-icon-search"></i>
                  <input
                    class="key"
                    v-model="gongsiname"
                    placeholder="请输入公司名称"
                    type="text"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="form-group">
                <button
                  class="btn btn-query btn-action"
                  @click="tableList(1)"
                  type="button"
                  role="button"
                >
                  <span class="chaxun">查询</span>
                  <i class="icon-loading icon-loading-white a-spin"></i>
                </button>
              </div>
            </form>
          </div>
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="企业名称" align="center">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      class="toChange"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{scope.row.name}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="gongsilx" align="center" label="公司类型"></el-table-column>
                <el-table-column prop="zhucezb" align="center" label="注册资本"></el-table-column>
                <el-table-column prop="suoshusf" align="center" width="100" label="所属省份"></el-table-column>
                <el-table-column prop="lianxiyx" align="center" label="联系邮箱"></el-table-column>
                <el-table-column prop="fadingdbr" align="center" width="100" label="法人代表"></el-table-column>
              </el-table>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="20"
            background
            :total="total"
          ></el-pagination>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      page: "",
      zhengzhaolx: "",
      options: [],
      tableData: [],
      gongsiname: "",
      loading: true,
    };
  },
  mounted() {
    var self = this;
    self.select();
    self.tableList();
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      // console.log(self.page);
      self.tableList(val, 20);
    },
    select() {
      var self = this;

      this.axios({
        url: this.api.vipdiyuapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options = res.data.data;
      });
    },

    tableList(val) {
      var self = this;
      self.loading = true;
      var page=val?val:self.page
      let params = {
        page: page,
        limit: 20,
        suoshusf: self.zhengzhaolx,
        name: self.gongsiname,
        youxiandj: 20
      };
      this.axios({
        url: this.api.nameapi,

        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.tableData = res.data.data;
        self.total = res.data.count;
        self.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/Techindustry.scss";
</style>