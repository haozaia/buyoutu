<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title">
        <span class="Title_left"></span>
        行业龙头
      </div>
      <div class="tab-box">
        <ul>
          <li @click="enterpriselist(guonei,1)" class="fontSize20 color3" :class="[this.guonei == activelx?'activeStyle':'mrStyle']">{{ this.guonei }}</li>
          <li @click="enterpriselist(quanqiu,1)" class="fontSize20 color3" :class="[this.quanqiu == activelx?'activeStyle':'mrStyle']">{{ this.quanqiu }}</li>
          <li @click="enterpriselist(adakeji,1)" class="fontSize20 color3" :class="[this.adakeji == activelx?'activeStyle':'mrStyle']">{{ this.adakeji }}</li>
        </ul>
        <section class="border-bottom">
          <div style="padding-top:25px;"></div>
          <div class="query-result">
            <div class="table-wrapper">
              <el-table
                :empty-text="tishi"
                stripe
                :data="tableData2"
                v-loading="loading"
                style="width: 100%"
              >
                <el-table-column prop="name" label="公司名称" align="center">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      v-if="scope.row.flag == 1"
                      tag="a"
                      class="toChange"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{scope.row.name}}</router-link>
                    <!-- 有详情、无官网 -->
                    <router-link
                      target="_blank"
                      v-if="scope.row.flag == 2"
                      tag="a"
                      class="toChange"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{scope.row.name}}</router-link>
                    <!-- 有官网、无详情 -->
                    <div v-if="scope.row.flag == 3">
                      <a
                        target="_blank"
                        v-if="toRescue(scope.row.wangzhi)"
                        :href="scope.row.wangzhi"
                      >{{scope.row.name}}</a>
                      <a
                        target="_blank"
                        v-else
                        :href="'http://'+scope.row.wangzhi"
                      >{{scope.row.name}}</a>
                    </div>
                    <!-- 无官网无详情 -->
                    <span v-if="scope.row.flag == 0">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="hangye" label="领域地位" align="center"></el-table-column>
                <el-table-column prop="yangshou" label="注册资本" align="center"></el-table-column>
                <el-table-column prop="shengfen" label="所属省份" width="160" align="center"></el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
            <div id="Pagination">
            <el-pagination
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="handleCurrentChange"
                :page-size="20"
                :current-page="page"
            ></el-pagination>
            <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
            </div>
            <!-- 分页dom end -->
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleData: "",
      tishi: "正在查询...",
      page: 1,
      suibian: true, //分页变量3
      loading: false,
      tableData2: [],
      guonei: "国内第一名",
      quanqiu: "全球第一名",
      adakeji: "大科技各分支龙头",
      total: "",
      activelx: "",
    };
  },
  mounted() {
    this.enterpriselist('国内第一名');
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
    // 分页--回到首页按钮  start
    paginationsy() {
      if (this.page === 1) {
      } else {
        // this.page = 1
        this.handleCurrentChange(1);
      }
    },
    // 分页--回到首页按钮  end
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      //分页--判断当前页是否为最后一页，禁用右按钮  start
      // var cot =  parseInt(self.total/10)+1
      self.suibian = false; //是否禁用首页按钮
      //分页--判断当前页是否为最后一页，禁用右按钮  end
      // console.log(self.page);
      self.enterpriselist();
    },
    enterpriselist(LX,page) {
    var self = this
    var right = document.getElementsByClassName("btn-next");
    right[0].disabled = "";
    self.page=page?page:self.page
    self.activelx = LX ? LX:self.activelx
    //   console.log(self.activelx,"2323");
    //   if(self.activelx == '大科技各分支龙头'){
    //       self.activelx = 'A大科技各分支龙头'
    //   }
      let params = {
        page: this.page,
        limit: 20,
        leixing: self.activelx == '大科技各分支龙头'?'A大科技各分支龙头':self.activelx
      };
      this.axios({
        url: this.api.fortuneFv,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res)
        this.tableData2 = res.data.data;
        this.total = res.data.count;
        // 分页--下一页disabled
        var cot = Math.ceil(self.total / 20);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        } 
        if (self.page == 1) {
          self.suibian = true;
        }
        // 分页--下一页disabled
      });
    },
  }
};
</script>

<style scoped lang="scss" >
// html{
//   overflow-y: overlay;
// }
#C_content {
  .C_title {
    background: #fff;
    line-height: 45px;
    border-bottom: 2px solid #e9edef;
    padding: 5px 10px;
    font-weight: 600;
    .park_F {
      float: right;
    }
    .input_F {
      float: right;
      width: 240px !important;
      margin-right: 10px;
    }
  }
  .tab-box {
    background: #fff;
    ul {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      padding: 15px 20px;
      border-bottom: 2px solid #f0f2f5;
      li {
        padding: 0 30px;
        height: 36px;
        line-height: 36px;
        margin: 5px 10px;
      }
      li:hover {
        background: rgba(207, 17, 27, 1);
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
      }
      .activeStyle {
        background: rgba(207, 17, 27, 1);
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
      }
      .mrStyle {
      }
    }
  }
}
</style>
