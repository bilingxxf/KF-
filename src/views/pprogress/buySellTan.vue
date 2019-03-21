	<template>
	<div id="buysellTan">
		<div class="waihui">
			<div class="neikuang TanChuang2" v-show="showHide3">
				<div class="chacha" @click="guanbi('pinDataRef')">
					<span class="icon-wrong"></span>
				</div>
				<div class="neikuangPadding">
					<p class="tanTitleSmall">资金密码</p>
					<Form :model="pinDatas" :rules="pinDataReles" ref="pinDataRef">
						<div class="sendCodeDealCenter">
							<p class="pintitle">请输入资金密码</p>
							<div class="pinContent">
								<FormItem prop="pinNumber">
									<Input type="password" placeholder="请输入5-15位数字字母的资金密码" v-model="pinDatas.pinNumber"></Input>
								</FormItem>
							</div>
						</div>
					</Form>
					<!-- <p class="qiXian">有效期限:&nbsp;<span>2 小时</span></p> -->
					<div class="twoBtn">
						<button class="btnLeft" :disabled="doubleClick" :loading="doubleClick" @click="surePassword('pinDataRef')">确定</button>
						<button class="btnRight" @click="guanbi('pinDataRef')">取消</button>
					</div>
				</div>
			</div>
			<div class="neikuang Tanchuang4" v-show="showHide4">
				<div class="chacha" @click="guanbi()">
					<span class="icon-wrong"></span>
				</div>
				<div class="neikuangPadding">
					<p class="tanTitleSmall">提交成功</p>
					<p class="dealSucess">{{symbolAss.toUpperCase()}}/{{symbolPri.toUpperCase()}}挂单交易成功</p>
					<p class="dealSucess">交易详情请查看交易记录</p>
				</div>
			</div>
		</div>
	</div>
</template>

	<script>
import api from '../../api'
export default {
	name: 'buysellTan',
	data() {
		const pinPassRule = (rules, value, callback) => {
			if (!value) {
				callback(new Error("资金密码不能为空"));
			} else {
				if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
					callback(new Error("请输入5-15位数字字母的资金密码"));
				} else {
					callback();
				}
			}
		}
		const codePass = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入验证码'));
			} else {
				if (/^[0-9]+$/.test(value)) {
					callback();
				} else {
					return callback(new Error('请输入正确的数字验证码'))
				}
			}
		}
		return {
			showHide3: false,
			//资金密码
			pinDatas: {
				pinNumber: ""
			},
			pinDataReles: {
				pinNumber: [{ required: true, message: '请输入资金密码', trigger: 'blur' }]
			},

			//防重点击
			doubleClick: false,
		}
	},
	props: ['changeMes', 'usdCount'],
	computed: {
		symbol() {
			return this.$store.getters.symbol
		},
		symbolAss() {
			return this.$store.getters.symbolAss
		},
		symbolPri() {
			return this.$store.getters.symbolPri
		},
		toCurrency() {
			return this.$store.getters.toCurrency
		}
	},
	methods: {
		//清除缓存
		fangwen() {
			api.fangwen().then(res => {
			}).catch(error => {
				console.log(error);
			})
		},
		//高度变化
		heightChange() {

		},
		guanbi(name) {
			if (name) {
				this.$refs[name].resetFields();
			}
			let data = {
				a: false
			};
			//防重点击
			this.doubleClick = false
			//资金密码禁止自动填入
			this.pinDatas.pinNumber = '';
			this.$emit('huifu', data);
		},
		lostPassword() {
			api.transPas().then((res) => {
				if (res.status_code == 200 && res.data.password_key) {
					this.sureBuyOrSell(res.data.password_key)
				} else if (res.status_code == 5016) {
					this.$FundPas({
						success: () => {
							this.$emit('huifu', {a: true});
						}
					})
					
					this.$emit('huifu', {a: false});
				} else {
					this.showHide3 = true;
				}
			})

		},
		surePassword(name) {
			this.doubleClick = true
			this.$refs[name].validate((valid) => {
				if (valid) {
					api.transPas({ pin: this.pinDatas.pinNumber }).then(res => {
						if (res.status_code == 200 && res.data.password_key) {
							this.sureBuyOrSell(res.data.password_key)
						} else {
							this.doubleClick = false
						}
					}).catch(err => {
						this.doubleClick = false
					})
				} else {
					this.doubleClick = false
				}
			})

		},
		sureBuyOrSell(key) {
			let params = {
				"password_key": key,
				"symbol": this.symbol.symbol,
				"main_coin_id": this.symbol.pri_id,
				"main_coin_name": this.symbolPri,
				"side_coin_id": this.symbol.coin_id,
				"side_coin_name": this.symbolAss,
				"exchange_type": this.changeMes.exchange_type
			}
			if (this.changeMes.exchange_type == 1) {
				params.price_str = this.changeMes.price
			}
			params.exchange_amount_str = this.changeMes.sum

			var apiKey = ''
			if (this.changeMes.type == '买入') {
				apiKey = 'createExchangeBuy'
			} else {
				apiKey = 'createExchangeSell'
			}

			api[apiKey](params).then(res => {
				if (res.status_code == 200) {
					this.showHide3 = false;
					//刷新历史委托列表
					let params = {
						page: 1,
						page_size: 100,
					}
					this.$store.dispatch('getExchangeList', params)

					this.$emit('toZero');
					this.guanbi()
				} else {
					if (res.status_code == 5016) {
						this.guanbi()
					}
					//key 过期
					if (res.status_code == 9035) {
						this.showHide3 = true;
						return
					}
					this.doubleClick = false

					this.guanbi()
				}
			})
		},
	},
	created() {
		this.lostPassword()
	}
}
</script>



