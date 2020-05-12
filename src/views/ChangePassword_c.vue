<template>
    <div id="password">
        <div class="password_t">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!-- <el-form-item label="旧密码" prop="orpass">
                <el-input v-model="ruleForm.orpass"></el-input>
            </el-form-item> -->
            <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script>
import md5 from "js-md5";
  export default {
    data() {
      // var checkorpass = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('请输入旧密码'));
      //   }else {
      //     callback()
      //     }
      // };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          // orpass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          // orpass: [
          //   { validator: checkorpass, trigger: 'blur' }
          // ]
        },
        dflUuid: '',
      };
    },
    mounted() {
      this.dflUuid = localStorage.getItem("dflUuid")
    },
    methods: {
        // 提交数据至后台
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              // oldPassword: md5(this.ruleForm.orpass),
              newPassword: md5(this.ruleForm.pass),
              dflUuid: this.dflUuid,
            }
            this.axios({
              url: this.api.changeUserPassword,
              method: "post",
              data: this.$qs.stringify(params),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(res => {
              if(res.data.code == 0){
                this.$message({
                  type: "success",
                  message: "密码修改成功,请重新登录",
                },2000)
                this.$router.push('/home')
              }else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
// export default {
//     data() {
//         return {
//             Original_password: '',
//             CodeValue: '',
//         }
//     },
//     mounted() {

//     },
//     methods: {
//         GetCode() {
//             if(this.PhoneValue === ''){
//                 alert("手机号码不能为空")
//             }else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.PhoneValue))) {
//                 alert("请输入11位数的手机号码")
//             }else {
//                 // 向后端发送请求，验证传过去的手机号是否为真实用户
//                 alert("已发送验证码至您的手机，请注意查收！")
//             }
//         },
//     }
// }
</script>
<style lang="scss">
@import "../styles/css/changepassword.scss"
</style>