<template>
  <div
    @click="toProduct"
    class="white-view flex flex-direction border-radius padding-lr-sm padding-top padding-bottom-sm box-shadow invest-no-bg-card"
  >
    <div class="flex align-center">
      <div class="text-nowrap text-ellipsis van-overflow-hidden flex-sub font-bold">
        {{ invest.product_title }}
      </div>
    </div>
    <div class="flex flex-direction">

      <div class="flex flex-direction align-center padding-sm" style="border-bottom:1px solid rgba(67, 42, 245, 0.06);">
        <template v-if="invest.is_over">
          <div class="fs-28 din-pro fc-ff3636">
            <money-number
              :class="['font-bold',{'money-number':(invest.product_type!='usdt')}]"
              :precision="1"
              :value="invest.interest"
            />
            <span class="money-unit" v-if="invest.product_type=='usdt'">USDT</span>
          </div>
          <div class="fs-12 fc-888">
            {{ $t("ARRIVED_PROFIT", "已发放收益") }}
          </div>
          <div class="fs-10 margin-tb-sm padding-tb-xs bg-f8ede5 fc-666 text-center border-radius-xs" style="width:100%">
            <span>{{ $t("HAS_EXPIRED", "已结束") }}</span>
          </div>
        </template>

        <template v-else>
          <div class="fs-24 din-pro fc-ff3636 flex align-baseline">
<!--            <money-number-->
<!--              class="font-bold"-->
<!--              :day_dynamic="true"-->
<!--              :value="invest.amount * invest.day_rate * 0.01"-->
<!--            />-->
            <count-up
                :start="invest.day_date.this_s * invest.day_date.s_fee"
                :end="invest.day_date.day_fee"
                :duration="invest.day_date.residue_s"
                :precision="invest.product_type=='usdt'?coin_unit.usdt:coin_unit.balance"
                :class="['font-bold',{'money-number':(invest.product_type!='usdt')}]"
            />
            <span class="money-unit fc-coin" v-if="invest.product_type=='usdt'">USDT</span>
          </div>
          <div class="fs-12 fc-666">
            {{ $t("TODAY_PREDICT_PROFIT", "今日预估收益") }}
          </div>
          <div class="fs-10 margin-tb-sm padding-tb-xs bg-f7f9ff fc-666 text-center border-radius-xs in-progress" style="width:100%">
            <span>{{ $t("IN_PROGRESS", "进行中") }}</span>
          </div>
        </template>
      </div>

      <div class="flex align-center padding-lr-sm padding-tb-sm" style="border-bottom:1px solid rgba(67, 42, 245, 0.06);">
        <div class="fs-12 fc-666 margin-right-xs flex-sub">
          <span v-if="invest.user_max_buy">{{ $t("UNIT_PRICE", "单价") }}:</span>
          <span v-else>{{$t('BUY_MINER_PRICE','价格')}}:</span>
        </div>
        <div class="flex align-baseline">
          <money-number
              :class="['font-bold fc-432af5 ',{'money-number':(invest.product_type!='usdt')}]"
              :value="invest.min_money"
          />
          <span class="money-unit fc-coin" v-if="invest.product_type=='usdt'">USDT</span>
          <span class="margin-left-xs"> / {{$t('PICS','台')}}</span>
        </div>
      </div>

      <div class="flex align-center padding-lr-sm padding-tb-sm" style="border-bottom:1px solid rgba(67, 42, 245, 0.06);">
        <div class="fs-12 fc-666 margin-right-xs flex-sub">
          {{ $t("RENT_AMOUNT", "租赁数量") }}:
        </div>
        <div class="flex align-baseline">
          <money-number class="font-bold fc-432af5" :value="Math.floor(invest.amount / invest.min_money)" />
          <span class="margin-left-xs">{{$t('PICS','台')}}</span>
        </div>
      </div>

      <div class="flex align-center padding-lr-sm padding-tb-sm" style="border-bottom:1px solid rgba(67, 42, 245, 0.06);">
        <div class="fs-12 fc-666 margin-right-xs flex-sub">
          {{ $t("REST_TIME", "剩余时间") }}:
        </div>
        <div class="flex align-baseline">
          <van-count-down
              class="font-bold" style="color:#432af5"
              :time="invest.count_down * 1000"
              :format="invest.count_down < (24 * 60 * 60) ? (invest.count_down < 60 * 60 ? 'mm m ss s' : 'HH h mm m ss s') : 'DD D HH h mm m ss s'"
          />
        </div>
      </div>

      <div class="flex align-center padding-lr-sm padding-tb-sm" style="border-bottom:1px solid rgba(67, 42, 245, 0.06);">
        <div class="fs-12 fc-666 margin-right-xs flex-sub">
          {{
            invest.is_over
                ? $t("TOTAL_PROFIT", "总收益")
                : $t("PREDICT_TOTAL_PROFIT", "预估总收益")
          }}:
        </div>
        <div class="flex align-baseline fc-ff3636">
          <money-number
              :class="['font-bold',{'money-number':(invest.product_type!='usdt')}]"
              :precision="invest.product_type=='usdt' ? coin_unit.usdt : coin_unit.balance"
              :value="
                  invest.is_over
                    ? invest.interest
                    : invest.amount * invest.day_rate * 0.01 * invest.day_cycle
                "
          />
          <span class="money-unit fc-coin" v-if="invest.product_type=='usdt'">USDT</span>
        </div>
      </div>

      <!-- 如果 is_day_account 为 true, 显示一个已发放收益 -->
      <div
          class="flex align-center padding-lr-sm padding-tb-sm"
          style="border-bottom:1px solid rgba(67, 42, 245, 0.06);"
          v-if="invest.is_day_account && !invest.is_over && invest.interest > 0"
      >
        <div class="fs-12 fc-666 margin-right-xs flex-sub">
          {{ $t("ARRIVED_PROFIT", "已发放收益") }}:
        </div>
        <div class="flex align-baseline fc-ff3636">
          <money-number
              :class="['font-bold',{'money-number':(invest.product_type!='usdt')}]"
              :value="invest.interest"
          />
          <span class="money-unit fc-coin" v-if="invest.product_type=='usdt'">USDT</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MoneyNumber from "@/components/MoneyNumber";
import { CountDown } from "vant";
import { Base } from "@/mixins";
import CountUp from "@/components/CountUp";
import {Toast} from "mand-mobile";

export default {
  components: {
    CountUp,
    MoneyNumber,
    [CountDown.name]: CountDown,
  },
  props: {
    invest: {
      type: Object,
      default: Object,
    },
  },
  mixins: [Base],
  methods: {
    toProduct() {
      this.$webEvent(`点击查看详情-[ID:${this.invest.product_id}]`, this.$route.name+'页面')
      if (this.invest.can_buy) {
        this.$toRouter({ name: 'InvestDetail', query: { id: this.invest.product_id } })
      } else {
        Toast.info(this.$t('ALREADY_BUY_BEGINNER_PRODUCT','你已经享受过新人福利，请选择其他产品'))
      }
    }
  }
};
</script>

<style scoped lang="scss">
.invest-no-bg-card {
  .in-progress {
    background-image: linear-gradient(
            45deg,
            rgba(67,42,245,0.1) 25%,
            #f7f9ff 25%,
            #f7f9ff 50%,
            rgba(67,42,245,0.1) 50%,
            rgba(67,42,245,0.1) 75%,
            #f7f9ff 75%,
            #f7f9ff 100%
    );
    background-size: 31px 100%;
    background-repeat: repeat-x;
    animation: animateProgress 1s linear infinite;
  }
}

@keyframes animateProgress {
  0% {
    background-position: 31px 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
