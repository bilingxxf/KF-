<!--suppress ALL -->
<template>
	<div>
		<Content>
			<div class="login login-slider account-verity">
				<div class="accountVerify register">
					<div class="login-wrap">
						<div class="login-content">
							<p class="logintitle">找回密码</p>
							<p class="account-des">重置登录密码后24小时内禁止提币</p>
							<ul class="tab-list-wrap">
								<li @click="addActiveClass('1')" :class="type==1? 'tab-li-active tab-li': 'tab-li'">手机找回</li>
								<li @click="addActiveClass('2')" :class="type==2? 'tab-li-active tab-li': 'tab-li'">邮箱找回</li>
							</ul>
							<!-- 手机找回 -->
							<div v-show="type==1">
								<Form ref="accountVerify1" :model="accountVerify" :rules="ruleValidate" class="resetloginpas">
									<div class="national_form">
										<Dropdown trigger="click" @on-click="langOperate" @on-visible-change="clearSearch" class="nationalNum nationalDrop nationalAccountDrop">
											<a href="javascript:void(0)">
												{{accountVerify.nationalCode}}
												<Icon type="ios-arrow-down"></Icon>
											</a>
											<DropdownMenu slot="list">
												<Input v-model="search" class="search-input" icon="ios-search" placeholder="搜索区号..." />
												<DropdownItem v-for="(option, index) in options" v-show="option.country_idd.includes(search) || option.country_name.includes(search)" :name="option.country_idd" :key="index">
													<div class="national-wrap">
														<span class="national-left">{{option.country_name}}</span>
														<span class="national-right">{{option.country_idd}}</span>
													</div>
												</DropdownItem>
											</DropdownMenu>
										</Dropdown>
										<p class="login-line"></p>
										<FormItem prop="phone" class="fill_phones login-label-left">
											<Input class="fill_phone" auto-complete="new-password" type="text" v-model="accountVerify.phone" placeholder="输入手机号"></Input>
										</FormItem>
									</div>
									<!--  滑块   -->
									<div class="slider-wrap" style="height: 3.75rem;">
										<div v-if="isNameNum == 1" id="ver" class="nc-container verClass"></div>
										<p class="register-descript" v-show="descripShow" style="padding-top: 3.25rem;color: #ed3f14;">请先滑动滑块</p>
									</div>
									<FormItem prop="phone_codes" class="login-label-left" style="width: 25rem;margin-top: 1.2rem;">
										<Input class="ems-code" v-model="accountVerify.phone_codes" placeholder="请输入短信验证码" :maxlength=6></Input>
										<Button class="mailCode" @click="phone_code" v-if="countPhone == 60" :loading="loadingPhone">获取短信验证码</Button>
										<Button disabled v-else class="regetCode get_ems">&nbsp;{{countPhone}}s</Button>
									</FormItem>
									<FormItem class="loginbuttonline">
										<Button class="router-style" type="primary" @click="showPhone('accountVerify1')" :loading="loading" :disabled="disableds">{{ btnDescript }}</Button>
									</FormItem>
								</Form>
							</div>

							<!-- 邮箱找回  -->
							<div v-show="type==2" class="account-email">
								<Form ref="accountVerify2" :model="accountVerify" :rules="ruleValidate" class="resetloginpas">
									<FormItem prop="account" class="ems-form login-label-left">
										<Input class="ems-code" placeholder="请输入邮箱账号" v-model="accountVerify.account" @keyup.enter.native="show('accountVerify2')"></Input>
									</FormItem>
									<div class="slider-wrap" style="height: 3.75rem;">
										<div v-if="isNameNum == 2" id="ver" class="nc-container verClass"></div>
										<p class="register-descript" v-show="descripShow" style="padding-top: 3.25rem;color: #ed3f14;">请先滑动滑块</p>
									</div>
									<FormItem prop="code" class="login-label-left" style="width: 25rem;margin-top: 1.2rem;">
										<Input class="ems-code" v-model="accountVerify.code" placeholder="请输入邮箱验证码" :maxlength=6></Input>
										<Button class="mailCode" @click="email_code" v-if="count == 60" :loading="loadingEmail">获取邮箱验证码</Button>
										<Button disabled v-else class="regetCode get_emailCode">&nbsp;{{count}}s</Button>
									</FormItem>
									<FormItem class="loginbuttonline">
										<Button class="router-style" type="primary" @click="showEmail('accountVerify2')" :loading="loading" :forgetValidateInfo="forgetValidateInfo" :disabled="disableds">{{ btnDescript }}</Button>
									</FormItem>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Content>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import api from '../../api'
	import axios from 'axios'
	export default {
		data() {
			const validatePhone = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入手机号码'));
				} else {
					if(this.accountVerify.nationalCode == '+86' &&  (!/^1[34578]\d{9}$/.test(value))) {
						callback(new Error('请输入正确的手机号码'));
					}else if(this.accountVerify.nationalCode != '+86' && (!/^[0-9]{2,20}$/.test(value))){
						callback(new Error('请输入正确的手机号码'));
					}else {
						callback();
					}
				}
			};
			return {
				token: '',
				btnDescript: '提交',
				descripShow: false,
				search: '',
				type: '1',
				loading: false,
				count: 60,
				countPhone: 60,
				disableds: true,
				// codeError_tip:false,
				wayShow: false,
				options: [],
				phone_key: '',
				email_key: '',
				accountVerify: {
					account: '',
					nationalCode: '+86',
					phone: '',
					code: '',
					phone_codes: '',
					login_img: ''
				},
				forgetValidateInfo: {},
				loadingCode: false,
				loadingPhone: false,
				loadingEmail: false,
				isNameNum: 1,
				ruleValidate: {
					account: [{
							required: true,
							message: '请输入邮箱账号',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱账号',
							trigger: 'blur'
						}
					],
					phone: [{
						validator: validatePhone,
						trigger: 'blur'
					}, ],
					code: [{
						required: true,
						message: '请输入邮箱验证码',
						trigger: 'blur'
					}, ],
					phone_codes: [{
						required: true,
						message: '请输入短信验证码',
						trigger: 'blur'
					}, ],
					nationalCode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}, ]
				},
				nc: '', //验证码实例
				ncCsessionid: '',
				ncToken: ["FFFF0N000000000069AD", (new Date()).getTime(), Math.random()].join(':'),
				ncSig: '',
				
			}
		},
		computed: {
			account() {
				return this.accountVerify.account
			},
			code() {
				return this.accountVerify.code
			},
			phone_codes() {
				return this.accountVerify.phone_codes
			},
			phone() {
				return this.accountVerify.phone
			}
		},
		watch: {},
		methods: {
			slider() { //  登录滑块认证
				let pa = {
					token: this.ncToken,
					session_id: this.ncCsessionid,
					sig: this.ncSig
				}
				this.btnDescript = '加载中...'
				this.loading = true
				api.sliderVerify(pa).then(res => {
					this.btnDescript = '提交'
					this.loading = false
					if(res.status_code == 200) {
						this.disableds = false
						this.loginCode = res.data.loginCode
						this.ncCode = true
					} else {
						setTimeout(() => {
							this.nc_reload()
						}, 20)
						this.disableds = true
					}
				}).catch((e) => {
					setTimeout(() => {
						this.nc_reload()
					}, 20)
					this.btnDescript = '提交'
					this.loading = false
					this.disableds = true
				})
			},
			// 添加activeclass
			addActiveClass(type) {
				this.type = type
				if(type == '1') {
					this.isNameNum = 1
				} else {
					this.isNameNum = 2
				}
				this.ncCsessionid = ''
				this.ncSig = ''
				this.descripShow = false
				this.disableds = true
				this.loadingPhone = false;
				this.loadingEmail = false;
				setTimeout(() => {
					this.nc_reload()
				}, 20)
				this.$refs['accountVerify1'].resetFields();
				this.$refs['accountVerify2'].resetFields();
			},
			clearSearch(val) {
				if(!val) this.search = ''
			},
			langOperate(value) {
				this.accountVerify.nationalCode = value;
			},
			email_code() { //获取邮箱验证码
				this.p_text = '';
				let params = this.accountVerify.account;
				let reg = new RegExp("^[A-Za-z0-9]+([._\\-]*[A-Za-z0-9])*@([A-Za-z0-9]+[-A-Za-z0-9]*[A-Za-z0-9]+.){1,63}[A-Za-z0-9]+$");
				if(this.ncCsessionid) {
					this.descripShow = false
					if(params) {
						if(reg.test(params)) {
							this.model_sure()
							this.loadingEmail = true;
						}
					} else {
						this.$Message.error('请输入邮箱号')
					}
				} else {
					this.descripShow = true
					this.loading = false
				}

			},
			phone_code() { //获取手机验证码
				this.p_text = '';
				let params = {
					phone_idd: encodeURIComponent(this.accountVerify.nationalCode),
					phone_number: this.accountVerify.phone,
					validate_code: this.loginCode
				}
				let reg = /^[0-9]{2,20}$/;

				if(this.ncCsessionid) { // 判断滑块是否滑动
					this.descripShow = false
					if(params.phone_idd) {
						if(params.phone_number.replace(/\s+/g, "")) {
							if(reg.test(params.phone_number)) {
								this.model_sure_phone()
								this.loadingPhone = true;
							}
						} else {
							this.$Message.error('请输入手机号码')
						}
					} else {
						this.$Message.error('请选择国家代码!')
					}
				} else {
					this.descripShow = true
					this.loading = false
				}
			},
			showPhone() { //下一步手机
				this.$refs['accountVerify1'].validate((valid) => {
					if(this.ncCsessionid) {
						this.loadingPhone = true
						if(valid) {
							this.loading = true
							if(this.phone_key == '') {
								this.loadingPhone = false;
								this.$Message.error('请获取短信验证码');
								this.loading = false
								return;
							}
							let params = {
								// id : this.forgetValidateInfo.id,
								verification_key: this.phone_key,
								verification_code: this.accountVerify.phone_codes,
								user: this.accountVerify.phone,
								phone_idd: this.accountVerify.nationalCode
							};
							this.forgetValidateInfo = params
							api.findPasswordPhone(params).then(res => { //验证码验证
								if(res.status_code == 200) {
									this.loadingPhone = false;
									this.loading = false;
									this.$Message.success('成功');
									this.$router.push({
										name: 'ResetPassword',
										query: this.forgetValidateInfo
									})
								} else if(res.status_code == 5003) {
									this.loadingPhone = false;
									this.loading = false
								} else {
									this.loadingPhone = false;
									this.loading = false
								}
							}).catch(err => {
								this.loading = false
								this.loadingPhone = false;
							})
						} else {
							this.loading = false
							this.loadingPhone = false;

						}
					} else {
						this.$Message.error("请手动验证滑块！");
						this.loading = false;
						this.disableds = true
					}
				})
			},
			showEmail() { //下一步邮箱
				this.$refs['accountVerify2'].validate((valid) => {
					if(this.ncCsessionid) {
						this.loading = true
						if(valid) {
							console.log(this.email_key)
							if(this.email_key == '') {
								console.log("email-key")
								this.loadingEmail = false;
								this.$Message.error('请获取邮箱验证码');
								this.loading = false
								return false;
							}
							let params = {
								// id : this.forgetValidateInfo.id,
								email_key: this.email_key,
								email_code: this.accountVerify.code,
								user: this.accountVerify.account,
								//  phone_idd: this.accountVerify.nationalCode,
							};
							this.forgetValidateInfo = params
							api.findPsaaword(params).then(res => {
								//验证码验证
								if(res.status_code == 200) {

									this.loadingEmail = false;
									this.loading = false
									this.$Message.success(this.$t(`message.Success`));
									this.$router.push({
										name: 'ResetPassword',
										query: this.forgetValidateInfo
									})
								} else if(res.status_code === 5003) {
									this.loadingEmail = false;
									this.loading = false
								} else {
									this.loadingEmail = false;
									this.loading = false
								}
							}).catch(err => {
								this.loadingEmail = false;
								this.loading = false
							})
						} else {
							this.loading = false
							this.loadingEmail = false;

						}
					} else {
						this.$Message.error("请手动验证滑块！");
						this.loading = false;
						this.disableds = true
					}
				})
			},
			model_sure_phone() { //手机模态框确定
				console.log(this.loginCode)
				this.loadingSure = true;
				let params = {
					phone: this.accountVerify.phone,
					phone_idd: encodeURIComponent(this.accountVerify.nationalCode),
					validate_code: this.loginCode
				};
				console.log(this.accountVerify.phone)
				if(params.phone_idd) {
					this.loadingPhone = true;
					api.forgetPhoneVerify(params).then(res => {
						if(res.status_code == 200) {
							this.$Message.success('手机验证码发送成功')
							this.loadingSure = false;
							this.phone_key = res.data.auth_key
							console.log(res)
							this.timer1 = setInterval(() => {
								if(this.countPhone > 0) {
									this.countPhone--;
								} else {
									this.loadingPhone = false;
									clearInterval(this.timer1);
									this.countPhone = 60;
								}
							}, 1000);
							this.verification_key = res.data.verification_key
						} else if(res.status_code == 5006) {
							this.loadingPhone = false;
							this.loadingSure = false;
						} else if(res.status_code == 5003) {
							this.loadingSure = false;
							this.loadingPhone = false;
						} else if(res.status_code == 6021) {
							this.loadingSure = false;
							this.loadingPhone = false;
						} else {
							this.loadingSure = false;
							this.loadingPhone = false;
						}
					}).catch(err => {
						this.loadingSure = false;
						this.loadingPhone = false;
					})
				} else {
					this.loadingSure = false;
					this.loadingPhone = false;
					this.$Message.error('请输入手机号码')
				}
			},
			model_sure() { //邮箱弹框确定
				this.loadingSure = true;
				let params = {
					email: this.accountVerify.account.replace(/(^\s+)|(\s+$)/g, ""),
					validate_code: this.loginCode
				};
				let reg = new RegExp("^[A-Za-z0-9]+([._\\-]*[A-Za-z0-9])*@([A-Za-z0-9]+[-A-Za-z0-9]*[A-Za-z0-9]+.){1,63}[A-Za-z0-9]+$");
				if(params.email && reg.test(params.email)) {
					this.loadingEmail = true
					api.forgetEmailVerify(params).then(res => {
						console.log(res)
						if(res.status_code == 200) {
							this.authorize_code = res.data.authorize_code
							this.loadingSure = false;

							this.timer = setInterval(() => {
								if(this.count > 0) {
									this.count--;
								} else {
									this.loadingCode = false;
									this.loadingEmail = false
									clearInterval(this.timer);
									this.count = 60;
								}
							}, 1000);
							this.$Message.success('邮箱验证码发送成功!')
							this.email_key = res.data.auth_key;
						} else if(res.status_code == 5006) {
							this.loadingEmail = false
							this.loadingSure = false;
							this.loadingCode = false;
						} else if(res.status_code == 5003) {
							this.loadingEmail = false
							this.loadingSure = false;
							this.loadingCode = false;
						} else {
							this.loadingEmail = false
							this.loadingSure = false;
							this.loadingCode = false;
						}
					}).catch(error => {
						this.loadingEmail = false
						this.loadingSure = false;
						this.loadingCode = false;
					})
				} else {
					this.loadingEmail = false
					this.loadingSure = false;
					this.loadingCode = false;
					this.$Message.error('请输入验证码')
				}
			},
			national() { // 获取国际码
				api.internationalCodeGet().then(res => {
					// console.log(res);
					if(res.status_code == 200) {
						this.options = res.data.list;
					}
				})
			},
			errorReset() {
				this.nc_reload()
				this.loading = false
				this.ncCsessionid = null
				this.disableds = true
			},
			nc_reload() {
				//兼容移动端
				if(!IsPC()) {
					this.nc = NoCaptcha.init({
						renderTo: '#ver',
						appkey: 'FFFF0N000000000069AD',
						scene: 'nc_message_h5',
						token: this.ncToken,
						trans: {
							'key1': 'code200'
						},
						elementID: ['usernameID'],
						is_Opt: 0,
						language: 'cn',
						timeout: 3000,
						retryTimes: 5,
						errorTimes: 5,
						inline: false,
						bannerHidden: false,
						initHidden: false,
						callback: (data) => {
							this.ncCode = true
							this.ncCsessionid = data.csessionid
							this.ncSig = data.sig
							this.slider(); // 滑块验证
//							this.send_ph_em()
							// data.token = this.token
							// this.callback && this.callback(data)
						},
						error: function(s) {
							console.log(s)
						}
					})
					NoCaptcha.setEnabled(true)
					this.nc.reset() // 请务必确保这里调用一次reset()方法
					NoCaptcha.upLang('cn', {
						'LOADING': '加载中...', // 加载
						'SLIDER_LABEL': '请向右滑动验证', // 等待滑动
						'CHECK_Y': '验证通过', // 通过
						'ERROR_TITLE': '非常抱歉，这出错了...', // 拦截
						'CHECK_N': '验证未通过', // 准备唤醒二次验证
						'OVERLAY_INFORM': '经检测你当前操作环境存在风险，请输入验证码', // 二次验证
						'TIPS_TITLE': '验证码错误，请重新输入' // 验证码输错时的提示
					})
				} else {
					this.nc.reload()
				}
			},
		},
		created() {
			this.national();
		},
		mounted() {
			let forgetValidateInfo = JSON.parse(localStorage.getItem('forgetValidate'));
			this.forgetValidateInfo = forgetValidateInfo;
			//    console.log(this.forgetValidateInfo)
			promiseNC.then(() => {

				//兼容H5
				if(IsPC()) {
					this.nc = new noCaptcha({
						renderTo: "#ver",
						appkey: "FFFF0N000000000069AD",
						scene: "nc_message",
						token: this.ncToken,
						customWidth: 400,
						trans: {
							"key1": "code0"
						},
						elementID: ["usernameID"],
						is_Opt: 0,
						language: "cn",
						isEnabled: true,
						timeout: 3000,
						times: 5,
						callback: (data) => {
							this.ncCode = true
							// window.console && console.log(data.csessionid)
							// window.console && console.log(data.sig)
							this.ncCsessionid = data.csessionid
							this.ncSig = data.sig
							//          console.log(data)
							this.slider(); // 滑块验证
//							this.send_ph_em()
						}
					})

					this.nc.upLang('cn', {
						_startTEXT: "请按住滑块，拖动到最右边",
						_yesTEXT: "验证通过",
						_error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
						_errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
					})
				} else {
					this.nc_reload()
				}
			})
		}
	}
