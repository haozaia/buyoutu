<template>
  <div id="MapLine" slot="MapLine">
    <div class="mapline">
      <div class="maplineContent">
        <section class="lineWapper">
          <header class="lineHeader textAlignL BgColorF">
            <span class="redBlock BgColorR shishiinline"></span>
            <span class="title" style="font-size:34px;">实时更新统计</span>
            <p class="addNumCom shujuinline">
              <span
                style="font-size:34px"
                class="num colorF"
                v-for=" (index, item) in addNum"
                :key="item"
              >{{index}}</span><span class="title" style="font-size:34px;">家企业</span>

              <!-- <span class="num fontSize22 colorF">2</span>
              <span class="num fontSize22 colorF">3</span>
              <span class="num fontSize22 colorF">5</span>
              <span class="num fontSize22 colorF">8</span>
              <span class="num fontSize22 colorF">3</span>
              <span class="num fontSize22 colorF">9</span>-->
            </p>
            <!-- <span class="inline color3 fontSize22">覆盖的企业</span> -->
          </header>
          <div class="lineContent BgColorF">
            <div
              :style="{height:'305px',width:'100%'}"
              id="chinaLine"
              ref="myMap"
            ></div>
            <!-- <div class="line">
              <div class="inline line1">
                <span class="line1-1"></span>
                <span class="line1-2 inline"></span>
                <span class="colorH fontSize20 lineText inline">投资价值</span>
                <span class="line1-2 inline"></span>
                <span class="line1-1"></span>
              </div>

              <div class="inline line2">
                <span class="line1-1"></span>
                <span class="line2-2 inline"></span>
                <span class="colorH fontSize20 lineText inline">企业性质</span>
                <span class="line2-2 inline"></span>
                <span class="line1-1"></span>
              </div>

              <div class="inline line3">
                <span class="line1-1"></span>
                <span class="line3-2 inline"></span>
                <span class="colorH fontSize20 lineText inline">资本市场</span>
                <span class="line3-2 inline"></span>
                <span class="line1-1"></span>
              </div>
            </div>-->
          </div>
        </section>

        <section class="mapWappers">
          <header class="lineHeader textAlignL BgColorF">
            <span class="redBlock BgColorR inline"></span>
            <span class="title inline">企业地域分布</span>
            <span class="inline colorH comType fontSize22">
              <b>{{mapName}}</b>
            </span>
            <el-form ref="form" :inline="true" class="fromWapper" label-width="130px">
              <el-form-item label="按公司选择：">
                <el-select
                  :popper-append-to-body="false"
                  v-model="mapName"
                  placeholder="请选择活动区域"
                  @change="changeMap"
                  popper-class="select-option"
                  style="width:300px;"
                >
                  <el-option label="A股公司" value="A股公司"></el-option>
                  <el-option label="政府奖励企业" value="政府奖励企业"></el-option>
                  <el-option label="高新技术企业" value="高新技术企业"></el-option>
                  <el-option label="A股拟IPO公司" value="A股拟IPO公司"></el-option>
                  <el-option label="三板公司" value="三板公司"></el-option>
                  <el-option label="四板公司" value="四板公司"></el-option>
                  <el-option label="已私募融资公司" value="已私募融资公司"></el-option>
                  <el-option label="央企" value="央企"></el-option>
                  <el-option label="国有企业" value="国有企业"></el-option>
                  <el-option label="外商投资企业" value="外商投资企业"></el-option>
                  <el-option label="专项证照企业" value="专项证照企业"></el-option>
                  <el-option label="标准制定企业" value="标准制定企业"></el-option>
                  <el-option label="重大在建项目企业" value="重大在建项目企业"></el-option>

                  <el-option label="民营产业集团" value="民营产业集团"></el-option>
                  <el-option label="地方融资平台" value="地方融资平台"></el-option>
                  <el-option label="政府高新投资平台" value="政府高新投资平台"></el-option>
                  <el-option label="非挂牌非上市" value="非挂牌非上市"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </header>
          <div class="mapContent BgColorF">
            <div
              class="inline"
              :style="{height:'606px',width:'50%',minWidth:'840px'}"
              id="chinaMap"
              ref="chinaMap"
            ></div>

            <div class="mapRight">
              <p class="countryRank fontSize22 color3">省份排名</p>
              <ul>
                <li class="rankWapper" v-for="(item , index) in rankList" :key="index">
                  <span
                    class="inline fontSize20"
                    :class="[index <3?'redBall':'garyBall']"
                  >{{index +1}}</span>
                  <span class="inline rankName color3 fontSize20">{{item.name}}</span>
                  <span class="inline rankNum color3 fontSize20">{{item.value}}家企业</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../node_modules/echarts/map/js/china.js";

