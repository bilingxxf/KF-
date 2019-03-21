<template>
  <div class="repeal repeal-new">
    <div class="box">
      <div v-if="buyRepeal =='buy'">
        <span class="icon-wrong close" @click="close()"></span>
        <p class="transfer-header margin-bottom-20">{{ $t(`message.MyAdvertising.Notice`) }}</p>
        <p class="tips">将会撤销当前委托，是否撤销?</p>
        <div class="repeal-new-line"></div>
        <button type="button" class="transfer" @click="Confirm()" :disabled="repealOnce">{{ $t(`message.MyAdvertising.withdraw`) }}</button>
        <button type="button" class="cancle" @click="close()">{{ $t(`message.BaseInfo.Cancel`) }}</button>
      </div>
      <div v-if="buyRepeal =='sell'">
        <span class="icon-wrong close" @click="close()"></span>
        <p class="transfer-header margin-bottom-20">{{ $t(`message.MyAdvertising.Notice`) }}</p>
        <p class="tips">将会撤销当前委托，是否撤销?</p>
        <div class="repeal-new-line"></div>
        <button type="button" class="transfer" @click="ConfirmSell()" :disabled="repealOnce">{{ $t(`message.MyAdvertising.withdraw`) }}</button>
        <button type="button" class="cancle" @click="close()">{{ $t(`message.BaseInfo.Cancel`) }}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../../api.js'
  export default{
    name: 'Repeal',
    props:{
      whichIdDel:{
        type:[String, Number]
      },
      buyRepeal:{
        type:String,
        default:"buy"
      }
    },
    data () {
      return {
        repealOnce:false
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      ConfirmSell () {
        this.repealOnce = true;
        let datas = {
          id:this.whichIdDel
        }

        api.dealCenterRecordRepealSell(datas).then(res=>{
          if(res.status_code == 200){
            this.$emit('close',"refreshSell");
            this.repealOnce = false;
          }else{
            this.repealOnce = false;
          }
        }).catch(error=>{
          this.repealOnce = false;
        })
      },
      Confirm () {
        this.repealOnce = true;
        let data = {
          id:this.whichIdDel
        }
        api.dealCenterRecordRepealBuy(data).then(res=>{
          if(res.status_code == 200){
            this.$emit('close',"refresh");
            this.repealOnce = false;
          }else{
            this.repealOnce = false;
          }
        }).catch(error=>{
          this.repealOnce = false;
        })
      }
    }
  };
</script>

