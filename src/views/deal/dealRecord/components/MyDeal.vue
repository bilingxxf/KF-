<template>
  <div class="selldanz selldanz-new">
    <div class="mydeal">
      <div class="table-title">
        <ul class="tr-first">
          <!-- 买 -->
          <li class="order-time">下单时间</li>
          <li class="col2">{{ $t(`message.OTCOrder.Type`) }}</li>
          <li class="col3">{{ $t(`message.OTCOrder.Pairs`) }}</li>
          <!-- <li class="col4">交易均价</li> -->
          <!-- 新增委托价 -->
          <li class="col4">委托价</li>
          <li class="col">委托量</li>
          <li class="col4">交易均价</li>
          <li class="col5">{{ $t(`message.TradParticular.volumes`) }}</li>
          <li class="col8">{{ $t(`message.OTCOrder.Status`) }}</li>
          <li class="opration">{{$t(`message.MoneyBag.Action`)}}</li>
        </ul>
      </div>
      <div class="table-container">
        <div>
          <ul v-for="(item,index) in allBuyData" :key="index">
            <li class="order-time">{{item.created_at}}</li>
            <li class="col2" v-if="item.exchange_type==1">{{ $t(`message.DealCenter.LimitOrder`)}}</li>
            <li class="col2" v-if="item.exchange_type==2">{{ $t(`message.DealCenter.MarketOrder`)}}</li>
            <li class="col3">{{item.symbol | upperCase}}</li>
            <!-- <li class="col4" >{{item.ave_price_str}} {{item.src_coin_name | upperCase}}</li>             -->
            <!-- 新增委托价 -->
            <li class="col4" v-if="item.exchange_type == 1">{{ item.price_str }}</li>
            <li class="col4" v-else>市价</li>

            <li class="col">{{item.list_amount}}</li>
            
            <li class="col4">{{item.exchange_status == 1 ? '--': item.ave_price_str | becomeZero}}</li>
            <li class="col5">{{item.solved_amount_str | becomeZero}}</li>
            

            <li class="col8" v-if="item.exchange_status==1">{{ $t('message.OrderRecord.Proceeding')}}</li>
            <li class="col8" v-else-if="item.exchange_status==3">{{ $t('message.CancelEd') }}</li>
            <li class="col8" v-else-if="item.exchange_status==4">{{ $t('message.Finished') }}</li>
            <li class="opration">
              <a href="javascript:;" @click="repeal(item.exchange_buy_id)" v-if="item.exchange_status=='1'" class="twoA">
                {{ $t(`message.OTCOrder.Withdraw`) }}
              </a>
              <a href="javascript:;" @click="viewDetails(item.exchange_buy_id, item.exchange_type)" v-if="item.solved_amount_str && item.solved_amount_str!=0 && item.solved_amount_str!=''">
                {{ $t(`message.AssetRecord.Checks`) }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <repeal v-show="repealshow" @close="repealclose" :whichIdDel="deleteId" :buyRepeal="buySellTitle"></repeal>
      <TradParticulars v-show="tradParticuShow" @closeTwo="tradParticuClose" :exchange_type="exchange_type" :detailssBuySell="buySellTitle" :whichIdDet="particularsid"></TradParticulars>
    </div>
    <div class="footer sternWei" v-if="allBuyData.length>0">
      <Page :total="allPageData.count" :page-size="pageSizes" class="pageOrder" @on-change="handleChanges" :current="currentPage"></Page>
    </div>
    <div class="feiji" v-if="allBuyData.length==0 &&allPageData.current_page=='1' ">
      <div>
        <span class="icon-no_info feijiIcon"></span>
        <p class="feijiSpan">{{ $t(`message.NoData`) }}~~~</p>
      </div>
    </div>
  </div>
</template>
<script>
import Repeal from './Repeal.vue'
import TradParticulars from './TradParticulars'
import api from '../../../../api.js'
export default {
  name: 'MyDeal',
  components: {
    Repeal,
    TradParticulars
  },
  props: {
    filterData: {
      type: Object,
      default: {}
    },
    portStatus: {
      type: String,
      default: ""
    }
  },
  watch: {
    //一开始获取币种能不能成功是否调用接口
    portStatus: function (val) {
      if (val == "yes") {
        this.getBuyHistoryData(1);
      }
    },
    //有删选条件默认跳第一页
    //交易对
    'filterData.symbol': function (val) {
      this.needScreening = true;
    },
    //状态
    'filterData.status': function (val) {
      this.needScreening = true;
    },
    //交易类型
    'filterData.type': function (val) {
      this.needScreening = true;
    },
    needScreening: function (val) {
      if (val == true) {
        this.currentPage = 1;
        this.getBuyHistoryData(this.currentPage, this.filterData.symbol, this.filterData.status, this.filterData.type);
        // this.$Message.info(this.$t('message.DealRecord.SelectedSucceed'));
        //可以对整个筛选条件进行处理，再获取数据
        this.needScreening = false;
      }
    }
  },
  data() {
    return {
      //撤销订单中买卖的区别
      buySellTitle: "buy",
      //当前页码
      currentPage: 1,
      //每一页数据的数量
      pageSizes: 12,
      //撤单弹窗控制
      repealshow: false,
      //查看详情数据的控制
      tradParticuShow: false,
      //当前页面的数据信息
      allBuyData: [],
      //当前分页的数据信息
      allPageData: {},
      //撤单时传的id
      deleteId: "",
      //看详情时传的id
      particularsid: "",
      //需要进行筛选
      needScreening: false,

      //传入查看中的交易方式
      exchange_type: '',
    }
  },
  mounted() {
    //默认获取第一页无筛选数据
    // this.getBuyHistoryData(1);
  },
  filters: {
    upperCase: function (val) {
      if (val) {
        return val.toUpperCase();
      }
    },
    exchangeSta: function (val) {
      switch (val) {
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
    reductionAccuracy: function (val) {

      let m = Math.pow(10, 16);
      return parseInt(val * m, 10) / m;


    },
    becomeZero: function (val) {
      if (!val) {
        return "0";
      } else if (val == "") {
        return "0";
      } else {
        return val;
      }
    }
  },
  methods: {
    //得到页面的数据
    getBuyHistoryData(pag, sybol, status, type) {
      let params = {
        symbol_id: "",
        page: pag,
        exchange_status: "",
        exchange_type: ""
      }
      params.symbol_id = sybol ? sybol : "";
      params.exchange_status = status ? status : "";
      params.exchange_type = type ? type : "";
      api.dealCenterRecordGetBuyList(params).then(res => {
        if (res.status_code == 200) {
          this.allBuyData = res.data.list;
          this.allPageData = res.data.page;
          // console.log(this.allPageData);
          if (pag == 1 && params.symbol_id == "" && params.exchange_status == "" && params.exchange_type == "") {
            if (this.allBuyData.length == 0) {
              this.$emit('ifEmpty', "kong")
            } else {
              this.$emit('ifEmpty', "bukong");
            }
          }
        }
      }).catch(error => {
      })

    },
    //点击分页的时候，要带上相对应的筛选条件
    handleChanges(page) {
      // console.log(page);
      this.currentPage = page;
      let sybol = this.filterData.symbol;
      let status = this.filterData.status;
      let type = this.filterData.type;
      this.getBuyHistoryData(page, sybol, status, type);
    },
    //进入撤销页面
    repeal(data) {
      this.deleteId = data;
      this.repealshow = true;
    },
    //撤销数据后的页面刷新
    repealclose(data) {
      if (data == "refresh") {
        this.$Message.success(this.$t('message.DealCenter.WithdSucceed'));
        // if(this.allPageData.count>this.pageSizes){

        // if(this.currentPage == Math.ceil(this.allPageData.count/this.pageSizes)){

        //   if(this.allBuyData.length == 1){
        //     this.currentPage = this.currentPage-1;
        //   }

        // }
        let symbol = this.filterData.symbol;
        let status = this.filterData.status;
        let type = this.filterData.type;
        this.getBuyHistoryData(this.currentPage, symbol, status, type);

        // }else{
        //   if(this.allPageData.count == 1){
        //     console.log(this.$t('message.DealRecord.AllRecordDeleted'));
        //   }
        //   let symbol = this.filterData.symbol;
        //   let status = this.filterData.status;
        //   let type   = this.filterData.type;
        //   this.getBuyHistoryData(1,symbol,status,type);
        // }
      }
      this.deleteId = "";
      this.repealshow = false;
    },
    //显示详情传的id
    viewDetails(ida, exchange_type) {
      this.particularsid = ida;
      this.exchange_type = exchange_type
      this.tradParticuShow = true;
    },
    //关闭详情
    tradParticuClose() {
      this.tradParticuShow = false;
    }
  }

};
</script>
<style scoped>
</style>


