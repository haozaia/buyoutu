<template>
    <div id="Sanban">
        <div class="container">
            <div class=""></div>
            <header>
            <div class="block-title">
                <i class="icon icon-tips"></i>
                <span>三板公司列表</span>
            </div>
            </header>
        </div>
        <div class="el-tabs">
            <div class="query-result">
                <template>
                    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
                        <el-table-column prop="name" label="公司名称" align="center">
                            <template slot-scope="scope">
                                <router-link
                                target="_blank"
                                tag="a"
                                style="color:#606266;text-decoration:none;"
                                :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                                >{{ scope.row.name }}</router-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zhucedz" label="注册地址" align="center"> </el-table-column>
                        <el-table-column prop="fadingdbr" label="法定代表人" align="center"> </el-table-column>
                        <el-table-column prop="zhucezb" label="注册资本" align="center"> </el-table-column>
                        <el-table-column prop="zhucesj" label="注册时间" align="center"> </el-table-column>
                    </el-table>
                    <el-pagination layout="prev, pager, next"  @current-change="handleCurrentChange"  :page-size="20"  :total="total"></el-pagination>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../styles/Monitor/region/css/container/container.scss";
@import "../../styles/Monitor/region/css/container/Sanban.scss";

</style>

<script>
export default {
    data() {
        return{
            tableData: [],
            suoshusf: '',
            total:0,
            loading: true,
        }
    },
    mounted() {
        this.suoshusf = this.$store.state.suoshusf
        this.list()
    },
    watch: {
        "$store.state.suoshusf": function() {
        var self = this;
        this.suoshusf = this.$store.state.suoshusf
        self.loading = true
        this.list()
        }
    },
    methods: {
        list() {
            let params = {
                page: this.page,
                limit: 20,
                suoshusf: this.suoshusf,
                suoshuzbsc: "三板公司"
            }
            this.axios({
                url: this.api.modulelistapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                console.log(res.data.data)
                this.tableData = res.data.data
                this.total = res.data.count
                this.loading=false
            })
        },
        handleCurrentChange(val){
            var self = this;
            self.loading=true
            self.page = val;
            self.list(val, 20);
        },
    }
    
}
</script>