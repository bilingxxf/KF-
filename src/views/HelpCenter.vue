<template>
  <div>
    <Content>
      <div class="helpCenter">
        <div class="head-banner">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" style="background: url(@/../static/img/help.jpg)no-repeat 50% center;">
                <div class="swiper-content">
                  <h1>数据治理</h1>
                  <p>提高数据数据的可靠性，维护管理的专业化、商业化</p>
                  <p>及促进数据治理的良性运作</p>
                  <p class="more_link"><a href="javascript:;">了解详情</a></p>
                </div>
              </div>
              <div class="swiper-slide" style="background: url(@/../static/img/help.jpg)no-repeat 50% center;">
                <div class="swiper-content">
                  <h1>数据治理</h1>
                  <p>提高数据数据的可靠性，维护管理的专业化、商业化</p>
                  <p>及促进数据治理的良性运作</p>
                  <p class="more_link"><a href="javascript:;">了解详情</a></p>
                </div>
              </div>
              <div class="swiper-slide" style="background: url(../../static/img/help.jpg)no-repeat 50% center;">
                <div class="swiper-content">
                  <h1>数据治理</h1>
                  <p>提高数据数据的可靠性，维护管理的专业化、商业化</p>
                  <p>及促进数据治理的良性运作</p>
                  <p class="more_link"><a href="javascript:;">了解详情</a></p>
                </div>
              </div>
              <div class="swiper-slide" style="background: url(@/../static/img/help.jpg)no-repeat 50% center;">
                <div class="swiper-content">
                  <h1>数据治理</h1>
                  <p>提高数据数据的可靠性，维护管理的专业化、商业化</p>
                  <p>及促进数据治理的良性运作</p>
                  <p class="more_link"><a href="javascript:;">了解详情</a></p>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div class="main-nav">
          <div class="nav-header">
            <span :class="{active:tab==0}" @click="toggle(0,'currency')">币种介绍</span>
            <span :class="{active:tab==1}" @click="toggle(1,'platform')">平台介绍</span>
            <span :class="{active:tab==2}" @click="toggle(2,'issue')">常见问题</span>
          </div>
          <div class="nav-content">
            <div  class="nav-content-data">
              <div class="nav-content-left" >
                <ul class="header" id="header">
                    <li  v-for="item in currencyList" @click="listtoggle(item.id)">{{item.title}}</li>
                </ul>
              </div>
              <div class="nav-content-right" :model='rightdata'>
                <div  class="USDT" v-show="rightdata.length!=0">
                  <p class="title">{{rightdata.title}}</p>
                 <div class="textarea" v-html="rightdata.content">
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>
<script>
  import '../assets/js/swiper.min.js'
  import '../assets/css/swiper.min.css'
  import api from  '../api'
  export default{
    data(){
      return{
        tab:0,
        currencyList:[],
        text:'',
        rightdata:{},
        mypage:1,
        arraylength:0,
        oldArray:[],
        newArray:[],
        grop:0,
        open:true
      }
    },
    watch:{
      '$route':['currency']
    },
    methods:{
       toggle(index,content){
        this.rightdata = [];
         this.currencyList=[];
         this.tab = index;
         const params ={
            code:content,
            sort:'desc',
            page:this.mypage,
            page_size:18
          };
          api.getNewsList(params).then(res=>{

            if(res.status_code == 200){
              this.currencyList = res.data.list;
              this.arraylength = this.currencyList.length;
               this.listtoggle(res.data.list[0].id);
            }
          }).catch(err=>{
          });
      },
      listtoggle(listId){
         const newsId = {
           id:listId
         };
        api.getNewsDetail(newsId).then(res=>{
          this.rightdata =  res.data;
        })
      },
      currency(){
        if(this.$route.query.tab){
          this.tab = this.$route.query.tab;
        }else{
         this.$route.query.tab = 0;
           this.tab = 0
        }
        let item = '';
        if(this.tab == 0){
            item = 'currency'
        }else if(this.tab == 1){
            item = 'platform'
        }else if(this.tab == 2){
            item = 'issue'
        }
        this.toggle(this.$route.query.tab, item);
         $('html, body').animate({scrollTop: 0}, 200);
      },
    },
    mounted(){
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
      });
      $('.header').scroll(()=>{
          let a = document.getElementById('header').scrollTop;
          let b= document.getElementById('header').scrollHeight;
          let c= document.getElementById('header').clientHeight;
          if(c + a >=b){
            const params ={
              code:'currency',
              sort:'desc',
              page:++this.mypage,
              page_size:18,
            };
           if(this.open){
             api.getNewsList(params).then(res=>{
               this.oldArray = this.currencyList;
               this.grop = this.currencyList.length;
               if(res.status_code == 200){
                 this.newArray = res.data.list;
                 this.currencyList = this.oldArray.concat( this.newArray);
                 this.open = false;
                 if(this.grop == this.currencyList.length){
                   this.$Message.info('数据已全部加载');
                 }else{
                   this.open = true;
                 }
               }
             }).catch(err=>{
             });
           }
          }
      })
    },
    created(){
      this.currency()
    }
  }
</script>

