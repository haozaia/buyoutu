<template>
  <div id="HOME_H">
    <div :class="[longleftrotateY==0?'imgblock':'imgnone']" class="long_left"><img src="../assets/images/Login/login_left.png" alt=""></div>
    <div :class="[longleftrotateY==0?'imgblock':'imgnone']" class="long_right"><img src="../assets/images/Login/login_right.png" alt=""></div>
    <div class="HOME_PMD">
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

      //8.29股票
      Gupiao: [ {
                "name" : "var hq_str_s_sh000001=\"上证指数,3403.8066,53.6938,1.60,2713255,37936705\";\n"
              }, {
                "name" : "var hq_str_s_sz399001=\"深证成指,13851.32,316.233,2.34,441224941,56847906\";\n"
              }, {
                "name" : "var hq_str_s_sz399006=\"创业板指,2757.84,68.668,2.55,31648941,8067730\";\n"
              }, {
                "name" : "var hq_str_s_sz399005=\"中小板指,9269.86,199.418,2.20,32732348,7274095\";\n"
              }, {
                "name" : "var hq_str_s_sh000905=\"中证500,6691.2096,112.4184,1.71,1419495,15587861\";\n"
              }, {
                "name" : "var hq_str_s_sh000300=\"沪深300,4844.2652,112.9201,2.39,1593997,30504788\";\n"
              }, {
                "name" : "var hq_str_int_hangseng=\"恒生指数,25422.06,140.91,0.56\";\n"
              }, {
                "name" : "var hq_str_int_dji=\"道琼斯,28653.87,161.60,0.57\";\n"
              }, {
                "name" : "var hq_str_int_nasdaq=\"纳斯达克,11695.63,70.30,0.60\";\n"
              }, {
                "name" : "var hq_str_b_TWSE=\"台湾台北指数,12728.85,-68.46,-0.54,1:49 AM,13:49:00\";\n"
              }, {
                "name" : "var hq_str_b_FSSTI=\"富时新加坡海峡时报指数,2539.63,19.82,0.79,5:20 AM,17:20:00\";\n"
              }, {
                "name" : "var hq_str_int_nikkei=\"日经指数,22882.65,-326.21,-1.41\";\n"
              } ]
      //8.29股票
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
    // //查询落地项目
    // Mgaoguantt() {
    //   var self = this;
    //   let params = {
    //     limit: 2
    //   };
    //   this.axios({
    //     url: this.api.luodilistapiList,
    //     method: "post",
    //     data: this.$qs.stringify(params),
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   }).then(res => {
    //     self.newsDate = res.data.data;
    //     // console.log(self.newsDate);
    //   });
    // },



    //8.29股票
    market() {
      var self = this
        var arr1 = []
        // console.log(res.data.data)
        for(var j=0;j<10;j++){
          for (var i=0;i<self.Gupiao.length;i++){
            var str2 = self.Gupiao[i].name
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
    },
    //8.29股票





    // market() {
    //   this.axios({
    //     url:this.api.zhishu,
    //     method:'post'
    //   }).then(res =>{
    //     var arr1 = []
    //     // console.log(res.data.data)
    //     for(var j=0;j<10;j++){
    //       for (var i=0;i<res.data.data.length;i++){
    //         var str2 = res.data.data[i].name
    //         var arr = str2.split('"')[1].split(',')
    //         var datas={}
    //         var num = Number(arr[1])
    //         datas.zhishu = arr[0]
    //         datas.dianshu = num.toFixed(2)
    //         datas.zhangdie = arr[3]
    //         arr1.push(datas)
    //         // console.log(arr)
    //     }
    //     }
        
    //     console.log(arr1[6],"888")
    //     this.arr1 = arr1
    //   })
    // },
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
