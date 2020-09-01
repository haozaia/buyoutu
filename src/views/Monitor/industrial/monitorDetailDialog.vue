<template>
  <div id="C_content_hyxq">
    <div class="C_container">
      <div class="C_title">
        <span class="ctspan" style="font-size:24px;">
          企业数量总数为
          <i class="cti">{{ this.allTotal }}</i>家
        </span>
      <!-- 导出按钮 -->
      <el-button   type="primary" class="download" @click="download()" v-if="this.$store.state.unitCode==3">导出</el-button>
        <!-- <el-button
          v-if="suoshuocss|| xianqus"
          size="mini"
          type="primary"
          @click="sendMsg"
          style="background-color: #c03532;
    border-color: #c03532;"
        >查看全省</el-button> -->

      </div>
      <el-collapse accordion v-model="activeName" @change="handleChange">
        <!-- A股公司 -->
        <el-collapse-item v-show="total2" name="2">
          <template slot="title">
            <div class="ind-title">
              <p class="fontSize20">
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
                  <el-table-column prop="name" align="left" label="公司名称" width="400">
                    <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name)}}"
                      >{{ scope.row.name }}</router-link>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column> -->
                  <el-table-column prop="fadingdbr" align="center" label="法定代表人"></el-table-column>
                  <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                    <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="chenglisj" align="center" label="成立时间">
                    <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 分页dom start -->
            <div id="Pagination" v-loading="loading" v-show="total2 > 10">
              <el-pagination
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="handleCurrentChange($event,2)"
                :page-size="10"
                :current-page="page"
              ></el-pagination>
              <el-button
                size="small"
                :disabled="suibian"
                class="paginationsy"
                @click="paginationsy"
              >首页</el-button>
            </div>
            <!-- 分页dom end -->
            <!-- <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChange($event,2)"
              :page-size="10"
              :total="total2"
              background
            ></el-pagination>-->
          </section>
        </el-collapse-item>
        <!-- 三板公司 -->
        <el-collapse-item v-show="total3" name="3">
          <template slot="title">
            <div class="ind-title">
              <p class="fontSize20">
                <i class="icon icon-tips"></i>
                <span>三板公司</span> 企业数量共
                <i class="icon-data">{{total3}}</i>家
              </p>
            </div>
          </template>
          <section class="border-bottom">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData3" v-loading="loading" style="width: 100%">
                  <el-table-column prop="name" align="left" label="公司名称" width="400">
                    <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                      >{{ scope.row.name }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fadingdbr" align="center" label="法定代表人"></el-table-column>
                  <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                    <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="chenglisj" align="center" label="成立时间">
                    <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 分页dom start -->
            <div id="Pagination" v-loading="loading" v-show="total3 > 10">
              <el-pagination
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="handleCurrentChange($event,3)"
                :page-size="10"
                :current-page="page"
              ></el-pagination>
              <el-button
                size="small"
                :disabled="suibian"
                class="paginationsy"
                @click="paginationsy"
              >首页</el-button>
            </div>
            <!-- 分页dom end -->
            <!-- <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChange($event,3)"
              :page-size="10"
              :total="total3"
              background
            ></el-pagination>-->
          </section>
        </el-collapse-item>

        <!-- 四版公司 -->
        <el-collapse-item v-show="total4" name="4">
          <template slot="title">
            <div class="ind-title">
              <p class="fontSize20">
                <i class="icon icon-tips"></i>
                <span>四板公司</span> 企业数量共
                <i class="icon-data">{{total4}}</i>家
              </p>
            </div>
          </template>
          <section class="border-bottom">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData4" v-loading="loading" style="width: 100%">
                  <el-table-column prop="name" align="left" label="公司名称" width="400">
                    <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                      >{{ scope.row.name }}</router-link>
                    </template>
                  </el-table-column>

                  <!-- <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column> -->
                  <el-table-column prop="fadingdbr" align="center" label="法定代表人"></el-table-column>
                  <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                    <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="chenglisj" align="center" label="成立时间">
                    <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 分页dom start -->
            <div id="Pagination" v-loading="loading" v-show="total4 > 10">
              <el-pagination
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="handleCurrentChange($event,4)"
                :page-size="10"
                :current-page="page"
              ></el-pagination>
              <el-button
                size="small"
                :disabled="suibian"
                class="paginationsy"
                @click="paginationsy"
              >首页</el-button>
            </div>
            <!-- 分页dom end -->
          </section>
        </el-collapse-item>
        <!-- 以私募融资公司 -->
        <el-collapse-item v-show="total5" name="5">
          <template slot="title">
            <div class="ind-title">
              <p class="fontSize20">
                <i class="icon icon-tips"></i>
                <span>已私募融资公司</span> 企业数量共
                <i class="icon-data">{{total5}}</i>家
              </p>
            </div>
          </template>
          <section class="border-bottom">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData5" v-loading="loading" style="width: 100%">
                  <el-table-column prop="name" align="left" label="公司名称" width="400">
                    <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                      >{{ scope.row.name }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fadingdbr" align="center" label="法定代表人"></el-table-column>
                  <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                    <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="chenglisj" align="center" label="成立时间">
                    <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 分页dom start -->
            <div id="Pagination" v-loading="loading" v-show="total5 > 10">
              <el-pagination
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="handleCurrentChange($event,5)"
                :page-size="10"
                :current-page="page"
              ></el-pagination>
              <el-button
                size="small"
                :disabled="suibian"
                class="paginationsy"
                @click="paginationsy"
              >首页</el-button>
            </div>
            <!-- 分页dom end -->
          </section>
        </el-collapse-item>
        <!-- 非挂牌非上市公司 -->
        <el-collapse-item v-show="total6" name="6">
          <template slot="title">
            <div class="ind-title">
              <p class="fontSize20">
                <i class="icon icon-tips"></i>
                <span>{{title}}相关公司</span> 企业数量共
                <i class="icon-data">{{total6}}</i>家
              </p>
            </div>
          </template>
          <section class="border-bottom">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData6" v-loading="loading" style="width: 100%">
                  <el-table-column prop="name" align="left" label="公司名称" width="400">
                    <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                      >{{ scope.row.name }}</router-link>
                    </template>
                  </el-table-column>

                  <!-- <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column> -->
                  <el-table-column prop="fadingdbr" align="center" label="法定代表人"></el-table-column>
                  <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                    <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="chenglisj" align="center" label="成立时间">
                    <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 分页dom start -->
            <div id="Pagination" v-loading="loading" v-show="total6 > 10">
              <el-pagination
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="handleCurrentChange($event,6)"
                :page-size="10"
                :current-page="page"
              ></el-pagination>
              <el-button
                size="small"
                :disabled="suibian"
                class="paginationsy"
                @click="paginationsy"
              >首页</el-button>
            </div>
            <!-- 分页dom end -->
          </section>
        </el-collapse-item>

        <!-- 海外上市公司 -->
        <el-collapse-item v-show="total7" name="7">
          <template slot="title">
            <div class="ind-title">
              <p class="fontSize20">
                <i class="icon icon-tips"></i>
                <span>海外上市公司</span> 企业数量共
                <i class="icon-data">{{total7}}</i>家
              </p>
            </div>
          </template>
          <section class="border-bottom">
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData7" v-loading="loading" style="width: 100%">
                  <el-table-column prop="name" align="left" label="公司名称" width="400">
                    <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                      >{{ scope.row.name }}</router-link>
                    </template>
                  </el-table-column>

                  <!-- <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column> -->
                  <el-table-column prop="fadingdbr" align="center" label="法定代表人"></el-table-column>
                  <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                    <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="chenglisj" align="center" label="成立时间">
                    <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 分页dom start -->
            <div id="Pagination" v-loading="loading" v-show="total7 > 10">
              <el-pagination
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="handleCurrentChange($event,7)"
                :page-size="10"
                :current-page="page"
              ></el-pagination>
              <el-button
                size="small"
                :disabled="suibian"
                class="paginationsy"
                @click="paginationsy"
              >首页</el-button>
            </div>
            <!-- 分页dom end -->
          </section>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  props: ["titles", "suoshusf", "suoshuocs", "xianqu", "parkId"],
  data() {
    return {
      activeName: "",
      allTotal: "",
      total7: 0,
      total6: 0,
      total5: 0,
      total2: 0,
      total3: 0,
      total4: 0,
      page: 1,
      tableData6: [],
      tableData5: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData7: [],
      title: "",
      loading: true,
      isCountData: true,
      suoshuocss: "",
      xianqus: "",
      suibian: true
    };
  },
  mounted() {
    var self = this;
    self.title = self.titles;
    self.suoshuocss = self.suoshuocs;
    self.xianqus = self.xianqu;
    console.log(self.parkId);
    if (!self.parkId) {
      self.tableList("2");
    }
    //条数查询
    this.$Export()
  },
  created() {},
  methods: {
      //导出
    download(){
      var self=this
      let url = self.api.exporthangye +
              "?capitalMarketMark="+self.title +"&suoshusf="+self.suoshusf+"&suoshuocs="+self.suoshuocss+"&xianqu="+self.xianqus+"&"
      this.$download(url)
    },
    // 分页--回到首页按钮  start
    paginationsy() {
      var self = this;
      if (self.page === 1) {
      } else {
        // this.page = 1
        self.handleCurrentChange(1, self.inswx);
      }
    },
    // 分页--回到首页按钮  end
    sendMsg(event) {
      let self = this;
      this.suoshuocss = "";
      this.xianqus = "";
      this.$emit("childByValue", this.suoshusf, this.titles);
      self.tableList("2");
    },
    addNum() {
      return this.suoshusf;
    },
    handleChange(val) {
      var self = this;
      self.isCountData = false;
      console.log(val);
      self.page = 1;
      if (val) {
        self.tableList(val);
      }
    },
    handleCurrentChange(val, index) {
      var self = this;
      self.page = val;
      self.suibian = false; //是否禁用首页按钮
      self.inswx = index;
      self.tableList(index);
    },

    tableList(index) {
      var self = this;
      // // 分页--调用没数据的接口后，重置分页 start
      var right = document.getElementsByClassName("btn-next");

      // right[0].disabled =  "disabled";
      // // 分页--调用没数据的接口后，重置分页 end
      self.loading = true;

      let params = {
        pageNumber: self.page,
        pageSize: 10,
        zibenscdy: index,
        capitalMarketMark: self.title,
        isCountData: self.isCountData,
        suoshusf: self.suoshusf,
        suoshuocs: self.suoshuocss,
        xianqu: self.xianqus
      };
      this.axios({
        url: this.api.ESsearchlistbyzibenscdy,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (self.isCountData) {
          var total = res.data.data.filter(function(x) {
            if (x.zibenscdy == 2) {
              self.total2 = x.count;
            }
            if (x.zibenscdy == 3) {
              self.total3 = x.count;
            }
            if (x.zibenscdy == 4) {
              self.total4 = x.count;
            }
            if (x.zibenscdy == 5) {
              self.total5 = x.count;
            }
            if (x.zibenscdy == 6) {
              self.total6 = x.count;
            }
            if (x.zibenscdy == 7) {
              self.total7 = x.count;
            }
            self.allTotal = x.allTotal;
          });
          // console.log(self.allTotal)
        } else {
          right[0].disabled = "";
          //分页--总条数<=20，禁用右按钮  start
          var cot = Math.ceil(res.data.data.totalRow / 10);
          if (cot <= self.page) {
            right[index - 2].disabled = "disabled";
          } else if (self.page == 1) {
            right[index - 2].disabled = "";
            self.suibian = true;
          } else {
            right[index - 2].disabled = "";
          }
          //分页--总条数<=20，禁用右按钮  end
          if (index == 6) {
            self.tableData6 = res.data.data.list;
          } else if (index == 5) {
            self.tableData5 = res.data.data.list;
          } else if (index == 2) {
            self.tableData2 = res.data.data.list;
          } else if (index == 3) {
            self.tableData3 = res.data.data.list;
          } else if (index == 4) {
            self.tableData4 = res.data.data.list;
          } else if (index == 7) {
            self.tableData7 = res.data.data.list;
          }
        }
        self.loading = false;
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
    font-size: 24px;
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
#chainMAPS{
    .el-dialog__header {
    padding: 16px 20px 10px;
    font-size: 24px;
    background: #eee !important;
    border-radius: 6px 6px 0 0;
  }
}
</style>