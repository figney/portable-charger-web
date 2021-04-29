<template>
  <!-- USDT充值弹窗 -->
  <van-popup
      get-container=".deposit-page"
      v-model="showUsdtPay"
      round
      position="bottom"
      class="margin-tb border-radius no-bg padding-lr usdt-pay-component"
  >
    <div
        class="flex flex-direction white-view border-radius padding position-re box-shadow"
    >
      <van-icon
          size="0.52rem"
          name="cross"
          color="#432af5"
          class="position-ab close-icon"
          @click="showUsdtPay = false"
      />
      <div class="font-bold fs-18 text-center margin-bottom">
        {{ $t("USDT_PAY", "USDT付款") }}
      </div>
      <div
          class="margin-bottom-sm bg-f2f2f6 border-radius-sm padding-sm flex align-center justify-center"
          v-if="amount"
      >
        <div class="fs-18 flex justify-center align-center">
          <div class="margin-right">{{ $t("NEED_PAY", "需支付") }}</div>
          <div class="font-bold fc-432af5">
            <money-number
                :value="parseFloat(amount)"
                :precision="0"
                :showSuffix="false"
            />
            <span>USDT</span>
          </div>
        </div>
      </div>
      <div class="bounce fc-ff3636 text-center margin-top-xs">{{$t('USE_TRC20_DEPOSIT','请使用USDT_TRC20进行充值')}}</div>
      <div class="flex align-center justify-center margin-bottom-sm" style="height:4.2rem">
        <vue-qrcode
            class="bg-f2f2f6"
            style="width:4.2rem;height:4.2rem"
            :value="usdtAddress"
            :options="{ width: 200 }"
            tag="img"
            v-if="usdtAddress"
        />
        <van-loading v-else></van-loading>
      </div>
      <div
          class="margin-bottom bg-f2f2f6 border-radius-xs padding-tb-xs padding-lr-sm flex align-center"
          @click="$copyText(usdtAddress)"
      >
        <div
            class="fs-12 flex-sub text-nowrap text-ellipsis van-overflow-hidden"
        >
          {{ usdtAddress }}
        </div>
        <img class="size-18" src="../assets/images/copy@2x.png" alt="" />
      </div>
      <van-button
          class="font-bold border-radius-xs"
          block
          color="#432af5"
          @click="$copyText(usdtAddress)"
      >{{ $t("COPY_ADDRESS", "复制地址") }}</van-button
      >
    </div>
  </van-popup>
</template>

<script>
import { Popup, Button, Icon, Loading } from "vant"
import MoneyNumber from "@/components/MoneyNumber";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import {Toast} from "mand-mobile";

export default {
  components: {
    MoneyNumber,
    VueQrcode,
    [Popup.name]:Popup,
    [Button.name]:Button,
    [Icon.name]:Icon,
    [Loading.name]:Loading
  },
  data: ()=> {
    return {
      showUsdtPay: false,
      usdtAddress: '',
      amount: 0,
    }
  },
  mounted() {
    this.$bus.on('usdtDeposit', this.onDeposit)
  },
  methods: {
    onDeposit(data) {
      this.$webEvent('打开USDT充值弹窗',this.$route.name+'页面')
      this.amount = data.amount || 0
      if (this.usdtAddress) {
        this.showUsdtPay = true
      } else {
        Toast.loading('loading')
        this.$http
          .get("v1/usdtAddress", {
            params: {
              channel_id: data.id,
            },
          })
          .then((res) => {
            Toast.hide()
            this.usdtAddress = res.data.address;
            this.showUsdtPay = true;
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
      }
    }
  }
}
</script>

<style lang="scss">
.usdt-pay-component {
  .close-icon {
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }
}
</style>