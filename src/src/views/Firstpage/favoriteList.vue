<!--  -->
<template>
  <div id="favoriteList">
    <div class="C_title">
      <span class="Title_left"></span>我的收藏
      <span class="FT400 fontSize20" v-if="unitCode == 3">
        收藏剩余条数:
        <span class="colorH">{{Collection}}</span> 特别关注剩余条数:
        <span class="colorH">{{CollectionS}}</span>
      </span>
    </div>
    <div class="favContent">
      <section class="chainWapper">
        <div class="moniterWapper inline">
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/Collection/title.svg" />
              <span class="inline FT400">收藏的产业链</span>
            </div>
          </header>
          <ul class="moniterList" v-if="monitorList.length!==0">
            <li
              class="monitorBlock inline"
              v-for="(item , index) in monitorList"
              :key="index"
              @click="goChain(item.collectIndustry)"
              :title="item.collectIndustry"
            >
              <p class="fontSize20">{{item.collectIndustry}}</p>
              <span class="fontSize16 color9 scTime">{{item.createTime.substring(0,10)}}</span>
              <span class="closeWapper inline" @click.stop="delChain(item.id)">
                <img class="close inline" src="../../assets/images/Collection/close.svg" alt />
              </span>
            </li>
          </ul>
          <p v-else class="moniterList moniterListTips">您还没有收藏产业链!</p>
        </div>
        <div class="industryWapper inline">
          <header class="block-header">
            <div class="block-titles fontSize20">
              <img class="icon icon-tips inline" src="../../assets/images/Collection/title.svg" />
              <span class="inline FT400">收藏的行业</span>
            </div>
          </header>
          <ul class="moniterList" v-if="chainList.length!==0">
            <li
              class="monitorBlock inline"
              v-for="(item , index) in chainList"
              :key="index"
              @click="goIndustry(item.collectIndustry)"
              :title="item.collectIndustry"
            >
              <p class="fontSize20">{{item.collectIndustry}}</p>
              <span class="fontSize16 color9 scTime">{{item.createTime.substring(0,10)}}</span>
              <span class="closeWapper inline" @click.stop="delChain(item.id)">
                <img class="close inline" src="../../assets/images/Collection/close.svg" alt />
              </span>
            </li>
          </ul>
          <p v-else class="moniterList moniterListTips">您还没有收藏行业!</p>
        </div>
      </section>
      <section class="favComWapper">
        <header class="block-header">
          <div class="block-titles fontSize20 inline" style="padding-bottom: 8px;">
            <img class="icon icon-tips inline" src="../../assets/images/Collection/title.svg" />
            <span class="inline FT400">收藏的企业</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <el-form :inline="true" class="inline">
            <el-form-item label>
              <!-- <el-col :span="11"> -->
              <el-form-item label="地域：">
                <el-cascader
                  ref="refHandle"
                  style="width:240px;"
                  v-model="city_search"
                  :options="city_data"
                  :props="{ checkStrictly: true }"
                  @change="handleChange"
                  clearable
                ></el-cascader>
              </el-form-item>
              <el-form-item label="行业：">
                <el-select
                  size="small"
                  placeholder="请选择行业"
                  filterable
                  clearable
                  v-model="suoshuhy"
                  @change="getErn"
                >
                  <el-option
                    v-for="item in chain"
                    :key="item.yijihy"
                    :label="item.yijihy"
                    :value="item.yijihy"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="下属：" v-if="userFlag">
                <el-select
                  size="small"
                  placeholder="请选择下属"
                  filterable
                  clearable
                  v-model="otherMobile"
                  @change="getErn"
                >
                  <el-option
                    v-for="item in userList"
                    :key="item.yijihy"
                    :label="item.realName"
                    :value="item.mobile"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="特别关注：" v-if="unitCode == 3">
                <el-switch @change="getErn" v-model="isSpecial" active-color="#CF111B"></el-switch>
              </el-form-item>
            </el-form-item>
          </el-form>
        </header>
        <section class="comFromWapper">
          <!-- <div class="query-result"> -->
          <div class="table-wrapper">
            <el-table
              stripe
              :data="tableData"
              id="toChange"
              style="width: 100%"
              empty-text="您还没有收藏企业!"
            >
              <el-table-column prop="collectCompany" label="企业名称" width="400" align="left">
                <template slot-scope="scope">
                  <router-link
                    target="_blank"
                    tag="a"
                    class="toChange"
                    style="color:#606266;text-decoration:none;"
                    :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.collectCompany) }}"
                  >
                    <p size="medium" v-html="scope.row.collectCompany"></p>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="companyProvince" align="center" label="所属省份"></el-table-column>
              <el-table-column prop="companyCity" align="center" label="所属市区"></el-table-column>
              <el-table-column prop="createTime" align="center" label="收藏时间">
                <template
                  slot-scope="{row}"
                >{{ row.createTime?row.createTime.substring(0, 10) : '-' }}</template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="420">
                <template slot-scope="scope">
                  <el-button @click="handleClickTo(scope.row)" type="text" size="medium ">取消收藏</el-button>
                  <el-button
                    type="text"
                    size="medium "
                    @click="openDialog(scope.row)"
                  >备注({{scope.row.count?scope.row.count:0}})</el-button>
                  <el-button
                    v-if="scope.row.synid"
                    @click="openFive(scope.row.id,scope.row.collectCompany,scope.row.synid)"
                    type="text"
                    size="medium"
                    class="fontB"
                  >笔记</el-button>
                  <el-button
                    v-else
                    @click="openFive(scope.row.id,scope.row.collectCompany)"
                    type="text"
                    size="medium"
                  >笔记</el-button>
                  <div v-if="unitCode == 3" style="display:inline-block;margin-left:10px">
                    <el-button
                      @click="delSpecial(scope.row.id,1)"
                      type="text"
                      size="medium"
                      v-if="scope.row.special != 1"
                    >特别关注</el-button>
                    <el-button
                      @click="delSpecial(scope.row.id,0)"
                      type="text"
                      size="medium"
                      v-else
                    >取消关注</el-button>
                    <el-button @click="chanBottjoin(scope.row.id)" type="text" size="medium">已对接</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- </div> -->
          <!-- 分页dom start -->
          <div id="Pagination" v-show="total>10">
            <el-pagination
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="handleCurrentChange"
              :page-size="20"
              :current-page="page"
            ></el-pagination>
            <el-button
              size="small"
              :disabled="suibian"
              class="paginationsy"
              @click="paginationsy"
            >首页</el-button>
          </div>
          <!-- 分页dom end -->
        </section>
      </section>
    </div>

    <el-dialog
      title="5+2笔记"
      center
      :show-close="false"
      v-if="dialogVisible"
      id="chainMAPS"
      :visible.sync="dialogVisible"
      width="1200px"
    >
      <div class="close" @click="dialog_close">×</div>
      <select1 :close="Fun" :fiveId="fiveId" :fiveName="fiveName" :synId="synId"></select1>
    </el-dialog>

    <el-dialog
      title
      :visible.sync="dialogTableVisible"
      v-if="dialogTableVisible"
      @close="handleClose"
      width="1400px"
    >
      <div slot="title" class="header-title fontSize24">
        <p class="inline">
          {{company}} &nbsp;备注列表 (
          <span class="colorH">{{remarkTotal}}</span>
          )
        </p>
      </div>
      <ul class="remarkWapper">
        <li class="remark" v-for="(item,index) in postList" :key="index">
          <section class="remarkLeft inline">
            <p>
              <span v-if="item.managerName">姓名:</span>
              {{item.managerName}} &nbsp;&nbsp;
              <span v-if="item.beizhu2">职位:</span>
              {{item.beizhu2}} &nbsp;&nbsp;
              <span v-if="item.beizhu1">沟通阶段:</span>
              {{item.beizhu1}} &nbsp;&nbsp;
              <span v-if="item.managerMobile">电话1:</span>
              {{item.managerMobile}} &nbsp;&nbsp;
              <span v-if="item.wechatNumber">微信号:</span>
              {{item.wechatNumber}} &nbsp;
              <span v-if="item.managerMobile1">电话2:</span>
              {{item.managerMobile1}} &nbsp;
              <span v-if="item.telephone">固定电话:</span>
              {{item.telephone}} &nbsp; 备注：{{item.postscript?item.postscript:'无'}}
            </p>
            <p class="fontSize14 color9 time">{{item.createTime.substring(0,10)}}</p>
          </section>
          <section class="remarkRight">
            <span class="curPoi modify" @click="toUpdateRemark(item,item.id)">
              <i class="el-icon-edit"></i>
            </span>
            <span class="curPoi" @click="delRemark(item.id)">
              <i class="el-icon-delete"></i>
            </span>
          </section>
        </li>
      </ul>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="manageForm"
        label-width="100px"
        class="rowManage"
      >
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item prop="managerName">
              <el-input v-model="ruleForm.managerName" placeholder="高管姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="positionLevel">
              <!-- <el-select v-model="ruleForm.positionLevel" placeholder="高管职位" style="width:100%">
                <el-option
                  v-for="item in positionOptions"
                  :key="item.position"
                  :label="item.position"
                  :value="item.positionLevel"
                ></el-option>
              </el-select>-->
              <el-cascader
                v-model="gaoGuanZW"
                :options="positionOptions"
                @change="handleChangeZW"
                placeholder="高管职位"
                style="width:100%"
                :props="{ children:'list',label:'position',value:'position'}"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="proceduresLevel">
              <el-select v-model="ruleForm.proceduresLevel" placeholder="沟通阶段" style="width:100%">
                <el-option
                  v-for="item in talkOptions"
                  :key="item.projectProcedures"
                  :label="item.projectProcedures"
                  :value="item.proceduresLevel"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="managerMobile">
              <el-input v-model.number="ruleForm.managerMobile" placeholder="手机1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="wechatNumber">
              <el-input v-model="ruleForm.wechatNumber" placeholder="微信号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="managerMobile1">
              <el-input v-model="ruleForm.managerMobile1" placeholder="手机2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="telephone">
              <el-input v-model="ruleForm.telephone" placeholder="固话(xxx-xxxxxxxx)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="postscript">
          <el-input
            type="textarea"
            placeholder="请在这里填写内容（最多100字）…"
            :autosize="{ minRows: 3, maxRows: 9}"
            v-model="ruleForm.postscript"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-button class="subt floatR" @click="submits('manageForm')" type="primary">提交</el-button>
      <div class="clear"></div>
    </el-dialog>
  </div>
