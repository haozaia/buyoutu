<template>
<div id="IpoDe">
  <div id="C_content">
    <div class="C_title"><span class="Title_left"></span>申报IPO公司</div>
    <div class="search">
      <!-- <div class="search_l">
        <i class="iconfont icon-sousuo"></i>
        <input
          id="code"
          type="text"
          v-model="gongsiname"
          placeholder="请输入公司名称/代码"
          autocomplete="off"
        />
      </div>
      <div class="query" @click=" tablelist()">
        <button>查询</button>
      </div> -->
      <div class="search_r">
        <el-input class="fontSize16" v-model="gongsiname" clearable placeholder="请输入公司名称/代码"></el-input>
        <!-- <button class="search_r_c colorR colorF" @click="tablelist">查询</button> -->
        <el-button @click="tablelist" style="margin-left:10px;" type="primary">查询</el-button>
      </div>
    </div>

    <div class="el-tabs">
      <div class="query-result">
        <template>
          <el-table stripe style="width: 100%" :data="declareipolist">
            <el-table-column prop="gongsiname" label="公司名称" align="center"></el-table-column>
            <el-table-column prop="nishangsd" label="拟上市地" align="center"></el-table-column>
            <el-table-column prop="baojianjg" label="保荐机构" align="center">
                <template slot-scope="scope">
                        <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.baojianjg) }}"
                        >{{ scope.row.baojianjg }}</router-link>
                    </template>
            </el-table-column>
            <el-table-column prop="kuaijissws" label="会计事务所" align="center"></el-table-column>
            <el-table-column prop="lvshisws" label="律师事务所" align="center"></el-table-column>
            <el-table-column prop="beizhu" label="备注" align="center"></el-table-column>
            <el-table-column prop="zhaogulj" label="招股链接" align="center">
              <template slot-scope="scope">
                <a :href="scope.row.zhaogulj" target="_black">查看详情</a>
              </template>
            </el-table-column>
          </el-table>
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
      declareipolist: [],
      total: 0,
      gongsiname: ""
    };
  },
  mounted() {
    this.tablelist();
  },
  methods: {
    tablelist() {
      let params = {
        page: this.page,
        limit: 20,
        gongsiname: this.gongsiname
      };
      this.axios({
        url: this.api.Declareipo,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data);
        this.declareipolist = res.data.data;
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
#IpoDe{
  .el-table__row>td:first-child{
    text-align: left !important;
  }
}
#Declareipo {
  .el-tabs {
    margin-bottom: 10px;
    background: #fff;
    margin: 0;
  }
}
.search_r {
    position: absolute;
    right: 31px;
    top: 12px;
    display: flex;
    height: 36px;
    line-height: 36px;
    .search_r_c {
      display: inline-block;
      margin-left: 10px;
      height:36px;
      width: 60px;
      border-radius: 4px;
      border: none;
    }
  }
  .el-pagination {
    text-align: right;
    background: #fff;
    padding: 10px 5px 0 0;
    margin: 0 !important;
  }
</style>