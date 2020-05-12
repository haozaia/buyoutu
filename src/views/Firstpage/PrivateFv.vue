<template>
  <div id="fortuneFv">
    <div id="C_content">
      <div class="C_title"><span class="Title_left"></span>中国民营企业500强企业名单</div>
      <!-- 搜索、查询 -->
      <!-- <div class="Five">
      <div class="search_l">
        <i class="iconfont icon-sousuo"></i>
        <input id="code" type="text" v-model="gongsiname" placeholder="该功能暂未完善,敬请期待..." autocomplete="off" />
      </div>
      <div class="search_r">
        <i class="iconfont icon-sousuo"></i>
        <input id="shareholder" type="text" v-model="gudongmc" placeholder="该功能暂未完善,敬请期待..." autocomplete="off" />
      </div>
      <div class="query">
        <button @click="tablelist()">查询</button>
      </div>
      </div>-->
      <div class="el-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="中国民营企业500强名单" name="first">
            <div class="el-tabs">
              <div class="query-result">
                <div style="padding-top:25px;"></div>
                <template>
                  <div class="table-wrapper">
                    <el-table :data="qiyelist" stripe style="width: 100%">
                      <el-table-column prop="paiming" label="排名" width="180" align="center"></el-table-column>
                      <el-table-column prop="name" label="企业名称" align="center">
                        <!-- <template slot-scope="scope">
                          <router-link
                            target="_blank"
                            v-if="scope.row.flag == 1"
                            tag="a"
                            class="toChange"
                            style="color:#606266;text-decoration:none;"
                            :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                          >{{scope.row.name}}</router-link>
                          <span v-else>{{scope.row.name}}</span>
                        </template> -->
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
                      <el-table-column prop="shengfen" label="省份" align="center"></el-table-column>
                      <el-table-column prop="hangye" label="行业" align="center"></el-table-column>
                      <el-table-column prop="yangshou" label="营收(万元)" align="center"></el-table-column>
                    </el-table>
                  </div>
                  <el-pagination
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="20"
                    :total="total"
                  ></el-pagination>
                </template>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="中国民营企业地域分布" name="second">
            <!-- echarts -->
            <div id="chinaMap" style="width:100%;height:700px;margin:0 auto;"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../node_modules/echarts/map/js/china.js";
export default {
  data() {
    return {
      qiyelist: [],
      total: 0,
      page: 1,
      activeName: "first",
      dataList: [],
    };
  },
  mounted() {
    this.enterpriselist();
    // this.chinamap();
    // this.mapshuju()
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
    enterpriselist() {
      let params = {
        page: this.page,
        limit: 20,
        leixing: "中国民营企业500强"
      };
      this.axios({
        url: this.api.fortuneFv,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res);
        this.qiyelist = res.data.data;
        this.total = res.data.count;
      });
    },
    handleCurrentChange(val) {
      var self = this;
      self.page = val;
      self.enterpriselist(val, 20);
    },
    //请求数据后加载地图 start
    mapshuju(){
      var self = this
      let params ={
        leixing: "中国民营企业500强"
      }
      this.axios({
        url: this.api.fortuneFvmap,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.dataList = res.data.data.map(function(singleEl) {
          singleEl.value = singleEl.num
          singleEl.name = singleEl.shengfen
            .replace("省", "")
            .replace("市", "")
            .replace("壮族自治区", "")
            .replace("维吾尔自治区", "")
            .replace("回族自治区", "")
            .replace("自治区","")
            .replace(" ", "");
          return singleEl;
        });
      setTimeout(function() {
        self.chinamap();
      }, 100);
      })
    },
    chinamap() {
      var self = this
      var option = {
        tooltip: {
          textStyle: {
            fontSize: 18
          },
          formatter: function(params) {
            if(params.value){
              return (
              params.seriesName + "<br />" + params.name + "：" + params.value
            );
            }else{
              return (
              params.seriesName + "<br />" + params.name + "：0"
            );
            }
            
          },
        },
        visualMap: {
          min: 0,
          max: 100,
          left: "left",
          top: "bottom",
          text: ["100", "0"],
          inRange: {
            color: ["#e0ffff", "#006edd"]
          },
          show: true
        },
        geo: {
          map: "china",
          roam: false,
          zoom: 1.23,
          label: {
            normal: {
              show: true,
              fontSize: "20",
              color: "rgba(0,0,0,0.7)"
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: "#F3B329",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [
          {
            name: "企业数量",
            type: "map",
            map: "china",
            geoIndex: 0,
            data: self.dataList
          }
        ],
      };
      var myChart = this.$echarts.init(document.getElementById("chinaMap"));
      myChart.setOption(option);
      myChart.resize();
    },
    //地图 end
    handleClick(tab) {
      var self = this;
      if (tab.index == 1) {
        // console.log(11)
        self.mapshuju();
      }
    },
  }
};
</script>

<style lang="scss">
#fortuneFv {
  .Five {
    display: flex;
    padding: 10px;
    background: #fff;
    input {
      background: none;
      outline: none;
      border: none;
    }
    .search_l {
      margin-right: 10px;
      padding: 3px 5px;
      border: 1px solid #ccc;
      width: 220px;
      border-radius: 4px;
      i {
        display: inline-block;
        margin-right: 5px;
      }
      #code {
        width: 195px;
      }
    }
    .search_r {
      margin-right: 10px;
      padding: 3px 5px;
      border: 1px solid #ccc;
      width: 220px;
      border-radius: 4px;
    }
    .query {
      button {
        outline: none;
        color: #fff;
        border: none;
        background-color: #c03532;
        border-color: #c03532;
        padding: 5.5px 10px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
  .el-pagination {
    padding: 10px 0 !important;
    background: #fff !important;
    margin: 0;
  }
}
</style>