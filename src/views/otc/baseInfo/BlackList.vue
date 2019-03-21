<template>
  <div class="blacklist" v-if="blacklist">
    <div class="blacklistMain">
      <p class="title">屏蔽黑名单</p>
      <p class="right-title" @click="addblackName">
        <span class="icon-blacklist"></span>
        <span class="span-word">添加黑名单</span>
      </p>
      <p class="threeMain-ts">被屏蔽的用户将无法与您进行交易</p>
      <div style="clear: both;"></div>

      <ul class="blacklistMain-ul">
        <!--屏蔽-->
        <li class="blacklistMain-ul-list" v-for="bList in bLists" :key="bList.id" v-if="showList">
          <span>{{bList.user_name}}</span>
          <span>{{bList.created_at}}</span>
          <span @click="DelBlackName(bList.otc_blocklist_id)">删除</span>
        </li>
        <li class="blacklistMain-ul-list-noMore" v-if="ListHaveNo">暂无更多</li>
      </ul>
    </div>

    <!--添加黑名单弹框-->
    <div class="blackName-temp" v-if="AddBlackTemp">
      <div class="blackNameMain">
        <span class="icon-wrong" @click="closeBtn"></span>
        <p>添加黑名单</p>
        <p>添加黑名单</p>
        <Form ref="blackNameAdd" :model="blackNameAdd" :rules="ruleInline">
          <FormItem prop="blackNames" class='number_num'>
            <input type="text" class="blackName-input" placeholder="" v-model="blackNameAdd.blackNames">
          </FormItem>
        </Form>
        <span class="sure_btn" @click="sureBtn">确认</span>
        <span class="fou_btn" @click="closeBtn">取消</span>
      </div>
    </div>

    <!--删除黑名单弹框-->
    <div class="blackName-temp" v-if="DelBlackTemp">
      <div class="blackNameMainDel">
        <span class="icon-wrong" @click="cancelBtn"></span>
        <p>删除提醒</p>
        <p>删除此条黑名单记录</p>
        <span class="sure_btn" @click="Confirm">确认</span>
        <span class="fou_btn" @click="cancelBtn">取消</span>
      </div>
    </div>
    <!--分页-->
    <div class="blacklist-page">
      <Page :total="total" class="pageOrder" @on-change="handleChange" :current="currentPage" :page-size="pageSize" v-if="total>10"></Page>
    </div>
  </div>
</template>

<script>
  import api from '../../../api'
    export default {
        name: "blackList",
      data(){
        const validateBack = function (rule,value,callback) {
          if (!value){
            return callback(new Error('请输入要加入黑名单的昵称'));
          } else{
            callback();
          }
        };
          return {
            blacklist:false,
            AddBlackTemp: false,
            DelBlackTemp:false,
            showList:false,
            ListHaveNo:false,
            total:0,
            pageSize:10,
            bLists: [],
            delId:'',
            currentPage:1,
            blackNameAdd: {
              blackNames: '',
            },
            ruleInline: {
              blackNames: [
                {validator: validateBack, trigger: 'blur'}
              ]
            }
          }
      },

      methods:{
        addblackName(){
          this.AddBlackTemp = true;
        },
        closeBtn(){
          this.AddBlackTemp = false;
          this.$refs['blackNameAdd'].resetFields();
        },
        cancelBtn(){
          this.DelBlackTemp = false;
        },

        sureBtn(){      //添加黑名单
          this.$refs['blackNameAdd'].validate((valid)=>{
            if (valid){
              let p = {
                user_name:this.blackNameAdd.blackNames,
              };
              api.add_otc_block(p).then(res=>{
                if (res.status_code == 200){
                  this.AddBlackTemp = false;
                  this.blackList(1);
                  this.$refs['blackNameAdd'].resetFields();
                }

              })
            }
          })
        },


        blackList(page){                //黑名单列表
          api.blackList({
            page:page,
            limit:this.pageSize,
          }).then(res=>{
            if (res.status_code == 200){
              this.blacklist = true;
              this.bLists = res.data.list;
              if (this.bLists != '') {
                this.showList = true;
                this.ListHaveNo = false;
              }else{
                this.showList = false;
                this.ListHaveNo = true;
              }
              this.total = res.data.page.count;
              this.currentPage = parseInt(res.data.page.current_page)
            }
            else if (res.status_code == 5009){       //获取信息失败
              this.blacklist = true;
            }
            else {
              this.blacklist = false;
            }


          }).catch(err=>{

          })
        },

        handleChange(page){       //分页
          this.blackList(page);
        },


        DelBlackName(data){       //  删除黑名单
          this.DelBlackTemp = true;
          this.delId = data;
        },
        Confirm(){                //  删除黑名单确定按钮
          api.delete_block({
            id:this.delId
          }).then(res=>{
            this.blackList(1);
            this.DelBlackTemp = false;
          }).catch(error=>{
            this.$Message.info('删除失败！')
          })
        },

      },
      mounted(){
          this.blackList(1)
      }
    }
</script>

<style scoped lang="scss">

</style>
