<template>
  <div id="Login">
    <p class="Login_tep">欢迎进入</p>
    <div style="display:block;" class="bggif">
      <img class="ectgif" src="../assets/images/Login/ectGif.gif" alt="">
    </div>
    <div style="display:none;" class="login_left login_ceshiL">
      <div class="logo_img">
        <img src="../assets/images/Login/HeaderLogo.png" alt="">
      </div>
      <div class="logo_container">
        <img src="../assets/images/Login/MainLogo.png" alt="">
      </div>
      <div class="logo_footer">
        <p>友情链接： | <a target="_blank" href="http://www.dflswjt.com/">招商引资</a> | <a target="_blank" href="http://www.shdjfund.com/">产业引导基金</a> | <a target="_blank" href="http://www.dflswjt.com/case.html">投资选址</a></p>
        <p>服务热线：400-6898-186&nbsp;&nbsp;&nbsp;联系电话：021-64435611&nbsp;/&nbsp;021-60573680</p>
        <p>上海总部地址:上海市嘉定区金沙江西路1555弄慧创国际产业园C区1号楼</p>
        <p>深圳分公司地址:宝安区新安街道中粮创芯研发中心8层G室&nbsp;&nbsp;&nbsp;北京分公司地址:丰台区汉威国际广场四区5号楼6M层</p>
        <p>版权所有©&nbsp;上海不忧兔网络科技有限公司&nbsp;&nbsp;<a target="_blank" href="http://www.beian.miit.gov.cn/">沪ICP备20000799号-1</a></p>
      </div>
    </div>
    <div style="display:none;" class="login_right login_ceshiR">
      <div class="login_title">
        <p>欢迎进入</p>
        <p>招商大数据系统</p>
      </div>
      <!-- 账号密码登录 -->
      <div v-if="AccountLogin" class="login_user">
        <input v-model="txtvalue" autoComplete="new-password" @keyup.enter="login" type="text" placeholder="请输入账号">
        <input v-model="passvalue" autoComplete="new-password" @keyup.enter="login" type="password" placeholder="请输入密码">
      </div>
      <div v-if="AccountLogin" class="login_login">
        <button @click="login" class="login_DLbtn">登录</button>
        <!-- <button @click="login_ceshi" class="login_DLbtn">登录</button> -->
      </div>
      <div v-if="AccountLogin" class="login_code">
        <p class="login_YZMcode"><i @click="yanzhengm">选择验证码登录</i></p>
      </div>
      <!-- 验证码登录 -->
      <div v-if="VerificationLogin" class="login_user">
        <input v-model="phone" type="text" placeholder="请输入手机号">
        <input v-model="code" autoComplete="new-password" @keyup.enter="loginb" type="text" placeholder="请输入验证码">
        <button v-if="hei" @click="GetCodeY" class="getcode">获取</button>
        <button v-else class="getcode">{{ time }}</button>
      </div>
      <div v-if="VerificationLogin" class="login_login">
        <button @click="loginb" class="login_DLbtn">登录</button>
        <!-- <button @click="login_ceshi" class="login_DLbtn">登录</button> -->
      </div>
      <div v-if="VerificationLogin" class="login_code">
        <p class="login_YZMcode"><i @click="PassLogin">用账号密码登录</i></p>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import User from './User'
