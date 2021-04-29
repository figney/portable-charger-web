<template>
  <div class="transfer-history-page app-appbar">
    <van-nav-bar
      :title="$t('TRANSFER_HISTORY', '转换记录')"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div
      class="margin border-radius white-view van-overflow-hidden box-shadow"
      style="min-height:calc(100vh - 2.03rem)"
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
            style="min-height:calc(100vh - 2.03rem)"
            :image="require('../assets/images/default1@2x.png')"
            :description="$t('NO_MORE', '没有更多了')"
            v-if="list.length === 0"
          />
          <span v-else>{{ $t("NO_MORE", "没有更多了") }}</span>
        </template>
        <van-cell center v-for="(item, i) in list" :key="'wallet-log' + i">
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
</template>

<script>
import { NavBar, List, Cell, Empty } from "vant";
import { Base } from "@/mixins";

export default {
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Cell.name]: Cell,
    [Empty.name]: Empty,
  },
  data: () => {
    return {
      loading: false,
      finished: false,
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
        action_type: "DepositBalanceToUsdt,DepositUsdtToBalance",
      };

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
  },
};
</script>

<style lang="scss">
.transfer-history-page {
  min-height: 100vh;
}
</style>
