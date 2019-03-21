<template>
  <div class="record_box">
  	<div class="record-wrap">
	    <div class="record">
	      <div class="record-header">
	        <!--<router-link to="/Moneybag">我的钱包</router-link>-->
	        <!--<a>记录</a>-->
	        <a href="#">{{ coin_name }}币种记录</a>
					<a href="#" class="go-back">返回</a>
	      </div>
	      <div class="box">
	        <div class="box-header">
	        	<ul class="box-list">
	        		<li @click="addActiveClass(1)" :class="typeClass==1? 'tab-li-active': '' ">充值记录</li>
	        		<li @click="addActiveClass(2)" :class="typeClass==2? 'tab-li-active': '' ">提币记录</li>
	        		<li @click="addActiveClass(3)" :class="typeClass==3? 'tab-li-active': '' ">钱包记录</li>
	        	</ul>
	        </div>

	        <!-- 充值记录 -->
	        <div class="container" v-if="typeClass==1">
	          <table class="table-title">
	            <tr class="tr-first">
	              <th class="long">充值数量</th>
	              <th class="text-center">确认块数/总块数</th>
	              <th class="text-right padding-right-10">交易hash</th>
	            </tr>
	          </table>
	          <div class="table-container" >
	            <table v-if="ChargeList.length>0">
	              <tr v-for="(val, index) in ChargeList">
	                <td class="long">{{val.amount}}</td>
	                <td>{{val.block_count}}/{{val.all_block_count}}</td>
	                <td class="long">{{val.transaction_hash}}</td>
	              </tr>
	            </table>
	            <div class="moneybagNomassage" v-else>
	              <div>
	                <span class="icon-no_info"></span>
	              </div>
	              <p>暂无记录</p>
	            </div>
	          </div>
	          <!--<div class="pageposition" style="margin-top: 0.5rem;">
	            <Page :total="total" class="pageOrder" @on-change="handleChange" :page-size="pageSize" v-if="pageshow"></Page>
	          </div>-->
	        </div>

	        <!-- 提币记录   -->
	        <div class="container" v-if="typeClass==2">
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
	              <div><span class="icon-no_info"></span></div>
	              <p>暂无记录</p>
	            </div>
	          </div>
	          <div class="pageposition">
	            <Page :total="total" class="pageOrder" @on-change="CurrencyHandleChange" :page-size="pageSize" v-if="CurrenList.length>0"></Page>
	          </div>
	        </div>

	        <!-- 钱包记录 -->
	        <div class="container" v-if="typeClass==3">
	          <table class="table-title">
	            <tr class="tr-first">
	              <th>时间</th>
	              <th>币种</th>
	              <th>类型</th>
	              <th>数量</th>
	            </tr>
	          </table>
	          <div class="table-container">
	            <table v-if="WaletList.length>0">
	              <tr v-for="item of WaletList" :key="item.finance_history_id">
	                <td>{{item.created_at}}</td>
	                <td>
	                  <!--<span><img :src="item.coin_image" alt=""></span>--> {{item.coin_name}}</td>
	                <td>{{item.finance_history_type | type}}</td>
	                <td>{{item.amount}}</td>
	              </tr>
	            </table>
	            <div class="moneybagNomassage" v-else>
	              <div>
	                <span class="icon-no_info"></span>
	              </div>
	              <p>暂无记录</p>
	            </div>
	          </div>
	          <div class="pageposition">
	            <Page :total="WaletTotal" class="pageOrder" @on-change="WaletHandleChange" :page-size="pageSize" v-if="WaletList.length>0"></Page>
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
            total: 0,
            pageSize: 12,
            list: [],
            pageshow: false,
            nomassage: false
        }
    },
    filters: {
        type: function (value) {
            if (value == 11000) {
                return '跨账户转入'
            } else if (value == 11001) {
                return '充值'
            } else if (value == 11002) {
                return 'OTC资产转入'
            } else if (value == 11003) {
                return '币币资产转入'
            } else if (value == 11004) {
                return '提币拒绝'
            } else if (value == 11005) {
                return '提币撤回'
            } else if (value == 11006) {
                return '交易返佣转入'
            } else if (value == 11007) {
                return '邀请用户交易返佣转入'
            } else if (value == 11008) {
                return '返佣结算转入'
            } else if (value == 11009) {
                return '交易返佣转入'
            } else if (value == 11010) {
                return '其他平台转入'
            } else if (value == 21000) {
                return '跨账户转出'
            } else if (value == 21001) {
                return '提币'
            } else if (value == 21002) {
                return '转出到OTC资产'
            } else if (value == 21003) {
                return '转出到币币资产'
            } else if (value == 21004) {
                return '其他平台付款'
            } else {
                return '数字币充值'
            }
        },

        state: function (value) {
            if (value == 1) {
                return '待确定'
            } else if (value == 2) {
                return '已完成'
            }
        }
    },
    methods: {
        handleChange(page) {
            this.recordList(page)
        },
        recordList(page) {
            let params = {
                coin_id: this.$route.query.coin_id,
                limit: this.pageSize,
                page: page
            }
            api.record(params).then(res => {
                if (res.status_code == 200) {
                    this.list = res.data.list
                    this.total = res.data.page.count
                    if (this.list == '') {
                        this.nomassage = true
                        this.pageshow = false
                    } else {
                        this.pageshow = true
                    }
                }
            }).catch(error => { console.log(error) });
        }
    },
    mounted() {
        this.recordList(1)
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
	width: 50rem;
	background: #4E5E90;
	padding: 1.5rem 3rem;
}
.record-wrap {
	overflow: hidden;
	width: 100%;
	height: 100%;
	padding: 2.4rem 0 2.25rem;
}
.record_box .box {
	width: 100%;
	background: #4B5E94;
	box-shadow: 0 1px 0.6rem 0 #2E407B;
	border-radius: 0.1rem;
	margin: 1rem 0 0 0;
}
.record_box .record-header a,
.record-header span {
	color: #F5B821;
	font-size: 1rem;
}
.record_box .container {
	padding: 0 1.25rem;
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
}
.pageposition {
	margin: 1rem 0 0 0;
}
</style>
