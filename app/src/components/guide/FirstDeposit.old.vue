<template>
  <div class="first-deposit">
    <van-popup
        :close-on-click-overlay="false"
        class="vw-80 box-shadow border-radius"
        style="overflow:visible"
        v-model="showPop"
    >
      <div class="position-re flex flex-direction padding" style="overflow:visible;padding-top:0.9rem">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#e0e0e0"
            class="position-ab close-icon"
            @click="closePop"
        />
        <img class="coin-icon" src="../../assets/images/pop_bg1@2x.png"/>

        <div class="margin-lr padding-tb-sm text-center fs-16 font-bold">{{$t('FIRST_DEPOSIT_TITLE','首充活动标题')}}</div>

        <div class="text-center">{{$t('FIRST_DEPOSIT_CONTENT','首次充值获取大量现金首次充值获取大量现金首次充值获取大量现金')}}</div>

        <div class="margin-top padding-lr-sm">
          <van-button class="bounce margin-bottom-xs font-bold" round block color="#432af5" @click="toDeposit">{{$t('DEPOSIT_NOW','立即充值')}}</van-button>
        </div>

      </div>
    </van-popup>

    <van-popup
      v-model="showTaskPop"
      class="no-bg padding vw-100 vh-100 flex align-center justify-center"
    >
      <div class="close-task-pop">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#e0e0e0"
            class="position-ab close-icon"
            @click="showTaskPop=false"
        />
      </div>
      <div class="flex flex-direction align-center justify-center position-re padding-lr" @click="toTask">
        <div class="tast-pop-bg">

        </div>
        <img src="../../assets/images/task_gift.png" style="width:3.75rem" class="margin-bottom">
        <div class="fs-16 font-bold fc-fff margin-bottom">{{$t('CONGRATULATIONS_GOT_BEGINNER_PACKET','恭喜您获得了签到礼包')}}</div>
        <van-button class="task-btn font-bold vw-60" round>{{$t('CHECKIN_GET','签到领取')}}</van-button>

      </div>
    </van-popup>
  </div>
</template>

<script>
import { Base } from "@/mixins";
import {Button, Icon, Popup} from "vant";
import {Toast} from "mand-mobile";

export default {
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  data() {
    return {
      showPop: false,
      showTaskPop: false,
    };
  },
  mixins: [Base],
  mounted() {
    this.$bus.on('showFirstDeposit',()=>{
      this.showPop = true
    })
  },
  methods: {
    toDeposit() {
      this.$router.push({name:'Deposit'})
      this.showPop = false
    },
    toTask() {
      this.$router.push({name:'HomeTask'})
      this.showTaskPop = false
    },
    closePop() {
      this.showPop = false
      setTimeout(()=>{
        this.showTaskPop = true
      }, 500)
    },
  },
};
</script>

<style lang="scss">
.first-deposit {

  .close-icon {
    z-index: 1;
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }

  .task-btn {
    background: linear-gradient(90deg, #ffc652, #d2a569);
    border: none;
    color: #FFFFFF;
  }

  .coin-icon {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%,-50%);
    height: 1.8rem;
  }

  .close-task-pop {
    position: fixed;
    top: 0.43rem;
    right: 0.43rem;
  }
}
</style>
