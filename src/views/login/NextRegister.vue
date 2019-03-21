<template>
  <div>
      <div class="login login-main next-regist">
        <div class="register">
        <div class="login-wrap">
          <div class="login-content">
            <p class="logintitle title blue">账户基本设置</p>
		        <Form ref="registerForm" :model="registerForm" :rules="ruleValidate">
		            <FormItem prop="nickname" class="nextregister-inp">
		                <Input v-model="registerForm.nickname" placeholder="用户昵称" :maxlength=20></Input>
		            </FormItem>
		            <FormItem prop="password" class="nextregister-inp">
		                <Input type="password" v-model="registerForm.password" placeholder="设置密码" :maxlength=20></Input>
		            </FormItem> 
		            <FormItem prop="repassword" class="nextregister-inp">
		                <Input type="password" v-model="registerForm.repassword" placeholder="确认密码" :maxlength=20></Input>
		            </FormItem> 
		            <FormItem prop="code" class="nextregister-inp">
		                <Input v-model="registerForm.code" placeholder="邀请码(选填)" :maxlength=20></Input>
		            </FormItem> 
		            <p class="notice-con">点击注册，表示您已同意    <router-link to="/kfuserpro" class="user_color" target="_blank">《KF用户注册协议》</router-link> </p>
		            
		            <Button  @click="register"  class="router-style" :loading="ladingSucce" :disabled="disabled">完成注册</Button>
	          		<!--<Button v-if="registerSucceed" @click="register"   class="router-style" :loading="ladingSucce">完成注册</Button>-->  
		        </Form>
          </div>
        </div>
        </div>
      </div>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import api from '../../api'
import Model from './../model/Model.vue'
import { Base64 } from 'js-base64';
let outPassword;

