<template>
  <div id="monitor">
    <div id="C_content" class="Monitoring">
      <div class="C_title"><span class="Title_left"></span>
        {{Base64.decode(this.$route.query.title)}}
        <!-- <button class="rtPark" @click="rtPark">返回</button> -->
         <el-button class="rtPark" @click="rtPark"  type="primary">返回</el-button>
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
                  >
                    {{itemChilds.chanye}}
                  </li>
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
      monitorChild:[]
    };
  },
  mounted() {
    var self = this;
    self.getMonitor();
    // self.click()
  },
  methods: {
    //   click() {
    //   var self = this;
    //   var list = document.getElementsByClassName("hotCyls");
    //   for (let i = 0; i < list.length; i++) {
    //     var lists = document.getElementsByClassName("hotCyls")[i];
    //     lists.style.cursor = "pointer";
    //     let img = lists.getElementsByTagName("img")[0];
    //     console.log(img,'123')
    //     img.setAttribute(
    //       "src",
    //       require("../../../styles/imagesRed/h" + self.sum(1, 100) + ".png")
    //     );
    //   }
    // },
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
        self.monitorChild = res.data.data;
      });
    }
  }
};
</script>
<style lang="scss">
#monitor{
   border: 1px solid #fff;
  border-radius: 6px;
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
       .childTitle{
          font-weight: bold;
        }
      .chinaChildWapper {
        padding: 18px 0 18px 18px;
      }
    }
  }
}

.rtPark {
  float: right;
  margin-top: 12px;
}

</style>
