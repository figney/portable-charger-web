<template>
  <div class="transfer-reject-notify flex flex-direction padding">

    <!-- 顶部的图标 -->
    <img class="notify-icon white-view border-radius-50" src="../../assets/images/model_failed.png"/>

    <!-- 通知标题 -->
    <div class="text-center fs-16 font-bold margin-bottom-sm">{{$t('TRANSFER_FAILED','转账失败')}}</div>

    <!-- 通知内容 -->
    <div class="flex align-center justify-center font-bold fc-888 fs-20" v-if="notify.data">
      <money-number
        class="money-number"
        :value="notify.data.amount"
        :precision="coin_unit.usdt"
      />
<!--      <span class="money-unit fc-coin">{{system.default_currency}}</span>-->
    </div>

    <div class="margin-bottom-sm flex align-center justify-center fc-888 fs-12" v-if="notify.data">
      <span>{{$localTime(notify.data.check_time)}}</span>
    </div>

    <div class="text-center margin-bottom-sm">{{$t('TRANSFER_FAILED_SEE_DETAILE','转账充值审核不通过，点击查看详情')}}</div>

    <!--  底部按钮-->
    <template>
      <van-button
          block
          round
          class="font-bold margin-top breath-btn border-radius-xs"
          @click="seeDetail"
          color="#432af5"
      >
        <span>{{$t('SEE_DETAIL','查看详情')}}</span>
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
  name: "TransferRejectNotify",
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
    seeDetail() {
      this.$webEvent('转款失败通知弹窗点击查看详情',this.$route.name+'页面')
      this.read()
      this.$toRouter({name: 'DepositHistory'})
    },
  }
}
</script>

<style lang="scss">
.transfer-reject-notify {
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