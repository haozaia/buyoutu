<template>
  <div id="GlobalCar">
    <div id="C_content">
      <div class="C_title"><span class="Title_left"></span>全球汽车零部件企业百强</div>
      <div class="park-content Industryranking">
        <div class="el-tabs">
          <div class="query-result">
            <template>
              <div class="table-wrapper">
              <el-table stripe :data="tableData" v-loading="loading" style="width: 100%">
                <el-table-column prop="paiming" label="排名" width="150" align="center"></el-table-column>
                <el-table-column prop="gongsiname" label="公司名称" align="center">
                  <template slot-scope="scope">
                      <a
                        target="_blank"
                        :href="scope.row.wangzhi"
                      >{{scope.row.gongsiname}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="guojia" label="国家" width="200" align="center"></el-table-column>
                <!-- <el-table-column prop="leixing" label="类型" align="center"></el-table-column> -->
                <el-table-column prop="lingbujywsr" label="2019年零部件业务收入（亿元）" align="center"></el-table-column>
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
    };
  },
  mounted() {
    this.Search_list()
  },
  watch: {
  },
  methods: {
    toRescue(url) {
      if (url) {
        console.log(url.substr(0, 7).toLowerCase() == "http://", 222);
        return url.substr(0, 7).toLowerCase() == "http://";
      } else {
        console.log(false, 33);
        return false;
      }
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
    Search_list() {
      var self = this
        let params = {
          page: self.page,
          limit: 20,
          flag:2,
        }
        this.axios({
          url: this.api.autopartshundredlistapi,
          method: "post",
          data: this.$qs.stringify(params),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          // console.log(res.data.data)
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
#GlobalCar{
  .query-result {
    padding-top: 30px;
  }
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
</style>