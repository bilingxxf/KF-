<template>
	<div>
		<div class="asset-overview-wrap personal-wrap">
      		<div class="asset-overview-main">
      		<div class="asset-header">
	      		<Tabs value="name1" :animated="false">
			        <TabPane label="账户信息" name="name1">
			        	<accountInfo></accountInfo>
			        </TabPane>
			        
			        <TabPane label="账户安全" name="name2">
			        	<accountSafety></accountSafety>
			        </TabPane>
			        
			        <TabPane label="邀请信息" name="name3">
			        	<inviteInfo></inviteInfo>
			        </TabPane>
			    </Tabs>
	      	</div>
      	</div>
      </div>
	</div>
</template>
<script>
import iView from 'iview'
import accountInfo from './PersonalSettingsPopover/accountInfo'
import accountSafety from './PersonalSettingsPopover/accountSafety'
import inviteInfo from './PersonalSettingsPopover/inviteInfo'
import api from '../api'
export default{
	data(){
		return{}
	},
	components:{
		iView,
		accountInfo,
		accountSafety,
		inviteInfo
	}
}
</script>
<style scoped="scoped">
.asset-overview-wrap {
	width: 100%;
	height: 100%;
	overflow: hidden;
	/*background: url(../../static/img/homeBg.png) no-repeat top center;*/
	/*background-size: 100% 100%;*/
}
.asset-overview-main {
	width: 50rem;
	margin: 2.4rem auto;
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
	padding: 0.75rem 0.5rem;
	margin: 1.6rem 0;
	box-shadow: 0.35rem 0.35rem 2.55rem -0.5rem rgb(0,0,0);
	border-radius: 0.2rem;
	border: 1px solid rgba(255,255,255,.16);
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
	box-shadow: 0.35rem 0.35rem 2.55rem -0.5rem rgb(0,0,0);
	border-radius: 0.2rem;
	border: 1px solid rgba(255,255,255,.16);
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
.personal-wrap .link {
	padding: 0.5rem 0;
	font-size: 0.9rem;
}
.personal-wrap .copy-link {
	position: relative;
}
.personal-wrap .link-left {
	float: left;
}
.personal-wrap .copy-link span {
	position: absolute;
	top: 0.6rem;
	right: 18.25rem;
	cursor: pointer;
}
.personal-wrap .line {
	display: inline-block;
	height: 1.55rem;
	width: 0.1rem;
	border: 1px solid #FFFFFF;
	position: absolute;
	top: 0.7rem;
	left: 20rem;
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
.personal-wrap .container .no-authentica {
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
.container .authentica-method {
	width: 7.5rem;
}
.container .name-value {
	padding: 0 0 0 2rem;
}
.container .no-authentica {
	color: rgba(255, 255, 255, .44);
	float: right;
}
.container .go-authentica {
	color: #fff;
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
.choose-time .ivu-input {
	width: 7rem !important;
	height: 1.5rem;
	margin: 0.75rem 0;
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
.account-set-safety .container .authentica-method {
	width: 43%;
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
.partner-second .ivu-input-icon-normal+.ivu-input {
	padding: 0;
	text-align: center;
	margin: 0.95rem 0 0 0;
	width: 4.5rem;
	height: 1.2rem;
	background: none;
	border-radius: 0.1rem;
	border: 1px solid #fff;
	color: #fff;
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
