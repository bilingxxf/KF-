<template>
	<div class="overview-con overview-safety-posi">
		<div class="overview-content account-set-two">
			<div class="overview-first">
				<div class="account-set-top">
					<span class="left-des-level">安全级别：{{safetyLevel}}</span>
			        <div class="safety-level">
			          <div class="level-line" :style='{width: level / 3 * 100 +"%"}' :class='level > 2 ? "green" : ( level != 2 ? "red" : "" )'></div>
			        </div>
				</div>
				<div class="account-set-bottom">
					<p>建议您启动全部安全设置，以保障账户及资金安全。</p>
				</div>
				<router-link class="check-history" tag="a" to="/checkHistoryLogin" target="_blank">查看历史登录</router-link>
				<!--<div class="check-history" @click="checkHistoryLogin">查看历史登录</div>-->
			</div>

			<div class="overview-second">
				<div class="accountSettings demo-spin-article">
					<div class="accountSettingInner">
						<div class="accountSecurity">
							<div class="accountSecurityPadding">
								<ul class="accountSecurityContent">
									<li class="accountSecurityContentDan">
										<div class="accountSecurityContent1 font-size-16">账户与安全</div>
										<div class="accountSecurityContent1 text-center font-size-16">安全等级</div>
										<div class="accountSecurityContent1 text-right font-size-16">设置绑定</div>
									</li>

									<!-- 邮箱 -->
									<li class="accountSecurityContentDan">
										<div class="accountSecurityTitle left">
											<p class="accountSecurityTitleIcon">
												<span class="icon-mail icon2"></span>
											</p>
											<p class="accountSecurityTitleLetter">邮箱</p>
										</div>
										<div class="accountSecuritySwitch">
											<i-Switch v-model="AccountSettingMessage.email_status==2?true:false" :disabled="AccountSettingMessage.email_status==0"></i-Switch>
											<div class="switchChange" @click="emailSwitchChange('email')" v-if="AccountSettingMessage.email_status!=0"></div>
										</div>
										<div class="accountSecurityContent1 againSecurity">{{AccountSettingMessage.email_status?AccountSettingMessage.email:''}}</div>
										<!-- 绑定邮箱接口 v-if="AccountSettingMessage.email_status == 0" -->

										<div class="accountSecurityBtn right" @click="popover(bindEmail,twoVeritest)" v-if="AccountSettingMessage.email_status == 0">绑定</div>
										<div class="accountSecurityBtn right" v-else>已绑定</div>
									</li>

									<!-- 手机  -->
									<li class="accountSecurityContentDan">
										<div class="accountSecurityTitle left">
											<p class="accountSecurityTitleIcon">
												<span class="icon-phone1 icon3"></span>
											</p>
											<p class="accountSecurityTitleLetter">手机</p>
										</div>
										<div class="margin-left-55 left">
											<div class="accountSecuritySwitch">
												<i-Switch v-model="AccountSettingMessage.phone_status==2?true:false" :disabled="AccountSettingMessage.phone_status==0"></i-Switch>
												<div class="switchChange" @click="emailSwitchChange('phone')" v-if="AccountSettingMessage.phone_status!=0"></div>
											</div>
											<div class="accountSecurityContent1 againSecurity left">{{AccountSettingMessage.phone_status?AccountSettingMessage.phone:''}}</div>
										</div>
										<div class="accountSecurityBtn right" @click="popover(changePhoneNumber,twoVeritest)" v-if="AccountSettingMessage.phone_status == 0">绑定</div>
										<div class="accountSecurityBtn right" v-else>已绑定</div>
									</li>

									<!-- 谷歌   -->
									<li class="accountSecurityContentDan">
										<div class="accountSecurityTitle left">
											<p class="accountSecurityTitleIcon">
												<span class="icon-G2 icon4"></span>
											</p>
											<p class="accountSecurityTitleLetter">谷歌</p>
										</div>
										<div class="margin-left-55 left">
											<!--<div class="accountSecurityContent1 againSecurity">{{AccountSettingMessage.google_status?'已绑定':'未绑定'}}</div>-->
											<div class="accountSecuritySwitch margin-left-110">
												<i-Switch v-model="AccountSettingMessage.google_status==2?true:false" :disabled="AccountSettingMessage.google_status==0"></i-Switch>
												<div class="switchChange" @click="emailSwitchChange('google')" v-if="AccountSettingMessage.google_status!=0"></div>
											</div>
										</div>

										<div class="accountSecurityBtn SecurityBtnHui right" @click="popover(googleTestShow,twoVeritest)" v-if="AccountSettingMessage.google_status==0">绑定</div>
										<div v-else>
											<div class="accountSecurityBtn SecurityBtnHui right" style="margin-left: 10px">已绑定</div>
											<div class="accountSecurityBtn SecurityBtnHui right" @click="popover(editgoogleTestShow,twoVeritest)">修改</div>
										</div>
									</li>

									<!-- 登录密码 -->
									<li class="accountSecurityContentDan">
										<div class="accountSecurityTitle">
											<p class="accountSecurityTitleIcon">
												<span class="icon-lock icon5"></span>
											</p>
											<p class="accountSecurityTitleLetter">登录密码</p>
										</div>
										<div class="accountSecurityContent1 padding-100">{{AccountSettingMessage.password}}</div>

										<div class="accountSecurityBtn SecurityBtnHui" @click="popover(loginPassword,twoVeritest)">重置</div>
									</li>

									<!-- 资金密码   -->
									<li class="accountSecurityContentDan">
										<div class="accountSecurityTitle">
											<p class="accountSecurityTitleIcon">
												<span class="icon-cash icon6"></span>
											</p>
											<p class="accountSecurityTitleLetter">资金密码</p>
										</div>
										<div class="accountSecurityContent1 padding-100">{{AccountSettingMessage.pin}}</div>
										<div v-if="AccountSettingMessage.pin" class="accountSecurityBtn SecurityBtnHui" @click="popover(fundPasswordSafe,twoVeritest)">重置</div>
										<div v-else class="accountSecurityBtn SecurityBtnHui" @click="popover(bindfundPassword,twoVeritest)">设置</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="account-set-three">
				<h1>安全服务提示</h1>
				<p class="padding-bot">1.确认您登录的是网址www.KF.com，注意防范进入钓鱼网站，不要轻信各种即时通讯工具发送的链接，谨防诈骗。</p>
				<p>2.建议您安装杀毒软件，并定期更新操作系统等软件补丁，确保账户及交易安全。</p>
			</div>

		</div>

		 <!--<Modal v-model="popoverShow" :width="modalWidth" :mask-closable="false" class="m-safe-modal" title="Fullscreen Modal">
			<accountSafeModel v-show="popoverShow" @cancelClose="onlyClose" @reset="getReset" @closepopover="getCloseLetter" @resetData="resetMessage"  :Tanone="tanWho" :popoverData="popoverDatas" @datasReturn='getDatasChange' @twoTestBefore="kaiGuanTwoTestBefore" @huikuangTan="kaiQiHuiKuang"></accountSafeModel>
	    </Modal>-->
		<accountSafeModel v-show="popoverShow" @cancelClose="onlyClose" @reset="getReset" @closepopover="getCloseLetter" @resetData="resetMessage"  :Tanone="tanWho" :popoverData="popoverDatas" @datasReturn='getDatasChange' @twoTestBefore="kaiGuanTwoTestBefore" @huikuangTan="kaiQiHuiKuang"></accountSafeModel>
			<Spin fix v-if="spinShow" class="loadingOut">
            <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
	</div>
