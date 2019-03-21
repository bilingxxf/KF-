<template>
  <div class="record_box record_box_new">
  	<div class="record-wrap" style="padding-top: 1.5rem;">
	    <div class="record" style="padding-top:0.9rem;padding-bottom:0;width: 50rem;">
	      <div class="record-header" style="margin-bottom:0rem">
	        <a style="margin-left: 1.1rem;" href="javascript:;">钱包资产-资金记录</a>
					<!-- <a href="#" class="go-back">返回</a> -->
	      </div>
	      <div class="box" style="margin-top:0rem;">
	        <div v-show="false" class="box-header">
	        	<ul class="box-list">
	        		<li  class="tab-li-active">钱包记录</li>
	        	</ul>
	        </div>
         <!-- 钱包记录 -->
	        <div class="container" >
	          <table class="table-title">
	            <tr class="tr-first">
	              <th>时间</th>
	              <th>币种</th>
	              <th>类型</th>
	              <th>数量</th>
                <th>备注</th>
	            </tr>
	          </table>
	          <div class="table-container">
	            <table v-if="WaletList.length>0">
	              <tr v-for="item of WaletList" :key="item.finance_history_id">
	                <td>{{item.created_at}}</td>
	                <td>
	                  <!--<span><img :src="item.coin_image" alt=""></span>--> {{item.coin_name}}</td>
	                <td>{{item.finance_history_type | type}}</td>
	                <td>{{item.amount}}</td>
                  <!-- 备注字段 -->
                  <td>{{item.extra.remark}}</td>
	              </tr>
	            </table>
	            <div v-else class="moneybagNomassage">
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
	          <div class="pageposition" ref="pages">
	            <Page :total="WaletTotal" class="pageOrder" @on-change="WaletHandleChange" :page-size="pageSize" v-if="WaletList.length>0"></Page>
	          </div>
	        </div>
	      </div>
	    </div>
    </div>
  </div>
