<template>
  <div class="invest-detail-page app-appbar" :style="investSuccess?'':'padding-bottom: 2.1rem'">

    <template v-if="!investSuccess">
      <van-nav-bar
          id="invest-nav-bar"
          class="fixed-tapbar"
          :title="$t('MINING_INFO', '矿机详情')"
          fixed
          left-arrow
          @click-left="$router.go(-1)"
      />

      <div
          class="white-view box-shadow flex flex-direction van-overflow-hidden margin-bottom"
      >
        <img style="width:100%;height:6rem;object-fit:cover" :src="invest.big_cover"/>

        <div class="margin-tb padding-lr flex align-center">
          <div class="fs-16 font-bold flex-sub">{{ invest.title }}</div>
        </div>
      </div>

      <div class="white-view margin-lr margin-bottom padding box-shadow border-radius-sm">
        <div class="fs-18 font-bold margin-bottom-sm">
          {{ $t("BASIC_INFO", "基本信息") }}
        </div>

        <div style="border-bottom:1px solid rgba(67,42,245,0.06)"></div>

        <template v-for="(attr,i) in invest.attrs">
          <van-cell
              :key="'attr-'+invest.id+i"
              v-if="i!=1"
              class="padding-0 padding-tb-xs fs-12"
              :border="false"
              style="border-bottom:1px solid rgba(67,42,245,0.06)"
          >
            <div class="fc-888" slot="title">{{attr.name}}:</div>
            <div class="fc-default flex align-center" slot="default">{{attr.value}}</div>
          </van-cell>
        </template>

        <van-cell
            class="padding-0 padding-tb-xs fs-12"
            :border="false"
            style="border-bottom:1px solid rgba(67,42,245,0.06)"
        >
          <div class="fc-888" slot="title">
            <span v-if="invest.user_max_buy">{{ $t("UNIT_PRICE", "单价") }}:</span>
            <span v-else>{{$t('BUY_MINER_PRICE','价格')}}:</span>
          </div>
          <div class="fc-default  flex align-center" slot="default">
            <money-number
              :class="[{'money-number':(invest.type!='usdt')}]"
              :value="invest.min_money"
            />
            <span class="money-unit fc-coin" v-if="invest.type=='usdt'">USDT</span>
            <span class="margin-lr-xs">/</span>
            <span>{{$t('PICS','台')}}</span>
          </div>
        </van-cell>
