<template>
  <div
    @click="toProduct"
    class="bg-p-card white-view flex flex-direction border-radius-sm padding box-shadow"
  >
    <div class="flex align-center margin-bottom-xs">
      <div
        class="fs-16 font-bold van-overflow-hidden text-nowrap text-ellipsis"
      >
        {{ invest.title}}
      </div>
    </div>

    <div style="border-bottom:1px solid rgba(67,42,245,0.06)"></div>
    <template v-for="(attr,i) in invest.attrs">
      <van-cell
        :key="'card-attr-'+invest.id+i"
        v-if="i!=1"
        class="padding-0 padding-tb-xs fs-12"
        :border="false"
        style="border-bottom:1px solid rgba(67,42,245,0.06)"
      >
        <div class="fc-888" slot="title">{{attr.name}}:</div>
        <div class="fc-default flex align-center" slot="default">{{attr.value}}</div>
      </van-cell>
    </template>

    <van-cell
        class="padding-0 padding-tb-xs fs-12"
        :border="false"
        style="border-bottom:1px solid rgba(67,42,245,0.06)"
    >
      <div class="fc-888" slot="title">
        <span v-if="invest.user_max_buy">{{ $t("UNIT_PRICE", "单价") }}:</span>
        <span v-else>{{$t('BUY_MINER_PRICE','价格')}}:</span>
      </div>
      <div class="fc-default flex align-center" slot="default">
        <template v-if="invest.type=='usdt'">
          <money-number :value="invest.min_money"/>
          <span class="money-unit fc-coin">USDT</span>
        </template>
        <template v-else>
          <money-number class="money-number" :value="invest.min_money"/>
        </template>
        <span class="margin-lr-xs">/</span>
        <span>{{$t('PICS','台')}}</span>
      </div>
    </van-cell>
    <van-cell
        class="padding-0 padding-tb-xs fs-12"
        :border="false"
        style="border-bottom:1px solid rgba(67,42,245,0.06)"
    >
      <div class="fc-888" slot="title">{{$t('PREDICT_PROFIT','预计收益')}}:</div>
      <div class="fc-default flex align-center text-nowrap" slot="default">
        <template v-if="invest.user_max_buy">
          <money-number
              :class="[{'money-number':(invest.type!='usdt')}]"
              :value="calcTotalProfit"
          />
          <!--        <span class="money-unit fc-coin">{{invest.type=='usdt'?'USDT':system.default_currency}}</span>-->
          <span class="margin-lr-xs">~</span>
          <money-number
              :class="[{'money-number':(invest.type!='usdt')}]"
              :value="Math.max(invest.user_max_buy, Math.floor(invest.user_max_amount / invest.min_money)) * calcTotalProfit"
          />
        </template>
        <template v-else>
          <money-number
              :class="[{'money-number':(invest.type!='usdt')}]"
              :value="invest.type=='usdt'?$usdtFormat(invest.min_money * invest.day_rate * invest.day_cycle / 100):$balanceFormat(invest.min_money * invest.day_rate * invest.day_cycle / 100)"
          />
        </template>
        <span class="money-unit fc-coin" v-if="invest.type=='usdt'">USDT</span>
      </div>
    </van-cell>

    <template v-for="(attr,i) in invest.attrs">
      <van-cell
          :key="'card-attr-'+invest.id+i"
          v-if="i==1"
          class="padding-0 padding-tb-xs fs-12"
          :border="false"
          style="border-bottom:1px solid rgba(67,42,245,0.06)"
      >
        <div class="fc-888" slot="title">{{attr.name}}:</div>
        <div class="fc-default flex align-center" slot="default">{{attr.value}}</div>
      </van-cell>
    </template>

    <div class="padding-0 padding-tb-xs fs-14 font-bold fc-ff3636 text-center flex align-center justify-center" style="min-height:0.96rem;border-bottom:1px solid rgba(67,42,245,0.06)">
      <span v-if="invest.day_cycle < productSep">{{$t('QUIT_PLEDGE','到期后自动退回押金')}}</span>
      <span v-else>{{$t('AFTER_BUY_MINER_ITS_YOURS','购买后 产权永久属于您本人，大概寿命为6年')}}</span>
    </div>

    <div class="flex align-center margin-top-sm" v-if="has_button">
      <van-button
          class="border-radius-sm fc-fff text-nowrap padding-lr-xl"
          color="#432af5"
          plain
          @click.stop="toDeposit"
      >
        {{$t('DEPOSIT_WEB','充值')}}
      </van-button>

      <div class="margin-lr-xs"/>

      <van-button
          class="border-radius-sm bg-gradient fc-fff"
          block
      >
        <span class="fs-16 font-bold">{{ $t("MINING_NOW", "立即挖矿") }}</span>
      </van-button>
    </div>
  </div>
</template>

<script>
import MoneyNumber from "@/components/MoneyNumber";
import { Button, Cell } from "vant";
import {Base} from "@/mixins";
import {Toast} from "mand-mobile";

export default {
  components: {
    MoneyNumber,
    [Cell.name]: Cell,
    [Button.name]: Button,
  },
  props: {
    invest: {
      type: Object,
      default: Object,
    },
    has_button: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    calcTotalProfit() {
      return this.invest.type=='usdt'
          ? this.$usdtFormat(this.invest.min_money * this.invest.day_rate * this.invest.day_cycle / 100)
          : this.$balanceFormat(this.invest.min_money * this.invest.day_rate / 100)
    }
  },
  mixins: [Base],
  methods: {
    toProduct() {
      this.$webEvent(`点击查看详情-[ID:${this.invest.id}]`, this.$route.name+'页面')
      if (this.invest.can_buy) {
        this.$toRouter({ name: 'InvestDetail', query: { id: this.invest.id } })
      } else {
        Toast.info(this.$t('ALREADY_BUY_BEGINNER_PRODUCT','你已经享受过新人福利，请选择其他产品'))
      }
    },
    toDeposit() {
      this.$webEvent(`点击产品详情上的充值按钮`, this.$route.name+'页面')
      this.$toRouter({ name: 'Deposit' })
    }
  }
};
</script>

<style lang="scss">
.bg-p-card {

}
</style>
