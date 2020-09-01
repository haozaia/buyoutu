<template>
  <div slot="intellectual">
    <div class="companyContent">
      <div>
        
       

        <div class="table-list" v-if="tableData2 != 0">
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">软件著作权</span>
            <span class="inline colorH fontSize18">&nbsp;{{total2}}</span>

            </div>
          </header>
          <div class="licenceTable lineTable el-tabs">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData2" style="width: 100%">
                  <el-table-column prop="pizhunrq" label="批准日期" width="180"></el-table-column>
                  <el-table-column prop="ruanjianqc" label="软件全称"></el-table-column>
                  <el-table-column prop="ruanjianjc" label="软件简称"></el-table-column>
                  <el-table-column prop="dengjih" label="登记号"></el-table-column>
                  <el-table-column prop="fenleih" label="分类号">
                    <template slot-scope="{row}">{{ row.fenleih || '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="banbenh" label="版本号"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange2"
            :page-size="20"
            :total="total2"
            background
          ></el-pagination>
        </div>

        
      </div>
    </div>
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
      gongsiname: "",
      total2: 0,
      page2: 1,
      tableData2: [],
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.getList2();
  },
  methods: {
    handleCurrentChange2(val) {
      var self = this;
      self.page2 = val;
      self.getList2(val, 20);
    },
    getList2() {
      var self = this;
      let params = {
        page: self.page2,
        gongsiname: self.gongsiname,
        limit: 20
      };
      this.axios({
        url: this.api.ruanjianzzq,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData2 = res.data.data;
        self.total2 = res.data.count;
      });
    },
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";
</style>