<!--        <van-cell-->
<!--            class="padding-0 padding-tb-xs fs-12"-->
<!--            :border="false"-->
<!--            style="border-bottom:1px solid rgba(67,42,245,0.06)"-->
<!--        >-->
<!--          <div class="fc-888" slot="title"> </div>-->
<!--          <div class="fc-default" slot="default">{{$t('QUIT_PLEDGE','到期后自动退回押金')}}</div>-->
<!--        </van-cell>-->
        <van-cell
            class="padding-0 padding-tb-xs fs-12"
            :border="false"
            style="border-bottom:1px solid rgba(67,42,245,0.06)"
        >
          <div class="fc-888" slot="title">{{ $t('PREDICT_PROFIT', '预计收益') }}:</div>
          <div class="fc-default  flex align-center" slot="default">
            <money-number
                :class="[{'money-number':(invest.type!='usdt')}]"
                :value="invest.type=='usdt'?$usdtFormat(invest.min_money * invest.day_rate * invest.day_cycle / 100):$balanceFormat(invest.min_money * invest.day_rate / 100)"
            />
            <span class="money-unit fc-coin" v-if="invest.type == 'usdt'">USDT</span>
            <span class="margin-lr-xs">/</span>
            <span>{{ $t('DAY', '天') }}</span>
          </div>
        </van-cell>
        <van-cell
            class="padding-0 padding-tb-xs fs-12"
            :border="false"
            style="border-bottom:1px solid rgba(67,42,245,0.06)"
        >
          <div class="fc-888" slot="title">{{ $t('TOTAL_PROFIT', '总收益') }}:</div>
          <div class="fc-default  flex align-center" slot="default">
            <money-number
                :class="[{'money-number':(invest.type!='usdt')}]"
                :value="invest.type=='usdt'?$usdtFormat(invest.min_money * invest.day_rate * invest.day_cycle / 100):$balanceFormat(invest.min_money * invest.day_rate * invest.day_cycle / 100)"
            />
            <span class="money-unit fc-coin" v-if="invest.type=='usdt'">USDT</span>
          </div>
        </van-cell>

        <template v-for="(attr,i) in invest.attrs">
          <van-cell
              :key="'attr-'+invest.id+i"
              v-if="i==1"
              class="padding-0 padding-tb-xs fs-12"
              :border="false"
              style="border-bottom:1px solid rgba(67,42,245,0.06)"
          >
            <div class="fc-888" slot="title">{{attr.name}}:</div>
            <div class="fc-default  flex align-center" slot="default">{{attr.value}}</div>
          </van-cell>
        </template>

        <van-cell
            class="padding-0 padding-tb-xs fs-12"
            :border="false"
            style="border-bottom:1px solid rgba(67,42,245,0.06)"
        >
          <div class="fc-888" slot="title">{{ $t('MINING_CYCLE', '挖矿周期') }}:</div>
          <div class="fc-default" slot="default" v-if="invest.day_cycle!=undefined">
            {{ $t('N_DAY', [invest.day_cycle.toString()], 'N天') }}
          </div>
        </van-cell>
        <van-cell
            class="padding-0 padding-tb-xs fs-12"
            :border="false"
            style="border-bottom:1px solid rgba(67,42,245,0.06)"
            v-if="invest.user_max_buy"
        >
          <div class="fc-888" slot="title">{{ $t('MAX_BUY', '最多可购') }}:</div>
          <div class="fc-default" slot="default">
            <span>{{ Math.max(invest.user_max_buy, Math.floor(invest.user_max_amount / invest.min_money)) }}</span>
            <span>{{ $t('PICS', '台') }}</span>
          </div>
        </van-cell>
        <div class="padding-0 padding-tb-xs fs-12 font-bold fc-ff3636 text-center flex align-center justify-center" style="min-height:0.96rem">
          <span v-if="invest.day_cycle < productSep">{{$t('QUIT_PLEDGE','到期后自动退回押金')}}</span>
          <span v-else>{{$t('AFTER_BUY_MINER_ITS_YOURS','购买后 产权永久属于您本人，大概寿命为6年')}}</span>
        </div>
      </div>

      <div class="white-view margin-lr margin-bottom padding box-shadow border-radius-sm">
        <div class="fs-18 font-bold margin-bottom-sm">
          {{ $t("MINING_INFO", "矿机详情") }}
        </div>
        <div class="fs-12 render-html" v-html="invest.content"/>
      </div>

      <div class="fixed-btn white-view padding">
        <van-button
            class="border-radius-sm bg-gradient fc-fff"
            block
            @click="showBuyPanel=true"
        >
          <span v-if="invest.is_number_buy">{{ $t("MINING_NOW", "立即挖矿") }}</span>
          <span v-else>{{ $t("BUY_NOW", "立即购买") }}</span>
        </van-button>
      </div>
    </template>

    <div class="flex flex-direction" v-else style="padding-top:1.2267rem">
      <van-nav-bar
          style="z-index:3"
          :title="invest.is_number_buy ? $t('RENT_SUCCESS', '租赁成功') : $t('INVEST_SUCCESS', '投资成功')"
          left-arrow
          fixed
          @click-left="investSuccess = false"
      />
      <div
          class="status-panel margin white-view border-radius box-shadow flex flex-direction align-center"
      >
        <div style="height:2.8rem"></div>
        <img
            class="margin-bottom"
            src="../assets/images/success@2x.png"
            style="width:2.25rem"
        />
        <div class="margin-bottom-sm font-bold fs-24 text-center">
          {{ invest.is_number_buy ? $t('RENT_SUCCESS', '租赁成功') : $t('INVEST_SUCCESS', '投资成功') }}
        </div>
        <!--        <div class="margin-bottom fc-888 text-center">{{$t('SUCCESS_TRANSFER_IN_N_To_MONEY_BAO','成功转入 100,000IDR 到赚钱宝')}}</div>-->
        <div class="margin padding-lr" style="width:100%">
          <van-button
              class="border-radius-xs font-bold"
              block
              color="#432af5"
              @click="seeMyInvest"
          >{{ $t("SEE_MY_MINERS", "查看我的矿机") }}
          </van-button
          >
        </div>
      </div>
    </div>

    <van-dialog class="border-radius-sm" v-model="showDepositModel" :show-confirm-button="false">
      <div class="flex flex-direction align-center padding position-re">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#e0e0e0"
            class="position-ab close-icon"
            @click="closeDeposit"
            v-if="showClose"
        />
        <div class="margin-bottom fs-16 font-bold text-center">
          {{ $t('AVAILABLE_SHORT_BALANCE', '您的可用余额不足') }}
        </div>
        <div class="margin-tb flex justify-center">
          <img src="../assets/images/invest_short_balance.png" class="opacity-60" style="width:3.4rem"/>
        </div>
        <div class="margin-bottom"></div>
        <van-button class="font-bold border-radius-sm" color="#432af5" block @click="startDeposit">
          {{ $t('DEPOSIT_NOW_2', '立即充值') }}
        </van-button>
      </div>
    </van-dialog>

    <van-popup v-model="showBuyPanel" position="bottom" round>
      <div class="flex flex-direction">
        <div
            class="white-view border-radius padding flex-direction flex box-shadow"
        >
          <div class="fs-16 font-bold margin-bottom-sm">
            {{ $t("PROFIT_CALCULATOR", "收益计算器") }}
          </div>
          <div class="flex align-center" style="min-height:1.23rem">
            <md-activity-indicator
                type="carousel"
                color="#432af5"
                :size="10"
                v-if="calculating"
            />
            <template v-else>
              <typeing
                  class="fs-17 font-bold fc-ff3636"
                  :text="calcProfitText"
                  v-if="showCalc"
                  @end="typingEnd"
              />
              <div class="fs-30 font-bold fc-ff3636 flex align-baseline" v-else>
                <money-number
                    :class="['font-bold',{'money-number':(invest.type!='usdt')}]"
                    :value="calcProfit"
                    :precision="invest.type=='usdt' ? coin_unit.usdt : coin_unit.balance"
                />
                <span class="money-unit fc-coin" v-if="invest.type=='usdt'">USDT</span>
              </div>
            </template>
          </div>
          <div class="fc-888 fs-12 margin-bottom-xs">{{ $t("PREDICT_TOTAL", "预计总收益") }}</div>
          <div class="fs-12 font-bold fc-ff3636 flex align-center">
            <span v-if="invest.day_cycle < productSep">{{$t('QUIT_PLEDGE','到期后自动退回押金')}}</span>
            <span v-else>{{$t('AFTER_BUY_MINER_ITS_YOURS','购买后 产权永久属于您本人，大概寿命为6年')}}</span>
          </div>
        </div>

        <div
            class="white-view border-radius padding box-shadow"
        >
          <div class="margin-bottom flex align-center">
            <span class="font-bold fs-16" v-if="invest.is_number_buy">{{ $t("MINING_AMOUNT", "矿机数量") }}</span>
            <span class="font-bold fs-16" v-else>{{ $t("INVEST_AMOUNT", "投资金额") }}</span>

            <div class="flex-sub"></div>
            <div class="margin-left fs-12 fc-888">
              <span v-if="invest.is_number_buy">
                <span v-if="invest.user_max_buy">{{ $t("UNIT_PRICE", "单价") }}:</span>
                <span v-else>{{$t('BUY_MINER_PRICE','价格')}}:</span>
              </span>
              <span v-else>
                {{ $t("START_MONEY", "起投金额") }}:
              </span>
            </div>
            <money-number
                :class="['margin-left-xs fs-12 ',{'money-number':(invest.type!='usdt')}]"
                :value="invest.min_money"
                :precision="0"
                :showSuffix="false"
            />
            <span class="money-unit fc-coin fs-12" v-if="invest.type=='usdt'">USDT</span>
            <span class="margin-left-xs" v-if="invest.is_number_buy"> / {{ $t('PICS', '台') }}</span>
          </div>
          <div
              class="flex align-center bg-f2f2f6 border-radius-sm padding-lr-sm"
              style="height:1.067rem"
          >
            <span class="margin-right-xs text-nowrap">
              <span v-if="invest.is_number_buy">{{ $t('AMOUNT', '数量') }}</span>
              <span v-else>{{ invest.type == "balance" ? system.default_currency : "USDT" }}</span>
            </span>
            <van-icon name="minus" class="margin-lr-lg" color="#432af5" v-if="invest.is_number_buy"
                      @click="deduceAmount"/>
            <van-field
                v-model="investAmount"
                :type="invest.is_number_buy?'digit':'number'"
                :formatter="invest.is_number_buy ? machineAmountFormatter : investAmountFormatter"
                :placeholder="invest.is_number_buy ? $t('ENTER_RENT_AMOUNT', '请输入租赁数量') : $t('ENTER_INVEST_AMOUNT', '请输入投资金额')"
                class="padding-0 no-bg font-bold"
                :input-align="invest.is_number_buy?'center':'left'"
            />
            <van-icon name="plus" :class="['margin-lr-lg',{'opacity-50':(invest.user_max_buy && investAmount>= restBuyNum)}]" color="#432af5" v-if="invest.is_number_buy" @click="addAmount"/>
            <van-button
                class="font-400 no-border no-bg fc-432af5 text-nowrap"
                size="small"
                plain
                @click="investAll"
            >
              <span v-if="invest.is_number_buy">{{ $t("ALL_RENT", "全部租赁") }}</span>
              <span v-else>{{ $t("ALL_INVEST", "全部投资") }}</span>
            </van-button>
          </div>
          <div class="flex align-center fs-12">
            <div class="flex align-center margin-right-xs">
              <img
                  class="size-15 margin-right-xs"
                  src="../assets/images/warning@2x.png"
                  alt=""
              />
              <span class="margin-right-xs">{{ $t("AVAILABLE_BALANCE", "可用余额") }}</span>
              <money-number
                  :class="['font-bold',{'money-number':(invest.type!='usdt')}]"
                  :value="invest.type == 'balance' ? wallet.balance : wallet.usdt_balance"
                  :precision="invest.type == 'balance' ? coin_unit.balance : coin_unit.usdt"
              />
              <span class="money-unit font-bold fc-coin" v-if="invest.type=='usdt'">USDT</span>
            </div>
            <van-button
                class="no-border fc-432af5"
                size="small"
                @click="$router.push({ name: 'Deposit' })"
            >{{ $t("TO_DEPOSIT", "去充值") }}
            </van-button
            >
          </div>
          <div class="margin-bottom flex align-center fs-12" v-if="(invest.is_number_buy && invest.user_max_buy) || (!invest.is_number_buy && invest.user_max_amount)">
            <div class="flex align-center margin-right-xs">
              <img
                  class="size-15 margin-right-xs"
                  src="../assets/images/warning@2x.png"
                  alt=""
              />
              <template v-if="invest.is_number_buy">
                <span class="margin-right-xs">{{ $t("AVAILABLE_BUY_AMOUNT", "剩余可购买数量") }}</span>
                <span class="font-bold">{{ Math.floor((invest.user_max_amount - invest.user_amount) / invest.min_money)
                  }} {{ $t('PICS', '台') }}</span>
              </template>
              <template v-else>
                <span class="margin-right-xs">{{ $t("REST_INVEST_AMOUNT", "剩余可投资金额") }}</span>
                <money-number
                  :class="[{'money-number':(invest.type!='usdt')}]"
                  :value="invest.user_max_amount - invest.user_amount"
                />
                <span class="money-unit font-bold fc-coin" v-if="invest.type=='usdt'">USDT</span>
              </template>
            </div>
          </div>
          <van-row gutter="10">
            <van-col
                span="8"
                v-for="(item, i) in invest.select_money_list"
                :key="'invest-amount' + i"
            >
              <van-button
                  :class="[
                      'border-radius-xs',
                      'margin-bottom-sm',
                      'fs-12',
                      'van-overflow-hidden',
                      {'opacity-50':(invest.user_max_buy && invest.is_number_buy && item>restBuyNum) || (invest.user_max_buy && invest.is_number_buy && item > restInvestMoney)}
                  ]"
                  color="#432af5"
                  block
                  size="small"
                  :plain="item !== parseInt(investAmount)"
                  @click="changeInvestAmount(item)"
              >
                <div class="flex align-center justify-center">
                  <span class="font-bold">
                    <money-number
                        :class="[{'money-number':(!invest.is_number_buy && invest.type!='usdt')}]"
                        :value="item"
                    />
                  </span>
                  <span class="money-unit" v-if="invest.is_number_buy"></span>
                  <span class="money-unit fc-coin" v-else>
                    <span v-if="invest.type=='usdt'">USDT</span>
                  </span>
                </div>
              </van-button>
            </van-col>
          </van-row>
          <van-button
              :disabled="!allowInvest"
              :loading="loadingBuy"
              class="border-radius-sm margin-tb bg-gradient fc-fff"
              block
              @click="startInvest"
          >
            <span v-if="invest.is_number_buy">{{ $t("MINING_NOW", "立即挖矿") }}</span>
            <span v-else>{{ $t("BUY_NOW", "立即购买") }}</span>

            <span>（</span>
            <money-number
                :value="invest.is_number_buy ? investAmount * invest.min_money : investAmount"
                :class="[{'money-number':(invest.type!='usdt')}]"
            />
            <span>USDT</span>
            <span>）</span>
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {Col, Field, NavBar, Progress, Row, Button, Icon, Dialog, Cell, Popup} from "vant";
import {Base} from "@/mixins";
import {ActivityIndicator, Toast} from "mand-mobile";
import MoneyNumber from "@/components/MoneyNumber";
import Typeing from "@/components/Typeing";

