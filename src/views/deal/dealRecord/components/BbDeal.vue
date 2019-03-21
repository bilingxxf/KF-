<template>
  <div class="selldanz selldanz-new">
    <div class="mydeal">
      <div class="table-title">
        <ul class="tr-first"><!-- 卖 -->
          <li class="order-time">下单时间</li>
          <li class="col2">{{ $t(`message.OTCOrder.Type`) }}</li>
          <li class="col3">{{ $t(`message.OTCOrder.Pairs`) }}</li>
          <!-- <li class="col4">交易均价</li> -->
          <!-- 新增委托价 -->
          <li class="col4">委托价</li>
          <li class="col">委托量</li>
          <li class="col4">交易均价</li>
          <li class="col5">{{$t(`message.TradParticular.volumes`)}}</li>
          <!-- <li class="col">{{$t(`message.TradParticular.RemainRecords`)}}</li> -->
          <li class="col8">{{ $t(`message.OTCOrder.Status`) }}</li>
          <li class="opration">{{$t(`message.MoneyBag.Action`)}}</li>
        </ul>
      </div>
      <div class="table-container">
        <div>
            <ul v-for="(item,index) in allSellData" :key="index">
              <li class="order-time">{{item.created_at}}</li>
              <li class="col2" v-if="item.exchange_type==1">{{ $t(`message.DealCenter.LimitOrder`)}}</li>
              <li class="col2" v-if="item.exchange_type==2">{{ $t(`message.DealCenter.MarketOrder`)}}</li>
              <li class="col3">{{item.symbol | upperCase}}</li>
              <!-- <li class="col4" >{{item.ave_price_str}} {{item.src_coin_name | upperCase}}</li> -->
               <!-- 新增委托价 -->
              <li class="col4" v-if="item.exchange_type==1">{{item.price_str}}</li>
              <li class="col4" v-else>市价</li>

              <li class="col">{{item.list_amount}}</li>
              <li class="col5">{{item.exchange_status==1 ? '--': item.ave_price_str | becomeZero}}</li>
              <li class="col4" >{{item.solved_amount_str | becomeZero}}</li>
              
              <li class="col8" v-if="item.exchange_status==1">{{ $t('message.OrderRecord.Proceeding')}}</li>
              <li class="col8" v-else-if="item.exchange_status==3">{{ $t('message.CancelEd') }}</li>
              <li class="col8" v-else-if="item.exchange_status==4">{{ $t('message.Finished') }}</li>
              <li class="opration">
                <a href="javascript:;" @click="repeal(item.exchange_sell_id)" class="twoA" v-if="item.exchange_status=='1'">
                  {{ $t(`message.OTCOrder.Withdraw`) }}
                </a>
                <a href="javascript:;" @click="viewDetails(item.exchange_sell_id)" v-if="item.solved_amount_str && item.solved_amount_str!=0 && item.solved_amount_str!=''">
                 		 查看
                </a>
              </li>
            </ul>
        </div>
      </div>
      <repeal v-show="repealshow" @close="repealclose" :buyRepeal="buySellTitle" :whichIdDel="deleteSellId"></repeal>
      <TradParticulars v-show="tradParticuShow" @closeTwo="tradParticuClose" :detailssBuySell="buySellTitle" :whichIdDet="selldetailsId"></TradParticulars>
    </div>
    <div class="footer sternWei" v-if="allSellData.length>0">
      <Page :total="allSellPageData.count" class="pageOrder" @on-change="handleChanges" :page-size="pageSizes" :current="currentSell"></Page>
    </div>
    <div class="feiji" v-if="allSellData.length==0 &&allSellPageData.current_page=='1'">
      <div>
        <span class="icon-no_info feijiIcon"></span>
        <p  class="feijiSpan">{{ $t(`message.NoData`) }}~~~</p>
      </div>
    </div>
  </div> 
