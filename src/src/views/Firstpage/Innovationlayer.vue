<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title"><span class="Title_left"></span>三板创新层</div>
      <section class="block box-shadow overviewLayer">
        <header class="block-header">
          <div class="block-title">
            <i class="icon icon-tips middle"></i>
            <span>创新层概况 </span>
            <small class="date"></small>
          </div>
        </header>
        <div class="count-wrapper clearfix">
          <div class="count-item count-1">
            <span class="count-data">{{ this.companynum }}</span>
            <br />
            <span class="count-lable fontSize20">
              创新层企业数
              <small class="fontSize20">(家)</small>
            </span>
            <i></i>
          </div>
          <div class="count-item count-3">
            <span class="count-data">{{ this.totalMarketValue }}</span>
            <br />
            <span class="count-lable fontSize20">
              总市值
              <small class="fontSize20">(亿元)</small>
            </span>
            <i></i>
          </div>
          <div class="count-item count-4">
            <span class="count-data">{{ this.totalCirculateMarketValue }}</span>
            <br />
            <span class="count-lable fontSize20" >
              总流通市值
              <small class="fontSize20">(亿元)</small>
            </span>
            <i></i>
          </div>
          <div class="count-item count-5">
            <span class="count-data">{{ this.totalCirculateStock }}</span>
            <br />
            <span class="count-lable fontSize20">流通股
              <small class="fontSize20">(亿股)</small>
            </span>
            <i></i>
          </div>
          <div class="count-item count-6">
            <span class="count-data">{{ this.totalZonggub }}</span>
            <br />
            <span class="count-lable fontSize20">
              总股本
              <small class="fontSize20">(亿股)</small>
            </span>
            <i></i>
          </div>
          <div class="count-item count-8">
            <span class="count-data">{{ this.averagepe }}</span>
            <br />
            <span class="count-lable fontSize20">
              平均市盈率
              <small class="fontSize20">(倍)</small>
            </span>
            <!-- <i></i> -->
          </div>
        </div>
        <div class="clear"></div>
      </section>

      <section class="block box-shadow overviewLayer">
        <!-- <header class="block-header">
          <div class="block-title">
            <i class="icon icon-tips middle"></i>
            <span>创新层企业列表 </span>
            <small class="date">2019-10-15</small>
          </div>
        </header> -->
        <div class="el-tabs padding10">
          <div class="query-result">
            <div style="padding-top:25px;"></div>
            <div class="table-wrapper">
              <el-table stripe :data="sanbanlist" style="width: 100%" @sort-change="sortChange">
                <el-table-column prop="gongsidm" label="公司代码"></el-table-column>
                <el-table-column prop="beizhu1" label="公司名称">
                  <template slot-scope="scope">
                        <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.beizhu1) }}"
                        >{{ scope.row.beizhu1 }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="gongsimc" label="公司简称">
                  <template slot-scope="scope">
                    <a target="_blank" :href="scope.row.beizhu2" alt= "" v-html="scope.row.gongsimc"></a>
                    </template>
                </el-table-column>
                <el-table-column prop="zongshiz" label="总市值"></el-table-column>
                <el-table-column prop="liutongsz" label="流通市值"></el-table-column>
                <el-table-column prop="shiyingl" label="市盈率(动)"></el-table-column>
                <el-table-column prop="shijingl" label="市净率(MRQ)"></el-table-column>
                <el-table-column prop="liutongg" label="流通股"></el-table-column>
                <el-table-column prop="zonggub" label="总股本"></el-table-column>
                <el-table-column prop="maolovl" label="毛利率"></el-table-column>
                <el-table-column prop="jinglil" label="净利率"></el-table-column>
                <el-table-column prop="fuzhail" label="负债率"></el-table-column>
                <el-table-column prop="roe" label="ROE"></el-table-column>
                <!-- <el-table-column prop="zuixingdrs" label="最新股东人数"></el-table-column>
                <el-table-column prop="leijirz" label="累计融资"></el-table-column>
                <el-table-column prop="guapairq" label="挂牌日期"></el-table-column> -->
              </el-table>
            </div>
          </div>

          <el-pagination layout="prev, pager, next"  @current-change="handleCurrentChange"  :page-size="20"  :total="total"></el-pagination>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Innovationlayer",
  data() {
    return {
      value:'',
      sanbanlist: [],
      total:0,
      companynum: '',
      totalMarketValue: '',
      totalCirculateMarketValue: '',
      totalCirculateStock: '',
      averagepe: '',
      totalZonggub: '',
    };
  },
  mounted() {
    this.tablelist()
  },
  updated() {},
  beforeDestroy() {},

  methods: {
    sortChange: function(column, prop, order) {
      // console.log(column + "-" + column.prop + "-" + column.order);
    },
    tablelist() {
            let params = {
                page: this.page,
                limit: 20,
            }
            this.axios({
            url: this.api.Innovationlayer,
            method: "post",
            data: this.$qs.stringify(params),
            headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
                this.sanbanlist = res.data.data
                this.total = res.data.count
            }),
            this.axios({
              url: this.api.Innovationlayergaikuo,
              method: "get",
              headers: {
              "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(res => {
              this.companynum = res.data.data.companynum
              this.averagepe = res.data.data.averagepe
              this.totalMarketValue = res.data.data.totalMarketValue
              this.totalCirculateMarketValue = res.data.data.totalCirculateMarketValue
              this.totalCirculateStock = res.data.data.totalCirculateStock
              this.totalZonggub = res.data.data.totalZonggub
            })
        },
        handleCurrentChange(val){
            var self = this;
            self.page = val;
            self.tablelist(val, 20);
        },
  }
};
</script>

<style lang="scss">
a{
    text-decoration:none;
    color: #000;
}
.overviewLayer {
  background: #fff;
  // margin-bottom: 10px;
  .count-wrapper {
    color: #000;
    font-size: 20px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    .count-item {
      margin: 0;
      float: left;
      position: relative;
      padding: 15px 0;
      text-align: center;
      width: 16.5% !important;
      border-bottom: 1px solid transparent;
      .count-data {
        color: #CF111B;
        font-size: 20px;
        white-space: nowrap;
      }
      .count-lable {
        color: #000;
        font-size: 20px;
        text-align: center;
        list-style: none;
      }
      i {
        position: absolute;
        display: block;
        top: 20%;
        right: 0;
        width: 1px;
        height: 60%;
        background-color: #e9edef;
      }
    }
  }
}

.clear {
  clear: both;
}
.padding10 {
  padding: 10px;
}
</style>