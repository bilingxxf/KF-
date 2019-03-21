<template>
    <div class="moneybagbody">
        <div class="header">
            <p class="moneybag">冻结列表</p>
        </div>
        <div class="container">
            <table class="table-title">
                <tr class="tr-first">
                    <th class="col1">创建时间</th>
                    <th class="col2">币种</th>
                    <th class="col3">资产冻结数量</th>
                    <th class="col4">资产冻结状态</th>
                    <th class="opration col5th">资产冻结类型</th>
                </tr>
            </table>
            <div class="table-container">
                <table v-if="list.length > 0">
                    <tr v-for="(item,index) in list" :key="index">
                        <td class="currency col1">{{item.created_at | timeToDate}}</td>
                        <td class="availableBalance col2">{{item.coin_name}}</td>
                        <td class="col3">{{item.finance_freeze_amount_str}}</td>
                        <td class="col4">{{item.finance_freeze_status | freeze_status}}</td>
                        <td class="opration col5">{{item.finance_freeze_type | freeze_type}}</td>
                    </tr>
                </table>
                <div class="moneybagNomassage" v-else>
                    <div>
                        <span class="icon-no_info"></span>
                    </div>
                    <p>{{ $t(`message.NoData`) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../../api.js'
export default {
    name: "Currency",
    data() {
        return {
            list: [],
        }
    },
    methods: {
        //货币汇率接口
        refresh() {
            this.spinShow = true;
            api.unfreeList().then(res => {
                if (res.status_code == 200) {
                    // this.coinRate = res.data.quotes;
                    // this.moneybaglist();
                    this.list = res.data.list
                }
            })
        },
    },
    filters:{
        freeze_status: function(val) {
            if(val == 1) {
                return '冻结'
            } else if(val == 2) {
                return '解冻'
            } else if(val == 3) {
                return '审核'
            }
        },
        freeze_type: function(val) {
            if(val == 1) {
                return 'OTC交易冻结'
            } else if(val == 2) {
                return 'C2C交易冻结'
            }
        }
    },
    mounted() {
        this.refresh()
    },
};
</script>