</template>

<script>
import iView from 'iview'
import api from '../../api'
import axios from 'axios'
import accountSafeModel from './accountModel/accountSafeModel.vue'
import utils from '../../utils'
export default{
	data(){
		return{
			modalWidth: 540,
			level: 0,
			spinShow: false,
			boolean:false,
			bindfundPassword:"bindfundPassword",
			googleTestShow:"googleTestShow",
			editgoogleTestShow: "editgoogleTestShow",
			centeredShow:"centeredShow",
			loginPassword:"loginPassword",
			verifyPhoneNumber:"verifyPhoneNumber",
			fundPasswordSafe:"fundPasswordSafe",
			changePhoneNumber:"changePhoneNumber",
			changeApi:"changeApi",
			realNameApprove:"realNameApprove",
			advancedVerify:"advancedVerify",
			comfirmDelete:"comfirmDelete",
			setBirthday:'setBirthday',
			briefIntro:'briefIntro',
			setSex:"setSex",
			changeNameApprove:'changeNameApprove',
			changeAvatar:'changeAvatar',
			changeadvancedVerify:'changeadvancedVerify',
			middleJump:'middleJump',
			twoVerificationJudge:'twoVerificationJudge',
			bindEmail:"bindEmail",
			canNotVerify:"canNotVerify",
			popoverShow:false,
			tanWho:'',
			columns1: [
                    {
                        title: this.$t('message.BaseInfo.Date'),
                        key: 'created_at',
                        width:261,
                        render:(h,params)=>{
                        	let _this = this;
                        	let dateTime= "";
                        	let date = new Date(params.row.created_at*1000);
							let Y = date.getFullYear();
							let M = date.getMonth()+1;
							let D = date.getDate();
							let H = date.getHours();
							let I = date.getMinutes();
							let S = date.getSeconds();
							dateTime = Y+"-"+addling(M)+"-"+addling(D)+" "+addling(H)+":"+addling(I)+":"+addling(S);
							function addling(x){
								return x<10?"0"+x:""+x;
							}
							return h('span',{
								props:{

								}
							},dateTime)
                        }
                    },
                    {
                        title: this.$t('message.BaseInfo.Type'),  //  登录方式
                        key: 'login_type',
                        width:330,
                        render:(h,params)=>{
                        	let _this = this;
                        	let texts = '';
                        	if( params.row.login_type == 2){
                        		texts = "phone"
                        	}else if(params.row.login_type == 1){
                        		texts = "web"
                        	}
                        	return h('span',{
                        		props:{
                        		}

                        	},texts)
                        }
                    },
                    {
                        title: this.$t('message.BaseInfo.IpAddress'),
                        key: 'ip'
                    },
                    {
                    	title: this.$t('message.OTCOrder.Status'),
                    	key: 'login_status',
                    	className:"floatRight",
                    	render:(h,params)=>{
                    		let  _this = this;
                    		let status = '';
                    		if( params.row.login_status == 1){
                    			status = this.$t('message.Success')
                    		}else if( params.row.login_status == 0){
                    			status = this.$t('message.FailEd')
                    		}
                    		return h('span',{
                    			props:{

                    			}
                    		},status)
                    	}
                    }
                ],
            // 存放登陆历史列表的数组data1
            data1:[
            ],
			binginged:false,
			// 得到的账户管理信息
			AccountSettingMessage:{},
			apiData:[],
			// 发送给弹窗的api的id信息
			apiId:0,
			popoverDatas:{},
			//安全等级
			safetyLevel:'',
			//加工后的头像链接
			AvatarTop:"",
      		timerout:null,
      		timeroutApi:null,
      		emailNum:0,
      		phoneNum:0,
      		googleNum:0,
      		twoVeritest:'twoVeritest'

		}
	},
	components:{
		iView,
		accountSafeModel,
	},
	methods:{
		abc(){
			this.loading1=true;
		},
		checkHistoryLogin() {
			this.$router.push({path: '/checkHistoryLogin'});
		},
		changeStatus(status){
//			console.log(status);
		},
        popover(who,popoverData){ //跳转对应的弹窗，如果有需要传数据


        	// 点击弹窗的事件;
        			//仍旧是登录状态再弹窗
            if(popoverData){
            	if(popoverData !="twoVeritest"){
            		this.popoverDatas = popoverData;
					this.popoverShow = true;
					this.tanWho = who;
            	}else{
            		this.tanWho = who;
            	}
        	}else{
              	this.popoverDatas = {};
              	if(who == 'changeAvatar'){
                	this.popoverDatas = {user_avatar:this.AccountSettingMessage.user_avatar}

              	}else if(who == 'briefIntro'){
                	this.popoverDatas = {briefIntro:this.AccountSettingMessage.user_brief}
              	}else if(who == 'setBirthday'){
                	this.popoverDatas = {setBirthday:this.AccountSettingMessage.user_birthday}
              	}else if(who == 'setSex'){
                	this.popoverDatas = {setSex:this.AccountSettingMessage.user_gender}
              	}

			    this.popoverShow = true;
    			this.tanWho = who;
        	}


        },
        //重置清空data
        resetMessage(){
        	this.popoverDatas = {};
        },
        //取消关闭
        onlyClose(msg){
        	this.popoverShow = false;
        },
        //确定关闭后刷新(根据不同的模块刷新不同的接口)
        getCloseLetter (msg){
        	//关闭弹窗
        	console.log(msg)
        	this.popoverShow = false;
        	if(msg == "apiGuanbi"){
        		this.timeroutApi = setTimeout(() => {
	            	this.getApiManagementList();
	        	}, 1000);
        	}else{
				this.timerout = setTimeout(() => {
	            	this.getAccountSettingMessage();
	        	}, 1000);
        	}

        },
        getReset (data){
        	// 重置tanWho的值
        	this.tanWho = data;
        },
        // 得到的账户管理信息
        getAccountSettingMessage(){
        	api.accountSSetting().then(res=> {
	            if (res.status_code == 200 && res.data) {
		            this.AccountSettingMessage = res.data;
//		            console.log(this.AccountSettingMessage)
		            // this.AvatarTop = `http://${this.AccountSettingMessage.user_avatar}`;
		              //请求成功再接受其他接口，
		            let accountSafe = [this.AccountSettingMessage.email_status, this.AccountSettingMessage.phone_status, this.AccountSettingMessage.google_status];
		            let k = 0;
		            for (let j = 0; j < accountSafe.length; j++) {     //安全等级的计算
						if(accountSafe[j]==2){
								k++;
						}
					}
		            this.level = k
		            if (k == 3) {
		                this.safetyLevel = this.$t("message.High");
		            } else if (k == 2) {
		                this.safetyLevel = this.$t("message.Middle");
		            } else {
		                this.safetyLevel = this.$t("message.Low");
		            }
	            }
        	})


        },
        //得到api列表空data
        getApiManagementList(){
        	api.accountApiLists().then(res=>{
        		if(res.status_code ==200 && res.data){
        			this.apiData = res.data;
//      			console.log(res);
        		}
        	})
        },
        // 3种验证方式开启状态的改变,
        emailSwitchChange(status){
        	this.spinShow = true;
        	let params = {
        		status:status
        	}
        	api.accountSafeBeforeTest(params).then( res=> {
    			this.spinShow = true;
        		if(res.status_code == 200){
        			this.popover(`${status}Test`);

        		}else if(res.status_code == 6001){
        			if(res.data.email == "email"){
        				this.emailNum = 1;
        			}
        			if( res.data.phone =="phone"){
        				this.phoneNum = 1;
        			}
        			if( res.data.google =="google"){
        				this.googleNum = 1;
        			}

					let data = {
		         		email_status:this.emailNum,
					  	phone_status:this.phoneNum,
					  	google_status:this.googleNum,
					 	statusThree:status
					 }

          			this.popover(this.twoVerificationJudge,data);
        		}
        	}).catch(res=>{
        		this.spinShow = false;
        	})
        },

        //wml
	    catch_info(){
	        let zjpwd = this.$route.query.touch_set;
	        if (zjpwd=='msgInfo') {

	        	// this.popover(bindfundPassword);

//	        	console.log(zjpwd)

	        	this.popover(bindfundPassword);

	        }
	    },
	    //得到弹窗改变后的数据
	    getDatasChange(data){
	    	if(data.user_gender){
	    		this.AccountSettingMessage.user_gender = data.user_gender;
	    	}else if(data.user_brief){
	    		this.AccountSettingMessage.user_brief = data.user_brief;
	    	}else if(data.user_avatar){
	    		this.AccountSettingMessage.user_avatar = data.user_avatar;
	    	}else if(data.user_birthday){
	    		this.AccountSettingMessage.user_birthday = data.user_birthday;
	    	}else if(data.google_status){
//				this.AccountSettingMessage.google_status = 1;
				this.getAccountSettingMessage()
	    	}else if(data.phone_status){
	    		this.AccountSettingMessage.phone_status = 1;
	    	}

	    },
	    //开关二次验证前的loading
	    kaiGuanTwoTestBefore(data){
//	    	console.log(data);
	    	if(data =="kaiqi"){
	    		this.spinShow = true;
	    	}else if(data =="guanbi"){
	    		this.spinShow = false;
	    	}
	    },
	    //开启灰框
	    kaiQiHuiKuang(data){
	    	if(data){
	    		this.popoverShow = true;
	    	}
	    }
	},
	mounted(){
		this.getAccountSettingMessage()
		this.catch_info();
	},
	computed:{
    },
	filters: {
		timeToDate : function(value){
			let date = new Date(value*1000);
			let Y = date.getFullYear();
			let M = date.getMonth()+1;
			let D = date.getDate();
			let H = date.getHours();
			let I = date.getMinutes();
			let S = date.getSeconds();
			return Y+"-"+addZero(M)+"-"+addZero(D)+" "+addZero(H)+":"+addZero(I)+":"+addZero(S);
			function addZero(x){
				return x<10?"0"+x:""+x;
			}
		},
		idCardSecret : function(value){
			if(value){
	  			return  `${value.substring(0,3)}****${value.substring(14)}`;
			}
		}
	},
	watch:{
		tanWho(val) {
			if (!val) return;
			if (val === 'googleTestShow' || val==='editgoogleTestShow') {
				this.modalWidth = 460
			} else {
				this.modalWidth = 540
			}
		}
	}


}

