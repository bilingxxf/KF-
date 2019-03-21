<template>
    <div class="withdrawCash withCash">
        <div class="cash-wrap" style="padding-top: 2.4rem;">
            <div class="cash" style="background: transparent;padding-top:0rem;">
                <div class="cash-header" style="margin-bottom: 0rem;display: flex;align-items: center;border-radius: 0rem;">
                    <!--<router-link to="/Moneybag">{{ $t(`message.MoneyBag.MyWallet`) }}</router-link>-->
                    <a href="#">{{coin_name}}提币</a>
                    <router-link v-show="false" tag="a" target="_blank" style="color: #f5b821;margin-left: auto;" class="back go-back" :to="{ path: '/mentionrecord', query: { coin_id: coin_id } }">提币记录</router-link>
                    <!--
                        <a href="#" style="color: ##f5b821;" @click="goBack" class="go-back">提币记录</a>
                    -->
                </div>
                <div class="container" :class="{'contains':  promptUseTag === 0 ? true : false }" style="margin-top:0rem;" ref="container">
                    <div v-show="false" class="title">
                        <span class="width-address">提币到我的钱包地址</span>
                        <router-link style="font-size: 1rem;line-height: " class="widthdraw-record" :to="{path:'/WithdrawRecord', query:{coin_id:coin_id}}" tag="span">提币记录</router-link>
                    </div>
                    <!--<p class="address">提币到我的钱包地址</p>-->
                    <div class="content">
                        <Form ref="withdrawForm" :model="withdrawForm" :rules="rule2">
                            <div class=" alabl avail-blance" style="margin-bottom: 1.75rem;">
                                <span class="left currentFont">可用余额：</span>
                                <p class="balance currentFont">{{available}}
                                    <span> {{coin_name}}</span>
                                </p>
                            </div>
                            <div class="sing-mention-money sing-money">
                                <span class="left currentFont">单笔提币下限：</span>
                                <p class="text-14-fff">{{limittotal}}
                                    <span <!--class="span-USDT" -->{{coin_name}}</span>
                                </p>
                            </div>
                            <!-- 提币地址 -->
                            <div class="lineh-50 margin mention-address">
                                <span style="text-align: left;margin-bottom: 0.65rem;" class="left currentFont">{{coin_name}} 提币地址：</span>
                                <FormItem  prop="address" class="tip long">
                                    <Input class="mention-money" style="width: 40rem;" v-model="withdrawForm.address">
                                    </Input>
                                </FormItem>
                            </div>
                            <!-- 标签地址 currentLabelAddress-->
                            <div v-show="promptUseTag == 1 ? true: false" class="lineh-50 margin mention-address" style="border-bottom: 1px solid #fff;padding-bottom: 2.25rem;">
                                <span style="text-align: left;margin-bottom: 0.65rem;" class="left currentFont">{{ promptTag }}</span>
                                <FormItem prop="labelAddress" class="tip long">
                                    <Input class="mention-money" style="width: 40rem;" v-model="withdrawForm.labelAddress">
                                    </Input>
                                </FormItem>
                            </div>
                            <div class="lineh-50 margin currency " style="margin-bottom: 0.4rem;">
                                <p class="left currentFont" style="width: 100%;">提币数量：</p>
                                <FormItem prop="number" class="tip short">
                                    <Input class="withdraw-width" type="text" v-model="withdrawForm.number" @on-keyup="handlenumber"></Input>
                                </FormItem>
                                <!-- 提示 -->
                                <div class="mention-money-tips">
                                    单笔提币数额超过{{ onedealup }}{{ coin_name }}进入人工审核<br/> 24小时内累计提币超过{{ onedealup }}{{ coin_name }}进入人工审核
                                </div>
                                <span v-show="false" class="margin padding-60" style="font-size: 0.9rem!important;">手续费：</span>
                                <p v-show="false" class="text-14-fff currentFont">{{percent}}
                                    <span class="">{{coin_name}}</span>
                                </p>
                                <!--<div>
								</div>-->
                            </div>
                            <!-- 手续费 -->
                            <div class="lineh-50 margin">
                                <p class="left" style="width: 100%;">手续费：{{ percent }}&nbsp;{{ coin_name }}</p>
                            </div>
                            <!-- 提交 -->
                            <button type="button" :class="{'btnSubmit': promptUseTag === 0 ? true : false }"  class="submit mention-apply" @click="handleSubmit()">提交提币申请</button>
                            <!-- 提币提示 -->
                            <div class="prompt-tops">
                                <h6>温馨提示：</h6>
                                <p>{{ rechargePrompt[0] }}</p>
                                <p>{{ rechargePrompt[1] }}</p>
                                <p>{{ rechargePrompt[2] }}</p>
                            </div>
                            <!-- 提币记录 -->
                            <div v-show="true" class="mention-money-record">
                                <mentionRecord :coinId="coin_id" :name="coin_name"></mentionRecord>
                            </div>
                            <div v-if="false" class="lineh-50 margin">
                                <span class="left">标签：</span>
                                <FormItem class="tip short">
                                    <input type="text" :number='true' v-model="XRP_tag" :maxlength="20"></input>
                                </FormItem>
                            </div>
                            <!-- 选择认证方式 -->
                            <div v-show="verifywind && list != ''" style="z-index: 999" class="select-authMehod">
                                <h2>选择认证方式</h2>
                                <!-- 验证方式 -->
                                <h4>验证方式</h4>
                                <template class="current-select">
                                    <Select size="large" v-model="withdrawForm.verifyway" placeholder="请选择验证方式" @on-open-change="heightchange(withdrawForm.verifyway)" style="width: 23rem;">
                                        <Option v-if="list.email"  value="email">邮箱验证</Option>
                                        <Option v-if="list.phone" value="phone">手机验证</Option>
                                        <Option v-if="list.google" value="google">谷歌验证</Option>
                                    </Select>
                                </template>
                                <!-- 手机验证 -->
                                <template >
                                    <h4 v-show="withdrawForm.verifyway == 'phone'" class="phone-verification">请填写{{ verifyphone }}手机收到的验证码</h4>
                                    <div v-show="withdrawForm.verifyway == 'phone'" :class="{ 'border-warning': myverticaltips, 'border-focus': alreadyFocus }" style="padding-left:1px"  class="verification">
                                        <Input  @on-focus="getFocus" @on-blur="blurFocus" class="input-phone" type="text" v-model="withdrawForm.verifyphone" />
                                        <span @click="sendsms('phone')" class="get-phone-verifi" v-if="countPhone == 60" :loading="loadingPhone" style="line-height: 0.7rem;display: flex;justify-content: center;align-items: center;color:#4F69C2;font-weight: 700">获取验证码</span>
                                        <span v-else class="get-phone-verifi" style="display: flex;justify-content: center;align-items: center;color:#4f69c2;" >重新发送{{countPhone}}s</span>
                                        <h5  v-show="myverticaltips" style="color: #E54C4C">验证码不能为空</h5>
                                    </div>
                                </template>
                                <!-- 邮箱验证 -->
                                <template >
                                    <h4 v-show="withdrawForm.verifyway == 'email'" class="phone-verification">请填写{{ verifyemail }}邮箱收到的验证码</h4>
                                    <div v-show="withdrawForm.verifyway == 'email'" :class="{ 'border-warning': myverticaltips1, 'border-focus': alreadyFocus }" style="padding-left:1px" class="verification">
                                        <Input  @on-focus="getFocus" @on-blur="blurFocus" class="input-phone" type="text" v-model="withdrawForm.verifyemail" />
                                        <span @click="sendsms('email')" class="get-phone-verifi" v-if="countEmail == 60" :loading="loadingPhone" style="line-height: 0.7rem;display: flex;justify-content: center;align-items: center;color:#4F69C2;font-weight: 700">获取验证码</span>
                                        <span v-else class="get-phone-verifi" style="display: flex;justify-content: center;align-items: center;color:#4f69c2;" >重新发送{{countEmail}}s</span>
                                        <h5  v-show="myverticaltips1" style="color: #E54C4C">验证码不能为空</h5>
                                    </div>
                                </template>
                                <!-- 谷歌验证 -->
                                <template >
                                    <h4 v-show="withdrawForm.verifyway == 'google'" class="phone-verification">请填写谷歌收到的验证码</h4>
                                    <div v-show="withdrawForm.verifyway == 'google'" :class="{ 'border-warning': myverticaltips2, 'border-focus': alreadyFocus }" style="padding-left:1px"  class="verification">
                                        <Input  @on-focus="getFocus" @on-blur="blurFocus" ref="ipt" class="input-phone"  type="text" v-model="withdrawForm.sms" />
                                        <h5 v-show="myverticaltips2" style="color: #E54C4C">验证码不能为空</h5>
                                        <!--
                                        <Button @click="sendsms('google')" class="get-phone-verifi" v-if="countPhone == 60" :loading="loadingPhone" type="primary">获取验证码</Button>
                                        <Button v-else class="get-phone-verifi" >重新发送{{countEmail}}</Button>
                                        -->
                                    </div>
                                </template>
                                <!-- 底部 -->
                                <div class="footer-select">
                                    <Button @click="getValidationInfo" style="width: 5rem" type="primary">确定</Button>
                                    <Button @click="closeVertify" class="cancle" style="width: 5rem;margin: 0 1rem">取消</Button>
                                </div>
                                <div @click="closeVertify" class="verifywind-close">x</div>
                            </div>
                            <!-- 资金密码  -->
                                <div v-show="currentMoneyPass" style="z-index: 999" class="select-authMehod money-pass">
                                    <h2>资金密码</h2>
                                    <div>
                                        <h4>请输入您的资金密码</h4>
                                        <Input  v-model="withdrawForm.moneypsw" type="password" />
                                    </div>
                                    <!-- 底部 -->
                                    <div class="footer-select">
                                        <Button @click="getMoneyPass" style="width: 5rem" type="primary">确定</Button>
                                        <Button @click="closeMoneyPass" class="cancle" style="width: 5rem;margin: 0 1rem">取消</Button>
                                    </div>
                                    <div @click="closeMoneyPass" class="verifywind-close">x</div>
                                </div>

                            <!--<p class="p-underinput margin-bottom30">{{coin_name}}提币地址支持比特币BTC格式和以太坊STH ERC20格式</p>-->
                            <div class="margin-top30">
                                <!--(btc格式地址)，{{charge}}<span class="span-USDT">USDT</span>（ETH格式地址)-->
                                </div>
                                <!--<div class="lineh-50 margin-bottom-30">
								<span class="left">资金密码：</span>
								<FormItem prop="moneypsw" class="tip short">
									<Input type="password" v-model="withdrawForm.moneypsw">
									</Input>
								</FormItem>
							</div>-->
                            <!--
                                <div class="lineh-50 margin" v-if="false" style="margin-bottom: 1.5rem;">
                                    <span class="left" style="margin-right: 3rem;">选择验证方式：</span>
                                    <FormItem prop="verifyway" class="tip short withdrawcashselect">
                                        <RadioGroup size="large" v-model="withdrawForm.verifyway" style="width:14.5rem" @on-open-change="heightchange">
                                            <Radio class="radioItem" v-if="list.email" label="email">&nbsp;邮箱验证:{{verifyemail}}</Radio>
                                            <Radio class="radioItem" v-if="list.phone" label="phone">&nbsp;手机验证:{{verifyphone}}</Radio>
                                            <Radio class="radioItem" v-if="list.goole" label="google">&nbsp;谷歌验证</Radio>
                                        </RadioGroup>
                                        <Select v-model="withdrawForm.verifyway" style="width:14.5rem" @on-open-change="heightchange">
                                            <Option v-if="list.email" value="email">邮箱验证</Option>
                                            <Option v-if="list.phone" value="phone">手机验证</Option>
                                            <Option v-if="list.google" value="google">谷歌验证</Option>
                                        </Select>
                                    </FormItem>
                                </div>
                            -->
                            <!--邮箱-->
                            <!--<div v-show="withdrawForm.verifyway == 'email'">
								<div class="lineh-50 margin-bottom-30">
									<span class="left">邮箱：</span>
									<div class="withdrawverifyinfo short">{{verifyemail}}</div>
								</div>
								<div class="lineh-50">
									<span class="left">邮箱验证码：</span>
									<FormItem prop="sms" class="tip short">
										<Input type="text" v-model="withdrawForm.sms">
										</Input>
									</FormItem>
									<Button type="info" class="authCode" @click="sendsms('email')" v-if="countEmail == 60" :loading="loadingEmail">获取验证码</Button>
									<Button type="primary" disabled v-else class="authCode huiCanTbtn">重新发送{{countEmail}}</Button>
								</div>
							</div>-->

                            <!--手机-->
                            <!--
							<div v-show="withdrawForm.verifyway == 'phone'">
								<div class="lineh-50 margin-bottom-30">
									<span class="left">手机号码：</span>
									<div class="withdrawverifyinfo short">{{verifyphone}}</div>
								</div>
								<div class="lineh-50">
									<span class="left">短信验证码：</span>
									<FormItem prop="sms" class="tip short">
										<Input type="text" v-model="withdrawForm.sms">
										</Input>
									</FormItem>
									<Button type="info" class="authCode" @click="sendsms('phone')" v-if="countPhone == 60" :loading="loadingPhone">获取验证码</Button>
									<Button type="primary" disabled v-else class="authCode huiCanTbtn">重新发送{{countPhone}}</Button>
								</div>
							</div>
                            -->
                            <!--谷歌-->
                            <!--
							<div class="lineh-50" v-show="withdrawForm.verifyway == 'google'">
								<span class="left">谷歌验证码：</span>
								<FormItem prop="sms" class="tip short">
									<Input type="text" v-model="withdrawForm.sms">
									</Input>
								</FormItem>
							</div>
                            -->
                        </Form>
                    </div>
                    <!--
                        <p class="footer-des">{{ rechargePrompt }}</p>
                    -->
                </div>
                <!-- 提币记录 -->
                <div v-show="false" class="mention-money-record">
                    <mentionRecord :coinId="coin_id" :name="coin_name"></mentionRecord>
                </div>
            </div>
        </div>
        <div v-show="currentMoneyPass || verifywind" class="mask"></div>
    </div>
