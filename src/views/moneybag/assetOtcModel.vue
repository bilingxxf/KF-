<template>
	<div class="overview-con">
		<div class="overview-content">
			<div v-if="false" class="overview-second walet-second">
				<div class="title-wrap">
					<!-- OTC资产 -->
					<span class="title">资产折合</span>
				</div>
				<div>
					<ul class="asset-walet-list">
						<li>
							<p class="title">总资金:</p>
							<p>0.00 BTC</p>
							<p>&asymp;{{ OTCData.finance_rmb }} CNY</p>
						</li>
						<li class="no-border">
							<p class="title">24小时盈亏:</p>
							<p>0.00 KT</p>
						</li>
					</ul>
				</div>
			</div>
            <!-- 币币资产 -->
            <div class="wallet-asset-heade" v-show="true">
                <div class="asset-heade-left">
                    <span>资产折合</span>
                </div>
                <div class="asset-heade-right">
                    <span>总资金：{{ totalBTC }} BTC</span>
                    <span>≈ {{ btctoCNY }} CNY</span>
                </div>
            </div>
			<div class="overview-fifth">
				<div class="all-coin">所有币种</div>
				<div class="moneybagbody">
					<div class="header">
						<i-Switch v-model="switch1" @on-change="change"></i-Switch>
						<p class="button-desc">只显示有资金币种（隐藏0资金币种）</p>
						<div class="search">
							<input type="text" placeholder="请输入币种名称" v-model="search_input">
							<span v-show="false" class="search-btn">查询</span>
						</div>
					</div>
					<div class="container">
						<table class="table-title">
							<tr class="tr-first">
								<th>币种</th>
								<th>可用余额</th>
								<th>总计</th>
                                <th>转换为法币（CNY）</th>
								<th>操作</th>
							</tr>
						</table>
						<div v-show="product.length > 0" class="table-container">
							<Spin size="large" fix v-if="spinShow"></Spin>
			                <table v-if="product.length > 0">
			                    <tr v-for="(item,index) in product"  :key="index">
			                        <td>
			                            <span><input type="hidden"><img class="icon" :src="item.coin_image" alt="" style="display: inline-block;width: 1rem;height:1rem;vertical-align: middle;"></span> {{ item.coin_name }}</td>
			                        <td>{{ item.finance_available }}</td>
			                        <td>{{ item.finance_amount }}</td>
                                    <td>{{ item.finance_amount_rmb | saveDigits }}</td>
			                        <td>
			                            <a :class="{'disabled': item.isDisabled }" href="javascript:;" @click="showTransfer(item.otc_finance_id, item.coin_name, item.coin_id)">
			                                <span v-show="false" class="icon-deal"></span>划转
			                            </a>
			                            <router-link target="_blank" tag="a" :to="{path:'/OTCRecord',query:{limit:10,page:1,coin_id:item.coin_id}}" class="a-first">
			                                <span v-show="false" class="icon-record"></span>记录
			                            </router-link>
			                        </td>
			                    </tr>
			                </table>
						</div>
					</div>
                    <!-- 当前占位-->
                    <div style="margin-top:1rem;" class="DCListlistnull" v-show="DCList.length === 0 || product.length <=0">
                        <div>
                            <span class="icon-no_info"></span>
                        </div>
                        <p>暂无数据</p>
                    </div>
				</div>
			</div>
		</div>
        <OTC-transfer v-if="show" v-on:close="closeTransfer()" :inputName="otc_finance" @ievent="ievent"></OTC-transfer>
	</div>
</template>

