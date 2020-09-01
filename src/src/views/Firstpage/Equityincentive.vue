<template>
  <div id="C_content">
    <div class="C_title">
      <span class="Title_left"></span>股权激励
    </div>
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
            <el-button @click="tablelist()" type="primary">查询</el-button>
          </div>
        </form>
      </div>
      <div class="query-result">
        <template>
            <div class="table-wrapper">
          <el-table stripe style="width: 100%" :data="gupiaojlList">
            <el-table-column prop="gupiaojc" label="股票简称" width="180" align="center"></el-table-column>
            <el-table-column prop="gupiaodm" label="股票代码" width="180" align="center">
              <template slot-scope="scope">
                <a
                  :href="scope.row.gupiaodmlj"
                  target="_blank"
                  style="color:#606266;text-decoration:none;"
                >{{ scope.row.gupiaodm }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="gonggaorq" label="信息发布日期" width="180" align="center"></el-table-column>
            <el-table-column prop="shijianjc" label="时间进程" align="center"></el-table-column>
            <el-table-column prop="jilijhlx" label="激励模式" align="center"></el-table-column>
            <el-table-column prop="jiliyxq" label="有效期(年)" align="center"></el-table-column>
            <el-table-column prop="zhengjianhhy" label="证监会行业" align="center"></el-table-column>
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
</template>



<script>
export default {
  data() {
    return {
      gupiaojlList: [],
      total: 0,
      gongsiname: ""
    };
  },
  mounted() {
    this.tablelist();
  },
  methods: {
    tablelist() {
      let params = {
        page: this.page,
        limit: 20,
        gongsiname: this.gongsiname
      };
      this.axios({
        url: this.api.Equityincentive,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data)
        this.gupiaojlList = res.data.data;
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
</style>