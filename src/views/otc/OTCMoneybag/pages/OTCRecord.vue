<template>
	<div class="otcrecord" style="padding-top: 1.4rem;">
		<div class="record"style="padding-top:0rem;padding-bottom:0;width:50rem">
			<div v-show="false" class="record-header">
				<!--<router-link to="/OTCMoneybag">我的资产</router-link>
				<span>记录</span>-->
				<span>资金记录</span>
	            <a href="#" class="go-back">返回</a>
			</div>
			<div class="box">
			  <div class="box-header">
			    <p class="moneybag" style="margin-left: 1.5rem;">OTC资产-资金记录</p>
			    <div v-show="false" class="search">
			      <p>时间:</p>
			      <div class="white-search-time">
                  <Row>
                    <Col span="12">
                    <DatePicker type="date" placeholder="请选择" style="width: 8rem"></DatePicker>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                    <DatePicker type="date" placeholder="请选择" style="width: 8rem"></DatePicker>
                    </Col>
                  </Row>
                </div>
			      <button>查询</button>
			    </div>
			  </div>
			  <div class="container">
          <table class="table-title">
            <tr class="tr-first">
              <th>时间</th>
              <th>币种</th>
              <th>类型</th>
              <th>数量</th>
              <!--<th>状态</th>-->
              <!--<th class="opration">操作</th>-->
            </tr>
          </table>
          <div v-if="historyList.length > 0" class="table-container" style="" >
            <table v-show="historyList.length >0">
              <tr v-for="(item,index) in historyList" :key="index">
                <td>{{item.created_at}}</td>
                <td class="currency"><span><img v-show="false" src="./../../../../../static/img/currency.png" alt=""></span> {{item.coin_name}}</td>
                <td class="availableBalance">
                    <span v-if="item.finance_history_type == 13001">币币资产转入</span>
                    <span v-if="item.finance_history_type == 13002">钱包资产转入</span>
                    <span v-if="item.finance_history_type == 13003">广告撤回获得</span>
                    <span v-if="item.finance_history_type == 13004">普通购买</span>
                    <span v-if="item.finance_history_type == 13005">广告主购买</span>
                    <span v-if="item.finance_history_type == 23001">转出到币币资产</span>
                    <span v-if="item.finance_history_type == 23002">转出到钱包资产</span>
                    <span v-if="item.finance_history_type == 23003">创建广告冻结</span>
                    <span v-if="item.finance_history_type == 23004">普通出售</span>
                    <span v-if="item.finance_history_type == 23005">广告主出售</span>
                </td>
                <td>{{item.amount}}</td>
                <!--<td>{{item.status}}</td>-->
                <!--<td class="opration" @click="check">-->
                  <!--<a href="javascript:;" >查看</a>-->
                <!--</td>-->
              </tr>
             </table>
          </div>
          <div class="text-center" v-if="historyList.length > 0 ">
            <Page :total="count" class="pageOrder" :page-size="pageSize" @on-change="changePage"></Page>
          </div>
          <div v-else class="text-center" style="margin-top: 1.5rem">
            <p v-show="!loading" class="icon-no_info"></p>
            <p v-show="!loading" class="no-data">暂无数据...</p>
            <div class="loading" v-show="loading">
                <Spin size="large" fix></Spin>
            </div>
          </div>
        </div>
      </div>
      <otc-check v-show="otccheckshow" @close="checkclose"></otc-check>
		</div>
	</div>
</template>
<script>
  import { Base64 } from 'js-base64';
  import OtcCheck from './OtcCheck.vue'
  import axios from 'axios'
  import config from './../../../../../static/config'
  import configOnline from './../../../../../static/configOnline'
  import http from './../../../../reject'
  import api from './../../../../api'
  export default {
    data(){
      return{
        otccheckshow: false,
        count:null,
        pageSize:10,
        loading: true,
        historyList:[

        ]
      }
    },
    components: {
      OtcCheck,
    },
    methods:{
      check() {
        this.otccheckshow = true
      },
      checkclose() {
        this.otccheckshow = false
      },
      otcFinanceHistoryList(coin_id,limit,page){              //记录
          this.loading = true;
          let params = {
              limit:limit,
              page:page,
              coin_id:coin_id
          }
          api.otcRecord(params).then(res=>{
            if(res.status_code == 200){
                this.timer = setInterval(() => {
                    this.loading = false;
                }, 1500);
              this.historyList = res.data.list;
              this.count = res.data.page.count;
            }
          }).catch(error=>{
            this.$Message.error('获取信息失败！');
          })
      },
      changePage(page){
          this.otcFinanceHistoryList(this.$route.query.coin_id,this.pageSize,page);
      }
    },
    mounted(){
      this.$store.commit('changeOTCOrderShow', 1);
      this.otcFinanceHistoryList(this.$route.query.coin_id,this.pageSize,this.$route.query.page);
    },
    beforeDestroy(){
      this.$store.commit('changeOTCOrderShow', 0);
      clearInterval(this.timer);
      this.timer = null;
    }
  };
</script>
<style scoped>
/* 新添加  */
.otcrecord .record-header {
	background: #1D2F6B;
	padding: 0 1rem ;
}
.otcrecord .record-header a.go-back {
	float: right;
	color: #fff;
	font-size: 0.9rem;
}
.otcrecord {
	width: 100%;
    padding: 2.4rem 0 1.9rem;
	background: url(../../../../../static/img/homeBg.png) no-repeat top center;
	background-size: 100% 100%;
}
.record {
	width: 50rem;
	/* background: #4E5E90; */
	padding: 1.5rem 3rem;
}
.record-wrap {
	overflow: hidden;
	width: 100%;
	height: 100%;
	padding: 2.4rem 0 2.25rem;
}
.otcrecord .box {
	width: 100%;
    height: 46rem;
	background: #4B5E94;
	box-shadow: 0 1px 0.6rem 0 #2E407B;
	border-radius: 0.1rem;
	margin: 1rem 0 0 0;
	padding: 0;
    margin-bottom: 0.4rem;
}
.otcrecord .record-header a,
.record-header span {
	color: #F5B821;
	font-size: 1rem;
}
.otcrecord .container {
	padding: 0 1.25rem;
}
.otcrecord .box-list {
	color: #fff;
	line-height: 2.4rem;
}
.otcrecord .box-list li {
	float: left;
	padding: 0 1rem;
	cursor: pointer;
	font-size: 0.8rem;
}
.otcrecord .box-list li:hover {
	color: #F5B821;
}
.otcrecord .box-list .tab-li-active {
	color: #F5B821;
}
.pageposition {
	margin: 1rem 0 0 0;
}
.otcrecord .box-header {
	height: 3rem;
	/*line-height: 3rem;*/
	border: 0;
	background: #1D2F6B;
}
.otcrecord .moneybag {
	line-height: 3rem;
    color: #f5b821;
}
.otcrecord .container tr.tr-first:hover {
	background: none;
}
.otcrecord .icon-no_info {
	font-size: 10rem;
	padding: 4rem 0 0 0;
}
.otcrecord .table-container {
	height: auto;
	margin-bottom: 2.5rem;
}
.otcrecord .no-data {
	font-size: 1rem;
	color: #D9D9D9;
}
.ivu-spin-fix {
    background: transparent;
}
.loading {
    position: relative;
    top:1.5rem;
    width:100%;
    height: 10rem;
    background: transparent;
}
</style>
