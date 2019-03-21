<template>
  <div class="zf-way">
    <div class="zf-way-threeMain">
      <p class="title">{{ $t(`message.OTCBeal.PayMethods`) }}</p>
      <p class="right-title" @click="showDialog">
        <span class="icon-addCard"></span>
        <span class="span-word">{{ $t(`message.BaseInfo.AddMethods`) }}</span>
      </p>
      <p class="threeMain-ts">{{ $t(`message.BaseInfo.Activated`) }}</p>
      <div style="clear: both;"></div>
      <ul class="zf-way-ul">
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
          <div><i-switch v-model="list.account_status==1?true:false"  @on-change="Modify(list)" :disabled="Modify_disabled"></i-switch></div>
          <div class="zf-way-ul-listOperate" @click="resetBtn(list.pay_type,list.pay_id)">{{ $t(`message.BaseInfo.ChangeEdit`) }}</div>
        </li>
      </ul>
    </div>

    <!--修改弹框-->
    <div class="add-zf-ways" v-show="ShowTwo">
      <div class="add-zf-waysMain">
        <span class="icon-wrong" @click="ShowTwo = false"></span>
        <p>{{ $t(`message.BaseInfo.ResetMethods`) }}</p>
        <div class="zf-ul">
          <div class="zf-ul-li" style="border: none;">
            <Form :model="formValidate" :rules="editValidate" ref="formValidate">
              <FormItem prop="pay_name">
                <label>{{ $t(`message.OTCBeal.PayMethods`) }}</label>
                <Input v-model="formValidate.payWay" readonly></Input>
              </FormItem>
              <!--用户真实姓名-->
              <FormItem prop="username">
                <label>{{ $t(`message.accountSet.Name`) }}</label>
                <Input v-model="formValidate.account_name" class="relName" readonly></Input>
              </FormItem>

              <!--支付宝账号-->
              <FormItem prop="alipay_account_name" v-if="formValidate.pay_name == 'Alipay'">
                <label>{{ $t(`message.accountSet.AliPayAccount`) }}</label>
                <input type="hidden" v-model="formValidate.user_account_alipay_id"/>
                <Input v-model="formValidate.alipay_account_name" :placeholder="$t(`message.accountSet.PleaseEnterAlipay`)"></Input>
              </FormItem>

              <!--微信账号-->
              <FormItem prop="wechatpay_account" v-if="formValidate.pay_name == 'Wechatpay'">
                <label>{{ $t(`message.accountSet.WeChat`) }}</label>
                <input type="hidden" v-model="formValidate.user_account_wechatpay_id"/>
                <Input v-model="formValidate.wechatpay_account" :placeholder="$t(`message.accountSet.PleaseEnterWe`)"></Input>
              </FormItem>

              <!--开户银行-->
              <FormItem prop="bank_name" v-if="formValidate.pay_name == 'Bank'">
                <label>{{ $t(`message.accountSet.DepositBank`) }}</label>
                <Input v-model="formValidate.bank_name" :placeholder="$t(`message.accountSet.PleaseEnterBank`)"></Input>
              </FormItem>

              <!--银行卡开户支行-->
              <FormItem prop="bank_branch" v-if="formValidate.pay_name == 'Bank'">
                <label>{{ $t(`message.accountSet.Depositbank`) }}</label>
                <Input v-model="formValidate.bank_branch" :placeholder="$t(`message.accountSet.PleaseEnterDBank`)"></Input>
              </FormItem>

              <!--银行卡账号-->
              <FormItem prop="bank_code" v-if="formValidate.pay_name == 'Bank'">
                <label>{{ $t(`message.accountSet.BankAccount`) }}hjdfghsdg</label>
                <input type="hidden" v-model="formValidate.user_account_bank_id"/>
                <Input v-model="formValidate.bank_code" :placeholder="$t(`message.accountSet.PleaseEnterBankA`)"></Input>
              </FormItem>

              <!--Paypal-->
              <FormItem prop="paypal_account" v-if="formValidate.pay_name == 'PayPal'">
                <label>paypal{{ $t(`message.BaseInfo.Account`) }}</label>
                <input type="hidden" v-model="formValidate.user_account_paypal_id"/>
                <Input v-model="formValidate.paypal_account" :placeholder="$t(`message.accountSet.PleaseEnterPP`)"></Input>
              </FormItem>

              <!--支付宝二维码-->
              <FormItem prop="alipay_qrcode" v-if="formValidate.pay_name == 'Alipay'">
                <label>{{ $t(`message.Mypromotion.QRCode`) }}</label>
                <!--<Input v-model="formValidate.alipay_qrcode" placeholder=""></Input>-->
                <div class="upload_file">
                  <Upload
                  ref="upload"
                  :on-exceeded-size="beyondsize"
                  :max-size='5120'
                  :before-upload="handleUpload"
                  :show-upload-list='false'
                  :action='uploadUrl'
                  :format="['jpg','png']"
                  enctype="multipart/form-data"
                  :on-format-error="handleFormatError"
                  :on-success="progress"
                  :data="uploadData"
                  >
                  <Button type="ghost">{{qrcode.code}}</Button>
                </Upload>
              </div>
            </FormItem>
            <!--微信二维码-->
            <FormItem prop="wechatpay_qrcode" v-if="formValidate.pay_name == 'Wechatpay'">
              <label>{{ $t(`message.Mypromotion.QRCode`) }}</label>
              <!--<Input v-model="formValidate.wechatpay_qrcode" placeholder=""></Input>-->
              <div class="upload_file">
                <Upload
                 ref="upload"
                 :on-exceeded-size="beyondsize"
                 :max-size='5120'
                 :before-upload="handleUpload"
                 :show-upload-list='false'
                 :action='uploadUrl'
                 :format="['jpg','png']"
                 enctype="multipart/form-data"
                 :on-format-error="handleFormatError"
                 :on-success="progress"
                 :data="uploadData">
                <Button type="ghost">{{qrcode.code}}</Button>
                <div></div>
              </Upload>

            </div>
          </FormItem>

          <!--资金密码-->
          <FormItem prop="password">
            <label>{{ $t(`message.BaseInfo.TradePassword`) }}</label>
            <Input type="password" v-model="formValidate.password" :placeholder="$t(`message.BaseInfo.PleaseEnterTradePsw`)"></Input>
          </FormItem>

          <Button type="primary" @click="editBtn()">{{ $t(`message.BaseInfo.Succeeed`)}}</Button>

          <span class="cancel_Btn_span" @click="ShowTwo = false" style="cursor:pointer">{{ $t(`message.BaseInfo.Cancel`) }}</span>
        </Form>

      </div>
    </div>
  </div>
