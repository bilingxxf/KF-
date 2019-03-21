<template>
    <!-- <Header class="header" :class="{'header-home' :link == '/home'}"> -->
    <Header class="header">
        <!-- <Menu mode="horizontal" theme="dark" class="header-item"> -->
        <div class="logo_img">
            <a href=''>
                <img src="./../../static/img/logo.png" alt="">
            </a>
        </div>
        <div class="item-list">
            <router-link tag="span" :to="{path:'/home'}" class="ivu-menu-item">首页</router-link>
            <!-- <router-link tag="span" :to="{path:'/otc-deal'}" class="ivu-menu-item">OTC交易</router-link> -->
            <router-link tag="span" :to="{name: 'exchange', params:{symbol: symbol.symbol.toLowerCase()}}" class="ivu-menu-item">币币交易</router-link>
            <router-link tag="span" :to="{path:'/assetOverview'}" class="ivu-menu-item">钱包</router-link>
        </div>
        <!-- <div class="item-padding"></div> -->

        <div class="item-set">

            <!-- <div class="slot-item" v-if="currentTitle == 1">
                <router-link to='/DealCenterMoneybag' tag="span">{{ $t(`message.Nav.Assets`) }}</router-link>
            </div>
            <div class="slot-item" v-if="currentTitle == 2">
                <router-link to='/OTCMoneybag' tag="span">{{ $t(`message.Nav.Assets`) }}</router-link>
            </div>
            <div class="slot-item" v-if="currentTitle == 3">
                <span class="fontColor">{{ $t(`message.Nav.Assets`) }}</span>
            </div> -->
            <!-- 币币订单 -->
            <div class="slot-item" v-if="dealShow == 1">
                <router-link to='/DealRecord' tag="span">订单</router-link>
            </div>
            <div class="slot-item" v-if="dealShow == 2">

                <span class="fontColor">订单</span>
            </div>
            <!-- otc订单 -->
            <div class="slot-item" v-if="OTCOrderShow == 1">
                <router-link to='/otc-order' tag="span">订单</router-link>
            </div>
            <div class="slot-item" v-if="OTCOrderShow == 2">
                <span class="fontColor">订单</span>
            </div>

            <Dropdown trigger="click" v-if="loginInfo.isLogin" @on-click="userOperate" style="position: relative" placement="bottom-end">

                <a href="javascript:void(0)" class="username">
                    <p>
                        <Icon type="person"></Icon>
                        {{loginInfo.name}} &nbsp;
                        <Icon type="chevron-down"></Icon>
                    </p>
                </a>

                <DropdownMenu slot="list">
                    <DropdownItem name="accountSettings">
                        <Icon size="16" type="android-settings"></Icon>&nbsp;&nbsp;&nbsp;&nbsp;个人中心</DropdownItem>
                    <!-- 广告管理 -->
                    <DropdownItem name="MyAdvertising">
                        <Icon size="16" type="aperture"></Icon>&nbsp;&nbsp;&nbsp;&nbsp;广告管理</DropdownItem>
                    <DropdownItem name="logout">
                        <Icon size="16" type="log-out"></Icon>&nbsp;&nbsp;&nbsp;&nbsp;退出</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div class="slot-item" v-else>
                <span class="logClass">
                    <router-link :to="{path:'/register',query: {router: link}}" tag="font">注册</router-link>
                    <i>|</i>
                    <router-link :to="{path:'/login',query: {router: link}}" tag="font">登录</router-link>
                </span>
            </div>
            <Dropdown trigger="click" @on-click="changeLang" style="position: relative">
                <a href="javascript:void(0)" class="language">
                    {{language}}
                    <span class="countryIcon"></span>
                    <!-- <Icon type="chevron-down"></Icon> -->
                </a>
                <DropdownMenu slot="list">
                    <!-- <DropdownItem name='English'>English</DropdownItem> -->
                    <!-- <DropdownItem name='简体中文'>简体中文</DropdownItem> -->
                    <!-- <DropdownItem name='繁體中文'>繁體中文</DropdownItem> -->
                    <!-- <DropdownItem name='日本语'>日本语</DropdownItem>
            <DropdownItem name='한국어'>한국어</DropdownItem>
            <DropdownItem name='français'>français</DropdownItem>
            <DropdownItem name='русский'>русский</DropdownItem>
            <DropdownItem name='español'>español</DropdownItem>
            <DropdownItem name='português'>português</DropdownItem>
            <DropdownItem name='Việt nam'>Việt nam</DropdownItem> -->
                </DropdownMenu>
            </Dropdown>
        </div>
        <!-- </Menu> -->

    </Header>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import api from '../api'
import utils from '../utils'