<script>
	import api from '../../api'
	import OTCTransfer from './pages/OTCTransfer.vue'
	import { exchange, scientificToNumber } from '../../common/js/N.js'
	export default {
		data() {
			return {
				spinShow: false,
				switch1: false,
				searchword: '',
				OTCData: {},
				show: false,
	            hiddenzeromoney: false,
	            search_input: '',
	            cny: 0,
                btc: 0,
	            usdt: 0,
	            count: 1,
	            timer: null,
	            otc_finance: {
	                otc_finance_id: '',
	                coin_name: ''
	            },
                rateTotal: [],
                totalBTC: '0.00000000',
                btctoCNY: '0.00',
	            DCList: [
	            ],
                ForbidMoneyArr: []
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
	                        return String(product.coin_name).toLowerCase().indexOf(search.toLowerCase()) > -1;
	                    })
	                })
	            } else if (this.hiddenzeromoney && search) {
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
		watch: {},
        filters: {
            saveDigits: function (value) {
                return exchange(scientificToNumber(value), 2);
            }
        },
		methods: {
			getInfo() {
				api.otcMoneyBag().then(res=>{
		            if(res.status_code == 200){
		                this.OTCData = res.data;
		            }
		        }).catch(error=>{
		            this.$Message.error('获取信息失败!');
		        })
			},
			ievent() {
	            this.otcFinanceList(1)
	        },
	        finance() {
	            let sum = 0;
	            for (let item of this.DCList) {
	                sum += Number(item.finance_amount_rmb)
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
                // 币种余额和美元换算
	            api.rateCoinRequest().then(res => {
	                if (res.code == 200) {
	                    this.usdt = res.data.quotes['USDT'];
	                    for (let item of this.DCList) {
	                        for (let i in res.data.quotes) {
	                            if (i == item.coin_name) {
                                    // 人民币
	                                item.finance_amount_rmb = ((item.finance_amount / res.data.quotes[item.coin_name]) * this.cny).toFixed(2)
	                            }
	                        }
                            let realVal = Number(item.finance_amount_rmb).toFixed(2);
                            let eachRMB = parseFloat(realVal);
                            this.rateTotal.push(eachRMB);
	                    }
                        let totalRMB = this.rateTotal.reduce((a, b) => {
                            return a+b;
                        });
                        let totalUSD = totalRMB / this.cny;
                        // totalBTC
                          this.totalBTC = Number(totalUSD * this.btc).toFixed(8);
                        // totalCNY
                          this.btctoCNY = Number(totalUSD * this.cny).toFixed(2);
	                    this.finance();
	                }
	            });
	        },
	        exchange_rmb() {
                // 美元与人民币换算
	            api.rateMoneyRequest().then(res => {
	                if (res.code == 200) {
	                    this.cny = res.data.rates.CNY;
                        this.btc = res.data.rates.BTC;
	                    this.exchange();
	                }
	            })
	        },
            // 获取禁币列表
            getForbidMoneyLists() {
                api.getForbidMoneyList().then(res => {
                    if (res.status_code == 200) {
                        this.ForbidMoneyArr = res.data;
                        // this.otcFinanceList()
                    }
                }, err => {
                    console.log(err);
                });
            },
	        otcFinanceList(page) {
	            this.spinShow = true;
	            api.FinanceList({
	                page: page
	            }).then(res => {
	                if (res.status_code == 200) {
	                    this.spinShow = false;
                        // 数据币种判断
						this.DCList = res.data.list;
                        this.DCList.filter((item, index) => {
                            this.ForbidMoneyArr.filter((e, i) => {
                                if (e.coin_name === item.coin_name) {
                                    if (Number(e.coin_status) == 1 || Number(e.coin_status) == 3) {
                                        item.isDisabled = true;
                                    } else if (Number(e.coin_status) == 2) {
                                        item.isDisabled = false;
                                    }
                                }
                            });
                        });
						this.DCList.forEach((val ,index) => {
							val.finance_amount = exchange(scientificToNumber(val.finance_amount), 8)
							val.finance_available = exchange(scientificToNumber(val.finance_available), 8)
						})
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
            // 钱包otc划转
	        showTransfer(otc_finance_id, coin_name, coin_id) {
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
	                    // this.$black_prop('该币种目前已下架，有疑问请联系平台确认！');
	                }
	            })
	        },
	        closeTransfer() {
	            this.show = false;
	        },
	        change(status) { // 开关隐藏资金为零的币种
	            if (status) {
	                this.hiddenzeromoney = true;
	            } else {
	                this.hiddenzeromoney = false;
	            }
	        }
		},
		mounted() {
            this.getForbidMoneyLists();
			// this.getInfo() // 获取资产折合信息
			this.otcFinanceList()
		},
		created() {}
	}
</script>
<style scoped="scoped">
/*  资产总览   */
.asset-overview-wrap .ivu-tabs-nav .ivu-tabs-tab {
	color: #FFFFFF;
	padding: 0.5rem 0;
	text-align: center;
	width: 12.4rem;
	margin-right: 0.1rem;
	background: #96A4CD;
}

.asset-overview-wrap .ivu-tabs-ink-bar {
	height: 0;
}

.asset-overview-wrap .ivu-tabs-nav .ivu-tabs-tab-active {
	background: #1F3686;
}

.asset-overview-wrap .ivu-tabs-bar {
	margin: 0 0 0.25rem 0;
}

.asset-overview-wrap .overview-con {
	width: 60rem;
}

.overview-content .overview-padding {
	padding: 0 0 0.7rem 0 !important;
}

.overview-content .overview-first {
	overflow: hidden;
}

.overview-content .overview-s {
	display: block;
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	background: #84B0EB;
	color: #fff;
	font-size: 2.4rem;
	line-height: 4rem;
	text-align: center;
}

.overview-first .overview-right {
	margin: 1.1rem 0 0 0;
}

.overview-second .title {
	padding: 0 0 0.5rem 0;
	border-bottom: 1px solid #fff;
	margin: 0 0 1.25rem 0;
}

.overview-second .btc {
	font-weight: 500;
	padding: 0 0 0 0.75rem;
}

.overview-content .block {
	padding: 0.2rem 0.6rem;
	margin: 0 5rem 0 0.75rem;
}

.overview-third {
	overflow: hidden;
}

.overview-third .walet-block {
	background: #fff;
	width: 14.35rem;
	height: 8rem;
	border-radius: 0.15rem;
	padding: 0.5rem;
	float: left;
	margin-right: 0.3rem;
}

.overview-third .wallet-left {
	color: #45537D;
	width: 35%;
	float: left;
	line-height: 100%;
}

.overview-third .walet-right {
	float: left;
	width: 60%;
}

.walet-right p {
	color: #000;
	font-weight: 600;
	padding: 0 0 0.5rem 0;
}

.walet-right .title {
	color: #45537D;
	font-weight: 600;
	font-size: 0.8rem;
	padding: 1rem 0 0.75rem 0;
}

.walet-right .detail {
	color: #000;
	font-size: 0.6rem;
	display: block;
	text-align: right;
}

.overview-fourth .record {
	width: 7rem;
	height: 2.2rem;
	display: inline-block;
	border: 1px solid #fff;
	text-align: center;
	line-height: 2.2rem;
	margin: 1rem 4.7rem 0 0;
}

.overview-fourth .text-align {
	text-align: center;
}

.overview-content .overview-fourth {
	background: #475E98;
	padding: 0.75rem 0.5rem;
	overflow: hidden;
	margin: 1.6rem 0;
	box-shadow: 0 1px 0.6rem 0 rgba(58, 71, 111, .8);
	border-radius: 0.2rem;
}

.overview-fourth .title {
	padding: 0 0 0.5rem 0;
	border-bottom: 1px solid #fff;
}

.overview-fourth .no-margin {
	margin-right: 0;
}

.overview-content .moneybagbody {
	background: #475E98;
	color: #fff;
	height: auto;
    min-height: 36.25rem;
}

.overview-fifth .all-coin {
	line-height: 3rem;
	padding: 0 1.3rem;
	font-size: 0.9rem;
	background: #313E66;
}

.overview-fifth .search-btn {
	display: inline-block;
	padding: 0.2rem 0.75rem;
	border: 1px solid #fff;
	border-radius: 0.15rem;
	float: right;
	height: 1.4rem;
	cursor: pointer;
}

.overview-content .moneybagbody .search {
	border: 0;
}

.overview-content .moneybagbody .search input {
	border: 1px solid #fff;
	border-radius: 0.15rem;
	margin-right: 0.5rem;
	width: 7.25rem;
}

.wallet-asset-heade {
    display: flex;
    align-items: center;
    margin-bottom: 2.25rem;
    height: 2.5rem;
    width: 54rem;
    background: #fff;
}

.wallet-asset-heade .asset-heade-left {
    margin-left: 1.25rem;
    color: #303B74;
    font-size: 1rem;
}

.wallet-asset-heade .asset-heade-right {
    display: flex;
    align-items: center;
    margin-left: auto;
    line-height: 3.25rem;
}

.wallet-asset-heade .asset-heade-right span:nth-of-type(1) {
    color: #323D75;
    font-size: 0.8rem;
}

.wallet-asset-heade .asset-heade-right span:nth-of-type(2) {
    margin-left: 0.6rem;
    margin-right: 1.5rem;
}

.wallet-asset-heade .asset-heade-right span:nth-of-type(2) {
    color: #BABCCB;
    font-size: 0.6rem;
}

.overview-fifth .circle {
	display: inline-block;
	width: 1rem;
	height: 1rem;
	background: #C0EAE4;
	border-radius: 50%;
	margin: 0.25rem 0.1rem 0 0;
}

.overview-fifth .currency {
	position: relative;
}

.overview-fifth .circle {
	position: absolute;
	top: 0.6rem;
	left: 0.2rem;
}

.overview-fifth .padding-left {
	padding-left: 0.75rem;
}

.overview-content .title-wrap {
	border-bottom: 1px solid #DEDADA;
	font-size: 0.9rem;
}

.overview-content .title-wrap .title {
    padding-left: 0.15rem;
}

.overview-content .walet-second {
	background: #fff;
}

.overview-content .title {
	margin: 0;
}

.overview-content .walet-second .title {
	color: #2E3B6F;
	font-weight: 600;
	display: inline-block;
}

.overview-content .red-node {
	color: #FB7070;
	font-weight: 500;
	float: right;
}

.overview-content .no-border {
	border: 0;
}

.overview-content .green-node {
	color: #42A73F;
}

.overview-content .asset-walet-list {
	font-size: 0.9rem;
	color: #1B2C71;
	font-weight: 500;
	overflow: hidden;
	margin: 2rem 0 1rem 0;
}

.overview-content .asset-walet-list li {
	width: 50%;
	height: 6.5rem;
	float: left;
	border-right: 1px solid #D9D9D9;
	padding: 0 0 0 1rem;
	line-height: 2.25rem;
}

.overview-content .asset-walet-list li.no-border {
	border: none;
	padding-left: 1.75rem;
}

.overview-content .asset-walet-list .title {
	font-weight: 600;
	font-size: 1.2rem;
}

.overview-content .asset-walet-list .manage {
	display: inline-block;
	width: 3.5rem;
	height: 1.4rem;
	line-height: 1.4rem;
	text-align: center;
	font-size: 0.7rem;
	cursor: pointer;
	border-radius: 0.2rem;
	border: 1px solid #1B2C71;
	margin: 0 0 0 2.5rem;
}

.container .tr-first {
    width: 100%;
}
.container .tr-first th {
    padding-left: 1rem;
}
.container .tr-first th:nth-of-type(1) {
    width: 15%;
}
.container .tr-first th:nth-of-type(2) {
    padding-left: 0.6rem;
    width: 20%;
}
.container .tr-first th:nth-of-type(3) {
    padding-left: 0.6rem;
    width: 20%;
}
.container .tr-first th:nth-of-type(4) {
    padding-left: 1rem;
    width: 20%;
}
.container .tr-first th:nth-of-type(5) {
    text-align: right;
    padding-right: 1.6rem;
    width: 25%;
}

.table-container .no-data {
	text-align: center;
	line-height: 5rem;
}

.table-container .col-photo {
	display: inline-block;
	width: 1rem;
	vertical-align: middle;
}

.table-container table td {
    box-sizing: border-box;
}

.table-container table td:nth-of-type(1) {
    width: 15%;
}

.table-container table td:nth-of-type(2) {
    width: 20%;
}

.table-container table td:nth-of-type(3) {
    width: 20%;
}

.table-container table td:nth-of-type(4) {
    padding-left: 1.05rem;
    width: 20%;
}

.table-container table td:nth-of-type(5) {
    text-align: right;
    padding-right: 0.5rem;
    width: 25%;
}

.table-container table td:nth-of-type(5) a:hover {
    color: #F3BA2F;
}

.moneybagbody .opration span {
	cursor: pointer;
}
.moneybagbody .container .width-fouth {
	width: 21%;
}

.moneybagbody .container .padding-none {
	padding: 0;
}

input::-webkit-input-placeholder {
    color: rgba(255, 255, 255,.56);
}

.overview-con .disabled {
    color: #999!important;
}

.overview-con .disabled:hover {
    color: #999!important;
    cursor: not-allowed
}
</style>
