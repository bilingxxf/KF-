<!--suppress ALL -->
<template>
  <div>
    <Content>
      <div class="login">
        <div class="safetyVerification">
        <div class="login-wrap">
          <div class="login-content">
            <p class="title">{{ $t(`message.accountSet.SafetyVerifica`) }}</p>
            <Form ref="verification" :model="verification" :rules="ruleValidate">
              <FormItem class="nationalSelect">
                <label style="visibility: visible">{{ $t(`message.accountSet.PleaseAuthenticaMethod`) }}</label>
                <Select v-model="verification.way" @on-change="changeWay('verification')">
                  <Option value="email" v-if="forgetValidateInfo.email">{{ $t(`message.EmailVeri`) }}</Option>
                  <Option value="phone" v-if="forgetValidateInfo.phone_number">{{ $t(`message.PhoneVeri`) }}</Option>
                  <Option value="google" v-if="forgetValidateInfo.google">{{ $t(`message.GGVeri`) }}</Option>
                </Select>
              </FormItem>

              <div v-if="step == 1">
                <FormItem>
                  <label style="visibility: visible">{{ $t(`message.Login.Email`) }}</label>
                  <Input v-model="forgetValidateInfo.email" disabled="disabled"></Input>
                </FormItem>

                <FormItem prop="code_email">
                  <label ref="email">{{$t(`message.Register.VeriCode`) }}</label>
                  <div class="codeNum">
                    <Input :placeholder="$t(`message.Register.VeriCode`)" v-model="verification.code_email" class="code code_num" style="width: 75%;"></Input>
                    <Button type="info" class="mailCode" @click="send_code_email('email')" v-if="count == 60" :loading="loadingCode">{{ $t(`message.SendVeriiCode`) }}</Button>
                    <Button type="primary" disabled v-else class="regetCode">{{ $t(`message.Register.Resend`) }}&nbsp;{{count}}s</Button>
                  </div>
                </FormItem>

                <FormItem class="loginbuttonline">
                  <Button type="primary" @click="showEmail()" :loading="loadingEmail">{{ $t(`message.accountSet.Next`) }}</Button>
                </FormItem>
              </div>

              <div v-if="step == 2">
              <FormItem>
                <label style="visibility: visible">{{ $t(`message.BaseInfo.Phone`) }}</label>
                <Input v-model="forgetValidateInfo.phone_number" disabled="disabled"></Input>
              </FormItem>

              <FormItem prop="code_phone">
                <label ref="phone">{{ $t(`message.Login.PhoneCode`) }}</label>
                <div class="codeNum">
                  <Input :placeholder="$t(`message.Login.PhoneCode`)" v-model="verification.code_phone" class="code code_num"></Input>
                  <Button type="info" class="mailCode" @click="send_code_email('phone')" v-if="pCount == 60" :loading="loadingCodePhone">{{ $t(`message.SendVeriiCode`) }}</Button>
                  <Button type="primary" v-else disabled class="regetCode">{{ $t(`message.Register.Resend`) }}&nbsp;{{pCount}}s</Button>
                </div>
              </FormItem>

              <FormItem class="loginbuttonline">
                <Button type="primary" @click="showPhone()" :loading="loadingPhone">{{ $t(`message.accountSet.Next`) }}</Button>
              </FormItem>
              </div>

              <div v-if="step == 3">
                <div>
                  <FormItem prop="google_code">
                    <label ref="google">{{ $t(`message.BaseInfo.GoogleAuthen`) }}</label>
                    <Input type="text" v-model="verification.google_code" :placeholder="$t(`message.BaseInfo.GoogleAuthen`)"></Input>
                  </FormItem>
                </div>
                <div>
                  <FormItem class="loginbuttonline">
                    <Button type="primary" @click="showGoogle()" :loading="loadingGoogle">{{ $t(`message.accountSet.Next`) }}</Button>
                  </FormItem>
                </div>
              </div>

            </Form>
          </div>
          <div class="login-picture">
            <img src="../../../static/img/loginright.png" alt="">
          </div>
        </div>
        </div>
        </div>
    </Content>
  </div>
