<template>
  <div id="C_content">
    <div class="C_title"><span class="Title_left"></span>A+H</div>
    <div class="Public_S">
      <div class="el-tabs">
        <div class="query-result">
          <div style="padding-top:25px;"></div>
          <template>
            <div class="table-wrapper">
            <el-table :data="ahlist" stripe style="width: 100%">
              <el-table-column prop="gongsiname" label="公司名称" align="center">
                  <template slot-scope="scope">
                        <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                        >{{ scope.row.gongsiname }}</router-link>
                    </template>
              </el-table-column>
              <el-table-column prop="gongsijc" label="公司简称" width="140" align="center">
                  <template slot-scope="scope">
                        <a target="_blank" :href="scope.row.bijia" alt= "" v-html="scope.row.gongsijc"></a>
                    </template>
              </el-table-column>
              <el-table-column prop="hzuixinj" label="所属行业" align="center"></el-table-column>
              <el-table-column prop="agudm" label="A股代码" width="140" align="center"></el-table-column>
              <el-table-column prop="hgudm" label="H股代码" width="140" align="center"></el-table-column>
              <el-table-column prop="hzhangdief" label="上市时间" width="140" align="center"></el-table-column>
              <el-table-column prop="azhangdief" label="注册资本" width="160" align="center"></el-table-column>
              <el-table-column prop="azuixinj" label="公司网址" align="center"></el-table-column>
              <!-- bijia -->
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
export default {
  data() {
    return {
      ahlist: [],
      total: 0
    };
  },
  mounted() {
    this.tablelist();
  },
  methods: {
    tablelist() {
      let params = {
        page: this.page,
        limit: 20
      };
      this.axios({
        url: this.api.AH,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data);
        this.ahlist = res.data.data;
        // console.log(this.ahlist, "ah");
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
a{
    text-decoration:none;
    color: rgb(96, 98, 102)
}
</style>