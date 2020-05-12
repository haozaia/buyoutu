<template>
  <div id="C_content">
    <div class="C_container" id="zjyy">
      <div class="C_title" v-if="loading"><span class="Title_left"></span>正在搜索...</div>
      <div class="C_title search" v-else><span class="Title_left"></span>
        共搜索到
        <span id="Tag">{{ this.total }}</span> 条符合筛选条件的企业
        <div class="inline search_header_select">
          <span class="control-label ">选择地区 ：</span>
              <el-cascader
                ref="refHandle"
                style="width:240px;"
                v-model="city_search"
                :options="city_data"
                :props="{ checkStrictly: true }"
                @change="handleChange"
                clearable
              ></el-cascader>
              <el-button @click="Ex_port" class="Mg10" type="primary">导出</el-button>
        </div>
      </div>
      <div class="el-tab">
        <div class="query-result">
          <div class="table-wrapper">
            <el-table
              stripe
              :data="tableData"
              id="toChange"
              v-loading="loading"
              style="width: 100%"
            >
              <el-table-column prop="name" label="企业名称" align="center">
                <template slot-scope="scope">
                  <router-link
                    target="_blank"
                    tag="a"
                    class="toChange"
                    style="color:#606266;text-decoration:none;"
                    :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                  >
                    <p size="medium" v-html="scope.row.name"></p>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="gongsilx" align="center" label="公司类型"></el-table-column>
              <el-table-column prop="zhucezb" align="center" label="注册资本(万元)"></el-table-column>
              <el-table-column prop="suoshusf" align="center" width="150" label="所属省份"></el-table-column>
              <el-table-column prop="fadingdbr" align="center" width="100" label="法人代表"></el-table-column>
            </el-table>
          </div>
        </div>
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
          <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
        </div>
        <!-- 分页dom end -->
      </div>
    </div>
  </div>
</template>

