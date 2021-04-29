<template>
  <!-- 保留赚钱宝（体验矿机）的三种余额 -->
  <div class="money-page flex flex-direction">
    <pwa-banner/>
    <div class="border-radius-bottom bg-432af5 margin-bottom flex flex-direction padding-lr-sm">

      <div class="margin-tb font-bold fs-20 fc-fff padding-bottom-xs flex align-center justify-between">
        <div class="flex-sub text-nowrap van-overflow-hidden">{{$t('MAKE_MONEY_BAO','体验矿机')}}</div>
        <balance-banner class="margin-left"/>
      </div>

      <div class="white-view border-radius-sm margin-bottom-xs flex flex-direction box-shadow">
        <van-tabs
            id="money-step-4"
            class="tabs-bottom-line"
            line-height="0.08rem"
            line-width="33.3%"
            color="#432af5"
            v-model="currentWalletType"
        >
          <van-tab
              v-for="(tab, i) in system.wallet_type"
              :key="'currency-tab' + i"
              :name="tab.key"
          >
            <template #title>
              <div class="fs-12">
                <span class="fs-14">{{ tab.value }}</span>
              </div>
            </template>
            <template #default>
              <div
                  class="white-view border-radius padding-lr-sm bao-card margin-bottom-xs flex flex-direction box-shadow"
                  v-show="isBoughtMachine"
              >
                <div
                    class="flex align-baseline margin-tb-sm padding-left-sm padding-right-xs fc-ff3636"
                >
                  <div class="fs-28 font-bold" id="money-step-1">
                    <money-number
                        :value="money_bao.balance"
                        v-if="currentWalletType == 'balance'"
                        :precision="coin_unit.balance"
                    />
                    <money-number
                        :value="money_bao.usdt_balance"
                        v-if="currentWalletType == 'usdt'"
                        :precision="coin_unit.usdt"
                    />
                    <money-number
                        :value="money_bao.give_balance"
                        v-if="currentWalletType == 'give'"
                        :precision="coin_unit.balance"
                    />
                    <span class="money-unit fc-coin">{{currentWalletType == "usdt" ? "USDT" : system.default_currency}}</span>
                  </div>

                  <div class="flex-sub"></div>

                  <div class="self-center flex align-center fc-888" id="money-step-2">
                    <div class="fs-13 margin-right-xs">
                      {{ $t("YEAR_RATE", "年化率") }}
                    </div>
                    <div class="fs-20 font-bold din-pro">
                      <span v-if="currentWalletType == 'balance'">{{ money_bao_rate.mb_balance_rate }}%</span>
                      <span v-if="currentWalletType == 'usdt'">{{ money_bao_rate.mb_usdt_rate }}%</span>
                      <span v-if="currentWalletType == 'give'">{{ money_bao_rate.mb_give_rate }}%</span>
                    </div>
                  </div>
                </div>
                <div class="border-radius padding-tb bg-gradient-light margin-bottom-sm">
                  <van-row type="flex" class="align-stretch">
                    <van-col
                        id="money-step-3"
                        class="flex flex-direction align-center justify-between padding-lr-xs"
                        span="12"
                        style="border-right:1px solid rgba(18,33,52,0.05)"
                    >
                      <div class="fs-13 margin-bottom-xs flex align-center">
                        <span class="margin-right-xs fc-666" >{{ $t("TODAY_PREDICT_PROFIT", "今日预估收益") }}</span>
                        <van-popover theme="dark" v-model="showPopover" trigger="click" placement="top">
                          <div class="padding-tb-xs padding-lr-sm border-radius fs-12 text-wrap" style="max-width:6rem">
                            {{$t('PREDICT_INTRO','该收益为预估收益，实际收益以每日结算为准')}}
                          </div>
                          <template #reference>
                            <van-icon size="14" color="#666" name="question-o"/>
                          </template>
                        </van-popover>
                      </div>
                      <div class="fs-20 font-bold flex align-baseline">
                        <money-number
                            :value="(money_bao.balance * money_bao_rate.mb_balance_rate)/100/365"
                            :precision="coin_unit.balance"
                            v-if="currentWalletType == 'balance'"
                            :day_dynamic="true"
                        />
                        <money-number
                            :value="(money_bao.usdt_balance * money_bao_rate.mb_usdt_rate)/100/365"
                            :precision="coin_unit.usdt"
                            v-if="currentWalletType == 'usdt'"
                            :day_dynamic="true"
                        />
                        <money-number
                            :value="(money_bao.give_balance * money_bao_rate.mb_give_rate)/100/365"
                            :precision="coin_unit.balance"
                            v-if="currentWalletType == 'give'"
                            :day_dynamic="true"
                        />
                        <span class="money-unit fc-coin">{{currentWalletType == "usdt" ? "USDT" : system.default_currency}}</span>
                      </div>
                    </van-col>

                    <van-col
                        id="money-step-2"
                        class="flex flex-direction align-center justify-between padding-lr-xs"
                        span="12"
                        @click="$router.push({name:'WalletHistory'})"
                    >
                      <div class="fs-13 margin-bottom-xs fc-666">{{ $t("TOTAL_PROFIT", "累计收益") }}</div>
                      <div class="fs-20 font-bold" v-if="showFunds">
                        <money-number
                            :value="money_bao.money_bao_count.balance_earnings"
                            :precision="coin_unit.balance"
                            v-if="currentWalletType == 'balance'"
                        />
                        <money-number
                            :value="money_bao.money_bao_count.usdt_balance_earnings"
                            :precision="coin_unit.usdt"
                            v-if="currentWalletType == 'usdt'"
                        />
                        <money-number
                            :value="money_bao.money_bao_count.give_balance_earnings"
                            :precision="coin_unit.balance"
                            v-if="currentWalletType == 'give'"
                        />
                        <span class="money-unit fc-coin">{{
                            currentWalletType == "usdt" ? "USDT" : system.default_currency
                          }}</span>
                      </div>
                      <span class="fs-20 font-bold din-pro" v-else>****</span>
                    </van-col>
                  </van-row>
                </div>

                <div class="flex justify-between margin-bottom-sm">
                  <van-button
                      class="border-radius-xs"
                      color="#432af5"
                      style="max-width:4.15rem"
                      block
                      @click="toDeposit"
                  >{{ $t("INCREASE_POWER", "增加算力") }}</van-button
                  >
                  <div class="margin-lr-xs"/>
                  <van-button
                      class="border-radius-xs"
                      color="#ff3636"
                      style="max-width:4.15rem"
                      block
                      @click="toWithdraw"
                  >
                    <span v-if="currentWalletType=='balance'">{{ $t("WITHDRAW_CASH", "取出现金") }}</span>
                    <span v-else-if="currentWalletType=='usdt'">{{ $t("WITHDRAW_USDT", "取出USDT") }}</span>
                    <span v-else-if="currentWalletType=='give'">{{ $t("WITHDRAW_GIVE_MONEY", "取出赠送金") }}</span>
                    <span v-else>{{$t('TAKE_OUT','取出')}}</span>
                  </van-button>
                </div>

                <div class="bg-f7f9ff border-radius-xs padding-tb-xs flex align-center justify-center font-bold fc-ff3636 margin-bottom-sm" @click="openEasyMoneyDim">
                  <span class="bounce">{{$t('DIM_EASY_MONEY','什么是赚钱宝')}} ?</span>
                </div>
              </div>

              <div class="white-view border-radius padding-lr bao-card margin-bottom-xs flex flex-direction box-shadow" v-show="!isBoughtMachine">
                <div class="margin-tb text-center">
                  <img src="../../assets/images/empty.png" alt="" style="width:1.8rem">
                </div>
                <div class="margin-bottom text-center font-bold fs-16">{{$t('NOT_BUY_MACHINE','尚未购买体验矿机')}}</div>
                <div class="margin-bottom text-center fc-ff3636 font-bold bounce">{{$t('MACHINE_PA60','体验矿机年保底收益60%')}}</div>
                <van-button block class="fc-fff bg-gradient margin-bottom-sm border-radius-sm" @click="toDeposit">{{$t('MINING_NOW','立即挖矿')}}</van-button>
              </div>

            </template>
          </van-tab>
        </van-tabs>
      </div>

      <base-notice-bar class="no-bg margin-bottom-sm" />
    </div>

    <flash-invite-btn class="margin-bottom margin-lr-xs"/>

    <div class="position-re flex flex-direction" style="min-height:2rem">
      <template v-if="!loadingMoney">
        <bg-p-card
          class="margin-lr margin-bottom"
          v-for="(item, i) in products"
          :key="'products-item-' + i"
          :invest="item"
          :has_button="true"
        />
      </template>
      <loading-view v-else/>
    </div>

    <!-- 什么是赚钱宝 -->
    <van-popup
      :close-on-click-overlay="false"
      ref="easyMoneyDim"
      v-if="showEasyMoneyDim"
      v-model="showEasyMoneyDim"
      class="vw-90 border-radius-sm"
      @click-overlay="closeEasyMoneyDim"
    >
      <div class="flex flex-direction padding position-re">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#e0e0e0"
            class="position-ab close-icon"
            @click="closeEasyMoneyDim"
        />
        <div class="fs-18 font-bold margin-bottom text-center">
          <span>{{$t('DIM_EASY_MONEY','什么是赚钱宝')}}</span>
        </div>
        <div class="render-html" v-html="$t('EASY_MONEY_DETAIL_INTRO','赚钱宝详细介绍')"/>
      </div>
    </van-popup>

    <app-bottom-nav-bar/>
  </div>