</div>

<!--添加弹框-->
<div class="add-zf-ways" v-show="show">
  <div class="add-zf-waysMain">
    <span class="icon-wrong" @click="show = false"></span>
    <p>{{ $t(`message.OTCBeal.AddPayMethod`) }}</p>
    <div class="zf-ul">
      <div class="zf-ul-li" style="border: none;">
          <label>{{ $t(`message.OTCBeal.PayMethods`) }}</label>
            <Select v-model="way" @on-change="changWay">
              <Option value="Wechatpay">{{ $t(`message.WeChat`) }}</Option>
              <Option value="Alipay">{{ $t(`message.AliPay`) }}</Option>
              <Option value="Bank">{{ $t(`message.BankCard`) }}</Option>
              <Option value="PayPal">paypal</Option>
            </Select>
          <label>{{ $t(`message.accountSet.Name`) }}</label>
          <Input v-model="account_name" class="relName" readonly></Input>

        <Form :model="addForm" :rules="ruleValidate" ref="addForm">
          <!--支付宝账号-->
          <FormItem prop="alipay_account_name" v-if="this.way == 'Alipay'">
            <label>{{ $t(`message.accountSet.AliPayAccount`) }}</label>
            <Input v-model="addForm.alipay_account_name" :placeholder="$t(`message.accountSet.PleaseEnterAlipay`)"></Input>
          </FormItem>

          <!--微信账号-->
          <FormItem prop="wechatpay_account" v-if="this.way == 'Wechatpay'">
            <label>{{ $t(`message.accountSet.WeChat`) }}</label>
            <Input v-model="addForm.wechatpay_account" :placeholder="$t(`message.accountSet.PleaseEnterWe`)"></Input>
          </FormItem>

          <!--paypal账号-->
          <FormItem prop="paypal_account" v-if="this.way == 'PayPal'">
            <label>paypal{{ $t(`message.BaseInfo.Account`) }}</label>
            <Input v-model="addForm.paypal_account" :placeholder="$t(`message.accountSet.PleaseEnterPP`)"></Input>
          </FormItem>

          <!--开户银行-->
          <FormItem prop="bank_name" v-if="this.way == 'Bank'">
            <label>{{ $t(`message.accountSet.DepositBank`) }}</label>
            <Input v-model="addForm.bank_name" :placeholder="$t(`message.accountSet.PleaseEnterDBankName`)"></Input>
          </FormItem>

          <!--开户支行-->
          <FormItem prop="bank_branch" v-if="this.way == 'Bank'">
            <label>{{ $t(`message.accountSet.Depositbank`) }}</label>
            <Input v-model="addForm.bank_branch" :placeholder="$t(`message.accountSet.PleaseEnterDBank`)"></Input>
          </FormItem>
          <!--银行卡账号-->
          <FormItem prop="bank_code" v-if="this.way == 'Bank'">
            <label>{{ $t(`message.accountSet.BankAccount`) }}</label>
            <Input v-model="addForm.bank_code" :placeholder="$t(`message.accountSet.PleaseEnterBankA`)"></Input>
          </FormItem>

          <!--支付宝二维码-->
          <FormItem prop="alipay_qrcode" v-if="this.way == 'Alipay'">
            <label>{{ $t(`message.Mypromotion.QRCode`) }}</label>
            <!--<input  placeholder="" type="hidden"/>-->
            <div class="upload_file">
              <Upload
                ref="upload"
                :on-exceeded-size="beyondsize"
                :max-size='5120'
                :before-upload="handleUpload"
                :show-upload-list='false'
                :action='uploadUrl'
                :format="['jpg','png']"
                enctype="multipart/form-data"
                :on-format-error="handleFormatError"
                :on-success="progress"
                :data="uploadData"
               >
              <Button type="ghost">{{qrcode.code}}</Button>
            </Upload>
          </div>
        </FormItem>
        <!--微信二维码-->
        <FormItem prop="wechatpay_qrcode" v-if="this.way == 'Wechatpay'">
          <label>{{ $t(`message.Mypromotion.QRCode`) }}</label>
          <div class="upload_file">
            <Upload
              ref="upload"
              :on-exceeded-size="beyondsize"
              :max-size='5120'
              :before-upload="handleUpload"
              :show-upload-list='false'
              :action='uploadUrl'
              :format="['jpg','png']"
              enctype="multipart/form-data"
              :on-format-error="handleFormatError"
              :on-success="progress"
              :data="uploadData">
            <Button type="ghost">{{qrcode.code}}</Button>
          </Upload>
        </div>
      </FormItem>

      <!--资金密码-->
      <FormItem prop="pin">
        <label>{{ $t(`message.BaseInfo.TradePassword`) }}</label>
        <Input type="password" v-model="addForm.pin" :placeholder="$t(`message.BaseInfo.PleaseEnterTradePsw`)"></Input>
        <p class="set_small_word" v-show="small_tips">{{ $t(`message.BaseInfo.PleaseSet`) }}<router-link to="/accountSettings"><span class="set_smallBtn">{{ $t(`message.BaseInfo.Tradepassword`) }}</span></router-link></p>
      </FormItem>

      <Button type="primary" @click="addBtn" :disabled="toggle">{{ $t(`message.BaseInfo.Succeeed`)}}</Button>
      <span class="cancel_Btn_span" @click="show = false" style="cursor:pointer">{{ $t(`message.BaseInfo.Cancel`) }}</span>
    </Form>

  </div>
