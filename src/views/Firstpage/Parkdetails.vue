<template>
  <div id="Parkdetails">
    <div id="C_content">
      <div class="C_title">
        <span class="Title_left"></span>{{this.parkname}} 
        <!-- <div class="container_message fontSize20"> -->
            <!-- <img src="../../assets/images/Hangye_tishi.svg" alt /> -->
            <p style="display:inline-block;font-size:20px;color:#000;margin-left:10px;">共<span class="colorH"> {{ this.total }} </span>家&nbsp;&nbsp;<span v-show="this.mianji != 'null'">占地:<span class="colorH"> {{ this.mianji }} </span>(公顷)</span> <span v-show="this.zhudaocy != 'null'">主导产业:<span class="colorH"> {{ this.zhudaocy }} </span>&nbsp;&nbsp;</span>
            <span class="GoMap" @click="GoMap" v-show="location != 'null'">进入地图版</span></p>
          <!-- </div> -->
        <el-button class="rtPark" @click="rtPark" type="primary">返回</el-button>
      </div>
      <div class="park-content">
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
              <!-- <div class="form-group JyFw">
                <span class="control-label jyfw">经营范围：</span>
                <input class="input_k" v-model="jingyingfw" type="text" placeholder="计算机/电子设备/制造" />
              </div> -->
              <el-button @click="searchlist(1,20)" type="primary">查询</el-button>
              <el-button v-if="unitCode == 3" @click="Ex_port()" type="primary">导出</el-button>
            </div>
          </div>
        </div>
        <div class="el-tabs">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData">
                <el-table-column prop="name" label="企业名称" width="400" align="center">
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
                <el-table-column prop="chenglisj" align="center" label="成立时间">
                  <template slot-scope="{row}">
                    {{ row.chenglisj || '-' }}
                  </template>
                </el-table-column>
                
              </el-table>
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
      unitCode: "",
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
      location: "",
      zhudaocy: "",
      mianji: "",
      selected: "", //Park用户选择的地区信息
      // MapHidden: true,
    };
  },
  mounted() {
    var self = this
    this.unitCode = localStorage.getItem("unitCode");
    this.location = Base64.decode(this.$route.query.location);
    // console.log(this.location,1)
    this.mianji = Base64.decode(this.$route.query.mianji);
    // console.log(this.mianji,1)
    this.zhudaocy = Base64.decode(this.$route.query.zhudaocy);
    // console.log(this.zhudaocy,1)
    this.parkname = Base64.decode(this.$route.query.yuanquname);
    // console.log(this.parkname,1)
    this.parkid = Base64.decode(this.$route.query.Park_Id);2
    // console.log(this.parkid,1)
    // this.blockY();
    self.username = localStorage.getItem("userName");
    self.telphone = localStorage.getItem("mobile");
    self.selected = localStorage.getItem("selected");//获取Park页面存储的地区信息
    // this.parkid = this.$route.query.park; 
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
    // blockY() {
    //   var self = this
    //   if(self.location === null){
    //     console.log("运行了")
    //     self.MapHidden = false
    //   }
    // },
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
      console.log("执行了")
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
      window.history.back(-1);
    },
    
    GoMap() {
      var self = this
      this.$router.push({
        path: '/parkMap',
        query: { parkname: Base64.encode(self.parkname),location: Base64.encode(self.location)}
      })
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/css/Parkdetails.scss";
#Parkdetails {
  .el-table__row>td:first-child{
    text-align: left !important;
  }
  .rtPark {
    // float: right;
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
  .GoMap{
        cursor: pointer;
        font-weight: 600;
        // color: #cf111b;
        margin-left: 5px;
      }
  .container_top {
    padding: 20px 30px;
    .container_message {
      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-left: 10px;
        margin-bottom: 5px;
      }
      .GoMap{
        cursor: pointer;
        font-weight: 600;
        // color: #cf111b;
        margin-left: 10px;
      }
      height: 40px;
      background: rgba(207, 17, 27, 0.1);
      border: 1px solid rgba(241, 104, 111, 1);
      border-radius: 4px;
      line-height: 40px;
    }
  }
  .chaxun {
    padding-top: 5px;
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
<style lang="scss" scoped>
.rtPark {
    float: right;
  }
</style>