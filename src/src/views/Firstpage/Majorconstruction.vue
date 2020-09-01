<template>
<div id="majorconstruction">
  <div id="C_content">
    <div class="C_container">
      <div class="C_title"><span class="Title_left"></span>重大在建项目企业 </div>
      <div class="el-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <div class="form-wrapper">
              <form class="form-inline" role="form">
                 <div class="form-group">
                <span class="control-label">地区省份 ：</span>
                  <el-select v-model="diqu" placeholder="请选择地区省份">
                     <el-option label="选择所有" value=""></el-option>
                    <el-option
                      v-for="item in options"
                      :key="item.diqu"
                      :label="item.diqu"
                      :value="item.diqu"
                    ></el-option>
                  </el-select>
              </div>
                <div class="form-group">
                  <div class="ui-input ui-input-search PuKey">
                    <i class="el-icon-search"></i>
                    <input class="key" placeholder="请输入项目名称" v-model="xiangmumc" type="text" autocomplete="off" />
                  </div>
                </div>
                <!-- <div class="form-group">
                  <button class="btn btn-query btn-action" type="button" role="button">
                    <span class="chaxun" @click="search()">查询</span>
                    <i class="icon-loading icon-loading-white a-spin"></i>
                  </button>
                </div> -->
                <el-button @click="search()" type="primary">查询</el-button>
              </form>
            </div>
            <div class="query-result">
              <div class="table-wrapper">
                <el-table stripe :data="tableData" style="width: 100%">
                  <el-table-column prop="gongsiname" label="业主单位和项目名称"></el-table-column>
                  <el-table-column prop="jingzhanjd" label="进展阶段"></el-table-column>
                  <el-table-column prop="jianzhuzq" label="建筑周期" ></el-table-column>
                  <el-table-column prop="jianzhumj" width="160" label="建筑面积"></el-table-column>
                  <el-table-column prop="zongtouze" width="140" label="总投资额"></el-table-column>
                  <el-table-column prop="diqu" width="140" label="地区"></el-table-column>
                  <el-table-column prop="faburq" width="150" label="发布日期"></el-table-column>
                  <el-table-column prop label="详情" width="100">
                      <template slot-scope="scope">
                        <el-popover trigger="hover" placement="left" width="500">
                          <p> <b>项目详情</b>: <span v-html="scope.row.xiangmujj"></span>  </p><br>
                          <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">详情</el-tag>
                          </div>
                        </el-popover>
                      </template>
                  </el-table-column>
                  <!-- <el-table-column prop="" label="项目详情"><a href="#" style="color:#c03532">详情</a>  </el-table-column> -->
                </el-table>
              </div>
            </div>
             <!-- 分页dom start -->
                    <div id="Pagination">
                        <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
                        <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
                    </div>
              <!-- 分页dom end -->
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
      value:"",
      diqu:"",
       page: 1,
      activeName: "first",
      total:0,
      options: [
      ],
      tableData: [
      ],
      xiangmumc:'',
      suibian:true    //分页变量3
    };
  },
  mounted(){
 var self = this;
    self.select();
    self.tableList();
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
            var cot =  parseInt(self.total/20)+1
            self.suibian=false  //是否禁用首页按钮
      // console.log(self.page);
      self.tableList(val, 20);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
     search(){
      var self=this
      self.page=1
      self.tableList()
    },
       select() {
      var self = this;
      let params = {
        地区: "diqu"
      };
      this.axios({
        url: this.api.MajorconsSelect,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res)
        console.log(JSON.stringify(res.data.data));
        self.options = res.data.data;
      });
    },

    tableList() {
      var self = this;
        
        var right = document.getElementsByClassName('btn-next')
right[0].disabled=""
      let params = {
        page: self.page,
        limit: 20,
        ziduanqufen: self.ziduanqufen,
        diqu: self.diqu,
        gongsiname: self.xiangmumc
      };
      this.axios({
        url: this.api.MajorconsList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
         self.total = res.data.count;
         let data = res.data.data;
        self.tableData = data.map(function(singleEl) {
          singleEl.xiangmujj = singleEl.xiangmujj.replace( /◆/g, "<br/>◆");
          // console.log(singleEl.xiangmujj)
          return singleEl;
        });
        // 分页--下一页disabled
                var cot =  parseInt(self.total/20)+1
                if(cot <= self.page){
                    right[0].disabled="disabled"
                }else if(self.page==1){
                    self.suibian=true
                }
                // 分页--下一页disabled
        // console.log(self.tableList)
      });
    },
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/Techindustry.scss";
#majorconstruction{
    .el-table__row>td:first-child{
        text-align: left !important;
    }
}
</style>