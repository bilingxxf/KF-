<template lang="html">
  <div class="AssetRecord">
    <Content>
      <div class="otc-record">
        <div class="otc-record-content">
          <!-- <div class="record-content-top">
            <span><router-link to="/MyAdvertising">{{ $t(`message.Nav.AdvertisManagement`) }}</router-link></span>>><span>{{ $t(`message.MyAdvertising.AddAdvertisement`) }}</span>
          </div> -->
          <div class="record-content-main">
            <div class="record-main-top">
              <p :class="{active:tab == index}" :key="index" @click="toggle(index)" v-for="(item,index) in items">{{item.coin_name}}</p>
							<span class="record-main-top-span" @click="goBack">←返回上级</span>
            </div>
            <div class="main-left-top">
                <p class="my-balance">我的余额：<span>{{balance_num}} {{coin_name}}</span></p>
                <!--<button type="button" class="Mention_money">{{ $t(`message.MoneyBag.Withdraw`) }}</button>-->
                <!-- <button type="button" class="Recharge" @click="Deposit_Btn">{{ $t(`message.MoneyBag.Deposit`) }}</button> -->
            </div>
            <div class="tab-content">
              <div class="tab-content-line"></div>
              <div class="record-main-left">

                <div class="main-left-middle">
                <Form ref="formItem" :model="formItem" :rules="ruleValidate" label-position="top">
                  <!--收购数量-->
                  <FormItem :label="$t(`message.AssetRecord.amount`)" prop="buyNum" class="otcTip">
                    <Input maxlength="12" type="text" v-model="formItem.buyNum" onkeydown="if(event.keyCode==32) return false" placeholder="请填写收购数量" />
                  </FormItem>
                  <!--溢价-->
                  <FormItem prop="remium" class="otcTip">
                      <label style="font-size:0.8rem">{{$t(`message.OTCOrder.PremiumS`)}}&nbsp;&nbsp;(-10 -- 10，最小单位0.1)</label>
                    <Input type="text" v-model="formItem.remium" onkeydown="if(event.keyCode==32) return false" placeholder="请填写溢价"/>
                    <span class="remium-icon">%</span>
                  </FormItem>

                  <!--法币-->
                  <FormItem label="法币" prop="currency_id" class="otcTip">
                    <Select v-model="formItem.currency_id">
                      <Option v-for="(list,index) in currency" :value="list.currency_id +'-'+list.currency_code" :key="index">{{ list.currency_name }}</Option>
                    </Select>
                  </FormItem>

                  <!--买入——出价范围-->
                  <FormItem :label="$t(`message.AssetRecord.price`)" prop="buy_sale" class="offer-start offer-new-start">
                    <Input class="buy_sale_range" type="text" v-model="formItem.buy_sale" onkeydown="if(event.keyCode==32) return false" placeholder="请输入最小值"/>
                  </FormItem>

                  <span class="section">{{ $t(`message.DealCenter.ToS`) }}</span>

                  <FormItem prop="buy_sale_large" class="offer-end offer-new-end">
                    <Input class="buy_sale_range" type="text" v-model="formItem.buy_sale_large" onkeydown="if(event.keyCode==32) return false" placeholder="请输入最大值"/>
                  </FormItem>


                  <FormItem prop="radio">
                    <span class="lable">{{ $t(`message.OTCBeal.PayMethods`) }}：</span>
                      <Checkbox v-model="single_alipay" v-if="alipayCheck">{{ $t(`message.AliPay`) }}</Checkbox>
                      <Checkbox v-model="single_wechat" v-if="wechatCheck">{{ $t(`message.WeChat`) }}</Checkbox>
                      <Checkbox v-model="single_bankCard" v-if="bankCardCheck">{{ $t(`message.BankCard`) }}</Checkbox>
                      <Checkbox v-model="single_PayPal" v-if="PayPalCheck">PayPal</Checkbox>
                  </FormItem>
                    <div style="clear:both;"></div>
                  <Button class="buy_btn" @click="BuyBtn" :loading="loadingBuy">{{buyMsg}}</Button>
                  <!--买入（USDT → LRC）-->
                </Form>
                </div>

              </div>
              <div class="record-main-right">
                <div class="main-left-middle">
                  <Form ref="formItem_sell" :model="formItem_sell" label-position="top" :rules="ruleValidateTwo">
                    <!--收购数量-->
                    <FormItem label="出售数量" prop="SellNum" class="otcTip">
                      <Input maxlength="12" type="text" v-model="formItem_sell.SellNum" onkeydown="if(event.keyCode==32) return false" placeholder="请填写出售数量"/>
                    </FormItem>
                    <!--溢价-->
                    <FormItem prop="remium" class="otcTip">
                        <label style="font-size:0.8rem">{{$t(`message.OTCOrder.PremiumS`)}}&nbsp;&nbsp;(-10 -- 10，最小单位0.1)</label>
                      <Input type="text" v-model="formItem_sell.remium" onkeydown="if(event.keyCode==32) return false" placeholder="请填写溢价"/>
                      <span class="remium-icon">%</span>
                    </FormItem>

                    <!--法币-->
                    <FormItem label="法币" prop="currency_id" class="otcTip">
                      <Select v-model="formItem_sell.currency_id">
                        <Option v-for="(list,index) in currency" :value="list.currency_id +'-'+list.currency_code" :key="index">{{ list.currency_name }}</Option>
                      </Select>
                    </FormItem>

                    <!--卖出——出价范围-->
                    <FormItem :label="$t(`message.AssetRecord.price`)" prop="sell_sale" class="offer-start offer-new-start">
                      <Input class="buy_sale_range" type="text" v-model="formItem_sell.sell_sale" onkeydown="if(event.keyCode==32) return false" placeholder="请输入最小值"/>
                    </FormItem>
                    <span class="section">{{ $t(`message.DealCenter.ToS`) }}</span>
                    <FormItem prop="sell_sale_large" class="offer-end offer-new-end">
                      <Input class="buy_sale_range" type="text" v-model="formItem_sell.sell_sale_large" onkeydown="if(event.keyCode==32) return false" placeholder="请输入最大值"/>
                    </FormItem>

                    <!--支付方式-->
                    <FormItem prop="way_two">
                      <span class="lable">{{ $t(`message.OTCBeal.PayMethods`) }}：</span>
                        <Checkbox v-model="single_sell_alipay" v-if="alipayCheck">{{ $t(`message.AliPay`) }}</Checkbox>
                        <Checkbox v-model="single_sell_wechat" v-if="wechatCheck">{{ $t(`message.WeChat`) }}</Checkbox>
                        <Checkbox v-model="single_sell_bankCard" v-if="bankCardCheck">{{ $t(`message.BankCard`) }}</Checkbox>
                        <Checkbox v-model="single_sell_PayPal" v-if="PayPalCheck">PayPal</Checkbox>
                    </FormItem>
                    <div style="clear:both;"></div>
                    <Button class="sell_btn" @click="SellBtn" :loading="loadingSell">{{sellMsg}}</Button>
                    <!--卖出（USDT → LRC）-->
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>

    <!--请先绑定并启用支付方式-->
    <div class="tempModel-undo" v-show="undoTemp">
      <div class="tempModel-undo-main">
        <p>{{ $t(`message.NoticeS`) }}</p>
        <router-link to="/MyAdvertising"><span class="icon-wrong"></span></router-link>
        <div style="clear: both;"></div>
        <p>{{ $t(`message.OTCOrder.NoAccountaAddPay`) }}</p>
        <div style="clear:both;"></div>
        <router-link to="/baseInfo"><span class="sure_btn">{{ $t(`message.BaseInfo.Confirm`) }}</span></router-link>
        <router-link to="/MyAdvertising"><span class="fou_btn">{{ $t(`message.BaseInfo.Cancel`) }}</span></router-link>
      </div>
    </div>

  </div>
