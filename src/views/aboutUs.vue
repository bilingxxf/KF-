<template>
  <div class="about_us">
    <div class="about_top">
        <img src="../../static/img/about_logo.png" alt="">
        <div class="about_ct">
          <h3>关于我们</h3>
             <!-- class="about_b" -->
            <p>
              比特币的出现，带动了数字加密货币的兴起。同时区块链开始受到创业者、大公司和资本市场的青睐。随着各国积极推动区块链技术和应用发展，区块链在世界各地迅速普及和发展，造就区块链产业良好的发展势头和环境。然而，在人们都看好区块链发展前景的时候，区块链交易所问题层出不穷。面对市场鱼龙混杂的情况，KF数字资产交易系统应运而生。
            </p>     
            <p>
              KF数字资产交易系统是由一群区块链爱好者创建而成的一个面向区块链资产的交易平台。KF致力于为用户提供更加安全、便捷的区块链资产兑换服务。KF基础社区设立于全球第四大金融中心新加坡，聚合世界一流区块链人才，技术社区成员均拥有多年项目开发经验，运营社区成员均来自全球各大金融机构，拥丰富的大型项目运营经验。
            </p>                      
        </div>       
    </div>
    
  </div>  
</template>
<script>
export default {};
</script>
<style scoped>
.about_us {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.about_us .about_top {
  height: 51rem;
  width: 100%;
  background: url("../../static/img/about_bn.jpg") center top no-repeat;
  background-size: cover;
  position: relative;
}
.about_us .about_top img {
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
}
.about_us .about_ct {
  width: 51.7rem;
  height: 35.7rem;
  position: absolute;
  background: url("../../static/img/about_cn.png") center top no-repeat;
  background-size: cover;
  left: 50%;
  transform: translateX(-50%);
  top: 13rem;
}
.about_us .about_ct h3 {
  font-size: 1.8rem;
  color: #fff;
  text-align: center;
  padding-top: 2.5rem;
  padding-bottom: 1.75rem;
}
.about_us .about_ct p {
  font-size: 0.9rem;
  color: #fff;
  line-height: 2.4rem;
  width: 80%;
  margin: 0 auto;
}
.about_us .about_ct p{
  padding-bottom: 1rem;
}
</style>
