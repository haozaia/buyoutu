<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title">政府查询</div>
      <div class="el-tab">
        <el-tabs @tab-click="handleClick">
          <div class="form-wrapper">
            <form class="form-inline" role="form">
              <div class="form-group">
                <span class="control-label">地域 :</span>
                <el-cascader
                  :options="options"
                  :props="{ checkStrictly: true }"
                  @change="handleChange"
                  clearable
                ></el-cascader>
                <!-- <el-cascader
    :options="options"
    :props="{ checkStrictly: true }"
    clearable></el-cascader>
    <el-cascader
    v-model="value"
    :options="options"
    :props="{ expandTrigger: 'hover' }"
                @change="handleChange"></el-cascader>-->
              </div>
              <div class="form-group">
                <div class="ui-input ui-input-search">
                  <i class="el-icon-search"></i>
                  <input
                    class="key"
                    v-model="gongsiname"
                    placeholder="请输入单位及职务"
                    type="text"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="form-group">
                <button
                  class="btn btn-query btn-action"
                  @click="searchList()"
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
                <el-table-column prop="shengfen" label="所在地域" align="center"></el-table-column>
                <el-table-column prop="dishi" align="center" label="所在市"></el-table-column>
                <el-table-column prop="danweijzw" align="center" label="职位/单位"></el-table-column>
                <el-table-column prop="name" align="center" label="姓名"></el-table-column>
                <el-table-column prop="lianxidh1" align="center" label="联系方式">
                   <template slot-scope="scope">
                     <span v-if="scope.row.lianxidh2 && scope.row.lianxidh1"> {{scope.row.lianxidh1}} ; {{scope.row.lianxidh2}}</span>
                     <span v-else-if="scope.row.lianxidh2 ">{{scope.row.lianxidh2}}</span>
                     <span v-else> {{scope.row.lianxidh1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="shiqu" align="center" label="所在区/县/市"></el-table-column>
              </el-table>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="20"
            :current-page=page
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
      page: 1,
      value: "",
      zhengzhaolx: "",
      options: [],
      tableData: [],
      gongsiname: "",
      loading: true,
      shengfen: "",
      dishi: "",
      shiqu: ""
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
    handleChange(value) {
      var self = this;
      // console.log(value);
      self.shengfen = value[0] ? value[0] : "";
      self.dishi = value[1] ? value[1] : "";
      self.shiqu = value[2] ? value[2] : "";
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
        url: this.api.VipDate,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options = res.data.data;
      });
    },
    searchList() {
      var self = this;
      self.page = 1;
      self.tableList();
    },
    tableList() {
      var self = this;

      self.loading = true;
      let params = {
        page: self.page,
        limit: 20,
        shiqu: self.shiqu,
        shengfen: self.shengfen,
        dishi: self.dishi,
        danweijzw: self.gongsiname,
        youxiandj: 20
      };
      this.axios({
        url: this.api.VipFrom,

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
