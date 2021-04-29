<template>
  <div class="team-list-page app-appbar">
    <van-nav-bar
      :title="$t('MY_TEAM', '我的团队')"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div
      class="padding-sm white-view margin flex flex-direction border-radius van-overflow-hidden box-shadow margin-bottom-xl"
    >
      <!-- <van-cell
        class="padding-lr-sm padding-tb-xs bg-432af5 border-radius-xs margin-bottom-xs"
        center
      >
        <template #title>
          <div class="flex align-center margin-right-xs">
            <div class="size-10 border-radius-50 margin-right-xs" style="border:2px solid #fff"/>
            <span class="fs-16 font-bold fc-fff">{{ $t("TOTAL_PROFIT", "总收益") }}</span>
          </div>
        </template>
        <template #default>
          <div class="flex align-baseline justify-end fc-fff fs-18">
            <money-number
                class="font-bold"
                :value="invite.give_balance_earnings"
                :precision="coin_unit.balance"
            />
            <div class="money-unit">{{system.default_currency}}</div>
          </div>
        </template>
      </van-cell> -->
      <div
        class="padding-bottom-xs margin-bottom-xs margin-lr-sm flex border-bottom"
      >
        <div class="padding-top-xs">
          <span class="fs-14 font-bold">
            {{ $t("TOTAL_FRIEND", "好友总数") }}
          </span>
          <span class="fs-12 fc-666"> ({{ invite.total_all || 0 }}) </span>
        </div>
      </div>
      <div class="padding-lr-sm friends-list padding-bottom-lg">
        <div v-for="(item, i) in invite.list" :key="'team-' + i" @click="toFriends(item.level)">
          <van-cell
            :border="false"
            style="padding-left:0;padding-right:0"
            is-link
            class="padding-tb-sm border-bottom"
          >
            <template #title>
              <span class="margin-right-xs">
                {{ $t("N_LEVEL_FRIEND", [(item.level).toString()], "N级好友") }}
              </span>
              <span class="fc-888"
                >({{item.total}})</span
              >
            </template>
          </van-cell>
          <template v-if="i==0 && item.friends.length">
            <van-cell
                center
                class="padding-tb-sm padding-lr-xs"
                v-for="(friend,j) in item.friends"
                :key="'1st-friend-'+j"
            >
              <div slot="icon">
                <img :src="friend.name | avatar" class="avatar size-36 border-radius-50 margin-right-xs">
              </div>
              <div slot="title" class="fs-12 text-ellipsis text-nowrap">{{friend.name}}</div>
              <div slot="label" class="fs-12 text-ellipsis text-nowrap">{{$localTime(friend.created_at)}}</div>
              <div slot="default" class="flex align-center justify-end fc-ff3636">
                <money-number
                    class="font-bold money-number"
                    :value="friend.invite_award"
                    :precision="coin_unit.balance"
                />
<!--                <span style="margin-left:0.06rem">{{system.default_currency}}</span>-->
              </div>
            </van-cell>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, NavBar } from "vant";
import { Toast } from "mand-mobile";
import { Base } from "@/mixins";
import MoneyNumber from "@/components/MoneyNumber";

export default {
  components: {
    MoneyNumber,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
  },
  data: () => {
    return {
      invite: {},
    };
  },
  mixins: [Base],
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      Toast.loading();
      this.$http
        .get("v1/friend")
        .then((res) => {
          this.invite = res.data;
          Toast.hide()
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        })
    },
    toFriends(level) {
      this.$router.push({
        name: "FriendList",
        query: {
          level: level,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.team-list-page {
  min-height: calc(100vh - 1.23rem);

  .border-bottom {
    border-bottom: 1px solid #eeecfa;
  }

  .friends-list {
    .van-collapse::after {
      border: none;
    }
    .van-collapse-item__title,
    .van-collapse-item__content {
      padding: 0;
    }
  }
}
</style>
