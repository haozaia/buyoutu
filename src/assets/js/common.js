
exports.install = function (Vue, options) {
  Vue.prototype.$Export = function () {
    var self = this;
    let params = {
      username: this.$store.state.userName,
      telphone: this.$store.state.mobile,
    };
    this.axios({
      url: this.api.Exportcount,
      method: "post",
      data: this.$qs.stringify(params),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      self.shengyu = res.data.data[0].shengyu;
      self.yidao = res.data.data[0].yidao;
      console.log(res.data.data[0])
      return res.data.data[0];
    });
  };
  Vue.prototype.$download = function (url) {
    var self = this;
    this.$prompt(
      "请输入导出条数(剩余额度" + this.shengyu + "条)",
      "导出向导",
      {
        confirmButtonText: "导出",
        cancelButtonText: "取消",
        showCancelButton: false,
        inputPattern: /^(0\.0[1-9]|0\.[1-9]\d|[1-9]\d?(\.\d\d)?|[1-4]\d\d(\.\d\d)?|500)$/,
        inputErrorMessage: "请输入1-500之间的整数"
      }
    )
      .then(({ value }) => {
        console.log('yijinru')
        if (value > self.shengyu) {
          this.$message.error("导出数量超出今日额度");
        } else {
          console.log(this.GLOBAL.username)
          window.location.href = url + 'num=' + value + "&telphone=" +
            this.GLOBAL.mobile + "&userName=" +
            this.GLOBAL.username; //  跳转链接
          setTimeout(function () {
            self.$Export()
          }, 2000);
          console.log(url + 'num=' + value + "&telphone=" + this.GLOBAL.mobile + "&userName=" + this.GLOBAL.username)
        }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消导出"
        });
      });
  };
  // Vue.prototype.$nullToNo = function (arr) {
  //   let s = JSON.stringify(arr);
  //   console.log(s)
  //   let c = JSON.parse(s.replace(/null/g,'""'));
  //   console.log(JSON.parse(s.replace(/null/g,'""')))
  //   return c;
  // };
};