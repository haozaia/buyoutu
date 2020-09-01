<template>
  <div id="zhongJiYouYu" slot="MapLine">
    <div class="C_container">
      <div class="content">
        <div class="count-block-wrapper">
          <section class="count-block">
            <header>
              <div class="block-title">
                <i class="arrow-1"></i>
                <i class="arrow-2"></i>
                <span>企业统计</span>
              </div>
            </header>
            <div class="count-summary">
              <div>
                <ul id="addNum" v-html="numHtml"></ul>
                <div class="count-summary-label">覆盖的企业</div>
              </div>
            </div>
            <div class="data-wapper">
              <div class="label-group-wrapper">
                <div class="label-group-container group-5">
                  <div class="label-group">
                    <div class="group-name">资本市场维度</div>
                    <i class="inner-line line-1" style="width:71px"></i>
                    <i class="inner-line line-2" style="width:71px"></i>
                    <i class="inner-line line-3" style="width:40px"></i>
                    <i class="inner-line line-4" style="width:71px"></i>
                  </div>
                </div>
                <div class="label-group-container group-6">
                  <div class="label-group">
                    <div class="group-name">企业性质维度</div>

                    <i class="inner-line line-1" style="width:45px"></i>
                    <i class="inner-line line-2" style="width:45px"></i>
                    <i class="inner-line line-3" style="width:71px"></i>
                    <i class="inner-line line-4" style="width:71px"></i>
                  </div>
                </div>
                <div class="label-group-container group-7">
                  <div class="label-group">
                    <div class="group-name">投资价值维度</div>
                    <i class="inner-line line-1" style="width:48px"></i>
                    <i class="inner-line line-2" style="width:24px"></i>
                    <i class="inner-line line-3" style="width:48px"></i>
                  </div>
                </div>
              </div>

              <div
                class="echartsPat"
                :style="{height:'560px',width:'100%'}"
                id="chinaLine"
                ref="myMap"
              ></div>
            </div>
          </section>
        </div>

        <div class="count-block-wrapper">
          <section class="count-block">
            <header>
              <div class="block-title">
                <i class="arrow-1"></i>
                <i class="arrow-2"></i>
                <span>企业地域分布</span>
              </div>
            </header>

            <p class="mapName">{{mapName}}</p>
            <div
              class="echartsPat"
              :style="{height:'560px',width:'100%'}"
              id="chinaMap"
              ref="chinaMap"
            ></div>
          </section>
        </div>
      </div>
      <div class="clear"></div>

    </div>
  </div>
</template>

<script>
import "../../../node_modules/echarts/map/js/china.js";

