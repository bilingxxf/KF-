<template>
    <div class="top">
        <div class="top-one">
            <p class="title">我的邀请链接</p>
            <div class="input" style="margin:0 auto; ">
                <input type="text" v-model="Mylinkpromotion" id="foo" readonly>
                <button :data-clipboard-text="Mylinkpromotion" class="btn" @click='copy'>复制链接分享</button>
                <div class="user-prop" @mouseout="showEW = false" @mousemove="showEW = true">
                    <span class="user-prop-title">二维码</span>
                    <div class="user-prop-content" v-show="showEW">
                        <i class="user-prop-sj">
                        </i>
                        <div class="user-prop-p">请使用浏览器扫码</div>
                        <i></i>
                        <img :src='qrcod' alt="" />
                        <div class="user-prop-btn">
                            <a :href="qrcod" download="qrcod.png">下载</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="div">
                <ul class="p-one">
                    <li class="one">邀请人数</li>
                    <li class="two">邀请总人数
                        <a herf="javascript:;">{{totalnumber}}</a>
                    </li>
                </ul>
                <ul class="p-two">
                </ul>
                <ul class="p-three">
                    <li class="one">获得KT</li>
                    <li class="two">{{ktCount}}
                        <a herf="javascript:;">KT</a>
                    </li>
                </ul>
                <ul class="p-two">
                </ul>
                <ul class="p-three">
                    <li class="one">可用 KT</li>
                    <li class="two">{{able_kt_count}}
                        <a herf="javascript:;">KT</a>
                    </li>
                </ul>
            </div>
            <Row id="jbutton" v-show="but">
                <button @click="exportData()">导出</button>
                </Col>
            </Row>
            </TabPane>
            <TabPane :label="$t(`message.Mypromotion.CashbackHistory`)" name="name2" id="dataunlls">
                <div class="mytable1">
                    <p class="table-header">
                        <span class="one">被邀请人账号</span>
                        <span class="two">时间</span>
                        <span class="three">佣金</span>
                    </p>
                    <div class="table-list" id="table-lists1">
                        <p v-for=" (item,index) in janrecord1" :key="index">
                            <span class="one">{{item.name}}</span>
                            <span class="two">{{item.create_time}}</span>
                            <span class="three">{{item.commission}}</span>
                        </p>
                    </div>
                </div>
                <div v-show='janrecord1.length==0' class="sky">
                    <span class="icon-no_info">
                    </span>
                    <a href="javascript:;">无返佣记录,快让好友交易吧</a>
                </div>
                <Row class="time">
                    <Col class="jtime">
                    <span>时间</span>
                    </Col>
                    <Col span="3">
                    <DatePicker @on-change="startChange" type="date" format="yyyy-MM-dd" :placeholder="$t(`message.Mypromotion.PleaseSelectDate`)"></DatePicker>
                    </Col>
                    <Col span="2">
                    <Icon type="ios-minus-empty"></Icon>
                    </Col>
                    <Col span="3">
                    <DatePicker @on-change="endChange" type="date" format="yyyy-MM-dd " :placeholder="$t(`message.Mypromotion.PleaseSelectDate`)"></DatePicker>
                    <span>{{dataRefresh}}</span>
                    </Col>
                </Row>
                <Row id="jbutton1">
                    <Col span="3">
                    <button @click="exportDatas()">导出</button>
                    </Col>
                </Row>
            </TabPane>
            </Tabs>
        </div>
        <div class="guize">
            <p>{{ $t(`message.Mypromotion.ProgramDetails`) }}</p>
            <ol>
                <li>{{ $t(`message.Mypromotion.RuleOne`) }}</li>
                <li>{{ $t(`message.Mypromotion.RuleTwo`) }}</li>
                <li>{{ $t(`message.Mypromotion.RuleThree`) }}</li>
            </ol>
        </div>
    </div>
