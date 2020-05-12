<template>
    <div id="Yongyouzz">
        <div class="container">
            <header>
                <div class="block-title">
                    <i class="icon icon-tips"></i>
                    <span>拥有证照企业</span>
                </div>
            </header>
            <div class="el-tabs">
                <div class="form-wrapper">
                    <form class="form-inline" role="form">
                    <div class="form-group">
                        <span class="control-label">证照类型 :</span>
                        <el-select v-model="zzvalue" clearable placeholder="请选择证照类型">
                            <el-option label="选择所有" value></el-option>
                            <el-option
                              v-for="item in options"
                              :key="item"
                              :label="item"
                              :value="item">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="form-group">
                        <div class="ui-input ui-input-search">
                        <i class="el-icon-search"></i>
                        <input class="key" v-model="gongsiname" placeholder="请输入公司名称" type="text" autocomplete="off" />
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-query btn-action" type="button" role="button">
                        <span @click="tablelist()" class="chaxun">查询</span>
                        <i class="icon-loading icon-loading-white a-spin"></i>
                        </button>
                    </div>
                    </form>
                </div>
            </div>
            <section class="block box-shadow overviewLayer">
              <div class="el-tabs padding10">
                <div class="query-result">
                  <div class="table-wrapper">
                    <el-table stripe :data="zzlist" v-loading="loading" style="width: 100%">
                      <el-table-column prop="gongsiname" label="公司名称">
                        <template slot-scope="scope">
                          <router-link
                            target="_blank"
                            tag="a"
                            style="color:#606266;text-decoration:none;"
                            :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                          >{{ scope.row.gongsiname }}</router-link>
                        </template>
                      </el-table-column>
                      <el-table-column prop="xukezbh" label="许可证编号"></el-table-column>
                      <el-table-column prop="gongsilx" label="公司类型"></el-table-column>
                      <el-table-column prop="zhuczb" label="注册资本"></el-table-column>
                      <el-table-column prop="zhengzhaolx" label="证照类型"></el-table-column>
                      <el-table-column prop="fazhengrq" label="发证日期"></el-table-column>
                      <el-table-column prop="fazhengjg" label="发证机构"></el-table-column>
                    </el-table>
                  </div>
                </div>
                <el-pagination layout="prev, pager, next"  @current-change="handleCurrentChange"  :page-size="20"  :total="total"></el-pagination>
              </div>
            </section>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../styles/Monitor/region/css/container/container.scss";
@import "../../styles/Monitor/region/css/container/Yongyouzz.scss";

</style>

<script>
export default {
    data () {
        return{
            loading: true,
            options: [],
            zzlist: [],
            zzvalue: '',
            gongsiname: '',
            shengzhixs: '',
            total: 0,
            page: 1,
        }
    },
    mounted () {
        this.shengzhixs = this.$store.state.suoshusf
        this.xialalist()
        this.tablelist()
    },
    watch: {
        "$store.state.suoshusf": function() {
        var self = this;
        this.shengzhixs = this.$store.state.suoshusf
        self.loading = true
        this.tablelist()
        }
    },
    methods: {
        xialalist() {
            this.axios({
            url: this.api.zzleixing,
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
                console.log(res.data.data)
                var str = []
                for(let i=0;i<res.data.data.length;i++){
                    var arr = res.data.data[i].zhengzhaolx
                    str.push(arr)
                }
                this.options = str
            })
        },
        tablelist() {
            this.loading = true
            let params = {
                page: this.page,
                limit: 20,
                shengzhixs: this.shengzhixs,
                zhengzhaolx: this.zzvalue,
                gongsiname: this.gongsiname,
            }
            this.axios({
            url: this.api.zehngzhaolst,
            method: "post",
            data: this.$qs.stringify(params),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
                console.log(res)
                this.zzlist = res.data.data
                this.total = res.data.count
                this.loading = false
            })
        },
        handleCurrentChange(val){
            var self = this;
            self.loading=true
            self.page = val;
            self.tablelist(val);
        },
    }
}
</script>