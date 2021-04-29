<template>
  <div class="money-page flex flex-direction">
    <pwa-banner/>
    <div class="border-radius-bottom bg-432af5 margin-bottom flex flex-direction padding-lr-sm">

      <div class="margin-tb-xs font-bold fs-20 fc-fff padding-bottom-xs flex align-center justify-between">
        <base-notice-bar class="no-bg"/>
      </div>

      <div class="white-view border-radius-sm margin-bottom flex flex-direction box-shadow">

        <van-tabs
            :class="['tabs-bottom-line','top-tabs',{'only-one-tab':(money_bao.balance==0 && money_bao.usdt_balance==0)}]"
            line-height="0.08rem"
            line-width="33.3%"
            color="#432af5"
            v-model="currentWalletType"
        >
          <template
              v-for="(tab, i) in system.wallet_type"
          >
            <van-tab
                :key="'currency-tab' + i"
                :name="tab.key"
                v-if="(tab.key=='balance' && money_bao.balance>0) || (tab.key=='usdt' && money_bao.usdt_balance>0) || tab.key=='give'"
            >
              <!--              v-if="money_bao[tab.key]>0"-->
              <template #title>
                <span v-if="tab.key!='give'">{{ tab.value }}</span>
                <span v-else style="width:100%">
                  <div v-if="money_bao.day_status.give.status=='stop' || money_bao.balance!=0 || money_bao.usdt_balance!=0">
                    {{$t('GIVE_MINER','赠送金体验矿机')}}
                  </div>
                  <div v-else style="width:100%">
                    <van-cell center class="no-bg padding-0 padding-tb-sm padding-right-sm justify-between">
                      <div class="flex align-center" slot="title">
                          <span class="margin-right-xs font-bold" >{{$t('TODAY_MINING_OUTPUT','今日挖矿产出')}}</span>
                          <van-popover theme="dark" v-model="showPopover" trigger="click" placement="top">
                            <div class="padding-tb-xs padding-lr-sm border-radius fs-12 text-wrap" style="max-width:6rem">
                              {{$t('PREDICT_INTRO','该收益为预估收益，实际收益以每日结算为准')}}
                            </div>
                            <template #reference>
                              <van-icon size="14" color="#666" name="question-o"/>
                            </template>
                          </van-popover>
                      </div>
                      <div class="fc-default fs-16 font-bold flex justify-end align-baseline" slot="default">
                        <money-number
                            class="money-number"
                            :value="money_bao.day_status.balance.fee"
                            :precision="coin_unit.balance"
                            v-if="currentWalletType == 'balance'"
                        />
                        <money-number
                            :value="money_bao.day_status.usdt.fee"
                            :precision="coin_unit.usdt"
                            v-if="currentWalletType == 'usdt'"
                        />
                        <money-number
                            class="money-number"
                            :value="money_bao.day_status.give.fee"
                            :precision="coin_unit.balance"
                            v-if="currentWalletType == 'give'"
                        />
                        <span class="money-unit fc-coin" v-if="currentWalletType == 'usdt'">USDT</span>
                      </div>
                    </van-cell>
                  </div>
                </span>
              </template>
              <template #default>
                <!--    v-if="(money_bao.balance==0 && money_bao.usdt_balance==0)"    -->
                <div class="white-view border-radius padding-lr bao-card flex flex-direction box-shadow">
                  <div class="flex flex-direction border-radius van-overflow-hidden bg-f7f9ff margin-bottom">
                    <van-cell center class="no-bg padding-lr-sm" id="money-step-1">
                      <div class="font-bold" slot="title">{{$t('RENT_PRICE','押金')}}</div>
                      <div class="fc-default font-bold fs-16" slot="default">
                        <money-number
                            class="money-number"
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
                            class="money-number"
                            :value="money_bao.give_balance"
                            v-if="currentWalletType == 'give'"
                            :precision="coin_unit.balance"
                        />
                        <span class="money-unit fc-coin" v-if="currentWalletType=='usdt'">USDT</span>
                      </div>
                    </van-cell>

                    <van-cell center class="no-bg padding-lr-sm" id="money-step-2">
                      <div class="font-bold" slot="title">{{$t('GETTED_POWER','获得算力')}}</div>
                      <div class="fc-default fs-16 font-bold" slot="default">
                        <span v-if="currentWalletType=='usdt'">{{ (money_bao.usdt_balance / 0.31).toFixed(1) }}T</span>
                        <span v-else-if="currentWalletType=='balance'">{{ (money_bao.balance / 24.24).toFixed(1) }}T</span>
                        <span v-else>{{ (money_bao.give_balance / 24.24).toFixed(1) }}T</span>                      </div>
                    </van-cell>

                    <van-cell center class="no-bg padding-lr-sm" v-if="money_bao.day_status[currentWalletType].residue_s > 0">
                      <div class="flex align-center" slot="title">
                        <span class="margin-right-xs font-bold" >{{$t('MINER_TIME','挖矿倒计时')}}</span>
                        <van-popover theme="dark" v-model="showPopover2" trigger="click" placement="top">
                          <div class="padding-tb-xs padding-lr-sm border-radius fs-12 text-wrap" style="max-width:6rem">
                            {{$t('MINER_TIME_INTRO','增加算力会更新挖矿倒计时')}}
                          </div>
                          <template #reference>
                            <van-icon size="14" color="#666" name="question-o"/>
                          </template>
                        </van-popover>
                      </div>
                      <div class="fc-default fs-16 font-bold" slot="default">
                        <van-count-down class="fc-default fs-16 font-bold" :time="money_bao.day_status.give.residue_s * 1000" :format="'HH:mm:ss'" v-show="currentWalletType=='give'"/>
                        <van-count-down class="fc-default fs-16 font-bold" :time="money_bao.day_status.balance.residue_s * 1000" :format="'HH:mm:ss'" v-show="currentWalletType=='balance'"/>
                        <van-count-down class="fc-default fs-16 font-bold" :time="money_bao.day_status.usdt.residue_s * 1000" :format="'HH:mm:ss'" v-show="currentWalletType=='usdt'"/>
                      </div>
                    </van-cell>
                  </div>

                  <div class="flex justify-between margin-bottom">
                    <!-- give -->
                    <van-button
                        :class="['border-radius-xs','no-animation-delay',{'breath-btn':(money_bao.day_status.give.status=='over')}]"
                        color="#432af5"
                        block
                        @click="toDeposit"
                        v-if="currentWalletType=='give'"
                    >
                      <span v-if="money_bao.day_status.give.status == 'working'">{{ $t("INCREASE_POWER", "增加算力") }}</span>
                      <span v-else-if="money_bao.day_status.give.status == 'stop'">{{$t('START_MINGING','开始挖矿')}}</span>
                      <span v-else>{{$t('GET_PROFIT','领取收益')}}</span>
                    </van-button>

                    <!-- balance -->
                    <van-button
                        :class="['border-radius-xs','no-animation-delay',{'breath-btn':(money_bao.day_status.balance.status=='over')}]"
                        color="#432af5"
                        block
                        @click="toDeposit"
                        v-if="currentWalletType=='balance'"
                    >
                      <span v-if="money_bao.day_status.balance.status == 'working'">{{ $t("INCREASE_POWER", "增加算力") }}</span>
                      <span v-else-if="money_bao.day_status.balance.status == 'stop'">{{$t('START_MINGING','开始挖矿')}}</span>
                      <span v-else>{{$t('GET_PROFIT','领取收益')}}</span>
                    </van-button>

                    <van-button
                        :class="['border-radius-xs','no-animation-delay',{'breath-btn':(money_bao.day_status.usdt.status=='over')}]"
                        color="#432af5"
                        block
                        @click="toDeposit"
                        v-if="currentWalletType=='usdt'"
                    >
                      <span v-if="money_bao.day_status.usdt.status == 'working'">{{ $t("INCREASE_POWER", "增加算力") }}</span>
                      <span v-else-if="money_bao.day_status.usdt.status == 'stop'">{{$t('START_MINGING','开始挖矿')}}</span>
                      <span v-else>{{$t('GET_PROFIT','领取收益')}}</span>
                    </van-button>

                  </div>

                  <div
                      class="border-radius-xs padding-tb-sm flex align-center justify-center font-bold margin-bottom change-bg"
                      :style="'border:1px solid '+whatText.bg+';color:'+whatText.bg"
                      @click="openEasyMoneyDim"
                  >
                    <span class="bounce">{{whatText.text}} ?</span>
                  </div>

                </div>
              </template>
            </van-tab>
          </template>
        </van-tabs>
