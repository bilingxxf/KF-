<template lang="html">
    <div class="MyAdvertising">
      <Content>
        <div class="otc-ad">
          <div class="otc-ad-content">
            <!-- 头9.26早 -->
            <div class="otc-ad-loca">
              <!-- /AssetRecord -->
              <router-link to="/AssetRecord">
                <div class="otc-loca-le otc-ad-n" >  <!-- @click="newPosition" -->
                  <div >
                    <img src="../../../static/img/advertising-ad.png">
                    <span > 新增广告位 </span>       
                  </div>
                </div>
              </router-link>
              <router-link to="/setadvertising">
                <div class="otc-loca-rg otc-ad-n">
                  <div>
                    <img src="../../../static/img/advertising-od.png">
                    <span>广告设置</span>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="otc-ad-top">
              <div class="ad-top-left">
                <p>{{ $t(`message.MyAdvertising.MyMdvertise`) }}</p>
                <!-- <p @click="addAdver">{{ $t(`message.MyAdvertising.AddAdvertisement`) }}</p>
                <button type="button" class="Line" @click="lineBtn">{{lineMsg}}</button> -->
              </div>
              <div class="ad-top-right">
                <Form ref="formValidate" :model="formValidate" :label-width="65">
                  <!--交易类型-->
                  <FormItem :label="$t(`message.OTCOrder.Type`)">
                    <Select  :placeholder="$t(`message.OTCOrder.AllTypes`)" v-model="formValidate.dealType">
                      <Option value="2">{{ $t(`message.OTCBeal.Buy`) }}</Option>
                      <Option value="1">{{ $t(`message.OTCBeal.Sell`) }}</Option>
                    </Select>
                  </FormItem>
                  <!--币种-->
                  <FormItem :label="$t(`message.Coin`)">
                    <Select v-model="formValidate.coin_id">
                      <Option v-for="list in currency" :value="list.coin_id" :key="list.coin_id">{{list.coin_name}}</Option>
                    </Select>
                  </FormItem>
                  <!--日历时间
                  <FormItem :label="$t(`message.DealCenter.Time`)">
                    <Row>
                      <Col span="11">
                        <DatePicker  type="date" :placeholder="$t(`message.OTCOrder.Choose`)" v-model="formValidate.startTime"></DatePicker>
                      </Col>
                      <Col span="1" style="text-align: center">-</Col>
                      <Col span="11">
                        <DatePicker type="date" :placeholder="$t(`message.OTCOrder.Choose`)" v-model="formValidate.endTime"></DatePicker>
                      </Col>
                    </Row>
                  </FormItem>
                  -->
                  <FormItem class="btn_submit">
                    <Button type="warning" class="btn_search" @click="handleSubmit()">{{ $t(`message.OTCOrder.Search`) }}</Button>
                  </FormItem>
                </Form>
              </div>
            </div>
            <!--我的广告列表-->
            <div class="tabel-content">
              <Table  :columns="columns1" :data="data1"></Table>
            </div>
            <!--分页-->
            <div class="deal-page">
              <Page :total="count" class="pageOrder" :current="currentPage" @on-change="handleChange" :page-size="pageSize" v-if="count>10"></Page>
            </div>
          </div>
        <!--弹框1商家申请-->
          <div id="tempModel-ts" v-if="showTs">
            <div class="Model-ts-main">
                <div class="Model-ts-main-xs">
                  <span class="icon-no_info"></span>
                </div>
              <p class="appliy_title">{{ $t(`message.MyAdvertising.Merchant`) }}</p>
              <p class="Privilege">{{ $t(`message.MyAdvertising.ApplyMerchant`) }}</p>
              <p class="speedy">{{ $t(`message.MyAdvertising.MerAbleTrade`) }}</p>
              <p class="trust">{{ $t(`message.MyAdvertising.VerifiedTrustworth`) }}</p>
              <p class="serve">{{ $t(`message.MyAdvertising.MerchantExcluSer`) }}</p>
              <button type="button" class="btn-sq" @click="ljsq_btn">{{ $t(`message.MyAdvertising.ApplyNow`) }}</button>
              <span class="fou_btn" @click="closeBtn">取消</span>
            </div>
          </div>
          <!--弹框2-->
          <div id="tempModel-sq_Ad" v-if="showAd">
            <div class="Model-sq_Ad-main">
              <div class="Model-sq_Ad-main-mid">
                <div class="Ad-main-mid-top">
                  <h2>{{ $t(`message.MyAdvertising.HowApplyMerchant`) }}</h2>
                  <span class="icon-wrong" @click="closeBtn"></span>
                </div>
                <!--
                <div class="Model-sq_Ad-main-mid-content">
                  <div class="stepsOne">
                    <span>{{ $t(`message.MyAdvertising.StepOne`) }}</span>
                    <p>{{ $t(`message.MyAdvertising.PleaseDownload`) }}<span class="apliy_template"><a href="../../../static/Application_form.docx" download="Application_form.docx" style="color:#c13a3a">{{ $t(`message.MyAdvertising.ApplicaTemplate`) }}</a></span>{{ $t(`message.MyAdvertising.FillRequiredInfo`) }}</p>
                    <p>{{ $t(`message.MyAdvertising.RecordVideoInfo`) }}</p>
                    <ul id="request_ul">
                      <li>{{ $t(`message.MyAdvertising.HoldIDCard`) }}</li>
                      <li>{{ $t(`message.MyAdvertising.ReadTerms`) }}</li>
                    </ul>
                  </div>
                  <div class="stepsOne">
                    <span>{{ $t(`message.MyAdvertising.StepTwo`) }}</span>
                    <p>{{ $t(`message.MyAdvertising.SendDocuments`) }}<span class="email_to">tc@Douclod.com</span>{{ $t(`message.MyAdvertising.EmailSubject`) }}</p>
                  </div>
                  <div class="stepsOne">
                    <span>{{ $t(`message.MyAdvertising.StepThree`) }}</span>
                    <p>1.发送邮件后，请在本页面点击'确认申请'按钮，提交申请。并同意冻结<span class="deposit">100000KT</span>作为商家保证金。<span class="KT_span"><router-link to="/helpCenter" style="color:#c13a3a">{{ $t(`message.MyAdvertising.ThreeSecond`) }}</router-link></span>{{ $t(`message.MyAdvertising.ThreeThird`) }}</p>
                  </div>
                  <div class="stepsOne">
                    <span>{{ $t(`message.MyAdvertising.StepFour`) }}</span>
                    <p>{{ $t(`message.MyAdvertising.FourFirst`) }}</p>
                  </div>
                </div>
                -->
              </div>
              <div class="Model-sq_Ad-main-foot">

                <p class="approve">
                  <Checkbox v-model="check_approve" :disabled="toggle_approve">{{ $t(`message.RandAcceptedAgree`) }}</Checkbox><span class="Protocol"><a class="Protocol_aaa" href="https://www.bitboole.com/#/page?code=e-agreement">《{{ $t(`message.CertifiedMerchant`) }}》</a></span>
                </p>

                <p class="approve">
                  <Checkbox v-model="single" :disabled="toggle_single">申请广告位阅读并同意冻结<span>100000KT</span>作为广告位保证金</Checkbox>
                </p>
                      <!--申请广告位-->
                <Button type="primary" @click="appliy_ad" :disabled="toggle" :class="{active_no:apliy_ad_msg == '审核中'}">{{apliy_ad_msg}}</Button>
              </div>
            </div>
          </div>

          <!--撤销弹框-->
          <div id="tempModel-undo" v-if="undoTemp">
            <div class="tempModel-undo-main">
                <p>{{ $t(`message.MyAdvertising.Notice`) }}</p>
                <span class="icon-wrong" @click="closeBtn_cx"></span>
              <div style="clear: both;"></div>
                <p>{{ $t(`message.MyAdvertising.WithdrewOnce`) }}</p>
              <div style="clear:both;"></div>
              <span class="sure_btn" @click="yesBtn">{{ $t(`message.MyAdvertising.withdraw`) }}</span>
              <span class="fou_btn" @click="closeBtn_cx">{{ $t(`message.BaseInfo.Cancel`) }}</span>
            </div>
          </div>

          <!--实名认证提示-->
          <!--实名认证-->
          <!--您还没有实名认证，请先进行实名认证-->
          <div class="tempModel-noReal" v-if="noRealName">
            <div class="tempModel-undo-main">
              <p>{{attestation}}</p>
              <span class="icon-wrong" @click="closeBtn"></span>
              <div style="clear: both;"></div>
              <p>{{tempMode_hint}}</p>
              <div style="clear:both;"></div>
              <router-link to="/accountSettings" v-if="sure_todo"><span class="sure_btn">确定</span></router-link>
              <span class="sure_btn" v-if="sure_back" @click="closeBtn">确定</span>
              <span class="fou_btn" @click="closeBtn">取消</span>
            </div>
          </div>

          <!--申请失败请重试-->
          <div class="tempModel-noReal" v-if="apliy_fail">
            <div class="tempModel-undo-main">
              <p>申请失败</p>
              <span class="icon-wrong" @click="closeBtn"></span>
              <div style="clear: both;"></div>
              <p>对不起，你的广告主申请失败，请重试！</p>
              <div style="clear:both;"></div>
              <span class="sure_btn" @click="sure_reset">确定</span>
              <!--<span class="fou_btn" @click="closeBtn">取消</span>-->
            </div>
          </div>

            <!--提币申请中禁止申请广告主-->
            <div class="tempModel-noReal" v-if="freeze">
                <div class="tempModel-undo-main">
                    <span class="icon-wrong" @click="closeBtn"></span>
                    <div style="clear: both;"></div>
                    <p>{{freeze_word}}
                    <div style="clear:both;"></div>
                    <span class="sure_btn_close" @click="closeBtn">确定</span>
                    <!--<span class="fou_btn_close" @click="closeBtn">取消</span>-->
                </div>
            </div>
            <!--下线提醒-->
            <div class="tempModel-noReal_line" v-if="offLine">
                <div class="tempModel-undo-main">
                    <p>下线提醒</p>
                    <span class="icon-wrong" @click="offLine_closeBtn"></span>
                    <div style="clear: both;"></div>
                    <p>您已上线，是否准备下线?</p>
                    <div style="clear:both;"></div>
                    <span class="sure_btn" @click="sureLine">确定</span>
                    <span class="fou_btn" @click="offLine_closeBtn">取消</span>
                </div>
            </div>
        </div>
      </Content>
    </div>
