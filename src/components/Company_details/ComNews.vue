<template>
  <div slot="danger_rgc">
    <div class="companyContent">
      <section class="table-list">
        <header>
          <div class="block-titles fontSize20">
            <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
            <span class="inline">公司新闻</span>
          </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
          <div class="table-wrapper">
            <el-table stripe :data="tableData" style="width: 100%">
              <el-table-column align="center" prop="xuhao" label="序号" width="80">
                <template slot-scope="scope">{{scope.$index +1}}</template>
              </el-table-column>
              <el-table-column align="center" prop="title" label="新闻名称">
                 <template slot-scope="scope">
                     <a
                    target="_blank"
                    v-if="toRescue(scope.row.link)"
                    :href="scope.row.link"
                  >{{scope.row.title}}</a>
                  <a
                    target="_blank"
                    v-else
                    :href="'http://'+scope.row.link"
                  >{{scope.row.title}}</a>
                 </template>
              </el-table-column>
              <el-table-column align="center" prop="sourceweb" width="280" label="新闻来源"></el-table-column>
              
              <el-table-column align="center" prop="publicdate" width="150" label="发布时间"></el-table-column>
            </el-table>
          </div>
          <el-pagination
          v-show="total>10"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="10"
            :total="total"
            background
          ></el-pagination>
        </div>
      </section>

      <!-- <div class="table-list">
        <header>
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>法院公告</span>
          </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="序号" width="50"></el-table-column>
                <el-table-column prop="name" label="批准日期" width="180"></el-table-column>
                <el-table-column prop="address" label="软件全称"></el-table-column>
                <el-table-column prop="money" label="软件简称"></el-table-column>
                <el-table-column prop="years" label="登记号"></el-table-column>
                <el-table-column prop="types" label="分类号"></el-table-column>
                <el-table-column prop="types" label="版本号"></el-table-column>
              </el-table>
            </div>
          </div>
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
      </div>-->
    </div>
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
      gongsiname: "",
      total: 0,
      page: 1,
      tableData: []
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.getList();
  },
  methods: {
    handleCurrentChange(val) {
      var self = this;
      self.page = val;
      self.getList(val, 10);
    },
    toRescue(url) {
      if (url) {
        console.log(url.substr(0, 7).toLowerCase() == "http://", 222);
        return url.substr(0, 7).toLowerCase() == "http://";
      } else {
        console.log(false, 33);
        return false;
      }
    },
    getList() {
      var self = this;
      let params = {
        page: self.page,
        gongsiname: self.gongsiname,
        limit: 10
      };
      this.axios({
        url: this.api.fengxianheguiNew,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData = res.data.data;
        self.total = res.data.count;
      });
    },
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";
</style>