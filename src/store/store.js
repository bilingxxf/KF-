import Vue from 'vue'
import Vuex from 'vuex'
import api from './../api.js'
import axios from 'axios'
import router from '../routes'
import utils from '../utils';
import { resolve } from 'uri-js'

Vue.use(Vuex)


const LOGIN_EMAIL = LOGIN_EMAIL
const LOGIN_SUCCESS = LOGIN_SUCCESS
const TOKEN = TOKEN // token
const EMAIL_KEY = EMAIL_KEY
const LOGOUT = LOGOUT
const domain = location.origin
const onLine = !!(domain.indexOf('localhost') === -1 && domain.indexOf('192') === -1)

function compare (property) {
  return function (a, b) {
    var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
    }
}
let socketAdr
if (localStorage.getItem('ip')) {
  socketAdr = localStorage.getItem('ip')
} else {
  socketAdr = !onLine ? 'https://www.kf.com' : document.domain
}
// 应用初始状态
const state = {
  frontUser: null,
  hideFooter: false,
  socketAdr: socketAdr, // https://www.bitboole.com
  OTCOrderShow: 0, // 头部otc订单状态
  dealShow: 0, // 头部交易记录状态
  router: '',
  loginInfo: { // 登录信息
    isLogin: false,
    mailInfo: {},
    phoneInfo: {},
    googleInfo: {},
    name: ''
  },

  userStatus: '', // 用户所有信息
  registerInfo: { // 注册信息
    email_key: ''
  },
  forgetInfo: { // 忘记密码信息
    validateEmail: {}
  },
  token: '', // 返回的token
  tokenImg: '',
  scType: 2, // 钱包资产
  delecent_price: 0,
  /**
     *
     * 币币交易
     */
  symbol: {
    coin_id: '-',
    coin_image: '',
    coin_status: '-',
    coin_type_id: '-',
    name: '-',
    newPre: '-',
    pre: '-',
    price: '0',
    symbol: localStorage.getItem('symbol') ? localStorage.getItem('symbol') : 'ETH_USDT',
    up: '-',
    pri_id: '-',
    istrue: true
  }, // 商品
  // 小数点后几位 最小交易金额
  detailObjList: [],
  detailObj: {
    pointLengthAss: '8',
    pointLengthPri: '8',
    minDealPriceAss: '0',
    minDealPricePri: '0',
    pre: '1'
  },

  moneyMesAss: {},
  moneyMesPri: {},
  isKline: 'K', // 切换K线图深度
  coinList: [], // 所有币列表
  depthFix: 0.0001, // 深选择
  exchangeFinanceList: [], // 获取用户资产信息列表
  exchangeFinance: [], // 获取用户资产信息详情和交易手续费率
  symbolList: [], // 获取交易对列表
  nowExchangeList: [], // 当前委托列表数据
  hisExchangeList: [], // 历史委托列表数据
  toCurrency: {
    currentName: '',
    arr: [],
    usdArr: []
  }, // 转换美元
  onLine: onLine,
  FileOnline: domain.indexOf('bitboole') === -1 ? 'https://static.kf.com' : 'https://static.bitboole.com'
}

// 应用初始状态
const getters = {
  userStatus (state) {
    return state.userStatus
  },
  frontUser (state) {
    return state.frontUser
  },
  hideFooter (state) {
    return state.hideFooter
  },
  socketAdr (state) {
    return state.socketAdr
  },
  isLogin (state) {
    return state.loginInfo.isLogin
  },

  name () { // 测试
    return 1 + 1
  },
  /**
     *
     * 币币交易
     */
  symbol (state) {
    return state.symbol
  },
  symbolAss (state) {
    return state.symbol.symbol.split('_')[0].toLowerCase()
  },
  symbolPri (state) {
    return state.symbol.symbol.split('_')[1].toLowerCase()
  },
  isKline (state) {
    return state.isKline
  },
  coinList (state) {
    return state.coinList
  },
  exchangeFinanceList (state) {
    return state.exchangeFinanceList
  },
  exchangeFinance (state) {
    return state.exchangeFinance
  },
  symbolList (state) {
    return state.symbolList
  },
  moneyMesAss (state) {
    return state.moneyMesAss
  },
  moneyMesPri (state) {
    return state.moneyMesPri
  },
  nowExchangeList (state) {
    return state.nowExchangeList
  },
  hisExchangeList (state) {
    return state.hisExchangeList
  },
  toCurrency (state) {
    return state.toCurrency
  },
  depthFix (state) {
    return state.depthFix
  },
  scType (state) { // 资产总览导航栏
    return state.scType
  },
  delecent_price (state) {
    return state.delecent_price
  },
  detailObj (state) {
    return state.detailObj
  },
  detailObjList (state) {
    return state.detailObjList
  }
}

