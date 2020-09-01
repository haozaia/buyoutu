<template>
    <div id="GovernmentIncrease">
        <div id="C_content">
            <div class="C_container">
                <div class="C_title">
                    <span class="Title_left"></span>未合作客户 - 新增
                    <el-button class="GovernmentIncreaseRtPark" @click="rtPark" type="primary">返回</el-button>
                    <el-button class="GovernmentIncreasePreservation" @click="presub('essentialForm')" type="primary">保存</el-button>
                </div>
                <div class="GovernmentFORM">
                    <div class="EssentialForm">
                        <p class="Esinformation">1、基本信息</p>
                        <el-form :model="ruleForm" :rules="rules" ref="essentialForm" label-width="132px" class="demo-ruleForm">
                            <el-row>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 10px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px;" label="选择区域:">
                                        <el-cascader
                                        placeholder=""
                                        :options="options1"
                                        :props="{ checkStrictly: true }"
                                        @change="handleChange1"
                                        v-model="selected"
                                        ></el-cascader>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="全称:" prop="govermentSector">
                                        <el-input v-model="ruleForm.govermentSector"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 10px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" prop="zhongdianchanye" label="重点产业:"> 
                                        <el-select :title="industry1" placeholder="" filterable multiple :multiple-limit="3" collapse-tags v-model="industry1" style="width:100%;">
                                            <el-option
                                                v-for="(item,index) in cities"
                                                :key="index.value"
                                                :label="item.name"
                                                :value="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="编号:">
                                        <el-input placeholder="保存后自动生成" readonly="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                
                                <el-col :span="8">
                                    <el-form-item label="跟进类型:">
                                        <!-- <el-input v-model="ruleForm.name"></el-input> -->
                                        <el-select placeholder="" filterable collapse-tags @change="genjinchange" v-model="industry2" style="width:100%;">
                                            <el-option
                                                v-for="(item,index) in genjinleixingdata"
                                                :key="index"
                                                :label="item.name"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="推进阶段:">
                                        <!-- <el-input v-model="ruleForm.name"></el-input> -->
                                        <el-select placeholder="" filterable collapse-tags @change="tuijinchange" v-model="industry3" style="width:100%;">
                                            <el-option
                                                v-for="(item,index) in tuijinjieduandata"
                                                :key="index"
                                                :label="item.name"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="待回访时间:">
                                        <div class="block">
                                            <el-date-picker
                                            v-model="ruleForm.nextVisitTime"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期">
                                            </el-date-picker>
                                        </div>
                                    </el-form-item>
                                </el-col>
                                <el-col style="width:100%;" :span="8">
                                    <el-form-item label="三句亮点:">
                                        <el-input style="font-size:20px;" type="textarea" :autosize="autosize" v-model="ruleForm.lightspot"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        const validateCtext = (rule, value, callback) => {
            var self = this;
            if (value == "") {
                callback();
            } else {
                if (
                    !/^\d+(\.\d{0,2})?$/.test(value)
                ) {
                callback(new Error("请输入数字且最多保留两位小数"));
                } else {
                callback();
                }
            }
        };
        return{
            UpData: {
                id:"",
                type: "1",
            },
            autosize: {minRows:3,maxRows:3},
            downloadList: [],//附件列表
            aIdsList: [],//aIds
            activeName: "first",//新建页面当前展示哪一模块(默认政府信息)
            options1: [], //城市下拉框
            selected: "", //城市下拉框绑定内容
            unitCode: "", //部门唯一标识
            inputerName: "", //当前登录用户姓名
            inputerMobile: "", //当前登录用户手机号
            dflUserId: "", //当前登录用户id
            province: "", //省份
            city: "", //地市
            area: "", //区县
            industry1:[], //重点产业
            industry2:"", //跟进类型code
            industry3:"", //推进阶段code
            followCategoryName: "",//跟进类型name
            promotingCooperationName: "",//推进阶段name
            genjinleixingdata: [],//跟进类型数据
            tuijinjieduandata: [],//推进阶段数据
            secondChoiceIndustry:'',//次选行业model
            otherIndustry: '',//其它产业model
            hangye_data: [],//次选行业数据
            ruleForm: {
                govermentSector: '',
                lightspot: '',
                railway: '',
                highway: '',
                waterway: '',
                airParcel: '',
                freight: '',
                waterPrice: '',
                naturalGas: '',
                laborCost: '',
                electrovalence: '',
                steamPrice: '',
                freightCost: '',
                waterwayCost: '',
                developmentTime: '',
                nextVisitTime: '',
                //详细情况
                totalArea: '',
                localRevenue: '',
                cityRevenue: '',
                localGdp: '',
                cityGdp: '',
                localPopulation: '',
                cityPopulation: '',
                provincialCapital: '',
                bsgDistance: '',
                // 配套设施
                electricSupply: '',
                communicationSupply: '',
                waterSupply: '',
                manpowerSupply: '',
                naturalGasSupply: '',
                factorySituation: '',
                steamSupply: '',
                electroplateFactory: '',
                gasolineSupply: '',
                otherSupply: '',
                // 配套服务
                hotelCondition: '',
                houseComponents: '',
                hopscaCondition: '',
                drainage: '',
                effluentTreatment: '',
                // 资源优势
                cropCondition: '',
                grazieryCondition: '',
                poultryCondition: '',
                fruitsCondition: '',
                cashCropSpecies: '',
                oreResourcesCondition: '',
                otherCondition: '',
                //当地企业清单
                fortuneGlobalCompany: '',
                chinaCompany: '',
                localCentralEnterprises: '',
                localStateOwnedEnterprises: '',
                localForeignCompany: '',
                jointVentureEnterprises: '',
                mainBoardListed: '',
                threeBoardListed: '',
                localLeadingEnterprises: '',
                cooperationStatus: '',
                //需求产业
                keyIndustryCompany: '',
                otherIndustryCompany: '',
                secondIndustryCompany: '',
                //扶持政策
                landPolicy: '',
                taxPolicy: '',
                talentPolicy: '',
                financialPolicy: '',
                otherPolicy: '',
                
                
            },
            cities: [],
            rules: {
                govermentSector: [
                    { required: true, message: '请输入政府全称', trigger: 'change' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'change' }
                ],
                totalArea: [{ validator: validateCtext, trigger: "change" }],
                localRevenue: [{ validator: validateCtext, trigger: "change" }],
                cityRevenue: [{ validator: validateCtext, trigger: "change" }],
                localGdp: [{ validator: validateCtext, trigger: "change" }],
                cityGdp: [{ validator: validateCtext, trigger: "change" }],
                localPopulation: [{ validator: validateCtext, trigger: "change" }],
                cityPopulation: [{ validator: validateCtext, trigger: "change" }],
                waterPrice: [{ validator: validateCtext, trigger: "change" }],
                naturalGas: [{ validator: validateCtext, trigger: "change" }],
                laborCost: [{ validator: validateCtext, trigger: "change" }],
                electrovalence: [{ validator: validateCtext, trigger: "change" }],
                steamPrice: [{ validator: validateCtext, trigger: "change" }],
                freightCost: [{ validator: validateCtext, trigger: "change" }],
                waterwayCost: [{ validator: validateCtext, trigger: "change" }],

                electricSupply: [{ validator: validateCtext, trigger: "change" }],
                communicationSupply: [{ validator: validateCtext, trigger: "change" }],
                waterSupply: [{ validator: validateCtext, trigger: "change" }],
                manpowerSupply: [{ validator: validateCtext, trigger: "change" }],
                naturalGasSupply: [{ validator: validateCtext, trigger: "change" }],
                factorySituation: [{ validator: validateCtext, trigger: "change" }],
                steamSupply: [{ validator: validateCtext, trigger: "change" }],
                electroplateFactory: [{ validator: validateCtext, trigger: "change" }],
                gasolineSupply: [{ validator: validateCtext, trigger: "change" }],
                otherSupply: [{ validator: validateCtext, trigger: "change" }],
            },
            
        }
    },
    mounted() {
        this.City() //请求城市下拉框数据
        this.Keyindustries()//重点产业下拉框
        this.genjinleixing()//跟进类型
        this.tuijinjieduan()//跟进类型
        this.unitCode = localStorage.getItem("unitCode")
        this.inputerName = localStorage.getItem("realName")
        this.inputerMobile = localStorage.getItem("mobile")
        this.dflUserId = localStorage.getItem("id")

        
    },
    methods: {
        










        //跟进类型change
        genjinchange(value){
            // console.log(value,"value");
            let obj = {};
            obj = this.genjinleixingdata.find((item)=>{
                return item.value === value;
            });
            // console.log(obj.name,"name");
            this.followCategoryName = obj.name
            // console.log('data',value)
            this.industry2 = value
        },
        //推进阶段change
        tuijinchange(value){
            // console.log(value,"value");
            let obj = {};
            obj = this.tuijinjieduandata.find((item)=>{
                return item.value === value;
            });
            console.log(obj.name,"name");
            this.promotingCooperationName = obj.name
            // console.log('data',value)
            this.industry3 = value
        },
        //上传前
        uploadbefore(file) {
            var self = this
            const isLt2M = file.size / 1024 / 1024 < 50;
            if(!isLt2M){
                this.$message.error('上传文件大小不能超过 50MB!');
            }
            return isLt2M;
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
        //返回按钮
        rtPark() {
            this.$router.push("/GovernmentManagement")
        },
        //保存按钮
        presub(essentialForm){
            var self = this;
            self.$refs[essentialForm].validate(valid => {
                if(valid){
                    this.preservation()
                }
                else {
                    this.$message.error("格式错误")
                    return false;
                }
            });
        },
        preservation() {
            var self = this
            // console.log(this.downloadList,"列表")
            for(var i=0;i<self.downloadList.length;i++){

                self.aIdsList.push(self.downloadList[i].id)
            }
            let params = {
                unitCode:self.unitCode,
                inputerName: self.inputerName,
                inputerMobile: self.inputerMobile,
                dflUserId: self.dflUserId,
                industry1: self.industry1.toString(),
                followCategory: self.industry2,
                promotingCooperation: self.industry3,
                followCategoryName: self.followCategoryName,
                promotingCooperationName: self.promotingCooperationName,
                province: self.province,
                city: self.city,
                area: self.area,
                aIds:self.aIdsList.toString(),
                govermentSector: self.ruleForm.govermentSector,
                lightspot: self.ruleForm.lightspot,
                railway: self.ruleForm.railway,
                highway: self.ruleForm.highway,
                waterway: self.ruleForm.waterway,
                airParcel: self.ruleForm.airParcel,
                freight: self.ruleForm.freight,
                waterPrice: self.ruleForm.waterPrice,
                electrovalence: self.ruleForm.electrovalence,
                naturalGas: self.ruleForm.naturalGas,
                steamPrice: self.ruleForm.steamPrice,
                laborCost: self.ruleForm.laborCost,
                freightCost: self.ruleForm.freightCost,
                waterwayCost: self.ruleForm.waterwayCost,
                developmentTime: self.ruleForm.developmentTime,
                nextVisitTime: self.ruleForm.nextVisitTime,
                //详细情况
                totalArea: self.ruleForm.totalArea,
                localRevenue: self.ruleForm.localRevenue,
                cityRevenue: self.ruleForm.cityRevenue,
                localGdp: self.ruleForm.localGdp,
                cityGdp: self.ruleForm.cityGdp,
                localPopulation: self.ruleForm.localPopulation,
                cityPopulation: self.ruleForm.cityPopulation,
                provincialCapital: self.ruleForm.provincialCapital,
                bsgDistance: self.ruleForm.bsgDistance,
                // 配套设施
                electricSupply: self.ruleForm.electricSupply,
                communicationSupply: self.ruleForm.communicationSupply,
                waterSupply: self.ruleForm.waterSupply,
                manpowerSupply: self.ruleForm.manpowerSupply,
                naturalGasSupply: self.ruleForm.naturalGasSupply,
                factorySituation: self.ruleForm.factorySituation,
                steamSupply: self.ruleForm.steamSupply,
                electroplateFactory: self.ruleForm.electroplateFactory,
                gasolineSupply: self.ruleForm.gasolineSupply,
                otherSupply: self.ruleForm.otherSupply,
                // 配套服务
                hotelCondition: self.ruleForm.hotelCondition,
                houseComponents: self.ruleForm.houseComponents,
                hopscaCondition: self.ruleForm.hopscaCondition,
                drainage: self.ruleForm.drainage,
                effluentTreatment: self.ruleForm.effluentTreatment,
                //资源优势
                cropCondition: self.ruleForm.cropCondition,
                grazieryCondition: self.ruleForm.grazieryCondition,
                poultryCondition: self.ruleForm.poultryCondition,
                fruitsCondition: self.ruleForm.fruitsCondition,
                cashCropSpecies: self.ruleForm.cashCropSpecies,
                oreResourcesCondition: self.ruleForm.oreResourcesCondition,
                otherCondition: self.ruleForm.otherCondition,
                //当地企业清单
                fortuneGlobalCompany: self.ruleForm.fortuneGlobalCompany,
                chinaCompany: self.ruleForm.chinaCompany,
                localCentralEnterprises: self.ruleForm.localCentralEnterprises,
                localStateOwnedEnterprises: self.ruleForm.localStateOwnedEnterprises,
                localForeignCompany: self.ruleForm.localForeignCompany,
                jointVentureEnterprises: self.ruleForm.jointVentureEnterprises,
                mainBoardListed: self.ruleForm.mainBoardListed,
                threeBoardListed: self.ruleForm.threeBoardListed,
                localLeadingEnterprises: self.ruleForm.localLeadingEnterprises,
                cooperationStatus: self.ruleForm.cooperationStatus,
                //需求产业
                keyIndustryCompany: self.ruleForm.keyIndustryCompany,//重点产业现配套企业
                secondChoiceIndustry: self.secondChoiceIndustry.toString(),//次选产业行业下拉
                secondIndustryCompany: self.ruleForm.secondIndustryCompany,//次选产业现配套企业
                otherIndustryCompany: self.ruleForm.otherIndustryCompany,//其他产业现配套企业
                otherIndustry: self.otherIndustry.toString(),//其他产业下拉
                // 扶持政策
                landPolicy: self.ruleForm.landPolicy,//土地政策
                taxPolicy: self.ruleForm.taxPolicy,//税收政策
                talentPolicy: self.ruleForm.talentPolicy,//人才政策
                financialPolicy: self.ruleForm.financialPolicy,//金融政策
                otherPolicy: self.ruleForm.otherPolicy,//其它政策


            }
            this.axios({
                url: this.api.GovernmentGovernmentinfo,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res)
                if(res.data.code == 500){
                    this.$message.warning(res.data.msg)
                }else if(res.data.code == 0){
                    this.$message.success("保存成功")
                    this.$router.push("/GovernmentManagement")
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
        //重点产业下拉框
        Keyindustries() {
            let params = {
                type: "key_industry_type"
            }
            this.axios({
                url: this.api.Governmentofficialsinfodictsvalueapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                this.cities = res.data.data
            })
        },
        // 城市下拉框点击执行函数
        handleChange1(value) {
            var self = this
            this.province = value[0]
            this.city = value[1]
            this.area = value[2]
            if(this.city == undefined && this.area == undefined){
                self.ruleForm.govermentSector = this.province + "政府"
            }else if(this.area == undefined ){
                self.ruleForm.govermentSector = this.province + this.city + "政府"
            }else{
                self.ruleForm.govermentSector = this.province + this.city + this.area + "政府"
            }
        },
        // 切换
        handleClick(tab) {
            var self = this;
            if(tab.index == 1){
                self.industryList()
            }
        },
        //需求产业---次选产业数据
        industryList() {
            var self = this;
            let params = {
                isOld: false
            };
            this.axios({
                url: this.api.Industrysapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                self.hangye_data = res.data.data;
            });
        },
    }
}
</script>
<style lang="scss" scope>
#GovernmentIncrease{
    .C_container{
        .downTip {
            margin-left: 20px;
            font-size: 18px;
        }
        .textSRK{
            textarea{
                font-size: 20px;
                min-height: 150px !important;
            }
        }
        .el-form-item__label{
            text-align: left;
        }
        .el-col-8{
            width: 30%;
            margin-right: 50px;
        }
        .el-tabs{
            .el-tabs__nav-wrap{
                border-bottom: 1px solid #efefef;
            }
            .el-tabs__content{
                padding: 10px 30px;
                border: none;
                
            }
        }
        .GovernmentFORM{
            padding: 20px 30px;
            .xinzenglianxirBtn{
                margin: 0;
                float: right;
                width: 130px !important;
            }
            .Esinformation{
                display: inline-block;
                font-size: 22px;
                font-weight: 600;
                line-height: 30px;
                margin-bottom: 20px;
                color:#cf111b;
            }
            // 基本信息
            .EssentialForm{
                margin-bottom: 20px;
                //表单输入框样式
                .el-form-item{
                    .el-form-item__content{
                        .el-input{
                            // width: 20%;
                        }
                        // .el-textarea__inner:focus{
                        //     border-color: #cf111b !important;
                        // }
                    }
                }
                .GovernmentManagement_block{
                    display: inline-block;
                    margin-left: 70px;
                    span{
                        // padding: 0 13px 0 33px;
                        font-size: 20px;
                        color: #606266;
                        font-weight: 100;
                    }
                }
            }
            .query-result{
                padding: 0 !important;
            }
            // 交通优势
            .TrafficAdvantagesForm{

            }
        }
        .GovernmentIncreaseRtPark{
            float: right;
            margin-top: 12px;
        }
        .GovernmentIncreasePreservation{
            float: right;
            margin-top: 12px;
            margin-right: 10px;
        }
    }
}
</style>