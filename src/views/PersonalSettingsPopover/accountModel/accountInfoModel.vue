<template>
	<div id="personalPopover">
		<div class="backHui" id="huisekuang">
			<div class="centered" v-show="changeAvatar">
				<div class="close" @click="cancelClose()">
					<span class="icon-wrong"></span>
				</div>
				<div class="centeredPadding">
					<div class="birthTitle">上传头像</div>
					<div class="chatHeads">
						<div class="uploadAvatarOut">
							<img v-if="srcAvatar" :src="srcAvatar" alt="" class="uploadAvatar">
							<img v-else src="../../../../static/img/avatar.svg" alt="" class="uploadAvatar" />
							<label for="fileTouDa" class="labelAvat"></label>
							<input type="file" accept='image/*' id="fileTouDa" @change="changeAvatars($event)" class="avatarInputTop" />
						</div>

						<div class="localUpload">
							<label for="fileTou" class="labelFile">本地上传</label>
							<input type="file" id="fileTou" class="changes" accept='image/*' @change="changeAvatars($event)" />
						</div>

					</div>
					<Form class="accountSettingInputPopover special menu special2">
						<FormItem class="btn btnTwos">
							<Button type="primary" @click="submitAvatars()" class="left" :loading="fileLoading" :disabled="cancelDisable">确定</Button>
							<Button type="primary" @click="cancelClose()" class="right" :diasbled="cancelDisable">取消</Button>
						</FormItem>
					</Form>

				</div>
			</div>
			<!-- 实名认证 -->
			<div class="centered realNameApprove" v-show="realNameApprove">
				<div class="close" @click="cancelClose('nameApproveData')">
					<span class="icon-wrong"></span>
				</div>
				<div class="centeredPadding">
					<div class="centeredTitle" v-if="realApproveSetOrChang">实名认证</div>
					<div class="centeredTitle" v-else>重新实名认证</div>
					<Form :model="nameApprove" label-position="top" class="accountSettingInputPopover special menu font-16" ref="nameApproveData" :rules="nameApproveRules">
						<FormItem prop="name" label="姓名">
							<Input type="text" v-model="nameApprove.name" placeholder="请输入您的真实姓名" class="accountSettingInput"></Input>
						</FormItem>
						<div class="titltContent moreMargin">
							<div class="title">证件类型</div>
							<div class="input">
								<div class="idCardSelect">
									<i-select v-model="IDtype" style="width:22.9rem" placeholder="一代身份证">
										<i-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
									</i-select>
								</div>
							</div>
						</div>
						<FormItem prop="idCard" label="证件号">
							<Input type="text" v-model="nameApprove.idCard" placeholder="请输入你的证件号码" class="accountSettingInput"></Input>
						</FormItem>
						<FormItem class="btn">
							<Button type="primary" v-if="realApproveSetOrChang" :loading="realLoading" @click="realNameAuthentication('nameApproveData')" class="left">确定</Button>
							<Button type="primary" v-else @click="changeRealNameAuth('nameApproveData')" :loading="realLoading"  class="left">确定</Button>
							<Button type="primary" @click="cancelClose('nameApproveData')" class="right">取消</Button>
						</FormItem>
					</Form>
				</div>
			</div>
			<!-- 高级认证 x-->
			<div class="advancedVerify googleTest more-height advancedVerifyLeft" v-show="advancedVerify">
				<div class="close" @click="cancelClose()">
					<span class="icon-wrong"></span>
				</div>
				<div class="advancedVerifyPadding">
					<div class="title" v-if="advancedVerifySetOrChange">高级认证</div>
					<div class="title" v-else>重新高级认证</div>
					<form action="" id="seniorValidation">
						<div class="uploadPicture">
							<div class="uploadPictureDan">
								<div class="uploadPicTitle">上传身份证正面:</div>
								<div class="uploadPicContent">
									<a href="javascript:;" class="filePic">
										上传文件
										<img class="upload-img" src="../../../../static/img/upload.png" />
										<input type="file" class="change" multiple="multiple" @change="fileChange($event,0)" accept='image/*' ref="onloadInput1">
									</a>
									<!-- 存放图片的位置 -->
									<img :src="src" alt="" class="uploadPicMiddel">
								</div>
							</div>
							<div class="uploadPictureDan">
								<div class="uploadPicTitle">上传身份证反面:</div>
								<div class="uploadPicContent">
									<a href="javascript:;" class="filePic">
										上传文件
										<img class="upload-img" src="../../../../static/img/upload.png" />
										<input type="file" class="change" multiple="multiple" @change="fileChange($event,1)" accept='image/*' ref="onloadInput2">
									</a>
									<img :src="src2" alt="" class="uploadPicMiddel">
								</div>
							</div>
							<div class="uploadPictureDan">
								<div class="uploadPicTitle">手持身份证照片:</div>
								<div class="uploadPicContent">
									<a href="javascript:;" class="filePic">
										上传文件
										<img class="upload-img" src="../../../../static/img/upload.png" />
										<input type="file" class="change" multiple="multiple" @change="fileChange($event,2)" accept='image/*' ref="onloadInput3">
									</a>
									<img :src="src3" alt="" class="uploadPicMiddel">
								</div>
							</div>
						</div>
					</form>
					<p class="warn"> 请上传jpg、png格式图片，大小不能超过3M。<br>请严格按照要求上传材料，否则会造成您的认证无法通过审核，耽误您宝贵的时间。</p>
					<!--<p class="uploadAgain" @click="againUpload">重新上传</p>-->
					<Form class="accountSettingInputPopover font-16 special menu special2 ">
						<FormItem class="btn">
							<Button type="primary" @click="submitPic()" class="left" :loading="fileLoading" :disabled="cancelDisable">确定</Button>
							<Button type="primary" @click="cancelClose()" class="right" :diasbled="cancelDisable">取消</Button>
						</FormItem>
					</Form>
				</div>
			</div>
			<!--  删除确认弹窗 -->
			<div class="centered comfirmDelete" v-show="comfirmDelete">
				<div class="close" @click="cancelClose('apiData')">
					<span class="icon-wrong"></span>
				</div>
				<div class="centeredPadding">
					<div class="centeredTitle">删除提示</div>
					<p class="deleteTips">将会删除该条API,是否删除?</p>
					<div class="twoBtn">
						<input type="button" class="btnfour" value="确定" @click="delApiOne(apiID)" />
						<div class="cancelRight btnfour" @click="cancelClose('apiData')">取消</div>
					</div>
				</div>
			</div>
			<!-- 高级认证中间跳转到普通认证 -->
			<div class="centered comfirmDelete" v-show="middleJump">
				<div class="close" @click="cancelClose()">
					<span class="icon-wrong"></span>
				</div>
				<div class="centeredPadding">
					<div class="centeredTitle">高级认证</div>
					<p class="deleteTips">您还未进行实名认证,请先进行实名认证</p>
					<div class="twoBtn">
						<input type="button" class="btnfour" value="去认证" @click="jumpApprove()" />
						<div class="cancelRight btnfour" @click="cancelClose()">取消</div>
					</div>
				</div>
			</div>
			
			<!-- 实名认证被驳回需要重新实名认证   -->
			<div class="centered comfirmDelete" v-show="refusemiddleJump">
				<div class="close" @click="cancelClose()">
					<span class="icon-wrong"></span>
				</div>
				<div class="centeredPadding">
					<div class="centeredTitle">高级认证</div>
					<p class="deleteTips">您的实名认证被驳回,请重新进行实名认证</p>
					<div class="twoBtn">
						<input type="button" class="btnfour" value="去认证" @click="refuseApprove()" />
						<div class="cancelRight btnfour" @click="cancelClose()">取消</div>
					</div>
				</div>
			</div>

			<!-- 提示不能进行高级验证 -->
			<div class="centered comfirmDelete" v-show="canNotVerify">
				<div class="close" @click="cancelClose()">
					<span class="icon-wrong"></span>
				</div>
				<div class="centeredPadding">
					<div class="centeredTitle">高级认证</div>
					<p class="deleteTips">因实名认证正在申请中,所以不能进行高级认证。</p>
					<div class="twoBtn" style="width: auto !important;">
						<input type="button" class="btnfour" value="确定" @click="cancelClose()" />
						<div class="cancelRight btnfour" @click="cancelClose()">取消</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../../../api'
	import axios from 'axios'
	import config from '../../../../static/config'
	import resOnline from './../../../../static/configOnline'
	import utils from '../../../utils'
	export default {
		name: 'personalPopover',
		data() {
			const validatePhonenumber = (rule, value, callback) => { // 验证手机号
				if(!value) {
					return callback(new Error('请输入手机号码'));
				} else if(!/^[0-9]{2,20}$/.test(value)) {
					return callback(new Error('手机号格式错误'));
				} else {
					callback();
				}
			};
			const validatPass = (rule, value, callback) => { // 资金密码验证
				if(!value) {
					callback(new Error('请输入资金密码'));
				} else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
					return callback(new Error('请输入5-15位字母数字密码'));
				} else {
					if(this.changePinPassword.pswTwo != '') {
						this.$refs.changePinPsd.validateField('pswTwo');
					}
					callback();
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('请再次输入密码'));
				} else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
					return callback(new Error('请输入5-15位字母数字密码'));
				} else if(value != this.changePinPassword.psw) {
					return callback(new Error('两次密码不一致'));
				} else {
					callback();
				}
			};
			const validatPassPin = (rule, value, callback) => {

				if(!value) {
					callback(new Error('请输入新登录密码'));
				} else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
					return callback(new Error('请输入5-15位字母数字密码'));
				} else {
					if(this.changeLoginPasswords.newpswagain != '') {
						this.$refs.changeLoginPsd.validateField('newpswagain');
					}
					callback();
				}
			};
			const validatPassOld = (rule, value, callback) => {
				if(!value) {
					callback(new Error('输入原始登录密码'));
				} else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
					return callback(new Error('请输入5-15位字母数字密码'));
				} else {
					callback();
				}
			}
			const validatePassCheckPin = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('请再次输入密码'));
				} else if(value != this.changeLoginPasswords.newpsw) {
					return callback(new Error('两次密码不一致'));
				} else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
					return callback(new Error('请输入5-15位字母数字密码'));
				} else {
					callback();
				}
			};
			const validateipAddress = (rule, value, callback) => {
				if(value != "") {
					if(/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(value)) {
						callback();
					} else {
						return callback(new Error('请输入正确的IP地址'));
					}
				} else {
					callback();
				}
			}
			const validateidCard = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('请输入你的证件号码'))
				} else if(this.IDtype == "1") {
					if(/^[A-Za-z0-9]{4,20}$/.test(value)) {
						callback();
					} else {
						return callback(new Error('请输入正确的护照'));
					}
				} else if(this.IDtype == "2") {
					if(value.length == 18) {
						if(this.IdentityCodeValid(value)) {
							callback();
						} else {
							return callback(new Error('请输入正确的证件号码'))
						}
					} else {
						return callback(new Error('请输入正确的证件号码'))
					}
				}
			}
			const validateipTips = (rule, value, callback) => {
				if(!value) {
					callback();
				} else {
					if(value.length > 40) {
						return callback(new Error('最大长度为40位'));
					} else {
						callback();
					}
				}
			}
			const codePass = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('请输入验证码'));
				} else {
					if(/^[0-9]+$/.test(value)) {
						callback();
					} else {
						return callback(new Error('请输入正确的数字验证码'))
					}
				}
			}
			return {
				//账号的信息111
				accountBigDatas: {},
				//性别
				sexDatas: {
					male: "1"
				},
				//简介
				briefIntroDatas: {
					data: ''
				},
				realLoading: false,
				briefIntroRules: {
					data: [{
						required: true,
						message: this.$t('message.Login.PleaseEnters'),
						trigger: 'blur'
					}]
				},
				//生日的年月日
				birthDatas: {
					yearNum: '',
					monthNum: '',
					dayNum: ''
				},
				birthRules: {
					yearNum: [{
						required: true,
						message: this.$t('message.OTCOrder.Choose'),
						trigger: 'change'
					}],
					monthNum: [{
						required: true,
						message: this.$t('message.OTCOrder.Choose'),
						trigger: 'change'
					}],
					dayNum: [{
						required: true,
						message: this.$t('message.OTCOrder.Choose'),
						trigger: 'change'
					}]
				},
				//验证手机号去修改手机
				formTop: {
					input1: ""
				},
				testPhoneRules: {
					input1: [{
						required: true,
						validator: validatePhonenumber,
						trigger: 'blur'
					}]
				},
				//设置修改资金密码
				changePinPassword: {
					psw: "",
					pswTwo: ""
				},
				changePinPsdRules: {
					psw: [{
						required: true,
						validator: validatPass,
						trigger: 'blur'
					}],
					pswTwo: [{
						required: true,
						validator: validatePassCheck,
						trigger: 'blur'
					}]
				},
				//修改登录密码
				changeLoginPasswords: {
					oldpsw: '',
					newpsw: '',
					newpswagain: ''
				},
				changeLoginPsdRules: {
					oldpsw: [{
						required: true,
						validator: validatPassOld,
						trigger: 'blur'
					}],
					newpsw: [{
						required: true,
						validator: validatPassPin,
						trigger: 'blur'
					}],
					newpswagain: [{
						required: true,
						validator: validatePassCheckPin,
						trigger: 'blur'
					}]
				},
				//api密钥note和ip
				secretKeydatas: {
					tips: '',
					ipAddress: ''
				},
				secretKeyRules: {
					tips: [{
						max: 50,
						validator: validateipTips,
						trigger: 'change'
					}],
					ipAddress: [{
						validator: validateipAddress,
						trigger: 'blur'
					}]
				},
				//google的验证信息
				googleTest: {
					testContent: ''
				},
				googleRules: {
					testContent: [{
						validator: codePass,
						trigger: 'blur'
					}]
				},
				//实名认证的name，idCard
				nameApprove: {
					name: '',
					idCard: ''
				},
				nameApproveRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					idCard: [{
						validator: validateidCard,
						trigger: 'blur'
					}]
				},
				//资金验证前的邮箱验证
				pinPasswordBefore: {
					pinAuthCode: ''
				},
				pinPswBeforeRules: {
					pinAuthCode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}]
				},
				//修改设置的手机号码
				phoneNumChange: {
					model9: '+86',
					numberPhone: '',
					numberAuthCode: ''
				},
				phoneNumChangeRules: {
					model9: [{
						required: true,
						message: '请选择',
						trigger: 'click'
					}],
					numberPhone: [{
						validator: validatePhonenumber,
						trigger: 'blur'
					}],
					numberAuthCode: [{
						validator: codePass,
						trigger: 'blur'
					}]
				},
				//二次验证的验证数据
				twiceTestDatas: {
					twiceTestSelect: "",
					secondCode: ""
				},
				twiceTestRules: {
					twiceTestSelect: [{
						required: true,
						message: this.$t(`message.OTCOrder.Choose`),
						trigger: 'change'
					}],
					secondCode: [{
						validator: codePass,
						trigger: 'blur'
					}]
				},
				//二次验证后的switch数据
				threeTestDatas: {
					secondCode: ""
				},
				threeTestRules: {
					secondCode: [{
						validator: codePass,
						trigger: 'blur'
					}]
				},
				//绑定邮箱的数据
				emailBindData: {
					emailNum: "",
					emailCode: ""
				},
				emailBindDataRules: {
					emailNum: [{
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
					emailCode: [{
						validator: codePass,
						trigger: 'blur'
					}]
				},
				// 高级认证中上传图片的3个file和3个src
				file: '',
				file2: '',
				file3: '',
				src: '../../../../static/img/h1.png',
				src2: '../../../../static/img/h2.png',
				src3: '../../../../static/img/h3.png',
				realNameApprove: false,

				huiWai: false,
				tanVariable: "",
				googleTestShow: false,
				centeredShow: false,
				loginPassword: false,
				verifyPhoneNumber: false,
				changePhoneNumber: false,
				fundPasswordSafe: false,
				ResetfundPassword: false,

				advancedVerify: false,
				comfirmDelete: false,
				setBirthday: false,
				briefIntro: false,
				setSex: false,
				changeAvatar: false,
				middleJump: false,
				refusemiddleJump: false,
				twoVerificationJudge: false,
				threeVerificationTest: false,
				bindEmail: false,
				canNotVerify: false,
				// model9: '',
				yearList: [],
				monthsList: [],
				daysList: [],
				yearNum: '',
				monthNum: '',
				dayNum: '',
				areaPhoneNumBefores: [],
				//得到的手机号和国际码
				shoujihao: "",
				internationalCode: "",
				// google的验证信息
				googleQrMessage: {},
				// 高级认证的设定和修改,true为设定高级认证，false为修改高级认证
				advancedVerifySetOrChange: true,
				// 绑定手机号和修改手机号的值,true为绑定手机号，flase为修改手机号
				bindOrChangePhone: true,
				// 修改api和新建api的值,修改api为true,新建API为false
				modifyOrNewApi: true,
				// 绑定资金密码或者重置资金密码，修改为false，绑定为true
				bindOrchangePin: false,
				// 普通认证的设置和修改 修改位false，绑定位true
				realApproveSetOrChang: false,
				// 实名认证中的身份类型的下拉框
				cityList: [{
						value: '1',
						label: '护照'
					},
					{
						value: '2',
						label: '二代身份证'
					}
				],
				secondOrderSelect: [],

				// 实名认证中的真名和证件号码
				IDtype: '2',
				// 手机发送验证码的key
				phone_key: '',
				//倒计时的时间
				count: 60,
				countEmail: 60,
				//二次验证开启关闭的倒计时
				countVerifyP: 60,
				countVerifyE: 60,
				//邮箱手机验证
				loadingCode: false,
				loadingCodeEmail: false,
				//二次验证开启关闭的发送验证码
				loadingCodeTestp: false,
				loadingCodeTeste: false,
				//登录密码时渲染的邮箱
				fundPasswordSafeEmail: "",
				//存放Email的key
				email_key: "",
				//存放头像file
				fileAvatar: "",
				srcAvatar: "",
				acceptData: {},
				apiID: "",
				//计时器
				timerPhone: null,
				timeEmail: null,
				//文件上传
				fileLoading: false,
				cancelDisable: false,
				//二次验证的两个key
				twoTestEmailKey: "",
				twoTestPhoneKey: "",
				//二次验证的计时器
				twiceTestTimerE: null,
				twiceTestTimerP: null,
				urlArr: {
					a: "",
					b: "",
					c: ""
				},
				twiceTestBeforeStatus: "",
				whichTest: "",
				whichTestThreeSelect: "",
				timerOut: null,
				emailCode: 0,
				phoneCode: 0,
				googleCode: 0,
				//绑定邮箱时候的key存放
				emailBindKey: "",
				//绑定邮箱
				loadingCodeLastEmail: false,
				countLastEmail: 60,
				timerLastEmail: null,
				kaiQi: "kaiQi",
				guanBi: "guanBi",
				juluOldYear: "",
				juluOldMonth: "",
				juluOldDate: "",
				nationalFlag: true

			}
		},
		props: {
			Tanone: {
				type: String,
				default: ''
			},
			popoverData: {
				type: Object,
				default: {}
			}
		},
		mounted() {

		},
		methods: {
			//绑定手机的国际吗的点击事件
			langOperate(value) {
				// this.nationalFlag = false;
				this.phoneNumChange.model9 = value;
				this.$refs.phoneNumChangeData.validateField('model9');
			},
			//身份证的校验规则
			IdentityCodeValid: function(code) {
				var city = {
					11: "北京",
					12: "天津",
					13: "河北",
					14: "山西",
					15: "内蒙古",
					21: "辽宁",
					22: "吉林",
					23: "黑龙江 ",
					31: "上海",
					32: "江苏",
					33: "浙江",
					34: "安徽",
					35: "福建",
					36: "江西",
					37: "山东",
					41: "河南",
					42: "湖北 ",
					43: "湖南",
					44: "广东",
					45: "广西",
					46: "海南",
					50: "重庆",
					51: "四川",
					52: "贵州",
					53: "云南",
					54: "西藏 ",
					61: "陕西",
					62: "甘肃",
					63: "青海",
					64: "宁夏",
					65: "新疆",
					71: "台湾",
					81: "香港",
					82: "澳门",
					91: "国外"
				};
				var pass = true;
				if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d{1}|X)?$/i.test(code)) {
					pass = false;
				} else if(!city[code.substr(0, 2)]) {
					pass = false;
				} else {
					//18位身份证需要验证最后一位校验位
					if(code.length == 18) {
						code = code.split('');
						//∑(ai×Wi)(mod 11)
						//加权因子
						var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
						//校验位
						var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
						var sum = 0;
						var ai = 0;
						var wi = 0;
						for(var i = 0; i < 17; i++) {
							ai = code[i];
							wi = factor[i];
							sum += ai * wi;
						}
						var last = parity[sum % 11];
						if(parity[sum % 11] != code[17]) {
							pass = false;
						}
					}
				}
				return pass;
			},
			//点击取消和X关闭窗口
			cancelClose(name) {
				//关闭所有小的弹窗
				this.googleTestShow = false;
				this.centeredShow = false;
				this.loginPassword = false;
				this.verifyPhoneNumber = false;
				this.changePhoneNumber = false;
				this.fundPasswordSafe = false;
				this.ResetfundPassword = false;
				this.realNameApprove = false;
				this.advancedVerify = false;
				this.comfirmDelete = false;
				this.setBirthday = false;
				this.briefIntro = false;
				this.setSex = false;
				this.changeAvatar = false;
				this.middleJump = false;
				this.refusemiddleJump = false
				this.twoVerificationJudge = false;
				this.threeVerificationTest = false;
				this.bindEmail = false;
				this.canNotVerify = false;
				this.nationalFlag = true;
				//关闭大的灰框
				this.$emit('cancelClose', this.huiWai);
				//清空弹窗中之前填写的input数据
				this.file = '';
				this.file2 = '';
				this.file3 = '';
				this.src = '../../../../static/img/h1.png';
				this.src2 = '../../../../static/img/h2.png';
				this.src3 = '../../../../static/img/h3.png';
				this.fileAvatar = "";
				this.srcAvatar = "";
				this.secondOrderSelect = [];
				this.loadingCode = false;
				this.loadingCodeEmail = false;
				this.loadingCodeTestp = false;
				this.loadingCodeTeste = false;
				//实名认证
				this.realLoading = false
				//上传图片的
				this.fileLoading = false;
				this.cancelDisable = false;
				if(name) {
					this.$refs[name].resetFields();
				}
			},
			//点击确定关闭弹窗
			closePopover(name) {
				//关闭所有小的弹窗
				this.googleTestShow = false;
				this.centeredShow = false;
				this.loginPassword = false;
				this.verifyPhoneNumber = false;
				this.changePhoneNumber = false;
				this.fundPasswordSafe = false;
				this.ResetfundPassword = false;
				this.realNameApprove = false;
				this.advancedVerify = false;
				this.comfirmDelete = false;
				this.setBirthday = false;
				this.briefIntro = false;
				this.setSex = false;
				this.changeAvatar = false;
				this.middleJump = false;
				this.refusemiddleJump = false
				this.twoVerificationJudge = false;
				this.threeVerificationTest = false;
				this.bindEmail = false;
				this.canNotVerify = false;
				this.nationalFlag = true;
				//关闭大的灰框
				this.$emit('closepopover', this.huiWai);
				//清空弹窗中之前填写的input数据
				this.file = '';
				this.file2 = '';
				this.file3 = '';
				this.src = '../../../../static/img/h1.png';
				this.src2 = '../../../../static/img/h2.png';
				this.src3 = '../../../../static/img/h3.png';
				this.fileAvatar = "";
				this.srcAvatar = "";
				this.secondOrderSelect = [];
				this.loadingCode = false;
				this.loadingCodeEmail = false;
				this.loadingCodeTestp = false;
				this.loadingCodeTeste = false;
				this.count = 60;
				clearInterval(this.timerPhone);
				this.timerPhone = null;
				//重置计时器的
				clearInterval(this.twiceTestTimerP);
				clearInterval(this.twiceTestTimerE);
				this.twiceTestTimerE = null;
				this.twiceTestTimerP = null;
				this.countVerifyP = 60;
				this.countVerifyE = 60;
				this.loadingCodeTeste = false;
				this.loadingCodeTestp = false;
				// 实名认证
				this.realLoading = false
				//上传图片的
				this.fileLoading = false;
				this.cancelDisable = false;
				this.loadingCodeLastEmail = false;
				this.countLastEmail = 60;
				clearInterval(this.timerLastEmail);
				this.timerLastEmail = null;
				if(name) {
					this.$refs[name].resetFields();
				}
			},
			//绑定邮箱发送邮件验证码
			bindEamilNumberSend(name) {
				this.$refs[name].validateField('emailNum');
				if(this.emailBindData.emailNum) {
					if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.emailBindData.emailNum)) {
						let datass = {
							email: this.emailBindData.emailNum
						}
						this.loadingCodeLastEmail = true;
						api.accountBindEmail(datass).then(res => {
							if(res.status_code == 200) {
								this.timerLastEmail = setInterval(() => {
									if(this.countLastEmail > 0) {
										this.countLastEmail--;
										if(this.countLastEmail == 59) {
											this.loadingCodeLastEmail = false;
										}
									} else {
										clearInterval(this.timerLastEmail);
										this.countLastEmail = 60;
									}
								}, 1000);
								this.emailBindKey = res.data.email_key;
								this.$Message.success('发送成功，请稍候');

							} else {
								this.loadingCodeLastEmail = false;
								this.countLastEmail = 60;
								clearInterval(this.timerLastEmail);
							}
						}).catch(error => {
							this.loadingCodeLastEmail = false;
							this.countLastEmail = 60;
							clearInterval(this.timerLastEmail);

						})
					}
				}
			},

			//当还没实名认证时，高级认证的跳转
			jumpApprove() {
				this.middleJump = false;
				this.realNameApprove = true;
				this.realApproveSetOrChang = true;
			},
			//  当实名认证被驳回的时候，重新进行实名认证
			refuseApprove() {
				this.refusemiddleJump = false;
				this.realNameApprove = true;
				this.realApproveSetOrChang = false
			},
			//上传头像显示到弹窗中
			changeAvatars(ev) {
				let windowURL = window.URL || window.webkitURL;
				let oldFileAvatar = this.fileAvatar;
				this.fileAvatar = ev.target.files[0];
				ev.target.value = "";
				if((this.fileAvatar.size / 1024 / 1024) > 1) {
					this.fileAvatar = oldFileAvatar;
					this.$Message.info("文件大小不能超过1M");
				} else {
//					console.log(this.fileAvatar);
					this.srcAvatar = windowURL.createObjectURL(this.fileAvatar);
//					console.log(this.srcAvatar)
				}

			},
			//把头像给后台
			submitAvatars() {
				if(this.fileAvatar == "") {
					this.$Message.info("请上传新头像");
				} else {
					let instances = axios.create();
					instances.defaults.headers.post['Content-Type'] = 'multipart/form-data';
					instances.defaults.headers['Authorization'] = 'Bearer' + utils.getCookie('token');
					instances.defaults.timeout = 60000;

					let data = new FormData();
					data.append('file', this.fileAvatar);
					data.append('dir', "Avatar")
					
					if(this.$store.state.onLine) {
						instances.defaults.baseURL = resOnline.a;
					} else {
						instances.defaults.baseURL = config.a;
					}
					this.fileLoading = true;
					this.cancelDisable = true;
					instances.post('file', data).then(res => {
						instances.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
						if(res.data.file_path) {
							
							let fileUrlBefore = "";
							if(this.$store.state.onLine) {
								fileUrlBefore = this.$store.state.FileOnline
							} else {
								fileUrlBefore = config.fileUrl;
							}
//							console.log(res.data.file_path, '传头像');

							
							let url = fileUrlBefore + res.data.file_path;
							let datas = {
								user_avatar: url
							};

							api.changeBasicData(datas).then(res => {

								if(res.status_code == 200) {

									this.$Message.success('成功');
									this.fileLoading = false;
									this.cancelDisable = false;
									this.$emit('datasReturn', datas);
									this.cancelClose(name);
								} else {
									this.fileLoading = false;
									this.cancelDisable = false;

								}

							}).catch(error => {
								this.$Message.error('上传失败');
								this.fileLoading = false;
								this.cancelDisable = false;
							})
						} else if(res.data.status_code == 5010) {
							this.fileLoading = false;
							this.cancelDisable = false;
						} else {
							this.$Message.error('上传失败');
							this.fileLoading = false;
							this.cancelDisable = false;
						}
					}).catch(error => {
						this.fileLoading = false;
						this.cancelDisable = false;
						this.$Message.error('上传失败');
						instances.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

					})
				}
			},

			//关闭api后刷新api列表
			apiClose(name) {
				this.centeredShow = false;
				this.comfirmDelete = false;
				let apiGuanbi = "apiGuanbi"
				this.$emit('closepopover', apiGuanbi);
				if(name) {
					this.$refs[name].resetFields();
				}

			},
			//api的删除的确认
			delApiOne(data) {
				let pams = {
					user_access_id: data
				}
				api.deleteApi(pams).then(res => {
					if(res.status_code == 200) {
						this.$Message.success(this.$t('message.Succeed'));
						this.apiClose('apiData');
					}
				})
			},

			// 高级验证 把file获取到的图片显示页面中
			fileChange(ev, numb) {
				// 通过file获取图片并显示
				let windowURL = window.URL || window.webkitURL;
				if(numb == "0") {

					let old_file = this.file;
					this.file = ev.target.files[0];
					
					var file_addre = this.file.name

					var index1=file_addre.lastIndexOf(".");
					var index2=file_addre.length;
					var suffix=file_addre.substring(index1+1,index2);
					suffix = suffix.toLowerCase()
//					console.log(suffix)
					
					ev.target.value = "";
					if(suffix == 'png' || suffix=='jpg' || suffix=='jpeg') {
						if((this.file.size / 1024 / 1024) > 5) {
							this.file = old_file;
							this.$Message.info('上传图片大小不能超过5M');
							return false;
						}
	
						if(this.file.size === this.file2.size || this.file.size === this.file3.size) {
							this.$Message.info('不要上传相同的图片');
							this.file = old_file;
							return false;
						}
	
						this.src = windowURL.createObjectURL(this.file);
					}else {
						this.$Message.error('图片格式错误!');
						return false;
					}

					

				} else if(numb == "1") {

					let old_file2 = this.file2;
					this.file2 = ev.target.files[0];
					
					var file_addre = this.file2.name
					var index1=file_addre.lastIndexOf(".");
					var index2=file_addre.length;
					var suffix=file_addre.substring(index1+1,index2);
					suffix = suffix.toLowerCase()
					
					ev.target.value = "";
					
					if(suffix == 'png' || suffix=='jpg' || suffix=='jpeg') {
					
						if((this.file2.size / 1024 / 1024) > 5) {
							this.file2 = old_file2;
							this.$Message.info('上传图片大小不能超过5M');
							return false;
						}
	
						if(this.file2.size === this.file.size || this.file2.size === this.file3.size) {
							this.$Message.info('不要上传相同的图片');
							this.file2 = old_file2;
							return false;
						}
	
						this.src2 = windowURL.createObjectURL(this.file2);
					}else {
						this.$Message.error('图片格式错误!');
						return false;
					}

				} else if(numb == "2") {

					let old_file3 = this.file3;
					this.file3 = ev.target.files[0];
					
					var file_addre = this.file2.name

					var index1=file_addre.lastIndexOf(".");
					var index2=file_addre.length;
					var suffix=file_addre.substring(index1+1,index2);
					suffix = suffix.toLowerCase()
					
					ev.target.value = "";
					
					if(suffix == 'png' || suffix=='jpg' || suffix=='jpeg') {
						if((this.file3.size / 1024 / 1024) > 5) {
							this.file3 = old_file3;
							this.$Message.info('上传图片大小不能超过5M');
							return false;
						}
	
						if(this.file3.size === this.file.size || this.file3.size === this.file2.size) {
							this.$Message.info('不要上传相同的图片');
							this.file3 = old_file3;
							return false;
						}
	
						this.src3 = windowURL.createObjectURL(this.file3);
					}else{
						this.$Message.error('图片格式错误!');
						return false;
					}

				}
			},
			// 高级验证 把file获取的图片提交给后台
			submitPic(ev) {
				if(this.file != "" && this.file2 != "" & this.file3 != "") {
					this.fileLoading = true;
					this.cancelDisable = true;
					let instance = axios.create();
					instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
					instance.defaults.headers['Authorization'] = 'Bearer' + utils.getCookie('token');
					instance.defaults.timeout = 60000;

					const domain = window.location.origin;
					if(domain.indexOf('localhost') == -1) {
						instance.defaults.baseURL = resOnline.a;
					} else {
						instance.defaults.baseURL = config.a;
					}
					let fileArr = [this.file, this.file2, this.file3];
					// this.urlArr = [];
					const domai = window.location.origin;
					let beforeAdd = "";
					if(this.$store.state.onLine) {
						beforeAdd = this.$store.state.FileOnline;
					} else {
						beforeAdd = config.fileUrl;
					}
					let data0 = new FormData();
					data0.append('file', fileArr[0]);
					data0.append('dir', "Avatar");
					let data1 = new FormData();
					data1.append('file', fileArr[1]);
					data1.append('dir', "Avatar");
					let data2 = new FormData();
					data2.append('file', fileArr[2]);
					data2.append('dir', "Avatar");
					for(let i = 0; i < 3; i++) {

						let data = null
						if(i == 0) {
							data = data0;
						} else if(i == 1) {
							data = data1;
						} else if(i == 2) {
							data = data2;
						}

						instance.post('file', data).then(res => {
							if(res.data.file_path) {
								let url = beforeAdd + res.data.file_path;
								if(i == 0) {
									this.urlArr.a = url;
								} else if(i == 1) {
									this.urlArr.b = url;
								} else if(i == 2) {
									this.urlArr.c = url;
								}
								let sizeLength = 0;
								for(let key in this.urlArr) {
									if(this.urlArr[key] != '') {
										sizeLength++
									}
								}
								if(sizeLength == 3) {
									if(this.urlArr.a != "" && this.urlArr.b != "" && this.urlArr.c != "") {
										instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
										let datasss = {
											identification_front_img: this.urlArr.a,
											identification_reverse_img: this.urlArr.b,
											identification_hand_img: this.urlArr.c
										}
										if(this.advancedVerifySetOrChange) {
											api.highApprove(datasss).then(res => {
												if(res.status_code == 200) {
													this.urlArr = {
														a: "",
														b: "",
														c: ""
													};
													this.$Message.success(this.$t('message.Succeed'));
													this.closePopover();
													this.fileLoading = false;
													this.cancelDisable = false;
												} else {
													this.fileLoading = false;
													this.cancelDisable = false;
												}
											})
										} else {
											api.changeHighApprove(datasss).then(res => {
												if(res.status_code == 200) {
													this.urlArr = {
														a: "",
														b: "",
														c: ""
													};
													this.$Message.success(this.$t('message.Succeed'));
													this.closePopover();
													this.fileLoading = false;
													this.cancelDisable = false;
												} else {
													this.fileLoading = false;
													this.cancelDisable = false;
												}
											})
										}
									}
								}
								data.append('file', "");
								data.append('dir', "");
							} else if(res.data.status_code == 5010) {
								this.fileLoading = false;
								this.cancelDisable = false;
								instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
							} else {
								this.fileLoading = false;
								this.cancelDisable = false;
								instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
								this.$Message.error(this.$t('message.UploadFailed'));
							}
						}).catch(error => {
							this.fileLoading = false;
							this.cancelDisable = false;
							instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
							this.$Message.error(this.$t('message.UploadFailed'));
						})
					}
					instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				} else {
					this.$Message.info(this.$t('message.accountSet.ConsummateBbeforeUpload'));
				}
			},
			// 高级验证 清空file和src的数据(重新上传)
			againUpload() {
				this.file = '';
				this.file2 = '';
				this.file3 = '';
				this.src = '';
				this.src2 = '';
				this.src3 = '';
				this.$Message.info(this.$t('message.Succeed'));
			},
			// 实名认证的接口（设置）;
			realNameAuthentication(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.realLoading = true
						console.log(this.realLoading)
						let params = {
							identification_name: this.nameApprove.name,
							identification_type: this.IDtype,
							identification_code: this.nameApprove.idCard
						}
						api.realNameAuthentication(params).then(res => {
							if(res.status_code == 200) {
								this.$Message.success("提交成功");
								this.closePopover(name);
//								this.advancedVerify = true
//								this.Tanone = 'advancedVerify'
								this.realLoading = false
							}else {
								this.realLoading = false
							}
						}).catch(error => {
							this.realLoading = false
						})
					}
				})
			},
			//修改实名认证的接口
			changeRealNameAuth(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.realLoading = true
						let params = {
							identification_name: this.nameApprove.name,
							identification_type: this.IDtype,
							identification_code: this.nameApprove.idCard
						}
						api.changerealNameAuthentic(params).then(res => {
							if(res.status_code == 200) {
								this.$Message.success('提交成功');
								this.closePopover(name);
								this.realLoading = false
							}else {
								this.realLoading = false
							}
						}).catch(error => {
							this.realLoading = false
						})
					}
				})
			},
			//一开始绑定手机号的接口(先验证key和验证码再绑定手机号)
			bindPhoneNumber(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(this.phone_key) {
							let params = {
								verification_code: this.phoneNumChange.numberAuthCode,
								verification_key: this.phone_key,
								phone_number: this.phoneNumChange.numberPhone,
								phone_idd: this.phoneNumChange.model9
							}
							//验证通过进行绑定
							api.bindPhoneNumber(params).then(res => {
								if(res.status == 5002) {
									this.phoneNumChange.numberAuthCode = "";
									this.phoneNumChange.numberPhone = "";
									this.phone_key = "";
								} else if(res.status_code == 200) {
									this.$Message.success('操作成功');
									let datas = {
										phone_status: 1
									}
									this.$emit('datasReturn', datas)
									this.closePopover(name);
									this.phone_key = "";
								} else if(res.status_code == 6001) {
									this.loadingCode = false;
									this.nationalFlag = true;
									this.phone_key = "";
									clearInterval(this.timerPhone);
									this.count = 60;
									this.changePhoneNumber = false;
									this.$refs[name].resetFields();
									this.emailCode = 0;
									this.phoneCode = 0,
										this.googleCode = 0,
										this.secondOrderSelect = [];
									if(res.data.email == "email") {
										this.emailCode = 1;
									}
									if(res.data.phone == "phone") {
										this.phoneCode = 1;
									}
									if(res.data.google == "google") {
										this.googleCode = 1;
									}
									this.twiceTestBeforeStatus = "createPhone";
									this.twoVerificationJudge = true;
								} else if(res.status_code == 5003) {
									this.$Message.error(this.$t('message.Login.VerifiCodeError'));
								}
							})

						} else {
							this.$Message.info(this.$t('message.accountSet.PGetVerificaCode'));
						}
					}
				})
			},
			//修改手机号的接口(xxx)
			exchangePhoneNumber(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(this.phone_key) {
							let datas = {
								phone_number: this.phoneNumChange.numberPhone,
								phone_idd: this.phoneNumChange.model9,
								verification_code: this.phoneNumChange.numberAuthCode,
								verification_key: this.phone_key
							}
							//先验证手机验证码和key值才能进行绑定
							api.updatePhoneNumber(datas).then(res => {
								if(res.status_code == 200) {
									this.$Message.success('操作成功');
									this.cancelClose(name);
									this.phone_key = "";
								} else if(res.status_code == 5003) {
//									this.$Message.error('验证码错误！');
								}
							})
						} else {
							this.$Message.info('请获取验证码');
						}
					}
				})
			},
			//手机验证码的发送控制(给手机号得到key和验证码)
			telephone_code(name) {
				this.$refs[name].validateField('numberPhone');
				this.$refs[name].validateField('model9');
				let paramss = {
					phone_number: this.phoneNumChange.numberPhone,
					phone_idd: this.phoneNumChange.model9
				}
				if(paramss.phone_idd) {

					if(paramss.phone_number) {
						if(/^[0-9]{2,20}$/.test(paramss.phone_number)) {
							this.loadingCode = true;
							api.send_phone_authCode_Account(paramss).then(res => {
								if(res.status_code == 200) {
									this.timerPhone = setInterval(() => {
										if(this.count > 0) {
											this.count--;
											if(this.count == 59) {
												this.loadingCode = false;
											}
										} else {
											clearInterval(this.timerPhone);
											this.count = 60;
										}
									}, 1000);
									this.phone_key = res.data.verification_key;
									this.$Message.success('发送成功，请稍候');
								} else {
									this.loadingCode = false;
								}
							}).catch(error => {
								this.loadingCode = false;
							})
						} else {
							this.loadingCode = false;
						}
					} else {
						this.loadingCode = false;
					}

				} else {
					this.loadingCode = false;
				}

			},
			//修改绑定手机号的时候要获取手机号码和国际码(xxx)
			testPhoneNumber() {
				//先获取到手机号码和国际码
				api.getPhoneNumber().then(res => {
					if(res.status_code == 200) {
						this.shoujihao = res.data.phone_number;
						this.internationalCode = res.data.phone_idd;
					}
				}).catch(res => {
				})
			},
			//修改手机的第一个验证弹窗判断你是否本人,是否知道手机号(xxx)
			nextPhoneNumber(name) {
				// 修改手机号的内部弹窗跳转
				this.$refs[name].validate((valid) => {
					if(valid) {
						let data = {
							phone_number: this.formTop.input1,
							phone_idd: this.internationalCode
						}
						api.testPhoneNumber(data).then(res => {
							if(res.status_code == 200) {
								this.verifyPhoneNumber = false;
								this.changePhoneNumber = true;
								this.bindOrChangePhone = false;

								this.internationalCode = "";
								this.formTop.input1 = "";
								this.shoujihao = "";

								this.$Message.success('验证通过');
							}
						})
					}
				})
			},
			// 修改登录密码(直接提交3个密码写接口)
			changeLoginPassword(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						let data = {
							old_password: this.changeLoginPasswords.oldpsw,
							new_password: this.changeLoginPasswords.newpsw,
							new_password_confirmation: this.changeLoginPasswords.newpswagain
						}
						api.changeLoginPassword(data).then(res => {
							if(res.status_code == 200) {
								this.$Message.success(this.$t('message.Succeed'));
								this.cancelClose(name);
							} else if(res.status_code == 6001) {
								this.$refs[name].resetFields();
								this.loginPassword = false;
								this.emailCode = 0;
								this.phoneCode = 0,
									this.googleCode = 0,
									this.secondOrderSelect = [];
								if(res.data.email == "email") {
									this.emailCode = 1;
								}
								if(res.data.phone == "phone") {
									this.phoneCode = 1;
								}
								if(res.data.google == "google") {
									this.googleCode = 1;
								}
								this.twiceTestBeforeStatus = "updatePass";
								this.twoVerificationJudge = true;

							}
						})
					}
				})
			},
			//设定国际码需要的参数
			internationalCodeSet() {

				if(this.areaPhoneNumBefores.length == 0) {
					api.internationalCodeGet().then(res => {
						if(res.status_code == 200) {
							this.areaPhoneNumBefores = res.data.list;
						}
					})
				}
			},
			// 年份的变化
			yearChange(data) {
			}
		},
		watch: {
			Tanone: function(val) {
				// 数据变的时候触发
				// 根据不同的AccountSetting来的参数，来进行不同的弹窗跳转
				//		this.Tanone = val;
				if(this.Tanone != -1) {
					if(this.Tanone == "changeApi") { //修改api
						// 这里是修改api,弹的是新建密钥
						this.centeredShow = true;

						this.modifyOrNewApi = true;
					} else if(this.Tanone == "realNameApprove") { //实名认证的设置
						this.realNameApprove = true;

						this.realApproveSetOrChang = true;
					} else if(this.Tanone == "advancedVerify") { //设定高级认证
						//开始高级认证
						this.advancedVerify = true;
						this.advancedVerifySetOrChange = true;
					} else if(this.Tanone == "comfirmDelete") { //删除api列表的某一条
						this.comfirmDelete = true;

					} else if(this.Tanone == "changeNameApprove") { //修改普通实名认证
						this.realNameApprove = true;

						this.realApproveSetOrChang = false;
					} else if(this.Tanone == "changeAvatar") { //设置改变头像
						this.changeAvatar = true;

					} else if(this.Tanone == "changeadvancedVerify") { //修改高级认证
						//修改高级认证
						this.advancedVerify = true;
						this.advancedVerifySetOrChange = false;
					} else if(this.Tanone == "middleJump") { //没实名认证前，点高级认证中转这里
						this.middleJump = true;
					} else if(this.Tanone == "refusemiddleJump") { //提示实名认证被驳回  要进行重新实名认证
						this.refusemiddleJump = true;
					} else if(this.Tanone == "canNotVerify") { //提示不能进行高级认证
						this.canNotVerify = true;
					}
					this.$emit('reset', this.ranVariable);
				}
			},
			popoverData: function(val) { //拿到accountSetting传过来的数据
				if(val) {
					this.acceptData = val;
					if(this.acceptData.access_key) { //api数据
						//api的信息
						this.apiID = this.acceptData.user_access_id;
						this.secretKeydatas.tips = this.acceptData.note;
						this.secretKeydatas.ipAddress = this.acceptData.allow_ip;
						this.$emit('resetData', this.acceptData);
					} else if(this.acceptData.statusThree) {
						let statusArr = [this.acceptData.email_status, this.acceptData.phone_status, this.acceptData.google_status];
						let orderSelect = [{
								value: "1",
								label: this.$t('message.EmailVeri')
							},
							{
								value: "2",
								label: this.$t('message.PhoneVeri')
							},
							{
								value: "3",
								label: this.$t('message.GGVeri')
							}
						]
						for(let k = 0; k < statusArr.length; k++) {
							if(statusArr[k] != 0) {
								this.secondOrderSelect.push(orderSelect[k]);
							}
						}
						this.twiceTestBeforeStatus = this.acceptData.statusThree;
						this.$emit('resetData', this.acceptData);
					} else if(this.acceptData.user_avatar) { //头像数据
						//头像
						this.srcAvatar = this.acceptData.user_avatar;
					} else if(this.acceptData.briefIntro) { //简介数据
						this.briefIntroDatas.data = this.acceptData.briefIntro ? this.acceptData.briefIntro : "";
					} else if(this.acceptData.setBirthday) { //生日数据
						this.birthDatas.yearNum = this.acceptData.setBirthday.substring(0, 4);
						this.birthDatas.monthNum = parseInt(this.acceptData.setBirthday.substring(5, 7)).toString();
						this.birthDatas.dayNum = parseInt(this.acceptData.setBirthday.substring(8)).toString();
					} else if(this.acceptData.setSex) { //性别数据
						//性别
						this.sexDatas.male = this.acceptData.setSex ? this.acceptData.setSex.toString() : "1";
					}
				}
			},
		},
		computed: {
			encryptPhoneNumber: function() {
				let phoneNumber = this.shoujihao;
				let jiamihou = phoneNumber.substr(0, 3) + "*****" + phoneNumber.substr(8);
				return jiamihou;
			}
		}
	}
</script>

<style>

</style>