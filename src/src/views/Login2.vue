<template>
  <div id="Login">
    <!-- <div class="loginDynamic">
      <img src="../assets/images/Login/ThreeBGGif.gif" alt="">
    </div> -->
    <!-- <div class="loginOpacity"></div> -->
    <div class="login">
      <div class="Ulogin">
        <div class="Ulogin_title">
          <p>欢迎进入</p>
          <p>招商大数据系统</p>
        </div>
        <!-- 账号密码登录 -->
        <div v-if="login_c" class="Ulogin_input">
          <input v-model="txtvalue" @keyup.enter="login" class="txt" type="text" placeholder="请输入账号" value="admin" />
          <input v-model="passvalue" @keyup.enter="login" class="password" type="password" placeholder="请输入密码" />
          <button @click="login" class="sub">登 录</button>
          <p class="message">{{ this.Passmessage }}</p>
        </div>
        <!-- 验证码登录 -->
        <div v-if="login_r" class="Ulogin_input">
          <input v-model="phone" autoComplete="new-password" @keyup.enter="loginb" class="phonevalue" type="text" placeholder="请输入手机号" />
          <div class="Get_yanzheng">
            <input v-model="code" autoComplete="new-password" @keyup.enter="loginb" class="codevalue inline" type="text" placeholder="请输入验证码" />
            <button v-if="hei" @click="getcode"  class="getcode inline">获取</button>
            <button v-else class="getcode2 inline">{{ time }}</button>
          </div>
          <button @click="loginb" class="sub">登 录</button>
          <p class="message">{{ this.Passmessage }}</p>
        </div>
        <span v-if="Fangshi" class="Te_login" @click="yanzhengm">选择验证码登录</span>
        <span v-if="Passlogin" class="Te_login" @click="PassLogin">选择账户密码登录</span>
      </div>
    </div>
    <div class="login_footer">
      <p class="lianjie_p">友情链接： | <a target="_blank" href="http://www.dflswjt.com/">招商引资</a> | <a target="_blank" href="http://www.shdjfund.com/">产业引导基金</a> | <a target="_blank" href="http://www.dflswjt.com/case.html">投资选址</a></p>
      <p class="phone_p">服务热线：400-6898-186&nbsp;&nbsp;&nbsp;联系电话：021-64435611&nbsp;/&nbsp;021-60573680</p>
      <p>上海总部地址：上海市嘉定区金沙江西路1555弄慧创国际产业园C区1号楼</p>
      <p>深圳分公司地址：宝安区新安街道中粮创芯研发中心8层G室&nbsp;&nbsp;&nbsp;北京分公司地址：北京丰台区汉威国际广场四区5号楼6M层</p>
      <p>版权所有©&nbsp;上海不忧兔网络科技有限公司&nbsp;&nbsp;<a target="_blank" href="http://www.beian.miit.gov.cn/">沪ICP备20000799号-1</a></p>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import User from './User'
