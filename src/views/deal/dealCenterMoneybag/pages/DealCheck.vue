<template>
  <div class="dealcheck">
    <div class="box">
      <span class="icon-wrong close" @click="closeTransfer()"></span>
      <p class="transfer-header margin-bottom-20">{{ $t(`message.DealCenter.TransferInformation`) }}</p>
      <form action="" class="transfer-select">
        <p class="input-title">{{ $t(`message.DealCenter.Time`) }}</p>
        <div class="data">{{time}}</div>
        <p class="input-title">{{ $t(`message.Coin`) }}</p>
        <div class="data">{{currency}}</div>
        <p class="input-title">{{ $t(`message.DealCenter.from`) }}</p>
        <div class="data">{{from}}</div>
        <p class="input-title">{{ $t(`message.DealCenter.ToUser`) }}</p>
        <div class="data">{{to}}</div>
        <p class="input-title">{{ $t(`message.OTCBeal.Volume`) }}</p>
        <div class="data">{{number}}</div>
        <p class="input-title">{{ $t(`message.OTCOrder.Status`) }}</p>
        <div class="data">{{state}}</div>
        <button type="button"
                class="transfer"
                @click="confirm()"
        >{{ $t(`message.BaseInfo.Confirm`) }}</button>
        <button
          class="cancle"
          @click="closeTransfer()"
          type="button"
        >{{ $t(`message.BaseInfo.Cancel`) }}</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'DealCheck',
    data () {
      return {
        time: '123',
        currency: '123',
        from: '12',
        to: '34',
        number: '123',
        state: '123'
      }
    },
    methods: {
      closeTransfer () {
        this.$emit('close');
      },
      confirm() {
        this.closeTransfer()
      }

    }
  };
</script>

<style scoped>

</style>
