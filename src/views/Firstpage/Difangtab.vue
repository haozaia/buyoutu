<template>
  <div>
    <!-- <div class="cityBuild">
        <ul>
        <li>
            <i class="icon-add"></i>
            <p> 地方城建投融资平台</p> 
        </li>
        <li>
            <span></span>
            <div>省属平台家数</div>
        </li>
        <li>
            <span></span>
            <div>省属平台家数</div>
        </li>
        </ul>
    </div>-->
    <!-- <div class="ind-title">
      <p>
        <i class="icon icon-tips"></i>
        <span>地方城建公司列表</span>
      </p>
    </div> -->
    <div class="query-result">
      <div style="padding-top:25px;"></div>
      <div class="table-wrapper">
        <el-table stripe :data="TableDate" style="width: 100%">
          <el-table-column prop="gongsiname" label="公司名称" width="300">
             <template slot-scope="scope">
                <router-link
                  target="_blank"
                  tag="a"
                  style="color:#606266;text-decoration:none;"
                  :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                >{{ scope.row.gongsiname }}</router-link>
              </template>
          </el-table-column>
          <el-table-column prop="shengfen" label="省份"></el-table-column>
          <el-table-column prop="shiqu" label="市区"></el-table-column>
          <el-table-column prop="suoshuhy" label="所属行业"></el-table-column>
          <el-table-column prop="xiashutzdgss" label="下属投资的公司数"></el-table-column>
          <el-table-column prop="shejiaggss" label="涉及A股公司数"></el-table-column>
          <el-table-column prop="shejisanbgss" label="涉及三板公司数"></el-table-column>
          <el-table-column prop="shejisibgss" label="涉及四板公司数"></el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="20"
      :total="totals"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "Difangtab",
  props: ["difang", "difanglist", "total", "qufenzidaun"],
  data() {
    return {
      // difanglist: [],
      TableDate: [],
      totals:0
    };
  },
  created() {
    
  },
  mounted() {
    // console.log(this.difanglist, "aaaaa");
      this.TableDate = this.difanglist;
      this.totals = this.total;
      this.getTable(1,this.qufenzidaun)
  },
  methods: {
    handleCurrentChange(val) {
      var self = this;
      self.page = val;
      self.getTable(val, self.qufenzidaun);
    },
    getTable(val, qufenziduan) {
      let params = {
        page: val,
        limit: 20,
        qufenziduan: qufenziduan
      };
      this.axios({
        url: this.api.Localfinancing,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.TableDate = res.data.data;
        // console.log(this.difanglist,88888)
        this.totals = res.data.count;
        // console.log("请求到的正确数据条数", res.data.count);
      });
    }
  }
};
</script>