// 定义所需的 actions
const actions = {
  login ({ commit }, params) { // 登录
    return api.login(params)
    },
  registerEmail ({ commit }, params) { // 邮箱验证
    api.registerEmail(params).then(res => {
      commit('EMAIL_KEY', res.data)
    }).catch(err => {

    })
    },
  register ({ commit }, params) { // 注册
    return api.register(params)
    },
  workingList ({ commit }, params) { // 工单
    api.workingList(params).then(res => {

      // commit('TOKEN', res.data.token);
    }).catch(err => {

    })
  },

  /**
     * 用户所有信息
     */

  getUserStatus ({ commit }, params) {
    api.accountSSetting().then(res => {
      if (res.status_code == 200) {
        commit('getUserStatus', res.data)
      }
    })
  },

  /**
     *
     * 币币交易
     */
  getCoinList ({ commit }, params) {
    api.getCoinList(params).then(data => {
      if (data.status_code == 200) {
        commit('getCoinList', data.data)
      }
    })
  },
  getExchangeFinance ({ commit }, params) {
    api.getExchangeFinance().then(data => {
      if (data.status_code == 200) {
        commit('getExchangeFinance', data.data)
      }
    })
  },
  getExchangeFinanceList ({ commit }) {
    api.getExchangeFinanceList().then(data => {
      if (data.status_code == 200) {
        commit('getExchangeFinanceList', data.data)
      }
    })
  },
  getSymbolList ({ commit }, params) {
    api.getSymbolList(params).then(data => {
      if (data.status_code == 200) {
        commit('getSymbolList', data.data)
      }
    })
  },
  getMoneyMes ({ commit }, params) {
    if (utils.isLogin()) {
      api.getExchangeFinance(params.ass).then(res => {
        if (res.status_code == 200) {
          commit('getMoneyMesAss', res.data)
        }
      })
      api.getExchangeFinance(params.pri).then(res => {
        if (res.status_code == 200) {
          commit('getMoneyMesPri', res.data)
        }
      })
    }
  },
  getExchangeList ({ commit }, params) {
    if (utils.isLogin()) {
      let data1 = []
      let data2 = []
      let returnData = []
      var Pro1 = new Promise((resolve, reject) => {
        api.getExchangeSellLlist(params).then(res => {
          if (res.status_code == 200) {
            data1 = res.data.list
            resolve(data1)
          } else {
            rejected()
          }
        })
      })

      var Pro2 = new Promise((resolve, reject) => {
        api.getExchangeBuyList(params).then(res => {
          if (res.status_code == 200) {
            data2 = res.data.list
            resolve(data2)
          } else {
            rejected()
          }
        })
      })

      Promise.all([Pro1, Pro2]).then(() => {
        returnData = data1.concat(data2)
        commit('getExchangeList', returnData)
      })
    }
  },
  gettoCurrency ({ commit }, params) {
    var coinToUSD, usdToOthers
    api.rateCoinRequest().then(res => {
      coinToUSD = res.data.quotes
      state.toCurrency.usdArr = { ...coinToUSD }
      // 根据语言算汇率
      api.rateMoneyRequest().then(res => {
        commit('gettoCurrency', { coinToUSD, num: res.data.rates[localStorage.getItem('currency')] })
      })
    })
    // 每三分钟自动获取汇率
    setInterval(() => {
      api.rateCoinRequest().then(res => {
        coinToUSD = res.data.quotes
        // 根据语言算汇率
        api.rateMoneyRequest().then(res => {
          commit('gettoCurrency', { coinToUSD, num: res.data.rates[localStorage.getItem('currency')] })
        })
      })
    }, 900000)
  }
}

