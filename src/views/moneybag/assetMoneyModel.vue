<template>
	<div class="overview-con" style="position: relative;">
		<div class="overview-content">
            <!-- 可用资金、保证金、24小时盈亏 -->
			<div v-if="false" class="overview-second walet-second">
				<div class="title-wrap">
                    <!-- 钱包资产 -->
					<span class="title">资产折合:</span>
				</div>
				<div>
					<ul class="asset-walet-list">
						<li>
							<p class="title">总资金:</p>
							<p class="mid-item">0.00 BTC</p>
							<p>&asymp;{{ moneyData.finance_rmb }} CNY</p>
						</li>
                        <li class="vertical-line"></li>
						<li>
							<p class="title">保证金</p>
							<p class="mid-item">0.00 KT <span class="manage">管理</span></p>

						</li>
                        <li class="vertical-line"></li>
						<li class="no-border">
							<p class="title">24小时盈亏:</p>
							<p class="mid-item">0.00 KT</p>
						</li>
					</ul>
				</div>
			</div>
            <!-- 资产折合 -->
            <div class="wallet-asset-heade" v-show="true">
                <div class="asset-heade-left">
                    <span>资产折合</span>
                </div>
                <div class="asset-heade-right">
                    <span>总资金：{{ totalBTC }} BTC</span>
                    <span>≈ {{ btctoCNY }} CNY</span>
                    <span class="vertical-line"></span>
                    <span>保证金：{{ totalKT }}KT</span>
                    <span style="cursor: pointer;" @click="cashDeposit">管理</span>
                </div>
            </div>
			<div class="overview-fifth">
				<div class="all-coin">所有币种</div>
				<div class="moneybagbody">
					<div class="header">
						<i-Switch v-model="switch1" @on-change="change"></i-Switch>
						<p class="button-desc">只显示有资金币种（隐藏0资金币种）</p>
						<div class="search">
							<input type="text" placeholder="请输入币种名称"  v-model="searchword">
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
							<table v-if="list.length > 0">
								<tr v-for="(item, index) of list" :key="index">
									<td class="col1">
			                            <span><img class="col-photo" :src="item.coin_image" alt=""></span> {{ item.coin_name }}</td>
			                        <td class="col2">{{ item.finance_available }}</td>
			                        <td class="col3">{{ item.finance_amount }}</td>
                                    <td class="col4">{{ item.finance_amount_rmb | saveDigits }}</td>
			                        <td class="col5 opration" :class="{moneybag_col5_width: isA, 'disabled': item.isDisabled }">
                                        <span v-show="item.merchant_status == 2" @click="walletTopUp(item.coin_name, 'withdrawal', item.finance_available)" class="charge-money">充值</span>
                                        <span v-show="item.merchant_status == 2" @click="walletTopUp(item.coin_name, 'walletTopUp', item.finance_available)" class="charge-money">提现</span>
                                        <a tag="a" v-if="item.isDisabled" :class="{'disabled': item.isDisabled}" href="javascript:;">
                                            <span v-show="false" class="icon-recharge"></span>充币
                                        </a>
                                        <router-link v-else :tag="targetOfa" :to="{ path: '/recharge', query: { coin_id: item.coin_id }}" target="_blank">
                                            <span v-show="false" class="icon-recharge"></span>充币
                                        </router-link>
			                            <span :class="{'disabled': item.isDisabled}" class="mob" @click="judge('withdraw', item.coin_id)">
			                                <span v-show="false" class="icon-withdraw"></span>提币
			                            </span>
			                            <span :class="{'disabled': item.isDisabled}" class="mob" @click="judge('transfer', item.coin_id, item.finance_id)">
			                                <span v-show="false" class="icon-deal"></span>划转
			                            </span>
			                            <router-link :to="{path:'/walletrecord', query:{coin_id:item.coin_id}}"   target="_blank" style="margin-left: 0.5rem;margin-right: 2rem;" tag="a">
			                                <span v-show="false" class="icon-record"></span>记录
			                            </router-link>
			                        </td>
								</tr>
							</table>
						</div>
					</div>
                    <!-- 当前占位-->
                    <div class="DCListlistnull" v-show="DCList.length === 0 || list.length <=0">
                        <div>
                            <span class="icon-no_info"></span>
                        </div>
                        <p>暂无数据</p>
                    </div>
				</div>
			</div>
		</div>
        <!-- 划转  -->
		<transfer v-if="show" v-on:close="closeTransfer()" :id="id" :otherId="otherId"></transfer>
        <!-- 提币提示框 -->
        <withdraw-tip v-show="withdraw" @close="close('withdrawtip')"></withdraw-tip>
        <tip v-show="tip" @close="close('tip')" :massage="massage"></tip>
        <!-- 充币、提币提示框 -->
        <Modal
            title="Title"
            :mask-closable="false"
            class="charge-money"
            @on-visible-change="visibileChange"
            v-model="chargeMoneyVisable"
            :styles="{top: '10rem', width: '26.3rem'}">
                <Form ref="chargeMoney" :rules="chargeRule" :model="chargeMoney" inline>
                    <FormItem prop="account" label="金额：">
                        <Input v-model="chargeMoney.account" placeholder="请输入金额" number></Input>
                    </FormItem>
                    <FormItem>
                    </FormItem>
                    <FormItem>
                        <Button @click="submitCharge('chargeMoney')" type="primary">确定</Button>
                        <Button @click="cancleSubmit('chargeMoney')" type="primary">取消</Button>
                    </FormItem>
                </Form>
                <!-- 银行支付 -->
                <div v-show="bandPayVisable" class="band-pay">
                    <div class="pay-header">
                        <span>收银员</span>
                        <span class="close">X</span>
                    </div>
                    <div class="pay-content">
                        <iframe :src="currentwalletUrl" ref="iframe"></iframe>
                    </div>
                </div>
        </Modal>
	</div>