</template>


<script>
import api from '../../../api.js'
import mentionRecord from './MentionRecord.vue'
export default {
    name: 'WithdrawCash',
    data() {
        const validatoradd = (rules, value, callback) => {
            if (!value) {
                callback(new Error(this.$t("message.MoneyBag.PleaseEntWithdAccount")));
            } else {
                if (this.coin_name == 'ETH' || this.coin_name == 'MT' || this.coin_name == 'KT' || this.coin_name == 'OMG' || this.coin_name == 'ETC') {
                    if (!/^0x[0-9a-fA-F]+$/.test(value)) {
                        callback(new Error(this.$t('message.MoneyBag.WrongAddress')));
                    } else {
                        callback();
                    }
                } else if (this.coin_name == 'BTC' || this.coin_name == 'USDT' || this.coin_name == 'BCH') {
                    if (!/^1[1-9A-HJ-NP-Za-km-z]+$/.test(value)) {
                        callback(new Error(this.$t('message.MoneyBag.WrongAddress')));
                    } else {
                        callback();
                    }
                } else if (this.coin_name == 'EOS') {
                    if (value.length < 2 || value.length > 32) {
                        callback(new Error(this.$t('message.MoneyBag.WrongAddress')));
                    } else {
                        callback();
                    }
                } else if (this.use_tag == 1) {
                    if (!/[1-9A-HJ-NP-Za-km-z]/.test(value)) {
                        callback(new Error(this.$t('message.MoneyBag.WrongAddress')));
                    } else {
                        callback();
                    }
                } else if (this.coin_name == 'LTC') {
                    if (!/^L[1-9A-HJ-NP-Za-km-z]+$/.test(value)) {
                        callback(new Error(this.$t('message.MoneyBag.WrongAddress')));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            }
        }
        const validatorlabeladd = (rules, value,callback) => {
            if (this.promptUseTag === 1) {
                if (!value) {
                    callback(new Error('请输入标签地址'));
                }else if (value.length > 150) {
                    callback(new Error('请输入150以内的字符串'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        }
        const validatornum = (rules, value, callback) => {
            if (!value || value === 0 || value == '0.') {
                callback(new Error(this.$t('message.MoneyBag.PleaseEnterWithAmount')));
            } else {
                if (value < parseFloat(this.limittotal)) {
                    callback(new Error(this.$t('message.MoneyBag.WithdrawThanLimits')));
                } else {
                    if (Number(value - this.percent <= 0)) {
                        callback(new Error(this.$t('message.MoneyBag.MentionRestrictions')));
                    } else {
                        if (value > parseFloat(this.available)) {
                            callback(new Error(this.$t('message.MoneyBag.ExceedAmount')));
                        }
                        else {
                            callback()
                        }
                    }
                }
            }
        };
        // const validatPassPin = (rule, value, callback) => {
        //     if (!value) {
        //         callback(new Error(this.$t('message.BaseInfo.PleaseEnterTradePsw')));
        //     } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
        //         return callback(new Error(this.$t('message.BaseInfo.EnterFifNumberPsw')));
        //     } else {
        //         callback();
        //     }
        // };
        return {
            disable: false,
            timerSubmit: null,
            currentLabelAddressHide: false,
            labeStage: '',
            verifywind: false,
            onedealup: '',
            onedayup: '',
            coin_id: '',
            finance_id: '',
            //渲染数据
            withdrawinfo: {},
            coin_name: '',
            available: '',
            limittotal: '',
            percent: '',
            charge: '',
            cation_key_email: '',
            cation_key_phone: '', // phone 返回的K（验证码）
            //验证方式
            verifyemail: '',
            verifyphone: '',
            currentVerifi: '',
            list: {},
            currentMoneyPass: false,
            myverticaltips: false,
            myverticaltips1: false,
            myverticaltips2: false,
            loadingEmail: false,
            countEmail: 60,
            timerLastEmail: null,
            loadingPhone: false,
            countPhone: 60,
            timerLastPhone: null,
            alreadyFocus: false,
            withdrawForm: {
                address: '',
                number: '',
                moneypsw: '',
                sms: '',
                verifyway: '',
                labelAddress: '',
                verifyphone: '',
                verifyemail: ''
            },
            rule2: {
                address: [{
                    validator: validatoradd,
                    trigger: 'blur'
                }],
                labelAddress: [{
                    validator: validatorlabeladd,
                    trigger: 'blur'
                }],
                number: [{
                    validator: validatornum,
                    trigger: 'blur'
                }],
                // moneypsw: [{
                //     validator: validatPassPin,
                //     trigger: 'blur'
                // }]
            },
            XRP_tag: '',
            rechargePrompt: '',
            promptTag: '',
            promptUseTag: 0,
            countNumber: 0,
            submitCount: 0,
            isSetMoneyPws: false
        }
    },
    watch: {
        list: function (val) {
            if (val != '') {
                this.rule2.sms = [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'change'
                }]
                this.rule2.verifyway = [{
                    required: true,
                    message: '请选择验证方式',
                    trigger: 'change'
                }]
            }
        },
        XRP_tag() {
            this.XRP_tag = this.XRP_tag.toString().replace(/[^(0-9)]/g, '');
        },
    },
    methods: {
        isFundMoneyPwd() {
            	api.accountSSetting().then(res => {
                    if (res.data.pin) { // 设置过资金密码
                        this.isSetMoneyPws = true;
                    }else { // 设置资金密码
                      this.currentMoneyPass = false;
                        this.verifywind = false;
                        this.$FundPas({
                            success() {
                            },
                            doNothing() {
                                window.history.go(-1);
                            }
                        });
                        this.isSetMoneyPws = false;
                    }
                }, error => {
                    console.log(error);
                });
        },
        handlenumber: function (ev) {
            var value = ev.target.value;
            value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
            value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
            value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入两个小数
            if (value.indexOf(".") < 0 && value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                value = parseFloat(value);
            }
            this.withdrawForm.number = value
            //          this.withdrawForm.number = (value.match(/^\d*(\.?\d{0,8})/g)[0]) || null
            //        this.withdrawForm.number = (this.withdrawForm.number.match(/^\d*(\.?\d{0,8})/g)[0]) || null

        },
        api() {
            // console.log('API');
            if (this.withdrawForm.verifyway == 'phone') {
                this.currentVerifi = this.withdrawForm.verifyphone;
            } else if(this.withdrawForm.verifyway == 'email') {
                this.currentVerifi = this.withdrawForm.verifyemail;
            } else {
                this.currentVerifi = this.withdrawForm.sms;
            }
            // 标签地址 withdrawForm.labelAddress
            if (this.withdrawForm.labelAddress) {
                this.withdrawForm.address = this.withdrawForm.address + '_' + this.withdrawForm.labelAddress;
            }
            // 验证方式
            let params = {
                finance_id: this.finance_id,
                destination_addr: this.withdrawForm.address,
                withdraw_amount: this.withdrawForm.number,
                password: this.withdrawForm.moneypsw, // 资金密码
                cation_code: this.currentVerifi, // 验证码
                cation_type: this.withdrawForm.verifyway
            }
            if (this.withdrawForm.verifyway == 'email') {
                params.cation_key = this.cation_key_email
            } else if (this.withdrawForm.verifyway == 'phone') {
                params.cation_key = this.cation_key_phone
            }
            // if (this.use_tag == 1) {
            //     params.destination_addr = this.withdrawForm.address + '_' + this.XRP_tag
            // }
            api.withdraw(params).then(res => {  // 应该是手机验证码的接口
                this.disable = false
                if (res.status_code == 200) {
                    this.$Message.success(this.$t('message.MoneyBag.WidthdrawSuccessTip'));
                    this.closeMoneyPass();
                    this.$refs['withdrawForm'].resetFields();
                    this.$router.go(-1);
                } else if (res.status_code == 5003) {
                    // 验证码错误!
                    // this.$Message.error(this.$t('message.VerificaCodeError'))
                } else if (res.data.status_code == 5017) {
                    this.currentMoneyPass = true;
                }
            }).catch(error => {
                this.disable = false
            })
        },
        handleSubmit() {
            this.disable = true
            this.$refs['withdrawForm'].validate((valid) => {
                if (valid) {
                    // console.log(valid)//
                    this.verifywind = true;
                    if (this.list != '') {
                    } else {
                        this.currentMoneyPass = true;
                        if (this.withdrawForm.moneypsw) {
                            this.api(); // 没有二次验证
                            this.closeMoneyPass();
                        }
                    }
                } else {
                    this.disable = false
                    this.verifywind = false;
                }
            })
        },
        // 手机验证码
        phoneCo(){
            let params = {
                verification_code: this.withdrawForm.verifyphone,
                // identification: '111_user',
                verification_key: this.cation_key_phone
            }
            // console.log(params);
            api.phoneCodeVerify(params).then(res =>{
                // console.log(res+'手机验证接口');
            })
        },
        // 邮箱验证码
        emailCo() {
            let params = {
                email_code: this.withdrawForm.verifyemail, //邮箱验证码
                email_key:this.cation_key_email// 邮箱的验证关键字
            }
            api.emailCodeVerify(params).then(res => {
                // console.log(res + "邮箱验证接口");
            });
        },
        // 谷歌校验
        googleCo() {
            let params = {
                verify: this.withdrawForm.sms
            };
            api.googleCodeVerify(params).then(res => {
            })
        },
        sendsms(val) { // 获取验证码的方法
            if (val == 'email') {
                this.loadingEmail = true;
                api.sendEmail().then(res => {
                    if (res.status_code == 200) {
                        this.$Message.success('发送成功')
                        this.timerLastEmail = setInterval(() => {
                            if (this.countEmail > 0) {
                                this.countEmail--;
                                if (this.countEmail == 59) {
                                    this.loadingEmail = false;
                                }
                            } else {
                                clearInterval(this.timerLastEmail);
                                this.countEmail = 60;
                            }
                        }, 1000);
                        this.cation_key_email = res.data.email_key
                    } else {
                        this.loadingEmail = false;
                    }
                }).catch(error => {
                    this.loadingEmail = false
                })
            } else if (val == 'phone') {
                this.loadingPhone = true;
                api.twiceTestPhoneSend().then(res => {
                    // console.log(res);
                    if (res.status_code == 200) {
                        this.$Message.success('发送成功')
                        this.timerLastPhone = setInterval(() => {
                            if (this.countPhone > 0) {
                                this.countPhone--;
                                if (this.countPhone == 59) {
                                    this.loadingPhone = false;
                                }
                            } else {
                                clearInterval(this.timerLastPhone);
                                this.countPhone = 60;
                            }
                        }, 1000);
                        this.cation_key_phone = res.data.verification_key // 获取到的验证码key
                    } else {
                        this.loadingPhone = false;
                    }
                }).catch(error => {
                    this.loadingPhone = false
                })
            }
        },
        Info() {
            let params = {
                coin_id: this.coin_id
            }
            api.withdrawInfo(params).then(res => {
                if (res.status_code == 200) {
                    this.onedayup = res.data.withdraw24h_max;
                    this.onedealup = res.data.withdrawone_max;
                    this.finance_id = res.data.finance_id;
                    this.coin_name = res.data.coin_name;
                    this.available = res.data.finance_available;
                    this.limittotal = res.data.finance_upper;
                    this.percent = res.data.finance_rate;
                    this.list = res.data.check_two;
                    this.rechargePrompt = res.data.extract_prompt.split(" ");
                    this.promptTag = res.data.tag;
                    this.promptUseTag = res.data.use_tag;
                    // if (this.list != '') {
                    //     this.$refs['container'].style.height = 900 + 'px'
                    // }
                    this.verifyemail = res.data.check_two.email_info
                    this.verifyphone = res.data.check_two.phone_number
                }
            }).catch(error => {
                console.log(error)
            });
        },
        heightchange() {
            this.myverticaltips = false;
            this.myverticaltips1 = false;
            this.myverticaltips2 = false;
            // console.log(this.withdrawForm.verifyway+'555');
            // this.cation_key = '';
            // this.withdrawForm.sms = '';
            // // this.$refs['withdrawForm'].resetFields()
            // if (this.withdrawForm.verifyway == 'email' || this.withdrawForm.verifyway == 'phone') {
            //     this.$refs['container'].style.height = 960 + 'px'
            // } else if (this.withdrawForm.verifyway == 'google') {
            //     this.$refs['container'].style.height = 960 + 'px'
            // }
        },
        goBack() {
            this.$router.go(-1);
        },
        closeVertify() {
            this.withdrawForm.verifyphone = '';
            this.withdrawForm.verifyemail = '';
            this.withdrawForm.sms = '';
            this.verifywind = false;
            this.currentMoneyPass = false;
            this.myverticaltips2 = false;
            this.myverticaltips1 = false;
            this.myverticaltips = false;
        },
        closeMoneyPass() {
            this.withdrawForm.moneypsw = '';
            this.currentMoneyPass = false;
            this.verifywind = false;
        },
         getValidationInfo() {
              this.submitCount = 0;
            if(this.withdrawForm.verifyway != ''){
                this.countNumber = this.countNumber + 1;
                this.verticalTips = 0;
            if (this.withdrawForm.verifyemail || this.withdrawForm.verifyphone || this.withdrawForm.sms) {
                this.myverticaltips = false;
            } else {
                this.myverticaltips = true;
                this.submitCount++;
                if (this.myverticaltips) {
                } else{
                    this.$Message.error('请获取验证码');
                }
            }
             // 逻辑校验
             if (this.withdrawForm.verifyway == 'phone') {
                    this.withdrawForm.verifyemail = '';
                    this.withdrawForm.sms = '';
                    let pdemo = {
                        verification_key : this.cation_key_phone,
                        verification_code : this.withdrawForm.verifyphone
                    }
                    // console.log(pdemo);
                    api.twicePhoneTestAgain(pdemo).then(res=>{
                        if(res.status_code == 200){ //验证码校验正确
                            this.verifywind = false // 关闭验证弹窗
                            this.currentMoneyPass = true // 资金密码弹窗
                        }else if(res.status_code == 5003){
                            this.$Message.error('手机验证码错误')
                            this.submitCount = 0;
                        }
                        for(let k in res.status_code) {
                            if (k === '4050' &&  this.submitCount != 1  ) {
                                //  this.$Message.error('手机验证码错误')
                                this.myverticaltips = true;
                                this.myverticaltips1 = false;
                                this.myverticaltips2 = false;
                                this.submitCount = 0;
                                 if (!this.withdrawForm.verifyphone) {
                                 } else {
                                     this.myverticaltips = false;
                                     this.$Message.error('手机验证码错误')
                                 }
                                this.myverticaltips = false;
                            }
                            if (!this.withdrawForm.verifyphone) {
                                this.myverticaltips = true;
                            }else {
                                this.myverticaltips = false;

                            }
                             this.submitCount = 0;
                        }

                        // console.log(res);
                        // 5003 验证码错误
                    });
             } else if (this.withdrawForm.verifyway == 'email') {
                    this.withdrawForm.verifyphone = '';
                    this.withdrawForm.sms = '';
                    let pdemo = {
                        email_code: this.withdrawForm.verifyemail,
                        email_key: this.cation_key_email
                    }
                    api.twiceEmailTestAgain(pdemo).then(res => {
                        if(res.status_code == 200){ //验证码校验正确
                            this.verifywind = false // 关闭验证弹窗
                            this.currentMoneyPass = true // 资金密码弹窗
                        }else if(res.status_code == 5003){
                            this.$Message.error('邮箱验证码错误')
                        }
                        for(let k in res.status_code) {
                            if (k === '4050' &&  this.submitCount != 1  ) {
                                //  this.$Message.error('邮箱验证码错误')
                                this.myverticaltips1 = true;
                                this.myverticaltips = false;
                                this.submitCount = 0;
                                if (!this.withdrawForm.verifyemail) {
                                }else {
                                    this.myverticaltips1 = false;
                                    this.$Message.error('邮箱验证码错误')
                                }
                                this.myverticaltips1 = false;
                            }
                            if (!this.withdrawForm.verifyemail) {
                                this.myverticaltips1 = true;
                            }else {
                                this.myverticaltips1 = false;

                            }
                            // this.myverticaltips1 = true;
                            // this.myverticaltips = false;
                             this.submitCount = 0;
                        }
                    });
             } else if(this.withdrawForm.verifyway == 'google') {
                    this.withdrawForm.verifyemail = '';
                    this.withdrawForm.verifyphone = '';
                    let pdemo = {
                        verify:this.withdrawForm.sms
                    }
                    api.twiceGoogleTestAgain(pdemo).then(res => {
                        if(res.status_code == 200){ //验证码校验正确
                            this.verifywind = false // 关闭验证弹窗
                            this.currentMoneyPass = true // 资金密码弹窗
                        }else if(res.status_code == 5003){
                            this.$Message.error('谷歌验证码错误')
                        }
                        for(let k in res.status_code) {
                            if (k === '4050' &&  this.submitCount != 1  ) {
                                //  this.$Message.error('谷歌验证码错误')
                                this.myverticaltips2 = true;
                                this.myverticaltips1 = false;
                                this.myverticaltips = false;
                                this.submitCount = 0;
                                if (!this.withdrawForm.sms) {
                                    this.myverticaltips1 = false;
                                }else {
                                    this.myverticaltips2 = true;
                                    this.$Message.error('谷歌验证码错误')
                                }
                            }
                            if (!this.withdrawForm.sms) {
                                this.myverticaltips2 = true;
                            }else {
                                this.myverticaltips2 = false;

                            }

                             this.submitCount = 0;
                        }
                    });
             } else {
                 this.$Message.error('请输入验证码');
             }
             // ***************************************************************************************
                // 1: 手机的验证方式
                // if(this.withdrawForm.verifyphone == '' && this.withdrawForm.verifyway == 'phone'){ // 当输入框的值为空时
                //     this.$Message.error('请输入验证码')
                //     // console.log('空');
                // }else { // 当输入框的值不为空时
                //     // console.log('不为空');
                //     let pdemo = {
                //         verification_key : this.cation_key_phone,
                //         verification_code : this.withdrawForm.verifyphone
                //     }
                //     // console.log(pdemo);
                //     api.twicePhoneTestAgain(pdemo).then(res=>{
                //         if(res.status_code == 200){ //验证码校验正确
                //             this.verifywind = false // 关闭验证弹窗
                //             this.currentMoneyPass = true // 资金密码弹窗
                //         }else if(res.status_code == 5003){
                //             this.$Message.error('手机验证码错误')
                //         }

                //         // console.log(res);
                //         // 5003 验证码错误
                //     });
                // }
                // // 2: 邮箱验证
                // if (this.withdrawForm.verifyemail == '' && this.withdrawForm.verifyway == 'email') { //邮箱输入框为空
                //     this.$Message.error('请输入验证码')
                // }else {
                //     let pdemo = {
                //         email_code: this.withdrawForm.verifyemail,
                //         email_key: this.cation_key_email
                //     }
                //     api.twiceEmailTestAgain(pdemo).then(res => {
                //         if(res.status_code == 200){ //验证码校验正确
                //             this.verifywind = false // 关闭验证弹窗
                //             this.currentMoneyPass = true // 资金密码弹窗
                //         }else if(res.status_code == 5003){
                //             this.$Message.error('邮箱验证码错误')
                //         }
                //     });
                // }
                // // 3: 谷歌验证
                // if (this.withdrawForm.sms == '' && this.withdrawForm.verifyway == 'google') {
                //     this.$Message.error('请输入验证码');
                // } else {
                //     let pdemo = {
                //         verify:this.withdrawForm.sms
                //     }
                //     api.twiceGoogleTestAgain(pdemo).then(res => {
                //         if(res.status_code == 200){ //验证码校验正确
                //             this.verifywind = false // 关闭验证弹窗
                //             this.currentMoneyPass = true // 资金密码弹窗
                //         }else if(res.status_code == 5003){
                //             this.$Message.error('谷歌验证码错误')
                //         }
                //     });
                // }
            }else {
                this.$Message.error('请选择验证方式');
                this.myverticaltips = false;
            }
            // if (this.cation_key_email || this.cation_key_phone) {
            //     if (this.withdrawForm.verifyway == 'email') {
            //         if (this.cation_key_email == '') {
            //             console.log('FALSE');
            //             this.$Message.error(this.$t('message.accountSet.PGetVerificaCode'))
            //             this.disable = false
            //             this.currentMoneyPass = false;
            //         } else {
            //             this.currentMoneyPass = true;
            //             // this.api()
            //         }
            //     } else if (this.withdrawForm.verifyway == 'phone') {
            //         if (this.cation_key_phone == '') {
            //             this.$Message.error(this.$t('message.accountSet.PGetVerificaCode'))
            //             this.disable = false
            //             this.currentMoneyPass = false;
            //         } else {
            //             this.currentMoneyPass = true;
            //             // this.api()
            //         }
            //     } else if (this.withdrawForm.verifyway == 'google') {
            //         this.currentMoneyPass = true;
            //         // this.api()
            //     }
            //     this.closeVertify();
            //     this.currentMoneyPass = true;
            // } else {
            //     if (!this.withdrawForm.verifyway) { // 请选择验证方式
            //          this.$Message.error('请选择验证方式');
            //     }else {
            //         if (this.withdrawForm.verifyphone) {
            //             this.$Message.error('请输入验证码！');
            //         }
            //     }
            //      this.currentMoneyPass = false;
            // }


        },
        // 设置资金密码
        getMoneyPass() {
            this.verifywind = false;
            if (this.withdrawForm.moneypsw) {
                this.api();
            } else {
                this.$Message.warning('请输入资金密码');
            }
        },
        getFocus() {
            if (this.myverticaltips2 || this.myverticaltips1 || this.myverticaltips) {
            } else {
                this.alreadyFocus = true;
            }
        },
        blurFocus() {
            this.alreadyFocus = false;
            if (this.withdrawForm.sms || this.withdrawForm.verifyphone || this.withdrawForm.verifyemail ) {
                this.myverticaltips2 = false;
                this.myverticaltips1 = false;
                this.myverticaltips = false;
            } else {
                this.myverticaltips2 = this.myverticaltips1 = this.myverticaltips = true;
            }
        }
    },
    components: {
        mentionRecord
    },
    mounted() {
        // this.$FundPas({success: fn, error: fn, doNothing: fn})
        this.coin_id = this.$route.query.coin_id
        // this.verticaltips = 0;
        this.Info()
        this.isFundMoneyPwd()
        /* 判断是否有标签信息 */
        // try {
        //     api.rechargeInfo({ coin_id: this.$route.query.coin_id }).then(res => {
        //         if(res.status_code == 200) {
        //             this.labeStage = res.data.wallet_addr;
        //             console.log(this.labeStage);
        //             if (res.data.wallet_addr.split('_')[1]) {
        //                 console.log(res.data.wallet_addr.split('_')[1]);
        //                 this.currentLabelAddressHide = true;
        //             } else {
        //                 this.currentLabelAddressHide = false;
        //             }
        //         }
        //     }, error => {
        //         console.log(error);
        //     });
        // } catch(error) {
        //     console.log(error);
        // }

    },
    updated() {
    },
};
</script>
<style scoped>
/* 新添加 */

.withdrawCash .cash-header {
  margin-bottom: 1.85rem;
  width: 44rem;
  height: 3rem;
  background: #1d2f6b;
  padding: 0.5rem 1rem 0.6rem 1.6rem;
}
.withdrawCash .cash-header a.go-back {
  float: right;
  color: #fff;
  font-size: 0.9rem;
  margin-right: 0.7rem;
}

.withdrawCash {
  width: 100%;
  height: 100%;
  background: url(../../../../static/img/homeBg.png) no-repeat top center;
  background-size: 100% 100%;
}
.withdrawCash .left {
  font-size: 0.9rem;
}
.withdrawCash .title {
  border-bottom: 1px solid #fff;
  justify-content: space-between;
  padding: 1rem 0 0 0;
}

.withdrawCash .width-address {
  font-size: 0.9rem;
  padding: 0.4rem 0 0 0;
  color: #fff;
}
.withdrawCash .title .widthdraw-record {
  display: inline-block;
  margin: 0 0 1rem 0;
  color: #fff;
  float: right;
  border: 1px solid #ffffff;
  border-radius: 0.1rem;
  width: 4rem;
  height: 1.4rem;
  text-align: center;
  line-height: 1.4rem;
  cursor: pointer;
}
.cash {
  width: 50rem;
  background: #4e5e90;
  padding: 1.5rem 3rem;
}

.cash-wrap {
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 2.95rem 0;
}

.withdrawCash .cash-header a,
.cash-header span {
  color: #fff;
  font-size: 1rem;
}

.withdrawCash .container {
  position: relative;
  width: 100%;
  background: #586a9e;
  box-shadow: 0 1px 0.6rem 0 #2e407b;
  border-radius: 0.1rem;
}

.withdrawCash .mention-money-record {
    width: 100%;
}

.withdrawCash .content {
  padding-top: 1.5rem;
}

.withdrawCash .content .margin {
  /* margin: 1.4rem 0 1.5rem 0; */
  /* margin-bottom: 1.25rem; */
  padding: 0 0.5rem;
}

.withdrawCash .content .sing-mention-money {
  margin-bottom: 0.35rem;
  padding: 0 0.5rem;
}

.withdrawCash .content .mention-money-tips {
  display: inline-block;
  margin-left: 1.5rem;
  padding: 0.3rem 0 0 0.85rem;
  height: 3.25rem;
  width: 16.5rem;
  font-size: 0.6rem;
  color: #fff;
  line-height: 1rem;
}
.withdrawCash .content .validation-wrapper {
  padding-top: 0.75rem;
  width: 35rem;
}

.withdrawCash .content .bottom-border {
  border-bottom: 1px solid #fff;
  padding: 0 0.5rem 1.4rem 0.5rem;
}

.withdrawCash .container .radioItem {
  font-size: 0.9rem;
  font-family: "PingFangSC-Regula";
}
.withdrawCash .container .labelpwd,
.withdrawCash .container .label-verifyway,
.withdrawCash .container .label-phone-number {
  line-height: 2.5rem;
}
.withdrawCash .container .labelpwd {
  /*margin-right: 4.4rem;*/
}
.withdrawCash .container .label-verifyway {
  /*margin-right: 1.75rem;*/
}
.withdrawCash .container .label-phone-number {
  margin-right: 4.4rem;
}
.withdrawCash .container .label-message-auth {
  margin-right: 3.5rem;
}
.withdrawCash .container .label-email {
  /*margin-right: 3.25rem;*/
}
.withdrawCash .container .label-email-auth {
  margin-right: 0.4rem;
}
.withdrawCash .container .label-google-auth {
  margin-right: 3.5rem;
}
.withdrawCash .container .currency {
  margin-top: 0.35rem;
}
.withdrawCash .container .current-phone-number {
  display: inline-block;
  margin-top: 0.5rem;
  padding-left: 0.75rem;
  width: 14.5rem;
  height: 2rem;
  border: 1px solid #fff;
  border-radius: 0.25rem;
  color: #fff;
  box-sizing: border-box;
}

.withdrawCash .footer-des {
  width: 100%;
  color: #fff !important;
  text-align: left;
  margin: 2.5rem 0 0 0;
  padding: 0.7rem 1rem;
  font-family: PingFangSC-Regular;
  text-align: center;
}
.withdrawCash .content .withdraw-width {
  width: 15.3rem;
  height: 2rem;
  line-height: 2rem;
}
.withdrawCash .content .padding-60 {
  padding: 0 0 0 3rem;
}
/* 当前更改 */
.withdrawCash .avail-blance {
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
}
.withdrawCash .content .sing-money {
  display: flex;
  margin-bottom: 2rem;
  align-items: center;
  padding-left: 0.5rem;
  border-bottom: 1px solid #fff;
  padding-bottom: 1.2rem;
}
.withdrawCash .content .mention-address {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.4rem;
}
.withdrawCash .content .mention-number {
  margin-bottom: 1.4rem;
  padding-top: 1.05rem;
  border-top: 1px solid #fff;
}
.withdrawCash .content .mention-password {
  display: flex;
  margin-bottom: 1.4rem;
  margin-top: 3.1rem;
  overflow: hidden;
}
.withdrawCash .content .mention-account {
  margin-bottom: 1.4rem;
  display: flex;
  align-items: center;
}
.withdrawCash .content .mention-code {
  display: flex;
  align-items: center;
}
.withdrawCash .cash-header {
  width: 100%;
}

/* 当前更改 */
.withdrawCash .select-authMehod {
    position: absolute;
    top: 7rem;
    left: 9.35rem;
    width: 26.95rem;
    background: #fff;
    border-radius: 0.5rem;
}
.withdrawCash .select-authMehod h2 {
    margin-top: 2.5rem;
    margin-left: 2rem;
    margin-bottom: 2rem;
    color: #333;
    font-weight: 200;
}
.withdrawCash .select-authMehod h4 {
    margin-left: 2rem;
    margin-bottom: 0.15rem;
    color: #333;
    font-weight: 200;
}
.withdrawCash .select-authMehod .ivu-select {
    margin-left: 2rem;
    height: 2rem;
}
.withdrawCash .select-authMehod .footer-select {
    margin-bottom: 1.35rem;
    padding-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
    margin-top: 2.1rem;
    width: 100%;
    border-top: 1px solid #DEDEDE;
}
.select-authMehod .phone-verification {
    margin-top: 1rem;
}
.withdrawCash .verification {
    position: relative;
    margin-left: 2rem;
    height: 2rem;
    width: 23rem;
    border: 1px solid #dedede;
    border-radius: 0.25rem;
}
.withdrawCash .prompt-tops {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    padding-top: 0.7rem;
    padding-left: 0.7rem;
    width: 100%;
    color: #fff;
    font-size: 0.7rem;
    border-top: 1px solid #fff!important;
}
.withdrawCash .prompt-tops h6 {
    font-size: 0.7rem;
    margin-bottom: 0.6rem;
}
.withdrawCash .prompt-tops p {
    margin-bottom: 0.5rem;
    font-size: 0.5rem;
}
.select-authMehod .verifywind-close {
    position: absolute;
    right: 0.5rem;
    top: 0rem;
    padding: 0.5rem;
    font-size: 1.1rem;
    color: #DEDEDE;
}
.withdrawCash .cash-wrap .currentFont {
    font-size: 0.9rem!important;
}
.withdrawCash .vertical-tips {
    color: red;
    display: block;
}
.withdrawCash .border-warning {
    border-color: #E54C4C;
}
.withdrawCash .border-focus {
    border-color: #62A9F4;
}
.withdrawCash .mask {
    background: rgba(0,0,0,0.4);
    height: 100%;
    width: 100%;
    position: absolute;
    top: -3.5rem;
    z-index: 998;
}
.withdrawCash .container {
    height: 100%;
}
</style>
