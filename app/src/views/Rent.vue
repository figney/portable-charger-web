<template>
  <div class="withdraw-page flex flex-direction app-appbar">
    <van-nav-bar
      style="z-index:3"
      :title="$t('LEASE_POWERBANK','租赁充电宝')"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div style="background:#fff;">
        <div>
            <img src="../assets/images/image_1@2x.png" alt="" style="width:98%;height:3.5rem;margin-top:0.2rem;margin-left:1%;"/>
        </div>
        <div class="flex justify-between vw-90 margin-auto ">
            <div class="flex">
                <img src="../assets/images/icon_3@2x.png" alt="" style="height:1rem;"/>
                <p class="font-900 fs-15 margin-left-sm" style="line-height:1rem;">{{ $t("ORDINARY_CHARGING_CABLE","普通充电线")}}</p>
            </div>
            <div class="fc-ff3636 fs-13 font-400" style="line-height:1rem;" >{{ $t("MATURITY_AUTO_RETURN","到期自动退回租赁费")}}</div>
        </div>
        <van-divider :style="{borderColor: '#ccc',margin:'0px'}"/>
        <div class="flex flex-direction vw-90 margin-auto">

            <div class="flex justify-between fs-13">
                <p>{{ $t("DAY_INCPME","日收益")}}</p>
                <p><span class="fs-16 margin-right-xs fc-or">99.00</span>VND</p>
            </div>
            <div class="flex justify-between fs-13">
                <p>{{ $t("TOTAL_REVENUE","总收益")}}</p>
                <p><span class="fs-16 margin-right-xs fc-or">18800.00</span>VND</p>
            </div>
            <div class="flex justify-between fs-13">
                <p>{{ $t("RENTAL_FEES","租赁费")}}</p>
                <p><span class="fs-16 margin-right-xs">9900.010</span>VND</p>
            </div>
            <div class="flex justify-between fs-13">
                <p>{{ $t("EXPIRE_DATE","到期时间")}}</p>
                <p><span class="fs-16 margin-right-xs">2021/8/8</span></p>
            </div>
            <div class="flex justify-between fs-13">
                <p>{{ $t("MOST_LEASE","最多可租赁")}}</p>
                <p><span class="fs-16 margin-right-xs">{{ $t("SETS","2台")}}</span></p>
            </div>

        </div>
    </div>
    <div class="vw-90 white-view margin-auto">
        <p class="margin-lr font-900 fs-18 margin-top-sm">{{ $t("PRODUCT_DESCRIPTION","产品介绍")}}</p>
        <div class="margin-bottom-sm render-html margin-lr" v-html="inviteRule.content || $t('NO_DESC','暂无描述')"/>
    </div>
    <!-- <div class="vw-100 white-view">
        <van-button @click="showPopup" class="bg-2acd72 margin-lr margin-tb vw-90 fc-fff fs-18" style="border-radius:1rem;">{{ $t("RENT_NOW","立即租赁")}}</van-button>
    </div> -->
    <van-popup v-model="showRend" round closeable>
        <div class="vw-90 margin-auto">
            <p class="text-center">{{ $t("LEASE_ORDER","租赁订单")}}</p>
            <p class="text-center margin-tb fs-20 font-900 ">{{99.00*this.value}}<span class="fs-15 margin-left-sm">VND</span></p>
            <p class="text-center fc-888 margin-bootom-sm">{{ $t("RENTAL_FEES","租赁费")}}</p>
            <div class="flex flex-direction margin-lr">
                <div class="flex justify-between margin-tb-sm">
                    <p>{{ $t("PRODUCT_NAME","产品名称")}}</p>
                    <p>{{ $t("ORDINARY_CHARGING_CABLE","普通充电线")}}</p>
                </div>
                <div class="flex justify-between margin-tb-sm">
                    <p>{{ $t("ABOUT_TOTAL_REVENUE","预计总收益")}}</p>
                    <p class="fs-15 font-900 fc-ff3636">{{188.00*this.value}}<span class="fs-12 margin-left-xs font-400">VND</span></p>
                </div>
                <div class="flex justify-between margin-tb-sm">
                    <p>{{ $t("NUMBER_LEASES","租赁数量")}}</p>
                    <van-stepper v-model="value" theme="round" button-size="22" disable-input />
                </div>
                <div class="flex justify-between margin-tb-sm">
                    <p>{{ $t("WALLET_BALANCE","钱包余额")}}</p>
                    <p class="fs-15 font-900 fc-ff3636">100<span class="fs-12 margin-left-xs font-400">VND</span></p>
                </div>
                
                
            </div>
        </div>
    </van-popup>
    <!-- <van-popup v-model="showRend_success" round closeable>
        <div class="vw-90 margin-auto">
            <img src="../assets/images/icon_success@2x.png" alt="" style="width:100%;height:3.5rem;margin-top:0.2rem"/>
            <p class="text-center fs-18 font-400">租赁成功</p>
            <van-button @click="$toRouter({name:'inviteFriend'})" class="bg-2acd72 margin-lr margin-tb vw-80 fc-fff fs-18" style="border-radius:1rem;">邀请好友领取奖励</van-button>
        </div>
    </van-popup> -->
    <van-popup v-model="showRend_nogo" round closeable>
        <div class="vw-90 margin-auto">
            <img src="../assets/images/icon_success@2x.png" alt="" style="width:100%;height:3.5rem;margin-top:0.2rem"/>
            <p class="text-center fs-18 font-400">{{ $t("BALANCE_INSUFFICIENT","您的余额不足")}}</p>
            <van-button @click="$router.push({ name: 'Deposit' })" class="bg-2acd72 margin-lr margin-tb vw-80 fc-fff fs-18" style="border-radius:1rem;">{{ $t("TO_RECHARGE","去充值")}}</van-button>
        </div>
    </van-popup>
    <div  class="vw-100 white-view now-rent-bts">
        <van-button @click="showPopupSuccess" class="bg-2acd72 margin-lr margin-tb vw-90 fc-fff fs-18 " >{{ $t("RENT_NOW","立即租赁")}}</van-button>
    </div>
  </div>

