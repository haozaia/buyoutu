<template>
    <div id="Biaozhunzd">
        <div class="container">
            <header>
            <div class="block-title">
                <i class="icon icon-tips"></i>
                <span>标准制定企业</span>
            </div>
            </header>
        </div>
        <div class="el-tabs">
            <div class="form-wrapper">
                <form class="form-inline" role="form">
                <div class="form-group">
                    <span class="control-label">标准类型 :</span>
                    <el-select v-model="bzvalue" clearable placeholder="请选择标准类型">
                        <el-option label="选择所有" value></el-option>
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.lable"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div class="form-group">
                  <span class="control-label">年份 :</span>
                  <el-select v-model="faburq" placeholder="请选择年份">
                    <el-option label="选择所有" value></el-option>
                    <el-option
                      v-for="item in years"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </div> -->
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
                    <el-table stripe :data="bzlist" v-loading="loading" style="width: 100%">
                    <el-table-column prop="gongsiname" label="起草单位">
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
                    <el-table-column prop="zhuguanbm" label="主管单位"></el-table-column>
                    <el-table-column prop="biaozhunmc" label="标准名称"></el-table-column>
                    <el-table-column prop="biaozhunh" label="标准编号"></el-table-column>
                    <el-table-column prop="faburq" label="发布日期"></el-table-column>
                    </el-table>
                </div>
                </div>
                <el-pagination layout="prev, pager, next"  @current-change="handleCurrentChange"  :page-size="20"  :total="total"></el-pagination>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
@import "../../styles/Monitor/region/css/container/container.scss";
@import "../../styles/Monitor/region/css/container/Biaozhunzd.scss";

</style>

<script>
export default {
    data () {
        return{
            loading: true,
            bzvalue: "a",
            // faburq: "",
            zhucesf: "",
            gongsiname: '',
            page: 1,
            total: 0,
            bzlist: [],
            // years: [],
            options: [
                {
                    value: 'a',
                    lable: '国家标准'
                },{
                    value: 'b',
                    lable: '地方标准'
                },{
                    value: 'c',
                    lable: '行业标准'
                },{
                    value: 'd',
                    lable: '企业标准'
                },{
                    value: 'e',
                    lable: '团体标准'
                }
            ],
            
        }
    },
    mounted() {
        this.zhucesf = this.$store.state.suoshusf
        this.nianfenlist()
        this.tablelist()
    },
    watch: {
        "$store.state.suoshusf": function() {
        var self = this;
        this.zhucesf = this.$store.state.suoshusf
        // self.loading = true
        this.tablelist()
        }
    },
    methods: {
        nianfenlist() {
            let params = {
                ziduanqufen: this.bzvalue
            }
            this.axios({
            url: this.api.bznianfen,
            method: "post",
            data: this.$qs.stringify(params),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
                console.log(res)
                var str = []
                for(let i=0;i<res.data.data.length;i++){
                    var arr = res.data.data[i].faburq
                    str.push(arr)
                }
                // this.years = str
            })
        },
        tablelist() {
            let params = {
                page: this.page,
                limit: 20,
                zhucesf: this.zhucesf,
                ziduanqufen: this.bzvalue,
                gongsiname: this.gongsiname,
                // faburq: this.faburq
            }
            this.axios({
            url: this.api.biaozhunlst,
            method: "post",
            data: this.$qs.stringify(params),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
                console.log(res)
                this.bzlist = res.data.data
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