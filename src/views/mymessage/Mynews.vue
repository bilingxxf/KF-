<template>
  <div class="mynews">
    <div class="content">
      <div class="tab">
        <p>
          <span :class="{active:tab==index}" @click="toggle(index)" v-for="(navs,index) in nav">{{navs.title}}</span>
        </p>
      </div>
      <div class="container">
        <Table id='news' :columns="columns1" :data="data1" ref="selection" @on-selection-change="route" @on-select-all="allselect">
          hellow
        </Table>
        <div v-if="data1.length==0" class="newssky">
          <span class="icon-no_info"></span>
          <a href="javascript:;">{{ $t(`message.Mynews.NoMoreNews`) }}</a>
        </div>
        <div class="messagepage">
          <Page :total="page*10" @on-change="myreadpage"></Page>
        </div>
      </div>
      <div class="button" v-show="data1.length!=0">
        <Button id="ljbuttonone" @click="handleSelectAll()">
          <span ref="span" :class="{'icon-box':raw,'icon-box-gou':selected}"></span>
          {{ $t(`message.SelectAll`) }}
        </Button>
        <Button id="ljbuttontwo" @click="signread"><span class="icon-all-read" ></span>{{ $t(`message.MarkAsRead`) }}</Button>
        <Button id="ljbuttonthree" @click="deleteselect"><span class="icon-delete"></span>{{ $t(`message.Delete`) }}</Button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import api from '../../api.js'
  import Allmessage from './message/Allmessage.vue'
  import vm from './message/contenrt'
  export default {
    data() {
      return {
        status:true,
        //页数
        page:1,
        //导航数据
        nav: [
          {
            id: 1,
            title: this.$t('message.Mynews.AllMessage')
          },
          {
            id: 2,
            title: this.$t('message.Mynews.Unread')
          },
          {
            id: 3,
            title: this.$t('message.Mynews.Read')
          }
        ],
        //全选状态值
        //导航值
        tab: 0,
        //表头
        columns1: [
          {
            type: 'selection',
            align: 'center',
            width:55,
          },
          {
            title: this.$t("message.OTCOrder.Status"),
            render:(h,params)=>{
              return h('div',{
                'class':{
                  'icon-mail': params.row.has_read===1,
                  'icon-read-new':params.row.has_read===2
              }
              })
            },
            width:65
          },
          {
            title: this.$t("message.Mynews.SendFrom"),
            width:190,
            render: (h, params) => {
              return h('div', {
              }, this.$t("message.SystemNotifi"))
            },
          },
          {
            title: this.$t("message.Mynews.Content"),
            render: (h, params) => {
              return h(Allmessage, {
                props: {
                  row: params.row,
                  pull: params.row.pull,
                },
              })
            },
            width:622
          },
          {
            title: this.$t("message.BaseInfo.Date"),
            key: 'created_at',
            render:(h,params)=>{
              let _this = this;
              let dateTime= "";
              let date = new Date(params.row.created_at*1000);
              let Y = date.getFullYear();
              let M = date.getMonth()+1;
              let D = date.getDate();
              dateTime = Y+"-"+little(M)+"-"+little(D);
              function little(x){
                return x<10?"0"+x:""+x;
              }
              return h('span',{
                props:{

                }
              },dateTime)
            }
          }
        ],
        //表数据
        data1: [],
        //上传参数数组
        oneId:[],
        //未全选
        raw:true,
        //全选
        selected:false,
        newsId: []
      }
    },
    methods: {
      bubbling(){
        this.allselect();
      },
      //分页请求
      myreadpage(nowPage){
        this.raw = true;
        this.selected = false;
        this.oneId=[];
        if(this.tab===0){
          const params = {
            page:nowPage,
          };
          api.mymessagelist(params).then(res => {
            if (res.status_code == 200) {
              this.data1 = res.data.list;
              this.data1.map(item => {
                item.pull = false;
              });
            }
          }).catch(err => {
          })
        }
        const params = {
          page:nowPage,
          has_read:this.tab
        };
        api.mymessagelist(params).then(res => {
          if (res.status_code == 200) {
            this.data1 = res.data.list;
            this.data1.map(item => {
              item.pull = false;
            });
          }
        }).catch(err => {
        })
      },
      //tab选项卡
      toggle(index) {
        this.status = true;
        this.tab = index;
        this.raw = true;
        this.selected = false;
        if (index == 0) {
          this.pullnews();
        } else {
          const parmas = {
            has_read: index
          };
          api.mymessagelist(parmas).then(res => {
            if (res.status_code == 200) {
              this.data1 = res.data.list;
              this.page = res.data.total_page
            }
          }).catch(err => {
          });
        }
      },
      //默认列表请求
      pullnews() {
        api.mymessagelist().then(res => {
          if (res.status_code == 200) {
            this.data1 = res.data.list;
            this.data1.map(item => {
              item.pull = false;
            });
          }
        }).catch(err => {
        })
      },
      //全选/不全选
      handleSelectAll() {
        if(this.status == false){
          this.$refs.selection.selectAll(false);
          this.status = true;
        }else if(this.status == true){
          this.$refs.selection.selectAll(true);
          this.status = false;
        }
        // this.$refs.selection.selectAll(status);
        // if(this.status == true){
        //   this.raw = false;
        //   console.log(1);
        //   this.selected = true;
        // }else{
        //   this.raw = true;
        //   this.selected = false;
        //   this.oneId = [];
        // }
        // this.status =! this.status;
      },
      //单击取Id值
      route(a){
        this.oneId= [];
       a.map((itme,index)=>{
          this.oneId.push(itme.user_message_id);
       });
       if(a.length===0){
         this.raw = true;
         this.selected = false;
         this.status = true;
       } else if(a.length!=this.data1.length){
          this.raw = true;
          this.selected = false;
       } else if(a.length=== this.data1.length){
         this.raw = false;
         this.selected = true;
         this.status = false;
       }
      },
      //数组去重
       dedupe(array){
         this.newsId =  Array.from(new Set(array));
      },
      //全选取Id值
      allselect(allId) {
        allId.map((item,index)=>{
          this.oneId.push(item.user_message_id)
        });
        if(this.status==true){
          this.raw = false;
          this.selected = true;
        }
      },
      //删除
      deleteselect(){
        this.dedupe(this.oneId);
        const params = {
          ids:this.newsId
        };
        if(this.oneId.length===0){
          this.$Message.info(this.$t('message.PleasSelectItem'));
          return;
        }
        api.batchesdelete(params).then(res=>{
          if(res.status_code==200){
            this.raw = true;
            this.selected = false;
            this.status = true;
            this.$Message.info(this.$t('message.DeleteSucceed'));
            if(this.tab===0){
              this.pullnews()
            }else{
              const parmas = {
                has_read: this.tab
              };
              api.mymessagelist(parmas).then(res => {
                if (res.status_code == 200) {
                  this.data1 = res.data.list;
                  this.data1.map(item => {
                    item.pull = false;
                  });
                }
              }).catch(err => {
                console.log(err.status_code)
              });
            }
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //标记已读
      signread(){
        this.dedupe(this.oneId);
        const params = {
          ids:this.newsId
        };
        if(this.oneId.length===0) {
          this.$Message.info(this.$t('message.PleasSelectMark'));
          return;
        }
        api.batchesread(params).then(res=>{
          if(res.status_code==200){
            this.$Message.info(this.$t('message.Bsucceed'));
            if(this.tab===0){
              this.pullnews()
            }else{
              const parmas = {
                has_read: this.tab
              };
              api.mymessagelist(parmas).then(res => {
                if (res.status_code == 200) {
                  this.data1 = res.data.list;
                  this.data1.map(item => {
                    item.pull = false;
                  });
                }
              }).catch(err => {
                console.log(err.status_code)
              });
            }
            this.oneId =[];
            this.raw = true;
            this.selected = false;
            this.status = true;
            this.data1.map((item, index) => {
              if (item.user_message_id == this.oneId){
                this.$set(this.data1, index, {
                  ...this.data1[index],
                });
                return false;
              }
            })
          }
        }).catch(err=>{
          console.log(err);
        })
      },
    },
    components: {
      Allmessage,
    },
    //实例创建完成就请求相应的信息
    created() {
      //全部消息
      this.pullnews();
    },
    //阅读状态更新
    updated() {
      vm.$on('open', (obj) => {
        this.data1.map((item, index) => {
          if (item.user_message_id === obj.id) {
            this.$set(this.data1, index, {
              ...this.data1[index],
              pull: obj.pull,
              has_read:obj.has_read
            });
            return false;
          }
        });
      });
    },
    watch:{
      'status':function(){
        if(status){

        }else{
          this.oneId == [];
        }
      }
    }
  }
</script>