</template>

<script>
import {Button, Row, Col, Icon, Popover, Tabs, Tab, Popup} from "vant";
import BaseNoticeBar from "@/components/BaseNoticeBar";
import MoneyNumber from "@/components/MoneyNumber";
import { Toast } from "mand-mobile";
import BgPCard from "@/components/BgPCard";
import { Base } from "@/mixins";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import LoadingView from "@/components/LoadingView";
import AppBottomNavBar from "@/components/AppBottomNavBar";
import {mapState} from "vuex";
import NotifyIcon from "@/components/NotifyIcon";
import BalanceBanner from "@/components/BalanceBanner";
import FlashInviteBtn from "@/components/FlashInviteBtn";
import PwaBanner from "@/components/PwaBanner";

export default {
  components: {
    PwaBanner,
    FlashInviteBtn,
    BalanceBanner,
    // NotifyIcon,
    AppBottomNavBar,
    LoadingView,
    BgPCard,
    MoneyNumber,
    BaseNoticeBar,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popover.name]: Popover,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Popup.name]: Popup
  },
  data: () => {
    return {
      tabList: [],
      tabType: 'invest',
      currentWalletType: "",
      showFunds: true,
      showPopover: false,
      driver: null,
      showGuide: false,
      loadingMoney: false,
      showEasyMoneyDim: false,
      loadingInvestInfo: false,
      invest_property: {}
    };
  },
  mixins: [Base],
  computed: {
    ...mapState(['products']),
    isBoughtMachine() {
      // 根据 currentWalletType 判断当前tab是否展示
      if (this.currentWalletType=='balance') {
        // 法币
        if (this.money_bao.balance <= 0) {
          return false
        }
      } else if (this.currentWalletType=='give') {
        // 赠送金
        if (this.money_bao.give_balance <= 0) {
          return false
        }
      } else {
        // usdt
        if (this.money_bao.usdt_balance <= 0) {
          return false
        }
      }
      return true
    }
  },
  created() {
    // if (localStorage.getItem('GuideMoney')) {
    //   this.tabList = ['invest','bao']
    //   this.tabType = 'invest'
    // } else {
    //   this.tabList = ['bao','invest']
    //   this.tabType = 'bao'
    // }

  },
  mounted() {
    this.$bus.on('startFirstDepositGuide',()=>{
      setTimeout(this.startGuide, 200)
    })

    this.$nextTick(()=>{
      let moneyType = localStorage.getItem('MoneyType')
      if (moneyType) {
        this.currentWalletType = moneyType
        localStorage.removeItem('MoneyType')
      } else {
        this.currentWalletType = this.system.wallet_type[0].key;
      }

      if (localStorage.getItem('NeedGuideToTask')) {
        localStorage.removeItem('NeedGuideToTask')
        this.$bus.emit('showTaskTabGuide')
      }
    })

    this.getProducts();
    this.getInvestInfo();
  },
  beforeDestroy() {
    if (this.currentWalletType) {
      localStorage.setItem('MoneyType',this.currentWalletType)
    }
  },
  methods: {
    getInvestInfo() {
      this.loadingInvestInfo = true
      this.$http
          .get("v1/userProducts", {
            params: { page: 1, page_size: 0 },
          })
          .then((res) => {
            this.invest_property = res.data.all_property;
            let map = {}
            for (let t of this.system.wallet_type) {
              map[t.key] = t.value
            }
            Object.keys(this.invest_property).forEach(k => {
              this.invest_property[k].title = map[k]
            })
            this.loadingInvestInfo = false
          })
          .catch((err) => {
            Toast.failed(err.data.meesage);
          })
    },
    openEasyMoneyDim() {
      this.$webEvent(`打开什么是体验矿机弹窗`,this.$route.name+'页面')
      this.showEasyMoneyDim = true
    },
    closeEasyMoneyDim() {
      this.$webEvent(`关闭什么是体验矿机弹窗`,this.$route.name+'页面')
      this.$closeModel(this.$refs.easyMoneyDim.$el)
      setTimeout(()=>{
        this.showEasyMoneyDim = false
      },300)
    },
    startGuide() {
      if (!localStorage.getItem('GuideMoney')) {
          localStorage.setItem('GuideMoney',true)
          this.showGuide = true
          setTimeout(()=>{
            this.driver = new Driver({
              allowClose: false,
              padding: 5,
              nextBtnText: this.$t('NEXT',"下一步"),
              prevBtnText: this.$t('PREVOUS',"上一步"),
              doneBtnText: this.$t('I_SEE',"我知道了"),
              closeBtnText: this.$t('JUMP',"跳过"),
              onNext: ()=>{
                this.$webEvent('点击下一步',this.$route.name+'页面')
                if (this.driver.currentStep==2) {
                  this.bounceEl('balance_animate_tab')
                  this.bounceEl('usdt_animate_tab')
                }
              },
              onReset: ()=>{
                this.$webEvent('点击我知道了',this.$route.name+'页面')
                this.currentWalletType = 'balance'
                this.showGuide = false
                this.$bus.emit('showFirstDeposit')
                this.removeBounce('balance_animate_tab')
                this.removeBounce('usdt_animate_tab')
              }
            });

            this.driver.defineSteps([
              {
                element: '#money-step-1',
                popover: {
                  title: `<em>${this.$t('TI_IS_YOUR_BALANCE','这是你存入的金额')}</em>`,
                  description: '',
                }
              },
              {
                element: '#money-step-2',
                popover: {
                  title: `<em>${this.$t('IT_IS_PA','这是存入金额的年化收益率')}</em>`,
                  description: '',
                  position: 'bottom-right'
                },
              },
              {
                element: '#money-step-3',
                popover: {
                  title: `<em>${this.$t('IT_IS_TODAY_ESTIMATED','这是今天的预估收益。收益会在第二天自动发放到账户余额')}</em>`,
                  description: '',
                }
              },
              {
                element: '#money-step-4',
                popover: {
                  title: `<em>${this.$t('EXPECT_GIVE_MONEY','除了赠送金余额，平台还可以存入现金或者USDT，两者有高达60%的年化收益哦')}</em>`,
                  description: '',
                  position: 'bottom-center'
                },
              }
            ]);
            try {
              this.driver.start()
            } catch (err) {}
          }, 1000)
      }
    },
    toDeposit() {
      this.$webEvent(`点击增加算力-${this.currentWalletType}`,this.$route.name+'页面')
      this.$router.push({
        name: "BaoDeposit",
        query: { w: this.currentWalletType },
      });
    },
    toWithdraw() {
      this.$webEvent(`点击取出-${this.currentWalletType}`,this.$route.name+'页面')
      this.$router.push({
        name: "BaoWithdraw",
        query: { w: this.currentWalletType },
      });
    },
    getProducts() {
      if (!this.products.length) {
        this.loadingMoney = true
        this.$http
            .get("v1/products")
            .then((res) => {
              this.$store.commit('setState',{key:'products',value: res.data.list})
              this.loadingMoney = false
            })
            .catch((err) => {
              Toast.failed(err.data.message);
            });
      }
    },
    bounceEl(id) {
      try {
        let el = document.getElementById(id)
        el.style.opacity = 1
        el.classList.add('fc-ff3636')
        el.classList.add('font-bold')
        el.classList.add('bounce')
      } catch (err) {
        // console.log('add bounce error:',err)
      }
    },
    removeBounce(id) {
      try {
        let el = document.getElementById(id)
        delete el.style.opacity
        el.classList.remove('bounce')
        el.classList.remove('fc-ff3636')
        el.classList.remove('font-bold')
      } catch (err) {
        // console.log('remove bounce error:',err)
      }
    }
  },
};
</script>

