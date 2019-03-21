<template>
  <div>
    <Content>
      <div class="submit-order">
        <div class="submit-order-wrap">
          <div class="order-head">

              <router-link to="/order-record" style="font-size:0.7rem;color:#999">{{ $t(`message.OrderRecord.Orders`) }}</router-link>
              <span style="font-size: 0.7rem;color:#999">&nbsp;>>&nbsp;</span>
              <span style="font-size: 0.7rem;color:#999">{{ $t(`message.OrderRecord.CreateOrder`) }}</span>

          </div>
          <div class="order-content">
            <div class="order-content-detail">
              <p class="title">{{ $t(`message.OrderRecord.SubmitRequest`) }}</p>
              <Form :model="formItem" ref="formItem" :rules="ruleValidate">
                <FormItem class="ticketClass tip" prop="ticket_type_name">
                  <label>{{ $t(`message.OrderRecord.OrderType`) }}:</label>
                    <Input v-model="formItem.ticket_type_name" disabled type="hidden" v-if="this.$route.query.type"></Input>
                    <div v-if="this.$route.query.type" style="line-height:2.5rem;padding-left:0.5rem;width: 14.5rem;height: 2.5rem;background: none;color: #fff;font-size: 0.7rem;border: 1px solid #dddee1;border-radius: 0.2rem;margin-top: -0.5rem">
                        {{formItem.ticket_type_name_otc}}
                    </div>

                  <Select v-model="formItem.ticket_type_name" :placeholder="$t(`message.OTCOrder.Choose`)" v-else>
                    <Option v-for="(ticket,index) in ticketItem" :value="ticket.ticket_type_id+'-'+ticket.ticket_type_name" :key="ticket.ticket_type_id">
                      {{ticket.ticket_type_name}}
                    </Option>
                  </Select>
                </FormItem>
                <FormItem prop="title" class="tip">
                  <label>{{ $t(`message.OrderRecord.OrderBrief`) }}:</label>
                  <Input v-model="formItem.title" :placeholder="$t(`message.OrderRecord.SubmitOrderHeadline`)"></Input>
                </FormItem>
                <FormItem>
                  <label>{{ $t(`message.OrderRecord.Attachment`) }}:</label>
                  <template>
                    <div class="demo-upload-list" v-for="item in uploadList">
                      <p>{{item.name}}</p>
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                      </div>
                    </div>
                  </template>
                  <div class="ivu-input-wrapper ivu-input-type">
                    <Upload ref="upload"
                            :default-file-list="defaultList"
                            :show-upload-list="false"
                            multiple
                            :format="['jpg','png','doc','docx','ppt','xls','xlsx']"
                            :max-size="3072"
                            :before-upload="handleBeforeUpload"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :on-success="handleSuccess"
                            enctype="multipart/form-data"
                            action="//jsonplaceholder.typicode.com/posts/">
                      <Button type="ghost"><span class="icon-paper_clip"></span>{{ $t(`message.OrderRecord.SubmitFile`) }}</Button>
                    </Upload>

                    <!--<input type="file" id="file">-->
                  </div>
                  <p class="tip_require">{{ $t(`message.OrderRecord.UpdateFileDes`) }}<a href="javascript:;"  @click="clear">{{ $t(`message.OrderRecord.ReUpload`) }}</a>
                  </p>
                </FormItem>
                <FormItem prop="extra" class="tip tip_textarea">
                  <label>{{ $t(`message.OrderRecord.YourDescription`) }}</label>
                  <Input v-model="formItem.extra" type="textarea" :placeholder="$t(`message.OrderRecord.DesContent`)"></Input>
                </FormItem>
                <FormItem class="codeNum tip_code" prop="code">
                  <div class="img_code">
                    <Input class="code" v-model="formItem.code" :placeholder="$t(`message.Register.PleaseEnterCodes`)"></Input>
                    <img :src="formItem.login_img" alt="" class="login_img" @click="code_show"/>
                  </div>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleSubmit" :loading="fileLoading" :disabled="cancelDisable">{{ $t(`message.OrderRecord.EverythingConfirmed`) }}</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>
