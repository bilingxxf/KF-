<template>
	<div class="baseInfo accountInfoZfway">
		<div class="baseInfo-middle">
			<div class="zf-way">
				<div class="zf-way-threeMain">
					<p class="title">支付方式</p>
					<p class="right-title" @click="showDialog">
						<span class="span-word">+ 添加</span>
					</p>
					<p class="threeMain-ts">请务必使用您本人的实名账户，被激活的支付方式将在交易时向对方展示</p>
					<div style="clear: both;"></div>
					<ul class="zf-way-ul" v-if="data.length>0">
						<li class="zf-way-ul-list" v-for="list in data">
							<div>
								<span :class="{'icon-pay':list.pay_type=='alipay'?true:false}"></span>
								<span :class="{'icon-paypal':list.pay_type=='paypal'?true:false}"></span>
								<span :class="{'icon-card':list.pay_type=='bank'?true:false}"></span>
								<span :class="{'icon-wechat-pay':list.pay_type=='wechatpay'?true:false}"></span>
							</div>
							<div class="zf-way-ul-listWay">{{list.pay_type=='alipay'?$t(`message.AliPay`):list.pay_type=='paypal'?'paypal':list.pay_type=='bank'?$t(`message.Bank`):$t(`message.WeChat`)}}</div>
							<div class="zf-way-ul-listContent">{{list.pay_name}}</div>
							<div class="zf-way-ul-listName">{{list.account_name}}</div>
							<div>
								<i-switch v-model="list.account_status==1?true:false" @on-change="Modify(list)" :disabled="Modify_disabled"></i-switch>
							</div>
							<div class="zf-way-ul-listOperate" @click="resetBtn(list.pay_type,list.pay_id)">修改</div>
						</li>
					</ul>
					<div class="no-pay-method" v-else>您暂时没有添加任何支付方式</div>
				</div>

				<!--修改弹框-->
				<div class="add-zf-ways" v-show="ShowTwo">
					<div class="add-zf-waysMain add-zf-margin">
						<span class="icon-wrong" @click="ShowTwo = false"></span>
						<p>修改支付方式</p>
						<div class="zf-ul">
							<div class="zf-ul-li" style="border: none;">
								<Form :model="formValidate" :rules="ruleValidate" ref="formValidate">
									<FormItem prop="pay_name">
										<label>支付方式</label>
										<Input v-model="formValidate.payWay" readonly></Input>
									</FormItem>
									<!--用户真实姓名-->
									<FormItem prop="username">
										<label>姓名</label>
										<Input v-model="formValidate.account_name" class="relName" readonly></Input>
									</FormItem>

									<!--支付宝账号-->
									<FormItem prop="alipay_account_name" v-if="formValidate.pay_name == 'Alipay'" >
										<label>支付宝账号</label>
										<input type="hidden" v-model="formValidate.user_account_alipay_id" />
										<Input v-model="formValidate.alipay_account_name" placeholder="请输入支付宝账号"></Input>
									</FormItem>

									<!--微信账号-->
									<FormItem prop="wechatpay_account" v-if="formValidate.pay_name == 'Wechatpay'">
										<label>微信账号</label>
										<input type="hidden" v-model="formValidate.user_account_wechatpay_id" />
										<Input v-model="formValidate.wechatpay_account" placeholder="请输入微信账号"></Input>
									</FormItem>

									<!--开户银行-->
									<FormItem prop="bank_name" v-if="formValidate.pay_name == 'Bank'">
										<label>开户银行</label>
										<Input v-model="formValidate.bank_name" placeholder="请输入银行卡账号"></Input>
									</FormItem>

									<!--银行卡开户支行-->
									<FormItem prop="bank_branch" v-if="formValidate.pay_name == 'Bank'">
										<label>开户支行</label>
										<Input v-model="formValidate.bank_branch" placeholder="请输入开户行地址"></Input>
									</FormItem>

									<!--银行卡账号-->
									<FormItem prop="bank_code" v-if="formValidate.pay_name == 'Bank'">
										<label>银行卡账号</label>
										<input type="hidden" v-model="formValidate.user_account_bank_id" />
										<Input v-model="formValidate.bank_code" placeholder="请输入银行卡账号"></Input>
									</FormItem>

									<!--Paypal-->
									<FormItem prop="paypal_account" v-if="formValidate.pay_name == 'PayPal'">
										<label>paypal账号</label>
										<input type="hidden" v-model="formValidate.user_account_paypal_id" />
										<Input v-model="formValidate.paypal_account" placeholder="请输入PayPal账号"></Input>
									</FormItem>

									<!--支付宝二维码-->
									<FormItem prop="alipay_qrcode" v-if="formValidate.pay_name == 'Alipay'">
										<label style="margin: 0 0 0.25rem 0;">二维码</label>
										<!--<Input v-model="formValidate.alipay_qrcode" placeholder=""></Input>-->
										<div class="upload_file">
											<Upload ref="upload" :on-exceeded-size="beyondsize" :max-size='5120' :before-upload="handleUpload" :show-upload-list='false' :action='uploadUrl' :format="['jpg','png']" enctype="multipart/form-data" :on-format-error="handleFormatError" :on-success="progress" :data="uploadData">
												<Button style="position: relative;height: 2.5rem;" type="ghost">{{aliCodeDesWord}}</Button>
											</Upload>
											<Upload ref="upload" :on-exceeded-size="beyondsize" :max-size='5120' :before-upload="handleUpload" :show-upload-list='false' :action='uploadUrl' :format="['jpg','png']" enctype="multipart/form-data" :on-format-error="handleFormatError" :on-success="progress" :data="uploadData">
												<div style="height: 5rem;" v-show="src!=''">
													<img class="ali-pay-code" :src="src"/>
												</div>
											</Upload>
										</div>
									</FormItem>
									<!--微信二维码-->
									<FormItem prop="wechatpay_qrcode" v-if="formValidate.pay_name == 'Wechatpay'">
										<label>二维码</label>
										<!--<Input v-model="formValidate.wechatpay_qrcode" placeholder=""></Input>-->
										<div class="upload_file">
											<Upload ref="upload" :on-exceeded-size="beyondsize" :max-size='5120' :before-upload="handleUpload" :show-upload-list='false' :action='uploadUrl' :format="['jpg','png']" enctype="multipart/form-data" :on-format-error="handleFormatError" :on-success="progress" :data="uploadData">
												<Button style="position: relative;height: 2.5rem;" type="ghost">{{webCodeDesWord}}</Button>
											</Upload>
											<Upload ref="upload" :on-exceeded-size="beyondsize" :max-size='5120' :before-upload="handleUpload" :show-upload-list='false' :action='uploadUrl' :format="['jpg','png']" enctype="multipart/form-data" :on-format-error="handleFormatError" :on-success="progress" :data="uploadData">
												<div style="height: 5rem;" v-show="src!=''">
													<img class="ali-pay-code" :src="src"/>
												</div>
											</Upload>
										</div>
									</FormItem>

									<!--资金密码-->
									<FormItem prop="password">
										<label>资金密码</label>
										<Input type="password" v-model="formValidate.password" placeholder="请输入资金密码"></Input>
									</FormItem>
									<div class="twoBtn">
										<Button type="primary" @click="editBtn()">确定</Button>
										<span class="cancel_Btn_span" @click="ShowTwo = false" style="cursor:pointer">取消</span>
									</div>
								</Form>

							</div>
						</div>
					</div>
				</div>

				<!--添加弹框-->
				<div class="add-zf-ways" v-show="show">
					<div class="add-zf-waysMain add-zf-margin">
						<span class="icon-wrong" @click="show = false"></span>
						<p>添加支付方式</p>
						<div class="zf-ul">
							<div class="zf-ul-li" style="border: none;">
								<label >支付方式</label>
								<Select style="margin: 0;" v-model="way" @on-change="changWay">
									<Option value="Wechatpay">微信</Option>
									<Option value="Alipay">支付宝</Option>
									<Option value="Bank">银行卡</Option>
									<Option value="PayPal">paypal</Option>
								</Select>
								<label>姓名</label>
								<Input v-model="account_name" class="relName name" readonly></Input>

								<Form :model="addForm" :rules="ruleValidate" ref="addForm">
									<!--支付宝账号-->
									<FormItem prop="alipay_account_name" v-if="this.way == 'Alipay'">
										<label>支付宝账号</label>
										<Input v-model="addForm.alipay_account_name" placeholder="请输入支付宝账号"></Input>
									</FormItem>

									<!--微信账号-->
									<FormItem prop="wechatpay_account" v-if="this.way == 'Wechatpay'">
										<label>微信账号</label>
										<Input v-model="addForm.wechatpay_account" placeholder="请输入微信账号"></Input>
									</FormItem>

									<!--paypal账号-->
									<FormItem prop="paypal_account" v-if="this.way == 'PayPal'">
										<label>paypal账号</label>
										<Input v-model="addForm.paypal_account" placeholder="请输入PayPal账号"></Input>
									</FormItem>

									<!--开户银行-->
									<FormItem prop="bank_name" v-if="this.way == 'Bank'">
										<label>开户银行</label>
										<Input v-model="addForm.bank_name" placeholder="请输入开户银行"></Input>
									</FormItem>

									<!--开户支行-->
									<FormItem prop="bank_branch" v-if="this.way == 'Bank'">
										<label>开户支行</label>
										<Input v-model="addForm.bank_branch" placeholder="请输入开户行地址"></Input>
									</FormItem>
									
									<!--银行卡账号-->
									<FormItem prop="bank_code" v-if="this.way == 'Bank'">
										<label>银行卡账号</label>
										<Input v-model="addForm.bank_code" placeholder="请输入银行卡账号"></Input>
									</FormItem>

									<!--支付宝二维码-->
									<FormItem prop="alipay_qrcode" v-show="this.way == 'Alipay'">
										<label>二维码</label>
										<!--<input  placeholder="" type="hidden"/>-->
										<div class="upload_file">
											<Upload ref="upload" :on-exceeded-size="beyondsize" :max-size='5120' :before-upload="handleUpload" :show-upload-list='false' :action='uploadUrl' :format="['jpg','png']" enctype="multipart/form-data" :on-format-error="handleFormatError" :on-success="progress" :data="uploadData">
												<Button type="ghost" style="position: relative;height: 2.5rem;padding: 1rem 0;">{{codeDesWord}}</Button>
											</Upload>
											<Upload ref="upload" :on-exceeded-size="beyondsize" :max-size='5120' :before-upload="handleUpload" :show-upload-list='false' :action='uploadUrl' :format="['jpg','png']" enctype="multipart/form-data" :on-format-error="handleFormatError" :on-success="progress" :data="uploadData">
												<div v-show="src!=''" style="height: 5rem;">
													<img :src="src" class="ali-pay-code"/>
												</div>
											</Upload>
											
										</div>
									</FormItem>
									<!--微信二维码-->
									<FormItem prop="wechatpay_qrcode" v-show="this.way == 'Wechatpay'">
										<label>二维码</label>
										<div class="upload_file">
											<Upload ref="upload" :on-exceeded-size="beyondsize" :max-size='5120' :before-upload="handleUpload" :show-upload-list='false' :action='uploadUrl' :format="['jpg','png']" enctype="multipart/form-data" :on-format-error="handleFormatError" :on-success="progress" :data="uploadData">
												<Button type="ghost" style="position: relative;height: 2.5rem;">{{codeDesWord}}</Button>
											</Upload>
											<Upload ref="upload" :on-exceeded-size="beyondsize" :max-size='5120' :before-upload="handleUpload" :show-upload-list='false' :action='uploadUrl' :format="['jpg','png']" enctype="multipart/form-data" :on-format-error="handleFormatError" :on-success="progress" :data="uploadData">
												<div v-show="src!=''" style="height: 5rem;">
													<img :src="src" class="ali-pay-code"/>
												</div>
											</Upload>
										</div>
									</FormItem>

									<!--资金密码-->
									<FormItem prop="pin">
										<label>资金密码</label>
										<Input type="password" v-model="addForm.pin" placeholder="请输入资金密码"></Input>
										<p class="set_small_word" v-show="small_tips">您还未设置资金密码，前去
											<router-link to="/accountSettings"><span class="set_smallBtn">资金密码</span></router-link>
										</p>
									</FormItem>
									<div class="twoBtn">
										<Button type="primary" @click="addBtn()" :disabled="toggle">确定</Button>
										<span class="cancel_Btn_span" @click="show = false" style="cursor:pointer">取消</span>
									</div>
								</Form>

							</div>
						</div>
					</div>
				</div>
				<!--是否认证-->
				<!--未进行实名认证时弹框-->
				<div class="tempModel-undo" v-show="undoTemp">
					<div class="tempModel-undo-main">
						<p>认证提示</p>
						<span class="icon-wrong" @click="doTemp_cancel"></span>
						<div style="clear: both;"></div>
						<p>您还没有实名认证，请先进行实名认证</p>
						<!--您还没有实名认证，请先进行实名认证-->
						<div style="clear:both;"></div>
						<div class="btnAsset">
							<router-link to="/accountSettings"><span class="sure_btn" @click="doTemp_sureBtn">确定</span></router-link>
							<span class="fou_btn" @click="doTemp_cancel">取消</span>
						</div>
					</div>
				</div>
				<!--申请中-->
				<div class="tempModel-undo" v-show="undoTemp_sq">
					<div class="tempModel-undo-main">
						<p>认证提示</p>
						<span class="icon-wrong" @click="doTemp_cancel"></span>
						<div style="clear: both;"></div>
						<p>实名认证申请中，无法添加支付方式</p>
						<!--实名认证申请中，无法添加支付方式-->
						<div style="clear:both;"></div>
						<div class="btnAsset">
							<span class="sure_btn" @click="doTemp_sureBtn">确定</span>
							<span class="fou_btn" @click="doTemp_cancel">取消</span>
						</div>
					</div>
				</div>
				<!--驳回-->
				<div class="tempModel-undo" v-show="undoTemp_bh">
					<div class="tempModel-undo-main">
						<p>认证提示</p>
						<span class="icon-wrong" @click="doTemp_cancel"></span>
						<div style="clear: both;"></div>
						<p>实名认证被驳回，无法添加支付方式，请重新认证</p>
						<!--实名认证被驳回，无法添加支付方式，请重新认证-->
						<div style="clear:both;"></div>
						<div style=""></div>
						<div class="twoBtn">
							<span class="sure_btn right" @click="doTemp_sureBtn">确定</span>
							<span class="fou_btn right" @click="doTemp_cancel">取消</span>
						</div>
						
					</div>
				</div>
				<!--通过-->

			</div>
		</div>

	</div>
