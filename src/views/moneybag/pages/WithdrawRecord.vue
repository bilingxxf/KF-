<template>
  <div class="record_box">
    <div class="record">
      <div class="record-header">
        <router-link :to="{path:'/withdrawCash', query:{coin_id:coin_id}}">{{ $t(`message.MoneyBag.Withdraw`) }}</router-link>
        <span>>></span>
        <a>{{ $t(`message.MoneyBag.WithdrawHistory`) }}</a>
      </div>
      <div class="box">
        <div class="box-header">
          <p class="moneybag">{{ $t(`message.MoneyBag.WithdrawHistory`) }}</p>
        </div>
        <div class="container">
          <table class="table-title">
            <tr class="tr-first">
              <th class="withdrawRecordco1">{{ $t(`message.DealCenter.Time`) }}</th>
              <th class="currency withdrawRecordco2">{{ $t(`message.Coin`) }}</th>
              <th class="withdrawRecordco3">{{ $t(`message.DealCenter.Type`) }}</th>
              <th class="withdrawRecordco4">{{ $t(`message.OTCBeal.Volume`) }}</th>
              <th class="withdrawRecordco5">{{ $t(`message.statusS`) }}</th>
            </tr>
          </table>
          <div class="table-container">
            <table>
              <tr v-for="item of list" :key="item.finance_history_id">
                <td class="withdrawRecordco1">{{item.created_at}}</td>
                <td class="currency withdrawRecordco2"><span><img :src="item.coin_image" alt=""></span> {{item.coin_name}}</td>
                <td class="withdrawRecordco3">{{ $t(`message.MoneyBag.Withdraw`) }}</td>
                <td class="withdrawRecordco4">{{item.finance_withdraw_amount}}</td>
                <td class="withdrawRecordco5">{{item.finance_withdraw_status| state}}</td>
              </tr>
            </table>
            <div class="moneybagNomassage" v-show="nomassage">
              <div><span class="icon-no_info"></span></div>
              <p>{{ $t(`message.NoMoreRecords`) }}</p>
            </div>
          </div>
          <div class="pageposition">
            <Page :total="total" class="pageOrder" @on-change="handleChange" :page-size="pageSize" v-if="pageshow"></Page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../api.js'
  export default {
    name: "WithdrawRecord",
    components: {
    },
    data(){
      return{
        total: 0,
        pageSize: 12,
        rechargeshow: false,
        transfershow: false,
        withdrawshow: false,
        list: [],
        pageshow: true,
        nomassage: false,
        coin_id: ''
      }
    },
    filters: {
      type: function (value) {
        if (value == 11001){
          return '数字币充值'
        }else if (value == 11002){
          return 'otc转入'
        }else if (value == 11003){
          return 'exchang转入'
        }else if (value == 11004){
          return '数字币提币拒绝'
        }else if (value == 11005){
          return '数字币提币撤回'
        }else if (value == 11006){
          return 'exchange交易手续费返佣'
        }else if (value == 11007){
          return '推广用户返佣'
        }else if (value == 21001){
          return '数字币提币'
        }else if (value == 21002){
          return '转出到OTC钱包'
        }else if (value == 21003){
          return 'exchang转出'
        }else{
          return '数字币充值'
        }
      },
      state: function (value) {
        if (value == 1){
          return '审核中'
        }else if (value == 2){
          return '转账中'
        }else if (value == 3){
          return '转账成功'
        }else if (value == 4){
          return '已撤销'
        }else if (value == 5){
          return '已拒绝'
        }
      }
    },
    methods:{
      check(value) {
        if(value == '充值'){
          this.rechargeshow = true
        }else if(value == '提币'){
          this.withdrawshow = true
        }else if(value == '划转'){
          this.transfershow = true
        }
      },
      checkclose(value) {
        if(value == '充值'){
          this.rechargeshow = false
        }else if(value == '提币'){
          this.withdrawshow = false
        }else if(value == '划转'){
          this.transfershow = false
        }
      },
      startChange(daterange){
        this.starttime = Date.parse( new Date(daterange));
      },
      endChange(daterange){
        this.endtime = Date.parse( new Date(daterange));
      },
      handleChange(page){
        this.recordList(page)
      },
      recordList(page){
        let params = {
          coin_id: this.$route.query.coin_id,
          limit: this.pageSize,
          page: page
        }
        api.withdrawRecord(params).then(res=>{
          if(res.status_code == 200){
            this.list = res.data.list
            this.total = res.data.page.count
            if(this.list == ''){
              this.nomassage = true
              this.pageshow = false
            }
          }
        }).catch(error=>{console.log(error)});
      }
    },
    mounted(){
      this.recordList(1)
      this.coin_id = this.$route.query.coin_id
    }
  };
</script>
