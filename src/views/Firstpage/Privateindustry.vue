<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title"><span class="Title_left"></span>民营产业集团</div>
      <section class="block box-shadow overviewLayer">
        <!-- <header class="block-header">
          <div class="block-title">
            <i class="icon icon-tips middle"></i>
            <span>民营产业集团公司列表</span>
          </div>
        </header> -->
        <div class="el-tabs padding10">
          <div class="query-result">
            <div style="padding-top:25px;"></div>
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%" @sort-change="sortChange">
                <el-table-column prop="gongsiname" label="公司名称">
                  <template slot-scope="scope">
                    <router-link target="_blank" tag="a" style="color:#606266;text-decoration:none;" :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                      >{{ scope.row.gongsiname }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="suozaisf" label="所在省份"></el-table-column>
                <el-table-column prop="xiashuqyzs" sortable="custom" label="下属企业总数"></el-table-column>
                <el-table-column prop="xiashutzjrjgs" sortable="custom" label="下属投资金融机构数"></el-table-column>
                <el-table-column prop="touziaggss" sortable="custom" label="投资A股公司数据"></el-table-column>
                <el-table-column prop="touzisbgss" sortable="custom" label="投资三板公司数"></el-table-column>
              </el-table>
            </div>
          </div>

           <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="20"
              :total="total"
              background
            ></el-pagination>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// import echarts from "echarts";
export default {
  name: "Innovationlayer",
  data() {
    return {
      value: "",
       total: 0,
      tableData: [],
    };
  },
  mounted() {
    var self = this;
    self.tableList();
  },
  updated() {},
  beforeDestroy() {},

  methods: {
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      // console.log(self.page);
      self.tableList();
    },
    sortChange: function(column) {
      // console.log(column + "-" + column.prop + "-" + column.order);
    },

    tableList() {
      var self = this;
      let params = {
        page: self.page,
        limit: 20,
      };
      this.axios({
        data: this.$qs.stringify(params),
        url: this.api.privateindustryList,
        method: "post",
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
.overviewLayer {
  background: #fff;
  margin-bottom: 10px;
  .count-wrapper {
    color: #000;
    font-size: 20px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    .count-item {
      margin: 0;
      float: left;
      position: relative;
      padding: 15px 0;
      text-align: center;
      width: 12.5%;
      border-bottom: 1px solid transparent;
      .count-data {
        color: #c03532;
        font-size: 20px;
        white-space: nowrap;
      }
      .count-lable {
        color: #000;
        font-size: 20px;
        text-align: center;
        list-style: none;
      }
      i {
        position: absolute;
        display: block;
        top: 20%;
        right: 0;
        width: 1px;
        height: 60%;
        background-color: #e9edef;
      }
    }
  }
}

.clear {
  clear: both;
}
.padding10 {
  padding: 10px;
}
</style>