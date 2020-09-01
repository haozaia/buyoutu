<template>
  <div id="Listedcompany">
    <div id="C_content">
      <div class="C_container">
        <div class="C_title"><span class="Title_left"></span>三板拟挂牌公司</div>
        <header class="block-header">
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>拟挂牌公司列表</span>
          </div>
        </header>
        <div class="el-tab">
          <el-tabs v-model="activeName">
              <div class="form-wrapper">
                <form class="form-inline" role="form">
                  <div class="form-group">
                    <div class="ui-input ui-input-search PuKey">
                      <i class="el-icon-search"></i>
                      <input class="key" v-model="keyword" placeholder="关键字" type="text" autocomplete="off" />
                    </div>
                  </div>
                  <div class="form-group">
                    <span class="control-label">所属行业 ：</span>
                    <el-select v-model="hangyevalue" clearable placeholder="请选择所属行业">
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

                  <div class="form-group count-wrapper">
                    共
                    <b class="count-data">{{ this.total }}</b> 家
                  </div>
                </form>
              </div>

              <div class="el-tabs padding10">
                <div class="query-result">
                  <div class="table-wrapper">
                    <el-table stripe :data="guapailist" style="width: 100%">
                      <el-table-column prop="gongsimc" label="公司名称">
                        <template slot-scope="scope">
                          <router-link
                            target="_blank"
                            tag="a"
                            style="color:#606266;text-decoration:none;"
                            :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsimc) }}"
                          >{{ scope.row.gongsimc }}</router-link>
                        </template>
                      </el-table-column>
                      <el-table-column prop="shouru2018" label="2018年收入"></el-table-column>
                      <el-table-column prop="jinglir2018" label="2018净利润(万元)"></el-table-column>
                      <el-table-column prop="jingyinghdxjlje2018" label="2018经营活动现金流净额(万元)"></el-table-column>
                      <el-table-column prop="zongzic" label="总资产(万元)"></el-table-column>
                      <el-table-column prop="jingzic" label="净资产(万元)"></el-table-column>
                      <el-table-column prop="jinglirl2018" label="2018年净利润率"></el-table-column>
                      <el-table-column prop="jingzicsyl2018" label="2018年净资产收益率"></el-table-column>
                      <el-table-column prop="suoshuhy" label="所属行业"></el-table-column>
                    </el-table>
                  </div>
                </div>
                <el-pagination layout="prev, pager, next"  @current-change="handleCurrentChange"  :page-size="20"  :total="total"></el-pagination>
              </div>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Listedcompany",
  data() {
    return {
      hangyevalue:'',
      activeName: "second",
      guapailist: [],
      niguapailist: [],
      years: [],
      keyword: '',
      total: 0,
      totalb: 0,
    };
  },
  mounted() {
    this.tablelist()
    this.niguapai()
    this.suoshuhangye()
  },
  methods: {
    suoshuhangye() {
      this.axios({
        url: this.api.suoshuhangye,
        method: "get",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res,"哈哈哈哈")
        this.years = res.data.data
      })
    },
    tablelist(){
      let params = {
            page: this.page,
            limit: 20,
            keyword:this.keyword,
            suoshuhy: this.hangyevalue
        }
        this.axios({
        url: this.api.Listedcompany,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
            // console.log(res.data.data,"1111111111")
            this.guapailist = res.data.data
            this.total = res.data.count
        })
    },
    niguapai(){
      let params = {
            page: this.page,
            limit: 20,
            keyword:this.keyword,
        }
        this.axios({
        url: this.api.Listedcompany,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
            // console.log(res.data.data,"1111111111111")
            this.niguapailist = res.data.data
            this.totalb = res.data.count
        })
    },
    handleCurrentChange(val){
      var self = this;
      self.page = val;
      self.tablelist(val, 20);
    },
    niguapaichange(val){
      var self = this;
      self.page = val;
      self.niguapai(val, 20);
    },
  }
};
</script>

<style lang="scss">
// #Listedcompany {
//   .query-result {
//     color: #666;
//     font-size: 14px;
//     padding: 0;
//     margin: 0;
//     background-color: #e9edef;
//     ul {
//       list-style: none;
//       padding: 0;
//       margin: 0;
//       .ul_li {
//         list-style: none;
//         margin-top: 10px;
//         .monitor-item {
//           background-color: #fff;
//           header {
//             margin: 0;
//             padding: 10px 15px;
//             font-size: 16px;
//             font-weight: 700;
//             white-space: nowrap;
//             a {
//               list-style: none;
//               font-size: 16px;
//               font-weight: 700;
//               text-decoration: none;
//               color: #666;
//             }
//           }
//           .monitor-cell-wrapper {
//             width: 100%;
//             border-collapse: collapse;
//             border-top: 1px solid #e9edef;
//             border-bottom: 1px solid #e9edef;
//             .monitor-cell {
//               padding: 20px;
//               width: 20%;
//               vertical-align: top;
//               padding: 20px;
//               .monitor-cell-label {
//                 color: #c03532;
//               }
//               .monitor-cell-data {
//                 a {
//                   text-decoration: none;
//                 }
//                 img {
//                   border: none;
//                   font-size: 12px;
//                   overflow: hidden;
//                   display: inline-block;
//                   margin-right: 5px;
//                   width: 40px;
//                   height: 40px;
//                   vertical-align: middle;
//                 }
//                 span {
//                   color: #666;
//                 }
//               }
//             }
//             .odd {
//               margin: 0;
//               text-align: left;
//               background-color: #f6f9fa;
//             }
//             .even {
//               margin: 0;
//               text-align: left;
//             }
//           }
//         }
//         .query-step {
//           padding: 40px 0;
//           .el-step__head.is-success {
//             color: #c03532;
//             border-color: #c03532;
//           }
//           .el-step__title.is-success {
//             color: #c03532;
//           }
//           .el-step__description.is-success {
//             color: #c03532;
//           }
//         }
//       }
//     }
//   }
// }
</style>