<!--  -->
<template>
  <div id="fiveDownload">
    <div class="uploadWapper">
      <el-upload
        v-if="mobile ==changeMobile"
        class="upload-demo"
        :action="api.collectionMoreFileUpload"
        :on-success="handlesuccess"
        name="multipartFiles"
        :show-file-list="false"
        :data="pdfData"
        :on-preview="handlePreview"
        :before-upload="beforeAvatarUpload"
      >
        <el-button size="small" type="primary">上传</el-button>
        <div slot="tip" class="el-upload__tip inline downTip">文件大小不超过50M</div>
      </el-upload>
    </div>
    <div class="el-tabs padding10">
      <div class="query-result">
        <div style="padding-top:10px;"></div>
        <div class="table-wrapper">
          <el-table stripe :data="downloadList" style="width: 100%">
            <el-table-column prop="projectName" label="文件名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="createTime" label="创建时间">
              <template slot-scope="{row}">{{ row.createTime.slice(0,10)}}</template>
            </el-table-column>
            <el-table-column prop="inputerName" label="操作" width="200">
              <template slot-scope="scope">
                <div>
                  <el-button @click="deleteDownload(scope.row.id)"  v-if="mobile ==changeMobile" type="text" size="medium">删除</el-button>
                  <el-button @click="downloadFile(scope.row.id)" type="text" size="medium">下载</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["change", "changeMobile"],
  data() {
    return {
      pdfData: {
        id: "",
        type: 0
      },
      mobile: "",
      downloadList: []
    };
  },

  components: {},

  computed: {},

  mounted() {
    var self = this;
    self.pdfData.id = self.change;
    self.mobile = this.$store.state.mobile;
    console.log(self.change)
    self.download();
  },

  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 50;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 50MB!");
      }
      return isLt2M;
    },
    handlesuccess(response, file, fileList) {
      var self = this;
      console.log(response.data);
      if (response.code !== 0) {
        this.$message.error(response.msg);
      } else {
        this.$message({
          message: "恭喜你，导入成功！",
          type: "success"
        });
        self.download();
      }
    },
    deleteDownload(id) {
      var self = this;
      let params = {
        id: id
      };
      this.axios({
        url: this.api.collectionUpdatefujian,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        self.download();
      });
    },
    downloadFile(id) {
      let url = this.api.collectionDownloadfujian + "?id=" + id;
      window.location.href = url;
    },
    //附件列表
    download() {
      var self = this;
      let params = {
        projectElementsId: self.change
      };
      this.axios({
        url: this.api.collectionFujian,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.downloadList = res.data.data.list;
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.downTip {
  margin-left: 20px;
  font-size: 18px;
}
.uploadWapper {
  margin: 10px 0 0 20px;
}
</style>