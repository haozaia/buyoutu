<template>
  <div id="C_content">
    <div class="C_title"><span class="Title_left"></span>香港红筹股</div>
    <div class="Public_S">
      <p class="Public_S_P">
        共
        <span id="Tag">{{ this.total }}</span>家
      </p>
      <div class="el-tabs">
        <div class="query-result">
          <div style="padding-top:25px;"></div>
          <template>
            <div class="table-wrapper">
            <el-table :data="redlist" stripe style="width: 100%">
              <el-table-column prop="zuixinj" label="代码" width="120" align="center"></el-table-column>
              <el-table-column prop="gongsiname" label="公司名称" width="180" align="center">
                  <!-- <template slot-scope="scope">
                        <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                        >{{ scope.row.gongsiname }}</router-link>
                    </template> -->
              </el-table-column>
              <el-table-column prop="gongsijc" label="公司简称" width="180" align="center">
                  <template slot-scope="scope">
                        <a target="_blank" :href="scope.row.jinglir2018" alt= "" v-html="scope.row.gongsijc"></a>
                    </template>
              </el-table-column>
              <el-table-column prop="jingtaisyl" label="注册地" align="center"></el-table-column>
              <el-table-column prop="shouru2018" label="上市日期" align="center"></el-table-column>
              <el-table-column prop="zhangdief" label="公司网址" align="center"></el-table-column>
              <el-table-column prop="beizhu1" label="成立日期" align="center"></el-table-column>
              <el-table-column prop="suoshuhy" label="所属行业" align="center"></el-table-column>
              <!-- jinglir2018 -->
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
      redlist: [],
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
        url: this.api.HongKongRedChips,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data);
        this.redlist = res.data.data;
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