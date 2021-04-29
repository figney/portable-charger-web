<template>
  <div class="beginner-page-wrap">
    <div class="beginner-page">
      <div class="flex flex-direction justify-start  vw-90 margin-auto">
        <p class="fs-24 margin-top margin-left-lg font-900" style="color:#54ABF3;">{{$t('NEW_P_REG','新人注册')}}<br/>{{$t('FREE_RECEIVE_POWER_QU','免费领取租赁充电宝资格')}}</p>
        <p class="margin-top-lg text-center fs-40 font-900" style="color:#14C976;"><span class="fs-15">{{$t("VALUE","价值")}}</span>99.00RM</p>
        <p class="margin-top-lg text-center fc-888">{{$t("RECEIVE_P_NUM","已领取人数")}}：256832</p>
      </div>
      <div class="div">
        <p class="text-center margin-top-sm fs-15">{{ $t("PRODUCT_NAME","产品名称")}}</p>
          <ul class="flex flex-direction">
            <li><p>{{ $t("DAY_INCPME","日收益")}}</p><p><span>22.00</span>RM</p></li>
            <li><p>{{$t("TOTAL_PROFIT", "总收益")}}</p><p><span>22.00</span>RM</p></li>
            <li><p>{{$t("RENTAL_PRICE","租赁价格")}}</p><p><span>{{$t("FREE","免费")}}</span></p></li>
          </ul>
      </div>

      <div class="scroll-banners">
        <vue-seamless-scroll
            :data="notice"
            :class-option="{hoverStop:false}"
            class="per-scroll-warp"
        >
          <ul class="item">
            <li v-for="(item, index) in notice" :key="index">
              <div class="flex align-center fc-fff">
                <img :src="item.who | avatar" class="size-36 margin-right-sm avatar border-radius-50">
                <div class="text-wrap">
                  <span v-if="item.action=='invite'">{{item.who}} {{$t('INVITED_SOMEONE',[item.friend],'邀请了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>
                  <span v-else-if="item.action=='deposit'">{{item.who}} {{$t('DEPOSIT_N_BALANCE',[item.amount+system.default_currency],'充值了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>
                  <span v-else-if="item.action=='profit'">{{item.who}} {{$t('GETTED_N_PROFIT',[item.fee+system.default_currency],'获得了N收益')}}</span>
                  <span v-else-if="item.action=='award'">{{item.who}} {{$t('GETTED_N_AWARD',[item.fee+system.default_currency],'获得了N奖励')}}</span>
                  <span v-else></span>
                </div>
              </div>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>

      <div @click="startNow" class="position_btn">
        <img src ="../assets/images/but.png"/>
        <p>{{$t('GRAB_Q','抢资格')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperItem, Toast} from "mand-mobile"
import vueSeamlessScroll from "vue-seamless-scroll";
import {Base} from "@/mixins";
import * as randomString from "string-random";
import {mapState} from "vuex";

export default {
  components: {
    vueSeamlessScroll,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem
  },
  data: ()=> {
    return {
      defaultNum: 135462,
      currentNum: 0,
      numDirect: 1, // 18
      numDigits: 6, // 6位数字
      dynamicInterval: null,
      notice: []
    }
  },
  computed: {
    ...mapState(['baseNotice']),

  },
  mixins: [Base],
  mounted() {
    this.calcCurrentNum()
    this.startMachine()
    this.getNotices()
  },
  beforeDestroy() {
    clearInterval(this.dynamicInterval)
  },
  methods: {
    randomInt(min=1, max=3) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getNotices() {
      if (this.baseNotice.length>0) {
        this.notice = this.baseNotice
      } else {
        this.$http.get('v1/annunciation')
            .then(res=>{
              this.$store.commit('setState',{key:'baseNotice',value:res.data})
              res.data.forEach(e=>{
                if (e.action=='deposit') {
                  e.amount = e.amount ? e.amount : e.fee * this.randomInt()
                }
              })
              this.notice = res.data
            })
            .catch(err=>{
              Toast.failed(err.data.message)
            })
      }
    },
    calcCurrentNum() {
      let t = Date.now() % 86400000
      this.currentNum = Math.floor(t / 250) + this.defaultNum
    },
    startMachine() {
      clearInterval(this.dynamicInterval)
      this.dynamicInterval = setInterval(()=>{
        this.currentNum ++
      },250)
    },
    startNow() {
      this.$bus.emit('login')
    }
  }
}
</script>

<style lang="scss">
.beginner-page-wrap {
  overflow: auto;
  background: #1d1a30;
  display: flex;
  flex-direction: column;

  .beginner-page {
    min-height: 100vh;
    background: #1d1a30 url("../assets/images/bak.png") no-repeat;
    background-size: 100% auto;
    position: relative;

    .position_btn{
      position:fixed;
      bottom:0.5rem;
      width:90%;
      margin-left:5%;
      img{
        width:100%;
      }
      p{
        position:fixed;
        bottom:1rem;
        text-align:center;
        width:90%;
        color:#935D5D;
        font-size:0.5rem;
        font-weight:900;
      }
    }

    .div{
      z-index:1000;
      border:1px solid #fff;
      height:3.5rem;
      background:#fff;
      width:88%;
      margin: 2.5rem auto;
      border-radius:0.2rem;
      display:flex;
      flex-direction: column;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.05);
      ul{
        li{
          display: flex;
          justify-content: space-between;
          margin:0.15rem 0.5rem;
          p{
            font-size:0.35rem;
            span{
              color:#14C976;
              font-weight:800;
              font-size:0.4rem;
            }
          }
        }
      }
    }


    .scroll-banners {
      z-index:8;
      color: #fff;
      position: fixed;
      bottom: 2.2rem;
      left: 5vw;
      width: 90vw;
      top: 12.75rem;
      padding: 1.3vw 2.2vw;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      li {
        border-radius: 4vw;
        padding: 2vw 3vw;
        background: rgba(255,222,65,0.1);
        backdrop-filter: blur(10px) saturate(2);
        display: flex;
        align-items: center;
        margin-bottom: 2.4vw !important;

        img {
          width: 36px;
          height: 36px;
          min-width: 36px;
        }
      }

      .notice-content {
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 1.44rem;
      }
    }

    .beginner-btns {
      z-index: 1;
      position: fixed;
      left: 5vw;
      bottom: 4vw;
      width: 90vw;
      padding: 2.8vw 2vw;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1.3vw;
      color: #fff;
      font-weight: 700;
      font-size: 4.6vw;
      background: linear-gradient(to bottom, #ffe51b 10%, #f5a623 100%);
      transition: all 0.1s;
      box-shadow: 0 0 5px 0 #ffe51b;
      animation: flashYellow 0.8s linear infinite;
      text-shadow: 0 0 1px #2F3545;

      &:active {
        background: linear-gradient(to bottom, #ffe51b 5%, #f5a623 100%);
        transform: translate(0, 2px);
      }
    }
  }
}

@keyframes flashYellow {
  0%,100% {
    box-shadow: 0 0 3px 0 #ffe51b;
  }
  50% {
    box-shadow: 0 1px 15px 1px #f5a623;
  }

}
</style>
