<template>
    <div class="dealcentertransfer">
        <div class="box transfer-hei">
        <span class="icon-wrong close" @click="closeTransfer()"></span>
        <p class="transfer-header margin-bottom-20 label-color">资金划转</p>
        <p v-show="false" class="text-12-999 margin-bottom-20 mention-money-transfer">提币请划转至币币交易账户</p>
        <Form ref="transferForm" :model="transferForm" :rules="ruleInline" class="transfer-select" id="transfer-select">
            <span class="input-title-jay label-color">币种</span>
            <span class="text-12-999-jay mention-money-transfer" v-show="coinShow">
                该币种禁止划转!
            </span>
            <FormItem prop="currency" class="tip">
            <Select class="labels-border" disabled v-model="selectvalue" style="width:23rem; overflow: hidden;" @on-change="toggleOption(currencyList, selectvalue)">
                <Option
                v-for="(item,index) in currencyList"
                :value="item.coin_name"
                :label="item.coin_name"
                :key="index"
                >
                    {{ item.coin_name }}
                </Option>
            </Select>
            </FormItem>
            <p class="input-title label-color">
                从
            <span  v-show="false" class="text-12-999">
                ( 可划转数量为 :{{ fromList.roll_out_available }}&nbsp;{{ fromList.roll_out_coin_name }})
            </span>
            </p>
            <FormItem prop="from" class="tip">
            <input type="text" style="border-radius: 0.25rem; color: #918C96"  v-model="inAccount" class="account labels-border mention-money-transfer" readonly >
            </FormItem>
            <p class="input-title label-color">
                转至
            </p>
            <FormItem prop="toListval" class="tip">
            <Select @on-change="SelectTurnTo"  :class="{'labels-border': labelsBorder, 'lables-warning': labelsWarning}" class="transfer-to" v-model="transferForm.toListval" style="width:23rem;overflow: hidden;">
                <Option style="background : #fff"
                v-for="(item,index) in toList"
                :value="item"

                :label="intoPurse[item]"
                :key="item + index"
                >
                    {{ intoPurse[item] }}
                </Option>
            </Select>
            <p style="color:red;position:absolute;top:2rem;left:0.25rem;" v-show="labelsWarning">请选择转入账户</p>
            </FormItem>
            <p class="input-title label-color" style="margin-top: 0.5rem;" >
                数量
            <span class="text-12-999">
                            ( 可划转数量为 :{{ fromList.roll_out_available | saveDigit }}&nbsp;{{ fromList.roll_out_coin_name }})
                        </span>
            </p>
            <div class="number">
            <FormItem prop="TranNumber" class="tip login" style="width: 23rem">
                <Input :class="{'currentTrs': currentTrs}"  placeholder="0.000000" style="color: red;" class="" v-model="transferForm.TranNumber"></Input>
            </FormItem>
            <button type="button" @click.prevent="all">全部</button>
            </div>
            <div class="btn-wrap">
                <!--
                <Button
                class="btn transfer"
                @click="Transfer"
                type='info'
                v-if="coinSend"
                :loading="loadingT"
                >确定</Button>
                -->
                <Button
                    class="transfer"
                type='primary'
                :loading="loadingT"
                @click="Transfer"
                >确定</Button>
                <button
                class="btn cancle"
                @click="closeTransfer()"
                type="button"
                style="color: #000"
                >取消</button>
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
import api from '@/api'
import { exchange, scientificToNumber } from '../../../common/js/N.js'
export default{
    props:{
        exchange_id:{
            type:Number,
            default:'',
            required:true
        }
    },
    data () {
        const checkNumber = (rule,value,callback)=>{
            if(value===''){
                this.currentTrs = false;
            return callback(new Error( '请输入划转数量'));
            }else if(value == 0){
            this.currentTrs = false;
            return callback(new Error('划转数量应大于零'));
            }else if(value > Number(this.fromList.roll_out_available)){
            this.currentTrs = false;
            return  callback(new Error('请勿超出可划转数量'));
            }else if(!/^\d+(\.\d+)?$/.test(value)){
                this.currentTrs = false;
                return  callback(new Error('请输入正确的数量'));
            }else if(value <= 0){
                this.currentTrs = false;
                return  callback(new Error('数量不能小于等于0'));
            }else{
            this.currentTrs = true;
            return callback();
            }
        };
        const checkSelect = (rule,value,callback) => {
            if (value === '') {
                this.labelsBorder = false;
                if (this.transferForm.toListval) {
                    return callback();
                } else {
                    return callback(new Error(' '));
                }
            }else if(value.length > 0) {
                this.labelsBorder = true;
                return callback();
            }else {
                this.labelsBorder = true;
                return callback();
            }
        };
        return {
            loadingT:false,
            loading: false,
            time:'',
            coinSend:true,
            outRemaining:false,
            outAccount:[],
            selectId:'',
            fromList:[],
            pretendToAccount:[],
            selectvalue:'',
            inAccount:[],
            inMoney:[],
            coinList:[],
            coinShow:false,
            transferForm:{
                toListval: '',
                TranNumber: ''
            },
            ruleInline: {
                toListval: [
                    {required: false, trigger: 'blur'}
                    ],
                TranNumber: [
                    {validator: checkNumber, trigger: 'blur'}
                    ]
            },
            currencyList: [],
            toList: [],
            ToList:[],
            intoPurse:{
                'finance' : '钱包',
                'otc' : 'OTC资产',
            },
            outPurse:{
                'exchange': '币币账户'
            },
            outAccountVal:'',
            labelsBorder: true,
            currentTrs: true,
            labelsWarning: false
        }
    },
    filters:{
        coinType(cointype){
        },
        saveDigits: function (value) {
            return exchange(scientificToNumber(value), 8);
        }
    },
    watch:{
        "selectvalue":function (Val,index){
            this.coinList.map((val,index)=>{
            if(val.coin_name == Val){
                if(val.coin_status == 1){
                this.coinShow = true
                this.coinSend = false
                }else{
                this.coinShow = false
                this.coinSend = true
                }
            }
            })
        }
    },
    methods: {
        toggleOption(currencyList,value){
            this.$refs['transferForm'].resetFields();
            this.coinList.map((val,index)=>{
            if(value == val.coin_name){
                if(val.otc_coin_type_id != 1){
                this.toList = ['finance'];
                }else{
                this.toList = this.ToList;
                }
            }
            })
            let Id;
            currencyList.forEach((val,index)=>{
            if(val.coin_name == value){
            Id = val.exchange_finance_id;
            let params ={
                exchange_finance_id:Id,
            };
            api.TransferredInCurrency(params).then(res=>{
                if(res.status_code==200){
                this.fromList = res.data;
                this.outAccount =  res.data;
                }
            }).catch(err=>{
            console.log(err);
            });
            };
            })
        },
        all() {
            this.transferForm.TranNumber = this.fromList.roll_out_available;
        },
        closeTransfer () {
            this.$emit('close');
            this.$refs['transferForm'].resetFields();
        },
        Transfer() {
            if (this.transferForm.toListval) {
                this.labelsBorders = true;
                this.labelsWarning = false;
            } else {
                this.labelsWarning = true;
                this.labelsBorders = false;
            }
            this.$refs['transferForm'].validate((valid) => {
            if (valid) {
                this.loadingT = true;
                this.loading = true;
                    let params = {
                    exchange_finance_id: this.exchange_id,
                    roll_in_finance: this.transferForm.toListval,
                    amount: this.transferForm.TranNumber
                };
                api.TransferredSubmit(params).then(res => {
                    this.loadingT = false;
                        this.coinSend = false;
                        if(res.status_code == 200){
                        this.loadingT = true;
                        this.coinSend = true;
                        this.closeTransfer();
                        this.loading = false;
                        this.$Message.success('划转成功！');
                        this.$emit('ievent')
                        }
                        this.time = setTimeout(()=>{
                        this.coinSend = true;
                        this.loading = false;
                        },1000)
                }).catch(err => {
                    this.loadingT = false;
                    this.loading = false;
                    console.log(err);
                });
                }
            });
        },
        SelectTurnTo(value) {
            this.transferForm.toListval = value;
            if (this.transferForm.toListval) {
                this.labelsWarning = false;
                this.labelsBorders = true;
            } else {
                    this.labelsWarning = true;
                    this.labelsBorders = false;
            }
        },
        pullWalletList(){
        let params ={
            exchange_finance_id:this.exchange_id
            };
            api.bibiRecordTransferred(params).then(res=>{
            if(res.status_code==200){
                this.coinList = res.data.list;
                this.fromList = res.data;
                this.inAccount = res.data.roll_out;
                this.ToList =  res.data.roll_in;
                this.toList =  res.data.roll_in;
                this.toList.map(item => {
                item =(item =='finance'?"法币账户":'OTC账户');
                });
                this.inAccount.map(item=>{
                item = (item == 'exchange'?'币币资产':'转出账户');
                this.inAccount = item;
                });
                this.currencyList = res.data.list;
                this.currencyList.forEach((val,index)=>{
                if(this.exchange_id===val.exchange_finance_id){
                    this.selectId = val.exchange_finance_id;
                    this.selectvalue = val.coin_name
                }
                })
            }
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    mounted(){
        this.pullWalletList();
    }
};
</script>
<style scoped>
.dealcentertransfer .label-color {
    color: #000;
}

.dealcentertransfer .mention-money-transfer {
    color: #918C96
}

.dealcentertransfer .labels-border {
    border: 1px solid #DBDBDB;
    border-radius: 0.25rem;
}

.dealcentertransfer .labels-border:hover {
    border-color: #5474E4;
}

.dealcentertransfer .lables-warning {
    border: 1px solid red;
    border-radius: 0.25rem;
}

.dealcentertransfer .label-warning {
    border-radius: 0.25rem;
    border: 1px solid red;
}

.dealcentertransfer .number .currentTrs {
    border-color:  #6583E4;
    border-radius: 0.25rem;
}

.dealcentertransfer .currentAll {
    color: #EDB348
}

.dealcentertransfer button.btn {
	width: 5rem;
	height: 2rem;
	border-radius: 0.2rem;
}

.dealcentertransfer .cancle {
	border: 1px solid #D9D9D9;
}

.dealcentertransfer .transfer {
	margin: 0 1rem 0 0;
}

.dealcentertransfer .btn-wrap {
	float: right;
	padding: 0 1rem;
}

</style>
