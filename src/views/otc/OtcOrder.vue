<template>
  <div>
    <Content>
      <div class="otc-order">
        <div class="otc-wrap">
          <div class="head-content">
            <div class="head-left" style="display: flex">
              <!--<p>{{ $t(`message.OTCOrder.MyOrder`) }}</p>-->
              <!--<p style="margin-left: 2.5rem">广告主订单</p>-->
              <p v-for="(order,index) in orderWay" @click="cutWay(index)" :class="{activeColor:index == current}">
                {{order.name}}
              </p>
            </div>
            <div class="head-right">
              <Form ref="formValidate" :model="formValidate" :label-width="80">
              <FormItem label="订单状态" class="order-status-padding" prop="currency" :label-width="150">
                  <Select placeholder="全部" v-model="formValidate.payType" @on-change = "payChange" style="width:4.5rem">
                      <Option value=" ">全部</Option>
                      <Option value="1">待付款</Option>
                      <Option value="2">待放币</Option>
                      <Option value="3">已取消</Option>
                      <Option value="4">申诉中</Option>
                      <Option value="5">已完成</Option>
                      <Option value="6">客服完成</Option>
                      <Option value="7">客服取消</Option>
                  </Select>
              </FormItem>
                <FormItem label="订单类型" prop="dealType">
                  <Select placeholder="全部" v-model="formValidate.dealType" @on-change = "typeChange" style="width:4.5rem">
                    <Option value="">全部</Option>
                    <Option :value="member == 'user'?1:2">购买</Option>
                    <Option :value="member == 'user'?2:1">出售</Option>
                  </Select>
                </FormItem>
                <FormItem :label="$t(`message.Coin`)" prop="currency" :label-width="50">
                  <Select placeholder="全部" v-model="formValidate.currency" @on-change = "coinChange" style="width:4.5rem">
                    <Option v-for="(coin,index) in coinList" :key="index" :value="coin.coin_id">{{coin.coin_name}}</Option>
                  </Select>
                </FormItem>
                <!--<FormItem :label="$t(`message.DealCenter.Time`)">-->
                  <!--<Row>-->
                    <!--<Col span="11">-->
                      <!--<DatePicker type="date" :placeholder="$t(`message.OTCOrder.Choose`)" v-model="formValidate.startTime"></DatePicker>-->
                    <!--</Col>-->
                    <!--<Col span="1" style="text-align: center">-</Col>-->
                    <!--<Col span="11">-->
                      <!--<DatePicker type="date" :placeholder="$t(`message.OTCOrder.Choose`)" v-model="formValidate.endTime"></DatePicker>-->
                    <!--</Col>-->
                  <!--</Row>-->
                <!--</FormItem>-->
                <FormItem class="btn_submit">
                  <Button type="primary" @click="handleSubmit()">{{$t(`message.OTCOrder.Search`)}}</Button>
                </FormItem>
              </Form>
            </div>
          </div>
          <div class="deal-content">
            <Table :columns="columns" :data="data" :no-data-text="none_text"></Table>
              <div style="text-align: center;margin: 1.5rem 0" v-if="data.length > 0"><Page :total="count" class="pageOrder" :page-size="pageSize" @on-change="changePage"></Page></div>
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>
<script>
import api from "../../api";
import axios from "axios";
import config from "../../../static/config";
import resOnline from "./../../../static/configOnline";
import utils from "../../utils";
export default {
  data() {
    return {
      current: 0,
      count: 0,
      pageSize: 15,
      member: "user",
      coin_id: "",
      coin_type: "",
      coin_pay: "",
      formValidate: {
        dealType: "",
        payType: "",
        currency: "",
        startTime: "",
        endTime: ""
      },
      orderWay: [{ name: '普通订单' }],
      columns: [
        {
          title: '订单号',
          key: "otc_transac_sn",
          minWidth: 40
        },
        {
          title: "币种",
          key: "coin_name",
          minWidth: 40
        },
        {
          title: '交易类型',
          key: "dealType",
          render: (h, params) => {
            let texts = "";
            if (this.member == "user") {
              if (params.row.otc_advertisement_type == 2) {
                texts = "出售";
              } else if (params.row.otc_advertisement_type == 1) {
                texts = "购买";
              }
            } else if (this.member == "advertiser") {
              if (params.row.otc_advertisement_type == 2) {
                texts = "购买";
              } else if (params.row.otc_advertisement_type == 1) {
                texts = "出售";
              }
            }
            return h("div", [h("span", {}, texts)]);
          }
        },
        {
          title: '交易数量',
          key: "transac_coin_number_str"
        },
        {
          title: '总价',
          key: "transac_currency_number",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {},
                params.row.transac_currency_number + params.row.currency_name
              )
            ]);
          }
        },
        {
          title: '单价',
          key: "transac_coin_unit_price_str",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#07d08b"
                }
              },
              params.row.transac_coin_unit_price_str + params.row.currency_name
            );
          }
        },
        {
          title: '时间',
          key: "created_at",
          minWidth: 50
        },
        {
          title: '状态',
          key: "otc_transac_status",
          render: (h, params) => {
            let texts = "";
            if (params.row.otc_transac_status == 1) {
              texts = "待付款";
              return h("div", [
                h("span", {
                  // class: {
                  //   'icon-red-nosuccess': params.row.otc_transac_status == 1 || params.row.otc_transac_status == 3 || params.row.otc_transac_status == 4 || params.row.otc_transac_status == 6? true : false,
                  //   'icon-success': params.row.otc_transac_status == 2 || params.row.otc_transac_status == 5 ? true : false
                  // },
                  style: {
                    fontSize: "0.8rem",
                    lineHeight: "2.5rem"
                  }
                }),
                h(
                  "span",
                  {
                    style: {
                      color: "#f00",
                      fontSize: "0.7rem",
                      marginLeft: "0.5rem"
                    }
                  },
                  texts
                )
              ]);
            } else if (params.row.otc_transac_status == 2) {
              texts = "待放币";
              return h("div", [
                h("span", {
                  // class: {
                  //   'icon-red-nosuccess': params.row.otc_transac_status == 1 || params.row.otc_transac_status == 3 || params.row.otc_transac_status == 4 || params.row.otc_transac_status == 6? true : false,
                  //   'icon-success': params.row.otc_transac_status == 2 || params.row.otc_transac_status == 5 ? true : false
                  // },
                  style: {
                    fontSize: "0.8rem",
                    lineHeight: "2.5rem"
                  }
                }),
                h(
                  "span",
                  {
                    style: {
                      color: "#f00",
                      fontSize: "0.7rem",
                      marginLeft: "0.5rem"
                    }
                  },
                  texts
                )
              ]);
            } else if (params.row.otc_transac_status == 3) {
              texts = "已取消";
              return h("div", [
                h("span", {
                  // class: {
                  //   'icon-red-nosuccess': params.row.otc_transac_status == 1 || params.row.otc_transac_status == 3 || params.row.otc_transac_status == 4 || params.row.otc_transac_status == 6? true : false,
                  //   'icon-success': params.row.otc_transac_status == 2 || params.row.otc_transac_status == 5 ? true : false
                  // },
                  style: {
                    fontSize: "0.8rem",
                    lineHeight: "2.5rem"
                  }
                }),
                h(
                  "span",
                  {
                    style: {
                      color: "#9c9999",
                      fontSize: "0.7rem",
                      marginLeft: "0.5rem"
                    }
                  },
                  texts
                )
              ]);
            } else if (params.row.otc_transac_status == 4) {
              texts = "申诉中";
              return h("div", [
                h("span", {
                  // class: {
                  //   'icon-red-nosuccess': params.row.otc_transac_status == 1 || params.row.otc_transac_status == 3 || params.row.otc_transac_status == 4 || params.row.otc_transac_status == 6? true : false,
                  //   'icon-success': params.row.otc_transac_status == 2 || params.row.otc_transac_status == 5 ? true : false
                  // },
                  style: {
                    fontSize: "0.8rem",
                    lineHeight: "2.5rem"
                  }
                }),
                h(
                  "span",
                  {
                    style: {
                      color: "#f40",
                      fontSize: "0.7rem",
                      marginLeft: "0.5rem"
                    }
                  },
                  texts
                )
              ]);
            } else if (params.row.otc_transac_status == 5) {
              texts = "已完成";
              return h("div", [
                h("span", {
                  // class: {
                  //   'icon-red-nosuccess': params.row.otc_transac_status == 1 || params.row.otc_transac_status == 3 || params.row.otc_transac_status == 4 || params.row.otc_transac_status == 6? true : false,
                  //   'icon-success': params.row.otc_transac_status == 2 || params.row.otc_transac_status == 5 ? true : false
                  // },
                  style: {
                    fontSize: "0.8rem",
                    lineHeight: "2.5rem"
                  }
                }),
                h(
                  "span",
                  {
                    style: {
                      color: "green",
                      fontSize: "0.7rem",
                      marginLeft: "0.5rem"
                    }
                  },
                  texts
                )
              ]);
            }else if (params.row.otc_transac_status == 6) {
              texts = "客服完成";
              return h("div", [
                h("span", {
                  // class: {
                  //   'icon-red-nosuccess': params.row.otc_transac_status == 1 || params.row.otc_transac_status == 3 || params.row.otc_transac_status == 4 || params.row.otc_transac_status == 6? true : false,
                  //   'icon-success': params.row.otc_transac_status == 2 || params.row.otc_transac_status == 5 ? true : false
                  // },
                  style: {
                    fontSize: "0.8rem",
                    lineHeight: "2.5rem"
                  }
                }),
                h(
                  "span",
                  {
                    style: {
                      color: "green",
                      fontSize: "0.7rem",
                      marginLeft: "0.5rem"
                    }
                  },
                  texts
                )
              ]);
            }else if (params.row.otc_transac_status == 7) {
              texts = "客服取消";
              return h("div", [
                h("span", {
                  // class: {
                  //   'icon-red-nosuccess': params.row.otc_transac_status == 1 || params.row.otc_transac_status == 3 || params.row.otc_transac_status == 4 || params.row.otc_transac_status == 6? true : false,
                  //   'icon-success': params.row.otc_transac_status == 2 || params.row.otc_transac_status == 5 ? true : false
                  // },
                  style: {
                    fontSize: "0.8rem",
                    lineHeight: "2.5rem"
                  }
                }),
                h(
                  "span",
                  {
                    style: {
                      color: "#9c9999",
                      fontSize: "0.7rem",
                      marginLeft: "0.5rem"
                    }
                  },
                  texts
                )
              ]);
            }
            // color: '#f40',
          }
        },
        {
          title: '交易对象',
          key: "customer_user_name",
          render: (h, params) => {
            let texts = "";
            if (this.member == "user") {
              // if (params.row.otc_advertisement_type == 2) {
              //     texts = "出售"
              // } else if (params.row.otc_advertisement_type == 1) {
              //     texts = "购买"
              // }
              texts = params.row.advertiser_user_name;
            } else if (this.member == "advertiser") {
              // if (params.row.otc_advertisement_type == 2) {
              //     texts = "购买"
              // } else if (params.row.otc_advertisement_type == 1) {
              //     texts = "出售"
              // }
              texts = `${params.row.customer_user_name}${params.row.customer_identification_name ? `(${params.row.customer_identification_name})` : ''}`;
            }
            // advertiser_user_name
            // customer_user_name
            return h("div", texts);
          }
        },
        // {
        //   title: this.$t("message.OTCBeal.PayMethods"),
        //   key: 'way',
        //   minWidth: 50,
        //   render: (h, params) => {
        //     return h('div', [
        //       h('span', {
        //         class: {
        //           'icon-paypal': params.row.way.indexOf('1') >= 0 ? true : false
        //         },
        //         style: {
        //           fontSize: '1rem',
        //           lineHeight: '2.5rem',
        //         }
        //       }),
        //       h('span', {
        //         class: {
        //           'icon-pay': params.row.way.indexOf('2') >= 0 ? true : false
        //         },
        //         style: {
        //           fontSize: '1rem',
        //           lineHeight: '2.5rem',
        //         }
        //       }),
        //       h('span', {
        //         class: {
        //           'icon-card': params.row.way.indexOf('3') >= 0 ? true : false
        //         },
        //         style: {
        //           fontSize: '1rem',
        //           lineHeight: '2.5rem',
        //         }
        //       }),
        //       h('span', {
        //         class: {
        //           'icon-wechat-pay': params.row.way.indexOf('4') >= 0 ? true : false
        //         },
        //         style: {
        //           fontSize: '1rem',
        //           lineHeight: '2.5rem'
        //         }
        //       })
        //     ])
        //   }
        // },
        {
          title: '操作',
          key: "operate",
          minWidth: 50,
          render: (h, params) => {
            return h("div", [
              h("a", {
                style: {
                  fontSize: "0.7rem",
                  color: "#333",
                  lineHeight: "2.5rem",
                  display:
                    params.row.otc_transac_status == 3 ||
                    params.row.otc_transac_status == 1 ||
                    params.row.otc_transac_status == 5
                      ? "none"
                      : "initial"
                },
                class: {
                  order_operate: true
                },
                on: {
                  click: () => {
                    this.submitOrder(params.row.otc_transac_sn);
                  }
                }
              }),
              h(
                "a",
                {
                  style: {
                    color: "#333",
                    fontSize: "0.7rem",
                    lineHeight: "2.5rem",
                    marginLeft:
                      params.row.otc_transac_status == 3 ||
                      params.row.otc_transac_status == 1 ||
                      params.row.otc_transac_status == 5
                        ? "0rem"
                        : "0rem"
                  },
                  class: {
                    order_operate: true
                  },
                  on: {
                    click: () => {
                      this.orderDetail(
                        params.row.otc_transac_id,
                        params.row.otc_advertisement_type
                      );
                    }
                  }
                },
                "订单详情"
              )
            ]);
          }
        }
      ],
      data: [],
      coinList: [],
      none_text:
        '<div style="text-align: center;margin-top: 1.5rem;margin-bottom: 1.5rem"><p class="icon-no_info" style="font-size: 10rem;"></p><p style="font-size: 1rem;">' +
        this.$t("message.NoData") +
        "...</p></div>"
    };
  },
  methods: {
    coinChange(value) {
      this.coin_id = value;
    },
    typeChange(value) {
      //交易类型
      this.coin_type = value;
    },
    payChange(value) {
      //交易状态
      this.coin_pay = value;
    },
    changePage(page) {
      //翻页
      this.orderList(this.member, page);
    },
    cutWay(index) {
      //订单切换

      this.data = []
      
      this.current = index;
      this.formValidate.dealType = "";
      this.formValidate.currency = "";
      this.formValidate.payType = "";
      this.coin_id = "";
      this.coin_type = "";
      this.coin_pay = "";
      if (index == 0) {
        this.member = "user";
        this.orderList("user", 1);
      } else if (index == 1) {
        this.member = "advertiser";
        this.orderList("advertiser", 1);
      }
    },
    handleSubmit() {
      //查询
      // console.log(this.formValidate);
      this.orderList(this.member, 1);
    },
    // this.orderDetail(params.row.otc_transac_id,params.row.otc_advertisement_type)
    orderDetail(otc_transac_id, type) {
      let texts = "";
      if (this.member == "user") {
        if (type == 2) {
          texts = "sell";
        } else if (type == 1) {
          texts = "buy";
        }
      } else if (this.member == "advertiser") {
        if (type == 2) {
          texts = "buy";
        } else if (type == 1) {
          texts = "sell";
        }
      }
      this.$router.push({
        path: "/order",
        query: {
          otc_transac_id: otc_transac_id,
          member: this.member,
          type: texts
        }
      });
    },
    submitOrder(otc_transac_sn) {
      this.$router.push({
        path: "/submit-order",
        query: {
          type: "otc",
          order_id: otc_transac_sn
        }
      });
    },
    orderList(type, page) {
      let params = {
        page: page,
        limit: this.pageSize,
        otc_advertisement_type: this.coin_type,
        otc_transac_status: this.coin_pay,
        type: type,
        coin_id: this.coin_id
      };
      api.getransacList(params).then(res => {
        if (res.status_code == 200) {
          this.data = res.data.list;
          this.count = res.data.page.count;
          console.log(this.data)
          for(var i=0;i<this.data.length;i++) {
          	this.data[i].transac_coin_number_str = Number(this.data[i].transac_coin_number_str).toFixed(8)
          }
        }
      });
    },
    coinInfo() {
      api.advertiserUrl().then(res => {
        if (res.status_code == 200) {
          this.coinList = res.data.list;
          const arr = { coin_id: " ", coin_name: "全部" };
          this.coinList.unshift(arr);
          this.orderList("user", 1);
        }
      });
    },
    //判断是不是广告组
    isAdvertiser() {
      let instances = axios.create();
      instances.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";
      instances.defaults.headers["Authorization"] =
        "Bearer" + utils.getCookie("token");
      instances.defaults.timeout = 10000;
      const domain = window.location.origin;
      if (domain.indexOf("localhost") == -1) {
        instances.defaults.baseURL = resOnline.advertiser_url;
      } else {
        instances.defaults.baseURL = config.advertiser_url;
      }
      api.apply_advertiser_validate().then(res => {
        if (res.status_code == 6025 || res.status_code == 8029) {
          // let guanggao = {name:'广告主订单'};  //广告主订单名称改为商户订单
          let guanggao = { name: "商户订单" };
          this.orderWay.push(guanggao);
          this.coinInfo();
        } else {
          this.coinInfo();
        }
      });
    }
  },
  mounted() {
    this.$store.commit("changeOTCOrderShow", 2);
    this.isAdvertiser();
  },
  beforeDestroy() {
    this.$store.commit("changeOTCOrderShow", 0);
  }
};
</script>
<style scoped lang="scss">
.otc-wrap ::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.75rem;
    background-color: #fff;
}
.otc-wrap ::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    -webkit-box-shadow: inset 0 0 0.3rem rgba(0,0,0,.3);
    background-color: #ccc;
}
.otc-wrap ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0.3rem rgba(0,0,0,0.3);
    border-radius: 0.5rem;
    background-color: #fff;
}

.otc-order {
  width: 100%;
  min-height: 50rem;
  .otc-wrap {
    width: 95.5%;
    margin: 0 auto;
    .head-content {
      width: 100%;
      height: 4.5rem;
      line-height: 4.5rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      border-bottom: 1px solid #edeef4;
      .head-left {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        p {
          font-size: 1.2rem;
          color: #333;
          cursor: pointer;
          margin-right: 2.5rem;
        }
        p:hover {
          color: #f3ba2f;
          transition: all 0.3s ease-in-out;
        }
        .activeColor {
          color: #f3ba2f;
        }
      }
      .head-right {
        /*-webkit-box-flex: 1;*/
        /*-ms-flex: 1;*/
        /*-webkit-flex: 1;*/
        /*flex: 1;*/
        form {
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          line-height: 4.5rem;
        }
      }
    }
    .deal-content {
      margin-top: 0.7rem;
    }
  }
}
</style>
