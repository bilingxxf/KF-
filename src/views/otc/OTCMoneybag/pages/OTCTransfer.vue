<template>
	<div class="otctransfer">
		<div class="box whitetran">
			<span class="icon-wrong close" @click="closeTransfer()"></span>
			<p class="transfer-header margin-bottom-20">资金划转</p>
			<p class="text-12-999 margin-bottom-20">提币请划转至钱包交易账户</p>
			<Form ref="transferForm" :model="transferForm" :rules="ruleInline" class="white-select">
        <p class="input-title">币种</p>
        <FormItem prop="currency" class="tip">
          <Dropdown trigger="click" style="width:23rem;border: 1px solid #f5f5f5;height: 2rem;line-height: 2rem" @on-click="changeTrans">
            <a href="javascript:void(0)" style="display: flex;padding: 0 0.5rem;color: #333">
              <span style="flex: 1">{{transferForm.currency}}</span>
              <Icon type="ios-arrow-down" style="flex: 1;text-align: right;line-height: 2rem"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem v-for="(item,index) in currencyList" :key="index" :name="item.coin_name+'/'+item.coin_id+'/'+item.otc_finance_id">{{ item.coin_name }}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </FormItem>
        <p class="input-title">
          从
          <span class="text-12-999">
            (余额为:{{allNumber}} {{roll_out_coin_name}})
        </span>
        </p>
        <FormItem prop="from" class="tip">
          <Input v-model="transferForm.from" style="width:23rem" disabled></Input>
        </FormItem>
        <p class="input-title">
          转至
        </p>
        <FormItem prop="to" class="tip">
          <Select v-model="transferForm.to" style="width:23rem" @on-change="rollIn">
            <Option v-for="(item,index) in toList" :key="index" :value="item">
              {{item}}
            </Option>
          </Select>
        </FormItem>
        <p class="input-title">
          数量
          <span class="text-12-999">
						(可划转数量为:{{allNumber}} {{roll_out_coin_name}})
					</span>
        </p>
        <div class="number">
          <FormItem prop="TranNumber" class="tip login" style="width: 23rem">
            <Input placeholder="0.000000" v-model="transferForm.TranNumber"></Input>
          </FormItem>
          <button type="button" @click="all">全部</button>
        </div>
        <button type="button"
                class="transfer"
                @click="Transfer"
                :loading="loadingT"
        >立即划转</button>
        <button
          class="cancle"
          @click="closeTransfer()"
          type="button"
        >取消</button>
			</Form>
		</div>
	</div>
</template>

<script>
  import api from '@/api'
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
              callback(new Error(this.$t('message.DealCenter.EnterTransferAmount')));
            } else if(value <= 0){
                callback(new Error('划转数量应大于零'));
            }else if(!/^\d+(\.\d+)?$/.test(value)){
                callback(new Error('请输入正确的数量'));
            }else{
                callback();
            }
          };
          return {
              loadingT:false,
            roll_in_available:null,
            roll_in_coin_name:'',
            roll_in_finance:'',
            transferForm:{
              currency:'',
              currency_id:'',
              from: '',
              to: '',
              TranNumber: '',
              otc_finance_id: ''
            },
            ruleInline: {
              currency: [{required: true, message: '请选择币种', trigger: 'change'}],
              from: [{required: true, message: '请选择转出账户', trigger: 'change'}],
              to: [{required: true, message: '请选择转入账户', trigger: 'change'}],
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

              ]
          }
        },
        methods: {
          changeTrans(value){         //币种
            this.transferForm.currency = value.split('/')[0];
            this.transferForm.currency_id = value.split('/')[1];
            this.transferForm.otc_finance_id = value.split('/')[2]
            this.changeNum(this.transferForm.to,value.split('/')[1]);
            this.roll_out_coin_name = this.transferForm.currency
          },
          rollIn(value){               //转至
             this.transferForm.to = value;
          },
          changeNum(value,currency){            //币转换
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
                api.otcFinanceShift(params).then(res=>{
                    this.loadingT = false;
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
        mounted(){
            this.transaction();
            this.transferForm.otc_finance_id = this.inputName.otc_finance_id
        }
    };
</script>

<style scoped>

</style>
