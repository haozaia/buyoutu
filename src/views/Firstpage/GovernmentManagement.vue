<template>
    <div id="GovernmentManagement">
        <div id="C_content">
            <div class="C_container">
                <div class="C_title">
                    <span class="Title_left"></span>未合作客户共<span style="margin:0 10px;color:#cf111b">{{ totalCount }}</span>家
                    <el-button class="increaseStyle" style="position: absolute;right: 30px;top: 12px;" @click="increase()" type="primary">新建</el-button>
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
                    <div class="inline left">
                        <el-select placeholder="推进阶段" collapse-tags @change="tuijinIndustry3" clearable v-model="promotingCooperation" style="width:170px;">
                            <el-option
                                v-for="(item,index) in tuijinjieduandata"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div v-if="chuangjianif == true" class="inline left">
                        <el-select placeholder="业务员" collapse-tags @change="chuangjianChange" clearable v-model="chuangjianName" style="width:120px;">
                            <el-option
                                v-for="(item,index) in chuangjianlianxirendata"
                                :key="index"
                                :label="item.realName"
                                :value="item.realName"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="inline left">
                        <el-input class="fontSize20 Ml30 Search_Entry_Div Searchinput240" style="width:200px;" v-model="govermentSector" clearable placeholder="请输入政府名称"></el-input>
                    </div>
                    <el-checkbox class="left checkbox" v-model="checked">由我审核</el-checkbox>
                    <el-button class="increaseStyle searchStyle" @click="search()" type="primary">查询</el-button>
                    <el-button v-if="yijiaoif" class="increaseStyle searchStyle" @click="transfer()" type="primary">移交</el-button>
                </div>
                <div class="el-tabs padding10">
                    <div class="query-result">
                    <div style="padding-top:10px;"></div>
                        <div class="table-wrapper">
                            <el-table stripe :data="tableData" style="width: 100%" @selection-change="selectionChange">
                            <el-table-column v-if="yijiaoif" type="selection" width="55"></el-table-column>
                            <el-table-column prop="govermentSector" label="政府名称">
                                <template slot-scope="scope">
                                <router-link
                                    style="color:#606266;text-decoration:none;"
                                    tag="a" 
                                    :to="{ path:'/GovernmentManagementDetails', query: { name: Base64.encode(scope.row.govermentSector),id: Base64.encode(scope.row.id),cooperationStatus:scope.row.cooperationStatus, dflUserId:scope.row.dflUserId,Wh_z: 9,}}"
                                >{{ scope.row.govermentSector }}</router-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="industry1" label="重点产业"></el-table-column>
                            <el-table-column prop="followCategoryName" width="200" label="跟进类型">
                                <template slot-scope="{row}">
                                    {{ row.followCategoryName || '-' }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="promotingCooperationName" width="200" label="推进阶段">
                                <template slot-scope="{row}">
                                    {{ row.promotingCooperationName || '-' }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="nextVisitTime" width="150" label="待回访时间">
                                <template slot-scope="{row}">
                                    {{ row.nextVisitTime || '-' }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="inputerName" label="业务员" width="150"></el-table-column>
                            <el-table-column width="150" label="操作">
                                <template slot-scope="scope">
                                    <span class="curPoi modify" v-if="scope.row.cooperationStatus != 0">
                                        <i class="scope_img_Lc" :title="'审核流程'" @click="RMKsee(scope.row)"></i>
                                    </span>
                                    <span v-if="scope.row.dflUserId == currentId" class="curPoi modify" @click="GoveDelete(scope.row)">
                                        <i class="scope_img"></i>
                                        <!-- <i class="el-icon-delete" :title="'删除'"></i> -->
                                    </span>
                                    <span style="display:inline-block;" v-if="scope.row.dflUserId == currentId">
                                        <span v-if="scope.row.cooperationStatus == 0 ||scope.row.cooperationStatus == 2||scope.row.cooperationStatus == 6 " class="curPoi modify">
                                            <i class="scope_img_Tjsh" :title="'提交审核'" @click="examine(scope.row)"></i>
                                        </span>
                                        <span v-if="scope.row.cooperationStatus == 1" class="curPoi modify">
                                            <i class="scope_img_shz" :title="'正在审核中'" @click="shenghezhong(scope.row)"></i>
                                        </span>
                                    </span>
                                    <span v-if="scope.row.cooperationStatus == 1 && scope.row.departmentCheckerId == currentId" class="curPoi modify">
                                        <i class="scope_img_Dsh" :title="'审核'" @click="Check(scope.row)"></i>
                                        <!-- <i class="el-icon-magic-stick" :title="'审核'" @click="Check(scope.row)"></i> -->
                                    </span>
                                    
                                    <!-- <span v-if="scope.row.cooperationStatus == 2" class="curPoi modify">
                                        <i class="scope_img_Wtgsh" :title="'审核未通过'" @click="shenghezhong(scope.row)"></i>
                                    </span> -->
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
                <!-- 选择审核领导弹框 -->
                <el-dialog :visible.sync="dialogTabIncrease" width="30%" class="Appdialog">
                    <div class="title_h">
                        <!-- <i class="icon icon-tips"></i> -->
                        <span class="fontSize24" style="letter-spacing:2px">选择审核领导</span>
                        <!-- <el-button class="GovernmentDetailsdialogBJ" @click="dialogBJ()" type="primary">编辑</el-button> -->
                    </div>
                    <div class="dialogClose" @click="Increasedialog_close">×</div>
                    <div class="examineSele">
                        <el-select class="examineSele_xiala" v-model="Increaseduty" @change="leaderchange" clearable placeholder="请选择">
                            <el-option
                            v-for="item in dutyoptions"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    <el-button class="GovernmentDetailsdialogBC" @click="examineleader" type="primary">确认</el-button>
                    </div>
                </el-dialog>
                <!-- 审核通过或者不通过  -->
                <el-dialog :visible.sync="dialogCheck" width="30%" class="Appdialog">
                    <div class="title_h">
                        <span class="fontSize24" style="letter-spacing:2px">审核</span>
                    </div>
                    <div class="dialogClose" @click="checkdialog_close">×</div>
                    <div class="examineSele">
                        <el-radio v-model="radio" label="4">通过</el-radio>
                        <el-radio v-model="radio" label="2">不通过</el-radio>
                        <el-input class="textSRK" type="textarea" :rows="2" placeholder="审核（意见）备注" v-model="remarks"></el-input>
                        
                        <div class="remarkY">
                            <el-button class="GovernmentDetailsdialogBC" @click="leaderCheck" type="primary">确认</el-button>
                        </div>
                    </div>
                </el-dialog>
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
                        <el-select class="examineSele_xiala" v-model="yijiaoIncreaseduty" @change="yijiaochange" clearable placeholder="请选择">
                            <el-option
                            v-for="item in dutyoptions"
                            :key="item.id"
                            :label="item.realName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    <el-button class="GovernmentDetailsdialogBC" @click="yijiaoSub" type="primary">确认</el-button>
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
            tuijinjieduandata: [], //推进阶段下拉框
            genjinleixingdata: [], //跟进类型下拉框
            checked: false,
            followCategory: "",
            remarks: "",//审核意见
            promotingCooperation: "",
            selected: "", //城市下拉框绑定内容
            unitCode: "", //当前登录用户部门唯一标识
            currentId: "", //当前登录用户ID**是否通过审核人ID
            tableData: [{name: '北京经济技术开发区'}], //列表数据
            total: 0,
            page:1,
            suibian:true,    //分页变量3
            province: "", //省份
            city: "", //地市
            area: "", //区县
            dialogTabIncrease:false,//选择审核领导弹框
            dialogCheck:false,//审核是否通过弹框
            dialogrmk:false,//审核流程信息查看弹框
            dutyoptions: [],//弹框内领导数据
            Increaseduty: '',//弹框内领导model
            zhengfuid: '',//点击审核获取当前政府的id
            Checkzhengfuid: '',//是否通过政府ID
            CheckName: '',//是否通过审核人姓名
            Checkmobile: '',//是否通过审核人电话
            leaderId: '',//审核领导的id
            radio: '',//是否通过单选框默认通过
            checkByMe: "", //由我审核
            RMKdataList:[], //审核操作信息
            RMKlength:"", //审核操作流程条数
            govermentSector: "",//政府名称搜索
            chuangjianlianxirendata: [],//创建人筛选
            chuangjianName: "",//创建人model
            chuangjianif: false,//创建人下拉框是否显示

            //政府移交功能
            yijiaoIncreaseduty: '',//弹框内人员model
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
        },
        checked(){
            // console.log(this.checked)
            if(this.checked === true){
                this.checkByMe = 1
                this.GovernmentinfoList()
            }else{
                this.checkByMe = ""
                this.GovernmentinfoList()
            }
        }
    },
    mounted() {
        this.unitCode = localStorage.getItem("unitCode")
        this.currentId = localStorage.getItem("id")
        this.CheckName = localStorage.getItem("realName")
        this.Checkmobile = localStorage.getItem("mobile")
        // console.log(this.currentId,"currentId")
        this.City() //请求城市下拉框数据
        this.genjinleixing() //跟进类型下拉框数据
        this.tuijinjieduan() //推进阶段下拉框数据
        this.chuangjianren() //创建人下拉框数据
        this.GovernmentinfoList()   //政府管理列表
        this.yijiaoNY()//移交按钮是否显示
        // console.log(this.unitCode,"uncode")
        // GovernmentGovernmentinfoList
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
                if(res.data.data == true && self.unitCode == 2){
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
                self.yijiaoIncreaseduty = ""
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
        yijiaochange(value) {
            let obj = {};
            obj = this.dutyoptions.find((item)=>{
                return item.id === value;
            });
            console.log('data',value)
            this.newStaffId = value
        },
        //确认指定转移按钮
        yijiaoSub(){
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
                    self.promotingCooperation = ""
                    self.chuangjianName = ""
                    self.govermentSector = ""
                    self.dialogYijiao = false
                    this.GovernmentinfoList()
                }else{
                    this.$message.error(res.data.msg)
                }

            })
        },




        // 请求城市下拉框数据
        City() {
            this.axios({
                url: this.api.LXshengshiquapi,
                method: "post",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                this.options1 = res.data.data
            })
        },
        //跟进类型响应
        genjinIndustry2() {
            this.GovernmentinfoList()
        },
        //推进类型响应
        tuijinIndustry3() {
            this.GovernmentinfoList()
        },
        //政府管理列表
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
                checkByMe: self.checkByMe,
                followCategory: self.followCategory,
                promotingCooperation: self.promotingCooperation,
                govermentSector: self.govermentSector,
                inputerName: self.chuangjianName,
            }
            this.axios({
                url: this.api.GovernmentGovernmentinfoList,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                this.totalCount = res.data.count
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
        //新建
        increase() {
            this.$router.push("/GovernmentIncrease")
        },
        search(){
            this.GovernmentinfoList()
        },
        //删除政府信息
        GoveDelete(val) {
            var self = this
            // console.log(val,"删除信息")
            let params = {
                ids: val.id
            }
            this.axios({
                url: this.api.Governmentupdeleteapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if(res.data.code == 0){
                    this.$message.success("删除成功")
                    this.GovernmentinfoList()
                }else{
                    this.$message("删除失败")
                }
            })
        },
        //审核领导弹框
        examine(val) {
            // console.log(val,"val")
            // console.log(this.currentId)
            var self = this 
            self.dialogTabIncrease = true
            // self.Increaseduty = ''
            self.zhengfuid = val.id
            self.leadername()
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
        //审核领导弹框关闭
        Increasedialog_close() {
            this.dialogTabIncrease = false;
        },
        //是否审核通过弹框关闭
        checkdialog_close() {
            this.dialogCheck = false;
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
        //审核领导信息请求 
        leadername() {
            var self = this
            let params = {
                type:'merchants_check_leader_type',
            }
            this.axios({
                url: this.api.Governmentofficialsinfodictsvalueapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"领导人")
                self.dutyoptions = res.data.data
            })
        },
        //审核领导信息提交
        examineleader() {
            var self = this
            if(self.leaderId == ''){
                this.$message.error("请选择领导进行审核")
            }else{
                let params = {
                id:self.zhengfuid,
                leaderId:self.leaderId
                }
                this.axios({
                    url: this.api.Governmentofficialsinfosubmitauditapi,
                    method: "post",
                    data: this.$qs.stringify(params),
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(res => {
                    // console.log(res)
                    if(res.data.code == 0){
                        this.$message.success("审核已提交")
                        this.dialogTabIncrease = false;
                        this.GovernmentinfoList()
                    }else{
                        this.$message.error("请勿重复提交审核")
                    }
                })
            }
            
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
                    checkerName:self.CheckName,
                    checkerMobile:self.Checkmobile,
                    checkerUserId:self.currentId,
                    remark:self.remarks,
                }
                this.axios({
                    url: this.api.Governmentofficialsinfoauditapi,
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
                    }else{
                        this.$message.error("请勿重复提交审核")
                    }
                })
            }
        },
        //领导人信息下拉框
        leaderchange(value) {
            var self = this
            self.leaderId = value
        },
        shenghezhong(val) {
            // console.log(val)
            if(val.cooperationStatus == 1){
                this.$message.warning("请等待领导审核")
            }
            // else if(val.cooperationStatus == 2){
            //     this.$message.warning("审核未通过，可前往修改")
            // }
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
        //创建人筛选
        chuangjianren() {
            var self = this;
            let params = {
                mobile: self.Checkmobile,
            };
            this.axios({
                url: this.api.GovernmentofficialsinfouserList,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res.data.data.flag,"sahuchack")
                if(res.data.data.flag == true){
                    self.chuangjianif = true
                    self.chuangjianlianxirendata = res.data.data.list
                }
            })
        },
        //推进阶段
        tuijinjieduan() {
            var self = this;
            let params = {
                type: 'promoting_cooperation_type',
            };
            this.axios({
                url: this.api.Governmentofficialsinfodictsvalueapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"推进阶段")
                self.tuijinjieduandata = res.data.data
            })
        },
    }
}
</script>
<style lang="scss">
#GovernmentManagement{
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
            .scope_img{
                display: inline-block;
                background-image: url("../../assets/images/GovernmentManagement/Sc.svg");
                width: 26px;
                height: 26px;
                vertical-align: sub;
            }
            .scope_img:hover{
                background-image: url("../../assets/images/GovernmentManagement/Sc_h.svg");
            }
            .scope_img_shz{
                display: inline-block;
                background-image: url("../../assets/images/GovernmentManagement/Shz.svg");
                width: 26px;
                height: 26px;
                vertical-align: sub;
            }
            .scope_img_Dsh{
                display: inline-block;
                background-image: url("../../assets/images/GovernmentManagement/Dsh.svg");
                width: 26px;
                height: 26px;
                vertical-align: sub;
            }
            .scope_img_Wtgsh{
                display: inline-block;
                background-image: url("../../assets/images/GovernmentManagement/Wtgsh.svg");
                width: 26px;
                height: 26px;
                vertical-align: sub;
            }
            .scope_img_Tjsh{
                display: inline-block;
                background-image: url("../../assets/images/GovernmentManagement/Tjsh.svg");
                width: 26px;
                height: 26px;
                vertical-align: sub;
            }
            .scope_img_Tjsh:hover{
                background-image: url("../../assets/images/GovernmentManagement/Tjsh_h.svg");
            }
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
            .remarkY{
                text-align: right;
            }
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