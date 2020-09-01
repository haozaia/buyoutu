<template>
  <div id="HOME_H">
    <div :class="[longleftrotateY==0?'imgblock':'imgnone']" class="long_left"><img src="../assets/images/Login/login_left.png" alt=""></div>
    <div :class="[longleftrotateY==0?'imgblock':'imgnone']" class="long_right"><img src="../assets/images/Login/login_right.png" alt=""></div>
    <div class="HOME_PMD">
      <div id="LB_PMD" class="LB_PMD" data-appended="appended">
        <ul id="LB_PMD_ul" class="LB_PMD_ul">
          <li v-for="(item,index) in arr1" :key="index" :class="item.zhangdie <= 0 ? 'bg1': 'bg2'">
            <p @click="godetails(item.name)" class="fontSize22">{{ item.name }}</p>
            <span class="fontSize20">{{ item.tag }}&nbsp;&nbsp;</span>
            <!-- <span class="fontSize20">{{ item.zhangdie }}%</span> -->
          </li>
        </ul>
      </div>
      <div id="copy_LBPMD"></div>
      <keep-alive>
        <component v-bind:is="tabView"></component>
      </keep-alive>
      <div style="margin-top:10px" id="Home">
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
          <li @click="duziqiye" class="home-t">
            <img src="../assets/images/icon6.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">企业建设 行业标杆</p>
              <p class="tep color3 fontSize20">外资企业</p>
            </div>
          </li>
          <li @click="wstzqiye" class="home-t">
            <img src="../assets/images/icon10.svg"/>
            <div class="home-r">
              <p class="color82 fontSize18">合资企业 应有尽有</p>
              <p class="tep color3 fontSize20">合资企业</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
@import "../assets/css/home.scss";
.imgblock{
  display: block;
}
.imgnone{
  display: none;
}
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
      arr1: [],
      longleftrotateY:'',
    };
  },
  watch: {},
  mounted() {
    this.longleftrotateY = localStorage.getItem("longleftrotateY")
    window.onscroll = function () {
      document.getElementsByClassName("long_left")[0].style.display = "none"
      document.getElementsByClassName("long_right")[0].style.display = "none"
      // console.log("gundong")
    }
    if(localStorage.getItem("longleftrotateY") == 0){
      this.loginact()
    }
    this.market()
    this.marquee()
    this.userRole = localStorage.getItem("userRole");
    // this.getNews();  //HTTPS
    const user = this.userRole;
    if (user == "S") {
      // this.Mgaoguantt();
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
    loginact() {
      document.querySelector(".long_left").style.transform = 'rotateY(-90deg)'
      document.querySelector(".long_right").style.transform = 'rotateY(-90deg)'
      setTimeout(()=>{
        localStorage.setItem("longleftrotateY", 1);
        this.longleftrotateY = localStorage.getItem("longleftrotateY")
      },1000)
    },
    market() {
      this.axios({
        url:this.api.tuijianLunbo,
        method:'post'
      }).then(res =>{
        var arr1 = []
        console.log(res.data.data)
          for (var i=0;i<res.data.data.length;i++){
            var datas={}
            datas.name = res.data.data[i].name
            datas.tag = res.data.data[i].tag
            arr1.push(datas)
            // console.log(arr)
          }
        
        console.log(arr1,"888")
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
    godetails(val){
      var self = this
      let routeUrl = self.$router.resolve({
        path: "/CompanyDetails",  
        query: { name: Base64.encode(val) }
      });
      window.open(routeUrl.href, "_blank");
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
    duziqiye() {
      this.$store.state.NavMenu = "home"
      localStorage.setItem("NavMenu", "home")
      this.$router.push("/Soleproprietorship")
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
