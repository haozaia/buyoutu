<template>
  <div id="C_content" class="Monitoring">
    <div class="C_title">
      <span class="Title_left"></span>产业链监控
    </div>
    <section class="MonitoringChildWapper">
      <div class="innerWapper">
        <div class="inline contentLeft">
          <div class="inline chainWapper" v-for="(item,index) in monitorChild" :key="index">
            <header class="chainHeader inline fontSize22">{{item.yijibiaoqian}}</header>

            <section class="inline MonitoringChild">
              <div class="content" v-for="(itemChild,index) in item.yijilist" :key="index">
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
                  >
                    {{itemChilds.chanyelian}}
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        <!-- <div class="inline contentCenter">
          <div class="inline contentCenterImgWapper">
            <img src="../../../assets/images/chainIcon/zhichi.svg" />
          </div>
        </div>-->

        <div class="inline contentRight">
          <div class="inline chainWapper">
            <header class="chainHeader inline fontSize22">上游</header>
            <section class="inline MonitoringChild">
              <div class="content" v-for="(itemChild,index) in upperMonitor.yijilist" :key="index">
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
                  >
                    <span>
                      {{itemChilds.chanyelian}}
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div class="inline chainWapper">
            <header class="chainHeader inline fontSize22">支持</header>
            <section class="inline MonitoringChild">
              <div class="content" v-for="(itemChild,index) in monitorChilds.yijilist" :key="index">
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
                  >
                    <span>
                      {{itemChilds.chanyelian}}
                    </span>
                  </li>
                </ul>
              </div>
            </section>
            <img class="toMiddle" src="../../../assets/images/chainIcon/zhichi.svg" />
            <img class="toUpper" src="../../../assets/images/chainIcon/zhichi.svg" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      monitorChild: [],
      monitorChilds: [],
      upperMonitor: []
    };
  },

  mounted() {
    var self = this;
    self.getMonitor();
  },
  methods: {
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
        self.monitorChilds = res.data.data[3];
        self.upperMonitor = res.data.data[0];
        self.monitorChild = res.data.data.slice(1, 3);
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

<style lang="scss">
@import "../../../styles/Monitor/industrial/css/Monitoring.scss";
.Monitoring {
  .chain {
    display: inline-block;
    font-size: 20px;
    padding: 0 14px 0 16px;
    cursor: pointer;
    margin: 5px 5px 5px 0;
    height: 32px;
    line-height: 32px;
  }
  .chain:hover {
    display: inline-block;
    font-size: 20px;
    background: #cf111b;
    color: #fff;
    padding: 0 14px 0 16px;
    border-radius: 20px;
    cursor: pointer;
    margin: 5px 5px 5px 0;
      height: 32px;
    line-height: 32px;
  }
  .erjibiaoqianBlock {
    width: 12px;
    height: 20px;
    background: rgba(207, 17, 27, 1);
    margin-right: 8px;
  }
  .MonitoringChildWapper {
    background: #fff;
    padding: 30px 30px 50px;
    .contentLeft {
      width: 50%;
    }
    .contentLeft {
      .chainWapper:nth-child(1) {
        .chainHeader:first-child {
          background: url("../../../assets/images/chainIcon/middleReaches.png")
            no-repeat;
          background-size: 90px 100px;
        }
      }
      .chainWapper:nth-child(2) {
        .chainHeader:first-child {
          background: url("../../../assets/images/chainIcon/downstream.png")
            no-repeat;
          background-size: 90px 100px;
        }
      }

      .chainWapper:nth-child(-n + 2) {
        margin-bottom: 30px;
      }
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

      .chainWapper:first-child {
        .chainHeader:first-child {
          background: url("../../../assets/images/chainIcon/upperReaches.png")
            no-repeat;
          background-size: 90px 100px;
        }
      }

      .chainWapper:nth-child(2) {
        margin-top: 80px;
        .chainHeader:first-child {
          background: url("../../../assets/images/chainIcon/support.png")
            no-repeat;
          background-size: 90px 100px;
        }
      }
    }
  }
}
</style>