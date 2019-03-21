import http from './reject'
const domain = window.location.origin
// var dealcenter = 'http://exchange.oucloud.com/api/v1/';
var dealcenter = 'http://192.168.2.211:8081/api/v1/'
// 笔笔交易资产列表地址
var bibiUrl = 'http://192.168.2.211:8081/api/v1/'
// 币币交易资产汇率转换地址
// var rateCoinUrl ='http://192.168.2.211:10001/api/v1/';
var rateCoinUrl = 'http://192.168.2.211:8081/api/v1/'
// otc资产/钱包
var otcUrl = 'http://192.168.2.211:8081/api/v1/'
// otc广告位
var advertiserUrl = 'http://192.168.2.211:8081/api/v1/'
// 我的邀请码二维码请求
var qrcodeUrl = 'http://192.168.2.211:8081/api/v1/'
// 二维码base64地址
var bitBoole = 'http://192.168.2.211:8081/api/v1/'
// 用户
var userUrl = 'http://192.168.2.211:8081/api/v1/'
// 文件上传
var fileUrl = 'http://192.168.2.211:8081/api/v1/'
// 币币交易
var bibiChange = 'http://192.168.2.211:8081/api/v1/'
// 冻结金额
var unfree = 'http://192.168.2.211:8081/api/v1/'
// 8082
var ninedown = 'http://192.168.2.211:8082/api/v1/'

// 新UI
var base_url = 'http://192.168.2.211:8084/api/v1/'
var mobile_url = 'http://192.168.2.220:5032/api/v1_1/'
var accounVerify_url = 'http://192.168.2.211:8081/api/v1_1/'
var proListUrl = 'http://192.168.2.220:5036/api/v1/'

if (domain.indexOf('localhost') == -1 && domain.indexOf('192') == -1) {
  dealcenter = ''
  bibiUrl = ''
  rateCoinUrl = ''
  otcUrl = ''
  advertiserUrl = ''
  qrcodeUrl = ''
  bitBoole = ''
  bibiChange = ''
  userUrl = ''
  unfree = ''
  mobile_url = location.origin + '/api/v1_1/'
  base_url = ''
  proListUrl = ''
  accounVerify_url = location.origin + '/api/v1_1/'
}

