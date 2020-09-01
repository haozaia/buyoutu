<template>
    <div id="Daishenhe">
        <div id="C_content">
            <div class="C_container">
                <div class="C_title">
                    <span class="Title_left"></span>待审核客户
                </div>
                <div class="GovernmentManagement_block">
                    <span class="demonstration">选择区域：</span>
                    <el-cascader
                    clearable
                    ref="cascader"
                    :options="options1"
                    :props="{ checkStrictly: true }"
                    @change="handleChange1"
                    v-model="selected"
                    ></el-cascader>
                    <div class="inline left">
                        <el-input class="fontSize20 Ml30 Search_Entry_Div Searchinput240" v-model="govermentSector" clearable placeholder="请输入政府名称"></el-input>
                    </div>
                    <el-button class="increaseStyle searchStyle" @click="search()" type="primary">查询</el-button>
                </div>
                <div class="el-tabs padding10">
                    <div class="query-result">
                    <div style="padding-top:10px;"></div>
                        <div class="table-wrapper">
                            <el-table stripe :data="tableData" style="width: 100%">
                                <el-table-column prop="govermentSector" width="350" label="政府名称">
                                    <template slot-scope="scope">
                                    <router-link
                                        style="color:#606266;text-decoration:none;"
                                        tag="a" 
                                        :to="{ path:'/DaishenheDetails', query: { name: Base64.encode(scope.row.govermentSector),id: Base64.encode(scope.row.id),cooperationStatus:scope.row.cooperationStatus, dflUserId:scope.row.dflUserId,dshtz: 9,}}"
                                    >{{ scope.row.govermentSector }}</router-link>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="industry1" label="重点产业"></el-table-column>
                                <el-table-column prop="followCategoryName" label="跟进类型">
                                    <template slot-scope="{row}">
                                        {{ row.followCategoryName || '-' }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="promotingCooperationName" label="推进阶段">
                                    <template slot-scope="{row}">
                                        {{ row.promotingCooperationName || '-' }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="nextVisitTime" label="待回访时间">
                                    <template slot-scope="{row}">
                                        {{ row.nextVisitTime || '-' }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="inputerName" label="业务员"></el-table-column>
                                <el-table-column width="150" label="操作">
                                    <template slot-scope="scope">
                                        <span class="curPoi modify">
                                            <i class="scope_img_Lc" :title="'审核流程'" @click="RMKsee(scope.row)"></i>
                                        </span>
                                        <span class="curPoi modify" v-if="currentId == 32 && scope.row.operationDepartmentCheckLeaderId == currentId && scope.row.cooperationStatus == 4">
                                            <i class="scope_img_Fp" :title="'任务分发'" @click="RWFF(scope.row)"></i>
                                        </span>
                                        <span v-if="scope.row.cooperationStatus == 5 && scope.row.operationDepartmentCheckerId == currentId" class="curPoi modify">
                                            <i class="scope_img_Dsh" :title="'审核'" @click="Check(scope.row)"></i>
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
                <!-- 审核流程信息查看  -->
                <el-dialog :visible.sync="dialogrmk" width="30%" class="Appdialog">
                    <div class="title_h">
                        <span class="fontSize24" style="letter-spacing:2px">审核流程</span>
                    </div>
                    <div class="dialogClose" @click="RMKdialog_close">×</div>
                    <div class="RMK_steps">
                        <el-steps direction="vertical" :active="RMKlength - 1">
                            <el-step space="20" v-for="(item,index) in RMKdataList" :key="index"
                            direction="horizontal"
                            :title="item.operatorPhase"
                            :description='"操作人："+ item.operatorName + "\n" + "操作内容：" + item.operationalMotion + "\n" + "操作时间：" + item.operationTime'
                            >
                            </el-step>
                        </el-steps>
                    </div>
                </el-dialog>
                <!-- 指定审核人 -->
                <el-dialog :visible.sync="dialogTabIncrease" width="30%" class="Appdialog">
                    <div class="title_h">
                        <!-- <i class="icon icon-tips"></i> -->
                        <span class="fontSize24" style="letter-spacing:2px">指定审核人</span>
                        <!-- <el-button class="GovernmentDetailsdialogBJ" @click="dialogBJ()" type="primary">编辑</el-button> -->
                    </div>
                    <div class="dialogClose" @click="Increasedialog_close">×</div>
                    <div class="examineSele">
                        <el-select class="examineSele_xiala" v-model="Increaseduty" @change="leaderchange" clearable placeholder="请选择">
                            <el-option
                            v-for="item in dutyoptions"
                            :key="item.id"
                            :label="item.realName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    <el-button style="margin-left:10px;" class="GovernmentDetailsdialogBC" @click="examineleader" type="primary">确认</el-button>
                    </div>
                </el-dialog>
                <!-- 审核通过或者不通过  -->
                <el-dialog :visible.sync="dialogCheck" width="30%" class="Appdialog">
                    <div class="title_h">
                        <span class="fontSize24" style="letter-spacing:2px">审核</span>
                    </div>
                    <div class="dialogClose" @click="checkdialog_close">×</div>
                    <div class="examineSele">
                        <el-radio v-model="radio" label="3">通过</el-radio>
                        <el-radio v-model="radio" label="6">不通过</el-radio>
                        <el-input class="textSRK" type="textarea" :rows="2" placeholder="审核（意见）备注" @input="change(e)" v-model="remarks"></el-input>
                        
                        <div class="remarkY">
                            <el-button class="GovernmentDetailsdialogBC" @click="leaderCheck" type="primary">确认</el-button>
                        </div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            options1: [], //城市下拉框
            checked: false,
            followCategory: "",
            promotingCooperation: "",
            dialogrmk:false,
            selected: "", //城市下拉框绑定内容
            unitCode: "", //当前登录用户部门唯一标识
            currentId: "", //当前登录用户ID**是否通过审核人ID**提交指定审核人 当前登录人id
            tableData: [], //列表数据
            total: 0,
            page:1,
            suibian:true,    //分页变量3
            province: "", //省份
            city: "", //地市
            area: "", //区县
            RMKdataList:[], //审核操作信息
            RMKlength:"", //审核操作流程条数
            dialogTabIncrease:false,//指定审核人弹框默认关闭
            Increaseduty: "",//指定审核人下拉框model
            dutyoptions: [],//指定审核人下拉框数据
            ZFID_shr: "",//政府ID 指定审核人
            realName: "",//提交指定审核人  当前登录人姓名
            mobile: "",//提交指定审核人  当前登录人手机号码
            yyFzr: "",//提交指定审核人  下拉框运营负责人code
            dialogCheck:false,//审核是否通过弹框
            Checkzhengfuid: '',//是否通过政府ID
            CheckName: '',//是否通过审核人姓名
            Checkmobile: '',//是否通过审核人电话
            leaderId: '',//审核领导的id
            radio: '',//是否通过单选框默认通过
            remarks: "",//是否通过审核备注
            govermentSector: "",//政府搜素
            
        }
    },
    watch: {
        selected() {
            if (this.$refs.cascader) {
                this.$refs.cascader.dropDownVisible = false
            }
        },
    },
    mounted() {
        this.unitCode = localStorage.getItem("unitCode")
        this.currentId = localStorage.getItem("id")
        this.realName = localStorage.getItem("realName")
        this.mobile = localStorage.getItem("mobile")
        this.CheckName = localStorage.getItem("realName")
        this.Checkmobile = localStorage.getItem("mobile")
        this.City()
        this.GovernmentinfoList()
    },
    methods: {
        // 请求城市下拉框数据
        City() {
            this.axios({
                url: this.api.LXshengshiquapi,
                method: "post",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                console.log(res,"shsgh")
                this.options1 = res.data.data
            })
        },
        //列表
        GovernmentinfoList() {
            var self = this
            // console.log(this.checked,"c")
            let params = {
                currentUserId: self.currentId,
                unitCode: self.unitCode,
                page: self.page,
                limit: 20,
                province: self.province,
                city: self.city,
                area: self.area,
                govermentSector: self.govermentSector,
            }
            this.axios({
                url: this.api.GovernmentGovernmentinfoList,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                var right = document.getElementsByClassName('btn-next')
                right[0].disabled=''
                console.log(res,"22")
                this.tableData = res.data.data
                this.total = res.data.count
                // 分页--下一页disabled
                var cot =  Math.ceil(self.total/20)
                if(cot <= self.page){
                    right[0].disabled="disabled"
                }
                if(self.page==1){
                    self.suibian=true
                }
                // 分页--下一页disabled
            })
        },
        //审核流程关闭
        RMKdialog_close(){
            this.dialogrmk = false
        },
        //审核流程查看弹框
        RMKsee(val){
            var self = this
            // console.log(val,"val")
            this.dialogrmk = true
            let params = {
                id: val.id
            }
            this.axios({
                url: this.api.Governmentofficialsinfoflowprocessapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res)
                self.RMKdataList = res.data.data
                self.RMKlength = res.data.data.length
            })
        },
        //指定审核人弹框关闭
        Increasedialog_close(){
            this.dialogTabIncrease = false
        },
        
        //指定审核人弹框开启
        RWFF(val){
            console.log(val,"val")
            if(val.cooperationStatus == 5){
                this.$message.warning("请勿重复提交")
            }else{
                this.dialogTabIncrease = true
                this.ZFID_shr = val.id
                this.zhidingshenhe()
            }
        },

        //确认指定审核人员 
        examineleader() {
            var self = this
            let params = {
                id:self.ZFID_shr,
                checkLeaderName:self.realName,
                checkLeaderMobile:self.mobile,
                checkLeaderUserId:self.currentId,
                operationDepartmentCheckerId:self.yyFzr,
            }
            this.axios({
                url: this.api.Governmentofficialsinfoassignapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res)
                if(res.data.code == 0){
                    this.$message.success("任务分发成功")
                    this.dialogTabIncrease = false
                    this.GovernmentinfoList()
                }
            })
        },

        //指定审核人下拉框列表请求
        zhidingshenhe(){
            var self = this
            this.axios({
                url: this.api.Governmentofficialsinfooperatorsapi,
                method: "post",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"领导人")
                self.dutyoptions = res.data.data
            })
        },
        //指定审核人下拉框响应事件
        leaderchange(value) {
            let obj = {};
            obj = this.dutyoptions.find((item)=>{
                return item.id === value;
            });
            console.log(obj.realName,"name");
            this.Increaseduty = obj.realName
            // console.log('data',value)
            this.yyFzr = value
        },

        // 审核是否通过
        Check(val) {
            console.log(val,"val")
            var self = this 
            self.dialogCheck = true
            // self.Increaseduty = '' 
            self.Checkzhengfuid = val.id
            // alert("sssss")
        },
        //是否审核通过弹框关闭
        checkdialog_close() {
            this.dialogCheck = false;
        },
        // 审核结果提交
        leaderCheck() {
            var self = this
            if(self.radio == ''){
                this.$message.error("请选择审核结果")
            }else{
                let params = {
                    id:self.Checkzhengfuid,
                    status:self.radio,
                    operationCheckerName: self.CheckName,
                    operationCheckerMobile: self.Checkmobile,
                    operationCheckerUserId: self.currentId,
                }
                this.axios({
                    url: this.api.Governmentofficialsinfooperatorauditapi,
                    method: "post",
                    data: this.$qs.stringify(params),
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(res => {
                    if(res.data.code == 0){
                        this.$message.success("审核成功")
                        this.dialogCheck = false
                        this.GovernmentinfoList()
                        this.radio = ''
                        this.remarks = ''
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            }
        },
        change(e){
            console.log(e,"eee")
        },
        search() {
            this.GovernmentinfoList()
        },

        
        // 城市下拉框点击执行函数
        handleChange1(value) {
            this.province = value[0]
            this.city = value[1]
            this.area = value[2]
            this.GovernmentinfoList()
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
            self.GovernmentinfoList(val, 20);
        },
    }
}
</script>
<style lang="scss">
#Daishenhe{
    .C_container{
        .textSRK{
            margin: 20px 0;
            textarea{
                font-size: 20px;
                min-height: 150px !important;
            }
        }
        .curPoi{
            margin-left: 10px;
            .scope_img_Lc{
                display: inline-block;
                background-image: url("../../assets/images/GovernmentManagement/Lc.svg");
                width: 26px;
                height: 26px;
                vertical-align: sub;
            }
            .scope_img_Lc:hover{
                background-image: url("../../assets/images/GovernmentManagement/Lc_h.svg");
            }
            .scope_img_Fp{
                display: inline-block;
                background-image: url("../../assets/images/GovernmentManagement/Fp.svg");
                width: 26px;
                height: 26px;
                vertical-align: sub;
            }
            .scope_img_Fp:hover{
                background-image: url("../../assets/images/GovernmentManagement/Fp_h.svg");
            }
            .scope_img_Dsh{
                display: inline-block;
                background-image: url("../../assets/images/GovernmentManagement/Dsh.svg");
                width: 26px;
                height: 26px;
                vertical-align: sub;
            }
        }
        .curPoi:hover{
            color: #cf111b;
        }
        .GovernmentManagement_block{
            padding: 20px 30px 0 30px;
            font-size: 20px;
            .el-cascader{
                vertical-align: bottom;
            }
            .increaseStyle{
                margin-left: 10px;
            }
            .left{
                margin-left: 10px;
            }
            .checkbox{
                .el-checkbox__inner:hover{
                    border-color: #cf111b;
                }
                .el-checkbox__label{
                    vertical-align: top;
                }
            }
        }
        .examineSele{
            padding: 20px 50px 50px 50px;
            .examineSele_xiala{
                vertical-align: top;
            }
            // .GovernmentDetailsdialogBC{
            //     margin-left: 10px;
            // }
        }
        .RMK_steps{
            // height: 300px;
            padding: 20px;
            .el-step__head.is-finish{
                color: #000;
                border-color: #000;
            }
            .el-step__main{
                margin-bottom: 15px;
                // 已审核
                .el-step__title.is-finish{
                    color: #000;
                    font-size: 20px;
                }
                .el-step__description.is-finish{
                    color: #000;
                    font-size: 16px;
                }
                .el-step__description{
                    white-space: pre;
                }
                // 审核中
                .el-step__title.is-process{
                    color: #cf111b;
                    font-size: 20px;
                }
                .el-step__description{
                    color: #cf111b;
                    font-size: 16px;
                }
                //待审核
                .el-step__title.is-wait{
                    font-size: 20px;
                }
                .el-step__description.is-wait{
                    font-size: 16px;
                }
            }
        }
    }
}
</style>