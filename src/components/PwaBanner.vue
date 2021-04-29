<template>
<div
    class="pwa-banner padding-lr padding-tb-sm flex justify-between align-center"
    @click="install"
    v-if="ifPwa && showPwaBanner"
>
  <div class="fs-16 font-bold fc-432af5 bounce flex-sub">{{$t('INSTALL_ANTS_LAND','保存到桌面')}}</div>
  <img src="../assets/images/install_pwa.png" class="size-30" alt="">
  <van-icon @click.stop="showPwaBanner=false" name="close" size="18" color="#666" class="margin-left"/>

  <van-popup v-model="showIOSGuide" class="vw-90 padding-lr padding-tb-xl border-radius" :close-on-click-overlay="false" closeable @click.stop="">
    <van-swipe class="my-swipe" :autoplay="0" indicator-color="white" :loop="false">
      <van-swipe-item>
        <div class="flex flex-direction align-center justify-center bg-dark">
          <img src="../assets/images/step1.png" style="width:100%">
          <div class="margin-top text-nowrap text-ellipsis van-overflow-hidden">Click 'More' to show sidebar</div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="flex flex-direction align-center justify-center bg-dark">
          <img src="../assets/images/step2.png" style="width:100%">
          <div class="margin-top text-nowrap text-ellipsis van-overflow-hidden">Click to add to Home screen</div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="flex flex-direction align-center justify-center bg-dark">
          <img src="../assets/images/step3.png" style="width:100%">
          <div class="margin-top text-nowrap text-ellipsis van-overflow-hidden">Click to add</div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="flex flex-direction align-center justify-center bg-dark">
          <img src="../assets/images/step4.png" style="width:100%">
          <div class="margin-top text-nowrap text-ellipsis van-overflow-hidden">Open DeFiBox on Home screen with one click</div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </van-popup>
</div>
</template>

<script>
import {Icon, Popup, Swipe, SwipeItem} from "vant";
import {mobileApp} from "@/mixins";
import {mapState} from "vuex";

export default {
  components: {
    [Icon.name]:Icon,
    [Popup.name]:Popup,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem
  },
  data: ()=> {
    return {
      showIOSGuide: false,
      showPwaBanner: true
    }
  },
  mixins: [mobileApp],
  computed: {
    ...mapState(['ifPwa'])
  },
  mounted() {
    this.$bus.on('showPwaBanner', show=>{
      this.showPwaBanner = show
    })
  },
  methods: {
    install() {
      let u = navigator.userAgent;
      let isMobile = (u.indexOf('Android') > -1 || u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1 || u.indexOf('iPod') > -1 || u.indexOf('Symbian') > -1)
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
      if (isMobile && !isAndroid) {
        this.showIOSGuide = true
      } else {
        this.saveApp()
      }
    }
  }
}
</script>

<style lang="scss">
.pwa-banner {
  background: linear-gradient(
          180deg
      , #ffed62, #fdf9db);

  .my-swipe {

    .van-swipe__indicators {
      bottom: 0.7rem;

      .van-swipe__indicator--active {
        background: #432af5 !important;
      }

      .van-swipe__indicator {
        width: 0.2rem;
        height: 0.2rem;
        background: #ccc;
      }
    }
  }
}
</style>