<template>
 
  <div class="adIntroduction" v-if="adIntroduction">
    <div class="adIntroductionMain">
      <p class="title">默认回复语</p>
      <p class="right-title" @click="editor">
        <span class="icon-all-read"></span>
        <span class="span-word">编辑</span>
      </p>
      <div style="clear: both;"></div>
      <div class="adContentMain" v-if="show_respond">{{adMain}}</div>
      <div class="adContentMain_empty" v-if="haveNo_respond">设置的简介内容...</div>
    </div>

    <div class="blackName-temp" v-show="show">
      <div class="rebackMain">
        <span class="icon-wrong" @click="closeBtn"></span>
        <p>编辑回复语</p>
        <p>回复语</p>
        <textarea type="text" v-model="Respond_word" id="textBox" placeholder="请输入回复语内容"></textarea>
        <span class="sure_btn" @click="sureBtn">确认</span>
        <span class="fou_btn" @click="closeBtn">取消</span>
      </div>
    </div>  
  </div>
  
</template>

<script>
  import api from '../../../api'
    export default {
        name: "AdIntroduct",

      data(){
          return{
            adIntroduction:false,
            show:false,
            show_respond:false,
            haveNo_respond:false,
            adMain:'',
            Respond_word:'',
          }
      },
      methods:{
        editor(){
          this.show = true;
          this.Respond_word = this.adMain;
        },
        closeBtn(){
          this.show = false;
        },
        get_greetings(){          //获取回复语

          api.get_greetings().then(res=>{
            if (res.status_code == 200){
              this.adIntroduction = true;
              if (res.data != ''){
                this.show_respond = true;
                this.haveNo_respond = false;
                this.adMain = res.data;
              }else {
                this.show_respond = false;
                this.haveNo_respond = true;
              }
            }else if (res.status_code == 5009){
              this.adIntroduction = true;
            } else {
              this.adIntroduction = false;
            }

          }).catch(error=>{

          })
        },
        sureBtn(){      //编辑问候语

          if (this.Respond_word =='' || /^\s+$/g.test(this.Respond_word)){
            this.$Message.info("回复语不能为空！");
            return false;
          }else{

            let p = {
              greetings:this.Respond_word,
            }
            api.edit_greetings(p).then(res=>{
              if (res.status_code == 200){
                this.get_greetings()
              }else if (res.status_code == 5008){

              }

            }).catch(error=>{

            });
          }

          this.show = false;
        },
      },
      mounted(){
          this.get_greetings();
      }
    }
</script>

<style scoped lang="scss">

</style>
