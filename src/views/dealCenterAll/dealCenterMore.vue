<template>
    <div class="dealMore">
        <div class="asset-overview-wrap-pan">
            <div class="dealMoreConter">
                <div class="deal-top">
                    <!-- <span>币币交易</span>
                    <span>></span> -->
                    <span>买卖盘</span>
                </div>
                <div class="deal-left deal-base">
                    <div class="deal-left-title">买单</div>
                    <div class="deal-list-div">
                        <ul class="deal-list-base deal-list-base-top">
                            <li>价格</li>
                            <li>数量({{symbol.symbol.split('_')[0].toUpperCase()}})</li>
                            <li>总计({{symbol.symbol.split('_')[0].toUpperCase()}})</li>
                        </ul>
                        <ul v-for="(val, index) in buy_list" class="deal-list-base deal-list-content" :style="{background: `linear-gradient(to left, rgba(33, 169, 96, .1), rgba(33, 169, 96, .1) ${val.per}%, rgba(255, 255, 255,  0) ${val.per}%, rgba(255, 255, 255,  0))`}">
                            <li class="greenTextColor">{{val.price | scientificToNumber}}</li>
                            <li>{{val.count}}</li>
                            <li>{{val.all}}</li>
                        </ul>
                    </div>
                </div>
                <div class="deal-right deal-base">
                    <div class="deal-left-title">卖单</div>
                    <div class="deal-list-div">
                        <ul class="deal-list-base deal-list-base-top">
                            <li>价格</li>
                            <li>数量({{symbol.symbol.split('_')[0].toUpperCase()}})</li>
                            <li>总计({{symbol.symbol.split('_')[0].toUpperCase()}})</li>
                        </ul>
                        <ul v-for="(val, index) in sell_list" class="deal-list-base deal-list-content" :style="{background: `linear-gradient(to left, rgba(213, 53, 53, .1), rgba(213, 53, 53, .1) ${val.per}%, rgba(213, 53, 53,  0) ${val.per}%, rgba(213, 53, 53,  0))`}">
                            <li class="redTextColor">{{val.price | scientificToNumber}}</li>
                            <li>{{val.count}}</li>
                            <li>{{val.all}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as io from "socket.io-client";
import { exchange } from '../../common/js/N.js'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            sell_list: [],
            buy_list: [],
            val: {
                per: 50
            },
            thisSocketStr: '',
            thisSocket: '',
            sell_list: [],
            buy_list: [],
            maxasks: 0,
            sumasks: 0,
            maxbids: 0,
            sumbids: 0
        }
    },
    computed: {
        ...mapGetters([
            'socketAdr',
            'symbol',
            'detailObj',
        ]),
    },
    created() {
        this.$store.dispatch("getCoinList");
        this.thisSocket = io(this.socketAdr, {
            path: "/realdata/ws/"
        });
        this.thisSocket.on('sub', (data) => {
            this.socketData(data)
        })
        this.thisSocket.on('req', (data) => {
            this.socketData(data)
        })
        this.thisSocketStr = `market.${this.symbol.symbol.toLowerCase()}.depth.step0`

        this.thisSocket.emit('req', this.thisSocketStr)
        this.thisSocket.emit('sub', this.thisSocketStr)
    },
    methods: {
        socketData(data) {
            if (data.ch == this.thisSocketStr) {
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
                    this.sumasks += val[1]
                    if (index < 100) { 
                        this.sell_list.push({
                            price: exchange(val[0], this.detailObj.pointLengthPri),
                            count: exchange(val[1], this.detailObj.pointLengthAss),
                            all: exchange(this.sumasks, this.detailObj.pointLengthAss),
                            per: Math.ceil(val[1] / this.maxasks * 100)
                        })
                    }
                })
                // this.sell_list = this.sell_list.reverse()

                bids.forEach((val, index) => {
                    this.maxbids = val[1] > this.maxbids ? val[1] : this.maxbids
                })
                bids.forEach((val, index) => {
                    this.sumbids += val[1]
                    if (index < 100) {
                        this.buy_list.push({
                            price: exchange(val[0], this.detailObj.pointLengthPri),
                            count: exchange(val[1], this.detailObj.pointLengthAss),
                            all: exchange(this.sumbids, this.detailObj.pointLengthAss),
                            per: Math.ceil(val[1] / this.maxbids * 100)
                        })
                    }
                })
            }
        }
    },
    beforeDestroy() {
        this.thisSocket.disconnect()
    }
}
</script>
<style scoped>
.dealMore {
  width: 100%;
  background-color: #303d70;
}
.dealMore .dealMoreConter {
  width: 60.1rem;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 2.5rem;
  overflow: hidden;
}
.dealMore .deal-top {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  background-color: #1d2f6b;
}
.dealMore .deal-top span {
  font-size: 1rem;
  display: inline-block;
  margin-left: 1rem;
  color: #fff;
  font-weight: 700;
}
.dealMore .deal-top span:nth-child(1) {
  color: #f0a522;
}

.dealMore .deal-base {
  width: 29.55rem;
  min-height: 139rem;
  background-color: #475e98;
  margin-top: 1rem;
}

.dealMore .deal-left {
  float: left;
  margin-right: 1rem;
}
.dealMore .deal-right {
  float: right;
}

.dealMore .deal-left-title {
  height: 2.4rem;
  line-height: 2.4rem;
  width: 100%;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: #fff;
  background-color: #1d2f6b;
}
.dealMore .dealMoreConter .deal-list-base-top{
    padding: 0.5rem 0;
}
.dealMore .deal-list-base {
  overflow: hidden;
  /* margin-top: 0.5rem; */
  padding: 0.25rem 0;
  /* margin-bottom: 0.5rem; */
  /* padding-left: 1rem; */
  /* padding-right: 1rem; */
  font-size: 0.8rem;
  border-bottom: 1px solid #fff;
}
.dealMore .deal-list-base li {
  float: left;
  color: #fff;
}
.dealMore .deal-list-base li:nth-child(1) {
  width: 20%;
}
.dealMore .deal-list-base li:nth-child(2) {
  width: 35%;
  text-align: right;
}
.dealMore .deal-list-base li:nth-child(3) {
  width: 45%;
  text-align: right;
}
.dealMore .deal-list-div {
  padding: 0 1rem;
  padding-bottom: 1.5rem;
}
.dealMore .deal-list-content {
  color: #fff;
  /* margin-top: 0.25rem; */
  /* margin-bottom: 0; */
  /* height: 1.1rem;
  line-height: 1.1rem; */
}
.dealMore .deal-list-content:hover {
  background-color: rgb(255, 255, 255, .1) !important;
}
</style>
