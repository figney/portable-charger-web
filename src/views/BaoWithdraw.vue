<template>
  <div class="bao-withdraw-page app-appbar">
    <van-nav-bar
      :title="$t('WITHDRAW_TO_BALANCE', '转出到余额')"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />

    <template v-if="!transferSuccess">
      <div
        class="margin flex align-center padding-left-sm padding-right padding-tb-sm white-view border-radius box-shadow"
      >
        <img
          class="avatar border-radius-50 size-40 margin-right-sm"
          :src="currentChannelCover"
        />
        <div class="flex flex-direction flex-sub">
          <div class="fc-default">
            {{ currentChannel.title }}
            <span class="money-unit fc-coin">（{{currentChannel.type == "usdt" ? "USDT" : system.default_currency}}）</span>
          </div>
          <div class="fs-18 font-bold">
            <money-number
              :value="money_bao.balance"
              :precision="coin_unit.balance"
              v-if="currentChannel.type == 'balance'"
            />
            <money-number
              :value="money_bao.usdt_balance"
              :precision="coin_unit.usdt"
              v-if="currentChannel.type == 'usdt'"
            />
            <money-number
              :value="money_bao.give_balance"
              :precision="coin_unit.balance"
              v-if="currentChannel.type == 'give'"
            />
          </div>
        </div>
      </div>

      <div
        class="padding margin-lr margin-bottom white-view border-radius flex flex-direction box-shadow"
      >
        <div class="fs-18 font-bold margin-bottom-sm">
          {{ $t("TRANSFER_OUT_AMOUNT", "转出金额") }}
        </div>
        <van-field
          v-model="amount"
          type="number"
          :formatter="
            currentChannel.type == 'usdt' ? $usdtFormat : $balanceFormat
          "
          class="padding-lr-sm margin-bottom-sm border-radius-sm bg-f2f2f6 font-bold"
          :placeholder="$t('ENTER_TRANSFER_OUT_AMOUNT', '请输入转出金额')"
          @click-right-icon="useAllBalance"
        >
          <template #left-icon>
            <div class="fs-13 font-bold margin-right-xs">
              {{
                currentChannel.type == "usdt" ? "USDT" : system.default_currency
              }}
            </div>
          </template>
          <template #right-icon>
            <div class="fs-13 fc-432af5 font-400">{{ $t("ALL", "全部") }}</div>
          </template>
        </van-field>
        <div class="flex align-center margin-bottom">
          <img
            class="size-15 margin-right-xs"
            src="../assets/images/warning@2x.png"
            alt=""
          />
          <div class="fs-13">
            {{ $t("TRANSFER_OUT_NO_PROFIT", "转出金额将不再产生收益") }}
          </div>
        </div>
        <van-button
          :disabled="!allowWithdraw"
          block
          class="border-radius-sm"
          color="#432af5"
          @click="sureTransfer"
          >{{ $t("TRANSFER_OUT_SURE", "确认转出") }}</van-button
        >
      </div>
    </template>

    <!-- 转出成功 -->
    <div class="flex flex-direction" v-else>
      <div
        class="status-panel margin white-view border-radius box-shadow flex flex-direction align-center"
      >
        <div style="height:0.64rem"/>
        <img
          class="margin-bottom"
          src="../assets/images/success@2x.png"
          style="width:2.25rem"
        />
        <div class="margin-bottom-sm font-bold fs-24 text-center">
          {{ $t("TRANSFER_OUT_SUCCESS", "转出成功") }}
        </div>
        <div class="margin-bottom-sm fc-888 text-center">
          {{
            $t(
              "SUCCESS_TRANSFER_OUT_N_TO_ACCOUNT_BALANCE",
              [currentOpAmount],
              "成功转出 {0} 到账户余额"
            )
          }}
        </div>
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
  Row,
  Col,
  Button,
  RadioGroup,
  Radio,
  Popup,
} from "vant";
import { Toast } from "mand-mobile";

export default {
  components: {
    MoneyNumber,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  data: () => {
    return {
      amount: "",
      transferSuccess: false,
      defaultWalletType: "balance",
      currentChannel: {
        type: "balance",
        title: "",
      },
    };
  },
  computed: {
    allowWithdraw() {
      return !!this.amount && this.amount > 0;
    },
    currentChannelCover() {
      let src = ''
      if (this.currentChannel.type == 'usdt') {
        src = require('../assets/coin/USDT.svg')
      } else if (this.currentChannel.type == 'give') {
        src = require('../assets/coin/Give.png')
      } else {
        src = require(`../assets/coin/${this.system.default_currency}.svg`)
      }
      return src
    },
    currentOpAmount() {
      let unit = this.system.default_currency;
      if (this.currentChannel.type == "usdt") {
        unit = "USDT";
      }
      return this.$toThousands(this.amount) + " " + unit;
    },
  },
  mixins: [Base],
  created() {
    this.defaultWalletType = this.$route.query.w;
    this.currentChannel.title = this.$t(
      "OUT_TO_ACCOUNT_BALANCE",
      "转出到账户余额"
    );

    if (this.defaultWalletType == "usdt") {
      this.currentChannel = {
        type: "usdt",
        title: this.$t("OUT_TO_ACCOUNT_USDT", "转出到账户余额"),
      };
    } else if (this.defaultWalletType == "give") {
      this.currentChannel = {
        type: "give",
        title: this.$t("OUT_TO_ACCOUNT_GIVE", "转出到账户余额(赠送金)"),
      };
    } else {
      this.currentChannel = {
        type: "balance",
        title: this.$t("OUT_TO_ACCOUNT_BALANCE", "转出到账户余额"),
      };
    }
  },
  methods: {
    useAllBalance() {
      if (this.currentChannel.type == "balance") {
        this.amount = this.money_bao.balance;
      } else if (this.currentChannel.type == "usdt") {
        this.amount = this.money_bao.usdt_balance;
      } else if (this.currentChannel.type == "give") {
        this.amount = this.money_bao.give_balance;
      } else {
      }
    },
    sureTransfer() {
      Toast.loading("loading");
      this.$http
        .post("v1/takeOutMoneyBao", {
          fee: this.amount,
          wallet_type: this.currentChannel.type,
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
      this.transferSuccess = false;
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.bao-withdraw-page {
  min-height: calc(100vh - 1.23rem);

  .close-icon {
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }
}
</style>