</template>

<script>
import select1 from "./fiveSimplifyDialog.vue";
export default {
  data() {
    // 手机号验证
    const validatePhone = (rule, value, callback) => {
      var self = this;
      if (
        self.ruleForm.managerMobile == "" &&
        self.ruleForm.managerMobile1 == "" &&
        self.ruleForm.telephone == ""
      ) {
        callback(new Error("至少输入一个电话号码"));
      } else if (value == "") {
        callback();
      } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          this.$refs["manageForm"].clearValidate([
            "managerMobile",
            "managerMobile1",
            "telephone"
          ]);
          callback();
        }
      }
    };
    const wechattext = (rule, value, callback) => {
      var self = this;
      if (value == "" || value == null) {
        callback();
      } else {
        if (!/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(value)) {
          callback(
            new Error("6-20位、字母开头、数字、下划线和减号、不可设置中文")
          );
        } else {
          callback();
        }
      }
    };
    const validatelePhone = (rule, value, callback) => {
      var self = this;
      if (
        self.ruleForm.managerMobile == "" &&
        self.ruleForm.managerMobile1 == "" &&
        self.ruleForm.telephone == ""
      ) {
        callback(new Error("至少输入一个电话号码"));
      } else if (value == "") {
        callback();
      } else {
        if (value.length > 30) {
          callback(new Error("请输入正确的固话号码"));
        } else {
          this.$refs["manageForm"].clearValidate([
            "managerMobile",
            "managerMobile1",
            "telephone"
          ]);
          callback();
        }
      }
    };
    const validateCtext = (rule, value, callback) => {
      var self = this;
      if (value == "") {
        callback();
      } else {
        if (
          self.ruleForm.postscript.length > 100 ||
          self.ruleForm.postscript.length < 1
        ) {
          callback(new Error("请输入少于100个字"));
        } else {
          callback();
        }
      }
    };
    return {
      fiveId: "",
      fiveName: "",
      synId: "",
      tabView: "select1",
      dialogVisible: false,
      mobile: "",
      Collection: 0,
      CollectionS: 0,
      monitorList: [],
      chainList: [],
      suoshuhy: "",
      chain: [],
      page: 1,
      city_search: "",
      city_data: [],
      tableData: [],
      sheng: "",
      shi: "",
      isSpecial: 0,
      postList: [],
      suibian: true, //分页变量3,
      dialogTableVisible: false,
      remarkTotal: "0",
      gaoGuanZW: "",
      ruleForm: {
        managerName: "",
        positionLevel: "",
        proceduresLevel: "",
        managerMobile: "",
        managerMobile1: "",
        wechatNumber: "",
        telephone: "",
        postscript: ""
      },
      userFlag: false,
      userList: [],
      company: "",
      total: 0,
      positionOptions: [],
      talkOptions: [],
      unitCode: "",
      rules: {
        managerName: [
          { required: true, message: "请输入高管姓名", trigger: "change" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字",
            trigger: "change"
          }
        ],
        positionLevel: [
          { required: true, message: "请选择高管等级", trigger: "change" }
        ],
        proceduresLevel: [
          { required: true, message: "请选择对接阶段", trigger: "change" }
        ],
        managerMobile: [{ validator: validatePhone, trigger: "change" }],
        wechatNumber: [{ validator: wechattext, trigger: "change" }],
        managerMobile1: [{ validator: validatePhone, trigger: "change" }],
        telephone: [{ validator: validatelePhone, trigger: "change" }],
        postscript: [{ validator: validateCtext, trigger: "change" }]
      }
    };
  },
  components: {},
  watch: {
    sheng() {
      if (this.$refs.refHandle) {
        this.$refs.refHandle.dropDownVisible = false;
      }
    },
    shi() {
      if (this.$refs.refHandle) {
        this.$refs.refHandle.dropDownVisible = false;
      }
    }
  },

  computed: {},
  components: {
    select1
  },
  mounted() {
    var self = this;
    self.mobile = localStorage.getItem("mobile");
    self.unitCode = localStorage.getItem("unitCode");
    self.coolInfo(1);
    self.coolInfo(0);
    self.getChain();
    self.citylist();
    self.Gongxinjsqy();
    self.getPosition();
    self.getTalk();
    self.getCount();
    self.companyUserList();
  },

  methods: {
    handleChangeZW(value) {
      var self = this;
      var obj = self.positionOptions.find(item => {
        return item.position === value[0];
      });
      var objs = obj.list.find(item => {
        return item.position === value[1];
      });
      self.ruleForm.positionLevel = objs.positionLevel;
    },
    Fun(msg) {
      var self = this;
      console.log(msg);
      self.dialogVisible = false;
      self.Gongxinjsqy();
    },
    //打开5+2简版弹窗
    openFive(fiveId, fiveName, synId) {
      var self = this;
      self.dialogVisible = true;
      self.fiveId = fiveId;
      self.fiveName = fiveName;
      self.synId = synId ? synId : "";
    },
    //关闭弹窗
    dialog_close() {
      this.dialogVisible = false;
    },
    //请求条数
    getCount() {
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
        console.log(res);
        self.Collection = res.data.data[0].shengyu;
        self.CollectionS = res.data.data[1].shengyu;
      });
    },
    //已对接
    chanBottjoin(id) {
      var self = this;
      let params = {
        id: id,
        buttjoin: 1
      };
      this.$confirm("是否确认已对接！已对接项目将无法再被收藏！", "提示", {
        confirmButtonText: "确定",
        showCancelButton: true,
        cancelButtonClass: "cancelCollection",
        // cancelButtonText: '取消',
        type: "warning"
      })
        .then(() => {
          this.axios({
            url: this.api.updatecompany,
            data: this.$qs.stringify(params),
            method: "post",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => {
            if (res.data.msg == "成功") {
              this.$message({
                message: "已对接成功!",
                type: "success"
              });
              self.Gongxinjsqy();
              self.getCount();
            } else {
              this.$message.error("服务器走丢了!");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消选择"
          });
        });
    },
    //取消特别收藏
    delSpecial(id, special) {
      var self = this;
      let params = {
        id: id,
        special: special,
        unitCode: self.unitCode
      };
      this.axios({
        url: this.api.updatespecial,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "操作成功!",
            type: "success"
          });
          self.Gongxinjsqy();
          self.getCount();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    //删除备注
    delRemark(id) {
      var self = this;
      let params = {
        id: id
      };
      this.axios({
        url: this.api.delpost,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "删除备注成功!",
            type: "success"
          });
          self.RemarkList();
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },
    //点击修改
    toUpdateRemark(postscript, id) {
      var self = this;
      self.ruleForm = { ...postscript };
      self.gaoGuanZW = postscript.beizhu2.split(":");
      console.log(self.gaoGuanZW);
      self.isUpdate = true;
      self.postId = id;
    },
    //职务
    getPosition() {
      var self = this;
      this.axios({
        url: this.api.collectionZhiwu,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.positionOptions = res.data.data;
      });
    },
    //阶段
    getTalk() {
      var self = this;
      this.axios({
        url: this.api.collectionJieduan,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.talkOptions = res.data.data;
      });
    },
    //提交
    submits(formName) {
      var self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          if (self.isUpdate) {
            self.updateRemark();
          } else {
            self.addRemark();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增备注
    addRemark() {
      var self = this;
      console.log(self.ruleForm.positionLevel);
      console.log(Base64.encode(self.company));
      let params = {
        collectId: self.coolId,
        mobile: self.mobile,
        collectCompany: Base64.encode(self.company),
        unitCode: self.unitCode
      };
      Object.assign(params, self.ruleForm);
      params.positionLevel = JSON.stringify(params.positionLevel);
      this.axios({
        url: this.api.addpost,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "添加备注成功!",
            type: "success"
          });
          self.RemarkList();
          setTimeout(() => {
            this.$refs["manageForm"].resetFields();
            self.gaoGuanZW = "";
          }, 100);
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },
    //修改备注
    updateRemark() {
      var self = this;
      console.log();
      let params = {
        id: self.postId,
        mobile: self.mobile,
        collectCompany: Base64.encode(self.company),
        unitCode: self.unitCode,
        postscript: self.ruleForm.postscript,
        positionLevel: self.ruleForm.positionLevel,
        proceduresLevel: self.ruleForm.proceduresLevel,
        managerName: self.ruleForm.managerName,
        managerMobile: self.ruleForm.managerMobile,
        managerMobile1: self.ruleForm.managerMobile1,
        telephone: self.ruleForm.telephone,
        postscript: self.ruleForm.postscript,
        wechatNumber: self.ruleForm.wechatNumber
      };
      this.axios({
        url: this.api.updatepost,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "添加备注成功!",
            type: "success"
          });
          self.RemarkList();
          self.isUpdate = false;
          setTimeout(() => {
            this.$refs["manageForm"].resetFields();
            self.gaoGuanZW = "";
          }, 100);
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },
    //打开弹窗
    openDialog(val) {
      var self = this;
      self.dialogTableVisible = true;
      self.coolId = val.id;
      self.company = val.collectCompany;
      self.RemarkList();
    },
    //关闭弹窗
    handleClose() {
      var self = this;
      self.isUpdate = false;
      self.Gongxinjsqy();
      setTimeout(() => {
        (self.ruleForm = {
          managerName: "",
          positionLevel: "",
          proceduresLevel: "",
          managerMobile: "",
          managerMobile1: "",
          wechatNumber: "",
          telephone: "",
          postscript: ""
        }),
          (self.gaoGuanZW = "");
      }, 100);
    },
    //备注列表
    RemarkList(id) {
      var self = this;
      let params = {
        collectId: self.coolId
      };
      this.axios({
        url: this.api.postlist,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res.data.data);
        self.remarkTotal = res.data.data.count;
        self.postList = res.data.data.list;
      });
    },
    //取消关注
    handleClickTo(val) {
      var self = this;
      if (self.unitCode == 3) {
        this.$confirm("是否确认取消收藏!(取消收藏后将无法再次收藏)", "提示", {
          confirmButtonText: "确定",
          showCancelButton: true,
          cancelButtonClass: "cancelCollection",
          // cancelButtonText: '取消',
          type: "warning"
        })
          .then(() => {
            self.handleClick(val);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$confirm("是否确认取消收藏!", "提示", {
          confirmButtonText: "确定",
          showCancelButton: true,
          cancelButtonClass: "cancelCollection",
          // cancelButtonText: '取消',
          type: "warning"
        })
          .then(() => {
            self.handleClick(val);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    handleClick(val) {
      var self = this;
      let params = {
        id: val.id
      };
      this.axios({
        url: this.api.delcompany,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "取消收藏成功!",
            type: "success"
          });
          self.Gongxinjsqy();
          self.getCount();
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },
    handleCurrentChange(val) {
      var self = this;
      console.log(val);
      self.page = val;
      self.suibian = false; //是否禁用首页按钮
      self.Gongxinjsqy();
    },
    paginationsy() {
      if (this.page === 1) {
      } else {
        // this.page = 1
        this.handleCurrentChange(1);
      }
    },
    //获取公司列表
    Gongxinjsqy() {
      var self = this;
      // 分页--调用没数据的接口后，重置分页 start
      var right = document.getElementsByClassName("btn-next");
      right[0].disabled = "";
      let params = {
        mobile: self.mobile,
        pageNumber: self.page,
        size: 10,
        companyPrimaryIndustrie: self.suoshuhy,
        companyProvince: self.sheng,
        companyCity: self.shi,
        otherMobile: self.otherMobile,
        special: self.isSpecial == true ? 1 : 0
      };
      this.axios({
        url: this.api.companylist,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data.data,"datadata")
        self.loading = false;
        self.tableData = res.data.data.list;
        self.total = res.data.data.totalRow;
        var cot = Math.ceil(self.total / 10);
        if (cot <= self.page) {
          right[0].disabled = "disabled";
        } else if (self.page == 1) {
          self.suibian = true;
        }
        // 分页--下一页disabled
      });
    },
    //查询一级
    getChain() {
      var self = this;
      let params = {
        oldhangye: self.IsZz ? "1" : ""
      };
      this.axios({
        url: this.api.EsExporyijihyapi,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.chain = res.data.data;
      });
    },
    //查询下属
    companyUserList() {
      var self = this;
      let params = {
        mobile: self.mobile
      };
      this.axios({
        url: this.api.companyUserList,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.userFlag = res.data.data.flag;
        self.userList = res.data.data.list;
      });
    },
    //省市
    citylist() {
      var self = this;
      this.axios({
        url: this.api.LXshengshiapi,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(JSON.stringify(res.data.data));
        self.city_data = res.data.data;
      });
    },
    handleChange(value) {
      var self = this;
      self.sheng = value[0] ? value[0] : "";
      self.shi = value[1] ? value[1] : "";
      this.page = 1;
      self.Gongxinjsqy();
    },
    getErn() {
      var self = this;
      this.page = 1;
      self.Gongxinjsqy();
    },
    coolInfo(index) {
      var self = this;
      let params = {
        mobile: self.mobile,
        identification: index
      };
      this.axios({
        url: this.api.industrylist,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (index == 1) {
          self.monitorList = res.data.data.list;
        } else {
          self.chainList = res.data.data.list;
        }
      });
    },
    goChain(title) {
      console.log("产业链");
      this.$router.push({
        path: "/monitor",
        query: { title: Base64.encode(title) }
      });
    },
    goIndustry(title) {
      console.log("行业");
      this.$router.push({
        path: "/monitorDetail",
        query: { title: Base64.encode(title) }
      });
    },
    delChain(coolId) {
      var self = this;
      let params = {
        id: coolId
      };
      this.axios({
        url: this.api.delindustry,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "取消收藏成功!",
            type: "success"
          });
          self.coolInfo(1);
          self.coolInfo(0);
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    }
  }
};
</script>
<style lang='scss'>
#favoriteList {
  * {
    box-sizing: border-box;
  }
  .block-titles {
    line-height: 40px;
  }
  .chainWapper {
    padding: 0 30px;
    border-bottom: 2px solid #f0f2f5;
    // height: 450px;
  }
  .favComWapper {
    padding: 0 30px;
  }
  .favContent {
    .moniterWapper {
      width: 50%;
      padding-right: 28px;
    }
    .industryWapper {
      //   height: 420px;
      width: 50%;
      overflow: auto;
    }
    .moniterList {
      height: 190px;
      overflow: auto;
      padding-top: 10px;
      .monitorBlock {
        cursor: pointer;
        position: relative;
        width: calc(33.333333% - 10px);
        padding: 13px;
        height: 80px;
        margin: 0 10px 10px 0;
        background: rgba(243, 243, 243, 1);
        border-radius: 4px;
        border: 1px solid rgba(213, 213, 213, 1);
        p {
          overflow: hidden; //超出的文本隐藏

          text-overflow: ellipsis; //溢出用省略号显示

          white-space: nowrap; //溢出不换行
        }
        .scTime {
          position: absolute;
          left: 13px;
          bottom: 13px;
        }
        .closeWapper {
          display: none;
          z-index: 2;
          width: 20px;
          height: 20px;
          background: rgba(207, 17, 27, 1);
          border-radius: 50%;
          text-align: center;
          position: absolute;
          top: -10px;
          right: -10px;
          .close {
            width: 10px;
            margin-top: -5px;
          }
        }
      }
      .monitorBlock:hover {
        background: rgba(207, 17, 27, 0.2);
        border: 1px solid rgba(207, 17, 27, 1);
        .closeWapper {
          display: inline-block;
        }
        p {
          color: #cf111b;
        }
      }
    }
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__label {
    color: #000;
    line-height: 36px;
  }
  .el-form-item__content {
    line-height: 31px;
  }
  .el-button--text {
    color: #cf111b;
  }
  .el-button--medium {
    font-size: 20px;
  }
  .remarkWapper {
    max-height: 260px;
    overflow-y: auto;
  }
  .el-dialog__header {
    padding: 10px 20px;
    background: #eee !important;
    border-radius: 6px 6px 0 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #000;
  }
  .el-dialog__headerbtn .el-dialog__close:hover {
    color: #cf111b;
  }
  .el-dialog__body {
    font-size: 20px;
    color: #000;
    padding: 0 0 20px;
  }
  .companyListGongsiwz {
    display: inline-block;
    width: calc(100% - 150px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }

  .comLxfsSec {
    display: inline-block;
    width: calc(100% - 150px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }
  .remark {
    zoom: 1;
    position: relative;
    // margin-bottom: 20px;
    padding: 19px 20px 16px;
    .time {
      margin-top: 4px;
    }
  }
  .remark:nth-child(odd) {
    background: #f7f6f6;
  }

  .subt {
    margin-top: 10px;
    margin-right: 20px;
  }
  .remarkRight {
    width: 160px;
    position: absolute;
    right: 20px;
    top: 19px;
    text-align: right;
    span:hover {
      color: #cf111b;
    }
  }
  .el-dialog__header {
    padding: 10px 20px;
    background: #eee !important;
    border-radius: 6px 6px 0 0;
  }
  .el-dialog {
    border-radius: 6px;
  }
  .remarkLeft {
    margin-right: 160px;
  }
  .modify {
    margin-right: 20px;
  }
  .el-row {
    margin-bottom: 10px;
  }
  .rowManage {
    padding: 20px 20px 0;
    .el-form-item__content {
      margin-left: 0 !important;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
  }

  .moniterListTips {
    text-align: center;
    line-height: 170px;
  }
}
.cancelCollection {
  background: #fff !important;
  border-color: #cf111b !important;
  color: #000 !important;
  height: 36px !important;
  width: 80px !important;
  vertical-align: middle !important;
  font-size: 20px !important;
  padding: 0 !important;
}
</style>
