<template>
  <div id="Recommend">
    <div id="C_content">
      <div class="C_title">
        <span class="Title_left"></span>
        智能推荐
      </div>
        <div class="form-group">
            <el-select class="Search_Down_input" placeholder="请选择一级行业" filterable clearable v-model="form_One" @change="getOneclass" style="margin-right:20px;">
                <el-option
                v-for="item in OneClass"
                :key="item.yijihy"
                :label="item.yijihy"
                :value="item.yijihy"
                ></el-option>
            </el-select>

            <span class="control-label">选择地区 ：</span>
            <el-cascader
                ref="refHandle"
                style="width:240px;"
                v-model="city_search"
                :options="city_data"
                :props="{ checkStrictly: true }"
                @change="handleChange"
                clearable
            ></el-cascader>
             <el-button @click="TipsB"  class="floatR" type="primary" v-if="unitCode==3">导出</el-button>
        </div>
      <div class="el-tabs">
        <div class="query-result">
          <template>
            <div class="table-wrapper">
              <el-table
                :empty-text="tishi"
                stripe
                :data="tableData"
                v-loading="loading"
                style="width: 100%"
              >
                <el-table-column prop="gongsiname" label="企业名称" width="380" align="left">
                    <template slot-scope="scope">
                        <router-link
                        target="_blank"
                        tag="a"
                        style="color:#606266;text-decoration:none;"
                        :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                        >{{ scope.row.gongsiname }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="suoshusf" label="所属省份" align="center"></el-table-column>
                <el-table-column prop="fadingdbr" label="法定代表人" align="center">
                  <template slot-scope="{row}">{{ row.fadingdbr || '-' }}</template>
                </el-table-column>
                <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center">
                  <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                </el-table-column>
                <el-table-column prop="" label="来源" width="100">详情
                    <template slot-scope="scope">
                        <el-popover v-if="scope.row.beizhu2 == 2" trigger="hover" placement="left" width="500">
                          <p> <b></b>{{ scope.row.laiyuan }}</p>
                          <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">详情</el-tag>
                          </div>
                        </el-popover>
                        <a
                        v-else
                        :href="scope.row.laiyuan"
                        target="_blank"
                        style="color:#606266;text-decoration:none;"
                        >详情</a>
                    </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </div>
        <!-- 分页dom start -->
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
        <!-- 分页dom end -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        OneClass:{},
        loading: true,
        form_One: "",
        city_data: [],
        tableData: [],
        sheng: "",
        shi: "",
        tishi: "正在为您查询...",
        city_search: "",
        total:0,
        page: 1,
        suibian: true, //分页变量3,
    };
  },
  mounted() {
    var self = this;
      this.getOneclass()
      this.citylist()
      this.tableList()
      self.unitCode = localStorage.getItem("unitCode");
  },
  methods:{
    getOneclass() {
      var self = this;
      self.loading = true
      this.axios({
        url: this.api.GetOneClass,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then( res=> {
        self.OneClass = res.data.data
        this.tableList()
      })
    },
    TipsB() {
      var self = this;
            let url =
              self.api.exportuijian +
              "?suoshusf=" +
              self.sheng +
              "&suoshuhy=" +
              self.form_One+
              "&suoshucs=" +
              self.shi ;
            window.location.href = url; //  跳转链接
    },
    citylist() {
      var self = this;
      self.loading = true
      this.axios({
        url: this.api.LXshengshiapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.city_data = res.data.data;
      });
    },
    handleChange(value) {
      var self = this;
      self.sheng = value[0] ? value[0] : "";
      self.shi = value[1] ? value[1] : "";
      this.page = 1;
      this.tableList();
    },
    tableList() {
        var self = this;
        var right = document.getElementsByClassName("btn-next");
        right[0].disabled = "";
        self.loading = true
        let params = {
            page:self.page,
            limit:20,
            suoshuhy: self.form_One,
            suoshusf: self.sheng,
            suoshucs: self.shi,
        }
        this.axios({
            url: this.api.RecommendList,
            method: "post",
            data: this.$qs.stringify(params),
            headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then (res => {
        // console.log(res)
        self.tableData = res.data.data
        self.total = res.data.count
        self.loading = false;
        if (res.data.count == 0) {
            self.tishi = "暂无数据";
        }
        // 分页--下一页disabled
        var cot = Math.ceil(self.total / 20);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        } else if (self.page == 1) {
          self.suibian = true;
        }
        // 分页--下一页disabled
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
      self.tableList();
    },
  }
};
</script>
<style lang="scss">
#Recommend{
    .form-group{
        padding: 12px 30px;
    }
    .table-wrapper{
        a:hover{
            color: darkblue;
        }
    }
}
</style>