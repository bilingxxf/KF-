<!--suppress ALL -->
<template>
	<div>
		<Content>
			<div class="login login-main login-slider">
				<div class="login-wrap">
					<div class="login-content">
						<p class="logintitle title">欢迎登录</p>
						<Tabs value="name1" @on-click="emptyValue" class="login-label-left">
							<TabPane label="手机登录" name="name1">
								<Form ref="loginForm1" :model="loginForm" :rules="ruleValidate">
									<div class="national_form">
										<Dropdown trigger="click" @on-click="langOperate" @on-visible-change="clearSearch" class="nationalNum nationalDrop">
											<a href="javascript:void(0)">
												{{loginForm.nationalCode}}
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
										<!--<p class="login-line"></p>-->
										<FormItem prop="phone" class="fill_phones">
											<Input class="fill_phone" auto-complete="new-password" type="text" v-model="loginForm.phone" placeholder="输入手机号" autocomplete="off">
											</Input>
										</FormItem>
									</div>
									<FormItem prop="password" class="loginpswline">
										<Input :maxlength="20" :type="seen ? 'text' : 'password'" placeholder="请输入密码" v-model="loginForm.password" @keyup.enter.native="show()" autocomplete="off"></Input>
										<img class="eye-style" :src="seen?  '../../../static/img/eye-see.png': '../../../static/img/eye-no.png' " @click="changeSeen" />
										<!--<Icon :type="seen? 'ios-eye':'ios-eye-outline ios-eye' " @click="changeSeen" />-->
									</FormItem>
									<div v-if="isNameNum == 1" id="ver" class="nc-container verClass"></div>
									<FormItem class="">
										<Button type="primary" @click="show('loginForm1')" :loading="loading" :disabled="disabled">{{ btnDescript }}</Button>
										<div class="set_account">
											<span>
												<b class="no_account">还没账号？</b>
												<router-link class="register_account blue" to="/register">免费注册</router-link>
											</span>
											<router-link tag="span" class="forget_password blue" to="/accountVerify">忘记密码？</router-link>
										</div>
									</FormItem>
								</Form>
							</TabPane>

							<TabPane label="邮箱登录" name="name2">
								<Form ref="loginForm2" :model="loginForm" :rules="ruleValidate">
									<FormItem prop="mail">
										<Input placeholder="请输入邮箱账号" v-model="loginForm.mail" @keyup.enter.native="show()" autocomplete="off"></Input>

									</FormItem>

									<FormItem prop="password" class="loginpswline">
										<Input :maxlength="20" :type="seen ? 'text' : 'password'" placeholder="请输入密码" v-model="loginForm.password" @keyup.enter.native="show()" autocomplete="off"></Input>
										<img class="eye-style" :src="seen?  '../../../static/img/eye-see.png': '../../../static/img/eye-no.png' " @click="changeSeen" />
									</FormItem>

									<div v-if="isNameNum == 2" id="ver" class="nc-container verClass"></div>

									<FormItem class="">
										<Button type="primary" @click="show('loginForm2')" :loading="loading" :disabled="disabled">{{ btnDescript }}</Button>
										<div class="set_account">
											<span>
												<b class="no_account">还没账号？</b>
												<router-link class="register_account blue" to="/register">免费注册</router-link>
											</span>
											<router-link tag="span" class="forget_password blue" to="/accountVerify">忘记密码？</router-link>
										</div>
									</FormItem>
								</Form>
							</TabPane>
						</Tabs>

						<model v-if="showTab" @hide="hide">
							<div slot="modelSlotHeader" v-if="step==1">
								<p class="verify_tip style-title">邮箱验证码</p>
								<p class="verify_way 11">请输入 {{loginInfo.mailInfo.email}} 收到的验证码</p>

							</div>
							<div slot="modelSlotHeader" v-if="step==2">
								<p class="verify_tip style-title">手机验证码</p>
								<p class="verify_way 22">请输入{{loginInfo.phoneInfo.phone}}收到的验证码</p>
							</div>

							<div slot="modelSlotHeader" v-if="step==3">
								<p class="verify_way 33 style-title padding-top-four">验证谷歌</p>
							</div>

							<div slot="modelSlotContent" v-if="step==1">
								<p class="code">邮箱验证码</p>
								<!--<p class="code_send code-ivu-btn"><input type="number" v-model="email_code" :maxlength="6">
									<Button type="primary" class="getCode" @click="getEmailCode" v-if="count == 60" :loading="loadingEmail">获取验证码</Button>
									<Button type="primary" class="getCodeing" disabled v-else>重新发送{{count}}</Button>
								</p>-->

								<p class="code_send code-ivu-btn"><input type="number" v-model="email_code" :maxlength="6">
									<Button type="primary" class="getCode newGetCode" @click="getEmailCode" v-if="count == 60" :loading="loadingEmail">获取验证码</Button>
									<Button type="primary" class="getCodeing" disabled v-else>{{count}}</Button>
								</p>
							</div>

							<div slot="modelSlotContent" v-if="step==2">
								<p class="code">手机验证码</p>
								<!--<p class="code_send code-ivu-btn"><input v-model="phone_code" type="number" :maxlength="6">
									<Button type="primary" class="getCode" @click="getPhoneCode" v-if="count1 == 60" :loading="loadingPhone">获取验证码</Button>
									<Button type="primary" class="getCodeing" disabled v-else>重新发送{{count1}}</Button>
								</p>-->

								<p class="code_send code-ivu-btn"><input v-model="phone_code" type="number" :maxlength="6">
									<Button type="primary" class="getCode newGetCode" @click="getPhoneCode" v-if="count1 == 60" :loading="loadingPhone">获取验证码</Button>
									<Button type="primary" class="getCodeing" disabled v-else>{{count1}}</Button>
								</p>
							</div>

							<div slot="modelSlotContent" v-if="step==3">
								<p class="code">google验证码</p>
								<p class="code_send">
									<input v-model="google_code" placeholder="请输入谷歌验证码" type="number" :maxlength="6">
								</p>
							</div>

							<div slot="modelSlotFooter" class="btn_wrap">
								<button class="btn_sure cancel right" href="javascript:;" @click="hide">取消</button>
								<Button class="btn_sure right" @click="btn_sure" :loading="verifyLoading">确定</Button>
							</div>
						</model>
					</div>
				</div>
			</div>
		</Content>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Model from './../model/Model.vue'
