<template>
  <div id="C_content">
    <div class="C_title"><span class="Title_left"></span>美股中概股</div>
    <div class="Public_S">
      <!-- <p class="Public_S_P">
        共
        <span id="Tag">{{ this.total }}</span>家
      </p> -->
      <div class="el-tabs">
        <div class="query-result">
          <div style="padding-top:25px;"></div>
          <template>
            <div class="table-wrapper">
            <el-table :data="meigulist" stripe style="width: 100%">
              <el-table-column prop="gongsiname" label="公司名称" align="center">
                  <!-- <template slot-scope="scope">
                        <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                        >{{ scope.row.gongsiname }}</router-link>
                    </template> -->
              </el-table-column>
              <el-table-column prop="gongsijc" label="公司简称" align="center">
                  <template slot-scope="scope">
                        <a target="_blank" :href="scope.row.beizhu4" alt= "" v-html="scope.row.gongsijc"></a>
                    </template>
              </el-table-column>
              <el-table-column prop="gongsidm" label="总市值(美元)" align="center"></el-table-column>
              <el-table-column prop="zuixinj" label="总股本" align="center"></el-table-column>
              <el-table-column prop="zhangdiee" label="市盈率" align="center"></el-table-column>
              <el-table-column prop="zhangdief" label="每股净资产" align="center"></el-table-column>
              <el-table-column prop="zuoshoujjkp" label="每股收益" align="center"></el-table-column>
              <el-table-column prop="zuigaozuidij" label="上市日期" align="center"></el-table-column>
              <el-table-column prop="chengjiaol" label="上市场所" align="center"></el-table-column>
              <el-table-column prop="shizhi" label="所属行业" align="center"></el-table-column>
              <el-table-column prop="shiyingl" label="电话号码" align="center"></el-table-column>
              <el-table-column prop="shangshid" label="公司网址" align="center"></el-table-column>
              <el-table-column prop label="详情" width="100">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="left" width="500">
                    <p>
                      <b>注册地址</b>:
                      <span v-html="scope.row.beizhu1"></span>
                    </p>
                    <br />
                    <p>
                      <b>办公地址</b>:
                      <span v-html="scope.row.beizhu2"></span>
                    </p>
                    <br />
                    <p>
                      <b>公司介绍</b>:
                      <span v-html="scope.row.beizhu3"></span>
                    </p>
                    <br />
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">详情</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
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
      meigulist: [],
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
        url: this.api.StockExchange,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data);
        this.meigulist = res.data.data;
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
@import "../../styles/css/StockExchange.scss";
a{
    text-decoration:none;
    color: rgb(96, 98, 102)
}
</style>