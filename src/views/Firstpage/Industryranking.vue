<template>
  <div id="Park">
    <div id="C_content">
      <div class="C_title"><span class="Title_left"></span>行业排名</div>
      <div class="park-content Industryranking">
        <!-- <div class="ind-title">
          <p>
            <i class="icon icon-tips"></i>
            <span>行业排名列表</span>
          </p>
        </div> -->
        <div class="form-wrapper">
          <form class="form-inline" role="form">
            <div class="form-group Search_Down_input">
              <!-- <span class="control-label"></span>
              <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                placeholder="请选择地域"
              ></el-cascader> -->
              <el-cascader
                ref="refHandle"
                :options="options1"
                :props="{ checkStrictly: true }"
                @change="handleChange1"
                v-model="selected"
              ></el-cascader>
            </div>
            <!-- <div class="form-group">
              <el-select v-model="hangye" filterable placeholder="请选择行业">
                <el-option
                  v-for="item in DownOptions"
                  :key="item.suoshuhy"
                  :label="item.suoshuhy"
                  :value="item.suoshuhy"
                ></el-option>
              </el-select>
            </div> -->
            <div class="form-group">
                <el-select class="Search_Down_input" placeholder="请选择一级行业" filterable clearable v-model="form.One" @change="getOneclass" style="margin-right:20px;">
                  <el-option
                    v-for="item in OneClass"
                    :key="item.yijihy"
                    :label="item.yijihy"
                    :value="item.yijihy"
                  ></el-option>
                </el-select>
                <el-select class="Search_Down_input" placeholder="请选择二级行业" filterable clearable v-model="form.Two" @change="getTwoclass">
                  <el-option
                    v-for="item in TwoClass"
                    :key="item.erjihy"
                    :label="item.erjihy"
                    :value="item.erjihy"
                  ></el-option>
                </el-select>
            </div>
            <div class="form-group">
              <el-select class="Search_Down_input" v-model="paiming" placeholder="请选择行业排名">
                <el-option
                  v-for="item in paimingOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.lable"
                ></el-option>
              </el-select>
            </div>
            <div class="form-group">
              <el-select class="Search_Down_input" v-model="paixu" placeholder="请选择排序规则">
                <el-option
                  v-for="item in paixuOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.lable"
                ></el-option>
              </el-select>
            </div>
            <!-- 高级检索 -->
            <div class="form-group">
              <el-popover placement="top-start" title="更多" trigger="click">
                <el-form ref="form" label-width="100px" :model="form" :rules="rules">
                  <el-form-item label="出资类型：">
                    <el-radio-group v-model="form.qiyelx">
                      <el-radio label value>全部</el-radio>
                      <el-radio label="1" value="1">大陆企业</el-radio>
                      <el-radio label="2" value="2">港澳台企业</el-radio>
                      <el-radio label="3" value="3">外资企业</el-radio>
                    </el-radio-group>
                  </el-form-item>
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
                        <el-input style="width:auto;" v-model="form.stziben" placeholder="最小注册资本(万元)"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col style="text-align: center;" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-form-item prop="endziben">
                        <el-input style="width:auto;" v-model="form.endziben" placeholder="最大注册资本(万元)"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="联系方式：">
                    <el-radio-group v-model="form.dianhua">
                      <el-radio label value>全部</el-radio>
                      <el-radio label="1">有联系方式</el-radio>
                      <el-radio label="2">无联系方式</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
                <el-tag
                  style="display:inline-block;  margin-right:5px; cursor:pointer;"
                  slot="reference"
                  type="danger"
                >更多</el-tag>
              </el-popover>
            </div>

            <div class="form-group">
              <button
                class="btn btn-query btn-action"
                @click="searchlist(1, 20)"
                type="button"
                role="button"
              >
                <span class="chaxun">查询</span>
                <i class="icon-loading icon-loading-white a-spin"></i>
              </button>
            </div>
          </form>
        </div>
        <div class="el-tabs">
          <div class="query-result">
            <template>
              <div class="table-wrapper">
              <el-table stripe :empty-text="tishi" :data="tableData" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="公司名称" align="center">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{ scope.row.name }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="gongsilx" label="公司类型" align="center"></el-table-column>
                <el-table-column prop="zhucezb" label="注册资本" align="center"></el-table-column>
                <el-table-column prop="fadingdbr" width="160" label="公司法人" align="center"></el-table-column>
                <!-- <el-table-column v-if="yinshou" prop="rankweight" label="营业收入（万元）" align="center"></el-table-column> -->
                <!-- <el-table-column v-if="tax" prop="tax" label="税收（万元）" align="center"></el-table-column> -->
              </el-table>
              </div>
            </template>
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
            <el-button
              size="small"
              :disabled="suibian"
              class="paginationsy"
              @click="paginationsy"
            >首页</el-button>
          </div>
          <!-- 分页dom end -->
        </div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="20%">
          <span>请输入查询条件</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import { provinceAndCityDataPlus, CodeToText } from "element-china-area-data";
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
      var self=this
      if(self.form.styear != ""){
        if (value === "") {
        callback(new Error("请输入大于开始年限的整数"));
      } else if (value*1 <= self.form.styear ) {
        callback(new Error("请输入大于开始年限的整数"));
      } else {
        callback();
      }
      }else{
        callback();
      }
    };
    var endziben = (rule, value, callback) => {
      var self=this
      if(self.form.stziben != ""){
        if (value === "") {
        callback(new Error("请输入大于开始年限的整数"));
      } else if (value*1 <= self.form.stziben ) {
        callback(new Error("请输入大于开始年限的整数"));
      } else {
        callback();
      }
      }else{
        callback();
      }
    };
    return {
      // yinshou:true,
      // tax:false,
      city_sheng: "",
      city_shi: "",
      city_qu: "",
      gongsiname: "",
      options: provinceAndCityDataPlus,
      // DownOptions: [],
      paimingOptions: [
        {
          value: "前十强",
          lable: "10"
        },
        {
          value: "前五十强",
          lable: "50"
        },
        {
          value: "前一百强",
          lable: "100"
        }
      ],
      paixuOptions: [
        {
          value: "按营收",
          lable: "rankweight"
        },
        {
          value: "按税收",
          lable: "tax"
        }
      ],
      paiming: "10",
      paixu: "rankweight",
      OneClass:{},
      TwoClass:{},
      form:{
        One:"",
        Two:""
      },
      selectedOptions: "",
      tableData: [],
      loading: false,
      total: 0,
      page: 1,
      // hangye: "",
      suibian: true, //分页变量3
      hangyeOne: "",
      form: {
        qiyelx: "",
        styear: "",
        endyear: "",
        stziben: "",
        endziben: "",
        dianhua: "",
      },
      rules: {
        styear: [{ validator: styear, trigger: "blur" }],
        endyear: [{ validator: endyear, trigger: "blur" }],
        stziben: [{ validator: styear, trigger: "blur" }],
        endziben: [{ validator: endziben, trigger: "blur" }],
      },
      Shewng: {},
      shi: {},
      dialogVisible: false,
      tishi:"请输入筛选条件...",
      options1: [],
      selected: "",
    };
  },
  mounted() {
    // this.hangyedown();
    this.getOneclass();
    // this.getTwoclass();
    // this.hangyelist()
    this.city()
  },
  watch: {
    page(val) {
      var self = this;
      if (val == 1) {
        self.suibian = true;
      }
    },
    city_sheng() {
      if (this.$refs.refHandle) { 
        this.$refs.refHandle.dropDownVisible = false; 
      } 
    },
    city_shi() {
      if (this.$refs.refHandle) { 
        this.$refs.refHandle.dropDownVisible = false; 
      } 
    },
    city_qu() {
      if (this.$refs.refHandle) { 
        this.$refs.refHandle.dropDownVisible = false; 
      } 
    },
  },
  methods: {
    city() {
      // console.log(this.options,"options")
      // this.options.splice(34,1)
      // this.options.splice(33,1)
      // this.options.splice(32,1)
      this.axios({
        url: this.api.LXshengshiquapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
          this.options1 = res.data.data
      })
    },
    // 分页--回到首页按钮  starte
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
      var cot = Math.ceil(self.total / 20);
      self.suibian = false; //是否禁用首页按钮
      //分页--判断当前页是否为最后一页，禁用右按钮  end
      // console.log(self.page);
      self.hangyelist(val, 20);
    },
    handleChange1(value) {
      this.city_sheng = value[0];
      this.city_shi = value[1];  
      this.city_qu = value[2];
      // console.log(value)
      // console.log(this.city_sheng)
      // console.log(this.city_shi)
      // console.log(this.city_qu)
    },
    // 提示框
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // }
    // hangyedown() {
    //   var self = this;
    //   this.axios({
    //     url: this.api.Hangyedown,
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   }).then(res => {
    //     // console.log(res.data.data)
    //     self.hangyeOne = res.data.data[1].suoshuhy;
    //     self.hangye = self.hangyeOne;
    //     self.DownOptions = res.data.data;
    //     // this.hangyelist()
    //   });
    // },
    getOneclass() {
      var self = this;
      self.form.Two = ''
      this.axios({
        url: this.api.GetOneClass,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then( res=> {
        // console.log(res.data.data,"getOneclass")
        self.OneClass = res.data.data
        self.getTwoclass()
      })
    },
    getTwoclass() {
      var self = this;
      let params = {
        yijihy: self.form.One
      };
      this.axios({
        url: this.api.GetTwoClass,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then( res=> {
        // console.log(res.data.data,"getTwoclass")
        self.TwoClass = res.data.data
        // self.getTwoclass()
      })
    },
    hangyelist() {
      var self = this;
      var right = document.getElementsByClassName("btn-next");
      right[0].disabled = "";
      self.loading = true;
      if (self.city_sheng === "全部") {
        self.city_sheng = "";
      } else if (self.city_shi === "全部") {
        self.city_shi = "";
      }
      let params = {
        page: self.page,
        limit: 20,
        suoshusf: this.city_sheng,
        suoshucs: this.city_shi,
        suoshuqx: this.city_qu,
        rankNumber: this.paiming,
        leixing: self.form.qiyelx,
        rankRule: self.paixu,
        suoshuhy: self.form.One,
        suoshuejhy: self.form.Two,
        minAge: self.form.styear,
        maxAge: self.form.endyear,
        startNumber:self.form.stziben,
        endNumber:self.form.endziben,
        lianxidh: self.form.dianhua
      };
      this.axios({
        url: this.api.Hangyelist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res.data)
        if(res.data.code == 500){
          self.dialogVisible = true
        }
        self.loading = false;
        self.tableData = res.data.data;
        if(res.data.count == 0) {
          self.tishi = "暂无数据"
        }
        self.total = res.data.count;
        // 分页--下一页disabled
        var cot = Math.ceil(self.total / 20);
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
      // console.log(self.paixu,"paixu")
      // if(self.paixu == "rankweight"){
      //   self.yinshou = true
      //   self.tax = false
      // }else if(self.paixu == "tax"){
      //   self.tax = true
      //   self.yinshou = false
      // }
      self.page = 1;
      // console.log(self.selectedOptions,"selectedOptions")
      // if(self.selectedOptions == ''){
      //   self.tishi = ""
      // }
      this.hangyelist();
    },
    
  }
};
</script>

<style lang="scss">
@import "../../styles/css/Park.scss";
.Industryranking {
  .el-dialog{
    height: 150px;
    margin-top: 40vh !important;
    .el-dialog__header{
      padding: 10px 10px 5px;
    }
    .el-dialog__body{
      padding: 15px 10px;
      font-size: 16px;
    }.el-dialog__footer{
       padding: 5px 10px 10px;
    }
  }
  .el-pagination {
    padding: 10px 0 !important;
    background: #fff !important;
    margin: 0;
  }
  .el-button--primary{
    background: #CF111B;
    color: #fff;
    border: none;
  }
  .el-button--primary:hover{
    color: none;
    background: #CF111B;
  }
}
</style>