<template>
  <div class="wallet-page app-appbar flex flex-direction">
    <van-nav-bar
      class="base-header"
      :border="false"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div
      class="bg-432af5 border-radius-bottom padding-lr padding-tb-xs"
      style="height:7rem"
    >
      <!--      <van-icon-->
      <!--        name="arrow-left"-->
      <!--        color="#ffffff"-->
      <!--        size="0.5rem"-->
      <!--        style="font-weight:900;margin-left:-4px"-->
      <!--        class="margin-bottom-xs"-->
      <!--        @click="$router.go(-1)"-->
      <!--      />-->
      <user-header :title="$t('MY_FUNDS', '我的资产')" />
    </div>

    <div
      class="flex flex-direction margin white-view padding-lr padding-tb-xs border-radius shadow-light"
      style="margin-top:-5.4rem"
    >
      <div class="white-view border-radius shadow-light">
        <van-tabs
          class="tabs-bottom-line"
          line-height="0.09rem"
          line-width="33.3%"
          color="#432af5"
          v-model="currentWalletType"
        >
          <van-tab
            v-for="(tab, i) in system.wallet_type"
            :key="'currency-tab' + i"
            :name="tab.key"
          >
            <template #title>
              <div class="fs-12">
                <span class="fs-14">{{ tab.value }}</span>
              </div>
            </template>
            <template #default>
              <div class="flex flex-direction padding-sm">
                <div class="flex align-baseline margin-bottom-sm fs-30 font-bold">
                  <money-number
                    class="money-number"
                    :value="all_property.balance.property"
                    :precision="coin_unit.balance"
                    v-if="tab.key == 'balance'"
                  />
                  <money-number
                    :value="all_property.usdt.property"
                    :precision="coin_unit.usdt"
                    v-if="tab.key == 'usdt'"
                  />
                  <money-number
                    class="money-number"
                    :value="all_property.give.property"
                    :precision="coin_unit.balance"
                    v-if="tab.key == 'give'"
                  />
                  <span class="money-unit fc-coin" v-if="tab.key=='usdt'">USDT</span>
                </div>

                <div class="flex align-center flex-wrap">
                  <div
                    class="border-radius-xs bg-432af5 fs-12 fc-fff padding-tb-xs padding-lr-sm flex align-center margin-bottom-sm margin-right-sm"
                  >
                    <span class="margin-right-xs">{{
                      $t("AVAILABLE_FUNDS", "可用金额")
                    }}</span>
                    <money-number
                      class="font-bold money-number"
                      :value="all_property.balance.usable"
                      :precision="coin_unit.balance"
                      v-if="tab.key == 'balance'"
                    />
                    <money-number
                      class="font-bold"
                      :value="all_property.usdt.usable"
                      :precision="coin_unit.usdt"
                      v-if="tab.key == 'usdt'"
                    />
                    <money-number
                      class="font-bold money-number"
                      :value="all_property.give.usable"
                      :precision="coin_unit.balance"
                      v-if="tab.key == 'give'"
                    />
                    <span class="money-unit" v-if="currentWalletType=='usdt'">USDT</span>
                  </div>
                  <div
                    class="border-radius-xs fs-12 fc-fff padding-tb-xs padding-lr-sm flex align-center margin-bottom-sm"
                    style="background:#999"
                  >
                    <span class="margin-right-xs">{{
                      $t("FROZEN_FUNDS", "冻结金额")
                    }}</span>
                    <money-number
                      class="font-bold money-number"
                      :value="all_property.balance.freeze"
                      :precision="coin_unit.balance"
                      v-if="tab.key == 'balance'"
                    />
                    <money-number
                      class="font-bold"
                      :value="all_property.usdt.freeze"
                      :precision="coin_unit.usdt"
                      v-if="tab.key == 'usdt'"
                    />
                    <money-number
                      class="font-bold money-number"
                      :value="all_property.give.freeze"
                      :precision="coin_unit.balance"
                      v-if="tab.key == 'give'"
                    />
                    <span class="money-unit" v-if="currentWalletType=='usdt'">USDT</span>
                  </div>
                </div>
              </div>
            </template>
          </van-tab>
        </van-tabs>
      </div>
      <div class="flex align-start justify-around padding-tb fs-12 text-center">
        <div
          class="flex flex-direction align-center"
          style="width:25%"
          @click="$router.push({ name: 'HomeMoney' })"
        >
          <img
            src="../assets/images/home_icon1@2x.png"
            alt=""
            class="margin-bottom-sm size-45"
          />
          <span>{{ $t("TRY_IT", "体验") }}</span>
        </div>
        <div
          class="flex flex-direction align-center van-overflow-hidden"
          style="width:25%"
          @click="$router.push({ name: 'BalanceTransfer' })"
        >
          <img
            src="../assets/images/home_icon2@2x.png"
            alt=""
            class="margin-bottom-sm size-45"
          />
          <span>{{ $t("BALANCE_TRANSFER", "余额转换") }}</span>
        </div>
        <div
          class="flex flex-direction align-center van-overflow-hidden"
          style="width:25%"
          @click="$router.push({ name: 'Withdraw' })"
        >
          <img
            src="../assets/images/home_icon3@2x.png"
            alt=""
            class="margin-bottom-sm size-45"
          />
          <span>{{ $t("WITHDRAW_WEB", "提现") }}</span>
        </div>
        <div
          class="flex flex-direction align-center van-overflow-hidden"
          style="width:25%"
          @click="$router.push({ name: 'Deposit' })"
        >
          <img
            src="../assets/images/home_icon4@2x.png"
            alt=""
            class="margin-bottom-sm size-45"
          />
          <span>{{ $t("DEPOSIT_WEB", "充值") }}</span>
        </div>
      </div>
    </div>

    <div class="margin-lr margin-bottom-sm flex align-center">
      <div
        class="margin-right-xs border-radius-50 bg-432af5 size-13 flex align-center justify-center"
      >
        <div class="border-radius-50 white-view size-5 box-shadow"></div>
      </div>
      <span class="font-bold fs-18">{{ $t("MY_MINING", "我的矿机") }}</span>
      <div class="flex-sub"></div>
      <div
        class="fs-12 fc-888 margin-right-xs"
        @click="$router.push({ name: 'Invest' })"
      >
        {{ $t("SEE_ALL", "查看全部") }}
      </div>
      <van-icon name="arrow" color="#888888" size="0.32rem" />
    </div>

    <div class="position-re flex flex-direction" style="min-height:2.8rem">
      <template v-if="!loadingWallet">
        <template v-if="invest.length">
          <no-bg-p-card
            v-for="(item, i) in invest"
            :key="'invest-item-' + i"
            :invest="item"
            class="margin-lr margin-bottom"
          />
        </template>

        <div
          class="white-view flex flex-direction border-radius margin-lr margin-bottom padding-tb box-shadow"
          v-else
        >
          <van-empty
            style="padding: 0.1rem 0.2667rem"
            image-size="1.6rem"
            :image="require('../assets/images/default1@2x.png')"
            :description="$t('NO_MORE', '没有更多了')"
          >
            <van-button
              size="small"
              round
              color="#432af5"
              class="padding-lr-lg"
              @click="$router.push({ name: 'HomeMoney' })"
              >{{ $t("TO_BUY", "去购买") }}</van-button
            >
          </van-empty>
        </div>
      </template>
      <loading-view class="white-view border-radius margin" v-else/>
    </div>

    <div class="position-re flex flex-direction" style="min-height:2.8rem">
      <template v-if="!loadingRecord">
        <div class="margin-lr margin-bottom-sm flex align-center">
          <div
              class="margin-right-xs border-radius-50 bg-432af5 size-13 flex align-center justify-center"
          >
            <div class="border-radius-50 white-view size-5 box-shadow"></div>
          </div>
          <span class="font-bold fs-18">{{ $t("TRANS_HISTORY", "交易记录") }}</span>
          <div class="flex-sub"></div>
          <div
              class="fs-12 fc-888 margin-right-xs"
              @click="$router.push({ name: 'WalletHistory' })"
          >
            {{ $t("ALL_HISTORY", "全部记录") }}
          </div>
          <van-icon name="arrow" color="#888888" size="0.32rem" />
        </div>

        <div
            class="white-view flex flex-direction border-radius margin-lr margin-bottom padding-tb box-shadow"
            v-if="history.length"
        >
          <van-cell center v-for="(item, i) in history" :key="'wallet-log' + i">
            <template #icon>
              <div
                  :class="[
              'size-8',
              'border-radius-50',
              'margin-right-sm',
              { 'bg-red': item.fee > 0 },
              { 'bg-432af5': item.fee <= 0 },
            ]"
              ></div>
            </template>
            <template #title>
              <div class="font-bold">{{ item.action_type }}</div>
            </template>
            <template #label>
              <div class="fc-888 fs-12">
                {{ $localTime(item.created_at) }}
              </div>
            </template>
            <template #default>
              <div
                  :class="[
              'fs-12',
              'font-bold',
              'din-pro',
              { 'fc-ff3636': item.fee > 0 },
              { 'fc-default': item.fee <= 0 },
            ]"
              >
                <span>{{ item.wallet_type }}</span>
                <span style="margin:0 0.05rem">{{ item.fee > 0 ? "+" : "-" }}</span>
                <span>{{ Math.abs(item.fee) }}</span>
              </div>
            </template>
          </van-cell>
        </div>
        <div
            class="white-view flex flex-direction border-radius margin-lr margin-bottom padding-tb box-shadow"
            v-else
        >
          <van-empty
              style="padding:0.52rem"
              image-size="1.8rem"
              :image="require('../assets/images/default1@2x.png')"
              :description="$t('NO_MORE', '没有更多了')"
          />
        </div>
      </template>
      <loading-view class="white-view border-radius margin" v-else/>
    </div>
  </div>
