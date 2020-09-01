<template>
  <div id="C_content_hyxq">
    <div class="C_container">
      <div class="C_title">
        <span class="Title_left"></span>
        {{Base64.decode(this.$route.query.title)}}
        <span class="ctspan fontSize20">
          企业数量总数为
          <i class="cti">{{this.allTotal }}</i> 家
        </span>
        <el-popover placement="top-start" title trigger="click">
          <el-form ref="form" label-width="112px" :model="form" :rules="rules">
            <el-form-item label="企业驻地：">
              <el-select placeholder="省" v-model="form.sheng" clearable @change="getShi">
                <el-option
                  v-for="item in Shewng"
                  :key="item.suoshusf"
                  :label="item.suoshusf"
                  :value="item.suoshusf"
                ></el-option>
              </el-select>
              <el-select placeholder="市" v-model="form.shi" clearable>
                <el-option
                  v-for="item in shi"
                  :key="item.suoshucs"
                  :label="item.suoshucs"
                  :value="item.suoshucs"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出资类型：">
              <el-radio-group v-model="form.qiyelx">
                <el-radio label value>全部</el-radio>
                <el-radio label="1" value="1">大陆企业</el-radio>
                <el-radio label="2" value="2">港澳台企业</el-radio>
                <el-radio label="3" value="3">外资企业</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="成立年限：" prop="styear">
              <el-col :span="12">
                <el-form-item prop="styear">
                  <el-input style="width:auto;" v-model="form.styear" placeholder="最小年限"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col style="text-align: center;" :span="2">-</el-col> -->
              <el-col :span="12">
                <el-form-item prop="endyear">
                  <el-input style="width:auto;" v-model="form.endyear" placeholder="最大年限"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="注册资本：">
              <el-col :span="12">
                <el-form-item prop="stziben">
                  <el-input style="width:auto;" v-model="form.stziben" placeholder="最小注册资本(万元)"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col style="text-align: center;" :span="2">-</el-col> -->
              <el-col :span="12">
                <el-form-item prop="endziben">
                  <el-input style="width:auto;" v-model="form.endziben" placeholder="最大注册资本(万元)"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="联系方式：">
              <el-radio-group size="medium" v-model="form.dianhua">
                <el-radio label value>全部</el-radio>
                <el-radio label="1">有联系方式</el-radio>
                <el-radio label="2">无联系方式</el-radio>
                <!-- <el-radio label="3" >其它</el-radio> -->
              </el-radio-group>
            </el-form-item>
            <div>
              <el-form-item label="对外投资：">
                <el-radio-group v-model="form.invest">
                  <el-radio label value>全部</el-radio>
                  <el-radio label="是">有对外投资</el-radio>
                  <el-radio label="否">无对外投资</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="对外担保：">
                <el-radio-group v-model="form.guaranty" diabled>
                  <el-radio label value>全部</el-radio>
                  <el-radio label="是">有对外担保</el-radio>
                  <el-radio label="否">无对外担保</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <el-form-item style="margin:0">
              <el-button size="mini" type="primary" @click="submitForm('form')">确定</el-button>&nbsp;&nbsp;
              <el-button size="mini" type="primary" @click="delForm('form')">清空</el-button>
            </el-form-item>
          </el-form>
          <el-tag
            style="display:inline-block;  margin-right:10px;  vertical-align: middle;  cursor:pointer; font-size:20px;"
            slot="reference"
            type="danger"
          >高级检索</el-tag>
        </el-popover>

        <el-button class="rtPark" @click="rtPark" type="primary">返回</el-button>
        <el-button
          class="rtPark"
          style="margin-right:30px;"
          @click="download"
          v-if="unitCode==3"
          type="primary"
        >导出</el-button>
        <div class="inline fontSize20 floatR CollectionWapper" @click="addCool" v-if="!isColl">
          <img class="Collection inline" src="../../../assets/images/Collection/CollectionW.svg" />
          <span class="inline">收藏</span>
        </div>
        <div class="inline fontSize20 floatR CollectionWapper" @click="delCool" v-else>
          <img class="Collection inline" src="../../../assets/images/Collection/CollectionR.svg" />
          <span class="inline colorH">收藏</span>
        </div>
      </div>
    </div>
    <el-collapse v-model="activeName" @change="handleChange">
      <!-- A股公司 -->
      <el-collapse-item v-show="total2" name="2">
        <template slot="title">
          <div class="ind-title">
            <p class="fontSize20">
              <i class="icon icon-tips"></i>
              <span>A股公司</span> 企业数量共
              <i class="icon-data">{{total2}}</i>家
            </p>
          </div>
        </template>
        <section class="border-bottom">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData2" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="公司名称" width="440" align="left">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{ scope.row.name }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="suoshusf" label="所属省份" align="center"></el-table-column>
                <el-table-column prop="fadingdbr" label="法定代表人" align="center"></el-table-column>
                <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center">
                  <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                </el-table-column>
                <el-table-column prop="chenglisj" label="成立时间" align="center">
                  <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination" v-loading="loading" v-show="total2 >10">
            <el-pagination
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="handleCurrentChange($event,2)"
              :page-size="10"
              :current-page="page2"
            ></el-pagination>
            <el-button
              size="small"
              :disabled="suibian2"
              class="paginationsy"
              @click="paginationsy(2)"
            >首页</el-button>
          </div>
          <!-- 分页dom end -->
          <!-- <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChange($event,2)"
              :page-size="10"
              :current-page="page2"
              :total="total2"
              background
          ></el-pagination>-->
        </section>
      </el-collapse-item>
      <!-- 三板公司 -->
      <el-collapse-item v-show="total3" name="3">
        <template slot="title">
          <div class="ind-title">
            <p class="fontSize20">
              <i class="icon icon-tips"></i>
              <span>三板公司</span> 企业数量共
              <i class="icon-data">{{total3}}</i>家
            </p>
          </div>
        </template>
        <section class="border-bottom">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData3" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="公司名称" width="440" align="left">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{ scope.row.name }}</router-link>
                  </template>
                </el-table-column>

                <el-table-column prop="suoshusf" label="所属省份" align="center"></el-table-column>
                <el-table-column prop="fadingdbr" label="法定代表人" align="center"></el-table-column>
                <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center">
                  <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                </el-table-column>
                <el-table-column prop="chenglisj" label="成立时间" align="center">
                  <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination" v-loading="loading" v-show="total3 >10">
            <el-pagination
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="handleCurrentChange($event,3)"
              :page-size="10"
              :current-page="page3"
            ></el-pagination>
            <el-button
              size="small"
              :disabled="suibian3"
              class="paginationsy"
              @click="paginationsy(3)"
            >首页</el-button>
          </div>
          <!-- 分页dom end -->
        </section>
      </el-collapse-item>
      <!-- 四版公司 -->
      <el-collapse-item v-show="total4" name="4">
        <template slot="title">
          <div class="ind-title">
            <p class="fontSize20">
              <i class="icon icon-tips"></i>
              <span>四板公司</span> 企业数量共
              <i class="icon-data">{{total4}}</i>家
            </p>
          </div>
        </template>
        <section class="border-bottom">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData4" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="公司名称" width="440" align="left">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{ scope.row.name }}</router-link>
                  </template>
                </el-table-column>

                <el-table-column prop="suoshusf" label="所属省份" align="center"></el-table-column>
                <el-table-column prop="fadingdbr" label="法定代表人" align="center"></el-table-column>
                <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center">
                  <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                </el-table-column>
                <el-table-column prop="chenglisj" label="成立时间" align="center">
                  <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination" v-loading="loading" v-show="total4 > 10">
            <el-pagination
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="handleCurrentChange($event,4)"
              :page-size="10"
              :current-page="page4"
            ></el-pagination>
            <el-button
              size="small"
              :disabled="suibian4"
              class="paginationsy"
              @click="paginationsy(4)"
            >首页</el-button>
          </div>
          <!-- 分页dom end -->
        </section>
      </el-collapse-item>
      <!-- 以私募融资公司 -->
      <el-collapse-item v-show="total5" name="5">
        <template slot="title">
          <div class="ind-title">
            <p class="fontSize20">
              <i class="icon icon-tips"></i>
              <span>已私募融资公司</span> 企业数量共
              <i class="icon-data">{{total5}}</i>家
            </p>
          </div>
        </template>
        <section class="border-bottom">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData5" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="公司名称" width="440" align="left">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{ scope.row.name }}</router-link>
                  </template>
                </el-table-column>

                <el-table-column prop="suoshusf" label="所属省份" align="center"></el-table-column>
                <el-table-column prop="fadingdbr" label="法定代表人" align="center"></el-table-column>
                <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center">
                  <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                </el-table-column>
                <el-table-column prop="chenglisj" label="成立时间" align="center">
                  <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination" v-loading="loading" v-show="total5 >10">
            <el-pagination
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="handleCurrentChange($event,5)"
              :page-size="10"
              :current-page="page5"
            ></el-pagination>
            <el-button
              size="small"
              :disabled="suibian5"
              class="paginationsy"
              @click="paginationsy(5)"
            >首页</el-button>
          </div>
          <!-- 分页dom end -->
        </section>
      </el-collapse-item>
      <!-- 非挂牌非上市公司 -->
      <el-collapse-item v-show="total6" name="6">
        <template slot="title">
          <div class="ind-title">
            <p class="fontSize20">
              <i class="icon icon-tips"></i>
              <span>{{Base64.decode(this.$route.query.title)}}相关公司</span> 企业数量共
              <i class="icon-data">{{total6}}</i>家
            </p>
          </div>
        </template>
        <section class="border-bottom">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData6" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="公司名称" width="440" align="left">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{ scope.row.name }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="suoshusf" label="所属省份" align="center"></el-table-column>
                <el-table-column prop="fadingdbr" label="法定代表人" align="center"></el-table-column>
                <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center">
                  <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                </el-table-column>
                <el-table-column prop="chenglisj" label="成立时间" align="center">
                  <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination" v-loading="loading" v-show="total6 > 10">
            <el-pagination
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="handleCurrentChange($event,6)"
              :page-size="10"
              :current-page="page6"
            ></el-pagination>
            <el-button
              size="small"
              :disabled="suibian6"
              class="paginationsy"
              @click="paginationsy(6)"
            >首页</el-button>
          </div>
          <!-- 分页dom end -->
        </section>
      </el-collapse-item>
      <!-- 海外上市公司 -->
      <el-collapse-item v-show="total7" name="7">
        <template slot="title">
          <div class="ind-title">
            <p class="fontSize20">
              <i class="icon icon-tips"></i>
              <span>海外上市公司</span> 企业数量共
              <i class="icon-data">{{total7}}</i>家
            </p>
          </div>
        </template>
        <section class="border-bottom">
          <div class="query-result">
            <div class="table-wrapper">
              <el-table stripe :data="tableData7" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="公司名称" width="440" align="left">
                  <template slot-scope="scope">
                    <router-link
                      target="_blank"
                      tag="a"
                      style="color:#606266;text-decoration:none;"
                      :to="{ path:'/CompanyDetails', query: { name: Base64.encode(scope.row.name) }}"
                    >{{ scope.row.name }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="suoshusf" label="所属省份" align="center"></el-table-column>
                <el-table-column prop="fadingdbr" label="法定代表人" align="center"></el-table-column>
                <el-table-column prop="zhucezbint" label="注册资本(万元)" align="center">
                  <template slot-scope="{row}">{{ row.zhucezbint || '-' }}</template>
                </el-table-column>
                <el-table-column prop="chenglisj" label="成立时间" align="center">
                  <template slot-scope="{row}">{{ row.chenglisj || '-' }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页dom start -->
          <div id="Pagination" v-loading="loading" v-show="total7 >10">
            <el-pagination
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="handleCurrentChange($event,7)"
              :page-size="10"
              :current-page="page7"
            ></el-pagination>
            <el-button
              size="small"
              :disabled="suibian7"
              class="paginationsy"
              @click="paginationsy(7)"
            >首页</el-button>
          </div>
          <!-- 分页dom end -->
        </section>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    var styear = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        if (Number.isInteger(Number(value)) && Number(value) > 0) {
          callback();
        } else {
          callback(new Error("请输入大于0的整数"));
        }
      }
    };
    var endyear = (rule, value, callback) => {
      var self = this;
      if (self.form.styear != "") {
        if (value === "") {
          callback(new Error("请输入大于开始年限的整数"));
        } else if (value * 1 <= self.form.styear) {
          callback(new Error("请输入大于开始年限的整数"));
        }else if(value.length>9){
          callback(new Error("请输入十位以内整数"));
        } else {
          callback();
        }
      }else if(value != ''){
         callback(new Error("请输入最小年限"));
      } else {
        callback();
      }
    };
    var endziben = (rule, value, callback) => {
      var self = this;
      if (self.form.stziben != "") {
        if (value === "") {
          callback(new Error("请输入大于最小资本的整数"));
        } else if (value * 1 <= self.form.stziben) {
          callback(new Error("请输入大于最小的整数"));
        } else if(value.length>9){
          callback(new Error("请输入十位以内整数"));
        }else {
          callback();
        }
      } else if(value != ''){
         callback(new Error("请输入最小资本"));
      }else {
        callback();
      }
    };
    return {
      activeName: [],
      isColl: false,
      userName: "",
      mobile: "",
      coolId: "",
      suibian: true,
      suibian2: true,
      suibian3: true,
      suibian4: true,
      suibian5: true,
      suibian6: true,
      suibian7: true,
      allTotal: "",
      total7: 0,
      total6: 0,
      total5: 0,
      total2: 0,
      total3: 0,
      total4: 0,
      page: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      page5: 1,
      page6: 1,
      page7: 1,
      tableData6: [],
      tableData5: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData7: [],
      title: "",
      loading: true,
      isCountData: true,
      pagelen: 0,
      form: {
        sheng: "",
        shi: "",
        styear: "",
        endyear: "",
        stziben: "",
        endziben: "",
        qiyelx: "",
        dianhua: "",
        guaranty: "",
        invest: "",
        shengyu: 0,
        yidao: 0
      },
      rules: {
        styear: [{ validator: styear, trigger: "blur" }],
        endyear: [{ validator: endyear, trigger: "blur" }],
        stziben: [{ validator: styear, trigger: "blur" }],
        endziben: [{ validator: endziben, trigger: "blur" }]
      },
      Shewng: {},
      shi: {},
      unitCode: "",
      shengyu: 0
    };
  },
  mounted() {
    var self = this;
    self.username = localStorage.getItem("userName");
    self.mobile = localStorage.getItem("mobile");
    self.title = Base64.decode(self.$route.query.title);
    self.unitCode = localStorage.getItem("unitCode");
    self.coolInfo();
    self.tableList("2");
    self.getSheng();
    self.Exportcount();
  },
  created() {},
  methods: {
    download() {
      var self = this;
      console.log(self.username);
      console.log(self.mobile);
      this.$prompt(
        "请输入导出条数(剩余额度" + this.shengyu + "条)",
        "导出向导",
        {
          confirmButtonText: "导出",
          cancelButtonText: "取消",
          showCancelButton: false,
          inputPattern: /^(0\.0[1-9]|0\.[1-9]\d|[1-9]\d?(\.\d\d)?|[1-4]\d\d(\.\d\d)?|500)$/,
          inputErrorMessage: "请输入1-500之间的整数"
        }
      )
        .then(({ value }) => {
          if (value > self.shengyu) {
            this.$message.error("导出数量超出今日额度");
          } else {
            let url =
              self.api.exporthangye +
              "?capitalMarketMark=" +
              self.title +
              "&sheng=" +
              self.form.sheng +
              "&shi=" +
              self.form.shi +
              "&styear=" +
              self.form.styear +
              "&endyear=" +
              self.form.endyear +
              "&stziben=" +
              self.form.stziben +
              "&endziben=" +
              self.form.endziben +
              "&qiyelx=" +
              self.form.qiyelx +
              "&dianhua=" +
              self.form.dianhua +
              "&guaranty=" +
              self.form.guaranty +
              "&invest=" +
              self.form.invest +
              "&userName=" +
              self.username +
              "&num=" +
              value +
              "&telphone=" +
              self.mobile;
            window.location.href = url; //  跳转链接
            setTimeout(function() {
              self.Exportcount();
            }, 2000);
            console.log(url)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消导出"
          });
        });
    },
    Exportcount() {
      var self = this;
      let params = {
        username: self.username,
        telphone: self.mobile,
      };
      this.axios({
        url: this.api.Exportcount,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.shengyu = res.data.data[0].shengyu;
        self.yidao = res.data.data[0].yidao;
      });
    },
    coolInfo() {
      var self = this;
      let params = {
        userName: self.username,
        mobile: self.mobile,
        collectIndustry: Base64.decode(this.$route.query.title),
        identification: 0
      };
      this.axios({
        url: this.api.collectionistrue,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.isColl = res.data.data.flag == "true" ? true : false;
        console.log(self.isColl);
        self.coolId = res.data.data.id;
      });
    },

    addCool() {
      var self = this;
      let params = {
        userName: self.username,
        mobile: self.mobile,
        collectIndustry: Base64.decode(this.$route.query.title),
        identification: 0
      };
      this.axios({
        url: this.api.addindustry,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.msg == "成功") {
          this.$message({
            message: "收藏成功!",
            type: "success"
          });
          self.isColl = true;
          self.coolId = res.data.data.id;
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },

    delCool() {
      var self = this;
      let params = {
        id: self.coolId
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
          self.isColl = false;
        } else {
          this.$message.error("服务器走丢了!");
        }
      });
    },
    // 分页--回到首页按钮  start
    paginationsy(index) {
      var self = this;
      if (self.page === 1) {
      } else {
        // this.page = 1
        self.handleCurrentChange(1, index);
      }
    },
    // 分页--回到首页按钮  end
    aslert(index) {
      this.$alert(index, "提示", {
        confirmButtonText: "确定",
        callback: action => {}
      });
    },
    rtPark() {
      window.history.go(-1);
    },
    getSheng() {
      var self = this;
      let params = {
        capitalMarketMark: self.title
      };
      this.axios({
        url: this.api.industryChainSheng,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.Shewng = res.data.data;
      });
    },
    submitForm(formName) {
      var self = this;
      self.isCountData = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // self.activeName = "";
          self.page2 = 1;
          self.page3 = 1;
          self.page3 = 1;
          self.page4 = 1;
          self.page5 = 1;
          self.page6 = 1;
          self.page7 = 1;
          self.tableList("2");
        } else {
          this.$message("请正确填写相应信息");
        }
      });
    },
    delForm() {
      var self = this;
      self.isCountData = true;
      self.activeName = [];
      (self.form = {
        sheng: "",
        shi: "",
        styear: "",
        endyear: "",
        stziben: "",
        endziben: "",
        qiyelx: "",
        dianhua: "",
        guaranty: "",
        invest: ""
      }),
        self.tableList("2");
    },
    getShi() {
      var self = this;
      self.form.shi = "";
      let params = {
        capitalMarketMark: self.title,
        sheng: self.form.sheng
      };
      this.axios({
        url: this.api.industryChainShi,
        data: this.$qs.stringify(params),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        self.shi = res.data.data;
      });
    },
    handleChange(val) {
      var self = this;
      self.isCountData = false;
      self.page = 1;
      if (val.length != 0) {
        if (self.pagelen <= val.length) {
          var index = val.slice(-1)[0];
          if (index == 2) {
            self.page2 = 1;
          }
          if (index == 3) {
            self.page3 = 1;
          }
          if (index == 4) {
            self.page4 = 1;
          }
          if (index == 5) {
            self.page5 = 1;
          }
          if (index == 6) {
            self.page6 = 1;
          }
          if (index == 7) {
            self.page7 = 1;
          }
          self.handleCurrentChange(1, index);
        } else {
          self.pagelen = val.length;
        }
      }
    },
    handleCurrentChange(val, index) {
      var self = this;
      self.page = val;
      if (index == 2) {
        self.page2 = val;
        self.suibian2 = false;
      }
      if (index == 3) {
        self.page3 = val;
        self.suibian3 = false;
      }
      if (index == 4) {
        self.page4 = val;
        self.suibian4 = false;
      }
      if (index == 5) {
        self.page5 = val;
        self.suibian5 = false;
      }
      if (index == 6) {
        self.page6 = val;
        self.suibian6 = false;
      }
      if (index == 7) {
        self.page7 = val;
        self.suibian7 = false;
      }
      self.tableList(index);
    },
    tableList(index) {
      var self = this;
      // // 分页--调用没数据的接口后，重置分页 start
      var right = document.getElementsByClassName("btn-next");
      // right[0].disabled =  "disabled";
      // // 分页--调用没数据的接口后，重置分页 end
      if (index == 2) {
        self.page = self.page2;
      }
      if (index == 3) {
        self.page = self.page3;
      }
      if (index == 4) {
        self.page = self.page4;
      }
      if (index == 5) {
        self.page = self.page5;
      }
      if (index == 6) {
        self.page = self.page6;
      }
      if (index == 7) {
        self.page = self.page7;
      }
      self.loading = true;
      console.log(index);
      // if(index == "2"){
      //   self.isCountData = false
      // }
      let params = {
        pageNumber: self.page,
        pageSize: 10,
        zibenscdy: index,
        capitalMarketMark: self.title,
        isCountData: self.isCountData,
        sheng: self.form.sheng,
        shi: self.form.shi,
        styear: self.form.styear,
        endyear: self.form.endyear,
        stziben: self.form.stziben,
        endziben: self.form.endziben,
        qiyelx: self.form.qiyelx,
        dianhua: self.form.dianhua,
        guaranty: self.form.guaranty,
        invest: self.form.invest
      };
      this.axios({
        url: this.api.ESsearchlistbyzibenscdy,
        method: "post",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (self.isCountData) {
          self.total2 = 0;
          self.total3 = 0;
          self.total4 = 0;
          self.total5 = 0;
          self.total6 = 0;
          self.total7 = 0;
          self.allTotal = 0;
          var arr = res.data.data.map(index => {
            return index.zibenscdy;
          });
          arr.sort(function(a, b) {
            return a - b;
          });
          self.isCountData = false;
          console.log(arr);

          self.activeName.push(arr[0]);
          self.tableList(arr[0]);
          var newArr = res.data.data.filter(function(obj) {
            return obj.zibenscdy == arr[0];
          });
          if (newArr[0].count <= 5) {
            self.activeName.push(arr[1]);
            self.tableList(arr[1]);
          }
          console.log(self.activeName);
          var total = res.data.data.filter(function(x) {
            if (x.zibenscdy == 2) {
              self.total2 = x.count;
            }
            if (x.zibenscdy == 3) {
              self.total3 = x.count;
            }
            if (x.zibenscdy == 4) {
              self.total4 = x.count;
            }
            if (x.zibenscdy == 5) {
              self.total5 = x.count;
            }
            if (x.zibenscdy == 6) {
              self.total6 = x.count;
            }
            if (x.zibenscdy == 7) {
              self.total7 = x.count;
            }
            if (x.allTotal) {
              self.allTotal = x.allTotal;
            }
          });
        } else {
          right[index - 2].disabled = "";
          //分页--总条数<=20，禁用右按钮  start
          var cot = Math.ceil(res.data.data.totalRow / 10);
          if (cot <= self.page) {
            right[index - 2].disabled = "disabled";
          } else {
            right[index - 2].disabled = "";
          }
          if (index == 6) {
            self.suibian6 = self.page == 1 ? true : false;
            self.tableData6 = res.data.data.list;
          } else if (index == 5) {
            self.suibian5 = self.page == 1 ? true : false;
            self.tableData5 = res.data.data.list;
          } else if (index == 2) {
            self.suibian2 = self.page == 1 ? true : false;
            self.tableData2 = res.data.data.list;
          } else if (index == 3) {
            self.suibian3 = self.page == 1 ? true : false;
            self.tableData3 = res.data.data.list;
          } else if (index == 4) {
            self.suibian4 = self.page == 1 ? true : false;
            self.tableData4 = res.data.data.list;
          } else if (index == 7) {
            self.suibian7 = self.page == 1 ? true : false;
            self.tableData7 = res.data.data.list;
          }
        }
        self.pagelen = self.activeName.length;
        self.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" >
#C_content_hyxq {
  .C_title {
    border-radius: 6px 6px 0 0;
    background: #fff;
    line-height: 60px;
    border-bottom: 2px solid #f0f2f5;
    padding: 0 10px 0 0;
    font-size: 28px;
    font-weight: 600;
    .Title_left {
      display: inline-block;
      height: 36px;
      width: 20px;
      background: #cf111b;
      vertical-align: middle;
      margin-right: 9px;
      margin-top: -2px;
    }
    .ctspan {
      margin-left: 10px;
      font-weight: 500;
      margin-right: 40px;
      .cti {
        margin: 0 5px;
        padding: 1px 5px;
        color: #fff;
        line-height: 1.2;
        background-color: #c03532;
        border-radius: 4px;
        margin-left: 10px;
        font-weight: 400;
      }
    }
  }
  .ind-title {
    span {
      line-height: 50px;
      white-space: nowrap;
      font-weight: 700;
      margin-right: 5px;
    }
  }
  .icon-data {
    margin: 0 5px;
    padding: 1px 5px;
    color: #fff;
    font-size: 20px;
    line-height: 1.2;
    background-color: #c03532;
    border-radius: 4px;
    margin-left: 10px;
    font-weight: 400;
  }
}
.el-select .el-input .el-input__inner {
  padding-right: 20px;
  font-size: 20px;
}
.el-form-item__label {
  font-size: 20px;
}
.el-radio__label {
  font-size: 20px;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #c03532;
  background: #c03532;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #c03532;
}
</style>
<style lang="scss" scoped>
.rtPark {
  float: right;
  margin-top: 12px;
}
</style>
