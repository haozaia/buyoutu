<template>
  <div id="parkMap">
    <div id="C_content">
      <div class="C_title">
        <span class="Title_left"></span>
        <span>{{ this.parkname }} &nbsp;</span>
        <div class="YuanquLv">
          <!-- <div class="form-group Search_Down_input"> -->
          <el-select v-model="paiming" @change="handleChangeKM" class="park_teInput Search_Down_input">
            <el-option
              v-for="item in paimingOptions"
              :key="item.value"
              :label="item.value"
              :value="item.lable"
              
            ></el-option>
          </el-select>
          <el-cascader
            placeholder="行业类型"
            ref="refHandle"
            style="width:140px;margin-right:10px;"
            v-model="hangye_search"
            :options="hangye_data"
            :props="{ checkStrictly: true , label:'value'}"
            @change="handleChangeHang"
            clearable
            filterable
          ></el-cascader>
          <el-select
            v-model="leixing"
            class="park_teInput Search_Down_input"
            @change="handleSelect"
            placeholder="企业类型"
          >
            <el-option label value>全部</el-option>
            <el-option
              v-for="item in gongsiLx_data"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="zibenscdy"
            class="park_teInput Search_Down_input"
            @change="handleSelect"
            placeholder="资本市场"
          >
            <el-option label value>全部</el-option>
            <el-option
              v-for="item in Zbshichang_data"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="Clriqi"
            class="park_teInput Search_Down_input"
            @change="handleSelect"
            placeholder="成立日期"
          >
            <el-option label value>全部</el-option>
            <el-option
              v-for="item in Clriqi_data"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          
          <el-switch
            style="margin-top:-4px;"
            v-model="IsZz"
            inactive-text="注册行业 :"
            @change="handleCHANGEradio"
            active-color="#CF111B"
          ></el-switch>
          <el-popover placement="top-start" title trigger="click">
            <el-form ref="form" label-width="112px" :model="form" :rules="rules">
              <el-form-item label="成立年限：" prop="styear">
                <el-col :span="12" style="width:45%;margin-right:10px">
                  <el-form-item prop="styear">
                    <el-input style="width:auto;" v-model="form.styear" placeholder="最小年限"></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col style="text-align: center;" :span="2">-</el-col> -->
                <el-col :span="12" style="width:45%;margin-right:10px">
                  <el-form-item prop="endyear">
                    <el-input style="width:auto;" v-model="form.endyear" placeholder="最大年限"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="注册资本：">
                <el-col :span="12" style="width:45%;margin-right:10px">
                  <el-form-item prop="stziben">
                    <el-input style="width:auto;" v-model="form.stziben" placeholder="最小注册资本(万元)"></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col style="text-align: center;" :span="2">-</el-col> -->
                <el-col :span="12" style="width:45%;margin-right:10px">
                  <el-form-item prop="endziben">
                    <el-input style="width:auto;" v-model="form.endziben" placeholder="最大注册资本(万元)"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <div style="text-align:center">
                <el-button size="mini" type="primary" @click="submitForm('form')">确定</el-button>&nbsp;&nbsp;
                <el-button size="mini" type="primary" @click="delForm('form')">清空</el-button>
              </div>
            </el-form>
            <el-tag
              style="display:inline-block;  margin-left:10px;  vertical-align: middle;  cursor:pointer; font-size:20px;"
              slot="reference"
              type="danger"
            >更多</el-tag>
          </el-popover>
          <!-- </div> -->
        <button class="Look_X" v-show="this.Jt_Close == false" @click="Look_Q">详情</button>
        <span ref="qiye_shu" class="Qiye_Shu" style>
          共
          <i class="colorH">{{ this.Z_total }}</i> 家
        </span>
        <el-button class="rtPark" @click="rtPark" type="primary">返回</el-button>
        </div>
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
              <div v-show="this.Z_total != '0'" id="ChartsL" style="width:100%;height:190px;"></div>
              <!-- 饼图右 -->
              <div v-show="this.Z_total != '0'" id="ChartsR" style="width:100%;height:190px"></div>
            </div>
            <div class="el-tabs">
              <p v-show="this.Z_total == '0'" style="font-size:20px;font-weight:600;text-align:center;">暂无数据，换个条件查查吧~</p>
              <div v-show="this.Z_total != '0'" class="query-result">
                <template>
                  <div class="table-wrapper">
                    <el-table
                      height="483"
                      :empty-text="tishi"
                      stripe
                      :data="tableData"
                      v-loading="loading"
                      style="width: 100%"
                    >
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
                      <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center"></el-table-column>
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
    var styear = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        if (Number.isInteger(Number(value)) && Number(value) > 0) {
          callback();
        } else {
          callback(new Error("请输入大于0的整数"));
        }
      }
    };
    var endyear = (rule, value, callback) => {
      var self = this;
      if (self.form.styear != "") {
          if (Number.isInteger(Number(value)) && Number(value) > 0) {
          
        if (value === "") {
          callback(new Error("请输入大于开始年限的整数"));
        } else if (value * 1 <= self.form.styear) {
          callback(new Error("请输入大于开始年限的整数"));
        } else if (value.length > 9) {
          callback(new Error("请输入十位以内整数"));
        } else {
          callback();
        }
        callback();
        } else{
          callback(new Error("请输入大于0的整数"));
        }
      } else if (value != "") {
        callback(new Error("请输入最小年限"));
      } else {
        callback();
      }
    };
    var endziben = (rule, value, callback) => {
      var self = this;
      if (self.form.stziben != "") {
        if (Number.isInteger(Number(value)) && Number(value) > 0) {
        if (value === "") {
          callback(new Error("请输入大于最小资本的整数"));
        } else if (value * 1 <= self.form.stziben) {
          callback(new Error("请输入大于最小的整数"));
        } else if (value.length > 9) {
          callback(new Error("请输入十位以内整数"));
        } else {
          callback();
        }
        }else{
          callback(new Error("请输入大于0的整数"));
        }
      } else if (value != "") {
        callback(new Error("请输入最小资本"));
      } else {
        callback();
      }
    };
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
      hangye_search: "",
      Clriqi: "",
      IsZz: false,
      hangye_data: [], //行业类型
      Clriqi_data: [
        //成立日期
        {
          value: "1",
          label: "成立1年内"
        },
        {
          value: "2",
          label: "成立1-3年"
        },
        {
          value: "3",
          label: "成立3-5年"
        },
        {
          value: "4",
          label: "成立5-10年"
        },
        {
          value: "5",
          label: "10年以上"
        }
      ],
      leixing: "",
      gongsiLx_data: [
        //企业类型列表
        {
          value: "2",
          label: "港澳台企业"
        },
        {
          value: "3",
          label: "外资企业"
        },
        {
          value: "4",
          label: "国有企业"
        }
      ],
      zibenscdy: "",
      Zbshichang_data: [
        //资本市场
        {
          value: "2",
          label: "A股公司"
        },
        {
          value: "3",
          label: "三板公司"
        },
        {
          value: "4",
          label: "四板公司"
        },
        {
          value: "5",
          label: "已私募"
        }
      ],
      yiji: "",
      erji: "",
      messageName: "",
      ParkRange:8000,
      Mapinfo_data: [], //标注点坐标信息
      distance: "1", //范围
      GoShowMap: "", //标点时获取范围的值（绘制圆1转1000）
      paimingOptions: [
        {
          value: "附近3Km",
          lable: "3000"
        },
        {
          value: "附近5Km",
          lable: "5000"
        },
        {
          value: "附近8Km",
          lable: "8000"
        },
        {
          value: "附近10Km",
          lable: "10000"
        },
        {
          value: "附近15Km",
          lable: "15000"
        },
        {
          value: "附近20Km",
          lable: "20000"
        },
        {
          value: "附近30Km",
          lable: "30000"
        },
      ],
      form: {
        styear: "",
        endyear: "",
        stziben: "",
        endziben: "",
      },
      rules: {
        styear: [{ validator: styear, trigger: "blur" }],
        endyear: [{ validator: endyear, trigger: "blur" }],
        stziben: [{ validator: styear, trigger: "blur" }],
        endziben: [{ validator: endziben, trigger: "blur" }]
      },
      paiming: "8000"
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
    // 请求行业类型下拉框
    self.hangyelist();
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

    // getElementByClassName("YuanquLv").offsetLeft
    // console.log(document.getElementsByClassName("YuanquLv")[0].offsetRight,"1213123")
    // console.log(document.getElementById("container").style.minHeight,"高度")
  },
  watch: {
    paiming(val) {
      var self = this
      self.ParkRange = val
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
      let params = {
        longitude: self.centerPoint[0],
        latitude: self.centerPoint[1],
        distance: self.ParkRange*1/1000,
        oldhangye: self.yiji,
        oldejhangye: self.erji,
        age: self.Clriqi,
        minAge: self.form.styear,
        maxAge: self.form.endyear,
        minNumber: self.form.stziben,
        maxNumber: self.form.endziben,
        leixing: self.leixing,
        zibenscdy: self.zibenscdy,
        isOld: self.IsZz
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
      // if (Range == undefined) {
      //   Range = 3;
      //   self.GoShowMap = 3000;
      // } else if (Range == 2000) {
      //   Range = 2;
      //   self.GoShowMap = 2000;
      // } else if (Range == 3000) {
      //   Range = 3;
      //   self.GoShowMap = 3000;
      // } else if (Range == 5000) {
      //   Range = 5;
      //   self.GoShowMap = 5000;
      // } else if (Range == 10000) {
      //   Range = 10;
      //   self.GoShowMap = 10000;
      // } else if (Range == 20000) {
      //   Range = 20;
      //   self.GoShowMap = 20000;
      // }
      let params = {
        longitude: self.centerPoint[0],
        latitude: self.centerPoint[1],
        distance: self.ParkRange*1/1000,
        oldhangye: self.yiji,
        oldejhangye: self.erji,
        age: self.Clriqi,
        minAge: self.form.styear,
        maxAge: self.form.endyear,
        minNumber: self.form.stziben,
        maxNumber: self.form.endziben,
        leixing: self.leixing,
        zibenscdy: self.zibenscdy,
        isOld: self.IsZz
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
    //是否证监会
    handleCHANGEradio(val) {
      // console.log(val,"2222")
      var self = this;
      self.page = 1;
      (self.hangye_search = "");
      (self.yiji = "");
      (self.erji = "");
      this.hangyelist();
      this.MapBiao(self.ParkRange);
      this.MapList(self.ParkRange);
      this.Leftlist(self.ParkRange);
      this.Rightlist(self.ParkRange);
    },
    handleChangeKM() {
      var self = this
      // console.log(111)
      self.page = 1;
    },
    //请求行业列表
    hangyelist() {
      var self = this;
      // console.log(self.IsZz,"sadsad")
      let params = {
        isOld: self.IsZz
      };
      this.axios({
        url: this.api.Industrysapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.hangye_data = res.data.data;
      });
    },
    //请求成立日期列表
    handleSelect() {
      var self = this;
      // console.log(self.Clriqi,"Clriqi")
      if(self.Clriqi){
        // console.log("为true")
        self.form.styear = ""
        self.form.endyear = ""
        // self.form.stziben = ""
        // self.form.endziben = ""
      }
      self.page = 1;
      self.Leftlist(self.ParkRange);
      self.Rightlist(self.ParkRange);
      self.MapList(self.ParkRange);
      self.MapBiao(self.ParkRange);
    },
    handleChangeHang(value) {
      console.log(value)
      var self = this;
      self.page = 1;
      self.yiji = value[0] ? value[0] : "";
      self.erji = value[1] ? value[1] : "";
      // console.log(self.yiji);
      // console.log(self.erji);
      self.Leftlist(self.ParkRange);
      self.Rightlist(self.ParkRange);
      self.MapList(self.ParkRange);
      self.MapBiao(self.ParkRange);
      // this.Gongxinjsqy()
    },
    ShowMap(Range) {
      var self = this;
      // console.log(Range,"Range")
      if (Range == undefined) {
        Range = 1000;
      }
      // var CenterPoint = self.location.split(',')
      // var map = new BMap.Map("container",); // 创建地图实例
      var map = new BMap.Map("container", { enableMapClick: false }); // 创建地图实例+禁用景点详情
      var point = new BMap.Point(self.centerPoint[0], self.centerPoint[1]); // 创建点坐标
      map.centerAndZoom(point, 13); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); // 开启滚轮缩放
      var circle = new BMap.Circle(point, self.ParkRange, {
        strokeColor: "#afbfdc",
        strokeWeight: 1,
        fillColor: "#00a0e9",
        fillOpacity: 0.15
      }); //创建圆

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
        var marker = new BMap.Marker(
          new BMap.Point(data_info[i].location.lon, data_info[i].location.lat)
        ); // 创建标注
        // console.log(data_info[i].chenglisj,"zhucedz")
        // console.log(self.IsZz,"iszzzzzzzzzzz")
        if(self.IsZz != false){
          var content = `<a style="cursor:pointer;color:#cf111b;width:100%;font-weight:600;margin-bottom:6px;display:inline-block;" class="GoDetails">${
            data_info[i].name
          }</a>${
            data_info[i].fadingdbr
              ? "</br><a>法定代表人：" + data_info[i].fadingdbr
              : ""
          }</a>${
            data_info[i].chenglisj
              ? "</br><a>成立时间：" + data_info[i].chenglisj
              : ""
          }</a>${
            data_info[i].zhucezbint
              ? "</br><a>注册资本(万元)：" + data_info[i].zhucezbint
              : ""
          }</a>${
            data_info[i].suoshuejhy
              ? "</br><a>主营业务：" + data_info[i].suoshuejhy
              : ""
          }</a>${
            data_info[i].dianhua
              ? "</br><a>联系电话：" + data_info[i].dianhua
              : ""
          }</a></br><a href="https://api.map.baidu.com/marker?location=${
            data_info[i].location.lat
          },${data_info[i].location.lon}&title=${data_info[i].name}&content=${
            data_info[i].zhucedz
          }&output=html" target="_blank">地址：${data_info[i].zhucedz}</a>`;
        }else {
          var content = `<a style="cursor:pointer;color:#cf111b;width:100%;font-weight:600;margin-bottom:6px;display:inline-block;" class="GoDetails">${
            data_info[i].name
          }</a>${
            data_info[i].fadingdbr
              ? "</br><a>法定代表人：" + data_info[i].fadingdbr
              : ""
          }</a>${
            data_info[i].chenglisj
              ? "</br><a>成立时间：" + data_info[i].chenglisj
              : ""
          }</a>${
            data_info[i].zhucezbint
              ? "</br><a>注册资本(万元)：" + data_info[i].zhucezbint
              : ""
          }</a>${
            data_info[i].oldejhangye
              ? "</br><a>主营业务：" + data_info[i].oldejhangye
              : ""
          }</a>${
            data_info[i].dianhua
              ? "</br><a>联系电话：" + data_info[i].dianhua
              : ""
          }</a></br><a href="https://api.map.baidu.com/marker?location=${
            data_info[i].location.lat
          },${data_info[i].location.lon}&title=${data_info[i].name}&content=${
            data_info[i].zhucedz
          }&output=html" target="_blank">地址：${data_info[i].zhucedz}</a>`;
        }
        // var content = `<a style="cursor:pointer;color:#cf111b;width:100%;font-weight:600;margin-bottom:6px;display:inline-block;" class="GoDetails">${data_info[i].name}</a></br><a>法定代表人：${data_info[i].fadingdbr}</a></br><a>成立时间：${data_info[i].chenglisj}</a></br><a>注册资本(万元)：${data_info[i].zhucezbint}</a>${data_info[i].dianhua ?'</br><a>联系电话：'+ data_info[i].dianhua: ''}</a></br><a href="https://api.map.baidu.com/marker?location=${data_info[i].location.lat},${data_info[i].location.lon}&title=${data_info[i].name}&content=${data_info[i].zhucedz}&output=html" target="_blank">地址：${data_info[i].zhucedz }</a>`;
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
          console.log(document.querySelector(".GoDetails"),"sss")
          var GoDetails = document.querySelector(".GoDetails");
          GoDetails.addEventListener("click", function(e) {
            // console.log(e.path[0].childNodes,"eeeeeeee")
            let routeUrl = self.$router.resolve({
              path: "/CompanyDetails",  
              query: { name: Base64.encode(e.path[0].childNodes[0].data) }
            });
            window.open(routeUrl.href, "_blank");
          });
        },300);
      }
      // 多个标注 end

      // // 多个标注 start
      // var data_info = self.Mapinfo_data;
      // var searchInfoWindow = null;

      // var opt={
      //   // title  : "百度大厦",      //标题
      //   width  : 290,             //宽度
      //   height : 105,              //高度
      //   panel  : "panel",         //检索结果面板
      //   enableAutoPan : true,     //自动平移
      //   searchTypes   :[
      //     BMAPLIB_TAB_SEARCH,   //周边检索
      //     BMAPLIB_TAB_TO_HERE,  //到这里去
      //     BMAPLIB_TAB_FROM_HERE //从这里出发
      //   ]
      // }
      // // var opts = {
      // //   width: 280, // 信息窗口宽度
      // //   // height: 80, // 信息窗口高度
      // //   BackgroundColor:"#000",
      // //   // title : "公司名称：" , // 信息窗口标题
      // //   offset: { height: -12, width: -6 },
      // //   enableMessage: true //设置允许信息窗发送短息
      // // };
      // for (var i = 0; i < data_info.length; i++) {
      //   var marker = new BMap.Marker(
      //     new BMap.Point(data_info[i].location.lon, data_info[i].location.lat)
      //   ); // 创建标注
      //   var content = `<a style="cursor:pointer;color:#cf111b;font-size:20px;font-weight:600;margin-bottom:6px;display:inline-block;" class="GoDetails">${data_info[i].name}</a></br><a style="font-size:20px;">地址：${data_info[i].zhucedz}</a>`;
      //   // var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
      //   //             '<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
      //   //             '地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。' +
      //   //           '</div>';
      //   // self.messageName = data_info[i].name
      //   // console.log(self.messageName,"messageName")
      //   map.addOverlay(marker); // 将标注添加到地图中
      //   addClickHandler(content, marker);
      // }

      // function addClickHandler(content, marker) {
      //   searchInfoWindow = new BMapLib.SearchInfoWindow(map, content ,opt);
      //   marker.addEventListener("click", function(e) {
      //     searchInfoWindow.open(marker);
      //     openInfo(content, e);
      //   });
      // }
      // function openInfo(content, e) {
      //   // console.log(content,"content")
      //   setTimeout(() => {
      //     // console.log(document.querySelector(".GoDetails"),"sss")
      //     var GoDetails = document.querySelector(".GoDetails");
      //     GoDetails.addEventListener("click", function(e) {
      //       // console.log(e.path[0].childNodes,"eeeeeeee")
      //       let routeUrl = self.$router.resolve({
      //         path: "/CompanyDetails",
      //         query: { name: Base64.encode(e.path[0].childNodes[0].data) }
      //       });
      //       window.open(routeUrl.href, "_blank");
      //     });
      //   });
      // }
      // // 多个标注 end

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
        distance: self.ParkRange*1/1000,
        oldhangye: self.yiji,
        oldejhangye: self.erji,
        age: self.Clriqi,
        minAge: self.form.styear,
        maxAge: self.form.endyear,
        minNumber: self.form.stziben,
        maxNumber: self.form.endziben,
        leixing: self.leixing,
        zibenscdy: self.zibenscdy,
        isOld: self.IsZz
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
        Range = 3;
        self.GoShowMap = 3000;
      } else if (Range == 2000) {
        Range = 2;
        self.GoShowMap = 2000;
      } else if (Range == 3000) {
        Range = 3;
        self.GoShowMap = 3000;
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
        distance: self.ParkRange*1/1000,
        oldhangye: self.yiji,
        oldejhangye: self.erji,
        age: self.Clriqi,
        minAge: self.form.styear,
        maxAge: self.form.endyear,
        minNumber: self.form.stziben,
        maxNumber: self.form.endziben,
        leixing: self.leixing,
        zibenscdy: self.zibenscdy,
        isOld: self.IsZz
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
    },
    submitForm(formName) {
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          self.Clriqi = ""
          self.page = 1;
          self.Leftlist(self.ParkRange);
          self.Rightlist(self.ParkRange);
          self.MapList(self.ParkRange);
          self.MapBiao(self.ParkRange);
        } else {
          this.$message("请正确填写相应信息");
        }
      });
    },
    delForm() {
      var self = this;
      (self.form = {
        styear: "",
        endyear: "",
        stziben: "",
        endziben: "",
      }),
        self.page = 1;
        self.Leftlist(self.ParkRange);
        self.Rightlist(self.ParkRange);
        self.MapList(self.ParkRange);
        self.MapBiao(self.ParkRange);
    },
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
        margin-right: 100px;
        .el-input__inner{
          border: none;
        }
        // background:rgba(255,255,255,1);
        // border:1px solid rgba(233,233,233,1);
        // border-radius:4px 4px 0px 4px;
        // margin-left: 30px;
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
        .rtPark{
          position: absolute;
          top: 15px;
          right: 20px;
        }
      }
      @media screen and (max-width: 1705px) {
        .YuanquLv{
          display: block;
          .rtPark{
            // top: 75px;
            right: 20px;
          }
        }
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
            min-height: 190px;
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
  .el-table__row > td:first-child {
    text-align: left !important;
  }
  .query-result .el-table__header {
    line-height: 5px;
  }
  .el-table td {
    padding: 0;
  }
  .el-table tr {
    height: 40px;
    color: black;
  }
  .YuanquLv {
        .el-input__inner{
          border: none;
        }
        .el-input__inner::placeholder{
          color: #000;
        }
  }
  /*地图标题*/
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
  .Search_Down_input {
    width: 140px;
    margin-right: 10px;
    .el-input {
      .el-input__suffix-inner {
        .el-input__icon {
          height: 36px !important;
        }
      }
    }
  }
  /* 左上角删除按键 */
  // .BMap_pop img {
  // 	top:43px !important;
  // 	left:215px !important;
  // }
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