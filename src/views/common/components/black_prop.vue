<template>
    <div class="moneybag_transfer" v-if="isShow">
        <div class="box transfer-hei withdrawTip">
            <span class="icon-wrong close" @click="close()"></span>
            <div class="p">
                <p>{{massage}}</p>
            </div>
            <button type="button" class="transfer" @click="close">确定</button>
            <button
                class="cancle"
                @click="close()"
                type="button"
                style="color: #ccc;"
            >取消</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            massage: '',
            isShow: false,
        }
    },
    methods: {
        close() {
            this.isShow = false
        }

    }
};
</script>

