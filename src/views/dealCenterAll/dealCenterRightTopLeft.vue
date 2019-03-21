<template>
	<div class="rightTop">
		<div class="nav">
			<div class="topWai">
				<ul class="toppp">
					<li class="top-first">卖单</li>
					<router-link tag="a" class="top-more" target="_blank" :to="{name:'dealCenterMore', params: {symbol: symbol.symbol.toLowerCase()}}">更多</router-link>
				</ul>
			</div>
			<p>
				<span>价格</span>
				<span>数量({{symbolAss.toUpperCase()}})</span>
				<span>总计({{symbolAss.toUpperCase()}})</span>
			</p>
			<div class="list" ref="priceListTop">
				<ul v-for="(val, index) in sell_list" @click="change_price(val.price)" >
					<li class="redTextColor">{{val.price | scientificToNumber}}</li>
					<li>{{val.count}}</li>
					<li>{{val.all}}</li>
				</ul>
			</div>
		</div>
		<div class="nav"  style="margin-top: 0.2rem;">
			<div class="topWai">
				<ul class="toppp">
					<li class="top-first">买单</li>
					<!-- <a class="top-more" target="_Blank" href="#/DealCenter/dealCenterMore">更多</a> -->
					<router-link tag="a" class="top-more" target="_blank" :to="{name:'dealCenterMore', params: {symbol: symbol.symbol.toLowerCase()}}">更多</router-link>
				</ul>
			</div>
			<p>
				<span>价格</span>
				<span>数量({{symbolAss.toUpperCase()}})</span>
				<span>总计({{symbolAss.toUpperCase()}})</span>
			</p>
			<div class="list">
				<ul v-for="(val, index) in buy_list" @click="change_price(val.price)" >
					<li class="greenTextColor">{{val.price | scientificToNumber}}</li>
					<li>{{val.count}}</li>
					<li>{{val.all}}</li>
				</ul>
			</div>
		</div>

		<!-- <div class="depthSelect">
			<span @click="selectStatus = !selectStatus" class="depthLeft">
				深度
				<span>{{depthFix}}</span>
				<span v-show="selectStatus" class="icon-select-up"></span>
				<span v-show="!selectStatus" class="icon-select-down"></span>
			</span>

			<div v-show="selectStatus" class="depthContent">
				<ul>
					<li @click="setDepth(0.0001)">0.0001</li>
					<li @click="setDepth(0.00001)">0.00001</li>
					<li @click="setDepth(0.000001)"> 0.000001</li>
				</ul>
			</div>

			<span class="depthRight">更多</span>
		</div> -->
	</div>
</template>
<script type="text/javascript">
import * as io from "socket.io-client";
import { exchange, scientificToNumber } from '../../common/js/N.js'
import { mapGetters } from 'vuex'
export default {
	name: "dealCenterRightTopRight",
	data() {
		return {
			selectStatus: false,
			thisSocketStr: '',
			sell_list: [],
			buy_list: [],
			maxasks: 0,
			sumasks: 0,
			maxbids: 0,
			sumbids: 0
		}
	},
	computed: {
		linear() {
			return {
				background: 'linear-gradient(to left, rgba(255, 255, 255, .2), rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0))'
			}
		},
		...mapGetters([
			'symbol',
			'symbolAss',
			'symbolPri',
			'detailObj',
		]),
	},
	watch: {
		symbol(newVal, oldVal) {
			if (oldVal.coin_id != newVal.coin_id || oldVal.pri_id != newVal.pri_id) {

				this.sendSocket()
			}
		}
	},
	created() {
		window.thisSocket.on('sub', (data) => {
			this.socketData(data)
		})
		window.thisSocket.on('req', (data) => {
			this.socketData(data)
		})

		this.sendSocket()
	},
	methods: {
		socketData(data) {
			if (data.ch == this.thisSocketStr && data.code == 0) {
				this.maxasks = 0
				this.sumasks = 0
				this.maxbids = 0
				this.sumbids = 0
				this.sell_list = []
				this.buy_list = []
				let asks = data.data.asks
				let bids = data.data.bids
				asks.forEach((val, index) => {
					this.maxasks = val[1] > this.maxasks ? val[1] : this.maxasks
				})
				
				asks.forEach((val, index) => {
					if (index <= 11) {
						this.sumasks += val[1]
						this.sell_list.push({
							price: scientificToNumber(exchange(val[0], this.detailObj.pointLengthPri)),
							count: scientificToNumber(exchange(val[1], this.detailObj.pointLengthAss)),
							all: scientificToNumber(exchange(this.sumasks, this.detailObj.pointLengthAss)),
							per: Math.ceil(val[1] / this.maxasks * 100)
						})
					}
				})
				this.sell_list = this.sell_list.reverse()


				bids.forEach((val, index) => {
					this.maxbids = val[1] > this.maxbids ? val[1] : this.maxbids
				})
				bids.forEach((val, index) => {
					if (index <= 11) {
						this.sumbids += val[1]
						this.buy_list.push({
							price: scientificToNumber(exchange(val[0], this.detailObj.pointLengthPri)),
							count: scientificToNumber(exchange(val[1], this.detailObj.pointLengthAss)),
							all: scientificToNumber(exchange(this.sumbids, this.detailObj.pointLengthAss)),
							per: Math.ceil(val[1] / this.maxbids * 100)
						})
					}
				})
			}
		},
		// centerScroll() {
		// 	let height1 = (this.$refs.priceListTop.children.length * this.$refs.priceListTop.children[0].offsetHeight - this.$refs.priceListTop.offsetHeight) / 2
		// 	this.$refs.priceListTop.scrollTop = height1;
		// 	let height2 = (this.$refs.priceListBottom.children.length * this.$refs.priceListBottom.children[0].offsetHeight - this.$refs.priceListBottom.offsetHeight) / 2
		// 	this.$refs.priceListBottom.scrollTop = height2;
		// }
		setDepth(num) {
			this.selectStatus = false
			this.$store.commit('setDepthFix')
		},
		sendSocket() {
			if (this.thisSocketStr) {
				window.thisSocket.emit('unsub', this.thisSocketStr)
			}

			this.thisSocketStr = `market.${this.symbolAss}_${this.symbolPri}.depth.step0`

			window.thisSocket.emit('req', this.thisSocketStr)
			window.thisSocket.emit('sub', this.thisSocketStr)
		},
		change_price(price) {
			this.$store.commit('change_delecent_price', price)
		}
	}

}
</script>
