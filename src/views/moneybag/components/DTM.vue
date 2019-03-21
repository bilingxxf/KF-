<template>
    <div id="buysellTan">
        <div class="waihui">

            <div class="neikuang Tanchuang3" v-show="DTMfirst">
                <div class="chacha" @click="guanbi(0)">
                    <span class="icon-wrong"></span>
                </div>
                <div class="neikuangPadding">
                    <p class="tanTitleSmall">输入验证码</p>
                    <Form class="dealTwoTest">
                        <FormItem label="验证方式" class="selectTwoTestDeal tip">
                            <Select style="width:23rem" v-model="DTMData.type" placeholder="请选择验证方式">
                                <Option value="1" v-if="DTM.email_status == 2">邮箱验证</Option>
                                <Option value="2" v-if="DTM.phone_status == 2">手机验证</Option>
                                <Option value="3" v-if="DTM.google_status == 2">google验证</Option>

                            </Select>
                        </FormItem>
                        <div class="sendCodeDealCenter" v-show="DTMData.type == 1">
                            <p class="emailTitle">请输入
                                <span>{{DTM.email}}</span>收到的验证码</p>
                            <p class="emailCodeTitle">邮箱验证码</p>
                            <div class="twoBtnAll">
                                <FormItem class="sendCodeAll tip">
                                    <Input type="text" placeholder="请输入邮箱验证码" class="inputLeft" v-model="emailData.codeNumber"></Input>
                                </FormItem>

                                <Button type="info" class="btnSendCode" v-show="emailData.Count == 60" :loading="emailData.Loading" @click="sendCode('email')">发送验证码</Button>
                                <Button type="primary" v-show="emailData.Count != 60" disabled class="btnSendCode changeToHui">重新发送{{emailData.Count}}</Button>

                                <p class="clearAll"></p>
                            </div>
                        </div>
                        <div class="sendCodeDealCenter" v-show="DTMData.type == 2">
                            <p class="emailTitle">请输入
                                <span>{{DTM.phone}}</span>收到的验证码</p>
                            <p class="emailCodeTitle">手机验证码</p>
                            <div class="twoBtnAll">
                                <FormItem class="sendCodeAll tip">
                                    <Input type="text" placeholder="请输入手机验证码" class="inputLeft" v-model="phoneData.codeNumber"></Input>
                                </FormItem>

                                <Button type="info" class="btnSendCode" v-show="phoneData.Count == 60" :loading="phoneData.Loading" @click="sendCode()">发送验证码</Button>
                                <Button type="primary" v-show="phoneData.Count != 60" disabled class="btnSendCode changeToHui">重新发送{{phoneData.Count}}</Button>

                                <p class="clearAll"></p>
                            </div>
                        </div>

                        <div class="sendCodeDealCenter" v-if="DTMData.type == 3">
                            <p class="emailCodeTitle">谷歌验证码</p>
                            <div class="googleAll">
                                <FormItem class="nosendCodeAll tip">
                                    <Input type="text" placeholder="请输入谷歌验证码" class="inputall" v-model="googleCode"></Input>
                                </FormItem>
                            </div>
                        </div>

                    </Form>

                    <!-- <p class="qiXian">有效期限:&nbsp;<span>2 小时</span></p> -->
                    <div class="twoBtn">
                        <button class="btnLeft" @click="sucessDeal">确定</button>
                        <button class="btnRight" @click="guanbi(0)">取消</button>
                    </div>
                </div>
            </div>

            <div class="neikuang TanChuang2" v-show="!DTMfirst">
                <div class="chacha" @click="guanbi(0)">
                    <span class="icon-wrong"></span>
                </div>
                <div class="neikuangPadding">
                    <p class="tanTitleSmall">资金密码</p>
                    <Form :model="passwordData" :rules="pinDataReles" ref="pinDataRef">
                        <div class="sendCodeDealCenter">
                            <p class="pintitle">请输入资金密码</p>
                            <div class="pinContent">
                                <FormItem class="tip" prop="password">
                                    <Input type="password"  v-model="passwordData.password"></Input>
                                </FormItem>
                            </div>
                        </div>
                    </Form>
                    <!-- <p class="qiXian">有效期限:&nbsp;<span>2 小时</span></p> -->
                    <div class="twoBtn">
                        <button class="btnLeft" :disabled="doubleClick" @click="surePassword()">确定</button>
                        <button class="btnRight" @click="guanbi(0)">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../../api'