</div>
</div>
</div>
<!--是否认证-->
<!--未进行实名认证时弹框-->
<div class="tempModel-undo" v-show="undoTemp">
  <div class="tempModel-undo-main">
    <p>{{ $t(`message.BaseInfo.Notice`) }}</p>
    <span class="icon-wrong" @click="doTemp_cancel"></span>
    <div style="clear: both;"></div>
    <p>{{ $t(`message.BaseInfo.VerifiedReName`) }}</p>
    <!--您还没有实名认证，请先进行实名认证-->
    <div style="clear:both;"></div>
    <router-link to="/accountSettings"><span class="sure_btn" @click="doTemp_sureBtn">{{ $t(`message.BaseInfo.Confirm`) }}</span></router-link>
    <span class="fou_btn" @click="doTemp_cancel">{{ $t(`message.BaseInfo.Cancel`) }}</span>
  </div>
</div>
<!--申请中-->
<div class="tempModel-undo" v-show="undoTemp_sq">
  <div class="tempModel-undo-main">
    <p>{{ $t(`message.BaseInfo.Notice`) }}</p>
    <span class="icon-wrong" @click="doTemp_cancel"></span>
    <div style="clear: both;"></div>
    <p>{{ $t(`message.BaseInfo.VerifiedApply`) }}</p>
    <!--实名认证申请中，无法添加支付方式-->
    <div style="clear:both;"></div>
    <span class="sure_btn" @click="doTemp_sureBtn">{{ $t(`message.BaseInfo.Confirm`) }}</span>
    <span class="fou_btn" @click="doTemp_cancel">{{ $t(`message.BaseInfo.Cancel`) }}</span>
  </div>