</template>
<script>
import api from "../../../api.js";
export default {
  name: "Record",
  data() {
    return {
      total: 0, // 提币
      WaletTotal: 0, // 钱包
      typeClass: 3, // 钱包记录 3
      pageSize: 10,
      ChargeList: [], // 充值记录
      CurrenList: [], // 提币记录
      WaletList: [], // 钱包记录
      coin_name: "", // 充值币名
      location: "", // 钱包充值地址
      loading: true
    };
  },
  filters: {
        type: function (value) {
            if (value == 11000) {
                return '跨账户转入'
            } else if (value == 11001) {
                return '充值'
            } else if (value == 11002) {
                return 'OTC资产转入'
            } else if (value == 11003) {
                return '币币资产转入'
            } else if (value == 11004) {
                return '提币拒绝'
            } else if (value == 11005) {
                return '提币撤回'
            } else if (value == 11006) {
                return '交易返佣转入'
            } else if (value == 11007) {
                return '邀请用户交易返佣转入'
            } else if (value == 11008) {
                return '返佣结算转入'
            } else if (value == 11009) {
                return '交易返佣转入'
            } else if (value == 11010) {
                return '其他平台转入'
            } else if (value == 21000) {
                return '跨账户转出'
            } else if (value == 21001) {
                return '提币'
            } else if (value == 21002) {
                return '转出到OTC资产'
            } else if (value == 21003) {
                return '转出到币币资产'
            } else if (value == 21004) {
                return '其他平台付款'
            } else if (value == 11011) {
                return '数字币充值'
            } else {
                return '数字币提现'
            }
        },
    state: function(value) {
      // 钱包
      if (value == 1) {
        return "待确定";
      } else if (value == 2) {
        return "已完成";
      }
    },
    stateCurrency: function(value) {
      // 提币
      if (value == 1) {
        return "审核中";
      } else if (value == 2) {
        return "转账中";
      } else if (value == 3) {
        return "转账成功";
      } else if (value == 4) {
        return "已撤销";
      } else if (value == 5) {
        return "已拒绝";
      }
    }
  },
  methods: {
    //   	addActiveClass(typeClass) {  // 点击li
    //     		this.typeClass = typeClass
    // //  		this.$store.commit('scType', typeClass)
    //     },
    //  充值记录
    rechargeInfo() {
      let params = {
        coin_id: this.$route.query.coin_id
      };
      api
        .rechargeInfo(params)
        .then(res => {
          //	        console.log(res)
          if (res.status_code == 200) {
            this.coin_name = res.data.coin_name;
            this.location = res.data.wallet_addr;
            this.rechargeNotify();
          }
          if (res.status_code == 7004) {

          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    rechargeNotify() {
      let params = {
        coin_name: this.coin_name,
        address: this.location
      };
      api.rechargeNotify(params).then(res => {
        if (res.status_code == 200) {
          if (res.data.length != 0) {
            this.isshow = true;
          } else {
            this.isshow = false;
          }
          this.ChargeList = res.data;
        }
      });
    },
    //  提币记录
    check(value) {
      if (value == "充值") {
        this.rechargeshow = true;
      } else if (value == "提币") {
        this.withdrawshow = true;
      } else if (value == "划转") {
        this.transfershow = true;
      }
    },
    CurrencyRecordList(page) {
      let params = {
        coin_id: this.$route.query.coin_id,
        limit: this.pageSize,
        page: page
      };
      api
        .withdrawRecord(params)
        .then(res => {
          if (res.status_code == 200) {
            this.CurrenList = res.data.list;
            this.total = res.data.page.count;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    CurrencyHandleChange(page) {
      // 提币点击分页
      this.CurrencyRecordList(page);
    },
    //  钱包记录
    WaletRecordList(page) {
      let params = {
        coin_id: this.$route.query.coin_id,
        limit: this.pageSize,
        page: page
      };
      api
        .record(params)
        .then(res => {
          if (res.status_code == 200) {
            this.loading = false;
            this.WaletList = res.data.list;
            this.WaletTotal = res.data.page.count;
          }
            // this.timer = setInterval(() => {
            //     this.loading = false;
            // }, 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    WaletHandleChange(page) {
      // 钱包点击分页
      this.WaletRecordList(page);
    }
  },
  mounted() {
    this.WaletRecordList(1);
    this.rechargeInfo(); // 充值
    this.CurrencyRecordList(1); // 提币
  },
  beforeDestroy() {
     clearInterval(this.timer);
     this.timer = null;
  }
};
</script>
<style scoped>
/* 新添加  */
.record_box .record-header {
  background: #1d2f6b;
  padding: 0 1rem;
  padding-left: 0.5rem;
}
.record_box .record-header a.go-back {
  float: right;
  color: #fff;
  font-size: 0.9rem;
}
.record_box {
  width: 100%;
  background: url(../../../../static/img/homeBg.png) no-repeat top center;
  background-size: 100% 100%;
}
.record {
  width: 50rem;
  /* background: #4e5e90; */
  padding: 1.5rem 3rem;
}
.record-wrap {
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 2.4rem 0 1.8rem;
  padding-top: 3.6rem;
}
.record_box .box {
  width: 100%;
  background: #4b5e94;
  box-shadow: 0 1px 0.6rem 0 #2e407b;
  border-radius: 0.1rem;
  margin: 1rem 0 0 0;
}
.record_box .record-header a {
    color: #f5b821;
    font-size: 0.9rem;
}
.record-header span {
  color: #f5b821;
  font-size: 1rem;
}
.record_box .container {
  padding: 0 1.25rem;
}
.record_box .box-list {
  color: #fff;
  line-height: 2.4rem;
}
.record_box .box-list li {
  float: left;
  padding: 0 1rem;
  cursor: pointer;
  font-size: 0.8rem;
}
.record_box .box-list li:hover {
  color: #f5b821;
}
.record_box .box-list .tab-li-active {
  color: #f5b821;
  cursor: default !important;
}
.pageposition {
  margin: 2.5rem 0 0 0;
}
.ivu-spin-fix {
    background: transparent;
}
.ivu-spin .ivu-spin-fix .ivu-spin-main {
    top: 30%;
}
.loading {
    position: relative;
    top:1.5rem;
    width:100%;
    height: 10rem;
    background: transparent;
}
</style>
