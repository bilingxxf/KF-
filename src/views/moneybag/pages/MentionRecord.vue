<template>
  <div class="record_box record_box_ll">
  	<div class="record-wrap">
	    <div class="record" style="margin-bottom: 0;padding-bottom:0;padding-top:0;">
	      <div style="margin-bottom: 0;" class="record-header">
	        <!--<router-link to="/Moneybag">我的钱包</router-link> -->
	        <!--<a>记录</a>-->
	        <a href="javascript:;">{{ coin_name }}提币记录</a>
					<!-- <a href="#" class="go-back">返回</a> -->
	      </div>
	      <div class="box" style="margin-top: 0;">
	        <div v-show="false" class="box-header">
	        	<ul class="box-list">
	        		<li class="tab-li-active">提币进度</li>
	        	</ul>
	        </div>
	        <!-- 提币记录   -->
	        <div class="container" >
	          <table class="table-title">
	            <tr class="tr-first">
	              <th class="long">时间</th>
	              <th>币种</th>
	              <th>类型</th>
	              <th class="long">数量</th>
	              <th class="text-center">交易状态</th>
	            </tr>
	          </table>
	          <div class="table-container">
	            <table v-if="CurrenList.length>0">
	             	<tr v-for="item of CurrenList" :key="item.finance_history_id">
	                <td class="withdrawRecordco1">{{item.created_at}}</td>
	                <td class="currency withdrawRecordco2"><span><img :src="item.coin_image" alt=""></span> {{item.coin_name}}</td>
	                <td class="withdrawRecordco3">提币</td>
	                <td class="withdrawRecordco4">{{item.finance_withdraw_amount}}</td>
	                <td class="withdrawRecordco5">{{item.finance_withdraw_status| stateCurrency}}</td>
              	</tr>
	            </table>
	            <div class="moneybagNomassage" v-else>
	              <div><span v-show="false" class="icon-no_info"></span></div>
	              <p>暂无记录</p>
	            </div>
	          </div>
	          <div class="pageposition">
	            <Page :total="total" class="pageOrder" @on-change="CurrencyHandleChange" :page-size="pageSize" v-if="CurrenList.length>0"></Page>
	          </div>
	        </div>
	      </div>
	    </div>
    </div>
  </div>
