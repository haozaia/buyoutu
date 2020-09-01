<template>
    <div id="C_content">
        <div class="C_container">
            <div class="C_title">
                <span class="Title_left"></span>{{ this.titleleft }}
                <el-button class="GovernmentDetailsRtPark" @click="xinzeng()" type="primary">新增</el-button>
            </div>
            <div class="el-tabs padding10">
                <div class="query-result">
                <div style="padding-top:10px;"></div>
                    <div class="table-wrapper">
                        <el-table stripe :data="tableData" style="width: 100%">
                            <el-table-column prop="serviceNumber" label="编号"></el-table-column>
                            <el-table-column prop="serviceName" width="350" label="服务名称">
                                <!-- <template slot-scope="scope">
                                <router-link
                                    style="color:#606266;text-decoration:none;"
                                    tag="a" 
                                    :to="{ path:'/GovernmentDetails', query: { name: Base64.encode(scope.row.govermentSector),id: Base64.encode(scope.row.id),cooperationStatus:scope.row.cooperationStatus, dflUserId:scope.row.dflUserId,dshtz: 9,}}"
                                >{{ scope.row.govermentSector }}</router-link>
                                </template> -->
                            </el-table-column>
                            <el-table-column prop="industryRequirements" label="产业要求"></el-table-column>
                            <el-table-column width="150" label="操作">
                                <template slot-scope="scope">
                                    <span class="curPoi modify" @click="xiugai(scope.row)">
                                        <i class="el-icon-edit" :title="'修改'"></i>
                                    </span>
                                    <span class="curPoi modify" @click="ProDelete(scope.row)">
                                        <i class="el-icon-delete" :title="'删除'"></i>
                                    </span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 分页dom start -->
                    <div id="Pagination" v-show="total > 20">
                    <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
                    <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
                    </div>
                <!-- 分页dom end -->
            </div>
            <el-dialog :visible.sync="dialogpro" width="82%" v-if="dialogpro" class="Appdialog">
                <div class="title_h">
                    <span class="fontSize24" style="letter-spacing:2px">{{ this.dialogtitle }}</span>
                </div>
                <div class="dialogClose" @click="Increasedialog_close">×</div>
                <productdialog :close="productclose" :change="changeID" :clear="clear"></productdialog>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import productdialog from "../Firstpage/productdialog.vue";
export default {
    data() {
        return {
            titleleft: "产品管理",
            dialogtitle: "",
            page: 1,
            total: 0,
            tableData: [],//列表信息
            dialogpro: false,
            changeID: "",//用作修改的单条ID
        }
    },
    watch: {

    },
    mounted() {
        this.Prdlist()
    },
    methods: {
        // 清空
        // clear(){
        //     var self = this

        // },
        //列表信息
        Prdlist() {
            var self = this
            let params = {
                page:self.page,
                limit: 20,
            }
            this.axios({
                url: this.api.Productlistapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"列表")
                self.tableData = res.data.data
            })
        },
        // 新增产品
        xinzeng() {
            var self = this
            self.changeID = ""
            this.dialogpro = true
            this.dialogtitle="产品管理新增"
        },
        // 修改产品
        xiugai(val) {
            var self = this
            this.dialogtitle="产品管理修改"
            this.dialogpro = true
            self.changeID = val.id
        },
        //新增产品关闭
        Increasedialog_close() {
            this.dialogpro = false
        },
        //保存成功（传至子组件）
        productclose(msg) {
            var self = this;
            // console.log(msg);
            this.dialogpro = false
            self.Prdlist();
        },
        //列表中删除
        ProDelete(val) {
            var self = this
            console.log(val,"删除信息")
            let params = {
                id: val.id
            }
            this.axios({
                url: this.api.Productdeleteapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if(res.data.code == 0){
                    this.$message.success("删除成功")
                    this.Prdlist()
                }else{
                    this.$message("删除失败")
                }
            })
        },




        // 城市下拉框点击执行函数
        handleChange1(value) {
            this.province = value[0]
            this.city = value[1]
            this.area = value[2]
            this.Prdlist()
        },
        paginationsy() {
            if(this.page === 1) {
            }else{
                // this.page = 1
                this.handleCurrentChange(1)
            }
        },
        // 分页--回到首页按钮  end
        handleCurrentChange(val) {
            var self = this;
            // console.log(`当前页: ${val}`);
            self.page = val;
            //分页--判断当前页是否为最后一页，禁用右按钮  start
            var cot =  Math.ceil(self.total/20)
            self.suibian=false  //是否禁用首页按钮
            //分页--判断当前页是否为最后一页，禁用右按钮  end
            self.Prdlist(val, 20);
        },
    },
    components: {
        productdialog,
    },
}
</script>

<style lang="scss" scoped>
.C_container{
    .GovernmentDetailsRtPark{
        float: right;
        margin-top: 12px;
        margin-right:10px;
        // text-align:right;
    }
    .modify{
        margin-left: 10px;
    }
    .curPoi{
        .scope_img_Sc{
            display: inline-block;
            background-image: url("../../assets/images/GovernmentManagement/Sc.svg");
            width: 26px;
            height: 26px;
            vertical-align: sub;
        }
    }
    .curPoi:hover{
        color: #cf111b;
    }
}
</style>