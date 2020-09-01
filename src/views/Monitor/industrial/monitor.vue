<template>
  <div id="monitor">
    <div id="C_content" class="Monitoring">
      <div class="C_title">
        <span class="Title_left"></span>
        {{Base64.decode(this.$route.query.title)}}
        <!-- <button class="rtPark" @click="rtPark">返回</button> -->
        <el-button class="rtPark" @click="rtPark" type="primary">返回</el-button>
        <div class="inline fontSize20 floatR CollectionWapper" @click="addCool" v-if="!isColl">
          <img class="Collection inline" src="../../../assets/images/Collection/CollectionW.svg" />
          <span class="inline">收藏</span>
        </div>
        <div class="inline fontSize20 floatR CollectionWapper" @click="delCool" v-else>
          <img class="Collection inline" src="../../../assets/images/Collection/CollectionR.svg" />
          <span class="inline colorH">收藏</span>
        </div>
      </div>
      <section class="monitorWapper">
        <div class="innerWapper">
          <div class="inline chainWapper">
            <div class="inline headerWapper">
              <header
                class="chainHeader inline fontSize22"
              >{{Base64.decode(this.$route.query.title)}}</header>
            </div>
            <section class="inline MonitoringChild">
              <div class="content" v-for="(itemChild,index) in monitorChild" :key="index">
                <header class="erjibiaoqianWapper">
                  <span class="erjibiaoqianBlock inline"></span>
                  <span class="inline childTitle fontSize20">{{itemChild.chanye}}</span>
                </header>
                <ul class="chinaChildWapper">
                  <li
                    class="chain"
                    v-for="(itemChilds,index) in itemChild.chanyelist"
                    :key="index"
                    @click="chainChild(itemChilds.chanye)"
                  >{{itemChilds.chanye}}</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      monitorChild: [],
      isColl: false,
      userName: "",
      mobile: "",
      coolId: ""
    };
  },
  mounted() {
    var self = this;
    self.username = localStorage.getItem("userName");
    self.mobile = localStorage.getItem("mobile");
    self.getMonitor();
    self.coolInfo();
  },
  methods: {
    coolInfo() {
      var self = this;
      let params = {
        userName: self.username,
        mobile: self.mobile,
        collectIndustry: Base64.decode(this.$route.query.title),
        identification: 1
      };
      this.axios({
        url: this.api.collectionistrue,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.isColl = res.data.data.flag == "true" ? true : false;
        console.log(self.isColl);
        self.coolId = res.data.data.id;
      });
    },

    addCool() {
      var self = this;
      let params = {
        userName: self.username,
        mobile: self.mobile,
        collectIndustry: Base64.decode(this.$route.query.title),
        identification: 1
      };
      this.axios({
        url: this.api.addindustry,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "收藏成功!",
            type: "success"
          });
          self.isColl = true;
          self.coolId = res.data.data.id;
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },

    delCool() {
      var self = this;
      let params = {
        id: self.coolId
      };
      this.axios({
        url: this.api.delindustry,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "取消收藏成功!",
            type: "success"
          });
          self.isColl = false;
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },

    sum(m, n) {
      var num = Math.floor(Math.random() * (m - n) + n);
      return num;
    },
    rtPark() {
      window.history.go(-1);
    },
    chainChild(title) {
      this.$router.push({
        path: "/monitorDetail",
        query: { title: Base64.encode(title) }
      });
    },
    getMonitor() {
      var self = this;
      let params = {
        chanyelian: Base64.decode(this.$route.query.title)
      };
      this.axios({
        url: this.api.Eserjichanyelianlistapi,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.monitorChild = res.data.data[0];
        var flag = res.data.data[1].flag;
        var color = "#F8B65B";
        if(flag==2){
          color = "#DF5F2A"
        }else if(flag==3){
          color = "#5e9bf5"
        }else if(flag==4){
          color = "#50C764"
        }
        setTimeout(() => {
          var list = document.getElementsByClassName("chain");
          console.log(list[0]);
          for (var i = 0; i < list.length; i++) {
            //为li注册鼠标进入事件
            list[i].onmouseover = function() {
              //设置其背景颜色为黄色
              console.log(i);
              this.style.backgroundColor = color;
            };
            list[i].onmouseout = function() {
              //设置其背景颜色为黄色
              console.log(i);
              this.style.backgroundColor = "#F3F3F3";
            };
          }
        },200);
      });
    }
  }
};
</script>
<style lang="scss">
#monitor {
  border: 1px solid #fff;
  border-radius: 6px;
}
.Collection {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.CollectionWapper {
  font-weight: 400;
  cursor: pointer;
  margin-top: -2px;
  margin-right: 30px;
}
.monitImg {
  width: 21px;
  height: 21px;
  vertical-align: bottom;
}
.monitorWapper {
  background: #fff;

  .MonitoringChild {
    background: #fff;
  }
  .headerWapper {
    position: absolute;
    top: -16px;
    left: 50%;
  }
  .innerWapper {
    padding: 50px 0;
    width: 80%;
    margin: 0 auto;

    .chainWapper {
      position: relative;
      padding: 30px 14px 30px 30px;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      vertical-align: top;
      width: 100%;
      .chainHeader {
        padding: 0 16px;
        background: rgba(207, 17, 27, 1);
        border-radius: 6px;
        text-align: center;
        line-height: 32px;
        color: #fff;
        position: relative;
        left: -50%;
      }
      .childTitle {
        font-weight: bold;
      }
      .chinaChildWapper {
        padding: 18px 0 18px 18px;
      }
    }
  }
}

// .rtPark {
//   float: right;
//   margin-top: 12px;
// }
</style>
<style lang="scss" scoped>
.rtPark {
  float: right;
  margin-top: 12px;
}
</style>
