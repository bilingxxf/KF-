import Vue from 'vue'
import Router from 'vue-router'
// import Announcement from './views/Announcement.vue'
// const Announcement = (resolve) => require(['./views/Announcement'], resolve)
// import Advertisement from './views/Advertisement.vue'
const Advertisement = (resolve) => require(['./views/Advertisement'], resolve)
// import Order from './views/otc/Order.vue'
const Order = (resolve) => require(['./views/otc/Order.vue'], resolve)
// import Home from './views/Home.vue'
const Home = (resolve) => require(['./views/Home'], resolve)
// import DealCenter from './views/DealCenter.vue'
const DealCenter = (resolve) => require(['./views/DealCenter'], resolve)
// import DealCenterMore from './views/dealCenterAll/dealCenterMore'
const DealCenterMore = (resolve) => require(['./views/dealCenterAll/dealCenterMore'], resolve)
// import OTCDeal from './views/OTCDeal.vue'
const OTCDeal = (resolve) => require(['./views/OTCDeal'], resolve)
// import OTCOrder from './views/otc/OtcOrder.vue'
const OTCOrder = (resolve) => require(['./views/otc/OtcOrder'], resolve)
// import SubmitOrder from './views/otc/SubmitOrder.vue'
const SubmitOrder = (resolve) => require(['./views/otc/SubmitOrder'], resolve)
// import OrderRecord from './views/otc/OrderRecord.vue'
const OrderRecord = (resolve) => require(['./views/otc/OrderRecord'], resolve)
// import HelpCenter from './views/HelpCenter'
// const HelpCenter = (resolve) => require(['./views/HelpCenter'], resolve)
// import Register from './views/login/Register.vue'
const Register = (resolve) => require(['./views/login/Register'], resolve)
// import Login from './views/login/Login.vue'
const Login = (resolve) => require(['./views/login/Login'], resolve)
// import Activities from './views/home/Activities.vue'
// const Activities = (resolve) => require(['./views/home/Activities'], resolve)
// import News from './views/news/News.vue'
// const News = (resolve) => require(['./views/news/News'], resolve)
// import NewsDetails from './views/news/components/NewsDetails.vue'
// const NewsDetails = (resolve) => require(['./views/news/components/NewsDetails'], resolve)
// import Moneybag from './views/moneybag/Moneybag.vue'
const Moneybag = (resolve) => require(['./views/moneybag/Moneybag'], resolve)
// import Recharge from './views/moneybag/pages/Recharge.vue'
const Recharge = (resolve) => require(['./views/moneybag/pages/Recharge'], resolve)
// import WithdrawCash from './views/moneybag/pages/WithdrawCash.vue'
const WithdrawCash = (resolve) => require(['./views/moneybag/pages/WithdrawCash'], resolve)
// import WithdrawRecord from './views/moneybag/pages/WithdrawRecord.vue'
const WithdrawRecord = (resolve) => require(['./views/moneybag/pages/WithdrawRecord'], resolve)
// import Record from './views/moneybag/pages/Record.vue'
const Record = (resolve) => require(['./views/moneybag/pages/Record'], resolve)
// import Transfer from './views/moneybag/pages/Transfer.vue'
// const Transfer = (resolve) => require(['./views/moneybag/pages/Transfer'], resolve)
// import OTCMoneybag from './views/otc/OTCMoneybag/OTCMoneybag.vue'
const OTCMoneybag = (resolve) => require(['./views/otc/OTCMoneybag/OTCMoneybag'], resolve)
// import OTCRecord from './views/otc/OTCMoneybag/pages/OTCRecord.vue'
const OTCRecord = (resolve) => require(['./views/otc/OTCMoneybag/pages/OTCRecord.vue'], resolve)
// import OTCTransfer from './views/otc/OTCMoneybag/pages/OTCTransfer.vue'
// const OTCTransfer = (resolve) => require(['./views/otc/OTCMoneybag/pages/OTCTransfer'], resolve)
// import DealCenterMoneybag from './views/deal/dealCenterMoneybag/DealCenterMoneybag.vue'
const DealCenterMoneybag = (resolve) => require(['./views/deal/dealCenterMoneybag/DealCenterMoneybag'], resolve)
// import DealCenterRecord from './views/deal/dealCenterMoneybag/pages/DealCenterRecord.vue'
const DealCenterRecord = (resolve) => require(['./views/deal/dealCenterMoneybag/pages/DealCenterRecord.vue'], resolve)
// import DealCenterTransfer from './views/deal/dealCenterMoneybag/pages/DealCenterTransfer.vue'
// const DealCenterTransfer = (resolve) => require(['./views/deal/dealCenterMoneybag/pages/DealCenterTransfer'], resolve)
// import DealRecord from './views/deal/dealRecord/DealRecord.vue'
const DealRecord = (resolve) => require(['./views/deal/dealRecord/DealRecord'], resolve)
// import AccountSettings from './views/AccountSettings'
const AccountSettings = (resolve) => require(['./views/AccountSettings'], resolve)
// import SafetyVerification from './views/login/SafetyVerification'
const SafetyVerification = (resolve) => require(['./views/login/SafetyVerification'], resolve)
// import ResetPassword from './views/login/ResetPassword.vue'
const ResetPassword = (resolve) => require(['./views/login/ResetPassword'], resolve)
// import MyAdvertising from './views/otc/MyAdvertising'
const MyAdvertising = (resolve) => require(['./views/otc/MyAdvertising'], resolve)
// import AssetRecord from './views/otc/AssetRecord'
const AssetRecord = (resolve) => require(['./views/otc/AssetRecord'], resolve)
// import Mypromotion from './views/Mypromotion.vue'
const Mypromotion = (resolve) => require(['./views/Mypromotion'], resolve)
// import Mynews from './views/mymessage/Mynews.vue'
const Mynews = (resolve) => require(['./views/mymessage/Mynews'], resolve)
// import AccountVerify from './views/login/AccountVerify.vue'
const AccountVerify = (resolve) => require(['./views/login/AccountVerify'], resolve)
// import messagelist from './views/messagelist.vue'
const messagelist = (resolve) => require(['./views/messagelist'], resolve)
// import baseInfo from './views/otc/baseInfo/BaseInfo'
const baseInfo = (resolve) => require(['./views/otc/baseInfo/BaseInfo'], resolve)
// import Page from './views/page/Page.vue'
const Page = (resolve) => require(['./views/page/Page'], resolve)
// import ComingSoon from './views/comingSoon/comingSoon.vue'
const ComingSoon = (resolve) => require(['./views/comingSoon/comingSoon'], resolve)
// import MerchantAdver from './views/otc/MerchantAdver.vue'
const MerchantAdver = (resolve) => require(['./views/otc/MerchantAdver'], resolve)
// import NextRegister from './views/login/NextRegister'
const NextRegister = (resolve) => require(['./views/login/NextRegister'], resolve)
// import checkHistoryLogin from './views/PersonalSettingsPopover/checkHistoryLogin'
const checkHistoryLogin = (resolve) => require(['./views/PersonalSettingsPopover/checkHistoryLogin'], resolve)
// import assetOverview from './views/AssetOverview.vue'
const assetOverview = (resolve) => require(['./views/AssetOverview'], resolve)
// KF用户协议
// import Kfuserpro from './views/kfuserpro.vue'
const Kfuserpro = (resolve) => require(['./views/kfuserpro'], resolve)
// 客户端下载
// import client from './views/client.vue'
const client = (resolve) => require(['./views/client'], resolve)
// 隐私条款
// import Privacy from './views/Privacy.vue'
const Privacy = (resolve) => require(['./views/Privacy'], resolve)
// 法律法规
// import Legislation from './views/Legislation.vue'
const Legislation = (resolve) => require(['./views/Legislation'], resolve)
// 钱包记录
// import walletRecord from './views/moneybag/pages/walletRecord.vue'
const walletRecord = (resolve) => require(['./views/moneybag/pages/walletRecord'], resolve)
// 提币记录（进度）
// import MentionRecord from './views/moneybag/pages/MentionRecord.vue'
const MentionRecord = (resolve) => require(['./views/moneybag/pages/MentionRecord'], resolve)
// 充值记录（进度）
// import rechargeRecord from './views/moneybag/pages/rechargeRecord.vue'
const rechargeRecord = (resolve) => require(['./views/moneybag/pages/rechargeRecord'], resolve)
// 广告设置
// import setAdvertising from './views/otc/setAdvertising.vue'
const setAdvertising = (resolve) => require(['./views/otc/setAdvertising'], resolve)
// 保证金管理
// import cashDeposit from './views/moneybag/cashDeposit.vue'
const cashDeposit = (resolve) => require(['./views/moneybag/cashDeposit'], resolve)

