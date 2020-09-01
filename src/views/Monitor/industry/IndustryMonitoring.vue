<template>
  <div id="C_content">
    <!-- 查询 -->
    <div class="C_title hangyeTitle">
      <span class="Title_left"></span>行业监控
      <div class="search_r">
        <el-input class="fontSize20 Search_Entry_Div Search_Entry_input" v-model="hyvalue" clearable placeholder="请输入行业关键词"></el-input>
        <el-button @click="hysearch" type="primary">查询</el-button>
      </div>
    </div>
    <div class="OneclassList">
      <!-- <a :href="'#active'+index" class="OneClass color3 fontSize20" v-for="(item,index) in arr" :key="index">{{ item }}</a> -->
      <a @click="changeHash('#active'+index)" class="OneClass color3 fontSize22" v-for="(item,index) in TopList" :key="index">{{ item }}</a>
      <i @click="changeHash('#active'+16)" class="fontSize22 OneclassListTei">其它</i>
    </div>
    <div class="cylx" v-if="hhh">
      <!-- <ul class="cylx_ul">
        <li :id="'active'+index" v-for="(item,index) in arr" :key="index" class="cylx_li">
          <div class="cylx-left colorFA">
            <i class="son fontSize20">{{ item }}</i>
          </div>
          <div class="cylx-right">
            <ul>
              <li class="teli" v-for="(item2,index) in arr1[index]" :key="index">
                <img src alt />
                <p class="tep fontSize20 color3">{{ item2 }}</p>
              </li>
            </ul>
          </div>
        </li>
      </ul> -->
      <!-- 循环div，div内头部P标签赋值一级行业，内层ul li  将li进行循环赋值二级行业 -->
      
      <!-- <div class="Hangye_box" :id="'active'+index" v-for="(item,index) in arr" :key="index">
        <div class="Hangye_icons">
          <img class="Hangye_img" src="../../../assets/images/Hangye_red.png" alt="">
          <img class="Hangye_icon" :src='"../../../assets/images/IndustryIcon/IndustryIcon"+add(index<33? index : Math.floor(Math.random()*33)) +".svg"' :onerror="errorImg01"  alt="">
        </div>
        <i class="Hangye_i fontSize22 colorH">{{ item }}</i>
        <ul class="Hangye_ul">
          <li @click="Hangye_li_click(item2)" class="Hangye_li fontSize20" v-for="(item2,index) in arr1[index]" :key="index">{{ item2 }}
            <div v-if="item3[0] == '2'" class="subdivide" v-for="(item3,index) in arrFlag[index]" :key="index">
              <p>{{ SanJiHangYe[index].sanjihy }}</p>
            </div>
          </li>
        </ul>
      </div> -->

      <div class="Hangye_box" :id="'active'+index" v-for="(item,index) in result" :key="index">
        <div class="Hangye_icons">
          <img class="Hangye_img" src="../../../assets/images/Hangye_red.png" alt="">
          <img class="Hangye_icon" :src='"../../../assets/images/IndustryIcon/IndustryIcon"+add(index<33? index : Math.floor(Math.random()*33)) +".svg"' :onerror="errorImg01"  alt="">
        </div>
        <i class="Hangye_i fontSize22 colorH">{{ item.name }}</i>
        <ul class="Hangye_ul">
          <li @click="Hangye_li_click(_item.erjihy,_item.flag)" class="Hangye_li fontSize20" v-for="(_item,_index) in item.value" :key="_index">
            {{ _item.erjihy }}
            <div class="subdivide" v-if=" _item.flag == '2'">
              <p class="sub_p" @click.stop="Hangye_li_click(__item)" v-for="(__item,__index) in _item.sanjihy" :key="__index">{{__item}}</p>
            </div>
          </li>
        </ul>
      </div>


      <div style="width:1px;height:1px"></div>
    </div>
    <div class="hysearch" v-else>
      <ul class="hysearchUl">
        <li v-for="(item,index) in searchArr" :key="index" class="hysearchLi teli">
          <img src alt />
          <p class="tep">{{ item }}</p>
        </li>
      </ul>
    </div>
    <div v-show="Go_Top" class="Top_radius">
      <a href="javascript:window.scrollTo(0,0)"><img class="Top" src="../../../assets/images/gotop.svg" alt=""></a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ceshi: false,
      arr: [],
      arr1: [],
      arrFlag: [],
      result:[],
      // SanJiHangYe: [],
      // rm1: [],
      // rm2: [],
      // rmname1: [],
      // rmname2: [],
      hyvalue: "",
      hhh: true,
      searchArr: [],
      Go_Top: false,
      TopList:"",
      errorImg01: 'this.src="' + require('../../../assets/images/IndustryIcon/IndustryIcon1.svg') + '"'
    };
  },
  mounted() {
    this.IndustryMonitoring();
    this.TopIndustry()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    add(index){
      // console.log(index+1)
      return index+1;
    },
    handleScroll () {
      let scrollY = document.documentElement.scrollTop
      if (scrollY > 600) {
        this.Go_Top = true
        } else {
        this.Go_Top = false
      }
    },
    TopIndustry() {
      this.axios({
        url: this.api.IndustryTop,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res)
        this.TopList = res.data.data
      })
    },
    Hangye_li_click(value,flag) {
      if(flag == 2) return
      // console.log(value)
      var self = this
      self.$router.push({
        path: "/monitorDetail",
        query: { title: Base64.encode(value) }
      });
    },
    changeHash(idName) {
      document.querySelector(idName).scrollIntoView(true);
      document.documentElement.scrollTop = document.documentElement.scrollTop-110
      // console.log(idName)
    },
    IndustryMonitoring() {
      var self = this;
      this.axios({
        url: this.api.IndustryMonitoring,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data)
        this.result = res.data.data
        // console.log(res.data.data[0].name)
        // this.rmname1 = res.data.data[0].name
        // this.rmname2 = res.data.data[1].name
        // this.rm1 = res.data.data[0].value
        // this.rm2 = res.data.data[1].value
        // var arr = [];
        // var arr1 = [];
        // var arrFlag = [];
        // var SanJiHangYe = [];
        // res.data.data.forEach(item=>item.value.forEach(_item=>SanJiHangYe.push(_item.sanjihy[0])))
        // console.log( SanJiHangYe )
        // console.log("%c","background:#f00;color:#fff;font-size:30px;");
        // 这代码就像诗一样
        // for (let i = 0; i < res.data.data.length; i++) {
        //   let str = res.data.data[i].name;
        //   arr.push(str);
        //   var arr2 = [];
        //   var arr3 = [];
        //   var there1 = [];
        //   // var arr4 = [];
        //   for (let j = 0; j < res.data.data[i].value.length; j++) {
        //     let haha = res.data.data[i].value[j].erjihy;
        //     let flag = res.data.data[i].value[j].flag;
        //     let there = res.data.data[i].value[j]
        //     arr2.push(haha);
        //     arr3.push(flag);
        //     there1.push(there);
        //     // var arr4 = []
        //     // arr4.push(arr4)
        //     // for (let s = 0; s < res.data.data[i].value[j].sanjihy.length; s++){
        //     //   let SanJiHangYe = res.data.data[i].value[j].sanjihy[s]
        //     //   arr4.push(SanJiHangYe)
        //     // }
        //   }
        //   arr1.push(arr2);
        //   arrFlag.push(arr3);
        //   SanJiHangYe.push(there1);
        //   // SanJiHangYe.push(arr4);
        // }
        // console.log(SanJiHangYe,"SanJiHangYe")
        // for(let i = 0; i< SanJiHangYe.sanjihy.length; i++){
        //   let threeHangye = SanJiHangYe.sanjihy[i].value
        //   console.log(threeHangye,"threeHangye")
        // }
        // this.arr = arr;
        // this.arr1 = arr1;
        // this.arrFlag = arrFlag;
        // this.SanJiHangYe = SanJiHangYe;
        // console.log(this.arrFlag,"this.arrFlag")
        // console.log(this.SanJiHangYe,"this.SanJiHangYe")
        setTimeout(function() {
          self.click();
        }, 200);
      });
    },
    click() {
      var self = this;
      var list = document.getElementsByClassName("teli");
      for (let i = 0; i < list.length; i++) {
        var lists = document.getElementsByClassName("teli")[i];
        lists.style.cursor = "pointer";
        let img = lists.getElementsByTagName("img")[0];
        img.setAttribute(
          "src",
          require("../../../styles/imagesRed/h" + self.sum(1, 100) + ".png")
        );
        lists.addEventListener("click", function() {
          let child = this.getElementsByClassName("tep")[0];
          self.$router.push({
          path: "/monitorDetail",
          query: { title: Base64.encode(child.innerHTML) }
        });
        });
      }
    },
    sum(m, n) {
      var num = Math.floor(Math.random() * (m - n) + n);
      return num;
    },
    hysearch() {
      var self = this;
      if(self.hyvalue == ''){
        this.$message.error("请输入行业关键词")
      }else{
        this.$router.push({
          path: "/IndustrySearch",
          query: { hyvalue: Base64.encode(self.hyvalue) }
        });
      }

      // 不跳页面版
      // if (this.hyvalue == "") {
      //   this.hhh = true;
      //   setTimeout(function() {
      //     self.click();
      //   }, 200);
      // } else {
      //   this.hhh = false;
      //   let params = {
      //     name: this.hyvalue
      //   };
      //   this.axios({
      //     url: this.api.Industrychaxun,
      //     data: this.$qs.stringify(params),
      //     method: "post",
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     }
      //   }).then(res => {
      //     if (res.data.data.length === 0) {
      //       this.$message.error("所查信息为空");
      //     } else {
      //       var searchArr = [];
      //       for (let i = 0; i < res.data.data.length; i++) {
      //         let seArr = res.data.data[i].erjihy;
      //         searchArr.push(seArr);
      //       }
      //       this.searchArr = searchArr;
      //       setTimeout(function() {
      //         self.click();
      //       }, 200);
      //     }
      //   });
      // }
    }

  }
};
</script>