export default {
  data() {
    return {
      rankList: [],
      chinaMap: [],
      chinaX: [],
      chinaY: [],
      numHtml: "",
      addNum: [],
      mapName: "A股公司",
      dimension: "0"
    };
  },
  mounted() {
    var self = this;
    self.country();
    self.line();
    window.onresize = function() {
      console.log('mapline')
      setTimeout(function() {
        self.changeLine();
        self.drawChinaMap();
      }, 500);
    };
  },
  destroyed() {
    window.onresize = null;
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },

  methods: {
    formatNum(str) {
      str = String(str);
      var newStr = "";
      var numHtml = "";
      // var addNum = document.getElementById("addNum");
      var count = 0;
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          numHtml =
            '<li class="num-cell"><span>' +
            str.charAt(i) +
            '</span> </li><li class="sp-cell"><span>,</span> </li>' +
            numHtml;
          newStr = str.charAt(i) + "," + newStr;
        } else {
          numHtml =
            '<li class="num-cell"><span>' +
            str.charAt(i) +
            "</span> </li>" +
            numHtml;
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      str = newStr;
      this.numHtml = numHtml;
    },
    changeLine() {
      var self = this;
      if (self.dimension == 0) {
        self.drawChinaLine(self.chinaX, self.chinaY);
      } else if (self.dimension == 1) {
        self.drawChinaLine(self.chinaX.slice(0, 4), self.chinaY.slice(0, 4));
      } else if (self.dimension == 2) {
        self.drawChinaLine(self.chinaX.slice(5, 10), self.chinaY.slice(5, 10));
      } else if (self.dimension == 3) {
        self.drawChinaLine(
          self.chinaX.slice(11, 16),
          self.chinaY.slice(11, 16)
        );
      }
    },
    changeMap(val) {
      var self = this;
      console.log(val);
      self.mapName = val;
      self.country();
    },

    country() {
      var self = this;
      var mapName = "";
      if (self.mapName == "央企") {
        mapName = "中央企业";
      } else if (self.mapName == "非挂牌非上市") {
        mapName = "非挂牌上市公司";
      } else {
        mapName = self.mapName;
      }
      let params = {
        name: mapName
      };
      this.axios({
        url: this.api.homeMap,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        let data = res.data.data;
        self.chinaMap = data.map(function(singleEl) {
          singleEl.name = singleEl.name
            .replace("省", "")
            .replace("市", "")
            .replace("壮族自治区", "")
            .replace("维吾尔自治区", "")
            .replace("回族自治区", "")
            .replace("自治区", "")
            .replace(" ", "");
          // singleEl.value = singleEl.value;
          return singleEl;
        });

        // console.log(self.chinaMap);
        setTimeout(function() {
          self.drawChinaMap();
          self.rankList = self.chinaMap.slice(0, 10);
        }, 100);
      });
    },
    line() {
      var self = this;
      let params = {
        type: 1
      };
      this.axios({
        url: this.api.homeLine,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        let data = res.data.data[0];
        // console.log(data)
        self.addNum = res.data.data[1][0].value.toString().split("");
        // console.log(self.addNum);
        let arrayX = [];
        let arrayY = [];
        // console.log(self.chinaMap);
        data.map(function(index) {
          // console.log(singleEl.value.name)
          if (index.jcname == "A股拟IPO公司") {
            arrayX.push(self.insertStr(index.jcname, 6, "\n"));
          } else {
            if (index.jcname.length > 4) {
              arrayX.push(self.insertStr(index.jcname, 4, "\n"));
            } else {
              arrayX.push(index.jcname);
            }
          }
          return arrayX;
        });
        self.chinaX = arrayX;
        // console.log( self.chinaX)
        data.map(function(index) {
          // if (index.value < 10000) {
          //   arrayY.push(index.value * 1 + 10000);
          // } else {
          arrayY.push(index.value);
          // }
          return arrayY;
        });
        self.chinaY = arrayY;
        setTimeout(function() {
          self.drawChinaLine(arrayX, arrayY);
        }, 100);
      });
    },
    //在指定位置加换行符
    insertStr(soure, start, newStr) {
      return soure.slice(0, start) + newStr + soure.slice(start);
    },
    drawChinaMap() {
      var self = this;
      let max = Math.max.apply(
        Math,
        self.chinaMap.map(function(o) {
          return o.value;
        })
      );
      var options = {
        backgroundColor: "#fff",
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
          show: true,
          min: 0,
          max: max,
          right: "70",
          top: "50%",
          inverse: false, //是否反转 visualMap 组件
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: false, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
          seriesIndex: 0, //指定取哪个系列的数据，即哪个系列的 series.data,默认取所有系列
          orient: "vertical",
          inRange: {
            color: ["#FACD91", "#E0B665", "#F59A23", "#A68850", "#7B4D12"] // 蓝绿
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
                textStyle: { color: "#000", fontSize: 18 }
              },
              emphasis: {
                show: true,
                textStyle: { color: "#000" }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5,
                borderColor: "#fff",
                areaColor: "#fce1bd"
              },
              emphasis: {
                borderWidth: 0.1,
                areaColor: "#E85A29"
              }
            },
            data: self.chinaMap
          }
        ]
      };
      document.getElementById("chinaMap").removeAttribute("_echarts_instance_");
      let myChart = this.$echarts.init(document.getElementById("chinaMap"));
      myChart.setOption(options, true);
    },
    getMaxSort(arr) {
      // console.log(arr.length);
      var max;
      for (var i = 0; i < arr.length; i++) {
        for (var j = i; j < arr.length; j++) {
          if (arr[i].value > arr[j].value) {
            max = arr[j];
            arr[j] = arr[i];
            arr[i] = max;
          }
        }
      }
      return arr;
    },

    drawChinaLine(datax, datay) {
      var self = this;
      this.chartLine = this.$echarts.init(document.getElementById("chinaLine"));
      this.chartLine.on("click", function(params) {
        var item = "";
        if (params.name == "高企") {
          item = "高新技术企业";
        } else if (params.name == "政府奖励") {
          item = "政府奖励企业";
        } else if (params.name == "拟IPO") {
          item = "A股拟IPO公司";
        } else if (params.name == "已私募") {
          item = "已私募融资公司";
        } else if (params.name == "央企") {
          item = params.name;
        } else if (params.name == "国企") {
          item = "国有企业";
        } else if (params.name == "外企") {
          item = "外商投资企业";
        } else if (params.name == "专项证照") {
          item = "专项证照企业";
        } else if (params.name == "标企") {
          item = "标准制定企业";
        } else if (params.name == "重大项目") {
          item = "重大在建项目企业";
        } else {
          item = params.name + "公司";
        }
        self.mapName = item;
        // console.log(params.name);
        self.country();
        self.drawChinaMap();
      });
      var options1 = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          padding: 14,
          textStyle: {
            fontSize: 18
          },
          formatter(params) {
            //  console.log(params)
            var item = "";
            if (params[0].name == "高企") {
              item = "高新技术企业";
            } else if (params[0].name == "政府奖励") {
              item = "政府奖励企业";
            } else if (params[0].name == "拟IPO") {
              item = "A股拟IPO公司";
            } else if (params[0].name == "已私募") {
              item = "已私募融资公司";
            } else if (params[0].name == "央企") {
              item = params[0].name;
            } else if (params[0].name == "国企") {
              item = "国有企业";
            } else if (params[0].name == "外企") {
              item = "外商投资企业";
            } else if (params[0].name == "专项证照") {
              item = "专项证照企业";
            } else if (params[0].name == "标企") {
              item = "标准制定企业";
            } else if (params[0].name == "重大项目") {
              item = "重大在建项目企业";
            } else {
              item = params[0].name + "公司";
            }

            // const item = params[0];
            return item + "<br/>" + "企业家数：" + params[0].value;
          }
        },

        grid: {
          top: "10",
          left: "33",
          right: "27",
          bottom: "0",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: datax,
            axisLine: {
              //y轴
              show: false
            },
            axisTick: {
              alignWithLabel: true,
              lineStyle: { color: "#E9E9E9" }
            },
            axisLabel: {
              interval: 0,
              nameGap: 100,
              show: true,
              padding: [8, 0, 0, 0],
              textStyle: {
                lineHeight: 26,
                fontSize: 20,
                color: "#000"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "log",
            min: 10,
            logBase: 10,
            axisLine: {
              //y轴
              show: false
            },
            axisLabel: {
              fontSize: 20
            },
            axisTick: {
              //y轴刻度线
              show: false
            },
            splitLine: {
              lineStyle: {
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "企业数量",
            type: "bar",
            barWidth: "20",
            data: datay,
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#EA6167" },
                  { offset: 1, color: "#CF111B" }
                ])
              }
            }
          }
        ]
      };
      document
        .getElementById("chinaLine")
        .removeAttribute("_echarts_instance_");
      this.chartLine.setOption(options1, true);
    }
  }
};
</script>

