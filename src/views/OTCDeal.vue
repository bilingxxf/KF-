<template>
    <div>
        <Content>
            <div class="otc-detail">
                <div class="otc-wrap">
                    <div class="head-content">
                        <div class="head-left">
                            <div class="way">
                                <p>购买 </p>
                                <div>
                                    <p @click="curr(1,index)" v-for="(currency,index) in currencyItem" :class="{'check':index == currentIndex}" :key="index">
                                        <span>{{currency.coin_name}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="way">
                                <p>出售</p>
                                <div>
                                    <p @click="curr(2,index)" v-for="(currency,index) in currencyItem" :class="{'check':index == currentIndex_sell}" :key="index">
                                        <span>{{currency.coin_name}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="head-right">
                            <Dropdown trigger="click" @on-click="changeWay">
                                <a href="javascript:void(0)" v-if="!pay_way">
                                  		请选择支付方式
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <a href="javascript:void(0)" v-if="pay_way">
                                    {{payCurrent}}
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem v-for="item in payway" :value="item.value" :key="item.value" :name="item.name">{{ item.name }}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <!-- 商家列表  -->
                    <!--
                    <div class="deal-content">
                        <Table :columns="columns" :data="data" id="tables" :no-data-text="none_text"></Table>
                    </div>
                    -->
                    <div class="otc-user-list">
                        <ul class="otc-list-top">
                            <li class="otc-res-01">商家(30天成单
                                <em>|</em>完成率)</li>
                            <li class="otc-res-02">数量</li>
                            <li class="otc-res-03">限额</li>
                            <li>单价</li>
                            <li class="otc-res-05">支付方式</li>
                            <li style="padding-left: 5rem;">操作</li>
                        </ul>
                        <ul class="otc-list-cn">
                            <li v-for="(item,index) in data" style="position: relative;"  v-if="item.otc_advertisement_status != 2" :class="{box_sh_br : (index == showdemo && isBorder) }">
                                <div class="otc-list-user-t">
                                    <div class="otc-com otc-cursor otc-res-01" @click="seller(index, item.color, item.otc_advertiser_id,item.coin_available_str)">
                                        <div class="cricle" :style="{ backgroundColor:item.color }">
                                            <span></span>
                                            <i>{{ item.advertiser_name.substring(0, 1).toUpperCase() }}</i>
                                        </div>
                                        <div class="proper">
                                            <p>
                                                <span> {{ item.advertiser_name }} ({{item.finish_count_by_30_d}} </span>
                                                <em>|</em>{{(item.completion*100).toFixed(1)}}%)
                                            </p>
                                        </div>
                                    </div>
                                    <div class="otc-com otc-res-02">{{ item.coin_available_str }} {{item.coin_name }}</div>
                                    <div class="otc-com otc-res-03">
                                        <span>
                                            <!-- 判断数量乘单价是否小于最小单价 -->
                                            <i v-if="( (Number(item.coin_available_str) * Number(item.unit_price)) > Number(item.min_limit) ) || item.unit_price == 0">{{ item.min_limit }} - {{ item.max_limit }} {{ item.currency_name }}</i>
                                            <i v-else> {{ (Number(item.coin_available_str) * Number(item.unit_price)).toFixed(2) }} </i>
                                        </span>
                                    </div>
                                    <div class="otc-com otc-font-money">{{ item.unit_price }} {{ item.currency_name }}</div>
                                    <div class="otc-com otc-font-bak otc-res-05">
                                        <span v-bind:class="{ 'icon-paypal' : item.is_paypal == 2 ? true : false , 'icon_show':item.is_paypal == 2 ? true : false}"></span>
                                        <span :class="{ 'icon-pay': item.is_alipay == 2 ? true : false,  'icon_show': item.is_alipay == 2 ? true : false}"></span>
                                        <span v-bind:class="{ 'icon-card': item.is_bank == 2 ? true : false, 'icon_show':item.is_bank == 2 ? true : false}"></span>
                                        <span v-bind:class="{ 'icon-wechat-pay': item.is_wechatpay == 2 ? true : false,'icon_show':item.is_wechatpay == 2 ? true : false }"></span>
                                    </div>
                                    <div class="otc-com" style="text-align: right;">
                                        <div class="otc-button" href="javascript:;" v-show="showdemo != index || !isBorder">
                                            <!-- params.row.otc_advertisement_type == 2 PULL -->
                                            <Button type="primary" :loading="item.loading" @click="btcBuy('购买', item, item.currency_name, item.unit_price, item.is_paypal, item.is_alipay, item.is_bank, item.is_wechatpay, item.otc_advertisement_id, item.min_limit, item.max_limit, item.coin_available_str,index ,item.otc_advertisement_type)" v-if="item.otc_advertisement_type == 1"> {{ otcbuy }}{{item.coin_name}}</Button>
                                            <Button type="primary" :loading="item.loading" @click="btcBuy('出售', item, item.currency_name, item.unit_price, item.is_paypal, item.is_alipay, item.is_bank, item.is_wechatpay, item.otc_advertisement_id, item.min_limit, item.max_limit, item.coin_available_str,index ,item.otc_advertisement_type)" v-if="item.otc_advertisement_type == 2">{{ otcsell }}{{item.coin_name}}</Button>
                                        </div>
                                        <!-- 实名认证 -->
                                        <div class="otc-attestation" v-if="showdemo == index && t_isapprove">
                                            	购买需
                                            <a href="javascript:;" @click="onAttestation">实名认证</a>
                                        </div>
                                        <div class="otc-attestation" v-if="showdemo == index && t_isapprove_sell">
                                            	出售需
                                            <a href="javascript:;" @click="onAttestation">实名认证</a>
                                        </div>
                                        <!-- 高级认证 -->
                                        <div class="otc-attestation" v-if="isapprove && showdemo == index">
                                            	出售需
                                            <a href="javascript:;" @click="onAttestation">高级认证</a>
                                        </div>
                                        <!-- 支付方式 -->
                                        <div class="otc-attestation" v-if="showdemo == index && t_pay_way">
                                           	 请绑定并激活
                                            <a href="javascript:;" @click="a_onAttestation">支付方式</a>
                                        </div>
                                        <div class="otc-tim-lim" v-if="isAtt && showdemo == index">买方付款时限为15分钟</div>
                                    </div>
                                </div>
                                <section v-show="showdemo == index && isAtt" class="otc-details">
                                    <div slot="modelSlotContent" class="otcTip-details" :class="{otcTip_details_new : item.otc_advertisement_type == 2}">
                                        <Form :rules="ruleValidate" ref="OTCForm" :model="OTCForm">
                                            <FormItem prop="CMoney" class="otcTip">
                                                <div class="inputDiv">
                                                    <!--
                                                    <p class="bgFirst" :class="{ 'bghuang' : bgcolor }">
                                                        <span>{{ $t(`message.Amounts`) }}{{OTCForm.currency_name}}</span>
                                                    </p>
                                                    -->
                                                    <p class="inputDiv-p">
                                                        <!-- 禁止输入值 -->
                                                        <input v-if="is_value_num" placeholde="OTCFormCm" v-model="OTCFormCm" :readonly="is_value_num" class="bgInput" />
                                                        <!-- 正常值 -->
                                                        <input v-else maxlength="12" autocomplete="off" v-model="OTCForm.CMoney" class="bgInput" v-on:blur="getBlur" v-on:keyup="FokeyUp" v-on:focus="loseFocus" @input="inpBlurMoney(OTCForm.CMoney)" onkeydown="if(event.keyCode==32) return false; ">
                                                        <i class="otc-font-hint" v-show="!allMoney">CNY</i>
                                                        <i class="otc-font-hint allNew" v-show="allMoney" @click="onAllMoney">全部</i>
                                                        <span v-show="isNowith" class="inputDiv-s">不在交易金额范围内</span>
                                                    </p>
                                                </div>
                                            </FormItem>
                                            <img class="otcTip-img" src="../../static/img/conversion.png" alt="">
                                            <FormItem prop="BNumber" class="otcTip">
                                                <div class="inputDiv">
                                                    <!--
                                                    <p class="bgFirst" :class="{ 'bghuang' : bgcolor_number }">
                                                        <span v-if="title_text == '购买'">{{ $t(`message.DealCenter.PurchaseVolume`) }}{{currName}}</span>
                                                        <span v-if="title_text == '出售'">卖出量{{currName}}</span>
                                                    </p>
                                                    -->
                                                    <p class="inputDiv-p">
                                                        <!-- 禁止输入值 -->
                                                        <input v-if="is_value_num" placeholde="OTCFormBm" v-model="OTCFormBm" :readonly="is_value_num" class="bgInput">
                                                        <!-- 正常值 -->
                                                        <input v-else maxlength="20" :placeholder="coin_way == 2 ? `余额:${Number(item.coin_amount_str) || ''}` : ''" autocomplete="off" v-model="OTCForm.BNumber" class="bgInput otc_sell_input" v-on:keyup="FokeyUpNm" v-on:blur="numBlur" v-on:focus="numFocus" @input="inpBlur(OTCForm.BNumber)" onkeydown="if(event.keyCode==32) return false">
                                                        <i class="otc-font-hint" v-show="!allNum">{{ currName }}</i>
                                                        <i class="otc-font-hint allNew" v-show="allNum" @click="onAllNum">全部</i>
                                                        <span v-show="isNumMax" class="inputDiv-s">超过最大剩余数量</span>
                                                    </p>
                                                </div>
                                            </FormItem>
                                            <!-- 资金密码 -->
                                            <div v-if="item.otc_advertisement_type == 2" class="otcTip-details-mony">
                                                <input placeholder="请输入资金密码" type="password" v-model="PN_password" />
                                            </div>
                                           
                                        </Form>
                                        <div v-show="passwordShow" class="repsd_marked">{{ strpsdWords }}</div>
                                    </div>
                                    <div slot="modelSlotFooter" class="buy_btn_cn">
                                        <!-- {{title_text}} {{currName}}  buy_btn-->
                                        <Button type="primary" :disabled="isOk" class="buy_btn" @click="buy_btn(item)" :loading="loading">下单</Button>
                                        <a @click="but_cancel" class="buy_btn_cancel" href="javascript:;">取消</a>
                                    </div>
                                </section>
                            </li>
                        </ul>
                    </div>
                    <div class="deal-page" v-if="data.length > 0">
                        <!-- 分布 -->

                        <Page :total="count" class="pageOrder" :page-size="pageSize" :current="currentPage" @on-change="changePage"></Page>
                    </div>
                    <div v-else v-html="none_text"></div>
                </div>
                <!-- 弹出开始 v-show="showTab" @hide="hide" -->
                <!-- <div v-show="showdemo">
                    <div slot="modelSlotContent">
                        <Form :rules="ruleValidate" ref="OTCForm" :model="OTCForm">
                            <FormItem prop="price" class="otcTip">
                                <div class="inputDiv">
                                    <p class="bgFirst">
                                        <span v-if="title_text == '购买'">{{ $t(`message.BuyUnitPrice`) }}{{OTCForm.currency_name}}</span>
                                        <span v-if="title_text == '出售'">卖出单价{{OTCForm.currency_name}}</span>
                                    </p>
                                    <p><input type="number" v-model="OTCForm.price" class="bgInput" disabled="disabled"></p>
                                </div>
                            </FormItem>
                            <FormItem prop="BNumber" class="otcTip">
                                <div class="inputDiv">
                                    <p class="bgFirst" :class="{ 'bghuang' : bgcolor_number }">
                                        <span v-if="title_text == '购买'">{{ $t(`message.DealCenter.PurchaseVolume`) }}{{currName}}</span>
                                        <span v-if="title_text == '出售'">卖出量{{currName}}</span>
                                    </p>
                                    <p><input autocomplete="off" v-model="OTCForm.BNumber" class="bgInput" v-on:blur="bgcolor_number = false" v-on:focus="bgcolor_number = true" @input="inpBlur(OTCForm.BNumber)" onkeydown="if(event.keyCode==32) return false"></p>
                                </div>
                            </FormItem>
                            <FormItem prop="CMoney" class="otcTip">
                                <div class="inputDiv">
                                    <p class="bgFirst" :class="{ 'bghuang' : bgcolor }">
                                        <span>{{ $t(`message.Amounts`) }}{{OTCForm.currency_name}}</span>
                                    </p>
                                    <p><input autocomplete="off" v-model="OTCForm.CMoney" class="bgInput" v-on:blur="bgcolor = false" v-on:focus="bgcolor = true" @input="inpBlurMoney(OTCForm.CMoney)" onkeydown="if(event.keyCode==32) return false"></p>
                                </div>
                            </FormItem>                     
                        </Form>
                    </div>
                    <div slot="modelSlotFooter">
                        <Button type="primary" class="buy_btn" @click="buy_btn" :loading="loading">{{title_text}}{{currName}}</Button>
                    </div>
                </div>  -->
                <!-- 弹出结束 -->
            </div>
        </Content>
    </div>
</template>
<script>
import Model from "./model/Model.vue";
import api from "../api";
import utils from "../utils";

import $ from "jquery";
import resHost from "../../static/config.json";
import resOnline from "../../static/configOnline.json";
import { mapGetters } from 'vuex'
import { exchange } from '../common/js/N.js'

export default {
    props: ["sendData"],
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
                callback(new Error("交易金额小数点后不能大于两位"));
            } else {
                callback();
            }
        };
        const validateNumber = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("message.AssetRecord.EnterVolumn")));
            } else if (!/^\d+(\.\d+)?$/.test(value)) {
                callback(new Error("请填写正确数字"));
            } else if (value < 0) {
                callback(new Error("请填写正确数字"));
            } else if (Number(value) > Number(this.coin_available_str)) {
                callback(new Error("数量不能超出总数量"));
            } else if (!/^\d+(\.\d{1,8})?$/.test(value)) {
                callback(new Error("交易数量小数点后不能大于八位"));
            } else {
                callback();
            }
        };
        return {
        	passwordShow: false, // 资金密码提示
        	strpsdWords: '资金密码不能为空', // 资金密码错误提示语
            t_isapprove_sell: false, // 出售实名认证
            t_pay_way: false, // 绑定支付方式显示隐藏
            t_isapprove: false, // 实名认证
            allNum: false,
            allMoney: false,
            isSellCl: false,
            PN_password: "", // 资金密码
            // istimlim: true,
            isNumMax: false, // 超过最大剩余数量
            is_value_min: false, // 最值小单价显示
            OTCFormCm: 0,
            OTCFormBm: 0,
            is_value_num: false,
            isOk: true,
            isNowith: false,
            isapprove: false,  // 高级认证 显示隐藏
            isBorder: false,
            otcempty: false, //清空上次内容与样式
            isAttestation: false,
            isAtt: false,
            otcsell: this.$t("message.OTCBeal.Sell"), //  出售文字
            otcbuy: this.$t("message.OTCBeal.Buy"), // 购买文字
            wayotc: 1, // 1购买 , 2出出售
            min_price: 0,
            showdemo: -1, //显示 隐藏
            timeFlag: true,
            timer: null,
            loading: false,
            number: null,
            moneyPrice: null,
            total: null,
            priceMoney: null,
            // showTab: false,  //弹窗
            paymodel: "",
            bgcolor: false,
            bgcolor_number: false,
            currentIndex: "",
            currentIndex_sell: "-1",
            currId: "",
            currName: "",
            way: "",
            coin_way: 2,
            pay_way: false,
            count: 0,
            pageSize: 8,
            currentPage: 1,
            title_text: "",
            min_limit: "", //最小限额
            max_limit: "", //最大限额
            coin_available_str: "", //最大数量
            nameText: "",
            colorList: [
                "#FFFF99",
                "#B5FF91",
                "#94DBFF",
                "#FFBAFF",
                "#FFBD9D",
                "#C7A3ED",
                "#CC9898",
                "#8AC007",
                "#CCC007",
                "#FFAD5C"
            ],
            payCurrent: "",
            payCurrent_lang: "",
            texts: "",
            payway: [
                { value: "0", name: "全部" },
                { value: "1", name: this.$t("message.WeChat") },
                { value: "2", name: this.$t("message.AliPay") },
                { value: "3", name: this.$t("message.BankCard") },
                { value: "4", name: "paypal" }
            ],
            OTCForm: {
                price: "",
                BNumber: "",
                CMoney: "",
                way: []
            },
            ruleValidate: {
                BNumber: [
                    // {required: true, message: this.$t('message.AssetRecord.EnterVolumn')}
                    { validator: validateNumber, trigger: "blur" }
                ],
                CMoney: [
                    // {required: true, message: this.$t('message.AssetRecord.EnterAmounts')}
                    { validator: validateMoney, trigger: "blur" }
                ]
            },
            otc_advertisement_id: "",
            currencyItem: [],

            data: [],
            none_text:
                '<div style="text-align: center;margin-top: 1.5rem"><p class="icon-no_info" style="font-size: 10rem;"></p><p style="font-size: 1rem;">' +
                this.$t("message.NoData") +
                "...</p></div>"
        };
    },
    components: {
        Model
    },
    mounted() {
        if (utils.isLogin()) {
            //  头部otc订单状态,未登录时不显示
            // console.log(11111);
            this.$store.commit("changeOTCOrderShow", 1);
        }

        this.getCoinList();
        window.clearInterval(this.timer);
        this.timeFlag = true;
        this.timer = setInterval(this.getResult, 60000);

        //  计算 min_price
        // if ((Number(this.data.coin_available_str) * Number(this.data.unit_price)) < Number(this.data.min_limit)) {
        //     return this.min_price = (Number(this.data.coin_available_str) * Number(this.data.unit_price)).toFixed(2)
        // } else {
        //    return this.min_price = this.data.min_limit
        // }

    },
    beforeDestroy() {
        clearInterval(this.timer)
        this.$store.commit("changeOTCOrderShow", 0);
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
        // isLogin(){  // 是否登录
        //   if(this.isLogin){
        //       console.log(55555);
        //   }else{
        //     console.log(999999);
        //   }
        // },
        // if (utils.isLogin())  是否登录
        // money(val) {
        //     if (val == 0) {
        //         this.OTCForm.BNumber = '';
        //     }else if((typeof (val)) == 'string'){
        //         console.log(val)
        //         this.OTCForm.CMoney = val;
        //         this.OTCForm.BNumber = val / this.OTCForm.price;
        //     }
        // },
        // num(val) {
        //     if (val == 0) {
        //         this.OTCForm.CMoney = '';
        //     } else if((typeof (val)) == 'string'){
        //         console.log(this.OTCForm.price)
        //         console.log(val)
        //         this.OTCForm.BNumber = val;
        //         this.OTCForm.CMoney = val * this.OTCForm.price;
        //     }
        // }
        "OTCForm.BNumber": function () {
            //监视BTC数量
            // coin_available_str
            if (
                Number(this.data[this.showdemo].coin_available_str) <
                this.OTCForm.BNumber
            ) {
                // console.log("OK");
                this.isNumMax = true;
                this.isOk = true;
            } else {
                // console.log("NO");
                this.isNumMax = false;
                this.isOk = false;
            }
            if (this.OTCForm.BNumber != '') {  // 当输入框有值时，币数量不显示全部
                // console.log(55555);
                this.allNum = false;
            }
        },
        "OTCForm.CMoney": function () {
            //监视OTCForm.CMoney  判断是否可以提交
            if (
                this.OTCForm.CMoney > Number(this.data[this.showdemo].max_limit) ||
                this.OTCForm.CMoney < Number(this.data[this.showdemo].min_limit)
            ) {
                // 大于最大值 小于最小值
                this.isOk = true;
                this.isNowith = true;
            } else {
                this.isOk = false;
                this.isNowith = false;
            }
            if (this.OTCForm.CMoney != '') {  // 当输入框有值时，CNY不显示全部
                // console.log(55555);   
                this.allMoney = false;
            }
        },
        // PN_password() {   // 校验空资金密码
        //   if (this.wayotc == 2) {
        //     // console.log(11111);
        //     if (this.PN_password == "" ) {
        //       this.isOk = true
        //       // this.$Message.error("请填写资金密码");
        //       // return;
        //     }else{
        //       this.isOk = false
        //     }
        //   }
        // },
        showdemo: function () {
            this.isNowith = false; // 清空 错误提示
        }
    },
    methods: {
        numFocus() {  // num
            //获取焦点num
            // console.log("获取焦点num");
            watch: {
                if (this.OTCForm.BNumber == '') {
                    this.allNum = true;
                }
            }
        },
        FokeyUpNm() {
            if (this.OTCForm.BNumber == '') {
                this.allNum = true;
            }
        },
        numBlur() {  // num
            // 失去焦点num
            setTimeout(() => {
                // console.log("失去焦点num");
                this.allNum = false; // 切换CNY 与  全部
                // this.allMoney = false
                // console.log("延时器");
            }, 200);
        },
        onAllNum() {
            this.allNum = false
            // console.log('num');
            if ( // num符合最大金额
                Number(this.data[this.showdemo].max_limit) >=
                this.coin_available_str * this.OTCForm.price
            ) {
                this.OTCForm.BNumber = Number(this.coin_available_str).toFixed(8)
                this.OTCForm.CMoney = (this.OTCForm.BNumber * this.OTCForm.price).toFixed(2)
            }
            if (Number(this.data[this.showdemo].max_limit) <
                this.coin_available_str * this.OTCForm.price) {  // num不符合最大金额
                // console.log(8888);
                this.OTCForm.BNumber = (Number(this.data[this.showdemo].max_limit) / this.OTCForm.price).toFixed(8)
                this.OTCForm.CMoney = (this.OTCForm.BNumber * this.OTCForm.price).toFixed(2)
            }
        },
        loseFocus() { // CNY
            //获取焦点
            watch: {
                if (this.OTCForm.CMoney == '') {
                    this.allMoney = true; // 切换CNY 与  全部
                }
            }
        },
        FokeyUp() { // 键盘按下事件       
            if (this.OTCForm.CMoney == '') {
                this.allMoney = true; // 切换CNY 与  全部
            }
        },
        getBlur() {  //  CNY
            //失去焦点
            setTimeout(() => {
                this.allMoney = false; // 切换CNY 与  全部
                // this.allNum = false
                // console.log("延时器");
            }, 200);
        },
        onAllMoney() {   // 点击获取全部价格 CNY
            this.allMoney = false;
            if (  //CNY符合定合范围
                Number(this.data[this.showdemo].max_limit) >=
                this.coin_available_str * this.OTCForm.price
            ) {
                // console.log('点击获取全部价格');
                // this.coin_available_str
                // console.log( this.OTCForm.price );
                this.OTCForm.CMoney = (
                    this.coin_available_str * this.OTCForm.price
                ).toFixed(2);
                this.OTCForm.BNumber = (
                    this.coin_available_str * 1
                ).toFixed(8)
            }
            if ( // 不符合最大金额
                Number(this.data[this.showdemo].max_limit) <
                this.coin_available_str * this.OTCForm.price
            ) {
                this.OTCForm.CMoney = Number(
                    this.data[this.showdemo].max_limit
                ).toFixed(2);
                this.OTCForm.BNumber = (
                    this.OTCForm.CMoney / this.OTCForm.price
                ).toFixed(8)
            }
        },
        // getList(){},
        onAttestation() {
            this.t_isapprove = false // 购买 隐藏实名认证
            this.t_isapprove_sell = false // 出售隐藏实名认证
            this.isapprove = false  // 隐藏高级认证
            this.isBorder = false;  // 隐藏边框
            var routeData = this.$router.resolve({
                path: "/accountSettings",
            });
            window.open(routeData.href, '_blank'); // 新页面打开
        },
        a_onAttestation() {
            this.t_pay_way = false; // 隐藏支付方式 

            this.isBorder = false;  // 隐藏边框
            var routeData = this.$router.resolve({
                path: "/accountSettings"
            });
            window.open(routeData.href, '_blank'); // 新页面打开
        },
        but_cancel() {
            // 取消
            this.showdemo = -1;
            this.is_value_num = false;
            this.passwordShow = false
            // this.istimlim = true
        },
        getResult() {
            this.timeFlag = false;
        },
        inpBlur() {
            //数量
            this.OTCForm.BNumber = this.OTCForm.BNumber.replace(
                /^(\-)*(\d+)\.([0-9]{1,8}).*$/,
                "$1$2.$3"
            ); // 限制小数点10位
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
                this.OTCForm.CMoney = exchange(this.OTCForm.BNumber * this.OTCForm.price, 2);
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
        exchange() {
            api.rateCoinRequest().then(res => {
                // console.log(res)
                // console.log(res)
                //币转成美元
                if (res.code == 200) {
                    for (let i in res.data.quotes) {
                        if (i == this.currName) {
                            this.priceMoney = 1 / res.data.quotes[i]; //一个币等于多少美元
                            // this.total = priceMoney * this.money;
                            this.exchange_rmb(this.priceMoney);
                        }
                    }
                }
            });
        },
        exchange_rmb(priceMoney) {
            api.rateMoneyRequest().then(res => {
                // console.log(res);
                //美元转qian
                if (res.code == 200) {
                    for (let item of this.data) {
                        this.moneyPrice = res.data.rates[item.currency_name]; //一美元等于多少币的qian
                        this.total = priceMoney * this.moneyPrice;
                        item.unit_price = (
                            this.total +
                            this.total * (item.currency_margin / 100)
                        ).toFixed(2);
                    }
                }
            });
        },
        changePage(page) {
            this.allMoney = false;
            this.allNum = false;
            this.PN_password = "";
            this.isapprove = false;  // 高级认证 显示隐藏
            // 清空 已输入值
            this.OTCForm.BNumber = ""; // 请空文本框内容
            this.OTCForm.CMoney = ""; // 请空文本框内容
            this.showdemo = -1; //
            this.t_pay_way = false; // 绑定支付方式 显示隐藏
            this.t_isapprove = false // 实名认证 显示隐藏
            this.t_isapprove_sell = false // 出售实名认证 显示隐藏
            //分页
            window.clearInterval(this.timer);
            this.timeFlag = true;
            this.timer = setInterval(this.getResult, 60000);
            this.advertisementList(this.coin_way, page);
        },
        getCoinList() {
            //币列表
            api
                .advertiserUrl()
                .then(res => {
                    // console.log(1111111);
                    if (res.status_code == 200) {
                        res.data.list.forEach((e, i) => {  // 进入OTC时默认打开KT
                            if (res.data.list[i].coin_name == 'KT') {
                                // console.log(i);
                                this.currentIndex = i
                                // this.currentIndex_sell = i
                            }
                        })

                        this.currencyItem = res.data.list;
                        this.coin_way = 1;
                        this.advertisementList(this.coin_way, 1);

                    }
                })
                .catch(error => {
                    this.$Message.error('获取信息失败');
                });
        },
        advertisementList(way, page) {
            // 进入页面时获取数据

            //商家列表
            this.data = [];
            this.currId = "";
            this.currName = "";
            if (way == 1) {
                for (let i = 0; i < this.currencyItem.length; i++) {
                    if (i == this.currentIndex) {
                        this.currId = this.currencyItem[i].coin_id;
                        this.currName = this.currencyItem[i].coin_name;
                    }
                }
            } else if (way == 2) {
                for (let i = 0; i < this.currencyItem.length; i++) {
                    if (i == this.currentIndex_sell) {
                        this.currId = this.currencyItem[i].coin_id;
                        this.currName = this.currencyItem[i].coin_name;
                    }
                }
            }
            api.advertiseSellerUrl({
                    page: page,
                    limit: this.pageSize,
                    pay_method: this.payCurrent_lang,
                    otc_advertisement_type: way,
                    coin_id: this.currId
                })
                .then(res => {
                    // console.log(res);
                    if (res.status_code == 200) {
                        this.data = res.data.list;
                        this.data.forEach((item, index) => {
                            //添加loading
                            item.loading = false
                            item.coin_available_str = exchange(item.coin_available_str, 8)
                        })
                        this.count = res.data.page.count;
                        this.currentPage = parseInt(res.data.page.current_page);
                        this.way = way;
                        this.exchange();
                    }
                })
                .catch(error => {
                    this.$Message.error('获取信息失败');
                });
        },
        btcBuy(
            texts,
            item,
            currency_name,
            unit,
            is_paypal,
            is_alipay,
            is_bank,
            is_wechatpay,
            otc_advertisement_id,
            min_limit,
            max_limit,
            coin_available_str,
            index,
            get_way_type
        ) {
            //弹框
            //  console.log(texts, currency_name, unit, is_paypal, is_alipay, is_bank, is_wechatpay, otc_advertisement_id, min_limit, max_limit, coin_available_str,otc_way_type);
            // console.log(otc_advertisement_id);
            this.PN_password = ""; //清空资金密码
            this.isOk = true;
            setTimeout(() => {
                this.allMoney = false;
                this.allNum = false;
            }, 1)

            if (Number(unit) === 0) {
                // 当价格为0时 return
                return;
            }
            this.OTCForm.BNumber = ""; // 请空文本框内容
            this.OTCForm.CMoney = ""; // 请空文本框内容
            this.istimlim = false; //隐藏按钮
            this.isNumMax = false; //隐藏最大数量提示 9.13
            this.isNowith = false; //隐藏交易金额提示
            // this.isBorder = false  // 默认高级认证
            this.isapprove = false  // 高级认证 显示隐藏
            this.t_pay_way = false // 绑定支付方式 显示隐藏
            this.t_isapprove = false // 实名认证 显示隐藏
            this.t_isapprove_sell = false // 出售实名认证 显示隐藏

            if (this.showdemo) {
                this.showdemo = -1;
            }


            if (this.timeFlag) {
                item.loading = true;

                let params = {
                    otc_advertisement_id: otc_advertisement_id
                };
                // 9.27认证开始
                if (get_way_type == 1) {  // 购买
                    api.prohibitransactionT(params).then(res => {
                        item.loading = false;
                        // console.log(res);
                        this.showdemo = index;
                        if (res.status_code == 200) {
                            this.isBorder = true;
                            this.isAtt = true;
                            if (utils.isLogin()) {
                                // this.$refs['OTCForm'].resetFields();
                                this.otc_advertisement_id = otc_advertisement_id;
                                this.OTCForm.way = [];
                                this.title_text = texts;
                                this.OTCForm.currency_name = currency_name;
                                this.min_limit = min_limit;
                                this.max_limit = max_limit;
                                this.coin_available_str = coin_available_str;
                                // this.showTab = true;   //弹窗
                                this.OTCForm.price = unit;
                                this.texts = texts;

                                if (
                                    Number(min_limit) >
                                    Number(unit) * Number(coin_available_str)
                                ) {
                                    // 判断最小值 与 单价 乘积
                                    this.OTCFormCm = Number(unit) * Number(coin_available_str);
                                    this.OTCFormBm = Number(coin_available_str);
                                    this.OTCFormCm = this.OTCFormCm.toFixed(2);
                                    // toFixed(2)
                                    this.is_value_num = true;
                                    this.isOk = false;
                                } else {
                                    this.is_value_num = false;
                                }

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
                            } else {
                                this.$Message.error("您还未登录，请先登录");
                                this.$router.replace({
                                    path: "/login"
                                });
                            }
                        } else if (res.status_code == 8001) {
                            this.t_pay_way = true
                            this.isAtt = false;
                            this.isBorder = true;
                            // this.$Message.error("请绑定并激活支付方式!");
                        } else if (res.status_code == 6024) {
                            this.t_isapprove = true // 实名认证 显示隐藏
                            this.isAtt = false;
                            this.isBorder = true;

                            // this.$Message.error("请先进行实名认证!");
                        }
                        // else if (res.status_code == 6023) {
                        //   this.$Message.error("高级认证审核中请耐心等待!");
                        // } else if (res.status_code == 6022) {
                        //   this.$Message.error("请先进行高级认证");
                        //   this.isAtt = false;
                        //   this.isapprove = true; //认证
                        // }
                    });
                }
                if (get_way_type == 2) {  // 出售
                	
                    api.prohibitransactionT(params).then(res => {
//                  	console.log(res)
                        item.loading = false;
                        this.showdemo = index;
                        if (res.status_code == 200) {
                            this.isBorder = true;
                            this.isAtt = true;
							
							if(!this.userStatus.pin) {  // 资金密码未设置
                        	 	this.$FundPas({
			                        success: () => {
			                            this.$store.dispatch('getUserStatus'); //获取最新用户信息
			                            }
			                        })
			                    item.loading = false;
			
			                    return
		                    } 
							
                            if (utils.isLogin()) {
                                // this.$refs['OTCForm'].resetFields();
                                this.otc_advertisement_id = otc_advertisement_id;
                                this.OTCForm.way = [];
                                this.title_text = texts;
                                this.OTCForm.currency_name = currency_name;
                                this.min_limit = min_limit;
                                this.max_limit = max_limit;
                                this.coin_available_str = coin_available_str;
                                // this.showTab = true;   //弹窗
                                this.OTCForm.price = unit;
                                this.texts = texts;

                                if (
                                    Number(min_limit) >
                                    Number(unit) * Number(coin_available_str)
                                ) {
                                    // 判断最小值 与 单价 乘积
                                    this.OTCFormCm = Number(unit) * Number(coin_available_str);
                                    this.OTCFormBm = Number(coin_available_str);
                                    this.OTCFormCm = this.OTCFormCm.toFixed(2);
                                    // toFixed(2)
                                    this.is_value_num = true;
                                    this.isOk = false;
                                } else {
                                    this.is_value_num = false;
                                }

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
                            } else {
                                this.$Message.error("您还未登录，请先登录");
                                this.$router.replace({
                                    path: "/login"
                                });
                            }
                        }  else if (res.status_code == 6024) {
                            this.t_isapprove_sell = true
                            this.isAtt = false;
                            this.isBorder = true;
                            // this.$Message.error("请先进行实名认证!");
                        } else if (res.status_code == 6023) {
                            this.$Message.error("高级认证审核中请耐心等待!");
                        } else if (res.status_code == 6022) {
                            // console.log(6022);
                            this.isAtt = false;
                            this.isapprove = true; //认证
                            this.isBorder = true;
                            // this.$Message.error("请先进行高级认证");
                        } else if (res.status_code == 8008) {
                            this.isAtt = false;
                            this.isBorder = false;
                            //  Message.error('支付方式和广告主的支付方式不匹配，请先绑定相应的支付方式');
                        }else if( res.status_code == 8027 ) {
                        	console.log('')
                        } else if(!this.userStatus.pin && this.userStatus.pin == '') {  // 资金密码未设置
                        	 this.$FundPas({
	                            success: () => {
	                                this.$store.dispatch('getUserStatus'); //获取最新用户信息
	                            }
	                        })
	                        item.loading = false;
	
	                        return
                        } else if (res.status_code == 8001) {
                            this.t_pay_way = true
                            this.isAtt = false;
                            this.isBorder = true;
                            // this.$Message.error("请绑定并激活支付方式!");
                        }
                    });
                    
                }
                // 9.27认证结束
                // api.prohibitransactionT(params).then(res => {
                //   console.log(res);
                //   if (res.status_code == 200) {
                //     this.isBorder = true;
                //     this.isAtt = true;
                //     this.showdemo = index;
                //     if (utils.isLogin()) {
                //       // this.$refs['OTCForm'].resetFields();
                //       this.otc_advertisement_id = otc_advertisement_id;
                //       this.OTCForm.way = [];
                //       this.title_text = texts;
                //       this.OTCForm.currency_name = currency_name;
                //       this.min_limit = min_limit;
                //       this.max_limit = max_limit;
                //       this.coin_available_str = coin_available_str;
                //       // this.showTab = true;   //弹窗
                //       this.OTCForm.price = unit;
                //       this.texts = texts;

                //       if (
                //         Number(min_limit) >
                //         Number(unit) * Number(coin_available_str)
                //       ) {
                //         // 判断最小值 与 单价 乘积
                //         this.OTCFormCm = Number(unit) * Number(coin_available_str);
                //         this.OTCFormBm = Number(coin_available_str);
                //         this.OTCFormCm = this.OTCFormCm.toFixed(2);
                //         // toFixed(2)
                //         this.is_value_num = true;
                //         this.isOk = false;
                //       } else {
                //         this.is_value_num = false;
                //       }

                //       if (is_paypal == 2) {
                //         this.OTCForm.way.push("paypal");
                //       }
                //       if (is_bank == 2) {
                //         this.OTCForm.way.push("bankCard");
                //       }
                //       if (is_alipay == 2) {
                //         this.OTCForm.way.push("alipay");
                //       }
                //       if (is_wechatpay == 2) {
                //         this.OTCForm.way.push("wechat");
                //       }
                //     } else {
                //       this.$Message.error("您还未登录，请先登录");
                //       this.$router.replace({
                //         path: "/login"
                //       });
                //     }
                //   } else if (res.status_code == 8001) {
                //     this.$Message.error("请绑定并激活支付方式!");
                //   } else if (res.status_code == 6024) {
                //     this.$Message.error("请先进行实名认证!");
                //   } else if (res.status_code == 6023) {
                //     this.$Message.error("高级认证审核中请耐心等待!");
                //   } else if (res.status_code == 6022) {
                //     this.$Message.error("请先进行高级认证");
                //     this.isAtt = false;
                //     this.isapprove = true; //认证
                //   }
                // });
            } else {
                this.$Message.error("交易时间超过一分钟,请刷新页面");
            }
        },
        seller(index, color, otc_advertiser_id, coin_available_str) {
            // console.log(index, color, otc_advertiser_id, coin_available_str);
            this.$router.push({
                path: "/advertisement",
                query: {
                    color: color,
                    otc_advertisement_id: otc_advertiser_id,
                    currName: this.currName
                }
            });
        }, //商家
        // hide(data) {            //弹框
        //     this.$refs['OTCForm'].resetFields();
        //     this.showTab = data
        // },

        // a_buy_btn(item){
        //     // 资金密码 开始
        //     if (this.PN_password.trim()) {
        //                 let params = {
        //                     otc_transac_id: item.otc_advertiser_id,
        //                     type: 'finish',
        //                     pin: this.PN_password
        //                 };
        //                 api.otcDetail(params).then(res => {
        //                   console.log(res);
        //                     if (res.status_code == 200) {
        //                         this.$Message.success("成功");  // 测试 后面删除
        //                         this.showTab = false;
        //                         this.showCurrency = false;
        //                         // 确定下单

        //                     } else if (res.status_code === 8014) {
        //                         this.$Message.error("币数量不足请先充值");
        //                     }
        //                 });

        //     } else {
        //         this.$Message.error("资金密码不能为空");
        //     }
        //     // 资金密码 结束
        // },

        buy_btn() {
            //购买
            if (this.timeFlag) {
                if (this.wayotc == 2) {
                    // 校验空资金密码
                    if (this.PN_password == "") {
//                      this.$Message.error("请填写资金密码");
                        this.passwordShow = true
                        return;
                    }else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(this.PN_password)) {
                    	this.passwordShow = true
                    	this.strpsdWords = '请输入5-15位字母数字密码'
                    	return;
                    }else {
                    	this.passwordShow = false
                    }
                }
                // this.$refs['OTCForm'].validate((valid) => {
                // if (valid) {
                this.loading = true;
                // let params = {
                //     otc_advertisement_id: this.otc_advertisement_id,
                //     // otc_advertisement_type:this.coin_way,
                //     transac_coin_number: this.OTCForm.BNumber,
                //     transac_coin_unit_price: this.OTCForm.price,
                //     transac_currency_number: this.OTCForm.CMoney
                // }
                // console.log(this.is_value_num);
                let params = {};
                if (this.is_value_num) {
                    // 单价*数量小于 最小值
                    params = {
                        otc_advertisement_id: this.otc_advertisement_id,
                        // otc_advertisement_type:this.coin_way,
                        transac_coin_number: this.OTCFormBm,
                        transac_coin_unit_price: this.OTCForm.price,
                        transac_currency_number: this.OTCFormCm,
                        pin: this.PN_password
                    };
                } else {
                    params = {
                        otc_advertisement_id: this.otc_advertisement_id,
                        // otc_advertisement_type:this.coin_way,
                        transac_coin_number: this.OTCForm.BNumber,
                        transac_coin_unit_price: this.OTCForm.price,
                        transac_currency_number: this.OTCForm.CMoney,
                        pin: this.PN_password
                    };
                }

                // console.log(this.texts);
                // console.log(this.wayotc);
                let tip = "";
                if (this.wayotc == 2) {
                    tip = "sell";
                } else if (this.wayotc == 1) {
                    tip = "buy";
                }
                // console.log(tip);
                api
                    .advertiserBuyUrl(params)
                    .then(res => {
                        // console.log(11111);
                        // console.log(res);
                        this.loading = false;
                        if (res.status_code == 200) {
                            // this.$Message.success('成功');
                            // this.showTab = false;
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
                        } else if (res.status_code == 8042) {
                            this.$Message.error("当前订单已下架");
                        } else if (res.status_code == 8034) {
                            // this.$Message.error("请填写资金密码");
                            // 8034 请填写交易密码
                            // 5017 密码错误
                        } else if (res.status_code == 5017) {
                            // this.$Message.error("密码错误");
                        } else if (res.status_code == 8039) {
                            // this.$Message.error("当前订单已完成");
                        }
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$Message.error('获取信息失败');
                    });
                // }
                // })
            } else {
                this.$Message.error("您已停留该页面超过一分钟,请刷新页面");
            }
        },

        curr(way, index) {
            this.isAtt = false;
            this.isBorder = false;
            this.isapprove = false  // 高级认证 显示隐藏
            this.t_pay_way = false  // 绑定支付方式 显示隐藏
            this.t_isapprove = false // 实名认证 显示隐藏
            this.t_isapprove_sell = false // 出售实名认证 显示隐藏
            this.wayotc = way;
            window.clearInterval(this.timer);
            this.timeFlag = true;
            this.timer = setInterval(this.getResult, 60000);
            this.pay_way = false;
            this.payCurrent = "";
            this.payCurrent_lang = "";
            if (way == 1) {
                this.currentIndex_sell = "-1";
                this.currentIndex = index;
                this.coin_way = 1;
                this.advertisementList(this.coin_way, 1);
            } else if (way == 2) {
                this.currentIndex = "-1";
                this.currentIndex_sell = index;
                this.coin_way = 2;
                this.advertisementList(this.coin_way, 1);
            }
        }, //切换币种
        changeWay(item) {
            //筛选
            window.clearInterval(this.timer);
            this.timeFlag = true;
            this.timer = setInterval(this.getResult, 60000);
            this.pay_way = true;
            this.payCurrent = item;
            if (item == "微信") {
                this.payCurrent_lang = "wecahtpay";
            } else if (item == "支付宝") {
                this.payCurrent_lang = "alipay";
            } else if (item == "银行卡") {
                this.payCurrent_lang = "bank";
            } else if (item == "paypal") {
                this.payCurrent_lang = "paypal";
            } else {
                this.payCurrent_lang = "";
            }
            this.advertisementList(this.coin_way, 1);
        }
    },
    created() {
        // this.unitValueNum()
        // console.log(this.currencyItem);
        // this.currentIndex = 2
        // this.currentIndex_sell = 2
    },
    updated() {

    }
};
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
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
.otc-detail .repsd_marked {
	color: #ed3f14;
	position: absolute;
	bottom: 0.6rem;
	left: 43.1rem;
}
</style>
