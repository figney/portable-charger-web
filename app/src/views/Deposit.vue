<template>
  <div class="deposit-page app-appbar">
    <van-nav-bar
        :title="$t('RECHARGE', '充值')"
        fixed
        left-arrow
        :right-text="$t('BILL', '账单')"
        @click-left="$router.push({ name: 'HomeUser' })"
        @click-right="$router.push({ name: 'DepositHistory' })"
    />
    <template>
      <div
          class="padding-top padding-lr padding-bottom-sm margin white-view border-radius flex  box-shadow"
      >
        <div class="Avatar">
          <img class="avatar border-radius-50 size-52 margin-right-sm" :src="user.name | avatar" alt=""/>
        </div>
        <div class="flex flex-direction">
          <p class="fs-11 margin-top-xs fc-666">{{ $t("ACCOUNT_BANLANCE","账户余额")}}</p>
          <p class="fs-20 font-900">000000000</p>
        </div>
      </div>
    </template>
    <template>
      <div
          class="padding-top padding-lr padding-bottom-sm margin white-view border-radius flex flex-direction box-shadow"
      >
        <div class="fs-18 font-bold margin-bottom-sm">
          {{ $t("DEPOSIT_AMOUNT", "充值金额") }}
        </div>
        <div class="flex align-center border-radius-sm bg-f2f2f6 margin-bottom">
          <div class="padding-left-sm">
            {{
              currentChannel.type == "USDT_TRC20"
                  ? "USDT"
                  : system.default_currency
            }}
          </div>
          <van-field
              type="number"
              :formatter="
              currentChannel.type == 'USDT_TRC20' ? $usdtFormat : $balanceFormat
            "
              v-model="amount"
              class="no-bg padding-lr-sm"
              clearable
              :placeholder="$t('ENTER_DEPOSIT_AMOUNT', '请输入充值金额')"
          ></van-field>
        </div>
        <van-row type="flex" justify="space-between">
          <van-col
              span="11"
              v-for="(item, i) in amount_list"
              :key="'invest-amount' + i"
          >
            <van-button
                class="border-radius-xs margin-bottom-sm fs-13"
                color="#2acd72"
                block
                size="small"
                :plain="currentChannel.type == 'USDT_TRC20' ? calcUSDT(item)!=parseInt(amount) : item != parseInt(amount)"
                @click="amount = currentChannel.type == 'USDT_TRC20'? calcUSDT(item) : item "
            >
              <span class="flex align-baseline din-pro">
                <money-number
                    :class="[{'money-number':(currentChannel.type != 'USDT_TRC20')}]"
                    :value="currentChannel.type == 'USDT_TRC20'? calcUSDT(item) : item "
                    :precision="0"
                />
                <span class="money-unit fc-coin" v-if="currentChannel.type=='USDT_TRC20'">USDT</span>
              </span>
            </van-button>
          </van-col>
        </van-row>
      </div>
      <div
          class="padding-top padding-lr padding-bottom-sm margin white-view border-radius flex flex-direction box-shadow"
      >
        <div class="fs-18 font-bold margin-bottom-sm">
          {{ $t("SELECT_DEPOSIT_WAY", "选择充值方式") }}
        </div>
        <van-radio-group v-model="currentChannel">
          <van-radio
              checked-color="#2acd72"
              class="padding-tb-sm"
              v-for="(ch, i) in channel"
              :key="'deposit-way' + i"
              :name="ch"
          >
            {{ ch.title }}
          </van-radio>
        </van-radio-group>

        <!-- 官方指定收款人账户 -->
        <!-- <div
            class="margin-top flex flex-direction"
            v-if="currentChannel.type === 'TransferAccounts'"
        >
          <div class="fs-18 font-bold margin-bottom-sm">
            {{ $t("RECEIVER_INFO", "收款人信息") }}
          </div>
          <div class="flex align-center  margin-bottom-sm fs-13">
            <div
                class="margin-right-sm van-overflow-hidden text-ellipsis text-nowrap"
                style="max-width:2rem;min-width:2rem"
            >
              {{ $t("RECEIVER_NAME", "收款人姓名") }}
            </div>
            <van-field
                :value="receiver.card_user_name"
                readonly
                class="bg-f2f2f6 border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
                @click="$copyText(receiver.card_user_name)"
            >
              <template #right-icon>
                <img src="../assets/images/copy@2x.png" style="height:0.5rem">
              </template>
            </van-field>
          </div>
          <div class="flex align-center  margin-bottom-sm fs-13">
            <div
                class="margin-right-sm van-overflow-hidden text-ellipsis text-nowrap"
                style="max-width:2rem;min-width:2rem"
            >
              {{ $t("RECEIVER_ACCOUNT", "收款人账户") }}
            </div>
            <van-field
                :value="receiver.card_number"
                readonly
                class="bg-f2f2f6 border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
                @click="$copyText(receiver.card_number)"
            >
              <template #right-icon>
                <img src="../assets/images/copy@2x.png" style="height:0.5rem">
              </template>
            </van-field>
          </div>
          <div class="flex align-center  margin-bottom-sm fs-13">
            <div
                class="margin-right-sm van-overflow-hidden text-ellipsis text-nowrap"
                style="max-width:2rem;min-width:2rem"
            >
              {{ $t("RECEIVER_BANK", "开户行全称") }}
            </div>
            <van-field
                :value="receiver.card_bank_name"
                readonly
                class="bg-f2f2f6 border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
                @click="$copyText(receiver.card_bank_name)"
            >
              <template #right-icon>
                <img src="../assets/images/copy@2x.png" style="height:0.5rem">
              </template>
            </van-field>
          </div>
          <div class="flex align-center  margin-bottom-xs fs-13" v-if="receiver.min_money">
            <div
                class="margin-right-sm van-overflow-hidden text-ellipsis text-nowrap"
                style="max-width:2rem;min-width:2rem"
            >
              {{ $t("MIN_TRANSFER", "最小转账金额") }}
            </div>
            <van-field
                :value="receiver.min_money"
                readonly
                class="bg-f2f2f6 border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
                @click="$copyText(receiver.min_money)"
            >
              <template #right-icon>
                <img src="../assets/images/copy@2x.png" style="height:0.5rem">
              </template>
            </van-field>
          </div>
        </div> -->


        
      </div>
      <div class="margin">
        <van-button
            :disabled="!allowSubmit"
            class="border-radius-xl font-bold margin-bottom"
            block
            color="#2acd72"
            @click="startDeposit"
        >
          {{ $t("DEPOSIT_NOW_2", "立即充值") }}
        </van-button>
      </div>

      <div class="margin-lr margin-bottom">
        <!-- <div class="margin-lr margin-bottom" v-if="showVideo1 || showVideo2 || showVideo3"> -->
        <van-button class="border-radius-xl" color="#2acd72" plain block @click="openVideo">{{$t('HOW_TO_DEPOSIT','如何充值')}}?</van-button>
      </div>
    </template>

    <!-- 快捷支付选择银行弹窗 -->
    <van-popup
        v-model="showQuickPay"
        round
        position="bottom"
    >
      
      <div class="flex flex-direction">
        <div
            class="flex flex-direction white-view box-shadow margin-bottom-sm border-radius van-overflow-hidden"
            style="max-height:80vh"
        >
          <div class="fs-16 text-center font-bold white-view padding-top padding-bottom-sm" style="border-bottom:1px solid #EEECFA">{{$t('SELECT_BANK','选择银行')}}</div>
          <div class="padding-bottom-sm"/>
          <div class="flex flex-direction" style="overflow-y:auto">
            <div class="margin-lr margin-bottom" v-if="showVideo1 || showVideo2 || showVideo3">
              <van-button class="border-radius-sm bg-f8ede5 fc-ff3636 font-bold" block @click="openVideo">{{$t('HOW_TO_DEPOSIT','如何充值')}}</van-button>
            </div>
            <div
                class="flex flex-direction padding-tb-sm padding-lr-sm margin-bottom-sm margin-lr-sm bg-f7f9ff border-radius-xs bank-btn"
                @click="bankPay(bank)"
                v-for="(bank,i) in currentChannel.channel_list"
                :key="'bank-pay'+i"
            >
              <span class="font-bold fs-16">{{bank.bank_name}}</span>
              <div class="margin-top-sm flex flex-direction fs-10">
                <div class="flex align-center justify-between text-nowrap flex-sub">
                  <span class="fc-666 margin-right-xs">{{$t('MIN_DEPOSIT','最小充值金额')}}:</span>
                  <div v-if="bank.min_money">
                    <money-number
                        :value="bank.min_money"
                        :class="['fc-ff3636 font-bold ',{'money-number':(currentChannel.type!='usdt')}]"
                    />
                  </div>
                  <div class="fc-ff3636 font-bold" v-else>{{$t('NOT_LIMIT','无限制')}}</div>
                </div>
                <div class="flex align-center justify-between text-nowrap flex-sub">
                  <span class="fc-666 margin-right-xs">{{$t('MAX_DEPOSIT','最大充值金额')}}:</span>
                  <div v-if="bank.max_money">
                    <money-number
                        :value="bank.max_money"
                        :class="['fc-ff3636 font-bold ',{'money-number':(currentChannel.type!='usdt')}]"
                    />
                  </div>
                  <div class="fc-ff3636 font-bold" v-else>{{$t('NOT_LIMIT','无限制')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
            class="flex flex-direction white-view border-radius van-overflow-hidden box-shadow"
            @click="showQuickPay = false"
        >
          <van-button class="no-border" block plain size="large">{{
              $t("CANCEL", "取消")
            }}</van-button>
        </div>
      </div>
    </van-popup>

    <!-- 充值遇到问题？ -->
    <van-popup
        class="border-radius van-overflow-hidden vw-90"
        :close-on-click-overlay="false"
        v-model="showPayFailed"
    >
      <div class="padding-lr padding-tb-lg flex flex-direction position-re">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#2acd72"
            class="position-ab close-icon"
            @click="closePayFailed"
        />
        <div class="margin-bottom fs-16 font-bold text-center">
          {{ $t("DEPOSIT_FAILED", "充值失败") }}
        </div>
        <div class="margin-bottom-sm text-center">
          {{ $t("NOT_RECEIVE_YOUR_PAYINFO", "尚未收到您的付款信息") }}
        </div>
        <div class="text-center">
          {{
            $t(
                "DEPOSIT_CAN_PROFIT",
                "充值成功后可存入赚钱宝、投资产品，让你的收益翻倍"
            )
          }}
        </div>
      </div>
    </van-popup>

    <!-- 选择子银行列表 -->
    <van-popup position="bottom" v-model="showSonBank">
      <div class="white-view padding-top padding-lr flex flex-direction position-re vh-50 vw-100">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#2acd72"
            class="position-ab close-icon"
            @click="showSonBank=false"
        />
        <div class="fs-18 font-bold text-center padding-bottom-sm margin-bottom-sm" style="border-bottom:1px solid #EEECFA">{{$t('SELECT_BANK','选择银行')}}</div>
        <div class="flex flex-direction flex-sub position-re son-bank-list" style="overflow:auto">
          <div
              class="flex align-center justify-between padding-tb padding-lr-sm margin-bottom-sm bg-f7f9ff border-radius-xs bank-btn"
              v-for="(bank,i) in currentBank.son_bank_list"
              @click="sonBankPay(bank)"
              :key="'bank-pay'+i"
          >
            <span class="font-bold fs-16 text-nowrap">{{bank.name}}</span>
            <van-icon name="arrow"/>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 嵌入的 Youtube 视频 -->
    <van-popup position="bottom" round v-model="showVideo" closeable close-icon-position="bottom-left" :style="{ height: '52%' }">
      <div class="flex flex-direction ">
        <div class="flex margin justify-between" style="margin-top:0.5rem;" @click="bankVideo">
          <div class=" bg-666 border-radius-sm" style="width:2.5rem;height:2.5rem;">
            <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/3AL8Q08XYNc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="margin-top margin-left" >
              <p class="fs-20 font-400">{{ $t("BANK_TRANSFER_VIDEO","银行转账视频教学")}}</p>
              <p class="fc-888">{{ $t("UPDATED_ON","更新于")}}2021/02/21</p>
          </div>
          <div style="margin-top:0.9rem;">
             <img src="../assets/images/icon_5@2x.png" style="height:0.4rem">
          </div>
        </div>
        <hr class="vw-100" style="border:1px solid #c8c9cc;"/>
       <div class="flex margin justify-between" style="margin-top:0.8rem;" @click="onlineVideo">
          <div class=" bg-red border-radius-sm" style="width:2.5rem;height:2.5rem;">
            <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/3AL8Q08XYNc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="margin-top margin-left">
              <p class="fs-20 font-400">{{ $t("BANK_PAY_VIDEO","银行支付视频教学")}}</p>
              <p class="fc-888">{{ $t("UPDATED_ON","更新于")}}2021/02/21</p>
          </div>
          <div style="margin-top:0.9rem;">
             <img src="../assets/images/icon_5@2x.png" style="height:0.4rem">
          </div>
        </div>
      </div>

      <!-- 放大视频 -->
      <van-popup
        position="bottom"  
         closeable
         
        :style="{ height: '100%' }"
        v-model="show_bankvideo"
      >
          <div style="width:100%;height:85%;margin-top:15%;">
            <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/3AL8Q08XYNc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>

      </van-popup>

      <van-popup
        position="bottom"  
         closeable
        :style="{ height: '100%' }"
        v-model="show_onlinevideo"
      >
          <div style="width:100%;height:85%;margin-top:15%;">
            <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/3AL8Q08XYNc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
      </van-popup>


      <!-- <div class="white-view padding-top padding-lr flex flex-direction position-re vh-50 vw-100">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#2acd72"
            class="position-ab close-icon"
            @click="showVideo=false"
        />
        <div class="fs-18 font-bold text-center padding-bottom-sm margin-bottom" style="border-bottom:1px solid #EEECFA">{{$t('HOW_TO_DEPOSIT','如何充值')}}</div>
        <div class="border-radius-xs bg-f2f2f6 van-overflow-hidden flex flex-direction">
          <template v-for="(c,i) in this.channel" > -->
          <!--  private1 -->
          <!-- <iframe :key="'Pay_video'+ i"  v-if="showVideo1" width="100%" height="195px" src="https://www.youtube-nocookie.com/embed/DTs9VdHB_cA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
          <!-- private2 -->
          <!-- <div class="flex flex-direction" :key="'Pay_video'+ i"  v-if="showVideo2" >
            <iframe width="100%" height="195px" src="https://www.youtube-nocookie.com/embed/3AL8Q08XYNc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe  width="100%" height="195px" src="https://www.youtube-nocookie.com/embed/TUylhSjCQd4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div> -->
              <!-- 原生 -->
            <!-- <iframe :key="'Pay_video'+ i"  v-if="showVideo3" width="100%" height="195px" src="https://www.youtube-nocookie.com/embed/zYxqYARaVng" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </template>
        </div>
      </div> -->
    </van-popup>

<!-- 确定要离开吗 -->
    <!-- <van-popup
        class="border-radius vw-80"
        :close-on-click-overlay="false"
        ref="quitDeposit"
        v-model="showQuit"
    >
      <div class="padding-lr padding-tb-lg flex flex-direction position-re">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#2acd72"
            class="position-ab close-icon"
            @click="closeSureDeposit"
        />
        <div class="margin-bottom flex align-center justify-center">
          <img src="../assets/images/pop_bg1@2x.png" style="height:2rem">
        </div>
        <div class="margin-bottom-sm text-center">
          {{$t('YOU_SURE_GIVE_UP','你要放弃每日3%的收益吗？ 首次充值送十倍赠送金')}}
        </div>
        <van-row>
          <van-col span="12" class="padding-right-sm">
            <van-button color="#2acd72" round block plain @click="sureQuit">{{$t('QUIT','退出')}}</van-button>
          </van-col>
          <van-col span="12" class="padding-left-sm">
            <van-button color="#2acd72" round block @click="closeSureDeposit">{{$t('CONTINUE_DEPOSIT','继续充值')}}</van-button>
          </van-col>
        </van-row>
      </div>
    </van-popup> -->
  </div>
</template>

<script>
import { Base } from "@/mixins";
import MoneyNumber from "@/components/MoneyNumber";
import {
  NavBar,
  Icon,
  Field,
  Row,
  Col,
  Button,
  RadioGroup,
  Radio,
  Popup,
} from "vant";
import { Toast } from "mand-mobile";

export default {
  components: {
    MoneyNumber,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
  },
  data: () => {
    return {
      amount: "",
      amount_list: [],
      receiver: {
        card_user_name: "",
        card_number: "",
        card_bank_name: "",
      },
      showQuickPay: false,
      channel: [],
      currentChannel: {},
      showPayFailed: false,
      defaultWalletType: '',
      next_action: 'Wallet',
      next_id: 0,
      currentBank: {},
      showSonBank: false,
      showVideo: false,
      showQuit: false,
      //支付引导视频
      showVideo1: false,
      showVideo2: false,
      showVideo3: false,
      Pay_video:'',
      show_bankvideo: false,
      show_onlinevideo:false
    };
  },
  watch: {
    currentChannel() {
      try {
        if (this.currentChannel.type=='USDT_TRC20') {
          this.amount = this.calcUSDT(this.amount_list[1] || this.amount_list[0])
        } else {
          this.amount = this.amount_list[1] || this.amount_list[0]
        }
      } catch (e) {
        this.amount = ''
      }
    }
  },
  computed: {
    allowSubmit() {
      return this.amount != 0;
    },
  },
  mixins: [Base],
  created() {
    this.defaultWalletType = this.$route.query.w;

    let next_id = localStorage.getItem('BuyProduct')
    localStorage.removeItem('BuyProduct')

    let isDepositToBao = localStorage.getItem('DepositToBao')
    localStorage.removeItem('DepositToBao')

    if (next_id) {
      this.next_id = Number(next_id)
      this.next_action = 'Product'
    }

    if (isDepositToBao) {
      this.next_action = 'Money'
    }

    localStorage.removeItem('SureQuitDeposit')

  },
  mounted() {
    this.getDepositInfo();
    if (localStorage.getItem("GO_PAY")) {
      // this.showPayFailed = true;
    }
    this.checkTime()
  },

  methods: {
    onlineVideo(){
      this.show_onlinevideo = true
    },
    bankVideo(){
      this.show_bankvideo = true
    },
    closeSureDeposit() {
      this.showQuit = false
    },
    sureQuit() {
      this.showQuit = false
      this.$router.go(-1)
    },
    openVideo() {
      this.showVideo = true
    },
    calcUSDT(cash) {
      if (cash>=this.system.usdt_money_rate) {
        cash = Math.floor(cash/this.system.usdt_money_rate)
      }
      return cash
    },
    // 处理每个视频的显示和隐藏
    handleVideo() {
      for (let ch of this.channel) {
        if (ch.type=='OnLine') {
          for (let son_ch of ch.channel_list) {

            // xx视频
            if (son_ch.bank_name == 'UPI_PAY_Public') {
              this.showVideo1 = true
            }
            // xx视频
            if (son_ch.bank_name == 'UPI_PAY_Private') {
              this.showVideo2 = true
            }


            if (son_ch.bank_name == 'UPI_PAY') {
              this.showVideo3 = true
            }
          }
        }
      }
    },
    getDepositInfo() {
      Toast.loading("loading");
      this.$http
          .get("v1/rechargeBegin")
          .then((res) => {
            this.channel = res.data.channel;
            
            this.handleVideo()
            if (this.defaultWalletType=='balance') {
              for (let i = 0; i < res.data.channel.length; i++) {
                if (res.data.channel[i].type == 'USDT_TRC20') {
                  res.data.channel.splice(i,1)
                  break
                }
              }
            }

            if (this.channel.length) {
              this.currentChannel = this.channel[0];
              for (let ch of this.channel) {
                if (ch.type === "TransferAccounts" && ch.channel_list.length) {
                  this.receiver = ch.channel_list[0];
                }
              }

              this.amount_list = res.data.select_list;
              let value = ''
              if (localStorage.getItem('ProductPrice')) {
                value = parseFloat(localStorage.getItem('ProductPrice'))
                localStorage.removeItem('ProductPrice')
              } else {
                if (this.amount_list.length>1) {
                  value = this.amount_list[1]
                } else {
                  value = this.amount_list[0] || ''
                }
              }
              if (this.currentChannel.type=='USDT_TRC20') {
                value = this.calcUSDT(value)
              }
              this.amount = value

              Toast.hide();
            } else {
              Toast.failed(this.$t("NO_DEPOSIT_CHANNEL", "暂无可用充值渠道"));
            }
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
    },
    bankPay(bank) {
      // 判断是否超过最大最小的限制
      let max = Math.min(bank.max_money,this.currentChannel.max_money),
          min = Math.max(bank.min_money,this.currentChannel.min_money)

      if (this.amount < min) {
        Toast.failed(this.$t('MIN_DEPOSIT_N',[min+(this.currentChannel.type=='USDT_TRC20'?'USDT':this.system.default_currency)],'最低充值金额为N'))
        return
      }
      if (this.amount > max && max!=0) {
        Toast.failed(this.$t('MAX_DEPOSIT_N',[max+(this.currentChannel.type=='USDT_TRC20'?'USDT':this.system.default_currency)],'最高充值金额为N'))
        return
      }
      if (bank.son_bank_list.length) {
        this.currentBank = bank
        this.showSonBank = true
      } else {
        this.startPay(bank.id)
      }
    },
    sonBankPay(son_bank) {
      this.startPay(this.currentBank.id, son_bank.code)
    },
    startPay(bankId, son_code="") {
      Toast.loading('loading')
      this.$http
          .post("v1/putInInOnlineOrder", {
            channel_id: this.currentChannel.id,
            channel_item_id: bankId,
            amount: this.amount,
            son_code: son_code,
            next_action: this.next_action,
            next_id: this.next_id,
            redirect_url: location.origin + "/#/order?id=ORDER_SN",
          })
          .then((res) => {
            localStorage.setItem('PAY_PATH', JSON.stringify({
              name: this.$route.name,
              query: this.$route.query
            }))
            localStorage.setItem("GO_PAY", "1");
            location.href = res.data.pay_url;
            Toast.hide();
            this.showSonBank = false
            this.showQuickPay = false
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
    },
    //立即充值
    startDeposit() {
      if (this.currentChannel.type == "OnLine") {
        // 快捷支付
        this.startQuickPay();
      } else if (this.currentChannel.type === "TransferAccounts") {
        // 银行卡转账
        if (this.currentChannel.channel_list.length) {
          let receiverInfo = this.currentChannel.channel_list[0];
          receiverInfo.next_action = this.next_action;
          receiverInfo.next_id = this.next_id;
          localStorage.setItem(
              "TransferCertifications",
              JSON.stringify(receiverInfo)
          );
          this.$router.push({ name: "SubmitCertifications" });
        } else {
          Toast.failed(
              this.$t("BANK_CHANNEL_UNAVAILABLE", "银行户口转账暂不可用")
          );
        }
      } else if (this.currentChannel.type === "USDT_TRC20") {
        // usdt 充值
        this.$bus.emit('usdtDeposit',{id:this.currentChannel.id, amount: this.amount})
      } else {
      }
    },
    checkTime() {
      let t = new Date()
      let offset = t.getTimezoneOffset() * 60 * 1000
      let target = t.getTime() + offset + (480 * 60 * 1000)
      let residue = target % (24 * 60 * 60 * 1000)
      if ((residue < 600000) || (residue > 85800000)) {
        return false
      }
      return true
    },
    startQuickPay() {

      // 如果当前是在 UTC+8 的 23:50:00 - 00:10:00 之间，则不让提交订单
      // if (!this.checkTime()) {
      //   Toast.failed(this.$t('DEPOSIT_UNDER_MAINTENANCE','充值维护中WEB'))
      //   return
      // }

      if (!this.currentChannel.select_bank) {
        Toast.loading("loading");
        this.$http
            .post("v1/putInInOnlineOrder", {
              channel_id: this.currentChannel.id,
              channel_item_id: 0,
              amount: this.amount,
              next_action: this.next_action,
              next_id: this.next_id,
              redirect_url: location.origin + "/#/order?id=ORDER_SN",
            })
            .then((res) => {
              localStorage.setItem('PAY_PATH', JSON.stringify({
                name: this.$route.name,
                query: this.$route.query
              }))
              localStorage.setItem("GO_PAY", "1");
              location.href = res.data.pay_url;
              Toast.hide();
            })
            .catch((err) => {
              Toast.failed(err.data.message);
            });
      } else if (this.currentChannel.channel_list.length) {
        this.showQuickPay = true;
      } else {
        Toast.failed(this.$t("NO_QUICK_CHANNEL", "暂无可用快捷支付渠道"));
      }
    },
    closePayFailed() {
      localStorage.removeItem("GO_PAY");
      this.showPayFailed = false;
    },
  },
};
</script>

<style lang="scss">
.deposit-page {
  min-height: calc(100vh - 1.23rem);

  .close-icon {
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }

  .van-radio__icon {
    i {
      border-width: 2px !important;
    }
  }

  .van-radio__icon--checked {
    i {
      border: none !important;
    }
  }

  .bank-btn {
    transition: all 0.3s;
    &:active {
      background: #E1F5FE;
    }
  }

  .son-bank-list {
    padding-bottom: 1.6rem;

    &::after {
      content: "";
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2rem;
      background: linear-gradient(0deg,rgba(255,255,255,0.9),rgba(0,0,0,0));
    }
  }
  .van-popup__close-icon--bottom-left{
    background: rgb(50, 51, 66);
    width: 90%;
    border-radius: 0.5rem;
    height: 1rem;
  }
}
</style>