<script>
import "../../styles/js/Firstpage/Techindustry";
import Axios from "axios";
export default {
  data() {
    return {
      total: 0,
      year: "",
      suoshusf: "",
      value3: "",
      name: "",
      // radio: '',
      page: 1,
      activeName: "first",
      options: [],
      years: [],
      tableData: [],
      ProfileData: [],
      echartsList: [],
      loading: true,
      suibian: true, //分页变量3,
      gongsiname: "",
      jingyingfw: "",
      selectedOptions: "",
      sheng: "",
      shi: "",
      city_data: [],
      city_search: '',
      shengyu: "",
      yidao: "",
      username: "",
      telphone: "",
      type: ""
    };
  },
  mounted() {
    var self = this;
    self.name = Base64.decode(this.$route.query.name);
    self.username = localStorage.getItem("userName");
    self.telphone = localStorage.getItem("mobile");
    self.Exportcount();
    self.Gongxinjsqy(1, 20);
    self.citylist()
  },
  watch: {
    "$store.state.name": function() {
      var self = this;
      //你需要执行的代码
      self.page = 1
      self.city_search = ''
      self.shi = ''
      self.sheng = ''
      self.name = Base64.decode(this.$route.query.name);
      self.Gongxinjsqy(1, 20);
    },
    page(val) {
      var self = this;
      if (val == 1) {
        self.suibian = true;
      }
    },
    sheng() {
      if (this.$refs.refHandle) { 
        this.$refs.refHandle.dropDownVisible = false; 
      } 
    },
    shi() {
      if (this.$refs.refHandle) { 
        this.$refs.refHandle.dropDownVisible = false; 
      } 
    },
    
  },
  methods: {
    Ex_port() {
      var self= this
      this.$prompt(
        "请输入导出条数(剩余额度" + this.shengyu + "条)",
        "导出向导",
        {
          confirmButtonText: "导出",
          cancelButtonText: "取消",
          showCancelButton:false,
          inputPattern: /^(0\.0[1-9]|0\.[1-9]\d|[1-9]\d?(\.\d\d)?|[1-4]\d\d(\.\d\d)?|500)$/,
          inputErrorMessage: "请输入1-500之间的整数"
        }
      )
        .then(({ value }) => {
          if (value > self.shengyu) {
             this.$message.error('导出数量超出今日额度');
          } else {
            self.count = value;
            let url =
              self.api.Home_export +
              "?type=" +
              self.type +
              "&word=" +
              self.name +
              "&province=" +
              self.sheng +
              "&city=" +
              self.shi +
              "&username=" +
              self.username +
              "&telphone=" +
              self.telphone +
              "&count=" +
              self.count;
            window.location.href = url; //  跳转链接
            setTimeout(function(){
                self.Exportcount()
            },2000)
            
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
    citylist() {
      var self = this;
      this.axios({
        url: this.api.LXshengshiapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.city_data = res.data.data;
      });
    },
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
      //分页--判断当前页是否为最后一页，禁用右按钮  start
      // var cot = parseInt(self.total / 10) + 1;
      self.suibian = false; //是否禁用首页按钮
      // if (cot == val) {
      //   this.$message("当前已经是最后一页啦");
      //   var right = document.getElementsByClassName("btn-next");
      //   right[0].disabled = "disabled";
      // } else if (val == 1) {
      //   self.suibian = true;
      // }
      //分页--判断当前页是否为最后一页，禁用右按钮  end
      // console.log(self.page);
      self.Gongxinjsqy(val, 20);
    },
    //获取公司列表
    Gongxinjsqy(page, limit) {
      var self = this;
      // 分页--调用没数据的接口后，重置分页 start
      var right = document.getElementsByClassName("btn-next");
      right[0].disabled = "";
      // // 分页--调用没数据的接口后，重置分页 end
      // self.loading = true;
      //  if(self.radio == "3"){
      //    self.gongsiname = self.name
      //    self.jingyingfw = ''
      //  }else if(self.radio == "6"){
      //    self.jingyingfw = self.name
      //    self.gongsiname = ''
      //  }
      // if (self.sheng == "全部") {
      //   self.sheng = "";
      //   self.shi = "";
      // } else if (self.shi == "全部" || self.shi == "市辖区") {
      //   self.shi = "";
      // }
      let params = {
        page: self.page,
        size: 20,
        word: self.name,
        jingyingfw: self.jingyingfw,
        province: self.sheng,
        city: self.shi
      };
      Axios({
        url: this.api.nameapi,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res.data.data,"datadata")
        self.loading = false;
        self.tableData = res.data.data.content?res.data.data.content:[];
        self.total = res.data.data.totalElements?res.data.data.totalElements:0;
        // self.total = res.data.data.totalElements
        console.log(self.total)
         // 分页--下一页disabled
          var cot =  Math.ceil(self.total/20)
          // console.log(cot)
          // console.log(self.page)
          if(cot <= self.page){
              right[0].disabled="disabled"
          }else if(self.page==1){
              self.suibian=true
          }
        // 分页--下一页disabled
      });
    },
    handleChange(value) {
      var self=this
      self.sheng = value[0] ? value[0] : "";
      self.shi = value[1] ? value[1] : "";
      this.page = 1
      this.Gongxinjsqy()
      
    }
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/Techindustry.scss";
.C_container {
  // padding: 0 20px;
  .search{
    .el-input__inner{
      height: 30px;
      border: 1px solid #ccc !important;
      margin-left: 10px;
    }
    .el-cascader{
      // margin-left: 90px !important;
    }
  }
}
#C_content{
  #zjyy {
  margin: 0 auto;
  .C_title{
    // padding-left: 20px;
    padding-right: 38px;
    .control-label{
      font-size: 20px; 
      font-weight:500;
      color: #000;
    }
    .search_header_select{
      float: right;
    }
  }
  .Mg10{
    margin-left: 20px;
  }
}
}


</style>