import api from '../../api'
import axios from 'axios'
export default {
    data() {
		const validatePassWord = (rule, value, callback) => { // 登录密码
			if (value === '') {
				callback(new Error('请输入密码'));
			} else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
				callback(new Error('请输入5-15位字母数字密码'));
			} else {
				callback();
			}
		};
		const validatePhone = (rule, value, callback) => {   // 手机号码
			if (value === '') {
				callback(new Error('请输入手机号码'));
			} else{
				if(this.loginForm.nationalCode == '+86' &&  (!/^1[34578]\d{9}$/.test(value))) {
					callback(new Error('请输入正确的手机号码'));
				}else if(this.loginForm.nationalCode != '+86' && (!/^[0-9]{2,20}$/.test(value))){
					callback(new Error('请输入正确的手机号码'));
				}else {
					callback();
				}
			}
		};
		const validateNational = (rule, value, callback) => { //  国籍选择
			if (value === '') {
				callback(new Error('请选择国籍'));
			} else {
				callback();
			}
		};
		return {
			towhere: '',
			btnDescript: '登录',
			disabled: true,
			token: '',
			seen: false,
			email_key: '',
			phone_key: '',
			loading: false,
			loadingEmail: false,
			loadingPhone: false,
			timer: null,
			timer1: null,
			email_code: '',
			phone_code: '',
			google_code: '',
			count: 60,
			count1: 60,
			step: 0,
			codeError_tip: false,
			loadingNational: false,
			options: [], // 国际码
			list: ['1234', '2345'],
			loginForm: {
				mail: '',
				phone: '',
				nationalCode: '+86',
				password: '',
				code: '',
				login_img: ''
			},
			search: '',
			showTab: false,
			ruleValidate: {
				mail: [{ required: true, message: '请输入邮箱账号', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱账号', trigger: 'blur' }],
				password: [{ validator: validatePassWord, trigger: 'blur' }],
				nationalCode: [{ required: true, validator: validateNational, trigger: 'blur' }],
				phone: [{ validator: validatePhone, trigger: 'blur' }],
				code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
			},
			nc: '', //验证码实例
			ncCsessionid: '',
			ncToken: ["FFFF0N000000000069AD", (new Date()).getTime(), Math.random()].join(':'),
			ncSig: '',
			loginCode: '',
			ncCode: false,
			isNameNum: 1,
			verifyLoading: false, // 二次验证确定loading
		}
	},
	components: {
		Model
	},
	computed: {
		...mapState(['loginInfo']),
		mail() {
			return this.loginForm.mail
		},
		phone() {
			return this.loginForm.phone
		},
		password() {
			return this.loginForm.password
		}
	},
	watch: {},
	methods: {
		clearSearch (val) {
			if (!val) this.search = ''
		},
		slider() {  //  登录滑块认证
			let pa = {
				token: this.ncToken,
				session_id: this.ncCsessionid,
				sig: this.ncSig
			}
			this.btnDescript = '加载中...'
			this.loading = true
			api.sliderVerify(pa).then(res => {
				console.log(res)
				this.btnDescript = '登录'
				this.loading = false
				if (res.status_code == 200) {
					this.disabled = false
					this.loginCode = res.data.loginCode
					this.ncCode = true
				} else {
					setTimeout(() => {
						this.nc_reload()
					}, 20)
				}
			}).catch((e) => {
				setTimeout(() => {
					this.nc_reload()
				}, 20)
				this.btnDescript = '登录'
				this.loading = false
			})
		},
		changeSeen() { // 密码可见不可见
			this.seen = !this.seen
		},
		emptyValue(name) { // tab切换的时候初始化
			this.seen = false
			this.$refs['loginForm1'].resetFields();
			this.$refs['loginForm2'].resetFields();
			this.ncCsessionid = ''
			this.ncSig = ''
			this.loginCode = ''
			this.ncCode = false
			if (name == 'name1') {
				this.isNameNum = 1
			} else {
				this.isNameNum = 2
			}
			setTimeout(() => {
				this.nc_reload()
			}, 20)
			this.disabled = true

		},
		langOperate(value) {
			this.loginForm.nationalCode = value;
		},
		//  获取国际码
		national() {
			api.internationalCodeGet().then(res => {
				// console.log(res);
				if (res.status_code == 200) {
					this.options = res.data.list;
				}
			})
		},
		routeTo() {
			let arr = ['/register', '/resetPassword', '/accountVerify', '/resetPassword', '/safetyVerification', 'undefined', '/login', '/nextRegister'];
			if (arr.includes(this.towhere) > 0 || !this.towhere) {
				this.$router.replace({
					path: '/home'
				});
			} else {
				this.$router.push({
					path: this.towhere
				});
			}
		},
		show(name) { //立即登录
			this.loading = false;
			this.loadingEmail = false;
			this.loadingPhone = false;
			this.$refs[name].validate((valid) => {
				if (valid) {
					if (this.ncCode == true) {
						this.loading = true;
						this.codeError_tip = false;
						let data = {
							email: this.isNameNum == 1 ? '' : this.loginForm.mail,
							password: this.loginForm.password,
							phone_idd: this.isNameNum == 1 ? this.loginForm.nationalCode : '',
							phone_number: this.isNameNum == 1 ? this.loginForm.phone : '',
							login_code: this.loginCode
						};
						//							console.log(this.loginCode)
						this.$store.dispatch('login', data).then(res => {
							this.loading = false;
							if (res.status_code === 200) {
								//									this.$refs['registerForm1'].resetFields();
								//									this.$refs['registerForm2'].resetFields();
								this.$store.commit('LOGIN_SUCCESS', res.data);
								this.$store.commit('TOKEN', res.data.token);
								this.routeTo()
								//									this.$Message.success('登录成功!');
							} else if (res.status_code === 6001) { //二次验证

								this.showTab = true;
								if (res.data.validate_status === 'second_email_status') { // 二次邮箱验证
									this.step = 1;
									this.$store.commit('emailInfo', res.data);
								} else if (res.data.validate_status === 'second_phone_status') { // 二次手机验证
									this.step = 2;
									this.$store.commit('phoneInfo', res.data);
								} else if (res.data.validate_status === 'second_google_auth_status') { // 二次谷歌验证
									this.step = 3;
									this.$store.commit('googleInfo', res.data);
								}
							}else { }
						}).catch(error => {
							this.loading = false;
						})
					} else {
						this.$Message.error('请进行滑块验证！');
					}
				} else {
					this.loading = false;
				}
			})
		},
		hide() { //关闭弹框
			this.showTab = false;
			this.verifyLoading = false
			if (this.timer) {
				clearInterval(this.timer);
				this.count = 60;
			};
			if (this.timer1) {
				clearInterval(this.timer1);
				this.count1 = 60;
			};
			this.email_code = '';
			this.phone_code = '';
			this.google_code = '';
			this.$refs['loginForm1'].resetFields();
			this.$refs['loginForm2'].resetFields();
		},
		getEmailCode() { //获取邮箱验证码
			this.loadingEmail = true;
			api.emailCode({
				identification: this.loginInfo.mailInfo.identification
			}).then(res => {
				if (res.status_code == 200) {
					this.email_key = res.data.email_key;
					this.$Message.success('发送成功');
					this.timer = setInterval(() => {
						if (this.count > 0) {
							this.count--;
						} else {
							this.loadingEmail = false;
							clearInterval(this.timer);
							this.count = 60;
						}
					}, 1000);
				} else {
					this.loadingEmail = false;
					this.loadingEmail = false;
				}
			}).catch(error => {
				this.loadingEmail = false;
			})
		},
		getPhoneCode() { //获取手机验证码
			this.loadingPhone = true;
			api.phoneCode({
				identification: this.loginInfo.phoneInfo.identification
			}).then(res => {
				if (res.status_code == 200) {
					this.phone_key = res.data.verification_key;
					this.$Message.success('发送成功');
					this.timer1 = setInterval(() => {
						if (this.count1 > 0) {
							this.count1--;
						} else {
							this.loadingPhone = false;
							clearInterval(this.timer1);
							this.count1 = 60;
						}
					}, 1000);
				} else {
					this.loadingPhone = false;
					this.loadingPhone = false;
				}
			}).catch(error => {
				this.loadingPhone = false;
			})
		},

		send_ph_em() {
			this.btn_sure()
		},

		btn_sure() { //模态框确定
			if (this.step == 1) { //邮箱校验
				let params = {
					email_code: this.email_code,
					identification: this.loginInfo.mailInfo.identification,
					email_key: this.email_key
				}
				if (this.email_key) {
					if (!this.email_code) {
						//							this.$Message.error('请输入验证码');
						return false
					}
					this.verifyLoading = true
					api.emailCodeVerify(params).then(res => {
						this.verifyLoading = true
						if (res.status_code == 200) {
							this.verifyLoading = false
							if (res.data.validate_status == ('second_phone_status')) {
								this.step = 2;
								this.$store.commit('phoneInfo', res.data);
							} else if (res.data.validate_status == 'second_google_auth_status') {
								this.step = 3;
								this.$store.commit('googleInfo', res.data);
							} else {
								this.showTab = false;
								this.$store.commit('LOGIN_SUCCESS', res.data);
								this.$store.commit('TOKEN', res.data.token);
								this.routeTo()
								//									this.$Message.success('登录成功!');
								// 存登录信息
							}
						} else if (res.status_code == 5003) {
							this.verifyLoading = false
							this.nc.reload()
						} else {
							this.verifyLoading = false
						}
					}).catch(error => {
						this.verifyLoading = false
						this.$Message.error('网络异常请重试！');
					})
				} else {
					//						this.$Message.error('请获取验证码');
					this.verifyLoading = false
				}
			} else if (this.step == 2) {

				let params = {
					verification_code: this.phone_code,
					identification: this.loginInfo.phoneInfo.identification,
					verification_key: this.phone_key
				}

				if (this.phone_key) {
					if (!this.phone_code) {
						//							this.$Message.error('请输入验证码');
						return false
					}
					this.verifyLoading = true
					api.phoneCodeVerify(params).then(res => {
						this.verifyLoading = true
						if (res.status_code == 200) {
							this.verifyLoading = false
							if (res.data.hasOwnProperty('validate_status')) {
								this.step = 3;
								this.$store.commit('googleInfo', res.data);
							} else {
								this.showTab = false;
								// 存登录信息
								this.$store.commit('LOGIN_SUCCESS', res.data);
								this.$store.commit('TOKEN', res.data.token);
								this.routeTo()
							}
						} else if (res.status_code == 5003) {
							this.verifyLoading = false
						} else {
							this.verifyLoading = false
						}

					}).catch(error => {
						this.$Message.error('网络异常请重试！');
					})
				} else {
					//						this.$Message.error('请获取验证码');
				}

			} else if (this.step == 3) {
				let params = {
					identification: this.loginInfo.googleInfo.identification,
					verify: this.google_code
				}
				if (this.google_code) {
					this.verifyLoading = true
					api.googleCodeVerify(params).then(res => {
						this.verifyLoading = true
						if (res.status_code == 200) {
							this.verifyLoading = false
							this.showTab = false;
							// 存登录信息
							this.$store.commit('LOGIN_SUCCESS', res.data);
							this.$store.commit('TOKEN', res.data.token);
							this.routeTo()
						} else if (res.status_code == 5003) {
							this.verifyLoading = false
						} else {
							this.verifyLoading = false
						}
					}).catch((e) => {
						this.$Message.error('网络异常请重试！');
					})
				} else {
					//	this.$Message.error('请输入谷歌验证码!');
				}
			}
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
						this.ncCsessionid = data.csessionid
						this.ncSig = data.sig
						this.slider(); // 滑块验证
						this.send_ph_em()
						// data.token = this.token
						// this.callback && this.callback(data)
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
		this.towhere = this.$route.query.router
	},
	mounted() {
		this.$refs['loginForm1'].resetFields();
		this.$refs['loginForm2'].resetFields();
		this.national(); //  获取国际码
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
						// window.console && console.log(data.csessionid)
						// window.console && console.log(data.sig)
						this.ncCsessionid = data.csessionid
						this.ncSig = data.sig
						//          console.log(data)
						this.slider(); // 滑块验证
						this.send_ph_em()
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
<style lang="scss" scoped>
.verClass {
  width: 18.75rem;
  position: absolute;
  z-index: 111;
}
.left {
  float: left;
}
.right {
  float: right;
}
.login .nc-container .nc_scale span {
  // height: 1.7rem !important;
  // line-height: 1.7rem;
}

.login-main {
  background: url("./../../../static/img/back.png");
  background-size: cover;
  .login-wrap {
    .login-content {
      width: 22.7rem !important;
      height: 33.25rem;
      background: #ffffff;
      padding: 1.5rem 2.25rem;
      margin-left: 35.5rem;
      .loginCode {
        right: 4.25rem !important;
      }
      .no_account {
        color: #696969;
      }
      .national_form {
        display: flex;
        position: relative;
        .national-code {
          position: absolute;
          top: 0;
          left: 0rem;
          z-index: 100;
        }
        .login-line {
          display: block;
          position: absolute;
          top: 0.4rem;
          left: 5rem;
          width: 1px;
          height: 2.25rem;
          background: #d9d9d9;
        }
      }
      .fill_phone {
        width: 18.2rem;
      }
      .title {
        color: #333333 !important;
        font-size: 1.8rem !important;
        text-align: left !important;
        padding: 0 0 1rem 0;
      }
      .nation-select {
        width: 5.5rem;
        float: left;
      }
      .forget_password {
        display: inline-block;
        float: right;
        /*padding: 0 1.7rem 0 0;*/
        cursor: pointer;
      }
    }
  }
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

.login .ivu-form-item-content .ivu-btn-primary {
  width: 100%;
  color: #fff;
  background-color: #4f69c2;
  line-height: 2.25rem;
  margin: 5rem auto 1rem;
  font-size: 0.9rem;
  border: none;
}
.login .ivu-form-item-content .ivu-btn-primary[disabled] {
  background-color: #d9d9d9;
}
.login .ivu-btn[disabled],
.login.ivu-btn[disabled]:hover {
  /*background: none;*/
  border: none;
  /*width: 5rem;*/
}

.login .ivu-btn.regetCode {
  background: none;
}

.login .eye-style {
  position: absolute;
  top: 1.1rem;
  right: 1.2rem;
  cursor: pointer;
}

.ivu-btn:focus {
  box-shadow: none;
}

.ivu-btn:before {
  background: none;
}

.login .set_account {
  font-size: 0.7rem;
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
.loginpswline {
  position: relative;
}

.loginpswline .ivu-icon {
  font-size: 1.75rem;
  position: absolute;
  top: 0.75rem;
  right: 0.65rem;
  cursor: pointer;
}
/* model */

.login .model .model-header .verify_way {
  font-size: 0.7rem;
  color: #999;
  padding: 1rem 0 0 0;
}

.login .model .model-header .verify_tip {
  font-size: 0.7rem;
  color: #999;
  margin-top: 1rem;
}
.login .model .model-header .style-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #000;
  padding: 20 0 0.5rem 0;
}
.login .model .model-header .padding-top-four {
  padding: 2rem 0 0 0;
}

.login .model .model-content .code {
  font-size: 0.7rem;
  color: #fffefe;
}

.login .model .model-content .code_send {
  display: flex;
  margin: 0.5rem 0 0 0;
  position: relative;
}

.login .model .model-content .code_send input {
  background: none;
  border: 1px solid #D9D9D9;
  width: 23.4rem;
  height: 2rem;
  /*border-bottom-left-radius: 0.25rem;*/
  /*border-top-left-radius: 0.25rem;*/
  border-radius: 0.25rem;
  color: #999;
  padding-left: 0.5rem;
}



.login .model .model-content .code_send .getCodeing {
  height: 1.5rem;
  /*width: 5.25rem;*/
  border-radius: 0.15rem;
  position: absolute;
  top: 0.25rem;
  background: none;
  right: 0.5rem;
}
.login .model .model-content .code_send input:focus {
	border: 1px solid #5D75C7;
}
.login .model .model-content .code_send .getCode {
  height: 1.5rem;
  width: 5.25rem;
  background: #4f69c2;
  border: none;
  /*border-bottom-left-radius: 0!important;
	border-top-left-radius: 0!important;*/
  border-radius: 0.15rem;
  color: #fff;
  font-size: 0.7rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
}

.login .model .model-content .code_send .newGetCode {
	width: auto;
	height: auto;
	background: none;
	color: #4f69c2;
	top: 0.45rem;
	right: 0.5rem;
}

.login .model .model_footer .btn_sure:active {
  /*box-shadow: 0 0 0.5rem 0.15rem #333;*/
}
.login .model .model_footer .btn_wrap {
  overflow: hidden;
  border-top: 1px solid #d9d9d9;
  padding: 0 0 1.5rem 0;
}
.login .model .model_footer .btn_sure {
  display: inline-block;
  width: 5rem;
  height: 2rem;
  background: #4f69c2;
  border: none;
  color: #fff;
  font-size: 0.7rem;
  border-radius: 0.25rem;
  outline: none;
  cursor: pointer;
  letter-spacing: 0.1rem;
  margin: 1.5rem 0 0 0;
}

.login .model .model_footer .cancel {
  text-align: center;
  background: #fff;
  line-height: 2rem;
  color: #000;
  margin: 1.5rem 2rem 0 1.5rem;
  border: 1px solid #d9d9d9;
}
</style>
