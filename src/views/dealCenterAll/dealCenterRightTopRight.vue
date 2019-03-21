<template>
	<div id="dealCenterRightTopRight">
		<div class="right-top-right-content-padding">
			<div class="topWai">
				<ul class="toppp">
					<li class="top-first">最新成交</li>
				</ul>
			</div>
			<div class="bottomWai">
				<ul class="bottom">
					<li class="bottom-first">时间</li>
					<li class="bottom-second">成交价({{symbolPri.toUpperCase()}})</li>
					<li class="bottom-third">总计({{symbolAss.toUpperCase()}})</li>
				</ul>
			</div>

			<div class="content" ref="rightTopContant">
				<ul class="content-dan" v-for="item in datas" :class="datas.length<=19?'contentDuiqi':''">
					<li class="content-dan-first">{{item.ts | timeToDate}}</li>
					<li class="content-dan-second" :class="{redTextColor: item.direction == 'sell', greenTextColor: item.direction == 'buy'}">{{item.price | scientificToNumber}}</li>
					<li class="content-dan-third">{{item.amount}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import * as io from "socket.io-client";
import { exchange, scientificToNumber } from '../../common/js/N.js'
import { mapGetters } from 'vuex'


export default {
	name: "dealCenterRightTopRight",
	data() {
		return {
			biangao: false,
			thisSocketStr: '',
			thisSocket: '',
			datas: []
		}
	},
	components: {

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
	computed: {
		...mapGetters([
			'symbol',
			'symbolAss',
			'symbolPri',
			'socketAdr',
			'depthFix',
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
	methods: {
		socketData(data) {
			if (data.ch == this.thisSocketStr && data.code == 0) {

				var data = data.data.data
				var eachData = []
				data.forEach((val, index) => {

					val.price = scientificToNumber(exchange(val.price, this.detailObj.pointLengthPri))
					val.amount = scientificToNumber(exchange(val.amount, this.detailObj.pointLengthAss))

					eachData.unshift(val)
					if (this.datas.length == 40) {
						this.datas.pop()
					}
				})

				this.datas = eachData
			}
		},
		sendSocket() {
			this.datas = []

			if (this.thisSocketStr) {
				window.thisSocket.emit('unsub', this.thisSocketStr)
			}


			this.thisSocketStr = `market.${this.symbolAss}_${this.symbolPri}.trade.detail`

			window.thisSocket.emit('req', this.thisSocketStr)
			window.thisSocket.emit('sub', this.thisSocketStr)
		}

	},
	filters: {
		timeToDate: function (value) {
			let date = new Date(value * 1000);
			let Y = date.getFullYear();
			let M = date.getMonth() + 1;
			let D = date.getDate();
			let H = date.getHours();
			let I = date.getMinutes();
			let S = date.getSeconds();
			return addZero(H) + ":" + addZero(I) + ":" + addZero(S);
			function addZero(x) {
				return x < 10 ? "0" + x : "" + x;
			}
		}
	}

}
</script>


