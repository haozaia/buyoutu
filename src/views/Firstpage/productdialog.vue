<template>
    <div id="productdialog">
        <el-form :model="ruleForm" :rules="rules" ref="essentialForm" label-width="30%" class="demo-ruleForm">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="服务编号:" prop="serviceNumber">
                        <el-input style="font-size:20px;" v-model="ruleForm.serviceNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="服务简称:" prop="serviceName">
                        <el-input style="font-size:20px;" v-model="ruleForm.serviceName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单位:" prop="unit">
                        <el-input style="font-size:20px;"  v-model="ruleForm.unit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单价:" prop="unitPrice">
                        <el-input style="font-size:20px;"  v-model="ruleForm.unitPrice"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="产业要求:" prop="industryRequirements">
                        <el-input style="font-size:20px;"  v-model="ruleForm.industryRequirements"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="规格:" prop="specification">
                        <el-input style="font-size:20px;"  v-model="ruleForm.specification"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="型号:" prop="modelNumber">
                        <el-input style="font-size:20px;"  v-model="ruleForm.modelNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="数量:" prop="number">
                        <el-input style="font-size:20px;"  v-model="ruleForm.number"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="折扣:" prop="discount">
                        <el-input style="font-size:20px;"  v-model="ruleForm.discount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="税率:" prop="taxRate">
                        <el-input style="font-size:20px;"  v-model="ruleForm.taxRate"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="税额:" prop="taxAmount">
                        <el-input style="font-size:20px;"  v-model="ruleForm.taxAmount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="金额:" prop="amount">
                        <el-input style="font-size:20px;"  v-model="ruleForm.amount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="最终成本:" prop="finalCost">
                        <el-input style="font-size:20px;"  v-model="ruleForm.finalCost"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="最终利润:" prop="finalProfit">
                        <el-input style="font-size:20px;"  v-model="ruleForm.finalProfit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="最终利润率:" prop="finalProfitMargin">
                        <el-input style="font-size:20px;"  v-model="ruleForm.finalProfitMargin"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="计划交货日期:" prop="scheduledDeliveryTime">
                        <!-- <el-input style="font-size:20px;"  v-model="ruleForm.scheduledDeliveryTime"></el-input> -->
                        <el-date-picker
                        v-model="ruleForm.scheduledDeliveryTime"
                        type="date"
                        format="yyyy-MM-dd hh:mm"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="实际交货日期:" prop="actualDeliveryTime">
                        <!-- <el-input style="font-size:20px;"  v-model="ruleForm.actualDeliveryTime"></el-input> -->
                        <el-date-picker
                        v-model="ruleForm.actualDeliveryTime"
                        type="date"
                        format="yyyy-MM-dd hh:mm"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="产品备注:" prop="productRemark">
                        <el-input style="font-size:20px;"  v-model="ruleForm.productRemark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="adleft">
            <el-button class="GovernmentDetailsRtPark" style="margin-right:10px;" @click="baocun('essentialForm')" type="primary">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["close","change","clear"],
    data() {
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
        const valuenull = (rule, value, callback) => {
            var self = this;
            if (value == "" || value == null) {
                callback(new Error("该项不能为空"));
            } else {
                callback();
            }
        };
        const unityz = (rule, value, callback) => {
            var self = this;
            if (value == "" || value == null ) {
                callback(new Error("该项不能为空"));
            }else if(!/^\d+(\.\d{0,2})?$/.test(value)) {
                callback(new Error("请输入数字且最多保留两位小数"));
            }else{
                callback()
            }
        };
        return{
            ruleForm: {
                serviceNumber: "",
                serviceName: "",
                industryRequirements: "",
                specification: "",
                modelNumber: "",
                number: "",
                unit: "",
                unitPrice: "",
                discount: "",
                taxRate: "",
                taxAmount: "",
                amount: "",
                scheduledDeliveryTime: "",
                actualDeliveryTime: "",
                finalCost: "",
                finalProfit: "",
                finalProfitMargin: "",
                productRemark: "",
            },
            rules:{
                // doube类型
                modelNumber: [{ validator: validateCtext, trigger: "blur" }],
                number: [{ validator: validateCtext, trigger: "blur" }],
                discount: [{ validator: validateCtext, trigger: "blur" }],
                taxRate: [{ validator: validateCtext, trigger: "blur" }],
                taxAmount: [{ validator: validateCtext, trigger: "blur" }],
                amount: [{ validator: validateCtext, trigger: "blur" }],
                finalCost: [{ validator: validateCtext, trigger: "blur" }],
                finalProfit: [{ validator: validateCtext, trigger: "blur" }],
                finalProfitMargin: [{ validator: validateCtext, trigger: "blur" }],
                // 必填项
                serviceNumber: [{required: true, validator: valuenull, trigger: "blur" }],
                serviceName: [{required: true, validator: valuenull, trigger: "blur" }],
                unit: [{required: true, validator: valuenull, trigger: "blur" }],
                // doubel及必填
                unitPrice: [{required: true, validator: unityz, trigger: "blur" }],

            },
        }
    },
    created() {
        var self = this
        if(self.change != ""){
            console.log(self.change,"点击的是修改")
            this.xiugaidetails()
        }else{
            console.log(self.change,"点击的是新增")
        }
    },
    mounted() {
    },
    methods: {
        // 弹框内保存
        baocun(essentialForm) {
            var self = this
            self.$refs[essentialForm].validate(valid => {
                if(valid){
                    this.productsave(essentialForm) 
                }
                return false;
            })
        },
        productsave(essentialForm) {
            var self = this
            let params = {
                id:self.change,
                serviceNumber: self.ruleForm.serviceNumber,
                serviceName: self.ruleForm.serviceName,
                industryRequirements: self.ruleForm.industryRequirements,
                specification: self.ruleForm.specification,
                modelNumber: self.ruleForm.modelNumber,
                number: self.ruleForm.number,
                unit: self.ruleForm.unit,
                unitPrice: self.ruleForm.unitPrice,
                discount: self.ruleForm.discount,
                taxRate: self.ruleForm.taxRate,
                taxAmount: self.ruleForm.taxAmount,
                amount: self.ruleForm.amount,
                scheduledDeliveryTime: self.ruleForm.scheduledDeliveryTime,
                actualDeliveryTime: self.ruleForm.actualDeliveryTime,
                finalCost: self.ruleForm.finalCost,
                finalProfit: self.ruleForm.finalProfit,
                finalProfitMargin: self.ruleForm.finalProfitMargin,
                productRemark: self.ruleForm.productRemark, 
            }
            this.axios({
                url: this.api.Productsaveapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                // console.log(res,"ress")
                if(res.data.code == 0){
                    if(self.change == ""){
                        this.$message.success("添加成功")
                    }else{
                        this.$message.success("修改成功")
                    }
                    self.$refs[essentialForm].resetFields();
                    self.close()
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        },
        //修改时回显
        xiugaidetails() {
            var self = this
            let params = {
                id:self.change
            }
            this.axios({
                url: this.api.Productdetailsapi,
                method: "post",
                data: this.$qs.stringify(params),
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                console.log(res,"请求详情")
                self.ruleForm = res.data.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#productdialog{
    padding: 20px;
    .el-form-item__label{
        text-align: left;
    }
    .adleft{
        text-align: right;
    }
}
</style>
