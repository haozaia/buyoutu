<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title"><span class="Title_left"></span>政府高新投资平台 </div>
      <div class="el-tab">
        <el-tabs>
            <!-- <header id="block-header">
              <div class="block-title">
                <i class="icon icon-tips"></i>
                <span>政府高新投资平台列表</span>
              </div>	
            </header> -->
            <div class="query-result">
              <div style="padding-top:25px;"></div>
              <div class="table-wrapper">
                <el-table stripe :data="gaoxinList" style="width: 100%" :default-sort = "{}" @sort-change="formatter">
                  <el-table-column prop="gongsimc" label="公司/基金名称" width="300">
                  <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsimc) }}"
                      >{{ scope.row.gongsimc }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="guanlijtzjjs"  label="管理及投资基金数"></el-table-column>
                  <el-table-column prop="xiashujjstgss"   label="下属基金所投公司数" width="380"></el-table-column>
                  <el-table-column prop="shejiaggss"   label="涉及A股公司数"></el-table-column>
                  <el-table-column prop="shejisanbgss"   label="涉及三板公司数"></el-table-column>
                  <el-table-column prop="shejisibgss"   label="涉及四板公司数"></el-table-column>
                </el-table>
              </div>
            </div>
            <el-pagination layout="prev, pager, next"  @current-change="handleCurrentChange"  :page-size="20"  :total="total"></el-pagination>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            gaoxinList: [],
            total:0,
            type:"",
            sort:""
        }
    },
    mounted() {
        this.tablelist()
    },
    methods: {
        tablelist() {
            let params = {
                page: this.page,
                limit: 20,
                type:this.type,
                sort:this.sort
            }
            this.axios({
            url: this.api.InvestmentPlatform,
            method: "post",
            data: this.$qs.stringify(params),
            headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
                // console.log(res.data.data)
                this.gaoxinList = res.data.data
                this.total = res.data.count
            })
        },
        formatter(val){
          console.log(val)
          var self=this
          self.type=val.prop
          self.sort=val.order
          self.tablelist()
        },
        handleCurrentChange(val){
            var self = this;
            self.page = val;
            self.tablelist(val, 20);
        },
    }
}
</script>

<style lang="scss" >
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/Techindustry.scss";
</style>