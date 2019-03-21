<template>
  <div class="moneybag_transfer">
    <div  class="box transfer-hei withdrawTip">
      <span class="icon-wrong close" @click="close()"></span>
      <div class="p">
        <p>{{ $t(`message.MoneyBag.WithdrawTip`) }}</p>
      </div>
      <button type="button"
              class="transfer"
              @click="Transfer"
      >{{ $t(`message.BaseInfo.Confirm`) }}</button>
      <button
        class="cancle"
        @click="close()"
        type="button"
        style="color: #ccc;"
      >{{ $t(`message.BaseInfo.Cancel`) }}</button>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'WithdrawTip',
    methods: {
      close () {
        this.$emit('close');
      },
      Transfer() {
        this.$router.push({
          path:'/accountSettings'
        })
      }

    }
  };
</script>
