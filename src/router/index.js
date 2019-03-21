import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Announcement from './views/Announcement.vue'
import Advertisement from './views/Advertisement.vue'
import Order from './views/Order.vue'
import Home from './views/Home.vue'
import DealCenter from './views/DealCenter.vue'
import OTCDeal from './views/OTCDeal.vue'
import OTCOrder from './views/otc/OtcOrder.vue'
import SubmitOrder from './views/otc/SubmitOrder.vue'
import OrderRecord from './views/otc/OrderRecord.vue'
import HelpCenter from './tools/HelpCenter'
import USDT from './tools/nav/Introduce/USDT'
import BTC from './tools/nav/Introduce/BTC'
import News from './views/news/News.vue'
import Login from './views/login/Login.vue'
import NewsDetails from './views/news/components/NewsDetails.vue'
import MoneybagManagement from './views/moneybag/MoneybagManagement.vue'
import Recharge from './views/moneybag/pages/Recharge.vue'
import WithdrawCash from './views/moneybag/pages/WithdrawCash.vue'
import AccountSettings from './views/AccountSettings'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,

    },
    {
      path: '/announcement',
      name:'Announcement',
      component:Announcement
    }
  ]
})
