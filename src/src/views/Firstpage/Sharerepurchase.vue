<template>
  <div id="C_content">
    <div class="C_title"><span class="Title_left"></span>股份回购</div>
    <!-- 搜索、查询 -->
    <!-- <div class="agu_search">
      <div class="search_l">
        <i class="iconfont icon-sousuo"></i>
        <input
          id="code"
          type="text"
          v-model="gongsiname"
          placeholder="请输入公司名称/代码"
          autocomplete="off"
        />
      </div>
      <div class="query" @click=" tablelist()">
        <button>查询</button>
      </div>
    </div> -->
    <!-- 质押详情 -->
    <div class="el-tabs">
      <div class="form-wrapper">
        <form class="form-inline" role="form">
          <div class="form-group">
            <div class="ui-input ui-input-search PuKey">
              <input
                class="key"
                v-model="gongsiname"
                placeholder="公司名称/代码"
                type="text"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="form-group">
            <el-button @click="tablelist()" type="primary">查询</el-button>
          </div>
        </form>
      </div>
      <div class="query-result">
        <template>
            <div class="table-wrapper">
          <el-table :data="gufenhgList" stripe style="width: 100%">
            <el-table-column prop="gupiaojc" label="股票简称" align="center"></el-table-column>
            <el-table-column prop="gupiaodm" label="股票代码" align="center">
              <template slot-scope="scope">
                <a
                  :href="scope.row.gupiaodmlj"
                  target="_blank"
                  style="color:#606266;text-decoration:none;"
                >{{ scope.row.gupiaodm }}</a>
              </template>
            </el-table-column>
            <!-- <el-table-column
                prop="zuixinj"
                label="最新价"
                align="center">
            </el-table-column>-->
            <el-table-column prop="jihuahgjg" label="计划回购价格区间(元)" align="center"></el-table-column>
            <el-table-column prop="jihuahgslqj" label="计划回购数量区间(股)" align="center"></el-table-column>
            <el-table-column prop="zhangonggqyr" label="占公告前一日总股本比例(%)" align="center"></el-table-column>
            <el-table-column prop="jihuahgjeqj" label="计划回购金额区间(元)" align="center"></el-table-column>
            <el-table-column prop="huigouqssj" label="回购起始时间" align="center"></el-table-column>
            <el-table-column prop="shishijd" label="实施进度" align="center"></el-table-column>
            <!-- <el-table-column
                prop="yihuiggfjgqj"
                label="已回购股份价格区间(元)"
                align="center">
                </el-table-column>
                <el-table-column
                prop="yihuiggfsl"
                label="已回购股份数量(股)"
                align="center">
                </el-table-column>
                <el-table-column
                prop="yihuigje"
                label="已回购金额(元)"
                align="center">
            </el-table-column>-->
            <el-table-column prop="zuixinggrq" label="最新公告日期" align="center"></el-table-column>
          </el-table>
            </div>
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="20"
            :total="total"
          ></el-pagination>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gufenhgList: [],
      total: 0,
      gongsiname: ""
    };
  },
  mounted() {
    this.tablelist();
  },
  methods: {
    tablelist() {
      let params = {
        page: this.page,
        limit: 20,
        gongsiname: this.gongsiname
      };
      this.axios({
        url: this.api.Sharerepurchase,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log("1",res.data.data)
        this.gufenhgList = res.data.data;
        this.total = res.data.count;
      });
    },
    handleCurrentChange(val) {
      var self = this;
      self.page = val;
      self.tablelist(val, 20);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/css/agusearch.scss";
</style>