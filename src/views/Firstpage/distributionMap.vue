<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title">产业分布地图

        <el-form ref="form" label-width="100px" style="display:inline-block;">
            <el-form-item label="产业链：" style="margin:0">
              <el-select placeholder="请选择产业链" filterable clearable v-model="form.sheng" @change="getChain" style="margin-right:20px;">
                <el-option
                  v-for="item in chain"
                  :key="item.chanyelian"
                  :label="item.chanyelian"
                  :value="item.chanyelian"
                ></el-option>
              </el-select>
              <el-select placeholder="请选择产业链下的产业" filterable clearable v-model="form.shi" @change="country">
                <el-option
                  v-for="item in chainChild"
                  :key="item.chanye"
                  :label="item.chanye"
                  :value="item.chanye"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
      </div>
          
      <div class="el-tab">
        <div class="mapWapper">
          <div
            class="echartsPat"
            :style="{height:'600px',width:'100%'}"
            id="chinaMap"
            ref="chinaMap"
          ></div>
 
          </div>
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
      chain:{},
      chainChild:{},
      form:{
        sheng:"",
        shi:""
      }
    };
  },

  mounted() {
    var self = this;
    self.country();
    self.getChain();
    // alert(returnCitySN['cip'] + returnCitySN['cname']);
  },
  watch: {},
  created() {},
  methods: {
     getChain() {
      var self = this;
      let params = {
        chanyelain: self.form.sheng
      };
      this.axios({
        url: this.api.industryChainChanyesheng,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
          if(self.form.sheng===""){
            self.chain = res.data.data;
          }else{
             self.chainChild = res.data.data;
          }
          self.form.shi=''
          self.country()
      });
    },
    country() {
      var self = this;
      let params = {
        chanyelain: self.form.sheng,
        chanye: self.form.shi,
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
        self.chinaMap = data.map(function(singleEl) {
          singleEl.value =  singleEl.count
          singleEl.name = singleEl.suoshusf
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
        console.log(self.chinaMap);
        setTimeout(function() {
          self.drawChinaMap();
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
      document.getElementById("chinaMap").removeAttribute("_echarts_instance_");
      let myChart = this.$echarts.init(document.getElementById("chinaMap"));
      myChart.setOption(options, true);
    //   myChart.on("click", function(params) {
    //     var names = params.name; //地区name
    //     self.LocationProvince = params.name;
    //     self.drawChinaMap();
    //     self.drawProvinceMap(names);
    //     self.country(self.LocationProvince);
    //     self.LocationCity = "";
    //     self.LocationQuXian = "";
    //   });
    },

  }
};
</script>

<style lang="scss" >
.mapWapper {
  background: #fff;
}

</style>