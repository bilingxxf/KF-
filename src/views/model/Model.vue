 <template>
    <div class="mask">
        <div class="mask_bg" @click="bodyHide"></div>
        <div class="slide-fade">
          <div class="cancelOrder"><span class="icon-wrong" @click="hide"></span></div>
            <div class="model">
              <div class="model-header">
                  <slot name="modelSlotHeader"></slot>
              </div>
              <div class="model-content">
                <slot name="modelSlotContent"></slot>
              </div>
              <div class="model_footer">
                <slot name="modelSlotFooter"></slot>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
   export default{
     data(){
       return{

       }
     },
     methods:{
       hide(){
         let flag = false;
         this.$emit('hide',flag)
       },
       bodyHide() {
         this.$emit('bodyHide', false)
       }
     }
   }
 </script>
 <style scoped>
    .mask_bg{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        outline: 0;
        background: rgba(0, 0, 0, 0.5);
    }
    .slide-fade{
        position:fixed;
        left:50%;
        top:50%;
        width:auto;
        height:auto;
        z-index:1001;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%, -50%);
        border-radius: 0.25rem;
    }
    .cancelOrder{
       position: absolute;
       top: 1rem;
       right: 1rem;
       font-size: 1rem;
       cursor: pointer;
    }
    .model {
       /*padding: 2rem;*/
       /*background:#000f22;*/
       background: #fff;
       border-radius: 0.2rem;
    }

	.model-header {
		padding: 1rem 2rem 0 2rem;
	}
    .model-content {
       /*margin-top: 1rem;*/
       padding: 0 2rem;
    }


    .model_footer {
       margin-top: 2.25rem;
       /*padding: 1.5rem 2rem;*/
    }
 </style>


