<template>
  <div id="ParkTotalMap">
    <div id="C_content">
      <div class="C_title">
        <span class="Title_left"></span>
        <span><i>{{this.NowPark}}</i>&nbsp; 共<i id="Tag">{{ this.total }}</i></span>个
        <div class="form-group Search_Down_input Te_form-group Map_Form">
        <el-select v-model="Park_paiming" @change="ParkyuanquLv" class="park_teInput Search_Down_input" placeholder="请选择园区级别">
            <el-option
            v-for="item in Park_paimingOptions"
            :key="item.value"
            :label="item.value"
            :value="item.lable"
            :props="{ checkStrictly: true }"
            ></el-option>
        </el-select>
        </div>
        <span class="GoParkMap" @click="GoParkEl">返回园区列表</span>
      </div>
      <div class="Map_AllParkMaps">
        <div id="AllParkMaps"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yuanqujb: "",
      Mapinfo_data: [],
      Park_paimingOptions: [{
        value: '国家级经济技术开发区',
        lable: '9',
      },{
        value: '国家级高新技术产业开发区',
        lable: '8',
      },{
        value: '国家级海关特殊监管区域',
        lable: '7',
      },{
        value: '国家级边境/跨境经济合作区',
        lable: '6',
      }],
      Park_paiming: "9",
      NowPark: "",
      total: "",
    };
  },
  mounted() {
    var self = this;
    // self.yuanqujb = Base64.decode(this.$route.query.yuanqujb);
    this.GoParkMap()
  },
  methods: {
    GoParkMap() {
      var self = this;
    //   console.log(self.Park_paiming)
      if(self.Park_paiming == "9"){
          self.NowPark = "国家级经济技术开发区"
        }else if(self.Park_paiming == "8"){
          self.NowPark = "国家级高新技术产业开发区"
        }else if(self.Park_paiming == "7") {
          self.NowPark = "国家级海关特殊监管区域"
        }else if(self.Park_paiming == "6") {
          self.NowPark = "国家级边境/跨境经济合作区"
        }
      let params = {
        yuanqujb: self.Park_paiming
      };
      this.axios({
        url: this.api.Park_AllBiao,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.count, "Park_AllBiao");
        self.Mapinfo_data = res.data.data;
        self.total = res.data.count;
        this.ShowMap();
        
      });
    },
    // 地图版
    ShowMap() {
      var self = this;
      document.getElementById("AllParkMaps").style.minHeight =
        document.getElementById("leftNav").offsetHeight - 102 + "px";
      // 百度地图API功能
      var map = new BMap.Map("AllParkMaps", { enableMapClick: false }); // 创建Map实例+禁用景点详情
      var point = new BMap.Point(116.404, 39.915);
      map.centerAndZoom(point, 5); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

      // 多个标注 start
      var data_info = self.Mapinfo_data;
      var opts = {
        width: 300, // 信息窗口宽度
        // height: 80, // 信息窗口高度
        BackgroundColor: "#000",
        // title : "公司名称：" , // 信息窗口标题
        offset: { height: -12, width: -6 },
        enableMessage: true //设置允许信息窗发送短息
      };
      for (var i = 0; i < data_info.length; i++) {
        var data_info_location = data_info[i].location.split(",");
        var marker = new BMap.Marker(
          new BMap.Point(data_info_location[0], data_info_location[1])
        ); // 创建标注
        // console.log(data_info[i].chenglisj,"zhucedz")
        var content = `<a style="cursor:pointer;color:#cf111b;width:100%;font-weight:600;margin-bottom:6px;display:inline-block;" class="GoDetails">${
          data_info[i].yuanqumc
        }<span class="Park_yuanqumc" style="display:none;">${
          data_info[i].yuanqumc
        }</span><span class="Park_location" style="display:none;">${
          data_info[i].location
        }</span><span class="Park_mianji" style="display:none;">${
          data_info[i].mianji
        }</span><span class="Park_zhudaocy" style="display:none;">${
          data_info[i].zhudaocy
        }</span><span class="Park_Id" style="display:none;">${
          data_info[i].parkId
        }</span></a>${
          data_info[i].mianji
            ? "</br><a>园区面积：" + data_info[i].mianji + " (公顷)"
            : ""
        }</a>${
          data_info[i].zhudaocy
            ? "</br><a>主导产业：" + data_info[i].zhudaocy
            : ""
        }</a>`;
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
            var Park_yuanqumc = GoDetails.getElementsByClassName(
              "Park_yuanqumc"
            )[0].innerHTML;
            var Park_location = GoDetails.getElementsByClassName(
              "Park_location"
            )[0].innerHTML;
            var Park_mianji = GoDetails.getElementsByClassName("Park_mianji")[0]
              .innerHTML;
            var Park_zhudaocy = GoDetails.getElementsByClassName(
              "Park_zhudaocy"
            )[0].innerHTML;
            var Park_Id = GoDetails.getElementsByClassName("Park_Id")[0]
              .innerHTML;
            // console.log(Park_yuanqumc);
            // console.log(Park_location);
            // console.log(Park_mianji);
            // console.log(Park_zhudaocy);
            // console.log(Park_Id);
            self.$router.push({
              path: "/Parkdetails",
              query: {
                yuanquname: Base64.encode(Park_yuanqumc),
                location: Base64.encode(Park_location),
                mianji: Base64.encode(Park_mianji),
                zhudaocy: Base64.encode(Park_zhudaocy),
                Park_Id: Base64.encode(Park_Id)
              }
            });
            // let routeUrl = self.$router.resolve({
            //   path: "/Parkdetails",
            //   query: { name: Base64.encode(e.path[0].childNodes[0].data) }
            // });
            // window.open(routeUrl.href, "_blank");
          });
        },300);
      }
    },
    ParkyuanquLv() {
    //   console.log("124")
      var self = this
      self.GoParkMap()
    },
    GoParkEl() {
        this.$router.push("/park")
    }
  }
};
</script>
<style lang="scss">
#ParkTotalMap{
    .Te_form-group{
    .el-input__inner{
      width: 215px;
      overflow : hidden;
      text-overflow : ellipsis;
      white-space : nowrap;
    }
    .el-select__caret{
      padding-left: 2px;
    }
  }
    .Map_Form{
        display: inline-block;
        margin-left: 20px;
        .el-input__suffix{
            right: 26px !important;
        }
    }

    .Map_AllParkMaps{
        background: #fff;
        padding: 0 5px 0 5px;
    }
    .GoParkMap{
        cursor: pointer;
        font-weight: 600;
        color: #cf111b;
        margin-left: 5px;
        font-size: 20px;
    }

    // 地图信息窗口
  .BMap_bubble_title {
    color: white;
    font-size: 13px;
    font-weight: bold;
    text-align: left;
    padding-left: 5px;
    padding-top: 5px;
    border-bottom: 1px solid gray;
    background-color: #0066b3;
  }
  /* 消息内容 */
  .BMap_bubble_content {
    background-color: #fffdf5;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 10px;
  }
  /* 内容 */
  .BMap_pop div:nth-child(9) {
    top: 35px !important;
    border-radius: 7px;
  }
  .BMap_top {
    display: none;
  }
  .BMap_bottom {
    display: none;
  }
  .BMap_center {
    display: none;
  }
  // /* 隐藏边角 */
  .BMap_pop div:nth-child(1) div {
    display: none;
  }
  .BMap_pop div:nth-child(3) {
    display: none;
  }
  .BMap_pop div:nth-child(5) {
    display: none;
  }
  .BMap_pop div:nth-child(7) {
    display: none;
  }
  .BMap_shadow div:nth-child(7) {
    display: none;
  }
}
</style>