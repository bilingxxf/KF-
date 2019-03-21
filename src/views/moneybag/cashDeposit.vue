<template>
  <div class="cashdeposit">
    <div class="asset-overview-wrap">
      <div class="cashdeposit-cn">
        <h3 class="cashdeposit-h3">保证金管理</h3>
        <ul class="cashdeposit-top">
          <li class="cashdeposit-c_1">申请时间</li>
          <li class="cashdeposit-c_2">类型</li>
          <li class="cashdeposit-c_3">数量</li>
          <li class="cashdeposit-c_4">状态</li>
          <li class="cashdeposit-c_5">操作</li>
        </ul>
        <!-- 暂无数据 -->
        <div v-if=" isOk ">
          <div style="text-align: center;margin-top: 5rem">
            <p class="icon-no_info" style="font-size: 10rem;"></p>
            <p style="font-size: 1rem; color:#fff" >暂无数据...</p>
          </div>
        </div>
        <ul v-else class="cashdeposit-bot" v-for="item in data">
          <li class="cashdeposit-c_1">{{ item.created_at | time}}</li>
          <!-- 1:OTC交易冻结，2：C2C交易冻结 -->
          <li class="cashdeposit-c_2" v-if="item.finance_freeze_type == 1">OTC交易冻结</li>
          <li class="cashdeposit-c_2" v-if="item.finance_freeze_type == 2">C2C交易冻结</li>
          <li class="cashdeposit-c_3">{{ item.finance_freeze_amount_str }} {{item.coin_name}}</li>
          <!--  1 冻结 , 2 取消冻结, 3 审核 -->
          <li class="cashdeposit-c_4" v-if="item.finance_freeze_status == 1">冻结</li>
          <li class="cashdeposit-c_4" v-if="item.finance_freeze_status == 2">取消冻结</li>
          <li class="cashdeposit-c_4" v-if="item.finance_freeze_status == 3">审核中</li>
          <!-- 操作： 1 申请解冻， 2、3按钮为空-->
          <li class="cashdeposit-c_5" v-if="item.finance_freeze_status == 1">
            <a href="javascript:;" @click="isonClick">申请解冻</a>
          </li>
          <li class="cashdeposit-c_5" v-else></li>
        </ul>
      </div>
      <!-- 申请解冻弹窗 -->
      <div class="cashdeposit_g" v-if="isShow">
          <div class="cashdeposit_g_n">
            <span class="icon-wrong" @click="isClose"></span>
            <h3>申请解冻</h3>
            <p>是否确认申请解冻保证金</p> 
            <p>注：如果申请成功，对应广告位和广告主权限将会被取消</p>
            <div>
              <a href="javascript:;" @click="cancel">取消</a>
              <a href="javascript:;" @click="confirm">确定</a>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api.js'
export default {
  data(){
    return{
        data:[],
        isShow: false, // 弹窗
        isOk: true , // 暂无数据
    }
  },
  methods: {
    // 获取BTC保证金
    getCash(){
      api.unfreeList().then(res=>{
        
        if(res.status_code == 200){
          this.isOk = false
          this.data = res.data.list
          if( this.data.length == 0 ){
            this.isOk = true
          }
            // console.log(this.data);
        }else if(res.status_code == 8025){
          this.isOk = true
          // this.$Message.error("保证金已提取,请重新申请广告主");
        }
      })
    },
    // 申请解冻弹窗打开
    isonClick(){
      this.isShow = true
    },
    // 申请解冻弹窗关闭
    isClose(){
      this.isShow = false
    },
    cancel(){
      this.isShow = false
    },
    // 申请解冻确定
    confirm(){
      api.apply_deposit().then(res => {  // 申请提取保证金
        if(res.status_code == 200){ // 申请解冻成功
          this.isShow = false
          this.getCash()
          this.$Message.error("解冻申请成功");
        }else if(res.status_code == 8037){
             this.isShow = false
            this.$Message.error("商户审核通过后，30天内禁止提币!");
        }
      })
    }
  },
  created(){
    // 获取BTC保证金
    this.getCash()
  },
  filters: {
    time(val){
      var date = new Date(val * 1000)
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
        return Y+M+D+h+m+s;
    }
  }
}

</script>
<style>

</style>
