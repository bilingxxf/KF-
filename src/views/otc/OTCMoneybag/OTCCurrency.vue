<template>
    <div class="otccurrency">
        <div class="header">
            <p class="moneybag">OTC 资产</p>
            <i-Switch v-model="switch1" @on-change="change"></i-Switch>
            <p class="button-desc">只显示有资金币种（隐藏0资金币种）</p>
            <div class="search">
                <input type="text" class="" v-model="search_input">
                <button>
                    <span class="icon-search"></span>
                </button>
            </div>
        </div>
        <div class="container" style="height: 35rem;overflow-y: scroll">
            <table class="table-title">
                <tr class="tr-first">
                    <th>币种</th>
                    <th>可用余额</th>
                    <th>冻结金额</th>
                    <th>总计</th>
                    <th>估算为人民币</th>
                    <th class="opration">操作</th>
                </tr>
            </table>
            <div class="table-container" style="height: auto;margin-bottom: 1rem;position: relative;">
                <Spin size="large" fix v-if="spinShow"></Spin>
                <table v-if="product.length > 0">
                    <tr v-for="(item,index) in product" :key="index">
                        <td class="currency">
                            <span><input type="hidden" v-model="index"><img :src="item.coin_image" alt=""></span> {{item.coin_name}}</td>
                        <td class="availableBalance">{{item.finance_available}}</td>
                        <td>{{item.frozen_capital}}</td>
                        <td>{{item.finance_amount}}</td>
                        <td>{{item.finance_amount_rmb}}</td>
                        <td class="opration">
                            <router-link :to="{path:'/OTCRecord',query:{limit:10,page:1,coin_id:item.coin_id}}" tag="a" class="a-first">
                                <span class="icon-record"></span>记录
                            </router-link>
                            <a href="javascript:;" @click="showTransfer(item.otc_finance_id,item.coin_name, item.coin_id)">
                                <span class="icon-deal"></span>划转
                            </a>
                        </td>
                    </tr>
                </table>
                <div style="text-align: center;margin-top: 1.5rem;height: 25rem" v-else>
                    <p class="icon-no_info" style="font-size: 10rem;"></p>
                    <p style="font-size: 1rem;">暂无数据...</p>
                </div>
            </div>
        </div>
        <OTC-transfer v-if="show" v-on:close="closeTransfer()" :inputName="otc_finance" @ievent="ievent"></OTC-transfer>
    </div>
</template>
<script>
import OTCTransfer from './pages/OTCTransfer.vue'
import api from './../../../api'

export default {
    data() {
        return {
            show: false,
            switch1: false,
            spinShow: true,
            hiddenzeromoney: false,
            search_input: '',
            cny: 0,
            usdt: 0,
            count: 1,
            timer: null,
            otc_finance: {
                otc_finance_id: '',
                coin_name: ''
            },
            DCList: [

            ]
        }
    },
    components: {
        OTCTransfer
    },
    computed: {
        product() {
            let search = this.search_input;
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
        },
    },
    methods: {
        ievent() {
            this.otcFinanceList(1)
        },
        finance() {
            let sum = 0;
            for (let item of this.DCList) {
                // console.log(item.finance_amount_rmb);
                sum += Number(item.finance_amount_rmb)       //人民币
            }
            let num = (sum / this.cny).toFixed(2);

            let usdtNum = (this.usdt * num).toFixed(2);

            sum = sum.toFixed(2);

            let params = {
                rmb: sum,
                usd: num,
                usdtNum: usdtNum
            };
            this.$emit('OTCCurrency', params)
        },
        exchange() {
            api.rateCoinRequest().then(res => {          //币转成美元
                if (res.code == 200) {
                    this.usdt = res.data.quotes['USDT'];
                    for (let item of this.DCList) {
                        for (let i in res.data.quotes) {
                            if (i == item.coin_name) {
                                item.finance_amount_rmb = ((item.finance_amount / res.data.quotes[item.coin_name]) * this.cny).toFixed(2)
                            }
                        }
                    }
                    this.finance();
                }
            });
        },
        exchange_rmb() {
            api.rateMoneyRequest().then(res => {      //美元转qian
                if (res.code == 200) {
                    this.cny = res.data.rates.CNY;                 //人民币
                    this.exchange();
                }
            })
        },
        otcFinanceList(page) {      //钱包列表
            this.spinShow = true;
            api.FinanceList({
                page: page
            }).then(res => {
                if (res.status_code == 200) {
                    this.spinShow = false;
                    this.DCList = res.data.list;
                    this.exchange_rmb();
                    this.timer = setInterval(() => {
                        this.exchange_rmb();
                    }, 180000);

                }
            }).catch(error => {
                this.$Message.error('获取信息失败!');
            })
        },
        changePage(page) {
            this.otcFinanceList(page)
        },
        showTransfer(otc_finance_id, coin_name, coin_id) {          //划转
            // this.otc_finance.otc_finance_id = otc_finance_id;
            // this.otc_finance.coin_name = coin_name;
            let params = {
                coin_id: coin_id
            }
            api.withdrawInfo(params).then(data => {
                if (data.status_code == 200 && data.data.coin_status != 1) {
                    this.otc_finance = {
                        otc_finance_id: otc_finance_id,
                        coin_name: coin_name
                    };
                    this.show = true;
                }
                if(data.data.coin_status == 1) {
                    this.$black_prop('该币种已下架！')
                }
            })
        },
        closeTransfer() {
            this.show = false;
        },
        change(status) {       //开关隐藏资金为零的币种
            if (status) {
                this.hiddenzeromoney = true;
            } else {
                this.hiddenzeromoney = false;
            }
        }
    },
    destroyed() {
        clearInterval(this.timer);
    }
};
</script>
<style scoped>
</style>
