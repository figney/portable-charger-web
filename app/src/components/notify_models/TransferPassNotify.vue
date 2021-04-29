<template>
  <div class="transfer-pass-notify flex flex-direction">
    <!-- 通知标题 -->
    <img class="notify-icon white-view border-radius-50" src="../../assets/images/notify@2x.png"/>

    <div class="margin-lr padding-tb-sm text-center fs-16 font-bold" v-html="notify.title"/>

    <!-- 通知内容 -->
    <div class="margin-lr margin-bottom text-center" v-html="notify.content"/>

    <!--  底部按钮-->
    <div style="border-top:0.026rem solid #EEECFA">
      <van-button
          block
          class=" breath-btn border-radius-xs no-border"
          plain
          @click="read"
          color="#432af5"
      >
        {{$t('SURE','确定')}}
      </van-button>

      <van-button block class="font-bold margin-top border-radius-xs" plain @click="$emit('more')" color="#432af5" v-if="notify.see_all">
        <span>{{$t('SEE_ALL_NOTIFY','查看全部通知')}}</span>
      </van-button>
    </div>

  </div>
</template>

<script>
import {Button} from "vant"

export default {
  name: "TransferPassNotify",
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
      this.$webEvent('转款成功通知弹窗点击查看详情',this.$route.name+'页面')
      this.$emit('read')
    }
  }
}
</script>

<style lang="scss">
.transfer-pass-notify {
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