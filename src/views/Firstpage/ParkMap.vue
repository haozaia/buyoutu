<template>
  <div id="parkMap">
    <div id="C_content">
      <div class="C_title">
        <span class="Title_left"></span>园区详情 -
        <span>{{ this.parkname }} &nbsp;</span>
        <div class="YuanquLv">
          <!-- <div class="fanwei">请选择范围</div> -->
          <!-- <i class="FenGe"></i> -->
          <!-- <select class="FanweiLv" v-model="paiming">
                <option v-for="item in paimingOptions" :key="item.value" :label="item.value" :value="item.lable"></option>
          </select>-->
          <div class="form-group Search_Down_input">
            <el-select v-model="paiming" class="park_teInput Search_Down_input">
              <el-option
                v-for="item in paimingOptions"
                :key="item.value"
                :label="item.value"
                :value="item.lable"
              ></el-option>
            </el-select>
          </div>
        </div>
        <button class="Look_X" v-show="this.Jt_Close == false" @click="Look_Q">详情</button>
        <span ref="qiye_shu" class="Qiye_Shu" style>
          共
          <i class="colorH">{{ this.Z_total }}</i> 家企业
        </span>
        <el-button class="rtPark" @click="rtPark" type="primary">返回</el-button>
      </div>
      <div class="park-content">
        <div class="Maptop">
          <!-- <div class="container_message fontSize20">
            <img src="../../assets/images/Hangye_tishi.svg" alt />
            当前园区：<span> {{ this.parkname }} &nbsp;</span> 
          </div>-->
          <!-- <div class="YuanquLv">
                <div class="fanwei">请选择范围</div>
                <i class="FenGe"></i>
                <select class="FanweiLv" v-model="paiming">
                    <option v-for="item in paimingOptions" :key="item.value" :label="item.value" :value="item.lable"></option>
                </select>
          </div>-->
          <!-- <button class="Look_X" v-show="this.Jt_Close == false" @click="Look_Q">查看详情</button> -->
          <!-- <span ref="qiye_shu" class="Qiye_Shu" style="">共为您查询到企业 <i class="colorH">{{ this.Z_total }}</i> 家</span> -->
        </div>
        <!-- <div class="YuanquLv">
            <div class="fanwei">请选择范围</div>
            <select class="FanweiLv" v-model="paiming">
                <option v-for="item in paimingOptions" :key="item.value" :label="item.value" :value="item.lable"></option>
            </select>
        </div>-->
        <div class="container_flex">
          <div id="container"></div>
          <div class="drawer" v-show="Jt_Close">
            <div class="Charts_flex">
              <!-- 饼图左 -->
              <div id="ChartsL" style="width:100%;height:190px;"></div>
              <!-- 饼图右 -->
              <div id="ChartsR" style="width:100%;height:190px"></div>
            </div>
            <div class="el-tabs">
              <div class="query-result">
                <template>
                  <div class="table-wrapper">
                    <el-table height="483" :empty-text="tishi" stripe :data="tableData" v-loading="loading" style="width: 100%">
                      <el-table-column prop="name" label="公司名称" width="340px" align="left">
                        <template slot-scope="scope">
                          <router-link
                            target="_blank"
                            tag="a"
                            style="color:#606266;text-decoration:none;"
                            :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                          >{{ scope.row.name }}</router-link>
                        </template>
                      </el-table-column>
                      <el-table-column prop="fadingdbr" label="法定代表人" align="center"></el-table-column>
                      <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center" ></el-table-column>
                    </el-table>
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
                      <el-button
                        size="small"
                        :disabled="suibian"
                        class="paginationsy"
                        @click="paginationsy"
                      >首页</el-button>
                    </div>
                    <!-- 分页dom end -->
                  </div>
                </template>
              </div>
              <!-- <div class="drawer_JT" @click="JtClose"></div> -->
              <i class="drawer_JT" @click="JtClose">
                <img src="../../assets/images/Map_Jiant.svg" alt />
              </i>
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
      parkname: "", //园区名称
      location: "", //园区坐标
      centerPoint: "", //拆分后
      Jt_Close: true, //列表弹框默认显示
      total: 0,
      Z_total: "",
      page: 1,
      suibian: true, //分页变量3
      tishi: "正在查询...",
      loading: true,
      tableData: [],
      lefttableData: [], //饼状图行业统计TOP5（左）
      righttableData: [], //饼状图注册资本区间统计（右）
      messageName: "",
      Mapinfo_data: [], //标注点坐标信息
      distance: "1", //范围
      GoShowMap: "", //标点时获取范围的值（绘制圆1转1000）
      paimingOptions: [
        {
          value: "附近1Km",
          lable: "1000"
        },
        {
          value: "附近2Km",
          lable: "2000"
        },
        {
          value: "附近5Km",
          lable: "5000"
        },
        {
          value: "附近10Km",
          lable: "10000"
        },
        {
          value: "附近20Km",
          lable: "20000"
        }
      ],
      paiming: "1000"
    };
  },
  mounted() {
    var self = this;
    self.parkname = Base64.decode(this.$route.query.parkname);
    self.location = Base64.decode(this.$route.query.location);
    // console.log(self.location,"555")
    self.centerPoint = self.location.split(",");
    // this.TobdMap(centerPoint[0],centerPoint[1])
    // 请求列表
    this.MapBiao();
    // 左饼状图数据
    this.Leftlist();
    // 右饼状图数据
    this.Rightlist();
    // 左饼状图表
    this.ChartsL();
    // 右饼状图表
    this.ChartsR();
    // this.add_overlay() //创建圆
    this.MapList();
    document.getElementById("container").style.minHeight =
    document.getElementById("leftNav").offsetHeight - 102 + "px";
    console.log(document.getElementById("container").style.minHeight,"高度")
  },
  watch: {
    paiming(val) {
      this.MapBiao(val);
      this.MapList(val);
      this.Leftlist(val);
      this.Rightlist(val);
    }
  },
  methods: {
    // 饼图左
    Leftlist(Range) {
      var self = this;
      // console.log(self.centerPoint[0])
      // console.log(self.centerPoint[1])
      // console.log(Range)
      if (Range == undefined) {
        Range = 1;
        self.GoShowMap = 1000;
      } else if (Range == 1000) {
        Range = 1;
        self.GoShowMap = 1000;
      } else if (Range == 2000) {
        Range = 2;
        self.GoShowMap = 2000;
      } else if (Range == 5000) {
        Range = 5;
        self.GoShowMap = 5000;
      } else if (Range == 10000) {
        Range = 10;
        self.GoShowMap = 10000;
      } else if (Range == 20000) {
        Range = 20;
        self.GoShowMap = 20000;
      }
      let params = {
        longitude: self.centerPoint[0],
        latitude: self.centerPoint[1],
        distance: Range
      };
      this.axios({
        url: this.api.Park_leftBing,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data,"chartleft")
        self.lefttableData = res.data.data;
        self.ChartsL();
      });
    },
    ChartsL() {
      var self = this;
      // console.log(self.lefttableData,"self.lefttableData")
      self.charts = this.$echarts.init(document.getElementById("ChartsL"));
      var option = {
        title: {
          text: "行业统计Top5",
          // subtext: '纯属虚构',
          left: "center",
          top: "-2"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        // },
        series: [
          {
            name: " ",
            type: "pie",
            radius: "75%",
            center: ["50%", "60%"],
            data: self.lefttableData,
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
    //饼图右
    Rightlist(Range) {
      var self = this;
      if (Range == undefined) {
        Range = 1;
        self.GoShowMap = 1000;
      } else if (Range == 1000) {
        Range = 1;
        self.GoShowMap = 1000;
      } else if (Range == 2000) {
        Range = 2;
        self.GoShowMap = 2000;
      } else if (Range == 5000) {
        Range = 5;
        self.GoShowMap = 5000;
      } else if (Range == 10000) {
        Range = 10;
        self.GoShowMap = 10000;
      } else if (Range == 20000) {
        Range = 20;
        self.GoShowMap = 20000;
      }
      let params = {
        longitude: self.centerPoint[0],
        latitude: self.centerPoint[1],
        distance: Range
      };
      this.axios({
        url: this.api.Park_rightBing,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data, "chartleft");
        self.righttableData = res.data.data;
        self.ChartsR();
      });
    },
    ChartsR() {
      var self = this;
      // console.log(self.righttableData, "self.righttableData");
      self.charts1 = this.$echarts.init(document.getElementById("ChartsR"));
      var option1 = {
        title: {
          text: "注册资金统计",
          // subtext: '纯属虚构',
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        // },
        series: [
          {
            name: " ",
            type: "pie",
            radius: "75%",
            center: ["50%", "60%"],
            data: self.righttableData,
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
    },

    //坐标转换
    // TobdMap(x, y) {
    //     var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    //     var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    //     var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    //     var bd_lon = z * Math.cos(theta) + 0.0065;
    //     var bd_lat = z * Math.sin(theta) + 0.006;
    //     var pt =new BMap.Point(bd_lon,bd_lat);
    //     console.log(pt,"pt")
    //     return pt;
    // },
    ShowMap(Range) {
      var self = this;
      // console.log(Range,"Range")
      if (Range == undefined) {
        Range = 1000;
      }
      // var CenterPoint = self.location.split(',')
      var map = new BMap.Map("container"); // 创建地图实例
      var point = new BMap.Point(self.centerPoint[0], self.centerPoint[1]); // 创建点坐标
      map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); // 开启滚轮缩放
      // var marker = new BMap.Marker(new BMap.Point(self.centerPoint[0],self.centerPoint[1]));        // 创建标注
      var circle = new BMap.Circle(point, Range, {
        strokeColor: "#afbfdc",
        strokeWeight: 1,
        fillColor: "#00a0e9",
        fillOpacity: 0.15
      }); //创建圆
      // map.addOverlay(marker);                     // 将标注添加到地图中

      // 多个标注 start
      var data_info = self.Mapinfo_data;
      var opts = {
        width: 280, // 信息窗口宽度
        // height: 80, // 信息窗口高度
        BackgroundColor:"#000",
        // title : "公司名称：" , // 信息窗口标题
        offset: { height: -12, width: -6 },
        enableMessage: true //设置允许信息窗发送短息
      };
      for (var i = 0; i < data_info.length; i++) {
        var marker = new BMap.Marker(
          new BMap.Point(data_info[i].location.lon, data_info[i].location.lat)
        ); // 创建标注
        var content = `<a style="cursor:pointer;color:#cf111b;font-weight:600;margin-bottom:6px;display:inline-block;" class="GoDetails">${data_info[i].name}</a></br><a>地址：${data_info[i].zhucedz}</a>`;
        // self.messageName = data_info[i].name
        // console.log(self.messageName,"messageName")
        map.addOverlay(marker); // 将标注添加到地图中
        addClickHandler(content, marker);
      }
      function addClickHandler(content, marker) {
        marker.addEventListener("click", function(e) {
          openInfo(content, e);
        });
      }
      function openInfo(content, e) {
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, point); //开启信息窗口
        // console.log(content,"content")
        setTimeout(() => {
          // console.log(document.querySelector(".GoDetails"),"sss")
          var GoDetails = document.querySelector(".GoDetails");
          GoDetails.addEventListener("click", function(e) {
            // console.log(e.path[0].childNodes,"eeeeeeee")
            let routeUrl = self.$router.resolve({
              path: "/CompanyDetails",
              query: { name: Base64.encode(e.path[0].childNodes[0].data) }
            });
            window.open(routeUrl.href, "_blank");
          });
        });
      }
      // 多个标注 end

      map.addOverlay(circle); //将圆添加到地图中
    },

    MapList(Range) {
      var self = this;
      var D_istance = self.paiming / 1000;
      // if(Range == undefined){
      //     Range = 1
      // }else if(Range == 1000){
      //     Range = 1
      // }else if(Range == 2000){
      //     Range = 2
      // }else if(Range == 5000){
      //     Range = 5
      // }else if(Range == 10000){
      //     Range = 10
      // }else if(Range == 20000){
      //     Range = 20
      // }
      let params = {
        page: self.page,
        limit: 10,
        longitude: self.centerPoint[0],
        latitude: self.centerPoint[1],
        distance: D_istance
      };
      this.axios({
        url: this.api.Park_MapList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.count)
        self.loading = false;
        self.tableData = res.data.data;
        self.total = res.data.count;
        self.Z_total = res.data.count;
        var right = document.getElementsByClassName("btn-next");
        right[0].disabled = "";
        if (res.data.count == 0) {
          self.tishi = "暂无数据";
        }
        // 分页--下一页disabled
        var cot = Math.ceil(self.total / 10);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        }
        if (self.page == 1) {
          self.suibian = true;
        }
        // 分页--下一页disabled
      });
    },
    MapBiao(Range) {
      var self = this;
      if (Range == undefined) {
        Range = 1;
        self.GoShowMap = 1000;
      } else if (Range == 1000) {
        Range = 1;
        self.GoShowMap = 1000;
      } else if (Range == 2000) {
        Range = 2;
        self.GoShowMap = 2000;
      } else if (Range == 5000) {
        Range = 5;
        self.GoShowMap = 5000;
      } else if (Range == 10000) {
        Range = 10;
        self.GoShowMap = 10000;
      } else if (Range == 20000) {
        Range = 20;
        self.GoShowMap = 20000;
      }
      let params = {
        longitude: self.centerPoint[0],
        latitude: self.centerPoint[1],
        distance: Range
      };
      this.axios({
        url: this.api.Park_MapBiao,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data)
        self.Mapinfo_data = res.data.data;
        self.ShowMap(self.GoShowMap);
      });
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
      self.page = val;
      //分页--判断当前页是否为最后一页，禁用右按钮  start
      var cot = Math.ceil(self.total / 10);
      self.suibian = false; //是否禁用首页按钮
      //分页--判断当前页是否为最后一页，禁用右按钮  end
      // console.log(self.page);
      self.MapList();
    },
    rtPark() {
      window.history.go(-1);
    },
    JtClose() {
      var self = this;
      self.Jt_Close = false;
      // var Qiye_Shu = document.getElementsByClassName('Qiye_Shu')[0]
      // Qiye_Shu.style.marginLeft = "43px"
      // console.log(this.$refs.qiye_shu.style,"this.$refs.qiye_shu.style")
      // this.$refs.qiye_shu.style.marginLeft = "43px"
    },
    Look_Q() {
      var self = this;
      self.Jt_Close = true;
      // var Qiye_Shu = document.getElementsByClassName('Qiye_Shu')[0]
      // Qiye_Shu.style.marginLeft = "148px"
    }
  }
};
</script>
<style lang="scss" scoped>
html {
  height: 100%;
  body {
    height: 100%;
    margin: 0px;
    padding: 0px;
    .C_title {
      //范围选择下拉框
      .YuanquLv {
        // background:rgba(255,255,255,1);
        // border:1px solid rgba(233,233,233,1);
        // border-radius:4px 4px 0px 4px;
        margin-left: 30px;
        // position: absolute;
        // left: 50px;
        // top: 102px;
        // z-index: 2;
        display: inline-block;
        // .fanwei{
        //     float: left;
        //     line-height: 34px;
        //     font-size: 20px;
        //     text-align: center;
        //     width: 120px;
        //     color: #CF111B;
        // }
        // .FenGe{
        //     display: inline-block;
        //     width:1px;
        //     height:20px;
        //     background:rgba(153,153,153,1);
        //     box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.12);
        //     margin: 0 15px;
        //     vertical-align: text-top;
        // }
        // .FanweiLv{
        //     outline: none;
        //     border: none;
        //     font-size: 20px;
        //     width: 150px;
        //     height: 34px;
        // }
        // .Search_Down_input{
        //     width: 180px;
        //     .el-input{
        //         .el-input__suffix-inner{
        //             .el-input__icon{
        //                 height: 36px !important;
        //             }

        //         }
        //     }
        // }
      }
      // 查看详情按钮
      .Look_X {
        // position: absolute;
        // top: 102px;
        // left: 380px;
        // z-index: 2;
        margin-left: 10px;
        width: 80px;
        height: 36px;
        // line-height: 36px;
        border: 1px solid #cf111b;
        color: #fff;
        font-size: 20px;
        font-family: Source Han Sans SC;
        background: rgba(207, 17, 27, 1);
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
      }
      .Qiye_Shu {
        font-size: 20px;
        color: #000;
        height: 36px;
        line-height: 36px;
        margin-left: 10px;
      }
    }
    .park-content {
      padding: 0 4px 4px 4px;
      position: relative;
      background: #fff;
      .Maptop {
        padding-bottom: 3px;
        display: flex;
        .container_message {
          img {
            width: 20px;
            height: 20px;
            vertical-align: middle;
            // margin-left: 10px;
            margin-bottom: 5px;
          }
          .GoMap {
            cursor: pointer;
          }
          height: 36px;
          // background: rgba(207, 17, 27, 0.1);
          // border: 1px solid rgba(241, 104, 111, 1);
          // border-radius: 4px;
          line-height: 36px;
        }
      }
      .container_flex {
        display: flex;
        // 地图
        #container {
          // min-height: 750px;
          flex: 5;
        }
        // 弹框列表
        .drawer {
          position: relative;
          // right: 0;
          // top: 56px;
          // bottom: 0;
          // left: 50%;
          flex: 5;
          background: #fff;
          border-radius: 6px;
          // .drawer_JT{
          // position: absolute;
          // background-color: rgb(104, 33, 33);
          // width: 80px;
          // height: 80px;
          // border-radius: 50%;
          // left: -40px;
          // top: 45%;
          // background-image: url("../../assets/images/MapJiantou.svg");
          // background-repeat: no-repeat;
          // background-size: 24px 24px;
          // background-position-x: 25%;
          // background-position-y: 50%;
          // cursor: pointer;
          // }
          .drawer_JT {
            width: 40px;
            height: 90px;
            display: block;
            position: absolute;
            top: 45%;
            left: -40px;
            text-align: center;
            line-height: 90px;
            cursor: pointer;
            background-image: url("../../assets/images/Map_JianTou.png");
            img {
                width: 14px;
                height: 24px;
                margin-left: 16px;
                margin-top: 35px;
            }
          }
          .query-result .table-wrapper {
            padding: 0 25px 5px 25px;
            .el-table__header {
              line-height: 18px !important;
            }
          }

          //修改滚动条
          // .table-wrapper>>>.el-table__body-wrapper::-webkit-scrollbar {
          //     color: #02d8fa;
          //     width: 4px;
          // }
          .query-result {
            padding: 0 5px !important;
            margin-top: 10px;
          }
          #Pagination {
            padding-bottom: 0;
          }
          .Charts_flex {
            display: flex;
            justify-content: space-around;
            .ChartsL {
              flex: 5;
            }
            .ChartsR {
              flex: 5;
            }
          }
        }
      }
    }
  }
}

</style>

<style lang="scss">
#parkMap {
  .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px; 
    height: 6px;
  }
  .el-table__row>td:first-child{
    text-align: left !important;
  }
  .query-result .el-table__header {
    line-height: 5px;
  }
  .el-table td {
    padding:  0;
  }
  .el-table tr {
    height: 40px;
    color: black;
  }
  /*地图标题*/
// .BMap_bubble_title {
// 	color:white;
// 	font-size:13px;
// 	font-weight:bold;
// 	text-align:left;
// 	padding-left:5px;
// 	padding-top:5px;
// 	border-bottom:1px solid gray;
// 	background-color:#0066b3;
// }
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
/* 左上角删除按键 */
// .BMap_pop img {
// 	top:43px !important;
// 	left:215px !important;
// }
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
</style> 