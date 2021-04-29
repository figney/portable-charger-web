<template>
  <div class="yesterday-profit-notify flex flex-direction padding">

    <!-- 顶部的图标 -->
    <img class="notify-icon" src="../../assets/images/pop_bg1@2x.png"/>

    <!-- 通知标题 -->
    <div class="text-center fs-16 font-bold margin-bottom-sm" v-html="notify.title"/>

    <!-- 通知内容 -->
    <div class="flex flex-direction margin-bottom">
      <div class="flex align-center justify-between padding-lr padding-tb-xs fs-16 font-bold">
        <span class="fc-666">{{$t('YESTERDAY_COMMISSION','昨日获得佣金')}}</span>
        <span class="fc-ff3636 flex align-center">
          <money-number class="money-number" :value="notify.params.commission" :precision="coin_unit.balance"/>
<!--          <span class="money-unit">{{system.default_currency}}</span>-->
        </span>
      </div>
      <div class="flex align-center justify-between padding-lr padding-tb-xs fs-16 font-bold">
        <span class="fc-666">{{$t('YESTERDAY_PROFIT','昨日获得奖励')}}</span>
        <span class="fc-ff3636 flex align-center">
          <money-number class="money-number" :value="notify.params.profit" :precision="coin_unit.balance"/>
<!--          <span class="money-unit">{{system.default_currency}}</span>-->
        </span>
      </div>
    </div>

    <!--  底部按钮-->
    <template>
      <van-button
          block
          round
          class="font-bold breath-btn border-radius-xs"
          @click="inviteNow"
          color="#432af5"
      >
        <span>{{$t('INVITE_FRIEND_GET_PROFIT','邀请好友并获取收益的60%')}}</span>
      </van-button>

      <van-button block class="font-bold margin-top border-radius-xs" plain @click="$emit('more')" color="#432af5" v-if="notify.see_all">
        <span>{{$t('SEE_ALL_NOTIFY','查看全部通知')}}</span>
      </van-button>
    </template>

  </div>
</template>

<script>
import {Button} from "vant"
import MoneyNumber from "@/components/MoneyNumber";
import {Base} from "@/mixins";

export default {
  name: "YesterdayProfitNotify",
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
    inviteNow() {
      this.$webEvent('收益到账弹窗点击立即邀请',this.$route.name+'页面')
      this.$emit('read')
      this.$bus.emit('share')
    },
  }
}
</script>

<style lang="scss">
.yesterday-profit-notify {
  position: relative;
  padding-top: 1.1rem !important;

  .notify-icon {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%,-50%);
    height: 1.8rem;
  }

  .van-button {
    height: unset;
    min-height: 44px;
    padding: 0.1333rem 0.2667rem;
    line-height: 1.5;
  }
}
</style>