export default {
    name: 'buysellTan',
    props: ['DTM'],
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
        return {
            pinDataReles: {
                password: [{ validator: pinPassRule, trigger: 'blur' }]
            },
            DTMfirst: true,
            DTMData: {
                type: '',
            },
            //验证码相关
            emailData: {
                Key: "",
                Count: 60,
                Loading: false,
                Timer: null,
                codeNumber: '',
            },
            //手机验证码相关
            phoneData: {
                Key: "",
                Count: 60,
                Loading: false,
                Timer: null,
                codeNumber: ''
            },
            googleCode: '',
            doubleClick: false,
            passwordData: {

                password: '',
            }
        }
    },
    computed: {

    },
    created() {
        if (!this.DTM.DTMType) {
            this.DTMfirst = false
        }
    },
    methods: {
        guanbi(type, pin = '') {
            this.$emit('closeDTM', { type, pin });
        },
        sendCode(key) {
            var val, apiName;
            if (key == 'email') {
                val = this.emailData
                apiName = 'dealCenterSendEmailCode'

            } else {
                val = this.phoneData
                apiName = 'dealCenterSendPhoneCode'
            }
            if(val.Timer) {
                clearInterval(val.Timer);
            }
            val.Loading = true;
            api[apiName]().then(res => {
                if (res.status_code == 200) {
                    val.Count = 59
                    val.Timer = setInterval(() => {
                        if (val.Count > 0) {
                            val.Count--;
                            if (val.Count < 60) {
                                val.Loading = false;
                            }
                        } else {
                            clearInterval(val.Timer);
                            val.Count = 60;
                        }
                    }, 1000)

                    val.Key = res.data.verification_key || res.data.email_key;
                    val.$Message.success(val.$t('message.accountSet.SendSuccessWait'));
                } else {
                    val.Loading = false;
                    clearInterval(val.Timer);
                    val.Count = 60;
                }
            }).catch(error => {
                val.Loading = false;
            })
        },
        //二次验证
        sucessDeal(name) {
            if (this.DTMData.type == "1") {
                if (this.emailData.Key != "") {
                    let params = {
                        email_code: this.emailData.codeNumber,
                        email_key: this.emailData.Key
                    }
                    api.dealCenterTestEmail(params).then(res => {
                        if (res.status_code == 200) {
                            this.DTMfirst = false
                        } else if (res.status_code == 5003) {
                            this.$Message.error('验证码错误');
                        }
                    }).catch(error => {
                    })
                } else {
                    this.$Message.info('请获取验证码');
                }
            } else if (this.DTMData.type == "2") {
                if (this.phoneData.Key != "") {
                    let params = {
                        verification_code: this.phoneData.codeNumber,
                        verification_key: this.phoneData.Key
                    }
                    api.dealCenterTestPhone(params).then(res => {
                        if (res.status_code == 200) {
                            this.DTMfirst = false
                        } else if (res.status_code == 5003) {
                            this.$Message.error('验证码错误');
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                } else {
                    this.$Message.info('请获取验证码');
                }
            } else if (this.DTMData.type == "3") {
                let params = {
                    verify: this.googleCode
                }
                api.dealCenterTestGoogle(params).then(res => {
                    if (res.status_code == 200) {
                        this.DTMfirst = false
                    } else if (res.status_code == 9022) {
                        this.$Message.error('验证码错误');
                    }
                }).catch(error => {
                    console.log(error);
                })

            }
            // this.showHide2 = false;
            // this.showHide3 = true;


        },

        surePassword() {
            this.$refs['pinDataRef'].validate((valid) => {
                if (valid) {
                    this.doubleClick = true
                    this.guanbi(1, this.passwordData.password)
                }
            })
        },
    },
}
</script>
<style lang="scss" scoped>
#buysellTan .ivu-input-wrapper {
  width: 100%;
}
</style>