export default {
  data() {
    return {
      time: 60,
      hei: true,
      txtvalue: "", //账号
      passvalue: "", //密码
      login_c: true, //密码登录
      login_r: "", //验证码登录
      phone: "", //手机号
      code: "", //验证码
      Fangshi: true, //选择登录方式
      Passlogin: false, //选择登录方式
      Passmessage: "", //提示信息  ！！！待修改~！！！！！！
    };
  },
  created() {
    var lett = this;
    // document.onkeydown = function(e) {
    //   var key = window.event.keyCode;
    //   if (key == 13) {
    //   lett.login();
    //   }
    // }
  },
  mounted() {},
  methods: {
    // 成功
    success() {
      this.$message({
        showClose: true,
        message: "登录成功",
        type: "success",
        duration: 1000
      });
    },
    // 警告
    warning() {
      this.$message({
        showClose: true,
        message: "账户名与密码不能为空！",
        type: "warning",
        duration: 2000
      });
    },
    mima() {
      var lett = this;
      // console.log(1);
      this.login_c = true;
      this.login_r = false;
      document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
      lett.login();
      }
    }
    },
    yanzhengm() {
      var lett = this;
      this.login_r = true;
      this.login_c = false;
      lett.Fangshi = false;
      lett.Passlogin = true
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
      if (key == 13) {
        lett.loginb();
      }
    }
    },
    PassLogin() {
      var lett = this
      this.login_r = false;
      this.login_c = true;
      lett.Fangshi = true;
      lett.Passlogin = false

    },

    // 获取验证码
    getcode() {
      var self = this
      let params = {
        mobile: this.phone
      };
      if (this.phone == "") {
        this.$message({
          showClose: true,
          message: "手机号码不能为空",
          type: "warning",
          duration: 2000
        });
      } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message({
          message: "请输入正确的手机号",
          type: "warning",
          duration: 2000
        });
      } else {
        let params = {
          mobile: this.phone
        };
        this.axios({
          url: this.api.Loginb,
          method: "post",
          data: this.$qs.stringify(params),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          // console.log(res,"1234")
          if(res.data.code !== 0){
            this.$message.error(res.data.msg)
          }else{
            this.$message({
              showClose: true,
              message: "验证码已发送至您的手机，请注意查收！",
              type: "success",
              duration: 2000
            });
            this.hei = false
            var int = setInterval(() => {
              this.time--
              // console.log(this.time,"item")
              if(this.time == 0){
                clearInterval(int)
                this.hei = true
                this.time = 60
              }
            },1000);
          }
        });
      }
    },
    // 手机验证码登录
    loginb() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message({
          showClose: true,
          message: "请输入正确的手机号",
          type: "warning",
          duration: 2000
        });
      } else if (this.code == "") {
        this.$message({
          showClose: true,
          message: "验证码不能为空",
          type: "warning",
          duration: 2000
        });
      } else {
        let params = {
          mobile: this.phone,
          code: this.code
        }
        this.axios({
          url: this.api.loginc,
          method: "post",
          data: this.$qs.stringify(params),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          if (res.data.code !== 0){
            this.$message.error(res.data.msg);
          }else {
            localStorage.setItem("token", res.data.data.token);
            this.success();
            if(res.data.data.dflUserSers.length < 1){
              this.$message.error("未知的用户类别，请联系管理员")
            }else{
              let user = res.data.data.dflUserSers[0].userRole;

              //判断跳转哪个首页
              if (user == "S") {
                this.$router.push("/home");
              } else if (user == "A") {
                this.$router.push("/qyh");
              } else if (user == "B") {
                this.$router.push("/jrh");
                localStorage.setItem("home", "/home_B");
              } else if (user == "C") {
                this.$router.push("/zfh");
              }
            }
          localStorage.setItem("userRole", res.data.data.dflUserSers[0].userRole);
          localStorage.setItem("StartTime", res.data.data.dflUserSers[0].serviceStartTime);
          localStorage.setItem("EndTime", res.data.data.dflUserSers[0].serviceEndTime);
          localStorage.setItem("userName", res.data.data.userName);
          localStorage.setItem("dflUuid", res.data.data.dflUuid);
          localStorage.setItem("id", res.data.data.id);
          localStorage.setItem("unitCode", res.data.data.unitCode);
          localStorage.setItem("realName", res.data.data.realName);
          localStorage.setItem("mobile", res.data.data.mobile);
          localStorage.setItem("email", res.data.data.email);
          localStorage.setItem("userDress", res.data.data.userDress);
          localStorage.setItem("unit", res.data.data.unit);
          localStorage.setItem("post", res.data.data.post);
          localStorage.setItem("NavMenu", "home");
          }
        });
      }
    },
    // 账号密码登录
    login() {
      let params = {
        userName: this.txtvalue,
        // password: this.passvalue,  //未加密
        password: md5(this.passvalue) //加密后
      };
      // console.log(params.password);
      this.axios({
        url: this.api.Login,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res,"登录信息")
        if (res.data.code !== 0) {
          this.$message.error(res.data.msg);
        } else {
          localStorage.setItem("token", res.data.data.token);
          this.success();
          let user = res.data.data.dflUserSers[0].userRole;
          // console.log(user,"1111")
          
          //判断跳转哪个首页
          if (user == "S") {
            this.$router.push("/home");
          } else if (user == "A") {
            this.$router.push("/qyh");
          } else if (user == "B") {
            this.$router.push("/jrh");
            localStorage.setItem("home", "/home_B");
          } else if (user == "C") {
            this.$router.push("/zfh");
          }
        }
        localStorage.setItem("userRole", res.data.data.dflUserSers[0].userRole);
        localStorage.setItem("StartTime", res.data.data.dflUserSers[0].serviceStartTime);
        localStorage.setItem("EndTime", res.data.data.dflUserSers[0].serviceEndTime);
        localStorage.setItem("userName", res.data.data.userName);
        localStorage.setItem("dflUuid", res.data.data.dflUuid);
        localStorage.setItem("id", res.data.data.id);
        localStorage.setItem("unitCode", res.data.data.unitCode);
        //用户信息
        localStorage.setItem("realName", res.data.data.realName);
        localStorage.setItem("mobile", res.data.data.mobile);
        localStorage.setItem("email", res.data.data.email);
        localStorage.setItem("userDress", res.data.data.userDress);
        localStorage.setItem("unit", res.data.data.unit);
        localStorage.setItem("post", res.data.data.post);
        localStorage.setItem("NavMenu", "home");
      });
    },

  }
};
</script>

<style lang="scss">
@import "../styles/css/Login.scss";
</style>