<style lang="scss">
.money-page {
  min-height: calc(100vh - 1.35rem);
  margin-bottom: 1.35rem;

  .top-card {
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 2px 0 #ccc;

    .card-before-dot {
      position: absolute;
      left: 0;
      top: 0;
      width: 2.4rem;
      height: 2.4rem;
      background: #0078ff;
      transform: translate(-50%, -50%) rotate(-45deg);
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
  }

  .bao-tab__active {
    font-weight: bold;
    opacity: 1;
    font-size: 0.53rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -0.65rem;
      width: 0;
      height: 0;
      border-top: 7px solid #fff;
      border-right: 7px solid #fff;
      border-bottom: 7px solid transparent;
      border-left: 7px solid transparent;
      transform: translate(-50%, 0) rotate(-45deg);
    }
  }

  .invest-img-chip {
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 0.6rem 0 0 0;
    opacity: 0.6;
    background: #ff3636;
  }

  .is-guide-tab {
    .bao-tab__active::before {
      display: none;
    }
  }

  .money-tab-item {
    display: flex;
    align-items: center;
    height: 0.72rem;

    &,* {
      transition: all 0.1s;
    }

    .tab-text {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .close-icon {
    z-index: 1;
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }

  .first-tabs {

    & > .van-tabs__wrap {
      background: #fff;
      border-radius: 0.21333rem !important;
      margin-bottom: 0.43rem;

      .van-tab {
        font-weight: bold;
      }

      .van-tabs__line {
        left: 0 !important;
        right: 0 !important;
        top: 0 !important;
        bottom: 0 !important;
        width: 50%;
        opacity: 0.1;
        height: 1.1728rem !important;
        border-radius: 0.21333rem !important;
      }
    }

    .first-tab {
      overflow: hidden !important;
    }
  }
}
</style>