</template>
<script type="text/javascript">
import Clipboard from "clipboard";
import api from "@/api.js";
import { Base64 } from "js-base64";
function formatDateTime(inputTime) {
    let date = new Date(inputTime);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    //let h = date.getHours();
    //h = h < 10 ? "0" + h : h;
    // let minute = date.getMinutes();
    // let second = date.getSeconds();
    // minute = minute < 10 ? "0" + minute : minute;
    // second = second < 10 ? "0" + second : second;
    return y + "-" + m + "-" + d;
}
export default {
    data() {
        return {
            but: true,
            showEW: false,
            qrcod: '',
            qrcodA: '',
            value: "",
            myname: "name2",
            daterange: "",
            starttime: "",
            endtime: "",
            totalnumber: "",
            ktCount: "",
            able_kt_count: '',
            Mylinkpromotion: "",
            janrecord: [],
            janrecord1: [],
            box: "",
            link: "",
            Page: 1,
            oldArray: [],
            newArray: [],
            grop: 0,
            open: true,
            Pages: 0,
            oldArrays: [],
            newArrays: [],
            grops: 0,
            opens: true,
            excellist: []
        };
        api
            .mypromotionlist(list)
            .then(res => {
                for (let j = 0; j < res.data.list.length; j++) {
                    if (typeof res.data.list[j] == "object") {
                        for (let create_time in res.data.list) {
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });


    },
    filter: {},
    computed: {
        dataRefresh() {
            if (this.starttime && this.endtime && this.starttime <= this.endtime) {
                ///推广列表
                let list = {
                    page: 1
                };
                api
                    .mypromotionlist(list)
                    .then(res => {
                        for (let j = 0; j < res.data.list.length; j++) {
                            if (typeof res.data.list[j] == "object") {
                                for (let create_time in res.data.list) {
                                }
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    },
    filter: {},
    methods: {
        toggle(name) {
            if (name == 'name2') {
                this.but = false;
            } else {
                this.but = true;
            }
        },
        //导出
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        exportData(evt) {
            if (this.janrecord.length == 0) {
                this.$Message.info(this.$t('message.Mypromotion.NoInviteHistory'))
            } else {
                api.exportCsv().then(res => {
                    this.excellist = res.data;
                    this.excellist.forEach((val, index) => {
                        val.create_time = formatDateTime(val.create_time * 1000);
                        val.status = (val.status == 1 ? this.$t(`message.Mypromotion.settled`) : this.$t(`message.Mypromotion.Unsettle`));
                    });
                    require.ensure([], () => {
                        const { export_json_to_excel } = require('@/vendor/Export2Excel');
                        const tHeader = ['被邀请人账号', '时间', '状态'];
                        const filterVal = ['name', 'create_time', 'status'];
                        const list = this.excellist;  //导入数据
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '列表文本', '压缩文本');
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        exportDatas() {
            if (this.janrecord1.length == 0) {
                this.$Message.info('无邀请记录')
            } else {
                this.$refs.table.exportCsv({
                    filename: 'The original data'
                }, this.$Message.info('导出成功'));
            }
        },
        //复制分享
        copy() {
            let clipboard = new Clipboard(".btn");
            clipboard.on("success", e => {
                clipboard.destroy();
                this.success();
            });
            clipboard.on("error", e => {
                clipboard.destroy();
            });
        },
        //复制成功提示
        success() {
            this.$Message.success('复制成功');
        },
        //推广链接
        Mypromotion() {
            api
                .Mypromotion()
                .then(res => {
                    this.Mylinkpromotion = res.data.promo_link;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //推广列表
        mypromotionlist() {
            api
                .mypromotionlist()
                .then(res => {
                    this.janrecord = res.data.user_list;
                    this.janrecord.forEach((val, index) => {
                        val.create_time = formatDateTime(val.create_time * 1000);
                        val.status = (val.status == 1 ? this.$t(`message.Mypromotion.settled`) : this.$t(`message.Mypromotion.Unsettle`));
                    });
                    this.totalnumber = res.data.user_count;
                    this.ktCount = res.data.kt_count;
                    this.able_kt_count = Math.floor((this.ktCount - res.data.able_kt_count) * 100000000) / 100000000
                })
                .catch(err => {
                    console.log(err);
                });
        },
        startChange(daterange) {
            this.starttime = Date.parse(new Date(daterange));
        },
        endChange(daterange) {
            this.endtime = Date.parse(new Date(daterange));
        },
        MypromotionUrl() {
            api
                .Mypromotion()
                .then(res => {
                    let linkurl = window.location.origin;
                    this.Mylinkpromotion =
                        require('../../static/configOnline').promo_url +
                        "/" +
                        "#" +
                        "/" +
                        "register" +
                        "?" +
                        "code=" +
                        res.data.agent_promo_agent;
                    this.Myqrcod({ base64: Base64.encodeURI(this.Mylinkpromotion) });
                    this.mypromotionlist();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        Myqrcod(params) {
            api.twoQrcod(params).then(res => {
                this.qrcod = 'data:image/png;base64,' + res.data.QrCode;
            })
        },
        pullscroll() {
            let topDistance = document.getElementById('table-list').scrollTop;
            let boxHeight = document.getElementById('table-list').clientHeight;
            let distanceHeight = document.getElementById('table-list').scrollHeight;
            if (topDistance + boxHeight >= distanceHeight) {
                let params = {
                    page: ++this.Page
                };
                if (this.open) {
                    api.mypromotionlist(params).then(res => {
                        this.oldArray = this.janrecord;
                        this.grop = this.janrecord.length;
                        if (res.status_code == 200) {
                            this.newArray = res.data.user_list;
                            this.newArray.forEach((val, index) => {
                                val.create_time = formatDateTime(val.create_time * 1000);
                                val.status = (val.status == 1 ? this.$t(`message.Mypromotion.settled`) : this.$t(`message.Mypromotion.Unsettle`));
                            });
                            this.janrecord = this.oldArray.concat(this.newArray);
                            this.open = false;
                            if (this.grop == this.janrecord.length) {
                                this.$Message.info('数据已全部加载')
                            } else {
                                this.open = true;
                            }
                        }
                    }).catch(err => {

                    })
                }
            }
        },
        pullscrolls() {
            let topDistance = document.getElementById('table-list1').scrollTop;
            let boxHeight = document.getElementById('table-list1').clientHeight;
            let distanceHeight = document.getElementById('table-list1').scrollHeight;
            if (topDistance + boxHeight >= distanceHeight) {
                let params = {
                    page: ++this.Pages
                };
                if (this.opens) {
                    api.mypromotionlist(params).then(res => {
                        this.oldArrays = this.janrecord1;
                        this.grops = this.janrecord1.length;
                        if (res.status_code == 200) {
                            this.newArrays = res.data.user_list;
                            this.janrecord1 = this.oldArrays.concat(this.newArrays);
                            this.opens = false;
                            if (this.grops == this.janrecord1.length) {
                                this.$Message.info('数据已全部加载')
                            } else {
                                this.opens = true;
                            }
                        }
                    }).catch(err => {

                    })
                }
            }
        }
    },
    mounted() {
        this.MypromotionUrl();
        document.getElementById('table-list').addEventListener('scroll', this.pullscroll, true);
        //document.getElementById('table-list1').addEventListener('scroll',this.pullscrolls,true);
    }
};
</script>


