<template>
    <div v-if="isShow">
        <div class="FundPas_bg"></div>
        <div class="FundPas_div">
            <Icon @click="close" class="FundPas_close" :size="16" type="close"></Icon>
            <p class="FundPas_tilte">资金密码</p>
            <div>
                <Form ref="FundPas_form" :model="FundPas_form" :rules="ruleCustom">
                    <FormItem label="验证方式" prop="type" v-if="FundPas_form.type">
                        <Select @on-change="changeLabel" v-model="FundPas_form.type" style="width:10rem">
                            <Option v-for="(val, index) in bindMes" :key="index" v-if="val.status == 1" :value="val.value">{{val.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="labelText" prop="ecode" v-if="FundPas_form.type">
                        <Input type="text" v-model="FundPas_form.ecode"></Input>
                        <div v-if="FundPas_form.type != 3" :class="{'FundPas_sendCodeG': seconde != 60}" class="FundPas_sendCode" @click="sendCode">{{seconde == 60 ? '获取验证码' : `${seconde}s`}}</div>
                    </FormItem>
                    <FormItem label="资金密码" prop="pin">
                        <Input type="password" v-model="FundPas_form.pin"></Input>
                    </FormItem>
                    <FormItem label="确认密码" prop="pin_confirmation">
                        <Input type="password" v-model="FundPas_form.pin_confirmation"></Input>
                    </FormItem>
                    <p class="FundPas_line"></p>
                    <div class="FundPas_foot">
                        <FormItem>
                            <Button type="primary" @click="submit('FundPas_form')">确定</Button>
                            <Button type="ghost" @click="close" style="margin-left: 0.4rem">取消</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
            <!-- <button @click="submit">确定</button>
        <button @click="clearTimer">aaaaaaa</button>
        <span @click="cuntDown">{{seconde == 60 ? '发送' : `${seconde}s`}}</span> -->
        </div>
    </div>

</template>
<script>
import api from '../../../api.js'
export default {
    data() {
        const validatePassWord = (rule, value, callback) => { // 密码
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
                callback(new Error('请输入5-15位字母数字密码'));
            } else {
                callback();
            }
        };

        const validatePassWord2 = (rule, value, callback) => { // 密码
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (value !== this.FundPas_form.pin) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            isShow: false,
            seconde: 60,
            secondeTimer: null,
            ruleCustom: {
                ecode: [{ required: true, message: '请输入验证码', trigger: 'change' }],
                pin: [{ required: true, validator: validatePassWord, trigger: 'change' }],
                pin_confirmation: [{ required: true, validator: validatePassWord2, trigger: 'change' }],
            },

            FundPas_form: { //上传的数据
                type: '',
                ecode: '',
                pin: '',
                pin_confirmation: '',
                key: '',
            },

            bindMes: {
                email: {
                    status: 0,
                    mes: '',
                    name: '邮箱验证',
                    value: 1,
                },
                phone: {
                    status: 0,
                    mes: '',
                    name: '手机验证',
                    value: 2,
                },
                google: {
                    status: 0,
                    name: '谷歌验证',
                    value: 3,
                },
            }, //绑定的信息


            labelText: '请输入验证码',
        }
    },
    created() {
        //获取到绑定的方式
        api.getUserValidata().then(res => {
            if (res.status_code == 200) {
                if (res.data.email.second_status == 1) {
                    this.bindMes.email.status = 1
                    this.bindMes.email.mes = res.data.email.email_info
                    this.FundPas_form.type = 1
                }
                if (res.data.google.second_status == 1) {
                    this.bindMes.google.status = 1
                    this.FundPas_form.type = 3
                }
                if (res.data.phone.second_status == 1) {
                    this.bindMes.phone.status = 1
                    this.bindMes.phone.mes = res.data.phone.phone_number
                    this.FundPas_form.type = 2
                }
//              console.log(this.FundPas_form.type)
            }
        })
    },
    computed: {

    },
    methods: {
        close() {
            this.isShow = false
            this.doNothing()
        },
        changeLabel() {
            switch (this.FundPas_form.type) {
                case 1:
                    this.labelText = `请输入${this.bindMes.email.mes}的验证码`
                    break
                case 2:
                    this.labelText = `请输入${this.bindMes.phone.mes}的验证码`
                    break
                case 3:
                    this.labelText = `请输入Google的验证码`
                    break
            }
            this.clearTimer()
        },

        sendCode() {
            if (!this.secondeTimer) {

                if (this.FundPas_form.type == 1) {
                    api.sendEmail().then(res => {
                        if (res.status_code == 200) {
                            this.FundPas_form.key = res.data.email_key
                        }
                    })
                }
                if (this.FundPas_form.type == 2) {
                    api.twiceTestPhoneSend().then(res => {
                        if (res.status_code == 200) {
                            this.FundPas_form.key = res.data.verification_key
                        }
                    })
                }



                //发送验证吗

                this.cuntDown()
            }
        },

        submit(name) {

            this.$refs[name].validate((valid) => {
                if (valid) {
                	if(this.FundPas_form.type) {
                		var obj = {
	                        type: this.FundPas_form.type,
	                        pin: this.FundPas_form.pin,
	                        pin_confirmation: this.FundPas_form.pin_confirmation,
	                    }
	
	                    if (!this.FundPas_form.key && obj.type != 3 && obj.type) {
	                        this.$Message.info('请先发送验证码')
	                    }
	
	                    if (obj.type == 1) {
	                        obj.email_key = this.FundPas_form.key
	                        obj.email_code = this.FundPas_form.ecode
	                    }
	                    if (obj.type == 2) {
	                        obj.phone_key = this.FundPas_form.key
	                        obj.phone_code = this.FundPas_form.ecode
	                    }
	                    if (obj.type == 3) {
	                        obj.google_code = this.FundPas_form.ecode
	                    }
	                    api.setNewPin(obj).then(res => {
	                        if (res.status_code == 200) {
	                            this.isShow = false
	                            this.successFn()
	                        } else {
	//                          this.$Message.error('设置资金密码失败')
	                            this.errorFn()
	                        }
	                    }).catch(err => {
	                        this.errorFn()
	                    })
                	}else {
                		var obj = {
	                        pin: this.FundPas_form.pin,
	                        pin_confirmation: this.FundPas_form.pin_confirmation,
	                    }
                		api.setDealPassword(obj).then(res=>{
                			if(res.status_code ==200){
				              this.$Message.success('操作成功！');
				              this.isShow = false
	                          this.successFn()
				            }else {
				            	this.errorFn()
				            }
                		}).catch(err => {
                			this.errorFn()
                		})
                	}
                    
                }
            })
        },
        cuntDown() {

            this.seconde = 59
            this.secondeTimer = setInterval(() => {
                if (this.seconde > 0) {
                    this.seconde--
                } else {
                    this.clearTimer()
                }
            }, 1000)

        },
        clearTimer() {
            if (this.secondeTimer) {
                this.seconde = 60
                clearInterval(this.secondeTimer)
                this.secondeTimer = null
            }
        },
    }
}
</script>
<style lang="scss">
.FundPas_bg {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 9;
}

.FundPas_div {
  position: fixed;
  top: 15%;
  left: 50%;
  width: 19.5rem;
  margin-left: -9rem;
  background-color: #fff;
  z-index: 23;
  border-radius: 0.6rem;
  padding: 1.7rem 1.7rem 0;
  .ivu-form {
    .ivu-form-item-label {
      float: none;
    }
    .ivu-form-item {
      margin-bottom: 1rem;
    }
  }
  .ivu-input:focus,
  .ivu-input:hover,
  .ivu-select-selection-focused,
  .ivu-select-selection:hover {
    border-color: #5d75c7;
  }

  .ivu-form-item-error .ivu-input {
    border: 1px solid #ed3f14;
  }

  .ivu-btn-ghost:hover {
    color: #495060;
    border-color: #dddee1;
  }

  .ivu-select {
    width: 100% !important;
    display: block;
    margin-top: 1.65rem;
  }

  .FundPas_close {
    float: right;
    cursor: pointer;
  }

  .FundPas_tilte {
    font-size: 0.8rem;
    color: #000;
    font-weight: 700;
    margin-top: 0.8rem;
    margin-bottom: 1.2rem;
  }

  .FundPas_sendCode {
    position: absolute;
    top: 0.1rem;
    right: 0.6rem;
    cursor: pointer;
    color: #4f69c2;
    font-size: 0.6rem;
  }

  .FundPas_sendCodeG {
    color: #666666;
  }

  .FundPas_line {
    border-top: 1px solid #ccc;
    margin: 1.4rem 0 1.2rem;
    width: 100%;
    height: 1px;
  }

  .FundPas_foot {
    text-align: right;
    margin-bottom: 1.2rem;
  }
  .FundPas_foot {
    .ivu-btn-primary {
      background-color: #5a75cc !important;
    }
    .ivu-btn {
      width: 5.2rem !important;
      height: 2rem !important;
    }
  }
}
</style>

