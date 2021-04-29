<template>
  <div
    @click="$router.push({ name: 'InvestDetail', query: { id: invest.id } })"
    class="bg-p-card-old white-view flex flex-direction border-radius padding box-shadow"
  >
    <div class="flex align-center margin-bottom-sm">
      <div
          class="flex align-center justify-center margin-right-sm border-radius-xs fc-fff fs-10 bg-red"
          style="width:1.2rem"
      >
        {{ invest.type == "usdt" ? "USDT" : system.default_currency }}
      </div>
      <div
        class="fs-17 font-bold margin-right-sm van-overflow-hidden text-nowrap text-ellipsis"
      >
        {{ invest.title }}
      </div>
      <!--        <img class="margin-right-xs" src="../../assets/images/hot_icon@2x.png" style="height:12px"/>-->
      <!--        <div class="fs-10 fc-ff3636 flex-sub text-nowrap text-ellipsis van-overflow-hidden">{{item.describe}}</div>-->
      <div class="flex-sub margin-right-sm"></div>
      <div
        class="fs-12 font-bold margin-right-xs fc-ff3636 van-overflow-hidden text-nowrap text-ellipsis"
      >
        {{ invest.describe }}
      </div>
    </div>
    <div
      class="margin-bottom-sm van-overflow-hidden border-radius-xs bg-f7f9ff"
      style="height:3.4rem"
    >
      <img
        :src="invest.cover"
        style="width:100%;height:3.4rem;object-fit:cover"
      />
    </div>
    <div class="flex justify-between">
      <div class="flex-twice flex flex-direction align-center">
        <div class="fs-20 din-pro fc-ff3636 font-bold">
          {{ invest.day_rate * 365 }}%
        </div>
        <div class="fs-12 fc-888">{{ $t("YEAR_RATE", "年化率") }}</div>
      </div>
      <div class="bg-432af5" style="opacity:0.06;width:1px"></div>
      <div class="flex-twice flex flex-direction align-center">
        <div class="fs-20 din-pro fc-ff3636 money-number-small">
          <money-number
            class="font-bold"
            :value="invest.min_money"
            :precision="0"
          />
        </div>
        <div class="fs-12 fc-888">{{ $t("START_MONEY", "起投金额") }}</div>
      </div>
      <div class="bg-432af5" style="opacity:0.06;width:1px"></div>
      <div class="flex-twice flex flex-direction align-center">
        <div class="fs-20 din-pro font-bold">
          {{ $t("N_DAY", [invest.day_cycle.toString()], "N天") }}
        </div>
        <div class="fs-12 fc-888">{{ $t("INVEST_CYCLE", "项目周期") }}</div>
      </div>
    </div>
    <van-button
      class="border-radius-sm margin-top-sm"
      color="#432af5"
      block
      v-if="has_button"
    >
      <span class="fs-16 font-bold">{{ $t("INVEST_NOW", "立即投资") }}</span>
    </van-button>
  </div>
</template>

<script>
import MoneyNumber from "@/components/MoneyNumber";
import { Button } from "vant";
import {Base} from "@/mixins";

export default {
  components: {
    MoneyNumber,
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
  mixins: [Base]
};
</script>

<style lang="scss">
.bg-p-card-old {

}
</style>
