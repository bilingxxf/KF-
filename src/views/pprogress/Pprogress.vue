<template>
    <div id="Pprogress">
        <div class="qiuxian">
            <div class="dingxia"></div>
            <div class="outLine" :class="[isBuy ? 'allGreen' : 'allred']">
                <div class="circle" :class="[value == 0 || sum / balance * 100 >= 0 ? 'big_circle' : 'little_circle', canSelect ? '' : 'notClick']" @click="surePrecent(0)"></div>
                <div class="circle" :class="[value == 25 || sum / balance * 100 >= 25 ? 'big_circle' : (value > 25 ? 'little_circle' : ''), canSelect ? '' : 'notClick']" @click="surePrecent(25)"></div>
                <!-- <div class="inLine" :class="{color_line: value > 25}"></div> -->
                <div class="circle" :class="[value == 50 || sum / balance * 100 >= 50? 'big_circle' : (value > 50 ? 'little_circle' : ''), canSelect ? '' : 'notClick']" @click="surePrecent(50)"></div>
                <!-- <div class="inLine" :class="{color_line: value > 50}"></div> -->
                <div class="circle" :class="[value == 75 || sum / balance * 100 >= 75? 'big_circle' : (value > 75 ? 'little_circle' : ''), canSelect ? '' : 'notClick']" @click="surePrecent(75)"></div>
                <!-- <div class="inLine" :class="{color_line: value > 75}"></div> -->
                <div class="circle" :class="[value == 100 || sum / balance * 100 >= 100? 'big_circle' : '']" @click="surePrecent(100)"></div>
                <div class="bgLine"></div>
                <div class="inLine color_line" :style="`width: ${Math.ceil(sum / balance * 260)}px;`"></div>
            </div>
        </div>

        <ul class="baifenbi">
            <li @click="surePrecent(0)">0%</li>
            <li @click="surePrecent(25)"></li>
            <li @click="surePrecent(50)"></li>
            <li @click="surePrecent(75)"></li>
            <li @click="surePrecent(100)">100%</li>

        </ul>
    </div>
</template>

<script>
export default {
    name: 'Pprogress',
    data() {
        return {
            value: 0,
        }
    },
    props: {
        canSelect: {
            type: Boolean,
            default: false
        },
        balance: {
            default: 0
        },
        isBuy: {
            default: true
        },
        sum: {
            default: 0
        }
    },
    computed: {
        symbol() {
            return this.$store.getters.symbol
        },
    },
    mounted() {
        this.shuchu();
    },
    methods: {
        shuchu() {
        },
        surePrecent(value) {
            if (this.canSelect && (this.balance > 0 || value == 0)) {
                this.value = value
                this.$emit('precent', this.value)
            }
        }
    },
    watch: {
        symbol(newVal, oldVal) {
            if (newVal.symbol != oldVal.symbol) {
                this.surePrecent(0)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
//交易中心右下角的百分比进度条
.qiuxian {
  width: 100%;

  .dingxia {
    height: 0.8rem;
    width: 100%;
  }

  .outLine {
    width: 100%;
    height: 0.1rem;
    background: #272c39;
    display: flex;
    display: -webkit-flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    position: relative;

    .inLine {
      max-width: 15.5rem;
      position: absolute;
      width: 0;
      height: 0.1rem;
      background: #272c39;
    }
    .bgLine {
      position: absolute;
      width: 100%;
      height: 0.1rem;
      background: #272c39;
    }

    .circle {
      margin-top: -0.2rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 100%;
      display: inline-block;
      background: white;
      float: left;
      cursor: pointer;
      position: relative;
      z-index: 1;
    }

    .notClick {
      cursor: no-drop;
    }

    .big_circle {
      background-color: #fff;
      border: 0.15rem solid;
      width: 0.8rem;
      height: 0.8rem;
      margin-top: -0.35rem;
    }

    .little_circle {
      border: 0.1rem solid;
      background-color: #fff;
    }
  }

  .allGreen {
    .big_circle {
      border-color: #21a960;
    }

    .little_circle {
      border-color: #21a960;
    }

    .color_line {
      background: #21a960;
    }
  }

  .allred {
    .big_circle {
      border-color: #d84a45;
    }

    .little_circle {
      border-color: #d84a45;
    }

    .color_line {
      background: #d84a45;
    }
  }
}

.baifenbi {
  margin-top: 0.7rem;
  width: 100%;
  height: 0.6rem;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: 0.6rem;
  line-height: 0.6rem;

  li {
    color: white;
    cursor: pointer;
  }
}
</style>