// 定义所需的 mutations
const mutations = {
  hideFooter (state, show) {
    state.hideFooter = show
  },
  istodidown (state, data) { // 手机页面显示二维码
    // console.log(data);
    state.isshowtodidown = data
    // console.log(state.isshowtodidown);
  },
  'CLEAR_EXCHANG_LIST' (state, data) {
    state.nowExchangeList = []
    state.hisExchangeList = []
  },
  'CLEAR_FRONT_USER' (state) {
    state.frontUser = null
  },
  // isIncrement(state, Blean){   //右下角商家订单展示隐藏
  //     state.isStopPop = Blean
  // },
  'LOGIN_SUCCESS' (state, data) { // 登录成功
    state.loginInfo.isLogin = true
        state.loginInfo.name = data.name
        // localStorage.setItem('username', data.name);

        utils.setCookie('username', data.name)
        utils.setCookie('isLogin', true)
    },
  'TOKEN' (state, data) { // 存token
    state.token = data
        // localStorage.setItem('token', data)

        utils.setCookie('token', data)

        if (utils.getCookie('return_to')) {
      var url = utils.getCookie('return_to')
      utils.setCookie('return_to', '')
      window.location.href = url
    }
    // let token = localStorage.getItem('token');
    axios.defaults.headers['Authorization'] = 'Bearer' + data
    },
  'EMAIL_KEY' (state, data) { // 二次验证邮箱信息
    state.registerInfo.email_key = data.email_key
  },
  'LOGOUT' (state, data) { // 退出
    console.log('store.logout')
    state.loginInfo.isLogin = data.isLogin
        state.frontUser = utils.getCookie('username')
        utils.setCookie('username', '')
        utils.setCookie('token', '')
        utils.setCookie('isLogin', false)
        state.dealShow = 4


    },
  'router' (state, data) {
    state.router = data
    },

  getUserStatus (state, data) {
    state.userStatus = data
  },

  changeDealShow (state, data) { // 头部交易记录状态
    if (utils.isLogin()) {
      state.dealShow = data
        } else {
      // 未登录不显示
      state.dealShow = 4
        }
  },
  changeOTCOrderShow (state, data) { // 头部otc订单状态
    state.OTCOrderShow = data
    },
  loginInformation (state, data) { // 登录信息
    state.loginInfo.name = data
        state.loginInfo.isLogin = true
  },
  emailInfo (state, data) { // 登录信息-邮箱
    state.loginInfo.mailInfo = data
    },
  phoneInfo (state, data) { // 登录信息-手机
    state.loginInfo.phoneInfo = data
    },
  googleInfo (state, data) { // 登录信息-谷歌
    state.loginInfo.googleInfo = data
    },
  validateEmailInfo (state, data) { // 邮箱验证信息
    state.forgetInfo.validateEmail = data
    },
  imgToken (state, data) {
    state.tokenImg = data
  },
  change_delecent_price (state, data) {
    state.delecent_price = data
  },
  /**
     *
     * 币币交易
     */
  changeSymbol (state, data) {
    // 查询资产undefine解决办法
    if (!state.coinList.list) return
    state.coinList.list.forEach((val, index) => {
      if (val.coin_name == data.symbol.split('_')[1]) {
        data.pri_id = val.coin_id
      }
    })


    state.symbol = data
    localStorage.setItem('symbol', data.symbol)
    if (!state.detailObjList) return
    // 更换小数点后几位， 最小交易金额
    state.detailObjList.forEach((val, index) => {
      if (val.Symbol == state.symbol.symbol) {
        state.detailObj.pointLengthAss = val.LeftPointLow
        state.detailObj.minDealPriceAss = val.LeftMinTrans
        state.detailObj.pointLengthPri = val.RightPointLow
        state.detailObj.minDealPricePri = val.RightMinTrans
        state.detailObj.pre = val.Premium
      }
    })
  },
  // 深度图K线图切换
  changeKorD (state, data) {
    state.isKline = data
  },
  getCoinList (state, data) {
    state.coinList = data
  },
  getExchangeFinanceList (state, data) {
    state.exchangeFinanceList = data
  },
  getExchangeFinance (state, data) {
    state.exchangeFinance = data
  },
  getSymbolList (state, data) {
    state.symbolList = data
  },
  getMoneyMesAss (state, data) {
    state.moneyMesAss = data
  },
  getMoneyMesPri (state, data) {
    state.moneyMesPri = data
  },
  getExchangeList (state, data) {
    var data1 = []
    var data2 = []
    // 筛选当前交易对
    data.forEach((val, index) => {
      if (val.symbol == state.symbol.symbol) {
        val.count = Date.parse(val.updated_at)
        if (val.exchange_status == 1) {
          data1.push(val)
        } else {
          data2.push(val)
        }
      }
    })
    data1 = data1.sort(compare('count'))
    data2 = data2.sort(compare('count'))
    state.nowExchangeList = data1
    state.hisExchangeList = data2
  },
  gettoCurrency (state, data) {
    state.toCurrency.currentName = localStorage.getItem('currency')
    for (let k in data.coinToUSD) {
      data.coinToUSD[k] = data.coinToUSD[k] / data.num
    }
    state.toCurrency.arr = data.coinToUSD
  },

  // 更换神选择数值
  setDepthFix (state, data) {
    state.depthFix = data
  },
  scType (state, type) { //  资产总览导航栏
    state.scType = type
  },
  // 更换小数点后几位， 最小交易金额
  setDetailObjList (state, data) {
    state.detailObjList = data
    state.detailObjList.forEach((val, index) => {
      if (val.Symbol == state.symbol.symbol) {
        state.detailObj.pointLengthAss = val.LeftPointLow
        state.detailObj.minDealPriceAss = val.LeftMinTrans
        state.detailObj.pointLengthPri = val.RightPointLow
        state.detailObj.minDealPricePri = val.RightMinTrans
        state.detailObj.pre = val.Premium
      }
    })
  }

}



// 创建 store 实例
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
