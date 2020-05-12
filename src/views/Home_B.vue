<template>
<div id="HOME_B">
  <div class="HOME_PMD">
  <div id="PMD" class="PMD" data-appended="appended">
    <ul id="PMD_ul" class="PMD_ul">
      <li v-for="(item,index) in arr1" :key="index" :class="item.zhangdie <= 0 ? 'bg1': 'bg2'">
        <p>{{ item.zhishu }}</p>
        <span>{{ item.dianshu }}&nbsp;&nbsp;</span>
        <span>{{ item.zhangdie }}%</span>
      </li>
    </ul>
  </div>
  <div id="Home">
    <ul class="Home_ul">
      <li v-if="userRole == 'A'|| userRole == 'S'">
        <img src="../assets/images/p16.png" alt="">
        <router-link to="/Monitoring" tag="p">产业链监控</router-link>
      </li>
      <li v-if="userRole == 'A'|| userRole == 'S'">
        <img src="../assets/images/p26.png" alt="">
        <router-link to="/industryMonitoring" tag="p">行业监控</router-link>
      </li>
      <li v-if="userRole == 'A'|| userRole == 'S'">
        <img src="../assets/images/p27.png" alt="">
        <router-link to="/areaMonitoring" tag="p">区域监控</router-link>
        <p></p>
      </li>
      <li v-if="userRole == 'A'|| userRole == 'S'">
        <img src="../assets/images/p1.png" alt="">
        <router-link to="/techindustry" tag="p">高新技术企业</router-link>
      </li>
      <li v-if="userRole == 'A'|| userRole == 'S'">
        <img src="../assets/images/p2.png" alt="">
        <router-link to="/government" tag="p">政府奖励企业</router-link>
      </li>
      <li v-if="userRole == 'A'|| userRole == 'S'">
        <img src="../assets/images/p3.png" alt="">
        <router-link to="/majorconstruction" tag="p">重大在建项目企业</router-link>
      </li>
      <li v-if="userRole == 'A'|| userRole == 'S'">
        <img src="../assets/images/p4.png" alt="">
        <router-link to="/specializedenterprises" tag="p">专项证照企业</router-link>
      </li>
      <li v-if="userRole == 'A'|| userRole == 'S'">
        <img src="../assets/images/p5.png" alt="">
        <router-link to="/standardsetting" tag="p">标准制定企业</router-link>
      </li>
      <li v-if="userRole == 'S'|| userRole == 'C'">
        <img src="../assets/images/p6.png" alt="">
        <router-link to="/localfinancing" tag="p">地方融资平台</router-link>
      </li>
      <li v-if="userRole == 'S'|| userRole == 'C'">
        <img src="../assets/images/p7.png" alt="">
        <router-link to="/investmentPlatform" tag="p">政府高新投资平台</router-link>
      </li>
      <li v-if="userRole == 'S'|| userRole == 'C'">
        <img src="../assets/images/p8.png" alt="">
        <router-link to="/guidanceFund" tag="p">政府产业引导基金</router-link>
      </li>
      <li v-if="userRole == 'B'">
        <img src="../assets/images/p9.png" alt="">
        <router-link to="/equitypledge" tag="p">股权质押</router-link>
      </li>
      <li v-if="userRole == 'B'">
        <img src="../assets/images/p10.png" alt="">
        <router-link to="/equityincentive" tag="p">股权激励</router-link>
      </li>
      <li v-if="userRole == 'B'">
        <img src="../assets/images/p11.png" alt="">
        <router-link to="/sharerepurchase" tag="p">股份回购</router-link>
      </li>
      <li v-if="userRole == 'B'">
        <img src="../assets/images/p12.png" alt="">
        <router-link to="/stockExchange" tag="p">美股中概股</router-link>
      </li>
      <li v-if="userRole == 'B'">
        <img src="../assets/images/p13.png" alt="">
        <router-link to="/ah" tag="p">A+H公司</router-link>
      </li>
      <li v-if="userRole == 'B'">
        <img src="../assets/images/p14.png" alt="">
        <router-link to="/hongKongGEM" tag="p">香港创业板转主板</router-link>
      </li>
      <li v-if="userRole == 'B'">
        <img src="../assets/images/p15.png" alt="">
        <router-link to="/hongKongRedChips" tag="p">香港红筹股</router-link>
      </li>
      <li v-if="userRole == 'B'">
        <img src="../assets/images/p17.png" alt="">
        <router-link to="/listedcompany" tag="p">三板拟挂牌公司</router-link>
      </li>
      <li v-if="userRole == 'B'">
        <img src="../assets/images/p20.png" alt="">
        <router-link to="/ipo" tag="p">启动IPO公司</router-link>
          </li>
          <li v-if=" userRole == 'B' ">
            <img src="../assets/images/p21.png" alt />
            <router-link to="/Declareipo" tag="p">申报IPO公司</router-link>
          </li>
          <li v-if="userRole == 'B'|| userRole == 'S'">
            <img src="../assets/images/p22.png" alt />
            <router-link to="/privatePlacement" tag="p">私募融资</router-link>
          </li>
          <li v-if="userRole == 'B'|| userRole == 'S'">
            <img src="../assets/images/p23.png" alt />
            <router-link to="/privateOfferingFund" tag="p">私募基金</router-link>
          </li>
          <li v-if="userRole == 'B'|| userRole == 'S'">
            <img src="../assets/images/p24.png" alt />
            <router-link to="/lp" tag="p">私募基金LP</router-link>
          </li>
          <li v-if="userRole == 'B' ">
            <img src="../assets/images/p25.png" alt />
            <router-link to="/parentfund" tag="p">母基金</router-link>
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
@import "../assets/css/B.scss";
</style>

<script>
import mapline from "../../src/components/MapLine/mapline_B";
export default {
  components: {
    mapline
  },
  data() {
    return {
      gushilist: [],
      userRole: "",
      tabView: "mapline",
      arr1: []
    };
  },
  mounted() {
    this.userRole = localStorage.getItem("userRole");
    const user=this.userRole
    if (user == "S") {
      this.$router.push("/home");
    } else if (user == "A") {
      this.$router.push("/qyh");
    } else if (user == "B") {
      this.$router.push("/jrh");
    } else if (user == "C") {
      this.$router.push("/zfh");
    }
    this.market()
    this.marquee()
  },
  methods: {
    market() {
      this.axios({
        url:this.api.zhishu,
        method:'post'
      }).then(res =>{
        var arr1 = []
        // console.log(res.data.data)
        for (var i=0;i<res.data.data.length;i++){
            var str2 = res.data.data[i].name
            var arr = str2.split('"')[1].split(',')
            var datas={}
            var num = Number(arr[1])
            datas.zhishu = arr[0]
            datas.dianshu = num.toFixed(2)
            datas.zhangdie = arr[3]
            arr1.push(datas)
            // console.log(datas)
        }
        this.arr1 = arr1
      })
    },
    marquee() {
      var PMD = document.getElementById('PMD');
      var PMD_ul = document.getElementById('PMD_ul');
      var timer = window.setInterval(function () {
        var curLeft = PMD.scrollLeft;
        PMD.scrollLeft = curLeft + 3;
        var newLeft = PMD.scrollLeft;
        if (curLeft === newLeft){
          PMD.scrollLeft = 0;
        }
      },100)
    }
  }
};
</script>
