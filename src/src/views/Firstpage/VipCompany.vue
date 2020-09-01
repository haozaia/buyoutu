<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title">优质企业查询</div>
      <div class="el-tab">
        <el-tabs @tab-click="handleClick">
          <div class="form-wrapper">
            <form class="form-inline" role="form">
              <div class="form-group">
                <span class="control-label">地域 :</span>
                
                <el-select v-model="zhengzhaolx" placeholder="请选择所在地域">
                  <el-option label="选择所有" value></el-option>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group">
                <div class="ui-input ui-input-search">
                  <i class="el-icon-search"></i>
                  <input
                    class="key"
                    v-model="gongsiname"
                    placeholder="请输入公司名称"
                    type="text"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="form-group">
                <button
                  class="btn btn-query btn-action"
                  @click="tableList(1)"
                  type="button"
                  role="button"
                >
                  <span class="chaxun">查询</span>
                  <i class="icon-loading icon-loading-white a-spin"></i>
                </button>
              </div>
            </form>
          </div>
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="企业名称" align="center">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      class="toChange"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{scope.row.name}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="gongsilx" align="center" label="公司类型"></el-table-column>
                <el-table-column prop="zhucezb" align="center" label="注册资本(万元)"></el-table-column>
                <el-table-column prop="suoshusf" align="center" width="100" label="所属省份"></el-table-column>
                <el-table-column prop="lianxiyx" align="center" label="联系邮箱"></el-table-column>
                <el-table-column prop="fadingdbr" align="center" width="100" label="法人代表"></el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination" v-loading="loading">
              <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
              <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
          </div>
          <!-- 分页dom end -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      // page: "",
      zhengzhaolx: "",
      options: [],
      tableData: [],
      gongsiname: "",
      loading: true,
      page: 1,
      limit:20,   //分页变量2
      suibian:true,    //分页变量3
    };
  },
  mounted() {
    var self = this;
    self.select();
    self.tableList();
  },
   watch:{
    page(val) {
      var self=this
            if(val == 1){
                self.suibian=true
            }
        }
  },
  created() {},
  methods: {
    // 分页--回到首页按钮  start
    paginationsy() {
        if(this.page === 1) {

        }else{
            // this.page = 1
            this.handleCurrentChange(1)
        }
    },
    // 分页--回到首页按钮  end
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      // console.log(self.page);
      //分页--判断当前页是否为最后一页，禁用右按钮  start
        var cot =  parseInt(self.total/self.limit)+1
        self.suibian=false  //是否禁用首页按钮
            if(cot == val){
                this.$message("当前已经是最后一页啦")
                var right = document.getElementsByClassName('btn-next')
                right[0].disabled="disabled"
            }else if(val==1){
                self.suibian=true
            }
        //分页--判断当前页是否为最后一页，禁用右按钮  end
      self.tableList(val, 20);
    },
    select() {
      var self = this;

      this.axios({
        url: this.api.vipdiyuapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options = res.data.data;
      });
    },

    tableList(val) {
      var self = this;
      // 分页--调用没数据的接口后，重置分页 start
        var right = document.getElementsByClassName("btn-next");
        right[0].disabled = "";
        // 分页--调用没数据的接口后，重置分页 end
      self.loading = true;
      var page=val?val:self.page
      self.page=page
      let params = {
        page: page,
        limit: 20,
        suoshusf: self.zhengzhaolx,
        name: self.gongsiname,
        youxiandj: 20
      };
      this.axios({
        url: this.api.nameapi,

        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.tableData = res.data.data;
        self.total = res.data.count;
        self.loading = false;
        //分页--总条数<=20，禁用右按钮  start
        var cot = Math.ceil(self.total / 20);
          if (cot <= self.page) {
          right[0].disabled = "disabled";
          } else if (self.page == 1) {
          self.suibian = true;
          }
        //分页--总条数<=20，禁用右按钮  end
      });
    }
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/Techindustry.scss";
</style>