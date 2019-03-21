<template>
	<div class="overview-con">
		<div class="overview-content">
			<div class="overview-first">
				<div class="overview-left">
					<b class="overview-s">S</b>
				</div>
				<div class="overview-center">
					<p class="overview-padding">{{ statusInfo.name }}</p>
					<p>上次登录时间：{{statusInfo.last_login_time}}</p>
				</div>
				<div class="overview-right">
					<p class="overview-padding" >账户安全等级: {{safetyLevel }}</p>
					
					<span v-if="statusInfo.email_status == 0 || statusInfo.email_status == 1" class="icon-wrap"><img src="../../../../static/img/email.png"/></span>
					<span v-if="statusInfo.email_status == 2" class="icon-wrap"><img src="../../../../static/img/yemail.png"/></span>
					
					<span v-if="statusInfo.phone_status == 0 || statusInfo.phone_status == 1" class="icon-wrap"><img src="../../../../static/img/phone.png"/></span>
					<span v-if="statusInfo.phone_status == 2" class="icon-wrap"><img src="../../../../static/img/yphone.png"/></span>
					
					
					<span v-if="statusInfo.google_status == 0 || statusInfo.google_status == 1" class="icon-wrap"><img src="../../../../static/img/googlel.png"/></span>
					<span v-if="statusInfo.google_status == 2" class="icon-wrap"><img src="../../../../static/img/ygoogle.png"/></span>
										
					<span class="promote">提升</span>
				</div>
			</div>
			<div class="overview-second">
				<p class="title">我的总资产</p>
				<div class="center-main">
					<span class="available-asset"></span><span class="sizer">0.00333383 &nbsp;BTC</span>
				</div>
				<div class="bottom">
					<ul class="bottom-list">
						<li>
							<p>保证金: </p>
							<p class="two-text">0.00KT <span class="manage">管理</span></p>
						</li>
						<li>
							<p>累计佣金</p>
							<p class="two-text">0.00KT</p>
						</li>
						<li class="no-border">
							<p>24小时盈亏</p>
							<p class="two-text">0.00KT</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="overview-third">
				<div class="walet-block">
					<div class="wallet-left">60%</div>
					<div class="walet-right">
						<p class="title">钱包资产</p>
						<p>12.36542545 BTC</p>
						<p>500545.CNY</p>
						<router-link to="/" class="detail" tag="div">查看详情></router-link>
					</div>
				</div>
				<div class="walet-block">
					<div class="wallet-left">60%</div>
					<div class="walet-right">
						<p class="title">钱包资产</p>
						<p>12.36542545 BTC</p>
						<p>500545.CNY</p>
						<router-link to="/" class="detail" tag="div">查看详情></router-link>
					</div>
				</div>
				<div class="walet-block">
					<div class="wallet-left">60%</div>
					<div class="walet-right">
						<p class="title">钱包资产</p>
						<p>12.36542545 BTC</p>
						<p>500545.CNY</p>
						<router-link to="/" class="detail" tag="div">查看详情></router-link>
					</div>
				</div>
			</div>
			<div class="overview-fourth">
				<p class="title">交易记录</p>
				<div class="text-align">
					<div class="record">冲值记录
						<img class="vertical-middle" src="../../../../static/img/word.png"/>
					</div>
					<div class="record">提币记录
						<img class="vertical-middle" src="../../../../static/img/word.png"/>
					</div>
					<div class="record">保证金记录
						<img class="vertical-middle" src="../../../../static/img/word.png"/>
					</div>
					<div class="record no-margin">佣金记录
						<img class="vertical-middle" src="../../../../static/img/word.png"/>
					</div>
				</div>
			</div>
			<div class="overview-fifth">
				<div class="all-coin">所有币种</div>
				<div class="moneybagbody">
					<div class="header">
						<i-Switch v-model="switch1"></i-Switch>
						<p class="button-desc">只显示有资金币种（隐藏0资金币种）</p>
						<div class="search">
							<input type="text" v-model="searchword">
							<!--<button><span class="icon-search"></span></button>-->
							<span class="search-btn">查询</span>
						</div>

					</div>
					<div class="container">
						<table class="table-title">
							<tr class="tr-first">
								<th>币种</th>
								<th class="col2">可用余额</th>
								<th class="text-center">总计</th>
								<th class="col4 text-right">估算为人民币</th>
								<!--<th class="opration col5th">操作</th>-->
							</tr>
						</table>
						<div class="table-container">
							<table>
								<tr>
									<td class="col1"><span class="circle"></span><span class="padding-left">xpp</span></td>
									<td class="col2">1.2</td>
									<td class="text-center">10</td>
									<td class="text-right">125</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import api from  '../../../api'
  export default{
    data(){
      return{
      	statusInfo: {},  // 个人账户信息
      	switch1: false, // 只显示有资金币种按钮 
      	searchword: '',
      	safetyLevel: '', // 安全等级
      }
    },
    watch:{},
    methods:{
    	//  获取账户信息
      	getAccountInfo() {
      		api.accountSSetting().then(res=> {
      			this.statusInfo = res.data
//    			console.log(this.statusInfo)
      			let accountSafe = [this.statusInfo.email_status, this.statusInfo.phone_status, this.statusInfo.google_status]
      			let k = 0;
      			for(var j=0; j<accountSafe.length;j++) {  // 安全等级的计算
      				if(accountSafe[j]  == 2) {
      					k++;
      				}
      			}
      			if(k == 3) {
      				this.safetyLevel = '高';
      			}else if(k ==2) {
      				this.safetyLevel = '中';
      			}else {
      				this.safetyLevel = '低';
      			}
      		})
     	},
    },
    mounted(){
     this.getAccountInfo();
    },
    created(){
      
    }
  }
