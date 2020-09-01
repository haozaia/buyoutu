<template>
    <div id="GovernmentContacts">
        <!-- <div id="C_content">
            <div class="C_container">
                <div class="C_title">
                    <span class="Title_left"></span>政府管理 - 新增联系人
                    <el-button class="GovernmentIncreaseRtPark" @click="rtPark" type="primary">返回</el-button>
                    <el-button class="GovernmentIncreasePreservation" @click="preservation" type="primary">保存</el-button>
                </div>
                <div class="GovernmentFORM">
                    <div class="EssentialForm">
                        <p class="Esinformation">联系人信息</p>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="30%" class="demo-ruleForm">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="姓名" prop="govermentOfficialName">
                                        <el-input v-model="ruleForm.govermentOfficialName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="性别" prop="gender">
                                        <el-select v-model="value" clearable placeholder="请选择">
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="职务" prop="duty">
                                        <el-select v-model="value1" clearable @change="dutylabel" placeholder="请选择">
                                            <el-option
                                            v-for="item in options1"
                                            :key="item.sort"
                                            :label="item.name"
                                            :value="item.sort">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="手机号码" prop="govermentOfficialMobile">
                                        <el-input v-model="ruleForm.govermentOfficialMobile"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="座机号码" prop="govermentOfficialTelephone">
                                        <el-input v-model="ruleForm.govermentOfficialTelephone"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return{
            // options: [{
            // value: '1',
            // label: '男'
            // }, {
            // value: '2',
            // label: '女'
            // }, {
            // value: '0',
            // label: '未知'
            // },],
            // value: '',  //性别
            // value1: '', //职务
            // options1:[], //职务下拉框
            // dutyCode: '', //职务标识

            // id: '', //政府ID
            // unitCode: '',//部门唯一标识
            // inputerName: '',//当前登录用户姓名
            // inputerMobile: '',//当前登录用户手机号
            // govermentId: '',//政府id
            // dflUserId: '',//当前登录用户id



            // ruleForm: {
            //     govermentOfficialName: '',
            //     govermentOfficialMobile: '',
            //     govermentOfficialTelephone: '',
            // },
            // rules: {
            //     govermentSector: [
            //         { required: true, message: '请输入政府全称', trigger: 'blur' },
            //         { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
            //     ],
            // },
        }
    },
    mounted() {
        // this.id = Base64.decode(this.$route.query.id);
        // this.inputerName = localStorage.getItem("realName")
        // this.inputerMobile = localStorage.getItem("mobile")
        // this.dflUserId = localStorage.getItem("id")
        // this.unitCode = localStorage.getItem("unitCode")
        // this.duty()
    },
    methods: {
        //职务标识
        // dutylabel(value) {
        //     console.log(value,"value");
        //     let obj = {};
        //     obj = this.options1.find((item)=>{
        //         return item.sort === value;
        //     });
        //     console.log(obj.name,"name");
        //     this.value1 = obj.name
        //     // console.log('data',value)
        //     this.dutyCode = value
        // },
        // //请求职务列表
        // duty() {
        //     var self = this
        //     this.axios({
        //         url: this.api.Governmentofficialsinfodutiesapi,
//                 method: "post",
//                 headers: {
//                 "Content-Type": "application/x-www-form-urlencoded"
//                 }
//             }).then(res => {
//                 // console.log(res,"duty")
//                 self.options1 = res.data.data
//             })
//         },
//         //保存
//         preservation() {
//             var self = this
//             let params= {
//                 gender: self.value,
//                 duty: self.value1,
//                 dutyCode: self.dutyCode,
//                 unitCode: self.unitCode,
//                 inputerName: self.inputerName,
//                 inputerMobile: self.inputerMobile,
//                 govermentId: self.id,
//                 dflUserId: self.dflUserId,
//                 govermentOfficialName: self.ruleForm.govermentOfficialName,
//                 govermentOfficialMobile: self.ruleForm.govermentOfficialMobile,
//                 govermentOfficialTelephone: self.ruleForm.govermentOfficialTelephone,
//             }
//             this.axios({
//                 url: this.api.Governmentofficialsinfoaddapi,
//                 method: "post",
//                 data: this.$qs.stringify(params),
//                 headers: {
//                 "Content-Type": "application/x-www-form-urlencoded"
//                 }
//             }).then(res => {
//                 // console.log(res,"preservation")
//                 if(res.data.code == 0){
//                     this.$message.success("保存成功")
//                     window.history.go(-1)
//                 }else if(res.data.code == 500){
//                     this.$message.error(res.data.msg)
//                 }
//             })
//         },
//         //返回
//         rtPark() {
//             window.history.go(-1)
//         }
    },
}
</script>
<style lang="scss">
#GovernmentContacts{
.GovernmentFORM{
    padding: 20px 30px;
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
</style>