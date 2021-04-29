<template>
  <div class="white-view index-page flex flex-direction" style="background:#F2F2F6;">
    <div
      class="index-fixed-top flex align-center justify-between padding white-view"
    >
      <!-- <balance-banner/> -->
      <p class="fs-16"><img src="../../assets/images/icon_1@2x.png" alt="" style="height:0.5rem;margin-right:0.5rem;"/>{{ $t("HELLO", "您好，") }},<span class="fs-13">{{ $t("NOT_LIGGED_REGISTER","你尚未登录注册")}}</span></p>
      <div
        class="flex align-center "
        @click="$toRouter({ name: 'Language' })"
      >
        <div class="fs-12 margin-right-xs fc-323233">{{ languageName }}</div>
        <img
          src="../../assets/images/icon_5@2x.png"
          alt=""
          style="height:0.25rem;"
        />
      </div>
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div >
      <div class="padding-sm white-view">
        <base-notice-bar
          class=" border-radius fc-default "
          :blue-icon="true"
          style="background:#F2F2F6;"
        />
      </div> 

      <div class="flex justify-around">
        <div @click="$toRouter({name:'inviteFriend'})" class="margin-sm bg-purple padding border-radius vw-50 fc-fff">{{ $t("INVITE_MONEY","邀请赚钱")}}</div>
        <div class="margin-sm padding bg-pink border-radius vw-50 fc-fff">{{ $t("PROJECT_DESCRIPTION","项目说明")}}</div>
      </div>

      <div>
        <div class="margin-sm bg-green padding border-radius  flex justify-around">
          <img src="../../assets/images/image_7@2x.png" alt="" style="height:2.5rem;"/>
          <div  class="fc-fff">
            <p class="fs-20 font-900">{{ $t("CONGRATULATIONS","恭喜你")}}</p>
            <p>{{ $t("GET_FREE_POWERBANK","获得免费充电宝资格")}}</p>
            <van-button @click="$toRouter({name:'inviteFriend'})" class="white-view border-radius-xl money fc-13b271 margin-top" style="height:0.8rem;">{{ $t("GET_RIGHT_NOW","立即领取")}}</van-button>
          </div>
        </div>
      </div>

      <ul class="flex justify-between vw-90  padding-top-xs padding-bottom-xs padding-left-xs padding-right-xs" style="margin:auto;">
        <li class="font-900">{{ $t("POPULAR_RECOMMEND","热门充电宝推荐")}}</li>
        <!-- <li>更多></li> -->
      </ul>


      <div v-for="items in lists" :key = "items.id" class="flex flex-direction justify-around white-view vw-90 border-radius-sm margin-top-xs margin-auto">
        <div class="flex justify-between margin-lr margin-tb-xs flex">
          <div class="flex">
            <img src="../../assets/images/icon_3@2x.png" alt="" style="height:0.8rem;"/>
             <p class="fs-15 font-900 margin-left-sm" style="line-height:0.8rem;">{{ $t("ORDINARY_POWERBANK","普通充电宝")}}</p>
          </div>
        </div>
        <div class="flex justify-between margin-lr margin-tb-xs">
          <p>{{ $t("DAY_INCPME","日收益")}}</p>
          <p class="fc-ff3636">2222<span class="fs-10 fc-default">VND</span></p>
        </div>
        <div class="flex justify-between margin-lr margin-tb-xs">
          <p>{{ $t("MONTH_INCPME","月收益")}}</p>
          <p class="fc-ff3636">2222<span class="fs-10 fc-default">VND</span></p>
        </div>
        <div class="flex justify-between margin-lr margin-tb-xs">
          <p>{{ $t("RENTAL_FEES","租赁费")}}</p>
          <p class="fc-ff3636">2222<span class="fs-10 fc-default">VND</span></p>
        </div>
        <div class="flex justify-between margin-lr margin-tb-xs">
          <p>{{ $t("LEASE_CYCLE","租赁周期")}}</p>
          <p class="fc-ff3636">2  <span class="fs-10 fc-default">DAY </span></p>
        </div>
        <p class="fc-ff3636 text-center margin-bottom-sm">{{ $t("MATURITY_AUTO_RETURN","到期自动退回租赁费")}}</p>
        <van-button @click="$toRouter({name:'Rent'})" class="bg-2acd72 border-radius-xl money margin-left-lg fc-fff vw-80 margin-bottom-sm">{{ $t("RENT_TO_MAKE_MONEY","租赁赚钱")}}</van-button>
      </div>


      <!-- <div class="flex flex-direction justify-around white-view vw-90 border-radius-sm margin-top-xs margin-auto">
        <div class="flex justify-between margin-lr margin-tb-xs">
         <div class="flex">
            <img src="../../assets/images/icon_3@2x.png" alt="" style="height:0.8rem;"/>
             <p class="fs-15 font-900 margin-left-sm" style="line-height:0.8rem;">{{ $t("ORDINARY_POWERBANK","普通充电宝")}}</p>
          </div>
        </div>
        <div class="flex justify-between margin-lr margin-tb-xs">
          <p>{{ $t("DAY_INCPME","日收益")}}</p>
          <p class="fc-ff3636">2222<span class="fs-10 fc-default">VND</span></p>
        </div>
        <div class="flex justify-between margin-lr margin-tb-xs">
          <p>{{ $t("MONTH_INCPME","月收益")}}</p>
          <p class="fc-ff3636">2222<span class="fs-10 fc-default">VND</span></p>
        </div>
        <div class="flex justify-between margin-lr margin-tb-xs">
          <p>{{ $t("RENTAL_FEES","租赁费")}}</p>
          <p class="fc-ff3636">2222<span class="fs-10 fc-default">VND</span></p>
        </div>
        <div class="flex justify-between margin-lr margin-tb-xs">
          <p>{{ $t("LEASE_CYCLE","租赁周期")}}</p>
          <p class="fc-ff3636">2  <span class="fs-10 fc-default">DAY </span></p>
        </div>
        <p class="fc-ff3636 text-center margin-bottom-sm">{{ $t("MATURITY_AUTO_RETURN","到期自动退回租赁费")}}</p>
        <van-button @click="$toRouter({name:'Rent'})" class="bg-2acd72 border-radius-xl money margin-left-lg fc-fff vw-80 margin-bottom-sm">{{ $t("RENT_TO_MAKE_MONEY","租赁赚钱")}}</van-button>

      </div> -->
      <van-popup v-model="show_income" closeable round >
          <div class="vw-90 flex flex-direction text-center">
            <div class="margin">
              <img src="../../assets/images/image_7@2x.png" alt="" style="height:2.5rem;"/>
            </div>
            <p class="fc-or fs-20">+523698745612<span class="fs-15 fc-default">VND</span></p>
            <p class="margin fs-18">{{ $t("YESTERDAY_ATTIVE","昨日收益到账")}}</p>
            <van-button @click="$toRouter({name:'HomeTeam'})"  class="bg-2acd72 border-radius-xl money margin-lr fc-fff margin-bottom-sm">{{$t("EARN_MORE_REVENUE","赚取更多收益")}}</van-button>
          </div>
      </van-popup>

      
    </div>
  </div>