</script>
<style scoped="scoped" lang="scss">
.resetloginpas .ivu-btn:focus{ 
	box-shadow: none;
	border: none; 
}
.account-verity .ivu-form-item-content .ivu-btn-primary[disabled] {
  background-color: #d9d9d9;
}
	.verClass {
		/*width: 25rem !important;*/
		position: absolute;
		z-index: 111;
	}
	
	.move-enter-active {
		opacity: 1 .4s;
	}
	
	.move-leave-active {
		opacity: 0 .4s;
	}
	
	.account-verity {
		.national_form {
			display: flex;
			position: relative;
			.national-code {
				position: absolute;
				top: 0;
				left: 0rem;
				z-index: 100;
			}
			.nationalDrop {
				position: absolute;
				left: 0.5rem;
			}
		}
		.login-line {
			display: block;
			position: absolute;
			top: 0.4rem;
			left: 5rem;
			width: 1px;
			height: 2.25rem;
			background: #D9D9D9;
		}
		.fill_phone {
			width: 25rem;
		}
		.ems-code {
			width: 25rem;
		}
		.mailCode {
			width: 9rem;
			height: 2.4rem;
			right: -0.9rem;
			position: absolute;
			top: 0.3rem;
			font-size: 0.7rem;
			background: none;
			color: #f3ba2f;
			border-radius: 0;
			border: none;
			color: #92A3DA;
		}
		.router-style {
			width: 25rem;
			margin-top: 2rem;
			background: #4F69C2;
			border-radius: 0.2rem;
			height: 3rem;
			color: #fff;
			font-size: 1rem;
		}
		.get_ems {
			padding: 0.5rem 1.6rem;
			background: none;
			border: none;
			position: absolute;
			top: 0.3rem;
			right: -2.5rem;
			color: #D9D9D9;
			font-size: 0.7rem;
		}
		.get_emailCode {
			position: absolute;
			top: 0.3rem;
			right: -2.5rem;
		}
	}
	
	.accountVerify .account-des {
		font-size: 0.8rem;
		color: #4F69C2;
		padding: 1rem 0 0.5rem 0;
	}
	
	.tab-list-wrap {
		width: 25rem;
		text-align: center;
		height: 2.75rem;
		line-height: 2.75rem;
		font-size: 0.9rem;
		border-bottom: 0.2rem solid #D8D8D8;
		position: relative;
		margin: 1rem 0 2.5rem 0;
	}
	
	.tab-list-wrap .tab-li {
		width: 50%;
		position: absolute;
		top: -0.2rem;
		z-index: 1000;
		right: 0;
		cursor: pointer;
	}
	
	.tab-list-wrap li:first-child {
		left: 0;
	}
	
	.tab-list-wrap li:last-child {
		right: 0;
	}
	
	.tab-list-wrap .tab-li-active {
		border-bottom: 0.2rem solid #4F69C2;
		color: #4F69C2;
	}
</style>