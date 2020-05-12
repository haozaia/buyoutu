<template>
  <div slot="development_history">
    <div class="companyContent_stock">
      <div id="stockReference" class="tab-target active">
        <div class="stock_first">
          <!-- 业务收入 -->
          <div class="business">
            <div class="b_title">
              <i class="icon icon-tips"></i>
              <span>公司业务收入分布</span>
              <div class="form-group">
                <el-select v-model="value" placeholder="2019-06-30">
                  <el-option
                    v-for="item in region"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div id="myStock_Pie" autoresize :style="{height:'360px',width:'100%'}"></div>
          </div>

          <!-- 商业模式 -->
          <div class="modal">
            <div class="b_title">
              <i class="icon icon-tips"></i>
              <span>公司商业模式</span>
            </div>
            <div class="modal_content">
              公司是一家致力于光亮扁钢生产销售和新品研发的高新技术企业，
              公司主营业务为扁钢的生产销售及新品研发。公司利用十几年从事本行业积累的知识与经验，
              通过独立的研发与自主创新，为客户提供厚度为 1-10mm、宽度为 6-150mm 不同规格的涵盖普通碳素结构钢、优质碳素结构钢、合金结构钢和不锈钢等不同材质的优质光亮扁钢。
              公司以质量和客户需求为核心，建立了与之对应的研发模式、采购模式、生产模式、销售模式...
              <p class="lookMore">查看更多</p>
            </div>
          </div>
        </div>
        <div class="stock_second">
          <div class="b_title">
            <i class="icon icon-tips"></i>
            <span>财务</span>
          </div>
          <div class="financial">
            <header>
              <span>主要财务指标</span>
              <i>2019-06-30</i>
            </header>
            <ul class="financial_index">
              <li>
                <div>3.27</div>
                <p>市盈率</p>
              </li>
              <li>
                <div>0.60</div>
                <p>市净率</p>
              </li>
              <li>
                <div>0.60</div>
                <p>总资产（亿元）</p>
              </li>
              <li>
                <div>0.60</div>
                <p>每股收益</p>
              </li>
              <li>
                <div>0.60</div>
                <p>每股净资产</p>
              </li>
              <li>
                <div>0.60</div>
                <p>净资产（亿元）</p>
              </li>
              <li>
                <div>0.60</div>
                <p>营业收入（亿元）</p>
              </li>
              <li>
                <div>0.60</div>
                <p>净利润（亿元）</p>
              </li>
              <li>
                <div>0.60</div>
                <p>扣除非经常性损益后的净利润（亿元）</p>
              </li>
              <li>
                <div>0.60</div>
                <p>营业收入同比增长</p>
              </li>
              <li>
                <div>0.60</div>
                <p>净利润同比增长</p>
              </li>
              <li>
                <div>0.60</div>
                <p>总资产同比增长</p>
              </li>
            </ul>
          </div>
          <!-- 图表 -->
          <div class="caption">
            <div class="caption_">
              <div class="b_title">
                <span>公司业绩增长情况</span>
              </div>
              <div class="canvas-yj">
                <div id="myStock_yj" autoresize :style="{height:'360px',width:'100%'}"></div>
              </div>
            </div>
            <div class="caption_">
              <div class="b_title">
                <span>公司净资产收益率情况</span>
              </div>
              <div class="canvas-jzc">
                <div id="myStock_jzc" autoresize :style="{height:'360px',width:'100%'}"></div>
              </div>
            </div>
            <div class="caption_">
              <div class="b_title">
                <span>公司经营性现金流情况</span>
              </div>
              <div class="canvas-xjl">
                <div id="myStock_xjl" autoresize :style="{height:'360px',width:'100%'}"></div>
              </div>
            </div>
            <div class="caption_">
              <div class="b_title">
                <span>公司资产规模情况</span>
              </div>
              <div class="canvas-zcgm">
                <div id="myStock_zcgm" autoresize :style="{height:'360px',width:'100%'}"></div>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="financial capital">
            <header>
              <span>全资本市场可比公司</span>
              <i>钢材</i>
            </header>
            <ul class="financial_index">
              <li>
                <div>36</div>
                <p>A股公司</p>
              </li>
              <li>
                <div>0.60</div>
                <p>三板公司</p>
              </li>
              <li>
                <div>0.60</div>
                <p>拟挂牌上市公司</p>
              </li>
              <li>
                <div>0.60</div>
                <p>四板公司</p>
              </li>
              <li>
                <div>0.60</div>
                <p>已私募融资公司</p>
              </li>
              <li>
                <div>0.60</div>
                <p>海外上市的中国公司</p>
              </li>
              <li>
                <div>0.60</div>
                <p>海外拟上市的中国公司</p>
              </li>
              <li>
                <div>0.60</div>
                <p>国外上市的公司</p>
              </li>
              <li>
                <div>0.60</div>
                <p>国外拟上市的公司</p>
              </li>
            </ul>
            <div class="licenceTable lineTable el-tabs">
              <div class="query-result">
                <div class="table-wrapper">
                  <el-table stripe :data="licenceTable" style="width: 100%">
                    <el-table-column prop="num" label="股票名称" width="50">1</el-table-column>
                    <el-table-column prop="name" label="最新价格（元/股）" width="180">2019.01.02</el-table-column>
                    <el-table-column prop="address" label="市值（亿元）">研发</el-table-column>
                    <el-table-column prop="money" label="静态市销率2018">2300</el-table-column>
                    <el-table-column prop="peopleNum" label="静态市盈率2018">5-10</el-table-column>
                    <el-table-column prop="contory" label="收入2018（百万）">5</el-table-column>
                    <el-table-column prop="contory" label="净利润2018（百万）">5</el-table-column>
                    <el-table-column prop="contory" label="转让方式">5</el-table-column>
                  </el-table>
                  <div class="lookCompany">查看全资本市场可比公司 ></div>
                </div>
              </div>
            </div>
            <section class="block box-shadow" id="recruitmentInformation">
              <header class="block-header">
                <div class="block-title">
                  <i class="icon icon-tips"></i>
                  <span>股权结构</span>
                  <el-select v-model="value" placeholder="2019-06-30">
                    <el-option
                      v-for="item in region"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </header>
              <div class="licenceTable lineTable el-tabs">
                <div class="query-result">
                  <div class="table-wrapper">
                    <el-table stripe :data="licenceTable" style="width: 100%">
                      <el-table-column prop="num" label="股东名称" width>1</el-table-column>
                      <el-table-column prop="name" label="持股比例" width="180">2019.01.02</el-table-column>
                      <el-table-column prop="address" label="持股数（万股）">研发</el-table-column>
                      <el-table-column prop="money" label="有限售持股数（万股）">2300</el-table-column>
                      <el-table-column prop="peopleNum" label="无限售持股数（万股）">5-10</el-table-column>
                      <el-table-column prop="contory" label="日期">5</el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </section>
            <section class="block box-shadow" id="recruitmentInformation">
              <header class="block-header">
                <div class="block-title">
                  <i class="icon icon-tips"></i>
                  <span>高管团队</span>
                </div>
              </header>
              <div class="licenceTable lineTable el-tabs">
                <div class="query-result">
                  <div class="table-wrapper">
                    <el-table stripe :data="licenceTable" style="width: 100%">
                      <el-table-column prop="num" label="职务" width>1</el-table-column>
                      <el-table-column prop="name" label="姓名" width="180">2019.01.02</el-table-column>
                      <el-table-column prop="address" label="性别">研发</el-table-column>
                      <el-table-column prop="money" label="出生年月">2300</el-table-column>
                      <el-table-column prop="peopleNum" label="学历">5-10</el-table-column>
                      <el-table-column prop="contory" label="任职时间">5</el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </section>
            <section class="block box-shadow" id="recruitmentInformation">
              <header class="block-header">
                <div class="block-title">
                  <i class="icon icon-tips"></i>
                  <span>融资新闻纪录</span>
                </div>
              </header>
              <div class="query-result">
                <div class="notes-wrapper">
                  <span>注：该融资数据为新闻采集数据，不一定是实际融资情况，建议与以上股东变更记录对应参考</span>
                </div>
                <div class="timeBar-wrapper">
                  <table>
                    <tbody>
                      <tr class="last">
                        <td>
                          <div class="date-wrapper">
                            <span class="date">2016-07-11</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span class="label blue-label">融资方</span>
                            <span class="data">天驰新材</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span class="label red-label">融资轮次</span>
                            <span class="data">新三板</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span class="label blueLight-label">融资金额</span>
                            <span class="data">金额未公开</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span class="label gray-label">融资对象</span>
                            <span class="data">未公开</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="stock_three">
          <div class="stock_Profile">
            <header class="block-header">
              <div class="block-title">
                <i class="icon icon-tips"></i>
                <span>公司信息</span>
              </div>
            </header>
            <div class="basic">
              <ul>
                <li>
                  <i class="i1"></i>
                  <span>公司简介：</span>
                  <span>天驰新材</span>
                </li>
                <li>
                  <i class="i2"></i>
                  <span>公司全称</span>
                  <span>12011600凡人歌GV不让他发吧承认他搞</span>
                </li>
                <li>
                  <i class="i3"></i>
                  <span>成立日期：</span>
                  <span>2004-11-25</span>
                </li>
                <li>
                  <i class="i4"></i>
                  <span>主办券商：</span>
                  <span>华西证券</span>
                </li>
                <li>
                  <i class="i5"></i>
                  <span>律所：</span>
                  <span>北京市近视的进口粉嫩的</span>
                </li>
                <li>
                  <i class="i6"></i>
                  <span>董事会秘书：</span>
                  <span>91120116300415355U</span>
                </li>
                <li>
                  <i class="i7"></i>
                  <span>所属省份</span>
                  <span>2014-08-25 至 无固定期限</span>
                </li>
                <li>
                  <i class="i8"></i>
                  <span>所属城市：</span>
                  <span>存续</span>
                </li>
                <li>
                  <i class="i9"></i>
                  <span>董秘电话：</span>
                  <span>2014-08-25</span>
                </li>
                <li>
                  <i class="i10"></i>
                  <span>会计所：</span>
                  <span>91120116300415355U</span>
                </li>
                <li>
                  <i class="i11"></i>
                  <span>做市券商：</span>
                  <span>2014-08-25</span>
                </li>
                <li>
                  <i class="i12"></i>
                  <span>注册地址：</span>
                  <span>有限责任公司(自然人独资)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>  
  
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      value: "",
      region: [
        { text: "2019-6-30", value: "2019-6-30" },
        { text: "2018-12-31", value: "2018-12-31" },
        { text: "2018-6-30", value: "2018-6-30" },
        { text: "2017-12-31", value: "2017-12-31" }
      ],
      licenceTable: [{}, {}, {}, {}, {}, {}, {}, {}],
      holderdata: [{}, {}, {}, {}, {}, {}],
    };
  },
  mounted() {
    var self = this;
    self.MydrawPie();
    self.MyStock_yj();
    self.MyStock_jzc();
    self.MyStock_xjl();
    self.MyStock_zcgm();
  },
  methods: {
    MydrawPie() {
      var chart = this.$echarts.init(document.getElementById("myStock_Pie"));
      chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            autoresize: true,
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 4893, name: "普抬杠（高新" },
              { value: 103, name: "和结构" },
              { value: 138, name: "不锈钢" },
              { value: 233, name: "有抬杠" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      chart.resize();
    },
    MyStock_yj() {
      var chart = this.$echarts.init(document.getElementById("myStock_yj"));
      chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["营业收入", "净利润"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: ["2016", "2017", "2018", "2019-06-30"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "营业收入",
            type: "bar",
            data: [66.61, 99.28, 128.0, 56.2]
          },
          {
            name: "净利润",
            type: "bar",
            data: [0.26, 1.9, 3.0, 16.4]
          }
        ]
      });
      chart.resize();
    },
    MyStock_jzc() {
      var chart = this.$echarts.init(document.getElementById("myStock_jzc"));
      chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          data: ["2016", "2017", "2018", "2019-06-30"]
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "净资产收益率",
            type: "line",
            data: [66.61, 99.28, 128.0, 56.2]
          }
        ]
      });
      chart.resize();
    },
    MyStock_xjl() {
      var chart = this.$echarts.init(document.getElementById("myStock_xjl"));
      chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          data: ["2016", "2017", "2018", "2019-06-30"]
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "净资产收益率",
            type: "line",
            data: [66.61, 99.28, 128.0, 56.2]
          }
        ]
      });
      chart.resize();
    },
    MyStock_zcgm() {
      var chart = this.$echarts.init(document.getElementById("myStock_zcgm"));
      chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["营业收入", "净利润"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: ["2016", "2017", "2018", "2019-06-30"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "资产总计",
            type: "bar",
            data: [30, 39.28, 58.0, 56.2]
          },
          {
            name: "净资产",
            type: "bar",
            data: [11, 19, 10, 16.4]
          }
        ]
      });
      chart.resize();
    }
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";

