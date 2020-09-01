<template>
    <div id="GovernmentManagement">
        <div id="C_content">
            <div class="C_container">
                <div class="C_title">
                    <span class="Title_left"></span>已合作客户共<span style="margin:0 10px;color:#cf111b">{{ totalCount }}</span>家
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
                        <el-select placeholder="跟进类型" collapse-tags @change="genjinIndustry2" clearable v-model="followCategory" style="width:170px;">
                            <el-option
                                v-for="(item,index) in genjinleixingdata"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <!-- <div v-if="chuangjianif == true" class="inline left"> -->
                    <div class="inline left">
                        <el-select placeholder="运营者" collapse-tags @change="chuangjianChange" clearable v-model="chuangjianName" style="width:120px;">
                            <el-option
                                v-for="(item,index) in chuangjianlianxirendata"
                                :key="index.id"
                                :label="item.realName"
                                :value="item.realName"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="inline left">
                        <el-input class="fontSize20 Ml30 Search_Entry_Div Searchinput240" @change="GovChange" v-model="govermentSector" clearable placeholder="请输入政府名称"></el-input>
                    </div>
                    <el-button class="increaseStyle searchStyle" @click="search()" type="primary">查询</el-button>
                    <el-button v-if="yijiaoif" class="increaseStyle searchStyle" @click="transfer()" type="primary">移交</el-button>
                </div>
                <div class="el-tabs padding10">
                    <div class="query-result">
                    <div style="padding-top:10px;"></div>
                        <div class="table-wrapper">
                            <el-table stripe :data="tableData" style="width: 100%" @selection-change="selectionChange">
                            <el-table-column v-if="yijiaoif" type="selection" width="55"></el-table-column>
                            <el-table-column prop="govermentSector" width="250" label="政府名称">
                                <template slot-scope="scope">
                                <router-link
                                    @click.native="partpart"
                                    style="color:#606266;text-decoration:none;"
                                    tag="a" 
                                    :to="{ path:'/GovernmentDetails', query: { name: Base64.encode(scope.row.govermentSector),id: Base64.encode(scope.row.id),cooperationStatus:scope.row.cooperationStatus, dflUserId:scope.row.dflUserId}}"
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
                            <el-table-column prop="operatorName" label="运营者"></el-table-column>
                            <el-table-column prop="inputerName" label="业务员"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <span class="curPoi modify">
                                        <i class="scope_img_Lc" :title="'审核流程'" @click="RMKsee(scope.row)"></i>
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

                <!-- 客户移交 -->
                <el-dialog :visible.sync="dialogYijiao" width="30%" class="Appdialog">
                    <div class="title_h">
                        <span class="fontSize24" style="letter-spacing:2px">客户移交</span>
                    </div>
                    <div class="dialogClose" @click="yijiaodialog_close">×</div>
                    <div class="examineSele">
                        <el-select class="examineSele_xiala" v-model="Increaseduty" @change="leaderchange" clearable placeholder="请选择">
                            <el-option
                            v-for="item in dutyoptions"
                            :key="item.id"
                            :label="item.realName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    <el-button class="GovernmentDetailsdialogBC" @click="examineleader" type="primary">确认</el-button>
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
            totalCount: "",
            options1: [], //城市下拉框
            selected: "", //城市下拉框绑定内容
            unitCode: "", //当前登录用户部门唯一标识
            currentId: "", //当前登录用户ID**是否通过审核人ID
            tableData: [], //列表数据
            total: 0,
            page:1,
            suibian:true,    //分页变量3
            province: "", //省份
            city: "", //地市
            area: "", //区县
            dialogCheck:false,//审核是否通过弹框
            dutyoptions: [],//弹框内领导数据
            CheckName: '',//是否通过审核人姓名
            Checkmobile: '',//是否通过审核人电话
            leaderId: '',//审核领导的id
            dialogrmk:false,//审核流程信息查看弹框
            RMKdataList:[],//审核流程信息查看列表
            RMKlength:"", //审核操作流程条数
            govermentSector: "",
            genjinleixingdata: "",//跟进类型
            followCategory: "",
            // chuangjianif: false,//运营者下拉框是否显示
            chuangjianlianxirendata: [],//运营者筛选
            chuangjianName: "",//运营者model

            //政府移交功能
            Increaseduty: '',//弹框内人员model
            yijiaoif: false,//移交多选以及移交按钮是否显示
            multipleSelection: [],//移交多选的内容
            dialogYijiao: false,//移交客户弹框是否显示
            dutyoptions: [],//移交客户弹框中 指定移交人下拉框内容
            newStaffId: "",//弹框内选中的人员ID

        }
    },
    watch: {
        selected() {
            if (this.$refs.cascader) {
                this.$refs.cascader.dropDownVisible = false
            }
        }
    },
    mounted() {
        this.unitCode = localStorage.getItem("unitCode")
        this.currentId = localStorage.getItem("id")
        this.CheckName = localStorage.getItem("realName")
        this.Checkmobile = localStorage.getItem("mobile")
        this.City() //请求城市下拉框数据
        this.genjinleixing() //请求跟进类型下拉框数据
        this.Govsearchxx()
        this.GovernmentinfoList()   //政府管理列表
        this.chuangjianren() //运营者下拉框数据

        this.yijiaoNY()//移交按钮是否显示
    },
    methods: {
        //移交按钮是否显示
        yijiaoNY(){
            var self = this
            let params ={
                currentUserId:self.currentId,
            }
            this.axios({
                url: this.api.transfercustcmauthorityapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"是否显示")
                if(res.data.data == true && self.unitCode == 5){
                    self.yijiaoif = true
                }
            })
        },
        //表格中选中
        selectionChange(val){
            this.multipleSelection = []
            for(let arr of val){
                this.multipleSelection.push(arr.id)
            }
            console.log(this.multipleSelection,"勾选了")
        },
        //移交弹框关闭
        yijiaodialog_close(){
            var self = this
            self.dialogYijiao = false
        },
        //移交按钮
        transfer(){
            var self = this
            console.log(this.multipleSelection,"le")
            if(this.multipleSelection.length == 0){
                this.$message.warning("请选择需要移交的客户")
            }else{
                self.Increaseduty = ""
                self.dialogYijiao = true
                let params = {
                    unitCode: self.unitCode
                }
                this.axios({
                    url: this.api.transferunituserapi,
                    method: "post",
                    data: this.$qs.stringify(params),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(res => {
                    console.log(res,"下拉框内容")
                    this.dutyoptions = res.data.data
                })
            }
        },
        //选择指定转移人员下拉框响应
        leaderchange(value) {
            let obj = {};
            obj = this.dutyoptions.find((item)=>{
                return item.id === value;
            });
            // console.log('data',value)
            this.newStaffId = value
        },
        //确认指定转移按钮
        examineleader(){
            var self = this
            let params = {
                appointorId:self.currentId,
                ids:self.multipleSelection.toString(),
                newStaffId:self.newStaffId,
                unitCode: self.unitCode,
            }
            this.axios({
                url: this.api.transfercustomermigrationapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                console.log(res,"确认结果")
                if(res.data.code == 0){
                    self.selected = ""
                    self.followCategory = ""
                    self.chuangjianName = ""
                    self.govermentSector = ""
                    self.dialogYijiao = false
                    this.GovernmentinfoList()
                }else{
                    this.$message.error(res.data.msg)
                }

            })
        },
        partpart() {
            if(this.selected != ''){
                localStorage.setItem('Govselected',this.selected)
            }else{
                localStorage.removeItem('Govselected')
            }
            if(this.followCategory != ''){
                localStorage.setItem('GovfollowCategory',this.followCategory)
            }else{
                localStorage.removeItem('GovfollowCategory')
            }
            if(this.chuangjianName != ''){
                localStorage.setItem('GovchuangjianName',this.chuangjianName)
            }else{
                localStorage.removeItem('GovchuangjianName')
            }
            if(this.govermentSector != ''){
                localStorage.setItem('GovgovermentSector',this.govermentSector)
            }else{
                localStorage.removeItem('GovgovermentSector')
            }
        },
        Govsearchxx() {
            var self = this
            self.Gov_ssq = localStorage.getItem('Govselected')
            if(localStorage.getItem('Govselected') != null){
                this.selected = self.Gov_ssq.split(",")
                localStorage.removeItem('Govselected')
            }
            if(localStorage.getItem('GovfollowCategory') != null){
                self.followCategory = localStorage.getItem('GovfollowCategory')
                localStorage.removeItem('GovfollowCategory')
            }
            if(localStorage.getItem('GovchuangjianName') != null){
                self.chuangjianName = localStorage.getItem('GovchuangjianName')
                localStorage.removeItem('GovchuangjianName')
            }
            if(localStorage.getItem('GovgovermentSector') != null){
                self.govermentSector = localStorage.getItem('GovgovermentSector')
                localStorage.removeItem('GovgovermentSector')
            }
            // console.log(self.park_ssq,"拿到localstorage内的值")
            // console.log(self.park_ssq.indexOf(","))
        },

        GovChange(val){
            console.log(val,"输入框内容")
            if(val == ""){
                this.GovernmentinfoList()
            }
        },


        //运营者筛选
        chuangjianren() {
            // console.log("请求了")
            var self = this;
            this.axios({
                url: this.api.Governmentofficialsinfooperatorsapi,
                method: "post",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res.data.data.flag,"sahuchack")
                self.chuangjianlianxirendata = res.data.data
                // if(res.data.data.flag == true){
                //     console.log("请求成功")
                //     self.chuangjianif = true
                //     self.chuangjianlianxirendata = res.data.data.list
                // }
            })
        },
        // 请求城市下拉框数据
        City() {
            this.axios({
                url: this.api.GovernmentoAreaselectapi,
                method: "post",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                this.options1 = res.data.data
            })
        },
        //政府管理列表
        GovernmentinfoList() {
            var self = this
            let params = {
                currentUserId: self.currentId,
                unitCode: self.unitCode,
                page: self.page,
                limit: 20,
                province: self.province,
                city: self.city,
                area: self.area,
                cooperationStatus: "3",
                govermentSector: self.govermentSector,
                followCategory: self.followCategory,
                operatorName: self.chuangjianName,
            }
            this.axios({
                url: this.api.GovernmentGovernmentinfoList,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                console.log(res)
                this.totalCount = res.data.count
                var right = document.getElementsByClassName('btn-next')
                right[0].disabled=''
                // console.log(res,"22")
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
        //跟进类型
        genjinleixing() {
            var self = this;
            let params = {
                type: 'followcategory_type',
            };
            this.axios({
                url: this.api.Governmentofficialsinfodictsvalueapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"跟进类型")
                self.genjinleixingdata = res.data.data
            })
        },
        //跟进类型响应
        genjinIndustry2() {
            this.GovernmentinfoList()
        },
        search(){
            this.GovernmentinfoList()
        },
    }
}
</script>
<style lang="scss">
#GovernmentManagement{
    .C_container{
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
        }
        .examineSele{
            padding: 20px 50px 50px 50px;
            .examineSele_xiala{
                vertical-align: top;
            }
            .GovernmentDetailsdialogBC{
                margin-left: 10px;
            }
        }
    }
}
</style>