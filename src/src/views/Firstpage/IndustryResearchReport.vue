<template>
<div id="fortuneFv">
  <div id="C_content">
    <div class="C_title"><span class="Title_left"></span>行业研报
      <el-input style="margin-left:20px;" class="fontSize20 Search_Entry_Div Search_Entry_input" v-model="hangye" clearable placeholder="请输入行业关键词"></el-input>
      <el-button @click="hysearch" type="primary">查询</el-button>
    </div>
    <div class="el-tabs">
      <div class="query-result">
        <div style="padding-top:25px;"></div>
        <template>
          <div class="table-wrapper">
          <el-table :data="qiyelist" stripe style="width: 100%">
                <el-table-column prop="remark3" label="序号" align="center" width="80">
                    <template slot-scope="scope">
                    {{scope.$index +1}}
                  </template>
                </el-table-column>
            <el-table-column prop="fileName" label="报告名称" align="center">
            </el-table-column>
            <el-table-column prop="remark2" label="所属行业" align="center" width="200"></el-table-column>
            <el-table-column prop="remark3" label="发布日期" align="center" width="200"></el-table-column>
            <el-table-column prop="remark3" label="详情" align="center" width="150">
                  <template slot-scope="scope">
                    <div>
                      <a
                        target="_blank"
                        :href="api.ImgHttp+scope.row.filePath"
                      >详情</a>
                    </div>
                  </template>
                </el-table-column>
          </el-table>
          </div>
        </template>
        <!-- 分页dom start -->
        <div id="Pagination" v-show="total > 20">
          <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
          <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
        </div>
        <!-- 分页dom end -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      qiyelist: [],
      total: 0,
      page: 1,
      hangye:'',
      suibian:true,    //分页变量3
    };
  },
  mounted() {
    this.enterpriselist()
  },
  watch: {
    page(val) {
    var self=this
      if(val == 1){
          self.suibian=true
      }
    },
  },
  methods: {
    enterpriselist() {
      var self = this
      let params = {
        pageNumber:this.page,
        hangye:this.hangye,
        pageSize: 20,
        type:1,
      };
      this.axios({
        url: this.api.fileList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res.data)
        var right = document.getElementsByClassName('btn-next')
        right[0].disabled=''
        self.qiyelist = res.data.data.list
        self.total = res.data.data.totalRow
        // 分页--下一页disabled
        var cot =  Math.ceil(self.total/20)
        if(cot <= self.page){
          right[0].disabled="disabled"
        }
        if(self.page==1){
          self.suibian=true
        }
        // 分页--下一页disabled
      })
    },
    handleCurrentChange(val){
      var self = this;
      self.page = val;
      self.enterpriselist(val, 20);
    },
    hysearch(){
      var self = this
      self.page = 1;
      this.enterpriselist()
    },
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

       //分页--判断当前页是否为最后一页，禁用右按钮  start
        var cot =  Math.ceil(self.total/20)
        self.suibian=false  //是否禁用首页按钮
        //分页--判断当前页是否为最后一页，禁用右按钮  end
      self.enterpriselist(val, 20);
    },
  }
};
</script>

<style lang="scss">

</style>