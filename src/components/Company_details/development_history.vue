<template>
  <div slot="development_history">
    <div class="companyContent">
      <div id="developmentHistory" class="tab-target active">
        <section class="Profile" style="padding-top:0 " v-if="MgaoguanttList.length!=[]">
         <header>
          <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">高管人员</span>
            </div>
        </header>
          <div class="basic_senior">
            <div class="senior inline" v-for="(item,index) in MgaoguanttList" :key="index">
              <div class="senior_top">
                <span>{{item.xingming}}</span>
              </div>
              <div class="senior_bottom" >
                <p v-if="item.xiangxixx == null " >{{item.zhiwei}}</p>
                <a v-else @click="getInfo(index)">{{item.zhiwei}}</a>
              </div>
            </div>
          </div>
            <!-- <div class="senior_right">
                <el-button
                  type="text"
                  @click="getInfo(index)"
                  style="font-size:16px;"
                  :disabled="item.xiangxixx == null "
                >详情</el-button>
              </div> -->
        </section>

        <section class="table-list" v-if="recruitTable !=''">
        <header>
          <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">招聘信息</span>
            </div>
        </header>
        <div class="licenceTable lineTable el-tabs">
            <div class="table-wrapper">
              <el-table stripe :data="recruitTable" style="width: 100%">
                  <el-table-column align="center" prop="xuhao" label="序号" width="80">
                    <template slot-scope="scope">{{scope.$index +1}}</template>
                  </el-table-column>
                  <el-table-column align="center" prop="zhaopinzw" label="招聘职位"></el-table-column>
                  <el-table-column align="center" prop="xinzi" label="薪资"></el-table-column>
                  <el-table-column align="center" prop="gongzuojy" label="工作经验">
                     <template slot-scope="{row}">
                    {{ row.gongzuojy || '-' }}
                  </template>
                  </el-table-column>
                  <el-table-column align="center" prop="suozaics" label="所在城市"></el-table-column>
                </el-table>
            </div>
            <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="20"
          :total="total"
          background
        ></el-pagination>
        </div>
      </section>

        <section>
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">经营范围</span>
            </div>
          </header>
          <li class="comJyfw">
            <span class="fontSize20">{{JibenxxA.jingyingfw}}</span>
          </li>
        </section>

        <section v-if="timeAxis.length != 0">
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/companyIcon/title.svg" />
              <span class="inline">最近变更记录</span>
            </div>
          </header>
          <section class="cd-container" id="cd-timeline">
            <div class="cd-timeline-block" v-for="(item,index) in timeAxis" :key="index">
              <div class="cd-timeline-img cd-picture">
                <img alt="Picture" src="../../assets/images/companyIcon/idea.svg" />
              </div>
              <div class="cd-timeline-content">
                <span class="biangengxmBlock inline"></span>
                <b class="biangengxm inline">{{item.biangengxm}}</b>
                <p>
                  {{item.biangengq}}
                  <br />
                  <span style="color:#CF111B">变更为</span>
                  <br />
                  {{item.biangengh}}
                </p>
                <span class="cd-date">{{item.biangengsj?item.biangengsj.substring(0, 10):''}}</span>
              </div>
            </div>
          </section>
        </section>

        <section v-if="recruitTable=='' && timeAxis=='' && JibenxxA.jingyingfw==''">
          <p style="text-align:center">暂无数据~</p>
        </section>
        <!-- 弹出框 -->
        <div class="company_dialog">
          <el-dialog title="高管人员" :visible.sync="dialogVisible" width="50%">
            <table>
              <tbody>
                <tr>
                  <td class="td-label">
                    <div>{{key?MgaoguanttList[gaoguanIndex].xingming:''}}简介</div>
                  </td>
                  <td class="td-data">
                    <div style="padding:10px 20px;">{{key?MgaoguanttList[gaoguanIndex].xiangxixx:''}}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>  
  
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      timeAxis: [],
      gongsiname: "",
      dialogVisible: false,
      key: "",
      MgaoguanttList: [],
      gaoguanIndex: "",
      page: 1,
      total: 0,
      JibenxxA: "",
      recruitTable: []
    };
  },
  mounted() {
    var self = this;
    self.gongsiname = this.$route.query.name;
    self.getList();
    self.Jibenxx();
    self.Jibenxxx();
    self.Mgaoguantt();
  },
  methods: {
    //获取高管信息
    getInfo(index) {
      var self = this;
      self.dialogVisible = true;
      self.key = 1;
      self.gaoguanIndex = index;
      // console.log(self.gaoguanIndex)
    },
    //查询高管
    Mgaoguantt() {
      var self = this;
      let params = {
        gognsiname: self.gongsiname
      };
      this.axios({
        url: this.api.Mgaoguantt,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        res.data.data.map(x => {
          x.xingshi = x.xingming.charAt(0);
          self.MgaoguanttList.push(x);

          // console.log(self.MgaoguanttList)
        });
        console.log(self.MgaoguanttList[0].xiangxixx);
      });
    },
    Jibenxx() {
      var self = this;
      let params = {
        gognsiname: self.gongsiname
      };
      this.axios({
        url: this.api.Biangengjl,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.timeAxis = res.data.data;
      });
    },
    Jibenxxx() {
      var self = this;
      let params = {
        gognsiname: self.gongsiname
      };
      this.axios({
        url: this.api.Gaikuang,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.JibenxxA = res.data.data[0];
      });
    },
    handleCurrentChange(val) {
      var self = this;
      console.log(`当前页: ${val}`);
      self.page = val;
      console.log(self.page);
      self.getList(val, 20);
    },
    getList() {
      var self = this;
      let params = {
        page: self.page,
        gongsiname: self.gongsiname,
        limit: 20
      };
      this.axios({
        url: this.api.ManagementSituationList,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.recruitTable = res.data.data;
        self.total = res.data.count;
      });
    }
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
@import "../../styles/css/CompanyDetails/CompanyProfile.scss";
</style>