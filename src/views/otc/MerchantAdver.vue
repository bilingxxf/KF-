<template>
    <div class="merchant-adver">
      <!-- 9.20备份 -->
        <h2 class="adver-tit">- 商家广告 -</h2>
        <div class="adver-cn clear">
            <div class="adver-com adver-fl">
                <div class="adver-com-img">
                    <img src="../../../static/img/c2c-adver.png" alt="">
                </div>
                <div class="adver-com-cn">
                    <h3 class="color_none">C2C广告</h3>
                    <p class="color_none">自由发布，提供贴心服务</p>
                    <a class="color_with" href="javascript:;">敬请期待</a>
                </div>
            </div>
            <div class="adver-com adver-fr" >
                <div class="adver-com-img">
                    <img src="../../../static/img/otc-adver.png" alt="">
                </div>
                <div class="adver-com-cn">
                    <h3 class="color_tit">OTC广告</h3>
                    <p class="color_none">多样选择，买卖更灵活，便捷</p>
                   <!--    merchanPop-->
                    <a class="color_go"  v-if="isApprove"  @click="isAdver"  href="javascript:;">立即申请</a>
                    <!-- <a class="color_go"  v-else  href="javascript:;">  <router-link to="/MyAdvertising">进入</router-link></a>    -->
                    <a class="color_go"  v-else @click="isAdver_go" href="javascript:;">  进入</a>
                </div>
            </div>
        </div>
        
        <!-- 商家申请 弹窗  -->
        <div class="MyAdvertising">
             <div id="tempModel-sq_Ad" v-if="showAd">
                <div class="Model-sq_Ad-main">
                    <div class="Model-sq_Ad-main-mid">
                        <div class="Ad-main-mid-top">
                            <h2>{{ $t(`message.MyAdvertising.HowApplyMerchant`) }}</h2>
                            <span class="icon-wrong" @click="closeBtn"></span>
                        </div>
                        <!-- -->
                        <div class="Model-sq_Ad-main-mid-content">                         
                            <div class="stepsOne">                               
                                <span>{{ $t(`message.MyAdvertising.StepOne`) }}</span>
                                <!-- href="../../../static/Application_form.docx" -->
                                <p>{{ $t(`message.MyAdvertising.PleaseDownload`) }}<span class="apliy_template"><a style="color:#f00" href="https://static.kf.com/docs/sqcwsjzl.docx" download="Application_form.docx">{{ $t(`message.MyAdvertising.ApplicaTemplate`) }}</a></span>{{ $t(`message.MyAdvertising.FillRequiredInfo`) }}</p>
                                <p>{{ $t(`message.MyAdvertising.RecordVideoInfo`) }}</p>
                                <ul id="request_ul">
                                    <li>{{ $t(`message.MyAdvertising.HoldIDCard`) }}</li>
                                    <li>{{ $t(`message.MyAdvertising.ReadTerms`) }}</li>
                                </ul>
                            </div>
                            <div class="stepsOne">
                                <span>{{ $t(`message.MyAdvertising.StepTwo`) }}</span>
                                <p>{{ $t(`message.MyAdvertising.SendDocuments`) }}<span class="email_to">support@kf.com</span>{{ $t(`message.MyAdvertising.EmailSubject`) }}</p>
                            </div>
                            <div class="stepsOne">
                                <span>{{ $t(`message.MyAdvertising.StepThree`) }}</span>
                                <p>1.发送邮件后，请在本页面点击'确认申请'按钮，提交申请。并同意冻结<span class="deposit">0 KT</span>作为商家保证金。<span class="KT_span"><router-link style="color:#f00"  target="_blank" to="/helpCenter">{{ $t(`message.MyAdvertising.ThreeSecond`) }}</router-link></span>{{ $t(`message.MyAdvertising.ThreeThird`) }}</p>
                            </div>       
                            <div class="stepsOne">
                                <span>{{ $t(`message.MyAdvertising.StepFour`) }}</span>
                                <p>{{ $t(`message.MyAdvertising.FourFirst`) }}</p>
                            </div>                       
                        </div>
                       <!-- -->
                    </div>
                    <div class="Model-sq_Ad-main-foot">
                        <p class="approve">
                        <Checkbox v-model="check_approve" :disabled="toggle_approve">{{ $t(`message.RandAcceptedAgree`) }}</Checkbox>
                        <span class="Protocol">
                          <a href="https://static.kf.com/docs/rzsjxy.docx" style="color:#f00" >《{{ $t(`message.CertifiedMerchant`) }}》</a>,
                          <!-- <router-link to="/kfuserpro" style="color:#f00" target="_blank">《{{ $t(`message.CertifiedMerchant`) }}》</router-link> -->
                          同意冻结<span>0KT</span>作为广告位保证金
                        </span>
                        </p>
                        <p class="approve">
                        <!-- <Checkbox v-model="single" :disabled="toggle_single">同意冻结<span>100000KT</span>作为广告位保证金</Checkbox> -->
                        </p>
                            <!--申请广告位      appliy_ad-->
                        <Button type="primary" @click="isAdver_but" :disabled="toggle">{{apliy_ad_msg}}</Button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 认证 弹窗 -->
        <div class="approve_show" v-if="is_approve_show">
          <span class="approve_close icon-wrong" @click="isClose"></span>
          <div class="approve_cn">
            <h3>你还要完善以下资料</h3>
            <ul>
              <li v-if="realname">
                <p>实名认证</p>  
                <a v-if="isShow" href="javascript:;" @click="onApprove">去认证</a>
                <span v-if="!isShow" href="javascript:;">申请中</span>
              </li>
              <li v-if="expertreal">
                <p>高级认证</p>  
                <a v-if="isShow_g" href="javascript:;" @click="onApprove">去认证</a>
                <span v-if="!isShow_g" href="javascript:;">申请中</span>
              </li>
              <li v-if="modepay">
                <p>支付方式</p>  
                <a href="javascript:;" @click="onApprove_g">去维护</a>
              </li>
            </ul>
          </div>
          <div class="close_d" @click="isClose_g">取消</div>
        </div>



    </div>
