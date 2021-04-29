<template>
  <div class="withdraw-history-page app-appbar flex flex-direction">
    <van-nav-bar
        :title="$t('WITHDRAW_HISTORY', '提现记录')"
        fixed
        left-arrow
        @click-left="$router.go(-1)"
    />
    <div class="margin flex flex-direction">
      <van-row gutter="2" class="text-center margin-bottom fc-666">
        <van-col span="6" class="van-overflow-hidden text-nowrap text-ellipsis">{{ $t("TIME", "时间") }}</van-col>
        <van-col span="7" class="van-overflow-hidden text-nowrap text-ellipsis">{{ $t("MONEY", "金额") }}</van-col>
        <van-col span="6" class="van-overflow-hidden text-nowrap text-ellipsis">{{ $t("WITHDRAW_WAY", "提款方式") }}</van-col>
        <van-col span="5" class="van-overflow-hidden text-nowrap text-ellipsis">{{ $t("STATUS", "状态") }}</van-col>
      </van-row>
      <van-list
          class="white-view border-radius padding-lr-sm box-shadow"
          style="min-height:calc(100vh - 2.987rem)"
          v-model="loading"
          :finished="finished"
          :loading-text="$t('LOADING', '加载中...')"
          :error-text="$t('LOAD_FAILED', '加载失败')"
          @load="getData"
      >
        <template #finished>
          <van-empty
              style="min-height:calc(100vh - 3.787rem)"
              :image="require('../assets/images/default1@2x.png')"
              :description="$t('NO_MORE', '没有更多了')"
              v-if="list.length === 0"
          />
          <span v-else>{{ $t("NO_MORE", "没有更多了") }}</span>
        </template>

        <van-row
            gutter="2"
            class="text-center fs-12 padding-tb border-radius-xs margin-bottom-xs flex align-center"
            style="border-bottom:1px solid rgba(67,42,245,0.06)"
            v-for="(item, i) in list"
            :key="'withdraw-his-' + i"
            @click="changeOrder(item)"
        >
          <van-col span="6" class="van-overflow-hidden text-nowrap text-ellipsis">
            <div class="flex align-center flex-direction fc-888">
              <span>{{$formatTime('yyyy/mm/dd',item.created_at)}}</span>
              <span>{{$formatTime('HH:MM:SS',item.created_at)}}</span>
            </div>
          </van-col>
          <van-col span="7" class="van-overflow-hidden text-nowrap text-ellipsis">
            <money-number
                :class="[{'money-number':(item.wallet_type!='usdt')}]"
                :value="item.amount"
                :precision="item.wallet_type=='usdt' ? coin_unit.usdt : coin_unit.balance"
            />
            <span class="money-unit" v-if="item.wallet_type=='usdt'">USDT</span>
          </van-col>
          <van-col span="6" class="van-overflow-hidden text-nowrap text-ellipsis">
            <span v-if="item.withdraw_channel_item && item.withdraw_channel_item.bank_name">{{item.withdraw_channel_item.bank_name}}</span>
            <span v-else>{{item.withdraw_channel.title || item.withdraw_type}}</span>
          </van-col>
          <van-col span="5" class="van-overflow-hidden text-nowrap text-ellipsis">
            <span style="text-decoration:underline" class="fc-432af5" v-if="item.order_status=='CheckSuccess'">{{$t('WITHDRAW_SUCCESS','提现成功')}}</span>
            <span style="text-decoration:underline" class="fc-888" v-else-if="item.order_status=='Paying' || item.order_status == 'Checking'">{{$t('DRAWING','打款中')}}</span>
            <span style="text-decoration:underline" class="fc-ff3636" v-else-if="item.order_status=='PayError'">{{$t('FAILED','失败')}}</span>
            <span style="text-decoration:underline" v-else>{{$t('FAILED_RETURN','失败已退款')}}</span>
          </van-col>
        </van-row>
      </van-list>
    </div>

    <van-popup
        v-model="showOrder"
        v-if="showOrder"
        class="vw-90"
        :close-on-click-overlay="false"
        round
        ref="withdrawHistory"
    >
      <div class="flex flex-direction position-re">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#432af5"
            class="position-ab close-icon"
            @click="closeModel"
        />
        <div
            class="margin-lr padding-tb-sm text-center fs-16 font-bold"
        >
          {{$t('ORDER_DETAIL','订单详情')}}
        </div>
        <van-cell-group class="padding-tb custom-group-border">
          <van-cell
              :title="$t('ORDER_STATUS','订单状态')"
              :border="false"
          >
            <template #default>
              <span class="fc-13b271" v-if="currentOrder.order_status=='CheckSuccess'">{{$t('WITHDRAW_SUCCESS','提现成功')}}</span>
              <span class="fc-432af5" v-else-if="currentOrder.order_status=='Paying' || currentOrder.order_status == 'Checking'">{{$t('DRAWING','打款中')}}</span>
              <span class="fc-ff3636" v-else-if="currentOrder.order_status=='PayError'">{{$t('FAILED','失败')}}</span>
              <span class="fc-888" v-else>{{$t('FAILED_RETURN','失败已退款')}}</span>
            </template>
          </van-cell>
          <van-cell
              :title="$t('REASON','原因')"
              :value="currentOrder.remark"
              :border="false"
              v-if="currentOrder.order_status=='PayError'"
          />
          <van-cell
            :title="$t('ORDER_ID','订单号')"
            :value="currentOrder.order_sn"
            :border="false"
          />
          <van-cell
              :title="$t('TIME','时间')"
              :value="$localTime(currentOrder.created_at)"
              :border="false"
          />
          <van-cell
              :title="$t('WITHDRAW_WAY','提款方式')"
              :border="false"
          >
            <template #default>
              <span v-if="currentOrder.withdraw_channel_item && currentOrder.withdraw_channel_item.bank_name">{{currentOrder.withdraw_channel_item.bank_name}}</span>
              <span v-else-if="currentOrder.withdraw_channel">{{currentOrder.withdraw_channel.title}}</span>
              <span v-else>{{currentOrder.withdraw_type}}</span>
            </template>
          </van-cell>
          <van-cell
              :title="$t('WITHDRAW_AMOUNT','提现金额')"
              :border="false"
          >
            <template #default>
              <div class="flex align-baseline justify-end">
                <span :class="[{'money-number':(currentOrder.wallet_type!='usdt')}]">{{currentOrder.amount}}</span>
                <span class="money-unit" v-if="currentOrder.wallet_type=='usdt'">USDT</span>
              </div>
            </template>
          </van-cell>
          <van-cell
              :title="$t('FEE','手续费')"
              :value="currentOrder.rate+'%'"
              :border="false"
          />
          <van-cell
              :title="$t('ACTUAL_AMOUNT','实际到账')"
              :border="false"
          >
            <template #default>
              <div class="flex align-baseline justify-end">
                <span :class="[{'money-number':(currentOrder.wallet_type!='usdt')}]">{{currentOrder.actual_amount}}</span>
                <span class="money-unit" v-if="currentOrder.wallet_type=='usdt'">USDT</span>
              </div>
            </template>
          </van-cell>
          <van-cell
              :title="$t('PAY_ACCOUNT','支付账户')"
              :border="false"
          >
            <template #default>
              <span v-if="currentOrder.wallet_type=='balance'">{{$t('BALANCE_ACCOUNT','余额账户')}}</span>
              <span v-else-if="currentOrder.wallet_type=='usdt'">{{$t('USDT_ACCOUNT','USDT账户')}}</span>
              <span v-else-if="currentOrder.wallet_type=='give'">{{$t('GIVE_ACCOUNT','赠送金账户')}}</span>
              <span v-else>{{currentOrder.wallet_type}}</span>
            </template>
          </van-cell>

        </van-cell-group>
      </div>
    </van-popup>

  </div>
