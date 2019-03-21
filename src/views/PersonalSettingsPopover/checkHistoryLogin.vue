<template>
	<div class="overview-con">
		<div class="overview-content">
			<div class="check-header">
				<span class="left orange">历史登录记录</span>
				<!--<span class="go-back" @click="goBack">返回</span>-->
			</div>
			<div class="check-content">
				<ul class="check-list">
					<li class="check-li">
						<span class="one-width">登录时间</span>
						<span class="two-width">登录方式</span>
						<span class="three-width">IP地址</span>
						<span class="four-width">状态</span>
					</li>
					<li class="check-li" v-for="(item, index) in data1">
						<span class="one-width">{{ item.created_at }}</span>
						<span v-if="item.login_type==1" class="two-width">web</span>
						<span v-if="item.login_type==2" class="two-width">phone</span>
						<span class="three-width">{{ item.ip }}</span>
						<span class="four-width">成功</span>
						
					</li>
					<!--<Page :total="100" />-->
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../../api'
import axios from 'axios'
import config from '../../../static/config'
import resOnline from './../../../static/configOnline'
import utils from '../../utils'
export default{
	data(){
		return{
			searchword: '',
			spinShow: false,
			switch1: true,
			linkval: '',
			boolean:false,
			bindfundPassword:"bindfundPassword",
			googleTestShow:"googleTestShow",
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
//		iView
	},
	methods:{
		goBack() {
			window.history.back(-1);
		},
		abc(){
			this.loading1=true;
		},
		changeStatus(status){
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
//		            console.log(res.data);
		            this.AccountSettingMessage = res.data;
		            // this.AvatarTop = `http://${this.AccountSettingMessage.user_avatar}`;
		              //请求成功再接受其他接口，
		            let accountSafe = [this.AccountSettingMessage.email_status, this.AccountSettingMessage.phone_status, this.AccountSettingMessage.google_status];
		            let k = 0;
		            for (let j = 0; j < accountSafe.length; j++) {     //安全等级的计算
						if(accountSafe[j]==2){
								k++;
						}
					}
		            if (k == 3) {
		                this.safetyLevel = '高';
		            } else if (k == 2) {
		                this.safetyLevel = '中';
		            } else {
		                this.safetyLevel = '低';
		            }
	            }
        	})


        },
        //  日期换算
        timeToDate(value){
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
        // 得到账户登录历史ok,校验token,成功之后在调其他接口
        getAccountLoginHistory(){
        	api.accountLoginHistory().then(res=>{
        		if(res.status_code == 200 && res.data){
        			this.data1 = res.data;
        			this.getAccountSettingMessage();
        			this.getApiManagementList();
        			for(var i=0;i<this.data1.length;i++) {
        				this.data1[i].created_at = this.timeToDate(this.data1[i].created_at)
        			}
        		}
        	})
        },
        //得到api列表空data
        getApiManagementList(){
        	api.accountApiLists().then(res=>{
        		if(res.status_code ==200 && res.data){
        			this.apiData = res.data;
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
    			this.spinShow = false;
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
				this.AccountSettingMessage.google_status = 1;
	    	}else if(data.phone_status){
	    		this.AccountSettingMessage.phone_status = 1;
	    	}

	    },
	    //开关二次验证前的loading
	    kaiGuanTwoTestBefore(data){
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
		this.getAccountLoginHistory();
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

	}


}
</script>

<style scoped="scoped" lang="scss">
.overview-con {
	overflow: hidden;
	background: #2A366B;
	width: 100%;
	height: 100%;
	background: url(../../../static/img/homeBg.png) no-repeat top center;
	background-size: 100% 100%;
	.overview-content {
		width: 50rem;
		background: #586A9E;
		margin: 2rem auto;
		padding: 2rem 3rem 2.5rem 3rem;
		color: #fff;
		.check-header {
			background: #1D2F6B;
			line-height: 3rem;
			border-radius: 0.1rem;
			overflow: hidden;
			padding: 0 1.5rem;
			margin-bottom: 2rem;
			.orange {
				color: #F5B821;
				font-size: 1rem;
				float: left;
			}
			.go-back {
				font-size: 0.9rem;
				float: right;
				cursor: pointer;
			}
		}
		.check-content {
			background: #475E98;
			box-shadow: 0 1px 0.6rem 0 #45537D;
			border-radius: 0.15rem;
			font-size: 0.8rem;
			min-height: 16rem;
			.check-list {
				padding: 0.5rem 1.5rem;
				.check-li {
					border-bottom: 1px solid #fff;
					padding: 0.75rem 0;
					span {
						display: inline-block;
						width: 24%;
					}
					.two-width {
						text-align: center;
					}
					.three-width {
						text-align: center;
						padding-left: 2.5rem;
					}
					.four-width {
						text-align: right;
					}
				}
				
			}
		}
	}
}
</style>