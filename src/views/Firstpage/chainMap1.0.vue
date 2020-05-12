<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title"><span class="Title_left"></span>产业链地图</div>
      <div class="el-tab">
        <div class="mapWapper">
          <div
            class="echartsPat"
            :style="{height:'600px',width:'40%'}"
            id="chinaMap"
            ref="chinaMap"
          ></div>
          <div
            class="echartsPat"
            :style="{height:'600px',width:'25%'}"
            id="ProvinceMaps"
            ref="ProvinceMaps"
          ></div>

          <div
            class="chainMap"
            id="chainsList"
            style="width:35%;height:600px;display:inline-block;  text-align:left; overflow: auto;padding-top: 20px; vertical-align: top;"
          >
            <div v-if="shengfenLx">
              <p>
                <b>{{LocationProvince}}</b>
              </p>
              <p class="hotCyl" v-for="(item,index) in chainShenfen" :key="index">
                <img src="../../styles/imagesRed/h10.png" class="monitImg" alt />
                <span>{{item.chanye1}}</span>
              </p>
              <div v-if="chainShenfen.length==0" class="noMore">暂无更多数据~</div>
            </div>

            <div v-else v-for="(item,index) in chainList" :key="index">
              <p v-if="index==0" class="itemNames">
                <b>{{item.name}}</b>
              </p>

              <p v-if="index!=0" class="itemName">{{item.name}}</p>
              <p class="hotCyl" v-for="(itemList,Listindex) in item.value" :key="Listindex">
                <img src="../../styles/imagesRed/h10.png" class="monitImg" alt />
                <span>{{itemList.name}}</span>
              </p>

              <!-- //热门园区 -->
              <!-- <p v-if="index==0&&ParkData.length!=0" class="itemName">
                <b>热门产业园区</b>
              </p>
              <li
                v-for="(itemList,Listindex) in ParkData"
                @click="test(itemList.parkid)"
                style="display:inline-block"
                :key="itemList.parkid"
              >
                <p class="hotCyl" v-if="index==0" :key="Listindex">
                  <img src="../../styles/imagesRed/h10.png" class="monitImg" alt />
                  <span>{{itemList.name}}</span>
                </p>
              </li> -->

              <!-- 园区判断 -->
              <!-- &&ParkData.length==0 -->
              <div
                v-if="chainList.length==1&&chainList[0].value.length==0"
                class="noMore"
              >暂无更多数据~</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="chainTitle"
      center
      :show-close="false"
      @close="test1"
      id="chainMAPS"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <div class="close" @click="dialog_close">×</div>
      <component
        v-if="dialogVisible"
        v-bind:is="tabView"
        v-on:childByValue="childByValue"
        :titles="LocationChain"
        :suoshusf="LocationProvince"
        :suoshuocs="LocationCity"
        :xianqu="LocationQuXian"
        :ParkId="ParkId"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import BMap from "BMap";
import "../../../node_modules/echarts/map/js/china";
import "../../../node_modules/echarts/map/js/province/anhui";
import "../../../node_modules/echarts/map/js/province/aomen";
import "../../../node_modules/echarts/map/js/province/beijing";
import "../../../node_modules/echarts/map/js/province/chongqing";
import "../../../node_modules/echarts/map/js/province/fujian";
import "../../../node_modules/echarts/map/js/province/gansu";
import "../../../node_modules/echarts/map/js/province/guangdong";
import "../../../node_modules/echarts/map/js/province/guangxi";
import "../../../node_modules/echarts/map/js/province/guizhou";
import "../../../node_modules/echarts/map/js/province/hebei";
import "../../../node_modules/echarts/map/js/province/heilongjiang";
import "../../../node_modules/echarts/map/js/province/hubei";
import "../../../node_modules/echarts/map/js/province/hunan";
import "../../../node_modules/echarts/map/js/province/hainan";
import "../../../node_modules/echarts/map/js/province/henan";
import "../../../node_modules/echarts/map/js/province/jiangsu";
import "../../../node_modules/echarts/map/js/province/jiangxi";
import "../../../node_modules/echarts/map/js/province/jilin";
import "../../../node_modules/echarts/map/js/province/liaoning";
import "../../../node_modules/echarts/map/js/province/neimenggu";
import "../../../node_modules/echarts/map/js/province/ningxia";
import "../../../node_modules/echarts/map/js/province/qinghai";
import "../../../node_modules/echarts/map/js/province/shandong";
import "../../../node_modules/echarts/map/js/province/shanxi";
import "../../../node_modules/echarts/map/js/province/shanxi1";
import "../../../node_modules/echarts/map/js/province/sichuan";
import "../../../node_modules/echarts/map/js/province/shanghai";
import "../../../node_modules/echarts/map/js/province/taiwan";
import "../../../node_modules/echarts/map/js/province/tianjin";
import "../../../node_modules/echarts/map/js/province/xianggang";
import "../../../node_modules/echarts/map/js/province/xinjiang";
import "../../../node_modules/echarts/map/js/province/xizang";
import "../../../node_modules/echarts/map/js/province/yunnan";
import "../../../node_modules/echarts/map/js/province/zhejiang";
import select1 from "../Monitor/industrial/monitorDetailDialog";
import select2 from "../Monitor/industrial/monitorPark";

