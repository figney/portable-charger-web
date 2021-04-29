<template>
  <div class="wallet-history-page app-appbar">
    <van-nav-bar
      :title="$t('ALL_BILL', '全部账单')"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="flex flex-direction" style="min-height: calc(100vh - 1.23rem)">
      <div
        class="margin border-radius white-view padding flex flex-direction box-shadow"
      >
        <van-row>
          <van-col :span="8">
            <div class="flex align-center text-center" @click="selectWalletSlug = true">
              <span class="font-bold margin-right-xs" v-if="currentSlug=='all'">{{ $t("TRANSACTION_TYPE", "交易类型") }}</span>
              <span class="font-bold margin-right-xs" v-else>{{system.wallet_slug[currentSlug]}}</span>
              <van-icon name="arrow-down" />
            </div>
          </van-col>
          <van-col :span="8">
            <div class="flex align-center justify-center text-center" @click="selectWalletType = true">
              <span class="font-bold margin-right-xs" v-if="currentType=='all'">{{$t('WALLET_TYPE','钱包类型')}}</span>
              <span class="font-bold margin-right-xs" v-else>{{getTypeName(currentType)}}</span>
              <van-icon name="arrow-down" />
            </div>
          </van-col>
          <van-col :span="8">
            <div class="flex align-center justify-end text-center" @click="showSelectDate = true">
              <span class="font-bold margin-right-xs">
                <span v-if="showDateCondition">{{
                    $formatTime("yyyy-mm-dd", currentDate)
                  }}</span>
                <span v-else>{{$t('TRANSACTION_DATE','交易日期')}}</span>
              </span>
              <van-icon name="arrow-down" />
            </div>
          </van-col>

        </van-row>

        <!--      <div class="bg-432af5 margin-tb-sm" style="height:1px;opacity:0.06"></div>-->
        <!--      <div class="flex justify-between fs-12">-->
        <!--        <div class="flex align-center">-->
        <!--          <span class="margin-right-xs">总收入: </span>-->
        <!--          <money-number -->
        <!--            class="money-number fc-ff3636 font-bold" -->
        <!--            :value="100000" -->
        <!--            :showSuffix="false" -->
        <!--            :precision="0"-->
        <!--          />-->
        <!--        </div>-->
        <!--        <div class="flex align-center">-->
        <!--          <span class="margin-right-xs">总收入: </span>-->
        <!--          <money-number -->
        <!--            class="money-number font-bold" -->
        <!--            :value="100000" -->
        <!--            :showSuffix="false" -->
        <!--            :precision="0"-->
        <!--          />-->
        <!--        </div>-->
        <!--      </div>-->
      </div>

      <div
        class="margin-lr margin-bottom border-radius white-view van-overflow-hidden box-shadow"
        style="min-height:calc(100vh - 3.787rem)"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          :loading-text="$t('LOADING', '加载中...')"
          :error-text="$t('LOAD_FAILED', '加载失败')"
          @load="getData"
        >
          <template #finished>
            <van-empty
              style="min-height:calc(100vh - 3.787rem)"
              :image="require('../assets/images/default1@2x.png')"
              :description="$t('NO_MORE', '没有更多了')"
              v-if="list.length === 0"
            />
            <span v-else>{{ $t("NO_MORE", "没有更多了") }}</span>
          </template>
          <van-cell class="padding-tb" center v-for="(item, i) in list" :key="'wallet-log' + i">
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
                <span style="margin:0 0.05rem">{{
                  item.fee > 0 ? "+" : "-"
                }}</span>
                <span>{{ Math.abs(item.fee) }}</span>
              </div>
            </template>
          </van-cell>
        </van-list>
      </div>
    </div>

    <!-- 选择 wallet_slug -->
    <van-popup
      get-container=".wallet-history-page"
      v-model="selectWalletSlug"
      round
      position="bottom"
      class="margin-tb border-radius no-bg padding-lr"
    >
      <div class="padding position-re white-view border-radius box-shadow">
        <van-icon
          @click="selectWalletSlug = false"
          size="0.5rem"
          color="#2acd72"
          class="position-ab margin-right margin-top"
          style="font-weight:bold;right:0;top:0"
          name="cross"
        />
        <div class="font-bold text-center margin-bottom">
          {{ $t("TRANSACTION_TYPE", "交易类型") }}
        </div>
        <div class="flex flex-direction vh-70" style="overflow:auto">
          <van-button
            :color="currentSlug == 'all' ? '#2acd72' : ''"
            class="bg-f2f2f6 border-radius-xs margin-bottom-sm"
            block
            @click="changeSlug('all')"
          >
            <span class="font-bold">{{ $t("ALL", "全部") }}</span>
          </van-button>
          <van-button
            v-for="(item, i) in Object.keys(system.wallet_slug)"
            :key="'select-type' + i"
            :color="currentSlug == item ? '#2acd72' : ''"
            class="bg-f2f2f6 border-radius-xs margin-bottom-sm"
            block
            @click="changeSlug(item)"
          >
            <span class="font-bold">{{ system.wallet_slug[item] }}</span>
          </van-button>
        </div>
      </div>
    </van-popup>

    <!-- 选择 wallet_type -->
    <van-popup
        get-container=".wallet-history-page"
        v-model="selectWalletType"
        round
        position="bottom"
        class="margin-tb border-radius no-bg padding-lr"
    >
      <div class="padding position-re white-view border-radius box-shadow">
        <van-icon
            @click="selectWalletType = false"
            size="0.5rem"
            color="#2acd72"
            class="position-ab margin-right margin-top"
            style="font-weight:bold;right:0;top:0"
            name="cross"
        />
        <div class="font-bold text-center margin-bottom">
          {{$t('WALLET_TYPE','钱包类型')}}
        </div>
        <div class="flex flex-direction">
          <van-button
              :color="currentType == 'all' ? '#2acd72' : ''"
              class="bg-f2f2f6 border-radius-xs margin-bottom-sm"
              block
              @click="changeType('all')"
          >
            <span class="font-bold">{{ $t("ALL", "全部") }}</span>
          </van-button>
          <van-button
              v-for="(item, i) in system.wallet_type"
              :key="'select-type' + i"
              :color="currentType == item.key ? '#2acd72' : ''"
              class="bg-f2f2f6 border-radius-xs margin-bottom-sm"
              block
              @click="changeType(item.key)"
          >
            <span class="font-bold">{{ item.value }}</span>
          </van-button>
        </div>
      </div>
    </van-popup>

    <van-popup
      get-container=".wallet-history-page"
      v-model="showSelectDate"
      round
      position="bottom"
      class="margin-tb border-radius no-bg padding-lr"
    >
      <div class="padding position-re white-view border-radius box-shadow">
        <van-icon
          @click="showSelectDate = false"
          size="0.5rem"
          color="#2acd72"
          class="position-ab margin-right margin-top"
          style="font-weight:bold;right:0;top:0"
          name="cross"
        />
        <div class="flex flex-direction">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :title="$t('SELECT_DATE','选择日期')"
            :confirm-button-text="$t('SURE','确定')"
            :cancel-button-text="$t('CANCEL','取消')"
            @confirm="changeDate"
            @cancel="cancelDate"
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  NavBar,
  List,
  Cell,
  Badge,
  Empty,
  Icon,
  Popup,
  Button,
  Row,
  Col,
  DatetimePicker,
} from "vant";
import { Base } from "@/mixins";
import { Toast } from "mand-mobile";

