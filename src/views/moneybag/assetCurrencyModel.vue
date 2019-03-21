<template>
	<div class="overview-con">
		<div class="overview-content">
			<div v-if="false" class="overview-second walet-second">
				<div class="title-wrap">
					<!-- 币币资产 -->
					<span class="title">资产折合:</span>
				</div>
				<div>
					<ul class="asset-walet-list">
						<li>
							<p class="title">总资金:</p>
							<p class="current-price">0.00 BTC</p>
							<p class="current-price">&asymp;{{ Number(currencyData.finance_rmb).toFixed(2) }} CNY</p>
						</li>
						<li class="no-border">
							<p class="title">24小时盈亏:</p>
							<p class="current-price">0.00 KT</p>
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
						<div class="table-container">
							<Spin size="large" fix v-if="spinShow"></Spin>
							<table v-if="product.length > 0">
								<tr v-for="(item,index) of product" :key="index">
									<td>
										<span><img class="col-photo" :src="item.coin_image" alt=""></span> {{ item.coin_name}}</td>
									<td>{{ item.finance_available }}</td>
									<td>{{ item.finance_amount }}</td>
                                    <td>{{ item.finance_amount_rmb | saveDigits }}</td>
									<td>
										<a :class="{'disabled': item.isDisabled }" style="margin-right: 0.4rem;" href="javascript:;" @click="showTransfer(item.exchange_finance_id, item.coin_id)">
											<span v-show="false" class="icon-deal trans"></span>划转
										</a>
										<router-link tag="a" target="_blank" :to="{name:'DealCenterRecord', query:{ coin_id:item.coin_id, }, }">
											<span v-show="false" class="icon-record"></span>记录
										</router-link>
									</td>
								</tr>
							</table>
						</div>
					</div>
					<div class="DCListlistnull" v-show="DCList.length===0 || product.length <= 0 ">
						<div>
							<span class="icon-no_info"></span>
						</div>
						<p>暂无数据</p>
					</div>
				</div>
			</div>
		</div>
		<dealCenter-transfer v-if="show" :exchange_id="exchange_id" v-on:close="closeTransfer()" @ievent="ievent"></dealCenter-transfer>
	</div>
</template>

