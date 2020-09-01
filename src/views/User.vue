<template>
    <div id="C_content">
        <div class="C_title">
            个人中心
        </div>
        <div class="User">
            <div class="user-t">
                <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576665478113&di=20ceef5455e9ac55abca24d9be62aadb&imgtype=0&src=http%3A%2F%2Fpic13.nipic.com%2F20110312%2F5544694_112052409186_2.jpg" alt=""> -->
                <!-- <i></i> -->
                <img src="../assets/images/UserVIP.jpg" alt="">
                <span>付费用户</span>
                <span>有效期：{{ StartTime }}&nbsp;&nbsp; 至 &nbsp;&nbsp;{{ EndTime }}</span>
                <p>请完善以下信息，方便我们更好的为您提供服务。</p>
            </div>
            <div class="user-c">
                <h2>基本信息</h2>
                <div class="information">
                    <el-form  :model="informationForm" ref="informationForm" :rules="rules" :inline="true" label-width="300px">
                        <el-form-item label="姓名" prop="realName">
                            <el-input v-model="informationForm.realName"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="mobile" >
                            <el-input v-model="informationForm.mobile" readonly clearValidate></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="informationForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="地址" prop="userDress">
                            <el-input v-model="informationForm.userDress"></el-input>
                        </el-form-item>
                        <el-form-item label="所在单位" prop="unit">
                            <el-input v-model="informationForm.unit"></el-input>
                        </el-form-item>
                        <el-form-item label="职位" prop="post">
                            <el-input v-model="informationForm.post"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="button">
                        <el-button @click="Sub('informationForm')" type="primary">保存</el-button>
                        <!-- <el-button>重置</el-button> -->
                    </div>
                </div>
            </div>
            <div class="user-b"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            informationForm: {
                realName: '',
                mobile: '',
                email: '',
                userDress: '',
                unit: '',
                post: '',
                readonly: true,
            },
            rules: {
                realName: [
                    { required: true, message: '请填写您的姓名',  trigger: 'blur' }
                ],
                mobile: [
                    {validator: this.checkPhone, required: true, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请填写您的邮箱地址',  trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                userDress: [
                    { required: true, message: '请填写您的居住地址',  trigger: 'blur' }
                ],
            },
            StartTime: '',
            EndTime: '',
            id: '',
            dflUuid: '',
        };
    },
    mounted() {
        this.StartTime = localStorage.getItem('StartTime')
        this.EndTime = localStorage.getItem('EndTime')

        this.informationForm.realName = localStorage.getItem('realName')
        this.informationForm.mobile = localStorage.getItem('mobile')
        this.informationForm.email = localStorage.getItem('email')
        this.informationForm.userDress = localStorage.getItem('userDress')
        this.informationForm.unit = localStorage.getItem('unit')
        this.informationForm.post = localStorage.getItem('post')
        this.id = localStorage.getItem('id')
        this.dflUuid = localStorage.getItem('dflUuid')
        // this.Sub()
    },
    methods: {
        // 错误提示
        warning() {
            this.$message({
            showClose: true,
            message: "",
            type: "warning",
            duration: 2000
            });
        },
        // 提交
        Sub(formName) {
            // console.log(this.informationForm.mobile)
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    let params = {
                        id: this.id,
                        dflUuid: this.dflUuid,
                        realName: this.informationForm.realName,
                        mobile: this.informationForm.mobile,
                        email: this.informationForm.email,
                        userDress: this.informationForm.userDress,
                        unit: this.informationForm.unit,
                        post: this.informationForm.post,
                    }
                    this.axios({
                        url: this.api.User,
                        method: "post",
                        data: this.$qs.stringify(params),
                        headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(res => {
                        // console.log(res.data.code)
                        if(res.data.code == 0){
                            this.$message({
                                type: "success",
                                message: "修改成功"
                            })
                            localStorage.setItem("realName",this.informationForm.realName)
                            localStorage.setItem("mobile",this.informationForm.mobile)
                            localStorage.setItem("email",this.informationForm.email)
                            localStorage.setItem("userDress",this.informationForm.userDress)
                            localStorage.setItem("unit",this.informationForm.unit)
                            localStorage.setItem("post",this.informationForm.post)
                        } 
                    })
                }
            })
        },
        // 手机号码验证
    //     checkPhone(rule, value, callback) {
    //     if (!value) {
    //       callback(new Error('请务必填写您的手机号码'))
    //     } else if(!/^1[3456789]\d{9}$/.test(this.informationForm.mobile)) {
    //         callback(new Error('请务必输入正确的电话号码'))
    //     }else {
    //         callback()
    //     }
    //   },

    }
    
}
</script>

<style lang="scss">
@import "../styles/css/User.scss"
</style>