export default {
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Cell.name]: Cell,
    [Badge.name]: Badge,
    [Empty.name]: Empty,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data: () => {
    return {
      showDateCondition: false,
      showSelectDate: false,
      selectWalletSlug: false,
      selectWalletType: false,
      loading: false,
      finished: false,
      currentDate: new Date(),
      currentSlug: "all",
      currentType: "all",
      list: [],
      page: 0,
    };
  },
  mixins: [Base],
  methods: {
    getData() {
      let data = {
        page: ++this.page,
        page_size: 10,
      };

      // 类型
      if (this.currentSlug != "all") {
        data.wallet_slug = this.currentSlug;
      }
      // 钱包
      if (this.currentType != "all") {
        data.wallet_type = this.currentType;
      }
      // 日期
      if (this.showDateCondition) {
        data.date = this.$formatTime("yyyy-mm-dd", this.currentDate);
      }

      this.$http
        .post("v1/walletLogs", data)
        .then((res) => {
          if (res.data.list.length) {
            this.list = this.list.concat(res.data.list);
            if (res.data.list.length < 10) {
              this.finished = true;
            }
          } else {
            this.finished = true;
          }
        })
        .catch((res) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    changeSlug(item) {
      this.currentSlug = item;
      this.selectWalletSlug = false;
      this.page = 0;
      this.list = [];
      this.getData();
    },
    changeType(item) {
      this.currentType = item;
      this.selectWalletType = false;
      this.page = 0;
      this.list = [];
      this.getData();
    },
    changeDate(t) {
      this.showDateCondition = true;
      this.showSelectDate = false;
      this.page = 0;
      this.list = [];
      this.getData();
    },
    cancelDate() {
      this.showDateCondition = false;
      this.showSelectDate = false;
      this.page = 0;
      this.list = [];
      this.getData();
    },
    getTypeName(type) {
      for (let t of this.system.wallet_type) {
        if (t.key == type) {
          return t.value
        }
      }
      return type
    }
  },
};
</script>

<style lang="scss">
.wallet-history-page {
  min-height: 100vh;
}
</style>