export default {
  // 获取默认接口地址
  getUrl () {
    return http.get('./../static/config.json')
  },
  // 登录
  login (params) {
    return http.post(mobile_url + 'authorize/login', params)
  },
  // 首页轮播数据
  homePrice (params) {
    return http.post('common/price', params)
  },
  // 测试工单
  workingList (params) {
    return http.get('ticket/get_ticket_list', params)
  },
  // 获取图片验证码token
  loginImg () {
    return http.get('common/get_captcha')
  },
  // 获取图片验证码
  captchCode (token, params) {
    return http.get(`captcha/captcha/token/${token}`, params)
  },
  // 首页轮播
  homeBg () {
    return http.get('common/homepage')
  },
  // 我的推广链接
  Mypromotion () {
    return http.get('authorize/promo/get_promo')
  },
  // 推广二维码
  Myqrcod (params) {
    return http.get('captcha/qrcode/msg/' + params.base64 + '?output=base64')
  },
  // 图片验证
  loginImgVerify (params) {
    return http.post('common/check_captcha', params)
  },
  // 2次邮箱验证码
  emailCode (params) {
    return http.post('authorize/validate/send_email', params)
  },
  // 2次邮箱验证
  emailCodeVerify (params) {
    return http.post('authorize/validate/validate_email', params)
  },
  // 2次验证手机号
  phoneCode (params) {
    return http.post('authorize/validate/send_sms', params)
  },
  // 2次验证手机
  phoneCodeVerify (params) {
    return http.post('authorize/validate/validate_phone', params)
  },
  // 2次验证谷歌
  googleCodeVerify (params) {
    return http.post('authorize/validate/check_google', params)
  },
  // 注册
  register (params) {
    if (params.hasOwnProperty('invitateURL')) {
      return http.post('authorize/login/register' + '?' + `${params.invitateURL}`, params)
    } else {
      return http.post(mobile_url + 'authorize/register_info', params)
    }
  },
  // 注册邮箱验证
  registerEmail (params) {
    return http.post(userUrl + 'authorize/login/send_email', params)
  },
  // 第二页注册
  nextRegister (params) {
  	return http.post(mobile_url + 'authorize/register_commit', params)
  },
  // 忘记密码验证账号是否存在
  validateEmail (params) {
    return http.post('authorize/account_security/retrievePassword', params)
  },
  // 忘记密码发送邮箱验证码
  forgetEmailVerify (params) {
    //  return http.get('authorize/validate/send_email?user='+`${params.user}`+'&phone_idd='+`${params.phone_idd}`)
    return http.get(accounVerify_url + 'authorize/validate/send_email?email=' + `${params.email}` + '&validate_code=' + `${params.validate_code}`)
  },

  // 忘记密码验证邮箱验证码
  forgetValidateEmail (params) {
    return http.post('common/check_email_code', params)
  },
  // 忘记密码发送手机验证
  forgetPhoneVerify (params) {
    return http.get(accounVerify_url + 'authorize/validate/send_sms?phone=' + `${params.phone}` + '&phone_idd=' + `${params.phone_idd}` + '&validate_code=' + `${params.validate_code}`)
  },
  // 忘记密码验证手机验证码
  forgetValidatePhone (params) {
    return http.post('account_security/validate_phone_code', params)
  },
  // 忘记密码验证谷歌
  forgetValidateGoogle (params) {
    return http.get('authorize/validate/check_google?user=' + `${params.user}` + '&phone_idd=' + `${params.phone_idd}`, params.data)
  },
  // 重置密码
  forgetResetPassword (params) {
    return http.patch('authorize/login/reset_user', params)
  },
  // 公共数据接口 新闻中心 帮助中心 公告
  getNewsList (params) {
    return http.get('article/get_news_list', params)
  },
  // 公共数据详情
  getNewsDetail (params) {
    return http.get('article/get_details', params)
  },
  // 我的消息
  mymessagelist (params) {
    return http.get('message/index', params)
  },
  // 消息详情
  mymessagedetails (params) {
    return http.get('message/details', params)
  },
  // 批量删除
  batchesdelete (params) {
    return http.del('message/delete', params)
  },
  // 批量标记已读
  batchesread (params) {
    return http.patch('message/signRead', params)
  },
  // 完成设置

  finishBtn (params) {
    return http.post('user/userinfo/create_bank', params)
  },

  finishBtn_paypal (params) {
    return http.post('user/userinfo/create_paypal', params)
  },
  // 我的邀请码二维码请求
  twoQrcod (params) {
    return http.get(qrcodeUrl + 'captcha/qrcode/msg/' + params.base64 + '?output=base64')
  },
  // 我的推广列表
  mypromotionlist (params) {
    return http.get('message/invite', params)
  },
  // 账户设置的基本信息ok
  accountSSetting () {
    return http.get('authorize/account_security/get_user_status')
  },
  // 账号设置中登录历史ok
  accountLoginHistory () {
    return http.get('authorize/account_security/get_user_login_list')
  },

  // 删除测试
  delTest (params) {
    return http.del('ticket/delete_ticket/ticket_id/' + `${params.id}`)
  },
  // patch测试
  patchTest (params) {
    return http.patch('authorize/account_security/check', params)
  },

  // 账号设置中api列表(少个状态)
  accountApiLists () {
    return http.get('authorize/api/get_access_list')
  },
  // 账号设置中获取google验证信息ok
  googleTestMessage () {
    return http.get('authorize/account_security/google')
  },
  // 账号设置中google验证ok
  checkGoogleCode (params) {
    return http.post('authorize/account_security/check_google_code', params)
  },
  // 账号设置中的高级验证发送身份证件照片(formData传递keyong)
  advancedApprove (params, config) {
    return http.post('authorize/account_security/create_identification', params, config)
  },
  /* 账号设置中的是实名认证的验证名字证件号码ok */
  realNameAuthentication (params) {
    return http.post('authorize/account_security/identification', params)
  },
  // 账号设置中的修改实名认证
  changerealNameAuthentic (params) {
    return http.patch('authorize/account_security/edit_identification', params)
  },
  // 获取工单列表
  getTicketList (params) {
    return http.get('ticket/get_ticket_list', params)
  },
  // 获取工单类型列表
  getTicketTypeList () {
    return http.get('ticket/get_ticket_type_list')
  },
  // 更新工单
  updateTicket (params) {
    return http.patch('ticket/update_ticket', params)
  },
  // 根据工单id获取工单详情
  getTicketId (params) {
    return http.get('ticket/get_ticket/id/' + `${params.id}`)
  },
  // 获取工单聊天内容
  getTicketDetailList (params) {
    return http.get('ticket/get_ticket_detail_list', params)
  },
  // 工单回复
  replyList (params) {
    return http.post('ticket/create_ticket_detail', params)
  },
  // 账号设置关闭开启二次验证(patch传参方式有问题)

  // 账号设置关闭开启二次验证

  closeOpenTwiceVerigy (params) {
    return http.patch('authorize/account_security/check', params)
  },
  // 账号设置一开始绑定新手机的接口(keyong)
  bindPhoneNumber (params) {
    return http.post('authorize/account_security/create_phone', params)
  },
  // 账号设置手机发送验证码(keyong)
  send_phone_authCode (params) {
    params.ispc = IsPC()
    return http.post('common/send_sms', params)
  },
  send_phone_authCode_Account (params) {
    return http.post('authorize/account_security/send_sms', params)
  },
  // 账号设置验证手机验证码(ok)
  // 修改手机号的时候验证手机号(ok)
  testPhoneNumber (params) {
    return http.post('authorize/account_security/get_phone_number', params)
  },
  // 修改手机号的接口
  updatePhoneNumber (params) {
    return http.patch('authorize/account_security/update_phone', params)
  },
  // 创建API(ok)
  createApi (params) {
    return http.post('authorize/api/create_access', params)
  },
  // 删除一条API(ok)
  deleteApi (params) {
    return http.del('authorize/api/delete_access', params)
  },
  // 账号设置中修改API
  changeApi (params) {
    return http.patch('authorize/api/edit_access', params)
  },
  // 获取手机号码和国际码(ok)
  getPhoneNumber () {
    return http.get('authorize/account_security/phone_info')
  },
  // 账号设置里得到邮箱信息(可用)
  getEmailText () {
    return http.get('authorize/account_security/email_info')
  },
  // 账号设置里不用发送邮箱信息来发送邮箱验证码(可用)
  sendEmail () {
    return http.get('common/email')
  },

  // 账号设置中修改登录密码
  changeLoginPassword (data) {
    return http.patch('authorize/account_security/update_login_password', data)
  },
  // 账户设置中设置交易密码
  setDealPassword (params) {
    return http.post('authorize/account_security/create_pin', params)
  },
  // 账号设置中修改交易密码
  changeDealPassword (params) {
    return http.patch('authorize/account_security/update_pin', params)
  },
  // 账号设置中修改基本信息
  changeBasicData (params) {
    return http.post('authorize/account_security/edit_user_info', params)
  },

  //  个人设置-个人信息
  jbpzMessage () {
    return http.get('authorize/account_security/get_user_status')
  },

  // 获取用户所有支付方式
  getAllWay () {
    return http.get('user/userinfo/get_pay_list')
  },
  // 修改支付方式
  Modify (params) {
    return http.patch('user/userinfo/update_pay_status', params)
  },
  Payment (params) {
    return http.get('user/userinfo/get_pay_to_id', params)
  },
  // 注册用户协议
  userManage (params) {
    return http.get('article/get_details', params)
  },
  // 修改pin验证
  changePinTest (params) {
    return http.post('authorize/account_security/validate_email_code', params)
  },
  // 找回密码邮箱验证
  findPsaaword (params) {
    return http.post('authorize/login/validate_email', params)
  },
  // 找回密码手机验证
  findPasswordPhone (params) {
    return http.post('authorize/login/validate_phone', params)
  },
  // 退出
  logOut (params) {
    return http.get('authorize/account_security/login_out', params)
  },
  // 账号设置修改提交支付宝
  updateAlipay (params) {
    return http.patch('user/userinfo/update_alipay', params)
  },
  // 账号设置修改提交微信
  updateWechatpay (params) {
    return http.patch('user/userinfo/update_wechatpay', params)
  },
  // 账号设置修改提交银行卡

  updateBank (params) {
    return http.patch('user/userinfo/update_bank', params)
  },
  // 账号设置修改提交paypal
  updateaypal (params) {
    return http.patch('user/userinfo/update_paypal', params)
  },
  // 高级认证
  highApprove (params) {
    return http.post('authorize/account_security/create_identification', params)
  },
  // 修改高级认证
  changeHighApprove (params) {
    return http.patch('authorize/account_security/edit_high_identification', params)
  },
  // 二次验证开启关闭的发送手机验证码
  twiceTestPhoneSend () {
    return http.post('authorize/account_security/sms')
  },
  // 二次验证的手机
  twicePhoneTest (params) {
    return http.post('authorize/account_security/validate_phone_code/type/' + `${params.status}`, params)
  },
  // 二次验证的邮箱
  twiceEmailTest (params) {
    return http.post('authorize/account_security/validate_email_code/type/' + `${params.status}`, params)
  },
  // 二次验证的google
  twiceGoogleTest (params) {
    return http.post('authorize/account_security/check_google_code/type/' + `${params.status}`, params)
  },
  // 账户与安全的都需要做的二次验证接口
  accountSafeBeforeTest (params) {
    return http.post('authorize/account_security/two_verification', params)
  },
  // 二次验证的手机
  twicePhoneTestAgain (params) {
    return http.post('authorize/account_security/validate_phone_code', params)
  },
  // 二次验证的邮箱
  twiceEmailTestAgain (params) {
    return http.post('authorize/account_security/validate_email_code', params)
  },
  // 二次验证的google
  twiceGoogleTestAgain (params) {
    return http.post('authorize/account_security/check_google_code', params)
  },
  // 账号设置中的绑定邮箱的验证接口
  accountBindEmailTest (params) {
    return http.post('authorize/account_security/crate_email', params)
  },
  // 账号设置绑定邮箱发送邮件输入邮件
  accountBindEmail (params) {
    return http.post('authorize/account_security/send_email', params)
  },
  // 添加支付宝支付方式
  addApliay (params) {
    return http.post('user/userinfo/create_alipay', params)
  },
  // 添加微信支付方式
  addweiApliay (params) {
    return http.post('user/userinfo/create_wechatpay', params)
  },
  // 添加银行卡支付方式
  addbank (params) {
    return http.post('user/userinfo/create_bank', params)
  },
  // 添加银行卡支付方式
  addpaypal (params) {
    return http.post('user/userinfo/create_paypal', params)
  },
  // 更新支付宝支付方式
  putApliay (params) {
    return http.patch('user/userinfo/update_alipay', params)
  },
  // 更新微信支付方式
  putwei (params) {
    return http.patch('user/userinfo/update_wechatpay', params)
  },
  // 导出excel
  exportCsv () {
    return http.get('/message/invite/export')
  },
  // 交易中心的二次验证
  dealCenterTwoTestBefore () {
    return http.post(dealcenter + 'exchange/two_verification')
  },
  // 交易中心的发送邮箱验证码
  dealCenterSendEmailCode () {
    return http.get(dealcenter + 'exchange/send_email')
  },
  // 交易中心的邮箱验证码验证
  dealCenterTestEmail (params) {
    return http.post(dealcenter + 'exchange/validate_email_code', params)
  },
  // 交易中心的发送手机验证码
  dealCenterSendPhoneCode () {
    return http.get(dealcenter + 'exchange/send_sms')
  },
  // 交易中心的手机验证码校验
  dealCenterTestPhone (params) {
    return http.post(dealcenter + 'exchange/validate_phone_code', params)
  },
  // 交易中心的谷歌验证码校验
  dealCenterTestGoogle (params) {
    return http.post(dealcenter + 'exchange/validate_google_code', params)
  },
  fangwen () {
    return http.get(dealcenter + 'exchange/del_redis')
  },
  // 交易记录获取币种列表
  dealCenterRecordGetBiType () {
    return http.get(dealcenter + 'exchange/get_exchange_finance_list')
  },
  // 交易记录得到买入列表
  dealCenterRecordGetBuyList (params) {
    return http.get(dealcenter + 'exchange/get_exchange_buy_list', params)
  },
  // 交易记录撤销买入记录
  dealCenterRecordRepealBuy (params) {
    return http.patch(dealcenter + 'exchange/cancel_exchange_buy', params)
  },
  // 交易记录得到卖出列表
  dealCenterRecordGetSellList (params) {
    return http.get(dealcenter + 'exchange/get_exchange_sell_list', params)
  },
  // 交易记录撤销卖出列表
  dealCenterRecordRepealSell (params) {
    return http.patch(dealcenter + 'exchange/cancel_exchange_sell', params)
  },
  // 交易记录获取交易对
  dealCenterRecordGetSymbol () {
    return http.get(dealcenter + 'exchange/get_symbol_list')
  },
  // 交易记录买币列表详情
  dealCenterRecordGetBuyDetailsList (params) {
    return http.get(dealcenter + 'exchange/get_exchange_buy_history_list', params)
  },
  // 交易记录卖币列表详情
  dealCenterRecordGetSellDetailsList (params) {
    return http.get(dealcenter + 'exchange/get_exchange_sell_history_list', params)
  },
  // 币币交易资产页获取用户信息
  getUserInfrom () {
    return http.get(bibiUrl + 'finance/exchange_user_info')
  },
  // 币币交易资产(币种余额与美元换算)汇率请求
  rateCoinRequest () {
    return http.get(rateCoinUrl + 'common/exchange/coin')
  },

  // 币币交易资产(币种余额与美元换算)汇率请求  : 线下开发新接口，暂时使用
  // rateCoinRequest(){   //  new
  //   return http.get('http://192.168.2.197:10005/api/v1/common/exchange/coin')
  // },

  // 币币交易资产(美元与人民币换算)汇率请求
  rateMoneyRequest () {
    return http.get(rateCoinUrl + 'common/exchange/exchange')
  },

  // 币币交易资产(美元与人民币换算)汇率请求  : 线下开发新接口，暂时使用
  // rateMoneyRequest(){  //new
  //   return http.get('http://192.168.2.197:10005/api/v1/common/exchange/exchange')
  // },


  // 笔笔交易资产列表请求
  bibiList () {
    return http.get(bibiUrl + 'finance/exchange_finance_list')
  },
  // 笔笔交易资产记录列表请求
  bibiRecordList (params) {
    return http.get(bibiUrl + 'finance/exchange_finance_history_list', params)
  },
  // 笔笔交易资产记录列表划转请求
  bibiRecordTransferred (params) {
    return http.get(bibiUrl + 'finance/exchange_finance_coin_list', params)
  },
  // 笔笔交易资产记录列表划转中转入账户币种查询请求
  TransferredInCurrency (params) {
    return http.get(bibiUrl + 'finance/exchange_coinChange', params)
  },
  TransferredSubmit (params) {
    return http.post(bibiUrl + 'finance/exchange_finance_shift', params)
  },

  // 币币交易 资金密码key
  transPas (params) {
    return http.get(dealcenter + 'exchange/get_password_key_cache', params)
  },

  // otc资产用户信息
  otcMoneyBag () {
    return http.get(otcUrl + 'finance/otc_user_info')
  },
  // otc钱包列表
  FinanceList (params) {
    return http.get(otcUrl + 'finance/otc_finance_list', params)
  },
  // otc资产币种转换
  otcFinanceExchange (params) {
    return http.get(otcUrl + 'finance/otc_coinChange', params)
  },
  // otc资产划转提交
  otcFinanceShift (params) {
    return http.post(otcUrl + 'finance/otc_finance_shift', params)
  },
  // otc资产划转列表
  otcFinanceList (params) {
    return http.get(otcUrl + 'finance/otc_finance_coin_list', params)
  },
  // otc广告位币列表
  advertiserUrl () {
    return http.get(advertiserUrl + 'otc/common/get_coin_list')
  },
  // otc广告位币列表购买
  advertiserBuyUrl (params) {
    return http.post(advertiserUrl + 'otc/create_order', params)
  },
  // otc广告位商家列表
  advertiseSellerUrl (params) {
    return http.get(advertiserUrl + 'otc/get_user_advertiser', params)
  },
  // otc广告位订单列表
  getransacList (params) {
    return http.get(advertiserUrl + 'otc/get_transaction_list', params)
  },
  // 黑名单列表
  blackList (params) {
    return http.get(advertiserUrl + 'otc/otc_block_list', params)
  },
  // 添加黑名单
  add_otc_block (params) {
    return http.post(advertiserUrl + 'otc/add_otc_block', params)
  },
  // 删除黑名单
  delete_block (params) {
    return http.del(advertiserUrl + 'otc/delete_block', params)
  },
  // 获取回复语
  get_greetings () {
    return http.get(advertiserUrl + 'otc/get_greetings')
  },
  // 编辑回复语
  edit_greetings (params) {
    return http.patch(advertiserUrl + 'otc/edit_greetings', params)
  },
  // 新增广告-获取支付方式
  pay_method_list () {
    return http.get(advertiserUrl + 'otc/common/pay_method_list')
  },
  // 获取法币列表
  get_currency () {
    return http.get(advertiserUrl + 'otc/common/get_currency')
  },
  // 发布广告位
  publish_advertiser (params) {
    return http.post(advertiserUrl + 'otc/publish_advertiser', params)
  },
  // 申请广告主验证
  apply_advertiser_validate (flag) {
    const noMessgae = flag ? '?noMessage=true' : ''
    return http.get(advertiserUrl + 'otc/apply_advertiser_validate' + noMessgae)
  },
  // 申请广告主
  apply_advertiser () {
    return http.post(advertiserUrl + 'otc/apply_advertiser')
  },
  // 获取广告主广告位信息
  my_otc_advertiser_list (params) {
    return http.get(advertiserUrl + 'otc/my_otc_advertiser_list', params)
  },

  // 国际码api
  internationalCodeGet () {
    return http.get('common/get_country')
  },
  // 撤销广告位
  hide_advertiser (params) {
    return http.patch(advertiserUrl + 'otc/hide_advertiser', params)
  },

  // 广告主信息
  advertiserInfo (params) {
    return http.get(advertiserUrl + 'otc/advertiser_info', params)
  },

  // 钱包信息
  moneybagInfo () {
    return http.get(otcUrl + 'finance/user_info')
  },
  // 钱包列表
  moneybagList () {
    return http.get(otcUrl + 'finance/finance_list')
  },
  // 币种状态判断
  judge (params) {
    return http.get(otcUrl + 'finance/get_finance?coin_id=' + params.coin_id)
  },
  // 充值信息 线上
  // rechargeInfo(params){
  //   return http.get(otcUrl + 'finance/finance_wallet?coin_id='+params.coin_id);
  // },
  // 充值信息 线下 9.13 开始
  rechargeInfo (params) {
    return http.get(unfree + 'finance/finance_wallet?coin_id=' + params.coin_id)
  },
  // 充值二维码
  rechargeInfoImg (params) {
    return http.get(unfree + 'captcha/qrcode/msg/' + params.qr_msg + '?size=150&output=base64')
  },
  // 充值二维码 线下  9.13 结束

  // 充值到账信息
  rechargeNotify (params) {
    return http.get(otcUrl + 'finance/get_withdraw_notify?coin_name=' + params.coin_name + '&address=' + params.address)
  },
  // 提现信息
  withdrawInfo (params) {
    return http.get(otcUrl + 'finance/get_finance?coin_id=' + params.coin_id)
  },
  // 提现
  withdraw (params) {
    return http.post(otcUrl + 'finance/create_finance_withdraw', params)
  },
  // 提现记录列表
  withdrawRecord (params) {
    return http.get(otcUrl + 'finance/get_finance_withdraw_list?coin_id=' + params.coin_id + '&limit=' + params.limit + '&page=' + params.page)
  },
  // 钱包记录列表
  record (params) {
    return http.get(otcUrl + 'finance/finance_history_list?coin_id=' + params.coin_id + '&limit=' + params.limit + '&page=' + params.page)
  },
  // 钱包划转信息
  transferInfo (params) {
    return http.get(otcUrl + 'finance/get_finance_coin_list?finance_id=' + params.finance_id)
  },
  // 钱包划转币种改变
  currencyChange (params) {
    return http.get(otcUrl + 'finance/coinChange?finance_id=' + params.finance_id + '&roll_in_finance=' + params.roll_in_finance)
  },
  // 钱包划转
  transfer (params) {
    return http.post(otcUrl + 'finance/create_finance_shift', params)
  },
  // 钱包划转到个人用户
  transferUser (params) {
    return http.post(unfree + 'finance/finance_shift', params)
  },
  // 冻结列表
  unfreeList (params) {
    return http.get(unfree + 'finance/finance_freese_list?limit=10&page=1')
  },
  // 登录验证码
  captcha (params) {
    return http.get(qrcodeUrl + 'captcha/captcha/token/' + `${params.token}` + '?output=base64')
  },
  // otc订单详情
  getTransactionDetail (params) {
    return http.get(advertiserUrl + 'otc/get_transaction_detail', params)
  },
  // 工单提交
  createTicket (params) {
    return http.post(userUrl + 'ticket/create_ticket', params)
  },
  // OTC币种资产信息
  get_otc_finance (params) {
    return http.get(otcUrl + 'finance/get_otc_finance', params)
  },
  // otc订单详情
  otcDetail (params) {
    return http.patch(advertiserUrl + 'otc/update_transaction_status', params)
  },
  /**
   * 币币交易
   */
  // 获取所有币列表

  getCoinList (params) {
    return http.get(bibiChange + 'exchange/get_coin_list')
  },

  // 获取用户资产信息详情和交易手续费率 	coin_id:string
  getExchangeFinance (params) {
    return http.get(bibiChange + 'exchange/get_exchange_finance?coin_id=' + params.coin_id)
  },

  // 获取用户资产信息列表
  getExchangeFinanceList (params) {
    return http.get(bibiChange + 'exchange/get_exchange_finance_list')
  },
  // 获取交易对列表 src_coin_id: str  dst_coin_id: str
  getSymbolList (params) {
    return http.get(bibiChange + 'exchange/get_symbol_list', params)
  },
  // 创建币币交易买
  createExchangeBuy (params) {
    return http.post(bibiChange + 'exchange/create_exchange_buy', params)
  },
  // 创建币币交易卖
  createExchangeSell (params) {
    return http.post(bibiChange + 'exchange/create_exchange_sell', params)
  },
  // 委托列表
  getExchangeSellLlist (params) {
    return http.get(bibiChange + 'exchange/get_exchange_sell_list', params)
  },
  getExchangeBuyList (params) {
    return http.get(bibiChange + 'exchange/get_exchange_buy_list', params)
  },
  cancelExchangeSell (params) {
    return http.patch(bibiChange + 'exchange/cancel_exchange_sell', params)
  },
  cancelExchangeBuy (params) {
    return http.patch(bibiChange + 'exchange/cancel_exchange_buy', params)
  },

  /**
   * 币币交易完成
   */

  // otc充值钱包地址
  otc_finance_wallet (params) {
    return http.get(otcUrl + 'finance/otc_finance_wallet', params)
  },
  // 获取保证金
  get_deposit () {
    return http.get(advertiserUrl + 'otc/get_deposit')
  },
  // 广告主上下线
  advertiser_on_off_line () {
    return http.get(advertiserUrl + 'otc/advertiser_on_off_line')
  },
  // 广告主状态
  advertiser_status () {
    return http.get(advertiserUrl + 'otc/advertiser_status')
  },
  // 评分
  updateScore (params) {
    return http.post(advertiserUrl + 'otc/update_score', params)
  },
  // 申请提取保证金
  apply_deposit () {
    return http.post(advertiserUrl + 'otc/apply_deposit')
  },
  // otc聊天
  createChatInfo (params) {
    return http.post(advertiserUrl + 'otc/chat/create_chat_info', params)
  },
  // 获取聊天列表
  getChatList (params) {
    return http.get(advertiserUrl + 'otc/chat/get_chat_list', params)
  },
  // 判断是否到达新增广告上线
  prohibitransactionT (params) {
    return http.get(advertiserUrl + 'otc/prohibit_transaction', params)
  },
  //  新ui
  otcRecord (params) {
    return http.get(otcUrl + 'finance/otc_finance_history_list', params)
  },
  //  新ui
  // 登录获取国际码
  internationCodeGet () {
    return http.get(base_url + 'sup_agent/common/get_country')
  },
  //  滑块认证
  sliderVerify (params) {
    	return http.post(mobile_url + 'authorize/check', params)
  },
  // 9.06新增 上线 下线
  advertiserShow (params) {
    return http.patch(advertiserUrl + 'otc/advertiser_show', params)
  },
  // 右下角商品订单提醒
  proListShow () {
    return http.get(proListUrl + 'otc/transaction_list_tag')
  },
  // unfree 订单详情，广告主出售KT，
  advertiserSell (pUserId, params) {
    return http.get(unfree + 'finance/otc_finance_wallet/user_id/' + pUserId, params)
  },
  // 右下角商品订单提醒
  // proListShow(){
  //     return http.get('otc/transaction_list_tag')
  // },

  // 下载页面版本号
  downVersionNum (params) {
    return http.get(unfree + 'common/version?versionCode=1&terminal=' + params)
  },
  // 商家广告页，并列显示实名、高级、支付 qrcodeUrl
  otcApposShow () {
    return http.get(qrcodeUrl + 'otc/advertiser_validate_list')
  },
  // 验证交易密码
  check_ping (params) {
    return http.post(ninedown + 'otc/check_ping', params)
  },


  // 添加资金密码，获取用户二次验证信息
  getUserValidata () {
    return http.get('authorize/account_security/validate_info')
  },
  setNewPin (params) {
    return http.post(mobile_url + 'authorize/account_security/create_pin', params)
  },

  // 获取禁币列表
  getForbidMoneyList () {
    return http.get(otcUrl + 'common/coin')
  },
  // 提现
  walletTopUp (params) {
    return http.post('finance/refund_to_merchant', params)
  },
  // 充值
  withdrawal (params) {
    return http.post('finance/pay_to_merchant', params)
  }

}