export default {
  data() {
    return {
      AccountLogin: true,
      VerificationLogin: false,
      time: 60,
      hei: true,
      phone: "", //手机号
      code: "", //验证码
      txtvalue: "", //账号
      passvalue: "", //密码
      ///////////////////////////////////////////////
      
      login_c: true, //密码登录
      login_r: "", //验证码登录
      Passmessage: "", //提示信息  ！！！待修改~！！！！！！
    };
  },
  created() {
    var lett = this;
  },
  mounted() {
    // console.log(document.getElementsByClassName('bggif')[0].style.display)
    setTimeout("document.getElementsByClassName('bggif')[0].style.display='none'",2000);
    setTimeout("document.getElementsByClassName('login_left')[0].style.display='block'",2000)
    setTimeout("document.getElementsByClassName('login_right')[0].style.display='block'",2000);
  },
  watch: {

  },
  methods: {
    yanzhengm() {
      var self = this;
      self.AccountLogin = false
      self.VerificationLogin = true
    },
    PassLogin() {
      var self = this;
      self.AccountLogin = true
      self.VerificationLogin = false
    },
    //获取验证码
    GetCodeY() {
      var self = this
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
      var self = this
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
                // document.querySelector(".login_ceshiL").style.transform = 'rotateY(-90deg)'
                // document.querySelector(".login_ceshiR").style.transform = 'rotateY(-90deg)'
                // setTimeout(()=>{
                //   self.$router.push("/home");
                // },1500)
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
          localStorage.setItem("recommendNOorOFF", 0);//只能推荐弹窗是否显示
          // localStorage.setItem("longleftrotateY", 0);
          localStorage.setItem("seenYN", 0);//待查看信息窗口是否显示
          localStorage.setItem("proYN", 0);//待审批
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
    ////////////////////////////////////////
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
    // 账号密码登录
    login() {
      var self =this
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
            // document.querySelector(".login_ceshiL").style.transform = 'rotateY(-90deg)'
            // document.querySelector(".login_ceshiR").style.transform = 'rotateY(-90deg)'
            // console.log("第一步")
            // console.log(document.getElementsByClassName('Login_tep'),"第二步")
            // console.log("第三步")
            // document.getElementsByClassName('Login_tep')[0].style.display='block'
            // setTimeout(()=>{
            //     self.$router.push("/home");
            // },1500)
            self.$router.push("/home");
          } else if (user == "A") {
            this.$router.push("/qyh");
          } else if (user == "B") {
            this.$router.push("/jrh");
            localStorage.setItem("home", "/home_B");
          } else if (user == "C") {
            this.$router.push("/zfh");
          }
        }
        localStorage.setItem("recommendNOorOFF", 0);//只能推荐弹窗是否显示
        localStorage.setItem("longleftrotateY", 0);
        localStorage.setItem("proYN", 0);//待审批
        localStorage.setItem("seenYN", 0);//待查看信息窗口是否显示
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
    // login_ceshi() {
    //   // console.log(document.querySelector("#stylesheet"))
    //   document.querySelector("#stylesheet").innerHTML += '#Login:before{border-width:40px 200px}'
    //   document.querySelector("#stylesheet").innerHTML += '#Login:after{border-width:40px 200px}'
    //   document.querySelector(".login_ceshiL").style.transform = 'rotateY(-90deg)'
    //   document.querySelector(".login_ceshiR").style.transform = 'rotateY(-90deg)'
    //   setTimeout(()=>{
    //     self.$router.push("/home");
    //   },1500)
    // }
  }
};
</script>
<style id="stylesheet" lang="scss">
@import "../styles/css/Login.scss";
#Login{
  position: relative;
  .login_left,.login_right{
    animation: myopacity 1s;
  }
  @keyframes myopacity {
    from {opacity:.3;}
	  to {opacity:1;}
  }
  .login_ceshiL{
    transform-origin:0 0;
  }
  .login_ceshiR{
    transform-origin:100% 0;
  }
  .login_ceshiL, .login_ceshiR{ transition:all 1.5s ease;}
  // .login_ceshiR:hover{
  //   // background: black;
  //   transform-origin:100% 0;
  //   transform:rotateY(-90deg);
  // }
  #Login:before,#Login:after{ content:''; position:absolute; left:0; width:0; height:0; overflow:hidden; border-color:#000 transparent transparent transparent; border-style:solid; border-width:0 200px; z-index:2; transition:all .8s ease;}
  #Login:before{ top:0;}
  #Login:after{ bottom:0; border-color:transparent transparent #000 transparent;}
}
</style>

