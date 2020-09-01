<template>
<div id="Govemment">
  <div id="C_content">
    <div class="C_container">
      <div class="C_title"><span class="Title_left"></span>政府奖励企业
      <!-- 导出按钮 -->
                    <el-button class="download"  type="primary" @click="download()" v-if="this.$store.state.unitCode==3">导出</el-button></div>

      <div class="el-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="国家级奖励" name="first">
            <div class="ind-title">
              <p>
                <i class="icon icon-tips"></i>
                <span>国家级奖励</span> 奖励企业共
                  <span id="Tag">{{ this.total }}</span> 家
              </p>
            </div>
            <div class="form-wrapper">
              <form class="form-inline" role="form">
                <div class="form-group">
                  <span class="control-label">奖励名称 ：</span>
                  <el-select v-model="jianglimc" placeholder="请选择奖励名称">
                     <el-option label="选择所有" value=""></el-option>
                    <el-option
                      v-for="item in options"
                      :key="item.jianglimc"
                      :label="item.jianglimc"
                      :value="item.jianglimc"
                    ></el-option>
                  </el-select>
                </div>
                <div class="form-group">
                  <div class="ui-input ui-input-search PuKey">
                    <i class="el-icon-search"></i>
                    <input
                      class="key"
                      v-model="gongsiname"
                      placeholder="奖励企业或奖励名称"
                      type="text"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <!-- <div class="form-group">
                  <button
                    class="btn btn-query btn-action"
                    @click="search()"
                    type="button"
                    role="button"
                  >
                    <span class="chaxun">查询</span>
                    <i class="icon-loading icon-loading-white a-spin"></i>
                  </button>
                </div> -->
                <el-button @click="search()" type="primary">查询</el-button>
              </form>
            </div>
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData" style="width: 100%">
                  <el-table-column prop="gongsiname" width="360" label="奖励企业" align="left">
                    <template slot-scope="scope">
                      <router-link target="_blank" tag="a" style="color:#606266;text-decoration:none;" :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                      >{{ scope.row.gongsiname }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="suoshudy" label="所属地域"></el-table-column>
                  <el-table-column prop="jianglimc" label="奖励名称"></el-table-column>
                  <el-table-column prop="jianglixm" label="奖励项目"></el-table-column>
                  <el-table-column prop="zhuczb" label="注册资本(万元)"></el-table-column>
                  <el-table-column prop="beizhu4" label="成立时间">
                    <template slot-scope="{row}">
                      {{ row.beizhu4 || '-' }}
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
             <!-- 分页dom start -->
                    <div id="Pagination">
                        <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
                        <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
                    </div>
              <!-- 分页dom end -->
          </el-tab-pane>
          <el-tab-pane label="省级奖励" name="second">
            <div class="ind-title">
              <p>
                <i class="icon icon-tips"></i>
                <span>省级奖励</span> 奖励企业共
                <span id="Tag">{{ this.total }}</span> 家
              </p>
            </div>
            <div class="form-wrapper">
              <form class="form-inline" role="form">
                <div class="form-group">
                  <span class="control-label">地域 ：</span>
                  <el-select v-model="suoshudy" placeholder="请选择所属地域">
                     <el-option label="选择所有" value=""></el-option>
                    <el-option
                      v-for="item in options"
                      :key="item.suoshudy"
                      :label="item.suoshudy"
                      :value="item.suoshudy"
                    ></el-option>
                  </el-select>
                </div>
                <div class="form-group">
                  <div class="ui-input ui-input-search PuKey">
                    <i class="el-icon-search"></i>
                    <input
                      class="key"
                       v-model="gongsiname"
                      placeholder="奖励企业或奖励名称"
                      type="text"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <!-- <div class="form-group">
                  <button
                    class="btn btn-query btn-action"
                    @click="search()"
                    type="button"
                    role="button"
                  >
                    <span class="chaxun">查询</span>
                    <i class="icon-loading icon-loading-white a-spin"></i>
                  </button>
                </div> -->
                <el-button @click="search()" type="primary">查询</el-button>
              </form>
            </div>
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData" style="width: 100%">
                  <el-table-column prop="gongsiname" width="500" label="奖励企业">
                    <template slot-scope="scope">
                      <router-link target="_blank" tag="a" style="color:#606266;text-decoration:none;" :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                      >{{ scope.row.gongsiname }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="suoshudy" label="所属地域"></el-table-column>
                  <el-table-column prop="jianglimc" label="奖励名称"></el-table-column>
                  <el-table-column prop="jianglixm" label="奖励项目"></el-table-column>
                  <el-table-column prop="zhuczb" label="注册资本(万元)"></el-table-column>
                  <el-table-column prop="beizhu4" label="成立时间">
                    <template slot-scope="{row}">
                      {{ row.beizhu4 || '-' }}
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 分页dom start -->
                    <div id="Pagination">
                        <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
                        <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
                    </div>
              <!-- 分页dom end -->
          </el-tab-pane>
          <el-tab-pane label="市级奖励" name="third">
            <div class="ind-title">
              <p>
                <i class="icon icon-tips"></i>
                <span>市级奖励</span> 奖励企业共
                <span id="Tag">{{ this.total }}</span> 家
              </p>
            </div>
            <div class="form-wrapper">
              <form class="form-inline" role="form">
                <div class="form-group">
                  <span class="control-label">地域 ：</span>
                  <el-select v-model="suoshudy" placeholder="请选择所属地域">
                     <el-option label="选择所有" value=""></el-option>
                    <el-option
                      v-for="item in options"
                      :key="item.suoshudy"
                      :label="item.suoshudy"
                      :value="item.suoshudy"
                    ></el-option>
                  </el-select>
                </div>
                <div class="form-group">
                  <div class="ui-input ui-input-search PuKey">
                    <i class="el-icon-search"></i>
                    <input
                      class="key"
                       v-model="gongsiname"
                      placeholder="奖励企业或奖励名称"
                      type="text"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <!-- <div class="form-group">
                 <button
                    class="btn btn-query btn-action"
                    @click="search()"
                    type="button"
                    role="button"
                  >
                    <span class="chaxun">查询</span>
                    <i class="icon-loading icon-loading-white a-spin"></i>
                  </button>
                </div> -->
                <el-button @click="search()" type="primary">查询</el-button>
              </form>
            </div>
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData" style="width: 100%">
                  <el-table-column prop="gongsiname" width="500" label="奖励企业">
                    <template slot-scope="scope">
                      <router-link target="_blank" tag="a" style="color:#606266;text-decoration:none;" :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                      >{{ scope.row.gongsiname }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="suoshudy" label="所属地域"></el-table-column>
                  <el-table-column prop="jianglimc" label="奖励名称"></el-table-column>
                  <el-table-column prop="jianglixm" label="奖励项目"></el-table-column>
                  <el-table-column prop="zhuczb" label="注册资本(万元)"></el-table-column>
                  <el-table-column prop="beizhu4" label="成立时间">
                    <template slot-scope="{row}">
                      {{ row.beizhu4 || '-' }}
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 分页dom start -->
                    <div id="Pagination">
                        <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
                        <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
                    </div>
              <!-- 分页dom end -->
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      gongsiname: "",
      jianglimc: "",
      page: 1,
      value: "",
      activeName: "first",
      options: [],
      region: [],
      tableData: [],
      ziduanqufen: "a",
      suoshudy:'',
       suibian:true    //分页变量3
    };
  },
  mounted() {
    var self = this;
    self.select();
    self.tableList();
    //条数查询
    this.$Export()
  },
    //监测页数变化start
  watch:{
    page(val) {
      var self=this
            if(val == 1){
                self.suibian=true
            }
        }
  },
  //end
  created() {},
  methods: {
      //导出
    download(){
      var self=this
      let url = self.api.exportzhengfu +
              "?ziduanqufen="+self.ziduanqufen +"&jianglimc="+self.jianglimc+"&gongsiname="+self.gongsiname+"&suoshudy="+self.suoshudy+"&"
      this.$download(url)
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
    handleCurrentChange(val) {
      var self = this;
      // console.log(`当前页: ${val}`);
      self.page = val;
            var cot =  Math.ceil(self.total/20)
            self.suibian=false  //是否禁用首页按钮
      // console.log(self.page);
      self.tableList(val, 20);
    },
    handleClick(tab, event) {
      var self = this;
      self.jianglimc=''
      self.gongsiname=''
      self.suoshudy=''
      self.page=1
      // console.log(tab, event);
      if (tab.index == 1) {
        self.tableData = [];
        self.ziduanqufen = "b";
        self.tableList();
        self.select()
      } else if (tab.index == 0) {
        self.tableData = [];
        self.ziduanqufen = "a";
        self.select()
        self.tableList();
        
      } else if (tab.index == 2) {
        self.tableData = [];
        self.ziduanqufen = "c";
        self.select()
        self.tableList();
      }
    },
    select() {
      var self = this;
      let params = {
        ziduanqufen: self.ziduanqufen
      };
      this.axios({
        url: this.api.GovernmentSearch,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.options = res.data.data;
        
      });
    },
    search(){
      var self=this
      self.page=1
      self.tableList()
    },

    tableList() {
      var self = this;
      var right = document.getElementsByClassName('btn-next')
      right[0].disabled=""
      let params = {
        page: self.page,
        limit: 20,
        ziduanqufen: self.ziduanqufen,
        jianglimc: self.jianglimc,
        gongsiname: self.gongsiname,
        suoshudy:self.suoshudy,
      };
      this.axios({
        url: this.api.GovernmentList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.tableData = res.data.data;
        self.total = res.data.count;
          // 分页--下一页disabled
                var cot =  Math.ceil(self.total/20)
                if(cot <= self.page){
                    right[0].disabled="disabled"
                }else if(self.page==1){
                    self.suibian=true
                }
                // 分页--下一页disabled
      });
    },
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/Techindustry.scss";
#Govemment{
    .el-table__row>td:first-child{
        text-align: left !important;
    }
}
.el-tabs .PuKey{
  padding: 0 23px !important;
  .key{
    border: none !important;
    font-size: 20px !important;
  }
}
.form-group {
  .rewardName,
  .regions {
    height: 34px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding-left: 4px;
    color: #666;
    outline: none;
    /* 清除默认的箭头样式 */
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  
  .rewardName {
    width: 500px;
    background: url("../../../src/assets/images/icon-xiala.png") 470px center
      no-repeat;
  }
  .regions {
    width: 140px;
    background: url("../../../src/assets/images/icon-xiala.png") 110px center
      no-repeat;
  }
}
</style>