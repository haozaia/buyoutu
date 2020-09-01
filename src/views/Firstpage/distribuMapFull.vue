<template>
  <div id="C_content" class="distribuMap">
    <!-- <div class="C_title distribuMapTitle">
      <span class="Title_left"></span>行业分布
      <el-form ref="form" label-width="20px" style="display:inline-block;">
        <el-form-item style="margin:0">
          <span class="control-label" v-if="!comFalg">地区 ：</span>
          <el-cascader
            v-if="!comFalg"
            ref="refHandle"
            style="width:200px;margin-right:20px;"
            v-model="city_search"
            :options="city_data"
            :props="{ checkStrictly: true}"
            @change="handleChange"
            clearable
            filterable
          ></el-cascader>
          <span class="control-label">行业 ：</span>
          <el-select
            placeholder="请选择一级行业"
            filterable
            v-model="suoshuhy"
            @change="getErn"
            style="margin-right:20px;"
          >
            <el-option
              v-for="item in chain"
              :key="item.yijihy"
              :label="item.yijihy"
              :value="item.yijihy"
            ></el-option>
          </el-select>
          <el-select
            placeholder="请选择二级行业"
            filterable
            clearable
            v-model="tag"
            @change="onchangeTable"
            style="margin-right:20px;"
          >
            <el-option
              v-for="item in chainChild"
              :key="item.erjihy"
              :label="item.erjihy"
              :value="item.erjihy"
              style="margin-right:20px;"
            ></el-option>
          </el-select>

          <el-button
            class="floatR"
            @click="showFullScreen('mapAll')"
            type="primary"
            v-if="comFalg"
          >全屏</el-button>
          <el-button class="floatR" @click="goBackMap()" type="primary" v-if="!comFalg">返回</el-button>
        </el-form-item>
      </el-form>
    </div> -->

    <div class="el-tab" id="mapAll" v-show="comFalg">
      <div class="distribuMapWapper">
        <div>
          <div class="wrapper"></div>
          <div class="inline rankB">
            <ul class="inline rankHome">
              <p class="rankWapper fontSize30">全国行业分布总排行</p>
              <li
                class="rankWapper curPoi"
                v-for="(item , index) in rankList"
                :key="index"
                @click="goToTableList(item.suoshusf)"
              >
                <span
                  class="inline fontSize24"
                  :class="[index <3?'redBall':'garyBall']"
                >{{index +1}}</span>
                <span class="inline rankName fontSize24">{{item.name}}</span>
                <span class="inline rankNum fontSize18">{{item.value}}</span>
              </li>
            </ul>
          </div>

          <div
            class="echartsPat inline"
            :style="{height:'80vh',width:'70%'}"
            id="distribuMap"
            ref="distribuMap"
          ></div>
        </div>
      </div>
    </div>

    <div v-show="!comFalg">
      <el-row>
        <el-col :span="12">
          <div class="el-tab" style="margin-top:30px;">
            <div class="query-result" style="height:672px;">
              <div class="table-wrapper">
                <el-table stripe :data="tableData" id="toChange" style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="企业名称"
                    width="300"
                    :show-overflow-tooltip="true"
                    align="left"
                  >
                    <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        class="toChange"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                      >
                        {{scope.row.name}}
                      </router-link>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column> -->
                  <el-table-column prop="fadingdbr" align="center" label="法人代表"></el-table-column>
                  <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                    <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                  </el-table-column>
                  <!-- <el-table-column prop="chenglisj" align="center" label="成立时间">
                    <template
                      slot-scope="{row}"
                    >{{ row.chenglisj?row.chenglisj.substring(0, 10) : '-' }}</template>
                  </el-table-column>-->
                </el-table>
              </div>
            </div>
            <!-- 分页dom start -->
            <div id="Pagination" style="line-height:40px">
              <el-pagination
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="handleCurrentChange"
                :page-size="12"
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
          </div>
        </el-col>
        <el-col :span="12">
          <div class="allmapWapper" style="padding: 14px 14px 0 0;">
            <div id="allmap" style="height:730px;"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <!-- <fullWin v-show="fullWin" id="fullWin"></fullWin> -->
    </div>
  </div>
</template>

<script>
import "../../../node_modules/echarts/map/js/china";
import $ from "jquery";

// import "../../styles/js/china.js"
// const echarts = require('../../../node_modules/echarts');

