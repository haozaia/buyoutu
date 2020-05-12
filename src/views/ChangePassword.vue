<template>
    <div id="password">
        <div class="password_c">
            <input class="phonevalue" v-model="this.mobile" type="text" readonly clearValidate placeholder="请输入您的手机号" />
            <div  class="te_input">
                <input class="codevalue" v-model="CodeValue" type="text" placeholder="请输入验证码" />
                <button v-if="hei" class="getcode" @click="GetCode">获取验证码</button>
                <button v-else class="getcode2">重新发送 ({{ time }})</button>
            </div>
            <button @click="Next">下一步</button>           

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            PhoneValue: '',
            CodeValue: '',
            hei: true,
            time: 60,
            mobile: '',
            readonly: true,
        }
    },
    mounted() {
        this.mobile = localStorage.getItem('mobile')
    },
    methods: {
        warning1() {
            this.$message({
                showClose: true,
                message: "手机号码不能为空",
                type: "warning",
                duration: 2000
            });
        },
        warning2() {
            this.$message({
                showClose: true,
                message: "请输入11位数的手机号码",
                type: "warning",
                duration: 2000
            });
        },
        GetCode() {
            // if(this.PhoneValue === ''){
            //     this.warning1()
            // }else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.PhoneValue))) {
            //     this.warning2()
            // }else {
            // }
                // 向后端发送请求，验证传过去的手机号是否为真实用户
                let params = {
                    mobile: this.mobile,
                }
                this.axios({
                url: this.api.Loginb,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
                }).then( res => {
                    this.$message({
                        type: "success",
                        message: "验证码已发送至您的手机，请注意查收"
                    })
                    this.hei =false
                    var int = setInterval(() => {
                    this.time--
                    // console.log(this.time,"item")
                    if(this.time == 0){
                        clearInterval(int)
                        this.hei = true
                        this.time = 60
                    }
                    },1000);
                })
        },
        Next() {
            // if(this.PhoneValue === ''){
            //     this.warning1()
            // }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.PhoneValue))){
            //     this.warning2()
            // }else
             if(this.CodeValue == ''){
                this.$message({
                    type: "warning",
                    message: "请输入六位数的验证码"
                })
            }else{
                let params = {
                    mobile: this.mobile,
                    code: this.CodeValue,
                }
                this.axios({
                url: this.api.checkMobileCode,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
                }).then(res => {
                    // console.log(res)
                    if(res.data.code == 0){
                         this.$message({
                             type: "success",
                            message: "验证成功"
                        })
                        this.$router.push('/ChangePassword_c')
                    }else {
                        this.$message.error(res.data.msg)
                    }
                })
                // alert("操作成功！")

            }
        }
    }
}
</script>

<style lang="scss">
@import "../styles/css/changepassword.scss"
</style>