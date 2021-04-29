<template>
  <div class="product-expired-notify flex flex-direction padding">
      <img class="notify-icon" src="../../assets/images/notify@2x.png"/>
      <div class="text-center fs-16 font-bold margin-bottom-sm" v-html="notify.title" v-if="notify.params"/>
      <div class="margin-bottom-sm text-wrap text-center render-html" v-if="notify.params" v-html="notify.content"/>
      <div class="padding-lr-sm">
        <van-button block class="font-bold margin-top breath-btn border-radius-xs" @click="ISee" color="#432af5">
          <!--          <span>{{$t('I_SEE','我知道了')}}</span>-->
          <span>{{$t('CONTINUE_RENT','继续租用')}}</span>
        </van-button>

        <van-button block class="font-bold margin-top border-radius-xs" plain @click="$emit('more')" color="#432af5" v-if="notify.see_all">
          <span>{{$t('SEE_ALL_NOTIFY','查看全部通知')}}</span>
        </van-button>
      </div>
  </div>
</template>

<script>
import {Button} from "vant"
import {Base} from "@/mixins";
import MoneyNumber from "@/components/MoneyNumber";

export default {
  name: "ProductExpiredNotify",
  components: {
    // MoneyNumber,
    [Button.name]:Button,
  },
  props: {
    notify: {
      type: Object,
      default: Object
    }
  },
  mixins: [Base],
  methods: {
    read() {
      this.$emit('read')
      this.$emit('close')
    },
    toMoneyPage() {
      this.$webEvent('新人注册奖励弹窗点击【点我开始赚钱】',this.$route.name+'页面')
      this.read()
      this.$toRouter({name:'HomeMoney',query: {w:'give'}})
      let num = 0
      if (this.notify.params) {
        num = this.notify.params.fee
      }
      // this.$bus.emit('showGuideFirstDeposit',num+this.system.default_currency)
    },
    ISee() {
      this.$webEvent('奖励到账通知点击【继续租用】',this.$route.name+'页面')
      this.read()
      this.$toRouter({name: 'HomeMoney'})
    },
  }
}
</script>

<style lang="scss">
.product-expired-notify {
  position: relative;
  padding-top: 2.266rem !important;

  .notify-icon {
    position: absolute;
    left: 50%;
    top: 0.38rem;
    transform: translate(-50%, 0);
    height: 1.6rem;
  }

  .van-button {
    min-height: 44px;
    height: unset;
    padding: 0.1333rem 0.2667rem;
    line-height: 1.5;
  }
}
</style>