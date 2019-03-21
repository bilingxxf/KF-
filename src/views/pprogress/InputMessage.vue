<template>
    <div class="inputMessage" v-if="show">
        <span>{{message}}</span>
        <i class="inputTri"></i>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: ['message', 'show']
}
</script>
<style lang="scss" scoped>
.inputMessage {
  position: absolute;
  height: 1.9rem;
  line-height: 1.9rem;
  padding: 0 1rem;
  font-size: 0.6rem;
  text-align: center;
  background-color: #5d677f;
  z-index: 9999;
  border-radius: 0.25rem;
  color: #fff;
  top: -2.25rem;
  width: 100%;
//   left: 50%;
//   width: 12rem;
//   transform: translateX(-50%);

  .inputTri {
    width: 0rem;
    height: 0rem;
    border-left: 0.3rem solid transparent;
    border-right: 0.3rem solid transparent;
    border-top: 0.3rem solid #2c3241;
    position: absolute;
    bottom: -0.3rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
