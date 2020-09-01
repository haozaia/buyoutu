<template>
    <div id="GovernmentDetails">
        <div id="C_content">
            <div class="C_container">
                <div class="C_title">
                    <span class="Title_left"></span>{{ titleM }}
                    <el-button class="GovernmentDetailsRtPark" @click="rtPark" type="primary">返回</el-button>
                    <el-button v-if="this.chaungjianren == this.dflUserId || operaYN == 1" class="GovernmentIncreaseBJ" @click="GovernmentBJ" type="primary">编辑</el-button>
                    <el-button v-if="this.chaungjianren == this.dflUserId || operaYN == 1" class="GovernmentIncreasePreservation" @click="presub('essentialForm')" type="primary">保存</el-button>
                    <el-button v-if="activeName == 'second'" class="xinzenglianxirBtn" @click="contractAdd()" type="primary">新增合同</el-button>
                </div>
                <div class="GovernmentFORM">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="基本信息" name="first">
                            <div class="EssentialForm">
                                <p class="Esinformation">1、基本信息</p>
                                <el-form :model="ruleForm" :rules="rules" ref="essentialForm" label-width="132px" class="demo-ruleForm">
                                    <el-row>
                                        <el-col :span="8">
                                            <i style="position: absolute;top: 10px;font-size: 18px;color: #F56C6C;">*</i>
                                            <el-form-item style="margin-left:10px;" prop="xuanzequyu" label="选择区域:">
                                                <el-cascader
                                                placeholder="请选择区域"
                                                :options="options1"
                                                :props="{ checkStrictly: true }"
                                                @change="handleChange1"
                                                :disabled="selectDisabled"
                                                v-model="selected"
                                                ></el-cascader>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="全称:" prop="govermentSector">
                                                <el-input v-model="ruleForm.govermentSector" :readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <i style="position: absolute;top: 10px;font-size: 18px;color: #F56C6C;">*</i>
                                            <el-form-item style="margin-left:10px" prop="zhongdianchanye" label="重点产业:"> 
                                                <el-select :title="industry1" placeholder="" filterable multiple :multiple-limit="3" collapse-tags v-model="industry1" style="width:100%;">
                                                    <el-option
                                                        v-for="(item,index) in cities"
                                                        :key="index"
                                                        :label="item.name"
                                                        :value="item.name"
                                                        :disabled="selectDisabled"
                                                    ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="编号:">
                                                <el-input v-model="govermentSerialNumber" readonly="true"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                                <el-form-item label="跟进类型:">
                                                    <!-- <el-input v-model="ruleForm.name"></el-input> -->
                                                    <el-select placeholder="" filterable collapse-tags @change="genjinchange" v-model="followCategoryName" style="width:100%;">
                                                        <el-option
                                                            v-for="(item,index) in genjinleixingdata"
                                                            :key="index"
                                                            :label="item.name"
                                                            :value="item.value"
                                                            :disabled="selectDisabled"
                                                        ></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="推进阶段:">
                                                    <!-- <el-input v-model="ruleForm.name"></el-input> -->
                                                    <el-select placeholder="" filterable collapse-tags @change="tuijinchange" v-model="promotingCooperationName" style="width:100%;">
                                                        <el-option
                                                            v-for="(item,index) in tuijinjieduandata"
                                                            :key="index"
                                                            :label="item.name"
                                                            :value="item.value"
                                                            :disabled="selectDisabled"
                                                        ></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="待回访时间:">
                                                <div class="block">
                                                    <el-date-picker
                                                    v-model="ruleForm.nextVisitTime"
                                                    type="date"
                                                    :disabled="selectDisabled"
                                                    value-format="yyyy-MM-dd"
                                                    @change="timechange"
                                                    placeholder="选择日期">
                                                    </el-date-picker>
                                                </div>
                                            </el-form-item>
                                        </el-col>
                                        <el-col style="width:100%;" :span="8">
                                            <el-form-item label="三句亮点:">
                                                <!-- <el-input v-model="ruleForm.lightspot" :readonly="readonly"></el-input> -->
                                                <el-input style="font-size:20px;" type="textarea" v-model="ruleForm.lightspot" :autosize="autosize" :readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                            <div>
                                <p class="Esinformation">2、联系跟进</p>
                                <el-button v-if="this.chaungjianren == this.dflUserId || operaYN == 1" class="xinzenglianxirBtn" style="margin:0;" @click="Increase()" type="primary">新增联系人</el-button>
                            </div>
                            <div class="el-tabs">
                                <div class="query-result">
                                <div style="padding-top:10px;"></div>
                                    <div class="table-wrapper">
                                        <el-table stripe :data="contactData" style="width: 100%">
                                        <el-table-column label="序号" width="70px">
                                            <template slot-scope="scope">
                                                {{scope.$index+1}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="govermentOfficialName" label="姓名"></el-table-column>
                                        <el-table-column prop="gender" label="性别">
                                            <template slot-scope="{row}">
                                                <span v-if="row.gender == 0">{{ '未知' }}</span>
                                                <span v-if="row.gender == 1">{{ '男' }}</span>
                                                <span v-if="row.gender == 2">{{ '女' }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="duty" label="职务"></el-table-column>
                                        <el-table-column prop="govermentOfficialMobile" label="手机号">
                                            <template slot-scope="{row}">
                                                {{ row.govermentOfficialMobile || '-' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="wechatNumber" label="微信号">
                                            <template slot-scope="{row}">
                                                {{ row.wechatNumber || '-' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="govermentOfficialTelephone" label="座机">
                                            <template slot-scope="{row}">
                                                {{ row.govermentOfficialTelephone || '-' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column v-if="this.chaungjianren == this.dflUserId || operaYN == 1" prop="govermentOfficialTelephone" width="100" label="操作">
                                            <template slot-scope="scope">
                                                <span class="curPoi modify" @click="openDialog(scope.row)">
                                                    <i class="el-icon-edit"></i>
                                                </span>
                                                <span class="curPoi modify" @click="PeopleDelete(scope.row)">
                                                    <i class="el-icon-delete"></i>
                                                </span>
                                            </template>
                                        </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <!-- 分页dom start -->
                                    <div id="Pagination" v-show="total > 20">
                                    <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"  :page-size="20" :current-page="page"></el-pagination>
                                    <el-button size="small" :disabled="suibian" class="paginationsy" @click="paginationsy">首页</el-button>
                                    </div>
                                <!-- 分页dom end -->
                            </div>
                        </el-tab-pane>
                        
                        <el-tab-pane label="政府签约" name="second">
                            <!-- 委托招商合同 start -->
                            <div class="el-tabs">
                                <div class="query-result">
                                <div style="padding-top:10px;"></div>
                                    <div class="table-wrapper">
                                        <el-table stripe :data="contractData" style="width: 100%">
                                        <!-- <el-table-column label="序号" width="70px">
                                            <template slot-scope="scope">
                                                {{scope.$index+1}}
                                            </template>
                                        </el-table-column> -->
                                        <el-table-column prop="govermentUnit" label="往来单位"></el-table-column>
                                        <el-table-column prop="custodian" label="管理人"></el-table-column>
                                        <el-table-column prop="contractWay" label="签约方式"></el-table-column>
                                        <el-table-column prop="inspectTime" label="考察时间">
                                            <template slot-scope="{row}">
                                                {{ row.govermentOfficialMobile || '-' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="returnedMoneyTime" label="回款时间">
                                            <template slot-scope="{row}">
                                                {{ row.wechatNumber || '-' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="contractTime" label="签约时间">
                                            <template slot-scope="{row}">
                                                {{ row.govermentOfficialTelephone || '-' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="contractExpirationTime" label="合同到期时间">
                                            <template slot-scope="{row}">
                                                {{ row.govermentOfficialTelephone || '-' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column v-if="this.chaungjianren == this.dflUserId || operaYN == 1" prop="govermentOfficialTelephone" width="100" label="操作">
                                            <template slot-scope="scope">
                                                <span class="curPoi modify" @click="contractModify(scope.row)">
                                                    <i class="el-icon-edit"></i>
                                                </span>
                                                <span class="curPoi modify" @click="contractDelete(scope.row)">
                                                    <i class="el-icon-delete"></i>
                                                </span>
                                            </template>
                                        </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <!-- 分页dom start -->
                                    <div id="Pagination" v-show="total1 > 20">
                                    <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange1"  :page-size="20" :current-page="page1"></el-pagination>
                                    <el-button size="small" :disabled="suibian1" class="paginationsy" @click="paginationsy1">首页</el-button>
                                    </div>
                                <!-- 分页dom end -->
                            </div>
                            <!-- 委托招商合同 end -->
                        </el-tab-pane>
                        <el-tab-pane label="上传附件" name="sixth" :disabled="lianxiDisbled">
                            <div v-if="this.chaungjianren == this.dflUserId || operaYN == 1" class="uploadWapper">
                                <el-upload
                                    class="upload-demo"
                                    :show-file-list="false"
                                    :on-success="handlesuccess"
                                    name="multipartFiles"
                                    :action="api.collectionMoreFileUpload"
                                    :data="UpData"
                                    :before-upload="uploadbefore"
                                    >
                                    <el-button size="small" type="primary">上传</el-button>
                                    <div slot="tip" class="el-upload__tip inline downTip fontSize20">文件大小不超过50M</div>
                                </el-upload>
                            </div>
                            <div class="el-tabs padding10">
                                <div class="query-result">
                                    <div style="padding-top:10px;"></div>
                                    <div class="table-wrapper">
                                        <el-table stripe :data="downloadList" style="width: 100%">
                                        <el-table-column label="序号" width="70px">
                                            <template slot-scope="scope">
                                                {{scope.$index+1}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="projectName" label="文件名称" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="createTime" label="创建时间">
                                            <template slot-scope="{row}">{{ row.createTime.slice(0,10)}}</template>
                                        </el-table-column>
                                        <el-table-column prop="inputerName" label="操作" width="200">
                                            <template slot-scope="scope">
                                            <div>
                                                <el-button v-if="chaungjianren == dflUserId || operaYN == 1" @click="deleteDownload(scope.row.id)" type="text" size="medium">删除</el-button>
                                                <el-button @click="downloadFile(scope.row.id)" type="text" size="medium">下载</el-button>
                                            </div>
                                            </template>
                                        </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    
                </div>
                <el-dialog :visible.sync="dialogTableVisible" width="82%" @close="dialog_close" class="Appdialog">
                    <div class="title_h">
                        <!-- <i class="icon icon-tips"></i> -->
                        <span class="fontSize24" style="letter-spacing:2px">修改联系人</span>
                        <!-- <el-button class="GovernmentDetailsdialogBJ" @click="dialogBJ()" type="primary">编辑</el-button> -->
                        <el-button class="GovernmentDetailsdialogBC" @click="xiugaiSub('xiugaiForm')" type="primary">保存</el-button>
                    </div>
                    <div class="dialogClose" @click="dialog_close">×</div>
                        <el-form :model="DialogruleForm" :rules="rules" ref="xiugaiForm" label-width="30%" class="demo-ruleForm">
                            <el-row>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 10px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="姓名：" prop="govermentOfficialName">
                                        <el-input v-model="DialogruleForm.govermentOfficialName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 10px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="性别：" prop="gender">
                                        <el-select v-model="gender" clearable placeholder="请选择">
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 10px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="手机号码：" prop="govermentOfficialMobile">
                                        <el-input v-model="DialogruleForm.govermentOfficialMobile"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="微信号：" prop="wechatNumber">
                                        <el-input v-model="DialogruleForm.wechatNumber"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 74px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="职务：" prop="jibie">
                                        <el-cascader
                                        size="large"
                                        :options="dutyoptions"
                                        :props="{ label:'name',value:'value',children:'child'}"
                                        v-model="selectedOptions"
                                        @change="dutyhandleChange">
                                        </el-cascader>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 74px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="级别：" prop="jibie">
                                        <el-select v-model="Increasejibie"  clearable @change="jibiechange" placeholder="请选择">
                                            <el-option
                                            v-for="item in jibieoptions"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="座机号码：" prop="govermentOfficialTelephone">
                                        <el-input placeholder="xxx-xxxxxxxx" v-model="DialogruleForm.govermentOfficialTelephone"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 74px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="是否对接人：" prop="jibie">
                                        <el-select v-model="dockingPeople"  clearable @change="DJpeoplelabel" placeholder="请选择">
                                            <el-option
                                            v-for="item in DJpeopleOptions"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="沟通记录:">
                                        <el-input style="font-size:20px;" type="textarea" resize="vertical" v-model="DialogcommunicationRecord"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                </el-dialog>
                <el-dialog :visible.sync="dialogTabIncrease" width="82%" @close="Increasedialog_close" class="Appdialog">
                    <div class="title_h">
                        <!-- <i class="icon icon-tips"></i> -->
                        <span class="fontSize24" style="letter-spacing:2px">新增联系人</span>
                        <!-- <el-button class="GovernmentDetailsdialogBJ" @click="dialogBJ()" type="primary">编辑</el-button> -->
                        <el-button class="GovernmentDetailsdialogBC" @click="xinzengSub('xinzengruleForm')" type="primary">保存</el-button>
                    </div>
                    <div class="dialogClose" @click="Increasedialog_close">×</div>
                    <el-form :model="IncreaseruleForm" :rules="rules" ref="xinzengruleForm" label-width="30%" class="demo-ruleForm">
                            <el-row>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 10px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="姓名：" prop="govermentOfficialName">
                                        <el-input v-model="IncreaseruleForm.govermentOfficialNameIncrease"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 10px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="性别：" prop="gender">
                                        <el-select v-model="gendervalue" clearable placeholder="请选择">
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 10px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="手机号码：" prop="govermentOfficialMobileIncrease">
                                        <el-input v-model="IncreaseruleForm.govermentOfficialMobileIncrease"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="微信号：" prop="wechatNumber">
                                        <el-input v-model="IncreaseruleForm.wechatNumber"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 74px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="职务：" prop="jibie">
                                        <el-cascader
                                        size="large"
                                        :options="dutyoptions"
                                        :props="{ label:'name',value: 'value',children:'child'}"
                                        v-model="selectedOptions"
                                        @change="dutyhandleChange">
                                        </el-cascader>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 74px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="级别：" prop="jibie">
                                        <el-select v-model="Increasejibie"  clearable @change="Increasejibielabel" placeholder="请选择">
                                            <el-option
                                            v-for="item in jibieoptions"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="座机号码：" prop="govermentOfficialTelephoneIncrease">
                                        <el-input placeholder="xxx-xxxxxxxx" v-model="IncreaseruleForm.govermentOfficialTelephoneIncrease"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <i style="position: absolute;top: 74px;font-size: 18px;color: #F56C6C;">*</i>
                                    <el-form-item style="margin-left:10px" label="是否对接人：" prop="jibie">
                                        <el-select v-model="dockingPeople"  clearable @change="DJpeoplelabel" placeholder="请选择">
                                            <el-option
                                            v-for="item in DJpeopleOptions"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <!-- Governmentofficialsinfodutiesapi -->
                                <el-col :span="8">
                                    <el-form-item label="沟通记录:">
                                        <el-input style="font-size:20px;" type="textarea" resize="vertical" v-model="communicationRecord"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                    </el-form>
                </el-dialog>

                <el-dialog :visible.sync="contractDialog" width="82%" @close="contractDialog_close" class="Appdialog">
                    <div class="title_h">
                        <span class="fontSize24" style="letter-spacing:2px">{{ contractDialog_title }}</span>
                        <el-button class="GovernmentDetailsdialogBC" @click="contractDialog_Add('contractruleForm')" type="primary">保存</el-button>
                    </div>
                    <div class="dialogClose" @click="contractDialog_close">×</div>
                    <el-form :model="contractruleForm" :rules="contractrules" ref="contractruleForm" label-width="180px" class="demo-ruleForm">
                        <el-row>
                            <el-col :span="8">
                                <!-- <i style="position: absolute;top: 10px;font-size: 18px;color: #F56C6C;">*</i> -->
                                <el-form-item style="margin-left:10px" label="单号：" prop="serialNumber">
                                    <el-input placeholder="保存后自动生成" :disabled="contractDisabled" v-model="contractruleForm.serialNumber"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="往来单位：" prop="govermentUnit">
                                    <el-input :disabled="contractDisabled" v-model="contractruleForm.govermentUnit"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="部门：" prop="department">
                                    <el-input :disabled="contractDisabled" v-model="contractruleForm.department"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="管理人：" prop="custodian">
                                    <el-input :disabled="contractDisabled" v-model="contractruleForm.custodian"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="政府对接人：" prop="govLiaisons">
                                    <el-input v-model="contractruleForm.govLiaisons"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="我司部门领导：" prop="departmentHead">
                                    <!-- <el-input v-model="contractruleForm.departmentHead"></el-input> -->
                                    <el-cascader
                                    :title="contractruleForm.departmentHead"
                                    ref="refHandle"
                                    style="width:100%;"
                                    v-model="contractruleForm.departmentHead"
                                    :options="LDList"
                                    :show-all-levels="false"
                                    :props="{multiple:true,value:'label'}"
                                    collapse-tags
                                    clearable
                                    filterable
                                    ></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="签约方式：" prop="contractWay">
                                    <!-- <el-input v-model="contractruleForm.contractWay"></el-input> -->
                                    <el-select :title="contractruleForm.contractWay" filterable collapse-tags v-model="contractruleForm.contractWay" style="width:100%;">
                                        <el-option
                                            v-for="(item,index) in contractqianyueData"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.name"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="我司领导：" prop="companyLeader">
                                    <!-- <el-input v-model="contractruleForm.companyLeader"></el-input> -->
                                    <el-cascader
                                    :title="contractruleForm.companyLeader"
                                    ref="refHandle"
                                    style="width:100%"
                                    v-model="contractruleForm.companyLeader"
                                    :options="LDList"
                                    :show-all-levels="false"
                                    :props="{multiple:true,value:'label'}"
                                    collapse-tags
                                    clearable
                                    filterable
                                    ></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="招投标：" prop="bidStatus">
                                    <!-- <el-input v-model="contractruleForm.bidStatus"></el-input> -->
                                    <el-select :title="contractruleForm.bidStatus" filterable collapse-tags v-model="contractruleForm.bidStatus" style="width:100%;">
                                        <el-option
                                            v-for="(item,index) in contractzhaobiaoData"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.name"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="政府签约人代表：" prop="govSignatoryRepresentative">
                                    <!-- <el-input v-model="contractruleForm.govSignatoryRepresentative"></el-input> -->
                                    <el-select :title="contractruleForm.govSignatoryRepresentative" filterable collapse-tags v-model="contractruleForm.govSignatoryRepresentative" style="width:100%;">
                                        <el-option
                                            v-for="(item,index) in qypeopleData"
                                            :key="index"
                                            :label="item.govermentOfficialName"
                                            :value="item.govermentOfficialName"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="合同补充信息：" prop="contractInformation">
                                    <el-input v-model="contractruleForm.contractInformation"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="发票抬头：" prop="invoiceTitle">
                                    <el-input v-model="contractruleForm.invoiceTitle"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="是否开票：" prop="billingStatus">
                                    <el-checkbox v-model="contractruleForm.billingStatus" @change="contract_ck"></el-checkbox>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="开票类型：" prop="invoiceType">
                                    <!-- <el-input v-model="contractruleForm.invoiceType"></el-input> -->
                                    <el-select :title="contractruleForm.invoiceType" filterable collapse-tags v-model="contractruleForm.invoiceType" style="width:100%;">
                                        <el-option
                                            v-for="(item,index) in contractkaipiaoData"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.name"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="开票总额：" prop="invoiceRental">
                                    <el-input v-model="contractruleForm.invoiceRental"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="产品选择：" prop="companyLeader">
                                    <el-cascader
                                    :title="productDatas.serviceName"
                                    ref="refHandle"
                                    style="width:100%"
                                    v-model="contractruleForm.productIds"
                                    :options="productDatas"
                                    :show-all-levels="false"
                                    :props="{multiple:true,label: 'serviceName', value:'serviceNumber'}"
                                    collapse-tags
                                    clearable
                                    filterable
                                    ></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="考察时间：" prop="inspectTime">
                                    <!-- <el-input v-model="contractruleForm.inspectTime"></el-input> -->
                                    <div class="block">
                                        <el-date-picker
                                        v-model="contractruleForm.inspectTime"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="回款时间：" prop="returnedMoneyTime">
                                    <!-- <el-input v-model="contractruleForm.returnedMoneyTime"></el-input> -->
                                    <div class="block">
                                        <el-date-picker
                                        v-model="contractruleForm.returnedMoneyTime"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="签约时间：" prop="contractTime">
                                    <!-- <el-input v-model="contractruleForm.contractTime"></el-input> -->
                                    <div class="block">
                                        <el-date-picker
                                        v-model="contractruleForm.contractTime"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="margin-left:10px" label="合同到期时间：" prop="contractExpirationTime">
                                    <!-- <el-input v-model="contractruleForm.contractExpirationTime"></el-input> -->
                                    <div class="block">
                                        <el-date-picker
                                        v-model="contractruleForm.contractExpirationTime"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        const serialNumberNull = (rule, value, callback) => {
            var self = this;
            if (value == "" || value == null) {
                callback(new Error("单号不能为空"));
            } else {
                if (/[^\w\.\/]/ig.test(value)) {
                    callback(new Error("请输入数字、英文字母或者两者结合"));
                }else{
                    callback();
                }
            }
        };
        const validateCtext = (rule, value, callback) => {
            var self = this;
            if (value == "" || value == null) {
                callback();
            } else {
                if (!/^\d+(\.\d{0,2})?$/.test(value)) {
                    callback(new Error("请输入数字且最多保留两位小数"));
                } else {
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
                    callback(new Error("6-20位、字母开头、数字、下划线和减号、不可设置中文"));
                }else{
                    callback();
                }
            }
        };
        const Phonetext = (rule, value, callback) => {
            var self = this;
            if (value == "") {
                callback(new Error("请输入手机号"));
            } else {
                if (!/^1[3456789]\d{9}$/.test(value)) {
                    callback(new Error("请输入正确的手机号"));
                } else {
                    callback();
                }
            }
        };

        return{
            //委托招商合同 Start
            contractData: [],// 列表数据
            contractDialog: false,//新增、修改合同弹框默认关闭
            contractDialog_title: "",//合同弹框的title
            contractID: "",//合同ID
            contract_governmentID: "",//政府ID合同用
            contractDisabled: true,//单号、部门、管理人禁用
            contractqianyueData: "",//  签约方式
            contractkaipiaoData: "",//  开票类型
            contractzhaobiaoData: "",// 招投标
            LDList: [],// 领导下拉框
            productDatas: [], //产品选择下拉框
            qypeopleData: [], //签约代表人下拉框
            total1: 0, //
            page1:1, //
            suibian1:true,    //分页变量3
            // checkedNumber: "",
            contractruleForm: {
                serialNumber: "",
                govermentUnit: "",
                department: "",
                custodian: "",
                govLiaisons: "",
                departmentHead: [],
                contractWay: "",
                companyLeader: [],
                productIds: [],
                bidStatus: "",
                govSignatoryRepresentative: "",
                inspectTime: "",
                returnedMoneyTime: "",
                contractTime: "",
                contractExpirationTime: "",
                contractInformation: "",
                //开票信息
                billingStatus: "",//是否开票
                invoiceType: "",
                invoiceTitle: "",
                invoiceRental: "",
            },
            contractrules:{
                govermentUnit: [
                    { required: true, message: '请输入往来单位', trigger: 'blur' },
                ],

                invoiceRental: [{ validator: validateCtext, trigger: "blur" }],
                // serialNumber: [{ required: true, validator: serialNumberNull, trigger: "blur" }],
            },
            //委托招商合同 End




            UpData: {
                id:"",
                type: "1",
            },
            options: [{
                value: '1',
                label: '男'
                }, {
                value: '2',
                label: '女'
                }, {
                value: '0',
                label: '未知'
                },
            ],
            autosize: {minRows:3,maxRows:3},
            dockingPeople: '',
            dockingPeopleCode: '',
            selectedOptions: [],//新职务列表内model
            dutyoptions: [],//弹框内职务列表s
            downloadList: [],//附件列表
            gender: '',
            Increasejibie: "",//级别
            jibie: "",//xiugai级别
            jibiecode: "",
            jibieoptions: [],//级别options
            selectDisabled:true,//下拉框是否可编辑,默认为不可更改
            titleM:'未合作客户 - 详情',
            cooperationStatus:'',
            chaungjianren: "",
            IncreasedutyCode: '', //新增联系人职务标识
            hangye_data: [],//次选行业数据
            chuangjianzheName: '',//创建者姓名
            chuangjianzheMobile: '',//创建者电话号码
            id: '', //政府ID
            contactsID: '', //政府人员信息ID
            inputerName: '',//当前登录用户姓名
            inputerMobile: '',//当前登录用户电话
            dflUserId: '',//当前登录用户ID
            unitCode: '',   //部门唯一标识
            industry1:[], //重点产业
            genjinleixingdata: [],//跟进类型数据
            tuijinjieduandata: [],//推进阶段数据
            readonly: true, //是否禁止编辑，默认为禁止
            options1: [], //城市下拉框
            selected: [], //城市下拉框绑定内容
            province: "", //省份
            city: "", //地市
            area: "", //区县
            contactData: [], //跟进联系数据
            total: 0, //跟进联系
            page:1, //跟进联系
            ceshia:"",
            ceshib:"",
            industry2:"", //跟进类型code
            industry3:"", //推进阶段code
            followCategoryName: "",//跟进类型name
            promotingCooperationName: "",//推进阶段name
            suibian:true,    //跟进联系分页变量3
            activeName: "first",//默认展示政府主要信息
            dialogTableVisible: false, //弹框默认关闭
            dialogTabIncrease: false, //弹框默认关闭(新建人员信息)
            gendervalue: '', //新建联系人性别
            Increaseduty: '', //新建联系人职务
            communicationRecord: "",//沟通记录
            DialogcommunicationRecord: "",//沟通记录
            cities: [],
            secondChoiceIndustry:'',//次选行业model
            otherIndustry: '',//其它产业model
            govermentSerialNumber:"",//表单内编号
            dshtz: "",
            Wh_z: "",
            lianxiDisbled: false,//联系跟进是否显示
            operaYN: 0,
            higherDuty: '',//职务父级
            higherDutyCode:'',//职务父级code
            duty:'',//职务
            dutyCode:'',//职务标识
            DJpeopleOptions:[],
            ruleForm: {
                govermentSector: '',
                lightspot: '',
                railway: '',
                highway: '',
                waterway: '',
                airParcel: '',
                freight: '',
                waterPrice: '',
                naturalGas: '',
                laborCost: '',
                electrovalence: '',
                steamPrice: '',
                freightCost: '',
                waterwayCost: '',
                // developmentTime: '',//开发时间
                nextVisitTime: '',
                //详细情况
                totalArea: '',
                localRevenue: '',
                cityRevenue: '',
                localGdp: '',
                cityGdp: '',
                localPopulation: '',
                cityPopulation: '',
                provincialCapital: '',
                bsgDistance: '',
            },
            IncreaseruleForm: {
                govermentOfficialNameIncrease: '',
                govermentOfficialMobileIncrease: '',
                govermentOfficialTelephoneIncrease: '',
                wechatNumber: '',
                
            },
            DialogruleForm: {
                govermentOfficialName: '',
                govermentOfficialMobile: '',
                govermentOfficialTelephone: '',
                wechatNumber: '',
            },
            rules: {
                govermentSector: [
                    { required: true, message: '请输入政府全称', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],

                govermentOfficialMobile: [{ validator: Phonetext, trigger: "blur" }],
                govermentOfficialMobileIncrease: [{ validator: Phonetext, trigger: "blur" }],
                wechatNumber: [{ validator: wechattext, trigger: "blur" }],
            },

            
        }
    },
    mounted() {
        // 委托招商合同 start
        this.contract_governmentID = Base64.decode(this.$route.query.id)
        this.contractruleForm.custodian = localStorage.getItem("realName")
        this.contractruleForm.govermentUnit = Base64.decode(this.$route.query.name)
        this.contractruleForm.department = localStorage.getItem("unit")
        // 委托招商合同 end
        this.id = Base64.decode(this.$route.query.id);
        this.UpData.id = Base64.decode(this.$route.query.id)
        this.cooperationStatus = this.$route.query.cooperationStatus;
        this.dshtz = this.$route.query.dshtz;
        this.Wh_z = this.$route.query.Wh_z;
        this.chaungjianren = this.$route.query.dflUserId;
        // console.log(this.chaungjianren,"chaungjianren")
        this.inputerName = localStorage.getItem("realName")
        this.inputerMobile = localStorage.getItem("mobile")
        this.dflUserId = localStorage.getItem("id")
        this.unitCode = localStorage.getItem("unitCode")
        this.Disabled()
        this.contactList()
        this.details() // 回显列表
        this.City() //请求城市下拉框数据
        this.Keyindustries()//重点产业下拉框
        this.genjinleixing()//跟进类型
        this.tuijinjieduan()//跟进类型
        this.dutyList() //请求职务列表
        this.jibieList() //请求级别列表
        this.DJpeopleList() //请求是否对接人列表

        // 委托招商合同 start
        this.contractList() //请求合同列表
        // 委托招商合同 end
    },
    methods: {
    //政府委托招商合同start

        //请求合同列表信息
        contractList(){
            var self = this
            // console.log(self.id,"政府ID")
            let params = {
                page: self.page1,
                limit:20,
                governmentId: self.id
            }
            this.axios({
                url: this.api.contractqueryapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                var right1 = document.getElementsByClassName('btn-next')
                right1[0].disabled=''
                self.contractData = res.data.data
                self.total1 = res.data.count
                // 分页--下一页disabled
                var cot1 =  Math.ceil(self.total1/20)
                if(cot1 <= self.page1){
                    right1[0].disabled="disabled"
                }
                if(self.page1==1){
                    self.suibian1=true
                }
                // 分页--下一页disabled
            })
        },
        // 分页--回到首页按钮  start
        paginationsy1() {
            if(this.page1 === 1) {
            }else{
                // this.page = 1
                this.handleCurrentChange1(1)
            }
        },
        handleCurrentChange1(val) {
            var self = this;
            // console.log(`当前页: ${val}`);
            self.page1 = val;
            //分页--判断当前页是否为最后一页，禁用右按钮  start
            
            var cot1 =  Math.ceil(self.total1/20)
            self.suibian1= false  //是否禁用首页按钮
            //分页--判断当前页是否为最后一页，禁用右按钮  end
            self.contractList(val, 20);
        },
        // 分页--回到首页按钮  end

        //新增合同
        contractAdd(){
            var self = this
            self.contractID = ""
            self.contractDialog_title = "新增合同"
            self.contractDialog = true
            this.contractruleFormCIB("contract_way_type")
            this.contractruleFormCIB("invoice_type")
            this.contractruleFormCIB("bid_status_type")
            this.buttRenyuan()
            this.productData()
            this.qianyuepeople()
        },
        //修改合同 （回显）
        contractModify(val){
            var self = this
            self.contractID = val.id
            console.log(val.govermentUnit,"asas")
            self.contractDialog_title = "修改合同"
            self.contractDialog = true
            let params = {
                id: val.id
            }
            this.axios({
                url: this.api.contractdetailsapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                self.contractruleForm = res.data.data
                if(res.data.data.billingStatus == 0){
                    self.contractruleForm.billingStatus = false
                }else{
                    self.contractruleForm.billingStatus = true
                }
                  self.contractruleForm.departmentHead = JSON.parse(self.contractruleForm.departmentHead);
                    self.contractruleForm.companyLeader = JSON.parse(self.contractruleForm.companyLeader);
                    self.contractruleForm.productIds = self.contractruleForm.productIds.split(',')
                    self.contractruleForm.govermentUnit = val.govermentUnit
                this.contractruleFormCIB("contract_way_type")
                this.contractruleFormCIB("invoice_type")
                this.contractruleFormCIB("bid_status_type")
                this.buttRenyuan()
                this.productData()
                this.qianyuepeople()
            })
        },
        //删除合同 
        contractDelete(val){
            var self = this
            let params = {
                id:val.id
            }
            this.axios({
                url: this.api.contractdeleteapi,
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
                self.contractList();
            })
        },
        //新增、修改合同弹框关闭
        contractDialog_close(){
            var self = this
            self.contractDialog = false
            self.contractruleForm = {
                serialNumber: "",
                govermentUnit: Base64.decode(this.$route.query.name),
                department: localStorage.getItem("realName"),
                custodian: localStorage.getItem("unit"),
                govLiaisons: "",
                departmentHead: [],
                contractWay: "",
                companyLeader: [],
                productIds: [],
                bidStatus: "",
                govSignatoryRepresentative: "",
                inspectTime: "",
                returnedMoneyTime: "",
                contractTime: "",
                contractExpirationTime: "",
                contractInformation: "",
                //开票信息
                billingStatus: "",//是否开票
                invoiceType: "",
                invoiceTitle: "",
                invoiceRental: "",
            }
        },
        //新增、修改合同内保存
        contractDialog_Add(contractruleForm){
            var self = this
            self.$refs[contractruleForm].validate(valid => {
                if(valid){
                    if(self.contractruleForm.billingStatus == false){
                        self.contractruleForm.billingStatus = 0
                    }else{
                        self.contractruleForm.billingStatus = 1
                    }
                    let params = {
                        id: self.contractID,
                        govermentId:self.contract_governmentID,
                        // govermentUnit:self.contractruleForm.govermentUnit,
                        // serialNumber:self.contractruleForm.serialNumber,
                        // custodian:self.contractruleForm.custodian,
                        // govLiaisons:self.contractruleForm.govLiaisons,
                        // contractWay:self.contractruleForm.contractWay,
                        // bidStatus:self.contractruleForm.bidStatus,
                        // inspectTime:self.contractruleForm.inspectTime,
                        // returnedMoneyTime:self.contractruleForm.returnedMoneyTime,
                        // department:self.contractruleForm.department,
                        // govSignatoryRepresentative:self.contractruleForm.govSignatoryRepresentative,
                        // contractInformation:self.contractruleForm.contractInformation,
                        // invoiceTitle:self.contractruleForm.invoiceTitle,
                        // billingStatus:self.contractruleForm.billingStatus,
                        // invoiceType:self.contractruleForm.invoiceType,
                        // invoiceRental:self.contractruleForm.invoiceRental,
                        // inspectTime:self.contractruleForm.inspectTime,
                        // returnedMoneyTime:self.contractruleForm.returnedMoneyTime,
                        // contractTime:self.contractruleForm.contractTime,
                        // contractExpirationTime:self.contractruleForm.contractExpirationTime,
                        // departmentHead:self.contractruleForm.departmentHead.toString(),
                        // companyLeader:self.contractruleForm.companyLeader.toString(),
                    }
                    Object.assign(params, self.contractruleForm);
                    // params.companyLeader = self.contractruleForm.companyLeader.toString();
                    // params.departmentHead = self.contractruleForm.departmentHead.toString();
                    // console.log(params.productIds,"---")
                    params.departmentHead = JSON.stringify(params.departmentHead);
                    params.companyLeader = JSON.stringify(params.companyLeader);
                    if(params.productIds == ""){
                        params.productIds = ""
                    }else{
                        params.productIds = params.productIds.toString();
                    }
                    this.axios({

                        url: this.api.contractsaveapi,
                        method: "post",
                        data: this.$qs.stringify(params),
                        headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(res => {
                        // console.log("保存成功",res)
                        if(res.data.code == 0){
                            if(self.contractID == ""){
                                this.$message.success("添加成功")
                            }else{
                                this.$message.success("修改成功")
                            }
                            self.contractDialog = false
                            // self.contractruleForm = ""
                            
                            self.contractList()
                        }else{
                            this.$message.warning(res.data.msg)
                        }
                    })
                }else {
                    this.$message.error("保存失败")
                    return false;
                }
            })
        },
        //签约方式、开票类型、招投标下拉框
        contractruleFormCIB(TP){
            var self = this
            let params = {
                type: TP,
            }
            this.axios({
                url: this.api.contractdictsvalueapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if( TP == "contract_way_type"){
                    self.contractqianyueData = res.data.data
                }else if(TP == "invoice_type"){
                    self.contractkaipiaoData = res.data.data
                }else if(TP == "bid_status_type"){
                    self.contractzhaobiaoData = res.data.data
                }
            })
        },
        // 组织结构下拉框
        buttRenyuan() {
            var self = this;
            this.axios({
                url: this.api.buttRenyuan,
                method: "post",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                this.LDList = res.data.data;
                // console.log(self.LDList,"222")
            });
        },
        //政府签约人代表
        qianyuepeople(){
            var self = this
            let params = {
                governmentId: self.id,
            }
            this.axios({
                url: this.api.contractofficialnamesapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                console.log(res,"签约人")
                self.qypeopleData = res.data.data
            })
        },
        //产品选择下拉框 
        productData() {
            var self = this
            let params = {
                page:self.page,
                limit: 2000,
            }
            this.axios({
                url: this.api.contractlistapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                console.log(res,"产品")
                self.productDatas = res.data.data
            })
        },
    //政府委托招商合同end





        //联系跟进是否显示
        Disabled() {
            var self = this
            // console.log(self.id,"政府ID")
            let params = {
                id:self.id,
                currentUserId: self.dflUserId,
                unitCode: self.unitCode,
            };
            this.axios({
                url: this.api.Governmentofficialsinfoischeckapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"联系")
                if(res.data.data == false){
                    self.lianxiDisbled = true
                    // document.getElementsByClassName("el-tabs__item")[0]
                    // console.log(document.getElementsByClassName("lianxi")[0],"样式")
                }
            });
        },
        //上传前
        uploadbefore(file) {
            var self = this
            const isLt2M = file.size / 1024 / 1024 < 50;
            if(!isLt2M){
                this.$message.error('上传文件大小不能超过 50MB!');
            }
            return isLt2M;
        },
        //上传成功
        handlesuccess(response, file, fileList) {
            var self = this;
            // console.log(response.data);
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
        //附件列表
        download() {
            var self = this;
            let params = {
                projectElementsId: self.id
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
        },
        //附件删除
        deleteDownload(id){
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
        //附件下载
        downloadFile(id){
            let url =this.api.collectionDownloadfujian+'?id='+id
            window.location.href = url 
        },
        // 回显列表
        details() {
            var self = this
            let params={
                currentUserId: self.dflUserId,
                id: self.id
            }
            this.axios({
                url: this.api.Governmentdetailsapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res =>{
                console.log(res,"2222")
                if(this.$route.query.cooperationStatus == 3 && res.data.data.operatorId == this.dflUserId){
                    self.operaYN = 1
                }
                
                if(res.data.data.city == null){
                    self.selected.push(res.data.data.province)
                }else if(res.data.data.area == null){
                    self.selected.push(res.data.data.province,res.data.data.city)
                }else{
                    self.selected.push(res.data.data.province,res.data.data.city,res.data.data.area)
                }
                self.industry1 = res.data.data.industry1?res.data.data.industry1.split(","):''

                self.industry2 = res.data.data.followCategory
                self.industry3 = res.data.data.promotingCooperation
                self.followCategoryName = res.data.data.followCategoryName
                self.promotingCooperationName = res.data.data.promotingCooperationName
                self.govermentSerialNumber = res.data.data.govermentSerialNumber
                self.ruleForm.govermentSector = res.data.data.govermentSector
                self.ruleForm.lightspot = res.data.data.lightspot
                self.ruleForm.railway = res.data.data.railway
                self.ruleForm.highway = res.data.data.highway
                self.ruleForm.waterway = res.data.data.waterway
                self.ruleForm.airParcel = res.data.data.airParcel
                self.ruleForm.freight = res.data.data.freight
                self.ruleForm.waterPrice = res.data.data.waterPrice
                self.ruleForm.electrovalence = res.data.data.electrovalence
                self.ruleForm.naturalGas = res.data.data.naturalGas
                self.ruleForm.steamPrice = res.data.data.steamPrice
                self.ruleForm.laborCost = res.data.data.laborCost
                self.ruleForm.freightCost = res.data.data.freightCost
                self.ruleForm.waterwayCost = res.data.data.waterwayCost
                // self.ruleForm.developmentTime = res.data.data.developmentTime //开发时间
                self.ruleForm.nextVisitTime = res.data.data.nextVisitTime
                //详细信息
                self.ruleForm.totalArea = res.data.data.totalArea
                self.ruleForm.localRevenue = res.data.data.localRevenue
                self.ruleForm.cityRevenue = res.data.data.cityRevenue
                self.ruleForm.localGdp = res.data.data.localGdp
                self.ruleForm.cityGdp = res.data.data.cityGdp
                self.ruleForm.localPopulation = res.data.data.localPopulation
                self.ruleForm.cityPopulation = res.data.data.cityPopulation
                self.ruleForm.provincialCapital = res.data.data.provincialCapital
                self.ruleForm.bsgDistance = res.data.data.bsgDistance
                self.ruleForm.cooperationStatus = res.data.data.cooperationStatus

            })
        },
        //编辑按钮
        GovernmentBJ() {
            this.readonly = false
            this.selectDisabled = false
        },
        //返回按钮
        rtPark() {
            // console.log(this.cooperationStatus,"<b v-if=titleC }}</b>")
            if(this.Wh_z == 9){
                this.$router.push("/GovernmentManagement")
            }else if(this.dshtz == 9){
                this.$router.push("/DaiShenhe")
            }else{
                this.$router.push("/GovernmentCooperative")
            }
        },
        //保存按钮 
        presub(essentialForm){
            var self = this;
            self.$refs[essentialForm].validate(valid => {
                if(valid){
                    this.GovernmentBZ() 
                }
                else {
                    this.$message.error("格式错误")
                    return false;
                }
            });
        },
        GovernmentBZ() {
            var self = this
            // console.log(self.ruleForm,"self.province")
            let params = {
                id: self.id,
                unitCode: self.unitCode,
                inputerName: self.inputerName,
                inputerMobile: self.inputerMobile,
                dflUserId: self.dflUserId,
                industry1: self.industry1.toString(),
                followCategory: self.industry2,
                promotingCooperation: self.industry3,
                followCategoryName: self.followCategoryName,
                promotingCooperationName: self.promotingCooperationName,
                govermentSerialNumber:self.govermentSerialNumber,
                province: self.selected[0],
                city: self.selected[1],
                area: self.selected[2],
                govermentSector: self.ruleForm.govermentSector,
                lightspot: self.ruleForm.lightspot,
                railway: self.ruleForm.railway,
                highway: self.ruleForm.highway,
                waterway: self.ruleForm.waterway,
                airParcel: self.ruleForm.airParcel,
                freight: self.ruleForm.freight,
                waterPrice: self.ruleForm.waterPrice,
                electrovalence: self.ruleForm.electrovalence,
                naturalGas: self.ruleForm.naturalGas,
                steamPrice: self.ruleForm.steamPrice,
                laborCost: self.ruleForm.laborCost,
                freightCost: self.ruleForm.freightCost,
                waterwayCost: self.ruleForm.waterwayCost,
                // developmentTime: self.ruleForm.developmentTime,//开发时间
                nextVisitTime: self.ruleForm.nextVisitTime,

                totalArea: self.ruleForm.totalArea,
                localRevenue: self.ruleForm.localRevenue,
                cityRevenue: self.ruleForm.cityRevenue,
                localGdp: self.ruleForm.localGdp,
                cityGdp: self.ruleForm.cityGdp,
                localPopulation: self.ruleForm.localPopulation,
                cityPopulation: self.ruleForm.cityPopulation,
                provincialCapital: self.ruleForm.provincialCapital,
                bsgDistance: self.ruleForm.bsgDistance,
                cooperationStatus: self.ruleForm.cooperationStatus,
                
            }
            this.axios({
                url: this.api.Governmentupdateapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if(res.data.code == 500){
                    this.$message.warning(res.data.msg)
                }else if(res.data.code == 0){
                    this.$message.success("保存成功")
                }
            }) 
        },
        // 请求城市下拉框数据
        City() {
            this.axios({
                url: this.api.LXshengshiquapi,
                method: "post",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                this.options1 = res.data.data
            })
        },
        //重点产业下拉框
        Keyindustries() {
            let params = {
                type: "key_industry_type"
            }
            this.axios({
                url: this.api.Governmentofficialsinfodictsvalueapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                this.cities = res.data.data
            })
        },
        //跟进类型
        genjinleixing() {
            var self = this;
            let params = {
                type: 'followcategory_type',
            };
            this.axios({
                url: this.api.Governmentofficialsinfodictsvalueapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"跟进类型")
                self.genjinleixingdata = res.data.data
            })
        },
        //推进阶段
        tuijinjieduan() {
            var self = this;
            let params = {
                type: 'promoting_cooperation_type',
            };
            this.axios({
                url: this.api.Governmentofficialsinfodictsvalueapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"推进阶段")
                self.tuijinjieduandata = res.data.data
            })
        },
        // 城市下拉框点击执行函数
        handleChange1(value) {
            // console.log(value)
            this.province = value[0]
            this.city = value[1]
            this.area = value[2]
        },
        // 职务下拉框执行函数
        dutyhandleChange(value){
            var self = this;
            var obj = self.dutyoptions.find(item => {
                return item.value === value[0];
            });
            console.log(obj,"ssssss")
            var objs = obj.child.find(item => {
                return item.value === value[1];
            });
            console.log(objs,"bbbbsss")
            self.higherDuty= obj.name;
            self.higherDutyCode= obj.value;
            self.duty= objs.name;
            self.dutyCode= objs.value;
        },
        // 切换
        handleClick(tab) {
            var self = this;
            console.log(tab)
            if (tab.index == 1) {
                self.contactList();
            }
            if(tab.index == 2){
                self.industryList()
            }
            if(tab.index == 5){
                self.download();
            }
        },
        //需求产业---次选产业数据
        industryList() {
            var self = this;
            let params = {
                isOld: false
            };
            this.axios({
                url: this.api.Industrysapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                self.hangye_data = res.data.data;
            });
        },
        // 政府人员列表
        contactList() {
            var self = this
            let params = {
                governmentId: self.id,
                unitCode: self.unitCode,
                page: self.page,
                limit:20,
            }
            this.axios({
                url: this.api.GovernmentofficialsinfoList,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                console.log(res.data,"22")
                var right = document.getElementsByClassName('btn-next')
                right[0].disabled=''
                this.contactData = res.data.data
                this.total = res.data.count
                // 分页--下一页disabled
                var cot =  Math.ceil(self.total/20)
                if(cot <= self.page){
                    right[0].disabled="disabled"
                }
                if(self.page==1){
                    self.suibian=true
                }
                // 分页--下一页disabled
            })
        },
        paginationsy() {
            if(this.page === 1) {
            }else{
                // this.page = 1
                this.handleCurrentChange(1)
            }
        },
        // 分页--回到首页按钮  end
        handleCurrentChange(val) {
            var self = this;
            // console.log(`当前页: ${val}`);
            self.page = val;
            //分页--判断当前页是否为最后一页，禁用右按钮  start
            var cot =  Math.ceil(self.total/20)
            self.suibian=false  //是否禁用首页按钮
            //分页--判断当前页是否为最后一页，禁用右按钮  end
            self.contactList(val, 20);
        },
        // 新增联系人弹框打开
        Increase() {
            var self = this
            this.Increasejibie = ""
            this.dialogTabIncrease = true
        },
        //请求职务列表
        dutyList() {
            var self = this
            let params = {
                type:'duty_code',
            }
            this.axios({
                url: this.api.Governmentofficialsinfogetdutiesapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                console.log(res,"duty")
                self.dutyoptions = res.data.data
            })
        },
        //级别列表
        jibieList() {
            var self = this
            let params = {
                type:'duty_level_type',
            }
            this.axios({
                url: this.api.Governmentofficialsinfodutiesapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"duty")
                self.jibieoptions = res.data.data
            })
        },
        //是否对接人
        DJpeopleList() {
            var self = this
            let params = {
                type:'docking_people_type',
            }
            this.axios({
                url: this.api.Governmentofficialsinfodictsvalueapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"duty")
                self.DJpeopleOptions = res.data.data
            })
        },
        Increasejibielabel(value) {
            // console.log(value,"value");
            let obj = {};
            console.log(this.jibieoptions)
            obj = this.jibieoptions.find((item)=>{
                return item.value === value;
            });
            console.log(obj.name,"name");
            this.Increasejibie = obj.name
            console.log('data',value)
            this.jibiecode = value
        },
        DJpeoplelabel(value) {
            // console.log(value,"value");
            let obj = {};
            obj = this.DJpeopleOptions.find((item)=>{
                return item.value === value;
            });
            console.log(obj.name,"name");
            this.dockingPeople = obj.name
            console.log('data',value)
            this.dockingPeopleCode = value
        },
        jibiechange(value) {
            // console.log(value,"value");
            let obj = {};
            obj = this.jibieoptions.find((item)=>{
                return item.value === value;
            });
            console.log(obj.name,"name");
            this.Increasejibie = obj.name
            console.log('data',value)
            this.jibiecode = value
        },
        //跟进类型change
        genjinchange(value){
            // console.log(value,"value");
            let obj = {};
            obj = this.genjinleixingdata.find((item)=>{
                return item.value === value;
            });
            // console.log(obj.name,"name");
            this.followCategoryName = obj.name
            // console.log('data',value)
            this.industry2 = value
        },
        //推进阶段change
        tuijinchange(value){
            // console.log(value,"value");
            let obj = {};
            obj = this.tuijinjieduandata.find((item)=>{
                return item.value === value;
            });
            console.log(obj.name,"name");
            this.promotingCooperationName = obj.name
            // console.log('data',value)
            this.industry3 = value
        },

        // 打开弹框
        openDialog(val) {
            var self = this;
            self.Increasejibie = ""
            self.selectedOptions = []
            console.log(val,"val")
            self.dialogTableVisible = true;
            self.Increasejibie=val.dutyLevel
            self.jibiecode=val.dutyLevelCode
            self.dockingPeople = val.dockingPeople
            self.DialogruleForm.govermentOfficialName = val.govermentOfficialName
            self.DialogruleForm.govermentOfficialMobile = val.govermentOfficialMobile
            self.DialogruleForm.wechatNumber = val.wechatNumber
            self.DialogruleForm.govermentOfficialTelephone = val.govermentOfficialTelephone
            self.gender = val.gender
            self.DialogcommunicationRecord = val.communicationRecord
            self.duty = val.duty
            self.selectedOptions.push(val.higherDutyCode.toString(),val.dutyCode.toString())
            console.log(self.selectedOptions)
            self.contactsID = val.id
            self.dutyCode = val.dutyCode
            self.chuangjianzheName = val.inputerName
            self.chuangjianzheMobile = val.inputerMobile
        },
        //新增联系人保存按钮
        xinzengSub(xinzengruleForm) {
            var self = this
            self.$refs[xinzengruleForm].validate(valid => {
                if(valid){
                    this.preservation()
                }
                else {
                    this.$message.error("保存失败")
                    return false;
                }
            })
        },
        preservation() {
            var self = this
            let params= {
                gender: self.gendervalue,
                unitCode: self.unitCode,
                inputerName: self.inputerName,
                inputerMobile: self.inputerMobile,
                higherDuty:self.higherDuty,
                higherDutyCode:self.higherDutyCode,
                duty:self.duty,
                dutyCode:self.dutyCode,
                dockingPeople:self.dockingPeople,
                dockingPeopleCode:self.dockingPeopleCode,
                govermentId: self.id,
                dflUserId: self.dflUserId,
                dutyLevel:self.Increasejibie,
                dutyLevelCode:self.jibiecode,
                selectedOptions:self.selectedOptions,
                communicationRecord:self.communicationRecord,
                govermentOfficialName: self.IncreaseruleForm.govermentOfficialNameIncrease,
                govermentOfficialMobile: self.IncreaseruleForm.govermentOfficialMobileIncrease,
                wechatNumber: self.IncreaseruleForm.wechatNumber,
                govermentOfficialTelephone: self.IncreaseruleForm.govermentOfficialTelephoneIncrease,
            }
            // console.log(self.Increasejibie)
            this.axios({
                url: this.api.Governmentofficialsinfoaddapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"preservation")
                if(res.data.code == 0){
                    this.$message.success("保存成功")
                    self.IncreaseruleForm.govermentOfficialNameIncrease = "",
                    self.gendervalue = "",
                    self.IncreaseruleForm.govermentOfficialMobileIncrease = "",
                    self.IncreaseruleForm.wechatNumber = "",
                    self.Increaseduty = "",
                    self.Increasejibie = "",
                    self.jibiecode = "",
                    self.selectedOptions = [],
                    self.dockingPeople = "",
                    self.dockingPeopleCode = "",
                    self.IncreaseruleForm.govermentOfficialTelephoneIncrease = "",
                    self.communicationRecord = "",
                    this.dialogTabIncrease = false;
                    this.contactList()
                }else if(res.data.code == 500){
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 关闭弹框
        dialog_close() {
            var self = this
            this.dialogTableVisible = false;
            self.selectedOptions = []
            self.dockingPeople = ""
        },
        //新增联系人弹框关闭
        Increasedialog_close() {
            var self = this
            this.dialogTabIncrease = false;
            self.selectedOptions = []
            self.dockingPeople = ""
        },
        //政府人员信息修改 
        xiugaiSub(xiugaiForm){
            var self = this
            self.$refs[xiugaiForm].validate(valid => {
                if(valid){
                    this.dialogBZ()
                }
                else {
                    this.$message.error("保存失败")
                    return false;
                }
            })
        },
        //政府人员信息修改
        dialogBZ(){
            var self = this
            let params= {
                id: self.contactsID,
                unitCode: self.unitCode,
                higherDuty:self.higherDuty,
                higherDutyCode:self.higherDutyCode,
                duty:self.duty,
                dutyCode:self.dutyCode,
                dockingPeople:self.dockingPeople,
                dockingPeopleCode:self.dockingPeopleCode,
                inputerName: self.chuangjianzheName,
                inputerMobile: self.chuangjianzheMobile,
                currentUserName: self.inputerName,
                currentMobile: self.inputerMobile,
                govermentId: self.id,
                dflUserId: self.dflUserId,
                gender: self.gender,
                dutyLevel: self.Increasejibie,
                dutyLevelCode: self.jibiecode,
                selectedOptions: self.selectedOptions,

                communicationRecord:self.DialogcommunicationRecord,
                govermentOfficialName: self.DialogruleForm.govermentOfficialName,
                govermentOfficialMobile: self.DialogruleForm.govermentOfficialMobile,
                wechatNumber: self.DialogruleForm.wechatNumber,
                govermentOfficialTelephone: self.DialogruleForm.govermentOfficialTelephone,
            }
            this.axios({
                url: this.api.Governmentofficialsinfoupdateapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"preservation")
                if(res.data.code == 0){
                    this.$message.success("保存成功")
                    self.IncreaseruleForm.govermentOfficialNameIncrease = "",
                    self.gendervalue = "",
                    self.IncreaseruleForm.govermentOfficialMobileIncrease = "",
                    self.IncreaseruleForm.wechatNumber = "",
                    self.Increaseduty = "",
                    self.Increasejibie = "",
                    self.jibiecode = "",
                    self.selectedOptions = [],
                    self.dockingPeople = "",
                    self.dockingPeopleCode = "",
                    self.IncreaseruleForm.govermentOfficialTelephoneIncrease = "",
                    self.communicationRecord = "",
                    this.dialogTableVisible = false;
                    this.contactList()
                }else if(res.data.code == 500){
                    this.$message.error(res.data.msg)
                }
            })
        },
        //政府人员信息删除 
        PeopleDelete(val) {
            var self = this
            console.log(val)
            let params = {
                id: val.id,
                currentUserName: self.inputerName,
                currentMobile: self.inputerMobile
            }
            this.axios({
                url: this.api.Governmentofficialsinfodeleteapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if(res.data.code == 0){
                    this.$message.success("删除成功")
                    self.contactList() //请求政府人员列表
                    self.activeName = "second"
                }else{
                    this.$message("删除失败")
                }
            })
        },

    }
}
</script>
<style lang="scss" scope>
#GovernmentDetails{
    .C_container{
        .el-tabs__item.is-disabled{
            color: #ccc;
        }
        .downTip {
            margin-left: 20px;
            font-size: 18px;
        }
        .textSRK{
            textarea{
                font-size: 20px;
                min-height: 150px !important;
            }
        }
        .el-form-item__label{
            text-align: left;
        }
        .curPoi:hover{
            color: #cf111b;
        }
        .modify{
            margin-left: 10px;
        }
        .el-tabs__header{
            margin: 0;
        }
        .el-tabs__content{
            padding-bottom: 0;
        }
        .el-tabs__nav{
            border-bottom: 1px solid #f0f2f5;
        }
        .el-col-8{
            width: 30%;
            margin-right: 50px;
        }
        .el-tabs .el-tabs__content{
            border: none;
            padding: 10px 30px;
        }
        .el-table .cell{
            line-height: 28px;
        }
        
        .Esinformation{
            display: inline-block;
            font-size: 22px;
            font-weight: 600;
            line-height: 30px;
            margin-bottom: 20px;
            color:#cf111b;
        }
        .xinzenglianxirBtn{
            margin: 12px 0 0 0;
            float: right;
            width: 130px !important;
        }
        .GovernmentFORM{
            // padding: 20px 30px;
            // 基本信息
            .EssentialForm{
                margin-bottom: 20px;
                //表单输入框样式
                .el-form-item{
                    .el-form-item__content{
                        .el-input{
                            // width: 20%;
                        }
                        // .el-textarea{
                        //     .el-textarea__inner:focus{
                        //         border-color:#cf111b;
                        //     }
                        // }
                    }
                }
                .GovernmentManagement_block{
                    display: inline-block;
                    margin-left: 70px;
                    span{
                        // padding: 0 13px 0 33px;
                        font-size: 20px;
                        color: #606266;
                        font-weight: 100;
                    }
                }
            }
            .query-result{
                padding: 0 !important;
            }
            // 交通优势
            .TrafficAdvantagesForm{

            }
        }
        .GovernmentIncreaseRtPark{
            float: right;
            margin-top: 12px;
        }
        .GovernmentIncreasePreservation{
            float: right;
            margin-top: 12px;
            // margin-right: 10px;
        }
        .GovernmentDetailsRtPark{
            float: right;
            margin-top: 12px;
        }
        .GovernmentIncreaseBJ{
            float: right;
            margin-top: 12px;
            margin-right: 10px;
        }
        .Appdialog{
            .el-cascader__search-input::placeholder {
                color: #999;
                font-size: 20px;
            }
  .el-dialog{
    border-radius: 8px;
    .el-dialog__header{
      display: none;
    }
    .el-dialog__body{
      padding: 0;
    }
    .title_h{
        text-align: center;
        height: 60px;
        line-height: 60px;
        color: black;
        background: #eee;
        font-weight: 600;
        border-radius: 8px 8px 0 0;
        .GovernmentDetailsdialogBJ{
            float: right;
            margin-top: 12px;
            margin-right: 20px;
        }
        .GovernmentDetailsdialogBC{
            float: right;
            margin-top: 12px;
            margin-right: 20px;
        }
    }
    .dialogClose{
      z-index: 222;
      right: -9px;
      top: -9px;
      position: absolute;
      font-size: 20px;
      background: #ccc;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      text-align: center;
      color: #fff;
      cursor: pointer;
      line-height: 25px;
    }
    .demo-ruleForm{
        padding: 30px;
        .el-textarea__inner{
            min-height: 150px;
        }
    }
    
  }
}
    }
}
</style>