<template>
  <div id="fortuneFv">
    <div id="C_content">
      <div class="C_title"><span class="Title_left"></span>国有企业名单</div>
      <!-- 搜索、查询 -->
      <div class="Five">
          <span class="control-label diyu">所属地域：</span>
          <div class="form-group">
            <el-select v-model="suoshusf" placeholder="请选择省份">
              <el-option label="选择所有" value></el-option>
              <el-option
                v-for="item in options"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        <!-- <div class="form-group">
          <span class="control-label">所属行业 :</span>
          <el-select v-model="suoshuhy" filterable size="small" placeholder="请选择所属行业">
            <el-option label="选择所有" value></el-option>
            <el-option
              v-for="item in hyoptions"
              :key="item.suoshuhy"
              :label="item.suoshuhy"
              :value="item.suoshuhy"
            ></el-option>
          </el-select>
        </div> -->
        <div class="form-group">
                <el-select placeholder="请选择一级行业" filterable clearable v-model="form.One" @change="getOneclass" style="margin-right:20px;">
                  <el-option
                    v-for="item in OneClass"
                    :key="item.yijihy"
                    :label="item.yijihy"
                    :value="item.yijihy"
                  ></el-option>
                </el-select>
                <el-select placeholder="请选择二级行业" filterable clearable v-model="form.Two" @change="getTwoclass">
                  <el-option
                    v-for="item in TwoClass"
                    :key="item.erjihy"
                    :label="item.erjihy"
                    :value="item.erjihy"
                  ></el-option>
                </el-select>
            </div>
        <div class="query">
          <!-- <button @click="tablelist()">查询</button> -->
        </div>
          <el-button @click="tablelist()" type="primary">查询</el-button>
      </div>
      <div class="el-tabs">
        <div class="query-result">
          <template>
            <el-table :data="qiyelist" stripe style="width: 100%">
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
              <el-table-column prop="suoshusf" label="所属省份" align="center"></el-table-column>
              <el-table-column prop="fadingdbr" label="法定代表人" width="180" align="center"></el-table-column>
              <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center"></el-table-column>
              <el-table-column prop="chenglisj" label="成立时间" align="center">
              <template slot-scope="{row}">
                {{ row.chenglisj || '-' }}
              </template>
              </el-table-column>
            </el-table>
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
          </template>
        </div>
        <!-- gongsiwz -->
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { regionDataPlus } from 'element-china-area-data'
export default {
  data() {
    return {
      qiyelist: [],
      total: 0,
      page: 1,
      options: [],
      suibian: true, //分页变量3
      suoshusf: '',
      // hyoptions: [],
      // suoshuhy: '',
      OneClass:{},
      TwoClass:{},
      form:{
        One:"",
        Two:""
      },
    };
  },
  mounted() {
    this.enterpriselist();
    this.enterprisesf();
    // this.hangyeDown();
    this.getOneclass();
  },
  methods: {
    // hangyeDown() {
    //   var self = this
    //   this.axios({
    //     url: this.api.Hangyedown,
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   }).then(res => {
    //     // console.log(res.data.data,"res")
    //     self.hyoptions = res.data.data
    //   })
    // },
    getOneclass() {
      var self = this;
      self.form.Two = ""
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
      self.enterpriselist(val, 20);
    },
    tablelist() {
      var self = this
      self.page=1
      self.enterpriselist()
    },
    enterprisesf(){
      this.axios({
        url: this.api.stateenterpriseshengfen,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.options = res.data.data
      })
    },
    enterpriselist() {
      var self = this
      var right = document.getElementsByClassName("btn-next");
        right[0].disabled = "";
      let params = {
        page: self.page,
        limit: 20,
        leixing: "4",
        suoshusf: this.suoshusf,
        suoshuhy: self.form.One,
        suoshuejhy: self.form.Two,
      };
      this.axios({
        url: this.api.stateenterprise,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res);
        this.qiyelist = res.data.data;
        this.total = res.data.count;

        var cot = Math.ceil(self.total / 20);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        } else if (self.page == 1) {
          self.suibian = true;
        }
      });
    },
    // handleCurrentChange(val) {
    //   var self = this;
    //   self.page = val;
    //   self.enterpriselist(val, 20);
    // },
    
  }
};
</script>

<style lang="scss">

#fortuneFv {
  .Five {
    display: flex;
    padding: 10px;
    background: #fff;
    input {
      background: none;
      outline: none;
      border: none;
    }
    .diyu{
      font-size: 20px;
      margin-right: 8px;
      line-height: 40px;
    }
    .search_l {
      height: 32px;
      margin-right: 10px;
      padding: 0 !important;
      border: 1px solid #ccc;
      width: 220px;
      border-radius: 4px;
      line-height: 30px !important;
      i {
        display: inline-block;
        margin-right: 5px;
      }
      #code {
        width: 195px;
      }
      .el-input__inner{
        height: 32px;
      }
      .el-input__suffix{
        top: 5px;
      }
    }
    .search_r {
      margin-right: 10px;
      padding: 3px 5px;
      border: 1px solid #ccc;
      width: 220px;
      border-radius: 4px;
    }
    .form-group{
      .control-label{
        font-size: 14px;
        margin-right: 8px;
      }
      .el-select{
        border: 1px solid #ccc;
        margin-right: 15px;
        border-radius: 4px;
      }
    }
    .query {
      line-height: 40px;
      button {
        height: 32px;
        outline: none;
        color: #fff;
        border: none;
        background-color: #c03532;
        border-color: #c03532;
        padding: 5.5px 10px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
  .el-pagination {
    padding: 10px 0 !important;
    background: #fff !important;
    margin: 0;
  }
}
</style>