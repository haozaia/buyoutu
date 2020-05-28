
<template>
  <div id="PrivatePlacement">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title"><span class="Title_left"></span>融资事件</div>
        <div class="el-tabs">
          <div class="form-wrapper">
            <form class="form-inline" role="form">
              <div class="form-group">
                <div class="ui-input ui-input-search PuKey">
                  <i class="el-icon-search"></i>
                  <input class="key" v-model="gongsiname" placeholder="公司名称/券商名称/关键字" type="text" autocomplete="off" />
                </div>
              </div>
              <div class="form-group">
                <div class="block">
                  <span class="demonstration fontSize20">开始日期：</span>
                  <el-date-picker
                    v-model="startTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                <div class="block">
                  <span class="demonstration end_demonstration fontSize20">结束日期：</span>
                  <el-date-picker
                    v-model="endTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="form-group">
                <span class="control-label">轮次：</span>
                  <el-select v-model="touzixzlc" clearable placeholder="请选择轮次">
                    <el-option label="选择所有" value=""></el-option>
                    <el-option
                      v-for="item in years"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
              </div>

              <div class="form-group">
                <!-- <button class="btn btn-query btn-action" type="button" role="button">
                  <span @click="tablelist()" class="chaxun">查询</span>
                  <i class="icon-loading icon-loading-white a-spin"></i>
                </button> -->
                <el-button @click="tablelist()" type="primary">查询</el-button>
              </div>
            </form>
          </div>
        </div>

        <section class="block box-shadow overviewLayer">
          <div class="el-tabs padding10">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="simulist" style="width: 100%">
                  <el-table-column prop="gongsiname" label="公司名称" width="460">
                    <template slot-scope="scope">
                      <router-link
                        v-if="scope.row.beizhu4 == '1'"
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                      >{{ scope.row.gongsiname }}</router-link>
                      <span v-else>{{ scope.row.gongsiname }}</span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="gongsijc" label="公司简称" width="150">
                  </el-table-column> -->
                  <el-table-column prop="touzif" label="投资方"></el-table-column>
                  <el-table-column prop="touzisj" label="投资时间"></el-table-column>
                  <el-table-column prop="touzixzlc" label="投资性质、轮次"></el-table-column>
                  <el-table-column prop="touzije" label="投资金额"></el-table-column>
                  <el-table-column prop="suoshuhy" label="产品名称"></el-table-column>
                </el-table>
              </div>
            </div>

            <el-pagination layout="prev, pager, next"  @current-change="handleCurrentChange"  :page-size="20"  :total="total"></el-pagination>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PrivatePlacement",
  data() {
    return {
        value:'',
        time:'',
        total:0,
        simulist: [],
        gongsiname: "",
        touzixzlc: "",
        years: [],
        startTime: "",
        endTime: "",
        // beizhu4: "",
      };
    },
  mounted() {
        this.tablelist()
  },
  methods: {
    tablelist() {
        let params = {
            page: this.page,
            limit: 20,
            gongsiname: this.gongsiname,
            touzixzlc: this.touzixzlc,
            startTime: this.startTime,
            endTime: this.endTime,
        }
        this.axios({
        url: this.api.PrivatePlacement,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
            // console.log(res.data.data,"88998899")
            this.simulist = res.data.data
            this.total = res.data.count
            // console.log(this.simulist[0].beizhu4)
        })
        this.axios({
          url: this.api.PrivatePlacementlunci,
          method: "get",
          headers: {
          "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then( res=> {
          // console.log("1",res.data.data.touzixzlc)
          this.years = res.data.data.touzixzlc
        })
    },
    handleCurrentChange(val){
      var self = this;
      self.page = val;
      self.tablelist(val, 20);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  }
};
</script>

<style lang="scss">
#PrivatePlacement {
  .el-table__row>td:first-child{
    text-align: left !important;
  }
  .el-tabs {
    margin-bottom: 10px;
    background: #fff;
    margin: 0;
  }
  .block{
    display: inline-block;
    .end_demonstration{
      margin-left: 10px
    }
  }
  .overviewLayer{
    width: 100%;
  }
}
</style>