</script>
<style scoped="scoped">
/*  资产总览   */
.asset-overview-wrap .ivu-tabs-nav .ivu-tabs-tab {
	color: #FFFFFF;
	padding: 0.5rem 0;
	text-align: center;
	width: 12.4rem;
	margin-right: 0.1rem;
	background: #96A4CD;
}
.asset-overview-wrap .ivu-tabs-ink-bar {
	height: 0;
}
.asset-overview-wrap .ivu-tabs-nav .ivu-tabs-tab-active {
	background: #1F3686;
}
.asset-overview-wrap .ivu-tabs-bar {
	margin: 0 0 0.25rem 0;
}
.asset-overview-wrap .overview-con {
	width: 50rem;
}
.overview-content .overview-padding {
	padding: 0 0 0.7rem 0 !important;
}
.overview-content .overview-first {
	overflow: hidden;
	font-size: 0.8rem;
}
.overview-content .overview-s {
	display: block;
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	background: #84B0EB;
	color: #fff;
	font-size: 2.4rem;
	line-height: 4rem;
	text-align: center;
}
.overview-first .overview-right {
	margin: 0.6rem 0 0 0;
}
.overview-content .ivu-icon {
	margin: 0 0.4rem 0 0;
}
.overview-second .title {
	padding: 0 0 0.5rem 0;
	border-bottom: 1px solid #fff;
	margin: 0 0 1.25rem 0;
}
.overview-second .btc {
	font-weight: 500;
	padding: 0 0 0 0.75rem;
} 
.overview-content .block {
	padding: 0.2rem 0.6rem;
	margin: 0 5rem 0 0.75rem;
}
.overview-third {
	overflow: hidden;
}
.overview-third .walet-block {
	background: #fff;
	width: 14.35rem;
	height: 8rem;
	border-radius: 0.15rem;
	padding: 0.5rem;
	float: left;
	margin-right: 0.3rem;
}
.overview-third .wallet-left {
	color: #45537D;
	width: 35%;
	float: left;
	line-height: 100%;
}
.overview-third .walet-right {
	float: left;
	width: 60%;
}
.walet-right p {
	color: #000;
	font-weight: 600;
	padding: 0 0 0.5rem 0;
}
.walet-right .title {
	color: #45537D;
	font-weight: 600;
	font-size: 0.8rem;
	padding: 1rem 0 0.75rem 0;
}
.walet-right .detail {
	color: #000;
	font-size: 0.6rem;
	display: block;
	text-align: right;
	cursor: pointer;
}
.overview-fourth .record {
	width: 7rem;
	height: 2.2rem;
	display: inline-block;
	border: 1px solid #fff;
	text-align: center;
	line-height: 2.2rem;
	margin: 1rem 4.1rem 0 0;
}
.overview-fourth .text-align {
	text-align: center;
}
.overview-content .overview-fourth {
	background: #475E98;
	padding: 0.9rem 1.4rem;
	overflow: hidden;
	margin: 1.6rem 0;
	box-shadow: 0 1px 0.6rem 0 rgba(58, 71, 111, .8);
	border-radius: 0.2rem;
}
.overview-fourth .title {
	padding: 0 0 0.5rem 0;
	border-bottom: 1px solid #fff;
	font-size: 0.9rem;
}
.overview-fourth .no-margin {
	margin-right: 0;
}
.overview-content .moneybagbody {
	background: #475E98;
	color: #fff;
	height: auto;
}
.overview-fifth .all-coin {
	line-height: 3rem;
	padding: 0 1.3rem;
	font-size: 0.9rem;
	background: #313E66;
}
.overview-fifth .search-btn {
	display: inline-block;
	padding: 0.2rem 0.75rem;
	border: 1px solid #fff;
	border-radius: 0.15rem;
	float: right;
	height: 1.4rem;
	cursor: pointer;
}
.overview-content .moneybagbody .search {
	border: 0;
}
.overview-content .moneybagbody .search input {
	border: 1px solid #fff;
	border-radius: 0.15rem;
	margin-right: 0.5rem;
	width: 7.25rem;
}
.overview-fifth .circle {
	display: inline-block;
	width: 1rem;
	height: 1rem;
	background: #C0EAE4;
	border-radius: 50%;
	margin: 0.25rem 0.1rem 0 0;
}
.overview-fifth .currency {
	position: relative;
}
.overview-fifth .circle {
	position: absolute;
	top: 0.6rem;
	left: 0.2rem;
}
.overview-fifth .padding-left {
	padding-left: 0.75rem;
}
.overview-content .title-wrap {
	border-bottom: 1px solid #DEDADA;
	font-size: 0.9rem;
}
.overview-content .walet-second {
	background: #fff;
}
.overview-content .title {
	margin: 0;
}
.overview-content .walet-second .title {
	color:  #2E3B6F;
	font-weight: 600;
	display: inline-block;
}
.overview-content .red-node {
	color: #FB7070;
	font-weight: 500;
	float: right;
}
.overview-content .green-node {
	color: #42A73F;
}
.overview-content .manage {
	display: inline-block;
	width: 3.5rem;
	height: 1.4rem;
	line-height: 1.4rem;
	text-align: center;
	font-size: 0.7rem;
	cursor: pointer;
	border-radius: 0.2rem;
	border: 1px solid #fff;
	margin: 0 0 0 1.5rem;
}
</style>
