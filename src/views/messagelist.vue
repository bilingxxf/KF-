<template>
  <div>
      <Content>
        <div style="width: 100%;text-align: center">
          <Select
            filterable
            remote
            @on-change ="change"
            style="width: 15rem;margin: 15rem 0" v-model="formSelect">
            <Option v-for="(option, index) in options1" :value="option.country_idd" :key="index">
             {{option.country_name}}{{ option.country_idd}}
            </Option>
          </Select>
        </div>

      </Content>
  </div>
</template>
<script type="text/javascript">
  import axios from 'axios'
  import config from '../../static/config'
  import configOnline from '../../static/configOnline'
export default{
	data(){
    return {
      model: '',
      formSelect:'',
      loading1: false,
      form:{
        value:''
      },
      options1: [

      ],
      items:[

      ],

    }
  },
  computed: {

  },
  watch:{

  },
  methods:{
    change(value){

      this.formSelect = value;

    },

    national(){
      let instance = axios.create();
      instance.defaults.timeout = 10000;
      const domain = window.location.origin;
      if (domain.indexOf('localhost') == -1) {
        instance.defaults.baseURL = configOnline.phone_url;
      }else {
        instance.defaults.baseURL = config.phone_url;
      }
      instance.get('common/get_country').then(res=>{
        // this.list = res.data.list;
        // console.log(res)
        this.options1 = res.data.data.list;
      })
      }
  },
  mounted(){
	  this.national();
    // let set = new Set();
    // let a = '1';
    // let b = '1';
    // set.add(a);
    // set.add(b);
    // set.add({});
    // console.log(set.size)
    // set.add({});
    // console.log(set.size)
    // set.add(1).add(2).add(2);
    // console.log(set.size)
    // const items = new Set([1, 2, 3, 4, 5]);
    // const array = Array.from(items);
    // console.log(array)
    // const array = [1,1,1,2,3,4,5,6,6]
    // const list = Array.from(new Set(array));
    // console.log(list)
    // let set = new Set(['red','green','blue']);
    // let arr = [...set];
    // console.log(arr)
    // set.forEach((value,key)=>{
    //   console.log(value + 'and' + key)
    // })
    // for(let item of set.keys()){
    //   console.log(item)
    // }
    // for(let item of set.values()){
    //   console.log(item)
    // }
    // for(let item of set.entries()){
    //   console.log(item)
    // }
    // let arr = [1,2,4,3,3,2,1,5];
    // let uniq = [...new Set(arr)];
    // console.log(uniq)
    // let set = new Set([1,2,3,4,5]);
    // set = new Set([...set].map(x => x * 2));
    // console.log(set)
    let set = new Set([1,2,3,4,5]);
    set = new Set([...set].filter(x => (x % 2) == 0));

  }
}
</script>
