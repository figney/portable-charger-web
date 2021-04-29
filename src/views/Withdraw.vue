<template>
  <div class="withdraw-page flex flex-direction app-appbar">
    <van-nav-bar
      style="z-index:3"
      :title="$t('WITHDRAW_WEB', '提现')"
      fixed
      left-arrow
      :right-text="$t('HISTORY','记录')"
      @click-left="$router.go(-1)"
      @click-right="$router.push({name:'WithdrawHistory'})"
    />
    <template v-if="(channel.length==0 && inited)">
      <div class="margin border-radius padding white-view flex flex-direction align-center justify-center" style="min-height:calc(100vh - 2.04rem)">
        <img src="../assets/images/default3@2x.png" style="width:1.8rem" class="margin-bottom">
        <span class="text-center fc-666">{{$t('CAN_NOT_WITHDRAW_WAIT','暂时无法提现，请稍候')}}</span>
      </div>
    </template>
    <template>
      <div
          class="padding-top padding-lr padding-bottom-sm margin white-view border-radius flex  box-shadow"
      >
        <div class="Avatar">
          <img class="avatar border-radius-50 size-52 margin-right-sm" :src="user.name | avatar" alt=""/>
        </div>
        <div class="flex flex-direction">
          <p class="fs-11 margin-top-xs fc-666">{{ $t("ACCOUNT_BANLANCE","账户余额")}}</p>
          <div class="margin-lr-xs flex align-baseline font-bold fs-20">
                <money-number
                    :class="[{'money-number':(currentChannel.type!='USDT_TRC20')}]"
                    :value="currentChannel.type=='USDT_TRC20' ? all_property.usdt.usable : all_property.balance.usable"
                    :precision="currentChannel.type=='USDT_TRC20' ? coin_unit.usdt : coin_unit.balance"
                />
                <span class="money-unit fc-coin" v-if="currentChannel.type=='USDT_TRC20'">USDT</span>
              </div>
        </div>
      </div>
    </template>
    
    <template >
      <div class="flex flex-direction margin-bottom" v-if="!submitSuccess">
        <div
          class="border-radius-bottom padding"
          style="height:4.6rem"
        />
        <div
          class="margin white-view border-radius box-shadow flex flex-direction"
          style="margin-top:-4.5rem"
        >
          <div class="white-view border-radius shadow-light padding">
            <div class="margin-bottom-sm flex align-center">
              <div class="fs-18 font-bold">
                {{ $t("WITHDRAW_AMOUNT", "提现金额") }}
              </div>
              <div class="flex-sub"/>
              
              <!-- <div class="margin-lr-xs flex align-baseline font-bold fs-14">
                <money-number
                    :class="[{'money-number':(currentChannel.type!='USDT_TRC20')}]"
                    :value="currentChannel.type=='USDT_TRC20' ? all_property.usdt.usable : all_property.balance.usable"
                    :precision="currentChannel.type=='USDT_TRC20' ? coin_unit.usdt : coin_unit.balance"
                />
                <span class="money-unit fc-coin" v-if="currentChannel.type=='USDT_TRC20'">USDT</span>
              </div> -->
            </div>

            <van-field
              class="border-radius-sm bg-f2f2f6 margin-bottom-sm font-bold"
              v-model="amount"
              :type="currentChannel.type=='OnLine'?'digit':'number'"
              :formatter="currentChannel.type=='USDT_TRC20' ? $usdtFormat : $balanceFormat"
              :placeholder="$t('ENTER_WITHDRAW_AMOUNT', '请输入提现金额')"
              @click-right-icon="useAllBalance"
            >
              <template #left-icon>
                <div class="fs-12 fc-2acd72 font-400 margin-right-xs fc-default">
                  {{ currentChannel.type=='USDT_TRC20'?'USDT':system.default_currency }}
                </div>
              </template>
              <template #right-icon>
                <div class="fs-12 fc-2acd72 font-400">{{ $t("ALL", "全部") }}</div>
              </template>
            </van-field>

            <!-- 印度的提现必须提整数，所以改成额外扣手续费 -->
            <!-- <div class="flex align-center margin-right-xs opacity-80 margin-bottom-xs">
              <img
                class="size-15 margin-right-xs"
                src="../assets/images/warning@2x.png"
                alt=""
              />
              <div class="fs-13">{{ $t("SERVER_FEE", "提现手续费") }}</div>
              <div class="margin-lr-xs flex align-baseline font-bold">
                <money-number
                    :class="[{'money-number':(currentChannel.type!='USDT_TRC20')}]"
                    :value="currentChannel.rate * 0.01 * amount"
                    :precision="currentChannel.type=='USDT_TRC20' ? coin_unit.usdt : coin_unit.balance"
                />
                <span class="money-unit fc-coin" v-if="currentChannel.type=='USDT_TRC20'">USDT</span>
              </div>
            </div> -->

            <!-- <div class="flex align-center margin-right-xs opacity-80 margin-bottom-xs">
              <img
                  class="size-15 margin-right-xs"
                  src="../assets/images/warning@2x.png"
                  alt=""
              />
              <div class="fs-13">{{$t('PROFIT_CAN_WITHDRAW','赠送金存入赚钱宝产生的收益可以提款')}}</div>
            </div>

            <div class="flex align-center margin-right-xs opacity-80 margin-bottom-xs">
              <img
                  class="size-15 margin-right-xs"
                  src="../assets/images/warning@2x.png"
                  alt=""
              />
              <div class="fs-13 font-bold fc-ff3636">{{$t('GIVE_CANT_WITHDRAW','赠送金不可提款')}}</div>
            </div> -->

          </div>
          <div class="margin flex flex-direction">
            <div class="fs-18 font-bold margin-bottom-sm">
              {{$t("SELECT_INCOME_BANK","选择收款银行")}}
            </div>
            <!-- <van-radio-group
              class="font-bold margin-bottom withdraw-ways"
              v-model="currentChannel"
              @change="currentChannelChange"
            >
              <van-radio
                  v-for="(ch,i) in channel"
                  :key="'withdraw-channel-'+i"
                  checked-color="#2acd72"
                  label-position="left"
                  :name="ch"
                  :class="['padding-sm border-radius-sm',{'current-channel':(currentChannel.id==ch.id)},{'opacity-80':(currentChannel.id!=ch.id)}]"
              >
                <span :class="['flex','align-center',{'fc-2acd72':(currentChannel.id==ch.id)}]">
                  <img class="size-30 margin-right-sm" :src="ch.cover">
                  <span>{{ch.title}}</span>
                </span>
              </van-radio>
            </van-radio-group> -->

            <template v-if="!currentChannel.select_bank">
              <div class="padding-tb-sm flex align-center">
                <img :src="currentChannel.cover" class="size-25 margin-right-sm" v-if="currentChannel.cover">
                <span>{{currentChannel.title}}</span>
              </div>
              <van-field
                  v-model="inp.value"
                  v-for="(inp,i) in currentChannel.input_config"
                  :key="currentChannel.type+'input'+i"
                  class="fs-13 font-bold border-radius-xs bg-f2f2f6 margin-bottom"
                  :placeholder="inp.label"
              ></van-field>
            </template>

            <template v-else>
              <!-- <div class="margin-tb-sm fs-12">选择收款银行</div> -->
              <div class="padding-sm margin-bottom-sm flex align-center bg-3d3a55 border-radius-xs fc-fff font-bold" @click="showSelectBank=true">
                <img :src="currentBank.bank_cover" class="size-25 margin-right-sm" v-if="currentBank.bank_cover">
                <span>{{currentBank.bank_name}}</span>
                <div class="flex-sub"></div>
                <van-icon name="arrow"/>
              </div>
              <van-field
                  v-model="inp.value"
                  v-for="(inp,i) in currentBank.input_config"
                  :key="currentBank.name+'input'+i"
                  class="fs-13 font-bold border-radius-xs bg-f2f2f6 margin-bottom"
                  :placeholder="inp.label"
              ></van-field>
            </template>

            <div class="margin-bottom-sm flex align-center " v-if="calcMin!=0">
              <span class="margin-right-sm">{{$t('MIN_WITHDRAW','最小提现金额')}}</span>
              <div class="flex align-baseline font-bold">
                <money-number
                  :class="['din-pro',{'money-number':(currentChannel.type!='USDT_TRC20')}]"
                  :value="calcMin"
                />
                <span class="money-unit fc-coin" v-if="currentChannel.type=='USDT_TRC20'">USDT</span>
              </div>
            </div>

            <div class="margin-bottom-sm flex align-center " v-if="calcMax!=0">
              <span class="margin-right-sm">{{$t('MAX_WITHDRAW','最大提现金额')}}</span>
              <div class="flex align-baseline font-bold">
                <money-number
                    :class="['din-pro',{'money-number':(currentChannel.type!='USDT_TRC20')}]"
                    :value="calcMax"
                />
                <span class="money-unit fc-coin" v-if="currentChannel.type=='USDT_TRC20'">USDT</span>
              </div>
            </div>

            <div class="margin-bottom-sm flex align-center  justify-between fs-18 margin-top">
              <span class="margin-right-sm">{{$t('WITHHDRAW_FEE','提现手续费')}}</span>
              <span class="din-pro font-bold">{{currentChannel.rate}}%</span>
            </div>

            <div class="flex align-center margin-bottom  justify-between fs-18">
              <span class="margin-right-sm">
                {{ $t("TOTAL_DEDUCE_AMOUNT", "合计扣费金额") }}
              </span>
              <div class="font-bold fc-2acd72 flex align-baseline">
                <money-number
                    :class="[{'money-number':(currentChannel.type=='USDT_TRC20')}]"
                    :value="calcPredictArrive"
                    :precision="currentChannel.type=='USDT_TRC20'?coin_unit.usdt:coin_unit.balance"
                />
                <span class="money-unit fc-coin" v-if="currentChannel.type=='USDT_TRC20'">USDT</span>
              </div>
            </div>

            <van-button
              block
              class="border-radius-xl font-bold margin-tb"
              color="#2acd72"
              :disabled="!allowSubmit"
              @click="beforeWithdraw"
              >{{ $t("WITHDRAW_NOW","立即提现")}}</van-button
            >

            <van-button
              block
              class="border-radius-xl font-bold margin-bottom fc-fff "
              color="#fff"
              plain
              @click="openVideo"
              style="background:#3d3a55;"
            >
              {{$t('HOW_TO_WITHDRAW','如何提现?')}}
            </van-button>
          </div>
        </div>

        <!-- <div
          class="margin-lr margin-bottom white-view box-shadow border-radius padding flex flex-direction"
          v-if="currentBank.remark || currentChannel.remark"
        >
          <div class="border-radius-xs padding-sm flex flex-direction bg-f8ede5">
            <div class="withdraw-tip fs-12">
              <span v-if="currentChannel.select_bank">{{currentBank.remark || currentChannel.remark}}</span>
              <span v-else>{{currentChannel.remark}}</span>
            </div>
          </div>
        </div> -->
      </div>
