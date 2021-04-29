<template>
  <van-popup
      :close-on-click-overlay="false"
      class="first-deposit-model no-bg"
      v-model="show"
      v-if="show"
  >
    <div class="vw-90 border-radius white-view padding flex flex-direction position-re grow-animate">

      <div class="flex flex-direction padding absolute-typing-model">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#e0e0e0"
            class="position-ab close-icon"
            @click="close"
            v-if="showClose"
        />

        <div class="flex flex-direction padding-top-sm">
          <div class="fs-18 font-bold margin-bottom">
            <typeing :text="$t('CONGRATULATIONS_FINISH_TUTORIAL','恭喜你完成了新手教程')" @end="showContent=true"/>
          </div>
          <div class="margin-bottom-xs fc-323233 line-height-18" v-if="showContent">
            <typeing :text="$t('NOW_HAS_BEGINNER_DEPOSIT_ACTIVITY','现有新用户首次活动')" @end="showSubContent1=true" />
          </div>
          <div class="margin-bottom-xs fc-323233 line-height-18" v-if="showSubContent1">
            <typeing :text="$t('BEGINNER_FIRST_DEPOSIT','新用户首次充值，将会额外获得100%的赠送金')" @end="showSubContent2=true" />
          </div>
          <div class="margin-bottom-sm fc-323233 line-height-18" v-if="showSubContent2">
            <typeing :text="$t('BALANCE_CAN_WITHDRAW_ANY_TIME','充值的余额可以随时提现')" @end="startShowButton" />
          </div>
          <div class="fade-in-down" style="width:100%" v-if="showButton">
            <van-button block class="border-radius-xs  breath-btn" color="#432af5" @click="close">{{$t('I_SEE','我知道了')}}</van-button>
<!--            <van-button block class="border-radius-xs  breath-btn" color="#432af5" @click="depositNow">{{$t('DEPOSIT_AND_GET_AWARD','立即充值，领取奖励')}}</van-button>-->
          </div>
        </div>
      </div>

      <div class="opacity-0 flex flex-direction">
        <div class="flex flex-direction padding-top-sm">
          <div class="fs-18 font-bold margin-bottom">
            {{$t('CONGRATULATIONS_FINISH_TUTORIAL','恭喜你完成了新手教程')}}
          </div>
          <div class="margin-bottom-xs fc-323233 line-height-18">
            {{$t('NOW_HAS_BEGINNER_DEPOSIT_ACTIVITY','现有新用户首次活动')}}
          </div>
          <div class="margin-bottom-xs fc-323233 line-height-18">
            {{$t('BEGINNER_FIRST_DEPOSIT','新用户首次充值，将会额外获得100%的赠送金')}}
          </div>
          <div class="margin-bottom-sm fc-323233 line-height-18">
            {{$t('BALANCE_CAN_WITHDRAW_ANY_TIME','充值的余额可以随时提现')}}
          </div>
          <div class="" style="width:100%">
            <van-button block class="border-radius breath-btn no-animation-delay">{{$t('I_SEE','我知道了')}}</van-button>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import {Popup, Button, Row, Col, Icon} from "vant"
import {Toast} from "mand-mobile";
import {Base} from "@/mixins";
import Typeing from "@/components/Typeing";

export default {
  components: {
    Typeing,
    [Icon.name]:Icon,
    [Row.name]:Row,
    [Col.name]:Col,
    [Popup.name]:Popup,
    [Button.name]:Button,
  },
  data: ()=> {
    return {
      show: false,
      showContent: false,
      showSubContent1: false,
      showSubContent2: false,
      showButton: false,
      showClose: false,
    }
  },
  mixins: [Base],
  mounted() {
    this.$bus.on('showFirstDeposit',()=>{
      this.$webEvent('展示恭喜完成了新手教程',this.$route.name+'页面')
      this.show = true
      this.$bus.emit('needContact')
    })
  },
  methods: {
    startShowButton() {
      setTimeout(()=>{
        this.showButton=true
      },800)
      setTimeout(()=>{
        this.showClose = true
      }, 2000)
    },
    depositNow() {
      this.$webEvent('点击按钮 [立即充值,领取奖励]',this.$route.name+'页面')
      localStorage.setItem('NeedGuideToTask',true)
      this.show = false
      this.$router.push({name:'Deposit'})
    },
    close() {
      this.$webEvent('关闭完成了新手教程弹窗',this.$route.name+'页面')
      this.show = false
      this.$bus.emit('showTaskTabGuide')
    }
  }
}
</script>

<style lang="scss">
.first-deposit-model {
  overflow: visible;

  .close-icon {
    z-index: 1;
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }
}
</style>