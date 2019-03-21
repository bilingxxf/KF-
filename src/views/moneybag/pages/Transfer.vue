<template>
    <div class="moneybag_transfer money-bag">
        <div class="box transfer-hei">
            <span class="icon-wrong close" @click="closeTransfer()"></span>
            <p class="transfer-header margin-bottom-20">资金划转</p>
            <Form ref="transferForm" :model="transferForm" :rules="ruleInline" class="transfer-select">
                <p class="input-title">币种
                    <span v-show="tipshow" class="transfertipshow">{{ $t(`message.Reject.CurrencyForbid`) }}</span>
                </p>
                <FormItem class="tip">
                    <Select class="labels-borders" v-model="transferForm.currency"  disabled style="width:23rem" @on-change="available">
                        <Option v-for="item in currencyList" :value="item.finance_id" :key="item.finance_id">
                            {{ item.coin_name }}
                        </Option>
                    </Select>
                </FormItem>
                <p class="input-title">
                    从
                    <span v-show="false" class="text-12-999">
                        (可划转数量为:{{fromnum}} {{fromcurrency}})
                    </span>
                </p>
                <FormItem class="tip">
                    <div class="moneybagTranFromDiv">{{ $t(`message.Nav.Wallet`) }}</div>
                </FormItem>
                <p class="input-title">{{ $t(`message.DealCenter.ToUser`) }}</p>
                <FormItem prop="to" class="tip">
                    <Select @on-change="SelectTurnTo" :class="{ 'lables-warning': labelsWarning, 'labels-borders' : labelsBorders }" v-model="transferForm.to" style="width:23rem;position:relative;">
                        <Option value="exchange">币币资产</Option>
                        <Option value="otc" v-show="otc">OTC资产</Option>
                        <!-- <Option value="others">他人账户</Option> -->
                    </Select>
                    <p style="color:red;position:absolute;top:1.9rem;left:0.25rem;" v-show="labelsWarning">请选择转入账户</p>
                </FormItem>
                <p class="input-title" v-show="transferForm.to=='others'">请选择
                    <span v-show="tipshow" class="transfertipshow">{{ $t(`message.Reject.CurrencyForbid`) }}</span>
                </p>
                <FormItem class="tip" v-show="transferForm.to=='others'">
                    <RadioGroup v-model="transferForm.type">
                        <Radio label="1">邮箱</Radio>
                        <Radio label="2">手机</Radio>
                    </RadioGroup>
                </FormItem>
                <p class="input-title" v-show="transferForm.to=='others'">请输入
                    <span v-show="tipshow" class="transfertipshow">{{ $t(`message.Reject.CurrencyForbid`) }}</span>
                </p>
                <div class="number">
                    <FormItem class="tip login moneytransinput" v-if="transferForm.to=='others'&&transferForm.type=='2'">
                        <div class="phone_idd">
                            <Dropdown trigger="click" @on-click="langOperate" class="nationalNum nationalDrop">
                                <a href="javascript:void(0)">
                                    {{ transferForm.phone_idd }}
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem v-for="(option, index) in options1" :name="option.country_idd" :key="index">
                                        <div style="display: flex">
                                            <span style="flex:1;">{{ option.country_name }}</span>
                                            <span style="flex:1;text-align: right">{{ option.country_idd }}</span>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <FormItem prop="phone_number">
                                <Input placeholder="输入手机号码" v-model="transferForm.phone_number"></Input>
                            </FormItem>
                        </div>
                    </FormItem>
                </div>
                <div class="number">
                    <FormItem prop="email" class="tip login moneytransinput" v-if="transferForm.to == 'others' && transferForm.type == '1'">
                        <Input placeholder="输入邮箱账号" v-model="transferForm.email"></Input>
                    </FormItem>
                </div>
                <p class="input-title">
                    数量
                    <span style="font-size: 0.7rem;" class="text-12-999">
                        (可划转数量为:{{ fromnum | saveDigits }} {{ fromcurrency }})
                    </span>
                </p>
                <div class="number">
                    <FormItem prop="TranNumber" class="tip login moneytransinput numbers" style="width: 23rem">
                        <Input placeholder="0.000000" v-model="transferForm.TranNumber"></Input>
                    </FormItem>
                    <button type="button" @click="all">全部</button>
                </div>
                <div class="btn-wrap">
                	<button
                        type="button"
                        class="transfer"
                        :class="{transDis:isA}"
                        @click="Transfer"
                        :disabled="disable">确定</button>
                	<button class="cancle" @click="closeTransfer()" type="button">取消</button>
                    <!-- 加载状态 -->
                    <div v-show="loading" class="loading transfer" style="position:relative; top:-2rem;display:flex;align-items:center; justify-content:center;background:#8D9DD7;">
                        <img style="margin-right:0.25rem;" src="../img/loading.gif" alt="">
                        <span>确定</span>
                    </div>
                </div>

            </Form>
        </div>
    </div>