</template>
<script>
import api from "../../api";
export default {
  data() {
    return {
      // isShowCn: false, // 当 实名认证3、高级认证3、支付方式1，都满足时
      isShow_g: true, // 高级 申请中  默认去认证
      isShow: true, // 申请中  默认去认证
      isexName: false, //  都为1时为true
      realname: false, // 实名认证 跳转
      expertreal: false, // 高级认证 跳转
      modepay: false, // 支付方式 跳转
      is_approve_show: false, // 认证 弹窗

      isApprove: true, // 是否是广告主 不是广告主
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
      }
    };
  },

  watch: {
    check_approve(val) {
      if (this.apliy_ad_msg != "审核中") {
        // if (val && this.single)
        if (val) {
          this.toggle = false;
        } else {
          this.toggle = true;
        }
      }
    }
  },

  methods: {
    isClose() {
      // 关闭
      this.is_approve_show = false; // 认证弹窗
    },
    isClose_g() {
      // 关闭
      this.is_approve_show = false; // 认证弹窗
    },
    onApprove() {
      // 认证，高级认证跳转
      this.$router.push({
        path: "/accountSettings"
      });
    },
    onApprove_g() {
      // 支付方式维护
      this.$router.push({
        path: "/accountSettings"
      });
    },
    appliy_ad() {
      //  申请广告位按钮
      this.advertiser();
    },
    sure_reset() {
      // this.apliy_fail = false;
      // this.showAd = true;
      this.toggle_single = false;
      this.toggle_approve = false;
      this.apliy_ad_msg = "申请广告位";
      this.toggle = false;
    },

    isAdvertiser() {
      //申请广告位身份验证
      api.proListShow().then(res=>{
        if(res.status_code == 200){
          //已经是广告主
          this.isApprove = false;
        }
      })
    },
    merchanPop() {
      // apply_advertiser_validate
      api.apply_advertiser().then(res => {
        if (res.status_code == 200) {
          this.showAd = true;
        }
      });
    },
    // otcApposShow
    isAdver() { // 非广告主点击时
      api.apply_advertiser_validate(true).then(res => {
        // console.log(res);
          api.otcApposShow().then(res_t => {
            // console.log(res_t);
            if (res_t.status_code == 200) {
              //  0. 未申请过 1.审核中  2.审核拒绝   3.审核通过
              let isNowMas = res_t.data;
              // 0
              if (isNowMas.identification == 0) {
                this.is_approve_show = true; // 认证弹窗
                this.realname = true; // 实名认证 跳转链接
                this.isShow = true; // false 申请中，  true 去认证
              }
              if (isNowMas.high_identification == 0) {
                this.expertreal = true; // 高级认证 跳转链接
                this.is_approve_show = true; // 认证弹窗
                this.isShow_g = true; // 高级 false 申请中，  true 去认证
              }
              if (isNowMas.pay == 0) {
                this.is_approve_show = true; // 认证弹窗
                this.modepay = true; //  支付方式 跳转链接
              }
              // 2.审核拒绝
              if (isNowMas.identification == 2) {
                this.is_approve_show = true; // 认证弹窗
                this.realname = true; // 实名认证 跳转链接
                this.isShow = true; // false 申请中，  true 去认证
              }
              if (isNowMas.high_identification == 2) {
                this.expertreal = true; // 高级认证 跳转链接
                this.is_approve_show = true; // 认证弹窗
                this.isShow_g = true; // 高级 false 申请中，  true 去认证
              }
              if (isNowMas.pay == 1) {
                // this.is_approve_show = true; // 认证弹窗
                this.modepay = false; //  支付方式 跳转链接
              }
              // 1.审核中
              if (isNowMas.identification == 1) {
                this.is_approve_show = true; // 认证弹窗
                this.realname = true; // 实名认证 跳转链接
                this.isShow = false; // false 申请中，  true 去认证
              }
              if (isNowMas.high_identification == 1) {
                this.expertreal = true; // 高级认证 跳转链接
                this.is_approve_show = true; // 认证弹窗
                this.isShow_g = false; // 高级 false 申请中，  true 去认证
              }
              // 3. 审核通过
              if(isNowMas.identification == 3){
                   this.realname = false; // 实名认证 跳转链接
              }
              if(isNowMas.high_identification == 3){
                  this.expertreal = false; // 高级认证 跳转链接
              }
              // 3.审核通过
              if (
                isNowMas.identification == 3 &&
                isNowMas.high_identification == 3 &&
                isNowMas.pay == 1
              ) {
                // console.log("22");
                this.is_approve_show = false; // 认证弹窗
                // this.isShowCn = true; // 当 实名认证3、高级认证3、支付方式1，都满足时
                if (
                  res.status_code == 200 ||
                  res.status_code == 8028 ||
                  res.status_code == 8025
                ) {
                  // console.log('6026');
                  this.showAd = true; // 允许申请广告主
                  
                }
              }
            }
          });
        
        if (res.status_code === 6022) {
          // this.is_approve_show = true  // 认证弹窗
          // this.$Message.error("请先进行高级认证");
        } else if (res.status_code === 6023) {
          // this.$Message.error("高级认证审核中请耐心等待");
        } else if (res.status_code === 6024) {
          // this.is_approve_show = true  // 认证弹窗
          // this.$Message.error("请先进行实名认证");
        } else if (res.status_code === 6025) {
          this.$Message.error("您已是广告主");
        } else if (res.status_code === 6026) {
          this.$Message.error("您申请的广告主正在审核中，请耐心等待");
        } else if (res.status_code === 6027) {
          this.$Message.error("申请失败请重试！");
        } else if (res.status_code === 6028) {
          this.$Message.error("请先申请成为广告主");
        } else if (res.status_code === 8014) {
          this.$Message.error("钱包KT可用余额不足，请先完成充值");
        } else if (res.status_code === 8029) {
          this.$Message.error("提币申请中禁止申请广告主");
        } else if (res.status_code === 8001) {
          // this.is_approve_show = true  // 认证弹窗
          // this.$Message.error("请绑定并激活支付方式");
        } else if (res.status_code === 8030) {
          this.$Message.error("广告主已被禁用");
        }else if (res.status_code === 8025) {
          this.$Message.error("保证金已提取,请重新申请广告主");
        }
        else if (res.status_code === 8027){
          // console.log(8027);
          //this.$Message.error('实名认证审核中...');
        }
        // 8028 申请被拒绝 ， 8025 保证金已提取,请重新申请广告主
      });
    },
    isAdver_go() {
      // 是广告主时，且判断实名认证、高级认证、支付方式
      api.apply_advertiser_validate(true).then(res => { // 传true 拦截器8027不提示
        //  console.log(res);
        if (res.status_code == 6025) {
          // 是广告主
          // 且满足 实名认证3、高级认证3、支付方式1
          api.otcApposShow().then(res => {
            if (res.status_code == 200) {
              //  0. 未申请过 1.审核中  2.审核拒绝   3.审核通过
              let isNowMas = res.data;
              // 0
              if (isNowMas.identification == 0) {
                this.is_approve_show = true; // 认证弹窗
                this.realname = true; // 实名认证 跳转链接
                this.isShow = true; // false 申请中，  true 去认证
              }
              if (isNowMas.high_identification == 0) {
                this.expertreal = true; // 高级认证 跳转链接
                this.is_approve_show = true; // 认证弹窗
                this.isShow_g = true; // 高级 false 申请中，  true 去认证
              }
              if (isNowMas.pay == 0) {
                this.is_approve_show = true; // 认证弹窗
                this.modepay = true; //  支付方式 跳转链接
              }
              // 2.审核拒绝
              if (isNowMas.identification == 2) {
                this.is_approve_show = true; // 认证弹窗
                this.realname = true; // 实名认证 跳转链接
                this.isShow = true; // false 申请中，  true 去认证
              }
              if (isNowMas.high_identification == 2) {
                this.expertreal = true; // 高级认证 跳转链接
                this.is_approve_show = true; // 认证弹窗
                this.isShow_g = true; // 高级 false 申请中，  true 去认证
              }
              if (isNowMas.pay == 1) {
                // this.is_approve_show = true; // 认证弹窗
                this.modepay = false; //  支付方式 跳转链接
              }
              // 1.审核中
              if (isNowMas.identification == 1) {
                this.is_approve_show = true; // 认证弹窗
                this.realname = true; // 实名认证 跳转链接
                this.isShow = false; // false 申请中，  true 去认证
              }
              if (isNowMas.high_identification == 1) {
                this.expertreal = true; // 高级认证 跳转链接
                this.is_approve_show = true; // 认证弹窗
                this.isShow_g = false; // 高级 false 申请中，  true 去认证
              }
              // 3.审核通过
              if (
                isNowMas.identification == 3 &&
                isNowMas.high_identification == 3 &&
                isNowMas.pay == 1
              ) {
                this.is_approve_show = false; // 认证弹窗
                this.$router.push({
                  path: "/MyAdvertising"
                });
              }
            }
          });
        } else if (res.status_code === 6026) {
          this.$Message.error("您申请的广告主正在审核中，请耐心等待");
        } else if (res.status_code === 6027) {
          this.$Message.error("申请失败请重试！");
        } else if (res.status_code === 6028) {
          this.$Message.error("请先申请成为广告主");
        } else if (res.status_code === 8014) {
          this.$Message.error("钱包KT可用余额不足，请先完成充值");
        } else if (res.status_code === 8029) {
          this.$Message.error("提币申请中禁止申请广告主");
        } else if (res.status_code === 8001) {
          // this.is_approve_show = true  // 认证弹窗
          // this.$Message.error("请绑定并激活支付方式");
        } else if (res.status_code === 8030) {
          this.$Message.error("广告主已被禁用");
        } else if (res.status_code === 8025) {
          this.$Message.error("保证金已提取,请重新申请广告主");
        }else if (res.status_code === 8027){
          // console.log('8027');
          // this.Message.error('实名认证审核中...');
        }
      });
    },
    closeBtn() {
      this.$router.go(-1);
    },
    // apply_advertiser
    isAdver_but() {
      // 提交申请
      api.apply_advertiser().then(res => {
        if (res.status_code === 6022) {
          this.$Message.error("请先进行高级认证");
        } else if (res.status_code === 6023) {
          this.$Message.error("高级认证审核中请耐心等待");
        } else if (res.status_code === 6024) {
          this.$Message.error("请先进行实名认证");
        } else if (res.status_code === 6025) {
          this.$Message.error("您已是广告主");
        } else if (res.status_code === 6026) {
          this.$Message.error("您申请的广告主正在审核中，请耐心等待");
        } else if (res.status_code === 6027) {
          this.$Message.error("申请失败请重试！");
        } else if (res.status_code === 6028) {
          this.$Message.error("请先申请成为广告主");
        } else if (res.status_code === 8014) {
          this.$Message.error("钱包KT可用余额不足，请先完成充值");
        }
        if (res.status_code == 200) {
          this.$Message.error("提交成功");
          this.showAd = false;
        }
      });
    }
  },

  mounted() {
    this.isAdvertiser(); // 先判断有无认证过身份
  }
  // created(){
  //     // this.$http.get('otc.oucloud.com/api/v1/otc/prohibit_transaction')
  //     // .then((res)=> {
  //     // console.log(res);
  //     // })

  //     // otc.oucloud.com/api/v1/otc/prohibit_transaction

  //     api.apply_advertiser_validate().then((res)=>{
  //         if(res.status_code == 6025){
  //             this.isApprove = false
  //         }
  //     })
  // }
};
</script>
<style scoped>
.merchant-adver {
}
.merchant-adver .clear::after {
  content: "";
  display: block;
  clear: both;
}
.adver-fl {
  float: left;
}
.adver-fr {
  float: right;
}
.merchant-adver .adver-tit {
  text-align: center;
  font-size: 2.1rem;
  color: #1b2c71;
  padding: 4.5rem 0 2.4rem;
}
.merchant-adver .adver-cn {
  width: 45rem;
  margin: 0 auto 6.75rem;
}
.merchant-adver .adver-cn .adver-com {
  width: 19.3rem;
  height: 28.1rem;
  box-shadow: 0 0 0.6rem #cacaca;
}
.merchant-adver .adver-com-img {
  height: 17rem;
  position: relative;
}
.merchant-adver .adver-com-img img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.merchant-adver .adver-com-cn {
  text-align: center;
}
.merchant-adver .adver-com-cn h3 {
  font-size: 1.6rem;
  padding-bottom: 1rem;
  font-weight: 700;
}
.merchant-adver .adver-com-cn p {
  font-size: 0.9rem;
  color: #999999;
  padding-bottom: 1.45rem;
}
.merchant-adver .adver-com-cn a {
  width: 11.5rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  display: block;
  margin: 0 auto;
  color: #fff;
  border-radius: 0.2rem;
  font-size: 1.2rem;
}
.merchant-adver .color_none {
  color: #999;
}
.merchant-adver .color_tit {
  color: #122b7d;
}
.merchant-adver .color_with {
  background: #c9c6c6;
}
.merchant-adver .color_go {
  background: #f5c245;
}
.Protocol {
  margin-left: -0.7rem !important;
}
.Protocol a {
  margin-right: -0.1rem !important;
}
.approve_show {
  position: fixed;
  width: 23rem;
  /* height: 15.2rem; */
  box-shadow: 0 1px 0.6rem #ccc;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
.approve_show .approve_close {
  position: absolute;
  font-size: 1rem;
  color: #999;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}
.approve_show .approve_cn {
  padding: 2rem 2rem 0rem 2rem;
  border-bottom: 1px solid #d9d9d9;
}
.approve_show .approve_cn h3 {
  font-size: 0.9rem;
  color: #000;
  margin-bottom: 1rem;
}
.approve_show .approve_cn ul li {
  overflow: hidden;
  margin-bottom: 1rem;
}
.approve_show .approve_cn ul li:last-child {
  margin-bottom: 1.3rem;
}
.approve_show .approve_cn ul li p {
  font-size: 0.7rem;
  color: #999;
  float: left;
}
.approve_show .approve_cn ul li a {
  float: right;
  font-size: 0.7rem;
  color: #456fbb;
}
.approve_show .approve_cn ul li span {
  font-size: 0.7rem;
  color: #999;
  float: right;
}
.approve_show .close_d {
  margin: 1.4rem 0;
  width: 6rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border: 1px solid #d9d9d9;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  color: #999;
  float: right;
  margin-right: 1rem;
  cursor: pointer;
}
</style>