</template>
<script>
import Repeal from './Repeal.vue'
import TradParticulars from './TradParticulars'
import api from '../../../../api.js'
export default{
    name: 'BbDeal',
    components:{
        Repeal,
        TradParticulars
    },
    props:{
      filterSellData:{
        type:Object,
        default:{}
      },
      sellStartRender:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      sellStartRender:function(val){
        if(val== true){
          this.getSellHistoryData(1);
        }
      },
      'filterSellData.type':function(val){
        this.needSellScreen = true;
      },
      'filterSellData.symbol':function(val){
        this.needSellScreen = true;
      },
      'filterSellData.status':function(val){
        this.needSellScreen = true;
      },
      needSellScreen:function(val){
        
        if(val == true){
          //写过滤条件
          this.currentSell = 1;
          let symbol = this.filterSellData.symbol;
          let status = this.filterSellData.status;
          let  type  = this.filterSellData.type;
          this.getSellHistoryData(this.currentSell,symbol,status,type);
          // this.$Message.info(this.$t('message.DealRecord.SelectedSucceed'));
        }
        this.needSellScreen = false;
      }
    },
    mounted(){
      // this.getSellHistoryData(1);
    },
    data(){
        return {
            //看是否需要进行筛选
            needSellScreen:false,
            //买卖的差别
            buySellTitle:"sell",
            //每一页数据的数量
            pageSizes:12,
            repealshow: false,
            //详情数据弹窗的控制
            tradParticuShow:false,
            //获得到的卖出的列表数据
            allSellData:[],
            //获得到的数据的页面信息
            allSellPageData:{},
            //删除sell的数据的id
            deleteSellId:"",
            //当前的页码
            currentSell:1,
            //查看详情的id
            selldetailsId:""
        }
    },
    methods:{
      //获取交易记录卖出的数据
      getSellHistoryData(pag,sybol,status,type){
        let params = {
          symbol_id:"",
          page:pag,
          exchange_status:"",
          exchange_type:""
        }
        params.symbol_id = sybol?sybol:"";
        params.exchange_status = status?status:"";
        params.exchange_type = type?type:"";
        api.dealCenterRecordGetSellList(params).then(res=>{
          if(res.status_code == 200){
            this.allSellData = res.data.list;
            this.allSellPageData = res.data.page;
            if(pag == 1 && params.symbol_id =="" && params.exchange_status=="" && params.exchange_type==""){
              if(this.allSellData.length ==0){
                this.$emit('whetherEmpty',"kong")
              }else{
                this.$emit('whetherEmpty',"bukong");
              }
            }
          }
        }).catch(error=>{
        })
      },
      //换页
      handleChanges(page){
        this.currentSell = page;
        let symbol = this.filterSellData.symbol;
        let status = this.filterSellData.status;
        let  type  = this.filterSellData.type;
        this.getSellHistoryData(this.currentSell,symbol,status,type);
      },
      //撤销卖出订单
      repeal(data){
        this.deleteSellId = data;
        this.repealshow = true;
      },
      //撤销回调
      repealclose(data) {
        if(data == "refreshSell"){
          this.$Message.success(this.$t('message.DealCenter.WithdSucceed'));
          
          // if( this.allSellPageData.count>this.pageSizes ){
          //   if(this.currentSell == Math.ceil(this.allSellPageData.count/this.pageSizes)){
          //     if(this.allSellPageData.length == 1){
          //       this.currentSell = this.currentSell-1;
          //     }
          //   }

            let symbol = this.filterSellData.symbol;
            let status = this.filterSellData.status;
            let  type  = this.filterSellData.type;
            this.getSellHistoryData(this.currentSell,symbol,status,type);
          // }else{
          //   if( this.allSellPageData.count == 1){
          //     console.log(this.$t('message.DealRecord.AllRecordDeleted'));
          //   }
          //   this.currentSell = 1;
          //   let symbol = this.filterSellData.symbol;
          //   let status = this.filterSellData.status;
          //   let  type  = this.filterSellData.type;
          //   this.getSellHistoryData(this.currentSell,symbol,status,type);
          // }
        }
        this.deleteSellId = "";
        this.repealshow = false;

      },
      //查看详情
      viewDetails(datas) {
        this.selldetailsId = datas;
        this.tradParticuShow = true;
      },
      //查看详情回调
      tradParticuClose(){
        this.tradParticuShow = false;
      }
    },
    filters:{
      upperCase:function(val){
        if( val ){
          return val.toUpperCase();
        }
      },
      exchangeSta:function(val){

        switch(val){
          case 1:    
            return "进行中";
            break;
          case 3:
            return "已取消";
            break;
          case 4:
            return "已成功";
            break;
        }
      },
      reductionAccuracy:function(val){
          let m = Math.pow(10,16);
          return parseInt(val*m,10)/m;    
      },
      becomeZero:function(val){
        if(!val){
          return "0";
        }else if(val==""){
          return "0";
        }else{
          return val;
        }
      }
    }
};
</script>
<style scoped>
  
</style>

