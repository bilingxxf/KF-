<!--suppress ALL -->
<template>
  <div>
    <Content>
      <div class="login">
        <div class="accountVerify accountVerify-wrap">
        <div class="login-wrap">
          <div class="login-content">
            <p class="title">重置登录密码</p>
            <Form ref="resetPassword" :model="resetPassword" :rules="ruleValidate">
              <FormItem prop="password">
                <Input type="password" :placeholder="$t(`message.accountSet.NewPsw`)" v-model="resetPassword.password"></Input>

              </FormItem>
              <FormItem prop="repassword">
                <Input type="password" :placeholder="$t(`message.accountSet.ConfirmNewPsd`)" v-model="resetPassword.repassword"></Input>
              </FormItem>
              <FormItem class="loginbuttonline">
                <Button class="router-style" type="primary" @click="show" :loading="loading">确定</Button>
              </FormItem>
            </Form>
          </div>
          <!--<div class="login-picture">
            <img src="../../../static/img/loginright.png" alt="">
          </div>-->
          <!--<div class="reset">-->
            <!--<span>重置登录密码后24小时内禁止提示</span>-->
          <!--</div>-->
        </div>
        </div>
      </div>
    </Content>
  </div>
</template>
<script>
  import api from '../../api'
  let outPassword;
  export default {
    data() {
      const validatePassWord = (rule, value, callback) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/;
        if (value === '') {
          callback(new Error('请输入5-15位字母数字密码'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入5-15位字母数字密码'));
        } else {
          callback();
        }
      };
      const validateRePassWord = (rule, value, callback) => {
      	let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/;
        if (value === '') {
          callback(new Error('请输入5-15位字母数字密码'));
        } else if (value !== outPassword) {
          callback(new Error('两次密码不一致'));
        } else {
          callback();
        }
      };
      return {
        resetPassword:{
          password:'',
          repassword:''
        },
        loading: false,
        ruleValidate:{
          password: [
            {validator: validatePassWord, trigger: 'blur'}
          ],
          repassword: [
            {validator: validateRePassWord, trigger: 'blur'}
          ]
        },
        ValidaInfo: {}
      }
    },
    props: 
			['forgetValidateInfo']
		,
    computed: {
      getPassword() {
        return this.resetPassword.password
      }
    },
    
    methods: {
      show() {
        this.$refs['resetPassword'].validate((valid) => {
          if (valid) {
          	this.loading = true
              let params = {
                password:this.resetPassword.password,
                password_confirmation:this.resetPassword.repassword,
//              id: this.forgetValidateInfo.id,
                user: this.$route.query.user,
                phone_idd: decodeURIComponent(this.$route.query.phone_idd),
              }
            api.forgetResetPassword(params).then(res=>{
              if(res.status_code == 200){
              	this.loading = false
                this.$Message.success('重置密码成功');
                this.$router.replace({path: '/login'});
              }else {
              	this.loading = false
              }
            })
          } else {
          	this.loading = false
          }
        })
      }
    },
    mounted(){
    },
    watch: {
      getPassword(curVal, oldVal) {
        if(curVal != oldVal){
          outPassword = curVal;
        }
      },
//    forgetValidateInfo: function(val) {
//    	console.log(val)
//    	if(val) {
//    		this.ValidaInfo = val
//    		console.log(this.ValidaInfo)
//    	}
//    }
    }
  }
</script>
<style scoped>
.router-style {
	width: 25rem;
	margin-top: 1rem;
	background: #4F69C2;
	border-radius: 0.2rem;
	height: 3rem;
	color: #fff;
	font-size: 1rem;
}
</style>