<template>
    <div>
        <Content>
            <!--  rechargeInfo 1-->
            <div class="order  order-lw666">
                <div class="order-content">
                    <div class="order-left" :model="orderDetail">
                        <div class="order-left-top">
                            <p class="order_num">{{ $t(`message.OrderS`) }}：{{orderDetail.otc_transac_sn}}</p>
                            <h2 class="order-h">
                                <!--{{orderDetail.buyer}}   orderDetail.coin_name  ==BTC  -->
                                {{ $t(`message.OTCOrder.BuyFrom`) }}{{seller}} {{orderDetail.customer_identification_name ? `(${orderDetail.customer_identification_name})` : ''}} {{status}} {{orderDetail.transac_coin_number_str}} {{orderDetail.coin_name}}
                            </h2>
                            <p class='unit_price'>{{ $t(`message.OTCBeal.UnitPrice`) }}：{{orderDetail.transac_coin_unit_price_str}} {{orderDetail.currency_name}}/{{orderDetail.coin_name}}</p>
                            <p class="total_amount">{{ $t(`message.OTCOrder.Amount`) }}：
                                <span>{{orderDetail.transac_currency_number}} {{orderDetail.currency_name}}</span>
                            </p>
                        </div>
                        <div class="order-left-bottom">
                            <!-- <p class="order-left-bottom-p">卖方收款方式：</p> -->
                            <p v-if="this.$route.query.type == 'buy'" class="order-left-bottom-p">卖方收款方式：</p>
                            <p v-if="this.$route.query.type == 'sell'" class="order-left-bottom-p">买方付款方式：</p>
                            <!--银行卡-->
                            <RadioGroup v-model="wayPay" @on-change="change" v-if="!(orderDetail.otc_transac_status == 3)">
                                <!-- ETH -->
                                <!-- eth  && orderDetail.advertiser_user_id == orderDetail.user_id   payList[0].payMethod.alipay.length == 0 "-->
                                <div v-if="orderDetail.coin_name  == 'KT'  && orderDetail.otc_advertisement_type == 1 && orderDetail.payMethod.alipay != null " class="bank_cards">

                                    <Radio :label=" payList.length > 0 && payList[0].user_account_alipay_id + '/alipay' " :disabled='orderDetail.otc_transac_status != 1' style="width:8.45rem">
                                        <span class="icon_eth"><img src="../../../static/img/eth_icon.png" alt=""></span>
                                        <span class="card">ETH</span>
                                    </Radio>

                                    <span class="n_card">{{ethList.account_name}}</span>
                                    <span class="n_card">{{ethList.wallet_addr}}</span>
                                    <!--<span class="n_card" style="color: #f3ba2f;cursor: pointer" @click="payClick(pay_way.alipay_qrcode,'alipay')">点击支付</span>-->
                                    <!-- 解决ETH二维码加载时闪烁  v-cloak -->
                                    <span class="n_card"><img :src="qr_msg" @click="ETH_er" style="width: 1rem;height: 1rem" /></span>
                                </div>
                                <!-- 支付宝 -->
                                <div v-else v-for="pay_way in payList" class="bank_cards">
                                    <Radio :label="pay_way.user_account_alipay_id + '/alipay'" :disabled='orderDetail.otc_transac_status != 1'>
                                        <span class="icon icon-pay"></span>
                                        <span class="card">{{ $t(`message.AliPay`) }}</span>
                                    </Radio>
                                    <span class="n_card">{{pay_way.account_name}}</span>
                                    <span class="n_card">{{pay_way.alipay_account_name}}</span>
                                    <!--<span class="n_card" style="color: #f3ba2f;cursor: pointer" @click="payClick(pay_way.alipay_qrcode,'alipay')">点击支付</span>-->
                                    <span class="n_card"><img :src="pay_way.alipay_qrcode" @click="payClick(pay_way.alipay_qrcode,'alipay')" style="width: 1rem;height: 1rem" /></span>
                                </div>

                                <div class="bank_cards" v-for="pay_way in bankList">
                                    <Radio :label="pay_way.user_account_bank_id + '/bank'" :disabled='orderDetail.otc_transac_status != 1'>
                                        <span class="icon icon-card"></span>
                                        <span class="card">{{ $t(`message.BankCard`) }}</span>
                                    </Radio>

                                    <span class="n_card">{{pay_way.account_name}}</span>
                                    <span class="n_card">{{pay_way.bank_code}}</span>
                                    <!-- <span class="n_card">{{pay_way.bank_name}}</span> -->
                                    <!-- 显示具体支行 -->
                                    <span class="n_card">{{pay_way.bank_name}}{{pay_way.bank_branch}}</span>
                                    <span class="n_card"></span>
                                    <!-- bank_branch -->
                                </div>

                                <div class="bank_cards" v-for="pay_way in paypalList">
                                    <Radio :label="pay_way.user_account_paypal_id + '/paypal'" :disabled='orderDetail.otc_transac_status != 1'>
                                        <span class="icon icon-paypal"></span>
                                        <span class="card">paypal</span>
                                    </Radio>
                                    <span class="n_card">{{pay_way.account_name}}</span>
                                    <span class="n_card">{{pay_way.paypal_account}}</span>
                                    <span class="n_card">paypal</span>
                                    <span class="n_card"></span>
                                </div>

                                <div class="bank_cards" v-for="pay_way in wechatList">
                                    <Radio :label="pay_way.user_account_wechatpay_id + '/wecahtpay'" :disabled='orderDetail.otc_transac_status != 1'>
                                        <span class="icon icon-wechat-pay"></span>
                                        <span class="card">微信</span>
                                    </Radio>
                                    <span class="n_card">{{pay_way.account_name}}</span>
                                    <span class="n_card">{{pay_way.wechatpay_account}}</span>
                                    <!--<span class="n_card" style="color: #f3ba2f;cursor: pointer" @click="payClick(pay_way.wechatpay_qrcode,'wechat')">点击支付</span>-->
                                    <span class="n_card"><img :src="pay_way.wechatpay_qrcode" @click="payClick(pay_way.wechatpay_qrcode,'wechat')" style="width: 1rem;height: 1rem" /></span>
                                </div>
                            </RadioGroup>

                            <!--订单状态-->
                            <p class="bank_cards" v-if="orderDetail.otc_transac_status == 0">
                                <button class="cancel_btn">订单已取消，无法查看支付信息</button>
                            </p>

                            <h2 class="await_pay" v-if="orderDetail.otc_transac_status == 1 && this.$route.query.type == 'buy'">待支付，请于
                                <span class="await_pay_time">{{minute}}分{{second}}秒</span> 内支付
                                <span class="await_pay_money">{{orderDetail.transac_currency_number}}{{orderDetail.currency_name}}</span>
                                <span class="await_pay_refe">付款参考号：
                                    <i class="tail_num">{{orderDetail.otc_transac_sn}}</i>
                                </span>
                            </h2>
                            <h2 v-if="orderDetail.otc_transac_status == 1 && this.$route.query.type == 'sell'">待支付，{{seller}}将于
                                <span>{{minute}}分{{second}}秒</span>内支付
                                <span>{{orderDetail.transac_currency_number}}{{orderDetail.currency_name}}</span>，付款参考号：{{orderDetail.otc_transac_sn}}</h2>

                            <h2 v-if="orderDetail.otc_transac_status == 2 && this.$route.query.type == 'buy' " class="otc_call otc_being">
                                <span class="tail_num_color">付款参考号：</span>
                                <i class="tail_num">{{orderDetail.otc_transac_sn}}</i>
                                <span class="now_ing">对方正在放币</span>
                            </h2>
                            <h2 v-if="orderDetail.otc_transac_status == 3 " class="otc_call">
                                <i class="otc_call_f ">订单已取消，无法查看相关信息</i>
                                <i class="otc_call_s">付款参考号：
                                    <span class="otc_call_p"> {{orderDetail.otc_transac_sn}} </span>
                                </i>
                            </h2>
                            <h2 v-if="orderDetail.otc_transac_status == 4">订单已冻结，付款参考号：
                                <i class="tail_num">{{orderDetail.otc_transac_sn}}</i>
                            </h2>
                            <!-- <h2 v-if="orderDetail.otc_transac_status == 5">订单已完成，付款参考号：{{orderDetail.otc_transac_sn}}</h2> -->
                            <h2 v-if="orderDetail.otc_transac_status == 5" class="otc_call" style="margin-bottom:1rem;">
                                <i class="otc_call_s">付款参考号：
                                    <span class="otc_call_p"> {{orderDetail.otc_transac_sn}}</span>
                                </i>
                            </h2>

                            <p class="pay_btn" v-if="orderDetail.otc_transac_status == 1 && this.$route.query.type == 'buy'">
                                <i-button type="info" @click="pay('paid')" class="await_pay_btn">我已付款</i-button>
                                <!-- <span class="triangle_border_left"></span> -->
                                <!-- <i-button type="text">付款成功后，请点击按钮告知对方</i-button> -->
                            </p>
                            <!--<p class="pay_btn" v-if="orderDetail.otc_transac_status == 1 && this.$route.query.type == 'sell'">-->
                            <!--<i-button type="info" disabled>待付款</i-button>-->
                            <!--<span class="triangle_border_left"></span>-->
                            <!--<i-button type="text">付款成功后，请点击按钮告知对方</i-button>-->
                            <!--</p>-->
                            <!--<p class="pay_btn" v-if="orderDetail.otc_transac_status == 2 && this.$route.query.type == 'buy'">-->
                            <!--<i-button type="info" disabled>待放币</i-button>-->
                            <!--<span class="triangle_border_left"></span>-->
                            <!--<i-button type="text">订单已支付，请等待卖家放币</i-button>-->
                            <!--</p>-->
                            <!---->
                            <p class="pay_btn" v-if="orderDetail.otc_transac_status == 2 && this.$route.query.type == 'sell'">
                                <span class="pay_hint_new">对方已支付，成功付款 {{orderDetail.transac_currency_number}} CNY,请及时确认收款并放币</span>
                                <Button @click="isCurrency('finish')" class="pay_btn_ok" style="text-align: center;width: 6rem">确认收款并放币</Button>
                                <!-- <span class="triangle_border_left isCurrency"></span>
                    <i-button type="text">订单已支付，等待放币</i-button> -->
                            </p>
                            <p style="margin-top: 1.5rem;display: flex;height: 1.5rem;line-height: 1.5rem" v-if="orderDetail.transac_buyer_score > 0 && this.$route.query.member == 'user'">
                                <span style="margin-right: 0.75rem;font-size:0.7rem;margin-top:0.1rem">评价：</span>
                                <Rate show-text v-model="orderDetail.transac_buyer_score" disabled />
                            </p>
                            <p style="margin-top: 1.5rem;display: flex;height: 1.5rem;line-height: 1.5rem" v-if="orderDetail.transac_seller_score > 0 && this.$route.query.member == 'advertiser'">
                                <span style="margin-right: 0.75rem;font-size:0.7rem;margin-top:0.1rem">评价：</span>
                                <Rate show-text v-model="orderDetail.transac_seller_score" disabled />
                            </p>
                            <!--
                <p class="pay_btn" v-if="orderDetail.otc_transac_status == 5 && orderDetail.transac_buyer_score == 0 && this.$route.query.member == 'user'">
                    <i-button type="info" @click="evaluate">待评价</i-button>
                    <span class="triangle_border_left"></span>
                    <i-button type="text">订单已完成，请评价</i-button>
                </p>
                -->
                            <!--
                <p class="pay_btn" v-if="orderDetail.otc_transac_status == 5 && orderDetail.transac_seller_score == 0 && this.$route.query.member == 'advertiser'">
                    <i-button type="info" class="await_eval" @click="evaluate">待评价</i-button>
                    <span class="triangle_border_left"></span>
                    <i-button type="text">订单已完成，请评价</i-button>
                </p>
                -->
                            <p class="pay_btn" v-if="orderDetail.otc_transac_status == 5 && orderDetail.transac_buyer_score != 0 && this.$route.query.member == 'user'">
                                <i-button type="info" disabled>已完成</i-button>
                                <!--<span class="triangle_border_left"></span>-->
                                <!--<i-button type="text">订单已完成</i-button>-->
                            </p>
                            <p class="pay_btn" v-if="orderDetail.otc_transac_status == 5 && orderDetail.transac_seller_score != 0 && this.$route.query.member == 'advertiser'">
                                <i-button type="info" disabled>已完成</i-button>
                                <!--<span class="triangle_border_left"></span>-->
                                <!--<i-button type="text">订单已完成</i-button>-->
                            </p>
                            <p class='cancel cancel_new' v-if="this.$route.query.type == 'buy' && orderDetail.otc_transac_status != 7 && orderDetail.otc_transac_status != 6" style="margin-top: 1rem">
                                <span @click="cancelOrder" v-if="orderDetail.otc_transac_status == 1 || orderDetail.otc_transac_status == 2" style="color:#638bd4;font-size:0.7rem;">订单取消</span>
                            </p>
                            <!-- v-if="this.$route.query.type == 'buy'"  -->
                            <p class="prompt_word" v-if="orderDetail.otc_transac_status == 3 ">
                                <!-- 当你进入交易时，卖家的数字资产会被锁定在平台的钱包中，因此不必担心给卖家付款。 -->
                                <img src="../../../static/img/icon-guanbi.png" alt="">
                                <span class="prompt_word_s">交易取消</span>
                            </p>
                            <p class="prompt_word await_pay_ok" v-if="orderDetail.otc_transac_status == 5 ">
                                <!-- 当你进入交易时，卖家的数字资产会被锁定在平台的钱包中，因此不必担心给卖家付款。 -->
                                <img src="../../../static/img/icon-ok.png" alt="">
                                <span class="prompt_word_g">交易完成</span>
                            </p>
                            <p class="prompt_word await_pay_ok" v-if="orderDetail.otc_transac_status == 6 ">
                                <!-- 当你进入交易时，卖家的数字资产会被锁定在平台的钱包中，因此不必担心给卖家付款。 -->
                                <img src="../../../static/img/icon-ok.png" alt="">
                                <span class="prompt_word_g">客服交易完成</span>
                            </p>
                            <p class="prompt_word" v-if="orderDetail.otc_transac_status == 7 ">
                                <!-- 当你进入交易时，卖家的数字资产会被锁定在平台的钱包中，因此不必担心给卖家付款。 -->
                                <img src="../../../static/img/icon-guanbi.png" alt="">
                                <span class="prompt_word_s">客服交易取消</span>
                            </p>
                            <p class="prompt_word" v-if="this.$route.query.type == 'sell'">
                                当您进入交易时，在确认放币之前务必确定买方是否已付款到账，若您未收到款项，但买家已点击’已付款‘按钮，请及时联系我们，我们客服团队会帮助您
                            </p>

                        </div>
                    </div>
                    <div class="order-right">
                        <div class="order-left-head">
                            <div class="head_img" :model="user_info">
                                <p v-if="user_info.user_avatar"><img :src="user_info.user_avatar" class="user_img"></p>
                                <div class="user_img" style="line-height: 1.7rem;text-align: center;font-size: 0.8rem;background: #f3ba2f" :style="{ background: user_info.user_color }" v-else>{{user_info.user_avatar_none}}</div>

                                <div class="head_name">
                                    <!-- 9.11 用户名后面添加手机号 -->
                                    <p>{{user_info.user_name}}
                                        <span style="padding-left:0.5rem">{{user_info.phone_number}}</span>
                                    </p>
                                </div>
                            </div>
                            <!--<p><span class="icon-phone"></span></p>-->
                        </div>
                        <div class="order-left-center">
                            <div class="order-left-center-content" id="data-list-content">
                                <div id="data-list-container">
                                    <div v-for="item in chatList">
                                        <!-- <div v-for="item in demoData"> -->
                                        <div class="section right" v-if="item.from_user_id == user_id">

                                            <div class="avator right" :style="{ background: item.user_color }" style="background: #f3ba2f">
                                                <img :src="item.user_avatar" v-if="item.user_avatar">
                                                <span v-else>{{item.from_user_name}}</span>
                                            </div>
                                            <div class="dialog-left">
                                                <!-- <p v-html="item.chat_body" @click="download(item.chat_body)"></p>      -->
                                                <p v-html="filter(item.chat_body)" @click="download(item.chat_body)"></p>
                                            </div>

                                        </div>
                                        <!-- v-show="isNullShow" -->
                                        <div class="section left" v-else>

                                            <div class="avator" :style="{ background: item.user_color }" style="background: #f3ba2f">
                                                <!--{{item.from_user_name}}-->
                                                <!--{{to_user_name}}-->
                                                <img :src="item.user_avatar" v-if="item.user_avatar">
                                                <span v-else>{{item.from_user_name}}</span>
                                            </div>
                                            <div class="dialog">
                                                <!-- <p v-html="item.chat_body" @click="download(item.chat_body)"></p> -->
                                                <p v-html="filter(item.chat_body)" @click="download(item.chat_body)"></p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order-left-foot">
                            <input type="text" v-model="dialogContent" @keyup.enter="send" placeholder="输入信息，回车发送" :maxlength="30">
                            <Upload :action="FileUrl" accept="image/*" :on-success="getUrl" :before-upload="handleUpload" :show-upload-list="false" style="width: 1.5rem;cursor: pointer">
                                <span class="icon-paper_clip"></span>
                            </Upload>
                        </div>
                    </div>
                </div>
                <!--标记已付款-->
                <model v-show="showTab" @hide="hide">
                    <div slot="modelSlotHeader">
                        <p class="titleModel">确认支付</p>
                    </div>
                    <div slot="modelSlotContent">
                        <div class="modelContent">
                            <!--<p>确认支付后,订单将进入放币状态</p>-->
                            <!--<P>如果你没有进行线下向广告主支付，请不要点击已付款，否则将造成交易纠纷，造成后果自理</P>-->
                            <p>如未完成线下向对方支付，请不要点击已付款按钮。</p>
                        </div>
                    </div>
                    <div slot="modelSlotFooter">
                        <div class="footBtn">
                            <Button type="primary" class="buy_btn" @click.stop="finish">确认打款</Button>
                            <span @click="showTab = false">{{ $t(`message.BaseInfo.Cancel`) }}</span>
                        </div>
                    </div>

                </model>
                <!--待放币-->
                <model v-show="showCurrency" @hide="hideCurrency">
                    <div slot="modelSlotHeader">
                        <p class="titleModel">确认已收款并放币</p>
                    </div>
                    <div slot="modelSlotContent">
                        <div class="modelContent">
                            <p>请务必登录网上银行或第三方支付账号确认收到该笔款项</p>
                            <p>
                                <span style="color:#999">资金密码</span>
                            </p>
                            <p><input type="password" style="border: 1px solid #eeeeee;width: 22.5rem;height: 2rem;padding-left: 1rem" v-model="PN_password" /></p>
                        </div>
                    </div>
                    <div slot="modelSlotFooter">
                        <div class="footBtn">
                            <Checkbox v-model="single">我确认已登录收款账户，并核对收款无误</Checkbox>
                            <Button type="primary" class="buy_btn" @click="pin_finish" style="margin-left: 4rem">确认放币</Button>
                            <!--<span @click="showCurrency = false">{{ $t(`message.BaseInfo.Cancel`) }}</span>-->
                        </div>
                    </div>

                </model>
                <!--取消订单-->
                <model v-show="showCancel" @hide="hideCancel">
                    <div slot="modelSlotHeader">
                        <!--<p class="Tab1_titleModel">如您已向卖家付款，请千万不要取消订单,否则订单将无法正常完成</p>-->
                        <p class="Tab1_titleModel">订单取消</p>
                    </div>
                    <div slot="modelSlotContent">
                        <div class="modelContent">
                            <!--<p>取消订单后，将不能再进行支付和提币</p>-->
                            <!--<P>如果你已经向广告主打款请千万不要点击取消，否则将造成订单不能正常完成</P>-->
                            <!--<p>取消规则：买方24小时内累计3笔取消，将会限制24小时内的买入功能。</p>-->
                            <p>

                                <Checkbox v-model="payCheck">我确认尚未向对方支付任何款项</Checkbox>
                            </p>
                            <p>取消规则：
                                <span v-if="this.$route.query.member == 'advertiser'">多次取消会影响商户信用，请谨慎操作。</span>
                                <span v-if="this.$route.query.member == 'user'">买方24小时内累计3笔取消，
                                    <em style="color:#f40;font-style: normal;">将会限制24小时内的买入</em>功能。</span>
                            </p>
                        </div>
                    </div>
                    <div slot="modelSlotFooter">
                        <div class="footBtn">
                            <Button type="primary" class="buy_btn" @click="waitCheck">确认取消</Button>
                            <span @click="showCancel = false">我再想想</span>
                        </div>
                    </div>
                </model>
                <!--  待评价-->
                <model v-show="evaluateShow" @hide="evaluateHide">
                    <div slot="modelSlotHeader">
                        <p class="titleModel">评价确认</p>
                    </div>
                    <div slot="modelSlotContent">
                        <div class="modelContent">
                            <div style="display: flex;line-height: 1.5rem;margin: 2rem 0;height: 1.5rem">
                                <span style="margin-right: 1.5rem">评价</span>
                                <Rate show-text v-model="valueText" />
                            </div>
                        </div>
                    </div>
                    <div slot="modelSlotFooter">
                        <div class="footBtn">
                            <Button type="primary" class="buy_btn" @click="sureStar">确认评价</Button>
                            <span @click="evaluateShow = false">{{ $t(`message.BaseInfo.Cancel`) }}</span>
                        </div>
                    </div>
                </model>

                <!--支付二维码-->

                <model v-show="payShow" @hide="payHide" @bodyHide="payHide">
                    <div slot="modelSlotHeader">
                        <!--<p class="titleModel">扫码支付</p>-->
                        <!--<p class="titleModel" style="text-indent: 2em;margin-top: 0.5rem;color: #999;font-size: 0.7rem">请使用{{payWay}}二维码支付</p>-->
                    </div>
                    <div slot="modelSlotContent">
                        <div>
                            <div style="text-align: center">
                                <img :src="pay_code" width="250" height="250">
                            </div>
                        </div>
                    </div>
                    <div slot="modelSlotFooter" style="margin-top: -2rem">
                        <!--<div class="footBtn" style="width: 23rem">-->
                        <!--&lt;!&ndash;<p class="titleModel" style="text-indent: 2em;color: #999;font-size: 0.7rem">支付成功后，请务必点击已付款，否则将会造成交易纠纷，后果自理</p>&ndash;&gt;-->
                        <!--</div>-->
                    </div>
                </model>
                <!--ETH二维码 v-show="ETHShow" -->
                <div v-show="ETHShow" class="eth_isshow_model_" @click.stop="ETH_er_show()">
                    <div class="eth_isshow_model_div" @click.stop="demo_Eth_er">
                        <span @click="ETH_er_x" class="icon-wrong"></span>
                        <img :src="qr_msg" width="250" height="250">
                    </div>
                </div>
            </div>
        </Content>
    </div>
