<template>
  <div class="commission-notify flex flex-direction padding">

    <!-- 顶部的图标 -->
    <img class="notify-icon" src="../../assets/images/pop_bg1@2x.png"/>

    <!-- 通知标题 -->
    <div class="text-center fs-16 font-bold margin-bottom-sm" v-html="notify.title"/>

    <!-- 通知内容 -->
    <div class="flex align-center justify-center font-bold fc-ff3636 fs-20 margin-bottom-sm" v-if="notify.params">
      <span> + </span>
      <money-number class="money-number" :value="notify.params.fee" :precision="coin_unit.balance"/>
<!--      <span class="money-unit fc-coin">{{system.default_currency}}</span>-->
    </div>

    <div class="text-center margin-bottom">
      <span>{{$t('YOUR','您的')}}</span>
      <span>{{$t('N_LEVEL_FRIEND',[notify.params.level.toString()],'N级好友')}}</span>
      <span>{{$t('BUY_N_MINING',[notify.params.amount+system.default_currency],'购买了 N 云矿机')}}，</span>
      <span>{{$t('YOU_GOT_N_COMMISSION',[notify.params.fee+system.default_currency],'您获得N佣金')}}</span>
    </div>

    <!-- 邀请好友 -->
    <div class="margin-bottom text-center bounce fc-ff3636">{{$t('INVITE_GET_MORE_PROFIT','邀请好友获取更多收益')}}</div>

    <!--  底部按钮-->
    <template>
      <van-button
          block
          round
          class="font-bold breath-btn border-radius-xs"
          @click="inviteNow"
          color="#432af5"
      >
        <span>{{$t('INVITE_NOW','立即邀请')}}</span>
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
  name: "CommissionNotification",
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
      this.$webEvent('佣金到账通知点击【立即邀请】',this.$route.name+'页面')
      this.$emit('read')
      this.$bus.emit('share')
    },
  }
}
</script>

<style lang="scss">
.commission-notify {
  position: relative;
  padding-top: 1.1rem !important;

  .notify-icon {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%,-50%);
    height: 1.8rem;
  }
}
</style>