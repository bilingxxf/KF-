<template>
    <div class="kd">
        <div id="tv_chart_container" v-show="isKline == 'K'" style="height: 100%;width: 100%;position: relative;"></div>
        <div id="depth_chart_container" v-show="isKline == 'D'" style="height: 100%;width: 100%;position: relative;zoom: 1.25;"></div>
    </div>
</template>
<script>
import "../../assets/js/charting_library.min.js";
import KlineChart from "../../common/js/KlineChart.js";
import depthChartOption from "../../common/js/depthChartOption.js";

import echarts from 'echarts';
// import 'echarts/src/chart/line';

import * as io from "socket.io-client";
import { exchange } from '../../common/js/N.js'


export default {
    data() {
        return {
            KlineChart,
            myChart: '',
            thisSocketStr: '',
            thisSocket: '',
            options: {},
            bids: [],
            asks: [],
            isfirst: false,
            isDeepfirst: false,
        }
    },
    computed: {
        socketAdr() {
            return this.$store.getters.socketAdr
        },
        symbol() {
            return this.$store.getters.symbol
        },
        isKline() {
            return this.$store.getters.isKline
        },
        symbolAss() {
            return this.$store.getters.symbolAss
        },
        symbolPri() {
            return this.$store.getters.symbolPri
        },
        detailObj() {
            return this.$store.getters.detailObj
        },
    },
    watch: {
        symbol(newVal, oldVal) {
            window.pointLengthPri = this.detailObj.pointLengthPri
            if (!this.isfirst) {
                this.isfirst = !this.isfirst

                setTimeout(() => {
                    this.KlineChart(this.symbolAss + this.symbolPri)

                    //req请求到数据后加载深度图
                    this.options = depthChartOption(this.detailObj.pointLengthAss, this.detailObj.pointLengthPri) //更新交易对，变换最小单位
                    this.myChart = echarts.init(document.getElementById('depth_chart_container'));
                    this.options.series[0].data = this.bids
                    this.options.series[1].data = this.asks
                    this.myChart.resize()
                    // depthChartOption.visualMap.pieces[0] = {gte: 500, lte: max, color: 'red'}; 
                    this.myChart.setOption(this.options)
                    window.onresize = this.myChart.resize;

                }, 200)
            }

            if (newVal.symbol != oldVal.symbol) {
                this.options = depthChartOption(this.detailObj.pointLengthAss) //更新交易对，变换最小单位


                this.sendChartSocket()

                if (window.klineCh) {
                    //K线图发送取消订阅
                    socketKline.send_unsub(klineCh)
                    tvWidget.chart().setSymbol(this.symbol.symbol.toUpperCase(), function () {
                        // tvWidget.chart().resetData();
                    })
                }

            }


        },
        isKline() {
            setTimeout(() => {
                this.myChart.resize()
            }, 20);
        },
    },
    methods: {
        socketData(data) {
            if (data.ch == this.thisSocketStr && data.code == 0) {
                if(!this.options.series)
                    this.options = depthChartOption(this.detailObj.pointLengthAss) //更新交易对，变换最小单位
                this.options.series[0].data = this.toLow(data.data.bids.reverse())
                this.options.series[1].data = this.toHeight(data.data.asks)
                if(this.myChart) {
                    this.myChart.setOption(this.options)
                }
            }
        },
        sendChartSocket() {
            if (this.thisSocketStr) {
                window.thisSocket.emit('unsub', this.thisSocketStr)
            }

            this.thisSocketStr = `market.${this.symbolAss}_${this.symbolPri}.depth.percent10`

            window.thisSocket.emit('req', this.thisSocketStr)
            window.thisSocket.emit('sub', this.thisSocketStr)

        },
        toLow(arr) {
            var arr = arr
            var sum = this.getSum(arr)
            var lastVal1 = 0, lastVal1Copy = 0
            arr.forEach((val, index) => {
                //缓存下val1的值
                lastVal1Copy = val[1]
                if (index == 0) {
                    val[1] = sum
                } else {
                    val[1] = sum - lastVal1
                    sum = val[1]
                    val[1] = val[1]
                }
                lastVal1 = lastVal1Copy

                val[0] = exchange(val[0], this.detailObj.pointLengthPri)
                val[1] = exchange(val[1], this.detailObj.pointLengthAss)
            })
            return arr
        },
        toHeight(arr) {
            var arr = arr
            var sum = 0
            arr.forEach((val, index) => {
                val[1] = sum + (val[1] - 0)
                sum = val[1]
                val[1] = val[1]

                val[0] = exchange(val[0], this.detailObj.pointLengthPri)
                val[1] = exchange(val[1], this.detailObj.pointLengthAss)
            })
            return arr
        },
        getSum(arr) {
            var sum = 0
            arr.forEach((val, index) => {
                sum += val[1]
            })
            return sum;
        }
    },
    created() {

        window.thisSocket.on('sub', (data) => {
            this.socketData(data)
        })
        window.thisSocket.on('req', (data) => {
            this.socketData(data)
        })
        this.sendChartSocket()
    },
    mounted() {
    },
}
</script>

<style>
.kd {
  width: 100%;
  height: calc(100% - 2.55rem);
  margin-top: 2.5rem;
  min-width: 32rem;
}
</style>
