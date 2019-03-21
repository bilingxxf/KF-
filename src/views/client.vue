<template>
  <div class="content">
    <img class="content_h" src="../../static/img/www_down.png" alt="">
    <p class="content_p">覆盖iOS、Android、Windows、Mac多个平台、支持全业务功能</p>
    <div class="content_details">
      <div class="details_fl">
        <img src="../../static/img/padphone1.png" alt="" width="630" height="440">
      </div>
      <div class="details_fr">
        <div class="details_er">        
          <a class="de_a" href="javascript:;">
            <!-- 遮罩 -->
            <div class="shade_a">敬请期待</div>
            <img src="../../static/img/win_icon.png" alt="">
            <span>Win</span><span>下载</span>
          </a>
        </div>
        <div class="details_er">      
          <a class="de_a" href="javascript:;">
            <!-- 遮罩 -->
            <div class="shade_a">敬请期待</div>
            <img src="../../static/img/ios_icon.png" alt="">
            <span>Mac</span><span>下载</span>
          </a>
        </div>
        <div class="details_er">  
          <div class="img">
            <img src="../../static/img/android-appkf.png" alt="">
            <!-- 后台数据转二维码 -->
            <!-- <img :src="qr_msg" alt=""> -->
          </div>
          <div class="cn">
            <!-- href="https://static.kf.com/dl/KF.v1.0.1.apk" -->
            <a :href="android">
              <img src="../../static/img/android_icon.png" alt=""><span>Android 下载</span>   
            </a>       
          </div>
        </div>
        <div class="details_er">
          <div class="img">
            <!-- 遮罩 -->
            <!-- <div class="shade"><span>敬请期待</span></div> -->
            <img src="../../static/img/android-appkf.png" alt="">
            <!-- <img :src="ios_img" alt=""> -->
          </div>
          <div class="cn">
            <!-- href="http://www.pgyer.com/oucloudKF" -->
            <a :href="ios" target="_blank">
              <img src="../../static/img/ios_icon.png" alt=""><span>iOS 下载</span>         
            </a> 
          </div>
        </div>

      </div>
    </div> 
  </div>  
</template>
<script>
// import QRCode from 'qrcodejs2'  // 生成二维码功能
import Model from "./model/Model.vue";
import api from "../api";
import utils from "../utils.js";
import { Base64 } from "js-base64"; // base64
export default {
  data() {
    return {
      ios: "",
      android: "",
      qr_msg: "",
      ios_img: ""
    };
  },
  methods: {
    getDown(params) {
      if (params == 1) {
        let base = "";
        api
          .downVersionNum(params)
          .then(res => {
            // 1 安卓
            if (res.status_code == 200) {
              this.android = res.data.accessUrl;
              base = Base64.encodeURI(res.data.accessUrl); // 地址转base64
              // console.log(base)
            }
          })
          .then(() => {
            // 转二微码
            api.rechargeInfoImg({ qr_msg: base }).then(res => {
              //  console.log(res);
              if (res.code == 200) {
                //  转二微码 具体值
                this.qr_msg = "data:image/png;base64," + res.data.QrCode;
              }
            });
          });
      }
      if (params == 2) {
        let base = "";
        api
          .downVersionNum(params)
          .then(res => {
            // 2 苹果 暂时不用
            // console.log(res);
            if (res.status_code == 200) {
              this.ios = res.data.ipaUrl;
              base = Base64.encodeURI(res.data.ipaUrl); // 地址转base64
            }
          })
          .then(() => {
            // 转二微码
            api.rechargeInfoImg({ qr_msg: base }).then(res => {
              //  console.log(res);
              if (res.code == 200) {
                //  转二微码 具体值
                this.ios_img = "data:image/png;base64," + res.data.QrCode;
                // console.log(object);
              }
            });
          });
      }
    }
  },
  created() {
    this.getDown(1); // 1 安卓
    this.getDown(2); // 2 苹果
  },
  updated() {
    // console.log(this.android);
  }
};
</script>
<style scoped>
.content {
  width: 63rem;
  /* background-color: #ccc; */
  margin: 0 auto 2.5rem;
  overflow: hidden;
}
.content .content_h {
  text-align: center;
  display: block;
  margin: 4.6rem auto 1.5rem;
}
.content .content_p {
  text-align: center;
  font-size: 1.3rem;
  color: #8893a8;
  line-height: 1;
  margin: 1.9rem 0 6rem;
}
.content .content_details {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content .details_fl {
  width: 31.5rem;
}
.content .details_fr {
  width: 31.5rem;
}

.content .details_er {
  width: 7.5rem;
  float: right;
  margin-left: 6.25rem;
  margin-right: 0.1rem;
  margin-bottom: 2.7rem;
}
.content .details_er .de_a {
  display: block;
  width: 7.5rem;
  height: 2.7rem;
  border: 1px solid #e0e0e0;
  border-radius: 1.25rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.content .details_er .de_a .shade_a {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  line-height: 2.7rem;
  font-size: 1rem;
  color: #fff;
  display: none;
}
.content .details_er .de_a:hover .shade_a {
  display: block;
}
.content .details_er .de_a img {
  vertical-align: middle;
}
.content .details_er .de_a span {
  color: #000;
  font-size: 0.9rem;
  line-height: 2.7rem;
  vertical-align: middle;
  padding-left: 0.3rem;
}
.content .details_er .img {
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 7.5rem;
  height: 7.5rem;
  position: relative;
}
.content .details_er .img img {
  width: 6.25rem;
  display: block;
  margin-top: 0.6rem;
  margin-left: 0.6rem;
}
.content .details_er .cn {
  text-align: center;
  padding: 1.1rem 0;
}
.content .details_er .cn a {
  display: block;
}
.content .details_er .cn img {
  vertical-align: middle;
}
.content .details_er .cn span {
  font-size: 0.9rem;
  color: #000000;
  padding-left: 0.5rem;
  vertical-align: middle;
}

/* 遮罩 */
/* .shade {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.shade span {
  line-height: 7.5rem;
  color: #fff;
  font-size: 1rem;
} */
</style>
