<template>
  <div id="HOME_H">
    <div class="HOME_PMD">
      <!-- <div class="PMD">
        <marquee behavior="behavior" width="100%" loop="-1" onMouseOut="this.start()" onMouseOver="this.stop()">
          <ul >
            <li  v-for="(item,index) in newsDate" :key="index" style="display:inline-block;padding: 0 20px;">
             <a style="display:list-item;list-style-type: disc;"  target="_blank" :href="item.beizhu1">{{item.xiangmubt+ '在' + item.luodidq +'落地！'}}</a>
           </li>
          </ul>
        </marquee>
      </div> -->
      <div id="LB_PMD" class="LB_PMD" data-appended="appended">
        <ul id="LB_PMD_ul" class="LB_PMD_ul">
          <li v-for="(item,index) in arr1" :key="index" :class="item.zhangdie <= 0 ? 'bg1': 'bg2'">
            <p class="fontSize22">{{ item.zhishu }}</p>
            <span class="fontSize20">{{ item.dianshu }}&nbsp;&nbsp;</span>
            <span class="fontSize20">{{ item.zhangdie }}%</span>
          </li>
        </ul>
      </div>
      <div id="copy_LBPMD"></div>
      <div id="Home">
        <ul>
          <li @click="hyjiankong" class="home-t">
            <img src="../assets/images/icon2.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">热门行业 一目了然</p>
              <p class="tep color3 fontSize20">行业监控</p>
            </div>
          </li>
          <li @click="cyljiankong" class="home-t">
            <img src="../assets/images/icon1.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">产业总览 精准分类</p>
              <p class="tep color3 fontSize20">产业链监控</p>
            </div>
          </li>
          <li @click="qyjiankong" class="home-t">
            <img src="../assets/images/icon5.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">区域监控  精准高效</p>
              <p class="tep color3 fontSize20">区域监控</p>
            </div>
          </li>
          <li @click="cylditu" class="home-t">
            <img src="../assets/images/icon3.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">四维分析 专业精准</p>
              <p class="tep color3 fontSize20">产业地图</p>
            </div>
          </li>
          <li @click="yqjiankong" class="home-t">
            <img src="../assets/images/icon4.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">精准位置  全面监控</p>
              <p class="tep color3 fontSize20">园区监控</p>
            </div>
          </li>
        </ul>
          <ul>
          <li @click="techindustry" class="home-t">
            <img src="../assets/images/icon9.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">自主创新  持续创新</p>
              <p class="tep color3 fontSize20">高新技术企业</p>
            </div>
          </li>
          <li @click="bzzhiding" class="home-t">
            <img src="../assets/images/icon6.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">企业建设 行业标杆</p>
              <p class="tep color3 fontSize20">标准制定企业</p>
            </div>
          </li>
          <li @click="zyqiye" class="home-t">
            <img src="../assets/images/icon7.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">战略行业 国家把控</p>
              <p class="tep color3 fontSize20">央企</p>
            </div>
          </li>
          <li @click="gyqiye" class="home-t">
            <img src="../assets/images/icon8.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">行业趋势 国企引领</p>
              <p class="tep color3 fontSize20">国有企业</p>
            </div>
          </li>
          <li @click="wstzqiye" class="home-t">
            <img src="../assets/images/icon10.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">合资独资 应有尽有</p>
              <p class="tep color3 fontSize20">外商投资企业</p>
            </div>
          </li>
        </ul>
      </div>
      <keep-alive>
        <component v-bind:is="tabView"></component>
      </keep-alive>
    </div>
  </div>
</template>


<style lang="scss">
@import "../assets/css/home.scss";
</style>

<script>
import mapline from "../../src/components/MapLine/maplineNew";

