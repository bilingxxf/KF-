<template>
  <div class="TradParticulars">
    <div class="boxx">
      <span class="icon-wrong close" @click="closet()"></span>
      <p class="titleTopa">交易单明细</p>
      <div class="transactionFormDetails">
        <div class="formDetailsTop">
          <ul class="formDetailsTopTitleUl">
            <li class="liFirst">日期</li>
            <li class="liSecond">交易价</li>
            <li class="liThird no-width">成交量</li>
           <!--  <li class="liFourth greenTip">{{ $t(`message.DealCenter.Fees`) }}</li> -->
            <!-- <li class="liLast">{{ $t(`message.TradParticular.ExchangeVolumeS`) }}</li> -->
          </ul>
        </div> 
        <div class="formDetailsContent">
          <ul v-for="(item,index) in detailsList" :key="index" class="formDetailsContentUl">
            <li class="liFirst">{{item.created_at}}</li>
            <li class="liSecond">{{item.price_str}} {{item.src_coin_name | upperCase}}</li>
            <li class="liThird no-width">{{item.amount_str}} {{exchange_type == 1 ? item.dst_coin_name : item.src_coin_name | upperCase}}</li>
          </ul>
        </div>
        <div v-if="loading" style='text-align:center;width:100%;padding-top:0.75rem;'>
            加载中....
        </div>
        <div class="formDetailsContent" v-if="detailsList.length == 0 && !loading" >
            <ul class="formDetailsContentUl">
                <li class="nodataLi" style="color:#000;font-weight:700">{{ $t(`message.NoData`) }}</li>
            </ul>
        </div> 
         <div class="footer sternWei line-height-6">
          <Page v-if="detailsList.length" :total="total" class="pageOrder" @on-change="handleChanges" :page-size="10" :current="pageSizes"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../../api.js'
  export default{
    name: 'TradParticulars',
    props:{
     detailssBuySell:{
        type:String,
        default:"buy"
     },
     whichIdDet:{
        type:[Number,String]
     },
     exchange_type: {
         type:[Number,String],
         default: 1
     }
    },
    watch:{
        detailssBuySell:function(val){
            this.detailsPopover = true;
        },
        whichIdDet:function(val){
            this.detailsPopover = true;
        },
        detailsPopover(val){
            if(val== true){
                this.pageSizes = 1;
                this.detailsList = [];
                this.viewDetails();
            }
            this.detailsPopover = false; 
        }

    },
    data () {
      return {
        detailsPopover:false,
        detailsList:[],
        loading: true,
        pageSizes: 1,
        total: 0
      }
    },
    methods: {
        //调用详情的接口，买入的还是卖出的
        viewDetails(){

            let params = {
                id : this.whichIdDet,
                page: this.pageSizes,
                pagesize: 10
            }
            this.detailsList = [];
            if(this.detailssBuySell=="buy"){
                //调用买入详情的接口
                api.dealCenterRecordGetBuyDetailsList(params).then(res=>{
                    this.loading = false
                    if(res.status_code == 200){
                        let datas = res.data.list;
                        this.detailsList = datas.filter(this.statusGuoLv);  
                        this.total = res.data.page.count
                    }
                }).catch(error=>{
                })

                
            }else if (this.detailssBuySell=="sell") {
                //调用卖出详情的接口
                api.dealCenterRecordGetSellDetailsList(params).then(res=>{
                    this.loading = false
                    if(res.status_code==200){
                        let data = res.data.list;
                        this.detailsList = data.filter(this.statusGuoLv);
                        this.total = res.data.page.count
                    }
                }).catch(error=>{
                })
            }
        },
        handleChanges (i) {
          this.pageSizes = i
          this.viewDetails()
        },
        closet() {
            this.$emit('closeTwo');
        },
        statusGuoLv:function(value){
            return value.exchange_status==4 || value.exchange_status==5;
        }


    },
    filters:{
        upperCase:function(val){
            if( val ){
              return val.toUpperCase();
            }
        }
    }
  };
</script>