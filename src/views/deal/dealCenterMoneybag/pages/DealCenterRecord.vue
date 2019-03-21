<template>
    <div class="dealcenterrecord">
    	<div class="record-wrap" style="padding-top:1.4rem;">
	        <div style="padding-top: 0rem;padding-bottom: 0;width:50rem" class="record">
	            <div v-show="false" class="record-header">
	                <!--<router-link to="/DealCenterMoneybag">我的资金</router-link>
	                <a href="javascript:;">记录</a>-->
	               	<span>资金记录</span>
	               	<a href="#" class="go-back">返回</a>
	            </div>
	            <div class="box">
	                <div class="box-header">
	                    <p style="color: #f5b821;font-size: 0.9rem;margin-left: 1.65rem;" class="moneybag">币币资产-资金记录</p>
	                </div>
	                <div v-if="moneylist.length > 0" class="container">
	                    <table class="table-title">
	                        <tr class="tr-first">
	                            <th id="colone">时间</th>
	                            <th id="coltwo">币种</th>
	                            <th id="colthree">类型</th>
	                            <th id="colfour">数量</th>
	                        </tr>
	                    </table>
	                    <div class="table-container">
	                        <table>
	                            <tr v-for="(item,index) in moneylist" :key="index">
	                                <td>{{item.created_at}}</td>
	                                <td class="currency">
	                                    <span><img v-show="false" :src="item.coin_image" alt=""></span> {{item.coin_name}}</td>
	                                <td class="availableBalance">{{item.finance_history_type}}</td>
	                                <td>{{item.amount}}</td>
	                            </tr>
	                        </table>
	                    </div>
	                    <div class="footer" id="myfooter">
	                        <Page :total="currentCount" class="pageOrder" :current="page" page-size="10" @on-change="pageIndex"></Page>
	                    </div>
	                </div>
	                <div v-else class="jayDCListlistnull">
                        <div v-show="!loading">
                            <span class="icon-no_info"></span>
                        </div>
                        <p v-show="!loading">暂无记录</p>
                        <!-- 加载中 -->
                        <div class="loading" v-show="loading">
                            <Spin size="large" fix></Spin>
                        </div>
	                </div>
	            </div>
	        </div>
	    </div>
    </div>
</template>
<script>
import DealCheck from './DealCheck.vue'
import api from '@/api'
export default {
    components: {
        DealCheck
    },
    data() {
        return {
            //列表数组
            moneylist: [],
            currentCount: 0,
            //接收路由带过过来的id
            id: '',
            //页数
            mypage: [],
            pageSize: 10,
            loading: true,
            page: 1
        }
    },
    methods: {
        //请求
        pageIndex(page) {
            this.page = page;
            // this.moneylist = [];
            this.mypage = [];
            let params = {
                coin_id: this.id,
                page: page,
                limit: 10
            };
            this.getList(params)
        },
        // 币币交易资产记录列表请求
        getList(params) {
            this.loading = true;
            api.bibiRecordList(params).then(res => {
                if (res.status_code == 200) {
                    this.timer = setInterval(() => {
                        this.loading = false;
                    }, 10);
                    this.moneylist = res.data.list;
                    this.mypage = res.data.page;
                    this.currentCount = res.data.page.count;
                    this.moneylist.forEach((val, index) => {
                        switch (val.finance_history_type) {
                            case 12001:
                                val.finance_history_type = 'OTC资产转入'
                                break;
                            case 12002:
                                val.finance_history_type = '钱包资产转入'
                                break;
                            case 12003:
                                val.finance_history_type = '币币购买'
                                break;
                            case 12004:
                                val.finance_history_type = '币币交易撤销返回'
                                break;
                            case 12005:
                                val.finance_history_type = '数字币提现返回'
                                break;
                            case 22001:
                                val.finance_history_type = '转出到OTC资产'
                                break;
                            case 22002:
                                val.finance_history_type = '转出到钱包资产'
                                break;
                            case 22003:
                                val.finance_history_type = '币币出售'
                                break;
                            default:
                                val.finance_history_type = ' '
                                break;

                        }
                    });
                }
            }).catch(res => {
            })
        },
    },
    mounted() {
        this.$store.commit('changeDealShow', 1);
        this.pageIndex(1);
    },
    beforeDestroy() {
        this.$store.commit('changeDealShow', 0);
        clearInterval(this.timer);
        this.timer = null;
    },
    created() {
        this.id = this.$route.query.coin_id;
    }
};
</script>
<style scoped>
/* 新添加  */
.dealcenterrecord .record-header {
	background: #1D2F6B;
	padding: 0 1rem ;
}
.dealcenterrecord .record-header a.go-back {
	float: right;
	color: #fff;
	font-size: 0.9rem;
}
.dealcenterrecord {
	width: 100%;
	background: url(../../../../../static/img/homeBg.png) no-repeat top center;
	background-size: 100% 100%;
}
.record {
	width: 50rem;
	/* background: #4E5E90; */
	padding: 1.5rem 3rem;
}
.record-wrap {
	overflow: hidden;
	width: 100%;
	height: 100%;
	padding: 2.4rem 0 2.25rem;
}
.dealcenterrecord .box {
	width: 100%;
    height: 46rem;
	background: #4B5E94;
	box-shadow: 0 1px 0.6rem 0 #2E407B;
	border-radius: 0.1rem;
	margin: 1rem 0 0 0;
	padding: 0;
}
.dealcenterrecord .record-header a,
.record-header span {
	color: #F5B821;
	font-size: 1rem;
}
.dealcenterrecord .container {
	padding: 0 1.25rem;
}
.dealcenterrecord .box-list {
	color: #fff;
	line-height: 2.4rem;
}
.dealcenterrecord .box-list li {
	float: left;
	padding: 0 1rem;
	cursor: pointer;
	font-size: 0.8rem;
}
.dealcenterrecord .box-list li:hover {
	color: #F5B821;
}
.dealcenterrecord .box-list .tab-li-active {
	color: #F5B821;
}
.pageposition {
	margin: 1rem 0 0 0;
}
.dealcenterrecord .box-header {
	height: 3rem;
	line-height: 3rem;
	border: 0;
	background: #1D2F6B;
}
.dealcenterrecord .moneybag {
	line-height: 3rem;
}
.dealcenterrecord .container tr.tr-first:hover {
	background: none;
}
.ivu-spin-fix {
    background: transparent;
}
.loading {
    position: relative;
    top:1.5rem;
    width:100%;
    height: 10rem;
    background: transparent;
}
</style>