export default {
  data() {
    const validatePassWord = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/;
      if (value === '') {
        callback(new Error('请输入5-15位字母数字密码'));
      } else if(!reg.test(value)) {
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
      if (value.replace(/\s+/g, "") === ''){
        callback(new Error('请输入用户昵称'));
      } else if (value.replace(/\s+/g, "").length < 2 || value.replace(/\s+/g, "").length > 20) {
        callback(new Error('用户昵称不能小于2个或者大于20个字符'));

      } else if (!uPattern.test(value)) {
        callback(new Error('用户昵称输入错误!'));
      }
      else {
        callback();
      }

    };
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('输入手机号码'));
      }else if(!/^[0-9]{2,20}$/.test(value)){
        callback(new Error('手机号格式错误'));
      }else {
        callback();
      }
    };

    return {
      p_text:'',
      ladingSucce: false, // 完成注册
      register_img:'',
      invitateURL:'',
      count:60,
      countPhone:60,
      loadingSure:false,
      loadingPhone:false,
      email_key:'',
      verification_key:'',
      holder: "用户昵称提交不可更改", //用户昵称提交不可更改
      showTab:false,
      token:'',
      loadingCode:false,
      step:1,
      registerForm: {
        nationalCode:'+86',
        national: '',
        account: '',
        phone:'',
        code: '',
        codePhone:'',
        nickname: '',
        password: '',
        repassword: '',
        promotion:'',
        agree: '我已阅读并同意'
      },
      changeWay:false,
      loadingNational: false,
      options: [

      ],
      ruleValidate: {
        national: [
        {required: true, trigger: 'blur',message: '请选择国籍'}
        ],
        account: [
        {required: true, message: "请输入邮箱帐号", trigger: 'blur'},
        {type: 'email', message:  "请输入正确的邮箱账号", trigger: 'blur'}
        ],
        phone:[
          {validator: validatePhone, trigger: 'blur'}
        ],
        code: [
        { trigger: 'blur',message: '请输入邀请码'}
        ],
        nationalCode:[
          {required: true, trigger: 'blur',message: '请选择国籍区号'}
        ],
        codePhone: [
          {required: true, trigger: 'blur',message: '请输入邮箱验证码'}
        ],
        nickname: [
          {validator: validateAccount, trigger: 'blur'}
        ],
        password: [
        {validator: validatePassWord, trigger: 'blur'}
        ],
        repassword: [
        {validator: validateRePassWord, trigger: 'blur'}
        ],
        promotion:[
         {required: true, trigger: 'blur',message: '请输入邀请码'}
        ],
        agree:[
        { required: true,type: 'array', message: '请勾选用户协议', trigger: 'change',min: 1}
        ]
      },
      disabled: true
    }
  },
  props: ['registerData', 'authorize_code'],
  components: {
    Model
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
  watch: {
  	getPassword(curVal, oldVal) {
	    if (curVal != oldVal) {
	        outPassword = curVal;
	    }
    },
    registerForm:{//深度监听，可监听到对象、数组的变化
           handler(curVal){
						if (curVal.nickname&&curVal.password&&(curVal.repassword === curVal.password)) {
			    		this.disabled = false
			    	}else {
			    		this.disabled = true
			    	}
          },
     	deep:true
    }
  },
  methods: {
    model_sure(){  //邮箱弹框确定
      this.loadingSure = true;
      let params = {
        email: this.registerForm.account.replace(/(^\s+)|(\s+$)/g, ""),
//      captcha_code:Base64.encode('register|'+this.vaptchaToken),
        captcha_key:this.token,
      };
      let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if (params.email && reg.test(params.email) && params.captcha_key) {
        api.registerEmail(params).then(res => {

          if (res.status_code == 200) {
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
            this.email_key = res.data.email_key;
          } else if (res.status_code == 5006) {
            this.loadingSure = false;
            this.loadingCode = false;
          }else if (res.status_code == 5003) {
            this.loadingSure = false;
            this.loadingCode = false;
            this.$Message.error('验证码错误!')
          } else {
            this.loadingSure = false;
            this.loadingCode = false;
          }
        }).catch(error=>{
          this.loadingSure = false;
          this.loadingCode = false;
        })
      } else {
        this.loadingSure = false;
        this.loadingCode = false;
        this.$Message.error('请输入验证码')
      }
    },
    model_sure_phone(){    //手机模态框确定
      this.loadingSure = true;
      let params = {
        phone_number : this.registerForm.phone.replace(/(^\s+)|(\s+$)/g, ""),
        phone_idd:this.registerForm.nationalCode,
        captcha_key:this.token,
      };
      if (params.captcha_code) {
          this.loadingPhone = true;
          api.send_phone_authCode(params).then(res => {

            if (res.status_code == 200) {
              this.loadingSure = false;
              this.showTab = false;
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
            } else if (res.status_code == 5003) {
              this.loadingSure = false;
              this.loadingPhone = false;
              this.$Message.error('验证码错误!')
            }  else if (res.status_code == 6021) {
              this.loadingSure = false;
              this.loadingPhone = false;
              this.$Message.error('请先进行安全验证！')
            } else{
              this.loadingSure = false;
              this.loadingPhone = false;
            }
          }).catch(err=>{
            this.loadingSure = false;
            this.loadingPhone = false;
          })
      }else {
        this.loadingSure = false;
        this.loadingPhone = false;
        this.$Message.error('请输入手机号码')
      }
    },
    hide(){         //弹框关闭
      this.showTab = false;
    },
    labelcolorchange(val) {
      if (val) {
        this.$refs['nationality'].style.color = '#f3ba2f'
      } else {
        this.$refs['nationality'].style.color = '#95a1bd'
      }
    },
    register() {
      this.registerLoading = true;
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
        	this.disabled = false
        	this.ladingSucce = true
          let params = {
            user_name: this.registerForm.nickname.replace(/\s+/g, ""),
            email: this.registerData.email,
            phone_number: this.registerData.phone_number,
            phone_idd: this.registerData.phone_idd,
            password: this.registerForm.password,
            password_confirmation: this.registerForm.repassword,
            authorize_code: this.authorize_code,
            code: this.registerForm.code
          };
          api.nextRegister(params).then(res => {
            if (res.status_code === 200) {
            	this.ladingSucce  = false
              this.$Message.success('注册成功');
              this.$router.replace({
                path: '/login'
              })
            }else if(res.status_code === 5037){
            	this.ladingSucce  = false
              this.$Message.error("操作超时，请回上一页注册页");
            }else {
            	this.ladingSucce = false
            }
          }).catch(error=>{
          		this.ladingSucce  = false
              this.$Message.error('注册失败，请重试');
          })
        }
      })
    },
    email_code() {        //获取邮箱验证码
      this.p_text = '';
      let params = this.registerForm.account;
      let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if (params) {
        if (reg.test(params)) {

          this.loadingCode = true;
        }
      }else{
        this.$Message.error('请输入邮箱号')
      }
    },
    phone_code(){        //获取手机验证码
      this.p_text = '';
      let params = {
        phone_idd:this.registerForm.nationalCode,
        phone_number:this.registerForm.phone
      }

      let reg = /^[0-9]{2,20}$/;
      if (params.phone_idd){
        if(params.phone_number.replace(/\s+/g, "")){
          if(reg.test(params.phone_number)){

            this.loadingPhone = true;
          }
        }else{
          this.$Message.error('请输入手机号码')
        }
      }else{
        this.$Message.error('请选择国家代码!')
      }
    },
    agreement() {
      window.open('#/page?code=agreement')
    },
  },
  created() {
//	console.log(this.registerData)
  },
  mounted() {
    if (location.hash.indexOf('?') > -1) {
      let URL = location.hash;
      let url = URL.split('?')[1];
      if(url.split('=')[0] == 'code') {
        this.registerForm.promotion = url.split('=')[1];
        this.invitateURL = url;
      }
    }else{
      this.registerForm.promotion = ''
    }
  }
}
  </script>

<style lang="scss" scoped="scoped">
.login-main .login-wrap .login-content .router-style[disabled] {
	background: #D9D9D9;
}
.login .next-regist .ivu-form-item-content {
	margin-bottom: 1rem !important;
}
.login-main {
	.login-wrap {
		text-align: center;
		.login-content {
			background: #fff;
			width: 30rem;
			padding: 4rem 2.5rem;
	  	.title {
	  		color: #000 !important;
	  		text-align: left;
	  		font-size: 1.8rem !important;
	  	}
	  	.ivu-input {
	  		width: 23.5rem !important;
	  	}
	  	.nextregister-inp {
	  		margin-bottom: 2rem;
	  	}
	  	.router-style {
	  		margin-top: 2rem;
	  		width: 100%;
	  		background: #4F69C2;
				border-radius: 0.2rem;
				height: 3rem;
				color: #fff;
				font-size: 1rem;
	  	}
	  	.gray-btn {
	  		background: #D9D9D9;
	  		border: none;
	  	}
	  	.notice-con {
	  		font-size: 0.7rem;
	  		padding: 0 0 0 0.5rem;
	  		color: #95A1BD;
	  		text-align: left !important; 
	  		.user_color{
		  		color: #4F69C2;
		  	}
	  	}
	  }
	}
	
}
</style>