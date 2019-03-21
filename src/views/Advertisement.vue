<template>
    <div>
        <Content>
            <div class="advertisement">
                <div class="adver_content">
                    <div class="head-user">
                        <div class="user_img" :model="userInfo">
                            <div class="head_img" :style="{background:this.$route.query.color}">{{username_str}}</div>
                            <p class="merchant-user">
                                <span>{{userInfo.user_name}}</span>
                            </p>
                            <p class="merchant-time">注册时间：{{dateTime}}</p>
                        </div>
                        <!-- 商家完成率 -->
                        <div class="user_percentage">
                            <div>
                                <h3>商家保证金</h3>
                                <p>{{ userInfo.finance_freeze_amount_str == 0 || isNaN(userInfo.finance_freeze_amount_str)? 0: userInfo.finance_freeze_amount_str}} KT</p>
                            </div>
                            <div>
                                <h3>30日完成率</h3>
                                <p>
                                    <span v-cloak>{{ userInfo.finish_count_by_30_d == 0 || userInfo.count_by_30_d == 0 || isNaN(userInfo.finish_count_by_30_d) || isNaN(userInfo.count_by_30_d) ? 0 : (( userInfo.finish_count_by_30_d / userInfo.count_by_30_d)*100).toFixed(1) }}</span>%</p>
                            </div>
                            <div>
                                <h3>总成单</h3>
                                <p>{{ userInfo.finish_all_count == 0 || isNaN(userInfo.finish_all_count)? 0: userInfo.finish_all_count}}次</p>
                            </div>
                            <div>
                                <h3>30日成单</h3>
                                <p>{{ userInfo.finish_count_by_30_d == 0 || isNaN(userInfo.finish_count_by_30_d)? 0: userInfo.finish_count_by_30_d}}次</p>
                            </div>
                            <div>
                                <h3>平均放行</h3>
                                <p>
                                    <span v-cloak>{{ userInfo.paid_time == 0 || isNaN(userInfo.paid_time)? 0 : (userInfo.paid_time / 60).toFixed(2)}}</span>分钟</p>
                            </div>
                        </div>
                    </div>
                    <div class="register_time">
                        <p>
                            <span v-if="identification.indexOf('email')>-1">邮箱认证
                                <span class="icon-green-gou"></span>
                            </span>
                            <span v-if="identification.indexOf('phone')>-1">手机认证
                                <span class="icon-green-gou"></span>
                            </span>
                            <span v-if="identification.indexOf('real_name')>-1">实名认证
                                <span class="icon-green-gou"></span>
                            </span>
                            <span v-if="identification.indexOf('higIdentification')>-1">高级认证
                                <span class="icon-green-gou"></span>
                            </span>
                        </p>
                    </div>
                    <div class="online_sell">
                        <p class="title" style="padding-left:0.5rem">在线出售</p>
                        <div class="sell-wrap" v-if="sellerItem.length > 0">
                            <div class="otc-user-list">
                                <ul class="otc-list-top" style="padding-top:1.5rem">
                                    <li class="otc-res-01">币种</li>
                                    <li class="otc-res-02">数量</li>
                                    <li class="otc-res-03">限额</li>
                                    <li>单价</li>
                                    <li class="otc-res-05">支付方式</li>
                                    <li style="padding-left:4.75rem;">操作</li>
                                </ul>
                                <ul class="otc-list-cn" v-for="(seller,index) in sellerItem">
                                    <li :class="{box_sh_br : (index == isShow && isBorder ) }">
                                        <div class="otc-list-user-t">
                                            <div class="otc-com  otc-res-01">
                                                <div class="cricle" :style="{ backgroundColor: seller.color }">
                                                    <span></span>
                                                    <i>{{ seller.coin_name.substring(0, 1).toUpperCase() }}</i>
                                                </div>
                                                <div class="proper">{{ seller.coin_name }}</div>
                                            </div>
                                            <div class="otc-com otc-res-02">{{ seller.coin_available_str }} {{seller.coin_name }}</div>
                                            <div class="otc-com otc-res-03">
                                                <!-- 判断数量乘单价是否小于最小单价 -->
                                                <i v-if="(Number(seller.coin_available_str) * Number(seller.unit_price)) > Number(seller.min_limit)">{{ seller.min_limit }} - {{ seller.max_limit }} {{ seller.currency_name }}</i>
                                                <i v-else>{{ (Number(seller.coin_available_str) * Number(seller.unit_price)).toFixed(2) }}</i>
                                            </div>
                                            <div class="otc-com otc-font-money">{{ seller.unit_price }} {{ seller.currency_name }}</div>
                                            <div class="otc-com otc-font-bak otc-res-05">
                                                <span v-bind:class="{ 'icon-paypal' : seller.is_paypal == 2 ? true : false , 'icon_show':seller.is_paypal == 2 ? true : false}"></span>
                                                <span :class="{ 'icon-pay': seller.is_alipay == 2 ? true : false,  'icon_show': seller.is_alipay == 2 ? true : false}"></span>
                                                <span v-bind:class="{ 'icon-card': seller.is_bank == 2 ? true : false, 'icon_show':seller.is_bank == 2 ? true : false}"></span>
                                                <span v-bind:class="{ 'icon-wechat-pay': seller.is_wechatpay == 2 ? true : false,'icon_show':seller.is_wechatpay == 2 ? true : false }"></span>
                                            </div>
                                            <div class="otc-com" style="text-align:right">
                                                <div v-show="isShow != index || !isBorder" class="otc-button" href="javascript:;">
                                                    <!-- 在线出售 2 -->
                                                    <Button type="primary" :loading="seller.loading" @click="btcBuy(seller, 2,seller.unit_price,seller.currency_name,seller.is_alipay,seller.is_bank,seller.is_paypal,seller.is_wechatpay,seller.otc_advertisement_id,seller.min_limit,seller.max_limit,seller.coin_available_str,index)" v-if="seller.otc_advertisement_type == 1">
                                                        购买{{ seller.coin_name }}
                                                    </Button>
                                                </div>
                                                <!-- 实名认证 -->
                                                <div class="otc-attestation" v-if="isShow == index && t_isapprove">
                                                    购买需
                                                    <a href="javascript:;" @click="onAttestation">实名认证</a>
                                                </div>
                                                <div class="otc-tim-lim" v-if="isShow == index && isAtt">买方付款时限为15分钟</div>
                                            </div>
                                        </div>
                                        <section v-show="isShow == index && isDown" class="otc-details-a">
                                            <div slot="modelSlotContent" class="otcTip-details-a">
                                                <Form :rules="ruleValidate" ref="OTCForm" :model="OTCForm">
                                                    <FormItem prop="BNumber" class="otcTip-a">
                                                        <div class="inputDiv-a">
                                                            <!--
                                        <p class="bgFirst" :class="{ 'bghuang' : bgcolor_number }">
                                            <span v-if="title_status == '2'">{{ $t(`message.DealCenter.PurchaseVolume`) }}{{currName}}</span>
                                            <span v-if="title_status == '1'">卖出量{{currName}}</span>
                                        </p>
                                        -->
                                                            <p class="inputDiv-p">
                                                                <input v-if="is_value_num" :readonly="is_value_num" class="bgInput" placeholde="OTCFormCm" v-model="OTCFormCm">
                                                                <input v-else maxlength="12" class="bgInput" autocomplete="off" v-model="OTCForm.CMoney" v-on:keyup="FokeyUp" v-on:blur="getBlur" v-on:focus="loseFocus" @input="inpBlurMoney(OTCForm.CMoney)" onkeydown="if(event.keyCode==32) return false">
                                                                <span v-show="isNowith" class="inputDiv-s">不在交易金额范围内</span>
                                                                <i class="otc-font-hint" v-show="!allMoney">CNY</i>
                                                                <i class="otc-font-hint allNew" v-show="allMoney" @click="onAllMoney">全部</i>
                                                            </p>
                                                        </div>
                                                    </FormItem>
                                                    <img class="otcTip-img" src="../../static/img/conversion.png" alt="">
                                                    <FormItem prop="CMoney" class="otcTip">
                                                        <div class="inputDiv-a">
                                                            <!-- <p class="bgFirst" :class="{ 'bghuang' : bgcolor }"><span>金额{{OTCForm.currency_name}}</span></p> -->
                                                            <p class="inputDiv-p">
                                                                <input v-if="is_value_num" :readonly="is_value_num" placeholde="OTCFormNm" type="text" maxlength="20" class="bgInput" v-model="OTCFormNm">
                                                                <input v-else maxlength="20" class="bgInput" autocomplete="off" v-on:blur="numBlur" v-on:keyup="FokeyUpNm" v-on:focus="numFocus" v-model="OTCForm.BNumber" @input="inpBlur(OTCForm.BNumber)" onkeydown="if(event.keyCode==32) return false">
                                                                <i class="otc-font-hint" v-show="!allNum">{{ seller.coin_name }}</i>
                                                                <i class="otc-font-hint allNew" v-show="allNum" @click="onAllNum">全部</i>
                                                            </p>
                                                        </div>
                                                    </FormItem>
                                                </Form>
                                            </div>
                                            <div slot="modelSlotFooter">
                                                <!-- {{title_text}}{{currName}} -->
                                                <Button type="primary" class="buy_btn_a" :disabled="isOk" @click="buy_btn" :loading="loading">
                                                    下单
                                                </Button>
                                                <a @click="isCancel(index)" class="buy_btn_cancel" href="javascript:;">取消</a>
                                            </div>
                                        </section>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="sell-wrap-none" v-else>
                            <p>
                                <span class="icon-no_info"></span>
                            </p>
                            <p class="none">暂无可购买的币种</p>
                        </div>
                        <div style="text-align: center;margin-top: 0.5rem" v-if="sellerItem.length > 0">
                            <Page :total="countSale" :page-size="pageSizeSale" class="pageOrder" @on-change="changePageSale"></Page>
                        </div>
                    </div>
                    <div class="online_buy">
                        <p class="title" style="padding-left:0.5rem">在线购买</p>
                        <div class="sell-wrap" v-if="buyItem.length > 0">
                            <div class="otc-user-list">
                                <ul class="otc-list-top" style="padding-top:1.5rem">
                                    <li class="otc-res-01">币种</li>
                                    <li class="otc-res-02">数量</li>
                                    <li class="otc-res-03">限额</li>
                                    <li>单价</li>
                                    <li class="otc-res-05">支付方式</li>
                                    <li style="padding-left:4.75rem;">操作</li>
                                </ul>
                                <ul class="otc-list-cn" v-for="(buy,index) in buyItem">
                                    <li :class="{box_sh_br : (index == t_isShow && t_isBorder ) }">
                                        <div class="otc-list-user-t">
                                            <div class="otc-com  otc-res-01">
                                                <div class="cricle" :style="{ backgroundColor: buy.color }">
                                                    <span></span>
                                                    <i>{{ buy.coin_name.substring(0, 1).toUpperCase() }}</i>
                                                </div>
                                                <div class="proper">{{ buy.coin_name }}</div>
                                            </div>
                                            <div class="otc-com otc-res-02">{{ buy.coin_available_str }} {{buy.coin_name }}</div>
                                            <div class="otc-com otc-res-03">
                                                <!-- 判断数量乘单价是否小于最小单价 -->
                                                <i v-if="(Number(buy.coin_available_str) * Number(buy.unit_price)) > Number(buy.min_limit)">{{ buy.min_limit }} - {{ buy.max_limit }} {{ buy.currency_name }}</i>
                                                <i v-else>{{ (Number(buy.coin_available_str) * Number(buy.unit_price)).toFixed(2) }}</i>
                                            </div>
                                            <div class="otc-com otc-font-money">{{ buy.unit_price }} {{ buy.currency_name }}</div>
                                            <div class="otc-com otc-font-bak  otc-res-05">
                                                <span v-bind:class="{ 'icon-paypal' : buy.is_paypal == 2 ? true : false , 'icon_show':buy.is_paypal == 2 ? true : false}"></span>
                                                <span :class="{ 'icon-pay': buy.is_alipay == 2 ? true : false,  'icon_show': buy.is_alipay == 2 ? true : false}"></span>
                                                <span v-bind:class="{ 'icon-card': buy.is_bank == 2 ? true : false, 'icon_show':buy.is_bank == 2 ? true : false}"></span>
                                                <span v-bind:class="{ 'icon-wechat-pay': buy.is_wechatpay == 2 ? true : false,'icon_show':buy.is_wechatpay == 2 ? true : false }"></span>
                                            </div>
                                            <div class="otc-com" style="text-align:right">
                                                <div v-show="t_isShow != index || !t_isBorder" class="otc-button" href="javascript:;">
                                                    <!-- 在线购买 1 -->
                                                    <Button type="primary" :loading="buy.loading" @click="t_btcBuy(buy, 1,buy.unit_price,buy.currency_name,buy.is_alipay,buy.is_bank,buy.is_paypal,buy.is_wechatpay,buy.otc_advertisement_id,buy.min_limit,buy.max_limit,buy.coin_available_str,index)" v-if="buy.otc_advertisement_type == 2">
                                                        出售{{buy.coin_name}}
                                                    </Button>
                                                </div>
                                                <!-- 高级认证 -->
                                                <div class="otc-attestation" v-if="isapprove_sell && t_isShow == index">
                                                    出售需
                                                    <a href="javascript:;" @click="t_onAttestation">高级认证</a>
                                                </div>
                                                <!-- 实名认证 -->
                                                <div class="otc-attestation" v-if="t_isShow == index && t_isapprove_pay">
                                                    出售需
                                                    <a href="javascript:;" @click="t_onAttestation">实名认证</a>
                                                </div>
                                                <!-- 支付方式 -->
                                                <div class="otc-attestation" v-if="t_isShow == index && t_pay_way">
                                                    请绑定并激活
                                                    <a href="javascript:;" @click="a_onAttestation">支付方式</a>
                                                </div>
                                                <div class="otc-tim-lim" v-if="t_isShow == index && t_isAtt">买方付款时限为15分钟</div>
                                            </div>
                                        </div>
                                        <section v-show="t_isShow == index && t_isDown" class="otc-details-a">
                                            <div slot="modelSlotContent" class="otcTip-details-a" :class="{otcTip_details_new : buy.otc_advertisement_type == 2}">
                                                <Form :rules="ruleValidate" ref="t_OTCForm" :model="t_OTCForm">
                                                    <FormItem prop="BNumber" class="otcTip-a">
                                                        <div class="inputDiv-a">
                                                            <!--
                                          <p class="bgFirst" :class="{ 'bghuang' : bgcolor_number }">
                                              <span v-if="title_status == '2'">{{ $t(`message.DealCenter.PurchaseVolume`) }}{{currName}}</span>
                                              <span v-if="title_status == '1'">卖出量{{currName}}</span>
                                          </p>
                                          -->
                                                            <p class="inputDiv-p">
                                                                <input v-if="t_is_value_num" :readonly="t_is_value_num" class="bgInput" placeholde="t_OTCFormCm" v-model="t_OTCFormCm">
                                                                <input v-else maxlength="12" class="bgInput" autocomplete="off" v-model="t_OTCForm.CMoney" v-on:blur="sellBlur" v-on:keyup="FokeyUpbuy" v-on:focus="sellFocus" @input="t_inpBlurMoney(t_OTCForm.CMoney)" onkeydown="if(event.keyCode==32) return false">
                                                                <span v-show="t_isNowith" class="inputDiv-s">不在交易金额范围内</span>
                                                                <i class="otc-font-hint" v-show="!allSeMoney">CNY</i>
                                                                <i class="otc-font-hint allNew" v-show="allSeMoney" @click="onSellMoney">全部</i>
                                                            </p>
                                                        </div>
                                                    </FormItem>
                                                    <img class="otcTip-img" src="../../static/img/conversion.png" alt="">
                                                    <FormItem prop="CMoney" class="otcTip">
                                                        <div class="inputDiv-a">
                                                            <p class="inputDiv-p">
                                                                <input v-if="t_is_value_num" :readonly="t_is_value_num" placeholde="t_OTCFormCm" type="text" maxlength="20" class="bgInput" v-model="t_OTCFormNm">
                                                                <input v-else maxlength="20" :placeholder="!allSeNum && wayotc==1 && !t_OTCForm.BNumber? `余额:${Number(buy.coin_amount_str)}` : ''" class="bgInput otc_sell_input" autocomplete="off" v-model="t_OTCForm.BNumber" v-on:blur="sellBlurNum" v-on:keyup="FokeyUpbuyNm" v-on:focus="sellFocusNum" @input="t_inpBlur(t_OTCForm.BNumber)" onkeydown="if(event.keyCode==32) return false">
                                                                <i class="otc-font-hint" v-show="!allSeNum">{{ buy.coin_name }}</i>
                                                                <!--  -->
                                                                <i class="otc-font-hint allNew" v-show="allSeNum" @click="onSellNum">全部</i>
                                                            </p>
                                                        </div>
                                                    </FormItem>
                                                    <!-- 资金密码 -->
                                                    <div v-if="buy.otc_advertisement_type == 2" class="otcTip-details-mony">
                                                        <input placeholder="请输入资金密码" type="password" v-model="PN_password" />
                                                    </div>
                                                </Form>
                                            </div>
                                            <div slot="modelSlotFooter">
                                                <!-- {{title_text}}{{currName}} -->
                                                <Button type="primary" class="buy_btn_a" :disabled="t_isOk" @click="t_buy_btn" :loading="loading">
                                                    下单
                                                </Button>
                                                <a @click="t_isCancel(index)" class="buy_btn_cancel" href="javascript:;">取消</a>
                                            </div>
                                        </section>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="sell-wrap-none" v-else>
                            <p>
                                <span class="icon-no_info"></span>
                            </p>
                            <p class="none">暂无可出售的币种</p>
                        </div>
                        <div style="text-align: center;margin-top: 0.5rem" v-if="buyItem.length > 0">
                            <Page :total="count" :page-size="pageSize" class="pageOrder" @on-change="changePage"></Page>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    </div>
