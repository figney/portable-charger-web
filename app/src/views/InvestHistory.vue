<template>
  <div class="invest-history-page app-appbar flex flex-direction">
    <van-nav-bar
      :title="$t('INVEST_HISTORY', '投资记录')"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-list
      style="min-height:calc(100vh - 2.03rem)"
      class="white-view margin border-radius van-overflow-hidden box-shadow"
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

      <van-cell
        center
        class="padding-tb"
        v-for="(invest, j) in list"
        :key="'invest' + j"
        @click="seeInvest(j)"
      >
        <template #title>
          <div class="flex align-center">
            <div
              class="bg-432af5 fc-fff fs-12 padding-lr-sm border-radius-xs flex align-center justify-center margin-right-xs"
            >
              {{$t('BUY','投')}}
            </div>
            <span class="font-bold fc-default">{{invest.product_title}}</span>
          </div>
        </template>
        <template #label>
          <span class="fc-888 fs-12"> {{$formatTime('mm-dd HH:MM:SS',invest.last_grant_time)}} </span>
        </template>
        <template #default>
          <div class="flex flex-direction fc-default align-end">
            <div
              class="fs-18 font-bold flex align-baseline"
              :style="!invest.status ? 'color:#888' : ''"
            >
              <money-number
                  :class="[{'money-number':(invest.product_type!='usdt')}]"
                  :value="invest.amount"
                  :precision="invest.product_type=='usdt'?coin_unit.usdt:coin_unit.balance"
              />
              <span class="money-unit" v-if="invest.product_type=='usdt'">USDT</span>
            </div>
            <span
              class="fc-432af5 fs-12"
              :style="!invest.status ? 'color:#888' : ''"
              >{{ !invest.status ? $t('CANCELED','已取消') : $t('SUCCESSED','成功') }}</span
            >
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { NavBar, List, Cell, Badge, Empty } from "vant";
import { Base } from "@/mixins";
import MoneyNumber from "@/components/MoneyNumber";
import {Toast} from "mand-mobile";

export default {
  components: {
    MoneyNumber,
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Cell.name]: Cell,
    [Badge.name]: Badge,
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
      this.$http
          .get("v1/userProducts", {
            params: {
              page: ++this.page,
              page_size: 10,
            },
          })
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
          .catch((err) => {
            Toast.failed(err.data.meesage);
          })
          .finally(() => {
            this.loading = false;
          });
    },
    seeInvest(item) {},
  },
};
</script>

<style lang="scss">
.invest-history-page {
  min-height: 100vh;
}
</style>
