 <template>
    <div id="dealCenterLeftTopSelect">
        <div class="selectTitle">

            <div class="selectTitleLeftDe">

                <div @click="upDown()" style="cursor:pointer">
                    <div class="selectTitleTwo">{{symbolAss.toUpperCase()}} / {{symbolPri.toUpperCase()}}</div>
                    <div class="selectTitleThree">
                        <span v-show="selectStatus" class="icon-select-up"></span>
                        <span v-show="!selectStatus" class="icon-select-down"></span>
                    </div>
                </div>

                <div class="selectTitleFour">{{symbol.price | scientificToNumber}} ≈ {{(symbol.price * (1 / toCurrency.arr[symbolPri.toUpperCase()])).toFixed(4) == 'NaN' ? '-' : (symbol.price * (1 / toCurrency.arr[symbolPri.toUpperCase()])).toFixed(4)}} {{toCurrency.currentName}}
                    <span class="shuGang">|</span>
                    <span class="colorRed" :style="{'color': symbol.up ? '#07f08b' : '#e13232'}">{{symbol.newPre}}</span>
                </div>
                <div class="selectTitleFive" v-show="hideAvatar">24H成交量 : {{(symbol.amount_24 - 0).toFixed(2) == 'NaN' ? '-' : (symbol.amount_24 - 0).toFixed(2)}} {{symbolAss.toUpperCase()}}</div>
            </div>
            <div class="tabLineForm">
                <div class="tabLineFormOne tabLineFormFirst" @click="changeKorD('K')" :class="{'tabLineFormActive': isKline == 'K'}">{{ $t(`message.DealCenter.KLineGraph`) }}</div>
                <div class="tabLineFormOne" @click="changeKorD('D')" :class="{'tabLineFormActive': isKline == 'D'}">{{ $t(`message.DealCenter.Depth`) }}</div>
            </div>
        </div>

        <transition name="selectfold">
            <div class="marketHouseSelect" v-show="selectStatus">
                <div class="dealSelectTab">
                    <ul class="dealSelectTabUl">
                        <li class="dealSelectTabLi" v-for="(val, index) in titleData" :class="{'dealSelectTabLiActive': index == titleIndex}" @click="changeTitle(index)">{{val.name}}</li>
                        <li class="dealSelectTabLi" :class="{'dealSelectTabLiActive': titleIndex == -1}" @click="ownTitle()">自选</li>
                    </ul>
                    <div class="dealSelectInputOut">
                        <Input class="dealSelectInput" v-model="searchWorld">
                        <span class="icon-search searchIcon" slot="append"></span>
                        </Input>
                    </div>

                </div>
                <div class="kongIf" v-if="((coinData.length == 0 && titleIndex != -1 && !searchWorld) || (ownData.length == 0 && titleIndex == -1 && !searchWorld) || (searchWorld && searchData.length == 0))">{{ $t(`message.NoMoreRecords`) }}</div>

                <div class="dealSelectContent" v-else>
                    <div class="coin_unit">
                        <div>
                            <span class="kf_span_one" action="usersort" data-sort-key="coin" @click="sortCoinFn">币种
                                <i class="kf_icon">
                                    <i class="dropup" :class='{yellow_drop_up: sortCoint % 2 == 1 && sortCoint != 0}'></i>
                                    <i class="dropdown" :class='{yellow_drop_down: sortCoint % 2 == 0 && sortCoint != 0}'></i>
                                </i>
                            </span>
                            <span class="kf_span_two" action="usersort" id="" data-sort-key="price" @click="sortPriceFn">最新价
                                <i class="kf_icon">
                                    <i class="dropup" :class='{yellow_drop_up: sortPrice % 2 == 1 && sortPrice != 0}'></i>
                                    <i class="dropdown" :class='{yellow_drop_down: sortPrice % 2 == 0 && sortPrice != 0}'></i>
                                </i>
                            </span>
                            <span class="kf_span_three" action="usersort" data-sort-key="rate" @click="sortPreFn">涨幅
                                <i class="kf_icon">
                                    <i class="dropup" :class='{yellow_drop_up: sortPre % 2 == 1 && sortPre != 0}'></i>
                                    <i class="dropdown" :class='{yellow_drop_down: sortPre % 2 == 0 && sortPre != 0}'></i>
                                </i>
                            </span>
                        </div>

                    </div>
                    <!-- <div class="title">
                        <span class="titleName">{{ $t(`message.DealCenter.MainArea`) }} </span>
                    </div> -->
                    <div>
                        <ul class="areaMoney" v-show="titleIndex != -1 && !searchWorld" v-for="(val, index) in coinData" @click="onSelect(val)">
                            <li class="areaMoneyOne"><img :src="val.coin_image" alt="" class="coinIcon" />{{val.name}}</li>
                            <li class="areaMoneyTwo">{{val.price}}</li>
                            <li class="areaMoneyThree" :style="{'color': val.up ? '#07f08b' : '#e13232'}">{{val.newPre}}</li>
                            <li class="areaMoneyFour" @click.stop>
                                <span :class="{'icon-star':true,'yellowStar': val.own == true}" @click='changeOwn(val)'></span>
                                <!-- <span @click='changeOwn(val)'>{{val.own}}</span> -->
                            </li>
                        </ul>

                        <ul class="areaMoney" v-show="titleIndex == -1 && !searchWorld" v-for="(val, index) in ownData" @click="onSelect(val)">
                            <li class="areaMoneyOne"><img :src="val.coin_image" alt="" class="coinIcon" />{{val.symbol.split('_').join('/')}}</li>
                            <li class="areaMoneyTwo">{{val.price}}</li>
                            <li class="areaMoneyThree" :style="{'color': val.up ? '#07f08b' : '#e13232'}">{{val.newPre}}</li>
                            <li class="areaMoneyFour" @click.stop>
                                <span :class="{'icon-star': true, 'yellowStar': val.own == true}" @click='changeOwn(val)'></span>
                            </li>
                        </ul>

                        <ul class="areaMoney" v-show="searchWorld" v-for="(val, index) in searchData" @click="onSelect(val)">
                            <li class="areaMoneyOne"><img :src="val.coin_image" alt="" class="coinIcon" />{{titleIndex == -1 ? val.symbol.split('_').join('/') : val.name}}</li>
                            <li class="areaMoneyTwo">{{val.price}}</li>
                            <li class="areaMoneyThree" :style="{'color': val.up ? '#07f08b' : '#e13232'}">{{val.newPre}}</li>
                            <li class="areaMoneyFour" @click.stop>
                                <span :class="{'icon-star': true, 'yellowStar': val.own == true}" @click='changeOwn(val)'></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import * as io from "socket.io-client";
