<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title">线索收集</div>
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
                    v-model="danweijzw"
                    placeholder="请输入线索关键字/词"
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
                <el-table-column prop="shiji" align="center" label="所在市"></el-table-column>
                <el-table-column prop="quxian" align="center" label="所在县"></el-table-column>
                <el-table-column prop="biaoti" align="center" label="标题">
                  <template slot-scope="scope">
                    <a :href="scope.row.lianjie" target="_blank" style="color:#606266;text-decoration:none;">{{ scope.row.biaoti }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="faburq" align="center" label="发布日期"></el-table-column>
                <!-- <el-table-column prop="shiqu" align="center" label="所在区/县/市"></el-table-column>
                <el-table-column prop="dizhi" align="center" label="单位/地址"></el-table-column> -->
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
      value: "",
      zhengzhaolx: "",
      options: [],
      tableData: [],
      loading: true,
      danweijzw: "",
      shengfen: "",
      shiji: "",
      quxian: ""
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
      self.shiji = value[1] ? value[1] : "";
      self.quxian = value[2] ? value[2] : "";
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
        url: this.api.Vipxsshengshi,
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
        shengfen: self.shengfen,
        shiji: self.shiji,
        quxian: self.quxian,
        biaoti: self.danweijzw,
        // youxiandj: 20
      };
      this.axios({
        url: this.api.Vipxiansuo,
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
