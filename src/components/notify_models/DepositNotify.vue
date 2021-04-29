<template>
  <div class="deposit-notify flex flex-direction padding">

    <!-- 顶部的图标 -->
    <img class="notify-icon" src="../../assets/images/model_success.png"/>

    <!-- 通知标题 -->
    <div class="text-center fs-16 font-bold margin-bottom-sm">{{$t('DEPOSIT_SUCCESS','充值成功')}}</div>

    <!-- 通知内容 -->
    <div class="flex align-center justify-center font-bold fc-ff3636 fs-20" v-if="notify.data">
      <span> + </span>
      <template v-if="notify.data.wallet_type=='balance'">
        <money-number class="money-number" :value="notify.data.amount" :precision="coin_unit.balance"/>
      </template>
      <template v-else>
        <money-number :value="notify.data.amount" :precision="coin_unit.usdt"/>
        <span class="money-unit fc-coin">USDT</span>
      </template>
    </div>

    <div class="margin-bottom-sm flex align-center justify-center fc-888 fs-12" v-if="notify.data">
      <span>{{$localTime(notify.data.created_at)}}</span>
    </div>

    <!--  底部按钮-->
    <template v-if="notify.data">

      <van-button
          block
          round
          class="font-bold margin-top breath-btn border-radius-xs"
          @click="toBaoDeposit(notify.data.wallet_type)"
          color="#432af5"
          v-if="['Wallet','Product'].includes(notify.data.next_action)"
      >
<!--        <span>{{$t('SAVE_TO_MONEY_BAO','存入赚钱宝')}}</span>-->
        <span>{{$t('SELECT_MINER_START_EARN','选择矿机开始赚钱')}}</span>
      </van-button>

      <van-button
          block
          round
          class="font-bold margin-top breath-btn border-radius-xs"
          @click="toBaoDeposit('balance')"
          color="#432af5"
          v-else
      >
<!--        <span>{{$t('SURE','确定')}}</span>-->
        <span>{{$t('SELECT_MINER_START_EARN','选择矿机开始赚钱')}}</span>
      </van-button>

    </template>

    <template v-else>
      <van-button
          block
          round
          class="font-bold breath-btn border-radius-xs"
          @click="toBaoDeposit('balance')"
          color="#432af5"
      >
<!--        <span>{{$t('SURE','确定')}}</span>-->
        <span>{{$t('SELECT_MINER_START_EARN','选择矿机开始赚钱')}}</span>
      </van-button>

      <van-button block class="font-bold margin-top border-radius-xs" plain @click="$emit('more')" color="#432af5" v-if="notify.see_all">
        <span>{{$t('SEE_ALL_NOTIFY','查看全部通知')}}</span>
      </van-button>
    </template>

  </div>
</template>

<script>
import {Button} from "vant"
import {Base} from "@/mixins";
import LoadingView from "@/components/LoadingView";
import MoneyNumber from "@/components/MoneyNumber";

export default {
  name: "DepositNotify",
  components: {
    MoneyNumber,
    // LoadingView,
    [Button.name]:Button,
  },
  props: {
    notify: {
      type: Object,
      default: Object
    }
  },
  data: ()=> {
    return {
      loadingProduct: false,
      product: {}
    }
  },
  mixins: [Base],
  mounted() {
    // this.$nextTick(()=>{
    //   if (
    //       this.notify.data &&
    //       this.notify.data.next_action=='Product' &&
    //       this.notify.data.next_id>0
    //   ) {
    //     this.getProductInfo(this.notify.data.next_id)
    //   }
    // })
  },
  methods: {
    getProductInfo(id) {
      // 获取产品信息
      this.loadingProduct = true
      this.$http.get('v1/product',{
        params: { id }
      }).then(res=>{
        this.product = res.data.product
        this.loadingProduct = false
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    },
    read() {
      this.$webEvent('充值弹窗点击确定',this.$route.name+'页面')
      this.$emit('read')
      this.$emit('close')
    },
    toBaoDeposit(t) {
      this.$webEvent('充值通知弹窗点击存入赚钱宝',this.$route.name+'页面')
      this.read()
      localStorage.setItem('MoneyType',t)
      this.$toRouter({name: 'HomeMoney'})
    },
    buyProduct() {
      this.read()
      this.$toRouter({name: 'InvestDetail', query: {
        id: this.notify.data.next_id
      }})
    }
  }
}
</script>

<style lang="scss">
.deposit-notify {
  position: relative;
  padding-top: 2.266rem !important;

  .van-button {
    height: unset;
    padding: 0.1333rem 0.2667rem;
    min-height: 44px;
    line-height: 1.5;
  }

  .notify-icon {
    position: absolute;
    left: 50%;
    top: 0.38rem;
    transform: translate(-50%, 0);
    height: 1.6rem;
  }
}
</style>