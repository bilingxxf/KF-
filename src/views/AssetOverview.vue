<template>
	<div>
		<div class="asset-overview-wrap asset-over">
			<div class="asset-overview-main">
				<div class="asset-header">
					<ul class="asset-header-list list-arr">
						<li style="height: 3.4rem;" @showCityName="acceptRate" @click="addActiveClass('2')" :class="type==2? 'tab-li-active': '' ">钱包资产</li>
						<li style="height: 3.4rem;" @click="addActiveClass('3')" :class="type==3? 'tab-li-active': '' ">币币资产</li>
						<li style="height: 3.4rem" @click="addActiveClass('4')" :class="type==4? 'tab-li-active': '' ">OTC资产</li>
					</ul>
				</div>
				<assetOverviewModel  v-show="false"></assetOverviewModel>
				<assetMoneyModel v-if="type==2"></assetMoneyModel>
				<assetCurrencyModel v-else-if="type==3"></assetCurrencyModel>
				<assetOtcModel v-else></assetOtcModel>
			</div>
		</div>
	</div>
</template>
<script>
import '../assets/js/swiper.min.js'
import '../assets/css/swiper.min.css'
import iView from 'iview'
import assetOverviewModel from './moneybag/pages/assetOverviewModel'
import assetMoneyModel from './moneybag/assetMoneyModel'
import assetCurrencyModel from './moneybag/assetCurrencyModel'
import assetOtcModel from './moneybag/assetOtcModel'
import api from '../api'
export default {
	data() {
		return {
			// type: 1,
			USDT: 0,
            RMB: 0,
            USD: 0,
            totalMoney: []
		}
	},
	watch: {},
	computed: {
		type() {
			return this.$store.getters.scType
		}
	},
 	components: {
		iView,
		assetOverviewModel, // 资产总览
		assetMoneyModel, //钱包资产
		assetCurrencyModel, // 币币资产
		assetOtcModel // otc资产
	},
	methods: {
		// 添加activeclass
    	addActiveClass(type) {
//  		this.type = type
    		this.$store.commit('scType', type)
    	},
    	acceptRate(msg) {
            this.totalMoney = msg;
            this.USDT = this.totalMoney.USDT;
            this.RMB = this.totalMoney.RMB;
            this.USD = this.totalMoney.USD
        }
	},
    mounted(){
        // 隐藏资产总览
        this.$store.commit('scType', '2');
    }

}
</script>
<style scoped="scoped">
/*  资产总览   */
.asset-over .list-arr {
    /*display: table; */
    display: flex;
    width: 60rem;
    justify-content: space-between;
    align-items: center;

}
.asset-over .asset-header-list li {
    /*width: 0;
    float: none;
    display: table-cell;*/
    flex: 1;
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
	width: 50rem;
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
	box-shadow: 0.35rem 0.35rem 2.55rem -0.5rem rgb(0, 0, 0);
	border-radius: 0.2rem;
	border: 1px solid rgba(255, 255, 255, .16);
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
	padding: 0.4rem;
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
	left: 4.5rem;
}

.overview-fifth .padding-left {
	padding-left: 0.6rem;
}

.overview-content .title-wrap {
	border-bottom: 1px solid #DEDADA;
	font-size: 0.9rem;
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

.overview-content .green-node {
	color: #42A73F;
}
</style>
