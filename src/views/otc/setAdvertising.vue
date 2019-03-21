<template>
  <div class="adIntroduction" v-if="adIntroduction">
    <div class="adIntroductionMain">
      <p class="title"><i><img src="../../../static/img/default_icon.png" alt=""></i>默认回复语</p>
      <p class="right-title" @click="editor">
        <!-- <span class="icon-all-read"></span> -->
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
        <textarea type="text" v-model="Respond_word" id="textBox" placeholder="请输入回复语内容" maxlength="150"></textarea>
        <span class="sure_btn" @click="sureBtn">确认</span>
        <span class="fou_btn" @click="closeBtn">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";
export default {
  name: "AdIntroduct",

  data() {
    return {
      adIntroduction: false,
      show: false,
      show_respond: false,
      haveNo_respond: false,
      adMain: "",
      Respond_word: ""
    };
  },
  methods: {
    editor() {
      this.show = true;
      this.Respond_word = this.adMain;
    },
    closeBtn() {
      this.show = false;
    },
    get_greetings() {
      //获取回复语

      api
        .get_greetings()
        .then(res => {
          // console.log(res);
          if (res.status_code == 200) {
            this.adIntroduction = true;
            if (res.data != "") {
              this.show_respond = true;
              this.haveNo_respond = false;
              this.adMain = res.data;
            } else {
              this.show_respond = false;
              this.haveNo_respond = true;
            }
          } else if (res.status_code == 5009) {
            this.adIntroduction = true;
          } else {
            this.adIntroduction = false;
          }
        })
        .catch(error => {});
    },
    sureBtn() {
      //编辑问候语

      // if (this.Respond_word == "" || /^\s+$/g.test(this.Respond_word)) {
      //   this.$Message.info("回复语不能为空！");
      //   return false;
      // } else {
        let p = {
          greetings: this.Respond_word
        };
        api
          .edit_greetings(p)
          .then(res => {
            // console.log(res);
            if (res.status_code == 200) {
              this.get_greetings();
            } else if (res.status_code == 5008) {
            }
          })
          .catch(error => {});
      // }

      this.show = false;
    }
  },
  mounted() {
    this.get_greetings();
  }
};
</script>

<style scoped lang="scss">
//  回复语
.adIntroduction {
  margin: 2.5rem auto 26.6rem;
  min-height: 8.45rem;
  width: 58rem;
  background: #fff;
  border-radius: 0.25rem;
  padding-top: 0.9rem;
  box-shadow: 0 0 0.5rem 1px #ccc;
  .adIntroductionMain {
    padding: 0 1rem 2rem;
    width: 100%;
    height: 100%;

    .title {
      font-size: 0.9rem;
      font-family: "Microsoft YaHei";
      color: #171a2a;
      // height: 3rem;
      padding: 0rem 0 0.9rem 0;
      // line-height: 1rem;
      width: 50%;
      float: left;
      img{
        vertical-align: middle;
        margin-right: 0.8rem;
      }
    }

    .right-title {
      float: right;
      // line-height: 2.85rem;
      cursor: pointer;

      &:hover {
        color: #f3ba2f;
      }

      &:hover .icon-all-read:before {
        color: #f3ba2f;
      }

      .icon-all-read:before {
        font-weight: 600;
        color: #999999;
        margin-right: 0.25rem;
        vertical-align: middle;
      }

      .span-word {
        vertical-align: middle;
        color: #171a2a;
        font-size: 0.8rem;
      }
    }

    .adContentMain_empty {
      width: 100%;
      border: 1px solid #eee;
      border-radius: 0.15rem;
      min-height: 2.55rem;
      line-height: 2.55rem;
      text-align: center;
    }

    .adContentMain {
      width: 100%;
      border: 1px solid #eee;
      border-radius: 0.15rem;
      min-height: 2.55rem;
      line-height: 1.5rem;
      text-align: left;
      padding: 0.5rem;
      word-wrap: break-word;
    }
  }
}

//  回复语 end