export default {
  name: "Home",
  components: {
    mapline
  },
  data() {
    return {
      userRole: "",
      tabView: "mapline",
      newsDate: [],
      arr1: []
    };
  },
  watch: {},
  mounted() {
    this.market()
    this.marquee()
    this.userRole = localStorage.getItem("userRole");
    // this.getNews();  //HTTPS
    const user = this.userRole;
    if (user == "S") {
      this.Mgaoguantt();
      // this.$router.push("/home");
    } else if (user == "A") {
      this.$router.push("/qyh");
    } else if (user == "B") {
      this.$router.push("/jrh");
    } else if (user == "C") {
      this.$router.push("/zfh");
    }
  },
  methods: {
    //查询落地项目
    Mgaoguantt() {
      var self = this;
      let params = {
        limit: 2
      };
      this.axios({
        url: this.api.luodilistapiList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.newsDate = res.data.data;
        // console.log(self.newsDate);
      });
    },
    market() {
      this.axios({
        url:this.api.zhishu,
        method:'post'
      }).then(res =>{
        var arr1 = []
        // console.log(res.data.data)
        for(var j=0;j<10;j++){
          for (var i=0;i<res.data.data.length;i++){
            var str2 = res.data.data[i].name
            var arr = str2.split('"')[1].split(',')
            var datas={}
            var num = Number(arr[1])
            datas.zhishu = arr[0]
            datas.dianshu = num.toFixed(2)
            datas.zhangdie = arr[3]
            arr1.push(datas)
            // console.log(arr)
        }
        }
        
        console.log(arr1[6],"888")
        this.arr1 = arr1
      })
    },
    marquee() {
      var PMD = document.getElementById('LB_PMD');
      var PMD_ul = document.getElementById('LB_PMD_ul');
      var timer = window.setInterval(function () {
        var curLeft = PMD.scrollLeft;
        PMD.scrollLeft = curLeft + 3;
        var newLeft = PMD.scrollLeft;
        if (curLeft === newLeft){
          PMD.scrollLeft = 0;
        }
      },100)
    },
    cyljiankong() {
       this.$store.state.NavMenu = "Monitoring"
      localStorage.setItem("NavMenu", "Monitoring")
      this.$router.push("/Monitoring")
    },
    hyjiankong() {
      this.$store.state.NavMenu = "industryMonitoring"
      localStorage.setItem("NavMenu", "industryMonitoring")
      this.$router.push("/industryMonitoring")
    },
    cylditu() {
      this.$store.state.NavMenu = "chainMap"
      localStorage.setItem("NavMenu", "chainMap")
      this.$router.push("/chainMap")
    },
    yqjiankong() {
      this.$store.state.NavMenu = "Park"
      localStorage.setItem("NavMenu", "Park")
      this.$router.push("/Park")
    },
    qyjiankong() {
      this.$store.state.NavMenu = "areaMonitoring"
      localStorage.setItem("NavMenu", "areaMonitoring")
      this.$router.push("/areaMonitoring")
    },
    techindustry() {
      this.$store.state.NavMenu = "techindustry"
      localStorage.setItem("NavMenu", "techindustry")
      this.$router.push("/techindustry")
    },
    bzzhiding() {
      this.$store.state.NavMenu = "6-2"
      localStorage.setItem("NavMenu", "6-2")
      this.$router.push("/standardsetting")
    },
    zyqiye() {
      this.$store.state.NavMenu = "home"
      localStorage.setItem("NavMenu", "home")
      this.$router.push("/CentralEnterprises")
    },
    gyqiye() {
      this.$store.state.NavMenu = "home"
      localStorage.setItem("NavMenu", "home")
      this.$router.push("/StateEnterprise")
    },
    wstzqiye() {
      this.$store.state.NavMenu = "home"
      localStorage.setItem("NavMenu", "home")
      this.$router.push("/foreigninvestment")
    },
    // distributionMap() {
    //   this.$store.state.NavMenu = "home"
    //   localStorage.setItem("NavMenu", "home")
    //   this.$router.push("/distributionMap")
    // },
    // government() {
    //   this.$store.state.NavMenu = "6-1"
    //   localStorage.setItem("NavMenu", "6-1")
    //   this.$router.push("/government")
    // },
  }
};
</script>
