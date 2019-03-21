<template>
    <div class="moneybagbody">
        <div class="header">
            <p class="moneybag">钱包</p>
            <i-Switch v-model="switch1" @on-change="change"></i-Switch>
            <p class="button-desc">只显示有资金币种（隐藏0资金币种）</p>
            <div class="search">
                <input type="text" v-model="searchword" :placeholder="$t(`message.MoneyBag.searchPlaceholder`)">
                <button>
                    <span class="icon-search"></span>
                </button>
            </div>
        </div>
        <div class="container">
            <table class="table-title">
                <tr class="tr-first">
                    <th class="col1">币种</th>
                    <th class="col2">可用数量</th>
                    <th class="col3">总计</th>
                    <th class="col4">估算为人民币</th>
                    <th class="opration col5th">操作</th>
                </tr>
            </table>
            <div class="table-container">
                <Spin size="large" fix v-if="spinShow"></Spin>
                <table v-if="list.length > 0">
                    <tr v-for="(item,index) of list" :key="index">
                        <td class="currency col1">
                            <span><img :src="item.coin_image" alt=""></span> {{item.coin_name}}</td>
                        <td class="availableBalance col2">{{item.finance_available}}</td>
                        <td class="col3">{{item.finance_amount}}</td>
                        <td class="col4">{{item.finance_amount_rmb | numFilter}}</td>
                        <td class="opration col5" :class="{moneybag_col5_width:isA}">
                            <span class="a-first" @click="judge('recharge',item.coin_id)">
                                <span class="icon-recharge"></span>充值
                            </span>
                             <span @click="judge('withdraw',item.coin_id)">
                                <span class="icon-withdraw"></span>提币
                            </span>
                            <router-link :to="{path:'/Record', query:{coin_id:item.coin_id}}" tag="span">
                                <span class="icon-record"></span>记录
                            </router-link>
                             <span @click="judge('transfer',item.coin_id,item.finance_id)">
                                <span class="icon-deal"></span>划转
                            </span>
                        </td>
                    </tr>
                </table>
                <div class="moneybagNomassage" v-else>
                    <div>
                        <span class="icon-no_info"></span>
                    </div>
                    <p>暂无数据</p>
                </div>
            </div>
            <div class="moneybagbodyp"> 当前共 {{this.list.length}} 币种</div>
        </div>
        <transfer v-if="show" v-on:close="closeTransfer()" :id="id" :otherId="otherId"></transfer>
        <withdraw-tip v-show="withdraw" @close="close('withdrawtip')"></withdraw-tip>
        <tip v-show="tip" @close="close('tip')" :massage="massage"></tip>
    </div>