<script>
import api from '../../api'
import DealCenterTransfer from './pages/DealCenterTransfer.vue'
import { exchange, scientificToNumber } from '../../common/js/N.js'
export default {
	components: {
		DealCenterTransfer
	},
	data() {
		return {
			switch1: true,
			searchword: '',
			currencyData: {},

			// 数组加载中显示
			spinShow: true,
			// 搜索框的值
			search_input: '',
			// 控制子组件是否渲染
			show: false,
			// 开关默认值
			switch1: false,
			// 资产列表数组
			DCList: [],
			// 页数信息
			mypage: [],
			// 传给子组件的id
			exchange_id: '',
			// 列表总计一列
			rateTotal: [],
			// 币（汇率）
			coinRate: [],
			// 钱（汇率）
			moneyRate: [],
			// 计时器
			time: '',
			totalBTC: '0.00000000',
			btctoCNY: '0.00',
            ForbidMoneyArr: []
		}
	},
	watch: {},
	filters: {
		numFilter(value) {
			let realVal = Number(value).toFixed(1);
			return realVal;
		},
		numfilter(value) {
			let realVal = Number(value).toFixed(8);
			return Number(realVal)
		},
	},
	// 模糊搜索加开关显示隐藏数据过滤
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
    filters: {
        saveDigits: function (value) {
            return exchange(scientificToNumber(value), 2);
        }
    },
	methods: {
		getCurrencyInfo() { // 获取用户信息
			api.getUserInfrom().then(res => {
				if (res.status_code == 200) {
					this.currencyData = res.data;
					this.phone = res.data.phone;
					this.email = res.data.email;
				}
			}).catch(err => {
			})
		},
		change() { },
		ievent() {
			this.coinRateRequest();
		},
		// 计算数组中的值的总和
		totalAssets(total, currentValue) {
			return total + currentValue
		},
		// 取Id给子组件
		showTransfer(Id, coin_id) {
			let params = {
				coin_id: coin_id
			}
			api.withdrawInfo(params).then(data => {
				if (data.status_code == 200 && data.data.coin_status != 1) {
					this.show = true;
					this.exchange_id = Id;
				}
				if (data.data.coin_status == 1) {
				// this.$black_prop('该币种目前已下架，有疑问请联系平台确认！');
				}
			})
		},
		//关闭划转
		closeTransfer() {
			this.show = false;
		},
        // 获取禁币列表
        getForbidMoneyLists() {
            api.getForbidMoneyList().then(res => {
                if (res.status_code == 200) {
                    this.ForbidMoneyArr = res.data;
                    // this.otcFinanceList();
                }
            }, err => {
                console.log(err);
            });
        },
		// 列表请求
		pullWalletList() {
			api.bibiList().then(res => {
				if (res.status_code == 200) {
					this.spinShow = false;
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
					this.mypage = res.data.page;
					if (this.DCList.length != 0) {
						this.DCList.forEach(val => {

							val.finance_amount = exchange(scientificToNumber(val.finance_amount), 8)
							val.finance_available = exchange(scientificToNumber(val.finance_available), 8)

							for (let i in this.coinRate) {
								if (val.coin_name == i) {
									val.finance_amount_rmb = ((val.finance_amount / this.coinRate[i]) * this.moneyRate.CNY);
								}
							}
							let realVal = Number(val.finance_amount_rmb.toFixed(2));
							this.rateTotal.push(realVal);
						});
						Array.prototype.delNaN = function () {
							var arr = [];
							for (var i = 0; i < this.length; i++) {
								if (this[i] === this[i]) {
									arr.push(this[i]);
								}
							}
							return arr;
						}
						this.rateTotal = this.rateTotal.delNaN();
						let totalRMB = this.rateTotal.reduce(this.totalAssets);
						let totalUSD = totalRMB / this.moneyRate.CNY;
						let totalUSDT = totalUSD * this.coinRate.USDT;
						if (totalUSD && this.coinRate && this.moneyRate) {
							this.totalBTC = Number(totalUSD * this.coinRate.BTC).toFixed(8); // 换算为BTC
							this.btctoCNY = Number(totalUSD * this.moneyRate.CNY).toFixed(2);
						}
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
				// this.pullWalletList();
				this.moneyRateRequest();
			}).catch(res => { })
		},
		//钱汇率请求
		moneyRateRequest() {
			api.rateMoneyRequest().then(res => {
				this.moneyRate = res.data.rates;
				this.pullWalletList();
			}).catch(err => {  })
		},

	},
	mounted() {
        this.getForbidMoneyLists();
		// this.getCurrencyInfo() // 资产折合信息
		// this.pullWalletList() // 所有币种信息
		this.coinRateRequest();
	},
	created() { },
    destroyed() {
        clearInterval(this.time);
    }
}
</script>
<style scoped="scoped">
/*  资产总览   */

.asset-overview-wrap .ivu-tabs-nav .ivu-tabs-tab {
    color: #ffffff;
    padding: 0.5rem 0;
    text-align: center;
    width: 12.4rem;
    margin-right: 0.1rem;
    background: #96a4cd;
}

.asset-overview-wrap .ivu-tabs-ink-bar {
    height: 0;
}

.asset-overview-wrap .ivu-tabs-nav .ivu-tabs-tab-active {
    background: #1f3686;
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
    background: #84b0eb;
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
    color: #45537d;
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
    color: #45537d;
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
    background: #475e98;
    padding: 0.75rem 0.5rem;
    overflow: hidden;
    margin: 1.6rem 0;
    box-shadow: 0 1px 0.6rem 0 rgba(58, 71, 111, 0.8);
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
    background: #475e98;
    color: #fff;
    height: auto;
    min-height: 36.25rem;
}

.overview-fifth .all-coin {
    line-height: 3rem;
    padding: 0 1.3rem;
    font-size: 0.9rem;
    background: #313e66;
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
    color: #303b74;
    font-size: 1rem;
}

.wallet-asset-heade .asset-heade-right {
    display: flex;
    align-items: center;
    margin-left: auto;
    line-height: 3.25rem;
}

.wallet-asset-heade .asset-heade-right span:nth-of-type(1) {
    color: #323d75;
    font-size: 0.8rem;
}

.wallet-asset-heade .asset-heade-right span:nth-of-type(2) {
    margin-left: 0.6rem;
    margin-right: 1.5rem;
}

.wallet-asset-heade .asset-heade-right span:nth-of-type(2) {
    color: #babccb;
    font-size: 0.6rem;
}

.overview-fifth .circle {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: #c0eae4;
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
    padding-left: 0.15rem;
    border-bottom: 1px solid #dedada;
    font-size: 0.9rem;
}

.overview-content .walet-second {
    background: #fff;
}

.overview-content .title {
    margin: 0;
}

.overview-content .walet-second .title {
    color: #2e3b6f;
    font-weight: 600;
    display: inline-block;
}

.overview-content .red-node {
    color: #fb7070;
    font-weight: 500;
    float: right;
}

.overview-content .no-border {
    border: 0;
}

.overview-content .green-node {
    color: #42a73f;
}

.overview-content .asset-walet-list {
    font-size: 0.9rem;
    color: #1b2c71;
    font-weight: 500;
    overflow: hidden;
    margin: 1rem 0 1rem 0;
}

.overview-content .asset-walet-list li {
    width: 50%;
    height: 7.2rem;
    float: left;
    border-right: 1px solid #d9d9d9;
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

.overview-content .asset-walet-list .current-price {
    font-family: "PingFangSC-Medium";
    font-size: 0.9rem;
    color: #1b2c71;
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
    border: 1px solid #1b2c71;
    margin: 0 0 0 2.5rem;
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

.container .tr-first th:nth-last-of-type(1) {
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
    padding-left: 1.25rem;
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

input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.56);
}

.overview-con .disabled {
    color: #999 !important;
}

.overview-con .disabled:hover {
    color: #999 !important;
    cursor: not-allowed;
}
</style>
