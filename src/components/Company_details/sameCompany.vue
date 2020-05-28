<template>
  <div slot="danger_rgc">
    <div class="companyContent">

     <section class="table-list" v-if="total !=0">
        <header>
          <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">A股公司</span>
            </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
            <div class="table-wrapper">
              <el-table stripe :data="tableData" style="width: 100%">
                  <el-table-column prop="name" label="企业名称" width="400" align="left">
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
              <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column>
              <el-table-column prop="fadingdbr" align="center" label="法定代表人"></el-table-column>
              <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                 <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
              </el-table-column>
              <el-table-column prop="chenglisj" align="center" label="成立时间">
                 <template slot-scope="{row}">{{row.chenglisj || '-' }}</template>
              </el-table-column>
                </el-table>
            </div>
            <el-pagination
            v-show="total>10"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="total"
          background
        ></el-pagination>
        </div>
      </section>
     <section class="table-list" v-if="tableData1 !=''">
        <header>
          <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">三板公司</span>
            </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
            <div class="table-wrapper">
              <el-table stripe :data="tableData1" style="width: 100%">
                  <el-table-column prop="name" label="企业名称" width="400" align="left">
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
              <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column>
              <el-table-column prop="fadingdbr" align="center" label="法定代表人"></el-table-column>
              <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                 <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
              </el-table-column>
              <el-table-column prop="chenglisj" align="center" label="成立时间">
                 <template slot-scope="{row}">{{row.chenglisj || '-' }}</template>
              </el-table-column>
                </el-table>
            </div>
            <el-pagination
            v-show="total1>10"
          layout="prev, pager, next"
          @current-change="handleCurrentChange1"
          :page-size="10"
          :total="total1"
          background
        ></el-pagination>
        </div>
      </section>
     <section class="table-list" v-if="tableData2 !=''">
        <header>
          <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">四板公司</span>
            </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
            <div class="table-wrapper">
              <el-table stripe :data="tableData2" style="width: 100%">
                  <el-table-column prop="name" label="企业名称" width="400" align="left">
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
              <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column>
              <el-table-column prop="fadingdbr" align="center" label="法定代表人"></el-table-column>
              <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                 <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
              </el-table-column>
              <el-table-column prop="chenglisj" align="center" label="成立时间">
                 <template slot-scope="{row}">{{row.chenglisj || '-' }}</template>
              </el-table-column>
                </el-table>
            </div>
            <el-pagination
            v-show="total2>10"
          layout="prev, pager, next"
          @current-change="handleCurrentChange2"
          :page-size="10"
          :total="total2"
          background
        ></el-pagination>
        </div>
      </section>

     <section class="table-list" v-if="tableData3 !=''">
        <header>
          <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">已私募公司</span>
            </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
            <div class="table-wrapper">
              <el-table stripe :data="tableData3" style="width: 100%">
                  <el-table-column prop="name" label="企业名称" width="400" align="left">
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
              <el-table-column prop="suoshusf" align="center" label="所属省份"></el-table-column>
              <el-table-column prop="fadingdbr" align="center" label="法定代表人"></el-table-column>
              <el-table-column prop="zhucezbint" align="center" label="注册资本(万元)">
                 <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
              </el-table-column>
              <el-table-column prop="chenglisj" align="center" label="成立时间">
                 <template slot-scope="{row}">{{row.chenglisj || '-' }}</template>
              </el-table-column>
                </el-table>
            </div>
            <el-pagination
            v-show="total3>10"
          layout="prev, pager, next"
          @current-change="handleCurrentChange3"
          :page-size="10"
          :total="total3"
          background
        ></el-pagination>
        </div>
      </section>


    </div>
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
        gongsiname: "",
      total: 0,
      total1: 0,
      total2: 0,
      total3: 0,
      page: 1,
      page1: 1,
      page2: 1,
      page3: 1,
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.getList();
    self.getList1();
    self.getList2();
    self.getList3();
  },
  methods: {
    handleCurrentChange(val) {
      var self = this;
      self.page = val;
      self.getList(val, 20);
    },
    getList() {
      var self = this;
      let params = {
        pageNumber: self.page,
        gongsiname: self.gongsiname,
        pageSize: 10,
        zibenscdy:2
      };
      this.axios({
        url: this.api.ComKebilist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData = res.data.data.list;
        self.total = res.data.data.totalRow;
        console.log(res.data.data.totalRow)
      });
    },
    handleCurrentChange1(val) {
      var self = this;
      self.page1 = val;
      self.getList1(val, 20);
    },
    getList1() {
     var self = this;
      let params = {
        pageNumber: self.page1,
        gongsiname: self.gongsiname,
        pageSize: 10,
        zibenscdy:3
      };
      this.axios({
        url: this.api.ComKebilist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData1 = res.data.data.list;
        self.total1 = res.data.data.totalRow;
        console.log(res.data.data.totalRow)
      });
    },
    handleCurrentChange2(val) {
      var self = this;
      self.page2 = val;
      self.getList2(val, 20);
    },
    getList2() {
     var self = this;
      let params = {
        pageNumber: self.page2,
        gongsiname: self.gongsiname,
        pageSize: 10,
        zibenscdy:4
      };
      this.axios({
        url: this.api.ComKebilist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData2 = res.data.data.list;
        self.total2 = res.data.data.totalRow;
        console.log(res.data.data.totalRow)
      });
    },
    handleCurrentChange3(val) {
      var self = this;
      self.page3 = val;
      self.getList3(val, 20);
    },
    getList3() {
     var self = this;
      let params = {
        pageNumber: self.page3,
        gongsiname: self.gongsiname,
        pageSize: 10,
        zibenscdy:5
      };
      this.axios({
        url: this.api.ComKebilist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.tableData3 = res.data.data.list;
        self.total3 = res.data.data.totalRow;
      });
    },
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";
</style>