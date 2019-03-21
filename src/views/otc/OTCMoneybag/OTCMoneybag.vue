<template>
  <div class="otcmoneybag">
    <div class="userinfo" :model="infoList">
      <div class="userinfo-one">
        <p class="p1">{{infoList.name}}</p>
        <p class="p2" v-if="infoList.email"><span>绑定邮箱：</span>{{infoList.email}}</p>
        <p class="p2" v-else><span>绑定邮箱：</span>未绑定邮箱</p>
        <p class="p2" v-if="infoList.phone"><span>绑定手机：</span>
         {{infoList.phone}}
        </p>
        <p class="p2" v-else><span>绑定手机：</span>
          未绑定手机号
        </p>
        <p class="p2"><span>上次登录：</span>{{infoList.last_login_time}}</p>
      </div>
      <div class="userinfo-two">
        <p class="p1">总资产折合</p>
        <p class="p2"><span>≈{{infoList.finance_usdt}}</span> USDT</p>
      </div>
      <div class="userinfo-three">
        <p class="p1">资产总结</p>
        <div class="three">
          <div class="three-left">
            <p class="p2">≈{{infoList.finance_rmb}}</p>
            <p class="p2">≈{{infoList.finance_us}}</p>
          </div>
          <div class="three-right">
            <p class="p2">人民币</p>
            <p class="p2">美元</p>
          </div>
        </div>
      </div>
    </div>
    <OTC-currency ref="currency" v-on:OTCCurrency="showNum"></OTC-currency>
  </div>
</template>

<script>
  import OTCCurrency from './OTCCurrency.vue'
  import api from './../../../api'
  export default {
    props: [],
    data() {
      return {
        infoList:{}
      }
    },
    components: {
      OTCCurrency
    },
    computed:{},
    methods: {
      showNum(data){
        this.infoList.finance_rmb = data.rmb;
        this.infoList.finance_us = data.usd;
        this.infoList.finance_usdt = data.usdtNum;
      },
      userInfo(){
        api.otcMoneyBag().then(res=>{
            if(res.status_code == 200){
              this.infoList = res.data;
              this.$refs.currency.otcFinanceList(1);
            }
        }).catch(error=>{
          this.$Message.error('获取信息失败!');
        })
      }
    },
    mounted(){
      this.$store.commit('changeOTCOrderShow', 1);
      this.userInfo();
    },
    beforeDestroy(){
      this.$store.commit('changeOTCOrderShow', 0);
    }
  };
</script>

<style scoped>

</style>
