<template>
  <div class="dealcentertransfer">
    <div class="box transfer-hei">
      <span class="icon-wrong close" @click="closeTransfer()"></span>
      <p class="transfer-header margin-bottom-20">{{ $t(`message.DealCenter.AssetTransfer`) }}</p>
      <p class="text-12-999 margin-bottom-20">{{ $t(`message.DealCenter.TransferToExchangeW`) }}</p>
      <Form ref="transferForm" :model="transferForm" :rules="ruleInline" class="transfer-select" id="transfer-select">
        <span class="input-title-jay">{{ $t(`message.Coin`) }}</span>
         <span class="text-12-999-jay" v-show="coinShow">
					 该币种禁止划转!
					</span>
        <FormItem prop="currency" class="tip">
          <Select v-model="selectvalue" disabled style="width:23rem" @on-change="toggleOption(currencyList,selectvalue)">
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
        <p class="input-title">
          从
          <span class="text-12-999">
						( {{ $t(`message.DealCenter.Availables`) }} :{{fromList.roll_out_available}}&nbsp;{{fromList.roll_out_coin_name}})
					</span>
        </p>
        <FormItem prop="from" class="tip">
          <input type="text" v-model="inAccount" class="account" readonly >
        </FormItem>
        <p class="input-title">
       转至
        </p>
        <FormItem prop="toListval" class="tip">
          <Select v-model="transferForm.toListval" style="width:23rem">
            <Option style="background : #171a21"
              v-for="(item,index) in toList"
              :value="item"
              :label="intoPurse[item]"
              :key="item + index"
            >
              {{ intoPurse[item] }}
            </Option>
          </Select>
        </FormItem>
        <p class="input-title">
          {{ $t(`message.OTCBeal.Volume`) }}
          <span class="text-12-999">
						( {{ $t(`message.DealCenter.AvailableS`) }}:{{fromList.roll_out_available}}&nbsp;{{fromList.roll_out_coin_name}})
					</span>
        </p>
        <div class="number">
          <FormItem prop="TranNumber" class="tip login" style="width: 23rem">
            <Input placeholder="0.000000" v-model="transferForm.TranNumber"></Input>
          </FormItem>
          <button type="button" @click.prevent="all">{{ $t(`message.DealCenter.Alla`) }}</button>
        </div>
        <Button
          class="transfer"
          @click="Transfer"
          type='info'
          v-if="coinSend"
          :loading="loadingT"
        >{{ $t(`message.MoneyBag.Transfer`) }}</Button>
         <Button
          disabled
          type='primary'
          v-else
        >{{ $t(`message.MoneyBag.Transfer`) }}</Button>
        <button
          class="cancle"
          @click="closeTransfer()"
          type="button"
        >{{ $t(`message.BaseInfo.Cancel`) }}</button>
      </Form>
    </div>
  </div>
</template>
<script>
  import api from '@/api'
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
          return callback(new Error( this.$t('message.DealCenter.EnterTransferAmount')));
        }else if(value == 0){
          return callback(new Error(this.$t('message.MoneyBag.TransferAmountMinZ')));
        }else if(value > Number(this.fromList.roll_out_available)){
          return  callback(new Error(this.$t('message.MoneyBag.ExceedAmountTran')));
        }else if(!/^\d+(\.\d+)?$/.test(value)){
            return  callback(new Error('请输入正确的数量'));
        }else if(value <= 0){
            return  callback(new Error('数量不能小于等于0'));
        }else{
          return callback();
        }
      };
      return {
        loadingT:false,
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
          toListval: [{required: true, message: this.$t('message.DealCenter.ChooseTransferAccount'), trigger: 'change'}],
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
          'exchange': this.$t('message.DealCenter.ExchangeAccountS')
        },
        outAccountVal:''
      }
    },
    filters:{
      coinType(cointype){
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
        this.$refs['transferForm'].validate((valid) => {
          if (valid ) {
              this.loadingT = true;
                let params = {
                  exchange_finance_id: this.exchange_id,
                  roll_in_finance: this.transferForm.toListval,
                  amount: this.transferForm.TranNumber
               };
               api.TransferredSubmit(params).then(res => {
                   this.loadingT = false;
                    this.coinSend = false;
                    if(res.status_code == 200){
                        this.loadingT =
                      this.coinSend = true;
                      this.closeTransfer();
                      this.$Message.info(this.$t('message.Reject.TransferSucceed'));
                      this.$emit('ievent')
                    }
                    this.time = setTimeout(()=>{
                       this.coinSend = true;
                    },1000)
               }).catch(err => {
                   this.loadingT = false;
               });
             }
        });
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
        })
      },
    },
    mounted(){
      this.pullWalletList();
    }
  };
</script>