</template>

<script>
import {NavBar, List, Row, Col, Badge, Button, Empty, Popup, Cell, CellGroup,Icon} from "vant";
import { Base } from "@/mixins";
import {Toast} from "mand-mobile"
import MoneyNumber from "@/components/MoneyNumber";

export default {
  components: {
    MoneyNumber,
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Badge.name]: Badge,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Empty.name]: Empty,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]:Icon,
  },
  data: () => {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 0,
      currentOrder: {},
      showOrder: false,
    };
  },
  mixins: [Base],
  methods: {
    closeModel() {
      this.$closeModel(this.$refs.withdrawHistory.$el)
      setTimeout(()=>{
        this.showOrder = false
      },300)
    },
    changeOrder(order) {
      this.currentOrder = order
      this.showOrder = true
    },
    getData() {
      this.$http.get("v1/withdrawList",{
        params: {
          page: ++this.page,
          page_size: 10,
        }
      }).then((res) => {
        if (res.data.list.length) {
          this.list = this.list.concat(res.data.list);
          if (res.data.list.length < 10) {
            this.finished = true;
          }
        } else {
          this.finished = true;
        }
      }) .catch((err) => {
        console.log(err)
        this.finished = true
        Toast.failed(err.data.message || err.statusText)
      }).finally(() => {
        this.loading = false;
      });

    },
    seeItem(item) {},
  },
};
</script>

<style lang="scss">
.withdraw-history-page {
  min-height: 100vh;

  .close-icon {
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }

  .custom-group-border {
    &::after {
      border: none;
    }
  }
}
</style>