<!-- 提现邀请成功 -->
      <div class="flex flex-direction" v-else>
        <div
          class="bg-2acd72 border-bottom padding"
          style="height:6.6rem"
        > 
          <div class="flex flex-direction">
            <div class="flex justify-center margin-top-xl">
              <img
                class="margin-bottom margin-right-sm"
                src="../assets/images/success_light@2x.png"
                style="width:1rem"
              />
              <div class="font-bold fs-24 text-center fc-fff">
                {{ $t("RECHARGE_APPLY_SUCCESS","提现申请成功")}}
              </div>
            </div>

              <div class="margin-bottom text-center fc-fff">
                {{ $t("ESTIMATED_ARRIVE", "预计1-5分钟到账,请您耐心等待！") }}
              </div>

          </div>
        </div>
        <div
          class=" margin white-view border-radius box-shadow flex flex-direction align-center"
          style="margin-top:-3rem; height:5.2rem;"
        >
          
          <div class="margin padding-lr" style="width:100%">
          <div>
            <p class="text-center">{{ $t("POPULAR_RECOMMENDDATION","热门推荐")}}</p>
            <div class="flex justify-between">
              <div class="flex">
                <img
                  class="margin-bottom margin-right-sm"
                  src="../assets/images/icon_3@2x.png"
                  style="width:0.5rem"
                />
                <p class="font-900 margin-bottom-xs fs-18">{{ $t("THREE_SOCKET_POWERBANK","三插口充电宝")}}</p>
              </div>
              <p class="fc-ff3636 fs-10 margin-top-xs font-900">{{ $t("MATURITY_AUTO_RETURN","到期自动退回租赁费")}}</p>
            </div>
          </div>

          <div class="flex flex-direction">
            <div class="flex justify-between">
              <div class="flex margin-top">
                <p>{{ $t("DAY_INCPME","日收益")}}</p>
                <p style="color:orange;">2586VND</p>
              </div>
              <div class="margin-right-lg fs-20 margin-top-sm">2Day</div>
            </div>

            <div class="flex justify-between">
              <div class="flex ">
                <p>{{ $t("MONTH_INCPME","月收益")}}</p>
                <p style="color:orange;">2586VND</p>
              </div>
              <div class="margin-right ">{{ $t("LEASE_CYCLE","租赁周期")}}</div>
            </div>

            <div class="flex justify-between">
              <div class="flex  ">
                <p>{{ $t("RENTAL_FEES","租赁费")}}</p>
                <p style="color:orange;">2586VND</p>
              </div>
              <van-button class="bg-393939 border-radius-xl money fc-13b271 margin-left-lg">{{ $t("RENT_TO_MAKE_MONEY","租赁赚钱")}}</van-button>
            </div>
          </div>
         </div>
        </div>
          <van-button
              class=" font-bold margin-bottom"
              block
              color="#2acd72"
              @click="finishWithdraw"
              style="width:90%;margin:0 auto;border-radius:0.6rem;"

              >{{ $t("FINISH", "完成") }}</van-button
          >
          <div class="vw-90 border-radius-sm bg-red padding margin-top-sm margin-bottom-sm bg-purple fc-fff" style="margin:1rem auto">
            {{ $t("INVITE_FRIEND_INCOME_HIGHER","邀请好友赚现金，好友越多收益越高！")}}
          </div>
      </div>


    </template>

    <!-- 嵌入的 Youtube 视频 -->
    <van-popup position="bottom" v-model="showVideo">
      <div class="white-view padding-top padding-lr flex flex-direction position-re vh-100 vw-100">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#2acd72"
            class="position-ab close-icon"
            @click="showVideo=false"
        />
        <div class="fs-18 font-bold text-center padding-bottom-sm margin-bottom" style="border-bottom:1px solid #EEECFA">{{$t('HOW_TO_WITHDRAW','如何提现')}}</div>
        <div class="border-radius-xs bg-f2f2f6 van-overflow-hidden flex flex-direction" style="width:100%;height:90%;">
          <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/RRvb2z2CgtY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </van-popup>

    <!-- 选择二级 channel item -->
    <van-popup
        get-container=".wallet-history-page"
        v-model="showSelectBank"
        round
        position="bottom"
        class="margin-tb border-radius no-bg padding-lr"
    >
      <div class="padding position-re white-view border-radius box-shadow">
        <van-icon
            @click="showSelectBank = false"
            size="0.5rem"
            color="#2acd72"
            class="position-ab margin-right margin-top"
            style="font-weight:bold;right:0;top:0;"
            name="cross"
        />
        <div class="flex flex-direction vh-70">
          <div class="fs-16 text-center font-bold white-view padding-tb-sm" style="border-bottom:1px solid #EEECFA">{{$t('SELECT_BANK','选择银行')}}</div>
          <div class="whtie-view padding-sm"/>
          <div class="flex flex-direction flex-sub"  style="overflow:auto">
            <van-button
                v-for="(item, i) in currentChannel.channel_list"
                :key="'select-type' + i"
                :color="currentBank == item ? '#2acd72' : ''"
                class="bg-f2f2f6 border-radius-xl margin-bottom-sm padding-top-sm padding-bottom-sm"
                block
                @click="changeBank(item)"
            >
              <span class="font-bold ">{{ item.bank_name }}</span>
            </van-button>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 提现确认 -->
    <van-popup
      class="vw-80 border-radius padding"
      v-model="showWithdrawSure"
    >
      <div class="flex flex-direction">
        <div class="fs-18 font-bold text-center margin-bottom">{{$t('WITHDRAW_SURE','提现确认')}}</div>
        <div class="margin-bottom-sm">{{$t('WILL_DEDUCE_N_GIFT_MONEY',[withdrawInfo.deduct_money+' '+system.default_currency],'将扣除N赠送金')}}</div>
        <div class="flex flex-direction padding-lr-sm fs-12 fc-888 margin-bottom">
          <div class="margin-bottom-xs flex align-center justify-between" v-if="withdrawInfo.give_balance">
            <span class="margin-right-xs">{{$t('GIFT_BALANCE','赠送金余额')}}:</span>
            <span>- {{withdrawInfo.give_balance >= withdrawInfo.deduct_money ? withdrawInfo.deduct_money : withdrawInfo.give_balance }} {{system.default_currency}}</span>
          </div>
          <div class="flex align-center justify-between" v-if="withdrawInfo.money_bao_deduct_give_balance">
            <span class="margin-right-xs">{{$t('MONEY_BAO_BALANCE','赚钱宝余额')}}:</span>
            <span>- {{withdrawInfo.money_bao_deduct_give_balance }} {{system.default_currency}}</span>
          </div>
        </div>
        <div class="flex align-center">
          <van-button color="#2acd72" class="margin-right-xs" round block plain @click="showWithdrawSure=false">{{$t('CANCEL','取消')}}</van-button>
          <van-button color="#2acd72" class="margin-left-xs" round block @click="startWithdraw">{{$t('SURE','确认')}}</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import MoneyNumber from "@/components/MoneyNumber";
