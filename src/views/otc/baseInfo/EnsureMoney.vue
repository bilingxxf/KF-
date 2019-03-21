<template>
    <div class="baseInfo-second" v-if="baseInfoSecond">
        <div class="baseInfo-secondMain">
            <p class="title">保证金</p>
            <span class="applyCurrency" @click="applyBtn">申请解冻</span>
            <ul class="baseInfo-ul">
                <li class="baseInfo-ul-list">
                    <div class="baseInfo-ul-listTitle">{{coin_name}}</div>
                    <div class="baseInfo-ul-listContent">{{deposit_num}}</div>
                    <div class="baseInfo-ul-listContent">{{apply_currency}}</div>
                </li>
            </ul>
        </div>

        <div class="tempModel-noReal" v-if="apply_temp">
            <div class="tempModel-undo-main">
                <p>申请解冻</p>
                <span class="icon-wrong" @click="apply_closeBtn"></span>
                <div style="clear: both;"></div>
                <p>是否确认申请解冻保证金</p>
                <p style="font-size: 0.7rem;margin-left: 2rem;margin-top: 1rem">注：如果申请成功，对应广告位和广告主权限将会被取消</p>
                <div style="clear:both;"></div>
                <span class="sure_btn" @click="applyCur">确定</span>
                <span class="fou_btn" @click="apply_closeBtn">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../../api'
export default {
    name: "ensureMoney",
    data() {
        return {
            baseInfoSecond: false,
            coin_name: '',
            deposit_num: '',
            apply_currency: '',
            apply_temp: false,
            finance_freeze_status: '',
        }
    },
    methods: {
        get_deposit() {
            api.get_deposit().then(res => {
                if (res.status_code == 200) {
                    this.baseInfoSecond = true;
                    this.deposit_num = res.data.finance_freeze_amount_str;
                    this.coin_name = res.data.coin_name;
                    this.finance_freeze_status = res.data.finance_freeze_status
                    if (this.finance_freeze_status == 1) {
                        this.apply_currency = '保证金已冻结';
                    } else if (this.finance_freeze_status == 2) {
                        this.apply_currency = '已提币';
                    } else if (this.finance_freeze_status == 3) {
                        this.apply_currency = '保证金解冻申请中';
                    }
                    // this.$Message.success('申请解冻成功')
                } else if (res.status_code == 5009) {
                    this.baseInfoSecond = true;
                } else {
                    this.baseInfoSecond = false;
                }
            }).catch(error => {

            })
        },

        // 申请提取保证金
        apply_deposit() {
            api.apply_deposit().then(res => {
                if (res.status_code == 200) {
                    this.get_deposit();
                }
            }).catch(error => {

            })
        },

        //弹出
        applyBtn() {
            if (this.finance_freeze_status == 1) {
                this.apply_temp = true;
            }
        },

        //确定
        applyCur() {
            this.apply_deposit();
            this.apply_temp = false;
        },
        //关闭按钮
        apply_closeBtn() {
            this.apply_temp = false;
        }

    },
    mounted() {
        this.get_deposit();
    }
}
</script>

<style scoped lang="scss">
</style>