.stock_first {
  position: relative;
  display: flex;
  span {
    font-weight: 700;
    font-size: 22px;
  }
  .business {
    flex: 1;
    height: 400px;
    margin-right: 10px;
    background-color: #fff;
    .b_title {
      border-bottom: 1px solid #f5f8fe;
      line-height: 60px;
      .form-group {
        position: absolute;
        left: 170px;
        width: 130px;
        top: 5px;
      }
    }
  }
  .modal {
    flex: 1;
    height: 400px;
    background-color: #fff;
    .b_title {
      border-bottom: 1px solid #f5f8fe;
      line-height: 60px;
    }
    .modal_content {
      color: #666;
      font-size: 14px;
      line-height: 1.71428571;
      padding: 10px;
      .lookMore {
        font-size: 12px;
        color: #c03532;
      }
    }
  }
}
.stock_second {
  margin-top: 10px;
  background-color: #fff;
  padding: 0px 10px;
  span {
    font-weight: 700;
    font-size: 14px;
  }
  .financial {
    line-height: 50px;
    border: 1px solid #f5f8fe;
    margin-top: 10px;
    overflow: hidden;
    span {
      margin: 0px 10px;
    }
    i {
      font-size: 12px;
      color: #666;
    }
    .financial_index {
      padding: 0px;
      overflow: hidden;
      li {
        width: 33.3%;
        float: left;
        text-align: center;
        p {
          line-height: 42px;
          margin: 0px;
          color: #666;
          font-size: 14px;
        }
        div {
          font-size: 16px;
          color: #c03532;
        }
      }
      li:nth-child(2n-1) {
        background-color: #f6f9fa;
      }
    }
  }
  .caption {
    margin-top: 10px;
    height: 800px;
    .caption_ {
      border: 1px solid #f5f8fe;
      width: 49%;
      float: left;
      padding-top: 10px;
      .canvas-yj {
        #myStock_yj,
        #myStock_jzc,
        #myStock_xjl {
          width: 100%;
          canvas {
            width: 100%;
          }
        }
      }
      .b_title {
        margin-left: 10px;
      }
    }
  }
  .capital {
    ul {
      margin: 0px;
      border: 1px solid #f5f8fe;
      li {
        width: 20% !important;
      }
    }
    .lookCompany {
      text-align: center;
      font-size: 14px;
      color: #c03532;
      cursor: pointer;
    }
    .lookCompany:hover {
      text-decoration: underline;
      color: #7e0e0d;
    }
  }
  .notes-wrapper {
    background: #f5f8fa;
    color: #999;
    font-size: 12px;
  }
  .timeBar-wrapper {
    table {
      width: 100%;
      tr {
        td {
          width: 20%;
          text-align: center;

          .label {
            display: inline-block;
            color: #fff;
            position: relative;
            padding: 0 10px;
            margin-right: 10px;
            line-height: 24px;
            border-radius: 0 25px 25px 0;
          }
          .data {
            color: #666;
            font-size: 14px;
            font-weight: normal;
          }
          .blue-label {
            background: #14b8d4;
          }
          .red-label {
            background: #ff6565;
          }
          .blueLight-label {
            background: #2eabef;
          }
          .gray-label {
            background: #999;
          }
        }
      }
    }
  }
}
.stock_three{
    .stock_Profile{
        background: #fff;
        .basic{
            ul{
                overflow: hidden;
                margin: 0 0 1px 0;
                padding:0 0 0 10px !important;
               li{
                   width: 31.6%;
                   float: left;
                    color: #666;
                    font-size: 14px;
                    flex: 1;
                    background: #f5f8fa;
                    line-height: 15px;
                    padding-left: 15px;
                    margin: 0 2px 1px 0;
                    padding: 15px;
                    border-bottom: 1px solid #fff;
                    border-right: 1px solid #fff;
                    i{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: url("../../assets/images/baseinfo.png");
                    margin-right: 12px;
                    line-height: 40px;
                }
               }
            }
             
        } 
    }
     
}
</style>