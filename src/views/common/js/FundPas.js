import Vue from 'vue';
import FundPas from '../components/FundPas.vue'; //引入组件
import iView from 'iview'
Vue.use(iView)
let FundPasConstructor = Vue.extend(FundPas) // 返回一个“扩展实例构造器”

let myFundPas = (obj={}) => {
    let FundPasDom = new FundPasConstructor({
        el: document.createElement('div') //将FundPas组件挂载到新创建的div上
    })
    document.body.appendChild(FundPasDom.$el) //把FundPas组件的dom添加到body里

    FundPasDom.successFn = obj.success || function(){};
    FundPasDom.errorFn = obj.error || function(){};
    FundPasDom.doNothing = obj.doNothing || function(){};
    FundPasDom.isShow = true;
}
export default myFundPas;