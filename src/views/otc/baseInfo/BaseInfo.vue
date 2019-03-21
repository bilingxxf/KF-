<template>
    <div class="baseInfo">
        <div class="baseInfo-middle">
          <!--基本信息-->
          <Jbxi></Jbxi>
          <!--保证金-->
          <EnsureMoney></EnsureMoney>
          <!--支付方式-->
          <ZfWay></ZfWay>

          <!--屏蔽黑名单-->
          <blackList></blackList>

          <!--回复语-->
          <!-- <AdIntroduct></AdIntroduct> -->

    </div>

    </div>
</template>

<script>
  import Jbxi from './Jbxi'
  import EnsureMoney from './EnsureMoney'
  import ZfWay from './ZfWay'
  import blackList from './BlackList'
  import AdIntroduct from '../../../views/otc/baseInfo/AdIntroduct'


    export default {
        name: "baseInfo",
      data(){
          return{

          }
      },
      components:{
        Jbxi,
        EnsureMoney,
        ZfWay,
        blackList,
        AdIntroduct

      },

    }
</script>

<style scoped lang="scss">

</style>
