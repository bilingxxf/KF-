<template>
	<div id="dealCenterRightBottom">
		<div class="right-bottom-content-padding">
			<div class="tabTop">
				<div class="pricingDeals">
					<div class="pricingDeals-tab" :class="{active:num==0}" @click="tab(0)">{{ $t(`message.DealCenter.LimitOrder`) }}</div>
				</div>
				<div class="marketDeals">
					<div class="marketDeals-tab" :class="{active:num==1}" @click="tab(1)">{{ $t(`message.DealCenter.MarketOrder`) }}</div>
				</div>
			</div>
			<div class="tabBottom">
				<div class="dealContent" v-show="num==0">
					<!-- 定价买开始 -->
					<div class="LRC buyLRC">
						<div class="buyLrcContent">
							<div class="secondInput">
								<label class="inputLeft">
									买入价&nbsp;{{currencyType.priCoin}}
								</label>
								<InputMessage :message="inputMessage" :show="priceDealOne.priceMes"></InputMessage>
								<!-- <input id="input1" :value="currencyType.marketPriceRatio" class="inputRight" :disabled="canEdit" /> -->
								<input title=" " v-number-only maxlength="14" @mousewheel.prevent v-model="priceDealOne.price" class="inputRight" :disabled="canEdit" @input="PriceChange()" />

								<!-- <input> -->
							</div>

							<p class="r_price">
								<span v-show="!canEdit">≈ {{(priceDealOne.price * (1 / toCurrency.arr[symbolPri.toUpperCase()])).toFixed(4) == 'NaN' ? '-' : (priceDealOne.price * (1 / toCurrency.arr[symbolPri.toUpperCase()])).toFixed(4)}} {{toCurrency.currentName}}</span>
							</p>

							<div class="reminder InputMargin2">
								<div class="secondInput">
									<label class="inputLeft">
										买入量&nbsp;{{currencyType.assCoin}}</label>
									<!-- <input id="input2"  class="inputRight" :disabled="canEdit" /> -->
									<InputMessage :message="inputMessage" :show="priceDealOne.sumMes"></InputMessage>
									<input title=" " v-number-only maxlength="14" @mousewheel.prevent v-model="priceDealOne.sum" class="inputRight" :disabled="canEdit" @input="NumChange()" />
								</div>
							</div>

							<div class="percentage">
								<Pprogress @precent="getPrecent1" :sum="priceDealOne.allPrice" :isBuy="true" :canSelect="canSelect" :balance="currencyType.priCoinMoney"></Pprogress>
							</div>

							<div class="secondInput InputMargin2">
								<label class="inputLeft">
									兑换额&nbsp;{{currencyType.priCoin}}</label>
								<!-- <input id="input3" class="inputRight" :disabled="canEdit"> -->
								<input title=" " v-number-only maxlength="14" @mousewheel.prevent v-model="priceDealOne.allPrice" class="inputRight" :disabled="canEdit" @input="AllPriceChange()" />
							</div>

							<!-- <p class="serviceCharge">{{ $t(`message.DealCenter.HandFee`) }} 0 {{currencyType.assCoin}}（&nbsp;
								<span class="serviceChargeSpan">{{currencyType.serviceCharges}}%</span>&nbsp;{{ $t(`message.DealCenter.TradeFeeDeal`) }}）
							</p> -->
							<div class="firstLine" v-show="!canEdit">
								<p class="yuE">余额:
									<span>{{currencyType.priCoinMoney != 'undefined' ? currencyType.priCoinMoney : '--'}}</span>&nbsp;{{currencyType.priCoin}}</p>
								<div class="tiXian">
									<!-- <router-link :to="{path:'/withdrawCash',query:{coin_id: symbol.pri_id}}">{{ $t(`message.MoneyBag.Withdraw`) }}</router-link> -->
									<span :class="{ disabled : btnClickStatus.leftin == 2 }" @click=" btnClickStatus.leftin == 2 ? '' : span_click_router('buy', '1')" class="yuE_span">充值</span>
								</div>
								<div class="chongZhi">
									<!-- <router-link :to="{path:'/recharge',query:{coin_id:symbol.pri_id}}">{{ $t(`message.MoneyBag.Deposit`) }}</router-link> -->
									<span :class="{ disabled : btnClickStatus.leftout == 2 }" @click="btnClickStatus.leftout == 2 ? '' : span_click_router('buy', '2')" class="yuE_span">提币</span>
								</div>
							</div>
							<div class="unknownWord" v-show="canEdit">
								<span class="unknownWordColor" @click="goLogin()">登录&nbsp;</span>{{ $t(`message.DealCenter.Or`) }}&nbsp;
								<span class="unknownWordColor" @click="goRegister()">注册&nbsp;</span>{{ $t(`message.DealCenter.StartNow`) }}
							</div>

							<input type="button" :disabled="!priceDealOne.price || !priceDealOne.sum || !priceDealOne.allPrice || canEdit" :value="`${$t('message.DealCenter.BuyLPC')}`" class="tijiao greenBtn" @click="buySell('priceDealOneData', priceDealOne, '买入', 1)">
							<!-- <Buyselltan v-show="showTab" @huifu="huifu"></Buyselltan> -->
						</div>
					</div>
					<!-- 定价买结束 -->

					<div class="dealContentLie"></div>

					<!-- 定价卖开始 -->
					<div class="LRC sellLRC">
						<div class="buyLrcContent">

							<div class="secondInput">
								<label class="inputLeft">
									卖出价&nbsp;{{currencyType.priCoin}}
								</label>
								<InputMessage :message="inputMessage" :show="priceDealTwo.priceMes"></InputMessage>
								<!-- <input id="input1" :value="currencyType.marketPriceRatio" class="inputRight" :disabled="canEdit" /> -->
								<input title=" " v-number-only maxlength="14" @mousewheel.prevent v-model="priceDealTwo.price" class="inputRight" :disabled="canEdit" @input="PriceChange()" />
							</div>
							<p class="r_price">
								<span v-show="!canEdit">≈ {{(priceDealTwo.price * (1 / toCurrency.arr[symbolPri.toUpperCase()])).toFixed(4) == 'NaN' ? '-' : (priceDealTwo.price * (1 / toCurrency.arr[symbolPri.toUpperCase()])).toFixed(4)}} {{toCurrency.currentName}}</span>
							</p>

							<div class="reminder InputMargin2">
								<div class="secondInput">
									<label class="inputLeft">
										卖出量&nbsp;{{currencyType.assCoin}}</label>
									<InputMessage :message="inputMessage" :show="priceDealTwo.sumMes"></InputMessage>
									<input title=" " v-number-only maxlength="14" @mousewheel.prevent v-model="priceDealTwo.sum" class="inputRight" :disabled="canEdit" @input="NumChange()" />
								</div>
							</div>
							<div class="percentage">
								<Pprogress @precent="getPrecent2" :sum="priceDealTwo.sum" :isBuy="false" :canSelect="canSelect" :balance="currencyType.assCoinMoney"></Pprogress>
							</div>
							<div class="secondInput InputMargin2">
								<label class="inputLeft">
									兑换额&nbsp;{{currencyType.priCoin}}</label>
								<input title=" " v-number-only maxlength="14" @mousewheel.prevent v-model="priceDealTwo.allPrice" class="inputRight" :disabled="canEdit" @input="AllPriceChange()" />
							</div>
							<!-- <p class="serviceCharge">{{ $t(`message.DealCenter.HandFee`) }} 0 {{currencyType.priCoin}}（&nbsp;
								<span class="serviceChargeSpan">{{currencyType.serviceCharges}}%</span>&nbsp;{{$t(`message.DealCenter.TradeFeeDeal`)}} ）</p> -->
							<div class="firstLine" v-show="!canEdit">
								<p class="yuE">余额:
									<span>{{currencyType.assCoinMoney != 'undefined' ? currencyType.assCoinMoney : '--'}}</span>&nbsp;{{currencyType.assCoin}}</p>
								<div class="tiXian">
									<span :class="{ disabled : btnClickStatus.rightin == 2}" @click="btnClickStatus.rightin == 2 ? '' : span_click_router('sell', '1')" class="yuE_span">充值</span>
								</div>
								<div class="chongZhi">
									<span :class="{ disabled : btnClickStatus.rightout == 2}" @click="btnClickStatus.rightout == 2 ? '' : span_click_router('sell', '2')" class="yuE_span">提币</span>
								</div>
							</div>
							<div class="unknownWord" v-show="canEdit">
								<span class="unknownWordColor" @click="goLogin()">登录&nbsp;</span>{{ $t(`message.DealCenter.Or`) }}&nbsp;
								<span class="unknownWordColor" @click="goRegister()">注册&nbsp;</span>{{ $t(`message.DealCenter.StartNow`) }}
							</div>
							<input type="button" value="卖出" class="tijiao redBtn" @click="buySell('priceDealTwoData', priceDealTwo, '卖出', 1)" :disabled="!priceDealTwo.price || !priceDealTwo.sum || !priceDealTwo.allPrice || canEdit">
							<!-- <Buyselltan v-show="showTab" @huifu="huifu"></Buyselltan> -->
						</div>
					</div>
					<!-- 定价卖结束 -->

				</div>
				<div class="dealContent" v-show="num==1">
					<!-- 市价买开始 -->
					<div class="LRC buyLRC">
						<div class="buyLrcContent">
							<!-- 三个ipt -->
							<div class="disableInput">
								<label class="iptLeft">
									买入价&nbsp;{{currencyType.priCoin}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<span style="color:#fff">以市场上最优价格买入</span>
								</label>

							</div>
							<!-- <div class="reminder InputMargin2"> -->
							<!-- <div class="secondInput"> -->
							<!-- <label class="inputLeft"> -->
							<!-- {{ $t(`message.DealCenter.PurchaseVolume`) }}&nbsp;{{currencyType.assCoin}}</label> -->
							<!-- <input id="input8" class="inputRight" :disabled="canEdit" mix="0" v-model="samePriceBuyNum" @input="NumChange()" /> -->
							<!-- <Input v-model="marketPriceOne.sum" class="inputRight" @input="NumChange()" :disabled="canEdit"  /> -->
							<!-- </div> -->
							<!-- </div> -->
							<div class="percentage">
								<Pprogress @precent="getPrecent3" :sum="marketPriceOne.sum" :isBuy="true" :canSelect="canSelect" :balance="currencyType.priCoinMoney"></Pprogress>
							</div>
							<div class="secondInput InputMargin2">
								<label class="inputLeft">
									兑换额&nbsp;{{currencyType.priCoin}}</label>
								<!-- <input id="input11" class="inputRight" :disabled="canEdit" v-model="samePriceBuyAll" @input="AllPriceChange()" /> -->
								<InputMessage :message="inputMessage" :show="marketPriceOne.sumMes"></InputMessage>
								<input title=" " v-number-only maxlength="14" @mousewheel.prevent v-model="marketPriceOne.sum" class="inputRight" @input="AllPriceChange()" :disabled="canEdit" />
							</div>

							<div class="firstLine" v-show="!canEdit">
								<p class="yuE">余额:
									<span>{{currencyType.priCoinMoney != 'undefined' ? currencyType.priCoinMoney : '--'}}</span>&nbsp;{{currencyType.priCoin}}</p>
								<div class="tiXian">
									<span :class="{ disabled : btnClickStatus.leftin == 2}" @click="btnClickStatus.leftin == 2 ? '' : span_click_router('buy', '1')" class="yuE_span">充值</span>
								</div>
								<div class="chongZhi">
									<span :class="{ disabled : btnClickStatus.leftout == 2}" @click="btnClickStatus.leftout == 2 ? '' : span_click_router('buy', '2')" class="yuE_span">提币</span>
								</div>
							</div>

							<!-- <p class="secondLine" v-show="!canEdit">
								{{ $t(`message.DealCenter.AvailableVolum`) }}&nbsp;<span class="secondLineSpan">{{currencyType.assCoinMoney/currencyType.marketPriceRatio | numFilter}}</span>&nbsp;{{currencyType.priCoin}}
							</p> -->

							<div class="unknownWord" v-show="canEdit">
								<span class="unknownWordColor" @click="goLogin()">{{ $t(`message.Nav.Login`) }}&nbsp;</span>{{ $t(`message.DealCenter.Or`) }}&nbsp;
								<span class="unknownWordColor" @click="goRegister()">{{ $t(`message.Nav.SignUp`) }}&nbsp;</span>{{ $t(`message.DealCenter.StartNow`) }}
							</div>
							<!-- <p class="serviceCharge">{{ $t(`message.DealCenter.HandFee`) }} 0 {{currencyType.assCoin}}（&nbsp;
								<span class="serviceChargeSpan">{{currencyType.serviceCharges}}%</span>&nbsp;{{$t(`message.DealCenter.TradeFeeDeal`)}}）</p> -->
							<input type="button" :value="`${$t('message.DealCenter.BuyLPC')}`" class="tijiao greenBtn" @click="buySell('mariketPriceoneData', marketPriceOne, '买入', 2)" :disabled="!marketPriceOne.sum || canEdit">
							<!-- <Buyselltan v-show="showTab" @huifu="huifu"></Buyselltan> -->
						</div>
					</div>
					<!-- 市价买结束 -->

					<div class="dealContentLie"></div>

					<!-- 市价卖开始 -->
					<div class="LRC sellLRC">
						<div class="buyLrcContent">
							<!-- 两个ipt -->
							<div class="disableInput">
								<label class="iptLeft">
									卖出价&nbsp;{{currencyType.priCoin}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<span style="color:#fff">以市场上最优价格卖出</span>
								</label>

							</div>
							<div class="percentage">
								<Pprogress @precent="getPrecent4" :sum="marketPriceTwo.sum" :isBuy="false" :canSelect="canSelect" :balance="currencyType.assCoinMoney"></Pprogress>
							</div>
							<div class="reminder InputMargin2">
								<div class="secondInput">
									<label class="inputLeft">
										卖出量&nbsp;{{currencyType.assCoin}}</label>
									<InputMessage :message="inputMessage" :show="marketPriceTwo.sumMes"></InputMessage>
									<input title=" " v-number-only maxlength="14" @mousewheel.prevent v-model="marketPriceTwo.sum" class="inputRight" @input="NumChange()" :disabled="canEdit" />
								</div>
							</div>
							<!-- <div class="secondInput InputMargin2"> -->
							<!-- <label  class="inputLeft"> -->
							<!-- {{ $t(`message.DealCenter.ExchangeAmount`) }}&nbsp;{{currencyType.priCoin}}</label> -->
							<!-- <input v-model="marketPriceTwo.allPrice" class="inputRight" @input="AllPriceChange()" :disabled="canEdit"  /> -->
							<!-- </div> -->

							<div class="firstLine" v-show="!canEdit">
								<p class="yuE">余额:
									<span>{{currencyType.assCoinMoney != 'undefined' ? currencyType.assCoinMoney : '--'}}</span>&nbsp;{{currencyType.assCoin}}</p>
								<div class="tiXian">
									<span :class="{ disabled : btnClickStatus.rightin == 2 }" @click="btnClickStatus.rightin == 2 ? '' : span_click_router('sell', '1')" class="yuE_span">充值</span>
								</div>
								<div class="chongZhi">
									<span :class="{ disabled : btnClickStatus.rightout == 2 }" @click="btnClickStatus.rightout == 2 ? '' : span_click_router('sell', '2')" class="yuE_span">提币</span>
								</div>
							</div>

							<!-- <p class="secondLine" v-show="!canEdit">
								{{ $t(`message.DealCenter.AvailableVolum`) }}&nbsp;<span class="secondLineSpan">{{currencyType.priCoinMoney/currencyType.fanMarketPriceRatio | numFilter}}</span>&nbsp;{{currencyType.assCoin}}
							</p> -->

							<div class="unknownWord" v-show="canEdit">
								<span class="unknownWordColor" @click="goLogin()">登录&nbsp;</span>或&nbsp;
								<span class="unknownWordColor" @click="goRegister()">注册&nbsp;</span>开始交易
							</div>
							<!-- <p class="serviceCharge">{{ $t(`message.DealCenter.HandFee`) }} 0 {{currencyType.priCoin}}（&nbsp;
								<span class="serviceChargeSpan">{{currencyType.serviceCharges}}%</span>&nbsp;{{$t(`message.DealCenter.TradeFeeDeal`)}}）</p> -->
							<input type="button" value="卖出" class="tijiao redBtn" @click="buySell('mariketPricetwoData',marketPriceTwo,'卖出', 2)" :disabled="!marketPriceTwo.sum || canEdit">
						</div>
					</div>
					<!-- 市价卖结束 -->

				</div>
			</div>
		</div>
		<Buyselltan v-if="showTab" @toZero="toZero" @huifu="huifu" :usdCount="usdCount" :changeMes="changeMes"></Buyselltan>
	</div>
</template>

<script>
import Pprogress from '../pprogress/Pprogress.vue'
import Buyselltan from '../pprogress/buySellTan.vue'
import InputMessage from '../pprogress/InputMessage.vue'
import utils from './../../utils'
import api from '../../api'
import { scientificToNumber, accAdd, accSub, accDiv, accMul } from '../../common/js/N.js'
import { mapGetters } from 'vuex'
//el.value = el.value.replace(/[^\d\.?]]*/g, '')
export default {
	name: "dealCenterRightBottom",
	data() {

		return {
			//市价交易的第一个
			marketPriceOne: {
				sum: '',
				sumMes: false,
			},

			//市价交易的第二个
			marketPriceTwo: {
				sum: '',
				sumMes: false,
			},

			//定价交易第一个
			priceDealOne: {
				price: '',
				sum: '',
				allPrice: '',
				sumMes: false,
				priceMes: false,
			},

			//定价交易第二个
			priceDealTwo: {
				price: '',
				sum: '',
				allPrice: '',
				sumMes: false,
				priceMes: false,
			},

			islogin: "false",
			index: 0,
			num: 0,
			showTab: false,
			price: 'price',
			// 判断是否登录,控制各个input能否输入按,canEdit:true表示disabled
			canEdit: true,
			// 判断能否点击precent,canSelect:flase表示不能点击进度条;
			canSelect: false,
			// 货币谁换谁，例如USDT(如美元)换LRC(如日元),手续费,市价的兑换比率,
			currencyType: {},

			changeMes: {},
			usdCount: 0,

			//提示信息如
			inputMessage: '',
			MesTime: '',

			//重置提币是否灰调 1：正常 2：禁用
			btnClickStatus: {
				leftout: 1,
				leftin: 1,
				rightout: 1,
				rightin: 1,
			}
		}
	},
	components: {
		Pprogress,
		InputMessage,
		Buyselltan
	},
	watch: {
		symbol(newVal, oldVal) {
			if (oldVal.coin_id != newVal.coin_id || oldVal.pri_id != newVal.pri_id) {
				this.btnCanClick()
				this.getMoneyMes()
				this.marketPriceOne.sum = ''
				this.marketPriceTwo.sum = ''
				this.priceDealOne.sum = ''
				this.priceDealOne.allPrice = ''
				this.priceDealTwo.sum = ''
				this.priceDealTwo.allPrice = ''

				this.currencyType.marketPriceRatio = this.symbol.price //未登录的话把价格穿进去
				this.render();
			}
		},
		moneyMesAss(newVal, oldVal) {
			this.currencyType.assCoin = this.symbolAss.toUpperCase()
			this.currencyType.priCoin = this.symbolPri.toUpperCase()
			this.currencyType.serviceCharges = newVal.exchange_service_fee
			this.currencyType.assCoinMoney = this.pointNum(newVal.finance_available_str, 8) || '0'
			this.render();
		},
		moneyMesPri(newVal, oldVal) {
			this.currencyType.assCoin = this.symbolAss.toUpperCase()
			this.currencyType.priCoin = this.symbolPri.toUpperCase()
			this.currencyType.priCoinMoney = this.pointNum(newVal.finance_available_str, 8) || '0'
			this.render();
		},
		delecent_price(val) {
			this.priceDealOne.price = val;
			this.priceDealTwo.price = val;
			this.NumChange()
		},
	},
	created() {
		this.currencyType = {
			assCoin: this.symbolAss.toUpperCase(),
			priCoin: this.symbolPri.toUpperCase(),
			serviceCharges: this.moneyMesAss.exchange_service_fee,
			marketPriceRatio: this.symbol.price,
			fanMarketPriceRatio: 1.3563,
			assCoinMoney: this.pointNum(this.moneyMesAss.finance_available_str, 8) || '0',
			priCoinMoney: this.pointNum(this.moneyMesPri.finance_available_str, 8) || '0',
		}
		this.getMoneyMes()
	},
	mounted() {
		this.isLogin();
		this.render();
		this.btnCanClick()
	},
	computed: {
		...mapGetters([
			'symbol',
			'symbolAss',
			'symbolPri',
			'moneyMesAss',
			'moneyMesPri',
			'toCurrency',
			'delecent_price',
			'detailObj',
			'coinList',
		]),
	},
	methods: {
		//能否充值提币
		span_click_router(type1, type2) {
			let params = {

			}
			let path = ''
			if (type1 == 'buy') {
				params.coin_id = this.symbol.pri_id
			} else {
				params.coin_id = this.symbol.coin_id
			}
			if (type2 == '1') {
				path = '/recharge'
			} else {
				path = '/withdrawCash'
			}
			//1 禁用 2 正常 3 禁止提币充值 4 禁止充值 5 禁止提币
			//type2  1 充值 2 提币
			api.withdrawInfo(params).then(data => {
				if (data.status_code == 200) {
					let flag = false
					if (type2 == 1) {
						switch (data.data.coin_status) {
							case 1:
								this.$black_prop('该币种已下架！')
								break;
							case 2:
								flag = true
								break;
							case 3:
								this.$black_prop('该币种禁止提币充值！')
								break;
							case 4:
								this.$black_prop('该币种禁止充值！')
								break;
							case 5:
								flag = true
								break;

						}
					} else {
						switch (data.data.coin_status) {
							case 1:
								this.$black_prop('该币种已下架！')
								break;
							case 2:
								flag = true
								break;
							case 3:
								this.$black_prop('该币种禁止提币充值！')
								break;
							case 4:
								flag = true
								break;
							case 5:
								this.$black_prop('该币种禁止提币！')
								break;

						}
					}

					if (flag) {
						this.$router.push({ path: path, query: { coin_id: params.coin_id } })
					}
				}
			})
		},
		//判断是否灰瑅币充值
		btnCanClick() {
			if (this.coinList.list) {
				this.coinList.list.forEach((val, index) => {
					if (val.coin_name == this.symbolAss.toUpperCase()) {
						switch (val.coin_status) {
							case 1:
								this.btnClickStatus.rightout = 2
								this.btnClickStatus.rightin = 2
								break
							case 2:
								this.btnClickStatus.rightout = 1
								this.btnClickStatus.rightin = 1
								break
							case 3:
								this.btnClickStatus.rightout = 2
								this.btnClickStatus.rightin = 2
								break
							case 4:
								this.btnClickStatus.rightout = 1
								this.btnClickStatus.rightin = 2
								break
							case 5:
								this.btnClickStatus.rightout = 2
								this.btnClickStatus.rightin = 1
								break
						}
					}
					if (val.coin_name == this.symbolPri.toUpperCase()) {
						switch (val.coin_status) {
							case 1:
								this.btnClickStatus.leftout = 2
								this.btnClickStatus.leftin = 2
								break
							case 2:
								this.btnClickStatus.leftout = 1
								this.btnClickStatus.leftin = 1
								break
							case 3:
								this.btnClickStatus.leftout = 2
								this.btnClickStatus.leftin = 2
								break
							case 4:
								this.btnClickStatus.leftout = 1
								this.btnClickStatus.leftin = 2
								break
							case 5:
								this.btnClickStatus.leftout = 2
								this.btnClickStatus.leftin = 1
								break
						}
					}
				})
			}

		},
		//获取用户资产
		getMoneyMes() {
			this.$store.dispatch('getMoneyMes', { ass: { coin_id: this.symbol.coin_id }, pri: { coin_id: this.symbol.pri_id } })
		},
		//把市长的价格渲染给定价的
		render() {
			this.$store.commit('change_delecent_price', this.currencyType.marketPriceRatio)
		},

		tab(index) {
			this.num = index;
		},
		// 开启弹窗
		buySell(name, val, type, exchange_type) {

			// for(let k in val) {
			// 	if(!val[k]) {
			// 		this.$Message.error('请输入正确的价格或数量')
			// 		return
			// 	}
			// }	

			this.mesFalse();


			if (exchange_type == 1) {
				if (type == '买入') {


					if (this.detailObj.pre && Number(val.price) > Number(this.symbol.price * (1 + this.detailObj.pre))) {
						this.inputMessage = '不能超过市场价' + (100 + this.detailObj.pre * 100) + '%'
						this.priceDealOne.priceMes = true
						this.clearTime()

						return
					}
					if (Number(val.allPrice) < Number(this.detailObj.minDealPricePri)) {
						// priceDealOne.priceMes
						let count = this.pointNum(Number(this.detailObj.minDealPricePri) / Number(val.price), this.detailObj.pointLengthAss)
						this.inputMessage = '交易数量不能低于' + count
						this.priceDealOne.sumMes = true
						this.clearTime()
						return
					}
					if (Number(val.sum < Number(this.detailObj.minDealPriceAss))) {
						this.inputMessage = '交易数量不能低于' + this.detailObj.minDealPriceAss
						this.priceDealOne.sumMes = true
						this.clearTime()
						return
					}

					if (Number(val.allPrice) > Number(this.currencyType.priCoinMoney)) {
						// priceDealOne.priceMes
						let count = this.pointNum(Number(this.currencyType.priCoinMoney) / Number(val.price), this.detailObj.pointLengthAss)
						this.inputMessage = '交易数量不能超过' + count
						this.priceDealOne.sumMes = true
						this.clearTime()
						return
					}

				} else {

					if (Number(val.sum < Number(this.detailObj.minDealPriceAss))) {
						this.inputMessage = '交易数量不能低于' + this.detailObj.minDealPriceAss
						this.priceDealTwo.sumMes = true
						this.clearTime()
						return
					}
					if (Number(val.allPrice) < Number(this.detailObj.minDealPricePri)) {
						// priceDealOne.priceMes
						let count = this.pointNum(Number(this.detailObj.minDealPricePri) / Number(val.price), this.detailObj.pointLengthAss)
						this.inputMessage = '交易数量不能低于' + count
						this.priceDealTwo.sumMes = true
						this.clearTime()
						return
					}
					if (Number(val.sum) > Number(this.currencyType.assCoinMoney)) {
						// priceDealOne.priceMes
						this.inputMessage = '交易数量不能超过' + this.currencyType.assCoinMoney
						this.priceDealTwo.sumMes = true
						this.clearTime()
						return
					}
				}
			} else {
				if (type == '买入') {
					if (Number(val.sum) > Number(this.currencyType.priCoinMoney)) {
						this.inputMessage = '交易数量不能超过' + this.currencyType.priCoinMoney
						this.marketPriceOne.sumMes = true
						this.clearTime()
						return
					}
					if (Number(val.sum < Number(this.detailObj.minDealPricePri))) {
						this.inputMessage = '交易数量不能低于' + this.detailObj.minDealPricePri
						this.marketPriceOne.sumMes = true
						this.clearTime()
						return
					}
				} else {
					if (Number(val.sum) > Number(this.currencyType.assCoinMoney)) {
						this.inputMessage = '交易数量不能超过' + this.currencyType.assCoinMoney
						this.marketPriceTwo.sumMes = true
						this.clearTime()
						return
					}
					if (Number(val.sum < Number(this.detailObj.minDealPriceAss))) {
						this.inputMessage = '交易数量不能低于' + this.detailObj.minDealPriceAss
						this.marketPriceTwo.sumMes = true
						this.clearTime()
						return
					}
				}
			}

			this.changeMes = val
			this.changeMes.type = type
			this.changeMes.exchange_type = exchange_type
			this.usdCount = (val.price * (1 / this.toCurrency.arr[this.symbolPri.toUpperCase()])).toFixed(4)

			this.showTab = true;

		},

		mesFalse() {
			this.priceDealOne.priceMes = false
			this.priceDealOne.sumMes = false
			this.priceDealTwo.priceMes = false
			this.priceDealTwo.sumMes = false
			this.marketPriceOne.sumMes = false
			this.marketPriceTwo.sumMes = false
		},
		clearTime(key1, key2) {
			if (this.MesTime) {
				clearInterval(this.MesTime)
			}
			this.MesTime = setInterval(() => {
				this.mesFalse()
				clearInterval(this.MesTime)
			}, 3000)
		},
		// 分别得到4个百分比的值
		getPrecent1(data) {
			if (this.priceDealOne.price) {
				this.priceDealOne.allPrice = this.currencyType.priCoinMoney * data / 100 || '';
				this.priceDealOne.sum = this.priceDealOne.allPrice / this.priceDealOne.price || '';
			} else {
				this.priceDealOne.sum = '';
				this.priceDealOne.allPrice = '';
			}
			this.numTofixed()
		},
		getPrecent2(data) {
			if (this.priceDealTwo.price) {
				this.priceDealTwo.sum = this.currencyType.assCoinMoney * data / 100 || '';
				this.priceDealTwo.allPrice = this.priceDealTwo.sum * this.priceDealTwo.price || '';
			} else {
				this.priceDealTwo.sum = '';
				this.priceDealTwo.allPrice = '';
			}
			this.numTofixed()
		},
		getPrecent3(data) {
			this.marketPriceOne.sum = accMul(this.currencyType.priCoinMoney, data) / 100 || '';
			this.numTofixed()
		},
		getPrecent4(data) {
			this.marketPriceTwo.sum = accMul(this.currencyType.assCoinMoney, data) / 100 || '';
			this.numTofixed()
		},
		// 关闭所有弹窗用的
		huifu(...data) {
			this.showTab = data.a;
		},
		pointNum(num, a) {
			if(num == Infinity) {
				num = 0
			}
			num = num + ''
			var numArr = num.split('.')
			if (numArr[1]) {
				if (numArr[1].length > a) {
					numArr[1] = numArr[1].substring(0, a)
				}
				num = numArr[0]
				if (numArr[1]) {
					num += '.' + numArr[1]
				}
			}
			return num
		},
		numTofixed() {
			this.priceDealOne.allPrice = this.pointNum(scientificToNumber(this.priceDealOne.allPrice || ''), this.detailObj.pointLengthPri)
			this.priceDealOne.sum = this.pointNum(scientificToNumber(this.priceDealOne.sum || ''), this.detailObj.pointLengthAss)
			this.priceDealOne.price = this.pointNum(scientificToNumber(this.priceDealOne.price || ''), this.detailObj.pointLengthPri)

			this.priceDealTwo.allPrice = this.pointNum(scientificToNumber(this.priceDealTwo.allPrice || ''), this.detailObj.pointLengthPri)
			this.priceDealTwo.sum = this.pointNum(scientificToNumber(this.priceDealTwo.sum || ''), this.detailObj.pointLengthAss)
			this.priceDealTwo.price = this.pointNum(scientificToNumber(this.priceDealTwo.price || ''), this.detailObj.pointLengthPri)

			this.marketPriceOne.sum = this.pointNum(scientificToNumber(this.marketPriceOne.sum || ''), this.detailObj.pointLengthPri)
			this.marketPriceTwo.sum = this.pointNum(scientificToNumber(this.marketPriceTwo.sum || ''), this.detailObj.pointLengthAss)
		},
		PriceChange() {
			this.numTofixed()
			if (this.priceDealOne.sum && this.priceDealOne.allPrice == "") {
				this.priceDealOne.allPrice = scientificToNumber(accMul(this.priceDealOne.sum, this.priceDealOne.price)) || '';
			} else if (this.priceDealOne.sum == "" && this.priceDealOne.allPrice) {
				this.priceDealOne.sum = scientificToNumber(accDiv(this.priceDealOne.allPrice, this.priceDealOne.price)) || '';
			} else if (this.priceDealOne.sum && this.priceDealOne.allPrice) {
				this.priceDealOne.allPrice = scientificToNumber(accMul(this.priceDealOne.sum, this.priceDealOne.price)) || '';
			}


			if (this.priceDealTwo.sum && this.priceDealTwo.allPrice == "") {
				this.priceDealTwo.allPrice = scientificToNumber(accMul(this.priceDealTwo.sum, this.priceDealTwo.price)) || '';
			} else if (this.priceDealTwo.sum == "" && this.priceDealTwo.allPrice) {
				this.priceDealTwo.sum = scientificToNumber(accDiv(this.priceDealTwo.allPrice, this.priceDealTwo.price)) || '';
			} else if (this.priceDealTwo.sum && this.priceDealTwo.allPrice) {
				this.priceDealTwo.allPrice = scientificToNumber(accMul(this.priceDealTwo.sum, this.priceDealTwo.price)) || '';
			}
			this.numTofixed()
		},
		NumChange() {
			this.numTofixed()
			this.priceDealOne.allPrice = scientificToNumber(accMul(this.priceDealOne.sum, this.priceDealOne.price)) || '';
			this.priceDealTwo.allPrice = scientificToNumber(accMul(this.priceDealTwo.sum, this.priceDealTwo.price)) || '';
			this.numTofixed()
		},
		AllPriceChange() {
			this.numTofixed()
			this.priceDealOne.sum = scientificToNumber(accDiv(this.priceDealOne.allPrice, this.priceDealOne.price)) || '';
			this.priceDealTwo.sum = scientificToNumber(accDiv(this.priceDealTwo.allPrice, this.priceDealTwo.price)) || '';
			this.numTofixed()
		},
		// 判断用户登录
		isLogin() {
			if (utils.isLogin()) {
				// console.log('denglu');
				this.canEdit = false;
				// 判断能否点击precent,canSelect:flase表示不能点击进度条;
				this.canSelect = true;
			} else {
				// console.log('dd')
				this.canEdit = true;
				this.canSelect = false;
			}

		},
		goLogin() {
			this.$router.push('/login');
		},
		goRegister() {
			this.$router.push('/register');
		},
		//成功挂单,刷新数据,重新获取资产
		toZero() {
			this.getMoneyMes()
			this.marketPriceOne.sum = ''
			this.marketPriceTwo.sum = ''
			this.priceDealOne.sum = ''
			this.priceDealOne.allPrice = ''
			this.priceDealTwo.sum = ''
			this.priceDealTwo.allPrice = ''

			this.currencyType.marketPriceRatio = this.symbol.price //未登录的话把价格穿进去
			this.render();
		},
	},
	filters: {
		numFilter(value) {
			let realVal = String(value).replace(/[^\d]/g, "");
			return Number(realVal)
		}
	},
	directives: {
		numberOnly: {
			bind: function (el) {
				// el.handler = function () {
				// 	// el.value = scientificToNumber(el.value)

				// 	// el.value = el.value.replace(/[^\d+\.?\d*]/g, '')
				// 	//先把非数字的都替换掉，除了数字和.
				// 	el.value = el.value.replace(/[^\d\.]/g, '');
				// 	//必须保证第一个为数字而不是.
				// 	el.value = el.value.replace(/^\./g, '');
				// 	//保证第一位只能有一个或0个0
				// 	el.value = el.value.replace(/^0{2,}/, '0');
				// 	//以0开始的第二位只能为小数点
				// 	el.value = el.value.replace(/^0[\d]/, '0');
				// 	//保证只有出现一个.而没有多个.
				// 	el.value = el.value.replace(/\.{2,}/g, '.');
				// 	//保证.只出现一次，而不能出现两次以上
				// 	el.value = el.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
				// 	if (el.value.length > 14) {
				// 		el.value = el.value.substring(0, 14)
				// 	}
				// }

				// el.addEventListener('input', el.handler)

			},
			unbind: function (el) {
				// el.removeEventListener('input', el.handler)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
input:focus {
  border: 1px solid #f3ba2f !important;
}
.r_price {
  color: #ddd !important;
  margin: 0.2rem 0;
  padding-left: 0.9rem;
}
</style>
