<template>
	<Footer class="foot">
		<section class="foot-container">
			<div class="foot-wrap">
				<div class="foot-left-container">
					<h1>www.KF.com</h1>
					<p>为更好的品质/更好的未来努力</p>
					<p class="icons">
						<ul>
							<li class="foot_icons">
								<a href="https://www.facebook.com/people/KF-Coin/100027368859640" target="_blank"></a>
							</li>
							<li class="foot_icons">
								<a href="https://twitter.com/coin_kf" target="_blank"></a>
							</li>
							<li class="foot_icons">
								<a href="https://www.reddit.com/u/KF_com/?st=JJGXK6SG&sh=06f65352" target="_blank"></a>
							</li>
							<li class="foot_icons">
								<a href="https://t.me/kf_com" target="_blank"></a>
							</li>
						</ul>
					</p>
				</div>
				<div class="foot-right-container">
					<ul class="foot_ul">
						<li class="cur">工具</li>
						<li>
              <a href="https://support.kf.com/hc/zh-cn/categories/360001069912-%E6%95%B0%E5%AD%97%E8%B5%84%E4%BA%A7%E5%B8%81%E7%A7%8D%E4%BB%8B%E7%BB%8D" target="_blank">数字资产介绍</a>
						</li>
						<li>
							<router-link :to="{path: '/client'}" target="_blank">客户端下载</router-link>
						</li>
					</ul>
					<ul class="foot_ul">
						<li class="cur">关于</li>
            <li>
              <router-link :to="{path: '/aboutus'}" target="_blank">关于我们</router-link>
						</li>
						<li>
							<a href="https://t.me/kf_com" target="_blank">联系我们</a>
						</li>
						<li>
							<a href="https://support.kf.com/hc/zh-cn" target="_blank">帮助中心</a>
						</li>
						<li>
							<a href="https://support.kf.com/hc/zh-cn/sections/360002377672-%E6%B4%BB%E5%8A%A8%E5%85%AC%E5%91%8A" target="_blank">公告</a>
						</li>
					</ul>
					<ul class="foot_ul">
						<li class="cur">条款说明</li>
						<!-- ,query:{code:'statement'} -->
						<li>
							<router-link :to="{path:'/kfuserpro'}" target="_blank">用户协议</router-link>
						</li>
						<li>
							<router-link :to="{path:'/privacy'}" target="_blank">隐私条款</router-link>
						</li>
						<li>
							<router-link :to="{path:'/legislation'}" target="_blank">法律声明</router-link>
						</li>
					</ul>
					<ul class="foot_ul">
						<li class="cur" style="text-align:center;margin-bottom:2.1rem;">关注我们</li>
						<li class="weixin_comm_about">
							<img src="../../static/img/weixin_comm.png" alt="">
						</li>
					</ul>
				</div>

			</div>

			<p class="copyright">©2018 - 2019 www.KF.com </p>

		</section>
	</Footer>
</template>
<script>
export default {
	data() {
		return {

		}
	},
	methods: {

	}
}
</script>
<style lang="scss">
//footer
.foot {
  position: relative;
  height: 21rem;
  background: rgb(42, 54, 108) !important;
  padding: 0 !important;
  width: 100%;
  z-index: 22;

  @media screen and (min-width: 1200px) {
    .foot-container {
      //   width: 90% !important;

      .foot-wrap {
        // padding: 1.9rem 0 !important;
      }
    }
  }

  .foot-container {
    height: 100%;

    .foot-wrap {
		overflow: hidden;
      .weixin_comm_about {
        width: 5rem;
        height: 5rem;
        background-color: #fff;
        img {
          width: 4.5rem;
          height: 4.5rem;
          margin: 0.25rem;
        }
      }

      .weixin_comm_about {
        width: 5rem;
        height: 5rem;
        background-color: #fff;
        img {
          width: 4.5rem;
          height: 4.5rem;
          margin: 0.25rem;
        }
      }

      .foot-left-container {
        height: 7rem;
        width: 14.5rem;
        display: inline-block;
        margin-top: 4rem;
        margin-left: 10rem;
        text-align: center;
        h1 {
          font-size: 2.3rem;
          color: #FFF;
          font-family: "arial-BoldMt";
          margin-top: 0;
          line-height: 2rem;
        }
        p {
          margin-top: 0.25rem;
          font-size: 1rem;
          color: #FFF;
          line-height: 1.9rem;
        }

        .foot_icons {
          display: inline-block;
          margin-right: 1rem;
          margin-top: 0.4rem;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;

          a {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
          }
        }
        .foot_icons:nth-child(1) {
          background-image: url(../../static/img/facebook.png);
          background-color: #FFF;
          background-size: contain;
        }
        .foot_icons:nth-child(2) {
          background-image: url(../../static/img/twitter43.png);
          background-color: #FFF;
          background-size: contain;
        }
        .foot_icons:nth-child(3) {
          background-image: url(../../static/img/reddit.png);
          background-color: #FFF;
          background-size: contain;
        }
        .foot_icons:nth-child(4) {
          background-image: url(../../static/img/telegram.png);
          background-color: #FFF;
          background-size: contain;
        }
      }

      .foot-right-container {
        height: 13.5rem;
        float: right;
        margin-right: 5rem;
        margin-top: 4rem;
      }
      .foot_ul {
        display: inline-block;
        margin-left: 4.9rem;
        margin-top: 0;
        vertical-align: top;

        .cur {
          margin-bottom: 1.8rem;
          font-size: 1rem;
          font-weight: 700;
        }

        li {
          font-size: 0.9rem;
          color: #fff;
          margin-bottom: 1.1rem;
          a {
            font-size: 0.7rem;
            color: #fbfaea;
          }

          a:hover {
            transition: all 0.3s ease-in-out;
            color: #6a75a9;
          }

          .router-link-exact-active {
            color: #f3ba2f;
          }
        }
      }

      .foot_ul:nth-child(1) {
        margin-left: 0;
      }
	}
	
	.copyright {
		width: 100%;
		height: 3.5rem;
		background-color: #000;
		font-size: 0.6rem;
		color: rgb(101, 109, 122);
		line-height: 3.5rem;
		text-align: center;
	}
  }
}
</style>
