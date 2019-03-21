export default {
  // setCookie(cname, cvalue) {
  //   document.cookie = cname + "=" + escape(cvalue) + "; ";
  // },
  setCookie(name, value) {  
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + '; path=/;';
  },
  getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) == 0) return unescape(c.substring(name.length, c.length));
    }
    return "";
  },
  isLogin(){
    if (document.cookie == ''){
      return false
    } else if(this.getCookie('isLogin') == 'true'){
      
      return true
    }else {
      return false
    }
  }
}

