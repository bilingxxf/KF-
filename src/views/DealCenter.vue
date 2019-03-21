<template>
    <div>
        <Content>
            <div class="dealCenter">
                <div class="deal-wrap">
                    <div class="deal-left">
                        <div class="deal-left-content">
                            <div class="left-top">

                                <dealCenterLeftTopSelect></dealCenterLeftTopSelect>
                                <keep-alive>
                                    <dealCenterChart></dealCenterChart>
                                </keep-alive>

                            </div>
                            <div class="left-bottom">
                                <dealCenterLeftBottom></dealCenterLeftBottom>
                            </div>
                        </div>
                    </div>
                    <div class="deal-right">
                        <div class="deal-right-content">
                            <div class="right-top">
                                <div class="deal-right-top-content">
                                    <div class="right-top-left">
                                        <dealCenterRightTopLeft></dealCenterRightTopLeft>
                                    </div>
                                    <div class="right-top-middle"></div>
                                    <div class="right-top-right">
                                        <dealCenterRightTopRight></dealCenterRightTopRight>
                                    </div>
                                </div>
                            </div>
                            <div class="right-bottom">
                                <dealCenterRightBottom></dealCenterRightBottom>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    </div>
</template>
<script>
import dealCenterLeftBottom from "./dealCenterAll/dealCenterLeftBottom.vue";
import dealCenterRightBottom from "./dealCenterAll/dealCenterRightBottom.vue";
import dealCenterRightTopRight from "./dealCenterAll/dealCenterRightTopRight";
import dealCenterRightTopLeft from "./dealCenterAll/dealCenterRightTopLeft.vue";
import dealCenterLeftTopSelect from "./dealCenterAll/dealCenterLeftTopSelect.vue";
import dealCenterChart from "./dealCenterAll/dealCenterChart.vue";
import api from '../api'
import { exchange } from '../common/js/N.js'
import * as io from "socket.io-client";
import { mapGetters } from 'vuex'
let socketButton;
export default {
    created() {
        // this.$store.dispatch("getExchangeFinanceListAss");
        this.openSocket();
        this.$store.dispatch("getCoinList");
        this.$store.dispatch('gettoCurrency')
    },
    data() {
        return {
            changeRightHeight: 0, // 判断定价市价的选择状态
            heightClass: true,
            socketTimer: null,
        };
    },
    computed: {
        ...mapGetters([
            'symbol',
            'socketAdr',
            'symbolAss',
            'symbolPri',
            'toCurrency',
            'detailObj',
        ]),
    },
    components: {
        dealCenterChart,
        dealCenterRightBottom,
        dealCenterRightTopRight,
        dealCenterLeftBottom,
        dealCenterRightTopLeft,
        dealCenterLeftTopSelect,
    },
    watch: {
        symbol() {
            document.title = `${exchange(this.symbol.price, this.detailObj.pointLengthPri)} ${this.symbolAss.toUpperCase()}/${this.symbolPri.toUpperCase()} -KF-全球领先数字资产交易平台`
        }
    },
    methods: {
        getChangeHeight(data) {
            this.changeRightHeight = data;
            if (this.changeRightHeight == 0) {
                this.heightClass = true;
            } else if (this.changeRightHeight == 1) {
                this.heightClass = false;
            }
        },
        openSocket() {
            window.thisSocket = io(this.socketAdr, {
                path: "/realdata/ws/",
                transports: ['websocket'] // or [ 'websocket', 'polling' ], which is the same thing
            });
            window.thisSocket.on('disconnect', function () {
                this.io.reconnect()
            });
            window.thisSocket.on('reconnect_failed', function () {
                this.io.reconnect()
            });

            window.thisSocket.on('reconnect', () => {
                window.thisSocket.emit('sub', `market.${this.symbolAss}_${this.symbolPri}.depth.percent10`)
                window.thisSocket.emit('sub', `market.${this.symbolAss}_${this.symbolPri}.depth.step0`)
                window.thisSocket.emit('sub', `market.${this.symbolAss}_${this.symbolPri}.trade.detail`)
                window.thisSocket.emit('sub', `market.overview.all`)
                window.thisSocket.emit('sub', `market.${this.symbolAss}_${this.symbolPri}.kline.${localStorage.getItem('time')}`)
            });

            window.thisSocket.on('sub', (data) => {
                if (!data.ch) {
                    this.$store.commit('setDetailObjList', data)
                }
            })

        },
        hideSocket() {
            socketButton = document.getElementById('launcher')
            if (socketButton) {
                clearInterval(this.socketTimer)
                socketButton.style.visibility = 'hidden'
                return
            }
            this.socketTimer = setTimeout(() => {
                this.hideSocket()
            }, 1000)
        },
    },
    mounted() {
        this.$store.commit("changeDealShow", 1);
        this.$store.commit("hideFooter", true)
        this.hideSocket()
    },
    beforeDestroy() {
        if (socketButton) socketButton.style.visibility = 'visible'
        socketButton = null
        clearInterval(this.socketTimer)
        this.$store.commit("changeDealShow", 0);
        this.$store.commit("hideFooter", false)
        // tvWidget.remove()
        window.thisSocket.disconnect(function () {

        })
        document.title = 'KF官网 | 全球领先数字资产交易平台'

    }
};
</script>