export default {
  components: {
    Typeing,
    MoneyNumber,
    [NavBar.name]: NavBar,
    [Progress.name]: Progress,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Dialog.Component.name]: Dialog.Component,
    [ActivityIndicator.name]: ActivityIndicator,
    [Popup.name]: Popup,
  },
  data: () => {
    return {
      investAmount: "",
      invest: {},
      showMore: false,
      allowShowMore: true,
      investSuccess: false,
      showDepositModel: false,
      showClose: false,
      calcProfitText: '',
      showCalc: false,
      calculating: false,
      calcTimer: null,
      showBuyPanel: false,
      loadingBuy: false,
    };
  },
  computed: {
    calcProfit() {
      if (this.investAmount) {
        try {
          let n = (this.invest.day_rate / 100) * this.invest.day_cycle * (this.investAmount || 0);
          if (this.invest.is_number_buy) {
            n = n * this.invest.min_money
          }
          return this.invest.type == 'usdt'
              ? parseFloat(this.$usdtFormat(n, true))
              : parseFloat(this.$balanceFormat(n, true))

        } catch (err) {
        }
      }
      return 0
    },
    allowInvest() {
      let n = parseFloat(this.investAmount);
      // let total =
      //   this.invest.type == "balance"
      //     ? this.wallet.balance
      //     : this.wallet.usdt_balance;
      // return n && n <= total && n >= this.invest.min_money;

      // if (this.invest.is_number_buy) {
      //   return n > 0
      // } else {
      //   return n && n >= this.invest.min_money;
      // }
      return n > 0
    },
    restBuyNum() {
      let restAmount = Math.floor((this.invest.user_max_amount - this.invest.user_amount) / this.invest.min_money)
      return restAmount
    },
    restInvestMoney() {
      return this.invest.user_max_amount - this.invest.user_amount
    }
  },
  watch: {
    investAmount() {
      this.calculating = true
      clearTimeout(this.calcTimer)
      this.calcTimer = setTimeout(() => {
        let year_rate = parseFloat((this.invest.day_rate * 365).toFixed(2))
        let coin = this.invest.type == 'usdt' ? 'USDT' : this.system.default_currency
        if (this.invest.is_number_buy) {
          this.calcProfitText = `${this.investAmount || 0} * ${this.invest.min_money} * (${year_rate}% / 365) * ${this.invest.day_cycle} ≈ ${this.calcProfit} ${coin}`
        } else {
          this.calcProfitText = `${this.investAmount || 0} * (${year_rate}% / 365) * ${this.invest.day_cycle} ≈ ${this.calcProfit} ${coin}`
        }
        this.calculating = false
        this.showCalc = true
      }, 1000)
    }
  },
  mixins: [Base],
  mounted() {
    this.getData();
    setTimeout(() => {
      try {
        if (this.$refs.hideMoreEl.scrollHeight > window.innerWidth * 0.3) {
          this.allowShowMore = true;
        } else {
          this.allowShowMore = false;
        }
      } catch (err) {
      }
    }, 50);
  },
  methods: {
    investAmountFormatter(v) {
      let restMoney = this.invest.user_max_amount - this.invest.user_amount
      if (restMoney < this.invest.min_money) {
        return 0
      } else {
        return this.invest.type == 'usdt' ? this.$usdtFormat(v) : this.$balanceFormat(v)
      }
    },
    machineAmountFormatter(v) {
      if (this.invest.user_max_buy) {
        let restAmount = Math.floor((this.invest.user_max_amount - this.invest.user_amount) / this.invest.min_money)
        if (parseInt(v) > restAmount) {
          return restAmount
        }
      }
      return v
    },
    deduceAmount() {
      if (this.investAmount <= 1) {
        return
      }
      this.investAmount = parseInt(this.investAmount) - 1
    },
    addAmount() {
      if (this.invest.user_max_buy) {
        if (this.investAmount < this.restBuyNum) {
          this.investAmount = parseInt(this.investAmount) + 1
        } else {
          Toast.failed(this.$t("AVAILABLE_BUY_AMOUNT", "剩余可购买数量") + ':' + this.restBuyNum)
        }
      } else {
        this.investAmount = parseInt(this.investAmount) + 1
      }
    },
    watchScroll() {
      this.$nextTick(() => {
        let navbar = document.getElementById('invest-nav-bar')
        let st = document.documentElement.scrollTop
        if (st < 100) {
          if (st < 60) {
            st = 60
          }
          navbar.style.background = `rgba(255,255,255,${st / 100})`
        } else {
          navbar.style.background = '#fff'
        }
      })
    },
    typingEnd() {
      setTimeout(() => {
        this.showCalc = false
      }, 1000)
    },
    seeMyInvest() {
      this.investSuccess = false;
      this.$router.push({name: "Invest"});
    },
    investAll() {
      let total = 0
      if (this.invest.is_number_buy) {
        total = this.invest.type == "balance"
            ? Math.floor(this.wallet.balance / this.invest.min_money)
            : Math.floor(this.wallet.usdt_balance / this.invest.min_money)
      } else {
        total = this.invest.type == "balance"
            ? this.wallet.balance
            : this.wallet.usdt_balance;
      }
      this.investAmount = total;
    },
    closeDeposit() {
      this.showClose = false
      this.showDepositModel = false
    },
    startDeposit() {
      this.closeDeposit()
      localStorage.setItem('BuyProduct', this.invest.id)
      localStorage.setItem('ProductPrice', this.invest.is_number_buy ? this.investAmount * this.invest.min_money : this.investAmount)
      this.$router.push({name: 'Deposit'})
    },
    changeInvestAmount(n) {
      if (this.invest.user_max_buy) {
        if (n > this.restBuyNum) {
          if (this.invest.is_number_buy) {
            Toast.failed(this.$t("AVAILABLE_BUY_AMOUNT", "剩余可购买数量") + ':' + this.restBuyNum)
          } else {
            Toast.failed(this.$t("REST_INVEST_AMOUNT", "剩余可投资金额") + ':' + this.restInvestMoney + (this.invest.type == 'usdt' ? 'USDT' : this.system.default_currency))
          }
          return
        }
      }
      this.investAmount = n
    },
    startInvest() {
      let total =
          this.invest.type == "balance"
              ? this.wallet.balance
              : this.wallet.usdt_balance;
      let amount = this.invest.is_number_buy
          ? parseFloat(this.investAmount) * this.invest.min_money
          : parseFloat(this.investAmount)

      if (total < amount) {
        this.showDepositModel = true
        setTimeout(() => {
          this.showClose = true
        }, 2000)
        return
      }
      Toast.loading("loading");
      this.loadingBuy = true
      this.$http
          .post("v1/buyProduct", {
            id: this.invest.id,
            amount: parseFloat(this.investAmount),
          })
          .then((res) => {
            this.showBuyPanel = false
            this.investSuccess = true;
            this.$store.dispatch("refreshUser");
            this.getData();
            Toast.hide();
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          })
          .finally(() => {
            this.loadingBuy = false
          });
    },
    getData() {
      Toast.loading("loading");
      this.$http
          .get("v1/product", {
            params: {id: this.$route.query.id},
          })
          .then((res) => {
            this.invest = res.data.product;
            if (this.invest.is_number_buy) {
              this.investAmount = 1
            } else {
              this.investAmount = this.invest.select_money_list[0] || "";
            }
            Toast.hide();
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
    },
  },
};
</script>

<style lang="scss">
.invest-detail-page {
  position: relative;

  .fixed-tapbar {
    * {
      color: currentColor !important;
    }

    &::after {
      border: none !important;
    }
  }

  .close-icon {
    z-index: 1;
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }

  .fixed-btn {
    z-index: 1;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0.05333rem 0.16rem 0.02667rem rgba(0, 0, 0, 0.16);
  }
}
</style>