</template>

<script>
	import api from '../../api'
	import axios from 'axios'
	import res from '../../../static/config'
	import Online from '../../../static/configOnline'
	export default {
		data() {
			const validateBack = function(rule, value, callback) {
				if(/\s+/g.test(value)) {
					return callback(new Error('不能输入空格'));
				} else if(!value) {
					// return callback(new Error(this.$t('message.accountSet.PleaseEnterBankA')));
					return callback(new Error('请输入银行卡账号'));
				} else if(!/^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18})$/.test(value)) {
					//return callback(new Error(this.$t('message.accountSet.PleaseEnterCorrBank')))
					return callback('银行卡号不正确')
				} else {
					callback();
				}
			};
			const alipayAccount = function(rule, value, callback) {
				if(/\s+/g.test(value)) {
					return callback(new Error('不能输入空格'));
				} else if(!value) {
					//return callback(new Error(this.$t('message.accountSet.PleaseEnterCorrBank')))
					return callback(new Error('请输入支付宝账号'));
				} else {
					callback();
				}
			};
			const wechatpayAccount = function(rule, value, callback) {
				if(/\s+/g.test(value)) {
					return callback(new Error('不能输入空格'));
				} else if(!value) {
					//return callback(new Error(this.$t('message.accountSet.PleaseEnterCorrBank')))
					return callback(new Error('请输入微信账号'));
				} else {
					callback();
				}
			};
			const paypalAccount = function(rule, value, callback) {
				if(/\s+/g.test(value)) {
					return callback(new Error('不能输入空格'));
				} else if(!value) {
					//return callback(new Error(this.$t('message.accountSet.PleaseEnterCorrBank')))
					return callback(new Error('请输入paypal账号'));
				} else {
					callback();
				}
			};
			return {
				Modify_disabled: false,
				uploadModal: true,
				uploadData: {},
				activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
				uploadUrl: '',
				toggle: false,
				small_tips: false,
				qrcode: {
					code: '请上传您的收款二维码图片(#jpg/#png)',
				},
				codeDesWord: '请上传您的收款二维码图片(#jpg/#png)',
				webCodeDesWord: '微信二维码(可点击重新上传)',
				aliCodeDesWord: '支付宝二维码(可点击重新上传)',
				ShowTwo: false,
				show: false,
				undoTemp: false,
				undoTemp_sq: false,
				undoTemp_bh: false,
				data: [],
				formValidate: {
					payWay: ''
				},
				addForm: {
					alipay_account_name: '',
					wechatpay_account: '',
					paypal_account: '',
					bank_name: '',
					bank_branch: '',
					bank_code: '',
					pin: '',
					timerOut: null
				},
				way: 'Alipay',
				wayMethods: '',
				account_name: '',
				ruleValidate: {

					//  支付宝账号
					alipay_account_name: [{
						required: true,
						validator: alipayAccount,
						trigger: 'blur'
					}],
					//  微信账号
					wechatpay_account: [{
						required: true,
						validator: wechatpayAccount,
						trigger: 'blur'
					}],
					// paypal账号
					paypal_account: [{
						required: true,
						validator: paypalAccount,
						trigger: 'blur'
					}],
					// 银行卡账号
					bank_code: [{
						required: true,
						validator: validateBack,
						trigger: 'blur'
					}],

					// 开户银行
					bank_name: [{
						required: true,
						message: '请输入开户银行',
						trigger: 'blur'
					}],
					// 开户支行
					bank_branch: [{
						required: true,
						message: '请输入开户行地址',
						trigger: 'blur'
					}],
					pin: [{
						required: true,
						message: '请输入资金密码',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '资金密码不能为空',
						trigger: 'blur'
					}]
				},
				newId: 0,
				alipayfileUrl: '',
				wechatpayfileUrl: '',
				codeUrl: '',
				uploadList: [],
				src: ''
			}
		},
		methods: {
			progress(response, file, fileList) {
				const domain = window.location.origin;
				this.codeUrl =  response.file_path;
				if(this.$store.state.onLine) {
					this.src = this.$store.state.FileOnline + this.codeUrl;
				} else {
					this.src = res.img + this.codeUrl;
				}
				this.alipayfileUrl = this.src
				this.wechatpayfileUrl = this.src
//				console.log(this.src)
			},
			handleFormatError(file) {
				this.$Message.error('上传图片格式错误，格式为jpg，png');
				if(this.src == '') {
					this.toggle = true;
					this.qrcode.code = undefined;
				}else {
					this.toggle = false;
					this.qrcode.code = undefined;
				}
				
			},
			beyondsize(file, fileList) {
				this.$Message.error('超出上传大小(5M)');
				this.qrcode.code = undefined;
				this.toggle = true;
			},
			handleUpload(file) {
				this.qrcode = file;
				this.qrcode.code = file.name;
				this.codeDesWord = '点击可更换或编辑二维码'
				this.toggle = false;
//				const domain = window.location.origin;
//				console.log(domain);
				if(this.$store.state.onLine) {
					this.uploadUrl = Online.a + 'file';
				} else {
					this.uploadUrl = res.a + 'file';
				}
//				console.log(this.uploadUrl)
				// this.uploadUrl =res.a+'file' ;
				this.uploadData = {
					abc: file
				};
				
				let promise = new Promise((resolve) => {
					this.$nextTick(function() {
						resolve(true);
					});
				});
				return promise; //通过返回一个promis对象解决
			},
			//***获取用户所有的支付方式 接口
			getAllWay() {
				api.getAllWay().then(res => {
//					console.log(res, 'i')
					this.data = res.data;
				}).catch(error => {
					console.log(error)
				})
			},
			Modify(val_info) { //启用禁用
				// this.Modify_disabled = false;
				//   alert(val_info.account_status)
				if(!this.Modify_disabled) {
					this.Modify_disabled = true;
					let state = val_info.account_status == 1 ? 2 : 1;
					let p = {
						pay_name: val_info.pay_type,
						pay_id: val_info.pay_id,
						account_status: state,
					};
					api.Modify(p).then(res => {
							if(res.status_code == 200) {
								// val_info.account_status = state;
								this.$Message.success('状态更改成功');

								this.timerOut = setTimeout(() => {
									this.Modify_disabled = false
								}, 1000);
							}
						})
						.catch(error => {
							console.log(error);
						})
				}

			},
			resetBtn(pay_type, pay_id) { //列表修改
				this.wayMethods = pay_type
				console.log(this.formValidate.pay_name)
				this.$refs['formValidate'].resetFields();
				const vm = this;
				this.ShowTwo = true;
				this.newId = pay_id;
				let params = {
					pay_name: pay_type,
					pay_id: pay_id
				};
				api.Payment(params).then(res => {
//					console.log(res)
					if(res.status_code == 200) {
						vm.alipayfileUrl = res.data.alipay_qrcode;
						vm.wechatpayfileUrl = res.data.wechatpay_qrcode;
						vm.formValidate = res.data;
						if(pay_type == 'wechatpay') {
							vm.formValidate.payWay = '微信';
							vm.qrcode.code = res.data.wechatpay_qrcode;
							this.src = res.data.wechatpay_qrcode;
						} else if(pay_type == 'alipay') {
							vm.formValidate.payWay = '支付宝';
							vm.qrcode.code = res.data.alipay_qrcode;
							this.src = res.data.alipay_qrcode;
						} else if(pay_type == 'bank') {
							vm.formValidate.payWay = '银行卡';
						} else if(pay_type == 'paypal') {
							vm.formValidate.payWay = 'PayPal';
						}
					} else {
						console.log(error);
					}
				}).catch(error => {
					console.log(error);
				})
			},
			editBtn() { //列表修改确认
				this.$refs['formValidate'].validate((valid) => {
					if(valid) {
						if(this.formValidate.pay_name == 'Alipay') {
							//let fd = new FormData();
							if(this.qrcode.code == this.alipayfileUrl) {
								let data = {
									alipay_id: this.newId,
									account_name: this.formValidate.account_name,
									alipay_account_name: this.formValidate.alipay_account_name,
									pin: this.formValidate.password,
									alipay_qrcode: this.alipayfileUrl
								};
								api.putApliay(data).then(res => {
									if(res.status_code == 200) {
										setTimeout(() => {
											this.getAllWay();
										}, 1000);
										this.ShowTwo = false;
										this.$Message.success('修改成功')
									} else if(res.status_code === 5017) {
										// this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'))
									} else if(res.status_code == 5016) {
										// this.$Message.error('资金密码未设置!')
									}
								}).catch(error => {
									console.log("error")
								});
							} else {
								const domain = window.location.origin;
								let twocode = "";
								if(this.$store.state.onLine) {
									twocode = this.$store.state.FileOnline;
								} else {
									twocode = res.fileUrl;
								}
								let url = twocode + this.codeUrl;
								let data = {
									alipay_id: this.newId,
									account_name: this.formValidate.account_name,
									alipay_account_name: this.formValidate.alipay_account_name,
									pin: this.formValidate.password,
									alipay_qrcode: url
								};
								api.putApliay(data).then(res => {
//									console.log(res);
									if(res.status_code == 200) {
										setTimeout(() => {
											this.getAllWay();
										}, 1000);
										this.ShowTwo = false;
										this.$Message.success('修改成功')

									}
								}).catch(error => {
									console.log("error")
								});
							}
						} else if(this.formValidate.pay_name == 'Wechatpay') {
							//let fd = new FormData();
							if(this.qrcode.code == this.wechatpayfileUrl) {
								let data = {
									wechatpay_id: this.newId,
									account_name: this.formValidate.account_name,
									wechatpay_account: this.formValidate.wechatpay_account,
									pin: this.formValidate.password,
									wechatpay_qrcode: this.wechatpayfileUrl
								};
								api.putwei(data).then(res => {
									if(res.status_code == 200) {
										setTimeout(() => {
											this.getAllWay();
										}, 1000);
										this.ShowTwo = false;
										this.$Message.success('修改成功')
									} else if(res.status_code === 5017) {
										// this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'))
									} else if(res.status_code == 5016) {
										// this.$Message.error('资金密码未设置!')
									} 
								}).catch(error => {
									console.log("error")
								});
							} else {
								const domain = window.location.origin;
								let twocode = "";
								if(this.$store.state.onLine) {
									twocode = this.$store.state.FileOnline;
								} else {
									twocode = res.fileUrl;
								}
								let url = twocode + this.codeUrl;
								let data = {
									wechatpay_id: this.newId,
									wechatpay_account: this.formValidate.wechatpay_account,
									account_name: this.formValidate.account_name,
									pin: this.formValidate.password,
									wechatpay_qrcode: url
								};
								api.putwei(data).then(res => {
									if(res.status_code == 200) {
										setTimeout(() => {
											this.getAllWay();
										}, 1000);
										this.ShowTwo = false;
										this.$Message.success('修改成功')

									} else if(res.status_code === 5017) {
										// this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'))
									} else if(res.status_code == 5016) {
										// this.$Message.error('资金密码未设置!')
									}
								}).catch(error => {
									console.log("error")
								});
							}
						} else if(this.formValidate.pay_name == 'Bank') {
							let params = {
								bank_id: this.formValidate.user_account_bank_id,
								account_name: this.formValidate.account_name,
								bank_name: this.formValidate.bank_name,
								bank_branch: this.formValidate.bank_branch,
								bank_code: this.formValidate.bank_code,
								pin: this.formValidate.password,
							};
							api.updateBank(params).then(res => {
								if(res.status_code == 200) {
									this.$Message.success(this.$t(`message.EditSuccess`));
									this.ShowTwo = false;
									setTimeout(() => {
										this.getAllWay();
									}, 1000);
								} else if(res.status_code == 5017) {
									// this.$Message.error('资金密码错误！');
								} else if(res.status_code == 5016) {
									// this.$Message.error('资金密码未设置!')
								}
							}).catch(err => {
								this.$Message.info('修改失败!');
							})
						} else if(this.formValidate.pay_name == 'PayPal') {
							let params = {
								paypal_id: this.formValidate.user_account_paypal_id,
								account_name: this.formValidate.account_name,
								paypal_account: this.formValidate.paypal_account,
								pin: this.formValidate.password,
							};
							api.updateaypal(params).then(res => {
								if(res.status_code == 200) {
									this.$Message.success(this.$t(`message.EditSuccess`));
									this.ShowTwo = false;
									setTimeout(() => {
										this.getAllWay();
									}, 1000);
								} else if(res.status_code == 5017) {
									// this.$Message.error('资金密码错误！');
								} else if(res.status_code == 5016) {
									// this.$Message.error('资金密码未设置!')
								}
							}).catch(err => {
								this.$Message.info('修改失败!');
							})
						}
					}
				})
			},
			showDialog() { //添加支付方式
				this.$refs['addForm'].resetFields();
				this.src = ''
				this.qrcode.code = '请上传您的收款二维码图片(#jpg/#png)';
				api.jbpzMessage().then(res => {
					if(res.data.identification_name) {
						if(res.data.identification_status == 1) {
							this.undoTemp_sq = true;
						} else if(res.data.identification_status == 2) {
							this.undoTemp_bh = true;
						} else if(res.data.identification_status == 3 && res.data.pin!='') {
							this.show = true;
							//这里要把真实姓名放到该input框里
							this.account_name = res.data.identification_name;
							if(res.data.pin) {
								this.small_tips = false;
							} else {
								this.small_tips = true;
							}
						}else {
							this.$Message.error('请先设置资金密码');
						}

					} else {
						this.undoTemp = true;
					}
				}).catch(error => {
					console.log(error)
				})
			},
			//认证弹框两个按钮
			doTemp_cancel() {
				this.undoTemp = false;
				this.undoTemp_sq = false;
				this.undoTemp_bh = false;
			},
			doTemp_sureBtn() {
				this.undoTemp = false;
				this.undoTemp_sq = false;
				this.undoTemp_bh = false;
			},
			changWay(value) {
				this.$refs['addForm'].resetFields();
				this.qrcode = {};
				this.src = ''
				this.codeDesWord = '请上传您的收款二维码图片(#jpg/#png)'
				this.qrcode.code = this.$t('message.accountSet.UploadYourQR') + '(#jpg/#png)';
				this.addForm.way = value;
			},
			addBtn() { //添加支付方式确认
				this.$refs['addForm'].validate((valid) => {
					if(valid) {
						if(this.way == 'Alipay') {
							if(this.src == '') {
								this.$Message.info('请上传二维码')
							} else {
								const domain = window.location.origin;
								let twocode = "";
								if(this.$store.state.onLine) {
									twocode = this.$store.state.FileOnline;
								} else {
									twocode = res.fileUrl;
								}
								let url = twocode + this.codeUrl;
								let data = {
									account_name: this.account_name,
									alipay_account_name: this.addForm.alipay_account_name,
									pin: this.addForm.pin,
									alipay_qrcode: url
								};
								api.addApliay(data).then(res => {
									if(res.status_code == 200) {
										this.show = false;
										this.$Message.success(this.$t('message.AddSuccess'));
										this.codeDesWord = '请上传您的收款二维码图片(#jpg/#png)'
										this.$refs['addForm'].resetFields();
										this.qrcode = {};
										setTimeout(() => {
											this.getAllWay();
										}, 1000);
									} else if(res.status_code === 5017) {
										// this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'))
									} else if(res.status_code == 5016) {
										// this.$Message.error('资金密码未设置!')
									}
								}).catch(error => {
									console.log("error")
								});
							}
						} else if(this.way == 'Wechatpay') {
							//let fd = new FormData();
							if(this.qrcode.size == undefined) {
								this.$Message.info('请上传二维码')
							} else {
								const domain = window.location.origin;
								let twocode = "";
								if(this.$store.state.onLine) {
									twocode = this.$store.state.FileOnline
								} else {
									twocode = res.fileUrl;
								}
								let url = twocode + this.codeUrl;
								let data = {
									account_name: this.account_name,
									wechatpay_account: this.addForm.wechatpay_account,
									pin: this.addForm.pin,
									wechatpay_qrcode: url
								};
								api.addweiApliay(data).then(res => {
									if(res.status_code == 200) {
										this.show = false;
										this.codeDesWord = '请上传您的收款二维码图片(#jpg/#png)'
										this.$Message.success(this.$t('message.AddSuccess'))
										this.$refs['addForm'].resetFields();
										this.qrcode = {};
										setTimeout(() => {
											this.getAllWay();
										}, 1000);
									} else if(res.status_code === 5017) {
										// this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'))
									} else if(res.status_code == 5016) {
										// this.$Message.error('资金密码未设置!')
									}
								}).catch(error => {
									console.log("error")
								});
							}
						} else if(this.way == 'Bank') {
							let params = {
								account_name: this.account_name,
								bank_name: this.addForm.bank_name,
								bank_branch: this.addForm.bank_branch,
								bank_code: this.addForm.bank_code,
								pin: this.addForm.pin
							};
							api.addbank(params).then(res => {
								if(res.status_code == 200) {
									this.$Message.success('添加成功');
									this.codeDesWord = '请上传您的收款二维码图片(#jpg/#png)'
									this.show = false;
									setTimeout(() => {
										this.getAllWay();
									}, 1000);
									this.$refs['addForm'].resetFields();
								} else if(res.status_code == 5017) {
									// this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'));
								} else if(res.status_code == 5016) {
									// this.$Message.error('资金密码未设置!')
								}
							}).catch(res => {
								this.$Message.error('添加失败');
							})
						} else if(this.way == 'PayPal') {
							let params = {
								account_name: this.account_name,
								paypal_account: this.addForm.paypal_account,
								pin: this.addForm.pin
							};
							api.addpaypal(params).then(res => {
								if(res.status_code == 200) {
									this.$Message.success('添加成功');
									this.show = false;
									setTimeout(() => {
										this.getAllWay();
									}, 1000);
									this.$refs['addForm'].resetFields();
								} else if(res.status_code == 5017) {
									// this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'));
								} else if(res.status_code == 5016) {
									// this.$Message.error('资金密码未设置!')
								}
							}).catch(error => {
								this.$Message.error('添加失败');
							})
						}
					}
				})
			},
		},
		mounted() {
			this.getAllWay();
		}
	}
