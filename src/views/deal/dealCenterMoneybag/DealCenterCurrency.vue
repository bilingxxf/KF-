<template>
    <div class="dealcentercurrency">
        <div class="header">
            <p class="moneybag">币币资产</p>
            <i-Switch v-model="switch1"></i-Switch>
            <p class="button-desc">只显示有资金币种（隐藏0资金币种）</p>
            <div class="search">
                <input type="text" class="" v-model="search_input">
                <button>
                    <span class="icon-search"></span>
                </button>
            </div>
        </div>
        <div class="container">
            <table class="table-title">
                <tr class="tr-first">
                    <th class="col1">币种</th>
                    <th class="col1">可用余额</th>
                    <th class="col1">冻结金额</th>
                    <th class="col1">总计</th>
                    <th class="col1">估算为人民币</th>
                    <th class="col1">操作</th>
                </tr>
            </table>
            <div class="table-container bibilist">
                <Spin size="large" fix v-if="spinShow"></Spin>
                <table v-if="product.length > 0">
                    <tr v-for="(item,index) in product" :key="index">
                        <td class="col1">
                            <span><img :src="item.coin_image" alt="" class="cionimg"></span> {{item.coin_name}}</td>
                        <td class="col1 colour">{{item.finance_available | numfilter}}</td>
                        <td class="col1">{{item.frozen_capital | numfilter}}</td>
                        <td class="col1">{{item.finance_amount | numfilter}}</td>
                        <td class="col1">{{item.finance_amount_rmb | numFilter}}</td>
                        <td class="opration col1">
                            <router-link :to="{name:'DealCenterRecord', query:{ coin_id:item.coin_id, }, }">
                                <span class="icon-record"></span>记录
                            </router-link>
                            <a href="javascript:;" @click="showTransfer(item.exchange_finance_id, item.coin_id)">
                                <span class="icon-deal"></span>划转
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="moneybagbodyp">当前共{{this.product.length}}</div>
        </div>
        <div class="DCListlistnull" v-show="DCList.length===0 || product.length <= 0 ">
            <div>
                <span class="icon-no_info"></span>
            </div>
            <p>暂无数据</p>
        </div>
        <dealCenter-transfer v-if="show" :exchange_id="exchange_id" v-on:close="closeTransfer()" @ievent="ievent"></dealCenter-transfer>
    </div>
</template>
<script>
import DealCenterTransfer from './pages/DealCenterTransfer.vue'
import api from '@/api'
export default {
    components: {
        DealCenterTransfer
    },
    data() {
        return {
            //数组加载中显示
            spinShow: true,
            //搜索框的值
            search_input: '',
            //控制子组件是否渲染
            show: false,
            //开关默认值
            switch1: false,
            //资产列表数组
            DCList: [],
            //页数信息
            mypage: [],
            //传给子组件的id
            exchange_id: '',
            //列表总计一列
            rateTotal: [],
            //币（汇率）
            coinRate: [],
            //钱（汇率）
            moneyRate: [],
            //计时器
            time: '',
        }
    },
    filters: {
        numFilter(value) {
            let realVal = Number(value).toFixed(2);
            return Number(realVal)
        },
        numfilter(value) {
            let realVal = Number(value).toFixed(8);
            return Number(realVal)
        },
    },
    //模糊搜索加开关显示隐藏数据过滤
    computed: {
        product() {
            let search = this.search_input;
            if (!this.switch1 && search) {
                return this.DCList.filter(product => {
                    return Object.keys(product).some(key => {
                        return String(product.coin_name).toLowerCase().indexOf(search.toLowerCase()) > -1;
                    })
                })
            } else if (this.switch1 && search) {
                return this.DCList.filter(product => {
                    return Object.keys(product).some(key => {
                        return String(product.coin_name).toLowerCase().indexOf(search.toLowerCase()) > -1 && String(product.finance_amount) > 0;
                    })
                })
            } else if (this.switch1) {
                return this.DCList.filter(product => {
                    return Object.keys(product).some(key => {
                        return String(product.finance_amount) > 0
                    })
                })
            } else if (!this.switch1) {
                return this.DCList.filter(product => {
                    return Object.keys(product).some(key => {
                        return String(product)
                    })
                })
            }
            return this.DCList;
        },
    },
    methods: {
        ievent() {
            this.coinRateRequest();
        },
        //计算数组中的值的总和
        totalAssets(total, currentValue) {
            return total + currentValue
        },
        //取Id给子组件
        showTransfer(Id, coin_id) {
            let params = {
                coin_id: coin_id
            }
            api.withdrawInfo(params).then(data => {
                if (data.status_code == 200) {
                    this.show = true;
                    this.exchange_id = Id;
                }
            })
        },
        //关闭划转
        closeTransfer() {
            this.show = false;
        },
        //列表请求
        pullWalletList() {
            api.bibiList().then(res => {
                if (res.status_code == 200) {
                    this.spinShow = false;
                    this.DCList = res.data.list;
                    this.mypage = res.data.page;
                    if (this.DCList.length != 0) {
                        this.DCList.map(val => {
                            for (let i in this.coinRate) {
                                if (val.coin_name == i) {
                                    val.finance_amount_rmb = ((val.finance_amount / this.coinRate[i]) * this.moneyRate.CNY);
                                }
                            }
                            let realVal = Number(val.finance_amount_rmb.toFixed(2));
                            this.rateTotal.push(realVal);
                        });
                        let totalRMB = this.rateTotal.reduce(this.totalAssets);
                        let totalUSD = totalRMB / this.moneyRate.CNY;
                        let totalUSDT = totalUSD * this.coinRate.USDT;
                        let totalMoney = {
                            RMB: totalRMB,
                            USD: totalUSD,
                            USDT: totalUSDT
                        };
                        this.$emit('showCityName', totalMoney);
                        this.rateTotal.splice(0, this.rateTotal.length);
                    }
                }
                this.time = setInterval(() => {
                    this.coinRateRequest();
                    clearInterval(this.time);
                }, 180000)
            }).catch(err => {
            })
        },
        //币汇率请求
        coinRateRequest() {
            api.rateCoinRequest().then(res => {
                this.coinRate = res.data.quotes;
                this.pullWalletList();
                this.moneyRateRequest();
            }).catch(res => { })
        },
        //钱汇率请求
        moneyRateRequest() {
            api.rateMoneyRequest().then(res => {
                this.moneyRate = res.data.rates;
            }).catch(err => { })
        },
    },
    created() {
        this.coinRateRequest();
    },
    //离开页面清除计时器
    destroyed() {
        clearInterval(this.time);
    }
};
</script>
