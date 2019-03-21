<template>
  <div id="app">

    <div class="layout">
      <Layout>
        <Header></Header>
          <div class="content">
            <router-view></router-view>
          </div>
        <Footer v-if="!hideFooter && lazyload"></Footer>
        <!-- 新加商家信息弹窗 -->
        <CompanyData>  </CompanyData>
      </Layout>
    </div>
  </div>
</template>

<script>
import Footer from "./views/Footer.vue";
import Header from "./views/HeaderTop.vue";
import api from "./api";
import utils from "./utils";

import CompanyData from "./views/CompanyData.vue";

export default {
  data() {
    return {
      lazyload: false
    };
  },
  components: {
    Footer,
    Header,
    CompanyData,

  },
  computed: {
    hideFooter () {
      return  this.$store.getters.hideFooter
    }
  },
  mounted () {
    setTimeout(() => {
      this.lazyload = true
    }, 500)
  }
};
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  font-family: "Hiragino Sans GB","Microsoft YaHei","微软雅黑",tahoma,arial,simsun;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.layout {
  position: relative;
  overflow: hidden;
}
.ivu-layout {
  background: #fff !important;
}
::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.75rem;
  background-color: #171a2a;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  background-color: #171a2a;
}
::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  -webkit-box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.3);
  background-color: #272c39;
}
</style>