//编辑回复语——弹框
.blackName-temp {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);

  .rebackMain {
    width: 27rem;
    height: 16.8rem;
    background-color: #ffffff;
    border-radius: 0.25rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    .icon-wrong {
      float: right;
      font-size: 1rem;
      margin: 1rem 1rem 0 0;
      cursor: pointer;
    }

    p:nth-of-type(1) {
      font-size: 0.9rem;
      color: #333333;
      margin: 2rem 0 1.5rem 2rem;
      text-align: left;
      font-family: "Microsoft YaHei";
    }

    p:nth-of-type(2) {
      font-size: 0.8rem;
      color: #666666;
      margin: 0 0 0.5rem 2.1rem;
      text-align: left;
      font-family: "Microsoft YaHei";
    }

    #textBox {
      width: 23rem;
      height: 5rem;
      outline: none;
      border: 1px solid #eeeeee;
      margin: 0 2rem 0 2rem;
      border-radius: 0.25rem;
      padding: 0.5rem 0 0 0.5rem;
      color: #666666;
      font-size: 0.7rem;
      resize: none;
    }

    .sure_btn {
      width: 5rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 0.25rem;
      margin: 2rem 3rem 2rem 2rem;
      background-color: #f3ba2f;
      color: #ffffff;
      display: block;
      float: left;
      font-size: 0.7rem;
      font-family: "Microsoft YaHei";
      cursor: pointer;
      text-align: center;
    }

    .fou_btn {
      color: #333333;
      display: block;
      float: left;
      font-size: 0.7rem;
      margin-top: 2.5rem;
      text-align: center;
      font-family: "Microsoft YaHei";
      cursor: pointer;
    }
  }
}

//  编辑回复语——弹框 end
//  添加黑名单弹框
.blackName-temp {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);

  .blackNameMain {
    width: 27rem;
    height: 13.8rem;
    background-color: #ffffff;
    border-radius: 0.25rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    .icon-wrong {
      float: right;
      font-size: 1rem;
      margin: 1rem 1rem 0 0;
      cursor: pointer;
    }

    p:nth-of-type(1) {
      font-size: 0.9rem;
      color: #333333;
      margin: 2rem 0 1.5rem 2rem;
      text-align: left;
      font-family: "Microsoft YaHei";
    }

    p:nth-of-type(2) {
      font-size: 0.8rem;
      color: #666666;
      margin: 0 0 0.5rem 2rem;
      text-align: left;
      font-family: "Microsoft YaHei";
    }

    .blackName-input {
      width: 23rem;
      height: 2rem;
      outline: none;
      border: 1px solid #eeeeee;
      margin: 0 2rem 0 2rem;
      border-radius: 0.25rem;
      padding-left: 0.5rem;
      color: #666666;
      font-size: 0.7rem;
    }

    .sure_btn {
      width: 5rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 0.25rem;
      margin: 0.5rem 3rem 2rem 2rem;
      background-color: #f3ba2f;
      color: #ffffff;
      display: block;
      float: left;
      font-size: 0.7rem;
      font-family: "Microsoft YaHei";
      cursor: pointer;
      text-align: center;
    }

    .fou_btn {
      color: #333333;
      display: block;
      float: left;
      font-size: 0.7rem;
      margin-top: 1rem;
      text-align: center;
      font-family: "Microsoft YaHei";
      cursor: pointer;
    }
  }

  //  删除黑名单弹框start
  .blackNameMainDel {
    width: 27rem;
    height: 13.8rem;
    background-color: #ffffff;
    border-radius: 0.25rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    .icon-wrong {
      float: right;
      font-size: 1rem;
      margin: 1rem 1rem 0 0;
      cursor: pointer;
    }

    p:nth-of-type(1) {
      font-size: 0.9rem;
      color: #333333;
      margin: 2rem 0 1.5rem 2rem;
      text-align: left;
      font-family: "Microsoft YaHei";
    }

    p:nth-of-type(2) {
      font-size: 0.8rem;
      color: #666666;
      margin: 0 0 0.5rem 2rem;
      text-align: left;
      font-family: "Microsoft YaHei";
    }

    .sure_btn {
      width: 5rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 0.25rem;
      margin: 2rem 3rem 2rem 2rem;
      background-color: #f3ba2f;
      color: #ffffff;
      display: block;
      float: left;
      font-size: 0.7rem;
      font-family: "Microsoft YaHei";
      cursor: pointer;
      text-align: center;
    }

    .fou_btn {
      color: #333333;
      display: block;
      float: left;
      font-size: 0.7rem;
      margin-top: 2.5rem;
      text-align: center;
      font-family: "Microsoft YaHei";
      cursor: pointer;
    }
  }
}

