<template>
	<div class="otctransfer otc">
		<div class="box whitetran">
			<span class="icon-wrong close" @click="closeTransfer()"></span>
			<p class="transfer-header margin-bottom-20 label-color">资金划转</p>
			<p v-show="false" class="text-12-999 margin-bottom-20 mention-money-transfer">提币请划转至钱包交易账户</p>
			<Form ref="transferForm" :model="transferForm" :rules="ruleInline" class="white-select">
                <p class="input-title label-color">币种</p>
                <FormItem prop="currency" class="tip">
                    <Dropdown trigger="custom" class="labels-border" style="width:23rem;height: 2rem;line-height: 2rem;border-radius: 0.25rem;overflow:hidden;cursor: not-allowed;" @on-click="changeTrans">
                        <a href="javascript:void(0)" style="display: flex;padding: 0 0.5rem;">
                            <span style="flex: 1; color:#918C96;cursor: not-allowed;">{{transferForm.currency}}</span>
                            <Icon v-show="false" type="ios-arrow-down" style="flex: 1;text-align: right;line-height: 2rem;color: #333;"></Icon>
                        </a>
                        <DropdownMenu disabled slot="list">
                            <DropdownItem disabled v-for="(item,index) in currencyList" :key="index" :name="item.coin_name+'/'+item.coin_id+'/'+item.otc_finance_id">{{ item.coin_name }}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </FormItem>
                <p class="input-title label-color">
                    从
                    <span class="label-border text-12-999">
                        (余额为:{{allNumber}} {{ roll_out_coin_name }})
                    </span>
                </p>
                <FormItem prop="from" class="tip">
                    <Input  v-model="transferForm.from" style="width:23rem;border-radius: 0.25rem;" disabled></Input>
                </FormItem>
                <p class="input-title label-color">
                    转至
                </p>
                <FormItem prop="to" class="tip transfer-to">
                    <Dropdown trigger="click" :class="{'label-warning': labelWarning, 'labels-border': labelsBorder}" v-model="transferForm.to" style="width:23rem;top:2.05rem;height: 2rem;" @on-click="rollIn" >
                        <a href="javascript:void(0)" style="display: flex;padding: 0 0.5rem;">
                            <span style="flex: 1; color:#918C96; line-height: 2rem;">{{ transferForm.to === '' ? '请选择' : transferForm.to }}</span>
                            <Icon type="ios-arrow-down" style="flex: 1;text-align: right;line-height: 2rem;color: #333;"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(item,index) in toList" :key="index" :name="item">{{ item }}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <p v-show="transferFormTip" style="font-size: 0.6rem; color: red;margin-top:-0.4rem;font-size: 0.7rem;">请选择转入账户</p>
                </FormItem>
                <p class="input-title label-color">
                    数量
                    <span class="text-12-999 transfer-number transfer-font">
                        (可划转数量为:{{allNumber | saveDigits}} {{roll_out_coin_name}})
                    </span>
                </p>
                <div :class="{'currentTrs': currentTrs}" class="number" style="width: 23rem;">
                    <FormItem prop="TranNumber" class="tip login" style="width: 23rem;">
                        <Input :class="{'currentTrs': currentTrs}" placeholder="0.000000" style="color: red;" class="" v-model="transferForm.TranNumber"></Input>
                    </FormItem>
                    <button class="currentAll" type="button" @click="all">全部</button>
                    <p v-show="lessThanZero" style="margin-top: -1rem; color: red;">划转数量应大于0</p>
                </div>
                <div style="overflow: hidden;float: right;margin-right: 1rem">
                    <button type="button"
                    class="transfer"
                    @click="Transfer"
                    :loading="loadingT"
                    >确定</button>
                    </button>
                    <button
                    class="cancle"
                    style="color: #000"
                    @click="closeTransfer()"
                    type="button"
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
        inputName:{
            type:Object,
            default:{},
            required:true
        }
    },
    data () {
        const validateTranNumber = (rule, value, callback) => {
            if (value === '') {
                this.currentTrs = false;
                this.lessThanZero = false;
                callback(new Error(this.$t('message.DealCenter.EnterTransferAmount')));
            } else if(value <= 0){
                this.lessThanZero = true;
                callback(new Error(' ')); // 划转数量不能小于等于0
            }else if(!/^\d+(\.\d+)?$/.test(value)){
                this.currentTrs = false;
                this.lessThanZero = false;
                callback(new Error('请输入正确的数量'));
            }else{
                this.lessThanZero = false;
                this.currentTrs = true;
                callback();
            }
        };
        const checkSelect = (rule,value,callback) => {
            if (value === '') {
                this.labelWarning = true;
                this.labelsBorder = false;
                if (this.transferForm.to) {
                    return callback();
                } else {
                    // return callback(new Error( '请选择转入账户'));
                }
            }else if(value.length > 0) {
                this.labelsBorder = true;
                this.labelWarning = false;
                this.labelsBorder = true;
                return callback();
            }else {
                return callback();
            }
        };
        return {
            loading: false,
            loadingT: false,
            roll_in_available:null,
            roll_in_coin_name:'',
            roll_in_finance:'',
            transferForm:{
                currency:'请选择',
                currency_id:'',
                from: '',
                to: '',
                TranNumber: '',
                otc_finance_id: ''
            },
            ruleInline: {
                currency: [{required: true, message: '请选择币种', trigger: 'change'}],
                from: [{required: true, message: '请选择转出账户', trigger: 'change'}],
                to: [{validator: checkSelect, required: true, trigger: 'change'}],
                TranNumber: [
                {validator: validateTranNumber, trigger: 'blur'}
                ]
            },
            allNumber: 1,
            roll_out_coin_name:'',
            currencyList: [

            ],
            fromList: [

            ],
            toList: [

            ],
            labelsBorder: true,
            currentTrs: true,
            labelWarning: false,
            transferFormTip: false,
            lessThanZero: false
        }
    },
    filters: {
        saveDigits: function (value) {
            return exchange(scientificToNumber(value), 8);
        }
    },
    methods: {
        changeTrans(value){ // 币种
            this.transferForm.currency = value.split('/')[0];
            this.transferForm.currency_id = value.split('/')[1];
            this.transferForm.otc_finance_id = value.split('/')[2]
            this.changeNum(this.transferForm.to,value.split('/')[1]);
            this.roll_out_coin_name = this.transferForm.currency
            // console.log(this.transferForm.currency)
        },
        rollIn(value){ // 转至
            this.transferForm.to = value;
            if (this.transferForm.to) {
                this.labelsBorder = true;
                this.labelWarning = false;
                this.transferFormTip = false;
            } else {
                this.labelsBorder = false;
                this.labelWarning = true;
                this.transferFormTip = true;
            }
        },
        changeNum(value,currency){ // 币转换
            api.otcFinanceExchange({
                otc_finance_id:this.transferForm.otc_finance_id,
                roll_in_finance:value
            }).then(res=>{
                if(res.status_code == 200){
                this.roll_in_available = res.data.roll_in_available;
                this.roll_in_coin_name = res.data.roll_in_coin_name
                this.allNumber = res.data.roll_out_available
                }
            }).catch(error=>{
                this.$Message.error(this.$t('message.Reject.InformaObtainFailed'));
            })
        },
        all() {
            this.transferForm.TranNumber = this.allNumber;
        },
        closeTransfer () {
            this.$emit('close');
            this.$refs['transferForm'].resetFields();
            this.transferForm.currency = '';
            this.transferForm.from = '';
            this.transferForm.to = '';
            this.transferForm.TranNumber = ''
        },
        //  立即划转
        Transfer() {
            if (this.transferForm.to) {
                this.labelsBorder = true;
                this.labelWarning = false;
                this.transferFormTip = false;
            } else {
                this.labelsBorder = false;
                this.labelWarning = true;
                this.transferFormTip = true;
            }
            this.$refs['transferForm'].validate((valid) => {
                if (valid) {
                    this.loadingT = true;
                    if(this.transferForm.to == '钱包'){
                        this.roll_in_finance = 'finance'
                    }else if(this.transferForm.to == '币币资产'){
                        this.roll_in_finance = 'exchange'
                    }
                let params = {
                    otc_finance_id: this.transferForm.otc_finance_id,
                    roll_in_finance:this.roll_in_finance,
                    amount:this.transferForm.TranNumber
                };
                this.loading = true;
                api.otcFinanceShift(params).then(res=>{
                    this.loadingT = false;
                    this.loading = false;
                    if(res.status_code == 200){
                    this.$Message.success('划转成功！');
                    this.closeTransfer();
                    this.$emit('ievent')
                    }
                }).catch(error=>{
                    this.loadingT = false;
                    // this.$Message.error(this.$t('message.Reject.InformaObtainFailed'));
                })
                }
            })
        },
        transaction(){
            let params = {
                otc_finance_id:this.inputName.otc_finance_id
            };
            api.otcFinanceList(params).then(res=>{
                if(res.status_code == 200){
                this.allNumber = res.data.roll_out_available;
                this.transferForm.currency = this.inputName.coin_name;
                this.roll_out_coin_name = res.data.roll_out_coin_name;
                if(res.data.roll_out[0] == 'otc'){
                    this.transferForm.from = 'otc资产'
                }else{
                    this.transferForm.from = res.data.roll_out[0]
                }
                for(let i = 0; i < res.data.roll_in.length; i++){
                    if(res.data.roll_in[i] == 'finance'){
                        this.toList[i] = '钱包'
                    }else if(res.data.roll_in[i] == 'exchange'){
                        this.toList[i] = '币币资产'
                    }
                }
                this.currencyList = res.data.list;
                for(let value of res.data.list){
                    if(value.coin_name == this.transferForm.currency){
                    this.transferForm.currency_id = value.coin_id;
                    }
                }
                }
            }).catch(error=>{
                this.$Message.error(this.$t('message.Reject.InformaObtainFailed'));
            })
        }
    },
    watch: {
    },
    mounted(){
        this.transaction();
        this.transferForm.otc_finance_id = this.inputName.otc_finance_id
    }
};
</script>

<style scoped>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 5rem;
        position: relative;
        border: 1px solid #eee;
        background:#ccc;
    }
    .otctransfer .label-color {
        color: #000;
    }
    .otctransfer .mention-money-transfer {
        color: #918C96
    }
    .otctransfer .labels-border {
        border: 1px solid #dbdbdb;
        border-radius: 0.25rem;
    }
    .otctransfer .label-warning {
        border-radius: 0.25rem;
        border: 1px solid red;
    }
    .otctransfer .currentTrs {
        border-color: #dbdbdb;
        border-radius: 0.25rem;
    }
    .otctransfer .currentAll {
        color: #EDB348;
    }
    .otctransfer .labels-border:hover{
        border-color: #5474E4;
    }
    .whitetran .ivu-input {
        font-size: 0.7rem;
    }

</style>
