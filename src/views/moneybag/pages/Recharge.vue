<template>
    <div class="recharge_box">
    	<div class="recharge-wrap">
        <div style="width: 50rem;box-sizing: border-box;padding-top: 0;padding-bottom:0rem;" class="recharge">
            <div class="recharge-header">
                <!--
                    <router-link to="/Moneybag">{{ coin_name }}充值</router-link>
                -->
                <a href="javascript:;">{{ coin_name }}充值</a>
                <!--<span>&nbsp;>>&nbsp;</span>
                <a>{{ $t(`message.MoneyBag.Deposit`) }}</a>-->
                <!--
                    <a v-show="true" @click="goBack" class="back">充值进度</a>
                -->
                <!--
                    <router-link tag="a" style="margin-left: auto;" target="_blank" class="back" :to="{ path: '/rechargerecord', query: { coin_id: coin_id } }">充值进度</router-link>
                -->
            </div>
            <div class="container">
                <div class="title"><!--({{coin_name}})充值-->
                    <!--<span class="changeDiv" v-show="!m"  @click="m = true">充值进度</span>-->
                    <!--<span class="changeDiv" v-show="m"  @click="m = false">返回</span>-->
                    <span class="left-des">请将{{ coin_name }}汇入如下二维码地址</span>
                    <span v-show="false" class="record">充值记录</span>
                </div>
                <div class="content">
                    <div class="recharge_boxleft" style="text-align: center;" v-show="!m">
                        <div class="QRcode">
                            <!-- <p>{{ $t(`message.MoneyBag.OrScanQRCode`) }}</p> -->
                            <!--<iframe id="iframe" ref="ifr" :src="qr_msg" style="width:5.2rem;height:5.2rem;border:0.1rem #FFF solid;" marginwidth="0" marginheight="0"></iframe>-->
                            <!-- 充值地址 -->
                           <div class="qrdes" :class="{'sing-qrdes': !this.prepaidLabelAddress.address}" v-show="this.prepaidAddress.address">
                           		<p >地址信息：</p>
                           		<img v-if="this.prepaidAddress.img" :src='this.prepaidAddress.img' class="code-img" marginwidth="0" marginheight="0">
                                <div v-else class="code-img"></div>
                           		<input class="qrdes-inp" type="text" :value="this.prepaidAddress.address" readonly>
                           		<span class="copy-btn" @click='copy' :data-clipboard-text="this.prepaidAddress.address">复制链接</span>
                           </div>
                           <!-- 标签地址 -->
                           <div class="qrdes" v-show="this.prepaidLabelAddress.address">
                           		<p style="text-align: left;">标签信息：</p>
                           		<img v-if="this.prepaidLabelAddress.img" :src='this.prepaidLabelAddress.img' class="code-img" marginwidth="0" marginheight="0">
                                <div v-else class="code-img"></div>
                           		<input class="qrdes-inp" type="text" :value="this.prepaidLabelAddress.address" readonly>
                           		<span class="copy-btn" @click='copy' :data-clipboard-text="this.prepaidLabelAddress.address">复制链接</span>
                           </div>
                        </div>
						<!--<div class="USDT">-->
                            <!--<p>请将 {{coin_name}} 汇入如下地址</p>-->
                            <!--<input style="width:20rem;margin-top: 1rem;" type="text" :value="location.split('_')[0]" readonly>-->
                        <!--</div>-->
                        <!--<p style="color: #FFF;font-size: 0.8rem;margin-top: 2rem;" v-show="location.split('_')[1]">标签：{{location.split('_')[1]}}</p>

                        <p style="color: #FFF;font-size: 0.7rem;margin-top: 2rem; color: #f3ba2f;" v-show="location.split('_')[1]">充值{{coin_name}}到KF同时需要一个充值地址和标签</p>-->

                        <!--<p class="attention" style="margin:2rem auto 0">请通过客户端或在线钱包将您需要充值的 {{coin_name}} {{ $t(`message.MoneyBag.PleaseOnlySupportSE`) }}</p>-->
                    </div>

                    <div class="footer-des">
                        <p style="font-size: 0.7rem;margin-bottom: 0.6rem;">温馨提示：</p>
                        <p style="font-size: 0.6rem; margin-bottom: 0.5rem" v-show="prepaidInfo[0]">{{ prepaidInfo[0] }}</p>
                        <p style="font-size: 0.6rem; margin-bottom: 0.5rem"  v-show="prepaidInfo[1]">{{ prepaidInfo[1] }}</p>
                        <p style="font-size: 0.6rem; margin-bottom: 0.5rem"  v-show="prepaidInfo[2]">{{ prepaidInfo[2] }}</p>
                    </div>
                    <!-- 充值进度 -->
                    <div v-show="true" class="mention-money-record">
                        <rechargeRecord :coinId="coin_id"></rechargeRecord>
                    </div>
                    <div v-show="m" class="recharge_detail_list">
                        <ul>
                            <li>充值数量</li>
                            <li>确认块数/总块数</li>
                            <li>交易hash</li>
                        </ul>
                        <ul v-for="(val, index) in list" :key="index">
                            <li>{{val.amount}}</li>
                            <li>{{val.block_count}}/{{val.all_block_count}}</li>
                            <li>{{val.transaction_hash}}</li>
                        </ul>
                    </div>
                    <!-- <div> -->
                        <!-- <p class="rechargeinfo" v-for="item in list" v-show="isshow">{{ $t(`message.MoneyBag.ConfirmedBlock`) }} <span>{{item.block_count}}</span> / {{ $t(`message.MoneyBag.AllRequiredConfirm`) }} <span>{{item.all_block_count}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t(`message.MoneyBag.CurrenciesAmount`) }} <span>{{item.amount}}</span></p> -->
                    <!-- </div> -->
                </div>
            </div>
        </div>
        <!-- 充值进度 -->
        <div v-show="false" class="mention-money-record">
            <rechargeRecord :coinId="coin_id"></rechargeRecord>
        </div>
        </div>
    </div>
