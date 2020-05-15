<template>
  <div id="Parkdetails">
    <div id="C_content">
      <div class="C_title">
        <span class="Title_left"></span>园区详情
        <!-- <button class="rtPark" @click="rtPark">返回</button> -->
        <el-button class="rtPark" @click="rtPark" type="primary">返回</el-button>
      </div>
      <!-- 搜索、查询 -->
      <!-- <div class="Five">
      <div class="search_l">
        <i class="iconfont icon-sousuo"></i>
        <input id="code" type="text" v-model="gongsiname" placeholder="该功能暂未完善,敬请期待..." autocomplete="off" />
      </div>
      <div class="search_r">
        <i class="iconfont icon-sousuo"></i>
        <input id="shareholder" type="text" v-model="gudongmc" placeholder="该功能暂未完善,敬请期待..." autocomplete="off" />
      </div>
      <div class="query">
        <button @click="tablelist()">查询</button>
      </div>
      </div>-->
      <div class="park-content">
        <div class="ind-title">
          <p>
            <i class="icon icon-tips"></i>
            <span>{{this.parkname}}</span> 为您查询到企业
            <span id="Tag">{{ this.total }}</span> 个
          </p>
        </div>
        <div class="chaxun">
          <div class="form-wrapper">
            <div class="form-group ChaXun">
              <div class="form-group">
                <span class="control-label">公司名称：</span>
                <input class="input_k" v-model="gongsiname" type="text" />
              </div>
              <div class="form-group">
                <span class="control-label">注册资金(万)：</span>
                <input v-model="zhucezj_S" class="Num input_k" type="text" oninput="value=value.replace(/[^\d]/g,'')"/> -
                <input v-model="zhucezj_E" class="Num input_k" type="text" oninput="value=value.replace(/[^\d]/g,'')"/>
              </div>
              <!-- <div class="form-group">
                  <span class="control-label">成立时间 :</span>
                  <input class="Num" type="text"> - <input class="Num" type="text">
              </div>-->
              <div class="block">
                <span class="demonstration fontSize20">成立日期(始)：</span>
                <el-date-picker
                  class="Time"
                  v-model="timestart"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div class="block">
                <span class="demonstration2 fontSize20">成立日期(终)：</span>
                <el-date-picker
                  class="Time"
                  v-model="timeend"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div class="form-group JyFw">
                <span class="control-label jyfw">经营范围：</span>
                <input class="input_k" v-model="jingyingfw" type="text" placeholder="计算机/电子设备/制造" />
              </div>
              <!-- <div class="form-group">
                  <button
                    class="btn btn-query btn-action"
                    @click="searchlist(1,20)"
                    type="button"
                    role="button"
                  >
                    <span class="chaxun search_CHaxun">查询</span>
                  </button>
              </div>-->
              <el-button @click="searchlist(1,20)" type="primary">查询</el-button>
              <el-button @click="Ex_port()" type="primary">导出</el-button>
            </div>
          </div>
        </div>
        <!-- <div class="map_body"> -->
        <!-- <div id="map_left"> -->
        <div class="el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData">
                <el-table-column prop="name" label="企业名称" width="500" align="center">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      class="toChange"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{scope.row.name}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="chenglisj" align="center" label="成立时间">
                  <template slot-scope="{row}">
                    {{ row.chenglisj || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="fadingdbr" align="center" label="法定代表人">
                  <template slot-scope="{row}">
                    {{ row.fadingdbr || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                  <template slot-scope="{row}">
                    {{ row.zhucezbint || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="suoshuzbsc" align="center" label="所属资本市场">
                  <template slot-scope="{row}">
                    {{ row.suoshuzbsc || '-' }}
                  </template>
                </el-table-column>
              </el-table>
              <!-- <el-table stripe :data="tableData" style="width: 100%">
                  <el-table-column prop="name" label="企业名称" align="center">
                    <template slot-scope="scope">
                      <router-link
                        target="_blank"
                        tag="a"
                        class="toChange"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                      >{{scope.row.name}}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="chenglisj" align="center" width="100" label="成立时间"></el-table-column>
                  <el-table-column prop="fadingdbr" align="center" width="90" label="法定代表人"></el-table-column>
                  <el-table-column prop="zhucezb" align="center" width="150" label="注册资本"></el-table-column>
                  <el-table-column prop="tongxindz" align="center" label="通讯地址"></el-table-column>
              </el-table>-->
            </div>
          </div>
        </div>
        <!-- 分页dom start -->
        <div id="Pagination" v-show="total > 20">
          <el-pagination
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            @current-change="handleCurrentChange"
            :page-size="20"
            :current-page="page"
          ></el-pagination>
          <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
        </div>
        <!-- <div class="FYbottom" style="height:30px;" v-if="FYbottom"></div> -->
        <!-- 分页dom end -->
        <!-- </div> -->
        <!-- 地图 -->
        <!-- <div id="container"></div> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import "../../../node_modules/echarts/map/js/china.js";
export default {
  data() {
    return {
      // FenYe: true, //隐藏分页器
      // FYbottom: false,
      parkname: "",
      parkid: "",
      gongsiname: "",
      zhucezj_S: "",
      zhucezj_E: "",
      jingyingfw: "",
      timestart: "",
      timeend: "",
      tableData: [],
      count: "",
      loading: true,
      total: 0,
      page: 1,
      suibian: true, //分页变量3
      shengyu: "",
      yidao: "",
      username: "",
      telphone: "",
    };
  },
  mounted() {
    var self = this
    var yuanquname = this.$route.query.yuanquname;
    this.parkname = Base64.decode(yuanquname);
    self.username = localStorage.getItem("userName");
    self.telphone = localStorage.getItem("mobile");
    this.parkid = this.$route.query.park; 
    this.map();
    this.companylist();
    this.Exportcount();
  },
  watch: {
    page(val) {
      var self = this;
      if (val == 1) {
        self.suibian = true;
      }
    }
  },
  methods: {
    map() {
      var map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13
      });
    },
    Ex_port() {
      var self = this;
      this.$prompt(
        "请输入导出条数(剩余额度" + this.shengyu + "条)",
        "导出向导",
        {
          confirmButtonText: "导出",
          cancelButtonText: "取消",
          showCancelButton: false,
          inputPattern: /^(0\.0[1-9]|0\.[1-9]\d|[1-9]\d?(\.\d\d)?|[1-4]\d\d(\.\d\d)?|500)$/,
          inputErrorMessage: "请输入1-500之间的整数"
        }
      )
        .then(({ value }) => {
          if (value > self.shengyu) {
            this.$message.error("导出数量超出今日额度");
          } else {
            self.count = value;
            let url =
              self.api.Park_export +
              "?type=" +
              self.type +
              "&parkId=" +
              self.parkid +
              "&name=" +
              self.gongsiname +
              "&startTime=" +
              self.timestart +
              "&endTime=" +
              self.timeend +
              "&startNumber=" +
              self.zhucezj_S +
              "&endNumber=" +
              self.zhucezj_E +
              "&jingyingfw=" +
              self.jingyingfw +
              "&username=" +
              self.username +
              "&telphone=" +
              self.telphone +
              "&count=" +
              self.count;
            window.location.href = url; //  跳转链接
            setTimeout(function() {
              self.Exportcount();
            }, 2000);
          }
        })
        .catch(() => {
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
        self.yidao = res.data.data[0].yidao;
      });
    },
    // 分页--回到首页按钮  start
    paginationsy() {
      if (this.page === 1) {
      } else {
        // this.page = 1
        this.handleCurrentChange(1);
      }
    },
    // 分页--回到首页按钮  end
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      //分页--判断当前页是否为最后一页，禁用右按钮  start
      // var cot =  parseInt(self.total/10)+1
      self.suibian = false; //是否禁用首页按钮
      //分页--判断当前页是否为最后一页，禁用右按钮  end
      // console.log(self.page);
      self.companylist(val, 20);
    },
    companylist() {
      var self = this;
      // self.FenYe = true
      var right = document.getElementsByClassName("btn-next");
        right[0].disabled = "";
      self.loading = true;
      let params = {
        page: this.page,
        limit: 20,
        parkId: this.parkid,
        name: this.gongsiname,
        startTime: this.timestart,
        endTime: this.timeend,
        startNumber: this.zhucezj_S,
        endNumber: this.zhucezj_E,
        jingyingfw: this.jingyingfw
      };
      this.axios({
        url: this.api.Yuanqucompany,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res);
        
        this.total = res.data.count;
        this.tableData = res.data.data;
        // 分页--下一页disabled
        var cot = Math.ceil(self.total / 20);
        // 隐藏分页器 start
        // if(cot <= 20){
        //   self.FenYe = false
        //   self.FYbottom = true
        // }
        // 隐藏分页器 end
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        } else if (self.page == 1) {
          self.suibian = true;
        }
        // 分页--下一页disabled
      });
    },
    searchlist() {
      var self = this;
      self.page = 1;
      self.companylist();
    },
    rtPark() {
      window.history.go(-1);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/css/Parkdetails.scss";
#Parkdetails {
  .rtPark {
    float: right;
    margin-top: 12px;
    background: #fff;
    border: 1px solid #c03532;
    color: #c03532;
    padding: 3px 11px;
    border-radius: 4px;
    outline: none;
  }
  .rtPark:hover {
    color: #fff;
    background: #c03532;
    cursor: pointer;
  }
  .map_body {
    display: flex;
    #map_left {
      // flex: 1;
      // .query-result{
      //   min-height: 601px;
      // }
      // #Pagination {
      //   height: 50px;
      // }
      .el-tabs {
        margin-bottom: 0;
      }
    }
    // #container{
    //   // flex: 1;
    //   width: 800px;
    //   // height: 600px;
    //   min-height: 666px;
    // }
  }
  .chaxun {
    .ChaXun {
      display: flex;
      flex-wrap: wrap;
      .Time {
        width: 50px;
      }
      .el-date-editor.el-input {
        width: 180px !important;
      }
      .el-input__inner {
        width: 178px !important;
      }
      .form-group {
        margin-right: 10px;
      }
      .JyFw {
        margin-right: 0;
        .jyfw {
          // margin-left: 10px;
        }
      }
      input {
        height: 34px;
        font-size: 16px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        // padding: 0 10px;
      }
      .Num {
        width: 50px;
      }
      .input_k {
        padding-left: 10px;
        font-size: 20px;
      }
      .el-input__inner {
        font-size: 20px;
      }
      .block {
        // margin-right: 10px;
        padding-left: 16px;
        height: 38px;
        .el-date-editor {
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        input {
          border: none;
        }
      }
    }
    .search_CHaxun {
      margin-left: 10px;
    }
  }
}
</style>