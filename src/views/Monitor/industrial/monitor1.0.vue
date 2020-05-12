<template>
  <div id="monitor">
    <div id="C_content">
      <div class="C_title">{{Base64.decode(this.$route.query.title)}}</div>
      <keep-alive>
        <component v-bind:is="tabView"></component>
      </keep-alive>
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
import monitor0 from "../../../components/monitor/monitor0";
import monitor1 from "../../../components/monitor/monitor1";
import monitor2 from "../../../components/monitor/monitor2";
import monitor3 from "../../../components/monitor/monitor3";
import monitor4 from "../../../components/monitor/monitor4";
import monitor5 from "../../../components/monitor/monitor5";
import monitor6 from "../../../components/monitor/monitor6";
import monitor7 from "../../../components/monitor/monitor7";
import monitor8 from "../../../components/monitor/monitor8";
import monitor9 from "../../../components/monitor/monitor9";
import monitor10 from "../../../components/monitor/monitor10";
import monitor11 from "../../../components/monitor/monitor11";
import monitor12 from "../../../components/monitor/monitor12";
import monitor13 from "../../../components/monitor/monitor13";
import monitor14 from "../../../components/monitor/monitor14";
import monitor15 from "../../../components/monitor/monitor15";
import monitor16 from "../../../components/monitor/monitor16";
import monitor17 from "../../../components/monitor/monitor17";
import monitor18 from "../../../components/monitor/monitor18";
import monitor19 from "../../../components/monitor/monitor19";
import monitor20 from "../../../components/monitor/monitor20";
import monitor21 from "../../../components/monitor/monitor21";
import monitor22 from "../../../components/monitor/monitor22";
import monitor23 from "../../../components/monitor/monitor23";
import monitor24 from "../../../components/monitor/monitor24";
import monitor25 from "../../../components/monitor/monitor25";
import monitor26 from "../../../components/monitor/monitor26";
import monitor27 from "../../../components/monitor/monitor27";
import monitor28 from "../../../components/monitor/monitor28";
import monitor29 from "../../../components/monitor/monitor29";
import monitor30 from "../../../components/monitor/monitor30";
import monitor31 from "../../../components/monitor/monitor31";
import monitor32 from "../../../components/monitor/monitor32";
import monitor33 from "../../../components/monitor/monitor33";
import monitor34 from "../../../components/monitor/monitor34";
import monitor35 from "../../../components/monitor/monitor35";
import monitor36 from "../../../components/monitor/monitor36";
import monitor37 from "../../../components/monitor/monitor37";
import monitor38 from "../../../components/monitor/monitor38";
import monitor39 from "../../../components/monitor/monitor39";
import monitor40 from "../../../components/monitor/monitor40";
import monitor41 from "../../../components/monitor/monitor41";
import monitor42 from "../../../components/monitor/monitor42";
import monitor43 from "../../../components/monitor/monitor43";
import monitor44 from "../../../components/monitor/monitor44";
import monitor45 from "../../../components/monitor/monitor45";
import monitor46 from "../../../components/monitor/monitor46";
import monitor47 from "../../../components/monitor/monitor47";
import monitor48 from "../../../components/monitor/monitor48";
import monitor49 from "../../../components/monitor/monitor49";
import monitor50 from "../../../components/monitor/monitor50";
import monitor51 from "../../../components/monitor/monitor51";
import monitor52 from "../../../components/monitor/monitor52";
import monitor53 from "../../../components/monitor/monitor53";
import monitor54 from "../../../components/monitor/monitor54";
import monitor55 from "../../../components/monitor/monitor55";
import monitor56 from "../../../components/monitor/monitor56";
import monitor57 from "../../../components/monitor/monitor57";
import monitor58 from "../../../components/monitor/monitor58";
import monitor59 from "../../../components/monitor/monitor59";
import monitor60 from "../../../components/monitor/monitor60";
import monitor61 from "../../../components/monitor/monitor61";
import monitor62 from "../../../components/monitor/monitor62";
import monitor63 from "../../../components/monitor/monitor63";
import monitor64 from "../../../components/monitor/monitor64";
import monitor65 from "../../../components/monitor/monitor65";
import monitor66 from "../../../components/monitor/monitor66";
import monitor67 from "../../../components/monitor/monitor67";
import monitor68 from "../../../components/monitor/monitor68";
import monitor69 from "../../../components/monitor/monitor69";
import monitor70 from "../../../components/monitor/monitor70";
import monitor71 from "../../../components/monitor/monitor71";
import monitor72 from "../../../components/monitor/monitor72";
import monitor73 from "../../../components/monitor/monitor73";
import monitor74 from "../../../components/monitor/monitor74";
import monitor75 from "../../../components/monitor/monitor75";
import monitor76 from "../../../components/monitor/monitor76";
import monitor77 from "../../../components/monitor/monitor77";
import monitor78 from "../../../components/monitor/monitor78";
import monitor79 from "../../../components/monitor/monitor79";
import monitor80 from "../../../components/monitor/monitor80";
import monitor81 from "../../../components/monitor/monitor81";
import monitor82 from "../../../components/monitor/monitor82";
import monitor83 from "../../../components/monitor/monitor83";
import monitor84 from "../../../components/monitor/monitor84";
import monitor85 from "../../../components/monitor/monitor85";
import monitor86 from "../../../components/monitor/monitor86";
import monitor87 from "../../../components/monitor/monitor87";
import monitor88 from "../../../components/monitor/monitor88";
import monitor89 from "../../../components/monitor/monitor89";
import monitor90 from "../../../components/monitor/monitor90";
import monitor91 from "../../../components/monitor/monitor91";
import monitor92 from "../../../components/monitor/monitor92";
import monitor93 from "../../../components/monitor/monitor93";
import monitor94 from "../../../components/monitor/monitor94";

