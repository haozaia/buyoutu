<template>
  <div id="C_content" class="Monitoring">
    <div class="C_title">
      <span class="Title_left"></span>产业链监控
    </div>
    <section class="MonitoringChild">
      <div class="innerWapper">
        <div class="inline contentLeft">
          <div class="inline chainWapper" v-for="(item,index) in monitorChild" :key="index">
            <header class="chainHeader inline fontSize18">{{item.yijibiaoqian}}</header>
            <section class="inline MonitoringChild">
              <div class="content inline" v-for="(itemChild,index) in item.yijilist" :key="index">
                <span class="inline childTitle fontSize20">{{itemChild.erjibiaoqian}}</span>
                <ul class="inline chinaChildWapper">
                  <li
                    class="hotCyls"
                    v-for="(itemChilds,index) in itemChild.chanyelian"
                    :key="index"
                    @click="chainChild(itemChilds.chanyelian)"
                  >
                    <span class="inline imgWapper">
                      <img
                        :src='"../../../styles/imagesRed/h"+ sum(1, 100) +".png"'
                        class="monitImg"
                        alt
                      />
                    </span>
                    <span class="inline">{{itemChilds.chanyelian}}</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
        <div class="inline contentCenter">
          <img src="../../../assets/images/chainIcon/zhichi.svg" />
        </div>
        <div class="inline contentRight">
          <div class="inline chainWapper">
            <header class="chainHeader inline">支持</header>
            <section class="inline MonitoringChild">
              <div
                class="content inline"
                v-for="(itemChild,index) in monitorChilds.yijilist"
                :key="index"
              >
                <span class="inline childTitle fontSize20">{{itemChild.erjibiaoqian}}</span>
                <ul class="inline chinaChildWapper">
                  <li
                    class="hotCyls"
                    v-for="(itemChilds,index) in itemChild.chanyelian"
                    :key="index"
                    @click="chainChild(itemChilds.chanyelian)"
                  >
                    <span>
                      <span class="inline imgWapper">
                        <img
                          :src='"../../../styles/imagesRed/h"+ sum(1, 100) +".png"'
                          class="monitImg"
                          alt
                        />
                      </span>
                      <span class="inline">{{itemChilds.chanyelian}}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </section>
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
      monitorChilds: []
    };
  },

  mounted() {
    var self = this;
    self.getMonitor();
    setTimeout(function() {
      console.log(
        document.getElementsByClassName("chainWapper")[0].offsetHeight
      );
    });
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
      // let params = {
      //   yijihy: self.suoshuhy
      // };
      this.axios({
        url: this.api.Eschanyelianlistapi,
        // data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.monitorChilds = res.data.data[3];
        self.monitorChild = res.data.data.slice(0, 3);
        console.log(self.monitorChilds);
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
  border: 1px solid #fff;
  border-radius: 6px;
  .fliter {
    filter: invert(1);
  }
  svg image {
    fill: #666;
  }
  .border-bottom {
    border-bottom: 10px solid #f5f8fa;
  }

  .monitImg {
    width: 21px;
    height: 21px;
    vertical-align: bottom;
    border-radius: 10px;
  }
  .MonitoringChild {
    background: #fff;
  }
  .innerWapper {
    padding: 50px 0;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    margin: 0 auto;

    .chainWapper {
      border: 1px dashed #cfa972;
      padding: 30px 30px 10px 0;
      position: relative;
      min-width: 486px;
      margin-bottom: 40px;
      .chainHeader {
        writing-mode: vertical-rl;
        width: 32px;
        height: 70px;
        background: rgba(207, 17, 27, 1);
        border-radius: 6px;
        text-align: center;
        line-height: 32px;
        color: #fff;
        position: absolute;
        left: -16px;
        top: 50%;
        margin-top: -35px;
      }
      .childTitle {
        margin: 0px 6px 0 40px;
        width: 82px;
        text-align: right;
      }
      .chinaChildWapper {
        width: 420px;
        min-width: 420px;
        border: 1px solid rgba(207, 17, 27, 1);
        padding: 18px 0 18px 18px;
      }
      .content {
        margin-bottom: 20px;
      }
    }
    .contentLeft {
      width: 600px;
      .chainWapper:last-child {
        margin-bottom: 0;
      }
    }
    .contentCenter {
      width: 36px;
      margin: 0 26px 0 47px;
      img {
        width: 36px;
        height: 36px;
      }
    }
    .contentRight {
      width: 432px;
      .childTitle {
        margin: 0px 6px 0 56px;
      }

      .chainWapper {
        min-width: 326px;
        margin-bottom: 0;
      }
      .chinaChildWapper {
        width: 236px;
        min-width: 236px;
        border: 1px solid rgba(207, 17, 27, 1);
        padding: 18px 0 18px 18px;
      }
    }
  }
}
</style>