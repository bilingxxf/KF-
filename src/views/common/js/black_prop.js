import Vue from 'vue';
import black_prop from '../components/black_prop.vue'; //引入组件
let Black_propConstructor = Vue.extend(black_prop) // 返回一个“扩展实例构造器”

let myBlack_prop = (massage) => {
    let black_propDom = new Black_propConstructor({
        el: document.createElement('div') //将black_prop组件挂载到新创建的div上
    })
    document.body.appendChild(black_propDom.$el) //把black_prop组件的dom添加到body里

    black_propDom.massage = massage;
    black_propDom.isShow = true;
}
export default myBlack_prop;