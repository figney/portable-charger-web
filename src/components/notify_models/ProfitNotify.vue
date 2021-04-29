<template>
  <div class="profit-notify flex flex-direction padding">

    <!-- 顶部的图标 -->
    <img class="notify-icon" src="../../assets/images/pop_bg1@2x.png"/>

    <!-- 通知标题 -->
    <div class="text-center fs-16 font-bold margin-bottom-sm" v-html="notify.title"/>

    <!-- 通知内容 -->
    <div class="text-center margin-bottom" v-html="notify.content"/>

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
        <span>{{$t('INVITE_FRIEND_GET_MONEY','邀请好友并获取 40,000 Rs 赠送金')}}</span>
      </van-button>

      <van-button block class="font-bold margin-top border-radius-xs" plain @click="$emit('more')" color="#432af5" v-if="notify.see_all">
        <span>{{$t('SEE_ALL_NOTIFY','查看全部通知')}}</span>
      </van-button>
    </template>

  </div>
</template>

<script>
import {Button} from "vant"

export default {
  name: "ProfitNotify",
  components: {
    [Button.name]:Button,
  },
  props: {
    notify: {
      type: Object,
      default: Object
    }
  },
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
.profit-notify {
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