<!--      -->
      </div>
    </div>

    <flash-invite-btn class="margin-bottom margin-lr-xs"/>

<!--    <div class="padding-xs" id="money-step-4"></div>-->

    <div class="position-re flex flex-direction margin-lr-sm scroll-miner-list" id="money-step-4" style="min-height:2rem">
      <div class="guide-overlay" v-if="showGuide"></div>
      <van-tabs
          class="tabs-bottom-line border-radius-sm bg-f7f9ff margin-bottom"
          line-height="0.08rem"
          line-width="33.3%"
          color="#432af5"
          v-model="currentMiningType"
      >
        <van-tab>
          <template #title>
            {{$t('MINER_PLEDGE','矿机租用')}}
          </template>
          <template v-if="!loadingMoney">
            <div class="margin-top"/>
            <template v-for="(item, i) in products">
              <bg-p-card
                  class="margin-lr-sm margin-bottom"
                  :key="'products-item-' + i"
                  :invest="item"
                  :has_button="true"
                  v-if="item.day_cycle < productSep"
              />
            </template>
          </template>
          <loading-view v-else/>
        </van-tab>

        <van-tab>
          <template #title>
            {{$t('MINER_BUY','购买')}}
          </template>
          <template v-if="!loadingMoney">
            <div class="margin-top"/>
            <template v-for="(item, i) in products">
              <bg-p-card
                  class="margin-lr-sm margin-bottom"
                  :key="'products-item-' + i"
                  :invest="item"
                  :has_button="true"
                  v-if="item.day_cycle >= productSep"
              />
            </template>
          </template>
          <loading-view v-else/>
        </van-tab>

        <van-tab>
          <template #title>
            {{$t('MINER_DEPLOY','托管')}}
          </template>
          <template>
            <template v-if="!loadingMoney">
              <div class="margin-tb padding-lr line-height-18">
                <span class="fc-ff3636 fs-12 margin-right-xs">{{$t('DEPLOY_SERVICE','托管业务请联系客服，目前仅支持比特币以太坊类型矿机')}}</span>