</template>

<script>
import api from '../../api'
import Transfer from './pages/Transfer.vue'
import WithdrawTip from './components/WithdrawTip.vue'
import Tip from './components/Tip.vue'
import { exchange, scientificToNumber } from '../../common/js/N.js'
export default {
	components: {
        Transfer,
        WithdrawTip,
        Tip
    },
	data() {
        const validAccount = (rule, value, callback) => {
            if (value === '' ) {
                callback(new Error('请输入金额'));
            } else if (!/(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(value)) {
                callback(new Error('请输入一个数字'));
            } else if (Number(value) <= 0) {
                callback(new Error('输入金额必须大于零'));
            } else if ((Number(value) > Number(this.finavailable)) && (this.nameType === 'walletTopUp')) {
                callback(new Error('提现金额不足'));
            } else {
                callback();
            }
        };
		return {
			isA: true, // 表格宽度样式状态值
            // RechargeJumpPath: '',
			switch1: true,
			searchword: '',
            // disabled: false,
			moneyData: {}, // 资金折合信息
            targetOfa: 'span',
			hiddenzeromoney: false, // 资金为0显示或隐藏
            show: false, // 划转弹窗
            withdraw: false, // 设置资金密码弹窗
            tip: false, // 币种状态弹窗
            spinShow: false,
            coin_status: '', // 币种状态
            massage: '', // 币种状态弹窗提示内容
            moneypsw: '', // 资金密码设置与否
            switch1: false,
            searchword: '',
            DCList: [],
            id: '', // 传入划转弹窗的id
            otherId: '',
            timeroutApi: null, // 计时器
            rateTotal: [],
            coinRate: [],
            cny: 0,
            usdt: 0,
            totalBTC: '0.00000000',
            btctoCNY: '0.00',
            totalKT: '0.00',
            timer: null,
            ForbidMoneyArr: [],
            chargeMoneyVisable: false,
            chargeMoney: {
                account: ''
            },
            chargeRule: {
                account: [
                    {
                        validator: validAccount,
                        trigger: 'blur'
                    }
                ]
            },
            bandPayVisable: false,
            isCloseVisibility: false,
            currentwalletVal: '',
            currentwalletUrl: '',
            nameType: '',
            finavailable: ''
		}
	},
	watch: {
	},
	computed: {
		list() { // 搜索
            let search = this.searchword;
            if (!this.hiddenzeromoney && search) {
                return this.DCList.filter(product => {
                    return Object.keys(product).some(key => {
                        return String(product.coin_name).toLowerCase().indexOf(search.toLowerCase()) > -1;
                    })
                })
            } else if (this.hiddenzeromoney && search) { // 开
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
    filters: {
        saveDigits: function (value) {
            return exchange(scientificToNumber(value), 2);
        }
    },
	methods: {
        visibileChange(value) {
            if (value === false) {
                // chargeMoney
                this.$refs['chargeMoney'].resetFields();
            }
        },
        walletTopUp(item, nameType, finavails) {
            this.chargeMoneyVisable = true;
            this.currentwalletVal = item;
            this.nameType = nameType;
            this.finavailable = finavails;
        },
        closeCharge() {
            this.bandPayVisable = false;
            this.isCloseVisibility = false;
        },
        cancleSubmit(item) {
            this.chargeMoneyVisable = false;
            this.$refs[item].resetFields();
        },
        submitCharge(item) {
            this.$refs[item].validate((valid) => {
                if (valid) {
                    // 充值
                    if (this.nameType === 'withdrawal') { // 充值
                        api.withdrawal({
                            amount: this.chargeMoney.account,
                            coin_name: this.currentwalletVal
                        }).then(res => {
                            if (res.status_code == 200) {
                                this.currentwalletUrl = res.data.url;
                                this.bandPayVisable = true;
                                this.$refs[item].resetFields();
                            } else {
                            }

                        }).catch(err => {
                            this.$Message.error(err);
                        })
                    } else if (this.nameType === 'walletTopUp') { // 提现
                        api.walletTopUp({
                            amount: this.chargeMoney.account,
                            coin_name: this.currentwalletVal
                        }).then(res => {
                            if (res.status_code == 200) {
                                this.currentwalletUrl = res.data.url;
                                this.bandPayVisable = true;
                                this.$refs[item].resetFields();
                            } else {

                            }

                        }).catch(err => {
                            this.$Message.error(err);
                        });
                    }
                } else {
                }
            });
        },
		//  资金折合信息
		moneybagInfo() {
            api.moneybagInfo().then(res => {
                if (res.status_code == 200) {
                    this.moneyData = res.data;
                }
            });
        },
        // 货币汇率接口
        refresh() {
            this.spinShow = true;
            api.rateCoinRequest().then(res => {
                if (res.code == 200) {
                    this.coinRate = res.data.quotes;
                    api.rateMoneyRequest().then(res => {
                        this.moneyRate = res.data.rates;
                        this.moneybaglist();
                        this.timer = setTimeout(() => {
                            this.targetOfa = 'a';
                        }, 2500);
                    }).catch(error => { console.log(error) });
                }
            }).catch(error => { console.log(error) });
        },
        // 钱包列表
        moneybaglist() {
            api.moneybagList().then(res => {
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
                    if (this.DCList.length != 0) { // 汇率换算
                        this.DCList.forEach((val, index) => {
                            // 小数点处理， 并且处理科学计数法
                            val.finance_amount = exchange(scientificToNumber(val.finance_amount), 8)
							val.finance_available = exchange(scientificToNumber(val.finance_available), 8)

                            for (let i in this.coinRate) {
                                if (val.coin_name == i) {
                                    val.finance_amount_rmb = ((val.finance_amount / this.coinRate[i]) * this.moneyRate.CNY);
                                }
                            }
                            let realVal = Number(val.finance_amount_rmb).toFixed(2);
                            let eachRMB = parseFloat(realVal);
                            this.rateTotal.push(eachRMB);
                        })
                        let totalRMB = this.rateTotal.reduce(this.totalAssets); //人民币累加
                        let totalUSD = totalRMB / this.moneyRate.CNY; // 换算美元
                        let totalUSDT = totalUSD * this.coinRate.USDT; // 换算USDT
                        if (totalUSD && this.coinRate && this.moneyRate) {
                            this.totalBTC = Number(totalUSD * this.coinRate.BTC).toFixed(8); // 换算为BTC
                            this.btctoCNY = Number(totalUSD * this.moneyRate.CNY).toFixed(2);
                        }
                        let totalMoney = {
                            RMB: totalRMB,
                            USD: totalUSD,
                            USDT: totalUSDT
                        };
                        this.$emit('showCityName', totalMoney); // 累加值和换算值传到父组件
                        this.rateTotal.splice(0, this.rateTotal.length) // 清除人民币累加
                    }
                    if (this.list.length > 12) { // 表格宽度对齐
                        this.isA = false
                    } else {
                        this.isA = true
                    }
                }
            }).catch(error => { console.log(error) });
        },
        // 人民币累加
        totalAssets(total, currentValue) {
            return total + currentValue
        },
        // 获取禁币列表
        getForbidMoneyLists() {
            api.getForbidMoneyList().then(res => {
                if (res.status_code == 200) {
                    this.ForbidMoneyArr = res.data;
                    // this.moneybaglist();
                }
            }, err => {
                console.log(err);
            });
        },
        // 币种状态判断
        judge(which, val, val2) {
            let params = {
                coin_id: val
            }
            api.judge(params).then(res => {
                if (res.status_code == 200) {
                    this.coin_status = res.data.coin_status // 币种状态值
                    this.moneypsw = res.data.ping_status // 是否设置资金密码
                    if (this.coin_status == 1) { // 禁用币种
                        this.massage = '该币目前已下架，有疑问请联系平台确认！'
                        // this.tip = true
                    }
                    else if (this.coin_status == 2) { // 正常币种
                        if (which == 'recharge') { // 充值跳转
                            var routeData = this.$router.resolve({
                                path: '/recharge', query: { coin_id: val }
                            });
                            window.open(routeData.href, '_blank');
                            //  this.RechargeJumpPath = `recharge?coin_id=${val}`;
                        }
                        if (which == 'withdraw') {
                            if (this.moneypsw == 1) { // 已设置资金密码，提币跳转
                                this.$router.push({
                                    path: '/withdrawCash', query: { coin_id: val }
                                })
                            } else {
                                this.withdraw = false // 提示设置资金密码
                                this.$router.push({
                                    path: '/withdrawCash', query: { coin_id: val }
                                })
                            }
                        }
                        else if (which == 'transfer') { // 划转跳转
                            // 关闭计时器
                            if (this.timeroutApi) { // 三分钟汇率刷新暂停
                                clearInterval(this.timeroutApi);
                            }
                            this.id = val2
                            this.otherId = val
                            this.show = true;
                        }
                    }
                    else if (this.coin_status == 3) { // 禁止充值、提现
                        if (which == 'transfer') { // 划转跳转
                            // 关闭计时器
                            if (this.timeroutApi) { // 三分钟汇率刷新暂停
                                clearInterval(this.timeroutApi);
                            }
                            this.id = val2
                            this.otherId = val
                            this.show = true;
                        }
                        else {
                            // this.tip = true
                            this.massage = '该币目前不支持充值提币，有疑问请联系平台确认！'
                        }
                    }
                    else if (this.coin_status == 4) {
                        if (which == 'recharge') { // 充值跳转
                            this.massage = '禁止充值'
                            // this.tip = true
                        }
                        else if (which == 'withdraw') {
                            if (this.moneypsw == 1) { // 已设置资金密码，提币跳转
                                this.$router.push({
                                    path: '/withdrawCash', query: { coin_id: val }
                                })
                            } else {
                                this.withdraw = true // 提示设置资金密码
                            }
                        }
                        else if (which == 'transfer') { // 划转跳转
                            // 关闭计时器
                            if (this.timeroutApi) { // 三分钟汇率刷新暂停
                                clearInterval(this.timeroutApi);
                            }
                            this.id = val2
                            this.otherId = val
                            this.show = true;
                        }
                    } else if (this.coin_status == 5) {
                        if (which == 'recharge') { // 充值跳转
                            this.$router.push({
                                path: '/recharge', query: { coin_id: val }
                            })
                        }
                        else if (which == 'withdraw') {
                            this.massage = '禁止提币'
                            // this.tip = true
                        }
                        else if (which == 'transfer') { // 划转跳转
                            // 关闭计时器
                            if (this.timeroutApi) { // 三分钟汇率刷新暂停
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
        // 隐藏资金为零的币种（switch）
        change(status) {
            if (this.list.length > 12) { // 表格宽度对齐
                this.isA = false
            } else {
                this.isA = true
            }
            if (status) { // 打开开关，隐藏0资金币种
                this.hiddenzeromoney = true;
            } else { // 关闭开关，显示0资金币种
                this.hiddenzeromoney = false;
            }
        },
        // 划转弹窗关闭
        closeTransfer() {
            this.refresh()
            this.show = false;
        },
        // 币种状态、资金密码设置弹窗关闭
        close(val) {
            if (val == 'withdrawtip') {
                this.withdraw = false
            }
            else if (val == 'tip') {
                this.tip = false
            }
        },
        // 保证金管理
        cashDeposit(){
            // this.
            let { href } = this.$router.resolve({
                path: 'cashdeposit'
            })
            window.open(href, '_blank')
        },
        // 强制退出
        immediateClose() {
            var message_status;
            window.addEventListener("message", (data) => {
                message_status = data.data;
                if (data.data === 'close') {
                    this.bandPayVisable = false;
                    this.isCloseVisibility = false;
                    this.chargeMoneyVisable = false;
                }
            }, false);
            $('.close').on('click', () => {
                try {
                    this.$refs.iframe.contentWindow.postMessage('unload','*');
                    setTimeout(function(){
                        if (!message_status) {
                            this.bandPayVisable = false;
                            this.isCloseVisibility = false;
                            this.chargeMoneyVisable = false;
                        }
                        message_status = null;
                    }, 50)
                } catch(e) {
                    this.bandPayVisable = false;
                    this.isCloseVisibility = false;
                    this.chargeMoneyVisable = false;
                    message_status = null;
                }
            })

        },
	},
    created() {
    },
	mounted() {
        this.getForbidMoneyLists();
        // this.moneybagInfo(); // 资金折合信息
        this.refresh()
        this.immediateClose();
        try {
            // 获取保证金
            api.get_deposit().then(res => {
                if (res.data) {
                    this.totalKT = parseFloat(res.data.finance_freeze_amount_str).toFixed(2);
                } else { // 未拿到保证金
                    this.totalKT = '0.00';
                }
            });
        } catch(e) {
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },
    destroyed() {
        clearTimeout(this.timer);
    }
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

.wallet-asset-heade .asset-heade-right span:nth-of-type(4),
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

.wallet-asset-heade .asset-heade-right span:nth-last-of-type(1){
    margin-right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.25rem;
    height: 1.35rem;
    color: #445189;
    line-height: 1.35rem;
    text-align: center;
    border: 1px solid #445189;
    border-radius: 0.25rem;
}

.wallet-asset-heade .asset-heade-right span.vertical-line {
    display: inline-block;
    height: 1.75rem;
    width: 1px;
    background: #ccc;
}

.wallet-asset-heade .asset-heade-right span:nth-of-type(4) {
    margin-left: 0.9rem;
    margin-right: 1.5rem;
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
    margin-left: -0.35rem;
    font-family: 'PingFangSC-Semibold';
    font-size: 0.9rem;
    color: #2E3B6F;
}

.overview-content .walet-second {
	background: #fff;
}

.overview-content .title {
	margin: 0;
}

.overview-content .walet-second .title {
    display: inline-block;
	color: #2E3B6F;
	font-weight: 600;
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
	margin: 1.4rem 0 0 0;
}

.overview-content .asset-walet-list li {
	width: 33%;
	height: 8.85rem;
	float: left;
	/* border-right: 1px solid #D9D9D9; */
	padding: 0 0 0 1.5rem;
	/* line-height: 2.25rem; */
}

.overview-content .asset-walet-list li.no-border {
	border: none;
}

.overview-content .asset-walet-list li.vertical-line {
    margin-top: 1.3rem;
    height: 7.2rem;
    width: 1px;
    background: #D9D9D9;
    padding: 0 0;
}

.overview-content .asset-walet-list p.mid-item {
    margin: 1.05rem 0 1rem 0;
}

.overview-content .asset-walet-list .title {
    padding: 0 0;
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
    text-align: center;
    width: 25%;
}

.table-container .no-data {
	text-align: center;
	line-height: 5rem;
}

.table-container table td:nth-of-type(1) {
    width: 15%;
}

.table-container table td:nth-of-type(2) {
    width: 20%!important;
}

.table-container table td:nth-of-type(3) {
    width: 20%!important;
}

.table-container table td:nth-of-type(4) {
    width: 15%!important;
    padding-left: 1.25rem;
}

.table-container table td:nth-of-type(5) {
    width: 30%;
}

.table-container .col-photo {
	display: inline-block;
	width: 1rem;
	vertical-align: middle;
}

.table-container .col5 a:hover {
    color: #F3BA2F;
}

.moneybagbody .opration {
    width: 15.25rem!important;
    display: flex;
    justify-content: flex-end;
}
.moneybagbody .opration span {
	cursor: pointer;
    margin-left: 0;
}
.moneybagbody .opration .charge-money {
    margin-right: 0.75rem;
}

.moneybagbody .opration span.mob {
    margin-left: 0.75rem;
}

input::-webkit-input-placeholder {
    color: rgba(255, 255, 255,.56);
}

.moneybagbody .disabled {
    color: #999!important;
}

.moneybagbody .disabled:hover {
    color: #999!important;
    cursor: not-allowed
}
</style>
