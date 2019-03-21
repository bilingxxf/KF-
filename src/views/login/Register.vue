<template>
	<div>
		<Content>
			<div v-if="!nextShow" class="login login-main register-slider">
				<div class="register">
					<div class="login-wrap">
						<div class="login-content">
							<div class="register-wrap">
								<p class="logintitle title">欢迎注册</p>
								<Tabs value="name1" @on-click="emptyValue" class="login-label-left">
									<TabPane label="手机注册" name="name1">
										<Form ref="registerForm1" :model="registerForm" :rules="ruleValidate">
											<div class="national_form">
												<Dropdown trigger="click" @on-click="langOperate" @on-visible-change="clearSearch" class="nationalNum nationalDrop">
													<a href="javascript:void(0)">
														{{registerForm.nationalCode}}
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
												<FormItem prop="phone" class="fill_phones">
													<Input class="fill_phone" type="text" v-model="registerForm.phone" placeholder="输入手机号">
													</Input>
												</FormItem>
											</div>

											<!--  滑块   -->
											<div class="slider-wrap">
												<div v-if="isNameNum == 1" id="ver" class="nc-container verClass"></div>
												<p class="register-descript" v-show="descripShow">请先滑动滑块</p>
											</div>

											<!--<FormItem prop="codePhone">
												<Input v-model="registerForm.codePhone" placeholder="请输入短信验证码" :maxlength=6></Input>
												<Button class="mailCode" @click="phone_code" v-if="countPhone == 60" :loading="loadingPhone">获取短信验证码</Button>
												<Button disabled v-else class="regetCode" style="">重新发送&nbsp;{{countPhone}}s</Button>
											</FormItem>-->
											
											<FormItem prop="codePhone">
												<Input v-model="registerForm.codePhone" placeholder="请输入短信验证码" :maxlength=6></Input>
												<Button class="newMailCode" @click="phone_code" v-if="countPhone == 60" :loading="loadingPhone">获取短信验证码</Button>
												<Button disabled v-else class="newRegetCode" style="">{{countPhone}}s</Button>
											</FormItem>

											<FormItem prop="agree" class="agree_tip">
												<CheckboxGroup v-model="registerForm.agree">
													<!--<div class="agree">-->
													<!--<Checkbox label="我已阅读并同意"></Checkbox>
														<p><span @click='agreement'>《用户协议》</span></p>-->
													<!--</div>-->
												</CheckboxGroup>
											</FormItem>

											<!--<div class="kf_pro_us">
												<Checkbox v-model="kf_pro_single"></Checkbox>
												<router-link to="/kfuserpro" class="read-style" target="_blank">阅读并同意<span class="blue">《KF用户注册协议》</span></router-link>
												<p v-show="kf_pro_ok" class="kf_pro_us_ok">请勾选《KF用户注册协议》</p>
											</div>-->

											<FormItem class="loginbuttonline">
												<Button @click="register('registerForm1')" class="ivu-btn-button next_btn" type="primary"  :disabled="disableds" :loading="loadingNext">{{ nexDescirpt }}</Button>
											</FormItem>

											<FormItem class="exist_toLogin">
												<p class="register_login">
													<span class="exist-login">已有账号？</span>
													<span class="login-click" @click="loginClick">去登录</span>
												</p>
											</FormItem>
										</Form>
									</TabPane>

									<TabPane label="邮箱注册" name="name2">
										<Form ref="registerForm2" :model="registerForm" :rules="ruleValidate">
											<FormItem prop="account" class="email_account">
												<Input v-model="registerForm.account" placeholder="请输入邮箱账号" :maxlength=30></Input>
											</FormItem>

											<div class="slider-wrap">
												<div v-if="isNameNum == 2" id="ver" class="nc-container verClass"></div>
												<p class="register-descript" v-show="descripShow">请先滑动滑块</p>
											</div>

											<!--<FormItem prop="code">
												<Input v-model="registerForm.code" placeholder="请输入邮箱验证码" :maxlength=20></Input>
												<Button class="mailCode" @click="email_code" v-if="count == 60" :loading="loadingCode">获取邮箱验证码</Button>
												<Button disabled v-else class="regetCode">重新发送&nbsp;{{count}}s</Button>
											</FormItem>-->
											
											<FormItem prop="code">
												<Input v-model="registerForm.code" placeholder="请输入邮箱验证码" :maxlength=20></Input>
												<Button class="newMailCode" @click="email_code" v-if="count == 60" :loading="loadingCode">获取邮箱验证码</Button>
												<Button disabled v-else class="newRegetCode">{{count}}s</Button>
											</FormItem>

											<FormItem prop="agree" class="agree_tip">
												<CheckboxGroup v-model="registerForm.agree">
													<!--<div class="agree">-->
													<!--<Checkbox label="我已阅读并同意"></Checkbox>
														<p><span @click='agreement'>《用户协议》</span></p>-->
													<!--</div>-->
												</CheckboxGroup>
											</FormItem>

											<!--<div class="kf_pro_us">
												<Checkbox v-model="kf_pro_single"></Checkbox>
												<span class="read-style">阅读并同意<router-link to="/kfuserpro" target="_blank;" tag="span" class="blue">《KF用户注册协议》</router-link></span>
												<p v-show="kf_pro_ok" class="kf_pro_us_ok">请勾选《KF用户注册协议》</p>
											</div>-->

											<FormItem class="loginbuttonline">
												<Button @click="register('registerForm2')" class="ivu-btn-button next_btn" type="primary" :disabled="disableds" :loading="loadingNext">{{nexDescirpt}}</Button>
											</FormItem>

											<FormItem>
												<p class="register_login">
													<span class="exist-login">已有账号？</span>
													<span class="login-click" @click="loginClick">去登录</span>
												</p>
											</FormItem>
										</Form>
									</TabPane>
								</Tabs>
							</div>
						</div>
					</div>
				</div>
			</div>
			<nextRegister v-if="nextShow" :registerData='registerData' :authorize_code='authorize_code'></nextRegister>
		</Content>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import api from '../../api'