</template>

<script>
import api from '../../../api.js'
import { exchange, scientificToNumber } from '../../../common/js/N.js'
export default {
    name: 'Transfer',
    props: ['otherId', 'id'],
    data() {
        const validatornum = (rules, value, callback) => {
            if (!value) {
                callback(new Error(this.$t('message.DealCenter.EnterTransferAmount')));
            } else if (!/^\d+(\.\d+)?$/.test(value)) {
                callback(new Error(this.$t('message.MoneyBag.PleaseEnterNum')));
            } else if (Number(value) > Number(this.fromnum)) {
                callback(new Error(this.$t('message.MoneyBag.ExceedAmountTran')));
            }else if (Number(value) == 0) {
                callback(new Error(this.$t('message.MoneyBag.TransferAmountMinZ')))
            } else {
                callback();
            }
        }
        const validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t(`message.Login.PleaseEnterPhone`)));
            } else if (!/^[0-9]{2,20}$/.test(value)) {
                callback(new Error(this.$t('message.Register.PhoneFormatError')));
            } else {
                callback();
            }
        };
        return {
            options1: [],
            loading: false,
            tipshow: false,
            fromnum: '',
            fromcurrency: '',
            tonum: '',
            tocurrency: '',
            transferForm: {
                currency: '',
                to: '',
                TranNumber: '',
                type: '1',
                phone_number: '',
                phone_idd: '+86',
                email: '',
                amount_str: '',
                from: ''
            },
            ruleInline: {
                to: [{ required: false, trigger: 'blur' }],
                TranNumber: [{ validator: validatornum, trigger: 'blur' }],
                email: [{ type: 'email', required: true, trigger: 'blur', message: '请输入正确的邮箱账号' }],
                phone_number: [{ validator: validatePhone, required: true, trigger: 'blur' }],
            },
            // allNumber: '',
            tranTo: false,
            currencyList: [],
            otc: true,
            disable: false,
            isA: false,
            labelsWarning: false,
            labelsBorders: true
        }
    },
    filters: {
        saveDigits: function (value) {
            return exchange(scientificToNumber(value), 8);
        }
    },
    methods: {
        langOperate(value) {
            this.transferForm.phone_idd = value
        },
        national() {
            api.internationalCodeGet().then(res => {
                if (res.status_code == 200) {
                    this.options1 = res.data.list;
                }
            })
        },
        all() {
            this.transferForm.TranNumber = this.fromnum
        },
        closeTransfer() {
            this.$emit('close');
            this.$refs['transferForm'].resetFields()
            this.transferForm.currency = this.otherId
            this.transferForm.to = ''
            this.transferForm.TranNumber = ''
        },
        Transfer() {
            if (this.transferForm.to) {
                this.labelsBorders = true;
                this.labelsWarning = false;
            } else {
                this.labelsWarning = true;
                this.labelsBorders = false;
            }
            this.$refs['transferForm'].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    if (this.transferForm.to != 'others') {
                        let params = {
                            finance_id: this.transferForm.currency,
                            roll_in_finance: this.transferForm.to,
                            amount: this.transferForm.TranNumber
                        }
                        api.transfer(params).then(res => {
                            if (res.status_code == 200) {
                                this.$Message.success(this.$t('message.Reject.TransferSucceed'))
                                this.closeTransfer()
                                this.loading = false;
                            }
                            this.time = setTimeout(()=>{
                                this.loading = false;
                            },1000)
                        }).catch(error => { console.log(error) });
                    } else {
                        let params = {
                            coin_id: this.otherId,
                            amount_str: this.transferForm.TranNumber,
                            type: this.transferForm.type,
                        }
                        this.currencyList.forEach((val, index) => {
                            if (val.finance_id == this.transferForm.currency) {
                                params.coin_name = val.coin_name
                            }
                        })
                        if (this.transferForm.type == '1') {
                            params.email = this.transferForm.email
                        } else {
                            params.phone_number = this.transferForm.phone_number
                            params.phone_idd = this.transferForm.phone_idd
                        }
                        api.transferUser(params).then(res => {
                            if (res.status_code == 200) {
                                this.$Message.success(this.$t('message.Reject.TransferSucceed'))
                                this.closeTransfer()
                                this.loading = false;
                            }
                            this.time = setTimeout(()=>{
                                this.loading = false;
                            },1000)
                        })
                    }
                }
            })
        },
        SelectTurnTo(value) {
            this.transferForm.to = value;
            if (this.transferForm.to) {
                this.labelsWarning = false;
                this.labelsBorders = true;
            } else {
            }
        },
        // 点击时余额变化
        available(val) {
            console.log(val);
            for (let i = 0; i < this.currencyList.length; i++) {
                if (this.transferForm.currency == this.currencyList[i].finance_id) {
                    if (this.currencyList[i].coin_status == 1) {
                        this.tipshow = true
                        this.disable = true
                        this.isA = true
                    }
                    else {
                        this.tipshow = false
                        this.disable = false
                        this.isA = false
                    }
                    console.log(this.currencyList[i].otc_coin_type_id)
                    if (this.currencyList[i].otc_coin_type_id == 2) {
                        this.otc = false
                    } else {
                        this.otc = true
                    }
                }
            }
            let params = {
                finance_id: this.transferForm.currency,
                roll_in_finance: this.transferForm.to
            }
            api.currencyChange(params).then(res => {
                if (res.status_code == 200) {
                    if (val == 'to') {
                        this.tranTo = true
                    }
                    this.fromnum = res.data.roll_out_available
                    this.fromcurrency = res.data.roll_out_coin_name
                    this.tonum = res.data.roll_in_available
                    this.tocurrency = res.data.roll_in_coin_name
                }
            }).catch(error => { console.log(error) });
        },
        // 渲染
        tranInfo() {
            let params = { finance_id: this.id }
            api.transferInfo(params).then(res => {
                if (res.status_code == 200) {
                    this.transferForm.currency = this.id
                    this.fromcurrency = res.data.roll_out_coin_name
                    this.fromnum = res.data.roll_out_available
                    this.currencyList = res.data.list
                }
            }).catch(error => { console.log(error) });
        }
    },
    mounted() {
        this.tranInfo()
        // this.$refs['transferForm'].resetFields();
        this.national()
    }
};
</script>
<style lang="scss" scoped>
.moneybag_transfer {
    .phone_idd {
        .ivu-input-wrapper {
            width: 17.75rem;
        }
        .ivu-form-item {
            display: inline-block;
            width: 17.75rem;
        }
    }
    .login .nationalDrop {
        vertical-align: middle;
    }
    .login .nationalNum .ivu-dropdown-rel a .ivu-icon {
        left: 3rem;
    }
    .ivu-select-dropdown {
        top: 2.2rem !important;
    }
    .ivu-radio-wrapper {
        margin-right: 2rem;
        color: #fff;
    }
    .lables-warning {
        border: 1px solid #E54C4C;
        border-radius: 0.25rem;
    }
    .labels-borders {
        border: 1px solid #DBDBDB;
        border-radius: 0.25rem;
        &:hover {
            border-color: #5474E4!important;
        }
    }
}
</style>
