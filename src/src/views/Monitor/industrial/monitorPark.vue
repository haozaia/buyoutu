<template>
  <div id="C_content_hyxq">
    <div class="C_container">
      <div class="C_title">
        <span class="ctspan">
          企业数量总数为
          <i class="cti">{{ this.total2 }}</i>家
        </span>
      </div>

      <template slot="title">
        <div class="ind-title">
          <p>
            <i class="icon icon-tips"></i>
            <span>A股公司</span> 企业数量共
            <i class="icon-data">{{total2}}</i>家
          </p>
        </div>
      </template>
      <section class="border-bottom">
        <div class="query-result">
          <div class="table-wrapper">
            <el-table stripe :data="tableData2" v-loading="loading" style="width: 100%">
              <el-table-column prop="name" label="公司名称">
                <template slot-scope="scope">
                  <router-link
                    target="_blank"
                    tag="a"
                    style="color:#606266;text-decoration:none;"
                    :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                  >{{ scope.row.name }}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="gongsilx" label="公司类型"></el-table-column>
              <el-table-column prop="zhucezb" label="注册资本(万元)" width="150"></el-table-column>
              <el-table-column prop="fadingdbr" label="法定代表人" width="150"></el-table-column>
            </el-table>
          </div>
        </div>
        <!-- <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChange($event,2)"
              :page-size="10"
              :total="total2"
              background
        ></el-pagination>-->
        <!-- 分页dom start -->
        <div id="Pagination" v-loading="loading">
          <el-pagination
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            @current-change="handleCurrentChange($event,2)"
            :page-size="10"
            :current-page="page"
            background
          ></el-pagination>
          <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
        </div>
        <!-- 分页dom end -->
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: ["titles", "suoshusf", "suoshuocs", "xianqu", "ParkId"],
  data() {
    return {
      total2: 0,
      page: 1,
      tableData2: [],
      title: "",
      loading: true,
      isCountData: true,
      suoshuocss: "",
      suibian: true, //分页变量3
      xianqus: ""
    };
  },
  mounted() {
    var self = this;
    self.title = self.titles;
    self.suoshuocss = self.suoshuocs;
    self.xianqus = self.xianqu;
    self.tableList("2");
    console.log(self.ParkId)
  },
  created() {},
  methods: {
    handleCurrentChange(val, index) {
      var self = this;
      self.loading = true;
      self.page = val;
      self.suibian = false; //是否禁用首页按钮
      self.tableList(val);
    },
    // 分页--回到首页按钮  start
    paginationsy() {
      if (this.page === 1) {
      } else {
        this.handleCurrentChange(1);
      }
    },
    // 分页--回到首页按钮  end
    tableList(index) {
      var self = this;
      // 分页--调用没数据的接口后，重置分页 start
      var right = document.getElementsByClassName("btn-next");
      // right[0].disabled = true;
      // 分页--调用没数据的接口后，重置分页 end
      self.loading = true;
      let params = {
        page: self.page,
        limit: 10,
        parkid: self.ParkId
      };
      this.axios({
        url: this.api.monitorParklist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.loading = false;
        self.tableData2 = res.data.data;
        self.total2 = res.data.count;
        //分页--总条数<=20，禁用右按钮  start
        var cot = Math.ceil(self.total2 / 10);
        console.log(self.total2);
        console.log(cot);
        if (self.page == 1) {
          self.suibian = true;
          console.log(111)
        }
        if (cot <= self.page) {
          right[0].disabled = "disabled";
          console.log("000")
        }  else {
          right[0].disabled = "";
          console.log(222)
        }
        //分页--总条数<=20，禁用右按钮  end
      });
    }
  }
};
</script>

<style lang="scss" >
#C_content_hyxq {
  .C_title {
    background: #fff;
    line-height: 45px;
    border-bottom: 2px solid #e9edef;
    padding: 5px 10px;
    font-weight: 600;
    .ctspan {
      // font-size: 14px;
      margin-left: 10px;
      font-weight: 500;
      .cti {
        margin: 0 5px;
        padding: 1px 5px;
        color: #fff;
        // font-size: 16px;
        line-height: 1.2;
        background-color: #c03532;
        border-radius: 4px;
        margin-left: 10px;
        font-weight: 400;
      }
    }
  }
  .ind-title {
    span {
      color: #333;
      line-height: 50px;
      white-space: nowrap;
      font-weight: 700;
      margin-right: 5px;
    }
  }
  .icon-data {
    margin: 0 5px;
    padding: 1px 5px;
    color: #fff;
    font-size: 16px;
    line-height: 1.2;
    background-color: #c03532;
    border-radius: 4px;
    margin-left: 10px;
    font-weight: 400;
  }
}
</style>