<template>
  <div class="deduct-award-notify flex flex-direction padding">

    <!-- 顶部的图标 -->
    <img class="notify-icon" src="../../assets/images/notify@2x.png"/>

    <!-- 通知标题 -->
    <div class="text-center fs-16 font-bold margin-bottom-sm">{{$t('WITHDRAW_DEDUCT_AWARD','提现扣除赠送金')}}</div>

    <!-- 通知内容 -->
    <div class="flex align-center justify-center font-bold fc-13b271 fs-20 margin-bottom-sm" v-if="notify.params">
      <span> - </span>
      <money-number class="money-number" :value="notify.params.deduct_fee" :precision="coin_unit.balance"/>
<!--      <span class="money-unit fc-coin">{{system.default_currency}}</span>-->
    </div>

    <!-- 存款活动 -->
    <div class="margin-bottom-sm text-center bounce fc-ff3636">{{$t('DEPOSIT_GET_MORE_AWARD','存款领取大量赠送金')}}</div>

    <!--  底部按钮-->
    <template>
      <van-button
          block
          round
          class="font-bold margin-top breath-btn border-radius-xs"
          @click="depositNow"
          color="#432af5"
      >
        <span>{{$t('DEPOSIT_NOW','立即存款')}}</span>
      </van-button>

      <van-button block class="font-bold margin-top border-radius-xs" plain @click="$emit('more')" color="#432af5" v-if="notify.see_all">
        <span>{{$t('SEE_ALL_NOTIFY','查看全部通知')}}</span>
      </van-button>
    </template>

  </div>
</template>

<script>
import {Button} from "vant"
import {Base} from "@/mixins";
import MoneyNumber from "@/components/MoneyNumber";

export default {
  name: "DeductAwardNotify",
  components: {
    MoneyNumber,
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
    depositNow() {
      this.$webEvent('扣除赠送金弹窗点击【立即存款】',this.$route.name+'页面')
      this.read()
      this.$toRouter({name: 'Deposit'})
    },
  }
}
</script>

<style lang="scss">
.deduct-award-notify {
  position: relative;
  padding-top: 2.266rem !important;

  .notify-icon {
    position: absolute;
    left: 50%;
    top: 0.38rem;
    transform: translate(-50%, 0);
    height: 1.6rem;
  }
}
</style>