<style lang="scss">
#MapLine {
  background: #f0f2f5;
  // padding: 10px 0 0;

  .lineWapper,
  .mapWappers {
    header {
      margin-bottom: 2px;
      height: 60px;
      line-height: 60px;
      border-radius: 6px 6px 0 0;
      font-weight: bold;
      .redBlock {
        width: 20px;
        height: 36px;
      }

      .title {
        margin-left: 10px;
        font-weight: bold;
        font-size: 24px;
      }
      .addNumCom {
        margin: 8px 10px 0 18px;
      }
      .num {
        // padding: 5px;
        width: 26px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background: rgba(207, 17, 27, 1);
        margin-right: 3px;
        display: inline-block;
      }
      .fromWapper {
        display: inline-block;
        float: right;
        margin-right: 1.8%;
      }
    }
    .lineContent {
      height: 320px;
      padding-top: 30px;
      border-radius: 0 0 6px 6px;
    }
  }
  .line {
    text-align: left;
    margin-left: 144px;
    .line1 {
      margin-left: 3.1%;
      width: 24%;
      .lineText {
        width: 34%;
        text-align: center;
      }
    }
    .line2 {
      width: 29%;
      margin-left: 5%;
    }
    .line3 {
      width: 29.8%;
      margin-left: 5.6%;
    }

    .lineText {
      width: 28%;
      text-align: center;
    }

    .line1-1 {
      height: 16px;
      border-right: 1px solid #cf111b;
      vertical-align: super;
    }
    .line2-2 {
      width: 35.6%;
      height: 1px;
      border-bottom: 1px dashed #cf111b;
    }
    .line3-2 {
      width: 34.2%;
      height: 1px;
      border-bottom: 1px dashed #cf111b;
    }
    .line1-2 {
      width: 30.5%;
      height: 1px;
      border-bottom: 1px dashed #cf111b;
    }
  }

  .mapWappers {
    margin-top: 10px;
    .comType {
      margin-left: 34px;
    }
    .mapContent {
      text-align: left;
      height: 606px;
      border-radius: 0 0 6px 6px;
    }
    .mapRight {
      float: right;
      width: 19%;
      margin-right: 9%;
    }
    .countryRank {
      font-weight: bold;
      margin: 42px 0 34px;
    }
    .rankWapper {
      margin-bottom: 16px;
    }
    .redBall {
      text-align: center;
      line-height: 22px;
      color: #fff;
      width: 22px;
      height: 22px;
      background: rgba(207, 17, 27, 1);
      border-radius: 50%;
    }
    .garyBall {
      text-align: center;
      line-height: 22px;
      color: #fff;
      width: 22px;
      height: 22px;
      background: rgba(121, 121, 121, 1);
      border-radius: 50%;
    }
    .rankNum {
      float: right;
    }
    .rankName {
      margin-left: 8px;
    }
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .li .el-form--inline .el-form-item {
    display: inline-block;
    margin: 0;
  }
  .el-select .el-input__inner:focus {
    border-color: rgba(207, 17, 27, 1);
  }
  .el-select-dropdown__item {
    font-size: 20px;
    height: 36px;
    line-height: 36px;
    font-weight: 400;
  }
  .el-select-dropdown__item:hover {
    background-color: #f5cfd1;
  }
  .select-option .el-select-dropdown__item.selected {
    color: rgba(207, 17, 27, 1) !important ;
    font-weight: bold;
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: rgba(207, 17, 27, 1);
  }
  .el-select .el-input .el-input__inner {
    color: #000;
    height: 40px !important;
    line-height: 40px !important;
  }
  .el-form--inline .el-form-item__content {
    // line-height: 36px;
    display: inline-block;
    vertical-align: middle;
  }
  .el-form-item__label {
    line-height: 36px;
    font-size: 20px;
    font-weight: 400;
    color: #000;
    padding: 0;
    margin-bottom: 2px;
  }

  .inline {
    display: inline-block;
    vertical-align: middle;
  }
  .shishiinline{
    display: inline-block;
    vertical-align: sub;
  }
  .shujuinline{
    display: inline-block;
  }
  .el-select-dropdown__item {
    color: #000;
  }
}
.count-block-wrapper {
  width: 49.4%;
  float: left;
  padding: 0 0.3%;
  .count-block {
    height: 625px;
    display: block;
    margin-top: 28px;
    background-color: #efefef;
    border: 1px solid #c03532;
    header {
      margin-top: -11px;
      text-align: center;
      .block-title {
        position: relative;
        display: inline-block;
        padding: 4px 11px;
        height: auto;
        font-size: 14px;
        line-height: 1.25;
        color: #fff;
        background-color: #c03532;
        border-radius: 12px;
        i {
          position: absolute;
          top: 0;
          display: block;
          border: 18px solid transparent;
        }
      }
    }
  }
}
* {
  padding: 0;
  margin: 0;
}

.count-summary {
  margin: 0 auto;
  text-align: center;
  position: relative;
  padding: 1px;
  div {
    padding: 15px 15px 6px;
    display: block;
    font-size: 14px;
    line-height: 1.2;
    border-radius: 4px;
    ul {
      margin: 0;
      display: inline-block;
      white-space: nowrap;
      vertical-align: middle;
      .num-cell {
        background-color: #ee7741;
        color: #fff;
        border-radius: 2px;
        display: inline-block;
        margin: 0 2px;
        padding: 0 5px;
        font-size: 18px;
        line-height: 1.2;
        font-weight: 700;
      }
      .sp-cell {
        color: #ee7741;
        display: inline-block;
        margin: 0 2px;
        padding: 0 5px;
        font-size: 20px;
        line-height: 1.2;
        font-weight: 700;
      }
    }
    .count-summary-label {
      display: inline-block;
      white-space: nowrap;
      vertical-align: middle;
    }
  }
}
.mapName {
  padding-top: 10px;
  color: #c03532;
  font-weight: bold;
  font-size: 15px;
}
.el-select .el-input .el-select__caret {
  font-size: 20px;
}

.bottom10 {
  border-bottom: 10px solid #f5f8fa;
}
</style>