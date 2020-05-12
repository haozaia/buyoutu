<template>
    <div id="Huodejiangli">
        <div class="container">
            <header>
                <div class="block-title">
                    <i class="icon icon-tips"></i>
                    <span>获得奖励企业</span>
                </div>
            </header>
            <div class="el-tabs">
                <div class="form-wrapper">
                    <form class="form-inline" role="form">
                    <div class="form-group">
                        <span class="control-label">奖励筛选 :</span>
                        <el-select v-model="jlvalue" clearable placeholder="请选择奖励类别">
                          <el-option label="选择所有" value></el-option>
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="form-group">
                        <div class="ui-input ui-input-search">
                        <i class="el-icon-search"></i>
                        <input class="key" v-model="gongsiname" placeholder="公司名称/奖励名称" type="text" autocomplete="off" />
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-query btn-action" type="button" role="button">
                        <span @click="tablelist()" class="chaxun">查询</span>
                        <i class="icon-loading icon-loading-white a-spin"></i>
                        </button>
                    </div>
                    </form>
                </div>
            </div>
            <section class="block box-shadow overviewLayer">
              <div class="el-tabs padding10">
                <div class="query-result">
                  <div class="table-wrapper">
                    <el-table stripe :data="jllist" style="width: 100%">
                      <el-table-column prop="gongsiname" label="奖励企业">
                        <template slot-scope="scope">
                          <router-link
                            target="_blank"
                            tag="a"
                            style="color:#606266;text-decoration:none;"
                            :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                          >{{ scope.row.gongsiname }}</router-link>
                        </template>
                      </el-table-column>
                      <el-table-column prop="suoshudy" label="所属地域"></el-table-column>
                      <el-table-column prop="gongsilx" label="公司类型"></el-table-column>
                      <el-table-column prop="zhuczb" label="注册资本"></el-table-column>
                      <el-table-column prop="jianglimc" label="奖励名称"></el-table-column>
                      <el-table-column prop="jianglixm" label="奖励项目"></el-table-column>
                    </el-table>
                  </div>
                </div>
                <el-pagination layout="prev, pager, next"  @current-change="handleCurrentChange"  :page-size="20"  :total="total"></el-pagination>
              </div>
            </section>
        </div>
    </div>
</template>
<style lang="scss">
@import "../../styles/Monitor/region/css/container/container.scss";
@import "../../styles/Monitor/region/css/container/Huodejiangli.scss";
</style>
<script>
export default {
    data() {
      return{
        options: [{
          value: 'a',
          label: '国家奖励'
        }, {
          value: 'b',
          label: '省级奖励'
        }, {
          value: 'c',
          label: '市级奖励'
        }],
        jlvalue: '',
        gongsiname: '',
        jllist: [],
        total: 0,
        suoshudy: '',
        loading: true,
        page: 1,
      }
    },
    mounted() {
      // console.log(this.jlvalue)
      this.suoshudy = this.$store.state.suoshusf
      this.tablelist()
    },
    watch: {
        "$store.state.suoshusf": function() {
        var self = this;
        this.suoshudy = this.$store.state.suoshusf
        self.loading = true
        this.tablelist()
        }
    },
    methods: {
      tablelist(){

        // console.log(this.jlvalue)
        this.loading = true
        let params = {
          page: this.page,
          limit: 20,
          suoshudy: this.suoshudy,
          gongsiname: this.gongsiname,
          ziduanqufen: this.jlvalue
        }
        this.axios({
          url: this.api.Huodejiangli,
          method: "post",
          data: this.$qs.stringify(params),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then( res=> {
          console.log(res)
          this.jllist = res.data.data
          this.total = res.data.count
      })
      },
      handleCurrentChange(val){
        var self = this;
        self.loading=true
        self.page = val;
        self.tablelist(val);
      },
    }

}
</script>