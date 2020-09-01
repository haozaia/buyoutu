<!--  -->
<template>
  <div class="Monitoring">
    <div class="C_title">
      <span class="Title_left"></span>产业链监控
    </div>
    <el-collapse v-model="activeName" @change="handleChange" accordion>
      <el-collapse-item title="上游" name="1">
        <div class="inline contentLeft">
          <section class="inline MonitoringChild">
            <div class="content" v-for="(itemChild,index) in monitorChild[0].yijilist" :key="index">
              <header class="erjibiaoqianWapper">
                <span class="erjibiaoqianBlock inline"></span>

                <span class="inline childTitle fontSize22">{{itemChild.erjibiaoqian}}</span>
              </header>

              <ul class="chinaChildWapper">
                <li
                  class="chain"
                  v-for="(itemChilds,index) in itemChild.chanyelian"
                  :key="index"
                  @click="chainChild(itemChilds.chanyelian)"
                >{{itemChilds.chanyelian}}</li>
              </ul>
            </div>
          </section>
        </div>
      </el-collapse-item>
      <el-collapse-item title="中游" name="2">
        <section class="inline MonitoringChild">
          <div class="content" v-for="(itemChild,index) in monitorChild[1].yijilist" :key="index">
            <header class="erjibiaoqianWapper">
              <span class="erjibiaoqianBlock inline"></span>
              <span class="inline childTitle fontSize22">{{itemChild.erjibiaoqian}}</span>
            </header>

            <ul class="chinaChildWapper">
              <li
                class="chain"
                v-for="(itemChilds,index) in itemChild.chanyelian"
                :key="index"
                @click="chainChild(itemChilds.chanyelian)"
              >{{itemChilds.chanyelian}}</li>
            </ul>
          </div>
        </section>
      </el-collapse-item>
      <el-collapse-item title="下游" name="3">
        <section class="inline MonitoringChild">
          <div class="content" v-for="(itemChild,index) in monitorChild[2].yijilist" :key="index">
            <header class="erjibiaoqianWapper">
              <span class="erjibiaoqianBlock inline"></span>
              <span class="inline childTitle fontSize22">{{itemChild.erjibiaoqian}}</span>
            </header>

            <ul class="chinaChildWapper">
              <li
                class="chain"
                v-for="(itemChilds,index) in itemChild.chanyelian"
                :key="index"
                @click="chainChild(itemChilds.chanyelian)"
              >{{itemChilds.chanyelian}}</li>
            </ul>
          </div>
        </section>
      </el-collapse-item>
      <el-collapse-item title="支持" name="4">
        <section class="inline MonitoringChild">
          <div class="content" v-for="(itemChild,index) in monitorChild[3].yijilist" :key="index">
            <header class="erjibiaoqianWapper">
              <span class="erjibiaoqianBlock inline"></span>
              <span class="inline childTitle fontSize22">{{itemChild.erjibiaoqian}}</span>
            </header>

            <ul class="chinaChildWapper">
              <li
                class="chain"
                v-for="(itemChilds,index) in itemChild.chanyelian"
                :key="index"
                @click="chainChild(itemChilds.chanyelian)"
              >{{itemChilds.chanyelian}}</li>
            </ul>
          </div>
        </section>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "2",
      monitorChild: [{yijilist:''},{yijilist:''},{yijilist:''},{yijilist:''},],
      monitorChilds: [],
      upperMonitor: []
    };
  },

  components: {},

  computed: {},
  created(){
    var self = this;
    self.getMonitor();
  },

  mounted() {
    
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },
    chainChild(title) {
      this.$router.push({
        path: "/monitor",
        query: { title: Base64.encode(title) }
      });
    },

    sum(m, n) {
      var num = Math.floor(Math.random() * (m - n) + n);
      return num;
    },

    getMonitor() {
      var self = this;
      this.axios({
        url: this.api.Eschanyelianlistapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.monitorChild = res.data.data
      });
    },

    openMontoring(i, title) {
      var self = this;
      let routeUrl = self.$router.resolve({
        path: "/monitor",
        query: {
          num: Base64.encode(i),
          title: Base64.encode(title)
        }
      });
      window.open(routeUrl.href, "_blank");
    }
  }
};
</script>
<style lang='scss' >
@import "../../../styles/Monitor/industrial/css/Monitoring.scss";
.Monitoring {
  .el-collapse-item__header {
    height: 80px;
    line-height: 80px;
    font-size: 20px;
    padding-left: 37px;
    padding-right: 30px;
    color: #fff;
    background: url("../../../assets/images/Collection/iconB.svg") no-repeat
      20px 20px;
    background-size: 100px 40px;
  }
  .el-collapse {
    .el-collapse-item:nth-child(1) {
      .el-collapse-item__header {
        background: url("../../../assets/images/Collection/iconY.svg") no-repeat
          20px 20px;
        background-size: 100px 40px;
      }
      .chain:hover {
        background: #F8B65B;
      }
      .erjibiaoqianBlock{
           background: url("../../../assets/images/Collection/smallTitleY.svg") no-repeat;
        background-size: 20px 20px;
      }
    }
    .el-collapse-item:nth-child(2) {
      .el-collapse-item__header {
        background: url("../../../assets/images/Collection/iconO.svg") no-repeat
          20px 20px;
        background-size: 100px 40px;
      }
      .chain:hover {
        background: #DF5F2A;
      }
       .erjibiaoqianBlock{
           background: url("../../../assets/images/Collection/smallTitleO.svg") no-repeat;
        background-size: 20px 20px;
      }
    }
    .el-collapse-item:nth-child(3) {
         .erjibiaoqianBlock{
           background: url("../../../assets/images/Collection/smallTitleB.svg") no-repeat;
        background-size: 20px 20px;
      }
    }
    .el-collapse-item:nth-child(4) {
      .el-collapse-item__header {
        background: url("../../../assets/images/Collection/iconG.svg") no-repeat
          20px 20px;
        background-size: 100px 40px;
      }
      .chain:hover {
        background: #50C764;
      }
       .erjibiaoqianBlock{
           background: url("../../../assets/images/Collection/smallTitleG.svg") no-repeat;
        background-size: 20px 20px;
      }
    }
  }

  .el-collapse-item__arrow {
    font-weight: 600;
    color: #000;
  }
  .el-collapse-item__content {
    padding-left: 20px;
    padding-right: 30px;
  }
  .chain {
    display: inline-block;
    font-size: 20px;
    padding: 11px 15px;
    cursor: pointer;
    margin: 10px 20px 10px 0;
    height: 28px;
    line-height: 28px;
    background: #F3F3F3;
    border-radius: 4px;
  }
  .chain:hover {
    background: #5e9bf5;
    color: #fff;
  }
  .erjibiaoqianBlock {
    width: 20px;
    height: 20px;
     background: url("../../../assets/images/Collection/smallTitleR.svg") no-repeat;
        background-size: 20px 20px;
    margin-right: 8px;
  }
  .MonitoringChildWapper {
    background: #fff;
    padding: 30px 30px 50px;
    .contentLeft {
      width: 50%;
    }
    .contentLeft,
    .contentRight {
      vertical-align: top;
      .chainWapper {
        position: relative;
        padding: 30px 14px 30px 30px;
        box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
        border-radius: 4px;
        vertical-align: top;
        margin-left: 77px;
        .childTitle {
          font-weight: bold;
        }
        .chainHeader {
          font-weight: bold;
          position: absolute;
          width: 90px;
          height: 100px;
          line-height: 90px;
          text-align: center;
          top: 50%;
          left: -77px;
          color: #fff;
          -webkit-writing-mode: vertical-rl;
          -ms-writing-mode: tb-rl;
          writing-mode: vertical-rl;
          margin-top: -50px;
        }
      }

      .erjibiaoqianWapper {
        margin: 10px 0;
      }
    }

    .contentRight {
      width: calc(46% - 138px);
      img {
        width: 36px;
      }
      .toMiddle {
        position: absolute;
        top: 50%;
        left: -120px;
        margin-top: -18px;
      }
      .toUpper {
        position: absolute;
        left: 50%;
        top: -58px;
        transform: translate(-50%) rotate(90deg);
      }

      .chainWapper {
        width: calc(100% - 60px);
        margin-left: 138px;
      }
    }
  }
}
</style>