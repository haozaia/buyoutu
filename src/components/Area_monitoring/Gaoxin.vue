<template>
    <div id="Gaoxin">
        <!-- <div class="container">
            <header>
            <div class="block-title">
                <i class="icon icon-tips"></i>
                <span>高新技术企业</span>
            </div>
            </header>
        </div> -->
        <div class="el-tabs">
            <div class="query-result">
                <div style="padding-top:20px;"></div>
                <template>
                    <div class="table-wrapper">
                    <el-table :empty-text="tishi" :data="tableData" v-loading="loading" stripe style="width: 100%">
                        <el-table-column prop="gongsiname" label="企业名称" align="center">
                            <template slot-scope="scope">
                                <router-link
                                target="_blank"
                                tag="a"
                                style="color:#606266;text-decoration:none;"
                                :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.gongsiname) }}"
                                >{{ scope.row.gongsiname }}</router-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="gongsilx" label="公司类型" align="center"> </el-table-column>
                        <el-table-column prop="zhuczb" label="注册资本" width="300" align="center"> </el-table-column>
                        <el-table-column prop="huogxrzdnf" label="资质年份" width="160" align="center"> </el-table-column>
                    </el-table>
                    </div>
                </template>
            </div>
            <!-- 分页dom start -->
            <div id="Pagination" v-show="total > 20">
                <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
                <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
            </div>
            <!-- 分页dom end -->
        </div>
    </div>
</template>

<style lang="scss">
@import "../../styles/Monitor/region/css/container/container.scss"; 
@import "../../styles/Monitor/region/css/container/Gaoxin.scss";
@import "../../styles/Monitor/region/css/container/paging.scss";
// #Pagination{
//     display: flex;
//     height: 100%;
//     flex-direction: row-reverse;
//     background: #fff;
//     padding-bottom: 10px
// }
</style>

<script>
export default {
    data() {
        return{
            tableData: [],
            suoshusf: '',
            suoshucs: '',
            suoshuqx: '',
            total:0,
            loading: true,
            page:1,     //分页变量1
            limit:20,   //分页变量2
            suibian:true,    //分页变量3
            tishi: "正在查询..."
        }
    },
    mounted() {
        this.suoshusf = this.$store.state.suoshusf
        this.suoshucs = this.$store.state.suoshucs
        this.suoshuqx = this.$store.state.suoshuqx
        this.list()
    },
    watch: {
        "$store.state.suoshusf": function() {
        var self = this;
        this.suoshusf = this.$store.state.suoshusf
        self.loading = true
        this.page = 1   //分页
        this.list()
        },
        
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
        list() {
            var self = this
            // 分页--调用没数据的接口后，重置分页 start
            var right = document.getElementsByClassName("btn-next");
            right[0].disabled = "";
            // 分页--调用没数据的接口后，重置分页 end
            let params = {
                page: this.page,
                limit: this.limit,  //分页--limit从实例定义
                suoshusf: this.suoshusf,
                suoshucs: self.suoshucs,
                suoshuqx: self.suoshuqx,    
            }
            this.axios({
                url: this.api.Gongxinjsqy,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                console.log(res.data.data)
                this.tableData = res.data.data
                if(res.data.count == 0) {
                    self.tishi = "暂无数据"
                }
                this.total = res.data.count
                this.loading=false
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
            self.list(val, 20);
        },
    }
    
}
</script>