<template>
	<div>
		<Content>
			<div class="announcement">
				<div class="head-banner">
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide" style="background: url(@/../static/img/gonggao.png)no-repeat 50% center;">
								<div class="swiper-content">
									<h1>公平交易,加密货币</h1>
									<p>以最佳的价格，对换加密货币</p>
									<p>以最佳的价格，对换加密货币</p>
									<p class="more_link">
										<a href="">了解更多</a>
									</p>
								</div>
							</div>
							<div class="swiper-slide" style="background: url(@/../static/img/gonggao.png)no-repeat 50% center;">
								<div class="swiper-content">
									<h1>公平交易,加密货币</h1>
									<p>以最佳的价格，对换加密货币</p>
									<p>以最佳的价格，对换加密货币</p>
									<p class="more_link">
										<a href="">了解更多</a>
									</p>
								</div>
							</div>
							<div class="swiper-slide" style="background: url(@/../static/img/gonggao.png)no-repeat 50% center;">
								<div class="swiper-content">
									<h1>公平交易，加密货币</h1>
									<p>以最佳的价格，对换加密货币</p>
									<p>以最佳的价格，对换加密货币</p>
									<p class="more_link">
										<a href="">了解更多</a>
									</p>
								</div>
							</div>
						</div>
						<div class="swiper-pagination"></div>
					</div>
					<div class="notice">
						<p>公告/NOTICE</p>
					</div>
				</div>
				<div class="notice-content">
					<div class="notice-wrap">
						<div class="notice-padding">

							<div class="exhibition_wrap" v-for="notice in noticeList" @click="noticeItem(notice.id,notice.code)">
								<div class="icon_img">
									<span class="icon-circle-line">
										<span class="path1"></span>
										<span class="path2"></span>
										<span class="path3"></span>
										<span class="path4"></span>
										<span class="path5"></span>
										<span class="path6"></span>
									</span>
								</div>
								<div class="exhibition">
									<div class="exhibition_content">
										<h2>{{notice.title}}
											<span v-if="notice.stick == 2">热点</span>
										</h2>
										<p>{{notice.summary}}</p>
									</div>
									<div class="timeDate">
										<p>{{notice.date}}</p>
									</div>
								</div>
							</div>
							<div class="exhibition_wrap" v-if='!isPage'>
								<div class="none_info">
									<p>
										<span class="icon-no_info"></span>
									</p>
									<p>暂无数据 . . . </p>
								</div>
							</div>
							<Page :total="total" class="pageOrder" @on-change="handleChange" :page-sizee="pageSize" v-if='isPage'></Page>
						</div>

					</div>
				</div>
			</div>
		</Content>
	</div>
</template>
<script>
import '../assets/js/swiper.min.js'
import '../assets/css/swiper.min.css'
import api from '../api'
export default {
	data() {
		return {
			noticeList: [],
			total: 0,
			pageSize: 5,
			isPage: true
		}
	},
	methods: {
		getAnnouncement(page) {         //公告列表
			let params = {
				sort: 'desc',
				code: 'notice',
				page: page,
				page_size: this.pageSize
			};
			api.getNewsList(params).then(res => {
				if (res.status_code == 200 && res.data.list.length > 0) {
					this.isPage = true;
					this.noticeList = res.data.list;
					this.total = res.data.page.total;
				} else {
					this.isPage = false;
				}
			}).catch(res => {
				this.isPage = false;
			})
		},
		noticeItem(id, code) {       //公告详情
			this.$router.push({
				query: {
					id: id,
					code: code,
					way: 1
				},
				path: '/NewsDetails'
			})
		},
		handleChange(page) {
			this.getAnnouncement(page);
		}
	},
	mounted() {
		var mySwiper = new Swiper('.swiper-container', {
			initialSlide: 0,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			parallax: true,
			speed: 600,
			loop: true,
			autoplay: 2000,
			autoplayDisableOnInteraction: false,
			observer: true,
			observeParents: true
		});
		this.getAnnouncement(1);
		$('html, body').animate({ scrollTop: 0 }, 200)
	}
}
</script>
