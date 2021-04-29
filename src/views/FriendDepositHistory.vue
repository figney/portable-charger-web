<template>
  <div class="friend-deposit-history-page app-appbar">
    <van-nav-bar
      :title="$t('FRIEND_CONTRIBUTE_DETAIL', '好友贡献明细')"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div
      class="padding-sm white-view margin flex flex-direction border-radius box-shadow"
      style="min-height:calc(100vh - 2.03rem)"
    >
      <van-cell
        class="padding-lr-sm padding-tb-xs bg-432af5 border-radius-xs margin-bottom-xs"
        center
      >
        <template #title>
          <div class="flex align-center margin-right-xs">
            <div
              class="size-10 border-radius-50 margin-right-xs"
              style="border:2px solid #fff"
            ></div>
            <span class="fs-16 font-bold fc-fff">
              {{ $t("TOTAL_PROFIT", "总收益") }}
            </span>
          </div>
        </template>
        <template #default>
          <div class="flex align-baseline justify-end fs-18 fc-fff">
            <money-number
                class="font-bold money-number"
                :value="user.invite_award"
            />
<!--            <span class="money-unit">{{system.default_currency}}</span>-->
          </div>
        </template>
      </van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        :loading-text="$t('LOADING', '加载中...')"
        :error-text="$t('LOAD_FAILED', '加载失败')"
        @load="getData"
      >
        <template #finished>
          <van-empty
              style="min-height:calc(100vh - 3.654rem)"
              :image="require('../assets/images/default1@2x.png')"
              :description="$t('NO_MORE', '没有更多了')"
              v-if="list.length === 0"
          >
            <van-button class="padding-lr" color="#432af5" round size="small" @click="$router.push({name:'HomeTeam'})">{{$t('TO_INVITE','去邀请')}}</van-button>
          </van-empty>
          <span v-else>{{ $t("NO_MORE", "没有更多了") }}</span>
        </template>

        <van-cell
          center
          class="padding-sm"
          v-for="(item, j) in list"
          :key="'friend-deposit' + j"
          @click="seeItem(j)"
        >
          <template #title>
            <span class="font-bold"> {{$t('FRIEND_DEPOSIT_AWARD','好友充值奖励')}} </span>
          </template>
          <template #label>
            <span class="fc-888 fs-12"> 02-24 21:47:59 </span>
          </template>
          <template #default>
            <span class="font-bold fc-default fs-18"> +8,600 </span>
          </template>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { NavBar, List, Cell, Badge, Empty, Button } from "vant";
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
    [Button.name]: Button
  },
  data: () => {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 0
    };
  },
  mixins: [Base],
  methods: {
    getData() {
      this.$http.get('v1/friendAward', {params: {
          page: ++this.page,
          page_size: 10,
        }}).then(res=>{
        if (res.data.list.length) {
          this.list = this.list.concat(res.data.list)
          if (res.data.length < 10) {
            this.finished = true
          }
        } else {
          this.finished = true
        }
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    },
    seeItem(item) {},
  },
};
</script>

<style lang="scss">
.friend-deposit-history-page {
  min-height: calc(100vh);
}
</style>
