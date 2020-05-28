<template>
  <div id="C_content">
    <div class="C_container">
      <div class="C_title">老乡企业</div>
      <div class="el-tab">
        <el-tabs>
          <div class="form-wrapper">
            <form class="form-inline" id="formFell" role="form">
              <div class="form-group">
                <span class="control-label">所在地域 ：</span>
                <el-cascader
                  ref="elcascader"
                  :options="options"
                  :props="{ checkStrictly: true }"
                  @change="handleChange"
                  clearable
                ></el-cascader>
              </div>
              <div class="form-group">
                <span class="control-label">目标地域 ：</span>
                <el-cascader
                  ref="elcascaders"
                  :options="options1"
                  :props="{ checkStrictly: true }"
                  @change="handleChange1"
                  clearable
                ></el-cascader>
              </div>
              <div class="form-group">
                <span class="control-label">企业所属行业 ：</span>
                <el-select v-model="suoshuhy" filterable clearable placeholder="请选择企业所属行业">
                  <el-option
                    v-for="item in options2"
                    :key="item.suoshuhy"
                    :label="item.suoshuhy"
                    :value="item.suoshuhy"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group">
                <span class="control-label">企业状态 ：</span>
                <el-select v-model="zhucezt" clearable placeholder="请选择企业状态">
                  <el-option
                    v-for="item in options3"
                    :key="item.zhucezt"
                    :label="item.zhucezt"
                    :value="item.zhucezt"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group">
                <span class="control-label">出资类型：</span>
                <el-select v-model="qiyelx" clearable placeholder="请选择出资类型">
                  <el-option label="大陆企业" value="1">大陆企业</el-option>
                  <el-option label="港澳台企业" value="2">港澳台企业</el-option>
                  <el-option label="外资企业" value="3">外资企业</el-option>
                </el-select>
              </div>
              <div class="form-group">
                <span class="control-label">企业注册资本 ：</span>
                <el-input style="width:100px;" v-model="zhucezbmin" placeholder="最小企业注册资本"></el-input> -
                <el-input style="width:102px;" v-model="zhucezbmax" placeholder="最大(万元)"></el-input>
              </div>
              <div class="form-group">
                <span class="control-label">企业注册年限 ：</span>
                <el-input style="width:100px;" v-model="nianxianmin" placeholder="最小年限"></el-input> -
                <el-input style="width:102px;" v-model="nianxianmax" placeholder="最大年限"></el-input>
              </div>

              <div class="form-group">
                <span class="control-label">所属资本市场 ：</span>
                <el-select v-model="zibenscdy" clearable placeholder="请选择所属资本市场">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>

              <div class="form-group">
                <button
                  class="btn btn-query btn-action"
                  @click="searchList()"
                  type="button"
                  role="button"
                >
                  <span class="chaxun">查询</span>
                  <i class="icon-loading icon-loading-white a-spin"></i>
                </button>
              </div>
            </form>
          </div>
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="企业名称" width="480">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{ scope.row.name }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="shengsq" label="所在地域" align="center"></el-table-column>
                <el-table-column prop="username" label="疑似老乡名称" align="center"></el-table-column>
                <el-table-column prop="zhiwei" label="疑似老乡职位" align="center"></el-table-column>
                <!-- <el-table-column prop="dishi" align="center" label="纳税评级"></el-table-column> -->
                <!-- <el-table-column prop="danweijzw" align="center" label="专利个数"></el-table-column> -->
                <!-- <el-table-column prop="zhucezb" align="center" label="注册资本(万元)"></el-table-column> -->
                <el-table-column prop="suoshuhy" align="center" label="所属行业"></el-table-column>
                <!-- <el-table-column prop="zhucezb" align="center" label="企业状态"></el-table-column> -->
                <el-table-column prop="chenglisj" align="center" label="注册日期"></el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination"  v-loading="loading">
              <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
              <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
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
      page: 1,
      value: "",
      zhengzhaolx: "",
      options: [],
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      tableData: [],
      gongsiname: "",
      loading: false,
      suoshuhy: "",
      zhucezt: "",
      qiyelx: "",
      zhucezbmax: "",
      zhucezbmin: "",
      nianxianmin: "",
      nianxianmax: "",
      zibenscdy: "",
      limit:20,   //分页变量2
      suibian:true,    //分页变量3
      sheng:'',
      shi:""
    };
  },
  mounted() {
    var self = this;
    self.select();
    self.select1();
    self.select2();
    self.select3();
    self.select4();
    self.tableList();
  },
 
  created() {},
  methods: {
    handleElcascaders(){
      console.log(self.$refs.elcascader.dropDownVisible)
    },
     // 分页--回到首页按钮  start
    paginationsy() {
        if(this.page === 1) {

        }else{
            // this.page = 1
            this.handleCurrentChange(1)
        }
    },
    // 分页--回到首页按钮  end
    handleChange(value) {
      var self = this;
      this.$refs.elcascader.dropDownVisible = false;
      console.log(value);
      self.sheng = value[0] ? value[0] : "";
      self.shi = value[1] ? value[1] : "";
      self.qu = value[2] ? value[2] : "";
    },
    handleChange1(value) {
      var self = this;
      console.log(self.$refs.elcascaders.dropDownVisible,123)
       this.$refs.elcascaders.dropDownVisible = false;
      // console.log(value);
      self.suoshusf = value[0] ? value[0] : "";
      self.suoshucs = value[1] ? value[1] : "";
    },
    handleCurrentChange(val) {
      var self = this;
      self.loading=true
      self.page = val;
      self.suibian=false  //是否禁用首页按钮
      self.tableList(val);
    },
    select() {
      var self = this;
      this.axios({
        url: this.api.LXshengshiquapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options = res.data.data;
      });
    },
    select1() {
      var self = this;
      this.axios({
        url: this.api.LXshengshiapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options1 = res.data.data;
      });
    },
    select2() {
      var self = this;
      this.axios({
        url: this.api.LXhangyeapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options2 = res.data.data;
      });
    },
    select3() {
      var self = this;
      this.axios({
        url: this.api.LXzhuceztapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options3 = res.data.data;
      });
    },
    select4() {
      var self = this;
      this.axios({
        url: this.api.LXzibenapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options4 = res.data.data;
      });
    },
    searchList() {
      var self = this;
      self.page = 1;
      self.tableList();
    },
    tableList() {
      var self = this;
        // 分页--调用没数据的接口后，重置分页 start
            var right = document.getElementsByClassName("btn-next");
            right[0].disabled = "";
            // 分页--调用没数据的接口后，重置分页 end
      self.loading = true;
      let params = {
        page: self.page,
        limit: 20,
        suoshuhy: self.suoshuhy,
        zhucezt: self.zhucezt,
        qiyelx: self.qiyelx,
        zhucezbmax: self.zhucezbmax,
        zhucezbmin: self.zhucezbmin,
        nianxianmin: self.nianxianmin,
        nianxianmax: self.nianxianmax,
        zibenscdy: self.zibenscdy,
        sheng: self.sheng,
        shi: self.shi,
        qu: self.qu,
        suoshusf: self.suoshusf,
        suoshucs: self.suoshucs,

      };
      this.axios({
        url: this.api.LXlaoxianglistapi,

        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.tableData = res.data.data;
        self.total = res.data.count;
        self.loading = false;
         //分页--总条数<=20，禁用右按钮  start
                var cot = Math.ceil(self.total / 20);
                if (cot <= self.page) {
                right[0].disabled = "disabled";
                } else if (self.page == 1) {
                self.suibian = true;
                }
                //分页--总条数<=20，禁用右按钮  end
      });
    }
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/Techindustry.scss";
#formFell {
  .control-label {
    width: 150px;
    display: inline-block;
  }
}
.el-cascader-node.in-active-path, .el-cascader-node.is-active, .el-cascader-node.is-selectable.in-checked-path {
    color: #c03532;
    font-weight: 700;
}
</style>