// 数字资产介绍
// import DigitalAsset from './views/DigitalAsset.vue'
const DigitalAsset = (resolve) => require(['./views/DigitalAsset'], resolve)
// 关于我们
// import aboutUs from './views/aboutUs.vue'
const aboutUs = (resolve) => require(['./views/aboutUs'], resolve)

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/announcement',
            name: 'Announcement',
            // component: Announcement
            component: ComingSoon
        },
        {
            path: '/advertisement',
            name: 'Advertisement',
            component: Advertisement
            // component: ComingSoon
        },
        {
            path: '/order',
            name: 'Order',
            component: Order,
            meta: {
                requireAuth: true,
            },
            // component: ComingSoon
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
            // component: ComingSoon
        },
        {
            path: '/exchange/:symbol',
            name: 'exchange',
            component: DealCenter,
            // component: ComingSoon
        }, {
            path: '/exchange/exchangeMore/:symbol',
            name: 'dealCenterMore',
            component: DealCenterMore
            // component: ComingSoon
        }, {
            path: '/otc-deal',
            name: 'OTCDeal',
            component: OTCDeal,
            // component: ComingSoon

        },
        {
            path: '/otc-order',
            name: 'OTCOrder',
            component: OTCOrder,
            meta: {
                requireAuth: true,
            },
            // component: ComingSoon
        },
        {
            path: '/submit-order',
            name: 'SubmitOrder',
            component: SubmitOrder
            // component: ComingSoon
        },
        {
            path: '/order-record',
            name: 'OrderRecord',
            component: OrderRecord
            // component: ComingSoon
        },
        {
            path: '/helpCenter',
            name: 'HelpCenter',
            //component: HelpCenter
            component: ComingSoon
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
            // component: ComingSoon
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
            // component: ComingSoon
        },
        {
            path: '/nextRegister',
            name: 'NextRegister',
            component: NextRegister,
//          meta: {
//              requireAuth: true,
//          },
        },
        {
            path: '/news',
            name: 'News',
            // component: News
            component: ComingSoon
        },
        {
            path: '/newsDetails',
            name: 'NewsDetails',
            // component: NewsDetails
            component: ComingSoon
        },
        {
            path: '/moneybag',
            name: 'Moneybag',
            component: Moneybag,
            meta: {
                requireAuth: true,
            },
            // component: ComingSoon
        },
        {
            path: '/assetOverview',
            name: 'AssetOverview',
            component: assetOverview,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/recharge',
            name: 'Recharge',
            component: Recharge
            // component: ComingSoon
        },
        {
            path: '/withdrawCash',
            name: 'WithdrawCash',
            component: WithdrawCash
            // component: ComingSoon
        },
        {
            path: '/WithdrawRecord',
            name: 'WithdrawRecord',
            component: WithdrawRecord
            // component: ComingSoon
        },
        {
            path: '/record',
            name: 'Record',
            component: Record
            // component: ComingSoon
        },
        {
            path: '/OTCMoneybag',
            name: 'OTCMoneybag',
            component: OTCMoneybag,
            meta: {
                requireAuth: true,
            }
            // component: ComingSoon
        },
        {
            path: '/OTCRecord',
            name: 'OTCRecord',
            component: OTCRecord
            // component: ComingSoon
        },
        {
            path: '/OTCTransfer',
            name: 'OTCTransfer',
            // component: OTCTransfer
            component: ComingSoon
        },
        {
            path: '/dealCenterRecord',
            name: 'DealCenterRecord',
            component: DealCenterRecord
            //component: ComingSoon
        },
        {
            path: '/dealCenterTransfer',
            name: 'DealCenterTransfer',
            // component: DealCenterTransfer
            component: ComingSoon
        },
        {
            path: '/dealRecord',
            name: 'DealRecord',
            component: DealRecord,
            meta: {
                requireAuth: true,
            }
            // component: ComingSoon
        },
        {
            path: '/safetyVerification',
            name: 'SafetyVerification',
            component: SafetyVerification
            // component: ComingSoon
        },
        {
            path: '/resetPassword',
            name: 'ResetPassword',
            component: ResetPassword
            // component: ComingSoon
        },
        {
            path: '/MyAdvertising',
            name: 'MyAdvertising',
            component: MyAdvertising
            // component: ComingSoon
        },
        {
            path: '/AssetRecord',
            name: 'AssetRecord',
            component: AssetRecord
            // component: ComingSoon
        },
        {
            path: '/accountSettings',
            name: 'AccountSettings',
            component: AccountSettings
            // component: ComingSoon
        },
        {
            path: '/mypromotion',
            name: 'Mypromotion',
            component: Mypromotion
            // component: ComingSoon
        },
        {
            path: '/mynews',
            name: 'Mynews',
            component: Mynews
            // component: ComingSoon
        },
        {
            path: '/Transfer',
            name: 'Transfer',
            // component: Transfer
            component: ComingSoon
        },
        {
            path: '/baseInfo',
            name: 'baseInfo',
            component: baseInfo
            // component: ComingSoon
        },
        {
            path: '/DealCenterMoneybag',
            name: 'DealCenterMoneybag',
            component: DealCenterMoneybag,
            meta: {
                requireAuth: true,
            },
            // component: ComingSoon
        },
        {
            path: '/accountVerify',
            name: 'AccountVerify',
            component: AccountVerify
            // component: ComingSoon
        },
        {
            path: '/page',
            name: 'Page',
            component: Page
            // component: ComingSoon
        },
        {
            path: '/messagelist',
            name: 'messagelist',
            component: messagelist,
            // component: ComingSoon
        },
        {
            path: '/activities',
            name: 'Activities',
            // component: Activities,
            component: ComingSoon
        },
        {
            path: '/otc-adver',
            name: 'MerchantAdver',
            component: MerchantAdver
        },
        {
            path: '/checkHistoryLogin',
            name: 'checkHistoryLogin',
            component: checkHistoryLogin


        },
        { //Kfuserpro 用户协议
            path: '/kfuserpro',
            name: 'kfuserpro',
            component: Kfuserpro
        },
        { //客户端下载
            path: '/client',
            name: 'client',
            component: client
        },
        { //隐私条款
            path: '/privacy',
            name: 'privacy',
            component: Privacy
        },
        { //法律法规
            path: '/legislation',
            name: 'Legislation',
            component: Legislation
        },
        {
            path: '/setadvertising',
            name: 'setAdvertising',
            component: setAdvertising
        },
        { // 钱包记录
            path: '/walletrecord',
            name: 'walletRecord',
            component: walletRecord
        },
        { // 提币记录（进度）
            path: '/mentionrecord',
            name: 'MentionRecord',
            component: MentionRecord
        },
        { // 充值记录（进度）
            path: '/rechargerecord',
            name: 'rechargeRecord',
            component: rechargeRecord
        },
        { // 保证金管理 cashDeposit
            path: '/cashdeposit',
            name: 'cashDeposit',
            component: cashDeposit
        },
        { // 数字资产介绍
            path: '/digitalasset',
            name: 'DigitalAsset',
            component: DigitalAsset
        },
        { // 关于我们
            path: '/aboutus',
            name: 'aboutUs',
            component: aboutUs
        },
        { // 敬请期待
            path: '/ComingSoon',
            name: 'ComingSoon',
            // component: Announcement
            component: ComingSoon
        },

    ]
})
