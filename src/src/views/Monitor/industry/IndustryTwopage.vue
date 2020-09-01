<template>
    <div id="C_content">
        <!-- 查询 -->
        <div class="C_title hangyeTitle">
            <span class="Title_left"></span>行业监控
            <div class="search_r">
                <el-button @click="RtIndustry" type="primary">返回</el-button>
            </div>
        </div>
        <div class="Hangye_container">
            <div class="Hangye_box">
                <div class="Hangye_icons">
                    <img class="Hangye_img" src="../../../assets/images/Hangye_red.png" alt="">
                    <img class="Hangye_icon" src="../../../assets/images/IndustryIcon/IndustryIcon1.svg"  alt="">
                </div>
                <i class="Hangye_i fontSize22 colorH">{{ this.IndustryOne}} —— {{ this.IndustryTwo }}</i>
                <ul class="Hangye_ul">
                    <li @click="Hangye_li_click(item2)" class="Hangye_li fontSize20" v-for="(item2,index) in arr" :key="index">{{ item2 }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return{
            arr: [],
            IndustryOne: "",
            IndustryTwo: "",
        }
    },
    mounted() {
        var self = this
        self.IndustryOne = Base64.decode(this.$route.query.O);
        self.IndustryTwo = Base64.decode(this.$route.query.T);
        this.Hangyelist()
    },
    methods: {
        Hangyelist(){
            var self = this
            let params ={
                yijihy: self.IndustryOne,
                erjihy: self.IndustryTwo,
            }
            this.axios({
                url: this.api.IndustryTwoList,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res)
                self.arr = res.data.data
            })
        },
        Hangye_li_click(value) {
            var self = this
            self.$router.push({
                path: "/monitorDetail",
                query: { title: Base64.encode(value) }
            });
        },
        RtIndustry() {
            window.history.go(-1);
        }
    }
}
</script>
<style lang="scss">
.Hangye_container{
    padding: 30px;
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
        justify-content: center;
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

        }
        .Hangye_li:hover{
          color: #fff;
          background: #CF111B;
          cursor: pointer;;
        }
      }
    }
}
</style>