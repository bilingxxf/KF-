<template>
  <div>
    <Content>
      <div class="news">
        <div class="head-banner">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" style="background: url(../../../static/img/news.png)no-repeat 50% center;">
                <div class="swiper-content">
                </div>
              </div>
              <div class="swiper-slide" style="background: url(../../../static/img/news.png)no-repeat 50% center;">
              </div>
              <div class="swiper-slide" style="background: url(../../../static/img/news.png)no-repeat 50% center;">
              </div>
              <div class="swiper-slide" style="background: url(../../../static/img/news.png)no-repeat 50% center;">
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div class="main-title">
          <p>{{ $t(`message.Footer.NewsCentre`) }}/NEWS</p>
        </div>
        <div class="newscontent">
          <ul class="newsitems" v-if='hasInfo'>
            <li class="newsitem" v-for="item in list">
               <router-link :to="{
                path:'/NewsDetails',
                query: {
                  code: item.code,
                  id: item.id,
                  way:2
                 }
              }">
              <div class="item-left">
                <div class="left-time-month">{{item.month}}</div>
                <div class="left-time-day">{{item.day}}</div>
              </div>
                <div class="item-right">
                  <h3 class="news-titile">
                    <span class="titlep">{{item.title}}</span>
                    <span class="right-time">{{item.date}}</span>
                  </h3>
                  <p class="news-content">{{item.summary}}</p>
                </div>
              </router-link>
            </li>
            <Page :total="total" class="pageOrder" @on-change="handleChange" :page-size="pageSize"></Page>
          </ul>
           <div class="newsitems" v-else>
              <div class="none_info">
                <p><span class="icon-no_info"></span></p>
                <p>{{ $t(`message.NoData`) }} . . . </p>
             </div>
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>
<script>
  import '@/assets/js/swiper.min.js'
  import '@/assets/css/swiper.min.css'
  import api from '../../api'
  export default{
    data(){
      return{
        list: [],
        total:0,
        pageSize:5,
        hasInfo:true
      }
    },
    methods:{
      getNewsInfo(page) {
        let p = {
          sort: 'desc',
          code: 'news',
          page: page,
          page_size:this.pageSize
        };
        api.getNewsList(p).then((res => {
          if(res.status_code == 200 && res.data.list.length > 0){
            this.hasInfo = true;
            this.list = res.data.list;
            this.total = res.data.page.total;
          }else{
            this.hasInfo = false;
          }
        }))
          .catch( res=> {
            console.log(error);
            this.hasInfo = false;
          });
      },
      handleChange(page){           //分页
        this.getNewsInfo(page);
      }
    },
    mounted(){
      this.getNewsInfo(1);
      var mySwiper = new Swiper ('.swiper-container', {
        initialSlide :0,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        parallax: true,
        speed: 600,
        loop: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        observer:true,
        observeParents:true
      })
       $('html, body').animate({scrollTop: 0}, 200)
    }
  };
</script>