import {Toast} from "mand-mobile"
import { Button, Icon, NavBar, Field, RadioGroup, Radio, Popup } from "vant";
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
  },
  data: () => {
    return {
      showVideo: false,
      currentWithdrawParams: {},
      amount: '',
      transPwd: "",
      currentChannel: {},
      currentBank: {},
      channel: [],
      submitSuccess: false,
      showSelectBank: false,
      showWithdrawSure: false,
      withdrawInfo: {
        deduct_money: 0,
        give_balance: 0,
        money_bao_deduct_give_balance: 0
      },
      inited: false
    };
  },
  mixins: [Base],
  computed: {
    allowSubmit() {
      if (!this.amount) {
        return false
      }

      if (this.currentChannel.select_bank) {
        if (this.currentBank.input_config) {
          for (let inp of this.currentBank.input_config) {
            if (!inp.value) {
              return false
            }
          }
        }
        if (this.currentBank.max_money != 0 && this.amount > this.currentBank.max_money) {
          return false
        }
        if (this.currentBank.min_money !=0 && this.amount < this.currentBank.min_money) {
          return false
        }
      } else {
        if (this.currentChannel.input_config) {
          for (let inp of this.currentChannel.input_config) {
            if (!inp.value) {
              return false
            }
          }
          if (this.currentChannel.max_money != 0 && this.amount > this.currentChannel.max_money) {
            return false
          }
          if (this.currentChannel.min_money !=0 && this.amount < this.currentChannel.min_money) {
            return false
          }
        }
      }
      return true
    },
    calcPredictArrive() {
      let n = Number(this.amount)
      let num = n * (1 + this.currentChannel.rate / 100)
      return isNaN(num) ? 0 : num
    },
    calcMin() {
      let min = 0
      if (this.currentChannel.select_bank) {
        let bankMin = this.currentBank.min_money,
            channelMin = this.currentChannel.min_money;
        min = bankMin == 0 ? channelMin : bankMin
      } else {
        min = this.currentChannel.min_money
      }
      return min
    },
    calcMax() {
      let max = 0
      if (this.currentChannel.select_bank) {
        let bankMax = this.currentBank.max_money,
            channelMax = this.currentChannel.max_money;
        max = bankMax == 0 ? channelMax : bankMax
      } else {
        max = this.currentChannel.max_money
      }
      return max
    }
  },
  mounted() {
    this.getWithdrawInfo()
  },
  methods: {
    openVideo() {
      this.showVideo = true
    },
    resetInput() {
      // this.amount = ''
      this.channel.forEach(ch=>{
        if (ch.select_bank) {
          ch.channel_list.forEach(child_ch=>{
            child_ch.input_config.forEach(inp=>{
              inp.value = ''
            })
          })
        } else {
          ch.input_config.forEach(inp=>{
            inp.value = ''
          })
        }
      })
    },
    useAllBalance() {
      if (this.currentChannel.type=='USDT_TRC20') {
        let fee = this.all_property.usdt.usable * (this.currentChannel.rate / 100)
        this.amount = this.all_property.usdt.usable - fee
      } else {
        let fee = this.all_property.balance.usable * (this.currentChannel.rate / 100)
        this.amount = Math.floor(this.all_property.balance.usable - fee)
      }
    },
    currentChannelChange() {
      if (this.currentChannel.select_bank) {
        this.currentBank = this.currentChannel.channel_list[0]
      } else {
        this.currentBank = {}
      }
      this.resetInput()
    },
    getWithdrawInfo() {
      Toast.loading('loading')
      this.$http.get('v1/withdrawBegin')
        .then(res=>{
          this.channel = res.data.list
          if (this.channel.length) {
            this.currentChannel = this.channel[0]
            if (this.currentChannel.select_bank) {
              this.currentBank = this.currentChannel.channel_list[0]
            }
          }
          this.inited = true
          Toast.hide()
        })
        .catch(err=>{
          Toast.failed(err.data.message)
        })
    },
    beforeWithdraw() {

      // if (this.currentChannel.type == 'OnLine' && this.all_property.balance.usable >= 400000) {
      //   Toast.failed(this.$t('REAMING_INFO','银行系统维护中，预计 2021-04-13 00:00:00 维护完成'))
      //   return
      // }

      let params = {
        type: this.currentChannel.type,
        amount: parseFloat(this.amount),
        channel_id: this.currentChannel.id,
        channel_item_id: this.currentBank.id || 0,
        input_data: {}
      }

      if (this.currentChannel.select_bank) {
        for (let inp of this.currentBank.input_config) {
          params.input_data[inp.name] = inp.value || ''
        }
      } else {
        for (let inp of this.currentChannel.input_config) {
          params.input_data[inp.name] = inp.value || ''
        }
      }

      if (params.type=='USDT_TRC20' && !params.input_data.address.startsWith('T')) {
        Toast.failed(this.$t('ONLY_SUPPORT_TRC20','只能使用 USDT_TRC20 进行提现'))
        return
      }

      this.currentWithdrawParams = params

      Toast.loading('loading')
      this.$http.get('v1/getDeductInfo',{
        params: {
          type: this.currentChannel.type,
          amount: this.amount,
          channel_id: this.currentChannel.id
        }
      }).then(res=>{
        Toast.hide()
        this.withdrawInfo = res.data
        if (res.data.deduct_money) {
          this.showWithdrawSure = true
        } else {
          this.startWithdraw()
        }
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    },
    startWithdraw() {
      this.showWithdrawSure = false
      Toast.loading('loading')
      this.$http.post('v1/putInWithdraw',this.currentWithdrawParams)
        .then(res=>{
          Toast.hide()
          this.submitSuccess = true
          this.$store.dispatch('refreshUser')
        })
        .catch(err=>{
          Toast.failed(err.data.message)
        })
        .finally(()=>{
          this.currentWithdrawParams = {}
        })
    },
    changeBank(item) {
      this.currentBank = item
      this.showSelectBank = false
      this.resetInput()
    },
    finishWithdraw() {
      this.resetInput()
      this.submitSuccess = false
    }
  },
};
</script>

<style lang="scss">
.withdraw-page {
  .withdraw-tip {
    display: flex;
    align-items: flex-start;

    &::before {
      content: "";
      width: 6px;
      min-width: 6px;
      height: 6px;
      background: #c79f82;
      border-radius: 50%;
      margin: 6px 6px 6px 0;
    }
  }

  .close-icon {
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }

  .withdraw-ways {
    .van-radio__label {
      flex-grow: 1;
    }
  }

  .current-channel {
    background-color: #f7f9ff;
    box-shadow: 0 0.05333rem 0.16rem 0.02667rem rgba(0,0,0,0.08);
  }
}
</style>
