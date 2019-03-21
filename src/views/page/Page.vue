<template>
  <div class="body NewsDetails">
    <div class="box">
      <div class="detail">
        <div class="detail-container" v-if="information == ''">
          <div class="none_info">
            <p><span class="icon-no_info"></span></p>
            <p>暂无数据 . . . </p>
          </div>
        </div>
        <div class="detail-container" :model="information" v-else>

          <div class="detail-header">
            <div class="detail-titile">
              <p>{{information.title}}</p>
            </div>
            <div class="detail-info">

            </div>
          </div>
          <div class="content" v-html="information.content">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../api'
  export default{
    data(){
      return{
        information:{

        }
      }
    },
    created(){
       this.getInfo();
    },
    watch:{
      '$route':['getInfo'],
    },
    methods:{
      getInfo(){
        let params = {
          code : this.$route.query.code
        };
        api.userManage(params).then( res => {
        	if(res.status_code == 200){
            this.information = res.data;
            $('html, body').animate({scrollTop: 0}, 200)
        	}
        })
      }
    }
  }
</script>
