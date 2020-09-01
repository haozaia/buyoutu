<template>
  <div id="C_content" class="distributionMap">
    <div class="el-tab" id="mapTab">
      <div class="distributionMapWapper" style="height:80vh;">
        <div
          class="echartsPat"
          :style="{height:'80vh',width:'100%'}"
          id="distributionMap"
          ref="distributionMap"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../node_modules/echarts/map/js/china";

// import "../../styles/js/china.js"
// const echarts = require('../../../node_modules/echarts');

export default {
  data() {
    return {
      distributionMap: [],
      tabView: "select1",
      shengfenLx: true,
      chainTitle: "",
      mapName: "高新技术企业",
      chain: {},
      chainChild: {},
      form: {
        sheng: "",
        shi: ""
      },
      suoshuhy: "",
      tag: "",
      year: [],
      dataFrom: [],
      geoCoordMap: {},
      strdate: "",
      enddate: "",
      distribuTimer: "",
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getFullYear() < "1990" ||
            time.getFullYear() > new Date().getFullYear()
          ); // 注意是 || 不是 && 哦
        }
      }
    };
  },
  created() {
    var self = this;
    self.getChain();
  },

  mounted() {
    var self = this;
    this.$nextTick(function() {
      setTimeout(() => {
        self.showFullScreen("mapTab");
      }, 300);
    });
  },
  watch: {},
  methods: {
    checkFull() {
      var self = this;
      $(".distributionMapWapper").css("height", "80vh");
      $(".echartsPat").css("height", "80vh");
      clearInterval(self.distribuTimer);
      self.suoshuhy = "装备制造";
      self.tag = "";
      self.strdate = "";
      self.enddate = "";
      self.getErn();
      self.country();
      setTimeout(() => {
        self.drawChinaMap();
      }, 100);
    },
    //全屏事件
    launchFullscreen(element) {
      var self = this;
      console.log(self.chain);
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
      $(".distributionMapWapper").css("height", "100vh");
      $(".echartsPat").css("height", "100vh");
      self.strdate = "";
      self.enddate = "";
      self.suoshuhy = "装备制造";
      self.tag = "";
      self.country();
      setTimeout(() => {
        self.drawChinaMap();
      }, 100);

      const len = self.chain.length;
      let i = 1;
      self.distribuTimer = setInterval(() => {
        if (i < len) {
          self.suoshuhy = self.chain[i].yijihy;
          console.log(self.suoshuhy);
          i++;
          self.country();
        } else {
          i = 0;
        }
      }, 18000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(self.distribuTimer);
        self.distribuTimer = null;
      });
    },
    showFullScreen(id) {
      var self = this;
      var elm = document.getElementById(id);
      self.launchFullscreen(elm);
    },
    //时间
    dataTime(val) {
      var self = this;
      console.log(val);
      if (self.strdate != "" && self.enddate != "") {
        if (self.strdate < self.enddate) {
          self.country();
        } else {
          this.$message({
            message: "请选择正确的日期范围",
            type: "warning"
          });
          self.strdate = "";
          self.enddate = "";
        }
      }
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
        self.country();
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
        self.country();
      });
    },
    country() {
      var self = this;
      let params = {
        chanyelain: self.suoshuhy ? self.suoshuhy : "装备制造",
        chanye: self.tag,
        strdate: self.strdate,
        enddate: self.enddate
      };
      this.axios({
        url: this.api.industryChainChanyefenbu,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        let data = res.data.data;
        //年份数组
        self.year = data.map(function(singleEl) {
          singleEl = singleEl.nianfen;
          return singleEl;
        });
        //省中心坐标
        self.geoCoordMap = data[0].list.map(function(singleEl) {
          // console.log(singleEl.jingweidu.split(","))
          let jingweidu = JSON.stringify(
            singleEl.jingweidu ? singleEl.jingweidu.split(",") : ""
          );
          let str = '{"' + singleEl.suoshusf + '":' + jingweidu + "}";
          singleEl = JSON.parse(str);
          // console.log(singleEl)
          return singleEl;
        });
        //省市数量
        self.dataFrom = data.map(function(singleEl) {
          var dataGeo = {};

          singleEl = singleEl.list.map(function(_singleEl) {
            let str =
              '{"' + _singleEl.suoshusf + '":"' + _singleEl.count + '"}';
            _singleEl = JSON.parse(str);
            // console.log(_singleEl)
            return _singleEl;
          });
          for (let i = 0; i < singleEl.length; i++) {
            Object.assign(dataGeo, singleEl[i]);
          }
          // console.log(dataGeo)
          singleEl = dataGeo;
          return singleEl;
          // console.log(singleEl)
        });
        var arrGeo = {};
        for (let i = 0; i < self.geoCoordMap.length; i++) {
          Object.assign(arrGeo, self.geoCoordMap[i]);
        }
        self.geoCoordMap = arrGeo;

        // console.log(self.year);
        // console.log(self.geoCoordMap);
        // console.log(self.dataFrom);
        setTimeout(function() {
          self.drawChinaMap();
        }, 100);

        // singleEl.value = singleEl.value;
        //   singleEl.name = singleEl.suoshusf
        //     .replace("省", "")
        //     .replace("市", "")
        //     .replace("壮族自治区", "")
        //     .replace("维吾尔自治区", "")
        //     .replace("回族自治区", "")
        //     .replace("自治区","")
        //     .replace(" ", "");
      });
    },

    drawChinaMap() {
      var self = this;
      let max = Math.max.apply(
        Math,
        self.distributionMap.map(function(o) {
          return o.value;
        })
      );
      let myChart = this.$echarts.init(
        document.getElementById("distributionMap")
      );
      var options = {};
      //   var uploadedDataURL = "/asset/get/s/data-1528971808162-BkOXf61WX.json";

      var geoCoordMap = self.geoCoordMap;

      var colors = [
        [
          "#1DE9B6",
          "#F46E36",
          "#04B9FF",
          "#5DBD32",
          "#FFC809",
          "#FB95D5",
          "#BDA29A",
          "#6E7074",
          "#546570",
          "#C4CCD3",
          "#1DE9B6",
          "#F46E36",
          "#04B9FF",
          "#5DBD32",
          "#FFC809",
          "#FB95D5",
          "#BDA29A",
          "#6E7074",
          "#546570",
          "#C4CCD3",
          "#1DE9B6",
          "#F46E36",
          "#04B9FF",
          "#5DBD32",
          "#FFC809",
          "#FB95D5",
          "#BDA29A",
          "#6E7074",
          "#546570",
          "#C4CCD3",
          "#1DE9B6",
          "#F46E36",
          "#04B9FF",
          "#5DBD32",
          "#FFC809",
          "#FB95D5",
          "#BDA29A",
          "#6E7074",
          "#546570",
          "#C4CCD3",
          "#1DE9B6",
          "#F46E36",
          "#04B9FF",
          "#5DBD32",
          "#FFC809",
          "#FB95D5",
          "#BDA29A",
          "#6E7074",
          "#546570",
          "#C4CCD3"
        ],
        [
          "#37A2DA",
          "#67E0E3",
          "#32C5E9",
          "#9FE6B8",
          "#FFDB5C",
          "#FF9F7F",
          "#FB7293",
          "#E062AE",
          "#E690D1",
          "#E7BCF3",
          "#9D96F5",
          "#8378EA",
          "#8378EA"
        ],
        [
          "#DD6B66",
          "#759AA0",
          "#E69D87",
          "#8DC1A9",
          "#EA7E53",
          "#EEDD78",
          "#73A373",
          "#73B9BC",
          "#7289AB",
          "#91CA8C",
          "#F49F42"
        ]
      ];
      var colorIndex = 0;
      var year = self.year;
      var mapData = new Array();
      for (var i = 0; i < 50; i++) {
        //一维长度为2
        mapData[i] = new Array(); //再声明二维
      }
      /*柱子Y名称*/
      var categoryData = [];
      var barData = [];
      // console.log(geoCoordMap)
      for (var key in geoCoordMap) {
        // console.log(key)
        // console.log(self.dataFrom)
        for (let i = 0; i < self.dataFrom.length; i++) {
          // console.log(key)
          mapData[i].push({
            year: year[i],
            name: key,
            value: self.dataFrom[i][key]
          });
        }
        // console.log(mapData[1])
      }

      for (var i = 0; i < mapData.length; i++) {
        mapData[i].sort(function sortNumber(a, b) {
          return a.value - b.value;
        });
        barData.push([]);
        categoryData.push([]);
        for (var j = 0; j < mapData[i].length; j++) {
          barData[i].push(mapData[i][j].value);
          categoryData[i].push(mapData[i][j].name);
        }
      }

      // this.axios('/api/map').then((data) => {
      // console.log(data)
      // echarts.registerMap('china', geoJson);
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        // console.log(res,"亮点数据")
        return res;
      };

      var optionXyMap01 = {
        timeline: {
          data: year,
          axisType: "category",
          autoPlay: true,
          playInterval: 3000,
          left: "10%",
          right: "10%",
          bottom: "3%",
          width: "80%",
          label: {
            normal: {
              textStyle: {
                color: "#ddd"
              }
            },
            emphasis: {
              textStyle: {
                color: "#fff"
              }
            }
          },
          symbolSize: 10,
          lineStyle: {
            color: "#555"
          },
          checkpointStyle: {
            borderColor: "#777",
            borderWidth: 2
          },
          controlStyle: {
            showNextBtn: true,
            showPrevBtn: true,
            normal: {
              color: "#666",
              borderColor: "#666"
            },
            emphasis: {
              color: "#aaa",
              borderColor: "#aaa"
            }
          }
        },
        baseOption: {
          animation: true,
          animationDuration: 1000,
          animationEasing: "cubicInOut",
          animationDurationUpdate: 1000,
          animationEasingUpdate: "cubicInOut",
          grid: {
            right: "6%",
            top: "15%",
            bottom: "10%",
            width: "20%"
          },
          tooltip: {
            trigger: "axis", // hover触发器
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
              shadowStyle: {
                color: "rgba(150,150,150,0.1)" //hover颜色
              }
            }
          },
          geo: {
            show: true,
            map: "china",
            roam: false,
            zoom: 1,
            center: [113.83531246, 34.0267395887],
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderColor: "rgba(147, 235, 248, 1)",
                borderWidth: 1,
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(147, 235, 248, .2)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(128, 217, 248, 1)",
                // shadowColor: 'rgba(255, 255, 255, 1)',
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10
              },
              emphasis: {
                areaColor: "#389BB7",
                borderWidth: 0
              }
            }
          }
        },
        options: []
      };

      for (var n = 0; n < year.length; n++) {
        optionXyMap01.options.push({
          backgroundColor: "#013954",
          title: [
            {
              text: self.suoshuhy + self.tag + " 行业统计",
              left: "15%",
              top: "7%",
              textStyle: {
                color: "#fff",
                fontSize: 25
              }
            },
            {
              id: "statistic",
              text: year[n] + "年企业数据统计",
              left: "75%",
              top: "8%",
              textStyle: {
                color: "#ddd",
                fontSize: 25
              }
            }
          ],
          xAxis: {
            type: "value",
            scale: true,
            position: "top",
            min: 0,
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 2,
              textStyle: {
                color: "#ddd"
              }
            }
          },
          yAxis: {
            type: "category",
            //  name: 'TOP 20',
            nameGap: 16,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ddd"
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "#ddd"
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#ddd"
              }
            },
            data: categoryData[n]
          },

          series: [
            //地图
            {
              type: "map",
              map: "china",
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: "#fff"
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: "#031525",
                  borderColor: "#FFFFFF"
                },
                emphasis: {
                  areaColor: "#2B91B7"
                }
              },
              animation: false,
              data: mapData
            },
            //地图中闪烁的点
            {
              //  name: 'Top 5',
              type: "effectScatter",
              coordinateSystem: "geo",
              data: convertData(
                mapData[n]
                  .sort(function(a, b) {
                    return b.value - a.value;
                  })
                  .slice(0, 20)
              ),
              symbolSize: function(val) {
                // console.log(val)
                if (val[2] > 1000) {
                  return val[2] / 100 > 30 ? 30 : val[2] / 100;
                } else {
                  return val[2] / 10 > 20 ? 20 : val[2] / 10;
                }
              },
              showEffectOn: "render",
              rippleEffect: {
                brushType: "stroke"
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: true,
                  fontSize: 16
                }
              },
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n],
                  shadowBlur: 10,
                  shadowColor: colors[colorIndex][n]
                }
              },
              zlevel: 1
            },
            //柱状图
            {
              zlevel: 1.5,
              type: "bar",
              symbol: "none",
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n]
                }
              },
              data: barData[n]
            }
          ]
        });
      }
      myChart.setOption(optionXyMap01, true);
      document
        .getElementById("distributionMap")
        .removeAttribute("_echarts_instance_");
      // myChart.setOption(options, true);
      //   myChart.on("click", function(params) {
      //     var names = params.name; //地区name
      //     self.LocationProvince = params.name;
      //     self.drawChinaMap();
      //     self.drawProvinceMap(names);
      //     self.country(self.LocationProvince);
      //     self.LocationCity = "";
      //     self.LocationQuXian = "";
      //   });
    }
  }
};
</script>

<style lang="scss" >
.distributionMapWapper {
  background: #013954;
}
.distributionMap {
  .el-form-item__content {
    line-height: 32px;
  }
  .distributionMapTitle {
    height: calc(7vh - 2px);
    background: #eee;
  }
}
</style>