</template>
<script>
import Model from "../model/Model.vue";
import http from "./../../reject";
import api from "./../../api";
import resHost from "../../../static/config.json";
import resOnline from "../../../static/configOnline.json";
import $ from "jquery";

var flag = true;
export default {
    data() {
        return {
            // isNullShow: true,  // 空默认回复语
            payCheck: false,
            otc_transac_status: null,
            currentWay: "",
            number: 1,
            single: false,
            PN_password: "",
            wayPay: "",
            FileUrl: "",
            valueText: 5,
            payWay: "",
            status: null,
            showTab: false,
            showCancel: false,
            evaluateShow: false,
            showCurrency: false, //待放币
            payShow: false,
            chatList: [],
            user_info: {},
            timer: null,
            timerClear: null,
            dialogContent: "",
            user_id: "",
            from_user_avatar: "",
            from_user_avatar_none: "",
            to_user_name: "",
            pay_code: "",
            payWay: "",
            orderDetail: {
                buyer: "",
                seller: ""
            },
            seller: "",
            payList: [],
            bankList: [],
            paypalList: [],
            wechatList: [],
            ethList: {}, // 9.12 新加ETH信息
            qr_msg: "", // 9.12 KT 二微码
            ETHShow: false, //  大二微码
            er_is_show: {},
            minutes: 0,
            seconds: 0,
            timeLag: 0,
            time: null,
            codeUrl: "",
            sendF: true,
            // json
            jsonImg: '',
            json_Img: false,
            demoData: [
                {
                    chat_body: '{"body":"/chat_pic/20181109/mxzfbkjlkardhbqpmhjnvkcgjbpduezy.png","height":"355","width":"200","type":"true"}',
                    created_at: 1541775925,
                    from_user_id: 385,
                    from_user_name: "测试卖一",
                    otc_transac_chat_id: 986,
                    otc_transac_id: 10772,
                    to_user_id: 359,
                    to_user_name: "demo",
                    updated_at: 1541775925,
                    user_color: "#B5FF91",
                },
                {
                    chat_body: '{&quot;body&quot;:&quot;夺夺&quot;,&quot;type&quot;:&quot;false&quot;}',
                    created_at: 1541775925,
                    from_user_id: 385,
                    from_user_name: "测试卖一",
                    otc_transac_chat_id: 985,
                    otc_transac_id: 10772,
                    to_user_id: 359,
                    to_user_name: "demo",
                    updated_at: 1541775925,
                    user_color: "#B5FF91",
                }
            ],

        };
    },
    components: {
        Model
    },
    watch: {
        second: {
            handler(newVal) {
                this.num(newVal);
            }
        },
        minute: {
            handler(newVal) {
                this.num(newVal);
            }
        }
    },
    computed: {
        second() {
            return this.num(this.seconds);
        },
        minute() {
            return this.num(this.minutes);
        },

    },
    methods: {
        filter(val) {
            const onLine = this.$store.state.onLine;
            let demo = '{&quot;body&quot;:&quot;名额&quot;,&quot;type&quot;:&quot;false&quot;}'
            // console.log('的' === '的');
            try {
                val = JSON.parse(val.replace(/&quot;/g, '"'));
                console.log(val);
                console.log(val.type);
                if (typeof val === "number") return val;
                // val = val
                // .replace(">", "&gt;")
                // .replace("<", "&lt;")
                // .replace(" ", "&nbsp;")
                // .replace("'", "&#39;")
                // .replace("\\", "\\\\")
                // .replace("\n", "\\n")
                // .replace("\r", "\\r");
                if (val.type === "true") {
                    console.log(val.type + "::img");
                    // return '<img style="width:' + val.width +'px;height: '+ val.height +'px" src='+ (onLine ? '' : 'http://192.168.2.211:29080/' ) + val.body +' />';
                    return '<img style="width:' + val.width + "px;height: " + val.height + 'px" src=' + "https://static.bitboole.com" + val.body + " />"
                } else if (val.type === "false") {
                    console.log(val.type + "::font");
                    return val.body;
                }
            } catch (e) {
                return val;
            }
        },

        demo_Eth_er() { },
        ETH_er_x() {
            //ETH 变小二微码
            this.ETHShow = false;
        },
        ETH_er() {
            // ETH 放大二微码
            this.ETHShow = true;
        },
        ETH_er_show() {
            // ETH 变小二微码
            this.ETHShow = false;
        },
        change(value) {
            this.currentWay = value;
        },
        num(n) {
            return n < 10 ? "0" + n : "" + n;
        },
        add() {
            var _this = this;
            this.time = window.setInterval(function () {
                if (_this.seconds === 0 && _this.minutes !== 0) {
                    _this.seconds = 59;
                    _this.minutes -= 1;
                } else if (_this.minutes === 0 && _this.seconds === 0) {
                    _this.minutes === 0;
                    _this.seconds = 0;
                    window.clearInterval(_this.time);
                    // this.transactionDetail();
                    if (_this.otc_transac_status == 1) {
                        _this.wait();
                    }
                } else {
                    _this.seconds -= 1;
                }
            }, 1000);
        },
        payClick(pay_qrcode, payWay) {
            //支付二维码
            // const domain = window.location.origin;
            // let urlFile;
            // if (domain.indexOf('localhost') == -1) {
            //     urlFile = resOnline.code
            // }else{
            //     urlFile = resHost.code
            // }
            this.pay_code = pay_qrcode;

            if (payWay == "alipay") {
                this.payWay = "支付宝";
            } else if (payWay == "wechat") {
                this.payWay = "微信";
            }
            this.payShow = true;
        },
        sureStar() {
            //评价确认
            let params = {
                otc_transac_id: this.$route.query.otc_transac_id,
                type: this.$route.query.member,
                score: this.valueText
            };
            api.updateScore(params).then(res => {
                if (res.status_code == 200) {
                    this.$Message.success("成功");
                    this.evaluateShow = false;
                    this.transactionDetail();
                }
            });
        },
        evaluate() {
            //待评价弹框
            this.evaluateShow = true;
        },
        pay(way) {
            this.payWay = way;
            this.showTab = true;
        },
        isCurrency(way) {
            //待放币
            this.payWay = way;
            this.showCurrency = true;
        },
        hide(data) {
            this.showTab = data;
        },
        hideCancel(data) {
            this.showCancel = data;
        },
        evaluateHide(data) {
            this.evaluateShow = data;
        },
        payHide(data) {
            //支付二维码
            this.payShow = data;
        },
        hideCurrency(data) {
            //放币
            this.showCurrency = data;
        },
        cancelOrder() {
            this.showCancel = true;
        },
        wait() {
            //取消订单
            let params = {
                otc_transac_id: this.$route.query.otc_transac_id,
                otc_transac_status: 3,
                type: "cancel",
                automatic: "cate"
            };
            api.otcDetail(params).then(res => {
                if (res.status_code == 200) {
                    this.$Message.success("订单已取消");
                    this.showCancel = false;
                    this.transactionDetail();
                } else {
                    this.showCancel = false;
                }
            });
        },
        waitCheck() {
            if (this.payCheck) {
                let params = {
                    otc_transac_id: this.$route.query.otc_transac_id,
                    otc_transac_status: 3,
                    type: "cancel"
                };
                api.otcDetail(params).then(res => {
                    if (res.status_code == 200) {
                        this.$Message.success("订单已取消");
                        this.showCancel = false;
                        this.transactionDetail();
                    } else {
                        this.showCancel = false;
                    }
                });
            } else {
                this.$Message.error("请勾选确认选项");
            }
        },
        finish() {
            //标记打款确认已付款
            let params = {
                otc_transac_id: this.$route.query.otc_transac_id,
                type: this.payWay,
                payment_id: this.wayPay.split("/")[0],
                payment: this.wayPay.split("/")[1]
            };
            // console.log(111111);
            api.otcDetail(params).then(res => {
                if (res.status_code == 200) {
                    // console.log(555555);
                    //  this.$Message.success('成功');
                    this.showTab = false;
                    this.showCurrency = false;
                    this.transactionDetail();
                } else if (res.status_code === 8014) {
                    this.$Message.error("币数量不足请先充值");
                }
            });
        },
        pin_finish() {
            //放币
            if (this.PN_password.trim()) {
                if (this.single) {
                    let params = {
                        otc_transac_id: this.$route.query.otc_transac_id,
                        type: this.payWay,
                        pin: this.PN_password
                    };
                    // console.log(this.payWay)
                    api.otcDetail(params).then(res => {
                        if (res.status_code == 200) {
                            this.$Message.success("成功");
                            this.showTab = false;
                            this.showCurrency = false;
                            this.transactionDetail();
                        } else if (res.status_code === 8014) {
                            this.$Message.error("币数量不足请先充值");
                        }
                    });
                } else {
                    this.$Message.error("请勾选确认选项");
                }
            } else {
                this.$Message.error("资金密码不能为空");
            }
        },
        getResult() {
            let params = {
                page: 1,
                limit: 1000,
                otc_transac_id: this.$route.query.otc_transac_id
            };
            api
                .getChatList(params)
                .then(res => {
                    if (res.status_code == 200) {
                        // for(var i=0; i < res.data.list.length; i++){  // 当设置的默认回复语为空时
                        //     if(res.data.list[i].chat_body.trim() == ''){
                        //       // res.data.list[i].chat_body = '你好'
                        //       console.log('空默认回复语');
                        //       this.isNullShow = false  // 默认回复语为空，隐藏默认回复
                        //     }else{
                        //       this.isNullShow = true
                        //     }
                        // }
                        // console.log(res);
                        this.sendF = true;
                        this.transactionDetail();
                        this.chatList = res.data.list;

                        // console.log(this.chatList.chat_body);
                        this.user_info = res.data.user_info;
                        this.user_info.user_avatar_none = res.data.user_info.user_name.substring(
                            0,
                            1
                        );
                        this.user_id = res.data.user_id;
                        // this.from_user_avatar = res.data.avatar.from_user_avatar;
                        const domain = window.location.origin;
                        let urlFile;
                        if (domain.indexOf("localhost") == -1) {
                            // urlFile = resOnline.fileUrl;
                            urlFile = "";
                        } else {
                            urlFile = resHost.fileUrl;
                        }
                        this.FileUrl = urlFile + "/api/v1/file";
                        for (let i = 0; i < res.data.list.length; i++) {
                            this.chatList[i].from_user_name = res.data.list[
                                i
                            ].from_user_name.substring(0, 1);
                            // this.chatList[i].user_avatar = urlFile + res.data.list[i].user_avatar;
                        }
                        setTimeout(() => {
                            $("#data-list-content").scrollTop(
                                $("#data-list-container").height()
                            );
                        }, 300);
                    }
                })
                .catch(err => {
                    // vm.$Message.error('获取信息失败');
                });
        },
        send() {
            const vm = this;
            if (vm.dialogContent.trim() && this.sendF) {
                if (vm.dialogContent.length < 30) {
                    this.sendF = false;
                    clearInterval(vm.timer);
                    clearTimeout(vm.timerClear);
                    vm.timer = setInterval(vm.getResult, 5000);
                    vm.timerClear = setTimeout(() => {
                        clearInterval(vm.timer);
                    }, 1200000);
                    let params = {
                        otc_transac_id: this.$route.query.otc_transac_id,
                        chat_body: vm.dialogContent,
                        type: false
                    };
                    api
                        .createChatInfo(params)
                        .then(res => {
                            if (res.status_code == 200) {
                                vm.dialogContent = "";
                                this.getResult();
                            }
                        })
                        .catch(err => { });
                } else {
                    vm.$Message.error("发送内容不能大于30个字符");
                }
            } else {
                vm.$Message.error("发送内容不能为空");
            }
        },
        fileUpload(file, type = false) {
            const vm = this;
            clearInterval(vm.timer);
            clearTimeout(vm.timerClear);
            vm.timer = setInterval(vm.getResult, 5000);
            vm.timerClear = setTimeout(() => {
                clearInterval(vm.timer);
            }, 1200000);
            let params = {
                otc_transac_id: this.$route.query.otc_transac_id,
                chat_body: file,
                type: type
            };
            api
                .createChatInfo(params)
                .then(res => {
                    if (res.status_code == 200) {
                        // console.log(res);
                        this.getResult();
                    }
                })
                .catch(err => {
                    vm.$Message.error("操作失败");
                });
        },
        handleUpload(file) {
            // console.log(file);
        },
        getUrl(res, file) {
            const domain = window.location.origin;
            let urlFile;
            if (domain.indexOf("localhost") == -1) {
                urlFile = this.$store.state.FileOnline;
            } else {
                urlFile = 'http://192.168.2.211:29080'
            }

            const imgUrl = res.file_path;
            const name = file.name;
            let url;
            let type = true;
            if (this.isImg(name.toLowerCase())) {
                url = `<a target="_blank" href="${urlFile+imgUrl}">
                <img name="${imgUrl}" style="margin: 0 auto;width: 10rem;" src="${urlFile+imgUrl}">
                </a>`;
            } else {
                // url = '<a href="' + imgUrl + '">' + name + '</a>';
                url =
                    '<a target="_blank" href="' +
                    urlFile +
                    imgUrl +
                    '" download = "' +
                    name +
                    '">' +
                    name +
                    "</a>"
            }
            this.fileUpload(url, type);
        },
        isImg(name) {
            if (
                name.indexOf(".png") > -1 ||
                name.indexOf(".jpg") > -1 ||
                name.indexOf(".jpeg") > -1 ||
                name.indexOf(".gif") > -1
            ) {
                return true;
            } else {
                return false;
            }
        },
        transactionDetail() {
            //订单详情
            let params = {
                otc_transac_id: this.$route.query.otc_transac_id
            };
            api
                .getTransactionDetail(params)
                .then(res => {
                    // console.log(res);
                    if (res.status_code == 200) {


                        const domain = window.location.origin;
                        let urlFile;
                        if (domain.indexOf("localhost") == -1) {
                            urlFile = resOnline.code;
                        } else {
                            urlFile = resHost.code;
                        }
                        this.codeUrl = urlFile;
                        if (this.$route.query.member == "user") {
                            if (res.data.otc_advertisement_type == 1) {
                                this.status = this.$t(`message.OTCOrder.BuyS`);
                            } else {
                                this.status = "出售";
                            }
                            this.seller = res.data.advertiser_user_name;
                        } else if (this.$route.query.member == "advertiser") {
                            if (res.data.otc_advertisement_type == 1) {
                                this.status = "出售";
                            } else {
                                this.status = this.$t(`message.OTCOrder.BuyS`);
                            }
                            this.seller = res.data.customer_user_name;
                        }
                        this.orderDetail = res.data;
                        this.payList = res.data.payMethod.alipay;
                        this.bankList = res.data.payMethod.bank;
                        this.paypalList = res.data.payMethod.paypal;
                        this.wechatList = res.data.payMethod.wechat;
                        this.otc_transac_status = res.data.otc_transac_status;

                        let timeDate = res.data.now_time;
                        this.timeLag = timeDate - res.data.created_at;
                        if (this.number == 1) {
                            this.time_d();
                        }
                        this.number++;
                        // 9.12 判断是否是广告主  KT开始
                        this.er_is_show = res.data;
                        // console.log(this.er_is_show);
                        if (res.data.coin_name == "KT") {
                            // console.log("是广告主666");
                            let params = {
                                // KT 请求支付宝展示ETH
                                coin_id: res.data.coin_id
                            };
                            let pUserId = res.data.advertiser_user_id;
                            // res.data.advertiser_user_id == res.data.user_id &&  判断广告主
                            if (flag) {
                                if (res.data.otc_advertisement_type == 1) {
                                    api
                                        .advertiserSell(pUserId, params)
                                        .then(res => {
                                            // console.log(11);

                                            if (res.status_code == 200) {
                                                this.ethList = res.data;
                                                this.qr_msg = res.data.qr_msg;
                                                // console.log(this.qr_msg);
                                            }
                                        })
                                        .then(() => {
                                            //转二微码
                                            // api.rechargeInfoImg({ qr_msg: this.qr_msg }).then(res => {
                                            api.rechargeInfoImg({ qr_msg: this.qr_msg }).then(res => {
                                                //  console.log(res);
                                                if (res.code == 200) {
                                                    flag = false;
                                                    this.qr_msg =
                                                        "data:image/png;base64," + res.data.QrCode;
                                                }
                                            });
                                        });
                                }
                            }
                        }
                        // KT 结束
                        if (res.data.otc_transac_status == 1) {
                            if (this.currentWay) {
                                this.wayPay = this.currentWay;
                            } else {
                                if (res.data.payMethod.alipay != undefined) {
                                    this.wayPay =
                                        res.data.payMethod.alipay[0].user_account_alipay_id +
                                        "/alipay";
                                } else if (res.data.payMethod.bank != undefined) {
                                    this.wayPay =
                                        res.data.payMethod.bank[0].user_account_bank_id + "/bank";
                                } else if (res.data.payMethod.paypal != undefined) {
                                    this.wayPay =
                                        res.data.payMethod.paypal[0].user_account_paypal_id +
                                        "/paypal";
                                } else if (res.data.payMethod.wechat != undefined) {
                                    this.wayPay =
                                        res.data.payMethod.wechat[0].user_account_wechatpay_id +
                                        "/wecahtpay";
                                }
                                // else if(res.data.payMethod.wechat != undefined){   //KT
                                //     this.wayPay =
                                //     res.data.payMethod.wechat[0].user_account_wechatpay_id +
                                //     "/alipay";
                                // }
                            }
                        } else {
                            this.wayPay = res.data.payment_id + "/" + res.data.payment;
                        }
                    }
                })
                .catch(err => {
                    // console.log(err);
                });
        },
        time_d() {
            if (this.timeLag < 900) {
                const timeD = 900 - this.timeLag;
                let m = Math.floor((timeD % (60 * 60)) / 60);
                let s = Math.floor(timeD % 60);
                this.minutes = m;
                this.seconds = s;
                this.add();
            }

            if (
                this.minutes === 0 &&
                this.seconds === 0 &&
                this.otc_transac_status == 1
            ) {
                this.wait();
            }
        },
        download(file) {
            // const domain = window.location.origin;
            // let urlFile;
            // if (domain.indexOf("localhost") == -1) {
            //     urlFile = resOnline.fileUrl;
            // } else {
            //     urlFile = resHost.fileUrl;
            // }
            // if (file.indexOf("src") > 0) {
            //     let nameImgSrc = file.split("name")[1];
            //     let nameImg = nameImgSrc.split("=")[1];
            //     let nameUrl = nameImg.split('"')[1];
            //     // console.log(nameUrl);
            //     // console.log(urlFile + nameUrl);
            //     let $eleForm = $("<form method='get' target='_bland'></form>");
            //     $eleForm.attr("action", urlFile + nameUrl);
            //     // $eleForm.attr("action", "http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg");
            //     $(document.body).append($eleForm);
            //     $eleForm.submit();
            // }
        }
    },
    mounted() {
        flag = true;
        this.$store.commit("changeOTCOrderShow", 1);
        const vm = this;
        vm.getResult();
        window.clearInterval(this.time);
        vm.timer = setInterval(vm.getResult, 5000);
        vm.timerClear = setTimeout(() => {
            clearInterval(vm.timer);
        }, 1200000);
        // KT开始
        // console.log(111);
        // console.log(this.er_is_show);
        //KT结束
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.$store.commit("changeOTCOrderShow", 0);
    },
    filters: {
        timeD(value) {
            let date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + "-";
            let M =
                (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) + "-";
            let D = date.getDate() + " ";
            let h = date.getHours() + ":";
            let m = date.getMinutes() + ":";
            let s = date.getSeconds();
            return Y + M + D + h + m + s;
        },

    },
    updated() {
        // console.log(this.orderDetail);
        // console.log(this.er_is_show)
        // console.log(this.payList);
        // console.log(this.payList.alipay_account_name);
        // console.log(this.payList.bank_name);
        // console.log(this.bank_branch);
        // console.log(this.user_info)
        // console.log(this.payList);
        // params.coin_id
        // let params = {
        //     // 22
        //     coin_id : '22',
        // }
        // // 385
        // let pUserId = '385'
        // api.advertiserSell(pUserId,params)
        //     .then(res =>{
        //        console.log(res);
        // })
        // console.log(this.ethList.account_name);
    }
};
</script>

