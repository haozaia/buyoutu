<template>
  <div id="importCom">
    <div class="C_title">
      <span class="Title_left"></span>导入企业 
      <span class="FT400 fontSize20" v-if='unitCode == 3'>收藏剩余条数:<span class="colorH">{{Collection}} </span> 特别关注剩余条数:<span class="colorH">{{CollectionS}}</span></span>
    </div>
    <div class="VIPphone_content">
      <div class="VIPphone_dow">
        
        <el-upload
          class="upload-demo"
          drag
          :on-success="handlesuccess"
          accept=".xlsx, .xls"
          :action="api.collectionIimport"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
        
        <div class="dianjixiazai">
          <a :href="api.collectionDownload" alt>模板下载</a>
          <div class="PS">
            <p class="PS_te">
              <i>Ps:</i>1、查找需按照固定格式进行数据查找（可点击上方“模板下载”查看数据格式）
            </p>
            <p>2、当前仅支持.xls、.xlsx格式的文件</p>
            <p>3、出错的数据会展示在之后的页面中！</p>
            <p>4、微信号规则：可使用6-20位数字、字母、下划线、减号或它们的组合；微信号必须以字母开头，不能以数字开头，字母不区分大小写；不支持设置中文。</p>
          </div>
        </div>
        </div>


    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Collection:0,
      CollectionS:0,
      unitCode:'',
    };
  },
  mounted() {
    var self = this
      self.mobile = localStorage.getItem("mobile");
      self.unitCode = localStorage.getItem("unitCode");
      self.getCount()
    this.$nextTick(function () {
     document.getElementsByClassName("VIPphone_content")[0].style.minHeight=document.getElementById("leftNav").offsetHeight -20 -62 +"px"
  })
  },
  created() {},
  methods: {
    handlesuccess(response, file, fileList) {
      console.log(response.data);
      this.getCount()
      if (response.code !== 0) {
        this.$message.error(response.msg);
      } else if (response.data.length !=0) {
        for(let x in response.data){
          console.log(x)
          setTimeout(()=>{
            this.$message({
              message: '"'+ response.data[x].company +'" 已被 “'+ response.data[x].name +'”收藏！',
              type: 'warning',
              showClose:true,
              duration:0,
            });
          },100)
        }
      } else if (response.data.length==0) {
         this.$message({
          message: '恭喜你，导入成功！',
          type: 'success'
        });
      }
    },

    //请求条数
    getCount(id) {
      var self = this;
      let params = {
        mobile: self.mobile
      };
      this.axios({
        url: this.api.collectionCount,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res)
        self.Collection = res.data.data[0].shengyu
        self.CollectionS = res.data.data[1].shengyu
      });
    },
  }
};
</script>
<style lang="scss">
#importCom {
  width: 100%;
  min-height: 643px;
  .VIPphone_content {
    background: #eee;
    .VIPphone_dow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-38%, -50%);
      text-align: center;
      .el-upload {
        margin-top: 100px;
        box-shadow: 0 0 16px #666;
        border-radius: 4px;
        .el-upload-dragger {
          border: none;
        }
      }
      .el-upload-list {
        a {
          color: #fff;
        }
      }
      .el-upload-list:hover {
        a {
          color: blue;
        }
      }
      .el-upload-list__item:hover {
        background-color: none !important;
      }
      .el-upload__tip {
        color: #fff;
      }
      .dianjixiazai {
        a {
          font-size: 20px;
          margin-top: 10px;
          display: block;
          color: #cf111b;
          text-decoration: underline;
        }
        .PS {
          width: 672px;
          margin: 80px auto 0 auto;
          text-align: left;
          padding-left: 60px;
          .PS_te {
            padding: 0;
            i {
              font-weight: 600;
              color: #000;
              font-size: 18px;
            }
          }
          p {
            font-size: 18px;
            color: #000;
            padding-left: 30px;
            line-height: 30px;
          }
        }
      }
      // 公司信息
     
    }
     .query-result {
        padding-top: 40px;
        .table-wrapper {
          margin: auto;
          width: 1200px;
          // .el-table{
          //   height: 560px;
          //   overflow-y: auto;
          //   // .has-gutter{
          //   //   background: #fbe1e0 !important;
          //   //   tr{
          //   //     background-color: #fbe1e0 !important;
          //   //   }
          //   // }
          // }
          .dowload_r {
            text-align: right;
            padding: 5px 0;
            .dowl_fanh {
              padding: 8px 20px;
              margin-right: 10px;
              color: #cf111b;
              border: 1px solid #cf111b;
            }
            .dowl_fanh:focus,
            .dowl_fanh:hover {
              color: #cf111b;
              border-color: #cf111b;
              background-color: #fff;
            }
            .DCbutton {
              border-radius: 4px;
              display: block;
              background: #cf111b;
              color: #fff;
              border: none;
              width: fit-content;
              padding: 5px 10px;
              float: right;
            }
            .DCbutton:hover {
              border-color: none;
              color: #fff;
              background: #942624;
            }
            .DCbutton:active {
              border-color: #cf111b;
              background: #942624;
            }
          }
        }
      }
  }
  .el-upload-dragger .el-upload__text {
    color: #606266;
    font-size: 18px;
    text-align: center;
  }
}
</style>