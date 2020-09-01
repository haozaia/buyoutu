<template>
<div id="VIPphone">
  <div class="VIPphone_content">
    <div class="VIPphone_dow">
      <el-upload
      v-if="this.upload == false"
        class="upload-demo"
        drag
        :on-success="handlesuccess"
        accept=".xlsx,.xls"
        :action="api.VIPphone1"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div class="dianjixiazai" v-if="this.upload == false">
        <a :href="api.VIPphone2" alt="">模板下载</a>
        <div class="PS">
          <p class="PS_te"><i>Ps: </i>1、本功能可通过上传企业名录，导出对应企业的联系电话、邮箱等信息</p>
          <p>2、查找需按照固定格式进行数据查找（可点击上方“模板下载”查看数据格式）</p>
          <p>3、查找到的数据会展示在之后的页面中，VIP用户可将数据导出</p>
          <p>4、当前仅支持.xls、.xlsx格式的文件</p>
        </div>
      </div>
      <div v-if="this.gsxx == true" class="query-result">
        <div class="table-wrapper">
          <el-table stripe :data="tableData" height="560" style="width: 100%">
            <el-table-column prop="name" label="公司名称" align="center"></el-table-column>
            <el-table-column prop="dianhua" align="center" label="电话"></el-table-column>
            <el-table-column prop="lianxidh" align="center" label="联系电话"></el-table-column>
            <el-table-column prop="lianxiyx" align="center" label="联系邮箱"></el-table-column>
          </el-table>
          <!-- <el-button class="DCbutton el-icon-download" @click="download"> 导出</el-button> -->
          <div class="dowload_r">
            <el-button class="dowl_fanh" @click="download">返回</el-button>
            <a :href='api.VIPphonelist + "?downloadsign="+ downloadsign' class="DCbutton"><i class="el-icon-download"></i>导出</a>
          </div>
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
      upload: false,
      gsxx: false,
      tableData: [],
      downloadsign: "",
    };
  },
  mounted() {
  },
  created() {},
  methods: {
    handlesuccess(response, file, fileList) {
      console.log(response)
      if(response.code !== 0) {
        this.$message.error(response.msg)
      }else if(response.data.result !== null) {
        this.upload = true
        this.gsxx = true
        this.tableData = response.data.result
        this.downloadsign = response.data.downloadsign
      }else if(response.data.result == null) {
        this.$message.error("所查信息为空")
      }
    },
    // 返回上一级
    download() {
      this.gsxx = false
      this.upload = false
    }
  }
};
</script>
<style lang="scss">
#VIPphone{
  width: 100%;
  min-height: 643px;
  // background: #c3c3c380;
  .VIPphone_content{
    .VIPphone_dow{
      text-align: center;
      .el-upload{
        margin-top: 100px;
        box-shadow: 0 0 16px #666;
        border-radius: 4px;
        .el-upload-dragger{
          border: none;
        }
      }
      .el-upload-list{
        a{
          color: #fff;
        }
      }
      .el-upload-list:hover{
        a{
          color: blue;
        }
      }
      .el-upload-list__item:hover {
        background-color: none !important;
      }
      .el-upload__tip{
        color: #fff;
      }
      .dianjixiazai{
        a{
          font-size: 14px;
          margin-top: 10px;
          display: block;
          color: #c03532;
          text-decoration:underline
        }
        .PS{
          width: 440px;
          margin:60px auto 0 auto;
          text-align: left;
          padding-left: 60px;
          .PS_te{
            padding: 0;
            i{
              font-weight: 600;
              color: #666;
              font-size: 12px;
            }
          }
          p{
            font-size: 12px;
            color: #666;
            padding-left: 23px;
            line-height: 25px;
          }
        }
      }
      // 公司信息
      .query-result{
        padding-top: 40px;
        .table-wrapper{
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
          .dowload_r{
              text-align: right;
              padding: 5px 0;
            .dowl_fanh{
              padding: 8px 20px;
              margin-right: 10px;
              color: #c03532;
              border: 1px solid #fff
            }
            .dowl_fanh:focus, .dowl_fanh:hover {
              color: #c03532;
              border-color: #c03532;
              background-color: #fff;
            }
            .DCbutton{
              border-radius: 4px;
              display: block;
              background: #c03532;
              color: #fff;
              border: none;
              width: fit-content;
              padding: 5px 10px;
              float: right;
            }
            .DCbutton:hover{
              border-color: none;
              color: #fff;
              background: #942624;
            }
            .DCbutton:active{
              border-color: #c03532;
              background: #942624;
            }
          }
        }
      }
    }
  }
}
</style>