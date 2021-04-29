<template>
  <div
    @click="$router.push({ name: 'InvestDetail', query: { id: invest.product_id } })"
    class="invest-no-bg-card-old white-view flex flex-direction border-radius padding-lr padding-tb box-shadow"
  >
    <div class="flex align-center margin-bottom-sm">
      <div
        class="flex align-center justify-center margin-right-sm border-radius-xs fc-fff fs-10 bg-red"
        style="width:1.2rem"
      >
        {{ invest.product_type == "usdt" ? "USDT" : system.default_currency }}
      </div>
      <div
        class="text-nowrap text-ellipsis van-overflow-hidden flex-sub font-bold"
      >
        {{ invest.product_title }}
      </div>
    </div>
    <div class="flex justify-between">
      <div class="flex-twice flex flex-direction padding-left-xs">
        <template v-if="invest.is_over">
          <div class="fs-28 din-pro fc-ff3636">
            <money-number
              class="font-bold"
              :precision="1"
              :value="invest.interest"
            />
            <span class="money-unit">{{
              invest.product_type == "usdt" ? "USDT" : system.default_currency
            }}</span>
          </div>
          <div class="margin-bottom fs-12 fc-888">
            {{ $t("ARRIVED_PROFIT", "已发放收益") }}
          </div>
          <div class="fs-10 flex-sub fc-432af5 flex align-center">
            <img
              src="../assets/images/icon8@2x.png"
              class="size-15 margin-right-sm"
            />
            <span class="fc-432af5">{{ $t("HAS_EXPIRED", "已结束") }}</span>
          </div>
        </template>

        <template v-else>
          <div class="fs-26 din-pro fc-ff3636 flex align-baseline">
            <money-number
              class="font-bold"
              :day_dynamic="true"
              :value="invest.amount * invest.day_rate * 0.01"
            />
            <span class="money-unit">{{
              invest.product_type == "usdt" ? "USDT" : system.default_currency
            }}</span>
          </div>
          <div class="margin-bottom fs-12 fc-888">
            {{ $t("TODAY_PREDICT_PROFIT", "今日预估收益") }}
          </div>
          <div class="fs-10 flex-sub fc-432af5 flex align-center">
            <img
              src="../assets/images/icon8@2x.png"
              class="size-15 margin-right-sm"
            />
            <van-count-down style="color:#432af5" :time="invest.count_down" />
          </div>
        </template>
      </div>
      <div class="bg-432af5" style="opacity:0.06;width:1px"></div>
      <div class="flex-treble justify-between flex flex-direction padding-left">
        <div class="flex align-start margin-bottom-xs">
          <img
            src="../assets/images/icon6@2x.png"
            class="size-18 margin-right-sm"
            style="margin-top:0.09rem"
          />
          <div class="flex flex-direction">
            <div class="flex align-baseline fs-16">
              <money-number class="font-bold" :value="invest.amount" />
              <span class="money-unit">{{
                invest.product_type == "usdt" ? "USDT" : system.default_currency
              }}</span>
            </div>
            <div class="fs-12 fc-888 margin-right-xs">
              {{ $t("HOLD_AMOUNT", "持有金额") }}
            </div>
          </div>
        </div>

        <div class="flex align-start">
          <img
            src="../assets/images/icon7@2x.png"
            class="size-18 margin-right-sm"
            style="margin-top:0.09rem"
          />
          <div class="flex flex-direction">
            <div class="flex align-baseline fs-16">
              <money-number
                class="font-bold"
                :value="
                  invest.is_over
                    ? invest.interest
                    : invest.amount * invest.day_rate * 0.01 * invest.day_cycle
                "
              />
              <span class="money-unit">{{
                invest.product_type == "usdt" ? "USDT" : system.default_currency
              }}</span>
            </div>
            <div class="fs-12 fc-888">
              {{
                invest.is_over
                  ? $t("TOTAL_PROFIT", "总收益")
                  : $t("PREDICT_TOTAL_PROFIT", "预估总收益")
              }}
            </div>
          </div>
        </div>

        <!-- 如果 is_day_account 为 true, 显示一个已发放收益 -->
        <div
          class="flex align-start margin-top-xs"
          v-if="invest.is_day_account && !invest.is_over"
        >
          <img
            src="../assets/images/icon7@2x.png"
            class="size-18 margin-right-sm"
            style="margin-top:0.09rem"
          />
          <div class="flex flex-direction">
            <div class="flex align-baseline fs-16">
              <money-number class="font-bold" :value="invest.interest" />
              <span class="money-unit">{{
                invest.product_type == "usdt" ? "USDT" : system.default_currency
              }}</span>
            </div>
            <div class="fs-12 fc-888 margin-right-xs">
              {{ $t("ARRIVED_PROFIT", "已发放收益") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MoneyNumber from "@/components/MoneyNumber";
import { CountDown } from "vant";
import { Base } from "@/mixins";

export default {
  components: {
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
};
</script>

<style scoped lang="scss">
.invest-no-bg-card-old {

}
</style>
