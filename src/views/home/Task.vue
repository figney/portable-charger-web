<template>
  <div class="task-center-page flex flex-direction">
    <div class="flex flex-direction vw-100" style="background:#2ACD72;">
      <div class="flex justify-between  margin-lr-sm margin-top">
        <p class="fc-fff fs-12 margin-top" style="opacity: 0.8;">{{ $t("TODAY_INCOME","今日收益")}}</p>
        <p class="fs-10 margin-top-sm bg-red my_account" @click="$toRouter({name:'WalletHistory'})"><img src="../../assets/images/copy_w@2x.png" alt="" style="height:0.5rem;"/><span class="fc-fff">{{ $t("MY_BILL","我的账单")}}</span></p>
        <!-- <p class="fc-fff">{{ $t("MY_BILL","我的账单")}}</p> -->
      </div>
      <div class=" margin-lr-sm fc-fff fs-24 font-900 margin-bottom">2365744.00</div>
      <div class="flex justify-between  margin-lr-sm fc-fff fs-12">
        <p style="opacity: 0.8;">{{ $t("ADDUP_INCOME","近30天累计收益(VND)")}}</p>
        <p class="margin-right-lg" style="opacity: 0.8;">{{ $t("HOLD_POWERBANK","持有充电宝")}}</p>
      </div>
      <div class="flex justify-between margin-lr-sm fc-fff fs-22 margin-bottom">
        <p>2365744.00</p>
        <p  class="margin-right-xl">{{ $t("SETS","台")}}</p>
      </div>
    </div>
    <div>
      <div class="">
        <van-tabs v-model="active">
          <van-tab color="#2ACD72" title="租赁赚钱" >
            <div class="zlzq">

              <div class="flex flex-direction justify-around white-view vw-90 border-radius-sm margin-top-xs margin-auto">
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

              <div class="flex flex-direction justify-around white-view vw-90 border-radius-sm margin-top-xs margin-auto">
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

              <div class="flex flex-direction justify-around white-view vw-90 border-radius-sm margin-top-xs margin-auto">
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

            </div>
          </van-tab>
          <van-tab color="#2ACD72" title="我的充电宝" >
            <div class="wdcdb"> 
              <div class="flex flex-direction justify-around white-view vw-90 border-radius-sm margin-top-xs margin-auto">
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
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <!-- <div class="flex flex-direction vw-90 margin-auto border-radius-sm white-view" style="box-shadow: 0 0 5px 1px #ccc;">
        <div class="flex justify-between  margin-lr-sm margin-top-sm">
          <p class="font-900"><img src="../../assets/images/icon4@2x.png" alt="" style="height:20px"/>{{ $t("ORDINARY_POWERBANK","普通充电宝")}}</p>
          <p class="fs-10 fc-ff3636">{{ $t("INCOME_HOUR_GIVE","收益按小时发放")}}</p>
        </div>
        <div class="flex justify-between  margin-lr-sm margin-top-sm fs-13">
          <p class="fs-13">{{ $t("HOURLY_EARNINGS","每小时收益")}}</p>
          <p>2568VND</p>
        </div>
        <div class="flex justify-between  margin-lr-sm margin-top-sm fs-13">
          <p >{{ $t("ABOUT_TOTAL_REVENUE","预计总收益")}}</p>
          <p>23564400VND</p>
        </div>
        <div class="flex justify-between  margin-lr-sm margin-top-sm fs-13" >
          <p >{{ $t("RENTAL_FEES","租赁费")}}</p>
          <p>2000000VND</p>
        </div>
        <div class="flex justify-between  margin-lr-sm margin-top-sm margin-bottom-sm fs-13">
          <p >{{ $t("EXPIRE_DATE","到期时间")}}</p>
          <p>2021/02/23</p>
        </div>
        <hr class="vw-90"/>
        <div class="flex justify-between  margin-lr-sm margin-top-sm margin-bottom-lg fs-13">
          <p >{{ $t("GENERATED_REVENVE","已产生收益")}}</p>
          <p class="fs-15 fc-ff3636 font-900">+2365744.000</p>
        </div> 
      </div>  -->
    </div>

      <!-- <div>
        <div class=" bg-green padding border-radius  flex justify-around vw-90 margin-auto">
          <img src="../../assets/images/image_7@2x.png" alt="" style="height:2.5rem;"/>
          <div>
            <p>{{ $t("CONGRATULATIONS","恭喜你")}}</p>
            <p>{{ $t("GET_FREE_POWERBANK","获得免费充电宝资格")}}</p>
            <van-button @click="$toRouter({name:'inviteFriend'})" class="white-view border-radius-xl money fc-13b271 margin-top" style="height:0.8rem;">{{ $t("GET_RIGHT_NOW","立即领取")}}</van-button>
          </div>
        </div>
      </div> -->

    
   
  </div>
</template>

<script>
import {Button, Icon, Cell, Row, Col, Popup, Tab, Tabs} from "vant";
import { Base } from "@/mixins";

export default {
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  data: () => {
    return {


    };
  },
  mixins: [Base],
  mounted() {
    

  },
  beforeDestroy() {
    
  },
  methods: {
  }
};
</script>

<style lang="scss">
.task-center-page {
  min-height: calc(100vh - 1.35rem);
  margin-bottom: 1.35rem;
  .my_account{
    width:3rem;
    text-align:center;
    background:#65d797;
    color:#FFF;
    height:0.8rem;
    line-height:0.8rem;
    border-radius: 0.5rem;
    margin-right:-0.5rem;
    font-size:0.32rem;
  }
  .zlzq{
    width:100%;
  }
  .wdcdb{
    width:100%;
  }
  .van-tabs__line{
    background-color:#2ACD72;
  }
  .van-tab--active{
    color:#2ACD72;
  }
}
</style>