</script>

<style scoped="scoped">
.overview-safety-posi {
	position: relative;
}
.margin-left-110 {
	margin-left: 5.65rem;
}
.overview-con .safety-level {
	float: left;
	width: 8rem;
	background: #FFFFFF;
	margin: 1px 0 0 1rem;
}

.safety-level .level-line {
	height: 1.25rem;
	background: #FFC369;
}
.safety-level .red {
	background:#e94c35;
}
.safety-level .green {
	background: #499972;
}

.padding-left-35 {
	padding-left: 1.75rem;
}
.padding-left-10 {
	padding-left: 0.5rem;
}
.margin-left-55 {
	padding-left: 2.75rem;
	/*overflow: hidden;*/
}
.asset-overview-wrap {
	/*width: 100%;
	height: 100%;
	overflow: hidden;
	background: #2A366B;*/
}
.account-set-top .left-des-level {
	float: left;
	height: 2rem;
}
.asset-overview-wrap .overview-content {
	background: #586A9E;
	font-weight: 100;
}
.asset-overview-wrap .ivu-tabs-bar {
	margin: 0 0 0.25rem 0;
}
.asset-overview-wrap .overview-con {
	width: 50rem;
}
.asset-overview-wrap .overview-content {
	padding: 2.5rem 3rem;
	color: #fff;
}
.overview-content .overview-left {
	float: left;
	width: 12%;
}
.overview-content .overview-center {
	float: left;
	width: 40%;
	margin: 1.1rem 0 0 0;
}
.overview-content .overview-padding {
	padding: 0 0 0.7rem 0 !important;
}
.overview-content .overview-right {
	float: left;
	width: 30%;
}
.overview-content .overview-first {
	overflow: hidden;
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
	margin: 1.1rem 0 0 0;
}
.overview-content .ivu-icon {
	margin: 0 0.4rem 0 0;
}
.overview-content .promote {
	display: inline-block;
	padding: 0.3rem 0.9rem;
	text-align: center;
	line-height: 100%;
	border: 1px solid #fff;
	border-radius: 0.2rem;
	font-size: 0.6rem;
}
.overview-content .overview-second {
	background: #475E98;
	padding: 0.5rem;
	margin: 1.6rem 0;
	box-shadow: 0 1px 0.6rem 0 rgba(58, 71, 111, .8);
	border-radius: 0.2rem;
	/*border: 1px solid rgba(255,255,255,.16);*/
}
.overview-second .title {
	padding: 0 0 0.5rem 0;
	border-bottom: 1px solid #fff;
	margin: 0 0 1.25rem 0;
}
.overview-second .sizer {
	font-size: 2.3rem;
	font-weight: 400;
}
.overview-second .btc {
	font-weight: 500;
	padding: 0 0 0 0.75rem;
}
.overview-content .block {
	padding: 0.2rem 0.6rem;
	margin: 0 5rem 0 0.75rem;
}
.overview-second .bottom {
	overflow: hidden;
	margin: 1.5rem 0 0.5rem 0;
}
.bottom span {
	display: inline-block;
}
.bottom .first-span {
	padding-right: 18.3rem;
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
}
.overview-fourth .record {
	width: 7rem;
	height: 2.2rem;
	display: inline-block;
	border: 1px solid #fff;
	text-align: center;
	line-height: 2.2rem;
	margin: 1rem 4.7rem 0 0;
}
.overview-fourth .text-align {
	text-align: center;
}
.overview-content .overview-fourth {
	background: #475E98;
	padding: 0.75rem 0.5rem;
	overflow: hidden;
	margin: 1.6rem 0;
	box-shadow: 0 1px 0.6rem 0 rgba(58, 71, 111, .8);
	border-radius: 0.2rem;
	/*border: 1px solid rgba(255,255,255,.16);*/
}
.overview-fourth .title {
	padding: 0 0 0.5rem 0;
	border-bottom: 1px solid #fff;
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
	padding: 0.4rem;
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
	left: 4.5rem;
}
.overview-fifth .padding-left {
	padding-left: 0.6rem;
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
.overview-content .walet-list {
	overflow: hidden;
}
.overview-content .walet-list li {
	font-size: 1.6rem;
	font-weight: 500;
	width: 33%;
	float: left;
	color: #F5B821;
	text-align: center;
	border-right: 1px solid #DEDADA;
	margin: 1.2rem 0 1rem 0;
	line-height: 3.75rem;
}
.overview-content .walet-list .no-border {
	border: 0;
}
.overview-content .walet-list .right-node {
	font-family: PingFangSC-Medium;
	font-size: 0.7rem;
	color: #2F3C6F;
}
.overview-content .green-node {
	color: #42A73F;
}



.personal-wrap .overview-content {
	/*margin: 0 auto 2rem;*/
	padding: 2.5rem 3rem;
}
.personal-wrap .ivu-tabs-nav .ivu-tabs-tab {
	width: 150%;
}
.personal-wrap .overview-s {
	background: #95A4D7;
	margin: 0 0 0 0.25rem;
}
.personal-wrap .set-photo {
	font-size: 0.8rem;
	padding: 0.6rem 0 0 0;
}
.personal-wrap .overview-first {
	font-size: 0.8rem;
}
.personal-wrap .overview-center {
	margin: 0.75rem 0 0 3.25rem;
}
.personal-wrap .overview-right {
	padding: 3.4rem 0 0 0;
}
.personal-wrap .link-wrap {
	overflow: hidden;
	margin: 1.5rem 0 2.5rem 0;
}

.personal-wrap .exclusive-code {
	float: right;
	width: 14rem;
	line-height: 2.25rem;
	background: #F5C245;
	text-align: center;
	border-radius: 0.2rem;
	font-size: 1.2rem;
	cursor: pointer;
}
.personal-wrap .overview-second .title {
	border: 0;
	padding: 0 0.5rem;
	font-size: 0.9rem;
}
.personal-wrap .moneybagbody .header {
	height: 2.5rem;
	margin: 0 0 1rem 0;
}
.personal-wrap .moneybagbody {
	width: auto;
	padding: 0 0.5rem;
}
.personal-wrap .moneybagbody .button-desc {
	line-height: 2.75rem;
}
.personal-wrap .overview-content .ivu-icon {
	margin: 0;
}
.personal-wrap .identity-list li {
	border-bottom: 0.0.1rem solid #FFFFFF;
	margin: 0 0 0.8rem 0;
	padding: 0.6rem 0;
	color: #fff;
}
.personal-wrap .ivu-icon {
	font-size: 1rem;
	padding: 0 0.2rem 0 0.3rem;
	vertical-align: middle;
}
.container .identity-list span {
	display: inline-block;
}
.container .name-value {
	padding: 0 0 0 2rem;
}
.personal-wrap .account-set-third {
	position: relative;
}
.personal-wrap .add {
	position: absolute;
	top: 0.75rem;
	right: 1rem;
	border: 1px solid #FFC432;
	border-radius: 0.15rem;
	color: #FFC229;
	padding: 0.25rem 0.6rem;
}
.personal-wrap .no-data {
	padding: 1.5rem 0 4rem 0;
	text-align: center;
	color: #7889B7;
}
.account-set-two .overview-first {
	position: relative;
}
.personal-wrap .account-set-top {
	padding: 0 0 0.5rem 0;
	height: 2rem;
}
.personal-wrap .blocks {
	display: inline-block;
	width: 4.3rem;
	height: 0.9rem;
	vertical-align: middle;
}
.personal-wrap .orange {
	background:  #FFC369;
	border-radius: 0.1rem 0 0 0.1rem;
	margin-left: 1.25rem;
}
.personal-wrap .white {
	background: #F7F6F6;
	border-radius: 0 0.1rem 0.1rem 0;
}
.personal-wrap .check-history {
	position: absolute;
	top: 0.5rem;
	right: 1rem;
	font-size: 0.7rem;
	border: 1px solid #FFFFFF;
	border-radius: 0.2rem;
	padding: 0.25rem 0.75rem;
	cursor: pointer;
}
.personal-wrap .account-set-three h1 {
	font-size: 0.9rem;
	padding: 0.5rem 0 0.6rem 0;
}
.personal-wrap .account-set-three .padding-bot {
	padding-bottom: 0.5rem;
}
.overview-con .accountSettings .accountSettingInner {
	width: 100%;
}
.overview-con .accountSettings {
	background: none;
}
.overview-con .accountSettings .accountSettingInner .accountSecurity {
	background: none;
}
.overview-con .accountSettings .accountSettingInner .accountSecurity .accountSecurityPadding .accountSecurityContent {
	border: none;
}
.overview-con .accountSecurity .accountSecurityPadding .title2 {
	color: #fff;
}
.overview-con .accountSettings .accountSettingInner .accountSecurity .accountSecurityPadding .accountSecurityContent .accountSecurityContentDan .accountSecurityTitle .accountSecurityTitleLetter {
	color: #fff;
}
.overview-con .accountSettings .accountSettingInner .accountSecurity .accountSecurityPadding .accountSecurityContent .accountSecurityContentDan .accountSecurityContent1{
	color: #fff;
}
.overview-con .accountSecurityContent1 {
	width: 13.3rem !important;
}
.overview-con .againSecurity {
	width: 4.7rem !important;
	padding: 0 0 0 1rem;
}
.overview-con .padding-20 {
	padding: 0 0 0 1.4rem;
}
.overview-con .padding-100 {
	padding: 0 0 0 5.9rem;
}
.overview-con .text-center {
	text-align: center;
}
.overview-con .text-right {
	text-align: right;
	/*padding-right: 0.5rem;*/
}
.overview-con .accountSecurityTitleIcon {
	padding: 0 0.3rem 0 0;
}
.overview-con .accountSettings .accountSettingInner .accountSecurity {
	margin: 0;
}
.overview-con .accountSettings .accountSettingInner .accountSecurity .accountSecurityPadding .accountSecurityContent .accountSecurityContentDan {
	padding: 0 0.5rem;
}
.account-set-invite .walet-list li {
	position: relative;
	margin: 0.4rem 0;
	line-height: 4.5rem;
}
.account-set-invite .walet-list b {
	position: absolute;
	top: -1.6rem;
	left: 1rem;
	color: #333E63;
	font-size: 0.9rem;
	font-weight: 500;
}
.account-set-safety .ivu-tabs-nav .ivu-tabs-tab-active {
	color: #F5B821;
	background: none;
}
.account-set-safety .ivu-tabs-nav .ivu-tabs-tab {
	background: none;
	width: 75%;
}
.account-set-safety .overview-content .overview-second {
	padding: 0;
}
.account-set-safety .moneybagbody {
	padding: 0 !important;
	position: relative;
}
.account-set-safety .choose-time {
	position: absolute;
	top: 0;
	right: 1rem;
	z-index: 100;
	display: flex;
}
.account-set-safety .choose-time span {
	padding: 0.9rem 0.15rem;
}
.account-set-safety .ivu-date-picker-header-label {
	color: #000;
}
.account-set-safety span.ivu-date-picker-cells-cell {
	color: #000;
}
.account-set-safety .choose-time .rows {
	position: absolute;
	top: 0.1rem;
	left: 7.6rem;
}
.choose-time .ivu-icon {
	opacity: 0;
}
.choose-time .export {
	display: inline-block;
	height: 1.5rem;
	width: 3rem;
	line-height: 1.4rem;
	margin: 0.75rem 0;
	text-align: center;
	border: 1px solid #fff;
	border-radius: 0.1rem;
}
.account-set-safety .identity-list {
	padding: 0 1.3rem;
}
.account-set-safety .identity-list li span {
	padding: 0 0.5rem;
}
.account-set-safety .ivu-page {
	margin: 2.5rem auto 1.5rem;
	text-align: center;
}
.account-set-safety .ivu-page .ivu-page-item a {
	color: #fff;
}
.account-set-safety .ivu-page-item:hover {
	background: #fff;
}
.partner-wrap .ivu-tabs-nav .ivu-tabs-tab {
	width: 16.55rem;
}
.partner-wrap .partner-first {
	display: flex;
}
.partner-wrap .column {
	width: 19.9rem;
	height: 14.35rem;
	background: #fff;
	padding: 0.5rem 1.25rem;
}
.partner-first .column-left {
	margin-right: 3.5rem;
}
.partner-first h1 {
	color: #2F3C70;
	font-size: 0.9rem;
	padding: 0.5rem 0.2rem;
	border-bottom: 1px solid #D9D9D9;
}
.partner-first .column .orange {
	font-size: 1.6rem;
	color: #F5B821;
	font-weight: 500;
	padding: 0.75rem 0 1rem 0;
}
.partner-first .column P {
	color: #344273;
	padding: 0.3rem;
	font-size: 0.8rem;
	font-weight: 400;
}
.partner-second {
	margin: 2.5rem 0;
}
.second-top .statis {
	display: inline-block;
	padding: 0 0 0 1.25rem;
	font-size: 0.9rem;
	width: 16.5rem;
}
.partner-second .second-top {
	height: 3rem;
	background: #1D2F6B;
	display: flex;
	line-height: 3rem;
}
.partner-second .second-top .name {
	padding: 0 0.25rem 0 0;
}
.partner-second .second-top .inp-name {
	width: 3.5rem;
	height: 1.2rem;
	background: none;
	border: 1px solid #fff;
	border-radius: 0.1rem;
	margin: 0.95rem 0.8rem 0  0;
	color: #fff;
}
.partner-second .second-top .date {
	padding: 0 0.3rem 0 0;
}
.partner-second .ivu-icon {
	opacity: 0;
}
.partner-second .ivu-date-picker-header-label {
	color: #000;
}
.partner-second .ivu-date-picker-cells span em {
	color: #000;
}
.partner-second .second-top .rows {
	display: inline-block;
	padding: 0.1rem 0.5rem;
}
.partner-second .add-btn {
	display: inline-block;
	width: 3rem;
	height: 1.2rem;
	border-radius: 0.1rem;
	border: 1px solid #fff;
	line-height: 1.2rem;
	text-align: center;
	margin: 0.95rem 0 0 0;
}
.partner-second .search {
	margin: 0.95rem 0.75rem 0 0.75rem;
}
.invite-total .overview-content {
	padding: 1px 2.5rem;
}
.invite-total .invite-list-wrap {
	overflow: hidden;
	background: #475E98;
}
.invite-list-wrap .invite-list {
	padding: 0.5rem 1.2rem 1.5rem 1.2rem;
}
.invite-list li {
	border-bottom: 1px solid #fff;
	padding: 0.8rem 0.3rem;
}
.invite-list li span {
	display: inline-block;
	width: 24%;
}
.invite-list .right {
	text-align: right;
}
.service-first {
	display: flex;
}
.service-first .service-left {
	width: 14.65rem;
	height: 13rem;
	border-radius: 0.15rem;
	background: #fff;
	color:  #1B2C71;
	margin-right: 1.5rem;
	text-align: center;
	font-weight: 400;
}
.service-left .photo {
	width: 4.3rem;
	height: 4.3rem;
	line-height: 3.7rem;
	font-size: 3.2rem;
	text-align: center;
	background:  #CCE3EC;
	color: #4E5E90;
	border-radius: 50%;
	font-weight: 400;
	margin: 1.3rem auto 0.5rem;
}
.service-left .account-set {
	width: 4.9rem;
	line-height: 1.7rem;
	text-align: center;
	border: 1px solid #1B2C71;
	border-radius: 0.2rem;
	margin: 0.5rem auto;
}
.service-left .history-time {
	padding: 0.5rem 0 0.7rem 0;
}
.service-first .service-right {
	width: 27.6rem;
	height: 13rem;
	background: #5165A4;
	padding: 0.75rem 0.9rem;
	position: relative;
	box-shadow: 0.35rem 0.35rem 2.55rem -0.5rem rgb(0,0,0);
}
.service-right .king-total {
	font-size: 0.9rem;
	font-weight: 600;
}
.service-right .toped {
	border-bottom: 1px solid #fff;
	padding: 0 0 0.5rem 0;
}
.service-right .orange {
	font-size: 1.8rem;
	color: #F5C245;
	font-weight: 500;
	text-align: center;
	padding: 1.5rem 0;
}
.service-right .available {
	padding: 0 0 0.75rem 0;
}
.service-right .transfer {
	display: inline-block;
	border: 1px solid #fff;
	border-radius: 0.2rem;
	padding: 0.1rem 0.9rem;
	position: absolute;
	bottom: 3.65rem;
	left: 13rem;
}
.commission-title {
	padding: 3.5rem 0 0.75rem 0;
}
.commission-des {
	line-height: 1.5rem;
}
.second-top .add-btn {
	position: absolute;
	margin: 0;
	top: 0.95rem;
	right: 1rem;
}
.service-bottom .invite-list li .first {
	width: 5rem;
}
.service-bottom .invite-list li .second {
	width: 9.3rem;
}
.service-bottom .invite-list li .third {
	width: 6.5rem;
}
.service-bottom .invite-list li .forth {
	width: 5.5rem;
	text-align: center;
}
.service-bottom .invite-list li .fifth {
	width: 4rem;
	text-align: center;
}
.service-bottom .invite-list li .last {
	width: 9.5rem;
	text-align: right;
}
.service-bottom .invite-list-wrap {
	background: #475E98;
}
.text-align {
	text-align: center;
}
.service-bottom b {
	padding: 0 0.25rem;
	cursor: pointer;
}
.partner-second .btns {
	display: inline-block;
	width: 3rem;
	height: 1.2rem;
	line-height: 1.2rem;
	border-radius: 0.1rem;
	border: 1px solid #fff;
	text-align: center;
	margin: 0.95rem 0 0 1rem;
	cursor: pointer;
}
</style>