<script>
  import api from '../../api'
  import axios from 'axios'
  import urlBase from './../../../static/config.json'
  import resOnline from './../../../static/configOnline'
  export default {
    data() {
      const validateExtra = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入问题描述'));
        } else if (value.length <= 4) {
          callback(new Error('问题描述必须大于四个字符'));
        } else if (value.length > 300) {
            callback(new Error('问题描述不能大于300个字符'));
        } else {
          callback();
        }
      };
        const validateTitle = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入工单标题'));
            } else if (value.length > 20) {
                callback(new Error('工单标题不能大于20个字符'));
            } else {
                callback();
            }
        };
      return {
        //文件上传
        maxFiles:5,
        fileLoading:false,
        cancelDisable:false,
        ticketItem: [],
        uploadList: [],
        arr:[],
        arrFile:[],
        codeError_tip: false,
        uploadForm: new FormData(),
        token: '',
        defaultList: [],
        type:'',
        formItem: {
          ticket_type_id: '',
          title: '',
          code: '',
          extra: '',
          login_img: ''
        },
        formStatus: 0,
        ruleValidate: {
          ticket_type_name: [
            {required: true, message: this.$t("message.OrderRecord.ChooseOrderType"), trigger: 'change'}
          ],
          title: [
            // {required: true, message: this.$t("message.OrderRecord.PleaseEnterTitle"), trigger: 'blur'}
              {validator: validateTitle, trigger: 'blur'}
          ],
          extra: [
            // {required: true, message: this.$t("message.OrderRecord.PleaseEnterDesc"), trigger: 'blur'}
            {validator: validateExtra, trigger: 'blur'}
          ],
          code: [
            {required: true, message: this.$t(`message.Register.PleaseEnterCodes`), trigger: 'blur'}
          ]
        }
      }
    },
    computed:{
      filename(){
        // console.log(this.arr, 'computed.filename');
        return this.arr
      },
      fileList(){
        // console.log(this.uploadList, 'computed.filename');
        return this.uploadList
      }
    },
    watch:{
      filename(value){
        if(value.length == this.uploadList.length){
          // console.log(value,'watch.filename');
          this.fileUpload(value);
        } else {
          this.fileLoading = true;
          this.cancelDisable = true;
        }
      },
      fileList(value){
      }
    },
    methods: {
      fileUpload(value){            //提交工单创建
        if(value && this.formStatus == 0) {
          // console.log(value,'value');
          this.formStatus = 1;
          let ticket_type = this.formItem.ticket_type_name.split('-');
          let params = {
            ticket_type_id:ticket_type[0],
            ticket_type_name:ticket_type[1],
            ticket_title:this.formItem.title,
            extra:this.formItem.extra,
            captcha_key:this.token,
            captcha_code:this.formItem.code,
            ticket_file:value,
            type:this.type,
            order_id:this.$route.query.order_id?this.$route.query.order_id:''
          };
            api.createTicket(params).then(res => {
              this.formStatus = 0;
              this.fileLoading = false;
              this.cancelDisable = false;

              if (res.status_code == 200) {
                this.$Message.success(this.$t('message.CreateSucceed'));
                this.$refs['formItem'].resetFields();
                this.uploadList = [];
                this.$router.replace({
                  path: '/order-record'
                });
              }else if(res.status_code == 5003){
                  this.$Message.error(this.$t('message.PleaseVerifiCode'));
                  this.code_show()
              }
            }).catch(error=>{
              this.$Message.error('创建失败!');
              this.formStatus = 0;
              this.fileLoading = false;
              this.cancelDisable = false;
            })
          }
      },
      handleSubmit() {         //提交
        this.$refs['formItem'].validate((valid) => {
          if (valid) {
            this.arr = [];
            let instance = axios.create();
            const domain = window.location.origin;
            if (domain.indexOf('localhost') == -1) {
              instance.defaults.baseURL = resOnline.a;
            } else {
              instance.defaults.baseURL = urlBase.a;
            };
            let fd = new FormData();
            for (let i = 0; i < this.uploadList.length; i++) {
              fd.append('file', this.uploadList[i]);
              fd.append('dir',"ticket");
              instance.post('file', fd).then(res => {
                instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                this.arr.push(res.data.file_path)
              })
            }
            instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
          }
        })
      },
      handleSuccess(){

      },
      handleBeforeUpload(file) {
        let item = file.name.split('.');
        let name = item[item.length-1];
        // let name = file.name;
        let array = ['jpg', 'png', 'doc', 'docx', 'ppt', 'xls', 'xlsx'];
        if (array.includes(name) > 0) {
          if (this.uploadList.length < this.maxFiles) {
            if(file.size/(1024*1024) < 3){
              this.uploadList.push(file);
            }
          } else  {
            this.$Notice.warning({
              title: '',
              desc: '最多允许上传' + this.maxFiles + '个文件'
            });
            return false
          }
        } else {
          return true
        }
      },
      handleRemove(file) {
        this.uploadList.splice(this.uploadList.indexOf(file), 1);
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: this.$t('message.IncorrectFormat'),
          desc: this.$t('message.OrderRecord.Document') + file.name + this.$t('message.IncorrectFormatUpCo')
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: this.$t('message.NoAllowableLimit'),
          desc: this.$t('message.OrderRecord.Document') + file.name + this.$t('message.TooBigThree')
        });
      },
      clear() {
        this.uploadList = [];
      },
      getTicketTypeList() {           //获取工单类型列表
        api.getTicketTypeList().then(res => {
          if(res.status_code == 200){

            this.ticketItem = res.data.list;
              if(this.$route.query.type){
                  for(let value of res.data.list){
                      if(value.ticket_type_id == '3'){
                          this.formItem.ticket_type_name = value.ticket_type_id + '-' + value.ticket_type_name;
                          this.formItem.ticket_type_name_otc = value.ticket_type_name;
                      }
                  }
              }
            this.code_show();
          }
        });
      },
      code_show() {           //图片验证码
        api.loginImg().then(res => {
          this.token = res.data.token;
          let params = {
            token:this.token
          };
          api.captcha(params).then(res=>{
            if(res.code == 200){
              this.formItem.login_img = 'data:image/png;base64,'+res.data.image;
            }
          })
        })
      },
    },
    mounted() {
      this.getTicketTypeList();
     if(this.$route.query.type == 'otc'){
          this.type = 'otc'
      }else{
         this.type = ''
      }
    }
  }
</script>
<style scoped lang="scss">


</style>
