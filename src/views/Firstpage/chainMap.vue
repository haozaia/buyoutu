<template>
  <div id="C_content" class="chainMapBody">
    <div class="C_container" id="chainMaps">
      <div class="el-tab">
        <div class="mapWapper">
          <div class="allmapWapper">
            <div
              class="echartsMap"
              :style="{height:'690px',width:'60%',minWidth:'670px'}"
              id="chinaMap"
              ref="chinaMap"
            ></div>
            <!-- <div class="ProvinceMapsWapper"> -->
              <div
                class="echartsPat"
                :style="{height:'624px',width:'40%',minWidth:'460px',marginBottom:'50px'}"
                id="ProvinceMaps"
                ref="ProvinceMaps"
              ></div>
              <!-- <p class="mapTitle">{{LocationProvince}}</p> -->
            <!-- </div> -->
          </div>

          <div
            class="chainMap"
            id="chainsList"
            style="text-align:left; vertical-align: top;"
          >
            <div v-if="shengfenLx">
              <p class="shengfenName fontSize22">
                <span class="left">当前区域:</span>
                {{LocationProvince}}
              </p>
              <div class="shengfenList">
                <p class="hotCyl" v-for="(item,index) in chainShenfen" :key="index">
                  <!-- <img src="../../styles/imagesRed/h10.png" class="monitImg" alt /> -->
                  <span class="redBlock inline"></span>
                  <span class="fontSize20 inline">{{item.chanye1}}</span>
                </p>
              </div>

              <div v-if="chainShenfen.length==0" class="noMore">暂无更多数据~</div>
            </div>

            <div v-else>
              <p class="shengfenName fontSize22">
                <span class="left">当前区域:</span>
                <span class="leftl">{{LocationProvince }}</span>
                <span class="leftl">{{ chainListChild.name}}</span>
                <span v-if="LocationProvince =='上海' "></span>
                <span v-else-if="LocationProvince =='天津' "></span>
                <span v-else-if="LocationProvince =='北京' "></span>
                <span v-else-if="LocationProvince =='重庆' "></span>
                <el-select
                 :popper-append-to-body="false"
                  v-else
                  v-model="input"
                  clearable
                  size="medium"
                  placeholder="请选择县区"
                  popper-class="select-option"
                  @change="changeMap"
                >
                  <el-option
                    v-for="item in chainList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>

              </p>
              <div v-if="input==''">
                <!-- <p v-if="index==0" class="itemNames">
                <b>{{item.name}}</b>
                </p>-->

                <!-- <p v-if="index!=0" class="inline shengfenName fontSize20">{{item.name}}:</p> -->
                <div class="shengfenList">
                  <p
                    class="hotCyl"
                    v-for="(itemList,Listindex) in chainListChild.value"
                    :key="Listindex"
                  >
                    <span class="redBlock inline"></span>
                    <span class="fontSize20">{{itemList.name}}</span>
                  </p>
                </div>
              </div>
              <div v-else class="shengfenList">
                <!-- <p class="shengfenName fontSize18">{{input}}:</p> -->
                <div class="inline" v-for="(itemList,Listindex) in chainList" :key="Listindex">
                  <div v-if="input==itemList.name">
                    <p class="hotCyl" v-for="(item,List) in itemList.value" :key="List">
                      <span class="redBlock inline"></span>
                      <span class="fontSize20">{{item.name}}</span>
                    </p>
                  </div>
                </div>
              </div>

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
              </li>-->

              <!-- 园区判断 -->
              <!-- &&ParkData.length==0 -->
              <div v-if="chainList.length==1&&chainList[0].value.length==0" class="noMore">暂无更多数据~</div>
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
      width="80%"
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
      LocationProvince: "上海", //给渲染层定义一个初始值
      LocationCity: "", //给渲染层定义一个初始值
      LocationQuXian: "", //给渲染层定义一个初始值
      LocationChain: "", //给渲染层定义一个初始值
      ParkData: [],
      ParkId: "",
      chainListChild: [],
      // chainList:[name:"上海市",child:{name:"物流产业链",name:"文化艺术产业链",name:"铁路产业链",name:"建筑工程产业链",name:"军工产业链"}]
      chainList: [],
      chainShenfen: [],
      input: "",
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
    self.drawProvinceMap(self.LocationProvince);
    self.country(self.LocationProvince);
    // self.city(); //触发获取城市方法
    setTimeout(function() {
      self.click();
    }, 100);
    
    document.getElementById("chainMaps").style.minHeight=document.getElementById("leftNav").offsetHeight-20 +"px"
    console.log(document.getElementById("leftNav").offsetHeight-24)
    console.log(document.getElementById("chainMaps").style.height)
    window.onresize = function() {
      setTimeout(function() {
        self.drawChinaMap();
        self.drawProvinceMap(self.LocationProvince);
      }, 500);
    };

    // alert(returnCitySN['cip'] + returnCitySN['cname']);
  },
   destroyed(){
      window.onresize = null;
    },
  watch: {},
  created() {},
  methods: {
    changeMap(val){
      var self=this
      // console.log(val)
      setTimeout(function() {
          self.click();
        }, 100);
    },
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
      // console.log(childValue);
      // console.log(title);
      self.chainTitle = childValue + " - " + title;
    },
    // city() {
    //   const geolocation = new BMap.Geolocation();
    //   var _this = this;
    //   geolocation.getCurrentPosition(
    //     function getinfo(position) {
    //       let city = position.address.city; //获取城市信息
    //       let province = position.address.province; //获取省份信息
    //       _this.LocationProvince = province
    //         .replace("省", "")
    //         .replace("市", "")
    //         .replace("壮族自治区", "")
    //         .replace("维吾尔自治区", "")
    //         .replace("回族自治区", "")
    //         .replace("自治区", "")
    //         .replace(" ", "");
    //       _this.drawProvinceMap(_this.LocationProvince);
    //       _this.drawChinaMap();
    //       _this.country(_this.LocationProvince);
    //     },
    //     function(e) {
    //       // _this.LocationCity = "定位失败"
    //       _this.drawProvinceMap(_this.LocationProvince);
    //     },
    //     { provider: "baidu" }
    //   );
    // },
    sum(m, n) {
      var num = Math.floor(Math.random() * (m - n) + n);
      return num;
    },
    click() {
      var self = this;
      // var lists = document
      //   .getElementById("chainsList")
      //   .getElementsByTagName("img");
      // for (let i = 0; i < lists.length; i++) {
      //   let img = document
      //     .getElementById("chainsList")
      //     .getElementsByTagName("img")[i];
      //   img.setAttribute(
      //     "src",
      //     require("../../styles/imagesRed/h" + self.sum(1, 100) + ".png")
      //   );
      // }
      // console.log(123)
      var hotCyl = document.getElementsByClassName("hotCyl");
      // console.log(hotCyl.length)
      // console.log(hotCyl[0])
      var LocationQuXian = self.LocationCity;
      for (let i = 0; i < hotCyl.length; i++) {
        let lists = document.getElementsByClassName("hotCyl")[i];

        lists.addEventListener("click", function() {
          // console.log(456)
          var _self = this;
          setTimeout(function() {
            // console.log(self.ParkId, 666);
            let child = _self.getElementsByTagName("span")[1];
            var brother1 = lists.parentNode.children[0];
            self.LocationChain = child.innerHTML;
            // console.log(self.LocationChain);
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
                // console.log(self.LocationChain);
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
                self.LocationQuXian = self.input;
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
            if (self.ParkId) {
              self.tabView = "select2";
            } else {
              self.tabView = "select1";
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
          function checkAdult(arr, index) {
            // console.log(arr.value.length != 0);
            if (index == 0) {
              return arr;
            } else {
              return arr.value.length != 0;
            }
          }
          self.chainList = res.data.data.filter(checkAdult);
          self.chainListChild = self.chainList.shift();
          // console.log(self.chainList);
          // console.log(res.data.data.filter(checkAdult));
          // console.log(self.chainListChild);
          // console.log(self.chainList[0].value.length);
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
          right: "0",
          bottom: "0",
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
             zoom: 1.2,
            label: {
              normal: {
                show: true,
                textStyle: { color: "#724006" ,fontSize:18}
              },
              emphasis: {
                show: true,
                textStyle: { color: "#CF111B"}
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5,
                borderColor: " #fff",
                areaColor: "#E0B665"
              },
              emphasis: {
                borderWidth: 0.1,
                areaColor: "#c2761c"
              }
            },
            data: [
              {
                name: self.LocationProvince,
                label: {
                  normal: {
                    show: true,
                    textStyle: { color: "#724006",fontWeight:'bold' }
                  }
                },
                itemStyle: {
                  areaColor: "#c2761c"
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
        self.input=''
        console.log(self.input)
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
        grid: {
          left: "5%",
          right: "5%",
          top: "15%",
          bottom: "10%"
        },
        series: [
          {
            name: "企业数量",
            type: "map",
            map: name,
            zoom: 1.2,
            geoIndex: 0,
            label: {
              normal: {
                show: false,
                textStyle: { color: "#724006" ,fontSize:18}
              },
              emphasis: {
                show: true,
                textStyle: { color: "#CF111B"}
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5,
                borderColor: "#fff",
                areaColor: "#E0B665"
              },
              emphasis: {
                borderWidth: 0.1,
                areaColor: "#c2761c"
              }
            },
            data: [
              {
                name: self.LocationCity,
                label: {
                  normal: {
                    show: true,
                     textStyle: { color: "#724006",fontWeight:'bold' }
                  }
                },
                itemStyle: {
                  areaColor: "#c2761c"
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
        self.input=''

        console.log( self.input);
        self.LocationCity = params.name;
        // self.countryPark(self.LocationProvince, params.name);
        self.country(self.LocationProvince, params.name);
        self.drawProvinceMap(self.LocationProvince);
      });
    }
  }
};
</script>

<style lang="scss" >
.chainMapBody{
   border: 1px solid #fff;
  border-radius: 6px;
}
.mapWapper {
  background: #fff;
}
.ProvinceMapsWapper {
  display: inline-block;
  vertical-align: super;
  // position: absolute;
  .mapTitle {
    text-align: center;
  }
}
#chainMaps{
  background: #fff;
}

  .echartsMap {
    // margin: 24px 0 0 3%;
    display: inline-block;
  }


#chainsList {
  .el-select .el-input__inner:focus {
    border-color: rgba(207, 17, 27, 1);
  }
  .el-select-dropdown__item{
    font-size: 20px;
    height: 36px;
    line-height: 36px;
  }
  .el-select-dropdown__item:hover {
    background-color: #f5cfd1;
  }
  .select-option .el-select-dropdown__item.selected {
    color: rgba(207, 17, 27, 1) !important ;
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: rgba(207, 17, 27, 1);
    color: #333;
  }
  .shengfenName {
    vertical-align: top;
    height: 36px;
    // width: 10%;
    margin-left: 30px;
    // text-align: right;
    font-weight: 500;
    margin-bottom: 16px;
    .left {
      margin-right: 18px;
    }
    .leftl {
      margin-right: 20px;
    }
  }
  .shengfenList {
    // width: 84%;
    line-height: 26px;
    margin-left: 7%;
  }
  .hotCyl {
    margin: 0 0 22px 0;
    // width: 166px;
    // text-align: center;
    width: 210px;
  }
  .hotCyl:hover {
    color: rgba(207, 17, 27, 1);
  }
  .redBlock {
    margin-right: 6px;
    width: 12px;
    height: 20px;
    background: rgba(207, 17, 27, 1);
  }
  .hotCyl {
    // margin: 20px 0 20px 60px;
    // width: 166px;
    // text-align: center;
    display: inline-block;
    color: #000;
    // font-family: FZLTXHK;
    font-size: 16px;
    // background: #f4f5f7;
    // padding: 5px 16px;
    // border-radius: 20px;
    cursor: pointer;
    // box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
  }
  .itemName {
    font-weight: 100;
    font-size: 14px;
    text-indent: 1em;
  }
  .noMore {
    text-align: center;
    color: #ccc;
  }
  .itemNames {
    font-size: 15px;
  }
}
#chainMaps  .C_title{
position: absolute;
    z-index: 2;
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
    font-size: 22px;
    font-weight: bold;
    color: #303133;
  }
}
</style>