<template>
  <div
      class="balance-banner border-radius-xl white-view padding-lr-sm box-shadow fs-14 fc-default van-overflow-hidden position-re"
      style="width:5.6rem;height:30px"
      @click="clickBanner"
  >
    <van-icon name="arrow" class="balance-banner-arrow"/>
    <van-swipe
      :height="30"
      :touchable="false"
      :duration="1000"
      :autoplay="5000"
      :show-indicators="false"
      vertical
      class="fs-16 flex-sub"
      v-if="isLogin"
    >
      <van-swipe-item class="flex align-center" v-if="all_property.balance.property>0 || (all_property.usdt.property==0 && all_property.give.property==0)">
        <img
            :src="require(`../assets/coin/${system.default_currency}.svg`)"
            class="margin-right-xs"
            style="height:0.46rem"
        />
        <div
            class="flex-sub text-nowrap margin-right-xs van-overflow-hidden text-ellipsis font-bold"
        >
          <money-number
              class="money-number"
              :value="all_property.balance.property"
              :precision="coin_unit.balance"
          ></money-number>
          <!-- <span class="money-unit fc-coin" >{{system.default_currency}}</span> -->
        </div>
      </van-swipe-item>

      <van-swipe-item class="flex align-center" v-if="all_property.usdt.property>0">
<!--        src="../assets/images/icon1@2x.png"-->
        <img
            :src="require(`../assets/coin/USDT.svg`)"
            class="margin-right-xs"
            style="height:0.46rem"
        />
        <div
            class="flex-sub text-nowrap margin-right-xs van-overflow-hidden text-ellipsis font-bold"
        >
          <money-number
              :value="all_property.usdt.property"
              :precision="coin_unit.usdt"
          ></money-number>
          <span class="money-unit fc-coin" >USDT</span>
        </div>
      </van-swipe-item>

      <van-swipe-item class="flex align-center" v-if="all_property.give.property>0">
        <img
            :src="require(`../assets/coin/Give.png`)"
            class="margin-right-xs"
            style="height:0.46rem"
        />
        <div
            class="flex-sub text-nowrap margin-right-xs van-overflow-hidden text-ellipsis font-bold"
        >
          <money-number
              class="money-number"
              :value="all_property.give.property"
              :precision="coin_unit.give"
          ></money-number>
          <!-- <span class="money-unit fc-coin" >{{system.default_currency}}</span> -->
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="flex-sub flex align-center padding-lr-xs" style="height:30px" v-else>
      {{$t('LOGIN','登录')}}
    </div>
  </div>
</template>

<script>
import {Base} from "@/mixins";

import MoneyNumber from "@/components/MoneyNumber";
import {Icon, Swipe, SwipeItem} from "vant";

export default {
  components: {
    MoneyNumber,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,

  },
  mixins: [Base],
  methods: {
    clickBanner() {
      this.$webEvent('点击顶部的钱包', this.$route.name+'页面')
      this.$toRouter({name: 'Wallet'})
    }
  }
}
</script>

<style lang="scss">
.balance-banner {
  .balance-banner-arrow {
    position: absolute;
    right:0.2667rem;
    top:0;
    bottom:0;
  }
}
</style>