</div>
<!--驳回-->
<div class="tempModel-undo" v-show="undoTemp_bh">
  <div class="tempModel-undo-main">
    <p>{{ $t(`message.BaseInfo.Notice`) }}</p>
    <span class="icon-wrong" @click="doTemp_cancel"></span>
    <div style="clear: both;"></div>
    <p>{{ $t(`message.BaseInfo.VerifiedRefusal`) }}</p>
    <!--实名认证被驳回，无法添加支付方式，请重新认证-->
    <div style="clear:both;"></div>
    <span class="sure_btn" @click="doTemp_sureBtn">{{ $t(`message.BaseInfo.Confirm`) }}</span>
    <span class="fou_btn" @click="doTemp_cancel">{{ $t(`message.BaseInfo.Cancel`) }}</span>
  </div>
</div>
<!--通过-->

</div>
</template>

<script>
import api from '../../../api'
import axios from 'axios'
import res from '../../../../static/config'
import Online from '../../../../static/configOnline'
export default {
  data() {
    const validateBack = function (rule,value,callback) {
      if (!value){
            // return callback(new Error(this.$t('message.accountSet.PleaseEnterBankA')));
            return callback(new Error('请输入银行卡账号'));
          } else if (!/^([1-9]{1})(\d{14,16})$/.test(value)){
            //return callback(new Error(this.$t('message.accountSet.PleaseEnterCorrBank')))
            return callback('银行卡号不正确22222')
          } else{
            callback();
          }
        };
    const alipayAccount = function (rule,value,callback) {
          if (/\s+/g.test(value)){
            return callback(new Error('不能输入空格'));
          } else if (!value){
            //return callback(new Error(this.$t('message.accountSet.PleaseEnterCorrBank')))
            return callback(new Error('请输入支付宝账号'));
          } else{
            callback();
          }
        };
    const wechatpayAccount = function (rule,value,callback) {
          if (/\s+/g.test(value)){
            return callback(new Error('不能输入空格'));
          } else if (!value){
            //return callback(new Error(this.$t('message.accountSet.PleaseEnterCorrBank')))
            return callback(new Error('请输入微信账号'));
          } else{
            callback();
          }
        };
    const paypalAccount = function (rule,value,callback) {
          if (/\s+/g.test(value)){
            return callback(new Error('不能输入空格'));
          } else if (!value){
            //return callback(new Error(this.$t('message.accountSet.PleaseEnterCorrBank')))
            return callback(new Error('请输入paypa账号'));
          } else{
            callback();
          }
        };
    return {
        Modify_disabled:false,
          uploadModal: true,
          uploadData: {},
          activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
          uploadUrl: '',
          toggle:false,
          small_tips:false,
          qrcode:{
            code: this.$t('message.accountSet.UploadYourQR')+'(#jpg/#png)',
          },
          ShowTwo:false,
          show:false,
          undoTemp:false,
          undoTemp_sq:false,
          undoTemp_bh:false,
          data:[

          ],
          formValidate:{
            payWay:''
          },
         addForm:{
           alipay_account_name:'',
           wechatpay_account:'',
           paypal_account:'',
           bank_name:'',
           bank_branch:'',
           bank_code:'',
           pin:'',
           timerOut:null
         },
          way:'Alipay',
          account_name:'',
          ruleValidate: {

            //  支付宝账号
            alipay_account_name: [
            {required: true, validator:alipayAccount, trigger: 'blur'}
            ],
            //  微信账号
            wechatpay_account: [
            {required: true, validator: wechatpayAccount, trigger: 'blur'}
            ],
            // paypal账号
            paypal_account: [
            {required: true, validator: paypalAccount,  trigger: 'blur'}
            ],
            // 银行卡账号
            bank_code: [
            {required: true, validator:validateBack, trigger: 'blur'}
            ],

            // 开户银行
            bank_name: [
            {required: true, message: this.$t('message.accountSet.PleaseEnterDeposit'), trigger: 'blur'}
            ],
            // 开户支行
            bank_branch: [
            {required: true, message: this.$t('message.accountSet.PleaseEnterDBank'), trigger: 'blur'}
            ],
            pin: [
            {required: true,   message: this.$t('message.BaseInfo.PleaseEnterTradePsw'), trigger: 'blur'}
            ]
          },
          editValidate: {
            password: [
            {required: true, message: '资金密码不能为空', trigger: 'blur'}
            ]
          },
          newId:0,
          alipayfileUrl:'',
          wechatpayfileUrl:'',
          codeUrl:''
        }
      },
      methods: {
        progress(response, file, fileList){
          this.codeUrl = response.file_path;
        },
        handleFormatError(file){
          this.$Message.error('上传图片格式错误，格式为jpg，png');
           this.toggle = true;
           this.qrcode.code = undefined;
        },
        beyondsize(file,fileList){
          this.$Message.error('超出上传大小(5M)');
           this.qrcode.code = undefined;
          this.toggle = true;
        },
        handleUpload (file) {
          this.qrcode = file;
          this.qrcode.code = file.name;
          this.toggle = false;
          const domain = window.location.origin;
          // console.log(domain);
          if(domain.indexOf('localhost') == -1){
             this.uploadUrl =Online.a+'file' ;
          }else{
             this.uploadUrl =res.a+'file' ;
          }
          // this.uploadUrl =res.a+'file' ;
          this.uploadData = {
            abc: file
          };
          let promise = new Promise((resolve) => {
            this.$nextTick(function () {
              resolve(true);
            });
          });
          return promise; //通过返回一个promis对象解决
        },
        //***获取用户所有的支付方式 接口
        getAllWay(){
          api.getAllWay().then(res=>{
            // console.log(res,'i')
           this.data = res.data;
         }).catch(error=>{
          console.log(error)
        })
       },
        Modify(val_info) {                //启用禁用
          // this.Modify_disabled = false;
          //   alert(val_info.account_status)
          if(!this.Modify_disabled){
              this.Modify_disabled = true;
              let state = val_info.account_status == 1 ? 2 : 1;
              let p = {
                pay_name: val_info.pay_type,
                pay_id: val_info.pay_id,
                account_status: state,
              };
              api.Modify(p).then(res => {
                if(res.status_code == 200){
                    // val_info.account_status = state;
                    this.$Message.success(this.$t(`message.StatusSuccess`));

                    this.timerOut = setTimeout(() => {
                        this.Modify_disabled = false
                    }, 3000);
                }
              })
              .catch(error => {
                console.log(error);
              })
          }

        },
        resetBtn(pay_type,pay_id){          //列表修改
          this.$refs['formValidate'].resetFields();
          const vm = this;
          this.ShowTwo = true;
          this.newId = pay_id;
          let params = {
            pay_name:pay_type,
            pay_id:pay_id
          };
          api.Payment(params).then(res=>{
            if(res.status_code==200){
              vm.alipayfileUrl = res.data.alipay_qrcode;
              vm.wechatpayfileUrl = res.data.wechatpay_qrcode;
              vm.formValidate = res.data;
              if(pay_type == 'wechatpay'){
                vm.formValidate.payWay = this.$t(`message.WeChat`);
                vm.qrcode.code= res.data.wechatpay_qrcode;
              }else if(pay_type == 'alipay'){
                vm.formValidate.payWay = this.$t(`message.AliPay`);
                vm.qrcode.code= res.data.alipay_qrcode;
              }else if(pay_type == 'bank'){
                vm.formValidate.payWay = this.$t(`message.BankCard`);
              }else if(pay_type == 'paypal'){
                vm.formValidate.payWay = 'PayPal';
              }
            }else{
              console.log(error);
            }
          }).catch(error => {
           console.log(error);
         })
        },
        editBtn(){          //列表修改确认
          this.$refs['formValidate'].validate((valid) => {
            if (valid) {
              if(this.formValidate.pay_name == 'Alipay'){
                //let fd = new FormData();
                if(this.qrcode.code==this.alipayfileUrl) {
                  let data = {
                    alipay_id:this.newId,
                    account_name:this.formValidate.account_name,
                    alipay_account_name: this.formValidate.alipay_account_name,
                    pin:this.formValidate.password,
                    alipay_qrcode:this.alipayfileUrl
                  };
                  api.putApliay(data).then(res=>{
                    // console.log(res);
                    if(res.status_code==200){
                      setTimeout(()=>{
                        this.getAllWay();
                      },1000);
                      this.ShowTwo = false;
                      this.$Message.success('修改成功')

                    }else if(res.status_code === 5017){
                      // this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'))
                    }
                    else if (res.status_code == 5016){
                      // this.$Message.error('资金密码未设置!')
                    }
                  }).catch(error=>{
                    console.log("error")
                  });
                }
                else{
                      const domain = window.location.origin;
                      let twocode= "";
                      if (domain.indexOf('localhost') == -1) {
                        twocode = Online.fileUrl;
                      }else {
                        twocode = res.fileUrl;
                      }
                      let url = twocode+this.codeUrl;
                      let data = {
                        alipay_id:this.newId,
                        account_name:this.formValidate.account_name,
                        alipay_account_name: this.formValidate.alipay_account_name,
                        pin:this.formValidate.password,
                        alipay_qrcode:url
                      };
                      api.putApliay(data).then(res=>{
                        // console.log(res);
                        if(res.status_code==200){
                          setTimeout(()=>{
                            this.getAllWay();
                          },1000);
                          this.ShowTwo = false;
                          this.$Message.success('修改成功')

                        }
                        else if(res.status_code === 5017){
                          // this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'))
                        }
                        else if (res.status_code == 5016){
                          // this.$Message.error('资金密码未设置!');
                        }
                      }).catch(error=>{
                        console.log("error")
                      });
                }
              }
              else if(this.formValidate.pay_name == 'Wechatpay'){
                //let fd = new FormData();
                if(this.qrcode.code==this.wechatpayfileUrl) {
                  let data = {
                    wechatpay_id:this.newId,
                    account_name:this.formValidate.account_name,
                    wechatpay_account: this.formValidate.wechatpay_account,
                    pin:this.formValidate.password,
                    alipay_qrcode:this.wechatpayfileUrl
                  };
                  api.putwei(data).then(res=>{
                    // console.log(res);
                    if(res.status_code==200){
                      setTimeout(()=>{
                        this.getAllWay();
                      },1000);
                      this.ShowTwo = false;
                      this.$Message.success('修改成功')
                    }else if(res.status_code === 5017){
                      // this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'))
                    }
                    else if (res.status_code == 5016){
                      // this.$Message.error('资金密码未设置!')
                    }
                  }).catch(error=>{
                    console.log("error")
                  });
               }
                else{
                      const domain = window.location.origin;
                      let twocode= "";
                      if (domain.indexOf('localhost') == -1) {
                        twocode = Online.fileUrl;
                      }else {
                        twocode = res.fileUrl;
                      }
                      let url = twocode+this.codeUrl;
                      let data = {
                        wechatpay_id	:this.newId,
                        wechatpay_account:this.formValidate.wechatpay_account,
                        account_name: this.formValidate.account_name,
                        pin:this.formValidate.password,
                        alipay_qrcode:url
                      };
                      api.putwei(data).then(res=>{
                        // console.log(res);
                        if(res.status_code==200){
                          setTimeout(()=>{
                            this.getAllWay();
                          },1000);
                          this.ShowTwo = false;
                          this.$Message.success('修改成功')

                        }else if(res.status_code === 5017){
                          // this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'))
                        }
                        else if (res.status_code == 5016){
                          // this.$Message.error('资金密码未设置!')
                        }
                      }).catch(error=>{
                        console.log("error")
                      });
                }
              }
              else if(this.formValidate.pay_name == 'Bank'){
                let params = {
                  bank_id:this.formValidate.user_account_bank_id,
                  account_name:this.formValidate.account_name,
                  bank_name:this.formValidate.bank_name,
                  bank_branch:this.formValidate.bank_branch,
                  bank_code:this.formValidate.bank_code,
                  pin:this.formValidate.password,
                };
                api.updateBank(params).then(res=>{
                  if(res.status_code == 200){
                    this.$Message.success(this.$t(`message.EditSuccess`));
                    this.ShowTwo = false;
                    setTimeout(()=>{
                      this.getAllWay();
                    },1000);
                  }else if(res.status_code == 5017){
                    // this.$Message.error('资金密码错误！');
                  }else if (res.status_code == 5016){
                    // this.$Message.error('资金密码未设置!')
                  }
                }).catch(err=>{
                  this.$Message.info('修改失败!');
                })
              }
              else if(this.formValidate.pay_name == 'PayPal'){
                let params = {
                  paypal_id:this.formValidate.user_account_paypal_id,
                  account_name:this.formValidate.account_name,
                  paypal_account:this.formValidate.paypal_account,
                  pin:this.formValidate.password,
                };
                // console.log(params);
                api.updateaypal(params).then(res=>{
                  if(res.status_code == 200){
                    this.$Message.success(this.$t(`message.EditSuccess`));
                    this.ShowTwo = false;
                    setTimeout(()=>{
                      this.getAllWay();
                    },1000);
                  }else if(res.status_code == 5017){
                    // this.$Message.error('资金密码错误！');
                  }else if (res.status_code == 5016){
                    // this.$Message.error('资金密码未设置!')
                  }
                }).catch(err=>{
                  this.$Message.info('修改失败!');
                })
              }
            }
          })
},
        showDialog(){//添加支付方式
          this.$refs['addForm'].resetFields();
          this.qrcode.code = this.$t('message.accountSet.UploadYourQR')+'(#jpg/#png)';
          api.jbpzMessage().then( res => {
            if(res.data.identification_name){
              if (res.data.identification_status==1){
                this.undoTemp_sq = true;
              }
              else if (res.data.identification_status==2){
                this.undoTemp_bh = true;
              }
              else if (res.data.identification_status==3){
                this.show = true;
                  //这里要把真实姓名放到该input框里
                  this.account_name = res.data.identification_name;
                  if (res.data.pin){
                    this.small_tips = false;
                  }else{
                    this.small_tips = true;
                  }
                }

              }else{
                this.undoTemp = true;
              }
            }).catch(error=>{
              console.log(error)
            })
          },
        //认证弹框两个按钮
        doTemp_cancel(){
          this.undoTemp = false;
          this.undoTemp_sq = false;
          this.undoTemp_bh = false;
        },
        doTemp_sureBtn(){
          this.undoTemp = false;
          this.undoTemp_sq = false;
          this.undoTemp_bh = false;
        },
        changWay(value){
          this.$refs['addForm'].resetFields();
          this.qrcode={};
          this.qrcode.code = this.$t('message.accountSet.UploadYourQR')+'(#jpg/#png)';
          this.addForm.way = value;
        },
        addBtn(){//添加支付方式确认
          this.$refs['addForm'].validate((valid) => {
            if(valid){
              if(this.way == 'Alipay'){
                     if(this.qrcode.size==undefined){
                        this.$Message.info('请上传二维码')
                     }else {
                       const domain = window.location.origin;
                       let twocode = "";
                       if (domain.indexOf('localhost') == -1) {
                         twocode = Online.fileUrl;
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
                         if (res.status_code == 200) {
                           this.show = false;
                           this.$Message.success(this.$t('message.AddSuccess'));
                           this.$refs['addForm'].resetFields();
                           this.qrcode={};
                           setTimeout(()=>{
                             this.getAllWay();
                           },1000);
                         } else if (res.status_code === 5017) {
                           // this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'))
                         }
                         else if (res.status_code == 5016) {
                           // this.$Message.error('资金密码未设置!')
                         }
                       }).catch(error => {
                         console.log("error")
                       });
                     }
              }
              else if(this.way == 'Wechatpay'){
                //let fd = new FormData();
                if(this.qrcode.size==undefined){
                  this.$Message.info('请上传二维码')
                }
                else{
                      const domain = window.location.origin;
                      let twocode= "";
                      if (domain.indexOf('localhost') == -1) {
                        twocode = Online.fileUrl;
                      }else {
                        twocode = res.fileUrl;
                      }
                      let url = twocode+this.codeUrl;
                      let data = {
                        account_name:this.account_name,
                        wechatpay_account: this.addForm.wechatpay_account,
                        pin:this.addForm.pin,
                        wechatpay_qrcode:url
                      };
                      api.addweiApliay(data).then(res=>{
                        if(res.status_code==200){
                          this.show = false;
                          this.$Message.success(this.$t('message.AddSuccess'))
                          this.$refs['addForm'].resetFields();
                          this.qrcode={};
                          setTimeout(()=>{
                            this.getAllWay();
                          },1000);
                        }else if(res.status_code === 5017){
                          // this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'))
                        }
                        else if (res.status_code == 5016){
                          // this.$Message.error('资金密码未设置!')
                        }
                      }).catch(error=>{
                        console.log("error")
                      });
                }
              }
              else if(this.way == 'Bank'){
                let params = {
                   account_name:this.account_name,
                   bank_name:this.addForm.bank_name,
                   bank_branch:this.addForm.bank_branch,
                   bank_code:this.addForm.bank_code,
                   pin:this.addForm.pin
                };
                api.addbank(params).then(res=>{
                  if (res.status_code == 200) {
                    this.$Message.success(this.$t('message.AddSuccess'));
                    this.show = false;
                    setTimeout(()=>{
                      this.getAllWay();
                    },1000);
                    this.$refs['addForm'].resetFields();
                  }else if(res.status_code == 5017) {
                    // this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'));
                  }
                  else if (res.status_code == 5016){
                    // this.$Message.error('资金密码未设置!')
                  }
                }).catch(res=>{
                  this.$Message.error(this.$t('message.AddFailed'));
                })
              }
              else if(this.way == 'PayPal'){
                let params ={
                 account_name: this.account_name,
                 paypal_account:this.addForm.paypal_account,
                 pin:this.addForm.pin
                };
                api.addpaypal(params).then(res=>{
                  if (res.status_code == 200) {
                    this.$Message.success('Success!');
                    this.show = false;
                    setTimeout(()=>{
                      this.getAllWay();
                    },1000);
                    this.$refs['addForm'].resetFields();
                  }else if(res.status_code == 5017){
                    // this.$Message.error(this.$t('message.BaseInfo.TradePswWrong'));
                  }
                  else if (res.status_code == 5016){
                    // this.$Message.error('资金密码未设置!')
                  }
                }).catch(error=>{
                  this.$Message.error(this.$t('message.AddFailed'));
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

