<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title">
        <span class="Title_left"></span>
        {{Base64.decode(this.$route.query.name)}}
        <el-button class="park_F" @click="rtPark" type="primary">返回</el-button>
        <el-cascader
          clearable
          class="input_F"
          size="large"
          style="width:174px;height：35px;margin-left:20px;"
          :options="options"
          v-model="selectedOptions"
          @change="handleChangeCity"
        ></el-cascader>
        <!-- <button class="rtPark" @click="rtPark">返回</button> -->
      </div>
      <div class="tab-box">
        <ul>
          <li @click="handleChange(item.tip)" class="fontSize20 color3" :class="[item.tip == next?'activeStyle':'mrStyle']" v-for="(item,index) in titleData" :key="(item,index)">{{ item.tip }}</li>
        </ul>
        <section class="border-bottom">
          <div style="padding-top:25px;"></div>
            <div class="query-result">
              <div class="table-wrapper">
                <el-table :empty-text="tishi" stripe :data="tableData2" v-loading="loading" style="width: 100%">
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
                  <el-table-column prop="fadingdbr" label="法定代表人" width="160" align="center"></el-table-column>
                  <el-table-column prop="suoshusf" label="所属省份" width="160" align="center"></el-table-column>
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
              <el-button
                size="small"
                :disabled="suibian"
                class="paginationsy"
                @click="paginationsy"
              >首页</el-button>
            </div>
            <!-- 分页dom end -->
          </section>
      </div>
    </div>
  </div>
</template>

<script>
import { provinceAndCityDataPlus,CodeToText } from 'element-china-area-data'
export default {
  data() {
    return {
      options: provinceAndCityDataPlus,
      selectedOptions: "",
      titleData: "",
      tishi: "正在查询...",
      page: 1,
      suibian: true, //分页变量3
      loading: false,
      tableData2: [],
      next: "5G基站建设",
      suoshusf:"",
      suoshucs:"",
      // tip: "5G基站建设"
    };
  },
  mounted() {
    this.titleList();
    this.NewjjList();
    this.CtiyDown()
  },
  created() {},
  //监测页数变化start
  watch: {
  },
  //end
  methods: {
    // 分页--回到首页按钮  start
    paginationsy() {
      if (this.page === 1) {
      } else {
        // this.page = 1
        this.handleCurrentChange(1);
      }
    },
    CtiyDown(){
      console.log(this.options,"options")
      var Downoptions = this.options
      Downoptions.splice(32,3)
      // console.log(Downoptions,"截取后")
    },
    // 分页--回到首页按钮  end
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      var cot = Math.ceil(self.total2 / 20);
      self.suibian = false; //是否禁用首页按钮
      // console.log(self.suibian)
      // console.log(self.page)
      self.page = val;
      this.NewjjList(self.next);
    },
    handleChange(tip) {
      if (tip != "") {
        this.next = tip;
        this.NewjjList(tip);
      }
    },
    titleList() {
      var self = this;
      this.axios({
        url: this.api.NewTitle,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data)
        self.titleData = res.data.data;
      });
    },
    NewjjList(tip, val) {
      var self = this;
      var right = document.getElementsByClassName("btn-next");
      // console.log(right)
      // right[0].disabled= ""
      if(self.suoshusf == '全部'){
        self.suoshusf = ''
      }else if(self.suoshucs == '全部'){
        self.suoshucs = ''
      }
      // console.log(tip,"tip")
      // console.log(self.tip,"self.tip")
      // if(tip == undefined || tip == ''){
      //   tip = self.tip
      // }
      let params = {
        tip: self.next,
        limit: 20,
        page: self.page,
        suoshusf:self.suoshusf,
        suoshucs:self.suoshucs,
      };
      this.axios({
        url: this.api.NewList,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.count)

        self.tableData2 = res.data.data;
        if(res.data.count == 0) {
          self.tishi = "暂无数据"
        }
        self.total2 = res.data.count;
        // 分页--下一页disabled
        var cot = Math.ceil(self.total2 / 20);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        } else if (self.page == 1) {
          self.suibian = true;
        }
        // 分页--下一页disabled
      });
    },
    // 返回
    rtPark() {
      window.history.go(-1);
    },
    handleChangeCity(value) {
      var self = this
      this.suoshusf = CodeToText[value[0]]
      this.suoshucs = CodeToText[value[1]]
      this.NewjjList(this.next)
    }
  }
};
</script>

<style scoped lang="scss" >
// html{
//   overflow-y: overlay;
// }
#C_content {
  .C_title {
    background: #fff;
    line-height: 45px;
    border-bottom: 2px solid #e9edef;
    padding: 5px 10px;
    font-weight: 600;
    .park_F{
      float: right;
    }
    .input_F{
      float: right;
      width: 240px !important;
      margin-right: 10px;
    }
  }
  .tab-box{
    background: #fff;
    ul{
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      padding: 15px 20px;
      border-bottom: 2px solid #F0F2F5;
      li{
        padding: 0 30px;
        height: 36px;
        line-height: 36px;
        margin: 5px 10px;
      }
      li:hover{
        background:rgba(207,17,27,1);
        border-radius:4px;
        color: #fff;
        cursor: pointer;
      }
      .activeStyle{
        background:rgba(207,17,27,1);
        border-radius:4px;
        color: #fff;
        cursor: pointer;
      }
      .mrStyle{

      }
    }
  }
}
</style>