</template>

<script>
import MoneyNumber from "@/components/MoneyNumber";
import NoBgPCard from "@/components/NoBgPCard";
import { Button, Col, Row, Icon, Cell, Tabs, Tab, Empty, NavBar } from "vant";
import { Base } from "@/mixins";
import { Toast } from "mand-mobile";
import UserHeader from "@/components/UserHeader";
import LoadingView from "@/components/LoadingView";

export default {
  components: {
    LoadingView,
    UserHeader,
    NoBgPCard,
    MoneyNumber,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Empty.name]: Empty,
    [NavBar.name]: NavBar,
  },
  data: () => {
    return {
      currentWalletType: "",
      invest: [],
      history: [],
      loadingWallet: true,
      loadingRecord: true,
    };
  },
  mixins: [Base],
  mounted() {
    if (this.$route.query.w) {
      this.currentWalletType = this.$route.query.w;
    } else {
      this.currentWalletType = this.system.wallet_type[0].key;
    }
    this.getMyInvest();
    this.getWalletLogs();
  },
  methods: {
    getMyInvest() {
      this.loadingWallet = true
      this.$http
        .get("v1/userProducts", {
          params: {
            page: 1,
            page_size: 2,
          },
        })
        .then((res) => {
          this.invest = res.data.list;
          this.loadingWallet = false
        })
        .catch((err) => {
          Toast.failed(err.data.meesage);
        });
    },
    getWalletLogs() {
      this.loadingRecord = true
      this.$http
        .post("v1/walletLogs", {
          page: 1,
          page_size: 5,
        })
        .then((res) => {
          this.loadingRecord = false
          this.history = res.data.list;
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
  },
};
</script>

<style lang="scss">
.wallet-page {
  .van-tab--active {
    font-weight: bold;
  }
}
</style>