<style lang="scss">
// @import "../../../styles/Monitor/industry/css/IndustryMonitoring.scss";
// @import "../../../styles/css/Equitypledge.scss";
.hangyeTitle {
  position: relative;
  .search_r {
    position: absolute;
    right: 31px;
    top: 12px;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    .Ml10{
      width: 260px;
      margin-right: 10px;
    }
    .el-input__inner{
      height: 36px;
      line-height: 36px;
    }
    .search_r_c {
      display: inline-block;
      margin-left: 10px;
      height: 36px;
      width: 60px;
      border-radius: 4px;
      border: none;
    }
    .el-button{
      vertical-align: bottom;
    }
  }
}
.OneclassList{
  background: #fff;
  padding: 30px 30px 38px 30px;
  .OneclassListTei{
    font-weight: 600;
    margin: 0 12px;
  }
  .OneclassListTei:hover{
    cursor: pointer;
    color: #CF111B;
  }
  .OneClass{
    display: inline-block;
    margin: 0 12px;
    line-height: 36px;
    font-weight: 600;
  }
  .OneClass:hover{
    color: #CF111B;
    cursor: pointer;
  }
  .lefthangye{
    margin-left: -54px;
  }
}
.cylx {
    // min-height: 525px;
    background: #FFF;
    padding: 0 30px;
    .hot {
      width: 100%;
      display: flex;
      justify-content: center;
      ul {
        background: url(../../../styles/images/hot.png) no-repeat right top;
        background-size: 80px;
        margin: 20px 0;
        width: 600px;
        // padding: 0 10px 10px 10px;
        border-radius: 4px;
        box-shadow: 0 0 16px #666;
        text-align: center;
        .rmp {
          text-align: left;
        }
        span {
          line-height: 40px;
          margin-left: 20px;
          color: rgb(73, 71, 71);
          // font-size: 14px;
          display: block;
          font-weight: 600;
        }
        li {
          text-align: center;
          display: inline-block;
          height: 80px;
          img {
            display: inline-block;
            width: 40px;
            height: 40px;
          }
          p {
            // font-size: 14px;
            padding: 0 10px;
            color: #666;
          }
        }
      }
      .hot_rm1 {
        margin-right: 75px;
        
        .hot_li1 {
          width: 150px;
        }
      }
      .hot_rm2 {
        margin-left: 75px;
       
        .hot_li2 {
          width: 120px;
        }
      }
    }
    .cylx_ul {
      position: relative;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      .cylx_li {
        width: 100%;
        display: flex;
        border:1px solid rgba(207,17,27,1);
        // box-shadow: 0 0 16px #666;
        margin:15px 30px;
        border-radius: 6px;
        .cylx-left {
          width: 11%;
          // background: rgb(200, 200, 202);
          border-radius: 6px 0 0 6px;
          text-align: center;
          .son {
            position: relative;
            height: 100%;
            margin-top: -8px;
            color: #666;
            top: 50%;
            // font-size: 16px;
            font-weight: 600;
            display: list-item;
          }
        }
        .cylx-right {
          width: 100%;
          // background: #fff;
          ul {
            width: 100%;
              display: flex;
              flex-wrap: wrap;
            li {
              // height: 100%;
              width: 12.5%;
              border-bottom:1px solid rgba(233,233,233,1);
              text-align: center;
              // display: inline-block;
              
              padding: 30px 0;
              clear: both;
              img {
                display: inline-block;
                width: 40px;
                height: 40px;
                vertical-align: middle;
              }
              p {
                vertical-align: middle;
                color: #333;
                // font-size: 16PX;
                width: 84.97%;
                margin: 0 auto;
              }
            }
            li:hover p{
              color: #CF111B;
            }
          }
        }
      }
      // .cylx_li:nth-child(1){
      //     display: none;
      // }
      // .cylx_li:nth-child(2){
      //     display: none;
      // }
    }
    // 行业监控_New
    .Hangye_box{
      padding: 0 30px 15px 30px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      margin-bottom: 40px;
      position: relative;
      .Hangye_icons{
        top: -10px;
        position: absolute;
        .Hangye_img{
          width: 90px;
          height: 60px;
          // display: inline-block;
        }
        .Hangye_icon{
          width: 30px;
          height: 30px;
          position: absolute;
          top: 13px;
          left: 31px;
        }
      }
      .Hangye_i{
        font-weight: 600;
        margin-left: 107px;
        margin-top: 8px;
        display: inline-block;
      }
      .Hangye_ul{
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        padding-top: 30px;
        .Hangye_li{
          min-width: 10%;
          // width: 10%;
          border:1px solid rgba(240,242,245,1);
          border-radius:17px;
          text-align: center;
          color: #000;
          line-height: 31px;
          // min-height: 34px;
          margin: 0 10px 20px 10px;
          padding: 0 15px;

          .subdivide{
            display: none;
            z-index:4;
            position: absolute;
            min-width: 200px;
            background:#fff;
            box-shadow:0px 0px 6px 0px rgba(0,0,0,0.2);
            border-radius:4px;
            border: 1px solid #ccc;
            .sub_p{
              line-height: 30px;
              padding: 5px 10px;
              // min-width:200px;
              // float:left;
            }
            .sub_p:hover{
              color:#fff;
              background:#CF111B;
            }
          }
        }
        .Hangye_li:hover{
          color: #fff;
          background: #CF111B;
          cursor: pointer;;
          .subdivide{
            color: #000;
            display: block;
          }
        }
      }
    }
    
  }
#C_content{
  position: relative;
  .Top_radius{
      width: 60px;
      height: 60px;
      background: #F1EEEE;
      position: fixed;
      right: 60px;
      bottom: 100px;
      display:flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      .Top{
        display: block;
        width: 30px;
        height: 32px;
      }
    }
}
.hysearch{
    width: 100%;
    background: #fff;
    min-height: 518px;
    .hysearchUl{
        width: 100%;
        .hysearchLi{
            width: 12.5%;
            text-align: center;
            display: inline-block;
            padding: 10px 0;
            clear: both;
            img{
                display: inline-block;
                width: 40px;
                height: 40px;
            }
            p{
                color: #333;
                // margin: 10px 0;
                font-size: 16px;
            }
        }
        .hysearchLi:hover p{
          color:#CF111B;
        }
    }
}
</style>