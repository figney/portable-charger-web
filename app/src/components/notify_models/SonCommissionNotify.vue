<template>
  <div class="son-commission-notify flex flex-direction padding">

    <!-- 顶部的图标 -->
    <img class="notify-icon" src="../../assets/images/pop_bg1@2x.png"/>

    <!-- 通知标题 -->
    <div class="text-center fs-16 font-bold margin-bottom-sm flex flex-direction">
      <span>{{$t('COMMISSION_ARRIVED','佣金到账')}} {{notify.params.fee}} {{system.default_currency}}</span>
      <span>{{$t('N_NOT_ARRIVED',[(notify.params.all_fee - notify.params.fee).toString() + ' '+ system.default_currency],'还有N无法获得')}}</span>
    </div>

    <div class="fs-14 flex flex-direction bg-f7f9ff border-radius-sm margin-tb" v-if="notify.params">

      <div class="flex align-center justify-between  padding-sm  border-radius-sm">
        <span class="fc-666">{{$t('N_LEVEL_N_BUY',[notify.params.level.toString(),notify.params.buy_user_name,notify.params.is_buy_product_lang],'N级下线N购买租用矿机')}}:</span>
        <div class="flex align-center margin-left-xs fc-ff3636">
          <money-number class="money-number" :value="notify.params.buy_amount" :precision="coin_unit.balance"/>
<!--          <span class="money-unit">{{system.default_currency}}</span>-->
        </div>
      </div>

      <div class="flex align-center justify-between  padding-sm  border-radius-sm">
        <span class="fc-666">{{$t('CAN_GET_COMMISSION','可获得佣金')}}:</span>
        <div class="flex align-center margin-left-xs fc-ff3636">
          <money-number class="money-number" :value="notify.params.all_fee" :precision="coin_unit.balance"/>
<!--          <span class="money-unit">{{system.default_currency}}</span>-->
        </div>
      </div>

      <template v-if="notify.params.is_no_commission">
        <div class="flex flex-direction align-center padding-sm font-bold fc-ff3636">
          <span class="margin-bottom-xs">{{$t('BECAUSE_YOU_NOT_BUY','由于您当前没有购买矿机')}}</span>
          <span>{{$t('SO_YOU_NOT_GOT','所以无法获得佣金')}}</span>
        </div>
      </template>
      <template v-else>
        <div class="flex align-center justify-between  padding-sm  border-radius-sm" v-if="notify.params.is_buy_product">
          <span class="fc-666">{{$t('CURRENT_HAS_MINER','您当前购买的矿机是')}}:</span>
          <div class="flex align-center margin-left-xs fc-ff3636">
            <money-number class="money-number" :value="notify.params.my_product_buy_amount" :precision="coin_unit.balance"/>
<!--            <span class="money-unit">{{system.default_currency}}</span>-->
          </div>
        </div>

        <div class="flex align-center justify-between  padding-sm  border-radius-sm"  v-if="!notify.params.is_buy_product">
          <span class="fc-666">{{$t('CURRENT_RENT_MINER','您当前租用的矿机是')}}:</span>
          <div class="flex align-center margin-left-xs fc-ff3636">
            <money-number class="money-number" :value="notify.params.my_product_zhu_amount" :precision="coin_unit.balance"/>
<!--            <span class="money-unit">{{system.default_currency}}</span>-->
          </div>
        </div>

        <div class="flex align-center justify-between bg-f8ede5 padding-sm border-radius-sm">
          <span>{{$t('ACTUALLY_GOT_COMMISSION','实际获得佣金')}}:</span>
          <div class="flex align-center margin-left-xs fc-ff3636 font-bold">
            <money-number class="money-number" :value="notify.params.fee" :precision="coin_unit.balance"/>
<!--            <span class="money-unit">{{system.default_currency}}</span>-->
          </div>
        </div>
      </template>
    </div>

    <div class="margin-bottom text-center fc-ff3636 font-bold">
      {{$t('BUY_RENT_TO_N_GET_N',[(notify.params.is_buy_product?$t('BUY_TYPE'):$t('RENT_TYPE')),notify.params.buy_amount.toString(),notify.params.all_fee.toString()],'购买租用矿机满N可获得全部佣金N')}}
    </div>

    <!-- 购买矿机 -->
<!--    <div class="margin-bottom text-center bounce">-->
<!--      <span>{{$t('BUY_TO_GET_ALL','购买矿机获得全部的')}}</span>-->
<!--      <span class="font-bold fc-ff3636 margin-lr-xs">-->
<!--        <money-number :value="notify.params.all_fee"/>-->
<!--        <span class="money-unit">{{system.default_currency}}</span>-->
<!--      </span>-->
<!--      <span>{{$t('COMMISSION','佣金')}}</span>-->
<!--    </div>-->

    <!--  底部按钮-->
    <template>
      <van-button
          block
          round
          class="font-bold breath-btn border-radius-xs"
          @click="buyNow"
          color="#432af5"
      >
        <span v-if="!notify.params.is_no_commission">{{$t('BUY_MINER_NOW','立即购买矿机')}}</span>
        <span v-else>{{$t('UPGRADE_MINER','升级矿机')}}</span>
      </van-button>

      <van-button block class="font-bold margin-top border-radius-xs" plain @click="seeCommissionDesc" color="#432af5" v-if="!notify.see_all">
        <span>{{$t('SEE_COMMISSION_DESC','查看佣金说明')}}</span>
      </van-button>

      <van-button block class="font-bold margin-top border-radius-xs" plain @click="$emit('more')" color="#432af5" v-if="notify.see_all">
        <span>{{$t('SEE_ALL_NOTIFY','查看全部通知')}}</span>
      </van-button>
    </template>

    <van-popup v-model="showCommissionDesc" get-container="body" class="vw-80 border-radius" closeable>
      <div class="padding flex flex-direction">
        <div class="font-bold fs-16 text-center margin-bottom">
          {{$t('SEE_COMMISSION_DESC','查看佣金说明')}}
        </div>
        <div class="render-html">
          {{$t('COMMISSION_DESC_DETAIL','详细的佣金说明')}}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {Button, Popup} from "vant"
import MoneyNumber from "@/components/MoneyNumber";
import {Base} from "@/mixins";

export default {
  name: "SonCommissionNotify",
  components: {
    MoneyNumber,
    // MoneyNumber,
    [Popup.name]:Popup,
    [Button.name]:Button,
  },
  props: {
    notify: {
      type: Object,
      default: Object
    }
  },
  data: ()=> {
    return {
      showCommissionDesc: false
    }
  },
  mixins: [Base],
  methods: {
    seeCommissionDesc() {
      this.showCommissionDesc = true
    },
    read() {
      this.$emit('read')
      this.$emit('close')
    },
    buyNow() {
      this.$webEvent('下级佣金到账通知点击【立即购买】',this.$route.name+'页面')
      this.$emit('read')
      setTimeout(()=>{
        this.$bus.emit('scrollProducts')
      },500)
      this.$toRouter({name:'HomeMoney'})
    },
  }
}
</script>

<style lang="scss">
.son-commission-notify {
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