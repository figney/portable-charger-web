<template>
  <div class="award-notify flex flex-direction padding">

    <!-- 注册奖励 -->
    <template v-if="(notify.params && notify.params.hook_lang == 'Register' && notify.params.task_target_lang == 'First')">
      <img class="notify-icon" src="../../assets/images/image_7@2x.png"/>
      <div class="text-center fs-16 font-bold margin-bottom-sm" v-if="notify.params">
        {{$t('CONGRATULATIONS_GET_MONEY', '恭喜您获得了')}}
      </div>
      <div class="text-center fs-16 font-bold margin-bottom-sm" v-else>{{$t('AWARD_HAS_ARRIVED','奖励已到账')}}</div>
      <div class="font-bold fc-ff3636 fs-18 margin-bottom-sm text-wrap text-center flex align-center justify-center" v-if="notify.params">
        <span class=""> + </span>
        <span class="money-number">{{notify.params.fee}}</span>
<!--        <span class="money-unit fc-coin">{{system.default_currency}}</span>-->
        <span>{{$t('MINER_EXPERIENCE_CASH','挖矿体验金')}}</span>
      </div>
      <div class="text-center margin-bottom-sm margin-lr-xs fs-13 font-bold fc-432af5" v-if="notify.params">
        <span>{{$t('NOW_YOU_CAN_EARN_FIRST_PROFIT','现在，你可以赚取你的第一笔投资收益啦')}}</span>
      </div>
      <div class="padding-lr-sm">
        <van-button block class="font-bold margin-top breath-btn border-radius-xs" @click="toMoneyPage" color="#432af5">
          <span>{{$t('CLICK_START_EARN_MONEY','立刻开始挖矿赚钱')}}</span>
        </van-button>

        <van-button block class="font-bold margin-top border-radius-xs" plain @click="$emit('more')" color="#432af5" v-if="notify.see_all">
          <span>{{$t('SEE_ALL_NOTIFY','查看全部通知')}}</span>
        </van-button>
      </div>
    </template>

    <!-- 其他奖励 -->
    <template v-else>
      <img class="notify-icon" src="../../assets/images/image_7@2x.png"/>
      <div class="text-center fs-16 font-bold margin-bottom-sm" v-html="notify.params.type_title || notify.content" v-if="notify.params"/>
      <div class="text-center fs-16 font-bold margin-bottom-sm" v-else>{{$t('AWARD_HAS_ARRIVED','奖励已到账')}}</div>
      <div class="font-bold fc-ff3636 fs-18 margin-bottom-sm text-wrap text-center flex align-center justify-center" v-if="notify.params">
        <span class=""> + </span>
        <money-number class="money-number" :value="notify.params.fee" :precision="coin_unit.balance"/>
<!--        <span class="money-unit fc-coin">{{system.default_currency}}</span>-->
        <span>{{$t('MINER_EXPERIENCE_CASH','挖矿体验金')}}</span>
      </div>
      <div class="text-center margin-bottom-sm margin-lr-xs fs-13 font-bold fc-432af5" v-if="notify.params">
        <span>{{$t('NOW_DEPOSIT_TO_BAO_GET_PROFIT','现在存入赚钱宝，即可享受每日收益')}}</span>
      </div>
      <div class="padding-lr-sm">
        <van-button block class="font-bold margin-top breath-btn border-radius-xs" @click="ISee" color="#432af5">
<!--          <span>{{$t('I_SEE','我知道了')}}</span>-->
          <span>{{$t('MINING_NOW','立即挖矿')}}</span>
        </van-button>

        <van-button block class="font-bold margin-top border-radius-xs" plain @click="$emit('more')" color="#432af5" v-if="notify.see_all">
          <span>{{$t('SEE_ALL_NOTIFY','查看全部通知')}}</span>
        </van-button>
      </div>
    </template>

  </div>
</template>

<script>
import {Button} from "vant"
import {Base} from "@/mixins";
import MoneyNumber from "@/components/MoneyNumber";

export default {
  name: "AwardNotify",
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
      this.$webEvent('奖励到账通知点击【我知道了】',this.$route.name+'页面')
      this.read()
      this.$toRouter({name: 'HomeMoney'})
    },
  }
}
</script>

<style lang="scss">
.award-notify {
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
