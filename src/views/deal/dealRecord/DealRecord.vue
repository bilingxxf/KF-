<template>
    <div class="ddealrecord ddealrecord-new">
        <div class="deal-record deal-record-new">
            <div class="record-header">
                <div class="head-left">
                    <a class="title" v-bind:class="{ active: isA }" @click="mydealShow()">
                        {{ $t(`message.DealCenter.MyBuyHistory`) }}
                    </a>
                    <a class="title" v-bind:class="{ bbactive: isB }" @click="bbdealShow()">
                        {{ $t(`message.DealCenter.MySellHistory`) }}
                    </a>
                </div>
            </div>
            <div class="head-right" v-show="searchA">
                    <div class="dealrecord dealtime dealrecord-new">
                        <button type="primary" @click="inquireThree()" :disabled="buyBtnDisabled">{{$t(`message.OTCOrder.Search`)}}</button>
                        <Select v-model="modelStatus" style="width:6rem" placeholder="全部类型" clearable>
                            <Option :value="item.iNum" :label="item.iNum" v-for="(item,index) in statusArr" :key="index">{{item.value}}</Option>
                        </Select>
                        <p>状态</p>
                        <Select v-model="modelSymbolL" style="width:6rem" :placeholder="$t(`message.OTCOrder.Choose`)" class="margin-left" clearable>
                            <Option :value="item.symbol_id" v-for="(item,index) in biTypeHave" :key="item.symbol_id" :label="item.symbol_id">{{item.symbol}}</Option>
                        </Select>
                        <p>交易对</p>
                        <Select v-model="modelType" style="width:6rem" placeholder="全部类型" clearable>
                            <!--  <Option :value="$t(`message.DealCenter.MarketOrder`)" :label="$t(`message.DealCenter.MarketOrder`)">{{ $t(`message.DealCenter.MarketOrder`) }}</Option>
                          <Option :value="$t(`message.DealCenter.LimitOrder`)" :label="$t(`message.DealCenter.LimitOrder`)">{{ $t(`message.DealCenter.LimitOrder`) }}</Option> -->
                            <Option :value="item.icon" :label="item.icon" v-for="(item,index) in dealType" :key="item.icon">{{item.value}}</Option>
                        </Select>
                        <p>交易类型</p>               
                    </div>
                </div>
                <div class="head-right" v-show="searchB">
                    <div class="dealrecord dealtime dealrecord-new">
                        <button type="primary" @click="sellInquireThree()" :disabled="sellBtnDisabled">{{$t(`message.OTCOrder.Search`)}}</button>
                        <Select v-model="modelTwoStatus" style="width:6rem" :placeholder="$t(`message.OTCOrder.AllTypes`)" clearable>
                            <Option :value="item.iNum" :label="item.iNum" v-for="(item,index) in statusArr" :key="index">{{item.value}}</Option>
                        </Select>
                        <p>状态</p>
                        <Select v-model="modelTwoSymbolL" style="width:6rem" :placeholder="$t(`message.OTCOrder.Choose`)" class="margin-left" clearable>
                            <Option :value="item.symbol_id" v-for="(item,index) in biTypeHave" :key="item.symbol_id" :label="item.symbol_id">{{item.symbol}}</Option>
                        </Select>
                        <p>交易对</p>
                        <Select v-model="modelTwoType" style="width:6rem" :placeholder="$t(`message.OTCOrder.AllTypes`)" clearable>
                            <!-- <Option :value="$t(`message.DealCenter.MarketOrder`)" :label="$t(`message.DealCenter.MarketOrder`)">{{ $t(`message.DealCenter.MarketOrder`) }}</Option>
                    <Option :value="$t(`message.DealCenter.LimitOrder`)" :label="$t(`message.DealCenter.LimitOrder`)">{{ $t(`message.DealCenter.LimitOrder`) }}</Option> -->
                            <Option :value="item.icon" :label="item.icon" v-for="(item,index) in dealType" :key="item.icon">{{item.value}}</Option>
                        </Select>
                        <p>交易类型</p>               
                    </div>
                </div>
            <my-deal v-show="myshow" :filterData="screeningCondition" :portStatus="firstPort" @ifEmpty="determinedEmpty"></my-deal>
            <bb-deal v-show="bbshow" :filterSellData="sellScreeningCondit" :sellStartRender="startSellBegin" @whetherEmpty="deterEmpty"></bb-deal>
        </div>
    </div>
</template>

