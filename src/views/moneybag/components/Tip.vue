<template>
  <div class="moneybag_transfer assetMoneyModel">
    <div class="box transfer-hei withdrawTip">
      <span class="icon-wrong close" @click="close()"></span>
      <div class="p">
        <p>{{massage}}</p>
      </div>
      <button type="button"
              class="transfer"
              @click="close"
      >确定</button>
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
    name: 'Tip',
    props: ['massage'],
    methods: {
      close () {
        this.$emit('close');
      }

    }
  };
</script>
