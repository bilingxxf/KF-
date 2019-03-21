// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview';
import './../static/css/iview.min.css';
// import { Message } from "iview"
import VueI18n from 'vue-i18n'
import i18n from './lang'
// import 'iview/dist/styles/iview.css'
import '@/common/style/style.css'
import '@/common/style/dealCenter/fn.css'
import './../static/css/style.css'
import './../static/css/global.scss'
import './../static/css/common.css'
import 'swiper/dist/css/swiper.css'

import App from './App'
import router from './routes'
import axios from 'axios'
import store from './store/store.js'
// import api from './api.js'
import utils from './utils.js'

import { scientificToNumber } from './common/js/N.js'

import black_prop from './views/common/js/black_prop.js'
import FundPas from './views/common/js/FundPas.js'
Vue.prototype.$black_prop = black_prop
Vue.prototype.$FundPas = FundPas

Vue.prototype.$http = axios


Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueI18n)


router.beforeEach((to, from, next) => {
  if (utils.isLogin()) { // 获取用户所有信息并且保存
    if (!store.state.userStatus) {
      store.dispatch('getUserStatus')
    }
  }

  if (to.matched.some(record => record.meta.requireAuth)) { // 需要登录权限
    if (utils.isLogin()) {
      next()
    } else {
      let params = {
        isLogin: false
      }
      store.commit('LOGOUT', params)
      iView.Message.error('请先登录！')
      next({
        path: '/home'
        // query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})


// 大于1 小数点后2位
// 小于1 小数点后8位
Vue.filter('decimalPoint', function (value) {
  value = value + ''
  var pointLeft = value.split('.')[0]
  var pointRight = value.split('.')[1]

  if (pointLeft > 0 && pointRight && pointRight.length > 0) {
    pointRight = pointRight.substr(0, 2)
    return pointLeft + '.' + pointRight
  } else if (pointLeft == 0 && pointRight && pointRight.length > 8) {
    pointRight = pointRight.substr(0, 8)
    return pointLeft + '.' + pointRight
  } else {
    return value
  }
})
Vue.filter('timeToDate', function (value) {
  let date = new Date(value * 1000)
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()
  let H = date.getHours()
  let I = date.getMinutes()
  let S = date.getSeconds()
  return Y + '-' + addZero(M) + '-' + addZero(D) + ' ' + addZero(H) + ':' + addZero(I) + ':' + addZero(S)

  function addZero (x) {
    return x < 10 ? '0' + x : '' + x
  }
})
Vue.filter('scientificToNumber', scientificToNumber)

new Vue({
  el: '#app',
  router,
  i18n: i18n(VueI18n),
  store,
  components: { App },
  template: '<App/>'
})
