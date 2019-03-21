<template>
  <div>
    <Row class="expand-row">
      <Col span="8">

      </Col>
      <Col span="8">
      </Col>
      <Col span="8">
        <p @click='add()' class="expand-value" v-if="!pull" :class="{'content':pull}">{{ row.message_title}}</p>
        <p @click='add()' class="expand-value" v-if="pull" :class="{'content':pull}">{{ row.message_body}}</p>
      </Col>
    </Row>
  </div>
</template>
<script>
  import vm from './contenrt'
  import api from '../../../api'
  export default {
    props: {
      row: Object,
      pull:{
        type:Boolean,
        default:false
      },
      mystatus:Boolean
    },
    data(){
      return{

      }
    },
    computed:{
      status(){
        if(this.pull){
          return
        }else{
          return
        }
      }
    },
    methods:{
      add(){
       const params ={
         id : this.row.user_message_id
       };
       if(this.pull==false){
         api.mymessagedetails(params).then(res=>{
           vm.$emit('open',{
             id:this.row.user_message_id,
             pull : !this.pull,
             has_read:2
           });
         }).catch(err=>{

         })
       }else{
         vm.$emit('open',{
           id:this.row.user_message_id,
           pull : !this.pull,
           has_read:2,
           mystatus:true
         });
       }
      }
    }
  };
</script>
<style scoped>
  .content{
    height: 5.05rem;
  }
</style>
