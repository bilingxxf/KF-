<template>
    <div class="moneyBag">
        <div class="userinfo">
            <div class="userinfo-one">
                <p class="p1">{{data.name}}</p>
                <p class="p2">
                    <span class="basic_info">绑定邮箱：</span>{{email}}</p>
                <p class="p2">
                    <span class="basic_info">绑定手机：</span>{{phone}}</p>
                <p class="p2">
                    <span class="basic_info">上次登录：</span>{{data.last_login_time}}</p>
            </div>
            <div class="userinfo-two">
                <p class="p1">总资产折合</p>
                <p class="p2">
                    <span>≈ {{USDT | numFilter}}</span> USDT</p>
            </div>
            <div class="userinfo-three">
                <p class="p1">资产总结</p>
                <div class="three">
                    <div class="three-left">
                        <p class="p2">≈ {{RMB | numFilter}}</p>
                        <p class="p2">≈ {{USD | numFilter}}</p>
                    </div>
                    <div class="three-right">
                        <p class="p2"> 人民币</p>
                        <p class="p2">美元</p>
                    </div>
                </div>

            </div>
            <div v-show="isShowCur" style="color: #000;margin-left: 0.75rem;cursor: pointer;width: 4.95rem;float: left;text-align: center;height: 1rem;line-height: 0.95rem;background: #f3ab26;border-radius: 0.25rem;" @click="isShowCur=!isShowCur">切换冻结列表</div>
            <div v-show="!isShowCur" style="color: #000;margin-left: 0.75rem;cursor: pointer;width: 4.95rem;float: left;text-align: center;height: 1rem;line-height: 0.95rem;background: #f3ab26;border-radius: 0.25rem;" @click="isShowCur=!isShowCur">返回钱包列表</div>
        </div>
        <currency ref="currency" @showCityName="acceptRate" v-show="isShowCur"></currency>
        <Unfree v-show="!isShowCur"></Unfree>
    </div>
</template>

<script>
import Currency from './Currency.vue'
import Unfree from './Unfree.vue'
import api from '../../api.js'
export default {
    name: 'Moneybag',
    components: {
        Currency,
        Unfree
    },
    data() {
        return {
            USDT: 0,
            RMB: 0,
            USD: 0,
            totalMoney: [],
            data: {
                flag: false
            },
            isShowCur: true,
        }
    },
    filters: {
        numFilter(value) {
            let realVal = Number(value).toFixed(2);
            return Number(realVal)
        }
    },
    computed: {
        email: function () {
            if (this.data.email != '') {
                return this.data.email
            } else {
                return '未绑定'
            }
        },
        phone: function () {
            if (this.data.phone != '') {
                return this.data.phone
            } else {
                return '未绑定'
            }
        }
    },
    methods: {
        moneybagInfo() {
            api.moneybagInfo().then(res => {
                if (res.status_code == 200) {
                    this.data = res.data;
                    this.$refs.currency.refresh();
                }
            });
        },
        acceptRate(msg) {
            this.totalMoney = msg;
            this.USDT = this.totalMoney.USDT;
            this.RMB = this.totalMoney.RMB;
            this.USD = this.totalMoney.USD
        }
    },
    mounted() {
        this.moneybagInfo()
    }
};
</script>