</script>
<style lang="scss" scoped>
.btnAsset {
	float: right;
	margin-right: 1.5rem;
	/*overflow: hidden;*/
	text-align: center;
	/*width: 100%;*/
	float: right;
	/*border-top: 1px solid #D9D9D9;*/
}
.accountInfoZfway.baseInfo .baseInfo-middle .zf-way .zf-way-threeMain .title {
	color: #fff;
	height: auto;
	padding: 0;
}
.accountInfoZfway.baseInfo .baseInfo-middle .zf-way .zf-way-threeMain .right-title {
	margin: 0;
	
}
.baseInfo {
    width: 100%;
    padding: 0.25rem 0;
    /*background-color: #f4f4f4;*/
    .baseInfo-middle {
        margin: 0 auto;
        /*background-color: #f4f4f4;*/ 
        .basicInformation {
            width: 100%;
            height: 16.15rem;
            /*background: #fff;*/
            border-radius: 0.25rem;
            .basicInformationPadding {
                padding: 0 1rem 2rem;
                width: 100%;
                height: 100%;
                .title {
                    font-size: 0.9rem;
                    color: #333;
                    height: 4rem;
                    padding: 1.5rem 0;
                    line-height: 1rem;
                    width: 100%;
                }
                .basicInformationContent {
                    width: 100%; 
                    height: auto;
                    border: 1px solid #eee;
                    border-radius: 0.15rem;
                    .InformationContentDan {
                        width: 100%;
                        height: 2.55rem;
                        border-bottom: 1px solid #eee;
                        .informationTitle {
                            float: left;
                            height: 2.55rem;
                            line-height: 2.55rem;
                            margin-left: 0.5rem;
                            width: 13.15rem;
                            font-size: 0.7rem;
                            color: #666;
                        }
                        .informationContent {
                            float: left;
                            height: 2.55rem;
                            line-height: 2.55rem;
                            width: 50%;
                            font-size: 0.7rem;
                            color: #333;
                        }
                    }
                    .InformationContentDan:last-child {
                        border-bottom: none;
                    }
                }
            }
        } /* jbxi end */ 
        .baseInfo-second {
            margin-top: 0.5rem;
            height: auto;
            width: 100%;
            background: #fff;
            border-radius: 0.25rem;
            .baseInfo-secondMain {
                padding: 0 1rem 2rem;
                width: 100%;
                height: 100%;
                .title {
                    font-size: 0.9rem;
                    color: #333;
                    height: 4rem;
                    padding: 1.5rem 0;
                    line-height: 1rem;
                    width: 95%;
                    float: left;
                    /*background: url(../../../static/charting_library/static/images/svg/chart/font.svg);*/
                }
                .applyCurrency {
                    display: block;
                    font-size: 0.7rem;
                    color: #333;
                    height: 4rem;
                    line-height: 4rem;
                    cursor: pointer;
                    &:hover {
                        color: #f3ba2f;
                    }
                }
                .baseInfo-ul {
                    width: 100%;
                    /*min-height:12.8rem;*/
                    border: 1px solid #eee;
                    border-radius: 0.15rem;
                    .baseInfo-ul-list {
                        width: 100%;
                        height: 2.55rem;
                        border-bottom: 1px solid #eee;
                        .baseInfo-ul-listTitle {
                            float: left;
                            height: 2.55rem;
                            line-height: 2.55rem;
                            margin-left: 0.5rem;
                            width: 13.15rem;
                            font-size: 0.7rem;
                            color: #666;
                        }
                        .baseInfo-ul-listContent {
                            float: left;
                            height: 2.55rem;
                            line-height: 2.55rem;
                            width: 50%;
                            font-size: 0.7rem;
                            color: #333;
                        }
                    }
                    .baseInfo-ul-list:last-of-type {
                        border-bottom: none;
                    }
                }
            }
            .tempModel-noReal {
                width: 100vw;
                height: 100vh;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                background-color: rgba(0, 0, 0, 0.3);
                z-index: 999;
                .tempModel-undo-main {
                    width: 27rem;
                    height: 13.5rem;
                    background-color: #ffffff;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    border-radius: 0.25rem;
                    p:nth-of-type(1) {
                        font-size: 0.9rem;
                        margin: 2rem 0 1.5rem 2rem;
                        color: #333333;
                        float: left;
                    }
                    p:nth-of-type(2) {
                        font-size: 0.7rem;
                        color: #333333;
                        margin-left: 2rem;
                        display: block;
                    }
                    .icon-wrong {
                        font-size: 1rem;
                        float: right;
                        margin: 1rem 1rem 0 0;
                    }
                    .sure_btn {
                        width: 5rem;
                        height: 2rem;
                        line-height: 2rem;
                        border-radius: 0.25rem;
                        margin: 2.5rem 3rem 2rem 2rem;
                        background-color: #4F69C2;
                        color: #ffffff;
                        display: block;
                        float: left;
                        font-size: 0.7rem;
                        cursor: pointer;
                        text-align: center;
                    }
                    .fou_btn {
                        color: #333333;
                        display: block;
                        float: left;
                        font-size: 0.7rem;
                        margin-top: 2.5rem;
                        text-align: center;
                        cursor: pointer;
                    }
                }
            }
        }   /* 保证金 end */
        .zf-way {
            margin-top: 0.5rem;
            /*min-height: 10.3rem;*/
            width: 100%;
            /*background: #fff;*/
            border-radius: 0.25rem;
            .zf-way-threeMain {
                padding: 0 1rem 0.6rem 1rem;
                width: 100%;
                height: 100%;
                .no-pay-method {
                	text-align: center;
                	color: rgba(255,255,255,.4);
                	padding: 1.5rem 0 0 0;
                }
                .title {
                    font-size: 0.9rem;
                    color: #333;
                    height: 3rem;
                    padding: 1.5rem 0 1rem 0;
                    line-height: 1rem;
                    width: 50%;
                    float: left;
                }
                .right-title {
                    float: right;
                    margin: 1.5rem 0;
                    line-height: 1rem;
                    cursor: pointer;
                    .icon-addCard {
                        font-size: 1rem;
                        vertical-align: middle;
                        margin-right: 0.25rem;
                    }
                    .span-word {
                        vertical-align: center;
                        border: 1px solid #fff;
                        color: #fff;
                        padding: 0.45rem 1.05rem;
                        border-radius: 0.2rem;
                        &:hover {
                            color: #FFC229;
                            border: 1px solid #FFC229;
                        }
                    }
                }
                .threeMain-ts {
                    font-size: 0.8rem;
                    float: left;
                    width: 100%;
                    margin: 1rem 0 0rem 0;
                    padding: 0 0 0.5rem 0;
                    border-bottom: 1px solid #fff;
                }
                .zf-way-ul {
                    width: 100%;
                    height: auto;
                    border-radius: 0.15rem;
                    overflow: hidden;
                    .zf-way-ul-list {
                        width: 100%;
                        height: 3rem;
                        line-height: 3rem;
                        border-bottom: 1px solid #eee;
                        .icon-pay {
                            font-size: 1rem;
                            line-height: 3rem;
                        }
                        .icon-card {
                        	line-height: 3rem;
                        }
                        .icon-wechat-pay {
                        	line-height: 3rem;
                        }
                        .icon-paypal {
                        	line-height: 3rem;
                        }
                        div {
                            float: left;
                        }
                        div:nth-of-type(1) {
                            margin: 0 1rem 0 0.3rem;
                            /*line-height: 2.9rem;*/
                            font-size: 1rem;
                        }
                        div:nth-of-type(2) {
                            width: 10.5rem;
                            line-height: 3rem;
                            font-size: 0.7rem;
                        }
                        div:nth-of-type(3) {
                            font-size: 0.7rem;
                            min-width: 7.5rem;
                            margin-right: 3.75rem;
                        }
                        div:nth-of-type(4) {
                            font-size: 0.7rem;
                            margin-left: 0.4rem;
                        }
                        .zf-way-ul-listOperate {
                            color: #fff;
                            font-size: 0.7rem;
                            float: right !important;
                            margin-right: 1rem;
                            cursor: pointer;
                        }
                        .zf-way-ul-listOperate:hover {
                        	color: #f3ba2f;
                        }
                        div:nth-of-type(5) {
                            float: right !important;
                            margin-right: 0.5rem;
                        }
                    }
                    .zf-way-ul-list:last-of-type {
                        border-bottom: 1px solid #eee;
                    }
                }
            }
            .zf-way-threeMain {
                .zf-way-ul {
                    .zf-way-ul-list {
                        .icon-pay {
                            /*line-height: 0;*/
                        }
                    }
                }
            } /*tempModel-undo**** */
            .tempModel-undo {
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                background-color: rgba(0, 0, 0, 0.3);
                z-index: 999;
                .tempModel-undo-main {
                    width: 27rem;
                    height: 13.5rem;
                    background-color: #ffffff;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    border-radius: 0.25rem;
                    p:nth-of-type(1) {
                        font-size: 0.9rem;
                        margin: 2rem 0 2.5rem 2rem;
                        color: #333333;
                        float: left;
                    }
                    p:nth-of-type(2) {
                        font-size: 0.7rem;
                        color: #333333;
                        margin-left: 2rem;
                        display: block;
                    }
                    .icon-wrong {
                        font-size: 1rem;
                        float: right;
                        margin: 1rem 1rem 0 0;
                    }
                    .sure_btn {
                        width: 5rem;
                        height: 2rem;
                        line-height: 2rem;
                        border-radius: 0.25rem;
                        margin: 2.5rem 1.5rem 2rem 2rem;
                        background-color: #4F69C2;
                        color: #ffffff;
                        display: block;
                        float: left;
                        font-size: 0.7rem;
                        cursor: pointer;
                        text-align: center;
                    }
                    .fou_btn {
                        color: #333333;
                        display: block;
                        float: left;
                        font-size: 0.7rem;
                        margin-top: 2.5rem;
                        text-align: center;
                        cursor: pointer;
                        width: 5rem;
                        height: 2rem;
                        border: 1px solid #D9D9D9;
                        text-align: center;
                        line-height: 2rem;
                        border-radius: 0.2rem;
                    }
                }
            } 
        }  /*zfWay end*/
    }
}


	.zf-way {
		margin-top: 0.5rem;
		min-height: 10.3rem;
		width: 100%;
		/*background: #fff;*/
		border-radius: 0.25rem;
		.zf-way-threeMain {
			/*padding: 0 1rem 2rem;*/
			width: 100%;
			height: 100%;
			.title {
				font-size: 0.9rem;
				/*color: #333;*/
				height: 3rem;
				/*padding: 1.5rem 0 1rem 0;*/
				line-height: 1rem;
				width: 50%;
				float: left;
			}
			.right-title {
				float: right;
				margin: 1.5rem 0;
				line-height: 1rem;
				cursor: pointer;
				.icon-addCard {
					font-size: 1rem;
					vertical-align: middle;
					margin-right: 0.25rem;
				}
				.span-word {
					vertical-align: center;
					&:hover {
						color: #f3ba2f;
					}
				}
			}
			.threeMain-ts {
				font-size: 0.8rem;
				color: #999999;
				float: left;
				width: 100%;
			}
			.zf-way-ul {
				width: 100%;
				height: auto;
				border-radius: 0.15rem;
				.zf-way-ul-list {
					width: 100%;
					height: 3rem;
					line-height: 3rem;
					border-bottom: 1px solid #eee;
					.icon-pay {
						font-size: 1rem;
						line-height: 3rem;
					}
					div {
						float: left;
					}
					div:nth-of-type(1) {
						margin: 0 1rem 0 0.3rem;
						font-size: 1rem;
					}
					div:nth-of-type(2) {
						width: 10rem;
						font-size: 0.7rem;
					}
					div:nth-of-type(3) {
						font-size: 0.7rem;
						min-width: 6.75rem;
						margin-right: 1rem;
					}
					div:nth-of-type(4) {
						font-size: 0.7rem;
						margin-left: 0.4rem;
					}
					.zf-way-ul-listOperate {
						color: #f3ba2f;
						font-size: 0.7rem;
						float: right !important;
						margin-right: 1rem;
						cursor: pointer;
					}
					div:nth-of-type(5) {
						float: right !important;
						margin-right: 0.5rem;
					}
				}
				.zf-way-ul-list:last-of-type {
					border-bottom: 1px solid #eee;
				}
			}
		}
		.zf-way-threeMain {
			.zf-way-ul {
				.zf-way-ul-list {
					.icon-pay {
						line-height: 0;
					}
				}
			}
		} 
		.tempModel-undo {
			width: 100vw;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			background-color: rgba(0, 0, 0, 0.3);
			z-index: 999;
			.tempModel-undo-main {
				width: 27rem;
				height: 13.5rem;
				background-color: #ffffff;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				border-radius: 0.25rem;
				p:nth-of-type(1) {
					font-size: 0.9rem;
					margin: 2rem 0 2.5rem 2rem;
					color: #333333;
					float: left;
				}
				p:nth-of-type(2) {
					font-size: 0.7rem;
					color: #333333;
					margin-left: 2rem;
					display: block;
				}
				.icon-wrong {
					font-size: 1rem;
					float: right;
					margin: 1rem 1rem 0 0;
				}
				.sure_btn {
					width: 5rem;
					height: 2rem;
					line-height: 2rem;
					border-radius: 0.25rem;
					margin: 2.5rem 3rem 2rem 2rem;
					background-color: #4F69C2;
					color: #ffffff;
					display: block;
					float: left;
					font-size: 0.7rem;
					cursor: pointer;
					text-align: center;
				}
				.fou_btn {
					color: #333333;
					display: block;
					float: left;
					font-size: 0.7rem;
					margin-top: 2.5rem;
					text-align: center;
					cursor: pointer;
				}
			}
		} 
	} 
	.twoBtn {
		float: right;
		margin-right: 1.5rem;
	}
</style>