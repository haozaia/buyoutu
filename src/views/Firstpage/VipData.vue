<template>
  <div id="C_content">
    <div class="C_container" id="qydc">
      <div class="C_title" > <span class="Title_left"></span>企业导出</div>

      <div class="el-tab">
        <el-tabs @tab-click="handleClick">
          <div class="ind-title">
            <p class="fontSize20">
              <i class="icon icon-tips"></i>
              <span>企业导出列表</span> 今日已导出
              <span style="color:red">{{yidao}}</span> 条
              剩余额度
              <span style="color:green">{{shengyu}}</span> 条
            </p>
          </div>
          <div class="form-wrapper">
            <form class="form-inline" role="form">
              <div class="form-group">
                <span class="control-label">所属行业 ：</span>
                <el-select size="small" placeholder="请选择行业" filterable clearable v-model="suoshuhy" @change="getErn" >
                <el-option
                  v-for="item in chain"
                  :key="item.yijihy"
                  :label="item.yijihy"
                  :value="item.yijihy"
                ></el-option>
              </el-select> 
                &nbsp;
              <el-select size="small" placeholder="请选择二级行业" filterable clearable v-model="tag" >
                <el-option
                  v-for="item in chainChild"
                  :key="item.erjihy"
                  :label="item.erjihy"
                  :value="item.erjihy"
                ></el-option>
              </el-select>
              </div>
              <div class="form-group">
                <span class="control-label">公司性质 ：</span>

                <el-select v-model="type" size="small" placeholder="请选择公司性质">
                  <el-option label="选择所有" value></el-option>
                  <el-option
                    v-for="item in typeoptions"
                    :key="item.key"
                    :label="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group">
                <span class="control-label">所属省份 ：</span>

                <el-select v-model="suoshusf" size="small" placeholder="请选择所属省份">
                  <el-option label="选择所有" value></el-option>
                  <el-option
                    v-for="item in sfoptions"
                    :key="item.suoshusf"
                    :label="item.suoshusf"
                    :value="item.suoshusf"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group">
                <span class="control-label">注册资本 ：</span>
                <el-input v-model="zhuceziben" placeholder="注册资本大于该数值(万元)"></el-input>
              </div>
              <div class="form-group">
                <span class="control-label"> 所属产业链 ：</span>
                <el-select size="small" placeholder="请选择产业链" filterable clearable v-model="tagname">
                <el-option
                  v-for="item in chains"
                  :key="item.chanyelian"
                  :label="item.chanyelian"
                  :value="item.chanyelian"
                ></el-option>
              </el-select>
              </div>
              <div class="form-group">
                  <el-switch
                   style="margin-top:-4px;"
                    v-model="IsZz"
                    inactive-text="证监会行业 :"
                    @change="handleCHANGEradio"
                    active-color="#CF111B">
                  </el-switch>
              </div>
              <div class="form-group">
                <el-button @click="tableList(1)" type="primary">查询</el-button>
              </div>
              <div class="form-group">
                  <el-button v-if="suoshusf||suoshuhy||type||zhuceziben||tagname"
                  @click="TipsB" type="primary">导出</el-button>
                 <el-button @click="TipsA" v-else type="primary">导出</el-button>
              </div>
            </form>
          </div>
          <div class="query-result">
            <div class="table-wrapper">
              <el-table
                stripe
                :data="tableData"
                :empty-text="tishi"
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
                    >{{scope.row.name}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="suoshusf" align="center" width="100" label="所属省份"></el-table-column>
                <el-table-column prop="dianhua" align="center" label="电话">
                  <template slot-scope="scope">
                    {{scope.row.dianhua}}
                    {{scope.row.lianxidh}}
                    {{scope.row.dianhuas}}
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="lianxidh" align="center" label="联系电话"></el-table-column>
                <el-table-column prop="dianhuas" align="center" label="联系人电话"></el-table-column> -->
                <el-table-column prop="suoshuhy" align="center" label="所属行业">
                   <template slot-scope="scope">
                    {{IsZz?scope.row.oldhangye:scope.row.suoshuhy}}
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="suoshuejhy" align="center" label="所属二级行业"></el-table-column> -->
                <el-table-column prop="zhucezb" align="center" label="注册资本"></el-table-column>
                <el-table-column prop="lianxiyx" align="center" label="联系邮箱">
                   <template slot-scope="{row}">{{row.lianxiyx || '-' }}</template>
                </el-table-column>
                <el-table-column prop="fadingdbr" align="center" label="法定代表人"></el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination" v-loading="loading">
            
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
            <p v-if="total" class="addNum fontSize20">总条数 <el-tag type="danger" size="mini">{{total}} </el-tag> 条</p>
          </div>
          <!-- 分页dom end -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      // page: "",
      suoshusf: "",
      suoshuhy: "",
      types: [],
      type: "",
      zhuceziben: "",
      tagname: "",
      zhengzhaolx: "",
      tishi: "请选择筛选条件",
      sfoptions: [],
      hyoptions: [],
      typeoptions: [],
      tableData: [],
      tag:'',
      gongsiname: "",
      loading: false,
      page: 1,
      limit: 20, //分页变量2
      suibian: true, //分页变量3
      username: "",
      telphone: "",
      count: 0,
      shengyu: 0,
      yidao: 0,
      chains:{},
      chain:{},
      chainChild:{},
      IsZz:true,
    };
  },
  mounted() {
    var self = this;
    self.username = localStorage.getItem("userName");
    self.telphone = localStorage.getItem("mobile");
    self.selectSF();
    self.Exportcount();
    self.selectTYPE();
    self.getChains();
    // self.selectHY();
 self.getChain();
    var right = document.getElementsByClassName("btn-next");
    right[0].disabled = "disabled";
  },
  watch: {
    page(val) {
      var self = this;
      if (val == 1) {
        self.suibian = true;
      }
    }
  },
  created() {},
  methods: {
        //查询产业
    getChains() {
      var self = this;
      this.axios({
        url: this.api.industryChainChanyesheng,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
            self.chains = res.data.data;
      });
    },
    handleCHANGEradio(){
      var self = this
      self.tableData=[]
      self.total=0
      self.getChain()
      var right = document.getElementsByClassName("btn-next");
    right[0].disabled = "disabled";

    },
    //查询一级 
    getChain() {
      var self = this;
      let params = {
        oldhangye: self.IsZz?'1':''
      };
      this.axios({
        url: this.api.EsExporyijihyapi,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
            self.chain = res.data.data;
            self.suoshuhy=''
           self.tag=''
           self.chainChild=[]
      });
    },
    getErn() {
      var self = this;
      self.tag=''
      let params = {
        yijihy: self.suoshuhy,
        oldhangye: self.IsZz?'1':''
      };
      this.axios({
        url: this.api.ESerjihyapi,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
            self.chainChild = res.data.data;
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
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleCurrentChange(val) {
      var self = this;
      self.loading = true;
      self.page = val;
      self.suibian = false; //是否禁用首页按钮
      self.tableList(val);
    },
    selectSF() {
      var self = this;

      this.axios({
        url: this.api.VipDateshegnfenapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.sfoptions = res.data.data;
      });
    },
    selectTYPE() {
      var self = this;

      this.axios({
        url: this.api.VipDategognsiapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.typeoptions = res.data.data;
      });
    },
    selectHY() {
      var self = this;

      this.axios({
        url: this.api.VipDatehagnyeapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.hyoptions = res.data.data;
      });
    },
    TipsA() {
      this.$alert("请选择筛选条件", "提示", {
        confirmButtonText: "确定",
        callback: action => {}
      });
    },
    TipsB() {
      var self = this;
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
            var oldhangye =self.IsZz?'1':''
            let url =
              self.api.ESexportbyesapi +
              "?type=" +
              self.type +
              "&suoshusf=" +
              self.suoshusf +
              "&suoshuhy=" +
              self.suoshuhy +
              "&tag=" +
              self.tag +
              "&zhuceziben=" +
              self.zhuceziben +
              "&tagname=" +
              self.tagname +
              "&oldhangye=" +
               oldhangye+
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
    download() {
      var self = this;
      if (
        self.suoshusf ||
        self.suoshuhy ||
        self.type ||
        self.zhuceziben ||
        self.tagname
      ) {
        let params = {
          suoshusf: self.suoshusf,
          suoshuhy: self.suoshuhy,
          type: self.type,
          zhuceziben: self.zhuceziben,
          tagname: self.tagname
        };
        this.axios({
          url: this.api.VipDateexportapi,
          responseType: "blob",
          method: "post",
          data: this.$qs.stringify(params),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          // console.log(decodeURI(res.headers['filename']))
          // console.log("123")
        });
      } else {
        self.loading = false;
        this.$alert("请选择筛选条件", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            self.loading = false;
          }
        });
      }
    },
    tableList(val) {
      var self = this;
      // 分页--调用没数据的接口后，重置分页 start
      var right = document.getElementsByClassName("btn-next");
      right[0].disabled = true;
      // 分页--调用没数据的接口后，重置分页 end
      this.loading = true;
      if (
        self.suoshusf ||
        self.suoshuhy ||
        self.type ||
        self.zhuceziben ||
        self.tagname
      ) {
        self.loading = true;
        var page = val ? val : self.page;
        var right = document.getElementsByClassName("btn-next");
        right[0].disabled = "";
        self.page = page;
        let params = {
          pageNumber: page,
          pageSize: 20,
          suoshusf: self.suoshusf,
          suoshuhy: self.suoshuhy,
          type: self.type,
          zhuceziben: self.zhuceziben,
          tagname: self.tagname,
           username: self.username,
        telphone: self.telphone,
        tag: self.tag,
        oldhangye: self.IsZz?'1':'',
        };
        this.axios({
          url: this.api.ESexplortlistbyes,

          method: "post",
          data: this.$qs.stringify(params),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          // console.log(JSON.stringify(res.data.data));
          self.tableData = res.data.data.list;
          if (res.data.data.totalRow == 0) {
            self.tishi = "暂无数据";
          }
          self.total = res.data.data.totalRow;
          self.loading = false;

          //分页--总条数<=20，禁用右按钮  start
          var cot = Math.ceil(self.total / 20);
          if (cot <= self.page) {
            right[0].disabled = "disabled";
          } else if (self.page == 1) {
            self.suibian = true;
          } else {
            right[0].disabled = "";
          }
          //分页--总条数<=20，禁用右按钮  end
        });
      } else {
        self.loading = false;
        this.$alert("请选择筛选条件", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            self.tableData = [];
            self.loading = false;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/Techindustry.scss";
#qydc{
  .el-tabs .form-wrapper {
    padding: 20px 30px 0 !important;
    .form-group{
      margin-bottom: 20px;
    }
    .el-input {
    width: 280px;
}
}

}
.downloadBtn {
  border: 1px solid transparent;
  padding: 2px 10px;
  font-size: 14px;
  line-height: 1.71428571;
  border-radius: 4px;
  background-color: #c03532;
  color: #fff;
  display: inline-block;
  cursor: pointer;
}
.addNum{
  margin: 14px 20px 0 0;
    vertical-align: bottom;
    float: right;
}
.el-message-box__btns {
  .el-button--primary {
    color: #fff;
    background-color: #c03532;
    border-color: #c03532;
  }
}
</style>