</template>
<script>
import api from "../../api";
export default {
  data() {
    return {
      isLineData: "",
      isType: "", // 上下架
      online: false,
      priceMoney: null,
      lineMsg: "",
      offLine: false,
      showTs: false,
      check_approve: false,
      single: false,
      showAd: false,
      undoTemp: false,
      noRealName: false,
      sure_todo: false,
      sure_back: false,
      freeze: false,
      ad_status: "",
      attestation: "",
      tempMode_hint: "",
      apliy_ad_msg: "申请广告位",
      toggle: true,
      toggle_approve: false,
      toggle_single: false,
      apliy_fail: false,
      freeze_word: "",
      pageSize: 10,
      count: 0,
      total: null,
      currency: [],
      coin_id: "",
      coin_name: "",
      advertisement_id: "",
      advertisement_status: "",
      currentPage: 1,
      //  操作 撤销
      close: "",
      formValidate: {
        dealType: "",
        coin_id: ""
        // startTime: '',
        // endTime: ''
      },

      columns1: [
        {
          title: this.$t("message.MyAdvertising.Number"), //广告编号
          key: "otc_advertisement_id",
          minWidth: 50,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333333",
                  fontSize: "0.7rem",
                  fontFamily: "Microsoft YaHei"
                }
              },
              params.row.otc_advertisement_id
            );
          }
        },
        {
          title: this.$t("message.MyAdvertising.AdsType"), //广告类型  BTC/卖出
          key: "coin_name",
          minWidth: 50,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#e13232",
                  fontSize: "0.7rem",
                  fontFamily: "Microsoft YaHei"
                }
              },
              params.row.coin_name + "/" + params.row.otc_advertisement_type
            );
          }
        },
        {
          title: this.$t("message.OTCBeal.Volume"), //数量
          key: "coin_available_str",
          minWidth: 50,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333333",
                  fontSize: "0.7rem",
                  fontFamily: "Microsoft YaHei"
                }
              },
              params.row.coin_available_str
            );
          }
        },
        {
          title: "限额", //订单限额
          key: "min_limit",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333333",
                  fontSize: "0.7rem",
                  fontFamily: "Microsoft YaHei"
                }
              },
              params.row.min_limit +
                "~" +
                params.row.max_limit +
                params.row.currency_name
            );
          }
        },
        {
          title: this.$t("message.OTCBeal.UnitPrice"), //单价
          key: "unit_price",
          minWidth: 110,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#07d08b",
                  fontSize: "0.7rem",
                  fontFamily: "Microsoft YaHei"
                }
              },
              params.row.unit_price.toFixed(2) + params.row.currency_name
            );
          }
        },
        {
          title: this.$t("message.MyAdvertising.Time"), //创建时间
          key: "created_at",
          minWidth: 90,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333333",
                  fontSize: "0.7rem",
                  fontFamily: "Microsoft YaHei"
                }
              },
              params.row.created_at
            );
          }
        },
        {
          title: "状态", //状态
          key: "otc_advertisement_status",
          minWidth: 30,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333333",
                  fontSize: "0.7rem",
                  fontFamily: "Microsoft YaHei"
                }
              },
              params.row.otc_advertisement_status
            );
          }
        },
        {
          title: this.$t("message.MoneyBag.Action"), //操作
          key: "operat_close",
          minWidth: 30,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    lineHeight: "2.4rem",
                    display: "inline-block",
                    paddingTop: "0.15rem",
                    color: "#999999",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                    fontFamily: "Microsoft YaHei",
                    display:
                      params.row.otc_advertisement_status == "已撤销" ||
                      params.row.otc_advertisement_status == "已完成"
                        ? "none"
                        : "initial"
                  },
                  class: {
                    order_operate: true
                  },
                  on: {
                    click: () => {
                      this.undoBtn(params.index, "close");
                    }
                  }
                },
                (params.row.operat_close =
                  params.row.otc_advertisement_status == "已撤销" ? "" : "撤销")
              ),
              h(
                "button",
                {
                  props: {
                    type: "button"
                  },
                  style: {
                    minWidth: "2rem",
                    height: "1.35rem",
                    color: "#999",
                    borderRadius: "0.25rem",
                    border: "none",
                    outline: "none",
                    float: "right",
                    margin: "0.5rem 0 0 0.5rem",
                    cursor: "pointer",
                    padding: "0 0.4rem",
                    background: "none",
                    // background:
                    //   params.row.otc_advertisement_status == "交易中"
                    //     ? "#f3ba2f"
                    //     : "#ccc",
                    display:
                      params.row.otc_advertisement_status == "已撤销" ||
                      params.row.otc_advertisement_status == "已完成"
                        ? "none"
                        : "initial"
                  },
                  on: {
                    // this.operate_btn(params.index,this.type_kind)
                    click: () => {
                      this.line_coil(
                        params.row.otc_advertisement_id,
                        params.row.otc_advertisement_status
                      );
                    }
                  }
                },
                params.row.otc_advertisement_status == "下架" ? "上架" : "下架"
              )
            ]);
          }
        }
      ],

      data1: []
    };
  },

  methods: {
    // 上架 下架  // 1为上架 2为下架  3为已撤销 otc_transac_status
    line_coil(id, status) {
      // 上架 下架 this.isLineData
      // console.log(status);
      if (status == "上架") {
        this.isType = 2; // 要改为下架
        // console.log("");
      } else if (status == "下架") {
        this.isType = 1; // 要改为上架
        // console.log("现在是下架");
      } else if (status == "交易中") {
        this.isType = 2;
        // console.log("现在是上架");
      }

      let params = {
        otc_advertisement_id: id, // 商品ID
        // 1为上架 2为下架  3为已撤销 otc_transac_status
        type: this.isType
      };
      // console.log(this.isType);
      api.advertiserShow(params).then(res => {
        //  console.log(res);
        if (res.status_code == 200) {
          // console.log("OK");
          this.isLineData = res.data;
          //  console.log(this.currentPage);  // 当前页
          this.get_user_advertiser(this.currentPage);
        }
      });
    },

    addAdver() {
      if (this.online) {
        this.$router.push({
          path: "AssetRecord"
        });
      } else {
        this.$Message.error("您已下线，请先上线");
      }
    },
    sure_reset() {
      this.apliy_fail = false;
      this.showAd = true;
      this.toggle_single = false;
      this.toggle_approve = false;
      this.apliy_ad_msg = "申请广告位";
      this.toggle = false;
    },

    isAdvertiser() {
      //申请广告位身份验证
      api.apply_advertiser_validate().then(res => {
        if (res.status_code == 6022) {
          this.noRealName = true;
          this.sure_todo = true;
          this.attestation = "高级认证";
          this.tempMode_hint = "您还没有高级认证，请先进行高级认证";
        } else if (res.status_code == 6023) {
          this.noRealName = true;
          this.sure_back = true;
          this.attestation = "高级认证";
          this.tempMode_hint = "高级认证审核中请耐心等待";
        } else if (res.status_code == 6024) {
          this.noRealName = true;
          this.sure_todo = true;
          this.attestation = "实名认证";
          this.tempMode_hint = "您还没有实名认证，请先进行实名认证";
        } else if (res.status_code == 8027) {
          this.noRealName = true;
          this.sure_back = true;
          this.attestation = "实名认证";
          this.tempMode_hint = "实名认证审核中请耐心等待";
        } else if (res.status_code == 200) {
          this.showTs = true;
        } else if (res.status_code == 6026) {
          this.showAd = true;
          this.apliy_ad_msg = "审核中";
          this.toggle = true;
          this.single = true;
          this.check_approve = true;
          this.toggle_single = true;
          this.toggle_approve = true;
        } else if (res.status_code == 6027) {
          this.showAd = false;
          this.apliy_fail = true;
        } else if (res.status_code == 6025) {
          this.get_user_advertiser(1);
          this.get_coin_list();
          this.advertiser_status(); //广告主状态
        } else if (res.status_code == 8025) {
          // this.$Message.info('保证金已提取,请重新申请广告主');
          this.showAd = true;
        } else if (res.status_code == 8028) {
          this.showAd = true;
        } else if (res.status_code == 8029) {
          this.freeze = true;
          this.freeze_word = "解冻申请中，暂无法进入广告管理页面";
        } else if (res.status_code == 8030) {
          this.showAd = true;
          this.$Message.error("广告主已被禁用,请重新申请广告主");
        } else if (res.status_code === 8014) {
          this.$Message.error("您的KT可用余额不足，请先完成充值");
        }
      });
    },

    advertiser() {
      //申请广告主
      api
        .apply_advertiser()
        .then(res => {
          if (res.status_code == 6026 || res.status_code == 200) {
            this.showTs = false;
            this.showAd = true;
            this.apliy_ad_msg = "审核中";
            this.toggle = true;
            this.single = true;
            this.check_approve = true;
            this.toggle_single = true;
            this.toggle_approve = true;
          } else if (res.status_code == 6027) {
            this.showAd = false;
            this.apliy_fail = true;
          } else if (res.status_code == 6025) {
            this.get_user_advertiser(1);
            this.get_coin_list();
          } else if (res.status_code === 8014) {
            this.$Message.error("您的KT可用余额不足，请先完成充值");
          }
        })
        .catch(error => {});
    },

    // sure_apply(){
    //     this.freeze = false;
    //     this.showAd = true;
    // },

    ljsq_btn() {
      //立即申请按钮
      this.showTs = false;
      this.showAd = true;
    },
    closeBtn() {
      this.$router.go(-1);
    },

    undoBtn(index, data) {
      // if(this.isType = 1){
      //     if(res.status_code == 8040){
      //         this.$Message.error("你现在是上架状态，不能撤销");
      //         return
      //     }
      // }
      //撤销
      this.undoTemp = true;
      this.close = data;
      for (let j = 0; j < this.data1.length; j++) {
        if (j == index) {
          this.advertisement_id = this.data1[j].otc_advertisement_id;
        }
      }
    },
    yesBtn() {
      //确定 撤销 按钮

      let p = {
        otc_advertisement_id: this.advertisement_id,
        type: this.close
      };
      api
        .hide_advertiser(p)
        .then(res => {
          if (res.status_code == 200) {
            this.get_user_advertiser(this.currentPage);
          } else if (res.status_code == 8040) {
            this.$Message.error("您现在是上架状态，不能撤销");
          } else if (res.status_code == 8041) {
            this.$Message.error("您下架未超过1分钟，不能撤销");
          }
        })
        .catch(error => {});
      this.undoTemp = false;
    },
    closeBtn_cx() {
      //取消and关闭
      this.undoTemp = false;
    },

    appliy_ad() {
      //  申请广告位按钮
      this.advertiser();
    },

    get_user_advertiser(page) {
      //  获取广告主广告位信息
      api
        .my_otc_advertiser_list({
          page: page,
          limit: this.pageSize,
          otc_advertisement_type: this.formValidate.dealType,
          coin_id: this.formValidate.coin_id
        })
        .then(res => {
          if (res.status_code == 200) {
            // console.log(res);
            if (res.otc_advertisement_status == "交易中") {
              //上架 下架判断
              this.isLineData = 1; //上架 下架 状态
            } else if (res.otc_advertisement_status == "下架") {
              this.isLineData = 2;
            } else if (res.otc_advertisement_status == "已撤销") {
              this.isLineData = 3;
            }

            this.data1 = res.data.list;
            for (let j = 0; j < res.data.list.length; j++) {
              switch (res.data.list[j].otc_advertisement_type) {
                case 1:
                  res.data.list[j].otc_advertisement_type = "出售";
                  break;
                case 2:
                  res.data.list[j].otc_advertisement_type = "购买";
                  break;
              }
              //状态
              switch (res.data.list[j].otc_advertisement_status) {
                case 1:
                  // res.data.list[j].otc_advertisement_status = "下架";
                  res.data.list[j].otc_advertisement_status = "交易中";
                  break;
                case 2:
                  // res.data.list[j].otc_advertisement_status = "交易中";
                  res.data.list[j].otc_advertisement_status = "下架";
                  break;
                case 3:
                  res.data.list[j].otc_advertisement_status = "已完成";
                  break;
                case 4:
                  res.data.list[j].otc_advertisement_status = "已撤销";
                  break;
              }
            }
            this.count = res.data.page.count;
            this.currentPage = parseInt(res.data.page.current_page);
            this.exchange();
          }
        });
    },

    handleChange(page) {
      this.get_user_advertiser(page);
    },

    exchange() {
      api.rateCoinRequest().then(res => {
        //币转成美元
        if (res.code == 200) {
          api.rateMoneyRequest().then(response => {
            //美元转qian
            if (response.code == 200) {
              for (var f = 0; f < this.data1.length; f++) {
                // this.coin_name = this.data1[f].coin_name;

                for (let i in res.data.quotes) {
                  if (i == this.data1[f].coin_name) {
                    this.priceMoney = 1 / res.data.quotes[i]; //一个币等于多少美元
                    this.moneyPrice =
                      response.data.rates[this.data1[f].currency_name]; //一美元等于多少币的钱   \

                    this.total = 1 / res.data.quotes[i] * this.moneyPrice;

                    this.data1[f].unit_price =
                      this.total +
                      this.total * (this.data1[f].currency_margin / 100);

                    // console.log(this.priceMoney, this.moneyPrice, this.total);
                    // this.exchange_rmb(this.priceMoney);
                  }
                }
              }
            }
          });
        }
      });
    },
    // exchange_rmb(priceMoney){
    //     api.rateMoneyRequest().then(res=>{      //美元转qian
    //         if(res.code == 200) {
    //             for (let item of this.data1) {
    //                 this.moneyPrice = res.data.rates[item.currency_name];       //一美元等于多少币的钱
    //                 this.total = priceMoney * this.moneyPrice;
    //                 item.unit_price = this.total + (this.total * (item.currency_margin / 100));
    //
    //             }
    //         }
    //     })
    // },

    //  上下架广告位(列表 操作:上架，下架)
    //   operate_btn(index,type_kind){
    //     for (let j=0; j<this.data1.length; j++){
    //       if (j == index) {
    //         this.advertisement_id = this.data1[j].otc_advertisement_id;
    //         this.advertisement_status = this.data1[j].otc_advertisement_status;
    //           console.log(this.advertisement_status,'x');
    //
    //           if (this.advertisement_status ==='交易中'){
    //               type_kind = 'reject';
    //               this.type = type_kind;
    //               console.log(this.type,'h');
    //           }else if (this.advertisement_status ==='下架'){
    //               type_kind = 'allow';
    //               this.type = type_kind;
    //               console.log(this.type,'l');
    //           }
    //       }
    //     }
    //     let p = {
    //         otc_advertisement_id:this.advertisement_id,
    //         type:this.type,
    //       };
    //       api.hide_advertiser(p).then(res=>{
    //           if (this.advertisement_status === 1){
    //             this.advertisement_status = 2;
    //           } else if (this.advertisement_status === 2){
    //             this.advertisement_status = 1;
    //           }
    //         this.get_user_advertiser(this.currentPage);
    //       })
    //
    //   },

    //  查询前的获取币种
    get_coin_list() {
      //获取币列表
      api
        .advertiserUrl()
        .then(res => {
          this.currency = res.data.list;
        })
        .catch(error => {});
    },

    //  查询我的广告位
    handleSubmit() {
      this.get_user_advertiser(1);
    },

    //下线按钮
    lineBtn() {
      //上下线按钮
      if (this.online) {
        // api.advertiser_on_off_line().then(res=>{
        //     if (res.status_code == 200){
        //         this.lineMsg = '已下线';
        //         this.offLine = true;
        //         this.online = !this.online;
        //     }
        // }).catch(error=>{
        // });
        this.offLine = true;
      } else {
        api
          .advertiser_on_off_line()
          .then(res => {
            if (res.status_code == 200) {
              this.lineMsg = "在线";
              this.online = !this.online;
            }
          })
          .catch(error => {});
      }
    },
    //广告主状态
    advertiser_status() {
      api
        .advertiser_status()
        .then(res => {
          this.ad_status = res.data;
          if (this.ad_status == 1) {
            this.lineMsg = "已下线";
            // this.offLine = true;
            this.offLine = false;
            this.online = false;
          } else if (this.ad_status == 2) {
            this.lineMsg = "在线";
            this.offLine = false;
            this.online = true;
          }
        })
        .catch(error => {});
    },
    sureLine() {
      //确定下线
      api
        .advertiser_on_off_line()
        .then(res => {
          if (res.status_code == 200) {
            this.lineMsg = "已下线";
            this.offLine = false;
            this.online = !this.online;
          }
        })
        .catch(error => {});
    },
    offLine_closeBtn() {
      //取消上线
      // this.$router.push({path: '/otc-deal'});
      this.offLine = false;
    }
  },
  watch: {
    single(val) {
      if (this.apliy_ad_msg != "审核中") {
        if (val && this.check_approve) {
          this.toggle = false;
        } else {
          this.toggle = true;
        }
      }
    },
    check_approve(val) {
      if (this.apliy_ad_msg != "审核中") {
        if (val && this.single) {
          this.toggle = false;
        } else {
          this.toggle = true;
        }
      }
    }
  },
  mounted() {
    this.isAdvertiser(); // 先判断有无认证过身份
  },
  updated() {
    // console.log(this.isLineData);
  }
};
</script>

<style scoped="scoped" lang="scss">
.otc-ad-top ::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.75rem;
  background-color: #fff;
}
.otc-ad-top ::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  -webkit-box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.3);
  background-color: #ccc;
}
.otc-ad-top ::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  background-color: #fff;
}

.otc-ad-loca {
  // overflow: hidden;
  width: 57.95rem;
  margin: 0 auto 1.8rem;
  padding-top: 2rem;
  &:after {
    display: block;
    content: "";
    clear: both;
    height: 0;
  }
  .otc-ad-n {
    height: 6.2rem;
    width: 26rem;
    background-color: #fff;
    border-radius: 0.15rem;
    position: relative;
    box-shadow: 0 0 0.6rem 0 #cacaca;
    cursor: pointer;
    div {
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        vertical-align: middle;
        margin-top: 0.15rem;
      }
      span {
        font-size: 1.2rem;
        color: #354374;
        vertical-align: middle;
      }
    }
  }
  .otc-loca-le {
    float: left;
  }
  .otc-loca-rg {
    float: right;
  }
}
</style>