// import "../../styles/js/china.js"
// const echarts = require('../../../node_modules/echarts');

export default {
  data() {
    return {
      chinaMap: [],
      tabView: "select1",
      dialogVisible: false,
      shengfenLx: true,
      mapName: "高新技术企业",
      chainTitle: "",
      LocationProvince: "", //给渲染层定义一个初始值
      LocationCity: "", //给渲染层定义一个初始值
      LocationQuXian: "", //给渲染层定义一个初始值
      LocationChain: "", //给渲染层定义一个初始值
      ParkData: [],
      ParkId: "",
      // chainList:[name:"上海市",child:{name:"物流产业链",name:"文化艺术产业链",name:"铁路产业链",name:"建筑工程产业链",name:"军工产业链"}]
      chainList: [],
      chainShenfen: [],
      hotPark: [
        {
          parkId: "5241321152kljsdfsdf",
          name: "北京经济技术开发区"
        },
        {
          parkId: "5241321152kljsdfsdf",
          name: "武汉经济技术开发区"
        }
      ]
    };
  },
  watch: {
    "$store.state.Country": function() {
      var self = this;
      // console.log(123);
      this.$store.state.Country = false;
    }
  },
  components: {
    select1,
    select2
  },
  mounted() {
    var self = this;
    self.drawChinaMap("china");

    self.city(); //触发获取城市方法
    setTimeout(function() {
      self.click();
    }, 100);

    // alert(returnCitySN['cip'] + returnCitySN['cname']);
  },
  watch: {},
  created() {},
  methods: {
    test(parkId) {
      var self = this;
      // self.tabView="select2"
      self.ParkId = parkId;
      // console.log(parkId, 999);
    },

    test1() {
      this.ParkId = "";
    },

    childByValue: function(childValue, title) {
      let self = this;
      // childValue就是子组件传过来的值
      console.log(childValue);
      console.log(title);
      self.chainTitle = childValue + " - " + title;
    },
    city() {
      const geolocation = new BMap.Geolocation();
      var _this = this;
      geolocation.getCurrentPosition(
        function getinfo(position) {
          let city = position.address.city; //获取城市信息
          let province = position.address.province; //获取省份信息
          _this.LocationProvince = province
            .replace("省", "")
            .replace("市", "")
            .replace("壮族自治区", "")
            .replace("维吾尔自治区", "")
            .replace("回族自治区", "")
            .replace("自治区", "")
            .replace(" ", "");
          _this.drawProvinceMap(_this.LocationProvince);
          _this.drawChinaMap();
          _this.country(_this.LocationProvince);
        },
        function(e) {
          // _this.LocationCity = "定位失败"
          _this.drawProvinceMap(_this.LocationProvince);
        },
        { provider: "baidu" }
      );
    },
    sum(m, n) {
      var num = Math.floor(Math.random() * (m - n) + n);
      return num;
    },
    click() {
      var self = this;
      var lists = document
        .getElementById("chainsList")
        .getElementsByTagName("img");
      for (let i = 0; i < lists.length; i++) {
        let img = document
          .getElementById("chainsList")
          .getElementsByTagName("img")[i];
        img.setAttribute(
          "src",
          require("../../styles/imagesRed/h" + self.sum(1, 100) + ".png")
        );
      }
      var hotCyl = document.getElementsByClassName("hotCyl");
      var LocationQuXian = self.LocationCity;
      for (let i = 0; i < hotCyl.length; i++) {
        let lists = document.getElementsByClassName("hotCyl")[i];
        lists.addEventListener("click", function() {
          var _self=this
          setTimeout(function() {
          console.log(self.ParkId,666)
          let child = _self.getElementsByTagName("span")[0];
          var brother1 = lists.parentNode.children[0];
          self.LocationChain = child.innerHTML;
          console.log(self.LocationChain);
          if (
            self.LocationProvince == "上海" ||
            self.LocationProvince == "天津" ||
            self.LocationProvince == "北京" ||
            self.LocationProvince == "重庆"
          ) {
            if (self.LocationQuXian == "" && self.LocationCity == "") {
              self.chainTitle =
                self.LocationProvince + " - " + self.LocationChain;
            } else if (self.LocationCity != "") {
              console.log(self.LocationChain);
              self.LocationQuXian = self.LocationCity;
              self.LocationCity = "";
              self.chainTitle =
                self.LocationProvince +
                " - " +
                self.LocationQuXian +
                " - " +
                self.LocationChain;
            } else {
              self.LocationCity = "";
              self.chainTitle =
                self.LocationProvince +
                " - " +
                self.LocationQuXian +
                " - " +
                self.LocationChain;
            }
          } else {
            if (brother1.innerHTML.indexOf("<b>") == -1) {
              self.LocationQuXian = brother1.innerHTML;
            } else {
              self.LocationQuXian = "";
            }
            if (self.LocationCity == "") {
              self.chainTitle =
                self.LocationProvince + " - " + self.LocationChain;
            } else if (self.LocationQuXian == "") {
              self.chainTitle =
                self.LocationProvince +
                " - " +
                self.LocationCity +
                " - " +
                self.LocationChain;
            } else if (self.ParkId) {
              self.chainTitle =
                self.LocationProvince +
                " - " +
                self.LocationCity +
                " - " +
                self.LocationChain;
            } else {
              self.chainTitle =
                self.LocationProvince +
                " - " +
                self.LocationCity +
                " - " +
                self.LocationQuXian +
                " - " +
                self.LocationChain;
            }
          }
          
            // console.log(self.ParkId,888)
            if(self.ParkId){
             self.tabView="select2"
          }else{
             self.tabView="select1"
          }
            self.dialogVisible = true;
          }, 300);
        });
      }
    },

    country(shengfen, shiji) {
      var self = this;
      let params = {
        shengfen: shengfen,
        shiji: shiji
      };
      this.axios({
        url: this.api.ChainMapList,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (shiji) {
          self.shengfenLx = false;
          function checkAdult(arr,index) {
            console.log(arr.value.length!=0)
            if(index==0){
              return arr;
            }else{
              return arr.value.length!=0;
            }
                
            }
          self.chainList = res.data.data.filter(checkAdult);
          console.log(self.chainList);
          console.log(self.chainList[0].value.length);
        } else {
          self.shengfenLx = true;
          // console.log(JSON.stringify(res.data.data));
          let data = res.data.data;
          self.chainShenfen = res.data.data[0];
          // console.log(self.chainShenfen);
        }
        setTimeout(function() {
          self.click();
        }, 100);
      });
    },
    countryPark(shengfen, shiji) {
      var self = this;
      let params = {
        suoshusf: shengfen,
        shi: shiji
      };
      this.axios({
        url: this.api.monitorPark,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.ParkData = res.data.data;
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
      var options = {
        backgroundColor: "#fff",
        grid: {
          top: "0",
          right: "50px",
          bottom: "50px",
          left: "0px"
        },
        // visualMap: {
        //         show:false,
        //         left: 'right',
        //         categories: ['',],
        //         inRange: {
        //             color: ['#EE7741']
        //         },
        //         // text:['High','Low'],  // 文本，默认为数值文本
        //         // calculable: true
        //     },
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
                textStyle: { color: "#fff", fontWeight: "bold" }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5,
                borderColor: " #333",
                areaColor: "#D8FCFD"
              },
              emphasis: {
                borderWidth: 0.1,
                areaColor: "#EE7741"
              }
            },
            data: [
              {
                name: self.LocationProvince,
                itemStyle: {
                  areaColor: "#EE7741"
                }
              }
            ]
          }
        ]
      };
      document.getElementById("chinaMap").removeAttribute("_echarts_instance_");
      let myChart = this.$echarts.init(document.getElementById("chinaMap"));
      myChart.setOption(options, true);
      myChart.on("click", function(params) {
        var names = params.name; //地区name
        self.LocationProvince = params.name;
        self.drawChinaMap();
        self.drawProvinceMap(names);
        self.country(self.LocationProvince);
        self.LocationCity = "";
        self.LocationQuXian = "";
        // timeFn = setTimeout(function() {
        //   var names = params.name; //地区name
        //   self.drawChinaMap(names)
        // }, 250);
      });
    },
    dialog_close() {
      this.dialogVisible = false;
    },
    drawProvinceMap(name) {
      var self = this;
      var options = {
        backgroundColor: "#fff",
        series: [
          {
            name: "企业数量",
            type: "map",
            map: name,
            geoIndex: 0,
            label: {
              normal: {
                show: false,
                textStyle: { color: "#333" }
              },
              emphasis: {
                show: true,
                textStyle: { color: "#333", fontWeight: "bold" }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5,
                borderColor: " #333",
                areaColor: "#D8FCFD"
              },
              emphasis: {
                borderWidth: 0.1,
                areaColor: "#EE7741"
              }
            },
            data: [
              {
                name: self.LocationCity,
                itemStyle: {
                  areaColor: "#EE7741"
                }
              }
            ]
          }
        ]
      };
      document
        .getElementById("ProvinceMaps")
        .removeAttribute("_echarts_instance_");
      let myChart = this.$echarts.init(document.getElementById("ProvinceMaps"));
      myChart.setOption(options, true);
      myChart.on("click", function(params) {
        console.log(params.name);
        self.LocationCity = params.name;
        self.countryPark(self.LocationProvince, params.name);
        self.country(self.LocationProvince, params.name);
        self.drawProvinceMap(self.LocationProvince);
      });
    }
  }
};
</script>

