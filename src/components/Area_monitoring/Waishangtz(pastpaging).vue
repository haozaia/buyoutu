<template>
    <div id="Waishangtz">
        <div class="container">
            <header>
            <div class="block-title">
                <i class="icon icon-tips"></i>
                <span>外商投资企业</span>
            </div>
            </header>
        </div>
        <div class="el-tabs">
            <div class="form-wrapper">
                <form class="form-inline" role="form">
                <div class="form-group">
                    <span class="control-label">投资轮次 :</span>
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
                    <el-table stripe :data="waishanglst" v-loading="loading" style="width: 100%">
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
                    <el-table-column prop="touzisj" label="投资时间"></el-table-column>
                    <el-table-column prop="touzixzlc" label="投资性质、轮次"></el-table-column>
                    <el-table-column prop="touzize" label="投资金额"></el-table-column>
                    <el-table-column prop="suoshuhy" label="产品名称"></el-table-column>
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
@import "../../styles/Monitor/region/css/container/Waishangtz.scss";

</style>

<script>
export default {
    data() {
        return{
            loading: true,
            options: [],
            // zhucedi: [],
            waishanglst: [],
            gongsiname: '',
            lcvalue: '',
            // zcdvalue: '',
            zhucesf: '',
            page: 1,
            total: 0,
        }
    },
    mounted(){
        this.zhucesf = this.$store.state.suoshusf
        this.luncilist()
        this.zhucedlist()
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
            this.loading = true
            let params = {
                page: this.page,
                limit: 20,
                zhucesf: this.zhucesf,
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