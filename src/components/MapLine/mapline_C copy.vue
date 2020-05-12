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
                    <i class="inner-line line-1" style="width:35px"></i>
                    <i class="inner-line line-2" style="width:71px"></i>
                    <i class="inner-line line-3" style="width:71px"></i>
                    <i class="inner-line line-4" style="width:35px"></i>
                  </div>
                </div>
                <div class="label-group-container group-6">
                  <div class="label-group">
                    <div class="group-name">企业性质维度</div>

                    <i class="inner-line line-1" style="width:45px"></i>
                    <i class="inner-line line-2" style="width:45px"></i>
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
                <span>地方融资平台统计</span>
              </div>
            </header>
            <div class="count-summary">
              <div>
                <ul id="addNums" v-html="numHtmls">
                </ul>
                <div class="count-summary-label">覆盖的平台</div>
              </div>
            </div>
            <div class="data-wapper">

              <div
                class="echartsPat"
                :style="{height:'560px',width:'100%'}"
                id="chinaLines"
                ref="myMap"
              ></div>
            </div>
          </section>
        </div>

      </div>
      <div class="clear"></div>

    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china.js";

export default {
  data() {
    return {
       chinaX: [],
      chinaY: [],
       chinaXs: [],
      chinaYs: [],
      numHtml:'',
      numHtmls:'',
      addNum:'',
      mapName:'高新技术企业',
    };
  },
  mounted() {
    var self = this;
    self.line();
    self.lines();
    
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
    str = String(str)
      var newStr = "";
      var numHtml="";
      var count = 0;
        for (var i = str.length - 1; i >= 0; i--) {
          if (count % 3 == 0 && count != 0) {
            numHtml=  '<li class="num-cell"><span>'+ str.charAt(i) +'</span> </li><li class="sp-cell"><span>,</span> </li>'+numHtml
            newStr = str.charAt(i) + "," + newStr;
          } else {
            numHtml='<li class="num-cell"><span>'+ str.charAt(i) +'</span> </li>'+numHtml
            newStr = str.charAt(i) + newStr;
          }
          count++;
        }
        str = newStr
        console.log(str);
        console.log(numHtml);
        return numHtml
        this.numHtml=numHtml
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
        self.numHtml= self.formatNum(res.data.data[1][0].value);
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
    drawChinaLine() {
      var self = this;
      this.chartLine = this.$echarts.init(document.getElementById("chinaLine"));

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
        ]
      }
      );
    },

  
    lines(type) {
      var self = this;
      let params = {
        type: "c"
      };
      this.axios({
        url: this.api.homeMapC,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        console.log(res.data.data[0].value)
        self.chinaXs=res.data.data[1]
        self.addNums= res.data.data[0].value
        self.numHtmls= self.formatNum(res.data.data[0].value)
        // console.log(self.chinaX)
        self.drawChinaLines()
      });
    },


    getMaxSort(arr) {
      console.log(arr.length);
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

    drawChinaLines() {
      var self = this;
      var self = this;
      self.charts = this.$echarts.init(
        document.getElementById("chinaLines")
      );
      self.charts.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "企业数量",
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            data: self.chinaXs,
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
      self.charts.resize();
    }
  }
};
</script>

<style lang="scss">

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
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Noto Sans CJK SC", "WenQuanYi Micro Hei", Arial,
    sans-serif;
  padding: 0;
  margin: 0;
}
.data-wapper {
  position: relative;
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
        background-color: #EE7741;
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
        color: #EE7741;
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

.bottom10 {
  border-bottom: 10px solid #f5f8fa;
}
</style>