<template>
  <div class="otccheck">
    <div class="checkbox">
      <span class="icon-wrong close" @click="closeTransfer()"></span>
      <p class="transfer-header margin-bottom-20">划转查看</p>
      <form action="" class="transfer-select">
        <p class="input-title">时间</p>
        <div class="data">{{time}}</div>
        <p class="input-title">币种</p>
        <div class="data">{{currency}}</div>
        <p class="input-title">从</p>
        <div class="data">{{from}}</div>
        <p class="input-title">转至</p>
        <div class="data">{{to}}</div>
        <p class="input-title">数量</p>
        <div class="data">{{number}}</div>
        <p class="input-title">状态</p>
        <div class="data">{{state}}</div>
        <button type="button"
                class="transfer"
                @click="confirm()"
        >确定</button>
        <button
          class="cancle"
          @click="closeTransfer()"
          type="button"
        >取消</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'OtcCheck',
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

