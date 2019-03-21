<template>
    <div>
        <!-- <router-link to='/login' class="content_first_button content_first_button_01" v-if="!loginInfo.isLogin">{{ $t(`message.Nav.Login`) }}
    </router-link>
    <router-link to='/register' class="content_first_button content_first_button_02" v-if="!loginInfo.isLogin">
      {{ $t(`message.Nav.SignUp`) }}
    </router-link> -->
        <Content>
            <div class="home">
                <div class="content_first">
                    <!-- 轮播 -->
                    <ul class="content_first_swip">
                        <transition name="fade" v-for="(val, index) in homeBannar" :key="index">
                            <li v-if="index == 0" v-show="swip==index" class="swip swip_1">
                                <div class="swip_1_content">
                                    <p class="swip_1_titile">Hello,</p>
                                    <p class="swip_1_titile">Block Chain!</p>
                                    <p class="swip_1_text">Block Chain assets trading platform</p>
                                    <router-link :to="{path:'/login'}" tag="div" class="swip_1_btn" v-if="!loginInfo.isLogin">登录</router-link>
                                    <router-link :to="{path:'/register'}" tag="div" class="swip_1_btn" v-if="!loginInfo.isLogin">注册</router-link>
                                </div>
                            </li>
                            <li v-else v-show="swip==index" class="swip swip_1" style="text-align: center;">
                                <img :src="val" alt="">
                            </li>
                        </transition>
                        <!-- <li class="swip swip_1"></li> -->
                    </ul>

                    <div class="swip_tab">
                        <!-- 三个固定 -->
                        <div class="swip_ul">
                            <ul>
                                <li v-for="(val, index) in homeBannar" :key="index" :class="{li_current: swip == index ? true : false}" @click='swipClick(index)'></li>
                                <!-- <li></li> -->
                            </ul>
                        </div>

                        <div class="middle_title">
                            <ul>

                                <li>
                                    <a href="https://support.kf.com/hc/zh-cn/categories/360001001692-KF%E5%85%AC%E5%91%8A%E4%B8%AD%E5%BF%83" target="_blank">- 今日公告 -</a>
                                </li>
                                <li>
                                    <a href="https://support.kf.com/hc/zh-cn/sections/360002377672-%E6%B4%BB%E5%8A%A8%E5%85%AC%E5%91%8A" target="_blank">- 今日活动 -</a>
                                </li>
                                <li>
                                    <a href="https://support.kf.com/hc/zh-cn/categories/360000989811-%E5%B8%AE%E5%8A%A9%E4%B8%AD%E5%BF%83" target="_blank">- 新手教程 -</a>
                                </li>
                                <li>
                                    <a href="https://support.kf.com/hc/zh-cn/categories/360001044091-%E6%96%B0%E9%97%BB%E5%BF%AB%E8%AE%AF" target="_blank">- 新闻快讯 -</a>
                                </li>
                            </ul>
                        </div>
                        <div class="middle_bottom">
                            <ul id='ulDom'>
                                <li v-for="val in homePrice">
                                    <p class="firstP" @click="toDealCenter(val.symbol)">{{val.symbol}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span :class="val.percent_change < 0 ? 'redTextColor' : 'greenTextColor'">{{val.percent_change}}%</span>
                                    </p>
                                    <p>{{val.price | decimalPoint}} &nbsp;&nbsp; {{val.unit}}</p>
                                    <p>Volume &nbsp;&nbsp; {{val.volume | decimalPoint}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="left_triangle_box">
                        <div class="out_triangle left_out_triangle">
                            <div class="out_triangle left_in_triangle"></div>
                        </div>
                    </div>
                    <div class="right_triangle_box">
                        <div class="out_triangle right_out_triangle">
                            <div class="out_triangle right_in_triangle"></div>
                        </div>
                    </div>
                </div>

                <div class="content_second">
                    <div class="content_second_box">
                        <ul>
                            <li class="content_second_li">
                                <div class="content_second_li_div content_second_li_left"></div>
                                <div class="content_second_li_div content_second_li_right">
                                    <p class="content_second_title">安全
                                        <span class="content_second_title_span">SECURITY</span>
                                    </p>
                                    <p class="content_second_text">
                                        <i></i>钱包冷热分离，冷钱包物理隔离，用户私钥多重加密异地储存。</p>
                                    <p class="content_second_text">
                                        <i></i>多重密码验证智能防护，保护敏感操作同时更严防会话劫持和恶意操作。</p>
                                    <p class="content_second_text">
                                        <i></i>6级国际容灾数据储存标准，多重业务拆分，独立部署。</p>
                                </div>
                            </li>
                            <li class="content_second_li">
                                <div class="content_second_li_div content_second_li_left">
                                    <p class="content_second_title">专业
                                        <span class="content_second_title_span">SPECIALTY</span>
                                    </p>
                                    <p class="content_second_text">
                                        <i></i>严格精选世界各地顶级机房，服务器分布式托管部署，流畅访问不延迟。</p>
                                    <p class="content_second_text">
                                        <i></i>专业团队定制打造的交易撮合引擎，每秒百万级订单处理，交易精准快速。</p>
                                    <p class="content_second_text">
                                        <i></i>来自世界各地的开发者组建的区块链开发团队，时刻关注区块链的更新与发展。</p>
                                </div>
                                <div class="content_second_li_div content_second_li_right"></div>
                            </li>
                            <li class="content_second_li" style="margin-top: 1.5rem;">
                                <div class="content_second_li_div content_second_li_left"></div>
                                <div class="content_second_li_div content_second_li_right">
                                    <p class="content_second_title">贴心
                                        <span class="content_second_title_span">CLOSE</span>
                                    </p>
                                    <p class="content_second_text">
                                        <i></i>精心优化的委托页面，可设置的行情提示，多终端操作支持，实时跟进交易行情。</p>
                                    <p class="content_second_text">
                                        <i></i>提供社区化运营技术支持，自由组建个性社区。</p>
                                    <p class="content_second_text">
                                        <i></i>7*24小时客服团队，全天候快速处理。</p>
                                </div>
                            </li>
                            <li class="content_second_li">
                                <div class="content_second_li_div content_second_li_left">
                                    <p class="content_second_title">便携
                                        <span class="content_second_title_span">CONVENIENT</span>
                                    </p>
                                    <p class="content_second_text">
                                        <i></i>专业的实时行情走势图，辅助分析工具。</p>
                                    <p class="content_second_text">
                                        <i></i>便携的操作页面，快速下单，及时把握行情。</p>
                                    <p class="content_second_text">
                                        <i></i>账户资金可视化查询，交易明细一目了然。</p>
                                </div>
                                <div class="content_second_li_div content_second_li_right"></div>
                            </li>
                        </ul>
                    </div>
                    <div class="transition_tri">
                        <div class="left_triangle_box">
                            <div class="out_triangle left_out_triangle"></div>
                        </div>
                        <div class="right_triangle_box">
                            <div class="out_triangle right_out_triangle"></div>
                        </div>
                    </div>
                </div>

                <div class="content_third">
                    <div class="content_third_left"></div>
                    <div class="content_third_right">
                        <p class="content_third_title">多平台接入</p>
                        <p class="content_third_text">覆盖 iOS / Android / Windows / Mac 多个平台，支持全业务功能</p>

                        <a href="#/client">
                            <span class="content_third_img content_third_img1"></span>
                        </a>
                        <a href="#/client">
                            <span class="content_third_img content_third_img2"></span>
                        </a>
                        <a href="#/client">
                            <span class="content_third_img content_third_img3"></span>
                        </a>
                        <a href="#/client">
                            <span class="content_third_img content_third_img4"></span>
                        </a>
                    </div>
                </div>
                <div class="content_forth" v-if="!loginInfo.isLogin">
                    <p>新人注册，立即享受新人大礼包</p>
                    <router-link :to="{path:'/register'}" tag="a" target='_blank'>注册有礼</router-link>
                </div>
            </div>

        </Content>

    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import api from '../api'
// import '../assets/js/index.js'
export default {
    data() {
        return {
            homePrice: '',
            homeBannar: [
                '',
                require('../../static/img/pp1.png'),
                require('../../static/img/pp2.png'),
                require('../../static/img/pp3.png'),
            ],
            swip: 0, //轮播
            swipInt: null,
        }
    },
    computed: {
        ...mapState(['token', 'loginInfo'])
    },
    created() {
        this.getBg()
        this.getCoinList()
        api.homePrice().then(res => {
            this.homePrice = res
            this.homePrice.push(...this.homePrice)
            let ulDom = $('#ulDom');
            let ulWidth = this.homePrice.length * (190 + 150) + 'px';
            ulDom.css('width', ulWidth);
            setInterval(function () {
                ulDom.css('left', ulDom.position().left - 2 + 'px');
                if (parseInt(ulWidth) + ulDom.position().left < parseInt(ulWidth) / 2) {
                    ulDom.css('left', 0 + 'px')
                }
            }, 30)
        }).catch(err => {
            this.homePrice = [
                { "symbol": "BTC/USDT", "price": 6397.8419492329003, "unit": "11111USDT", "volume": 4138416697.4436779, "percent_change": -5.6900000000000004 },
                { "symbol": "ETH/USDT", "price": 440.18146791369998, "unit": "11111USDT", "volume": 1759639859.057924, "percent_change": -9.25 },
                { "symbol": "XRP/USDT", "price": 0.44994060870000002, "unit": "11111BUSDTC", "volume": 229239491.73013386, "percent_change": -5.7300000000000004 },
                { "symbol": "BCH/USDT", "price": 698.86008604250003, "unit": "11111BTC", "volume": 405672619.10703415, "percent_change": -6.8700000000000001 },
                { "symbol": "EOS/USDT", "price": 7.4515137299000003, "unit": "11111USDT", "volume": 796058213.46935105, "percent_change": -13.17 },
                { "symbol": "ETH/BTC", "price": 0.068916350799999998, "unit": "11111BTC", "volume": 274712.25060547999, "percent_change": -3.6099999999999999 },
                { "symbol": "XRP/BTC", "price": 7.0514399999999997e-5, "unit": "11111BTC", "volume": 35803.816671116998, "percent_change": 0.20999999999999999 },
                { "symbol": "BCH/BTC", "price": 0.1094447073, "unit": "11111USDT", "volume": 63290.969252078001, "percent_change": -1.0700000000000001 },
                { "symbol": "EOS/BTC", "price": 0.0011664768999999999, "unit": "11111BTC", "volume": 124379.0999701749, "percent_change": -7.79 },
                { "symbol": "BTC/ETH", "price": 14.5345554404, "unit": "11111BTC", "volume": 9401615.0135945044, "percent_change": 3.9199999999999999 },
                { "symbol": "XRP/ETH", "price": 0.0010221707, "unit": "11111BTC", "volume": 520784.05939404102, "percent_change": 3.8799999999999999 },
                { "symbol": "BCH/ETH", "price": 1.5876635819, "unit": "11111BTC", "volume": 921603.13115806121, "percent_change": 2.6200000000000001 },
                { "symbol": "EOS/ETH", "price": 0.016928276799999999, "unit": "11111BTC", "volume": 1808477.3474047985, "percent_change": -4.3200000000000003 }
            ]
            this.homePrice.push(...this.homePrice)
            let ulDom = $('#ulDom');
            let ulWidth = this.homePrice.length * (190 + 150) + 'px';
            ulDom.css('width', ulWidth);
            setInterval(function () {
                ulDom.css('left', ulDom.position().left - 2 + 'px');
                if (parseInt(ulWidth) + ulDom.position().left < parseInt(ulWidth) / 2) {
                    ulDom.css('left', 0 + 'px')
                }
            }, 30)

        })

        this.DoSwip()

    },
    methods: {
        ...mapActions(['getCoinList']),
        getBg() {
            // api.homeBg().then(res => {
            //     if (res.status_code == 200) {
            //         res.data.forEach((val, index) => {
            //             if (val.status == 1) {
            //                 this.homeBannar.push(val.homepage_address)
            //             }
            //         })
            //     }
            // })
        },
        //跳转
        toDealCenter(val) {
            var symbol = val.split('/')[0] + '_' + val.split('/')[1]
            this.$store.commit('changeSymbol', { symbol })
            this.$router.push({ name: 'exchange', params: { symbol: symbol } })
        },
        DoSwip() {
            if (this.swipInt) {
                clearInterval(this.swipInt)
            }
            this.swipInt = setInterval(() => {
                this.swip++
                if (this.swip > this.homeBannar.length - 1) {
                    this.swip = 0
                }
            }, 5000)
        },
        swipClick(val) {
            this.swip = val
            this.DoSwip()
        },
    },
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .left_triangle_box {
    width: 50%;
    height: 18.5rem;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .right_triangle_box {
    width: 50%;
    height: 18.5rem;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .out_triangle {
    display: block;
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .content_first {
    width: 100%;
    height: 56.6rem;
    // min-height: 47.25rem;
    position: relative;

    .content_first_swip {
      width: 100%;
      height: 100%;
      background-color: #354176;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 1.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .swip {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: absolute;
      img {
        height: 100%;
        display: block;
      }
    }
    .swip_1 {
      background-color: #354176;
      .swip_1_content {
        height: 100%;
        width: 58rem;
        margin: 0 auto;
        padding-left: 3.5rem;
        padding-top: 7.5rem;

        .swip_1_titile {
          color: #fff;
          font-size: 2.8rem;
          font-weight: 700;
        }
        .swip_1_text {
          color: #fff;
          font-size: 1.2rem;
        }
        .swip_1_btn {
          display: inline-block;
          width: 8.9rem;
          height: 2.4rem;
          border: 1px solid #fff;
          border-radius: 2.5rem;
          margin-right: 1.8rem;
          margin-top: 1.8rem;
          color: #fff;
          line-height: 2.4rem;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
        }
        .swip_1_btn:last-child {
          color: #000;
          background: linear-gradient(
            to right,
            rgb(255, 214, 27),
            rgb(255, 181, 1)
          );
          border: none;
          padding: 1px;
        }
      }
    }
    .swip_tab {
      position: absolute;
      // bottom: 20rem;
      bottom: 23.4rem;
      width: 100%;
      left: 50%;
      .swip_ul {
        position: absolute;
        top: 0;
        transform: translateX(-50%);
        ul {
          text-align: center;
          height: 0.55rem;
          line-height: 0.55rem;
          li {
            display: inline-block;
            width: 2.8rem;
            height: 0.45rem;
            background: #ccc;
            border-radius: 0.25rem;
            margin-right: 1rem;
            cursor: pointer;
          }
          li:last-child {
            margin-right: 0;
          }
          .li_current {
            background: rgb(247, 200, 28);
          }
        }
      }

      .middle_title {
        position: absolute;
        top: 3rem;
        color: #ffffff;
        font-size: 1.2rem;
        height: 4.4rem;
        line-height: 4.4rem;
        background-color: #5a77b8;
        width: 58rem;
        margin-left: -29rem;
        z-index: 1;
        ul {
          text-align: center;
        }
        li {
          float: left;
          width: 14.5rem;
          height: 2.3rem;
          border-right: 1px solid #879ccb;
          line-height: 2.3rem;
          margin-top: 1rem;
        }
        li:last-child {
          border: none;
        }
      }

      .middle_bottom {
        position: absolute;
        top: 10.5rem;
        height: 6.5rem;
        background-color: #fff;
        width: 100%;
        left: -50%;
        overflow: hidden;
        line-height: 6.5rem;
        z-index: 1;
        box-shadow: 1px 1px 0.55rem #ccc;
        ul {
          overflow: hidden;
          position: absolute;
        }
        li {
          width: 25rem;
          float: left;
          border-left: 1px solid rgb(233, 233, 233);
          height: 4.75rem;
          margin-top: 0.95rem;
          padding-left: 2.2rem;
        }
        p {
          height: 1.5rem;
          line-height: 1.5rem;
          color: rgb(180, 181, 185);
        }
        .firstP {
          height: 1.5rem;
          line-height: 1.5rem;
          font-weight: 700;
          color: #000;
          cursor: pointer;
        }
      }
    }

    .left_out_triangle {
      border-width: 0 72vw 18.5rem 0;
      border-color: transparent transparent #8da0cb;
    }
    .right_out_triangle {
      border-width: 0 0 18.5rem 72vw;
      right: 0;
      border-color: transparent transparent #8da0cb;
    }
    .left_in_triangle {
      top: 3rem;
      border-width: 0 62vw 15.5rem 0;
      border-color: transparent transparent #fff;
    }
    .right_in_triangle {
      top: 3rem;
      border-width: 0 0 15.5rem 62vw;
      right: 0;
      border-color: transparent transparent #fff;
    }
  }
  .content_second {
    width: 100%;
    position: relative;

    .content_second_box {
      width: 58rem;
      margin: 0 auto;

      .content_second_li {
        width: 100%;
        height: 19rem;

        .content_second_li_div {
          width: 50%;
          height: 100%;
        }
        .content_second_li_left {
          float: left;
        }
        .content_second_li_right {
          float: right;
        }
      }
      .content_second_li:nth-child(1) {
        .content_second_li_left {
          background: url("/static/img/2.1.png") no-repeat center center;
          background-size: contain;
        }
      }
      .content_second_li:nth-child(2) {
        .content_second_li_right {
          background: url("/static/img/2.2.png") no-repeat center center;
          background-size: contain;
        }
        .content_second_li_left {
          padding-left: 4rem;
        }
      }
      .content_second_li:nth-child(3) {
        .content_second_li_left {
          background: url("/static/img/2.3.png") no-repeat center center;
          background-size: contain;
        }
      }
      .content_second_li:nth-child(4) {
        .content_second_li_right {
          background: url("/static/img/2.4.png") no-repeat center center;
          background-size: contain;
        }
        .content_second_li_left {
          padding-left: 4rem;
        }
      }

      .content_second_title {
        font-weight: 700;
        font-size: 2rem;
        margin-top: 6rem;
        margin-left: 1.3rem;
        margin-bottom: 1.2rem;
        color: rgb(27, 44, 113);
        .content_second_title_span {
          font-weight: 100;
          font-size: 0.6rem;
          margin-left: 1.3rem;
          color: rgba(164, 171, 196, 0.842);
        }
      }
      .content_second_text {
        margin-bottom: 0.6rem;
        font-size: 0.8rem;
        color: rgb(27, 44, 113);
        // font-weight: 700;
        i {
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 1rem;
          background-color: rgb(27, 44, 113);
          border-radius: 50%;
        }
      }
    }
    .transition_tri {
      position: absolute;
      width: 100%;
      height: 17rem;
      bottom: -13.5rem;

      .left_out_triangle {
        border-width: 0 100vw 18.5rem 0;
        border-color: transparent transparent rgb(238, 243, 255);
      }
      .right_out_triangle {
        border-width: 0 0 18.5rem 100vw;
        right: 0;
        border-color: transparent transparent rgb(238, 243, 255);
      }
    }
  }
  .content_third {
    width: 100%;
    margin-top: 9rem;
    background-color: rgb(238, 243, 255);
    position: relative;
    overflow: hidden;
    height: 25.5rem;

    .content_third_left {
      width: 50%;
      height: 100%;
      background: url("/static/img/padphone.png") no-repeat center center;
      background-size: contain;
      float: left;
    }

    .content_third_right {
      padding-top: 2.8rem;
      float: right;
      width: 50%;
      height: 100%;
      .content_third_title {
        margin: 0.5rem;
        font-size: 1.8rem;
        font-weight: 700;
      }
      .content_third_text {
        font-size: 1rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }

      .content_third_img {
        display: inline-block;
        width: 6rem;
        height: 6rem;
        margin-right: 2.7rem;
        background-size: contain;
      }
      .content_third_img1 {
        background: url("/static/img/Group12.png") no-repeat center center;
      }
      .content_third_img2 {
        background: url("/static/img/Group13.png") no-repeat center center;
      }
      .content_third_img3 {
        background: url("/static/img/Group14.png") no-repeat center center;
      }
      .content_third_img4 {
        background: url("/static/img/Group15.png") no-repeat center center;
        margin-right: 0;
      }
    }
  }
  .content_forth {
    height: 16.5rem;
    width: 100%;
    text-align: center;
    background: url("/static/img/regbgc.png") no-repeat;
    background-size: cover;
    padding-top: 5.3rem;
    p {
      text-align: center;
      margin: 0 auto;
      font-size: 1.8rem;
      margin-bottom: 2rem;
      color: #fff;
    }
    a {
      margin: 0 auto;
      display: inline-block;
      width: 9rem;
      height: 2.4rem;
      border: 1px solid #fff;
      line-height: 2.4rem;
      text-align: center;
      font-size: 0.9rem;
      cursor: pointer;
    }
  }
}
</style>

