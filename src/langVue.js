import Vue from 'vue'
import VueI18n from 'vue-i18n'
import i18n from './lang'
Vue.use(VueI18n)

export default new Vue({
    i18n: i18n(VueI18n)
})