import api from '../../api'
import { exchange } from '../../common/js/N.js'
import { mapGetters } from 'vuex'
export default {
    name: 'dealCenterLeftTopSelect',
    data() {
        return {
            thisSocketStr: 'market.overview.all',
            selectStatus: false,
            titleData: [],
            nowTitleName: '',
            titleIndex: 0,
            //websocket来的数据
            allCoinData: [],
            allCoinDataCopy: [],

            //放到页面上的数据(非自选)
            coinData: [],

            //自选放到页面上的数据
            ownData: [],
            ownSymbol: [],


            searchWorld: '',//搜索关键词
            searchData: [], //搜索后的数据


            sortCoint: 0,
            sortPrice: 0,
            sortPre: 0,

            hideAvatar: true
        }
    },
    created() {
        // this.setUrlSymbol()

        const that = this;
        this.titleData = []
        window.onresize = function temp() {
            let widthChange = document.documentElement.clientWidth;
            if (widthChange <= 1500) {
                that.hideAvatar = false;
            } else {
                that.hideAvatar = true;
            }
        };
        //      console.log(this.titleData)
        //  获取币种
        api.getCoinList().then(res => {
            let list_bi = res.data.list
            for (var i = 0; i < list_bi.length; i++) {
                if (list_bi[i].exchange_coin_type_id == 1) {
                    this.titleData.push({ "name": list_bi[i].coin_name })
                }
            }
            //      	console.log(this.titleData)
        })



        this.thisSocketStr = `market.overview.all`
        window.thisSocket.on('sub', (data) => {
            this.socketData(data)
        })
        window.thisSocket.on('req', (data) => {
            this.socketData(data)
        })


        window.thisSocket.emit('req', this.thisSocketStr)
        window.thisSocket.emit('sub', this.thisSocketStr)

        this.nowTitleName = this.symbol.symbol.split('_')[1]

        //所有自选的交易对存放到这里

        this.ownSymbol = localStorage.getItem('allOwn')


    },
    methods: {
        socketData(data) {
            if (data.ch == this.thisSocketStr && data.code == 0) {

                this.allCoinData = data.data.data
                this.mergeData(this.titleData, 'main')
                this.mergeData(this.allCoinData)

                this.allCoinData.forEach((val, index) => {
                    //更新当前交易对信息
                    this.detailObjList.forEach((v, i) => {
                        if (v.Symbol == val.symbol) {
                            val.price = exchange(val.price, v.RightPointLow)
                        }
                    })

                    if (val.symbol == this.symbol.symbol) {
                        this.changeSymbol(val)
                    }
                })
            }
        },
        upDown() {
            this.selectStatus = !this.selectStatus
            this.changeTitle(0)
        },
        //改变当前url
        setUrlSymbol() {
            this.$router.replace({ name: 'exchange', params: { symbol: this.symbol.symbol.toLowerCase() } })
        },

        changeTitle(index) {
            this.titleIndex = index
            this.nowTitleName = this.titleData[index].name

            //重置排序
            this.sortPrice = 0
            this.sortPre = 0
            this.sortCoint = 0

            this.updateData()
        },
        ownTitle() {
            this.titleIndex = -1


            //重置排序
            this.sortPrice = 0
            this.sortPre = 0
            this.sortCoint = 0
            //将已自选的添加到页面上
            this.updateData()
        },
        ownChangeData() {
            this.ownData = []
            this.allCoinData.forEach((val, index) => {
                if (val.own == 1) {
                    this.ownData.push(val)
                }
            })
        },
        //将自选放入localStorage
        changeOwn(val) {

            var allOwn = localStorage.getItem('own')


            val.own = !val.own
            // this.$set(val, 'own', !val.own)
            if (val.own) {
                allOwn = allOwn + val.symbol + ','
            } else {
                allOwn = allOwn.split(val.symbol + ',').join('')
            }
            localStorage.setItem('own', allOwn)


            if (this.titleIndex == -1) {
                this.updateData()
            } else {
                var arr = this.coinData
                this.coinData = []
                this.coinData = arr
            }
        },
        //放入搜索数据
        searchChangeData() {
            this.searchData = []
            if (this.searchWorld) {
                if (this.titleIndex != -1) {
                    this.coinData.forEach((val, index) => {
                        if (val.symbol.split('_')[0].indexOf(this.searchWorld) > -1) {
                            this.searchData.push(val)
                        }
                    })
                } else {
                    this.ownData.forEach((val, index) => {
                        if (val.symbol.split('_')[0].indexOf(this.searchWorld) > -1) {
                            this.searchData.push(val)
                        }
                    })
                }
            }
        },

        //合并数据 根据name查找
        mergeData(data, type = "other") {

            var allOwn = localStorage.getItem('own')
            if (!this.coinList) return;
            data.forEach((val, index) => {
                this.coinList.forEach((v, i) => {
                    if (v.coin_name == val.name) {
                        val.coin_id = v.coin_id

                        if (type === 'other') {
                            val.coin_image = v.coin_image
                            val.exchange_coin_type_id = v.exchange_coin_type_id
                            val.coin_status = v.coin_status
                            //从localstorage添加自选信息
                            if (allOwn && allOwn.indexOf(val.symbol) != -1) {
                                val.own = true;
                            } else {
                                val.own = false;
                            }




                            if (val.pre != '0') {
                                if (val.up) {
                                    val.newPre = '+' + val.pre + '%'
                                } else {
                                    val.newPre = '-' + val.pre + '%'
                                }
                            } else {
                                val.newPre = val.pre
                            }
                        }
                    }
                })
            })

            //拷贝一份allCoinData,如果排序,为了取消排序位置相同
            this.allCoinDataCopy = [...this.allCoinData]

            this.updateData()
        },

        coinChangeData() {
            this.coinData = []
            this.allCoinData.forEach((val, index) => {
                if (val.symbol && val.symbol.split('_')[1].toLocaleLowerCase() == this.nowTitleName.toLocaleLowerCase()) {
                    this.coinData.push(val)
                }
            })
        },

        //更新数据的方法
        updateData(isSort = false) {


            if (!isSort) {
                //不进行操作
                this.allCoinData = [...this.allCoinDataCopy]
            }


            //如果没有选排序，那么this.sortData()不会进行排序
            this.allCoinData.sort(this.sortData())

            this.coinChangeData()
            this.ownChangeData()
            this.searchChangeData()
        },

        //变更交易对
        changeSymbol(val) {
            this.titleData.forEach((v, index) => {
                if (v.name == val.symbol.split('_')[1]) {
                    val.pri_id = v.coin_id
                }
            })
            // console.log(val)
            this.$store.commit('changeSymbol', val)
            this.setUrlSymbol()
        },

        //排序方法
        sortCoinFn() {
            this.sortCoint++
            this.sortPrice = 0
            this.sortPre = 0
            this.updateData()
        },
        sortPriceFn() {
            this.sortPrice++
            this.sortPre = 0
            this.sortCoint = 0
            this.updateData()
        },
        sortPreFn() {
            this.sortPre++
            this.sortPrice = 0
            this.sortCoint = 0
            this.updateData()
        },

        //点击下拉
        onSelect(val) {
            this.selectStatus = false
            localStorage.setItem('symbol', val.symbol)
            this.changeSymbol(val)
        },
        //排序具体
        sortData() {
            if (this.sortCoint > 0) {
                if (this.sortCoint % 2 == 1) {
                    return function (a, b) {
                        return a.symbol.localeCompare(b.symbol)
                    }
                } else {
                    return function (a, b) {
                        return b.symbol.localeCompare(a.symbol)
                    }
                }
            }
            if (this.sortPrice > 0) {
                if (this.sortPrice % 2 == 1) {
                    return function (a, b) {
                        return (a.price - 0) - (b.price - 0)
                    }
                } else {
                    return function (a, b) {
                        return (b.price - 0) - (a.price - 0)
                    }
                }
            }
            if (this.sortPre > 0) {
                if (this.sortPre % 2 == 1) {
                    return function (a, b) {
                        return ((a.up ? '+' : '-') + a.pre - 0) - ((b.up ? '+' : '-') + b.pre - 0)
                    }
                } else {
                    return function (a, b) {
                        return ((b.up ? '+' : '-') + b.pre - 0) - ((a.up ? '+' : '-') + a.pre - 0)
                    }
                }
            }
        },

        //深度图K线图切换
        changeKorD(val) {
            this.$store.commit('changeKorD', val)
        },
    },
    computed: {
        ...mapGetters([
            'socketAdr',
            'isKline',
            'symbol',
            'symbolAss',
            'symbolPri',
            'toCurrency',
            'detailObj',
            'detailObjList',
        ]),
        coinList() {
            return this.$store.getters.coinList.list
        },
    },
    watch: {
        searchWorld() {
            if (this.searchWorld != '') {
                this.searchWorld = this.searchWorld.toUpperCase()
                this.updateData()
            } else {
                this.searchData = []
            }
        }

    },
    mounted() {

    }
}
</script>
<style lang="scss">
.marketHouseSelect {
  .coin_unit {
    height: 2rem;

    span {
      display: inline-block;
      color: #fff;
      padding-left: 0.4rem;
      font-size: 0.6rem;
      cursor: pointer;

      .kf_icon {
        display: inline-block;
        margin-right: 0.3rem;
        cursor: pointer;
        margin-left: 0.2rem;
        position: relative;
        width: 0.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        color: #fff;

        .dropup {
          display: block;
          width: 0;
          height: 0;
          border-width: 0 0.25rem 0.3rem;
          border-style: solid;
          border-color: transparent transparent #4e5b85; /*透明 透明  黄*/
          position: absolute;
          top: 1px;
          left: 0rem;
        }
        .dropdown {
          display: block;
          width: 0;
          height: 0;
          border-width: 0.3rem 0.25rem 0;
          border-style: solid;
          border-color: #4e5b85 transparent transparent; /*黄 透明 透明 */
          position: absolute;
          top: 0.45rem;
          left: 0rem;
        }
        .yellow_drop_up {
          border-color: transparent transparent #fc0; /*透明 透明  黄*/
        }
        .yellow_drop_down {
          border-color: #fc0 transparent transparent; /*透明 透明  黄*/
        }
      }
    }

    .kf_span_one {
      width: 5.75rem;
    }

    .kf_span_two {
      width: 5rem;
    }

    .kf_span_three {
      width: 4.15rem;
    }
  }
}
</style>