</template>

<script>
import MoneyNumber from "@/components/MoneyNumber";
import {Toast} from "mand-mobile"
import { Button, Icon, NavBar, Field, RadioGroup, Radio, Popup, Divider, Stepper   } from "vant";
import { Base } from "@/mixins";
export default {
  components: {
    MoneyNumber,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup,
    [Divider.name]: Divider, 
    [Stepper .name]: Stepper 
  },
  data: () => {
    return {
        inviteRule: {},
        showRend: false,
        value: 1,
        showRend_success: false,
        showRend_nogo: false
    }     
},
  mixins: [Base],
  computed: {
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loadingTeam = true
      this.$http.post('v1/getArticle',{
        slug: 'INVITE_RULE'
      }).then(res=>{
        this.inviteRule = res.data.articles
        this.loadingTeam = false
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    },
    showPopup() {
        this.showRend = true
    },
    showPopupSuccess() {
        this.showRend = false
        this.showRend_success = true
        this.showRend_nogo = true
    }
  },
};
</script>

<style lang="scss">
.withdraw-page {
    min-height: calc(100vh - 2rem);
    margin-bottom: 2rem;
  .withdraw-tip {
    display: flex;
    align-items: flex-start;

   }
   .van-stepper--round{
       color:#2acd72;
       
       .van-stepper__minus{
           color:#2acd72;
           border:1px solid #2acd72;
       }
       .van-stepper__plus{
           background-color:#2acd72;
           border:#2acd72;
            color:#fff;
       }
   }
   .now-rent-bts{
       position: fixed;
       bottom:-0.1rem;
       .van-button{
           border-radius: 1rem;
       }
   }
}
</style>