</template>
<script>
  import api from '../../api'
  export default {
    data() {
      return {
        loadingCode:false,
        loadingEmail:false,
        loadingPhone:false,
        loadingGoogle:false,
        loadingCodePhone:false,
        count:60,
        pCount:60,
        email_key:'',
        phone_key:'',
        step:0,
        verification:{
          way:'',
          code_email:'',
          code_phone:'',
          google_code:''
        },
        forgetValidateInfo:{},
        ruleValidate:{
          code_email:[
            {required: true, message: this.$t(`message.Login.EnterEmailVerifyCode`), trigger: 'blur'}
          ],
          code_phone:[
            {required: true, message: this.$t(`message.Login.EnterPhoneCode`), trigger: 'blur'}
          ],
          google_code:[
            {required: true, message: this.$t(`message.Login.EnterGoogleCode`), trigger: 'blur'}
          ],
        }
      }
    },
    watch:{
      'verification.code_email'(val){
        if(val != ''){
          this.$refs['email'].style.visibility = 'visible'
        }else{
          this.$refs['email'].style.visibility = 'hidden'
        }
      },
      'verification.code_phone'(val){
        if(val != ''){
          this.$refs['phone'].style.visibility = 'visible'
        }else{
          this.$refs['phone'].style.visibility = 'hidden'
        }
      },
      'verification.google_code'(val){
        if(val != ''){
          this.$refs['google'].style.visibility = 'visible'
        }else{
          this.$refs['google'].style.visibility = 'hidden'
        }
      }
    },
    methods: {
      showEmail() {                             //下一步邮箱
        this.loadingEmail = true;
        this.$refs['verification'].validate((valid) => {
          if (valid) {
            if(this.email_key == ''){
              this.loadingEmail = false;
              this.$Message.error(this.$t('message.PleaseSendVeriiCode'));
              return false;
            }
            let params = {
              // id : this.forgetValidateInfo.id,
              email_key: this.email_key,
              email_code: this.verification.code_email,
              user:this.forgetValidateInfo.user,
              phone_idd:this.forgetValidateInfo.phone_idd,
            };
            api.findPsaaword(params).then(res => {
                        //验证码验证
              if (res.status_code == 200) {
                this.loadingEmail = false;
                this.$Message.success(this.$t(`message.Success`));
                this.$router.replace({
                  path: '/resetPassword'
                })
              }else if(res.status_code === 5003){
                this.loadingEmail = false;
                this.$Message.error(this.$t(`message.VerificaCodeError`));
              } else {
                this.loadingEmail = false;
                this.$Message.error(this.$t(`message.NetworkAnomaly`));
              }
            }).catch(err => {
              this.loadingEmail = false;
              this.$Message.error(this.$t(`message.VerificaCodeError`));
            })
          }else{
            this.loadingEmail = false;

          }
        })
      },
      showPhone(){                        //下一步手机
        this.loadingPhone = true;
        this.$refs['verification'].validate((valid) => {
          if (valid) {
            if(this.phone_key == ''){
              this.loadingPhone = false;
              this.$Message.error(this.$t('message.SendVeriiCode'));
              return false;
            }
            let params = {
              // id : this.forgetValidateInfo.id,
              verification_key: this.phone_key,
              verification_code: this.verification.code_phone,
              user:this.forgetValidateInfo.user,
              phone_idd:this.forgetValidateInfo.phone_idd
            };
            api.findPasswordPhone(params).then(res => {           //验证码验证
              if (res.status_code == 200) {
                this.loadingPhone = false;
                this.$Message.success(this.$t(`message.Success`));
                this.$router.replace({
                  path: '/resetPassword'
                })
              }else if(res.status_code == 5003){
                this.loadingPhone = false;
                this.$Message.error(this.$t(`message.VerificaCodeError`));
              } else {
                this.loadingPhone = false;

              }
            }).catch(err => {

              this.loadingPhone = false;
            })
          }else {
            this.loadingPhone = false;

          }
        })
      },
      showGoogle(){               //下一步谷歌
        this.loadingGoogle = true;
        this.$refs['verification'].validate((valid) => {
          if (valid) {
            let params = {
              data:{
                verify: this.verification.google_code
              },
              // id: this.forgetValidateInfo.id,
              user:this.forgetValidateInfo.user,
              phone_idd:this.forgetValidateInfo.phone_idd,
            };
            api.forgetValidateGoogle(params).then(res => {           //验证码验证
              this.loadingGoogle = false;
              if (res.status_code == 200) {

                this.$Message.success(this.$t(`message.Success`));
                this.$router.replace({
                  path: '/resetPassword'
                })
              }else if(res.status_code == 5003){
                this.$Message.error(this.$t(`message.VerificaCodeError`));
              }
            }).catch(err => {
              this.loadingGoogle = false;
            })
          }else {
            this.loadingGoogle = false;

          }
        })
      },
      send_code_email(way){               //发送验证码
          if(way == 'email') {             //发送邮箱验证码
            this.loadingCode = true;
            let params = {
              id: this.forgetValidateInfo.id,
              user:this.forgetValidateInfo.user,
              phone_idd:this.forgetValidateInfo.phone_idd,
            }
            api.forgetEmailVerify(params).then(res => {
              if (res.status_code == 200) {
                this.email_key = res.data.email_key;
                this.timer = setInterval(() => {
                  if (this.count > 0) {
                    this.count--;
                  } else {
                    this.loadingCode = false;
                    clearInterval(this.timer);
                    this.count = 60;
                  }
                }, 1000);
              } else {
                this.loadingCode = false;
              }
            }).catch(err => {
              this.loadingCode = false;
            })
          }else if(way == 'phone'){       //发送手机验证码
            this.loadingCodePhone = true;
            api.forgetPhoneVerify({user:this.forgetValidateInfo.user,phone_idd:this.forgetValidateInfo.phone_idd}).then(res => {
              if (res.status_code == 200) {
                this.phone_key = res.data.verification_key;
                this.pTimer = setInterval(() => {
                  if (this.pCount > 0) {
                    this.pCount--;
                  } else {
                    this.loadingCodePhone = false;
                    clearInterval(this.pTimer);
                    this.pCount = 60;
                  }
                }, 1000);
              } else {
                this.loadingCodePhone = false;
              }
            }).catch(err => {
              this.loadingCodePhone = false;
            })
          }
      },
      changeWay(name){
        this.loadingGoogle= false;
        this.loadingEmail= false;
        this.loadingPhone= false;
        this.$refs[name].resetFields();
        if(this.verification.way == 'phone'){
          this.step = 2;
        }else if(this.verification.way == 'email'){
          this.step = 1;
        }else if(this.verification.way == 'google'){
          this.step = 3;
        }
      }
    },
    mounted(){
      let forgetValidateInfo = JSON.parse(localStorage.getItem('forgetValidate'));
      this.forgetValidateInfo = forgetValidateInfo;
      
      
      if(forgetValidateInfo.email){
        this.verification.way = 'email';
        this.step = 1;
      }else if(forgetValidateInfo.phone_number){
        this.verification.way = 'phone';
        this.step = 2;
      }else if(forgetValidateInfo.google){
        this.verification.way = 'google';
        this.step = 3;
      }
    }
  }
</script>