</template>

<script>
import api from '../../api'
export default {
	name: "AssetRecord",
	data() {
		const validateNumBuy = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入正确的数量值'));
			} else if (!/^\d+(\.\d+)?$/.test(value)) {
				return callback(new Error('请输入正确的数量'))
			} else if (value <= 0) {
				return callback(new Error('币数量不能小于等于0'))
			} else {
				callback();
			}
		};
		const validateNum = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入正确的数量值'));
			} else if (!/^\d+(\.\d+)?$/.test(value)) {
				return callback(new Error('请输入正确的数量'))
			} else if (parseFloat(value) > parseFloat(this.balance_num)) {
				return callback(new Error('币数量不足请先充值'))
			} else if (value <= 0) {
				return callback(new Error('币数量不能小于等于0'))
			} else {
				callback();
			}
		};
		// const validateBack = (rule, value, callback) => {
		// 	if (!value) {
		// 		return callback(new Error(this.$t('message.OTCOrder.PleaseFillPremium')));
		// 	} else if (!/^-?[0-9]\d*$/.test(value)) {
		// 		return callback(new Error('请输入正确的溢价'))
		// 	} else if (!/^(\-|\+)?\d+(\.\d+)?$/.test(value)) {
		// 		return callback(new Error('请输入正确的溢价'))
		// 	} else if (value < -10 || value > 10) {
		// 		return callback(new Error(this.$t('message.OTCOrder.PremiumMustWithin')))
		// 	} else {
		// 		callback();
		// 	}
		// };
		const validateBack = (rule, value, callback) => {
			if (!value) {
				return callback(new Error(this.$t('message.OTCOrder.PleaseFillPremium')));
			} else if (!/^-?[0-9]\d*(\.[0-9])?$/.test(value)) {
				return callback(new Error('请输入正确的溢价'))
			} else if (!/^(\-|\+)?\d+(\.\d+)?$/.test(value)) {
				return callback(new Error('请输入正确的溢价'))
			} else if (value < -10 || value > 10) {
				return callback(new Error(this.$t('message.OTCOrder.PremiumMustWithin')))
			} else {
				callback();
			}
		};
		const validateMin = (rule, value, callback) => {
			if (!value) {
				return callback(new Error(this.$t('message.OTCOrder.PleaseEnterMiniAm')));
			} else if (!/^\+?[1-9][0-9]*$/.test(value)) {
				return callback(new Error(this.$t('message.OTCOrder.TheMinimumAmountO')))
			} else {
				callback();
			}
		};
		const validateMax = (rule, value, callback) => {
			if (!value) {
				return callback(new Error(this.$t('message.OTCOrder.PleaseEnterMaxAm')));
			} else if (!/^\+?[1-9][0-9]*$/.test(value) || parseInt(value) <= parseInt(this.formItem.buy_sale)) {
				return callback(new Error('请输入不低于最小出价范围的正整数'))
			} else {
				callback();
			}
		};
		const validateSellMax = (rule, value, callback) => {
			if (!value) {
				return callback(new Error(this.$t('message.OTCOrder.PleaseEnterMaxAm')));
			} else if (!/^\+?[1-9][0-9]*$/.test(value) || parseInt(value) <= parseInt(this.formItem_sell.sell_sale)) {
				return callback(new Error('请输入不低于最小出价范围的正整数'))
			} else {
				callback();
			}
		};
		return {
			loadingSell: false,
			loadingBuy: false,
			alipayCheck: false,
			wechatCheck: false,
			bankCardCheck: false,
			PayPalCheck: false,
			undoTemp: false,
			single_alipay: false,
			single_wechat: false,
			single_bankCard: false,
			single_PayPal: false,
			single_sell_alipay: false,
			single_sell_wechat: false,
			single_sell_bankCard: false,
			single_sell_PayPal: false,
			coin_id: '',
			coin_name: '',
			items: [],
			currency_id: '',
			balance_num: '',
			currencyCode: '',
			// currency_name:'',
			formItem: {
				number: true,
				buyNum: '',
				remium: '',
				buy_sale: '',
				buy_sale_large: '',
				currency_id: '',
				// currency_code:'',

			},
			formItem_sell: {
				number: true,
				SellNum: '',
				remium: '',
				currency_id: '',
				// currency_name:'',
				sell_sale: '',
				sell_sale_large: '',
			},

			ruleValidate: {
				//  ,{type:'number',message: this.$t('message.DealCenter.AmountMustDigit')}
				//  ,{type:'number',message: '请输入正确的溢价'}
				buyNum: [{ validator: validateNumBuy, trigger: 'blur' }],
				remium: [{ validator: validateBack, trigger: 'blur' }],
				buy_sale: [{ validator: validateMin, trigger: 'blur' }],
				buy_sale_large: [{ validator: validateMax, trigger: 'blur' }],
				currency_id: [{ required: true, message: '请选择法币', trigger: 'change' }]
			},

			ruleValidateTwo: {
				//  ,{type:'number',message: this.$t('message.DealCenter.AmountMustDigit')}
				//  ,{type:'number',message: '请输入正确的溢价'}
				SellNum: [{ validator: validateNum, trigger: 'blur' }],
				remium: [{ validator: validateBack, trigger: 'blur' }],
				sell_sale: [{ validator: validateMin, trigger: 'blur' }],
				sell_sale_large: [{ validator: validateSellMax, trigger: 'blur' }],
				currency_id: [{ required: true, message: '请选择法币', trigger: 'change' }]
			},
			tab: 0,
			status: true,
			buyMsg: this.$t('message.DealCenter.BuyLPC'),
			sellMsg: this.$t('message.DealCenter.Sell'),


			//  法币
			currency: [],

		}
	},
	methods: {
		goBack(){
			window.history.go(-1)
		},
		toggle(index) {
			this.status = true;
			this.tab = index;
			this.get_coin_list();
			this.$refs['formItem'].resetFields();
			this.$refs['formItem_sell'].resetFields();
			this.single_alipay = false;
			this.single_wechat = false;
			this.single_bankCard = false;
			this.single_PayPal = false;
			this.single_sell_alipay = false;
			this.single_sell_wechat = false;
			this.single_sell_bankCard = false;
			this.single_sell_PayPal = false;



		},

		get_coin_list() {   //获取币列表
			api.advertiserUrl().then(res => {
				this.items = res.data.list;
				for (let y = 0; y < this.items.length; y++) {
					if (y == this.tab) {
						this.coin_id = this.items[y].coin_id;
						this.coin_name = this.items[y].coin_name
					}
				}
				this.get_otc_finance();   //OTC币种资产信息
			}).catch(res => {

			})

		},


		get_currency() {         //获取法币列表
			api.get_currency().then(res => {
				this.currency = res.data.list;

				// for (let k =0; k<this.currency.length; k++){
				//   this.currency_id = this.currency[k].currency_id;
				//
				// }
			}).catch(error => {

			})

		},


		BuyBtn() {         //买入
			this.loadingBuy = true;
			this.$refs['formItem'].validate((valid) => {
				if (valid) {
					// if (this.formItem.currency_id == ''){
					//     this.$Message.info('请输入法币！');
					//     return;
					// }
					// for (let y =0; y<this.currency.length; y++){
					//     if (this.currency[y].currency_id == this.formItem.currency_id) {
					//         this.currencyCode = this.currency[y].currency_code;
					//     }
					// }
					let p = {
						coin_name: this.coin_name,
						coin_id: this.coin_id,                            //币id
						otc_advertisement_type: 2,                     //交易类型
						coin_code: this.formItem.buyNum,               //币数量
						currency_margin: this.formItem.remium,         //溢价
						currency_id: this.formItem.currency_id.split('-')[0],        //法币id
						currency_name: this.formItem.currency_id.split('-')[1],              //法币名称
						min_limit: this.formItem.buy_sale,             //最小交易额
						max_limit: this.formItem.buy_sale_large,       //最大交易额
						is_alipay: this.single_alipay === true ? 2 : 1,
						is_wechatpay: this.single_wechat === true ? 2 : 1,
						is_bank: this.single_bankCard === true ? 2 : 1,
						is_paypal: this.single_PayPal === true ? 2 : 1,
					};
					api.publish_advertiser(p).then(res => {
						this.loadingBuy = false;
						if (res.status_code == 200) {
							this.$Message.success(this.$t('message.OTCOrder.AdvertisePostSucc'));
							this.$refs['formItem'].resetFields();
							this.single_alipay = false;
							this.single_wechat = false;
							this.single_bankCard = false;
							this.single_PayPal = false;
							this.$router.replace({
								path: '/MyAdvertising'
							})
						}
					}).catch(err => {
						this.loadingBuy = false;
					})

				} else {
					this.loadingBuy = false;
				}
			})

		},

		SellBtn() {    //卖出
			this.loadingSell = true;
			this.$refs['formItem_sell'].validate((valid) => {
				if (valid) {
					// if (this.formItem_sell.currency_id == ''){
					//     this.$Message.info('请输入法币！');
					//     return;
					// }
					// for (let y =0; y<this.currency.length; y++){
					//     if (this.currency[y].currency_id == this.formItem_sell.currency_id) {
					//         this.currencyCode = this.currency[y].currency_code;
					//     }
					// }
					let p = {
						coin_name: this.coin_name,
						coin_id: this.coin_id,                              //币id
						otc_advertisement_type: 1,                          //交易类型
						coin_code: this.formItem_sell.SellNum,              //币数量
						currency_margin: this.formItem_sell.remium,         //溢价
						currency_id: this.formItem_sell.currency_id.split('-')[0],        //法币id
						currency_name: this.formItem_sell.currency_id.split('-')[1],                   //法币名称
						min_limit: this.formItem_sell.sell_sale,            //最小交易额
						max_limit: this.formItem_sell.sell_sale_large,      //最大交易额
						is_alipay: this.single_sell_alipay === true ? 2 : 1,
						is_wechatpay: this.single_sell_wechat === true ? 2 : 1,
						is_bank: this.single_sell_bankCard === true ? 2 : 1,
						is_paypal: this.single_sell_PayPal === true ? 2 : 1,
					};
					api.publish_advertiser(p).then(res => {
						this.loadingSell = false;
						if (res.status_code == 200) {
							this.$Message.success(this.$t('message.OTCOrder.AdvertisePostSucc'));
							this.$refs['formItem_sell'].resetFields();
							this.single_sell_alipay = false;
							this.single_sell_wechat = false;
							this.single_sell_bankCard = false;
							this.single_sell_PayPal = false;
							this.get_otc_finance();
							this.$router.replace({
								path: '/MyAdvertising'
							})
						}
					}).catch(err => {
						this.loadingSell = false;
					})

				} else {
					this.loadingSell = false;
				}
			})

		},

		payment_method() {               //获取支付方式
			api.pay_method_list().then(res => {
				if (res.status_code == 200) {
					for (let i = 0; i < res.data.length; i++) {
						switch (res.data[i]) {
							case 'user_account_alipay':
								this.alipayCheck = true;
								break;
							case 'user_account_wechatpay':
								this.wechatCheck = true;
								break;
							case 'user_account_bank':
								this.bankCardCheck = true;
								break;
							case 'user_account_paypal':
								this.PayPalCheck = true;
								break;
						}

					}
				} else if (res.status_code == 8001) {
					this.undoTemp = true;
				}

			})
		},

		//  OTC币种资产信息
		get_otc_finance() {
			api.get_otc_finance({
				coin_id: this.coin_id,
			}).then(res => {
				if(res.data.finance_available_str && res.data.finance_available_str!='') {
					this.balance_num = res.data.finance_available_str;
				}else {
					this.balance_num = 0
				}
			}).catch(error => {

			})
		},

		Deposit_Btn() {        //钱包充值
			api.otc_finance_wallet({
				coin_id: this.coin_id,
			}).then(res => {
				this.$router.push({ path: '/recharge', query: { coin_id: res.data.coin_id } });
			}).catch(error => {

			})
		}
	},


	mounted() {
		this.get_coin_list();     //获取币列表
		this.payment_method();    //获取支付方式
		this.get_currency();      //获取法币列表
	},



}
</script>

<style scoped="scoped" lang="scss">
</style>
