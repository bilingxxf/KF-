const messages = {
  en: {
    message: require('../static/lang/en.json')
  },
  ja: {
    message: require('../static/lang/ja.json')
  },
  cn: {
    message: require('../static/lang/cn.json')
  },
}

var lang
if (!localStorage.getItem('lang')) {
  var chromeLang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
  chromeLang = chromeLang.substr(0, 2); //截取lang前2位字符
  if (chromeLang == 'zh') {
    localStorage.setItem('lang', 'cn');
    localStorage.setItem('currency', 'CNY');
    lang = 'cn'
  } else {
    localStorage.setItem('lang', 'cn');
    localStorage.setItem('currency', 'CNY');
    lang = 'cn'
  }

} else {
  lang = localStorage.getItem('lang')
  if(lang == 'cn') {
    localStorage.setItem('currency', 'CNY');
  } else if(lang == 'cn'){
    localStorage.setItem('currency', 'CNY');
  }
}
lang = 'cn'

// Create VueI18n instance with options
// const i18n = new VueI18n({
//   locale: lang, // set locale
//   messages, // set locale messages
// });


function i18n(obj) {
  return new obj({
    locale: lang, // set locale
    messages, // set locale messages
  })
}
export default i18n
