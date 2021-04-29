<template>
  <div class="friend-list-page app-appbar">
    <van-nav-bar
        :title="$t('N_LEVEL_FRIEND',[$route.query.level],'N级好友')"
        fixed
        left-arrow
        @click-left="$router.go(-1)"
    />
    <div
        class="padding margin white-view border-radius box-shadow"
        style="min-height:calc(100vh - 2.03rem)"
    >
      <van-list
          v-model="loading"
          :finished="finished"
          :loading-text="$t('LOADING','加载中...')"
          :error-text="$t('LOAD_FAILED','加载失败')"
          @load="getFriends"
      >
        <template #finished>
          <van-empty
              style="min-height:calc(100vh - 2.83rem)"
              :image="require('../assets/images/default1@2x.png')"
              :description="$t('NO_MORE', '没有更多了')"
              v-if="list.length === 0"
          >
          </van-empty>
          <span v-else>{{ $t("NO_MORE", "没有更多了") }}</span>
        </template>

        <van-cell
            center
            :border="false"
            class="padding-0 padding-tb-sm"
            v-for="(friend, j) in list"
            :key="'friend'+j"
            @click="seeFriend(j)"
        >
          <template #icon>
            <img
                class="margin-right-xs size-36"
                :src="friend.name | avatar"
            />
          </template>
          <template #title>
            <span class="fs-12 font-bold fc-default">{{friend.name}}</span>
          </template>
          <template #label>
            <div class="flex align-center fc-888 fs-10 text-nowrap">
              <span>{{$t('REGISTER_DATE','注册日期')}}:</span>
              <span>{{$localTime(friend.created_at)}}</span>
            </div>
          </template>
          <template #default>
            <div class="flex flex-direction">
              <span class="fs-16 font-bold fc-default flex align-baseline justify-end">
                <money-number
                    class="money-number"
                    :value="friend.invite_award"
                    :precision="coin_unit.balance"
                />
<!--                <span class="money-unit">{{system.default_currency}}</span>-->
              </span>
              <span class="fc-888 fs-10">{{$t('TOTAL_CONTRIBUTE','累计贡献')}}</span>
            </div>
          </template>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import {NavBar, List, Cell, Badge, Empty} from 'vant'
import {Toast} from "mand-mobile"
import {Base} from "@/mixins"
import MoneyNumber from "@/components/MoneyNumber";

export default {
  components: {
    MoneyNumber,
    [NavBar.name]:NavBar,
    [List.name]:List,
    [Cell.name]:Cell,
    [Badge.name]:Badge,
    [Empty.name]:Empty,
  },
  data: ()=> {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 0,
    }
  },
  mixins: [Base],
  methods: {
    getFriends() {
      this.$http.get('v1/friendList', {params: {
        page: ++this.page,
        page_size: 10,
        level: this.$route.query.level || 1
      }}).then(res=>{
        if (res.data.length) {
          this.list = this.list.concat(res.data)
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
    seeFriend(item) {},
  }
}
</script>

<style lang="scss">
.friend-list-page {
  min-height: calc(100vh);
}
</style>
