<template>
    <div class="record_box">
        <div class="record-wrap">
            <div class="record" style="padding-top:0rem;padding-bottom:0;width:100%;">
            <div class="record-header">
                <a href="javascript:;">{{ coin_name }}充值进度</a>
            </div>
            <div style="margin-top:0rem;">
                <div v-show="false" class="box-header">
                    <ul class="box-list">
                        <li  class="tab-li-active">充值进度</li>
                    </ul>
                </div>
                <!-- 充值记录 -->
                <div class="container">
                <table class="table-title">
                    <tr class="tr-first" >
                    <th>充值数量</th>
                    <th>确认块数/总块数</th>
                    <th>交易hash</th>
                    </tr>
                </table>
                <div class="table-container" >
                    <table v-if="ChargeList.length>0">
                    <tr v-for="(val, index) in ChargeList" :key="index">
                        <td>{{ val.amount }}</td>
                        <td>{{ val.block_count }}/{{ val.all_block_count }}</td>
                        <td>{{ val.transaction_hash }}</td>
                    </tr>
                    </table>
                    <div class="moneybagNomassage" v-else>
                    <div>
                        <span v-show="false" class="icon-no_info"></span>
                    </div>
                    <p>暂无记录</p>
                    </div>
                </div>
                <!-- <div class="pageposition" style="margin-top: 0.5rem;">
                    <Page :total="total" class="pageOrder" @on-change="handleChange" :page-size="pageSize" v-if="pageshow"></Page>
                </div> -->
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from "../../../api.js";
export default {
    name: "Record",
    data() {
        return {
        total: 0, // 提币
        WaletTotal: 0, // 钱包
        typeClass: 1,
        pageSize: 12,
        ChargeList: [], // 充值记录
        CurrenList: [], // 提币记录
        WaletList: [], // 钱包记录
        coin_name: "", // 充值币名
        location: "", // 钱包充值地址
        coin_id: '',
        timer: null
        };
    },
    props: ['coinId'],
    watch: {
        // coinId(val){
        //     this.coin_id = val;
        //     this.WaletRecordList(1);
        //     this.timer = setInterval(() => {
        //         this.rechargeInfo(); // 充值
        //     }, 3000);
        // }
    },
    filters: {
        type: function(value) {
            if (value == 11000) {
                return "跨账户转入";
            } else if (value == 11001) {
                return "数字币充值";
            } else if (value == 11002) {
                return "从OTC钱包转入";
            } else if (value == 11003) {
                return "从币币钱包转入";
            } else if (value == 11004) {
                return "数字币提币拒绝";
            } else if (value == 11005) {
                return "数字币提币撤回";
            } else if (value == 11006) {
                return "exchange交易手续费返佣";
            } else if (value == 11007) {
                return "推广用户返佣";
            } else if (value == 11008) {
                return "返佣结算转入";
            } else if (value == 21000) {
                return "跨账户转出";
            } else if (value == 21001) {
                return "数字币提币";
            } else if (value == 21002) {
                return "转出到OTC钱包";
            } else if (value == 21003) {
                return "转出到币币钱包";
            } else if (value == 21003) {
                return "转出到币币钱包";
            } else if (value == 11009) {
                return "交易返佣转入";
            } else {
                return "数字币充值";
            }
        },
        state: function(value) {
            // 钱包
            if (value == 1) {
                return "待确定";
            } else if (value == 2) {
                return "已完成";
            }
        },
        stateCurrency: function(value) {
            // 提币
            if (value == 1) {
                return "审核中";
            } else if (value == 2) {
                return "转账中";
            } else if (value == 3) {
                return "转账成功";
            } else if (value == 4) {
                return "已撤销";
            } else if (value == 5) {
                return "已拒绝";
            }
        }
    },
    methods: {
        //  充值记录
        rechargeInfo() {
            let params = {
                coin_id: this.coin_id
            };
            api
                .rechargeInfo(params)
                .then(res => {
                if (res.status_code == 200) {
                    this.coin_name = res.data.coin_name;
                    this.location = res.data.wallet_addr;
                    this.rechargeNotify();
                }
                })
                .catch(error => {
                console.log(error);
                });
        },
        rechargeNotify() {
            let params = {
                coin_name: this.coin_name,
                address: this.location
            };
            api.rechargeNotify(params).then(res => {
                if (res.status_code == 200) {
                if (res.data.length != 0) {
                    this.isshow = true;
                } else {
                    this.isshow = false;
                }
                this.ChargeList = res.data;
                }
            });
        },
        //  提币记录
        check(value) {
            if (value == "充值") {
                this.rechargeshow = true;
            } else if (value == "提币") {
                this.withdrawshow = true;
            } else if (value == "划转") {
                this.transfershow = true;
            }
        },
        CurrencyRecordList(page) {
            let params = {
                coin_id: this.coin_id,
                limit: this.pageSize,
                page: page
            };
            api
                .withdrawRecord(params)
                .then(res => {
                if (res.status_code == 200) {
                    this.CurrenList = res.data.list;
                    this.total = res.data.page.count;
                }
                })
                .catch(error => {
                console.log(error);
                });
        },
        CurrencyHandleChange(page) {
            // 提币点击分页
            this.CurrencyRecordList(page);
        },
        //  钱包记录
        WaletRecordList(page) {
            let params = {
                coin_id: this.coin_id,
                limit: this.pageSize,
                page: page
            };
            api
                .record(params)
                .then(res => {
                if (res.status_code == 200) {
                    this.WaletList = res.data.list;
                    this.WaletTotal = res.data.page.count;
                }
                })
                .catch(error => {
                console.log(error);
                });
        },
        WaletHandleChange(page) {
            // 钱包点击分页
            this.WaletRecordList(page);
        }
    },
    created() {
        this.WaletRecordList(1);
        this.timer = setInterval(() => {
            this.rechargeInfo(); // 充值
        }, 3000);
        this.CurrencyRecordList(1); // 提币
    },
    mounted() {
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
    destroyed() {
        clearInterval(this.timer);
        this.timer = null;
    }
};
</script>
<style scoped>
/* 新添加  */
.record_box .record-header {
    background: #1d2f6b;
    padding: 0 1rem;
    margin-bottom: 0rem;
}

.record_box .record-header a.go-back {
    float: right;
    color: #fff;
    font-size: 0.9rem;
}

.record_box {
    width: 100%;
    background: url(../../../../static/img/homeBg.png) no-repeat top center;
    background-size: 100% 100%;
}

.record {
    background: #4e5e90;
}

.record-wrap {
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 2.4rem 0 2.25rem;
    padding: 0;
}

.record_box .box {
    width: 100%;
    background: #4b5e94;
    box-shadow: 0 1px 0.6rem 0 #2e407b;
    border-radius: 0.1rem;
    margin: 1rem 0 0 0;
}

.record_box .record-header a,
.record-header span {
    color: #f5b821;
    font-size: 1rem;
}

.record_box .container {
    padding: 0 1.25rem;
    width: 100%;
    height: auto;
    min-height: 0;
    background: #4B5E94;
}

.record_box .box-list {
    color: #fff;
    line-height: 2.4rem;
}

.record_box .box-list li {
    float: left;
    padding: 0 1rem;
    cursor: pointer;
    font-size: 0.8rem;
}

.record_box .box-list li:hover {
    color: #f5b821;
}

.record_box .box-list .tab-li-active {
    color: #f5b821;
    cursor: default !important;
}

.pageposition {
    margin: 1rem 0 0 0;
}

.record_box .container .tr-new-lw-01{
    width: 8.5rem !important;
    padding-left: 0;
    text-align: center;
}

.record_box .container .tr-new-lw-02{
    width: 8.5rem !important;
    padding-left: 0;
    text-align: center;
}

.record_box .container .tr-new-lw-03{
    /* width: 30.5rem !important; */
    width: 100%;
    padding-left: 0;
    text-align: center;
    padding-right: 0;
}

.record_box .moneybagNomassage {
    padding-top:2rem;
    padding-bottom: 1.5rem;
}

.container .table-container {
    padding-bottom: 1.5rem;
}

.container .table-container tr {
    width: 100%;
}

.record_box .table-title .tr-first tr {
    width: 100%;
}

.container .table-container tr td {
    padding: 0;
    text-align: left;
    overflow: hidden;
    height: 2.5rem;
    box-sizing: border-box;
}

.container .table-container tr td:nth-of-type(1){
    width: 4.75rem;
    text-align: center;
}

.container .table-container tr td:nth-of-type(2) {
    width: 9.5rem;
    text-align: center;
}

.container .table-container tr td:nth-of-type(3) {
    width: 33.25rem;
    text-align: left;
    padding-right: 0.5rem;
    padding-left: 1.5rem;
}

.record_box .table-title .tr-first th {
    padding-left: 0;
    text-align: left;
    overflow: hidden;
    box-sizing: border-box;
}

.record_box .table-title .tr-first th:nth-of-type(1) {
    width: 10%!important;
    text-align: center;
}

.record_box .table-title .tr-first th:nth-of-type(2) {
    padding-right: 1.15rem;
    width: 20%!important;
    text-align: right;
    padding: none;
}

.record_box .table-title .tr-first th:nth-of-type(3) {
    padding-left: 11rem;
    width: 70%;
    text-align: left;
}
</style>
