<template>
  <div class="body NewsDetails">
    <div class="box">
      <div class="detail">
        <div class="detail-container" :model="detail">
          <div class="detail-nav">
            <router-link to="/announcement" v-if="way == 1">{{ $t(`message.Footer.Announce`) }}</router-link>
            <router-link to="/news" v-if="way == 2">{{ $t(`message.Footer.News`) }}</router-link>
            <span>&nbsp;>>&nbsp;</span>
            <span>{{detail.title}}</span>
          </div>
          <div class="detail-header">
            <div class="detail-titile">
              <p>{{detail.title}}</p>
            </div>
            <div class="detail-info">
              <div class="detail-author">
                {{detail.subtitle}}
              </div>
              <div class="detail-time">
                <span></span>
                {{detail.created_at | time}}
              </div>
            </div>
          </div>
          <div class="content" v-html="detail.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../../api'
  export default {
    name: "NewsDetails",
    data(){
      return{
        detail:{},
        way:this.$route.query.way
      }
    },
    methods:{
      getNewsDetailInfo(){
        let params = {
          id: parseInt(this.$route.query.id),
          code: this.$route.query.code
        }
        api.getNewsDetail(params).then((res => {
          if( res.status_code == 200 && res.data){
            this.detail = {...res.data}
          }
        }))
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    filters:{
      time(value) {
        let date = new Date(value * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s
      },
    },
    mounted(){
      this.getNewsDetailInfo();
       $('html, body').animate({scrollTop: 0}, 200)
    }
  };
</script>