</template>

<script>
import api from '../../../api.js'
import config from '../../../../static/config.json'
import { Base64 } from "js-base64";
import Clipboard from "clipboard";
import rechargeRecord from './rechargeRecord.vue'
export default {
    name: 'Recharge',
    data() {
        return {
            m: false,
            coin_name: '',
            coin_id: '',
            location: '',  // 地址链接 0xe9923996E59feD4d3D272A838E0B252FEE47Ea54
            confirmed: '',
            allconfirmed: '',
            currencynum: '',
            timeroutApi: null,
            size: 300,
            isshow: false,
            list: [],
            prepaidInfo: '', // 充值提示
            prepaidAddress: { // 充值地址
                address: '',
                img: ''
            },
            prepaidLabelAddress: { // 标签地址
                address: '',
                img: ''
            }
        }
    },
    components: {
        rechargeRecord
    },
    methods: {
        rechargeInfo() {
            let params = {
                coin_id: this.$route.query.coin_id // 当前充值id
            }
            // 获取当前充值信息
            api.rechargeInfo(params).then(res => {
                if (res.status_code == 200) {
                    this.coin_name = res.data.coin_name
                    this.location = res.data.wallet_addr
                    // 充值信息
                    if (this.location.split('_')[0]) {
                        this.prepaidAddress.address = this.location.split('_')[0];
                        api.rechargeInfoImg({ qr_msg: res.data.qr_msg }).then(res => {
                            if (res.code == 200) {
                                this.prepaidAddress.img = 'data:image/png;base64,' + res.data.QrCode;
                            }
                        }, err => {
                        }).catch(error => {
                            console.log(error)
                        });
                    }

                    if (this.location.split('_')[1]) {
                        this.prepaidLabelAddress.address = this.location.split('_')[1];
                        let base = Base64.encodeURI(this.location.split('_')[1]);
                        // this.prepaidLabelAddress.address = baseAddess.encode(this.location.split('_')[1]);
                        api.rechargeInfoImg({ qr_msg: base }).then(res => {
                            if (res.code == 200) {
                                this.prepaidLabelAddress.img = 'data:image/png;base64,' + res.data.QrCode;
                            }
                        }, err => {
                        }).catch(error => {
                             console.log(error)
                        });
                    }
                    // 充值底部提示
                    this.prepaidInfo = res.data.recharge_prompt.split(" ");
                    this.rechargeNotify()
                    this.timeroutApi = setInterval(() => {
                        this.rechargeNotify()
                    }, 3000);
                    // this.qr_msg = res.data.qr_msg
                }
            }).then(() => {
                // 获取充值二维码
                // api.rechargeInfoImg({ qr_msg: this.qr_msg }).then(res => {
                //     if (res.code == 200) {
                //         this.qr_msg = 'data:image/png;base64,' + res.data.QrCode
                //     }
                // })
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
                    this.list = res.data
                }
            })
        },
        copy(){ // 复制地址链接
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
        goBack() {
            this.$router.go(-1);
        }
    },
    mounted() {
        this.coin_id = this.$route.query.coin_id;
        this.rechargeInfo();
    },
    beforeDestroy() {
        //关闭定时器
        if (this.timeroutApi) {
            clearInterval(this.timeroutApi);
        }
    }
};
</script>
<style lang="scss" scoped>
.changeDiv {
  margin-left: 2.5rem;
  font-size: 0.7rem;
  background: #f3ba2f;
  color: #000;
  display: inline-block;
  width: 4rem;
  text-align: center;
  padding: 0.1rem 0;
  cursor: pointer;
  border-radius: 0.15rem;
}
.recharge_detail_list {
    width: 100%;
    overflow: hidden;
    color: #FFF;
    padding-bottom: 0.5rem;
    ul {
        width: 100%;
    }
    ul:nth-child(1) {
        color: #f3ba2f;
    }
    li {
        float: left;
        height: 1.9rem;
        line-height: 1.9rem;
    }
    li:nth-child(1) {
        width: 20%;
        text-align: center;
    }
    li:nth-child(2) {
        width: 20%;
        text-align: center;
    }
    li:nth-child(3) {
        width: 60%;
        text-align: center;
    }
}
/* 新添加 */
.recharge-wrap {
	overflow: hidden;
	width: 100%;
	height: 100%;
	padding: 2.4rem 0 2.25rem;
}
.recharge_box {
	width: 100%;
	background: url(../../../../static/img/homeBg.png) no-repeat top center;
	background-size: 100% 100%;
}
.recharge {
	background: #4E5E90;
}
.recharge_box .recharge-header {
    padding: 0.5rem 1rem 0.6rem 1.6rem;
    width: 43.5rem;
    height: 3rem;
	background: #1D2F6B;
    overflow: hidden;
    margin-bottom: 0;
    border-radius: 0;
    display: flex;
    align-items: center;
}
.recharge_box .recharge-header a.back {
    margin-right: 1rem;
    float: right;
}
.recharge_box .recharge-header a, .recharge-header span {
	color: #fff;
	font-size: 1rem;
}
.recharge_box .container {
    padding-bottom: 4rem;
	width: 100%;
	background: #4B5E94;
	box-shadow: 0 1px 0.6rem 0 #2E407B;
	border-radius: 0.1rem;
}
.recharge_box .title {
    padding-left: 1rem;
	border-bottom: 1px solid #fff;
    box-sizing: border-box;
}
.container .left-des {
	float: left;
}
.container .record {
	float: right;
	display: inline-block;
	width: 4rem;
	height: 1.4rem;
	font-size: 0.7rem;
	border: 1px solid #fff;
	border-radius: 0.1rem;
	text-align: center;
	line-height: 1.3rem;
	cursor: pointer;
}
.recharge_box .mention-money-record {
    margin-top: 1.5rem;
    padding: 0 1rem;
    width: 100%;
    background: #586a9e;
    box-sizing: border-box;
}
.recharge .QRcode {
	/*overflow: hidden;*/
	text-align: center;
	display: flex;
	width: 137%;
	margin: 3rem 0 0 0;
	justify-content: space-around;
}
.recharge .QRcode .qrdes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.recharge .QRcode .qrdes-inp {
	width: 17.85rem;
	height: 1.8rem;
	margin: 1.5rem 0;
	background: none;
	border: 1px solid #FFFFFF;
	border-radius: 0.2rem;
	color: #fff;
	padding: 0 0.25rem;
}
.recharge .QRcode .sing-qrdes {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.recharge .code-img {
	width:8.75rem;
	height:8.75rem;
	background: #fff;
}
.recharge .copy-btn {
	display: block;
	width: 8.8rem;
	height: 2.5rem;
	text-align: center;
	line-height: 2.5rem;
	background: #F5C245;
	border-radius: 0.2rem;
	margin: auto;
	color: #fff;
	font-size: 0.8rem;
	cursor: pointer;
}
.recharge_box .QRcode p {
	font-size: 0.9rem;
	padding-right: 4rem;
}
.recharge_box .container .content {
	display: block;
}
.recharge .content .footer-des {
	width: 100%;
	color: #fff;
	text-align: left;
	border-top: 1px solid #fff;
	margin: 2.5rem 0 0 0;
	padding: 0.7rem 1rem;
	font-family: PingFangSC-Regular;
    word-break: break-all;
}
.recharge_box .recharge-header {
    width: 100%;
}
.recharge_box .container {
    background: #586a9e;
    min-height: 0;
}
</style>
