<template>
  <div id="C_content" class="distributionMap">
    <div class="C_title">
      <span class="Title_left"></span>产业统计地图
      <el-form ref="form" label-width="100px" style="display:inline-block;">
        <el-form-item label="行业：" style="margin:0">
          <el-select
            placeholder="请选择一级行业"
            filterable
            clearable
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
            @change="country"
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
          <el-date-picker
            v-model="strdate"
            @change="dataTime"
            type="year"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="开始年份"
          ></el-date-picker>
          <el-date-picker
            v-model="enddate"
            @change="dataTime"
            type="year"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="结束年份"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <div class="el-tab">
      <div class="mapWapper">
        <div class="echartsPat" :style="{height:'750px',width:'100%'}" id="chinaMap" ref="chinaMap"></div>
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
      chinaMap: [],
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
      suoshuhy:"",
      tag:"",
      year: [],
      dataFrom: [],
      geoCoordMap: {},
      strdate: "",
      enddate: "",
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

  mounted() {
    var self = this;
    self.getChain();
  },
  watch: {},
  created() {},
  methods: {
    //时间
    dataTime(val) {
      var self = this;
      console.log(val)
      if (self.strdate != "" && self.enddate != "") {
        if (self.strdate < self.enddate) {
          self.country();
        } else {
          this.$message({
            message: "请选择正确的日期范围",
            type: "warning"
          });
          self.strdate = ''
          self.enddate = ''
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
            self.suoshuhy='电气设备'
           self.tag=''
           self.chainChild=[]
            self.country()
            self.getErn()
      });
    },
     getErn() {
      var self = this;
      self.tag=''
      let params = {
        yijihy: self.suoshuhy,
        oldhangye: '0'
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
            self.country()
      });
    },
    country() {
      var self = this;
      let params = {
        chanyelain: self.suoshuhy ? self.suoshuhy : "新能源产业链",
        chanye: self.tag,
        strdate: self.strdate,
        enddate: self.enddate,
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
        self.chinaMap.map(function(o) {
          return o.value;
        })
      );
      let myChart = this.$echarts.init(document.getElementById("chinaMap"));
      var options = {};
      //   var uploadedDataURL = "/asset/get/s/data-1528971808162-BkOXf61WX.json";

      var geoCoordMap = self.geoCoordMap;

      var colors = [
        [
          "#b83b5e",
          "#f06292",
          "#ba68c8",
          "#9575cd",
          "#7986cb",
          "#91a7ff",
          "#4fc3f7",
          "#4dd0e1",
          "#4db6ac",
          "#42bd41",
          "#aed581",
          "#dce775",
          "#fff176",
          "#ffd54f",
          "#ffb74d",
          "#ff8a65",
          "#a1887f",
          "#90a4ae",
          "#f36c60",
          "#f06292",
          "#ba68c8",
          "#9575cd",
          "#7986cb",
          "#91a7ff",
          "#4fc3f7",
          "#4dd0e1",
          "#4db6ac",
          "#42bd41",
          "#aed581",
          "#dce775",
          "#fff176",
          "#ffd54f",
          "#ffb74d",
          "#ff8a65",
          "#a1887f",
          "#90a4ae"
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
                color: "#000"
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
            right: "1%",
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
                borderColor: "#fff",
                borderWidth: 1,
                areaColor: "#e1b45c"
                // {
                //     type: 'radial',
                //     x: 0.5,
                //     y: 0.5,
                //     r: 0.8,
                //     colorStops: [{
                //         offset: 0,
                //         color: 'rgba(207,12 , 27, 0)' // 0% 处的颜色
                //     }, {
                //         offset: 1,
                //         color: 'rgba(207, 12, 27, .2)' // 100% 处的颜色
                //     }],
                //     globalCoord: false // 缺省为 false
                // },

                // shadowColor: 'rgba(207, 12, 27, 1)',

                // shadowColor: 'rgba(255, 255, 255, 1)',
                // shadowOffsetX: -2,
                // shadowOffsetY: 2,
                // shadowBlur: 10
              },
              emphasis: {
                areaColor: "#EE7741",
                borderWidth: 0
              }
            }
          }
        },
        options: []
      };

      for (var n = 0; n < year.length; n++) {
        optionXyMap01.options.push({
          backgroundColor: "#fff",
          title: [
            {
              text: self.suoshuhy + self.tag + "产业分布",
              left: "25%",
              top: "7%",
              textStyle: {
                color: "#000",
                fontSize: 25
              }
            },
            {
              id: "statistic",
              text: year[n] + "数据统计情况",
              left: "75%",
              top: "8%",
              textStyle: {
                color: "#000",
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
                color: "#000"
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
                color: "#000"
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "#000"
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#000"
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
                return val[2] / 100;
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
                  fontSize: 20
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
      document.getElementById("chinaMap").removeAttribute("_echarts_instance_");
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
.mapWapper {
  background: #fff;
}
.distributionMap {
  .el-form-item__content {
    line-height: 32px;
  }
}
</style>