<template>
  <!-- 行业监控——查询结果 -->
  <div id="C_content">
    <div class="C_title hangyeTitle">
      <span class="Title_left"></span>行业监控
      <div class="search_r">
        <el-input class="fontSize20 Search_Entry_Div Search_Entry_input" v-model="hyvalue" clearable placeholder="请输入行业关键词"></el-input>
        <el-button @click="hysearch" type="primary">查询</el-button>
        <el-button @click="Rtindustry" type="primary">返回</el-button>
      </div>
    </div>
    <div class="container">
      <div class="container_top">
        <div class="container_message fontSize20">
          <img src="../../../assets/images/Hangye_tishi.svg" alt />
          关键字“{{ this.Guanjianzi }}”已为您查询到
          <span class="colorH">{{ this.Returncount }} </span>个相关行业
        </div>
      </div>
      <div v-show="liebiao_show" class="container_bottom">
        <div class="Hangye_box">
          <div class="Hangye_icons">
            <img class="Hangye_img" src="../../../assets/images/Hangye_red.png" alt />
            <img class="Hangye_icon" src="../../../assets/images/Hangye_jieguo.svg" alt="">
          </div>
          <i class="Hangye_i fontSize22 colorH">搜索结果</i>
          <ul class="Hangye_ul">
            <li
              v-for="(item,index) in searchArr" :key="index"
              @click="Hangye_li_click(item)"
              class="Hangye_li fontSize20"
            >{{ item }}</li>
          </ul>
        </div>
      </div>
      <div v-show="hangyenull" class="Hangye_null fontSize20">{{ this.Hangyenull }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Guanjianzi: "", //获取关键字
      Returncount: "207", //获取总条数
      hyvalue: "", // 输入框model
      searchArr: [], //二级行业列表
      liebiao_show: false, //列表显示否
      Hangyenull: "换个关键词试试吧~",
      hangyenull: false //行业是否为空
    };
  },
  mounted() {
    var self = this
    self.Guanjianzi = Base64.decode(this.$route.query.hyvalue)
    self.hyvalue = Base64.decode(this.$route.query.hyvalue)
    this.hysearch()
  },
  methods: {
    //   二级行业点击
    Hangye_li_click(value) {
      // console.log(value)
      var self = this
      self.$router.push({
        path: "/monitorDetail",
        query: { title: Base64.encode(value) }
      });
    },
    //   查询
    hysearch() {
        var self = this
        if(self.hyvalue == ''){
            this.$message.error("请输入行业关键词")
        }else{
            let params = {
            name: self.hyvalue
            };
            this.axios({
            url: this.api.Industrychaxun,
            data: this.$qs.stringify(params),
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
                console.log(res.data.data[0].count,"res")
                if(res.data.data[0].count != 0){
                    self.liebiao_show = true
                }else {
                    self.liebiao_show = false
                    self.hangyenull = true
                }
                self.Returncount = res.data.data[0].count
                var searchArr = [];
                for (let i = 0; i < res.data.data[0].list.length; i++) {
                let seArr = res.data.data[0].list[i].erjihy;
                searchArr.push(seArr);
                }
                this.searchArr = searchArr;
            })
        }
    },
    //   返回
    Rtindustry() {
        window.history.go(-1);
    },
  }
};
</script>

<style lang="scss">
.container {
  // padding: 0 30px;
  .container_top {
    padding: 30px 0;
    .container_message {
      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-left: 10px;
        margin-bottom: 5px;
      }
      
      height: 40px;
      background: rgba(207, 17, 27, 0.1);
      border: 1px solid rgba(241, 104, 111, 1);
      border-radius: 4px;
      line-height: 40px;
    }
  }
  .container_bottom {
    .Hangye_box {
      padding: 0 30px 15px 30px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      margin-bottom: 40px;
      position: relative;
      .Hangye_icons {
        top: -10px;
        position: absolute;
        .Hangye_img {
          width: 90px;
          height: 60px;
          // display: inline-block;
        }
        .Hangye_icon {
          width: 30px;
          height: 30px;
          position: absolute;
          top: 13px;
          left: 31px;
        }
      }
      .Hangye_i {
        font-weight: 600;
        margin-left: 107px;
        margin-top: 8px;
        display: inline-block;
      }
      .Hangye_ul {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        padding-top: 30px;
        .Hangye_li {
          min-width: 10%;
          // width: 10%;
          border: 1px solid rgba(240, 242, 245, 1);
          border-radius: 17px;
          text-align: center;
          color: #000;
          line-height: 31px;
          // min-height: 34px;
          margin: 0 10px 20px 10px;
          padding: 0 15px;
        }
        .Hangye_li:hover {
          color: #fff;
          background: #cf111b;
          cursor: pointer;
        }
      }
    }
  }
  .Hangye_null{
      text-align: center;
  }
}
</style>