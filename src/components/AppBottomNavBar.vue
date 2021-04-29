<template>
  <div :class="['flex align-center',{'tab-tip-overlay':showGuide}]" @click="clickOverlay">
    <van-tabbar v-model="active" route active-color="#2acd72">
      <van-tabbar-item name="index" :replace="replace" :to="{name:'HomeIndex'}" :class="['text-center',{'tab-item-overlay':showGuide}]">
        <span class="">{{ $t("HOME", "首页") }}</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/icons/nav_2@2x.png" />
          <img v-else src="../assets/icons/nav_1@2x.png" />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item name="money" :replace="replace" :to="{name:'HomeMoney'}" :class="['text-center',{'tab-item-overlay':showGuide}]">
        <span class="">{{ $t("EARN", "赚钱") }}</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/icons/nav_icon_5A@2x.png" />
          <img v-else src="../assets/icons/nav_icon_5B@2x.png" />
        </template>
      </van-tabbar-item> -->

      <van-tabbar-item name="task" :replace="replace" :to="{name:'HomeTask'}" class="text-center">
        <span class="">Power</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/icons/nav_4@2x.png"/>
          <img v-else src="../assets/icons/nav_3@2x.png"/>
        </template>
      </van-tabbar-item>

      <van-tabbar-item name="team" :replace="replace" :to="{name:'HomeTeam'}" :class="['text-center',{'tab-item-overlay':showGuide}]">
        <span class="">{{ $t("TEAM", "团队") }}</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/icons/nav_6@2x.png" />
          <img v-else src="../assets/icons/nav_5@2x.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        name="user"
        :replace="replace"
        :to="{name:'HomeUser'}"
        :badge="
          user.unread_notifications_count > 0
            ? user.unread_notifications_count
            : ''
        "
        :class="['text-center',{'tab-item-overlay':showGuide}]"
      >
        <span class="">{{ $t("MY", "我的") }}</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/icons/nav_8@2x.png" />
          <img v-else src="../assets/icons/nav_7@2x.png" />
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <div class="over-tip" v-if="showGuide">{{$t('TAB_MONEY_TASK','这里有大量免费获得赠送金的活动，无需存钱，0投资就可赚钱，快快行动吧！')}}</div>
  </div>
</template>

<script>
import { Base } from "@/mixins";
import { Icon } from "mand-mobile";
import { Tabbar, TabbarItem, Popover } from "vant";

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
    [Popover.name]: Popover,
  },
  data() {
    return {
      active: 0,
      replace: false,
      showGuide: false,
    };
  },
  mixins: [Base],
  created() {
    this.$bus.on('closeTaskTabGuide',()=>{
      this.showGuide=false
    })
    this.$bus.on('showTaskTabGuide',()=>{
      this.startGuide()
    })
  },
  methods: {
    startGuide() {
      this.showGuide = true
    },
    clickOverlay() {
      this.showGuide = false
      this.$emit('closeTaskTabGuide')
    }
  }
};
</script>

<style lang="scss">

.tab-tip-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
}

.tab-item-overlay {
  position: relative;

  &::before {
    content: '';
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
  }
}

.over-tip {
  z-index: 1;
  position: fixed;
  bottom: 1.9rem;
  width: 70vw;
  left: 50%;
  transform: translate(-50%,0);
  background: #fff;
  color: #122134;
  padding: 0.2667rem 0.42rem;
  border-radius: 0.2667rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0.26rem;
    height: 0.26rem;
    background: #fff;
    transform: translate(-50%, 46%) rotate(45deg);
  }
}
</style>
