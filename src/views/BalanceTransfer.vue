<template>
  <div class="balance-transfer-page app-appbar white-view flex flex-direction">
    <template v-if="!transferSuccess">
      <van-nav-bar
        :title="$t('BALANCE_TRANSFER', '余额转换')"
        fixed
        left-arrow
        :right-text="$t('HISTORY', '记录')"
        @click-left="$router.go(-1)"
        @click-right="$router.push({ name: 'TransferHistory' })"
      />
      <div class="padding margin white-view border-radius box-shadow flex align-center">
        <span class="fs-12 fc-888">{{$t('CURRENT_RATE','当前汇率')}}</span>
        <div class="flex-sub"/>
        <span v-if="source.type=='usdt'">1 USDT ≈ {{system.usdt_money_rate}} {{system.default_currency}}</span>
        <span v-else>1 {{system.default_currency}} ≈ {{$usdtFormat(1/system.usdt_money_rate)}} USDT</span>
      </div>
      <div
        class="padding-lr padding-bottom margin-lr margin-bottom white-view border-radius flex flex-direction box-shadow"
      >
        <van-row
          class="margin-top padding-bottom-sm position-re" style="margin-bottom:0.8rem"
        >
          <van-col :span="12" class="flex justify-start">
            <img
              :src="
                source.type == 'usdt'
                  ? require('../assets/coin/USDT.svg')
                  : require('../assets/coin/' +
                      system.default_currency +
                      '.svg')
              "
              class="margin-right-xs size-32"
              v-if="system.default_currency"
            />
            <span class="flex align-center">{{ source.title }}</span>
          </van-col>

          <van-col :span="12" class="flex justify-end align-center">
            <img
              :src="
                target.type == 'usdt'
                  ? require('../assets/coin/USDT.svg')
                  : require('../assets/coin/' +
                      system.default_currency +
                      '.svg')
              "
              class="margin-right-xs size-32"
              v-if="system.default_currency"
            />
            <span class="flex align-center">{{ target.title }}</span>
          </van-col>

          <div class="exchange-icon">
            <div
              class="img-box padding-xs border-radius-50 flex align-center justify-center"
            >
              <img src="../assets/images/exchange.png" @click="exchange" />
            </div>
          </div>
        </van-row>

        <div
          class="flex align-center border-radius-sm margin-bottom"
        >
          <van-row>
            <van-col :span="10">
              <van-field
                class="padding-0 font-bold fs-16 din-pro"
                style="border-bottom:1px solid rgba(67, 42, 245, 0.08)"
                type="number"
                v-model="amount"
                clearable
                :formatter="
                  source.type == 'usdt' ? $usdtFormat : $balanceFormat
                "
                :placeholder="$t('ENTER_TRANSFER_AMOUNT', '请输入转换金额')"
              >
              </van-field>
            </van-col>
            <van-col :span="4"/>
            <van-col :span="10">
              <van-field
                class="padding-0 opacity-70 font-bold fs-16 din-pro"
                style="border-bottom:1px solid rgba(67, 42, 245, 0.08)"
                input-align="right"
                type="number"
                readonly
                :value="calcTargetAmount"
                :formatter="
                  target.type == 'usdt' ? $usdtFormat : $balanceFormat
                "
                :placeholder="$t('TRANSFERED_AMOUNT', '获得数量')"
              >
              </van-field>
            </van-col>
          </van-row>
        </div>

        <div class="flex align-center border-radius-sm din-pro">
          <span class="text-nowrap margin-right-xs"
            >{{ $t("AVAILABLE", "可用") }}：</span
          >
          <span class="font-bold margin-right-sm">
            {{
              source.type == "usdt"
                ? $usdtFormat(all_property.usdt.usable,true)
                : $balanceFormat(all_property.balance.usable,true)
            }}
          </span>
          <div class="fc-432af5" @click="useAllBalance">
            {{ $t("ALL", "全部") }}
          </div>
        </div>
      </div>

      <div class="margin-lr margin-bottom">
        <van-button
          :disabled="!allowSubmit"
          class="border-radius-xs font-bold"
          block
          color="#432af5"
          @click="startTransfer"
        >
          {{ $t("SUBMIT_ORDER", "提交订单") }}
        </van-button>
      </div>
    </template>

    <!-- 划转成功   -->
    <div class="flex flex-direction" v-else>
      <van-nav-bar
        :title="$t('BALANCE_TRANSFER', '余额转换')"
        fixed
        left-arrow
        :right-text="$t('HISTORY', '记录')"
        @click-left="finishTransfer"
        @click-right="$router.push({ name: 'TransferHistory' })"
      />
      <div
        class="status-panel margin white-view border-radius box-shadow flex flex-direction align-center"
      >
        <div style="height:2.8rem"></div>
        <img
          class="margin-bottom"
          src="../assets/images/success@2x.png"
          style="width:2.25rem"
        />
        <div class="margin-bottom-sm font-bold fs-24 text-center">
          {{ $t("TRANSFER_SUCCESS", "转换成功") }}
        </div>
        <!--        <div class="margin-bottom fc-888 text-center">{{$t('SUCCESS_TRANSFER_IN_N_TO_BALANCE','成功转入 100,000IDR 余额')}}</div>-->
        <div class="margin padding-lr" style="width:100%">
          <van-button
            class="border-radius-xs font-bold"
            block
            color="#432af5"
            @click="finishTransfer"
            >{{ $t("FINISH", "完成") }}</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Base } from "@/mixins";