</template>
<script>
import api from '../../../api.js'
export default {
  name: "Record",
  data() {
    return {
      total: 0,  // 提币
      WaletTotal: 0, // 钱包
      typeClass: 2, //
      pageSize: 10,
      ChargeList: [], // 充值记录
      CurrenList: [], // 提币记录
      WaletList: [],  // 钱包记录
      coin_name: '', // 充值币名
      location: '',  // 钱包充值地址
      coin_id: '',
      timer: null
    }
  },
  props: ['coinId', 'name'],
  watch: {
    coinId(val){
        this.coin_id = val;
        this.WaletRecordList(1)
        // this.rechargeInfo()  // 充值
        this.CurrencyRecordList(1) // 提币
    },
    name(val) {
        this.coin_name = val;
    }
  },
  filters: {
    type: function (value) {
      if (value == 11000) {
        return '跨账户转入'
      } else if (value == 11001) {
        return '数字币充值'
      } else if (value == 11002) {
        return '从OTC钱包转入'
      } else if (value == 11003) {
        return '从币币钱包转入'
      } else if (value == 11004) {
        return '数字币提币拒绝'
      } else if (value == 11005) {
        return '数字币提币撤回'
      } else if (value == 11006) {
        return 'exchange交易手续费返佣'
      } else if (value == 11007) {
        return '推广用户返佣'
      } else if (value == 11008) {
        return '返佣结算转入'
      } else if (value == 21000) {
        return '跨账户转出'
      } else if (value == 21001) {
        return '数字币提币'
      } else if (value == 21002) {
        return '转出到OTC钱包'
      } else if (value == 21003) {
        return '转出到币币钱包'
      } else if (value == 21003) {
        return '转出到币币钱包'
      } else if (value == 11009) {
        return '交易返佣转入'
      } else {
        return '数字币充值'
      }
    },
    state: function (value) {  // 钱包
      if (value == 1) {
        return '待确定'
      } else if (value == 2) {
        return '已完成'
      }
    },
    stateCurrency: function (value) {  // 提币
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
  methods: {
//   	addActiveClass(typeClass) {  // 点击li
//     		this.typeClass = typeClass
// //  		this.$store.commit('scType', typeClass)
//     },
 		//  充值记录
		rechargeInfo() {
	    let params = {
	        coin_id: this.coin_id
	    }
	    api.rechargeInfo(params).then(res => {
//	        console.log(res)
	        if (res.status_code == 200) {
	            this.coin_name = res.data.coin_name
	            this.location = res.data.wallet_addr
	            this.rechargeNotify()
	        }
	    }).catch(error => { console.log(error) });
    },
    rechargeNotify() {
	    let params = {
	        coin_name: this.coin_name,
	        address: this.location
	    }
	    api.rechargeNotify(params).then(res => {
        if (res.status_code == 200) {
            if (res.data.length != 0) {
                this.isshow = true
            } else {
                this.isshow = false
            }
            this.ChargeList = res.data
	        }
	    })
		},
 		//  提币记录
 		check(value) {
	    if(value == '充值'){
	      this.rechargeshow = true
	    }else if(value == '提币'){
	      this.withdrawshow = true
	    }else if(value == '划转'){
	      this.transfershow = true
	    }
	  },
	  CurrencyRecordList(page){
	    let params = {
	      coin_id: this.coin_id,
	      limit: this.pageSize,
	      page: page
	    }
	    api.withdrawRecord(params).then(res=>{
	      if(res.status_code == 200){
	        this.CurrenList = res.data.list
	        this.total = res.data.page.count
	      }
      }).catch(error=>{console.log(error)});
    },
    CurrencyHandleChange(page) {  // 提币点击分页
    	this.CurrencyRecordList(page)
    },
    //  钱包记录
    WaletRecordList(page) {
      let params = {
        coin_id: this.coin_id,
        limit: this.pageSize,
        page: page
      }
      api.record(params).then(res => {
        if (res.status_code == 200) {
          this.WaletList = res.data.list
          this.WaletTotal = res.data.page.count
        }
      }).catch(error => { console.log(error) });
    },
    WaletHandleChange(page) {  // 钱包点击分页
      this.WaletRecordList(page)
    }
  },
  mounted() {
    this.WaletRecordList(1)
    // this.rechargeInfo()  // 充值
    this.timer = setInterval(() => {
        this.CurrencyRecordList(1) // 提币
    }, 3000);
    this.CurrencyRecordList(1) // 提币
  },
  beforeDestroy() {
    this.timer = null;
    clearInterval(this.timer);
  },
  destroyed() {
    this.timer = null;
    clearInterval(this.timer);
  }
};
</script>
<style scoped>
/* 新添加  */
.record_box .record-header {
	background: #1D2F6B;
	padding: 0 1rem ;
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
    margin-top: 1.25rem;
	width: 100%;
	background: #4E5E90;
	padding: 1.5rem 3rem;
    box-shadow: 0 1px 0.6rem 0 rgba(58, 71, 111, .8);
}
.record-wrap {
    margin-bottom: 0.5rem;
	overflow: hidden;
	width: 100%;
	height: 100%;
	padding: 2.4rem 0 2.25rem;
    padding-top:0;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    box-sizing: border-box;
}
.record_box {
    background: #586A9E;
}
.record_box .box {
    padding-bottom: 2rem;
	width: 100%;
    height: 100%;
	background: #4B5E94;
	margin: 1rem 0 0 0;
}
.record_box .record-header a,
.record-header span {
	color: #F5B821;
	font-size: 1rem;
}
.record_box .container {
    width: 100%;
    height: 100%;
	padding: 0 1.25rem;
    background: #4B5E94;
    border-radius: 0;
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
	color: #F5B821;
}
.record_box .box-list .tab-li-active {
	color: #F5B821;
  cursor: default !important;
}
.pageposition {
	margin: 1rem 0 0 0;
}
.record_box .moneybagNomassage {
    padding-top: 2rem;
}
.record_box .table-container tr {
    height: 2.5rem;
}
</style>