export default {
  components: {
    monitor0,
    monitor1,
    monitor2,
    monitor3,
    monitor4,
    monitor5,
    monitor6,
    monitor7,
    monitor8,
    monitor9,
    monitor10,
    monitor11,
    monitor12,
    monitor13,
    monitor14,
    monitor15,
    monitor16,
    monitor17,
    monitor18,
    monitor19,
    monitor20,
    monitor21,
    monitor22,
    monitor23,
    monitor24,
    monitor25,
    monitor26,
    monitor27,
    monitor28,
    monitor29,
    monitor30,
    monitor31,
    monitor32,
    monitor33,
    monitor34,
    monitor35,
    monitor36,
    monitor37,
    monitor38,
    monitor39,
    monitor40,
    monitor41,
    monitor42,
    monitor43,
    monitor44,
    monitor45,
    monitor46,
    monitor47,
    monitor48,
    monitor49,
    monitor50,
    monitor51,
    monitor52,
    monitor53,
    monitor54,
    monitor55,
    monitor56,
    monitor57,
    monitor58,
    monitor59,
    monitor60,
    monitor61,
    monitor62,
    monitor63,
    monitor64,
    monitor65,
    monitor66,
    monitor67,
    monitor68,
    monitor69,
    monitor70,
    monitor71,
    monitor72,
    monitor73,
    monitor74,
    monitor75,
    monitor76,
    monitor77,
    monitor78,
    monitor79,
    monitor80,
    monitor81,
    monitor82,
    monitor83,
    monitor84,
    monitor85,
    monitor86,
    monitor87,
    monitor88,
    monitor89,
    monitor90,
    monitor91,
    monitor92,
    monitor93,
    monitor94,
   
  },
  data() {
    return {
      tabView: "monitor1",
      name:"",
    };
  },
  mounted() {
    var self=this
      // console.log(JSON.stringify(self.$route.query.num) )
      self.tabView="monitor" + Base64.decode(self.$route.query.num)
      setTimeout(function(){
        self.click();
      },100)

  },
  methods: {
    click() {
      var self = this;
      var lists = document.getElementsByTagName("image");
       for (let i = 0; i < lists.length; i++) {
          let img = document.getElementsByTagName("image")[i];
        img.setAttribute( "xlink:href", require("../../../styles/imagesRed/h"+ self.sum(1,100) +".png")
        );
       }
      var list = document.getElementsByClassName("industry-link");
      for (let i = 0; i < list.length; i++) {
        var lists = document.getElementsByClassName("industry-link")[i];
        lists.style.cursor = "pointer";
        lists.addEventListener("click", function() {
          // console.log(i);
          let child = this.getElementsByTagName("text")[0];
          // console.log(child.innerHTML);
           let href  = self.$router.resolve({
            path: "monitorDetail",
            query: { 
              num: Base64.encode(i),
              title:Base64.encode(child.innerHTML) 
            }
          });

          window.open(href.href, "_blank");
        });
      }
      var hotCyl = document.getElementsByClassName("hotCyl");
      for (let i = 0; i < hotCyl.length; i++) {
        let lists = document.getElementsByClassName("hotCyl")[i];
        lists.addEventListener("click", function() {
          // console.log(i);
          let child = this.getElementsByTagName("span")[0];
          // console.log(child.innerHTML);
           let href  = self.$router.resolve({
            path: "monitorDetail",
            query: { 
              num: Base64.encode(i),
              title:Base64.encode(child.innerHTML) 
            }
          });

          window.open(href.href, "_blank");
        });
      }

    },
    sum(m, n) {
      var num = Math.floor(Math.random() * (m - n) + n);
      return num
    },
  }
};
</script>