export default {
  data() {
    return {
      comFalg: true,
      tableData: [],
      total: 0,
      page: 1,
      limit: 12, //分页变量2
      suibian: true, //分页变量3
      fullWin: false,
      distribuMap: [],
      rankList: [],
      city_search: [],
      city_data: [],
      tabView: "select1",
      shengfenLx: true,
      chainTitle: "",
      chain: {},
      chainChild: {},
      form: {
        sheng: "",
        shi: ""
      },
      suoshuhy: "",
      tag: "",
      distribuTimer: "",
      fullClick: true
    };
  },
  // components: {
  //   fullWin
  // },
  watch: {
    page(val) {
      var self = this;
      if (val == 1) {
        self.suibian = true;
      }
    }
  },
  mounted() {
    var self = this;
       clearInterval(self.distribuTimer);
    $(".distribuMapWapper").mousemove(function(e) {
      var x = (e.pageX * -1) / 10,
        y = (e.pageY * -1) / 10;
      $(".wrapper").css(
        "transform",
        "translate3d(" + x + "px," + y + "px," + y + "px)"
      );
    });
  setTimeout(()=>{
    self.showFullScreen('mapAll')
  },300)
  },
  created() {
     var self = this;
    self.getChain();
    self.citylist();
    self.drawMap();
  },
  methods: {
    drawMap() {
      var self = this;
      // 百度地图API功能
      var map = new BMap.Map("allmap", { enableMapClick: false });
      self.map = new BMap.Map("allmap", { enableMapClick: false });
      // self.getCity(map);

      // 定义一个控件类,即function
      function ZoomControl() {
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(200, 10);
      }
      self.map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
      self.map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用

      // 通过JavaScript的prototype属性继承于BMap.Control
      ZoomControl.prototype = new BMap.Control();


      var overlay = null; //圆覆盖物
      var label = null; //显示半径信息
      var overlaycomplete = function(e) {
        centerPoint = null;
        map.removeOverlay(label);
      };


      // 创建地理编码实例
      var myGeo = new BMap.Geocoder();

      // 创建控件
      var myZoomCtrl = new ZoomControl();
      // 添加到地图当中
      map.addControl(myZoomCtrl);
    },
    getCity() {
      var self = this;
      self.map.clearOverlays();
      self.dialogTable = false;
      if (self.qu) {
        self.map.centerAndZoom(self.qu, 13);
      } else if (self.shi) {
        self.map.centerAndZoom(self.shi, 10);
      } else if (self.sheng) {
        self.map.centerAndZoom(self.sheng, 7);
      } else {
        self.map.centerAndZoom("全国", 5);
      }

    },
    //获取点坐标
    citySearch() {
      var self = this;
      let params = {
        province: self.sheng ? self.sheng : "全国",
        city: self.shi,
        area: self.qu,
        sourceModule: 1,
        oldhangye:self.suoshuhy,
        oldejhangye:self.tag,
      };
      this.axios({
        url: this.api.CokeywordsearchapimKebilist,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res.data.data);
        if (res.data.data.length == 0) {
          this.$message.error({
            message: "暂无数据~",
            duration: 3000,
            center: true
          });
          self.map.clearOverlays();
          self.dialogTable = false;
        } else {
          self.map.clearOverlays();
          self.punctuation(res.data.data);
          self.dialogTable = false;
        }

        // self.city_data = res.data.data;
      });
    },
    //请求dian
    getMapCompanyList() {
      var self = this;
      let params = {
        longitude: self.longitude,
        latitude: self.latitude,
        distance: self.distance
      };
      this.axios({
        url: this.api.Park_MapBiao,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.punctuation(res.data.data);
      });
    },
    punctuation(data_info) {
      var self = this;
      console.log(data_info)
      for (var i = 0; i < data_info.length; i++) {
        var marker = new BMap.Marker(
          new BMap.Point(data_info[i].location.lon, data_info[i].location.lat)
        ); // 创建标注
        var content = `<a style="cursor:pointer;color:#cf111b;width:100%;font-weight:600;margin-bottom:6px;display:inline-block;" class="GoDetails">${
          data_info[i].name
        }</a>${
          data_info[i].fadingdbr
            ? "</br><a>法定代表人：" + data_info[i].fadingdbr
            : ""
        }</a>${
          data_info[i].chenglisj
            ? "</br><a>成立时间：" + data_info[i].chenglisj
            : ""
        }</a>${
          data_info[i].zhucezbint
            ? "</br><a>注册资本(万元)：" + data_info[i].zhucezbint
            : ""
        }</a>${
          data_info[i].suoshuejhy
            ? "</br><a>主营业务：" + data_info[i].suoshuejhy
            : ""
        }</a>${
          data_info[i].dianhua
            ? "</br><a>联系电话：" + data_info[i].dianhua
            : ""
        }</a></br><a href="https://api.map.baidu.com/marker?location=${
          data_info[i].location.lat
        },${data_info[i].location.lon}&title=${data_info[i].name}&content=${
          data_info[i].zhucedz
        }&output=html" target="_blank">地址：${data_info[i].zhucedz}</a>`;
        self.map.addOverlay(marker); // 将标注添加到地图中
        self.addClickHandler(content, marker);
      }
    },

    addClickHandler(content, marker) {
      var self = this;
      marker.addEventListener("click", function(e) {
        var p = e.target;
        var opts = {
          width: 300, // 信息窗口宽度
          enableMessage: true //设置允许信息窗发送短息
        };
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        this.openInfoWindow(infoWindow, point); //开启信息窗口

        setTimeout(() => {
          // console.log(document.querySelector(".GoDetails"),"sss")
          var GoDetails = document.querySelector(".GoDetails");
          GoDetails.addEventListener("click", function(e) {
            // console.log(e.path[0].childNodes,"eeeeeeee")
            let routeUrl = self.$router.resolve({
              path: "/CompanyDetails",
              query: { name: Base64.encode(e.path[0].childNodes[0].data) }
            });
            window.open(routeUrl.href, "_blank");
          });
        }, 200);
      });
    },
    //前往表格
    goToTableList(val) {
      var self = this;
      if (self.fullClick) {
        self.comFalg = false;
        self.sheng = val;
        self.city_search = val;
        self.tableList(1);
           self.citySearch()
        self.getCity();
      }
    },
    //返回地图
    goBackMap() {
      var self = this;
      self.comFalg = true;
      self.sheng = "";
      self.shi = "";
      self.qu = "";
      self.country();
    },
    onchangeTable() {
      var self = this;
      if (self.comFalg) {
        self.country();
      } else {
        this.page = 1;
        self.tableList();
      }
    },
    tableList(val) {
      var self = this;
      // 分页--调用没数据的接口后，重置分页 end
      var page = val ? val : self.page;
      var right = document.getElementsByClassName("btn-next");
      right[0].disabled = "";
      self.page = page;
      let params = {
        pageNumber: page,
        pageSize: self.limit,
        chanyelain: self.suoshuhy ? self.suoshuhy : "装备制造",
        chanye: self.tag,
        suoshusf: self.sheng,
        suoshucs: self.shi,
        suoshuqx: self.qu
      };
      this.axios({
        url: this.api.industryFbList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if(page==1&&val!=1){
           self.citySearch()
        self.getCity();
        }
        // console.log(JSON.stringify(res.data.data));
        self.tableData = res.data.data[0].list;
        if (res.data.data.totalRow == 0) {
          self.tishi = "暂无数据";
        }
        self.total = res.data.data[0].totalRow;
        self.loading = false;

        //分页--总条数<=20，禁用右按钮  start
        var cot = Math.ceil(self.total / 15);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        } else if (self.page == 1) {
          self.suibian = true;
        } else {
          right[0].disabled = "";
        }
        //分页--总条数<=20，禁用右按钮  end
      });
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
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleCurrentChange(val) {
      var self = this;
      self.page = val;
      self.suibian = false; //是否禁用首页按钮
      self.tableList(val);
    },
    //请求城市列表
    citylist() {
      var self = this;
      this.axios({
        url: this.api.LXshengshiquapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.city_data = res.data.data;
      });
    },
    handleChange(value) {
      var self = this;
      self.sheng = value[0] ? value[0] : "";
      self.shi = value[1] ? value[1] : "";
      self.qu = value[2] ? value[2] : "";
      this.page = 1;
      self.tableList();
      // self.citySearch()
      // this.Gongxinjsqy()
    },
    checkFull() {
      var self = this;
      $(".distribuMapWapper").css("height", "80vh");
      $(".echartsPat").css("height", "80vh");
      $(".echartsPat").css("width", "75%");
      $(".rankB").css("width", "25%");
      self.suoshuhy = "装备制造";
      self.tag = "";
      self.fullClick = true;
      self.getErn();
      self.country();
      clearInterval(self.distribuTimer);
      setTimeout(() => {
        self.drawChinaMap();
      }, 100);
    },
    //全屏事件
    launchFullscreen(element) {
      var self = this;
      
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); //火狐
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); //ie浏览器
        document.getElementById("fullScreen").style.height =
          window.screen.height + "px";
        document.getElementById("fullScreen").style.width =
          document.documentElement.clientWidth + "px";
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen(); //谷歌浏览器
      }
      $(".distribuMapWapper").css("height", "100vh");
      $(".echartsPat").css("height", "100vh");
      $(".echartsPat").css("width", "75%");
      $(".rankB").css("width", "25%");
      self.suoshuhy = "装备制造";
      self.tag = "";
      self.fullClick = false;
      self.country();
      setTimeout(() => {
        self.drawChinaMap();
      }, 100);
      const len = self.chain.length;
      let i = 1;
      self.distribuTimer = setInterval(() => {
        if (i < len) {
          self.suoshuhy = self.chain[i].yijihy;
          console.log( self.suoshuhy)
          i++;
          self.country();
        } else {
          i = 0;
        }
      }, 3000);
      this.$once('hook:beforeDestroy',()=>{
        clearInterval( self.distribuTimer);
        self.distribuTimer = null;
      })
    },
    showFullScreen(id) {
      var self = this;
      var elm = document.getElementById(id);
      self.launchFullscreen(elm);
    },
    //查询一级产业链
    getChain() {
      var self = this;
      let params = {
        oldhangye: 0
      };
      this.axios({
        url: this.api.EsExporyijihyapi,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.chain = res.data.data;
        self.suoshuhy = "装备制造";
        self.tag = "";
        self.chainChild = [];
        self.onchangeTable();
        self.getErn();
      });
    },
    getErn() {
      var self = this;
      self.tag = "";
      let params = {
        yijihy: self.suoshuhy,
        oldhangye: "0"
      };
      this.axios({
        url: this.api.ESerjihyapi,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.chainChild = res.data.data;
        self.onchangeTable();
      });
    },
    country() {
      var self = this;
      let params = {
        chanyelain: self.suoshuhy ? self.suoshuhy : "装备制造",
        chanye: self.tag
      };
      this.axios({
        url: this.api.industryChainFb,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        let data = res.data.data;
        self.distribuMap = data.map(function(singleEl) {
          singleEl.name = singleEl.suoshusf
            .replace("省", "")
            .replace("市", "")
            .replace("壮族自治区", "")
            .replace("维吾尔自治区", "")
            .replace("回族自治区", "")
            .replace("自治区", "")
            .replace(" ", "");
          singleEl.value = singleEl.count;
          return singleEl;
        });
        setTimeout(function() {
          self.drawChinaMap();
          self.rankList = self.distribuMap.slice(0, 10);
        }, 100);
      });
    },

    drawChinaMap() {
      var self = this;
      var colors = [
        [
          "rgba(255,0,12,0.1)",
          "rgba(255,0,12,0.2)",
          "rgba(255,0,12,0.3)",
          "rgba(255,0,12,0.4)",
          "rgba(255,0,12,0.5)"
        ],
        [
          "rgba(29,247,188,0.1)",
          "rgba(29,247,188,0.2)",
          "rgba(29,247,188,0.3)",
          "rgba(29,247,188,0.4)",
          "rgba(29,247,188,0.5)"
        ],
        [
          "rgba(255,209,0,0.1)",
          "rgba(255,209,0,0.2)",
          "rgba(255,209,0,0.3)",
          "rgba(255,209,0,0.4)",
          "rgba(255,209,0,0.5)"
        ],
        [
          "rgba(250,148,213,0.1)",
          "rgba(250,148,213,0.2)",
          "rgba(250,148,213,0.3)",
          "rgba(250,148,213,0.4)",
          "rgba(250,148,213,0.5)"
        ],
        [
          "rgba(98,195,45,0.1)",
          "rgba(98,195,45,0.2)",
          "rgba(98,195,45,0.3)",
          "rgba(98,195,45,0.4)",
          "rgba(98,195,45,0.5)"
        ],
        [
          "rgba(255,113,46,0.1)",
          "rgba(255,113,46,0.2)",
          "rgba(255,113,46,0.3)",
          "rgba(255,113,46,0.4)",
          "rgba(255,113,46,0.5)"
        ]
      ];
      let index = Math.floor(Math.random() * 6);
      let max = Math.max.apply(
        Math,
        self.distribuMap.map(function(o) {
          return o.value;
        })
      );
      var options = {
        backgroundColor: "transparent",
        title: {
          text: self.suoshuhy + self.tag + " 行业分布",
          left: "26%",
          top: "7%",
          textStyle: {
            color: "#fff",
            fontSize: 30,
            fontWeight: 500
          }
        },
        grid: {
          top: "0",
          left: "0",
          bottom: "0",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          padding: 10,
          textStyle: {
            fontSize: 18
          },
          formatter: function(params) {
            if (params.value) {
              return (
                params.seriesName + "<br/>" + params.name + " : " + params.value
              );
            } else {
              return params.seriesName + "<br/>" + params.name + " : " + "0";
            }
          }
        },
        visualMap: {
          //视觉映射组件
          show: false,
          min: 0,
          max: max,
          right: "70",
          top: "50%",
          inverse: false, //是否反转 visualMap 组件
          text: ["高", "低"], // 文本,默认为数值文本
          calculable: false, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
          seriesIndex: 0, //指定取哪个系列的数据,即哪个系列的 series.data,默认取所有系列
          orient: "vertical",
          inRange: {
            color: colors[index]
          }
        },
        series: [
          {
            name: "企业数量",
            type: "map",
            map: "china",
            geoIndex: 0,
            label: {
              normal: {
                show: true,
                textStyle: { color: "#fff", fontSize: 18 }
              },
              emphasis: {
                show: true,
                textStyle: { color: "#fff" }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5,
                borderColor: "#fff",
                areaColor: "rgba(0,0,0,0)"
              },
              emphasis: {
                borderWidth: 0.1,
                areaColor: "rgba(255,255,255,0.2)"
              }
            },
            data: self.distribuMap
          }
        ]
      };
      document
        .getElementById("distribuMap")
        .removeAttribute("_echarts_instance_");
      let myChart = this.$echarts.init(document.getElementById("distribuMap"));
      myChart.setOption(options, true);
      if (self.fullClick) {
        myChart.on("click", function(params) {
          if (
            params.name != "台湾" &&
            params.name != "香港" &&
            params.name != "澳门" &&
            params.name != "南海诸岛" &&
            params.value
          ) {
            let provinceName = params.data.suoshusf;
            self.comFalg = false;
            self.sheng = provinceName;
            self.city_search = provinceName;
            self.tableList(1);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" >
.distribuMap {
    /* 消息内容 */
  .BMap_bubble_content {
    background-color: #fffdf5;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 10px;
    font-size: 16px;
    line-height: 18px;
  }
  /* 内容 */
  .BMap_pop div:nth-child(9) {
    top: 35px !important;
    border-radius: 7px;
  }
  .BMap_top {
    display: none;
  }
  .BMap_bottom {
    display: none;
  }
  .BMap_center {
    display: none;
  }
  .BMapLib_box {
    background-size: auto 36px;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #ffffff;
  }
  /* 隐藏边角 */
  .BMap_pop div:nth-child(1) div {
    display: none;
  }
  .BMap_pop div:nth-child(3) {
    display: none;
  }
  .BMap_pop div:nth-child(5) {
    display: none;
  }
  .BMap_pop div:nth-child(7) {
    display: none;
  }
  .BMap_shadow div:nth-child(7) {
    display: none;
  }
  .distribuMapWapper {
    position: absolute;
    width: 100%;
    height: 80vh;
    overflow: hidden;
    //   background: url(../../assets/images/distribuMap/disBg.jpg);
  }
  .wrapper {
    background: #fff url(../../assets/images/distribuMap/disBg.jpg) repeat 0 0;
    background-size: 100% auto;
    color: #fff;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
      Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 600;
    position: absolute;
    text-align: center;
    text-shadow: 5px 5px black;
    width: 150%;
    height: 150%;
    left: -25%;
    top: -25%;
    overflow: hidden;
    transform: translate3d(0 0 0);
  }

  .el-form-item__content {
    line-height: 32px;
  }
  .distribuMapTitle {
    height: calc(7vh - 2px);
    background: #eee;
  }
  .rankB {
    width: 30%;
  }
  .rankHome {
    position: relative;
    width: 400px;
    height: 600px;
    background: rgba(0, 0, 0, 0.2);
    padding: 15px 30px 0;
    box-sizing: border-box;
    left: 140px;
    .rankWapper:first-child {
      padding-left: 0;
      text-align: center;
      border-bottom: 2px solid rgba(255, 255, 255, 0.6);
      line-height: 68px;
      height: 68px;
    }
    .rankWapper:last-child {
      border-bottom: none;
    }
    .rankWapper {
      padding-left: 54px;
      text-align: left;
      line-height: 50px;
      height: 50px;
      position: relative;
      // width: 100%;
      color: #fff;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      .redBall {
        background: #d0121b;
        border-radius: 6px;
      }
      .garyBall {
        background: #e1b45c;
        border-radius: 6px;
      }
      .redBall,
      .garyBall {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #fff;
      }
      .rankName {
        margin: 0 40px;
      }
    }
  }
}
</style>