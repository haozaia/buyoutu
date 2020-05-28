<template>
<div id="Localfinancing">
  <div id="C_content">
    <div class="C_container">
      <div class="C_title"><span class="Title_left"></span>地方投融资平台</div>
      <div class="el-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane style="display:block;" v-for="(item,index) in lablearr" :key="index" :label="item.name" @click="pane(item.qufenziduan)">
            <difangtab :depts="item" :difanglist="difanglist" :qufenzidaun="qufenziduan" v-if="index == activeIndex" :total="total"></difangtab> 
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Difangtab from './Difangtab'
export default {
  data() {
    return {
      activeName: "first",
      lablearr:[{name:"地方城建",qufenziduan:'A'},{name:'扶贫开发',qufenziduan:'B'},{name:'交通基建',qufenziduan:'C'},{name:'铁路建设',qufenziduan:'D'},{name:'土地保障房开发',qufenziduan:'E'},{name:'国有资产运营',qufenziduan:'F'},{name:'政府引导基金',qufenziduan:'G'},{name:'国有控股公司',qufenziduan:'H'}],
      qufenziduan:null,
      difanglist:[],
      activeIndex:0,
      total:0,
      index: "",
    };
  },
  components:{
    Difangtab
  },
  mounted() {
    this.getTable(1,"A")
  },
  methods: {
    handleClick(tab, event) {
      this.activeIndex = tab.index
      // console.log(tab,"125")
      switch(tab.index){
          case "0":
          this.qufenziduan = 'A';break;
          case "1":
          this.qufenziduan = 'B';break;
          case "2":
          this.qufenziduan = 'C';break;
          case "3":
          this.qufenziduan = 'D';break;
          case "4":
          this.qufenziduan = 'E';break;
          case "5":
          this.qufenziduan = 'F';break;
          case "6":
          this.qufenziduan = 'G';break;
          case "7":
          this.qufenziduan = 'H';break;

      }
      // console.log("获取索引",tab.index)
      // console.log(this.qufenziduan)
      this.getTable(1,this.qufenziduan)
    },
    getTable(val,qufenziduan){
        let params = {
          page: val,
          limit: 20,
          qufenziduan:qufenziduan
      }
      this.axios({
        url: this.api.Localfinancing,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
          this.difanglist = res.data.data
            // console.log(this.difanglist,88888)
            this.total = res.data.count
            // console.log("请求到的正确数据条数",res.data.count)
        })
    },
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/Public_style.scss";
@import "../../styles/css/Techindustry.scss";
#Localfinancing{
  .el-table__row>td:first-child{
    text-align: left !important;
  }
}
.el-tabs__content{
    .cityBuild{
        border-bottom: 10px solid #f5f8fa;
        ul{
            display: flex;
            li{
                flex: 1;
                height: 66px;
                text-align: center;
                color: #000;
                span{
                    font-size: 18px;
                    color: #CF111B
                }
                div{
                    margin-top: 8px;
                    font-size: 14px ;
                }
                .icon-add{
                    background: url('../../../src/assets/images/icon-common-1.png');
                    background-position: -165px 0px;
                    width: 25px;
                    height: 25px;
                    position: absolute; 
                    left: 237px;     
                    top: 30px         
                 }
            }
            li:nth-child(-n+2){
                border-right: 1px solid #f1eded;
            }
        }
    }
    .el-tab-pane /deep/{
      display: block !important
    }
}
</style>