export default {
  data() {
    return {
      chinaMap: [],
      chinaX: [],
      chinaY: [],
      numHtml: "",
      addNum: "",
      mapName: "高新技术企业",
      
    };
  },
  mounted() {
    var self = this;
    self.country();
    self.line();
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

    country() {
      var self = this;
      let params = {
        name: self.mapName
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
            .replace("自治区","")
            .replace(" ", "");
          // singleEl.value = singleEl.value;
          return singleEl;
        });
        // console.log(self.chinaMap);
        setTimeout(function() {
          self.drawChinaMap();
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
        self.addNum = res.data.data[1][0].value;
        // console.log(self.addNum);
        // self.formatNum(self.addNum);
        self.formatNum("4889650");
        let arrayX = [];
        let arrayY = [];
        // console.log(self.chinaMap);
        data.map(function(singleEl) {
          // console.log(singleEl.value.name)
          singleEl.value.map(function(index) {
            arrayX.push(index.name);
          });
          return arrayX;
        });
        self.chinaX = arrayX;
        data.map(function(singleEl) {
          singleEl.value.map(function(index) {
            if(index.value<10000){
              arrayY.push(index.value*1+10000);
            }else{
               arrayY.push(index.value);
            }
           
          });
          return arrayY;
        });
        self.chinaY = arrayY;
        setTimeout(function() {
          self.drawChinaLine();
        }, 100);
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
      var options= {
        backgroundColor: "#efefef",
        tooltip:  {
             trigger: 'item',
             formatter: function (params) {
              if(params.value){
              return params.seriesName + '<br/>' + params.name + ' : ' + params.value;
              }else{
              return params.seriesName + '<br/>' + params.name + ' : ' + '0';
              }
                 
             }
         },
        visualMap: {
          //视觉映射组件
          show: true,
          min: 0,
          max: max,
          left: "5%",
          top: "94%",
          inverse: true, //是否反转 visualMap 组件
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: false, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
          seriesIndex: 0, //指定取哪个系列的数据，即哪个系列的 series.data,默认取所有系列
          orient: "horizontal",
          inRange: {
            color: ["#dbfefe", "#1066d5"] // 蓝绿
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
                textStyle: { color: "#333" }
              },
              emphasis: {
                show: true,
                textStyle: { color: "#000" }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5
                // areaColor: "#87CEFA"
              },
              emphasis: {
                borderWidth: 0.1,
                areaColor: "#EE7741",
              }
            },
            data: self.chinaMap
          }
        ]
      };
      document.getElementById('chinaMap').removeAttribute('_echarts_instance_');
        let myChart = this.$echarts.init(document.getElementById('chinaMap'));
      myChart.setOption(options,true);
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

    drawChinaLine() {
      var self = this;
      this.chartLine = this.$echarts.init(document.getElementById("chinaLine"));
      this.chartLine.on("click", function(params) {
        self.mapName = params.name;
        // console.log(params.name);
        self.country();
        self.drawChinaMap();
      });

      this.chartLine.setOption(
        {
        color: ["#EE7741"],
        grid: {
          left: "70",
          right: "4%",
          bottom: "3%",
          top: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
         formatter: function (params) {
          //  console.log(params)
              if(params[0].value){
                if(params[0].value<20000){
                  let number=params[0].value*1-10000
                   return params[0].axisValue + ' : ' + number;
                }else{
                  return params[0].axisValue + ' : ' + params[0].value;
                }
              
              }else{
              return params[0].axisValue + ' : ' + '0';
              }
             }
        },
        xAxis: {
          // type:"log",
          show: false,
          max:"500000",
          
          // min:"5000"
        },
        yAxis: [
          {
            type: "category",
            data: self.chinaX,
            axisLabel: { color: "#333" },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#EE7741"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            data: self.chinaY,
            barWidth: "17",
            // barMinHeight: 30,
            // barMaxHeight: 300000
          }
        ],
        addDataAnimation: true,
      }
      );
    }
  }
};
</script>

<style lang="scss">
#zhongJiYouYu {
  background: #c3c3c380;
  padding: 5px 20px 30px 20px;
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
.data-wapper {
  position: relative;
}
.label-group-wrapper {
  .group-5 {
    top: 29px;
    height: 146px;
    border: 2px solid #33a1ff;
    border-right: none;
    .label-group {
      position: relative;
      width: 10px;
      height: 100%;
      .group-name {
        margin-top: -44px;
        background-color: #33a1ff;
      }
      i {
        position: absolute;
        left: 0;
        display: block;
        height: 1px;
        border-top: 1px dashed transparent;
        border-top-color: #33a1ff;
        width: 23px;
      }
      .line-1 {
        top: 20%;
      }
      .line-2 {
        top: 40%;
      }
      .line-3 {
        top: 60%;
      }
      .line-4 {
        top: 80%;
      }
    }
  }
  .group-name {
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -44px;
    padding: 4px 2px;
    width: 20px;
    color: #fff;
    font-size: 16px;
    line-height: 1;
  }
  .label-group-container {
    position: absolute;
    left: 40px;
  }
  .group-6 {
    top: 205px;
    height: 150px;
    border: 2px solid #c03532;
    border-right: none;
    .label-group {
      position: relative;
      width: 10px;
      height: 100%;
      .group-name {
        margin-top: -52px;
        background-color: #c03532;
      }
      i {
        position: absolute;
        left: 0;
        display: block;
        height: 1px;
        border-top: 1px dashed transparent;
        border-top-color: #c03532;
        width: 23px;
      }
      .line-1 {
        top: 20%;
      }
      .line-2 {
        top: 40%;
      }
      .line-3 {
        top: 60%;
      }
      .line-4 {
        top: 80%;
      }
    }
  }
  .group-7 {
    top: 385px;
    height: 120px;
    border: 2px solid #fd9162;
    border-right: none;
    .label-group {
      position: relative;
      width: 10px;
      height: 100%;
      .group-name {
        margin-top: -52px;
        background-color: #fd9162;
      }
      i {
        position: absolute;
        left: 0;
        display: block;
        height: 1px;
        border-top: 1px dashed transparent;
        border-top-color: #fd9162;
        width: 23px;
      }
      .line-1 {
        top: 25%;
      }
      .line-2 {
        top: 50%;
      }
      .line-3 {
        top: 75%;
      }
    }
  }
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

.bottom10 {
  border-bottom: 10px solid #f5f8fa;
}

</style>