import Model from './../model/Model.vue'
import { Base64 } from 'js-base64';
import nextRegister from './NextRegister.vue'
let outPassword;

export default {
	data() {
		const validatePassWord = (rule, value, callback) => {
			let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/;
			if (value === '') {
				callback(new Error('请输入5-15位字母数字密码'));
			} else if (!reg.test(value)) {
				callback(new Error("请输入5-15位字母数字密码"))
			} else {
				callback();
			}
		};
		const validateRePassWord = (rule, value, callback) => {
			if (value === '') {
				callback(new Error("请输入5-15位字母数字密码"));
			} else if (value !== outPassword) {
				callback(new Error("两次密码不一致"));
			} else {
				callback();
			}

		};
		const validateAccount = (rule, value, callback) => {
			let uPattern = /^([^\/|_|\"|\'|\~|\#|\$|\%|\^|\&|\*|\(|\)|\+|\{|\}|\:|\<|\>|\?|\[|\]|\,|\/|\;|\`|\-]+){2,20}$/u;
			if (value.replace(/\s+/g, "") === '') {
				callback(new Error('请输入用户昵称'));
			} else if (value.replace(/\s+/g, "").length < 2 || value.replace(/\s+/g, "").length > 20) {
				callback(new Error('用户昵称不能小于2大于20个字符'));

			} else if (!uPattern.test(value)) {
				callback(new Error('用户昵称输入错误!'));
			} else {
				callback();
			}

		};
		const validatePhone = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入手机号码'));
			}else {
				if(this.registerForm.nationalCode == '+86' &&  (!/^1[34578]\d{9}$/.test(value))) {
					callback(new Error('请输入正确的手机号码'));
				}else if(this.registerForm.nationalCode != '+86' && (!/^[0-9]{2,20}$/.test(value))){
					callback(new Error('请输入正确的手机号码'));
				}else {
					callback();
				}
			}
		};
		return {
			disableds: true,
			nexDescirpt: '下一步',
			descripShow: false,
			loadingNext: false, // 下一步
			nextShow: false, //切换填写详细信息
			kf_pro_ok: false,
			kf_pro_single: false, // KF用户注册协议
			p_text: '',
			search: '',
			seen: false,
			register_img: '',
			invitateURL: '',
			count: 60,
			countPhone: 60,
			loadingSure: false,
			loadingPhone: false,
			holder: "用户昵称提交不可更改", //用户昵称提交不可更改
			showTab: false,
			token: '',
			loadingCode: false,
			step: 1,
			registerForm: {
				nationalCode: '+86',
				national: '',
				account: '',
				phone: '',
				code: '',
				codePhone: '',
				nickname: '',
				password: '',
				repassword: '',
				promotion: '',
				agree: ['']
			},
			registerData: {}, //点击下一步传入 下一步的数据
			changeWay: false,
			loadingNational: false,
			options: [],
			list: ['1234', '2345', '6789'],
			ruleValidate: {
				national: [{
					required: true,
					trigger: 'blur',
					message: '请选择国籍'
				}],
				account: [{
					required: true,
					message: "请输入邮箱帐号",
					trigger: 'blur'
				},
				{
					type: 'email',
					message: "请输入正确的邮箱账号",
					trigger: 'blur'
				}
				],
				phone: [{
					validator: validatePhone,
					trigger: 'blur'
				}],
				code: [{
					required: true,
					trigger: 'blur',
					message: '请输入邮箱验证码'
				}],
				nationalCode: [{
					required: true,
					trigger: 'blur',
					message: '请选择国籍区号'
				}],
				codePhone: [{
					required: true,
					trigger: 'blur',
					message: '请输入手机验证码'
				}],
				nickname: [{
					validator: validateAccount,
					trigger: 'blur'
				}],
				password: [{
					validator: validatePassWord,
					trigger: 'blur'
				}],
				repassword: [{
					validator: validateRePassWord,
					trigger: 'blur'
				}],
				promotion: [{
					required: true,
					trigger: 'blur',
					message: '请输入邀请码'
				}],
				agree: [{
					required: true,
					type: 'array',
					message: '请勾选用户协议',
					trigger: 'blur',
					min: 1
				}]
			},
			nc: '', //验证码实例
			ncCsessionid: '',
			ncSig: '',
			ncToken: ["FFFF0N000000000069AD", (new Date()).getTime(), Math.random()].join(':'),
			loginCode: '',
			ncCode: false,
			isNameNum: 1,
			email_key: '',
			verification_key: '', // 手机校验唯一
			authorize_code: '' // 第一页授权手机
		}
	},
	components: {
		Model,
		nextRegister
	},
	watch: {
		// 用户注册协议
		kf_pro_single() {
			this.kf_pro_ok = !this.kf_pro_single
		},
		getPassword(curVal, oldVal) {
			if (curVal != oldVal) {
				outPassword = curVal;
			}
		}
	},
	computed: {
		getPassword() {
			return this.registerForm.password
		},
		account() {
			return this.registerForm.account
		},
		code() {
			return this.registerForm.code
		},
		phone() {
			return this.registerForm.phone
		},
		nickname() {
			return this.registerForm.nickname
		},
		password() {
			return this.registerForm.password
		},
		repassword() {
			return this.registerForm.repassword
		},
		promotion() {
			return this.registerForm.promotion
		},
		...mapState(['registerInfo']),
	},
	methods: {
		clearSearch (val) {
			if (!val) this.search = ''
		},
		emptyValue(name) { // tab切换的时候初始化
			this.seen = false
			//this.$refs['registerForm1'].resetFields();
			//this.$refs['registerForm2'].resetFields();
			this.registerForm.codePhone = ''
			this.registerForm.code = ''
			this.kf_pro_ok = false
			this.kf_pro_single = false
			this.ncCsessionid = ''
			this.ncSig = ''
			this.loginCode = ''
			this.ncCode = false
			if (name == 'name1') {
				this.isNameNum = 1
			} else {
				this.isNameNum = 2
			}
			this.authorize_code = ''
			this.registerData = {}
			setTimeout(() => {
				this.nc_reload()
			}, 20)
			this.disableds = true
			this.loadingNext = false // 下一步
			this.descripShow = false
		},
		model_sure() { //邮箱弹框确定
			this.loadingSure = true;
			let params = {
				email: this.registerForm.account.replace(/(^\s+)|(\s+$)/g, ""),
			};
			let reg = new RegExp("^[A-Za-z0-9]+([._\\-]*[A-Za-z0-9])*@([A-Za-z0-9]+[-A-Za-z0-9]*[A-Za-z0-9]+.){1,63}[A-Za-z0-9]+$");
			if (params.email && reg.test(params.email)) {
				api.registerEmail(params).then(res => {
					if (res.status_code == 200) {
						this.authorize_code = res.data.authorize_code
						this.loadingSure = false;
						this.showTab = false;

						this.timer = setInterval(() => {
							if (this.count > 0) {
								this.count--;
							} else {
								this.loadingCode = false;
								clearInterval(this.timer);
								this.count = 60;
							}
						}, 1000);
						this.$Message.success('邮箱验证码发送成功!')
						this.email_key = res.data.email_key;
					} else if (res.status_code == 5006) {
						this.loadingSure = false;
						this.loadingCode = false;
						this.loadingNext = false
					} else if (res.status_code == 5003) {
						this.loadingSure = false;
						this.loadingCode = false;
						this.loadingNext = false
					} else {
						this.loadingSure = false;
						this.loadingCode = false;
						this.loadingNext = false;
					}
				}).catch(error => {
					this.loadingSure = false;
					this.loadingCode = false;
					this.loadingNext = false;
				})
			} else {
				this.loadingSure = false;
				this.loadingCode = false;
				this.loadingNext = false;
				this.$Message.error('请输入验证码')
			}
		},
		model_sure_phone() { //手机模态框确定
			this.loadingSure = true;
			let params = {
				phone_number: this.registerForm.phone.replace(/(^\s+)|(\s+$)/g, ""),
				phone_idd: this.registerForm.nationalCode,
			};
			if (params.phone_idd) {
				if (this.ncCsessionid) {
					this.loadingPhone = true;
					api.send_phone_authCode(params).then(res => {

						if (res.status_code == 200) {
							this.$Message.success('手机验证码发送成功')
							this.loadingSure = false;
							this.showTab = false;
							this.verification_key = res.data.verification_key
							this.timer1 = setInterval(() => {
								if (this.countPhone > 0) {
									this.countPhone--;
								} else {
									this.loadingPhone = false;
									clearInterval(this.timer1);
									this.countPhone = 60;
								}
							}, 1000);
							this.verification_key = res.data.verification_key
						} else if (res.status_code == 5006) {
							this.loadingPhone = false;
							this.loadingSure = false;
							this.loadingNext = false;
						} else if (res.status_code == 5003) {
							this.loadingSure = false;
							this.loadingPhone = false;
							this.loadingNext = false;
						} else if (res.status_code == 6021) {
							this.loadingSure = false;
							this.loadingPhone = false;
							this.loadingNext = false;
						} else {
							this.loadingSure = false;
							this.loadingPhone = false;
							this.loadingNext = false;
						}
					}).catch(err => {
						this.loadingSure = false;
						this.loadingPhone = false;
						this.loadingNext = false;
					})
				} else {
					this.$Message.error("请手动验证滑块！");
					this.loadingNext = false;
				}

			} else {
				this.loadingSure = false;
				this.loadingPhone = false;
				this.loadingNext = false;
				this.$Message.error('请输入手机号码')
			}
		},
		hide() { //弹框关闭
			this.showTab = false;
		},
		registerWay() {
			//    this.$refs['registerForm'].resetFields();
			if (this.options.length <= 0) {
				this.national();
			}
			this.changeWay = !this.changeWay;

		},
		langOperate(value) {
			this.registerForm.nationalCode = value;
		},
		isPC() {
			var userAgentInfo = navigator.userAgent.toLowerCase()
			var Agents = ['android', 'iphone', 'symbianOS', 'windows phone', 'ipad', 'ipod']
			var flag = true
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break
				}
			}
			return flag
		},
		register(name) {
			//				if(this.kf_pro_single == false) {
			//					this.kf_pro_ok = true
			//					return
			//				}
			//				this.kf_pro_ok = false //未勾选用户注册协议，提示
			this.registerLoading = true;
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.loadingNext = true;
					if (this.ncCsessionid) {
						let params = {
							phone_idd: this.isNameNum == 1 ? this.registerForm.nationalCode : '',
							phone_number: this.isNameNum == 1 ? this.registerForm.phone : '',
							phone_code: this.isNameNum == 1 ? this.registerForm.codePhone : '',
							verification_key: this.verification_key,
							token: this.ncToken,
							session_id: this.ncCsessionid,
							sig: this.ncSig,
							email: this.isNameNum == 1 ? '' : this.registerForm.account,
							email_code: this.isNameNum == 1 ? '' : this.registerForm.code,
							email_key: this.email_key
						};

						this.registerData = params

						this.$store.dispatch('register', params).then(res => {
							if (res.status_code === 200) {
								this.loadingNext = false;
								this.$Message.success('信息提交成功，进入下一步');
								this.authorize_code = res.data.authorize_code
								this.nextShow = true //显示下一步注册

							} else if (res.status_code === 5003) {
								this.errorReset()
							} else {
								this.errorReset()
							}
						}).catch(error => {
							this.errorReset()
						})
					} else {
						this.$Message.error("请手动验证滑块！");
						this.loadingNext = false;
						this.disableds = true
					}
				}
			})
		},
		errorReset() {
			this.nc_reload()
			this.disableds = true
			this.loadingNext = false
			this.ncCsessionid = null
		},
		loginClick() {
			this.$router.replace({
				path: '/login'
			})
		},
		email_code() { //获取邮箱验证码
			this.p_text = '';
			let params = this.registerForm.account;
			let reg = new RegExp("^[A-Za-z0-9]+([._\\-]*[A-Za-z0-9])*@([A-Za-z0-9]+[-A-Za-z0-9]*[A-Za-z0-9]+.){1,63}[A-Za-z0-9]+$");
			if (this.ncCsessionid) { // 判断滑块是否滑动
				this.descripShow = false
				if (params) {
					if (reg.test(params)) {
						this.model_sure()
						this.loadingCode = true;
					}
				} else {
					this.$Message.error('请输入邮箱账号！')
				}
			} else {
				this.descripShow = true
			}
		},
		phone_code() { //获取手机验证码
			this.p_text = '';
			let params = {
				phone_idd: this.registerForm.nationalCode,
				phone_number: this.registerForm.phone
			}

			let reg = /^[0-9]{2,20}$/;
			if (this.ncCsessionid) {
				this.descripShow = false
				if (params.phone_idd) {
					if (params.phone_number.replace(/\s+/g, "")) {
						if (reg.test(params.phone_number)) {
							this.model_sure_phone()
							this.loadingPhone = true;
							this.loadingNext = false
						}
					} else {
						this.$Message.error('请输入手机号码')
					}
				} else {
					this.$Message.error('请选择国家代码!')
				}
			} else {
				this.descripShow = true
				this.loadingNext = false
			}

		},
		agreement() {
			window.open('#/page?code=agreement')
		},
		national() { // 获取国际码
			api.internationalCodeGet().then(res => {
				// console.log(res);
				if (res.status_code == 200) {
					this.options = res.data.list;
				}
			})
		},
		nc_reload() {
			//兼容移动端
			if (!IsPC()) {
				this.nc = NoCaptcha.init({
					renderTo: '#ver',
					appkey: 'FFFF0N000000000069AD',
					scene: 'nc_message_h5',
					token: this.ncToken,
					trans: { 'key1': 'code200' },
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
						if (this.ncCsessionid = data.csessionid) {
							this.disableds = false
							this.descripShow = false
						}
						this.ncSig = data.sig
					},
					error: function (s) {
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
		const code = this.$route.query.code
		if (code && !this.isPC()) location.href = 'https://wap.oubit.info/login/login.html?code=' + code
	},
	mounted() {
		if (location.hash.indexOf('?') > -1) {
			let URL = location.hash;
			let url = URL.split('?')[1];
			if (url.split('=')[0] == 'code') {
				this.registerForm.promotion = url.split('=')[1];
				this.invitateURL = url;
			}
		} else {
			this.registerForm.promotion = ''
		}
		this.national()
		promiseNC.then(() => {
			//兼容H5
			if (IsPC()) {
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
						if (this.ncCsessionid = data.csessionid) {
							this.disableds = false
							this.descripShow = false
						}
						
						this.ncSig = data.sig
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
<style lang="scss" scoped="scoped">
.kf_pro_us_ok {
  color: #ed3f14;
  font-size: 0.6rem;
}

.kf_pro_us {
  height: 2rem;
  margin: 0.75rem 0 0 0;
}

.register {
  .login-content {
    background: #ffffff;
    .register-wrap {
      width: 23.8rem;
      margin: 0 auto;
      .national_form {
        display: block;
        display: flex;
        margin: 0.75rem 0 0.75rem 0;
      }
      .loginbuttonline {
        margin: 0;
        .next_btn {
          right: 0.75rem;
          width: 24rem;
        }
      }
      .exist_toLogin {
        margin: 0;
      }
      .email_account {
        margin: 1rem 0 1.75rem 0;
      }
      .email_codes {
        margin: 0 0 1.75rem 0;
      }
    }
  }
  .fill_phone {
    width: 23.6rem;
  }
}

#vaptcha_container {
  margin-bottom: 0.5rem;
  display: table;
  background-color: #eeeeee;
  border-radius: 0.1rem;
}

.vaptcha-init-loading {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.vaptcha-init-loading > a {
  display: inline-block;
  width: 0.9rem;
  height: 0.9rem;
}

.vaptcha-init-loading > a img {
  vertical-align: middle;
}

.vaptcha-init-loading .vaptcha-text {
  font-family: sans-serif;
  font-size: 0.6rem;
  color: #cccccc;
  vertical-align: middle;
}

.login {
  .register {
    .login-content {
      width: 50rem;
      padding: 2.5rem 3rem;
      .title {
        color: #000000 !important;
        text-align: left !important;
        font-size: 1.8rem !important;
      }
      .ivu-tabs-nav .ivu-tabs-tab {
        width: 17rem;
        text-align: center;
        padding: 0.4rem 0 0.75rem 0;
        margin: 0;
      }
      .login-line {
        display: block;
        position: absolute;
        top: 1.2rem;
        left: 5rem;
        width: 1px;
        height: 2.25rem;
        background: #d9d9d9;
      }
      .regetCode {
        padding: 0.5rem 1.6rem;
        background: #d9d9d9;
        position: absolute;
        top: 0.3rem;
        right: 0.35rem;
        color: #999;
        font-size: 0.7rem;
      }
      .newRegetCode {
      	position: absolute;
        top: 0.55rem;
        right: 0.3rem;
        font-size: 0.7rem;
      	color: #ccc;
      	background: none;
      }
      .read-style {
        color: #000000;
        font-size: 0.8rem;
      }
      .exist-login {
        color: #000000 !important;
        /*font-size: 0.9rem !important;*/
      }
    }
  }
}

.ivu-input-group-append,
.ivu-input-group-prepend {
  background: #fff;
}

.ivu-select-arrow {
  background: url();
}

.ivu-tabs-bar {
  margin-bottom: 2.5rem;
}

.ivu-input-group {
  margin: 0.5rem 0 1.75rem 0;
}

.ivu-checkbox-input {
  opacity: 1;
}

.login-click {
  color: #4f69c2 !important;
  /*font-size: 0.9rem !important;*/
}

.register_login {
  text-align: left !important;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}
.agree_tip {
  margin: 0 !important;
}

.agree_tip .ivu-form-item-error-tip {
  opacity: 0 !important;
}

.agree p span {
  color: #4f69c2 !important;
}

.ivu-tabs-nav {
  border-bottom: 0.35rem solid #d8d8d8;
}

.login .ivu-select-selection {
  background: none;
  height: 3rem;
  line-height: 3rem;
  font-size: 0.9rem;
  border-radius: 0;
  border: none !important;
}

.login .ivu-select-selection:hover {
  border-color: #95a1bd;
}

.login .ivu-icon-arrow-down-b:before {
  content: "\F104";
}

.login .ivu-select-selection .ivu-select-placeholder {
  line-height: 3rem;
  height: 3rem;
  font-size: 0.9rem;
  padding: 0 0.4rem;
  color: #95a1bd;
}

.login .ivu-form-item-content .code_num .ivu-input {
  width: 20rem;
  border-bottom-left-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.login .ivu-form-item-content .codeNum .mailCode {
  z-index: 999;
  position: absolute;
  right: -0.25rem;
  bottom: 0.1rem;
  border-radius: 0 !important;
  background: rgba(0, 0, 0, 0);
  border: none;
  color: #f3ba2f !important;
}

.ivu-btn-info:focus {
  box-shadow: none;
}

.login .ivu-form-item-content .ivu-checkbox-inner {
  /*background: none;*/
  width: 1rem;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
}

.login .ivu-checkbox-checked .ivu-checkbox-inner:after {
  width: 0.3rem;
  height: 0.5rem;
  left: 0.3rem;
  top: 0.15rem;
}

.login .ivu-checkbox-focus {
  box-shadow: none;
}

.login .ivu-form-item-content .ivu-checkbox-checked .ivu-checkbox-inner {
  border-color: #fff;
}

.login .model {
  background: #000f22;
}

.login .register_model .model {
  width: 24.5rem;
  height: 14.7rem;
}

.login .register_model .model .model-header {
  font-size: 0.9rem;
  color: #fff;
}

.login .register_model .model .model-content .modelContent {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  margin-top: 2.75rem;
}

.login .register_model .model .model-content .modelContent input {
  width: 11rem;
  height: 2rem;
  background: none;
  border: 1px solid #fff;
  border-radius: 0.25rem;
  color: #fff;
  padding-left: 0.5rem;
}

.login .register_model .model .model-content .modelContent img {
  margin-left: 1rem;
  height: 2rem;
  width: 5rem;
  cursor: pointer;
}

.login .register_model .model .model_footer {
  margin-top: 2.75rem;
}

.login .register_model .model .model_footer .model_sure {
  width: 5rem;
  height: 2rem;
  /*background: #f3ba2f;*/
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  outline: none;
  cursor: pointer;
}

.login .register_model .model .model_footer .model_cancel {
  color: #fff;
  font-size: 0.7rem;
  margin-left: 2.5rem;
}

.login .ivu-form-item-content .ivu-btn-primary[disabled] {
  background-color: #d9d9d9;
}

.login-main {
  .title {
    color: #5d75c7 !important;
  }
}

.loginpswline .ivu-icon {
  font-size: 1.75rem;
  position: absolute;
  top: 0.75rem;
  right: 0.65rem;
  cursor: pointer;
}

.drag {
  position: relative;
  background-color: #e8e8e8;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}

.handler {
  position: absolute;
  top: 0;
  left: 0rem;
  width: 6rem;
  height: 3rem;
  border: 1px solid #ccc;
  cursor: move;
}

.drag_bg {
  background-color: #8196db;
  height: 3rem;
  width: 0rem;
}

.drag_text {
  position: absolute;
  top: 0rem;
  padding: 0 0 0 6.2rem;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
  font-size: 0.8rem;
}
/* 所有样式 */

.login .ivu-tabs-ink-bar {
  background-color: #4f69c2;
  height: 0.2rem;
  bottom: -0.2rem;
}

.login .ivu-input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #95a1bd;
}

.login .ivu-input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #95a1bd;
}

.login .ivu-input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #95a1bd;
}

.login .ivu-input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #95a1bd;
}

.login .codeNum .ivu-form-item-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  position: relative;
}

.login .codeNum .ivu-form-item-content .ivu-input-wrapper {
  width: 23.4rem;
  height: 2rem;
}

.login .ivu-input-wrapper .ivu-input:focus {
  border: 1px solid #5d75c7 !important;
}

.login .ivu-select-visible .ivu-select-selection {
  /*border-color: #fff;*/
  box-shadow: none;
}

.login .ivu-select-selection-focused,
.login .ivu-select-selection:hover {
  /*border-color:#fff*/
}

.login .ivu-select-item-selected.ivu-select-item-focus,
.login .ivu-select-item:hover {
  color: #f3ba2f !important;
  background: #edeef4;
}

.login .ivu-select-item-selected,
.login .ivu-select-item-selected:hover {
  background: #171a2a !important;
}

.login .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  line-height: 2.75rem;
  font-size: 0.7rem;
  height: 2.75rem;
  /*color:#fff;*/
  padding-left: 0.5rem;
}

.login .ivu-form-item-content .ivu-input-wrapper .ivu-input:hover {
  border-color: rgba(0, 0, 0, 0);
}

.login .codeNum .ivu-form-item-content .ivu-btn-info {
  width: 5rem;
  background: #eee;
  border: none;
  height: 2rem;
  color: #07d08b;
  font-size: 0.8rem;
}

.login .ivu-form-item-content .ivu-btn-button {
  width: 100%;
  color: #fff;
  background-color: #4f69c2;
  line-height: 2.25rem;
  margin: 0.75rem auto 0;
  font-size: 0.9rem;
  border: none;
}

.login .ivu-form-item-content .ivu-btn-button[disabled] {
  background-color: #d9d9d9;
}

.login .ivu-btn[disabled],
.login.ivu-btn[disabled]:hover {
  /*background: none;*/
  border: none;
}

.ivu-btn:focus {
  box-shadow: none;
}

.ivu-btn:before {
  background: none;
}

.login .set_account .ivu-form-item-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  margin-top: 2rem;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}

.login .ivu-tabs-nav-wrap {
  margin-bottom: 0.75rem;
}
/*注册*/

.login .ivu-select-selection {
  background: none;
  height: 3rem;
  line-height: 3rem;
  /*color: #fff;*/
  font-size: 0.9rem;
  /*border: none;*/
  border-radius: 0;
  border: none !important;
  /*border: 1px solid #A4B3E4  !important;*/
  /*border-right: 0 !important;*/
}

.login .ivu-select-selection:hover {
  border-color: #95a1bd;
}

.login .ivu-icon-arrow-down-b:before {
  content: "\F104";
}

.login .ivu-select-selection .ivu-select-placeholder {
  line-height: 3rem;
  height: 3rem;
  font-size: 0.9rem;
  padding: 0 0.4rem;
  color: #95a1bd;
}

.login .ivu-form-item-content .code_num .ivu-input {
  width: 20rem;
  border-bottom-left-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.login .ivu-form-item-content .codeNum .mailCode {
  z-index: 999;
  position: absolute;
  right: -0.25rem;
  bottom: 0.1rem;
  border-radius: 0 !important;
  background: rgba(0, 0, 0, 0);
  border: none;
  color: #f3ba2f !important;
}

.login .register .mailCode {
  position: absolute;
  right: 0.35rem;
  bottom: 0.3rem;
  font-size: 0.7rem;
  background: #92a3da;
  color: #f3ba2f;
  border-radius: 0.1rem;
  border: none;
  color: #ffffff;
  width: 9rem;
  height: 2.4rem;
}

.login .register .newMailCode {
  position: absolute;
  right: 0.35rem;
  bottom: 0.65rem;
  font-size: 0.7rem;
  background: none;
  /*color: #f3ba2f;*/
  border-radius: 0.1rem;
  border: none;
  color: #4f69c2 !important;
}

.ivu-btn-info:focus {
  box-shadow: none;
}

.login .ivu-form-item-content .ivu-checkbox-inner {
  /*background: none;*/
  width: 1rem;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
}

.login .ivu-checkbox-checked .ivu-checkbox-inner:after {
  width: 0.3rem;
  height: 0.5rem;
  left: 0.3rem;
  top: 0.15rem;
}

.login .ivu-checkbox-focus {
  box-shadow: none;
}

.login .ivu-form-item-content .ivu-checkbox-checked .ivu-checkbox-inner {
  border-color: #fff;
}

.login .model {
  background: #000f22;
}

.login .register_model .model {
  width: 24.5rem;
  height: 14.7rem;
}

.login .register_model .model .model-header {
  font-size: 0.9rem;
  color: #fff;
}

.login .register_model .model .model-content .modelContent {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  margin-top: 2.75rem;
}

.login .register_model .model .model-content .modelContent input {
  width: 11rem;
  height: 2rem;
  background: none;
  border: 1px solid #fff;
  border-radius: 0.25rem;
  color: #fff;
  padding-left: 0.5rem;
}

.login .register_model .model .model-content .modelContent img {
  margin-left: 1rem;
  height: 2rem;
  width: 5rem;
  cursor: pointer;
}

.login .register_model .model .model_footer {
  margin-top: 2.75rem;
}

.login .register_model .model .model_footer .model_sure {
  width: 5rem;
  height: 2rem;
  /*background: #f3ba2f;*/
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  outline: none;
  cursor: pointer;
}

.login .register_model .model .model_footer .model_cancel {
  color: #fff;
  font-size: 0.7rem;
  margin-left: 2.5rem;
}

.login-main {
  .title {
    color: #5d75c7 !important;
  }
}

.loginpswline .ivu-icon {
  font-size: 1.75rem;
  position: absolute;
  top: 0.75rem;
  right: 0.65rem;
  cursor: pointer;
}

.login .model .model-header .verify_way {
  font-size: 0.9rem;
  color: #eee;
}

.login .model .model-header .verify_tip {
  font-size: 0.7rem;
  color: #999;
  margin-top: 1rem;
}

.login .model .model-content .code {
  font-size: 0.7rem;
  color: #fffefe;
}

.login .model .model-content .code_send {
  display: flex;
  margin: 0.5rem 0 0 0;
}

.login .model .model-content .code_send input {
  background: none;
  border: 1px solid #edeef4;
  width: 23.4rem;
  height: 2rem;
  border-bottom-left-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  color: #999;
  padding-left: 0.5rem;
}

.login .model .model-content .code_send .getCode {
  height: 2rem;
  width: 5rem;
  background: #f3ba2f;
  border: none;
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
  border-bottom-right-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  color: #fff;
  font-size: 0.6rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.login .model .model_footer .btn_sure:active {
  box-shadow: 0 0 0.5rem 0.15rem #333;
}

.login .model .model_footer .btn_sure {
  display: inline-block;
  width: 5rem;
  height: 2rem;
  background: #f3ba2f;
  border: none;
  color: #fff;
  font-size: 0.7rem;
  border-radius: 0.25rem;
  outline: none;
  cursor: pointer;
  letter-spacing: 0.1rem;
}

.login .model .model_footer .cancel {
  text-align: center;
  background: #fff;
  line-height: 2rem;
  color: #000;
  margin: 0 0 0 1rem;
}
</style>