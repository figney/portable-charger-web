<template>
  <van-popup
      :close-on-click-overlay="false"
      class="first-deposit-guide-model no-bg"
      v-model="show"
      v-if="show"
  >
    <div class="vw-90 border-radius white-view padding flex flex-direction grow-animate">

      <div class="flex flex-direction padding absolute-typing-model">
        <div class="fs-18 font-bold margin-bottom">
          <typeing :text="$t('WELCOME_TO_FUNDS_MGR','欢迎来到理财中心')" @end="showContent=true"/>
        </div>
        <div class="margin-bottom fc-323233 line-height-18" v-if="showContent">
          <typeing :text="$t('HAS_GIVE_N_TO_SAVE',[gettedNum],'你现在有一笔N待存入')" @end="showButton=true" />
        </div>
        <div class="fade-in-down" style="width:100%" v-if="showButton">
          <van-button block class="border-radius-xs breath-btn" color="#432af5" @click="startNow">{{$t('CLICK_DEPOSIT_NOW','点我立即存入')}}</van-button>
        </div>
      </div>

      <div class="opacity-0 flex flex-direction">
        <div class="fs-18 font-bold margin-bottom">
          {{$t('WELCOME_TO_FUNDS_MGR','欢迎来到理财中心')}}
        </div>
        <div class="margin-bottom fc-323233 line-height-18">
          {{$t('HAS_GIVE_N_TO_SAVE',[gettedNum],'你现在有一笔N待存入')}}
        </div>
        <div class="" style="width:100%">
          <van-button block class="border-radius breath-btn no-animation-delay">{{$t('CLICK_DEPOSIT_NOW','点我立即存入')}}</van-button>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import {Popup,Button,Row,Col} from "vant"
import {Toast} from "mand-mobile";
import {Base} from "@/mixins";
import Typeing from "@/components/Typeing";

export default {
  components: {
    Typeing,
    [Row.name]:Row,
    [Col.name]:Col,
    [Popup.name]:Popup,
    [Button.name]:Button,
  },
  data: ()=> {
    return {
      show: false,
      showContent: false,
      showButton: false,
      gettedNum: '',
    }
  },
  mixins: [Base],
  mounted() {
    // this.$bus.on('showGuideFirstDeposit',(getted)=>{
    //   setTimeout(()=>{
    //     this.$webEvent('展示欢迎来到理财中心',this.$route.name+'页面')
    //     this.gettedNum = getted
    //     this.show = true
    //   },500)
    // })
  },
  methods: {
    startNow() {
      this.$webEvent('点击按钮点我立即存入',this.$route.name+'页面')
      Toast.loading('loading')
      this.$http
          .post("v1/depositMoneyBao", {
            fee: this.all_property.give.usable,
            wallet_type: 'give',
          })
          .then(async (res) => {
            await this.$store.dispatch("refreshUser");
            Toast.succeed(this.$t('SAVE_TO_EASY_MONEY_SUCCESS','存入赚钱宝成功'));

            setTimeout(()=>{
              this.show = false
              this.$bus.emit('startFirstDepositGuide')
            }, 1000)
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
    }
  }
}
</script>

<style lang="scss">
.first-deposit-guide-model {
  overflow: visible;
}
</style>