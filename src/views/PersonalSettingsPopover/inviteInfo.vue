<template>
	<div class="overview-con account-set-safety inviteInfo">
		<div class="overview-content">
			<div class="link-wrap">
				<span class="link">邀请码：</span>
				<div class="copy-link">
					<div class="link_copy">
						<div class="link-left">
							<input type="text" class="link-address" v-model="Mylinkpromotion" disabled="disabled" />
							<b class="line"></b>
							<span class="copy-btn" :data-clipboard-text="Mylinkpromotion" @click="copy">复制分享链接</span>
						</div>
					</div>

					<div @mouseout="showEW = false" @mousemove="showEW = true" class="relative">
						<div class="exclusive-code">专属二维码</div>
						<div class="exclusive-wrap" v-show="showEW">
							<div class="user-prop-content">
								<i class="user-prop-sj"></i>
								<div class="user-prop-p">请使用浏览器扫码</div>
								<i></i>
								<img :src='qrcod' alt="" class="qrcode_img" />
								<div class="user-prop-btn">
									<a :href="qrcod" download="qrcod.png">下载保存</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="overview-second walet-second account-set-invite">
				<div>
					<ul class="walet-list">
						<!--<li><b class="invite">邀请人数</b>120<span class="right-node">人</span></li>-->
						<li>
							<b class="get">获得KT</b>{{getKTNum}}
							<span class="right-node"> KT</span>
						</li>
						<li>
							<b class="use">可用KT</b>{{ avilbedNum }}
							<span class="right-node"> KT</span>
						</li>
						<li class="no-border">
							<b class="use">邀请人数</b>{{ total }}
							<span class="right-node"> 位</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="overview-second inviteInfo-second">
				<div class="moneybagbody">
					<!--<div class="choose-time">
						<span v-show="showChooseTime">时间：</span>
						<Row v-show="showChooseTime">
							<Col span="12">
							<DatePicker type="date" placeholder="选择时间" style="width: 9rem"></DatePicker>
							</Col>
							<span class="rows">一</span>
							<Col span="12">
							<DatePicker type="date" placeholder="选择时间" style="width: 9rem"></DatePicker>
							</Col>
						</Row>
						<p v-show="showChooseTime" class="export" @click="exportData()">导出</p>
					</div>-->
					<Tabs value="name1" @on-click="emptyValue" class="invite-record-tab">
						<TabPane label="邀请记录" name="name1">
							<div class="container">
								<ul class="identity-list" id="table-list" ref="a">
									<li>
										<span class="authentica-method">账户</span>
										<span class="text-center">注册时间</span>
										<span class="no-authentica text-right">状态</span>
									</li>
									<div v-if="janrecord.length>0">
										<li v-for="(item, index) in janrecord">
											<span class="authentica-method">{{ item.name }}</span>
											<span class="text-center">{{ item.create_time }}</span>
											<span class="no-authentica text-right">{{ item.status }}</span>
										</li>
									</div>

									<div class="no-data" v-else>暂无数据~</div>
								</ul>
								<!--<Page :total="total" v-if="total>10" :current="current1" @on-change="getPageNum1" />-->
							</div>
						</TabPane>
						<!--<TabPane label="返佣记录" name="name2">
							<div class="container">
								<ul class="identity-list"  id="table-lists1">
									<li>
										<span>被邀请人账号</span>
										<span class="text-center">时间</span>
										<span class="name-value text-right">佣金</span>
									</li>
									<div v-if="janrecord1.length>0" >
										<li v-for=" (item, index) in janrecord1" :key="index">
											<span>{{item.name}}</span>
											<span class="text-center">{{item.create_time}}</span>
											<span class="no-authentica go-authentica text-right">{{item.commission}}</span>
										</li>
									</div>
									<div class="no-data" v-else>暂无数据~</div>
								</ul>
							</div>
						</TabPane>-->
					</Tabs>

				</div>
			</div>
			<div>

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
import { Base64 } from "js-base64";
import Clipboard from "clipboard";
export default {
	data() {
		return {
			showChooseTime: false, // 选择时间的框是否出现
			Mylinkpromotion: '', //邀请码
			showEW: false, // 是否出现二维码
			qrcod: '', //二维码图片
			AccountSettingMessage: {}, // 得到的账户管理信息
			inviteRecordList: '', //邀请记录
			getKTNum: '', // 获得KT
			total: 0, // 总条数
			current1: 1, // 当前页数
			excellist: [], // 导出
			janrecord: [],
			janrecord1: [],
			oldArray: [],
			newArray: [],
			oldArrays: [],
			newArrays: [],
			excellist: [],
			grop: 0,
			grops: 0,
			open: true,
			opens: true,

			searchword: '',
			spinShow: false,
			switch1: true,
			linkval: '',
			boolean: false,
			bindfundPassword: "bindfundPassword",
			googleTestShow: "googleTestShow",
			centeredShow: "centeredShow",
			loginPassword: "loginPassword",
			verifyPhoneNumber: "verifyPhoneNumber",
			fundPasswordSafe: "fundPasswordSafe",
			changePhoneNumber: "changePhoneNumber",
			changeApi: "changeApi",
			realNameApprove: "realNameApprove",
			advancedVerify: "advancedVerify",
			comfirmDelete: "comfirmDelete",
			setBirthday: 'setBirthday',
			briefIntro: 'briefIntro',
			setSex: "setSex",
			changeNameApprove: 'changeNameApprove',
			changeAvatar: 'changeAvatar',
			changeadvancedVerify: 'changeadvancedVerify',
			middleJump: 'middleJump',
			twoVerificationJudge: 'twoVerificationJudge',
			bindEmail: "bindEmail",
			canNotVerify: "canNotVerify",
			popoverShow: false,
			tanWho: '',
			// 存放登陆历史列表的数组data1
			data1: [],
			binginged: false,
			// 得到的账户管理信息

			apiData: [],
			// 发送给弹窗的api的id信息
			apiId: 0,
			popoverDatas: {},
			//安全等级
			safetyLevel: '',
			//加工后的头像链接
			AvatarTop: "",
			timerout: null,
			timeroutApi: null,
			emailNum: 0,
			phoneNum: 0,
			googleNum: 0,
			twoVeritest: 'twoVeritest',
			avilbedNum: 0

		}
	},
	methods: {
		emptyValue(name) {
			if (name == 'name1') {
				this.showChooseTime = false
			} else {
				this.showChooseTime = true
			}
		},
		MypromotionUrl() { // 邀请码链接
			api.Mypromotion().then(res => {
				//						console.log(res)
				let linkurl = window.location.origin;
				this.Mylinkpromotion =
					location.origin + "/#/register?code=" +
					res.data.agent_promo_agent;
				this.Myqrcod({
					base64: Base64.encodeURI(this.Mylinkpromotion)
				});
			})
				.catch(err => {
					console.log(err);
				});
		},
		Myqrcod(params) { // 专属二维码图片
			api.twoQrcod(params).then(res => {
				this.qrcod = 'data:image/png;base64,' + res.data.QrCode;
			})
		},
		copy() { // 复制分享链接
			let clipboard = new Clipboard(".copy-btn");
			clipboard.on("success", e => {
				clipboard.destroy();
				this.success();
			});
			clipboard.on("error", e => {
				clipboard.destroy();
			});
		},
		//复制成功提示
		success() {
			this.$Message.success('复制成功');
		},
		popover(who, popoverData) { //跳转对应的弹窗，如果有需要传数据
			// 点击弹窗的事件;
			//仍旧是登录状态再弹窗
			if (popoverData) {
				if (popoverData != "twoVeritest") {
					this.popoverDatas = popoverData;
					this.popoverShow = true;
					this.tanWho = who;
				} else {
					this.tanWho = who;
				}
			} else {
				this.popoverDatas = {};
				if (who == 'changeAvatar') {
					this.popoverDatas = {
						user_avatar: this.AccountSettingMessage.user_avatar
					}

				} else if (who == 'briefIntro') {
					this.popoverDatas = {
						briefIntro: this.AccountSettingMessage.user_brief
					}
				} else if (who == 'setBirthday') {
					this.popoverDatas = {
						setBirthday: this.AccountSettingMessage.user_birthday
					}
				} else if (who == 'setSex') {
					this.popoverDatas = {
						setSex: this.AccountSettingMessage.user_gender
					}
				}

				this.popoverShow = true;
				this.tanWho = who;
			}

		},
		//重置清空data
		resetMessage() {
			this.popoverDatas = {};
		},
		//取消关闭
		onlyClose(msg) {
			this.popoverShow = false;
		},
		//确定关闭后刷新(根据不同的模块刷新不同的接口)
		getCloseLetter(msg) {
			//关闭弹窗
			this.popoverShow = false;
			if (msg == "apiGuanbi") {
				this.timeroutApi = setTimeout(() => {
					this.getApiManagementList();
				}, 1000);
			} else {
				this.timerout = setTimeout(() => {
					this.getAccountSettingMessage();
				}, 1000);
			}

		},
		getReset(data) {
			// 重置tanWho的值
			this.tanWho = data;
		},
		// 得到的账户管理信息
		getAccountSettingMessage() {
			api.accountSSetting().then(res => {
				if (res.status_code == 200 && res.data) {
					//		            console.log(res.data);
					this.AccountSettingMessage = res.data;
					// this.AvatarTop = `http://${this.AccountSettingMessage.user_avatar}`;
					//请求成功再接受其他接口，
					let accountSafe = [this.AccountSettingMessage.email_status, this.AccountSettingMessage.phone_status, this.AccountSettingMessage.google_status];
					let k = 0;
					for (let j = 0; j < accountSafe.length; j++) { //安全等级的计算
						if (accountSafe[j] == 2) {
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
		//得到api列表空data
		getApiManagementList() {
			api.accountApiLists().then(res => {
				if (res.status_code == 200 && res.data) {
					this.apiData = res.data;
					//						console.log(res);
				}
			})
		},
		// 3种验证方式开启状态的改变,
		emailSwitchChange(status) {
			this.spinShow = true;
			let params = {
				status: status
			}
			api.accountSafeBeforeTest(params).then(res => {
				//					console.log(res)
				this.spinShow = false;
				if (res.status_code == 200) {
					this.popover(`${status}Test`);

				} else if (res.status_code == 6001) {
					if (res.data.email == "email") {
						this.emailNum = 1;
					}
					if (res.data.phone == "phone") {
						this.phoneNum = 1;
					}
					if (res.data.google == "google") {
						this.googleNum = 1;
					}

					let data = {
						email_status: this.emailNum,
						phone_status: this.phoneNum,
						google_status: this.googleNum,
						statusThree: status
					}

					this.popover(this.twoVerificationJudge, data);
				}
			}).catch(res => {
				this.spinShow = false;
			})
		},

		//wml
		catch_info() {
			let zjpwd = this.$route.query.touch_set;
			if (zjpwd == 'msgInfo') {

				// this.popover(bindfundPassword);

				//					console.log(zjpwd)

				this.popover(bindfundPassword);

			}
		},
		//得到弹窗改变后的数据
		getDatasChange(data) {

			if (data.user_gender) {
				this.AccountSettingMessage.user_gender = data.user_gender;
			} else if (data.user_brief) {
				this.AccountSettingMessage.user_brief = data.user_brief;
			} else if (data.user_avatar) {
				this.AccountSettingMessage.user_avatar = data.user_avatar;
			} else if (data.user_birthday) {
				this.AccountSettingMessage.user_birthday = data.user_birthday;
			} else if (data.google_status) {
				this.AccountSettingMessage.google_status = 1;
			} else if (data.phone_status) {
				this.AccountSettingMessage.phone_status = 1;
			}

		},
		//开关二次验证前的loading
		kaiGuanTwoTestBefore(data) {
			//				console.log(data);
			if (data == "kaiqi") {
				this.spinShow = true;
			} else if (data == "guanbi") {
				this.spinShow = false;
			}
		},
		timeToDate(value) {
			let date = new Date(value * 1000);
			let Y = date.getFullYear();
			let M = date.getMonth() + 1;
			let D = date.getDate();
			let H = date.getHours();
			let I = date.getMinutes();
			let S = date.getSeconds();
			return Y + "-" + addZero(M) + "-" + addZero(D) + " " + addZero(H) + ":" + addZero(I) + ":" + addZero(S);

			function addZero(x) {
				return x < 10 ? "0" + x : "" + x;
			}
		},
		//开启灰框
		kaiQiHuiKuang(data) {
			if (data) {
				this.popoverShow = true;
			}
		},
		//  邀请记录
		inviteRecordFun(page) {
			let p = {
				limit: 1000,
				page: 1
			}
			api.mypromotionlist(p).then(res => {
				if (res.status_code == 200) {
					this.janrecord = res.data.user_list
					this.janrecord.forEach((val, index) => {
						val.create_time = this.timeToDate(val.create_time);
						val.status = (val.status == 1 ? '已交易' : '未交易');
					});
					this.getKTNum = res.data.kt_count
					this.avilbedNum = Number(res.data.kt_count - res.data.able_kt_count);
					this.avilbedNum = this.avilbedNum ? this.avilbedNum.toFixed(8) : 0;
					this.total = res.data.user_count
				}

			})
		},
		// 邀请记录分页点击
		getPageNum1(page) {
			this.current1 = page
			this.inviteRecordFun(page)
		},
		//导出
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => v[j]))
		},
		exportData(evt) {
			if (this.janrecord.length == 0) {
				this.$Message.info('无邀请记录')
			} else {
				api.exportCsv().then(res => {
					this.excellist = res.data;
					this.excellist.forEach((val, index) => {
						val.create_time = this.timeToDate(val.create_time * 1000);
						val.status = (val.status == 1 ? '已交易' : '未交易');
					});
					require.ensure([], () => {
						const {
							export_json_to_excel
						} = require('@/vendor/Export2Excel');
						const tHeader = ['被邀请人账号', '时间', '状态'];
						const filterVal = ['name', 'create_time', 'status'];
						const list = this.excellist; //导入数据
						const data = this.formatJson(filterVal, list);
						export_json_to_excel(tHeader, data, '列表文本', '压缩文本');
					})
				}).catch(err => {
					console.log(err);
				})
			}
		},
		exportDatas() {
			if (this.janrecord1.length == 0) {
				this.$Message.info('无邀请记录')
			} else {
				this.$refs.table.exportCsv({
					filename: 'The original data'
				}, this.$Message.info('导出成功'));
			}
		},
		pullscroll() {
			let topDistance = document.getElementById('table-list').scrollTop;
			let boxHeight = document.getElementById('table-list').clientHeight;
			let distanceHeight = document.getElementById('table-list').scrollHeight;
			if (topDistance + boxHeight >= distanceHeight) {
				let params = {
					page: ++this.Page
				};
				if (this.open) {
					api.mypromotionlist(params).then(res => {
						this.oldArray = this.janrecord;
						this.grop = this.janrecord.length;
						if (res.status_code == 200) {
							this.newArray = res.data.user_list;
							this.newArray.forEach((val, index) => {
								val.create_time = this.timeToDate(val.create_time * 1000);
								val.status = (val.status == 1 ? this.$t(`message.Mypromotion.settled`) : this.$t(`message.Mypromotion.Unsettle`));
							});
							this.janrecord = this.oldArray.concat(this.newArray);
							this.open = false;
							if (this.grop == this.janrecord.length) {
								this.$Message.info('数据已全部加载')
							} else {
								this.open = true;
							}
						}
					}).catch(err => {

					})
				}
			}
		},
		pullscrolls() {
			let topDistance = document.getElementById('table-list1').scrollTop;
			let boxHeight = document.getElementById('table-list1').clientHeight;
			let distanceHeight = document.getElementById('table-list1').scrollHeight;
			if (topDistance + boxHeight >= distanceHeight) {
				let params = {
					page: ++this.Pages
				};
				if (this.opens) {
					api.mypromotionlist(params).then(res => {
						this.oldArrays = this.janrecord1;
						this.grops = this.janrecord1.length;
						if (res.status_code == 200) {
							this.newArrays = res.data.user_list;
							this.janrecord1 = this.oldArrays.concat(this.newArrays);
							this.opens = false;
							if (this.grops == this.janrecord1.length) {
								this.$Message.info('数据已全部加载')
							} else {
								this.opens = true;
							}
						}
					}).catch(err => {

					})
				}
			}
		},
		isPC() {
			var userAgentInfo = navigator.userAgent.toLowerCase()
			var Agents = ['android', 'iphone', 'symbianOS', 'windows phone', 'ipad', 'ipod']
			var flag = true
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break }
			}
			return flag
		}
	},
	mounted() {
		this.catch_info();
		this.MypromotionUrl()
		this.inviteRecordFun(1) // 邀请记录
		document.getElementById('table-list').addEventListener('scroll', this.pullscroll, true);
	},
	computed: {},
	filters: {
		idCardSecret: function (value) {
			if (value) {
				return `${value.substring(0, 3)}****${value.substring(14)}`;
			}
		}
	},
	watch: {

	}

}
</script>

<style scoped="scoped">
.copy-btn:hover {
	color: #f5c245;
}
.relative {
  position: relative;
}
.qrcode_img {
  width: 7.5rem;
  height: 7.5rem;
  margin: 0 0 0.5rem 0;
}
.asset-overview-wrap {
  /*width: 100%;
		height: 100%;
		overflow: hidden;
		background: #2A366B;*/
}

.asset-overview-wrap .overview-content {
  background: #586a9e;
  font-weight: 100;
}

.personal-wrap .link {
  padding: 0.5rem 0;
  font-size: 0.9rem;
}

.personal-wrap .line {
  display: inline-block;
  height: 1.55rem;
  width: 0.1rem;
  border: 1px solid #ffffff;
  position: absolute;
  top: 0.7rem;
  left: 21.5rem;
}

.personal-wrap .copy-link span {
  position: absolute;
  top: 0.95rem;
  right: 17rem;
  cursor: pointer;
}
.personal-wrap .copy-link .link_copy {
  width: 28.25rem;
  height: 3rem;
  border: 1px solid #fff;
  float: left;
}

.personal-wrap .copy-link {
  position: relative;
  margin: 0.5rem 0 0 0;
}

.personal-wrap .exclusive-code {
  float: right;
  width: 14rem;
  line-height: 3rem;
  background: #f5c245;
  text-align: center;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  cursor: pointer;
}

.overview-content .overview-center {
  float: left;
  width: 40%;
  margin: 1.1rem 0 0 0;
}

.overview-con .link-address {
  width: 22.5rem;
  line-height: 3rem;
  /*border: 1px solid #fff;*/
  background: none;
  color: #fff;
  padding: 0 0.5rem;
}

.personal-wrap .overview-center {
  margin: 0.75rem 0 0 4.4rem;
}

.overview-first .overview-right {
  margin: 1.1rem 0 0 2.25rem;
}

.personal-wrap .link-wrap {
  /*overflow: hidden;*/
  height: 5rem;
  margin: 0 auto;
  /*margin: 2rem 0 2.5rem 0;*/
}

.overview-con .container .go-authentica {
  color: rgba(255, 255, 255, 0.44);
}

.container .no-authentica {
  color: #fff;
  float: right;
  cursor: pointer;
}

.container .yellows {
  color: orange;
}

.container .gray {
  color: rgb(255, 255, 255, 0.4);
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

.overview-left img {
  display: inline-block;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-top: 0.5rem;
  /*border: 1px solid #000;*/
}

.overview-left .special {
  cursor: pointer;
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
  background: #84b0eb;
  color: #fff;
  font-size: 2.4rem;
  line-height: 4rem;
  text-align: center;
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
  background: #475e98;
  padding: 0.5rem;
  margin: 1.6rem 0;
  box-shadow: 0 1px 0.6rem 0 rgba(58, 71, 111, 0.8);
  border-radius: 0.2rem;
  /*border: 1px solid rgba(255, 255, 255, .16);*/
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
  color: #45537d;
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
  color: #45537d;
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
  background: #475e98;
  padding: 0.75rem 0.5rem;
  overflow: hidden;
  margin: 1.6rem 0;
  box-shadow: 0 1px 0.6rem 0 rgba(58, 71, 111, 0.8);
  border-radius: 0.2rem;
  /*border: 1px solid rgba(255, 255, 255, .16);*/
}

.overview-fourth .title {
  padding: 0 0 0.5rem 0;
  border-bottom: 1px solid #fff;
}

.overview-fourth .no-margin {
  margin-right: 0;
}

.overview-content .moneybagbody {
  background: #475e98;
  color: #fff;
  height: auto;
}

.overview-fifth .all-coin {
  line-height: 3rem;
  padding: 0 1.3rem;
  font-size: 0.9rem;
  background: #313e66;
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
  background: #c0eae4;
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
  border-bottom: 1px solid #dedada;
  font-size: 0.9rem;
}

.overview-content .walet-second {
  background: #fff;
}

.overview-content .title {
  margin: 0;
}

.overview-content .walet-second .title {
  color: #2e3b6f;
  font-weight: 600;
  display: inline-block;
}

.overview-content .red-node {
  color: #fb7070;
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
  color: #f5b821;
  text-align: center;
  border-right: 1px solid #dedada;
  margin: 1.2rem 0 1rem 0;
  line-height: 3.75rem;
}

.overview-content .walet-list .no-border {
  border: 0;
}

.overview-content .walet-list .right-node {
  font-family: PingFangSC-Medium;
  font-size: 0.7rem;
  color: #2f3c6f;
}

.overview-content .green-node {
  color: #42a73f;
}

.personal-wrap .overview-content {
  /*margin: 0 auto 2rem;*/
  padding: 2.5rem 3rem;
}

.personal-wrap .ivu-tabs-nav .ivu-tabs-tab {
  width: 150%;
}

.personal-wrap .overview-s {
  background: #95a4d7;
  margin: 0 0 0 0.25rem;
}

.personal-wrap .set-photo {
  font-size: 0.8rem;
  padding: 0.6rem 0 0 0;
}

.personal-wrap .overview-first {
  font-size: 0.8rem;
}

.personal-wrap .overview-right {
  padding: 3.4rem 0 0 0;
}

.personal-wrap .link-left {
  float: left;
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
  border-bottom: 0.0.1rem solid #ffffff;
  /*margin: 0 0 0.8rem 0;*/
  padding: 0.75rem 0;
  color: #fff;
}
.personal-wrap .identity-list li span {
  width: 32%;
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
  border: 1px solid #ffc432;
  border-radius: 0.15rem;
  color: #ffc229;
  padding: 0.25rem 0.6rem;
  cursor: pointer;
}

.personal-wrap .no-data {
  padding: 1.5rem 0 4rem 0;
  text-align: center;
  color: #d9d9d9;
  font-size: 0.8rem;
}

.account-set-two .overview-first {
  position: relative;
}

.personal-wrap .account-set-top {
  padding: 0 0 0.5rem 0;
}

.personal-wrap .blocks {
  display: inline-block;
  width: 4.3rem;
  height: 0.9rem;
  vertical-align: middle;
}

.personal-wrap .orange {
  background: #ffc369;
  border-radius: 0.1rem 0 0 0.1rem;
  margin-left: 1.25rem;
}

.personal-wrap .white {
  background: #f7f6f6;
  border-radius: 0 0.1rem 0.1rem 0;
}

.personal-wrap .account-set-three h1 {
  font-size: 0.9rem;
  padding: 0.5rem 0;
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

.overview-con
  .accountSettings
  .accountSettingInner
  .accountSecurity
  .accountSecurityPadding
  .accountSecurityContent {
  border: none;
}

.overview-con .accountSecurity .accountSecurityPadding .title2 {
  color: #fff;
}

.overview-con
  .accountSettings
  .accountSettingInner
  .accountSecurity
  .accountSecurityPadding
  .accountSecurityContent
  .accountSecurityContentDan
  .accountSecurityTitle
  .accountSecurityTitleLetter {
  color: #fff;
}

.overview-con
  .accountSettings
  .accountSettingInner
  .accountSecurity
  .accountSecurityPadding
  .accountSecurityContent
  .accountSecurityContentDan
  .accountSecurityContent1 {
  color: #fff;
}

.overview-con .accountSecurityContent1 {
  width: 13.3rem !important;
}

.overview-con .againSecurity {
  width: 4rem !important;
}

.overview-con .padding-20 {
  padding: 0 0 0 1.4rem;
}

.overview-con .padding-15 {
  padding: 0 17.2rem 0 0.75rem;
}

.overview-con .text-center {
  text-align: center;
}

.overview-con .text-right {
  text-align: right;
  padding-right: 0.5rem;
}

.overview-con .accountSecurityTitleIcon {
  width: auto !important;
  padding: 0 0.3rem 0 0;
}

.overview-con .accountSettings .accountSettingInner .accountSecurity {
  margin: 0;
}

.overview-con
  .accountSettings
  .accountSettingInner
  .accountSecurity
  .accountSecurityPadding
  .accountSecurityContent
  .accountSecurityContentDan {
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
  color: #333e63;
  font-size: 0.9rem;
  font-weight: 500;
}

.account-set-safety .ivu-tabs-nav .ivu-tabs-tab-active {
  color: #f5b821;
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
  top: 0.3rem;
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

.export {
  display: inline-block;
  height: 1.5rem;
  width: 3rem;
  line-height: 1.4rem;
  margin: 0.75rem 0;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 0.1rem;
  cursor: pointer;
}

.account-set-safety .identity-list {
  padding: 0 1.3rem 2rem 1.3rem;
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
  color: #2f3c70;
  font-size: 0.9rem;
  padding: 0.5rem 0.2rem;
  border-bottom: 1px solid #d9d9d9;
}

.partner-first .column .orange {
  font-size: 1.6rem;
  color: #f5b821;
  font-weight: 500;
  padding: 0.75rem 0 1rem 0;
}

.partner-first .column p {
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
  background: #1d2f6b;
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
  margin: 0.95rem 0.8rem 0 0;
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
  background: #475e98;
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
  color: #1b2c71;
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
  background: #cce3ec;
  color: #4e5e90;
  border-radius: 50%;
  font-weight: 400;
  margin: 1.3rem auto 0.5rem;
}

.service-left .account-set {
  width: 4.9rem;
  line-height: 1.7rem;
  text-align: center;
  border: 1px solid #1b2c71;
  border-radius: 0.2rem;
  margin: 0.5rem auto;
}

.service-left .history-time {
  padding: 0.5rem 0 0.7rem 0;
}

.service-first .service-right {
  width: 27.6rem;
  height: 13rem;
  background: #5165a4;
  padding: 0.75rem 0.9rem;
  position: relative;
  box-shadow: 0 1px 0.6rem 0 rgba(58, 71, 111, 0.8);
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
  color: #f5c245;
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
  background: #475e98;
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