export default {
    data() {
        return {
            titleItem: [
                { name: '首页', path: '/home' },
                { name: 'OTC交易', path: '/otc-deal' },
                { name: '币币交易', path: '/DealCenter' },
                { name: '钱包', path: '/wallet' }
            ],
            language: this.$t('message.Nav.English'),
            changLang: {
                'English': 'en',
                '简体中文': 'cn',
                '日本语': 'ja',
            }
        }
    },
    components: {

    },
    computed: {
        ...mapState(['loginInfo', 'OTCOrderShow', 'dealShow', 'symbol']),
        ...mapGetters(['name']),
        link() {
            return this.$route.path + ''
        },
    },
    methods: {
        userOperate(value) {
            if (value == 'baseInfo') {
                this.$router.push({
                    path: '/baseInfo'
                })
            } else if (value == 'mypromotion') {
                this.$router.push({
                    path: '/mypromotion'
                })
            }
            else if (value == 'accountSettings') {
                this.$router.push({
                    path: '/accountSettings'
                })
            }
            else if (value == 'MyAdvertising') {
                this.$router.push({
                    // path: '/MyAdvertising'
                    path: '/otc-adver'
                })
            }
            else if (value == 'order-record') {
                this.$router.push({
                    path: '/order-record'
                })
            }
            else if (value == 'mynews') {
                this.$router.push({
                    path: '/mynews'
                })
            }
            else if (value == 'logout') {
                let params = {
                    isLogin: false
                };
                console.log('LOGOUT_header')
                this.$store.commit('LOGOUT', params);
                this.$router.push({
                    path: '/home'
                });
                api.logOut().then(res => {
                    // if (res.status_code == 200) {
                    // this.$Message.success(this.$t('message.signoutSuccess'))
                    // }
                })
            }
        },
        changeLang(item) {
            // console.log(item)
            localStorage.setItem('lang', this.changLang[item]);
            location.reload()
            this.language = item;
            this.$i18n.locale = this.changLang[item]
        },
    },
    created() {

    },
    mounted() {
        // console.log(document.cookie)
        if (utils.isLogin()) {
            let name = utils.getCookie('username');
            this.$store.commit('loginInformation', name)
        }
    },
    updated() {
        // console.log($t(`message.Nav.AdvertisManagement`));
    }
}
</script>
<style lang="scss" scoped>
// .header-home {
//   position: absolute;
//   width: 100%;
//   background: rgba(255, 255, 255, 0);
// }
.header {
  background: linear-gradient(to right, #485581, #596a8f, #485581);
  padding: 0 !important;
  height: 3rem;
  line-height: 3rem;
  font-size: 0.8rem;
  .header-item {
    background: rgba(255, 255, 255, 0);
  }
  .ivu-menu-item {
    font-size: 0.8rem;
  }

  .ivu-dropdown {
    vertical-align: middle;
    .ivu-dropdown-menu {
      width: 8rem;
      background: rgb(140, 159, 203);
      border-radius: 0 0 0.25rem 0.25rem;
      .ivu-dropdown-item {
        height: 2rem;
        line-height: 1.15rem;
        color: #fff;
      }
      .ivu-dropdown-item:hover {
        background: rgb(84, 101, 167);
      }
    }
  }

  @media screen and (min-width: 1200px) {
    .ivu-layout-header {
      width: 100% !important;
    }
  }

  .ivu-layout-header {
    height: 3rem;
    line-height: 3rem;
    background: #171a2a !important;
    padding: 0 !important;
    width: 100%;
  }

  .ivu-menu-dark {
    // background: #171a2a!important;
    height: 3rem;
    line-height: 3rem;
  }

  .logo_img {
    float: left;
    padding-left: 3rem;
    img {
      vertical-align: middle;
      height: 2rem;
    }
  }
  .item-list {
    float: left;
    span {
      color: #fff;
      float: left;
      margin-left: 2.1rem;
      padding: 0;
      height: 2.1rem;
    }
    span:hover {
      color: #feb313;
    }
  }

  .item-list .router-link-exact-active {
    border-bottom: 1px solid #feb313;
    color: #feb313 !important;
  }

  .item-set {
    padding-right: 3rem;
    float: right;

    .ivu-dropdown:last-child {
      margin-right: 0rem !important;
      .ivu-dropdown-rel {
        a {
          padding-right: 0;
          border-right: none;
        }
        .language {
          .countryIcon {
            background: url(../../static/img/China.png) center center no-repeat;
            background-size: contain;
            width: 1rem;
            display: inline-block;
            height: 1rem;
            border-radius: 0.5rem;
            vertical-align: middle;
            margin: 0 0.25rem;
          }
        }
      }
    }
    .ivu-dropdown {
      margin-right: 1.25rem;
      .ivu-dropdown-rel {
        .username {
          color: #fefefe !important;
          padding-right: 1.25rem;
          border-right: 1px solid #fff;
          display: inline-block;
          vertical-align: middle;
          p {
            color: #fefefe !important;
            height: 1.1rem;
            line-height: 1.05rem;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        a {
          color: #fefefe !important;
          padding-right: 1.25rem;
          border-right: 1px solid #fff;
        }
      }
    }
  }

  // .item-padding {
  //   -webkit-box-flex: 1;
  //   -ms-flex: 1;
  //   -webkit-flex: 1;
  //   flex: 1;
  // }

  .item-set > div {
    color: #fff;
  }
  .slot-item {
    display: inline-block;
    vertical-align: middle;
    span {
      color: #fefefe;
      padding-right: 1.25rem;
      margin-right: 1.25rem;
      cursor: pointer;
    }
    .logClass {
      vertical-align: middle;
      i {
        font-style: normal;
        margin: 0 1rem;
      }
    }
    .logClass:hover {
      color: #fff;
    }

    span:hover {
      color: #f3ba2f;
      transition: all 0.3s ease-in-out;
    }
    .fontColor {
      color: #f3ba2f !important;
      transition: all 0.3s ease-in-out;
      cursor: default !important;
    }
  }
}
</style>
