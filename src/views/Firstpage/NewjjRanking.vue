<template>
  <div id="NewjjRanking">
    <div id="C_content">
      <div class="C_title"><span class="Title_left"></span>新基建细分排名
      <!-- 导出按钮 -->
                    <el-button class="download"  type="primary" @click="download()" v-if="this.$store.state.unitCode==3">导出</el-button></div>
      <div class="park-content Industryranking">
        <div class="form-wrapper">
          <form class="form-inline" role="form">
            <div class="form-group Search_Down_input">
              <el-cascader
                placeholder="选择行业"
                ref="refHandle"
                style="width:240px;margin-right:10px;"
                v-model="hangye_search"
                :options="hangye_data"
                :props="{label:'value'}"
                @change="handleChangeHang"
                clearable
              ></el-cascader>
            </div>
            <!-- <el-button @click="Search_list" type="primary">查询</el-button> -->
          </form>
        </div>
        <div class="el-tabs">
          <div class="query-result">
            <template>
              <div class="table-wrapper">
              <el-table stripe :data="tableData" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="公司名称" align="center">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{ scope.row.name }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="chenglisj" label="成立时间" align="center"></el-table-column>
                <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center"></el-table-column>
                <el-table-column prop="fadingdbr" label="公司法人" align="center"></el-table-column>
              </el-table>
              </div>
            </template>
          </div>
          <!-- 分页dom start -->
            <div id="Pagination" v-show="total > 20">
              <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
              <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
            </div>
          <!-- 分页dom end -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      loading: false,
      total: 0,
      page: 1,
      suibian: true, //分页变量3
      tableData: [],
      hangye_data: [],
      hangye_search: ["工业互联网","工业互联网平台"],
      tip: "工业互联网",
      secondTip: "工业互联网平台",
    };
  },
  mounted() {
    this.NewjjHangye()
    this.Search_list()
    //条数查询
    this.$Export()
  },
  watch: {
  },
  methods: {
    //导出
    download(){
      var self=this
      let url = self.api.exportxifen
      +'?tip='+self.tip
      +'&secondTip='+self.secondTip+'&'
      this.$download(url)
    },
    paginationsy() {
      if(this.page === 1) {
      }else{
        // this.page = 1
        this.handleCurrentChange(1)
      }
    },
    // 分页--回到首页按钮  end
    handleCurrentChange(val) {
    var self = this;
    // console.log(`当前页: ${val}`);
    self.page = val;

    //分页--判断当前页是否为最后一页，禁用右按钮  start
    var cot =  Math.ceil(self.total/20)
    self.suibian=false  //是否禁用首页按钮
    //分页--判断当前页是否为最后一页，禁用右按钮  end
    self.Search_list(val, 20);
    },
    NewjjHangye(){
      var self = this
      this.axios({
        url: this.api.Newjj_HangYe,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res,"res")
        self.hangye_data = res.data.data;
      })
    },
    Search_list() {
      var self = this
      // if(self.secondTip == undefined ){
      //   this.$alert("请选择细分行业", "提示", {
      //     confirmButtonText: "确定",
      //     callback: action => {}
      //   });
      // }

        let params = {
          page: self.page,
          limit: 20,
          tip: self.tip,
          secondTip: self.secondTip,
        }
        this.axios({
          url: this.api.Newjj_List,
          method: "post",
          data: this.$qs.stringify(params),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          // console.log(res.data.count)
          self.loading = false;
          var right = document.getElementsByClassName('btn-next')
          right[0].disabled=''
          self.tableData = res.data.data;
          self.total = res.data.count;
          // 分页--下一页disabled
          var cot =  Math.ceil(self.total/20)
          if(cot <= self.page){
              right[0].disabled="disabled"
          }
          if(self.page==1){
              self.suibian=true
          }
          // 分页--下一页disabled
        })

    },
    handleChangeHang(val) {
      var self = this
      console.log(self.hangye_search)
      self.page = 1
      self.tip = val[0]
      // console.log(self.secondTip,"点击后的tip")
      self.secondTip = val[1]
      self.Search_list()
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/css/Park.scss";
#NewjjRanking{


.Industryranking {
  .Search_Down_input{
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
  .form-wrapper{
    padding: 10px 0 10px 30px;
    background: #fff;
  }
  .el-dialog{
    height: 150px;
    margin-top: 40vh !important;
    .el-dialog__header{
      padding: 10px 10px 5px;
    }
    .el-dialog__body{
      padding: 15px 10px;
      font-size: 16px;
    }.el-dialog__footer{
       padding: 5px 10px 10px;
    }
  }
  .el-pagination {
    padding: 10px 0 !important;
    background: #fff !important;
    margin: 0;
  }
  .el-button--primary{
    background: #CF111B;
    color: #fff;
    border: none;
  }
  .el-button--primary:hover{
    color: none;
    background: #CF111B;
  }
}
}
</style>
<style lang="scss" scoped>
// .el-cascader-menu{
//   min-width: 240px;
// }
</style>