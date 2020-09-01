<script>
let self=this;
let username = localStorage.getItem("realName");
let mobile = localStorage.getItem("mobile");
let unitCode = localStorage.getItem("unitCode");
  export default
  {
    username,//用户账号
    mobile,//用户手机
    unitCode,//权限编码
  }
</script>