<style scoped lang="scss">
// [v-cloak] { display: none; } //解决ETH二维码加载时闪烁

::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.75rem;
  background-color: #fff;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  -webkit-box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.3);
  background-color: #eee;
}

.order {
  width: 100%;
  @media screen and (min-width: 1200px) {
    .order-content {
      width: 60rem !important;
    }
  }
  .order-content {
    i {
      font-style: normal;
    }
    em {
      font-style: normal;
    }
    .mg-t1 {
      margin-top: 1px;
    }
    width: 90%;
    margin: 6.5rem auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    .order-left {
      .pay_btn_ok {
        margin-left: 0 !important;
      }
      width: 35.75rem;
      .order-left-top {
        border-bottom: 1px solid #edeef4;
        padding-bottom: 3rem;
        p {
          line-height: 1.5rem;
        }
        .order_num {
          font-size: 1.2rem;
          color: #999;
        }
        h2 {
          font-size: 1rem;
          color: #333;
          font-weight: normal;
          line-height: 2.4rem;
        }
        .order-h {
          //new
          font-size: 1.2rem;
          color: #333;
          line-height: 2rem;
          margin-bottom: 0.6rem;
          // margin-top: 0.5rem;
        }
        .unit_price {
          font-size: 1rem;
          color: #333;
        }
        .total_amount {
          font-size: 1rem;
          color: #499972;
          // span {
          //   color: #d45858;
          // }
        }
      }
      .order-left-bottom {
        padding-top: 1rem;
        position: relative;
        .order-left-bottom-p {
          position: absolute;
          font-size: 0.8rem;
          color: #999999;
          background-color: #fff;
          padding-right: 0.5rem;
          top: -0.75rem;
          left: 0;
        }
        .bank_cards {
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          margin-bottom: 0.5rem;
          .cancel_btn {
            width: 15rem;
            height: 2rem;
            background: #eee;
            border: none;
            color: #999;
            font-size: 0.7rem;
            border-radius: 0.25rem;
            cursor: pointer;
          }
          .cancel_btn:focus {
            border: none;
            box-shadow: 0 0 1px 1px #d4d3d3;
            outline: none;
          }
          span {
            color: #999;
            font-size: 0.7rem;
          }
          .card {
            margin-left: 0.85rem;
            margin-right: 4.7rem;
          }
          .icon {
            font-size: 1rem;
          }
          .n_card {
            margin-right: 0.5rem;
          }
        }
        h2 {
          margin-top: 2.5rem;
          font-size: 0.9rem;
          color: #333;
          font-weight: normal;
          span:first-child {
            color: #d45858;
          }
          span:last-child {
            color: #25796a;
          }
          .overOrder {
            color: #666 !important;
          }
        }
        .await_pay {
          font-size: 1rem;
          color: #777777;
          .await_pay_time {
            color: #d43c3c;
          }
          .await_pay_money {
            color: #499972 !important;
          }
          .await_pay_refe {
            padding-top: 0.5rem;
            display: block;
            color: #777777;
          }
        }
        .tail_num {
          color: #4f69c2;
          border: 1px solid #4f69c2;
          padding: 1px 0.5rem;
          border-radius: 0.2rem;
        }
        .tail_refe {
          font-size: 0.7rem !important;
          color: #499972 !important;
          padding-left: 0.5rem !important;
        }
        .tail_num_color {
          color: #777 !important;
          font-size: 1rem !important;
        }
        .await_pay_btn {
          background: #4f69c2 !important;
          border-radius: 0.2rem;
          width: 13.1rem !important;
          height: 3.6rem !important;
          line-height: 3rem !important;
          text-align: center;
          font-size: 1.2rem !important;
          color: #ffffff !important;
          margin-left: 0 !important;
        }
        .await_pay_cancel {
          padding-top: 1.5rem !important;
          margin-top: 0 !important;
          padding-left: 4.7rem !important;
          span {
            font-size: 1rem !important;
            color: #777777 !important;
          }
        }
        .otc_call {
          //new h2
          margin-top: 1rem;
          .otc_call_f {
            display: block;
            width: 12.6rem;
            height: 2.2rem;
            background-color: #d9d9d9;
            line-height: 2.2rem;
            text-align: center;
            color: #fff;
            font-size: 0.8rem;
            margin-bottom: 1rem;
          }
          .otc_call_s {
            font-size: 1rem;
            color: #777;
          }
          .otc_call_p {
            line-height: 1.4rem;
            color: #4f69c2;
            padding: 0 0.75rem;
            border: 1px solid #4f69c2;
            border-radius: 0.2rem;
          }
          .call_gre {
            font-size: 0.7rem;
            color: #499972;
            padding-left: 0.75rem;
          }
          .now_ing {
            width: 13.1rem;
            height: 3.6rem;
            background-color: #eef2f6;
            border-radius: 0.2rem;
            line-height: 3.6rem;
            text-align: center;
            display: block;
            color: #4f69c2;
            margin-top: 2rem;
            font-size: 1.2rem;
          }
        }
        .otc_being {
          font-size: 1rem;
          color: #777777;
        }
        .pay_btn {
          margin-top: 2.5rem;
          position: relative;
          .icon-success-gou {
            font-size: 1rem;
            margin-right: 1rem;
          }
          .icon-fault {
            font-size: 1rem;
            margin-right: 1rem;
          }
          .hadpay {
            font-size: 0.9rem;
            color: #666;
          }
          button:first-child {
            width: 5.3rem;
            height: 2rem;
            background: #f3ba2f;
            border: none;
            font-size: 0.6rem;
            border-radius: 0.25rem;
            color: #fff;
            outline: none;
          }
          .triangle_border_left {
            position: absolute;
            width: 12.5rem;
            height: 2rem;
            left: 6.5rem;
          }
          .triangle_border_left:after {
            content: "";
            position: absolute;
            top: 0.45rem;
            left: -0.45rem;
            border-top: 0.6rem solid transparent;
            border-right: 0.6rem solid #eee;
            border-bottom: 0.6rem solid transparent;
          }
          .isCurrency:after {
            content: "";
            position: absolute;
            top: 0.45rem;
            left: 0.35rem;
            border-top: 0.6rem solid transparent;
            border-right: 0.6rem solid #eee;
            border-bottom: 0.6rem solid transparent;
          }
          button:last-child {
            width: 12.5rem;
            height: 2rem;
            background: #eee;
            font-size: 0.7rem;
            border-radius: 0.25rem;
            color: #d45858;
            margin-left: 1.15rem;
            outline: none;
            cursor: inherit;
          }
          button:last-child:focus {
            box-shadow: none;
          }
          .pay_btn_ok {
            width: 13.1rem !important;
            height: 3.6rem !important;
            background: #4f69c2 !important;
            line-height: 3.1rem !important;
            text-align: center !important;
            font-size: 1.2rem !important;
            color: #ffffff !important;
          }
        }
        .pay_hint_new {
          font-size: 0.8rem;
          color: #000;
          display: block;
          margin-bottom: 0.5rem;
          margin-top: -1rem;
        }
        .await_eval {
          background-color: #4f69c2 !important;
        }
        .pay_tip {
          margin-top: 2.5rem;
          margin-bottom: 1.6rem;
          margin-left: 1rem;
          li {
            font-size: 0.7rem;
            color: #666;
            line-height: 1.4rem;
          }
        }
        .cancel {
          float: left;
          span {
            color: #f3ba2f;
            font-size: 0.7rem;
            cursor: pointer;
          }
        }
        .cancel_new {
          margin-left: 4.65rem;
          span {
            font-size: 1rem;
            color: #777;
          }
        }
        .cancel-40 {
          padding-top: 3rem;
          margin-left: 1rem;
        }

        .prompt_word {
          margin-top: 1.5rem;
          .prompt_word_s {
            font-size: 1.8rem;
            color: #e94c35;
            vertical-align: middle;
          }
          .prompt_word_g {
            font-size: 1.8rem;
            color: #4f69c2;
            vertical-align: middle;
          }
          img {
            vertical-align: middle;
            margin-right: 1.35rem;
          }
        }
        .await_pay_ok {
          clear: both;
          position: relative;
          // left: -5.5rem;
        }
        .prompt {
          margin-top: 0.5rem;
        }
      }
    }
    .order-right {
      position: relative;
      width: 15.95rem;
      height: 28.8rem;
      /*border: 1px solid #edeef4;*/
      border-radius: 0.25rem;
      -webkit-box-shadow: 0 0 0.5rem #eee;
      -moz-box-shadow: 0 0 0.5rem #eee;
      box-shadow: 0 0 0.75rem #eee;
      .order-left-foot {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2.5rem;
        border-top: 1px solid #edeef4;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        input {
          position: relative;
          bottom: 0;
          width: 100%;
          height: 100%;
          padding-left: 1.5rem;
          font-size: 0.6rem;
        }
        span {
          padding-right: 1.5rem;
          font-size: 0.95rem;
          line-height: 2.5rem;
        }
      }
      .order-left-head {
        width: 100%;
        height: 3.9rem;
        border-bottom: 1px solid #edeef4;
        position: absolute;
        top: 0;
        left: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        padding: 0.75rem 1.5rem;
        .head_img {
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          .head_name {
            p {
              line-height: 1.2rem;
            }
            p:first-child {
              font-size: 0.7rem;
              color: #333;
            }
            p:last-child {
              font-size: 0.6rem;
              color: #999;
              margin-top: 0.5rem;
            }
          }
          .user_img {
            width: 1.7rem;
            height: 1.7rem;
            border-radius: 50%;
            margin-top: 0.25rem;
            margin-right: 0.5rem;
          }
        }
        .icon-phone {
          font-size: 0.85rem;
          line-height: 2.4rem;
        }
      }
      .order-left-center {
        height: 22.4rem;
        position: absolute;
        top: 3.9rem;
        left: 0;
        width: 100%;
        .order-left-center-content {
          position: relative;
          height: 22rem;
          overflow: auto;
          padding: 0.5rem 0.25rem 0 0.25rem;
          .section {
            display: block;
            width: 100%;
            margin: 0.75rem auto;
            overflow: hidden;
            .avator {
              width: 1.5rem;
              height: 1.5rem;
              border-radius: 1.5rem;
              text-align: center;
              line-height: 1.5rem;
              font-size: 0.8rem;
              /*background-color: #f3ba2f;*/
              float: left;
              img {
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 1.5rem;
                text-align: center;
                line-height: 1.5rem;
                font-size: 1rem;
                background-color: #f3ba2f;
                float: left;
              }
            }
            .avator.right {
              float: right;
            }
            .dialog {
              background-color: #e2e7ee;
              min-height: 1.5rem;
              float: left;
              margin-left: 0.5rem;
              position: relative;
              padding: 0.25rem;
              max-width: 12rem;
              white-space: normal;
              word-wrap: break-word;
              word-break: break-all;
            }
            .dialog-left {
              background-color: #e2e7ee;
              max-width: 12rem;
              min-height: 1.5rem;
              float: right;
              margin-right: 0.5rem;
              position: relative;
              padding: 0.25rem;
              white-space: normal;
              word-wrap: break-word;
              word-break: break-all;
            }
            .dialog:before {
              content: "";
              display: block;
              position: absolute;
              width: 0;
              height: 0;
              border: 0.3rem solid transparent;
              border-right-color: #e2e7ee;
              left: -0.6rem;
              top: 0.4rem;
            }
            .dialog-left:before {
              content: "";
              display: block;
              position: absolute;
              width: 0;
              height: 0;
              border: 0.3rem solid transparent;
              border-left-color: #e2e7ee;
              right: -0.6rem;
              top: 0.4rem;
            }
          }
        }
      }
    }
  }
  .titleModel {
    font-size: 0.9rem;
    color: #333;
  }
  .Tab1_titleModel {
    font-size: 0.9rem;
    color: #ff0000;
  }
  .modelContent {
    width: 22.5rem;
    /*p:nth-of-type(1){*/
    /*font-size: 0.8rem;*/
    /*color:#666*/
    /*}*/
    /*p:nth-of-type(2){*/
    /*font-size: 0.7rem;*/
    /*color:#999;*/
    /*margin-top: 1rem;*/
    /*}*/
    p {
      font-size: 0.7rem;
      color: #666;
      margin-top: 1.2rem;
    }
  }
  .footBtn {
    .ivu-btn-primary {
      background: #4f69c2;
      color: #fff;
      font-size: 0.7rem;
      border: none;
      width: 5rem;
      height: 2rem;
    }
    .ivu-btn-primary:focus {
      box-shadow: 0 0 0 0.1rem rgba(#ecc636, 0.2);
    }
    span {
      cursor: pointer;
      margin-left: 2.5rem;
      font-size: 0.7rem;
      color: #333;
    }
  }
}
</style>