</template>
<script>
import api from '../../api.js'
import Transfer from './pages/Transfer.vue'
import WithdrawTip from './components/WithdrawTip.vue'
import Tip from './components/Tip.vue'
export default {
    name: "Currency",
    components: {
        Transfer,
        WithdrawTip,
        Tip
    },
    data() {
        return {
            isA: true,                  //表格宽度样式状态值
            hiddenzeromoney: false,      //资金为0显示或隐藏
            show: false,                //划转弹窗
            withdraw: false,            //设置资金密码弹窗
            tip: false,                 //币种状态弹窗
            spinShow: false,
            coin_status: '',             //币种状态
            massage: '',                 //币种状态弹窗提示内容
            moneypsw: '',                //资金密码设置与否
            switch1: false,
            searchword: '',
            DCList: [],
            id: '',                      //传入划转弹窗的id
            otherId: '',
            timeroutApi: null,          //计时器
            rateTotal: [],
            coinRate: [],
            cny: 0,
            usdt: 0,
        }
    },
    filters: {
        numFilter(value) {
            return value.toFixed(2);
        }
    },
    computed: {
        list() {                   //搜索
            let search = this.searchword;
            if (!this.hiddenzeromoney && search) {
                return this.DCList.filter(product => {
                    return Object.keys(product).some(key => {
                        // return String(product[key]).toLowerCase().indexOf(search.toLowerCase()) > -1
                        return String(product.coin_name).toLowerCase().indexOf(search.toLowerCase()) > -1;
                    })
                })
            } else if (this.hiddenzeromoney && search) {          //开
                return this.DCList.filter(product => {
                    return Object.keys(product).some(key => {
                        return String(product.coin_name).toLowerCase().indexOf(search.toLowerCase()) > -1 && String(product.finance_amount) > 0;
                    })
                })
            } else if (this.hiddenzeromoney) {
                return this.DCList.filter(product => {
                    return Object.keys(product).some(key => {
                        return String(product.finance_amount) > 0
                    })
                })
            } else if (!this.hiddenzeromoney) {
                return this.DCList.filter(product => {
                    return Object.keys(product).some(key => {
                        return String(product)
                    })
                })
            }
            return this.DCList;
        }
    },
    methods: {
        //货币汇率接口
        refresh() {
            this.spinShow = true;
            api.rateCoinRequest().then(res => {
                if (res.code == 200) {
                    this.coinRate = res.data.quotes;
                    this.moneybaglist();
                }
            }).catch(error => { console.log(error) });
            api.rateMoneyRequest().then(res => {
                this.moneyRate = res.data.rates;
            }).catch(error => { console.log(error) });
        },
        //钱包列表
        moneybaglist() {
            api.moneybagList().then(res => {
                if (res.status_code == 200) {
                    this.spinShow = false;
                    this.DCList = res.data.list;
                    if (this.DCList.length != 0) {                          //汇率换算
                        this.DCList.map((val, index) => {
                            for (let i in this.coinRate) {
                                if (val.coin_name == i) {
                                    val.finance_amount_rmb = ((val.finance_amount / this.coinRate[i]) * this.moneyRate.CNY);
                                }
                            }
                            let realVal = Number(val.finance_amount_rmb).toFixed(2);
                            let eachRMB = parseFloat(realVal);
                            this.rateTotal.push(eachRMB);
                        })
                        let totalRMB = this.rateTotal.reduce(this.totalAssets);         //人民币累加
                        let totalUSD = totalRMB / this.moneyRate.CNY;                     //换算美元
                        let totalUSDT = totalUSD * this.coinRate.USDT;                    //换算USDT
                        let totalMoney = {
                            RMB: totalRMB,
                            USD: totalUSD,
                            USDT: totalUSDT
                        };
                        this.$emit('showCityName', totalMoney);                          //累加值和换算值传到父组件
                        this.rateTotal.splice(0, this.rateTotal.length)                 //清除人民币累加
                    }
                    if (this.list.length > 12) {                  //表格宽度对齐
                        this.isA = false
                    } else {
                        this.isA = true
                    }
                }
            }).catch(error => { console.log(error) });
        },
        //人民币累加
        totalAssets(total, currentValue) {
            return total + currentValue
        },
        //币种状态判断
        judge(which, val, val2) {
            let params = {
                coin_id: val
            }
            api.judge(params).then(res => {
                if (res.status_code == 200) {
                    this.coin_status = res.data.coin_status                 //币种状态值
                    this.moneypsw = res.data.ping_status                    //是否设置资金密码

                    if (this.coin_status == 1) {                              //禁用币种
                        this.massage = '该币目前已下架，有疑问请联系平台确认！'
                        this.tip = true
                    }
                    else if (this.coin_status == 2) {                         //正常币种
                        if (which == 'recharge') {                  //充值跳转
                            this.$router.push({
                                path: '/recharge', query: { coin_id: val }
                            })
                        }
                        else if (which == 'withdraw') {
                            if (this.moneypsw == 1) {                 //已设置资金密码，提币跳转
                                this.$router.push({
                                    path: '/withdrawCash', query: { coin_id: val }
                                })
                            } else {
                                this.withdraw = true                  //提示设置资金密码
                            }
                        }
                        else if (which == 'transfer') {             //划转跳转
                            //关闭计时器
                            if (this.timeroutApi) {               //三分钟汇率刷新暂停
                                clearInterval(this.timeroutApi);
                            }
                            this.id = val2
                            this.otherId = val
                            this.show = true;
                        }
                    }
                    else if (this.coin_status == 3) {                 //禁止充值、提现
                        if (which == 'transfer') {                  //划转跳转
                            //关闭计时器
                            if (this.timeroutApi) {               //三分钟汇率刷新暂停
                                clearInterval(this.timeroutApi);
                            }
                            this.id = val2
                            this.otherId = val
                            this.show = true;
                        }
                        else {
                            this.tip = true
                            this.massage = '该币目前不支持充值提币，有疑问请联系平台确认！'
                        }
                    }
                    else if (this.coin_status == 4) {
                        if (which == 'recharge') {                  //充值跳转
                            this.massage = '禁止充值'
                            this.tip = true
                        }
                        else if (which == 'withdraw') {
                            if (this.moneypsw == 1) {                 //已设置资金密码，提币跳转
                                this.$router.push({
                                    path: '/withdrawCash', query: { coin_id: val }
                                })
                            } else {
                                this.withdraw = true                  //提示设置资金密码
                            }
                        }
                        else if (which == 'transfer') {             //划转跳转
                            //关闭计时器
                            if (this.timeroutApi) {               //三分钟汇率刷新暂停
                                clearInterval(this.timeroutApi);
                            }
                            this.id = val2
                            this.otherId = val
                            this.show = true;
                        }
                    } else if (this.coin_status == 5) {
                        if (which == 'recharge') {                  //充值跳转
                            this.$router.push({
                                path: '/recharge', query: { coin_id: val }
                            })
                        }
                        else if (which == 'withdraw') {
                            this.massage = '禁止提币'
                            this.tip = true
                        }
                        else if (which == 'transfer') {             //划转跳转
                            //关闭计时器
                            if (this.timeroutApi) {               //三分钟汇率刷新暂停
                                clearInterval(this.timeroutApi);
                            }
                            this.id = val2
                            this.otherId = val
                            this.show = true;
                        }
                    }
                }
            }).catch(error => { console.log(error) })
        },
        //隐藏资金为零的币种（switch）
        change(status) {
            if (this.list.length > 12) {                    //表格宽度对齐
                this.isA = false
            } else {
                this.isA = true
            }
            if (status) {                   //打开开关，隐藏0资金币种
                this.hiddenzeromoney = true;
            } else {                        //关闭开关，显示0资金币种
                this.hiddenzeromoney = false;
            }
        },
        //划转弹窗关闭
        closeTransfer() {
            this.refresh()
            this.show = false;
        },
        //币种状态、资金密码设置弹窗关闭
        close(val) {
            if (val == 'withdrawtip') {
                this.withdraw = false
            }
            else if (val == 'tip') {
                this.tip = false
            }
        }
    },
    mounted() {
        //计时器
        this.timeroutApi = setInterval(() => {
            this.refresh()
        }, 180000);
    },
    beforeDestroy() {
        //关闭定时器
        if (this.timeroutApi) {
            clearInterval(this.timeroutApi);
        }
    },
    destroyed() {
        clearInterval(this.timeroutApi);
    }
};
</script>
