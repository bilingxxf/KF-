<template>
    <div class="dealcentermoneybag">
        <div class="userinfo">
            <div class="userinfo-one">
                <p class="p1">{{userinfo.name}}</p>
                <p class="p2">
                    <span>{{ $t(`message.MoneyBag.YourEmail`) }}：</span>{{myemail}}</p>
                <p class="p2">
                    <span>{{ $t(`message.MoneyBag.YourPhone`) }}：</span>{{myphone}}</p>
                <p class="p2">
                    <span>{{ $t(`message.MoneyBag.LastLogin`) }}：</span>{{userinfo.last_login_time}}</p>
            </div>
            <div class="userinfo-two">
                <p class="p1">{{ $t(`message.MoneyBag.EstimaValue`) }}</p>
                <p class="p2">
                    <span>≈{{ USDT |numFilter}}</span> USDT</p>
            </div>
            <div class="userinfo-three">
                <p class="p1">{{ $t(`message.MoneyBag.AllAssets`) }}</p>
                <div class="three">
                    <div class="three-left">
                        <p class="p2">≈{{ RMB |numFilter}}</p>
                        <p class="p2">≈{{USD |numFilter}}</p>
                    </div>
                    <div class="three-right">
                        <p class="p2"> {{ $t(`message.MoneyBag.RMB`) }}</p>
                        <p class="p2"> {{ $t(`message.MoneyBag.Dollar`) }}</p>
                    </div>
                </div>

            </div>
        </div>
        <dealCenter-currency @showCityName="acceptRate" v-if="show"></dealCenter-currency>
    </div>
</template>
<script>
import DealCenterCurrency from './DealCenterCurrency.vue'
import api from '@/api'
export default {
    data() {
        return {
            //接受用户信息的数组
            userinfo: [],
            //三个默认值
            USDT: 0,
            RMB: 0,
            USD: 0,
            show: false
        }
    },
    //过滤 保留两为小数
    filters: {
        numFilter(value) {
            if (value) {
                let realVal = Number(value).toFixed(2);
                return Number(realVal)
            } else {
                return 0
            }

        }
    },
    //根据后台返回相应的值，显示对应的值
    computed: {
        myphone() {
            if (this.userinfo.phone == '') return '未绑定';
            else return this.userinfo.phone;
        },
        myemail() {
            if (this.userinfo.email == '') return '未绑定';
            else return this.userinfo.email;
        }
    },
    methods: {
        //获取用户信息
        getUser() {
            api.getUserInfrom().then(res => {
                if (res.status_code == 200) {
                    this.show = true
                    this.userinfo = res.data;
                    this.phone = res.data.phone;
                    this.email = res.data.email;
                }
            }).catch(err => {
            })
        },
        //接受子组件传过来的三个数据，总USDT，RMB, USD
        acceptRate(msg) {
            this.USDT = msg.USDT;
            this.RMB = msg.RMB;
            this.USD = msg.USD;
        }
    },
    components: {
        DealCenterCurrency
    },
    mounted() {
        this.$store.commit('changeDealShow', true);
    },
    beforeDestroy() {
        this.$store.commit('changeDealShow', false);
    },
    created() {
        this.getUser()
    }
};
</script>
