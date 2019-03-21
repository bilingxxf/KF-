<template>
  <div class="basicInformation">
    <div class="basicInformationPadding">
      <p class="title">{{ this.$t(`message.BaseInfo.Information`) }}</p>
      <ul class="basicInformationContent">
        <li class="InformationContentDan">
          <div class="informationTitle">{{ this.$t(`message.BaseInfo.Account`) }}:</div>
          <div class="informationContent" v-if="jbpzMessage.email">{{jbpzMessage.email}}</div>
          <div class="informationContent" v-else>{{jbpzMessage.phone}}</div>
        </li>
        <li class="InformationContentDan">
          <div class="informationTitle">{{ this.$t(`message.BaseInfo.Nickname`) }}:</div>
          <div class="informationContent">{{jbpzMessage.name}}</div>
        </li>
        <li class="InformationContentDan">
          <div class="informationTitle">{{ this.$t(`message.BaseInfo.RegistrationTime`) }}</div>
          <div class="informationContent">{{jbpzMessage.create_time}}</div>
        </li>
        <li class="InformationContentDan">
          <div class="informationTitle">{{ this.$t(`message.BaseInfo.LastLoginTime`) }}</div>
          <div class="informationContent">{{jbpzMessage.last_login_time}}</div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import api from '../../../api'
    export default {
        name: "jbxi",
      data(){
          return{
            jbpzMessage:{},
          }
      },
      methods:{
        getjbpzMessage(){
          api.jbpzMessage().then(res=>{
            // console.log(res);
            if(res.status_code == 200 && res.data){
              this.jbpzMessage = res.data;
              //请求成功再接受其他接口
            }
            // else if(res.status_code == 5010){
            //   this.$router.push('/login');
            // }
          }).catch(res=>{
            // console.log(res);
          })
        },

      },
      mounted(){
        this.getjbpzMessage()
      }
    }
</script>

<style scoped lang="scss">

</style>
