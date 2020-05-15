<template>
    <div id="Biaozhunzd">
        <!-- <div class="container">
            <header>
            <div class="block-title">
                <i class="icon icon-tips"></i>
                <span>标准制定企业</span>
            </div>
            </header>
        </div> -->
        <div class="el-tabs">
            <div class="form-wrapper">
                <form class="form-inline" role="form">
                <div class="form-group">
                    <span class="control-label">标准类型：</span>
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
                    <div class="ui-input ui-input-search PuKey">
                    <i class="el-icon-search"></i>
                    <input class="key" v-model="gongsiname" placeholder="请输入公司名称" type="text" autocomplete="off" />
                    </div>
                </div>
                <!-- <div class="form-group">
                    <button class="btn btn-query btn-action" type="button" role="button">
                    <span @click="tablelist()" class="chaxun">查询</span>
                    <i class="icon-loading icon-loading-white a-spin"></i>
                    </button>
                </div> -->
                <el-button @click="tablelist()" type="primary">查询</el-button>
                </form>
            </div>
        </div>
        <section class="block box-shadow overviewLayer">
            <div class="el-tabs padding10">
                <div class="query-result">
                <div class="table-wrapper">
                    <el-table :empty-text="tishi" stripe :data="bzlist" v-loading="loading" style="width: 100%">
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
                    <!-- <el-table-column prop="xukezbh" label="许可证编号"></el-table-column> -->
                    <el-table-column prop="gongsilx" label="公司类型"></el-table-column>
                    <el-table-column prop="zhuguanbm" label="主管单位"></el-table-column>
                    <el-table-column prop="biaozhunmc" label="标准名称"></el-table-column>
                    <el-table-column prop="zhuczb" label="注册资本"></el-table-column>
                    <el-table-column prop="faburq" width="160" label="发布日期"></el-table-column>
                    <el-table-column prop="biaozhunh" width="180" label="标准编号"></el-table-column>
                    </el-table>
                </div>
                </div>
                <!-- 分页dom start -->
                <div id="Pagination"  v-show="total > 20">
                    <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
                    <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
                </div>
                <!-- 分页dom end -->
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
            tishi: "正在查询...",
            loading: true,
            bzvalue: "a",
            // faburq: "",
            suoshusf: "",
            suoshucs: "",
            suoshuqx: "",
            gongsiname: '',
            page: 1,
            limit:20,   //分页变量2
            suibian:true,    //分页变量3
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
        this.suoshusf = this.$store.state.suoshusf
        this.suoshucs = this.$store.state.suoshucs
        this.suoshuqx = this.$store.state.suoshuqx
        this.nianfenlist()
        this.tablelist()
    },
    watch: {
        "$store.state.suoshusf": function() {
        var self = this;
        this.suoshusf = this.$store.state.suoshusf
        self.loading = true
        this.page = 1   //分页
        this.tablelist()
        }
    },
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
            var self = this
            // 分页--调用没数据的接口后，重置分页 start
            var right = document.getElementsByClassName("btn-next");
            right[0].disabled = "";
            // 分页--调用没数据的接口后，重置分页 end
            let params = {
                page: this.page,
                limit: 20,
                suoshusf: this.suoshusf,
                suoshucs: self.suoshucs,
                suoshuqx: self.suoshuqx,
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
                if(res.data.count == 0) {
                    self.tishi = "暂无数据"
                }
                this.total = res.data.count
                this.loading = false
                //分页--总条数<=20，禁用右按钮  start
                var cot = parseInt(self.total / 20) + 1;
                if (cot <= self.page) {
                right[0].disabled = "disabled";
                } else if (self.page == 1) {
                self.suibian = true;
                }
                //分页--总条数<=20，禁用右按钮  end
            })
        },
        handleCurrentChange(val){
            var self = this;
            self.loading=true
            self.page = val;
            self.suibian=false  //是否禁用首页按钮
            self.tablelist(val);
        },
    }
}
</script>