<style lang="scss" >
.mapWapper {
  background: #fff;
}
#chainsList {
  .hotCyl {
    margin: 20px 0 20px 60px;
    width: 166px;
    text-align: center;
  }
  .hotCyl {
    margin: 20px 0 20px 60px;
    width: 166px;
    text-align: center;
    display: inline-block;
    color: #666666;
    font-family: FZLTXHK;
    font-size: 16px;
    background: #f4f5f7;
    padding: 5px 16px;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
  }
  .hotCyl:hover {
  animation: myfirst 1s;
  box-shadow: -5px -5px 10px 5px rgba(0, 0, 0, 0.3);
}
@keyframes myfirst {
  /*改变位置和背景颜色*/
  0% {
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
  }
  // 25% {box-shadow: 10px 5px 10px 5px rgba(0,0,0,0.3);}
  // 50% {box-shadow: 10px 0px 10px 5px rgba(0,0,0,0.3);}
  // 75% {box-shadow: 10px -5px 10px 5px rgba(0,0,0,0.3);}
  100% {
    box-shadow: -5px -5px 10px 5px rgba(0, 0, 0, 0.3);
  }
}
  .itemName {
    font-weight: 100;
    font-size: 14px;
    text-indent: 1em;
  }
  .noMore {
    text-align: center;
    color: #ccc;
    line-height: 500px;
  }
  .itemNames {
    font-size: 15px;
  }
}
#chainMAPS {
  .el-dialog__body {
    padding: 0 30px 20px;
  }
  .el-dialog--center {
    border-radius: 11px;
  }
  .close {
    z-index: 222;
    right: -9px;
    top: -9px;
    position: absolute;
    font-size: 20px;
    background: #ccc;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    cursor: pointer;
    line-height: 25px;
  }
  .el-dialog__title {
    line-height: 16px;
    font-size: 14px;
    font-weight: bold;
    color: #303133;
  }
}
</style>