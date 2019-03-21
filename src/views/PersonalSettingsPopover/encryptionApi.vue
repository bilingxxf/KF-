<template>
  <div id="encryptionApi">
  	<span @click="showAll()" class="showAllClick">{{secret}}</span>
  </div>
</template>

<script>
export default {
  name: 'encryptionApi',
  data() {
  	return{
  		secret:""
  	}
  },
  props:{
  	secretApi:{
		type:String,
		default:''
	}
  },
  mounted(){
  	this.jiami();
  },
  methods:{
  	jiami(){
  		this.secret =  `${this.secretApi.substring(0,7)}****${this.secretApi.substring(25)}`;
  	},
  	showAll(){
  		this.secret = this.secretApi;
  	}
  }
 
}
</script>