//  add_zf_ways
.add-zf-ways {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;

  .add-zf-waysMain {
    width: 27rem;
    height: auto;
    background-color: #ffffff;
    border-radius: 0.25rem; //margin: 5.5rem auto;
    margin: auto;
    padding-bottom: 1.5rem; //new
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*向左向上分别平移自身的一半*/
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);

    .icon-wrong {
      float: right;
      font-size: 1rem;
      margin: 1rem 1rem 0 0;
      cursor: pointer;
    }

    p:nth-of-type(1) {
      font-size: 0.9rem;
      color: #333333;
      margin: 0.25rem 0 0.75rem 2rem;
      padding-top: 2rem;
      text-align: left;
      font-family: "Microsoft YaHei";
    }

    p:nth-of-type(2) {
      font-size: 0.8rem;
      color: #666666;
      margin: 0 0 0.5rem 2rem;
      text-align: left;
      font-family: "Microsoft YaHei";
    }

    .zf-ul {
      width: 23rem;
      margin: auto;

      .zf-ul-li {
        width: 23rem;
        position: relative;

        .Select-box {
          width: 95%;
          float: left;
          height: 1.85rem;
          line-height: 2rem;
          padding-left: 0.5rem;
          outline: none;
        }

        .select-ul {
          width: 13.25rem;
          height: auto;
          padding-bottom: 0.5rem;
          border-radius: 0.25rem;
          background-color: rgba(255, 255, 255, 255);
          position: absolute;
          top: 1.95rem;
          left: 0;
          border: 1px solid #eeeeee;
          box-shadow: 1px 0.1rem 0.75rem rgba(153, 153, 153, 0.4);
          -webkit-box-shadow: 1px 0.1rem 0.75rem rgba(153, 153, 153, 0.4);
          -moz-box-shadow: 1px 0.1rem 0.75rem rgba(153, 153, 153, 0.4);

          li {
            height: 1.5rem;
            line-height: 1.5rem;
            padding-left: 0.5rem;
            font-size: 0.7rem;
            color: #666666;

            &:hover {
              background-color: #edeef4;
              color: #f3ba2f;
              cursor: pointer;
            }
          }
        }

        .set_small_word {
          font-size: 0.65rem !important;
          color: #999999 !important;
          margin: -1.65rem 0 0 -0.1rem !important;
          cursor: none;

          .set_smallBtn {
            font-size: 0.7rem !important;
            color: #f3ba2f !important;
            cursor: pointer !important;
          }
        }

        .cancel_Btn_span {
          font-size: 0.7rem;
          color: #333;
          font-family: "Microsoft YaHei";
          display: inline-block;
          margin-left: 2.5rem;
        }
      }
    }

    //  paypal_Way
    .paypalContent {
      width: 27rem;
      background-color: #ffffff;
      height: 21.5rem;
      margin: 0 auto;
      border-radius: 0 0 0.25rem 0.25rem;

      .paypalContent-group {
        width: 23rem;
        height: auto;
        margin: 0 auto;

        p {
          font-size: 0.8rem;
          color: #666666;
          margin: 0 0 0.5rem 0;
          padding-top: 1rem;
          text-align: left;
          font-family: "Microsoft YaHei";
        }

        .yourName {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          background-color: #f3f3f3;
          padding-left: 0.5rem;
          color: #cccccc;
        }

        .zhanghao {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          padding-left: 0.5rem;
          color: #cccccc;
        }

        .zjPwd {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          padding-left: 0.5rem;
          color: #cccccc;
        }
      }

      .sure_btn {
        width: 5rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 0.25rem;
        margin: 2rem 2.5rem 2rem 2rem;
        background-color: #f3ba2f;
        color: #ffffff;
        display: block;
        float: left;
        font-size: 0.7rem;
        font-family: "Microsoft YaHei";
        cursor: pointer;
        text-align: center;
      }

      .fou_btn {
        color: #333333;
        display: block;
        float: left;
        font-size: 0.7rem;
        margin-top: 2.5rem;
        text-align: center;
        font-family: "Microsoft YaHei";
        cursor: pointer;
      }
    }

    //  paypal_Way end
    //  aplay
    .wechartsContent {
      width: 27rem;
      height: 27.75rem;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 0 0 0.25rem 0.25rem;

      .wechartsContent-group {
        width: 23rem;
        height: auto;
        margin: 0 auto;

        p {
          font-size: 0.8rem;
          color: #666666;
          margin: 0 0 0.5rem 0;
          padding-top: 1rem;
          text-align: left;
          font-family: "Microsoft YaHei";
        }

        .yourName {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          background-color: #f3f3f3;
          padding-left: 0.5rem;
          color: #cccccc;
        }

        .zhanghao {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          padding-left: 0.5rem;
          color: #cccccc;
        }

        .code {
          display: inline-block;
          width: 23rem;
          height: 3rem;
          line-height: 2.75rem;
          border: 1px dashed #eeeeee;
          border-radius: 0.25rem;
          padding-left: 0.5rem;
          color: #cccccc;
        }

        .upload_input {
          background-color: transparent;
          filter: alpha(opacity=0);
          -moz-opacity: 0;
          -khtml-opacity: 0;
          opacity: 0;
          width: 22rem;
          height: 3rem;
          line-height: 2.65rem;
          position: absolute;
          z-index: 1000;
        }

        .zjPwd {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          padding-left: 0.5rem;
          color: #cccccc;
        }
      }

      .sure_btn {
        width: 5rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 0.25rem;
        margin: 1.25rem 2.5rem 2rem 2rem;
        background-color: #f3ba2f;
        color: #ffffff;
        display: block;
        float: left;
        font-size: 0.7rem;
        font-family: "Microsoft YaHei";
        cursor: pointer;
        text-align: center;
      }

      .fou_btn {
        color: #333333;
        display: block;
        float: left;
        font-size: 0.7rem;
        margin-top: 1.75rem;
        text-align: center;
        font-family: "Microsoft YaHei";
        cursor: pointer;
      }
    }

    //  aplay end
    //  bankCard_Way
    .backCardContent {
      width: 27rem;
      height: 31.5rem;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 0 0 0.25rem 0.25rem;

      .paypalContent-group {
        width: 23rem;
        height: auto;
        margin: 0 auto;

        p {
          font-size: 0.8rem;
          color: #666666;
          margin: 0rem 0 0.5rem 0;
          padding-top: 1.5rem;
          text-align: left;
          font-family: "Microsoft YaHei";
        }

        .yourName {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          background-color: #f3f3f3;
          padding-left: 0.5rem;
          color: #cccccc;
        }

        .zhanghao {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          padding-left: 0.5rem;
          color: #cccccc;
        }

        .zjPwd {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          padding-left: 0.5rem;
          color: #cccccc;
        }
      }

      .sure_btn {
        width: 5rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 0.25rem;
        margin: 1.25rem 2.5rem 2rem 2rem;
        background-color: #f3ba2f;
        color: #ffffff;
        display: block;
        float: left;
        font-size: 0.7rem;
        font-family: "Microsoft YaHei";
        cursor: pointer;
        text-align: center;
      }

      .fou_btn {
        color: #333333;
        display: block;
        float: left;
        font-size: 0.7rem;
        margin-top: 1.75rem;
        text-align: center;
        font-family: "Microsoft YaHei";
        cursor: pointer;
      }
    }

    //  bankCard_Way end
    //  wecharts_Way
    .wechartsContent {
      width: 27rem;
      height: 27.75rem;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 0 0 0.25rem 0.25rem;

      .wechartsContent-group {
        width: 23rem;
        height: auto;
        margin: 0 auto;

        p {
          font-size: 0.8rem;
          color: #666666;
          margin: 0 0 0.5rem 0;
          padding-top: 1rem;
          text-align: left;
          font-family: "Microsoft YaHei";
        }

        .yourName {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          background-color: #f3f3f3;
          padding-left: 0.5rem;
          color: #cccccc;
        }

        .zhanghao {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          padding-left: 0.5rem;
          color: #cccccc;
        }

        .code {
          display: inline-block;
          width: 23rem;
          height: 3rem;
          line-height: 2.75rem;
          border: 1px dashed #eeeeee;
          border-radius: 0.25rem;
          padding-left: 0.5rem;
          color: #cccccc;
        }

        .upload_input {
          background-color: transparent;
          filter: alpha(opacity=0);
          -moz-opacity: 0;
          -khtml-opacity: 0;
          opacity: 0;
          width: 22rem;
          height: 3rem;
          line-height: 2.65rem;
          position: absolute;
          z-index: 1000;
        }

        .zjPwd {
          width: 23rem;
          height: 2rem;
          border: 1px solid #eeeeee;
          border-radius: 0.25rem;
          padding-left: 0.5rem;
          color: #cccccc;
        }
      }

      .sure_btn {
        width: 5rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 0.25rem;
        margin: 1.25rem 2.5rem 2rem 2rem;
        background-color: #f3ba2f;
        color: #ffffff;
        display: block;
        float: left;
        font-size: 0.7rem;
        font-family: "Microsoft YaHei";
        cursor: pointer;
        text-align: center;
      }

      .fou_btn {
        color: #333333;
        display: block;
        float: left;
        font-size: 0.7rem;
        margin-top: 1.75rem;
        text-align: center;
        font-family: "Microsoft YaHei";
        cursor: pointer;
      }
    }

    //  wecharts_Way end
  }
}

//  add_zf_ways end
</style>
