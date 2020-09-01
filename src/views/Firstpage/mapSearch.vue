<template>
  <div id="mapSearch">
    <div id="C_content">
      <div class="C_title">
        <span class="Title_left"></span>
        <span class="inline">地图搜索</span>
        <div class="search_l inline">
          <div class="controlCity inline">
            <p>
              <span class="control colorH fontSize20">选择城市：</span>

              <el-cascader
                ref="refHandle"
                style="width:200px;"
                v-model="city_search"
                :options="city_data"
                :props="{ checkStrictly: true}"
                @change="handleChange"
                clearable
                filterable
              ></el-cascader>
            </p>
          </div>
          <el-button
            v-show="dialogTable"
            style="width: 130px !important; margin-top:-6px;"
            type="primary"
            @click="openDialog"
          >查看详情</el-button>
          <el-button
            v-show="dialogTable"
            style="margin-top:-6px;"
            type="primary"
            @click="deleteDialog"
          >清除</el-button>
        </div>

        <div class="search_r">
          <el-input
            class="fontSize20 Search_Entry_Div Search_Entry_input"
            v-model="name"
            clearable
            placeholder="请输入企业名称"
          ></el-input>
          <el-button @click="citySearch()" type="primary">查询</el-button>
        </div>
      </div>
      <div class="allmapWapper">
        <div id="allmap"></div>
      </div>
      
    </div>
    <el-dialog title :visible.sync="dialogTableVisible" @close="handleClose" width="1500px">
      <div slot="title" class="header-title fontSize24">
        <img class="gpsImg inline" src="../../assets/images/mapSearch/gps.svg" />
        <p class="inline">
          当前区域：
          <span class="colorH">{{address}}</span>
          &nbsp;&nbsp; 附近{{distance}}KM 以内公司
        </p>
        <div class="form-group inline" style="margin-left:20px">
          <el-switch
            style="margin-top:-4px;"
            v-model="isOld"
            inactive-text="切换行业 :"
            @change="handleCHANGEradio"
            active-color="#CF111B"
          ></el-switch>
        </div>
        <el-button
          v-show="total"
          @click="TipsB"
          style="float: right; margin-right: 50px;"
          type="primary"
          v-if="unitCode==3"
        >导出</el-button>
      </div>
      <div class="Maptop">
        <!-- <div class="container_message fontSize20">
          <img src="../../assets/images/Hangye_tishi.svg" alt />
          共为您查询到企业
          <span class="colorH">{{ total }}</span>
          家
        </div>-->
        <el-cascader
          placeholder="行业类型"
          ref="refHandles"
          style="width:138px;"
          v-model="hangye_search"
          :options="hangye_data"
          :props="{ checkStrictly: true , label:'value'}"
          @change="handleChangeHang"
          clearable
          filterable
        ></el-cascader>

        <el-select v-model="zhucezb" ref="select" @change="handleSelect" placeholder="注册资本">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="chenglisj" @change="handleSelect" placeholder="成立日期">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="phone" @change="handleSelect" placeholder="联系方式">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="gaoxinqy" @change="handleSelect" placeholder="高新企业">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select v-model="leixing" @change="handleSelect" placeholder="企业类型">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="zibenscdy" @change="handleSelect" placeholder="资本市场">
          <el-option label value>全部</el-option>
          <el-option
            v-for="item in options5"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-popover title trigger="click" width="520">
          <el-form ref="form" label-width="112px" :model="form" :rules="rules">
            <el-form-item label="成立年限：" prop="styear">
              <el-col :span="11">
                <el-form-item prop="styear">
                  <el-input style="width:auto;" v-model="form.styear" placeholder="最小年限"></el-input>
                </el-form-item>
              </el-col>
              <el-col style="text-align: center;" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endyear">
                  <el-input style="width:auto;" v-model="form.endyear" placeholder="最大年限"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="注册资本：">
              <el-col :span="11">
                <el-form-item prop="stziben">
                  <el-input style="width:auto;" v-model="form.stziben" placeholder="最小注册资本(万)"></el-input>
                </el-form-item>
              </el-col>
              <el-col style="text-align: center;" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endziben">
                  <el-input style="width:auto;" v-model="form.endziben" placeholder="最大注册资本(万)"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>

            <div style="text-align:center">
              <el-button size="mini" type="primary" @click="submitForm('form')">确定</el-button>&nbsp;&nbsp;
              <el-button size="mini" type="primary" @click="delForm('form')">清空</el-button>
            </div>
          </el-form>
          <el-tag
            style="display:inline-block;  margin-right:10px;  vertical-align: middle;  cursor:pointer; font-size:20px;"
            slot="reference"
            type="danger"
          >更多</el-tag>
        </el-popover>
        <span style="margin-left:20px;">
          共
          <span class="colorH">{{ total }}</span>
          家
        </span>
      </div>
      <div class="tableWapper" v-show="total !=0">
        <div class="dialogL inline">
          <div id="ChartsL" style="width:400px;height:230px;"></div>
          <div id="ChartsR" style="width:400px;height:230px"></div>
        </div>
        <div class="dialogR inline">
          <div class="query-result" style="padding:0 !important;">
            <div class="table-wrapper">
              <el-table
                stripe
                :data="gridData"
                id="toChange"
                v-loading="loading"
                style="width: 100%;"
              >
                <el-table-column prop="name" label="企业名称" width="360" align="left">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      class="toChange"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{ scope.row.name }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column>
                <el-table-column prop="fadingdbr" align="center" label="法人代表"></el-table-column>
                <el-table-column prop="zhucezbint" align="center" width="200" label="注册资本(万元)">
                  <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                </el-table-column>
                <el-table-column prop="chenglisj" align="center" label="成立时间">
                  <template
                    slot-scope="{row}"
                  >{{ row.chenglisj?row.chenglisj.substring(0, 10) : '-' }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination" style="padding:0;">
            <el-pagination
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="handleCurrentChange"
              :page-size="10"
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
      </div>
      <div class="tableWapper" v-show="total==0">
        <div class="query-result" style="padding:0 !important;">
          <div class="table-wrapper">
            <el-table
              stripe
              :data="gridData"
              id="toChange"
              v-loading="loading"
              style="width: 100%;"
            >
              <el-table-column prop="name" label="企业名称" width="360" align="left">
                <template slot-scope="scope">
                  <router-link
                    target="_blank"
                    tag="a"
                    class="toChange"
                    style="color:#606266;text-decoration:none;"
                    :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                  >{{ scope.row.name }}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column>
              <el-table-column prop="fadingdbr" align="center" label="法人代表"></el-table-column>
              <el-table-column prop="zhucezbint" align="center" width="200" label="注册资本(万元)">
                <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
              </el-table-column>
              <el-table-column prop="chenglisj" align="center" label="成立时间">
                <template
                  slot-scope="{row}"
                >{{ row.chenglisj?row.chenglisj.substring(0, 10) : '-' }}</template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- <div class="mask"></div> -->
  </div>
</template>

<script>
// import BMap from "BMap";
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
        } else {
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
        } else {
          callback(new Error("请输入大于0的整数"));
        }
      } else if (value != "") {
        callback(new Error("请输入最小资本"));
      } else {
        callback();
      }
    };
    return {
      dialogTableVisible: false,
      dialogTable: "",
      gridData: [],
      total: 0,
      page: 1,
      suibian: true,
      loading: true,
      city_data: [],
      hangye_data: [],
      city_search: [],
      sheng: "",
      shi: "",
      qu: "",
      hangye_search: [],
      yiji: "",
      erji: "",
      name: "",
      address: "",
      distance: "",
      righttableData: [],
      zhucezb: "",
      chenglisj: "",
      phone: "",
      gaoxinqy: "",
      zibenscdy: "",
      shengyu: 0,
      count: "",
      form: {
        styear: "",
        endyear: "",
        stziben: "",
        endziben: ""
      },
      rules: {
        styear: [{ validator: styear, trigger: "blur" }],
        endyear: [{ validator: endyear, trigger: "blur" }],
        stziben: [{ validator: styear, trigger: "blur" }],
        endziben: [{ validator: endziben, trigger: "blur" }]
      },

      leixing: "",
      options: [
        {
          value: "1",
          label: "小于1000万"
        },
        {
          value: "2",
          label: "1000~5000万"
        },
        {
          value: "3",
          label: "5000~10000万"
        },
        {
          value: "4",
          label: "10000万以上"
        }
      ],
      options1: [
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
      options2: [
        {
          value: "1",
          label: "有联系方式"
        },
        {
          value: "2",
          label: "无联系方式"
        }
      ],
      options3: [
        {
          value: "1",
          label: "是高新企业"
        },
        {
          value: "0",
          label: "非高新企业"
        }
      ],
      options4: [
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
      options5: [
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
      showTable: true,
      username: "",
      telphone: "",
      isOld: false,
      unitCode: ""
    };
  },
  watch: {
    sheng() {
      this.getCity();
    },
    shi() {
      this.getCity();
    },
    qu() {
      // console.log(123)
      this.getCity();
    },
    city_search(value) {
      var self = this;
      // console.log(value);/
      self.sheng = value[0] ? value[0] : "";
      self.shi = value[1] ? value[1] : "";
      self.qu = value[2] ? value[2] : "";
    }
  },
  created() {},
  mounted() {
    var self = this;
    self.username = localStorage.getItem("userName");
    self.telphone = localStorage.getItem("mobile");
    self.unitCode = localStorage.getItem("unitCode");
    console.log(this.$route.query.quyuCity);
    if (this.$route.query.quyuCity) {
      if (this.$route.query.quyuCity === '"上海市"') {
        console.log("上海");
        self.city_search = ["上海市"];
        setTimeout(() => {
          self.citySearch(1);
        }, 100);
      } else {
        self.city_search = this.$route.query.quyuCity
          ? JSON.parse(this.$route.query.quyuCity)
          : [];
        setTimeout(() => {
          self.citySearch(1);
        }, 100);
      }
    }
    // console.log( self.city_search)
    self.drawMap();
    self.citylist();
    self.Exportcount();
    document.getElementById("allmap").style.minHeight =
      document.getElementById("leftNav").offsetHeight - 102 + "px";
  },
  methods: {
    submitForm(formName) {
      var self = this;
      self.isCountData = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (self.form.styear) {
            self.chenglisj = "";
          } else if (self.form.stziben) {
            self.zhucezb = "";
          }
          setTimeout(() => {
            self.page = 1;
            self.Leftlist();
            self.Rightlist();
            self.getMapCompanyLists();
          }, 100);
        } else {
          this.$message("请正确填写相应信息");
        }
      });
    },
    delForm(formName) {
      var self = this;
      this.$refs[formName].resetFields();
      self.page = 1;
      self.Leftlist();
      self.Rightlist();
      self.getMapCompanyLists();
    },
    handleCHANGEradio() {
      var self = this;
      (self.erji = ""),
        (self.yiji = ""),
        (self.hangye_search = []),
        // this.$refs.refHandles.getCheckedNodes()=[]
        self.Leftlist(),
        self.getMapCompanyLists();
      self.Rightlist();
      self.hangyelist();
    },
    TipsB() {
      var self = this;
      this.$prompt(
        "请输入导出条数(剩余额度" + this.shengyu + "条)",
        "导出向导(自动过滤已导出数据)",
        {
          confirmButtonText: "导出",
          showCancelButton: false,
          inputPattern: /^(0\.0[1-9]|0\.[1-9]\d|[1-9]\d?(\.\d\d)?|[1-4]\d\d(\.\d\d)?|500)$/,
          inputErrorMessage: "请输入1-500之间的整数"
        }
      )
        .then(({ value }) => {
          console.log(value);
          if (value > self.shengyu) {
            this.$message.error("导出数量超出今日额度");
          } else {
            console.log(222);
            self.count = value;
            let url =
              self.api.exportbyqiyesearchesapi +
              "?type=" +
              self.zhucezb +
              "&longitude=" +
              self.longitude +
              "&latitude=" +
              self.latitude +
              "&distance=" +
              self.distance +
              "&oldhangye=" +
              self.yiji +
              "&oldejhangye=" +
              self.erji +
              "&lianxidh=" +
              self.phone +
              "&leixing=" +
              self.leixing +
              "&isGx=" +
              self.gaoxinqy +
              "&age=" +
              self.chenglisj +
              "&zibenscdy=" +
              self.zibenscdy +
              "&username=" +
              self.username +
              "&telphone=" +
              self.telphone +
              "&isOld=" +
              self.isOld +
              "&count=" +
              self.count;
            window.location.href = url; //  跳转链接
            setTimeout(function() {
              self.Exportcount();
            }, 2000);
          }
        })
        .catch(value => {
          console.log(value);
          this.$message({
            type: "info",
            message: "取消导出"
          });
        });
    },
    Exportcount() {
      var self = this;
      let params = {
        username: self.username,
        telphone: self.telphone
      };
      this.axios({
        url: this.api.Exportcount,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.shengyu = res.data.data[0].shengyu;
        // self.yidao = res.data.data[0].yidao;
      });
    },
    openDialog() {
      var self = this;
      self.dialogTableVisible = true;
      self.getMapCompanyLists();
      self.Rightlist();
      self.hangyelist();
      self.Leftlist();
    },
    deleteDialog() {
      var self = this;
      self.map.clearOverlays();
      self.dialogTable = false;
    },
    handleSelect() {
      var self = this;
      console.log(self.zhucezb);

      if (self.chenglisj) {
        self.form.styear = "";
        self.form.endyear = "";
      }
      if (self.zhucezb) {
        self.form.stziben = "";
        self.form.endziben = "";
      }
      setTimeout(() => {
        self.page = 1;
        self.Leftlist();
        self.Rightlist();
        self.getMapCompanyLists();
      }, 100);
    },
    handleClose() {
      var self = this;
      (self.zhucezb = ""),
        (self.chenglisj = ""),
        (self.phone = ""),
        (self.gaoxinqy = "");
      self.leixing = "";
      self.hangye_search = [];
      self.yiji = "";
      self.erji = "";
      self.zibenscdy = "";
      self.showTable = true;
      self.page = 1;
      self.isOld = false;
      this.$refs["form"].resetFields();
    },

    handleChange(value) {
      var self = this;
      console.log(self.city_search);
      self.sheng = value[0] ? value[0] : "";
      self.shi = value[1] ? value[1] : "";
      self.qu = value[2] ? value[2] : "";
      console.log(self.sheng);
      console.log(self.shi);
      console.log(self.qu);
      this.page = 1;
      // this.Gongxinjsqy()
    },
    handleChangeHang(value) {
      var self = this;
      self.yiji = value[0] ? value[0] : "";
      self.erji = value[1] ? value[1] : "";
      console.log(self.yiji);
      console.log(self.erji);
      self.Leftlist();
      self.Rightlist();
      self.getMapCompanyLists();
      self.page = 1;
      // this.Gongxinjsqy()
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
      // console.log(`当前页: ${val}`);
      self.page = val;

      //分页--判断当前页是否为最后一页，禁用右按钮  start
      var cot = Math.ceil(self.total / 10);
      self.suibian = false; //是否禁用首页按钮
      //分页--判断当前页是否为最后一页，禁用右按钮  end
      self.getMapCompanyLists();
    },
    getCity() {
      var self = this;
      self.map.clearOverlays();
      self.dialogTable = false;
      if (self.qu) {
        self.map.centerAndZoom(self.qu, 13);
      } else if (self.shi) {
        self.map.centerAndZoom(self.shi, 10);
      } else if (self.sheng) {
        self.map.centerAndZoom(self.sheng, 7);
      } else {
        self.map.centerAndZoom("全国", 5);
      }
    },
    drawMap() {
      var self = this;
      // 百度地图API功能
      var map = new BMap.Map("allmap", { enableMapClick: false });
      self.map = new BMap.Map("allmap", { enableMapClick: false });
      self.getCity(map);

      // 定义一个控件类,即function
      function ZoomControl() {
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(200, 10);
      }
      self.map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
      self.map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用

      // 通过JavaScript的prototype属性继承于BMap.Control
      ZoomControl.prototype = new BMap.Control();

      // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
      //实例化鼠标绘制工具
      var drawingManager = new BMapLib.DrawingManager(self.map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_LEFT, //位置
          offset: new BMap.Size(5, 5), //偏离值
          drawingModes: [BMAP_DRAWING_CIRCLE]
        },
        circleOptions: {
          fillColor: "#87CEFA",
          strokeWeight: 1,
          fillOpacity: 0.3,
          strokeOpacity: 0.3
        }
      });
      var overlay = null; //圆覆盖物
      var label = null; //显示半径信息
      var overlaycomplete = function(e) {
        centerPoint = null;
        map.removeOverlay(label);
      };
      //添加鼠标绘制工具监听事件，用于获取绘制结果
      drawingManager.addEventListener("overlaycomplete", overlaycomplete);
      var centerPoint = null; //圆心
      self.map.addEventListener("mousemove", showInfo);
      function showInfo(e) {
        //判断当前是画圆的模式
        if (drawingManager._mask != null) {
          // console.log(123);
          drawingManager._mask.addEventListener("mousedown", getCenter);
          map.removeEventListener("mousemove", showInfo);
        }
      }

      var getCenter = function(e) {
        if (centerPoint == null) {
          centerPoint = e.point;
          drawingManager._mask.addEventListener("mousemove", showRadis);
        }
      };
      var showRadis = function(e) {
        var radius = drawingManager._map.getDistance(centerPoint, e.point);
        if (!isNaN(radius)) {
          self.map.removeOverlay(label); //取消上一个显示半径的label
          //添加文字标签
          var opts = {
            position: e.point, // 指定文本标注所在的地理位置（当前鼠标的位置）
            offset: new BMap.Size(0, 0) //设置文本偏移量
          };
          label = new BMap.Label(
            "当前半径：" + (radius / 1000).toFixed(2) + "公里",
            opts
          );
          // 创建文本标注对象
          label.setStyle({
            border: "1px solid #ccc",
            maxWidth: "none "
          });
          self.map.addOverlay(label); //添加label
        }
      };

      // 创建地理编码实例
      var myGeo = new BMap.Geocoder();
      //添加鼠标绘制工具监听事件，用于获取绘制结果
      drawingManager.addEventListener("circlecomplete", function(e, overlay) {
        self.map.clearOverlays();
        var center = e.getCenter();

        var radius = 0;
        if (parseInt(e.getRadius()) > 1500000) {
          radius = 1500000;
          self.$message({
            message: "最大只能选取1500公里内的公司！",
            type: "warning"
          });
        } else {
          radius = parseInt(e.getRadius());
        }

        let point = new BMap.Point(center.lng, center.lat); // 创建点坐标
        var circle = new BMap.Circle(point, radius, {
          strokeColor: "#afbfdc",
          strokeWeight: 1,
          fillColor: "#00a0e9",
          fillOpacity: 0.15
        }); //创建圆
        self.map.addOverlay(circle);

        drawingManager.close();
        console.log(center);
        self.distance = radius / 1000;
        self.dialogTable = true;
        // 根据坐标得到地址描述
        myGeo.getLocation(new BMap.Point(center.lng, center.lat), function(
          result
        ) {
          if (result) {
            self.address = result.address;
          }
        });
        self.longitude = center.lng;
        self.latitude = center.lat;
        self.getMapCompanyList(self.map);
        self.getMapCompanyLists();
        self.hangyelist();
        self.Rightlist();
        self.Leftlist();
        self.dialogTableVisible = true;
      });
      // 创建控件
      var myZoomCtrl = new ZoomControl();
      // 添加到地图当中
      map.addControl(myZoomCtrl);
    },
    //请求城市列表
    citylist() {
      var self = this;
      this.axios({
        url: this.api.LXshengshiquapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.city_data = res.data.data;
      });
    },
    //请求行业列表
    hangyelist() {
      var self = this;
      let params = {
        isOld: self.isOld
      };
      this.axios({
        url: this.api.Industrysapi,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.hangye_data = res.data.data;
      });
    },
    //查询框
    citySearch(sourceModule) {
      var self = this;
      if (self.name == "" && !sourceModule) {
        this.$message.error({
          message: "请输入搜索关键字~",
          duration: 3000,
          center: true
        });
      } else {
        let params = {
          province: self.sheng ? self.sheng : "全国",
          city: self.shi,
          area: self.qu,
          keyword: self.name,
          sourceModule: sourceModule
        };
        this.axios({
          url: this.api.CokeywordsearchapimKebilist,
          data: this.$qs.stringify(params),
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          console.log(res.data.data.length == 0);
          if (res.data.data.length == 0) {
            this.$message.error({
              message: "暂无数据~",
              duration: 3000,
              center: true
            });
            self.map.clearOverlays();
            self.dialogTable = false;
          } else {
            self.map.clearOverlays();
            self.punctuation(res.data.data);
            self.dialogTable = false;
          }

          // self.city_data = res.data.data;
        });
      }
    },
    //请求dian
    getMapCompanyList() {
      var self = this;
      let params = {
        longitude: self.longitude,
        latitude: self.latitude,
        distance: self.distance
      };
      this.axios({
        url: this.api.Park_MapBiao,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.punctuation(res.data.data);
      });
    },
    //请求列表
    getMapCompanyLists() {
      var self = this;
      let params = {
        longitude: self.longitude,
        latitude: self.latitude,
        distance: self.distance,
        oldhangye: self.yiji,
        oldejhangye: self.erji,
        type: self.zhucezb,
        lianxidh: self.phone,
        leixing: self.leixing,
        isGx: self.gaoxinqy,
        age: self.chenglisj,
        zibenscdy: self.zibenscdy,
        page: self.page,
        limit: 10,
        isOld: self.isOld,
        minAge: self.form.styear,
        maxAge: self.form.endyear,
        minNumber: self.form.stziben,
        maxNumber: self.form.endziben
      };
      this.axios({
        url: this.api.Park_MapList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.loading = false;
        self.gridData = res.data.data;
        self.total = res.data.count;
        var right = document.getElementsByClassName("btn-next");
        right[0].disabled = "";
        // 分页--下一页disabled
        var cot = Math.ceil(self.total / 10);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        }
        if (self.page == 1) {
          self.suibian = true;
        }
        // self.punctuation(map, res.data.data);
      });
    },
    punctuation(data_info) {
      var self = this;
      for (var i = 0; i < data_info.length; i++) {
        var marker = new BMap.Marker(
          new BMap.Point(data_info[i].location.lon, data_info[i].location.lat)
        ); // 创建标注
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
        self.map.addOverlay(marker); // 将标注添加到地图中
        self.addClickHandler(content, marker);
      }
    },

    addClickHandler(content, marker) {
      var self = this;
      marker.addEventListener("click", function(e) {
        var p = e.target;
        var opts = {
          width: 300, // 信息窗口宽度
          enableMessage: true //设置允许信息窗发送短息
        };
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        this.openInfoWindow(infoWindow, point); //开启信息窗口

        setTimeout(() => {
          // console.log(document.querySelector(".GoDetails"),"sss")
          var GoDetails = document.querySelector(".GoDetails");
          GoDetails.addEventListener("click", function(e) {
            // console.log(e.path[0].childNodes,"eeeeeeee")
            let routeUrl = self.$router.resolve({
              path: "/CompanyDetails",
              query: { name: Base64.encode(e.path[0].childNodes[0].data) }
            });
            window.open(routeUrl.href, "_blank");
          });
        }, 200);
      });
    },
    Leftlist() {
      var self = this;
      let params = {
        longitude: self.longitude,
        latitude: self.latitude,
        distance: self.distance,
        oldhangye: self.yiji,
        oldejhangye: self.erji,
        type: self.zhucezb,
        lianxidh: self.phone,
        leixing: self.leixing,
        isGx: self.gaoxinqy,
        age: self.chenglisj,
        zibenscdy: self.zibenscdy,
        isOld: self.isOld,
        minAge: self.form.styear,
        maxAge: self.form.endyear,
        minNumber: self.form.stziben,
        maxNumber: self.form.endziben
      };
      this.axios({
        url: this.api.Park_leftBing,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.lefttableData = res.data.data;
        self.ChartsL();
      });
    },
    ChartsL() {
      var self = this;
      self.charts = this.$echarts.init(document.getElementById("ChartsL"));
      var option = {
        title: {
          text: "行业统计Top5",
          left: "center",
          bottom: "0",
          textStyle: {
            //图例文字的样式
            color: "#333",
            fontSize: 16
          }
        },
        tooltip: {
          textStyle: {
            fontSize: 16
          },
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            name: " ",
            type: "pie",
            radius: "63%",
            center: ["50%", "45%"],
            data: self.lefttableData,
            label: {
              //饼图图形上的文本标签
              normal: {
                show: true,
                textStyle: {
                  fontWeight: 300,
                  fontSize: 16 //文字的字体大小
                }
              }
            },
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
    Rightlist() {
      var self = this;
      let params = {
        longitude: self.longitude,
        latitude: self.latitude,
        distance: self.distance,
        oldhangye: self.yiji,
        oldejhangye: self.erji,
        type: self.zhucezb,
        lianxidh: self.phone,
        leixing: self.leixing,
        isGx: self.gaoxinqy,
        age: self.chenglisj,
        zibenscdy: self.zibenscdy,
        isOld: self.isOld,
        minAge: self.form.styear,
        maxAge: self.form.endyear,
        minNumber: self.form.stziben,
        maxNumber: self.form.endziben
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
          left: "center",
          bottom: "0",
          textStyle: {
            //图例文字的样式
            color: "#333",
            fontSize: 16
          }
        },
        tooltip: {
          textStyle: {
            fontSize: 16
          },
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            name: " ",
            type: "pie",
            radius: "63%",
            center: ["50%", "45%"],
            data: self.righttableData,
            label: {
              //饼图图形上的文本标签
              normal: {
                show: true,
                textStyle: {
                  fontWeight: 300,
                  fontSize: 16 //文字的字体大小
                }
              }
            },
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
    }
  }
};
</script>

<style lang="scss">
#mapSearch {
  height: 100%;
  body,
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: "微软雅黑";
  }
  .el-dialog__wrapper {
    z-index: 2000 !important;
  }

  #allmap {
    width: 100%;
  }
  p {
    margin-left: 5px;
  }
  .allmapWapper {
    padding: 10px;
    background: #ffffff;
  }
  .el-dialog {
    border-radius: 6px;
  }
  .el-dialog__body {
    color: #000;
    padding: 10px 30px 20px;
  }
  .Maptop {
    padding-bottom: 10px;
    .container_message {
      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-left: 10px;
        margin-bottom: 5px;
      }
      .GoMap {
        cursor: pointer;
      }
      height: 40px;
      background: rgba(207, 17, 27, 0.1);
      border: 1px solid rgba(241, 104, 111, 1);
      border-radius: 4px;
      line-height: 40px;
    }
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #000;
  }
  .el-dialog__headerbtn .el-dialog__close:hover {
    color: #cf111b;
  }
  .gpsImg {
    width: 19px;
    height: 24px;
  }

  .controlCity {
    border: 1px solid rgba(233, 233, 233, 1);
    border-radius: 4px;
    position: relative;
    top: -4px;
    // padding: 0 9px;
    margin: 0 10px 0 20px;
    .el-input__icon {
      line-height: 36px;
    }
    .el-cascader .el-input .el-icon-arrow-down {
      font-size: 20px;
    }
    .control {
      font-weight: 400;
      padding: 0 20px;
      border-right: 1px solid #999;
      height: 20px;
      display: inline-block;
    }
    .el-input__inner {
      border: none;
    }
  }

  .BMapLib_box {
    background-size: auto 36px;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #ffffff;
  }
  .dialogR {
    width: calc(100% - 430px);
  }
  .dialogL {
    width: 430px;
    vertical-align: top;
  }
  .BMapLib_Drawing_panel {
    height: 50px;
    border: none;
    .BMapLib_hander {
      background-image: url(../../assets/images/mapSearch/handleR.svg);
    }
    .BMapLib_hander_hover {
      background-image: url(../../assets/images/mapSearch/handleW.svg);
      background-color: #cf111b;
    }
    .BMapLib_circle {
      background-image: url(../../assets/images/mapSearch/ballR.svg);
    }
    .BMapLib_circle_hover {
      background-image: url(../../assets/images/mapSearch/ballw.svg);
      background-color: #cf111b;
    }
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
  .el-dropdown-link {
    cursor: pointer;
    // color: #409EFF;
  }
  // .el-input__inner:nth-child(1) {
  //   width: 170px;
  // }
  .Maptop {
    .el-select {
      width: 148px;
    }
    .el-input__inner::placeholder {
      color: #000;
    }
    .el-cascader .el-input .el-icon-arrow-down {
      color: #000;
      font-size: 20px;
    }
    .el-input__inner {
      width: 140px;
      border: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .el-select .el-input .el-select__caret {
      color: #000;
    }
  }
  .el-dialog__header {
    padding: 10px 20px;
    background: #eee !important;
    border-radius: 6px 6px 0 0;
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
  /* 隐藏边角 */
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
.el-dropdown,
.el-dropdown-menu__item {
  font-size: 20px;
  color: #000;
}
.el-input__icon {
  line-height: 36px;
}
.v-modal {
  z-index: 1999 !important;
}
</style>