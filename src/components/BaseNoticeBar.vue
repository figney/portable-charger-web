<template>
  <van-notice-bar
      color="#ffffff"
      class="fc-primary border-radius-sm flex-sub"
      style="padding-top:0;padding-bottom:0"
      :scrollable="false"
      :wrapable="true"
      @replay="replay"
  >
    <template #left-icon>
      <img class="size-18 margin-right-xs" src="../assets/images/icon4@2x.png" alt="" v-if="blueIcon">
      <img class="size-18 margin-right-xs" src="../assets/images/icon5@2x.png" alt="" v-else>
    </template>
    <md-swiper
        class="fs-13"
        vertical
        :dragable="false"
        :touchable="false"
        :autoplay="3000"
        transition="slideY"
        :is-prevent="false"
        :has-dots="false"
        style="height:1.07rem;line-height:0.52rem"
        :show-indicators="false"
    >
      <md-swiper-item v-for="(item,i) in notice" :key="i" class="flex align-center">
        <div class="text-nowrap text-ellipsis van-overflow-hidden" style="max-width:8rem">
          <span v-if="item.action=='invite'">{{item.who}} {{$t('INVITED_SOMEONE',[item.friend],'邀请了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>
          <span v-else-if="item.action=='deposit'">{{item.who}} {{$t('DEPOSIT_N_BALANCE',[(item.amount?item.amount:item.fee*randomInt())+system.default_currency],'充值了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>
          <span v-else-if="item.action=='profit'">{{item.who}} {{$t('GETTED_N_PROFIT',[item.fee+system.default_currency],'获得了N收益')}}</span>
          <span v-else-if="item.action=='award'">{{item.who}} {{$t('GETTED_N_AWARD',[item.fee+system.default_currency],'获得了N奖励')}}</span>
          <span v-else>{{ item }}</span>
        </div>
      </md-swiper-item>
    </md-swiper>
  </van-notice-bar>
</template>

<script>
import {NoticeBar} from 'vant'
import {Swiper, SwiperItem, Toast} from 'mand-mobile'
import {Base} from "@/mixins";
import {mapState} from "vuex";

export default {
  components: {
    [NoticeBar.name]: NoticeBar,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
  },
  props: {
    blueIcon: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      s_notice: [],
      notice: [
        // {
        //   who: 'Tom',
        //   action: 'invite',
        //   friend: 'Jerry',
        //   fee: 200
        // },
        // {
        //   who: 'Jerry',
        //   action: 'deposit',
        //   amount: 1000,
        //   fee: 200
        // },
        // {
        //   who: 'Tom',
        //   action: 'profit',
        //   fee: 300
        // },
        // {
        //   who: 'Tom',
        //   action: 'award',
        //   fee: 200
        // },
      ]
    }
  },
  mixins: [Base],
  computed: {
    ...mapState(['baseNotice'])
  },
  mounted() {
    this.getNotices()
  },
  methods: {
    getNotices() {
      if (this.baseNotice.length>0) {
        this.notice = this.baseNotice
        this.s_notice = this.notice
      } else {
        this.$http.get('v1/annunciation')
          .then(res=>{
            this.$store.commit('setState',{key:'baseNotice',value:res.data})
            this.notice = res.data
            this.s_notice = this.notice
          })
          .catch(err=>{
            Toast.failed(err.data.message)
          })
      }
    },
    replay() {
      this.notice = this.s_notice
    },
    randomInt(min=1, max=3) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
}
</script>
