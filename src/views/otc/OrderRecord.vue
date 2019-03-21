<template>
    <div>
        <Content>
            <div class="order-record">
                <div class="order-record-wrap">
                    <div class="head">
                        <p class="head-title">{{ $t(`message.OrderRecord.OrdersManage`) }}</p>
                        <p class="refresh" @click="refresh">
                            <img src="@/../static/img/refresh.svg" class="icon-refresh" :class="{'changeUp':check}">
                            <span>{{ $t(`message.OrderRecord.fresh`) }}</span>
                        </p>
                    </div>
                    <div class="content">
                        <div class="left">
                            <div class="left_title">
                                <p>
                  <span v-for="(work,index) in workList" @click="work_operate(index)"
                        :class="{'working':index == currentWork}">{{work.way}}</span>
                                </p>
                                <router-link :to="{path:'/submit-order'}" tag="p"><span class="icon-add_order"></span><span>{{ $t(`message.OrderRecord.CreateOrder`) }}</span>
                                </router-link>
                            </div>
                            <ul class="left-content" v-if="hasInfo">
                                <li v-for="(ticket,index) in ticketItem" :key="index" @click="cut(index,ticket.ticket_id)"
                                    :class="{'currItem':index == currentIndex}">
                                    <p class="title">{{ticket.ticket_title}}</p>
                                    <div class="date">
                                        <p v-if="currentWork == 0">{{ $t(`message.OrderRecord.Proceeding`) }}</p>
                                        <p v-if="currentWork == 1">{{ $t(`message.OrderRecord.Achieve`) }}</p>
                                        <p>{{ticket.created_at | time}}</p>
                                    </div>
                                </li>
                            </ul>
                            <ul class="left-content noInfo" v-if="!hasInfo">
                                <span class="icon-no_info"></span>
                                <p class="no_ticket">{{ $t(`message.OrderRecord.NoOrder`) }}
                                    <router-link to="/submit-order">{{ $t(`message.OrderRecord.ToAdd`) }}</router-link>
                                </p>
                            </ul>
                            <Page :total="total" class="pageOrder" @on-change="handleChange" :page-size="14" :current="current"
                                  v-if="hasInfo"></Page>
                        </div>
                        <div class="right">
                            <div class="right_title">
                                <p>{{ $t(`message.OrderRecord.OrderContent`) }}</p>
                            </div>
                            <div class="right-top" :model="ticketForm" v-if="hasInfo">
                                <div class="right-top-wrap">
                                    <div class="right-top-left">
                                        <p class="bottom-height">{{ $t(`message.OrderRecord.OrderType`) }}：<span>{{ticketForm.ticket_type_name}}</span></p>
                                        <p class="bottom-height">{{ $t(`message.OrderRecord.OrderBrief`) }}：<span>{{ticketForm.ticket_title}}</span></p>
                                        <div class="file">
                                            <p>{{ $t(`message.OrderRecord.Document`) }}：</p>
                                            <div class="file_name">
                                                <p v-for="file in ticketForm.ticket_file">
                                                    <!--<a :href="'https://codeload.github.com/douban/douban-client/legacy.zip/master'"-->
                                                    <!--:download="file.ticket_file_title">-->
                                                    <!--<span class="icon-paper_clip"></span>-->
                                                    <!--<span>{{file.ticket_file_title}}</span>-->
                                                    <!--<span class="icon-updown"></span>-->
                                                    <!--</a>-->
                                                    <a href="javascript:;" @click="download(file.ticket_file_path)">
                                                        <span class="icon-paper_clip"></span>
                                                        <span>{{file.ticket_file_title}}</span>
                                                        <span class="icon-updown"></span>
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="close_btn" v-if="currentWork == 0">
                                        <Button type="primary" @click="close_ticket(ticketForm.ticket_id)">{{ $t(`message.OrderRecord.close`) }}</Button>
                                    </div>
                                </div>
                                <div class="description-content">
                                    <p>{{ $t(`message.OrderRecord.Descrip`) }}：</p>
                                    <div class="description">
                                        {{ticketForm.extra}}
                                    </div>
                                </div>
                            </div>
                            <div class="right-top noInfo" v-if="!hasInfo">
                                <span class="icon-no_info"></span>
                                <p class="no_ticket">{{ $t(`message.OrderRecord.NoOrder`) }}</p>
                            </div>
                            <div class="right-bottom">
                                <div class="right-bottom-content" id="content">
                                    <div id="container">
                                        <Row v-if="load">
                                            <Col class="demo-spin-col">
                                                <Spin fix>
                                                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                                </Spin>
                                            </Col>
                                        </Row>

                                        <div class="info" v-for="chat in chatList">
                                            <p>
                                                <span class="name" v-if="chat.is_ticket_server_body == 0">{{chat.user_name}}</span>
                                                <span class="name" v-else>{{chat.ticket_server_name}}</span>
                                                <span class="date">{{chat.created_at | timeDate}}</span></p>
                                            <p class="info-content">
                                                {{chat.ticket_body}}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div class="right-bottom-reply">
                                    <Input :placeholder="this.$t(`message.OrderRecord.Reply`)" style="width: 15rem" v-model="content"></Input>
                                    <Button type="ghost" @click="reply()" :loading="replayFlag">{{ $t(`message.OrderRecord.Reply`) }}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    </div>
