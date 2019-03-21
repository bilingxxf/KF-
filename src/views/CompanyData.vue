<template>
    <!-- 备份9.10-CompanyData -->
    <div class="CompanyData" v-if="isData">
      <div >
        <!-- 商家信息弹窗 -->
        <div class="Company_top">
          你有{{ tempData.length }}条订单待处理
          <span @click="isOk">x</span>
        </div>
        <div class="Company_cn">
          <ul>
            <li v-for="item in tempData">
              <!-- otc-order  @click="wPayment(item.otc_transac_id , item)"-->
              <router-link target="_blank"  :to="{ path:'/order',query:{ otc_transac_id: item.otc_transac_id, member: 'advertiser',  type:item.otc_advertisement_type == 2 ?  'buy': 'sell'} }">
                <span>{{item.otc_transac_sn}}</span>
                <i v-if="item.otc_transac_status == 1"> 待付款 </i>
                <i v-if="item.otc_transac_status == 2"> 待放币 </i>
               </router-link>
              <!-- <p>已下单{{ item.created_at | mins }}分钟{{ item.created_at | seconds }}秒</p> -->
              <p>已下单{{ item.created_at | mins }}分钟{{ item.created_at | seconds }}秒</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 音频 -->
      <div class="Company_mp3" v-show="false">
        <audio ref="audio" controls autoplay height="100" width="100" src="../../static/img/toin.m4a">
        </audio>
      </div>
    </div>
</template>
<script>
// otc_transac_status :  1   2  展示
import Model from "./model/Model.vue";
import api from "../api";
import utils from "../utils.js";
export default {
  data() {
    return {
      resStatus_code: "", //获取返回状态码
      CompanyData: [],
      tempData: [], //符合条件数据
      // tempTime:null,
      isData: false,
      isdemo: false
    };
  },

  created() {
    //  otc商家订单列表
    // console.log(11111);
  },

  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  watch: {
    isLogin() {
      if (!this.isLogin) {
        this.isData = false;
      }

      if (utils.isLogin()) {
        this.getList();
        setInterval(() => {
          this.getList();
        }, 30000);
      } else {
        this.isData = false;
      }
    },
    // "$store.getters.isLogin"() {
    //   // console.log(111111);
    //   if (utils.isLogin()) {
    //     this.getList();
    //     setInterval(() => {
    //       this.getList();
    //     }, 30000);
    //   } else {
    //     this.isData = false;
    //   }
    // }
  },
  methods: {
    isOk() {
      this.isData = false;
    },
    getList(params) {
      // 判断token
      if (utils.isLogin()) {
        api.proListShow().then(res => {
          if (res.status_code == 200) {
            this.tempData = res.data.list;
            // console.log(this.tempData);
            if (this.tempData.length > 0) {
              // this.false = true
              if (location.hash.split("?")[0] == "#/order") {
                //判断哈希值
                // console.log(22222222);
                this.isData = false;
              } else {
                // this.isData = true;
                this.isData = true;
                this.$refs["audio"].load();
              }
            } else {
              this.isData = false;
            }
          } else if (res.status_code == 6028) {
            // 非广告主
            // console.log("非广告主");
          }
        });
      } else {
        this.isData = false;
      }
    }
  },
  updated() {
    // console.log(this.tempData[0].created_at / 1000 / 60 / 1000);
    // console.log(this.resStatus_code);
    // console.log(  Date.parse(new Date())   )
    // console.log( this.tempData[0].created_at )
  },
  filters: {
    mins(val) {
      if (val) {
        // console.log(val);
        // console.log(  ( Date.parse(new Date() ) - Date.parse(new Date(val*1000)))    )
        // 1536824218000  1536826007000
        return parseInt(
          (Date.parse(new Date()) - Date.parse(new Date(val * 1000))) /
            1000 /
            60
        );
      }
    },
    seconds(val) {
      if (val) {
        return parseInt(
          ((Date.parse(new Date()) - Date.parse(new Date(val * 1000))) / 1000) %
            60
        );
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.CompanyData {
  position: fixed;
  bottom: 3.55rem;
  right: 1.05rem;
  width: 12.7rem;
  max-height: 18.5rem;
  background-color: #fff;
  // box-shadow: 0 0 0.6rem 0 #ccc;
  z-index: 999;
  // overflow: auto;
  i {
    font-style: normal;
  }
  .Company_top {
    height: 2.5rem;
    background-color: #fea914;
    font-size: 0.9rem;
    color: #fff;
    line-height: 2.5rem;
    text-align: center;
    position: relative;
    span {
      position: absolute;
      font-size: 0.7rem;
      color: #fff;
      right: 0.75rem;
      top: 0rem;
      cursor: pointer;
    }
  }
  .Company_cn {
    padding: 1.5rem 1.5rem 0;
    overflow: auto;
    max-height: 16rem;
    li {
      padding-bottom: 1.5rem;
      a {
        font-weight: 400;
        font-size: 0.7rem;
        color: #333;
        span {
          color: #fea914;
          width: 6.5rem;
          display: inline-block;
        }
        em {
        }
      }
      p {
        font-size: 0.7rem;
        color: #333;
      }
    }
  }
  .Company_mp3 {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background: #ccc;
    height: 0rem;
    overflow: hidden;
    width: 5rem;
  }
}
</style>
