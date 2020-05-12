<template>
    <div id="Waishangtz">
        <!-- <div class="container">
            <header>
            <div class="block-title">
                <i class="icon icon-tips"></i>
                <span>外商投资企业</span>
            </div>
            </header>
        </div> -->
        <div class="el-tabs">
            <div class="form-wrapper">
                <form class="form-inline" role="form">
                <div class="form-group">
                    <span class="control-label">投资轮次：</span>
                    <el-select v-model="lcvalue" clearable placeholder="请选择投资轮次">
                        <el-option label="选择所有" value></el-option>
                        <el-option
                            v-for="item in options"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div class="form-group">
                  <span class="control-label"></span> 
                  <el-select v-model="zcdvalue" placeholder="请选择境外投资者国籍(或地区)/注册地">
                    <el-option label="选择所有" value></el-option>
                    <el-option
                      v-for="item in zhucedi"
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
                    <el-table :empty-text="tishi" stripe :data="waishanglst" v-loading="loading" style="width: 100%">
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
                    <el-table-column prop="jingwaitzz" label="投资方"></el-table-column>
                    <el-table-column prop="suoshuhy" width="180" label="产品名称"></el-table-column>
                    <el-table-column prop="touzixzlc" width="170" label="投资性质、轮次"></el-table-column>
                    <el-table-column prop="touzize" width="160" label="投资金额"></el-table-column>
                    <el-table-column prop="touzisj" width="160" label="投资时间"></el-table-column>
                    </el-table>
                </div>
                </div>
                <!-- 分页dom start -->
                <div id="Pagination">
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
@import "../../styles/Monitor/region/css/container/Waishangtz.scss";

</style>

<script>
export default {
    data() {
        return{
            loading: true,
            tishi: "正在查询...",
            options: [],
            // zhucedi: [],
            waishanglst: [],
            gongsiname: '',
            lcvalue: '',
            // zcdvalue: '',
            zhucesf: '',
            suoshucs: "",
            suoshuqx: "",
            page: 1,
            total: 0,
            limit:20,   //分页变量2
            suibian:true,    //分页变量3
        }
    },
    mounted(){
        this.zhucesf = this.$store.state.suoshusf
        this.suoshucs = this.$store.state.suoshucs
        this.suoshuqx = this.$store.state.suoshuqx
        this.luncilist()
        this.zhucedlist()
        this.page = 1   //分页
        this.tablelist()
    },
    watch: {
        "$store.state.suoshusf": function() {
        var self = this;
        this.zhucesf = this.$store.state.suoshusf
        self.loading = true
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
        luncilist() {
            this.axios({
            url: this.api.waishanglc,
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
                // console.log(res)
                var str = []
                for(let i=0;i<res.data.data.length;i++){
                    var arr = res.data.data[i].touzixzlc
                    str.push(arr)
                }
                this.options = str
            })
        },
        zhucedlist() {
            this.axios({
            url: this.api.waishangzcd,
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
                // console.log(res.data.data,"hhhhhhhh")
                var str1 = []
                for(let i=0;i<res.data.data.length;i++){
                    var arr1 = res.data.data[i].jingwaitzzgjzcd
                    str1.push(arr1)
                }
                // this.zhucedi = str1
            })
        },
        tablelist() {
            var self = this
            // 分页--调用没数据的接口后，重置分页 start
            var right = document.getElementsByClassName("btn-next");
            right[0].disabled = "";
            // 分页--调用没数据的接口后，重置分页 end
            this.loading = true
            let params = {
                page: this.page,
                limit: 20,
                zhucesf: this.zhucesf,
                suoshucs: self.suoshucs,
                suoshuqx: self.suoshuqx,
                touzixzlc:this.lcvalue,
                // jingwaitzzgjzcd:this.zcdvalue,
                gongsiname: this.gongsiname,
            }
            this.axios({
            url: this.api.waishanglst,
            method: "post",
            data: this.$qs.stringify(params),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
                console.log(res)
                this.waishanglst = res.data.data
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