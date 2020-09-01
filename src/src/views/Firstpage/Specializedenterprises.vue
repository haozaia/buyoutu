<template>
<div id="specializedenterprises">
  <div id="C_content">
    <div class="C_container">
      <div class="C_title"><span class="Title_left"></span>专项证照企业 <!-- 导出按钮 -->
                    <el-button class="download"  type="primary" @click="download()" v-if="this.$store.state.unitCode==3">导出</el-button></div>
      <div class="el-tab">
        <el-tabs  @tab-click="handleClick">
          <div class="ind-title">
            <p>
              <i class="icon icon-tips"></i>
              <span>专项证照企业</span> 证照企业共
              <span id="Tag">{{ total }}</span> 家
            </p>
          </div>
          <div class="form-wrapper">
            <form class="form-inline" role="form">
              <div class="form-group">
                <span class="control-label">证照类型 ：</span>
                <el-select v-model="zhengzhaolx" placeholder="请选择证照类型">
                   <el-option label="选择所有" value=""></el-option>
                  <el-option
                    v-for="item in options"
                    :key="item.zhengzhaolx"
                    :label="item.zhengzhaolx"
                    :value="item.zhengzhaolx"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group">
                <div class="ui-input ui-input-search PuKey">
                  <i class="el-icon-search"></i>
                  <input class="key" v-model="gongsiname" placeholder="请输入公司名称" type="text" autocomplete="off" />
                </div>
              </div>
              <!-- <div class="form-group">
                <button class="btn btn-query btn-action"  @click="search()" type="button" role="button">
                  <span class="chaxun">查询</span>
                  <i class="icon-loading icon-loading-white a-spin"></i>
                </button>
              </div> -->
              <el-button @click="search()" type="primary">查询</el-button>
            </form>
          </div>
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
                <el-table-column prop="gongsiname" label="公司名称">
                  <template slot-scope="scope">
                      <router-link target="_blank" tag="a" style="color:#606266;text-decoration:none;" :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                      >{{ scope.row.gongsiname }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="xukezbh" label="许可证编号"></el-table-column>
                <el-table-column prop="gongsilx" label="公司类型"></el-table-column>
                <el-table-column prop="zhengzhaolx" width="150" label="证照类型"></el-table-column>
                <el-table-column prop="zhuczb" width="200" label="注册资本(万元)"></el-table-column>
                <el-table-column prop="fazhengrq" width="140" label="发证日期"></el-table-column>
                <el-table-column prop="fazhengjg" width="160" label="发证机构"></el-table-column>
                <!-- <el-table-column prop label="详情">
                  <a href="#" style="color:#c03532">详情</a>
                </el-table-column> -->
              </el-table>
            </div>
          </div>
            <!-- 分页dom start -->
                    <div id="Pagination">
                        <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
                        <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
                    </div>
              <!-- 分页dom end -->
        </el-tabs>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      page:'',
      zhengzhaolx:'',
      options: [],
      tableData: [],
      gongsiname:'',
      suibian:true    //分页变量3
    };
  },
  mounted() {
    var self = this;
    self.select();
    self.tableList();
        //条数查询
    this.$Export()
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
       //导出
    download(){
      var self=this
      let url = self.api.exportzhuanxiang +
              "?zhengzhaolx="+self.zhengzhaolx +"&gongsiname="+self.gongsiname+'&'
      this.$download(url)
    },
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
       //分页--判断当前页是否为最后一页，禁用右按钮  start
        var cot =  parseInt(self.total/20)+1
        self.suibian=false  //是否禁用首页按钮
        //分页--判断当前页是否为最后一页，禁用右按钮  end
      // console.log(self.page);
      self.tableList(val, 20);
    },
    select() {
      var self = this;
      this.axios({
        url: this.api.specializeSelect,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options = res.data.data;
      });
    },
      search(){
      var self=this
      self.page=1
      self.tableList()
    },

    tableList() {
      var self = this;
        var right = document.getElementsByClassName('btn-next')
         right[0].disabled=""
      let params = {
        page: self.page,
        limit: 20,
        zhengzhaolx: self.zhengzhaolx,
        gongsiname: self.gongsiname
      };
      this.axios({
        url: this.api.specializeList,
        
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.tableData = res.data.data;
        self.total = res.data.count;
          // 分页--下一页disabled
                var cot =  parseInt(self.total/20)+1
                if(cot <= self.page){
                    right[0].disabled="disabled"
                }else if(self.page==1){
                    self.suibian=true
                }
                // 分页--下一页disabled
      });
    }
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/Techindustry.scss";
#specializedenterprises{
    .el-table__row>td:first-child{
        text-align: left !important;
    }
}
</style>