</template>

<script>
import { Toast, Swiper, SwiperItem } from "mand-mobile";
import { Button, Tab, Tabs, Swipe, SwipeItem, Popup  } from "vant";
import BaseNoticeBar from "@/components/BaseNoticeBar";
import { Base } from "@/mixins";
import LoadingView from "@/components/LoadingView";
import BalanceBanner from "@/components/BalanceBanner";
import FlashInviteBtn from "@/components/FlashInviteBtn";

export default {
  components: {
    FlashInviteBtn,
    banners:[],
    BalanceBanner,
    LoadingView,
    BaseNoticeBar,
    [Button.name]: Button,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    [Popup.name]:Popup,

  },
  data: () => {
    return {
      activeTab: 0,
      currentLang: localStorage.getItem("language") || "EN",
      show_income: false,
      loadingHome: true,
      lists:[],

    };
  },
  computed: {
    languageName() {
      for (let lang of this.system.lang_list) {
        if (this.currentLang === lang.slug) {
          return lang.name || lang.slug;
        }
      }
      return this.currentLang;
    },
  },
  mixins: [Base],
  mounted() {
    this.getProducts();
      

    

  },
  methods: {
    getProducts() {
      this.$http
        .get("v1/products")
            .then((res) => {
              this.$store.commit('setState',{key:'products',value: res.data.list})
              this.lists = res.data.list;
              console.log(lists);
              for(let i = 0;i < lists.length;i++){
                console.log(lists[i].describe);
              }
            })
            .catch((err) => {
              Toast.failed(err.data.message);
            });
    },
    
  },
};
</script>

<style lang="scss">
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}
.index-page {
  min-height: calc(100vh - 1.35rem);
  margin-bottom: 1.35rem;
  
  .van-tab__text--ellipsis {
    overflow: visible;
  }  
}

//小喇叭（恭喜XXX）
.van-notice-bar__wrap{
  //background:#F2F2F6;
  border-radius:0.3rem;
}
.money{
  outline:none;
  border:none;
  height:1rem;
}
</style>
