<template>
  <div class="user-page flex flex-sub flex-direction">
    <div class="position-re"> 
      <img src="../../assets/images/bak_my@2x.png" alt="" style="width:100%;"/>
      <div class="Avatar">
        <img class="avatar border-radius-50 size-52 margin-right-sm" :src="user.name | avatar" alt=""/>
      </div>
    </div>
    <div class="position-re Hi fc-fff fs-13">
      <p class="fs-24 font-900">HI,<span class="fs-13">{{ user.name }}</span></p>
      <p>{{ $t("WELCOME_BACK","欢迎回来")}}</p>
      <p class="fs-20">ID:<span>{{ user.id }}</span></p>

    </div>
    <!-- 我的余额 -->
    <div class="position-re my-balabce">
      <div class="border-radius-sm flex flex-direction" style="background:#3d3a55;">
        <div class="flex fc-fff justify-between padding-lr-sm padding-top padding-bottom-xs">
          <p class="fs-15">{{ $t("MYBALANCE","我的余额")}}</p>
          <p class="fs-10" @click="$toRouter({name:'WalletHistory'})"><img src="../../assets/images/copy_w@2x.png" alt="" style="height:0.5rem;"/><span>{{ $t("MY_BILL","我的账单")}}</span></p>
        </div>
        <p class="fc-fff padding-lr-sm fs-20">3698.00<span class="fs-15">VND</span></p>
        <div class="flex justify-around margin-bottom">
          <van-button class="bg-view border-radius-sm money margin-top fc-fff" @click="$router.push({ name: 'Deposit' })" style="height:0.8rem;width:4rem;background:#646177;">{{ $t("DEPOSIT_WEB","充值")}}</van-button>
          <van-button class="bg-view border-radius-sm money margin-top fc-fff" @click="$router.push({ name: 'Withdraw' })" style="height:0.8rem;width:4rem;background:#646177;">{{ $t("WITHDRAWNOW","提现")}}</van-button>
        </div>
      </div>

      <div @click="$toRouter({name:'inviteFriend'})" class="vw-90 border-radius-sm bg-red padding margin-top-sm margin-bottom-sm bg-purple fc-fff">
        {{ $t("INVITE_FRIEND_INCOME_HIGHER","邀请好友赚现金，好友越多收益越高！")}}
      </div>

      <div class=" bg-green padding border-radius  flex justify-around vw-90 margin-auto">
          <img src="../../assets/images/image_7@2x.png" alt="" style="height:2.5rem;"/>
          <div class="fc-fff">
            <p class="fs-20 font-400">{{ $t("CONGRATULATIONS","恭喜你")}}</p>
            <p class="fs-15 font-400">{{ $t("GET_FREE_POWERBANK","获得免费充电宝资格")}}</p>
            <van-button @click="$toRouter({name:'inviteFriend'})" class="white-view border-radius-xl money fc-13b271 margin-top" style="height:0.8rem;">{{ $t("GET_RIGHT_NOW","立即领取")}}</van-button>
          </div>
      </div>

      <van-grid :column-num="2" >
        
        <van-grid-item @click="showPopup">
          <p>{{ $t("REVENUE_RANKING","收益排行榜")}}</p>
          <img src="../../assets/images/icon_7@2x.png" alt="" style="width:1rem;"/>
        </van-grid-item>
        <van-grid-item  @click="$toRouter({name:'inviteFriend'})">
          <p>{{ $t("INVITATION_REWARD","邀请奖励")}}</p>
          <img src="../../assets/images/icon_8@2x.png" alt="" style="width:1rem;"/>
        </van-grid-item>
        <van-grid-item @click="$toRouter({name:'Help'})">
          <p>{{ $t("ONLINE_SERVICE","在线客服")}}</p>
          <img src="../../assets/images/icon_9@2x.png" alt="" style="width:1rem;"/>
        </van-grid-item>
        <van-grid-item @click="$toRouter({name:'Help'})">
          <p>{{ $t("HELP_CENTER","帮助中心")}}</p>
          <img src="../../assets/images/icon_10@2x.png" alt="" style="width:1rem;"/>
        </van-grid-item>
      </van-grid>  
      
    </div>
      <van-popup v-model="showLeaderboard" round position="bottom" :style="{ height: '30%' }" >
        <div>
          <p class="margin-tb text-center font-900">{{ $t("REVENUE_RANKING","收益排行榜")}}</p>
          
          <div class="flex justify-around margin-tb-sm">
            <div class="flex">
              <img class="avatar border-radius-50 size-45 " :src="user.name | avatar" alt=""/>
              <div class="flex flex-direction margin-left-sm">
                <p class="font-900 fs-15">{{ user.name }}</p>
                <p class="fs-10 fc-666">{{ $t("REGISTER_TIME","注册时间")}}：2021/21/01</p>
              </div>
            </div>
            <div class="text-center">
              <p style="color:orange;">2222222.00</p>
              <p class="fc-666 fs-12">{{ $t("TOTAL_PROFIT", "累计收益") }}</p>
            </div>
          </div>
            
          <div class="flex justify-around margin-tb-sm">
            <div class="flex">
              <img class="avatar border-radius-50 size-45 " :src="user.name | avatar" alt=""/>
              <div class="flex flex-direction margin-left-sm">
                <p class="font-900 fs-15">{{ user.name }}</p>
                <p class="fs-10 fc-666">{{ $t("REGISTER_TIME","注册时间")}}：2021/21/01</p>
              </div>
            </div>
            <div class="text-center">
              <p style="color:orange;">2222222.00</p>
              <p class="fc-666 fs-12">{{ $t("TOTAL_PROFIT", "累计收益") }}</p>
            </div>
          </div>

        </div>
      </van-popup>
  </div>
</template>

<script>
import BaseNoticeBar from "@/components/BaseNoticeBar";
import {
  Icon,
  Button,
  Cell,
  Collapse,
  CollapseItem,
  Badge,
  Col,
  Row,
  Tabs,
  Tab,
  Popover,
  Grid,
  GridItem,
  Popup,
  List 
} from "vant";
import { Toast } from "mand-mobile";
import { Base } from "@/mixins";

export default {
  components: {
    BaseNoticeBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Badge.name]: Badge,
    [Col.name]: Col,
    [Row.name]: Row,
    [Popover.name]: Popover,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Grid.name]:Grid,
    [GridItem.name]:GridItem,
    [Popup.name]:Popup,
    [List.name]:List
  },
  mixins: [Base],
  data: () => {
    return {
      showLeaderboard : false,
      
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this.$nextTick(()=>{
      this.currentWalletType = this.system.wallet_type[0].key;
    })
  },
  methods: {
    login() {
      this.$bus.emit("login");
    },
    showPopup() {
      this.showLeaderboard = true
    },
    
  },
};
</script>

<style lang="scss">
.user-page {
  overflow-x: hidden;
  min-height: calc(100vh - 1.35rem);
  margin-bottom: 1.35rem;
  .my-balabce{
    top:-4.5rem;
    left:0;
    width:90%;
    margin:0 auto;

  }
  .Hi{
    top:-5.5rem;
    left:0.8rem;
  }
  .Avatar{
    width:1.5rem;
    height:1.5rem;
    border-radius:50%;
    position: absolute;
    top:1.2rem;
    right:0.4rem;
  }
}
.van-button{
  outline:none;
  border:none;
}
.van-grid{
  box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.03);
}
.van-hairline p{
  font-weight:600;
  margin:0.2rem 0;
  font-size:0.4rem;
} 
</style>
