<template>
    <div class="centerLeft">
        <p class="nav">
            <span :class="{active:tab==0}" @click="toggle(0)">当前委托</span>
            <span :class="{active:tab==1}" @click="toggle(1)">历史委托</span>
            <span style="float: right;margin-right: 0.6rem;" @click="refresh">
                <Icon type="refresh" :style="{'color': !doubleClick ? '#FFF' : '#797878'}" :size="20"></Icon>
            </span>
            <!-- <span class="but">{{ $t(`message.DealCenter.AllWithdrawals`) }}</span> -->
        </p>
        <div class="nowweituo" v-show="tab==0">
          <div class="table-box">
            <p class="th">
                <span class="one">日期</span>
                <span class="two">类型</span>
                <span class='three'>价格</span>
                <span class="four">委托量</span>
                <span class="four">剩余委托量</span>
                <span class="five">操作</span>
            </p>
            <div class="list">
                <p class="tr" v-show='nowExchangeList.length > 0 && val.trade_type == 1 ? discardId.indexOf(val.exchange_buy_id) == -1 : discardId.indexOf(val.exchange_sell_id) == -1' v-for="(val, index) in nowExchangeList">
                    <span class="one">{{val.created_at}}</span>
                    <span class="two" :class="{'redTextColor' : val.trade_type != 1, 'greenTextColor' : val.trade_type == 1}">{{val.trade_type == 1 ? '买入' : '卖出'}}</span>
                    <span class='three'>{{val.exchange_type == 1 ? val.price_str : '市价' | scientificToNumber}} {{val.main_coin_name.toUpperCase()}}</span>
                    <span class="four">{{val.exchange_amount_str}} {{val.trade_type == 1 && val.exchange_type == 2 ? val.main_coin_name.toUpperCase() : val.side_coin_name.toUpperCase()}}</span>
                    <span class="four">{{val.remaining_amount_str}} {{val.trade_type == 1 && val.exchange_type == 2 ? val.main_coin_name.toUpperCase() : val.side_coin_name.toUpperCase()}}</span>
                    <span class="five longfive">
                        <button @click="model(val, index)">撤单</button>
                    </span>
                </p>
                <div v-show='nowExchangeList.length == 0' class="trsky">
                    <span class="icon-no_info">
                    </span>
                    <a href="javascript:;">暂无委托</a>
                </div>
            </div>
          </div>
        </div>
        <div class="nowweituo history" v-show="tab==1">
          <div class="table-box">
            <p class="th">
                <span class="one">日期</span>
                <span class="two">类型</span>
                <span class='three'>价格</span>
                <span class="four fortop">委托量</span>
                <span class="four">已成交</span>
                <span class="four">成交均价</span>
                <span class="five">状态</span>
                <!-- <span class="five">{{ $t(`message.OTCBeal.Operate`) }}</span> -->
            </p>
            <div class="list">
                <p class="tr" v-show='hisExchangeList.length > 0' v-for="(val, index) in hisExchangeList">
                    <span class="one">{{val.created_at}}</span>
                    <span class="two" :class="{'redTextColor' : val.trade_type != 1, 'greenTextColor' : val.trade_type == 1}">{{val.trade_type == 1 ? '买入' : '卖出'}}</span>
                    <span class='three'>{{val.exchange_type == 1 ? val.price_str : '市价' | scientificToNumber}} {{val.main_coin_name.toUpperCase()}}</span>
                    <span class="four" :class="hisExchangeList.length>2?'':'longfour'">{{val.exchange_amount_str}} {{val.trade_type == 1 && val.exchange_type == 2 ? val.main_coin_name.toUpperCase() : val.side_coin_name.toUpperCase()}}</span>

                    <span class="four">{{val.solved_amount_str}}</span>
                    <span class="four">{{val.ave_price_str}}</span>
                    <span class="five">{{val.exchange_status == 3 ? '已撤销' : '已完成'}}</span>
                </p>
                <div v-show='hisExchangeList.length == 0' class="trsky">
                    <span class="icon-no_info">
                    </span>
                    <a href="javascript:;">暂无委托</a>
                </div>
            </div>
          </div>
        </div>

        
        <div class="modal" v-show="m">
            <span class="icon-wrong" @click="hidden"></span>
            <p class="title">认证提示</p>
            <p class="alter">将会撤销当前委托，是否撤销?</p>
            <p class="bttn">
                <button @click="delSure" :disabled="doubleClick">撤销</button>
                <button @click="hidden">取消</button>
            </p>
        </div>
        <div class="all" v-show="m"></div>
    </div>
</template>
<script type="text/javascript">
import utils from './../../utils'
import api from '../../api'
import { exchange } from '../../common/js/N.js'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            m: false,
            tab: 0,

            delSureData: '',

            doubleClick: false,
            discardId: [],
        }
    },
    computed: {
        ...mapGetters([
            'symbol',
            'symbolAss',
            'symbolPri',
            'frontUser',
            'nowExchangeList',
            'hisExchangeList',
            'detailObj',
        ]),
    },
    created() {
        if (this.frontUser && this.frontUser !== utils.getCookie('username')) {
            this.$store.commit('CLEAR_EXCHANG_LIST');
            this.$store.commit('CLEAR_FRONT_USER');
            this.getList()
        }
    },
    watch: {
        symbol(newVal, oldVal) {
            if (oldVal.coin_id != newVal.coin_id || oldVal.pri_id != newVal.pri_id) {
                this.getList()
            }
        }
    },
    methods: {
        model(val) {
            this.m = true;
            this.delSureData = val
        },
        delSure() {
            this.doubleClick = true
            var apiStr = '', idName = ''
            if (this.delSureData.trade_type == 1) {
                apiStr = 'cancelExchangeBuy'
                idName = 'exchange_buy_id'
            } else {
                apiStr = 'cancelExchangeSell'
                idName = 'exchange_sell_id'
            }
            this.discardId.push(this.delSureData[idName])

            api[apiStr]({ id: this.delSureData[idName] }).then(res => {
                this.doubleClick = false
                if (res.status_code == 200) {
                    this.$store.dispatch('getMoneyMes', { ass: { coin_id: this.symbol.coin_id }, pri: { coin_id: this.symbol.pri_id } })
                    this.hidden()
                    this.getList()

                    // setTimeout(() => {
                    //     this.getList()
                    // }, 3000)
                }
            })
        },
        hidden() {
            this.m = false;
        },
        toggle(index) {
            this.tab = index;
        },
        getList() {
            if (utils.isLogin()) {
                let params = {
                    page: 1,
                    page_size: 100,
                }
                this.$store.dispatch('getExchangeList', params)
            }
        },
        refresh() {
            if (!this.doubleClick) {
                this.doubleClick = true
                this.getList()
                setTimeout(() => {
                    this.doubleClick = false
                }, 1500)
            }
        }
    }
}
</script>