</template>
<script>
import Model from "./model/Model.vue";
import api from "../api";
import utils from "../utils";
import { mapGetters } from 'vuex'

import $ from "jquery";


export default {
    data() {
        const validateMoney = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("message.AssetRecord.EnterAmounts")));
            } else if (!/^\d+(\.\d+)?$/.test(value)) {
                callback(new Error("请填写正确数字"));
            } else if (value < 0) {
                callback(new Error("请填写正确数字"));
            } else if (Number(value) < Number(this.min_limit)) {
                callback(new Error("交易金额不能小于最小限额"));
            } else if (Number(value) > Number(this.max_limit)) {
                callback(new Error("交易金额不能大于最大限额"));
            } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                callback(new Error("买入量小数点后不能大于两位"));
            } else {
                callback();
            }
        };
        const validateNumber = (rule, value, callback) => {
            if (value === "") {
                callback(new Error('请填写数量'));
            } else if (!/^\d+(\.\d+)?$/.test(value)) {
                callback(new Error("请填写正确数字"));
            } else if (value < 0) {
                callback(new Error("请填写正确数字"));
            } else if (Number(value) > Number(this.coin_available_str)) {
                callback(new Error("数量不能超出总数量"));
            } else if (!/^\d+(\.\d{1,8})?$/.test(value)) {
                callback(new Error("买入量小数点后不能大于八位"));
            } else {
                callback();
            }
        };
        return {
            t_pay_way: false, // 支付方式
            t_isapprove_pay: false, // 买 实名认证 显示隐藏
            isapprove_sell: false, // 高级认证 显示隐藏
            t_isapprove: false, // 实名认证 显示隐藏
            allSeNum: false,
            allSeMoney: false,
            allNum: false,
            allMoney: false, // 获取焦点失去焦点
            PN_password: "",
            t_is_value_num: false,
            t_isOk: true,
            t_min_limit: "",
            t_max_limit: "",
            t_OTCForm: {
                price: "",
                BNumber: "",
                CMoney: "",
                way: []
            },
            t_OTCFormCm: 0,
            t_OTCFormNm: 0,
            t_isNowith: false,
            //上是在线购买
            OTCFormCm: 0,
            OTCFormNm: 0,
            isOkPu: true,
            is_value_num: false,
            t_isDown: false,
            t_isBorder: false,
            t_isShow: -1,
            t_isAtt: false,
            isOk: true,
            isNowith: false,
            isapprove: false,
            otcempty: false, //清空上次内容与样式
            isAttestation: false,
            isAtt: false,
            otcsell: this.$t("message.OTCBeal.Sell"), //  出售文字
            otcbuy: this.$t("message.OTCBeal.Buy"), // 购买文字
            wayotc: 1, // 1购买 , 2出出售
            min_price: 0,
            isBorder: false, // 边框 显示 隐藏
            isDown: false,
            isShow: -1, // 显示 隐藏 2 下标
            timer: null,
            timeFlag: true,
            min_limit: "",
            max_limit: "",
            coin_available_str: "",
            loading: false,
            currName: "",
            username_str: "",
            title_text: "",
            title_status: "",
            coin_way: null,
            otc_advertisement_id: null,
            username: "",
            dateTime: "",
            count: 0,
            countSale: 0,
            countSeller: 0,
            countBuy: 0,
            pageSize: 3,
            pageSizeSale: 3,
            identification: [],
            showTab: false,
            bgcolor_number: false,
            bgcolor: false,
            userInfo: {},
            priceMoney: null,
            moneyPrice: null,
            total: null,
            priceMoney_b: null,
            moneyPrice_b: null,
            total_b: null,
            sellerItem: [],
            buyItem: [],
            OTCForm: {
                price: "",
                BNumber: "",
                CMoney: "",
                way: []
            },
            ruleValidate: {
                BNumber: [
                    // {required: true, message: '请填写数量'}
                    { validator: validateNumber, trigger: "blur" }
                ],
                CMoney: [
                    // {required: true, message: '请填写金额'}
                    { validator: validateMoney, trigger: "blur" }
                ],
                way: [
                    {
                        required: true,
                        type: "string",
                        message: "请选择支付方式",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    components: {
        Model
    },
    computed: {
        ...mapGetters([
            'isLogin',
            'userStatus',
        ]),
        randomIndex() {
            return "#" + Math.floor(Math.random() * 16777215).toString(16);
        }
    },
    watch: {
        "OTCForm.CMoney": function () {
            //监视OTCForm.CMoney  判断是否可以提交
            if (
                this.OTCForm.CMoney > Number(this.max_limit) ||
                this.OTCForm.CMoney < Number(this.min_limit)
            ) {
                // this.isOk = true
                this.isNowith = true;
                this.isOk = true;
            } else {
                // this.isOk = false
                this.isNowith = false;
                this.isOk = false;
            }
            if (this.OTCForm.CMoney != "") {
                // 在线出售 CNY 全部
                this.allMoney = false;
            }
        },
        "OTCForm.BNumber": function () {
            // 在线出售  num 全部
            if (this.OTCForm.BNumber == "") {
                this.allNum = false;
            }
        },
        "t_OTCForm.CMoney": function () {
            // 在线购买
            if (
                this.t_OTCForm.CMoney > Number(this.t_max_limit) ||
                this.t_OTCForm.CMoney < Number(this.t_min_limit)
            ) {
                // this.isOk = true
                this.t_isNowith = true;
                this.t_isOk = true;
            } else {
                // this.isOk = false
                this.t_isNowith = false;
                this.t_isOk = false;
            }
            if (this.t_OTCForm.CMoney != "") {
                // 在线购买 CNY 全部
                this.allSeMoney = false;
            }
        },
        isShow: function () {
            this.isNowith = false;
        },
        t_isShow: function () {
            this.t_isNowith = false;
        }
    },
    methods: {
        onAttestation() {  // 出售认证
            this.t_isapprove = false // 出售 实名认证 显示隐藏
            this.isBorder = false;
            // 实名认证跳转
            var routeData = this.$router.resolve({
                path: "/accountSettings"
            });
            window.open(routeData.href, '_blank'); // 新页面打开
        },
        t_onAttestation() {  // 购买认证
            this.t_isBorder = false;
            this.isapprove_sell = false; // 买 高级认证 显示隐藏
            this.t_isapprove_pay = false; // 买 实名认证 显示隐藏
            // 实名认证跳转
            var routeData = this.$router.resolve({
                path: "/accountSettings"
            });
            window.open(routeData.href, '_blank'); // 新页面打开
        },
        a_onAttestation() {  // 购买支付方式
            this.t_isBorder = false;
            this.t_pay_way = false; // 隐藏支付方式 
            // 实名认证跳转
            var routeData = this.$router.resolve({
                path: "/accountSettings"
            });
            window.open(routeData.href, '_blank'); // 新页面打开
        },

        onAllNum() {
            // 在线出售 num
            if (
                Number(this.sellerItem[this.isShow].max_limit) >=
                this.coin_available_str * this.OTCForm.price
            ) {
                // num符合
                this.OTCForm.BNumber = (this.coin_available_str * 1).toFixed(8);
                this.OTCForm.CMoney = (
                    this.coin_available_str * this.OTCForm.price
                ).toFixed(2);
            }
            if (
                Number(this.sellerItem[this.isShow].max_limit) <
                this.coin_available_str * this.OTCForm.price
            ) {
                // num不符合
                this.OTCForm.BNumber = (
                    Number(this.sellerItem[this.isShow].max_limit) / this.OTCForm.price
                ).toFixed(8);
                this.OTCForm.CMoney = Number(
                    this.sellerItem[this.isShow].max_limit
                ).toFixed(2);
            }
        },
        numFocus() {
            // num 获取焦点
            // this.allNum = true
            watch: {
                if (this.OTCForm.BNumber == "") {
                    this.allNum = true;
                }
            }
        },
        FokeyUpNm() {
            if (this.OTCForm.BNumber == "") {
                this.allNum = true;
            } else {
                this.allNum = false;
            }
        },
        numBlur() {
            //num 失去焦点
            setTimeout(() => {
                this.allNum = false;
            }, 200);
        },
        onAllMoney() {
            // 在线出售CNY 全部
            if (
                Number(this.sellerItem[this.isShow].max_limit) >=
                this.coin_available_str * this.OTCForm.price
            ) {
                //  CNY符合范围
                this.OTCForm.CMoney = (
                    this.coin_available_str * this.OTCForm.price
                ).toFixed(2);
                this.OTCForm.BNumber = (this.coin_available_str * 1).toFixed(8);
            }
            if (
                Number(this.sellerItem[this.isShow].max_limit) <
                this.coin_available_str * this.OTCForm.price
            ) {
                //CNY 不符合范围
                this.OTCForm.CMoney = Number(
                    this.sellerItem[this.isShow].max_limit
                ).toFixed(2);
                this.OTCForm.BNumber = (
                    Number(this.sellerItem[this.isShow].max_limit) / this.OTCForm.price
                ).toFixed(8);
            }
        },
        getBlur() {
            // 在线出售CNY 失去焦点
            setTimeout(() => {
                this.allMoney = false;
            }, 200);
        },
        loseFocus() {
            // 在线出售CNY 获取焦点
            // this.allMoney = true;
            watch: {
                if (this.OTCForm.CMoney == "") {
                    this.allMoney = true;
                }
            }
        },
        FokeyUp() {
            if (this.OTCForm.CMoney == "") {
                this.allMoney = true;
            } else {
                this.allMoney = false;
            }
        },
        //在线购买num
        onSellNum() {
            //买 num 全部
            // this.allSeNum = false
            if (
                Number(this.buyItem[this.t_isShow].max_limit) >=
                this.buyItem[this.t_isShow].coin_available_str * this.t_OTCForm.price
            ) {
                this.t_OTCForm.CMoney = (
                    this.buyItem[this.t_isShow].coin_available_str * this.t_OTCForm.price
                ).toFixed(2);
                this.t_OTCForm.BNumber = (
                    this.buyItem[this.t_isShow].coin_available_str * 1
                ).toFixed(8);
            }
            if (
                Number(this.buyItem[this.t_isShow].max_limit) <
                this.buyItem[this.t_isShow].coin_available_str * this.t_OTCForm.price
            ) {
                this.t_OTCForm.BNumber = Number(
                    this.buyItem[this.t_isShow].max_limit / this.t_OTCForm.price
                ).toFixed(8);
                this.t_OTCForm.CMoney = (
                    this.t_OTCForm.BNumber * this.t_OTCForm.price
                ).toFixed(2);
            }
        },
        sellBlurNum() {
            // 买 num 失去焦点
            setTimeout(() => {
                this.allSeNum = false;
            }, 200);
        },
        sellFocusNum() {
            //  买 num 获取焦点
            watch: {
                if (this.t_OTCForm.BNumber == "") {
                    this.allSeNum = true;
                }
            }
        },
        FokeyUpbuyNm() {
            if (this.t_OTCForm.BNumber == "") {
                this.allSeNum = true;
            } else {
                this.allSeNum = false;
            }
        },
        //在线购买 CNY
        onSellMoney() {
            // 买 CNY 全部
            this.allSeMoney = false;
            if (
                Number(this.buyItem[this.t_isShow].max_limit) >=
                this.coin_available_str * this.t_OTCForm.price
            ) {
                //CNY 购买 符合范围
                this.t_OTCForm.CMoney = (
                    this.buyItem[this.t_isShow].coin_available_str * this.t_OTCForm.price
                ).toFixed(2);
                this.t_OTCForm.BNumber = (
                    this.buyItem[this.t_isShow].coin_available_str * 1
                ).toFixed(8);
            }
            if (
                Number(this.buyItem[this.t_isShow].max_limit) <
                this.coin_available_str * this.t_OTCForm.price
            ) {
                this.t_OTCForm.BNumber = Number(
                    this.buyItem[this.t_isShow].max_limit / this.t_OTCForm.price
                ).toFixed(8);
                this.t_OTCForm.CMoney = (
                    this.t_OTCForm.BNumber * this.t_OTCForm.price
                ).toFixed(2);
            }
        },
        sellBlur() {
            // 买CNY 失去焦点
            setTimeout(() => {
                this.allSeMoney = false;
            }, 200);
        },
        sellFocus() {
            // 买 CNY 获取焦点
            watch: {
                if (this.t_OTCForm.CMoney == "") {
                    this.allSeMoney = true;
                }
            }
        },
        FokeyUpbuy() {
            if (this.t_OTCForm.CMoney == "") {
                this.allSeMoney = true;
            } else {
                this.allSeMoney = false;
            }
        },
        isCancel() {
            // 点击取消 在线出售
            this.isBorder = false;
            this.isDown = false;
            this.isAtt = false;
            this.t_isAtt = false;
            this.is_value_num = false;
            this.t_isapprove = false; // 实名认证  显示隐藏
        },
        t_isCancel() {
            // 点击取消 在线购买
            this.t_pay_way = false // 支付方式隐藏
            this.t_isDown = false;
            this.t_isBorder = false;
            this.t_isAtt = false;
            this.t_is_value_num = false;
            this.isapprove_sell = false; // 高级认证 显示隐藏
            this.t_isapprove_pay = false; // 买 实名认证 显示隐藏
        },
        inpBlur() {
            //数量

            this.OTCForm.BNumber = this.OTCForm.BNumber.replace(
                /^(\-)*(\d+)\.([0-9]{1,8}).*$/,
                "$1$2.$3"
            ); // 限制小数点后八位
            this.OTCForm.BNumber = this.OTCForm.BNumber.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
            this.OTCForm.BNumber = this.OTCForm.BNumber.replace(/^\./g, ""); //验证第一个字符是数字
            this.OTCForm.BNumber = this.OTCForm.BNumber.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
            this.OTCForm.BNumber = this.OTCForm.BNumber.replace(".", "$#$")
                .replace(/\./g, "")
                .replace("$#$", ".");

            if (
                this.OTCForm.BNumber.length == 0 ||
                !/^\d+(\.\d+)?$/.test(this.OTCForm.BNumber.replace(/\s+/g, ""))
            ) {
                this.OTCForm.CMoney = "";
            } else {
                this.OTCForm.CMoney = (
                    this.OTCForm.BNumber * this.OTCForm.price
                ).toFixed(2);
            }
        },

        inpBlurMoney() {
            //金额
            this.OTCForm.CMoney = this.OTCForm.CMoney.replace(
                /^(\-)*(\d+)\.([0-9]{1,2}).*$/,
                "$1$2.$3"
            ); // 限制小数点后两位
            this.OTCForm.CMoney = this.OTCForm.CMoney.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
            this.OTCForm.CMoney = this.OTCForm.CMoney.replace(/^\./g, ""); //验证第一个字符是数字
            this.OTCForm.CMoney = this.OTCForm.CMoney.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
            this.OTCForm.CMoney = this.OTCForm.CMoney.replace(".", "$#$")
                .replace(/\./g, "")
                .replace("$#$", ".");

            if (
                this.OTCForm.CMoney.length == 0 ||
                !/^\d+(\.\d+)?$/.test(this.OTCForm.CMoney.replace(/\s+/g, ""))
            ) {
                this.OTCForm.BNumber = "";
            } else {
                this.OTCForm.BNumber = (
                    this.OTCForm.CMoney / this.OTCForm.price
                ).toFixed(8);
            }
        },

        t_inpBlur() {
            //  在线购买
            //数量
            this.t_OTCForm.BNumber = this.t_OTCForm.BNumber.replace(
                /^(\-)*(\d+)\.([0-9]{1,8}).*$/,
                "$1$2.$3"
            ); // 限制小数点后八位
            this.t_OTCForm.BNumber = this.t_OTCForm.BNumber.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
            this.t_OTCForm.BNumber = this.t_OTCForm.BNumber.replace(/^\./g, ""); //验证第一个字符是数字
            this.t_OTCForm.BNumber = this.t_OTCForm.BNumber.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
            this.t_OTCForm.BNumber = this.t_OTCForm.BNumber.replace(".", "$#$")
                .replace(/\./g, "")
                .replace("$#$", ".");

            if (
                this.t_OTCForm.BNumber.length == 0 ||
                !/^\d+(\.\d+)?$/.test(this.t_OTCForm.BNumber.replace(/\s+/g, ""))
            ) {
                this.t_OTCForm.CMoney = "";
            } else {
                this.t_OTCForm.CMoney = (
                    this.t_OTCForm.BNumber * this.t_OTCForm.price
                ).toFixed(2);
            }
        },

        t_inpBlurMoney() {
            //金额
            this.t_OTCForm.CMoney = this.t_OTCForm.CMoney.replace(
                /^(\-)*(\d+)\.([0-9]{1,2}).*$/,
                "$1$2.$3"
            ); // 限制小数点后两位
            this.t_OTCForm.CMoney = this.t_OTCForm.CMoney.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
            this.t_OTCForm.CMoney = this.t_OTCForm.CMoney.replace(/^\./g, ""); //验证第一个字符是数字
            this.t_OTCForm.CMoney = this.t_OTCForm.CMoney.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
            this.t_OTCForm.CMoney = this.t_OTCForm.CMoney.replace(".", "$#$")
                .replace(/\./g, "")
                .replace("$#$", ".");

            if (
                this.t_OTCForm.CMoney.length == 0 ||
                !/^\d+(\.\d+)?$/.test(this.t_OTCForm.CMoney.replace(/\s+/g, ""))
            ) {
                this.t_OTCForm.BNumber = "";
            } else {
                this.t_OTCForm.BNumber = (
                    this.t_OTCForm.CMoney / this.t_OTCForm.price
                ).toFixed(8);
            }
        },

        btcBuy( // 2 在线出售
            item,
            way,
            unit_price,
            currency_name,
            is_alipay,
            is_bank,
            is_paypal,
            is_wechatpay,
            otc_advertisement_id,
            min_limit,
            max_limit,
            coin_available_str,
            index
        ) {
            this.isShow = index;
            if (Number(unit_price) == 0 || unit_price == "") {
                // 当价格为0时 return
                return;
            }
            this.isNowith = false;
            this.t_isapprove = false; // 实名认证  显示隐藏

            this.OTCForm.CMoney = ''   // 清空输入框内容 
            this.OTCForm.BNumber = ''   // 清空输入框内容 

            item.loading = true

            if (this.timeFlag) {
                let params = {
                    otc_advertisement_id: otc_advertisement_id
                };
                api.prohibitransactionT(params).then(res => {
                    item.loading = false
                    if (res.status_code == 200) {
                        this.isAtt = true;
                        this.isBorder = true;
                        this.isDown = true;
                        this.OTCForm.BNumber = "";
                        this.OTCForm.CMoney = "";
                        this.OTCForm.way = [];
                        if (
                            Number(min_limit) >
                            Number(unit_price) * Number(coin_available_str)
                        ) {
                            // 判断最小值 与 单价 乘积
                            this.OTCForm.CMoney =
                                Number(unit_price) * Number(coin_available_str);
                            this.OTCForm.BNumber = Number(coin_available_str);
                            this.OTCFormCm = this.OTCForm.CMoney.toFixed(2);

                            this.OTCFormNm = Number(coin_available_str);
                            this.is_value_num = true;
                            this.isOk = false;
                        } else {
                            this.is_value_num = false;
                        }

                        if (coin_available_str * unit_price < min_limit) {
                            this.min_limit = coin_available_str * unit_price;
                        } else {
                            this.min_limit = min_limit;
                        }
                        // this.min_limit = min_limit;
                        this.max_limit = max_limit;
                        this.coin_available_str = coin_available_str;
                        if (way == 2) {
                            this.title_text = "购买";
                            this.title_status = 2;
                        } else {
                            this.title_text = "出售";
                            this.title_status = 1;
                        }
                        this.coin_way = way;
                        this.otc_advertisement_id = otc_advertisement_id;
                        this.OTCForm.price = unit_price;
                        this.OTCForm.currency_name = currency_name;
                        this.currName = this.$route.query.currName;
                        this.showTab = true;
                        if (is_paypal == 2) {
                            this.OTCForm.way.push("paypal");
                        }
                        if (is_bank == 2) {
                            this.OTCForm.way.push("bankCard");
                        }
                        if (is_alipay == 2) {
                            this.OTCForm.way.push("alipay");
                        }
                        if (is_wechatpay == 2) {
                            this.OTCForm.way.push("wechat");
                        }
                    } else if (res.status_code == 8001) {
                        this.$Message.error("请绑定并激活支付方式!");
                    } else if (res.status_code == 6024) {
                        this.t_isapprove = true; // 实名认证  显示隐藏
                        this.isAtt = false; // 下拉 显示隐藏
                        this.isBorder = true; // border
                        // this.$Message.error("请先进行实名认证!");
                    } else if (res.status_code == 6023) {
                        this.$Message.error("高级认证审核中请耐心等待!");
                    }
                    // else if (res.status_code === 6022) {
                    //   this.$Message.error("请先进行高级认证");
                    // }
                    else if (res.status_code == 8014) {
                        this.$Message.error("您没有足够的资金进行交易");
                    }
                });
            } else {
                item.loading = false
                // this.isDown = false; // 下拉 显示隐藏
                this.$Message.error("交易时间超过1分钟，请重新刷新页面");
            }
        },
        t_btcBuy( //在线购买   1
            item,
            way,
            unit_price,
            currency_name,
            is_alipay,
            is_bank,
            is_paypal,
            is_wechatpay,
            otc_advertisement_id,
            min_limit,
            max_limit,
            coin_available_str,
            index
        ) {
            if (!this.userStatus.pin) { //资金密码

                this.$FundPas({
                    success: () => {
                        this.$store.dispatch('getUserStatus'); //获取最新用户信息
                    }
                })

                return
            }
            if (Number(unit_price) === 0 || unit_price == "") {
                // 当价格为0时 return
                return;
            }
            this.t_pay_way = false // 支付方式
            this.PN_password = ""; // 清空资金密码
            this.t_isShow = index;
            this.t_isNowith = false;
            this.isapprove_sell = false; // 高级认证 显示隐藏
            this.t_isapprove_pay = false; // 买 实名认证 显示隐藏

            this.t_OTCForm.CMoney = ''  // 清空输入框内容 
            this.t_OTCForm.BNumber = '' // 清空输入框内容 

            item.loading = true

            if (this.timeFlag) {
                let params = {
                    otc_advertisement_id: otc_advertisement_id
                };
                api.prohibitransactionT(params).then(res => {
                    item.loading = false
                    if (res.status_code == 200) {
                        this.t_isDown = true;
                        this.t_isBorder = true;
                        this.t_isAtt = true;
                        this.t_OTCForm.BNumber = "";
                        this.t_OTCForm.CMoney = "";
                        this.t_OTCForm.way = [];

                        if (
                            Number(min_limit) >
                            Number(unit_price) * Number(coin_available_str)
                        ) {
                            // 判断最小值 与 单价 乘积
                            this.t_OTCForm.CMoney =
                                Number(unit_price) * Number(coin_available_str);
                            this.t_OTCForm.BNumber = Number(coin_available_str);
                            this.t_OTCFormCm = this.t_OTCForm.CMoney.toFixed(2);

                            this.t_OTCFormNm = Number(coin_available_str);
                            this.t_is_value_num = true;
                            this.t_isOk = false;
                        } else {
                            this.t_is_value_num = false;
                        }

                        if (coin_available_str * unit_price < min_limit) {
                            this.t_min_limit = coin_available_str * unit_price;
                        } else {
                            this.t_min_limit = min_limit;
                        }
                        // this.min_limit = min_limit;
                        this.t_max_limit = max_limit;
                        this.coin_available_str = coin_available_str;
                        if (way == 2) {
                            this.title_text = "购买";
                            this.title_status = 2;
                        } else {
                            this.title_text = "出售";
                            this.title_status = 1;
                        }
                        this.coin_way = way;
                        this.otc_advertisement_id = otc_advertisement_id;
                        this.t_OTCForm.price = unit_price;
                        this.t_OTCForm.currency_name = currency_name;
                        this.currName = this.$route.query.currName;
                        this.showTab = true;
                        if (is_paypal == 2) {
                            this.t_OTCForm.way.push("paypal");
                        }
                        if (is_bank == 2) {
                            this.t_OTCForm.way.push("bankCard");
                        }
                        if (is_alipay == 2) {
                            this.t_OTCForm.way.push("alipay");
                        }
                        if (is_wechatpay == 2) {
                            this.t_OTCForm.way.push("wechat");
                        }
                    } else if (res.status_code == 8001) {
                        this.t_pay_way = true  // 支付方式 
                        this.t_isAtt = false; // 下拉
                        this.t_isBorder = true; // border
                        // this.$Message.error("请绑定并激活支付方式!");
                    } else if (res.status_code == 6024) {
                        this.t_isapprove_pay = true; // 买 实名认证 显示隐藏
                        this.t_isAtt = false; // 下拉
                        this.t_isBorder = true; // border
                        // this.$Message.error("请先进行实名认证!");
                    } else if (res.status_code == 6023) {
                        this.$Message.error("高级认证审核中请耐心等待!");
                    } else if (res.status_code === 6022) {
                        this.isapprove_sell = true; // 高级认证 显示隐藏
                        this.t_isAtt = false; // 下拉
                        this.t_isBorder = true; // border
                        // this.$Message.error("请先进行高级认证");
                    } else if (res.status_code == 8014) {
                        this.$Message.error("您没有足够的资金进行交易");
                    }
                });
            } else {
                item.loading = false
                this.$Message.error("交易时间超过1分钟，请重新刷新页面");
            }
        },
        hide(data) {
            this.$refs["OTCForm"].resetFields();
            this.showTab = data;
        },
        buy_btn() {
            // 提交在线出售
            if (this.timeFlag) {
                //   this.$refs['OTCForm'].validate((valid) => {
                //   if (valid) {
                this.loading = true;
                //   let params = {
                //       otc_advertisement_id: this.otc_advertisement_id,
                //       transac_coin_number: this.OTCForm.BNumber,

                //       transac_coin_unit_price: this.OTCForm.price,
                //       transac_currency_number: this.OTCForm.CMoney
                //   };
                let params = {};
                if (this.is_value_num) {
                    params = {
                        otc_advertisement_id: this.otc_advertisement_id,
                        transac_coin_number: this.OTCFormNm,
                        transac_coin_unit_price: this.OTCForm.price,
                        transac_currency_number: this.OTCFormCm
                    };
                } else {
                    params = {
                        otc_advertisement_id: this.otc_advertisement_id,
                        transac_coin_number: this.OTCForm.BNumber,
                        transac_coin_unit_price: this.OTCForm.price,
                        transac_currency_number: this.OTCForm.CMoney
                    };
                }

                let tip = "";
                if (this.title_text == "出售") {
                    tip = "sell";
                } else if (this.title_text == "购买") {
                    tip = "buy";
                }
                api
                    .advertiserBuyUrl(params)
                    .then(res => {
                        this.loading = false;
                        if (res.status_code == 200) {
                            this.$Message.success("成功");
                            this.showTab = false;
                            this.$router.push({
                                path: "/order",
                                query: {
                                    otc_transac_id: res.data,
                                    member: "user",
                                    type: tip
                                }
                            });
                        } else if (res.status_code == 6024) {
                            this.$Message.error("请先进行实名认证");
                        } else if (res.status_code == 8014) {
                            this.$Message.error("您没有足够的资金进行交易");
                        } else if (res.status_code == 6023) {
                            this.$Message.error("高级认证审核中请耐心等待!");
                        } else if (res.status_code === 6022) {
                            this.$Message.error("请先进行高级认证");
                        } else if (res.status_code == 8001) {
                            this.$Message.error("请绑定并激活支付方式!");
                        } else if (res.status_code == 8020) {
                            this.$Message.error("币数量不能大于剩余量");
                        } else if (res.status_code == 8019) {
                            this.$Message.error("金额要小于等于最大限额");
                        }
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$Message.error('获取信息失败!');
                    });
                //   }
                //   })
            } else {
                this.$Message.error("交易时间超过1分钟，请重新刷新页面");
            }
        },
        t_buy_btn() {
            // 提交在线购买
            if (this.timeFlag) {
                if (this.PN_password == "") {
                    this.$Message.error("请填写资金密码");
                    return;
                }
                this.loading = true;
                let params = {};
                if (this.t_is_value_num) {
                    params = {
                        otc_advertisement_id: this.otc_advertisement_id,
                        transac_coin_number: this.t_OTCFormNm,
                        transac_coin_unit_price: this.t_OTCForm.price,
                        transac_currency_number: this.t_OTCFormCm,
                        pin: this.PN_password
                    };
                } else {
                    params = {
                        otc_advertisement_id: this.otc_advertisement_id,
                        transac_coin_number: this.t_OTCForm.BNumber,
                        transac_coin_unit_price: this.t_OTCForm.price,
                        transac_currency_number: this.t_OTCForm.CMoney,
                        pin: this.PN_password
                    };
                }

                let tip = "";
                if (this.title_text == "出售") {
                    tip = "sell";
                } else if (this.title_text == "购买") {
                    tip = "buy";
                }
                api
                    .advertiserBuyUrl(params)
                    .then(res => {
                        this.loading = false;
                        if (res.status_code == 200) {
                            this.$Message.success("成功");
                            this.showTab = false;
                            this.$router.push({
                                path: "/order",
                                query: {
                                    otc_transac_id: res.data,
                                    member: "user",
                                    type: tip
                                }
                            });
                        } else if (res.status_code == 6024) {
                            this.$Message.error("请先进行实名认证");
                        } else if (res.status_code == 8014) {
                            this.$Message.error("您没有足够的资金进行交易");
                        } else if (res.status_code == 6023) {
                            this.$Message.error("高级认证审核中请耐心等待!");
                        } else if (res.status_code === 6022) {
                            this.$Message.error("请先进行高级认证");
                        } else if (res.status_code == 8001) {
                            this.$Message.error("请绑定并激活支付方式!");
                        } else if (res.status_code == 8020) {
                            this.$Message.error("币数量不能大于剩余量");
                        } else if (res.status_code == 8019) {
                            this.$Message.error("金额要小于等于最大限额");
                        }
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$Message.error('获取信息失败!');
                    });
                //   }
                //   })
            } else {
                this.$Message.error("交易时间超过1分钟，请重新刷新页面");
            }
        },
        advertiserInfo() {
            let params = {
                otc_advertiser_id: this.$route.query.otc_advertisement_id
            };
            api.advertiserInfo(params).then(res => {
                if (res.status_code == 200) {
                    this.dateTime = res.data.create_at;
                    this.username_str = res.data.user_name.substring(0, 1);
                    this.userInfo = res.data;
                    this.identification = res.data.identification;
                    this.advertiseSellerUrl(1);
                    this.advertiseBuyUrl(1);
                }
            });
        },
        exchange() {
            api.rateCoinRequest().then(res => {
                //币转成美元
                if (res.code == 200) {
                    for (let i in res.data.quotes) {
                        for (let j of this.sellerItem) {
                            if (i == j.coin_name) {
                                j.loading = false
                                this.priceMoney = 1 / res.data.quotes[i]; //一个币等于多少美元

                                api.rateMoneyRequest().then(response => {
                                    //美元转qian
                                    if (response.code == 200) {
                                        this.moneyPrice = response.data.rates[j.currency_name]; //一美元等于多少币的qian

                                        this.total = (1 / res.data.quotes[i]) * this.moneyPrice;

                                        j.unit_price = (
                                            this.total +
                                            this.total * (j.currency_margin / 100)
                                        ).toFixed(2);
                                    }
                                });
                            }
                        }
                    }
                }
            });
        },

        b_exchange() {
            api.rateCoinRequest().then(res => {
                //币转成美元
                if (res.code == 200) {
                    for (let i in res.data.quotes) {
                        for (let j of this.buyItem) {
                            if (i == j.coin_name) {
                                j.loading = false
                                this.priceMoney_b = 1 / res.data.quotes[i]; //一个币等于多少美元

                                api.rateMoneyRequest().then(response => {
                                    //美元转qian
                                    if (response.code == 200) {
                                        this.moneyPrice_b = response.data.rates[j.currency_name]; //一美元等于多少币的qian

                                        this.total_b = (1 / res.data.quotes[i]) * this.moneyPrice_b;

                                        j.unit_price = (
                                            this.total_b +
                                            this.total_b * (j.currency_margin / 100)
                                        ).toFixed(2);
                                    }
                                });
                            }
                        }
                    }
                }
            });
        },

        advertiseSellerUrl(page) {
            //在线出售
            api
                .advertiseSellerUrl({
                    page: page,
                    limit: this.pageSize,
                    otc_advertisement_type: 1,
                    otc_advertiser_id: this.$route.query.otc_advertisement_id
                })
                .then(res => {
                    if (res.status_code == 200) {
                        this.sellerItem = res.data.list;
                        this.countSale = res.data.page.count;
                        this.exchange();
                    }
                })
                .catch(error => {
                    this.$Message.error('获取信息失败!');
                });
        },
        advertiseBuyUrl(page) {
            //在线购买
            api
                .advertiseSellerUrl({
                    page: page,
                    limit: this.pageSize,
                    otc_advertisement_type: 2,
                    otc_advertiser_id: this.$route.query.otc_advertisement_id
                })
                .then(res => {
                    if (res.status_code == 200) {
                        this.buyItem = res.data.list;
                        this.count = res.data.page.count;
                        this.b_exchange();
                    }
                })
                .catch(error => {
                    this.$Message.error('获取信息失败!');
                });
        },
        changePage(page) {
            this.PN_password = ""; //清空资金密码
            //分页购买
            this.isapprove_sell = false; // 高级认证 显示隐藏
            this.t_isapprove_pay = false; // 买 实名认证 显示隐藏
            window.clearInterval(this.timer);
            this.t_isShow = -1
            this.timeFlag = true;
            this.timer = setInterval(this.getResult, 60000);
            this.advertiseBuyUrl(page);
        },
        changePageSale(page) {
            //分页出售
            this.t_isapprove = false; // 实名认证  显示隐藏
            window.clearInterval(this.timer);
            this.timeFlag = true;
            this.isShow = -1
            this.timer = setInterval(this.getResult, 60000);
            this.advertiseSellerUrl(page);
        },
        getResult() {
            this.timeFlag = false;
        }
    },
    mounted() {
        if (utils.isLogin()) {
            //  头部otc订单状态,未登录时不显示
            this.$store.commit("changeOTCOrderShow", 1);
        }
        // this.$store.commit("changeOTCOrderShow", 1);
        this.advertiserInfo();
        window.clearInterval(this.timer);
        this.timeFlag = true;
        this.timer = setInterval(this.getResult, 60000);
    },
    beforeDestroy() {
        clearInterval(this.timer)
        this.$store.commit("changeOTCOrderShow", 0);
    },
    updated() {

    }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}

.allNew {
  color: #5a75cc !important;
}
.otc-font-hint{
    line-height: 1.6rem !important 
}
.otc_sell_input {
  position: relative;
  background-color: rgba(255, 255, 255, 0);
}
</style>

