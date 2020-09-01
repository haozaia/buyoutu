<template>
  <div id="fortuneFv">
    <div id="C_content">
      <div class="C_title">
        <span class="Title_left"></span>招股书
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
                <el-table-column prop="remark2" label="公司名称" align="center"></el-table-column>
                <el-table-column prop="fileName" label="公司简介" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="remark3" label="发行日期" align="center"></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      qiyelist: [],
      total: 0,
      page: 1
    };
  },
  mounted() {
    this.enterpriselist();
  },
  methods: {
    enterpriselist() {
      let params = {
        pageNumber: this.page,
        pageSize: 20,
        type: 3
      };
      this.axios({
        url: this.api.fileList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res.data);
        this.qiyelist = res.data.data.list;
        this.total = res.data.data.totalRow;
      });
    },
    handleCurrentChange(val) {
      var self = this;
      self.page = val;
      self.enterpriselist(val, 20);
    }
  }
};
</script>

<style lang="scss">
</style>