<script>
import MyDeal from './components/MyDeal.vue'
import BbDeal from './components/BbDeal.vue'
import api from '../../../api.js'
export default {
    name: 'DealRecord',
    components: {
        MyDeal,
        BbDeal
    },
    data() {
        return {
            //交易类型的array
            dealType: [
                { icon: 1, value: this.$t(`message.DealCenter.LimitOrder`) },
                { icon: 2, value: this.$t(`message.DealCenter.MarketOrder`) }
            ],
            //交易的不同状态的array
            statusArr: [
                { iNum: 1, value: this.$t('message.OrderRecord.Proceeding') },
                { iNum: 3, value: this.$t('message.CancelEd') },
                { iNum: 4, value: this.$t('message.Finished') }
            ],
            //买入卖出的列表的切换
            myshow: true,
            bbshow: false,
            //买入卖出的title字体状态
            isA: true,
            isB: false,
            //买入卖出的搜索条件的两个切换
            searchA: true,
            searchB: false,
            // 买入单子
            modelType: '',
            modelSymbolL: '',
            modelStatus: '',
            // 卖出单子
            modelTwoType: '',
            modelTwoSymbolL: '',
            modelTwoStatus: '',
            //币种类型
            biTypeHave: [],
            //买列表的筛选条件
            screeningCondition: {
                type: "",
                symbol: "",
                status: ""
            },
            //卖列表的筛选条件
            sellScreeningCondit: {
                type: "",
                symbol: "",
                status: ""
            },
            //卖出的第一次渲染
            startSellBegin: false,
            //第一次请求控制后面请求参数
            firstPort: "",
            //控制买入搜索的按钮的disabled
            buyBtnDisabled: false,
            //控制卖出搜索的按钮的disabled
            sellBtnDisabled: false
        }
    },
    methods: {
        //判断总的买入列表是否为空
        determinedEmpty(data) {
            if (data == "kong") {
                this.buyBtnDisabled = true;
            } else if (data == "bukong") {
                this.buyBtnDisabled = false;
            }
        },
        //判断总的卖出列表是否位空
        deterEmpty(data) {
            if (data == "kong") {
                this.sellBtnDisabled = true;
            } else {
                this.sellBtnDisabled = false;
            }
        },
        //交易对的获取
        getBiType() {
            api.dealCenterRecordGetSymbol().then(res => {
                if (res.status_code == 200) {
                    this.biTypeHave = res.data.list;
                    console.log(this.biTypeHave)
                    this.firstPort = "yes";
                } else {
                    this.firstPort = "no";
                }
            }).catch(error => {
            })
        },
        //买入时的查询条件
        inquireThree() {
            let screeningCondi = {
                type: this.modelType,
                symbol: this.modelSymbolL,
                status: this.modelStatus
            }
            for (let key in screeningCondi) {
                if (screeningCondi[key] == undefined) {
                    screeningCondi[key] = "";
                }
            }
            //状态和种类筛选放在交易对里面

            //交易对筛选
            this.screeningCondition.symbol = screeningCondi.symbol ? screeningCondi.symbol : "";
            this.screeningCondition.type = screeningCondi.type ? screeningCondi.type : "";
            this.screeningCondition.status = screeningCondi.status ? screeningCondi.status : "";
        },
        //展现卖出订单
        bbdealShow() {
            this.myshow = false;
            this.bbshow = true;
            this.isA = false;
            this.isB = true;
            this.searchWay();
            this.startSellBegin = true;
        },
        //展现卖买入订单
        mydealShow() {
            this.myshow = true;
            this.bbshow = false;
            this.isA = true;
            this.isB = false;
            this.searchWay();
        },
        //卖出的时候的查询条件
        sellInquireThree() {
            let conditionSell = {
                type: this.modelTwoType,
                symbol: this.modelTwoSymbolL,
                status: this.modelTwoStatus
            }
            for (let key in conditionSell) {
                if (conditionSell[key] == undefined) {
                    conditionSell[key] = "";
                }
            }
            this.sellScreeningCondit.symbol = conditionSell.symbol ? conditionSell.symbol : "";
            this.sellScreeningCondit.type = conditionSell.type ? conditionSell.type : "";
            this.sellScreeningCondit.status = conditionSell.status ? conditionSell.status : "";
        },
        // 根据选择买入卖出的不同右边的搜索条件不一样
        searchWay() {
            if (this.isA) {
                this.searchA = true;
                this.searchB = false;
            } else if (this.isB) {
                this.searchB = true;
                this.searchA = false;
            }
        }
    },
    mounted() {
        this.getBiType();
        this.searchWay();
        this.$store.commit('changeDealShow', 2);
    },
    beforeDestroy() {
        this.$store.commit('changeDealShow', 0);
    }
};
</script>

