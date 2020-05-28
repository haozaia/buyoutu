<template>
  <div id="mapSearch">
    <div id="C_content">
      <div class="C_title">
        <span class="Title_left"></span>
        <span class="inline">地图搜索</span>
        <div class="search_l inline">
          <div class="controlCity inline">
            <p>
              <span class="control colorH fontSize20">选择城市：</span>
              <el-cascader
                ref="refHandle"
                style="width:200px;"
                v-model="city_search"
                :options="city_data"
                :props="{ checkStrictly: true }"
                @change="handleChange"
                clearable
                filterable
              ></el-cascader>
            </p>
          </div>
          <el-button
            v-show="dialogTable"
            style="width: 130px !important; margin-top:-6px;"
            type="primary"
            @click="openDialog"
          >查看详情</el-button>
        </div>

        <div class="search_r">
          <el-input
            class="fontSize20 Search_Entry_Div Search_Entry_input"
            v-model="name"
            clearable
            placeholder="请输入企业名称"
          ></el-input>
          <el-button @click="citySearch()" type="primary">查询</el-button>
        </div>
      </div>
      <div class="allmapWapper">
        <div id="allmap"></div>
      </div>
    </div>
    <el-dialog title :visible.sync="dialogTableVisible" @close="handleClose" width="80%">
      <div slot="title" class="header-title fontSize24">
        <img class="gpsImg inline" src="../../assets/images/mapSearch/gps.svg" />
        <p class="inline">
          当前区域：
          <span class="colorH">{{address}}</span>
          &nbsp;&nbsp; 附近{{distance}}KM 以内公司
        </p>
      </div>
      <div class="Maptop">
        <!-- <div class="container_message fontSize20">
          <img src="../../assets/images/Hangye_tishi.svg" alt />
          共为您查询到企业
          <span class="colorH">{{ total }}</span>
          家
        </div>-->
        <span class="fontSize20">查找范围：</span>

        <el-cascader
          placeholder="行业类型"
          ref="refHandle"
          style="width:138px;"
          v-model="hangye_search"
          :options="hangye_data"
          :props="{ checkStrictly: true , label:'value'}"
          @change="handleChangeHang"
          clearable
          filterable
        ></el-cascader>

        <el-select v-model="zhucezb" ref="select" @change="handleSelect" placeholder="注册资本">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="chenglisj" @change="handleSelect" placeholder="成立日期">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="phone" @change="handleSelect" placeholder="联系方式">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="gaoxinqy" @change="handleSelect" placeholder="高新企业">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select v-model="leixing" @change="handleSelect" placeholder="企业类型">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="zibenscdy" @change="handleSelect" placeholder="资本市场">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options5"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="margin-left:50px;">
          共
          <span class="colorH">{{ total }}</span>
          家企业
        </span>
      </div>
      <div class="tableWapper" v-show="total !=0">
        <div class="dialogL inline">
          <div id="ChartsL" style="width:400px;height:230px;"></div>
          <div id="ChartsR" style="width:400px;height:230px"></div>
        </div>
        <div class="dialogR inline">
          <div class="query-result" style="padding:0 !important;">
            <div class="table-wrapper">
              <el-table
                stripe
                :data="gridData"
                id="toChange"
                v-loading="loading"
                style="width: 100%;"
              >
                <el-table-column prop="name" label="企业名称" width="360" align="left">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      class="toChange"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{ scope.row.name }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column>
                <el-table-column prop="fadingdbr" align="center" label="法人代表"></el-table-column>
                <el-table-column prop="zhucezbint" align="center" width="200" label="注册资本(万元)">
                  <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                </el-table-column>
                <el-table-column prop="chenglisj" align="center" label="成立时间">
                  <template
                    slot-scope="{row}"
                  >{{ row.chenglisj?row.chenglisj.substring(0, 10) : '-' }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination" style="padding:0;">
            <el-pagination
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="handleCurrentChange"
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
        </div>
      </div>
      <div class="tableWapper" v-show="total==0">
        <div class="query-result" style="padding:0 !important;">
          <div class="table-wrapper">
            <el-table
              stripe
              :data="gridData"
              id="toChange"
              v-loading="loading"
              style="width: 100%;"
            >
              <el-table-column prop="name" label="企业名称" width="360" align="left">
                <template slot-scope="scope">
                  <router-link
                    target="_blank"
                    tag="a"
                    class="toChange"
                    style="color:#606266;text-decoration:none;"
                    :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                  >{{ scope.row.name }}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column>
              <el-table-column prop="fadingdbr" align="center" label="法人代表"></el-table-column>
              <el-table-column prop="zhucezbint" align="center" width="200" label="注册资本(万元)">
                <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
              </el-table-column>
              <el-table-column prop="chenglisj" align="center" label="成立时间">
                <template
                  slot-scope="{row}"
                >{{ row.chenglisj?row.chenglisj.substring(0, 10) : '-' }}</template>
              </el-table-column>
            </el-table>
          </div>
        </div>

      </div>
    </el-dialog>

    <!-- <div class="mask"></div> -->
  </div>
</template>

<script>
// import BMap from "BMap";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogTable: "",
      gridData: [],
      total: 0,
      page: 1,
      suibian: true,
      loading: true,
      city_data: [],
      hangye_data: [],
      city_search: "",
      sheng: "",
      shi: "",
      hangye_search: "",
      yiji: "",
      erji: "",
      name: "",
      address: "",
      distance: "",
      righttableData: [],
      zhucezb: "",
      chenglisj: "",
      phone: "",
      gaoxinqy: "",
      zibenscdy :'',
      
      leixing: "",
      options: [
        {
          value: "1",
          label: "小于1000万"
        },
        {
          value: "2",
          label: "1000~5000万"
        },
        {
          value: "3",
          label: "5000~10000万"
        },
        {
          value: "4",
          label: "10000万以上"
        }
      ],
      options1: [
        {
          value: "1",
          label: "成立1年内"
        },
        {
          value: "2",
          label: "成立1-3年"
        },
        {
          value: "3",
          label: "成立3-5年"
        },
        {
          value: "4",
          label: "成立5-10年"
        },
        {
          value: "5",
          label: "10年以上"
        }
      ],
      options2: [
        {
          value: "1",
          label: "有联系方式"
        },
        {
          value: "2",
          label: "无联系方式"
        }
      ],
      options3: [
        {
          value: "1",
          label: "是高新企业"
        },
        {
          value: "0",
          label: "非高新企业"
        }
      ],
      options4: [
        {
          value: "1",
          label: "大陆企业"
        },
        {
          value: "2",
          label: "港澳台企业"
        },
        {
          value: "3",
          label: "外资企业"
        },
        {
          value: "4",
          label: "国有企业"
        }
      ],
      options5: [
        {
          value: "2",
          label: "A股公司"
        },
        {
          value: "3",
          label: "三板公司"
        },
        {
          value: "4",
          label: "四板公司"
        },
        {
          value: "5",
          label: "已私募"
        }
      ],
      showTable: true
    };
  },
  watch: {
    sheng() {
      this.getCity();
    },
    shi() {
      this.getCity();
    }
  },
  created() {},
  mounted() {
    var self = this;
    self.drawMap();
    self.citylist();
    self.hangyelist();

    document.getElementById("allmap").style.minHeight =
      document.getElementById("leftNav").offsetHeight - 102 + "px";
    console.log(document.getElementById("allmap").style.minHeight, "ddd");
  },
  methods: {
    openDialog(){
      var self=this
      self.dialogTableVisible = true
       self.getMapCompanyLists();
        self.Rightlist();
        self.Leftlist();
    },
    handleSelect() {
      var self = this;
      console.log(123);
      self.page = 1;
      self.Leftlist();
      self.Rightlist();
      self.getMapCompanyLists();
    },
    handleClose() {
      var self = this;
      (self.zhucezb = ""),
        (self.chenglisj = ""),
        (self.phone = ""),
        (self.gaoxinqy = "");
      self.leixing = "";
      self.hangye_search = [];
      self.yiji = "";
      self.erji = "";
      self.zibenscdy = "";
      self.showTable = true;
    },

    handleChange(value) {
      var self = this;
      self.sheng = value[0] ? value[0] : "";
      self.shi = value[1] ? value[1] : "";
      console.log(self.sheng);
      console.log(self.shi);
      this.page = 1;
      // this.Gongxinjsqy()
    },
    handleChangeHang(value) {
      var self = this;
      self.yiji = value[0] ? value[0] : "";
      self.erji = value[1] ? value[1] : "";
      console.log(self.yiji);
      console.log(self.erji);
      self.Leftlist();
      self.Rightlist();
      self.getMapCompanyLists();
      self.page = 1;
      // this.Gongxinjsqy()
    },
    paginationsy() {
      if (this.page === 1) {
      } else {
        // this.page = 1
        this.handleCurrentChange(1);
      }
    },
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;

      //分页--判断当前页是否为最后一页，禁用右按钮  start
      var cot = Math.ceil(self.total / 10);
      self.suibian = false; //是否禁用首页按钮
      //分页--判断当前页是否为最后一页，禁用右按钮  end
      self.getMapCompanyLists();
    },
    getCity() {
      var self = this;
      self.map.clearOverlays();
      self.dialogTable = false;
      if (self.shi) {
        self.map.centerAndZoom(self.shi, 10);
      } else if (self.sheng) {
        self.map.centerAndZoom(self.sheng, 7);
      } else {
        self.map.centerAndZoom("全国", 5);
      }
    },
    drawMap() {
      var self = this;

      // 百度地图API功能
      var map = new BMap.Map("allmap");
      self.map = new BMap.Map("allmap");
      self.getCity(map);

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

      // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
      //实例化鼠标绘制工具
      var drawingManager = new BMapLib.DrawingManager(self.map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_LEFT, //位置
          offset: new BMap.Size(5, 5), //偏离值
          drawingModes: [BMAP_DRAWING_CIRCLE]
        },
        circleOptions: {
          fillColor: "#87CEFA",
          strokeWeight: 1,
          fillOpacity: 0.3,
          strokeOpacity: 0.3
        }
      });
      // 创建地理编码实例
      var myGeo = new BMap.Geocoder();

      //添加鼠标绘制工具监听事件，用于获取绘制结果
      drawingManager.addEventListener("circlecomplete", function(e, overlay) {
        self.map.clearOverlays();
        var circleLay = overlay;
        self.map.addOverlay(circleLay);
        drawingManager.close();
        var radius = parseInt(e.getRadius());
        var center = e.getCenter();
        console.log(center);
        self.distance = radius / 1000;
        self.dialogTable = true;
        // 根据坐标得到地址描述
        myGeo.getLocation(new BMap.Point(center.lng, center.lat), function(
          result
        ) {
          if (result) {
            // alert(result.address);
            self.address = result.address;
          }
        });
        self.longitude = center.lng;
        self.latitude = center.lat;
        self.getMapCompanyList(self.map);
        self.getMapCompanyLists();
        self.Rightlist();
        self.Leftlist();
        self.dialogTableVisible = true;
      });
      // 创建控件
      var myZoomCtrl = new ZoomControl();
      // 添加到地图当中
      map.addControl(myZoomCtrl);
    },
    //请求城市列表
    citylist() {
      var self = this;
      this.axios({
        url: this.api.LXshengshiapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.city_data = res.data.data;
      });
    },
    //请求行业列表
    hangyelist() {
      var self = this;
      this.axios({
        url: this.api.Industrysapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.hangye_data = res.data.data;
      });
    },
    //查询框
    citySearch() {
      var self = this;
      let params = {
        province: self.sheng ? self.sheng : "全国",
        city: self.shi,
        keyword: self.name
      };
      this.axios({
        url: this.api.CokeywordsearchapimKebilist,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.punctuation(res.data.data);
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
    //请求列表
    getMapCompanyLists() {
      var self = this;
      let params = {
        longitude: self.longitude,
        latitude: self.latitude,
        distance: self.distance,
        oldhangye: self.yiji,
        oldejhangye: self.erji,
        type: self.zhucezb,
        lianxidh: self.phone,
        leixing: self.leixing,
        isGx: self.gaoxinqy,
        age: self.chenglisj,
        zibenscdy:self.zibenscdy,
        page: self.page,
        limit: 10
      };
      this.axios({
        url: this.api.Park_MapList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.loading = false;
        self.gridData = res.data.data;
        self.total = res.data.count;
        var right = document.getElementsByClassName("btn-next");
        right[0].disabled = "";
        // 分页--下一页disabled
        var cot = Math.ceil(self.total / 10);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        }
        if (self.page == 1) {
          self.suibian = true;
        }
        // self.punctuation(map, res.data.data);
      });
    },
    punctuation(data_info) {
      var self = this;
      for (var i = 0; i < data_info.length; i++) {
        var marker = new BMap.Marker(
          new BMap.Point(data_info[i].location.lon, data_info[i].location.lat)
        ); // 创建标注
        var content = `<a style="cursor:pointer;color:#cf111b;font-weight:600;display:inline-block;margin-bottom:6px;" class="GoDetails">${data_info[i].name}</a></br><a>地址：${data_info[i].zhucedz}</a>`;
        self.map.addOverlay(marker); // 将标注添加到地图中
        self.addClickHandler(content, marker);
      }
    },

    addClickHandler(content, marker) {
      var self = this;
      marker.addEventListener("click", function(e) {
        var p = e.target;
        var opts = {
          width: 250, // 信息窗口宽度
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
    Leftlist() {
      var self = this;
      let params = {
        longitude: self.longitude,
        latitude: self.latitude,
        distance: self.distance,
        oldhangye: self.yiji,
        oldejhangye: self.erji,
        type: self.zhucezb,
        lianxidh: self.phone,
        leixing: self.leixing,
        age: self.chenglisj
      };
      this.axios({
        url: this.api.Park_leftBing,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.lefttableData = res.data.data;
        self.ChartsL();
      });
    },
    ChartsL() {
      var self = this;
      self.charts = this.$echarts.init(document.getElementById("ChartsL"));
      var option = {
        title: {
          text: "行业统计Top5",
          left: "center",
          bottom: "0",
          textStyle: {
            //图例文字的样式
            color: "#333",
            fontSize: 16
          }
        },
        tooltip: {
          textStyle: {
            fontSize: 16
          },
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            name: " ",
            type: "pie",
            radius: "63%",
            center: ["50%", "45%"],
            data: self.lefttableData,
            label: {
              //饼图图形上的文本标签
              normal: {
                show: true,
                textStyle: {
                  fontWeight: 300,
                  fontSize: 16 //文字的字体大小
                }
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      self.charts.setOption(option);
    },
    Rightlist() {
      var self = this;
      let params = {
        longitude: self.longitude,
        latitude: self.latitude,
        distance: self.distance,
        oldhangye: self.yiji,
        oldejhangye: self.erji,
        type: self.zhucezb,
        lianxidh: self.phone,
        leixing: self.leixing,
        age: self.chenglisj
      };
      this.axios({
        url: this.api.Park_rightBing,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res.data.data, "chartleft");
        self.righttableData = res.data.data;
        self.ChartsR();
      });
    },
    ChartsR() {
      var self = this;
      console.log(self.righttableData, "self.righttableData");
      self.charts1 = this.$echarts.init(document.getElementById("ChartsR"));
      var option1 = {
        title: {
          text: "注册资金统计",
          left: "center",
          bottom: "0",
          textStyle: {
            //图例文字的样式
            color: "#333",
            fontSize: 16
          }
        },
        tooltip: {
          textStyle: {
            fontSize: 16
          },
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            name: " ",
            type: "pie",
            radius: "63%",
            center: ["50%", "45%"],
            data: self.righttableData,
            label: {
              //饼图图形上的文本标签
              normal: {
                show: true,
                textStyle: {
                  fontWeight: 300,
                  fontSize: 16 //文字的字体大小
                }
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      self.charts1.setOption(option1);
    }
  }
};
</script>

<style lang="scss">
#mapSearch {
  height: 100%;
  body,
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: "微软雅黑";
  }
  #allmap {
    width: 100%;
  }
  p {
    margin-left: 5px;
  }
  .allmapWapper {
    padding: 10px;
    background: #ffffff;
  }
  .el-dialog {
    border-radius: 6px;
  }
  .el-dialog__body {
    color: #000;
    padding: 10px 30px 20px;
  }
  .Maptop {
    padding-bottom: 10px;
    .container_message {
      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-left: 10px;
        margin-bottom: 5px;
      }
      .GoMap {
        cursor: pointer;
      }
      height: 40px;
      background: rgba(207, 17, 27, 0.1);
      border: 1px solid rgba(241, 104, 111, 1);
      border-radius: 4px;
      line-height: 40px;
    }
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #000;
  }
  .gpsImg {
    width: 19px;
    height: 24px;
  }

  .controlCity {
    border: 1px solid rgba(233, 233, 233, 1);
    border-radius: 4px;
    position: relative;
    top: -4px;
    // padding: 0 9px;
    margin: 0 10px 0 20px;
    .el-input__icon {
      line-height: 36px;
    }
    .el-cascader .el-input .el-icon-arrow-down {
      font-size: 20px;
    }
    .control {
      font-weight: 400;
      padding: 0 20px;
      border-right: 1px solid #999;
      height: 20px;
      display: inline-block;
    }
    .el-input__inner {
      border: none;
    }
  }

  .BMapLib_box {
    background-size: auto 36px;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #ffffff;
  }
  .dialogR {
    width: calc(100% - 430px);
  }
  .dialogL {
    width: 430px;
    vertical-align: top;
  }
  .BMapLib_Drawing_panel {
    height: 50px;
    border: none;
    .BMapLib_hander {
      background-image: url(../../assets/images/mapSearch/handleR.svg);
    }
    .BMapLib_hander_hover {
      background-image: url(../../assets/images/mapSearch/handleW.svg);
      background-color: #cf111b;
    }
    .BMapLib_circle {
      background-image: url(../../assets/images/mapSearch/ballR.svg);
    }
    .BMapLib_circle_hover {
      background-image: url(../../assets/images/mapSearch/ballw.svg);
      background-color: #cf111b;
    }
  }
  .query-result .el-table__header {
    line-height: 5px;
  }
  .el-table td {
    padding: 0;
  }
  .el-table tr {
    height: 40px;
    color: black;
  }
  .el-dropdown-link {
    cursor: pointer;
    // color: #409EFF;
  }
  // .el-input__inner:nth-child(1) {
  //   width: 170px;
  // }
  .Maptop {
    .el-select {
      width: 148px;
    }
    .el-input__inner::placeholder {
      color: #000;
    }
    .el-cascader .el-input .el-icon-arrow-down {
      color: #000;
      font-size: 20px;
    }
    .el-input__inner {
      width: 140px;
      border: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .el-select .el-input .el-select__caret {
      color: #000;
    }
    
  }
  .el-dialog__header {
      padding: 10px 20px;
      background: #eee !important;
      border-radius: 6px 6px 0 0;
    }
    /* 消息内容 */
.BMap_bubble_content {
	background-color:#fffdf5;
	padding-left:10px;
	padding-right:10px;
	padding-top:5px;
	padding-bottom:10px;
}
/* 内容 */
.BMap_pop div:nth-child(9) {
	top:35px !important;
	border-radius:7px;
}
.BMap_top {
	display:none;
}
.BMap_bottom {
	display:none;
}
.BMap_center {
	display:none;
}
/* 隐藏边角 */
.BMap_pop div:nth-child(1) div {
	display:none;
}
.BMap_pop div:nth-child(3) {
	display:none;
}
.BMap_pop div:nth-child(5) {
	display:none;
}
.BMap_pop div:nth-child(7) {
	display:none;
}
.BMap_shadow div:nth-child(7) {
	display:none;
}
}
.el-dropdown,
.el-dropdown-menu__item {
  font-size: 20px;
  color: #000;
}
.el-input__icon {
  line-height: 36px;
}
</style>