</template>
<script>
    import api from '../../api'
    import $ from 'jquery'
    import resOnline from './../../../static/configOnline'
    import resUrl from './../../../static/config'
    export default {
        data() {
            return {
                ticketItem: [],   //工单列表
                hasInfo: true,        //是否有工单
                workList: [
                    {way: this.$t('message.OrderRecord.Proceed')},
                    {way: this.$t('message.OrderRecord.Completed')}
                ],
                chatList: [],     //聊天列表
                content: '',     //回复内容
                ticket_id: '',      //工单id
                ticketForm: {
                    ticket_file: [], //文件列表
                },
                currentIndex: 0,           //当前工单
                currentPage: 1,            //当前页
                currentWork: 0,          //工单状态
                current: 1,
                total: 0,
                check: false,
                page: 1,
                total_page: 1,

                pageTotal: 0,  //总条数
                pageSize: 10,   //每页最大数
                load:false,
                replayFlag:false,
                max:0,
                num:1
            }
        },
        methods: {
            isImg(name) {
                if (name.indexOf('.png') > -1 || name.indexOf('.jpg') > -1 || name.indexOf('.jpeg') > -1 || name.indexOf('.gif') > -1) {
                    return true
                } else {
                    return false
                }
            },
            download(url) {            //下载文件
                const domain = window.location.origin;
                let urlFile;
                if (domain.indexOf('localhost') == -1) {
                    urlFile = resOnline.fileUrl
                }else{
                    urlFile = resUrl.fileUrl
                }
                if(this.isImg(url.toLowerCase())){
                    let $eleForm = $("<form method='get' target='_bland'></form>");
                    $eleForm.attr("action", urlFile + url);
                    $(document.body).append($eleForm);
                    $eleForm.submit();
                }else{
                    let $eleForm = $("<form method='get'></form>");
                    // $eleForm.attr("action", 'https://codeload.github.com/douban/douban-client/legacy.zip/master');
                    $eleForm.attr("action", urlFile + url);
                    $(document.body).append($eleForm);
                    $eleForm.submit();
                }
            },
            work_operate(way) {      //工单切换
                this.hasInfo = false;
                this.currentWork = way;
                this.current = 1;
                this.currentIndex = 0;
                this.total = 0;
                this.get_ticket_list(1, this.currentWork);
            },
            cut(index, ticket_id) {        //工单列表切换
                this.chatList = [];
                this.currentIndex = index;
                this.ticket_id = ticket_id;
                let data = {
                    id: ticket_id
                };
                api.getTicketId(data).then(res => {        //获取工单内容
                    if(res.status_code == 200) {
                        this.ticketForm = res.data;
                        const vm = this;
                        setTimeout(() => {
                            $('#content').scrollTop($('#container').height() - $('#content').height() + '20');
                            // alert($('#content').scrollTop())
                            this.max = Math.ceil(vm.pageTotal / vm.pageSize);
                            this.num = 1;
                            this.page = 1;

                            $('#content').scroll(function () {
                                setTimeout(() => {
                                    if ($('#content').scrollTop() == 0 && vm.num < vm.max && vm.pageTotal > 0 && vm.page < vm.max) {
                                        vm.load = true;
                                        vm.page++;
                                        let params = {
                                            ticket_id: vm.ticket_id,
                                            start: vm.page,
                                            limit: 10,
                                        };
                                        let str = '';
                                        api.getTicketDetailList(params).then(res => {        //获取工单聊天内容
                                            if (res.status_code == 200) {

                                                // vm.chatList = vm.chatList.concat(res.data.list);
                                                vm.chatList = res.data.list.concat(vm.chatList);
                                                vm.$forceUpdate();
                                                vm.num++;
                                                $('#content').scrollTop($('#container').height() / vm.num);
                                            }
                                        })
                                    } else {
                                        vm.load = false;
                                    }
                                }, 1000)
                            })
                        }, 500)
                    }
                });
                this.getTicketDetailList(1, ticket_id);
            },
            getTicketDetailList(page, ticket_id) {             //获取聊天内容
                this.chatList = [];
                let params = {
                    ticket_id: ticket_id,
                    start: page,
                    limit: 10,
                };
                api.getTicketDetailList(params).then(res => {        //获取工单聊天内容
                    if (res.status_code == 200) {
                        this.chatList = res.data.list;
                        this.pageTotal = res.data.page.count;
                        this.check = false;
                        this.$forceUpdate();
                        $('#content').scrollTop($('#container').height() - $('#content').height())
                    }
                })
            },
            close_ticket(ticket_id) {         //关闭工单
                let params = {
                    ticket_id: ticket_id,
                    ticket_status: 2
                };
                api.updateTicket(params).then(res => {
                    if (res.status_code == 200) {
                        this.$Message.success(this.$t('message.OrderRecord.CloseSucceed'));
                        this.currentIndex = 0;
                        this.get_ticket_list(this.currentPage, this.currentWork);
                    } else {
                        this.$Message.error(this.$t('message.OrderRecord.CloseFailed'));
                    }
                })
            },
            refresh() {      //刷新
                this.check = !this.check;
                // this.currentIndex = 0;
                this.cut(this.currentIndex, this.ticket_id)
                // this.get_ticket_list(1, this.currentWork);
            },
            reply() {                              //回复
                let content = this.content.replace(/(^\s*)|(\s*$)/g, '');
                if (content) {
                    this.replayFlag = true;
                    let params = {
                        ticket_id: this.ticket_id,
                        ticket_body: this.content,
                    };
                    api.replyList(params).then(res => {
                        if (res.status_code == 200) {
                            this.replayFlag = false;
                            this.content = '';
                            // this.getTicketDetailList(1, this.ticket_id);
                            this.cut(this.currentIndex, this.ticket_id)
                        }
                    })
                } else {
                    this.$Message.error(this.$t('message.OrderRecord.EnterReply'));
                }
            },
            get_ticket_list(start, way) {      //获取工单
                let status = 1;
                if (way == 0) {
                    status = 1;
                } else if (way == 1) {
                    status = 2;
                }
                let params = {
                    ticket_status: status,
                    limit: 14,
                    start: start            //当前页
                };
                api.getTicketList(params).then(res => {
                    if (res.status_code == 200 && res.data.list.length > 0) {
                        this.hasInfo = true;
                        this.ticketItem = res.data.list;
                        this.total = res.data.page.count;
                        this.currentPage = res.data.page.current_page;
                        this.cut(this.currentIndex, res.data.list[0].ticket_id);
                        this.check = false;
                    } else {
                        this.chatList = [];
                        this.hasInfo = false;
                        this.check = false;
                    }
                });
            },
            handleChange(page) {    //页码改变回调
                this.current = page;
                this.get_ticket_list(page, this.currentWork);
            },
        },
        mounted() {
            this.get_ticket_list(1, this.currentWork);
        },
        filters: {
            time(value) {
                let date = new Date(value * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds();
                return Y + M + D
            },
            timeDate(value) {
                let date = new Date(value * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() < 10 ? '0' + date.getDate() + ' ': date.getDate() + ' ';
                let h = date.getHours() < 10 ? '0' + date.getHours() + ':': date.getHours() + ':';
                let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':': date.getMinutes() + ':';
                let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                return Y + M + D + h + m + s
            }
        }
    }
</script>
<style scoped lang="scss">
    .description{
        word-wrap: break-word;
        word-break: normal;
    }
</style>