import MoneyNumber from "@/components/MoneyNumber";
import {
  NavBar,
  Icon,
  Field,
  Button,
  RadioGroup,
  Radio,
  Popup,
  Col,
  Row,
} from "vant";
import { Toast } from "mand-mobile";

export default {
  components: {
    // MoneyNumber,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data: () => {
    return {
      transferSuccess: false,
      amount: "",
      source: {
        type: "balance",
        title: "",
      },
      target: {
        type: "usdt",
        title: "USDT",
      },
    };
  },
  computed: {
    allowSubmit() {
      return this.amount != 0;
    },
    calcTargetAmount() {
      if (!this.amount) {
        return "";
      }
      return this.source.type == "usdt"
        ? parseFloat((this.amount * this.system.usdt_money_rate).toFixed(2))
        : parseFloat((this.amount / this.system.usdt_money_rate).toFixed(8));
    },
  },
  mixins: [Base],
  created() {
    this.source.title = this.$t("BALANCE_WEB", "余额");
  },
  mounted() {},
  methods: {
    exchange() {
      let tmp = this.source;
      this.source = this.target;
      this.target = tmp;
      this.amount = "";
    },
    useAllBalance() {
      if (this.source.type == "usdt") {
        this.amount = this.all_property.usdt.usable;
      } else {
        this.amount = this.all_property.balance.usable;
      }
    },
    startTransfer() {
      Toast.loading("loading");
      this.$http
        .post("v1/walletTransform", {
          fee: Number(this.amount),
          to_balance: this.source.type == "usdt",
        })
        .then((res) => {
          this.transferSuccess = true;
          this.$store.dispatch("refreshUser");
          Toast.hide();
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
    finishTransfer() {
      this.amount = "";
      this.transferSuccess = false;
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.balance-transfer-page {
  min-height: calc(100vh);

  .close-icon {
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }

  .van-radio__icon {
    i {
      border-width: 2px !important;
    }
  }

  .van-radio__icon--checked {
    i {
      border: none !important;
    }
  }

  .exchange-icon {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(67, 42, 245, 0.08);

    .img-box {
      height: 1rem;
      transform: translate(0, 58%);
      background: #fff;
      padding: 0 0.375rem;

      img {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid rgba(67, 42, 245, 0.2);
        padding: 0.16rem;
        height: 0.86rem;
        width: 0.86rem;
      }
    }
  }
}
</style>