<!--                <span class="fc-666 fs-12 margin-right-xs">{{$t('PLEASE_POST_TO','请将您的矿机邮寄至')}}:</span>-->
<!--                <span class="fc-ff3636">zhemkonskiy Nasleg emkohcknn hacner Siberia Сибирь Russia </span>-->
<!--                <span class="fc-666 fs-12">. {{$t('BEFORE_POST_TO','邮寄前请先联系客服，签署托管合同，10台起托管。')}}</span>-->
              </div>
            </template>
            <loading-view v-else/>
          </template>
        </van-tab>
      </van-tabs>
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
          <span>{{detailWhatText.text}}</span>
        </div>
        <div class="render-html" v-html="detailWhatText.content"/>
      </div>
    </van-popup>

  </div>
</template>

<script>
import {Button, Row, Col, Icon, Popover, Tabs, Tab, Popup, Cell, CountDown} from "vant";
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
    // BalanceBanner,
    // NotifyIcon,
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
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CountDown.name]: CountDown,
  },
  data: () => {
    return {
      whatText: {},
      whatTexts: [],
      detailWhatText: {},
      tabList: [],
      tabType: 'invest',
      currentWalletType: "give",
      showFunds: true,
      showPopover: false,
      showPopover2: false,
      driver: null,
      showGuide: false,
      loadingMoney: false,
      showEasyMoneyDim: false,
      loadingInvestInfo: false,
      invest_property: {},
      whatTimer: null,
      currentMiningType: 0,
      loadingGetting: false
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
    this.whatTexts = [
      {
        bg: '#FFA000',
        text: this.$t('DIM_EASY_MONEY','什么是赚钱宝'),
        content: this.$t('EASY_MONEY_DETAIL_INTRO','赚钱宝详细介绍')
      },
      {
        bg: '#00796B',
        text: this.$t('DIM_CALC_POWER','什么是算力'),
        content: this.$t('CALC_POWER_INFO','算力简介'),
      },
      {
        bg: '#1976D2',
        text: this.$t('DIM_GIVE_MONEY','什么是赠送金'),
        content: this.$t('GIVE_MONEY_INFO','赠送金简介'),

      }
    ]
    this.whatText = {
      bg: '#1976D2',
      text: this.$t('DIM_GIVE_MONEY','什么是赠送金'),
      content: this.$t('GIVE_MONEY_INFO','赠送金简介'),

    }

    this.startWhatTextTimer()
    // if (localStorage.getItem('GuideMoney')) {
    //   this.tabList = ['invest','bao']
    //   this.tabType = 'invest'
    // } else {
    //   this.tabList = ['bao','invest']
    //   this.tabType = 'bao'
    // }

  },
  mounted() {
    this.$bus.on('scrollProducts',()=>{
      setTimeout(this.scrollToProducts,200)
    })
    this.$nextTick(()=>{
      // let moneyType = localStorage.getItem('MoneyType')
      // if (moneyType) {
      //   this.currentWalletType = moneyType
      //   localStorage.removeItem('MoneyType')
      // } else {
      //   this.currentWalletType = this.system.wallet_type[0].key;
      // }

      if (!localStorage.getItem('GuideFirstDeposit')) {
        if (this.user.created_at && Date.now() - new Date(this.user.created_at).getTime() > (60 * 60 * 1000)) {
          console.log("Not show guide because user registered more than one hour")
        } else {
          setTimeout(this.startGuide, 200)
        }
        localStorage.setItem('GuideFirstDeposit',true)
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
    window.clearInterval(this.whatTimer)
    if (this.currentWalletType) {
      localStorage.setItem('MoneyType',this.currentWalletType)
    }
  },
  methods: {
    startWhatTextTimer() {
      window.clearInterval(this.whatTimer)
      this.whatTimer = setInterval(()=>{
        this.whatText = this.whatTexts.shift()
        this.whatTexts.push(this.whatText)
      },3500)
    },
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
      this.detailWhatText = this.whatText
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
              // this.currentWalletType = 'balance'
              this.showGuide = false
              // this.$bus.emit('showFirstDeposit')
              this.$bus.emit('showTaskTabGuide')
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
                position: 'top-center'
              },
            }
          ]);
          try {
            this.driver.start()
          } catch (err) {
            console.log(err)
          }
        }, 1000)
      }
    },
    toDeposit() {
      if (this.money_bao.day_status[this.currentWalletType].status=='over') {
        // 去领取
        this.$webEvent(`点击领取收益-${this.currentWalletType}`,this.$route.name+'页面')
        this.loadingGetting = true
        this.$http.post('v1/receiveMoneyBaoAward', {wallet_type:this.currentWalletType})
          .then(res=>{
            Toast.succeed(this.$t('SUCCESSED','成功'))
            this.$store.commit('setState',{key:'money_bao',value: res.data.money_bao})
          })
          .catch(err=>{
            Toast.failed(err.data.message)
          })
          .finally(()=>{
            this.loadingGetting = false
          })
      } else if (this.money_bao.day_status.give.status=='working') {
        // 增加算力
        this.$webEvent(`点击增加算力-${this.currentWalletType}`,this.$route.name+'页面')
        this.$router.push({
          name: "BaoDeposit",
          query: { w: this.currentWalletType, ac: '2' },
        });
      } else {
        // 开始挖矿
        this.$webEvent(`点击开始挖矿-${this.currentWalletType}`,this.$route.name+'页面')
        this.$router.push({
          name: "BaoDeposit",
          query: { w: this.currentWalletType, ac: '1' },
        });
      }
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
    scrollToProducts() {
      let el = document.querySelector('.scroll-miner-list')
      console.log(el)
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 10,
          behavior: 'smooth'
        })
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

  .only-one-tab {
    .van-tabs__wrap {

      .van-tabs__nav {

        &:after {
          display: none;
        }

        .van-tab {
          padding-left: 0.39rem;
          justify-content: flex-start;

          .van-tab__text {
            font-weight: bold;

            * {
              font-size: 18px !important;
            }
          }
        }
      }

      .van-tabs__line {
        display: none;
      }
    }
  }
  .change-bg {
    transition: all 1s;
  }

  .guide-overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }

  .van-tab--active {

    .van-tab__text {
      font-weight: bold;
    }
  }

  .top-tabs {

    .van-tabs__nav {
      min-height: 1.173rem;
      padding-bottom: 0.2rem !important;
      width: 100%;

      .van-tabs__line, &::after {
        bottom: 0.2rem;
      }

      .van-cell__title {
        flex: 1;
      }

      .van-cell__value {
        overflow: visible;
        margin-left: 0.2667rem;
        flex: 1;
      }
    }

    .van-tabs__wrap {
      height: unset;
      min-height: 1.173rem;
      display: flex;
      align-items: center;
    }

    .van-tab {
      .van-tab__text {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
