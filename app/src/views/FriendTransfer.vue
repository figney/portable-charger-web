<template>
  <div class="friend-transfer-page flex flex-direction">
    <div class="flex flex-direction" v-if="step == 1">
      <van-nav-bar
        style="z-index:3"
        :title="$t('BALANCE_TRANSFER', '余额转换')"
        fixed
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div
        class="bg-432af5 border-radius-bottom padding"
        style="height:4.8rem"
      />
      <div
        class="margin white-view border-radius shadow-light padding"
        style="margin-top:-3.2rem"
      >
        <van-field
          class="border-radius-sm bg-f2f2f6 margin-bottom-sm"
          style="padding-top:0.2rem;padding-bottom:0.2rem"
          :placeholder="$t('ENTER_TELEPHONE', '请输入对方手机号')"
          @click-right-icon="showContacts = true"
        >
          <template #right-icon>
            <img
              class="size-18"
              src="../assets/images/contact_icon@2x.png"
              alt=""
            />
          </template>
        </van-field>
        <div class="flex align-center margin-right-xs margin-bottom">
          <img
            class="size-15 margin-right-xs"
            src="../assets/images/warning@2x.png"
            alt=""
          />
          <div class="fs-13">
            {{ $t("CANNOT_REFUND", "现金将实时转入，不可退款") }}
          </div>
        </div>
        <van-button
          block
          class="border-radius-xs font-bold"
          color="#432af5"
          @click="step = 2"
          >{{ $t("NEXT_STEP", "下一步") }}</van-button
        >
      </div>

      <div
        class="flex-sub margin-lr margin-bottom-xl border-radius box-shadow white-view padding flex flex-direction"
      >
        <div class="font-bold fs-18 margin-bottom">
          {{ $t("RECENT_RECEIVER", "最近转账人") }}
        </div>
        <van-cell v-for="(item, i) in 10" :key="'receiver-' + i">
          <template #icon>
            <img
              class="size-45 margin-right-sm border-radius-50"
              :src="Math.random().toString() | avatar"
            />
          </template>
          <template #title>
            <div class="font-bold">Jerry</div>
          </template>
          <template #label>
            <div class="fs-12 fc-888">ID: 123a4sdf5</div>
          </template>
        </van-cell>
      </div>
    </div>

    <div class="flex flex-direction" v-if="step == 2">
      <van-nav-bar
        style="z-index:3"
        :title="$t('TRANSFER', '转账')"
        fixed
        left-arrow
        @click-left="backStep1"
      />
      <div
        class="padding white-view shadow-light border-radius margin"
        style="margin-top:1.6rem"
      >
        <div class="flex justify-center margin-bottom-sm">
          <img
            style="height:2.054rem;width:2.054rem"
            class="border-radius-50"
            :src="Math.random().toString() | avatar"
            alt=""
          />
        </div>
        <div class="text-center margin-bottom fs-16 text-center font-bold">
          Jerry
        </div>
        <div class="margin-bottom-sm">
          {{ $t("TRANSFER_AMOUNT", "转账金额") }}({{ system.default_currency }})
        </div>
        <van-field
          type="digit"
          class="bg-f2f2f6 border-radius-sm font-bold fs-16 margin-bottom-lg"
          :placeholder="$t('ENTER_TRANSFER_AMOUNT', '请输入转账金额')"
        ></van-field>
        <van-button
          block
          class="border-radius-sm font-bold"
          color="#432af5"
          @click="showKeyboardModal = true"
          >{{ $t("NEXT_STEP", "下一步") }}</van-button
        >
      </div>
    </div>

    <van-popup
      position="bottom"
      v-model="showContacts"
      @click-close-icon="showContacts = false"
    >
      <div class="vh-100 padding bg-view flex flex-direction">
        <van-nav-bar
          style="z-index:3"
          :title="$t('SEARCH_RECEIVER', '查找转款人')"
          fixed
          left-arrow
          @click-left="showContacts = false"
        />

        <div class="app-appbar">
          <van-field
            left-icon="search"
            class="white-view border-radius-sm shadow-light font-bold margin-bottom"
            :placeholder="$t('SEARCH', '搜索')"
          ></van-field>
        </div>
        <div class="search-contacts-list border-radius">
          <van-cell v-for="(item, i) in 10" :key="'receiver-' + i">
            <template #icon>
              <img
                class="size-45 margin-right-sm border-radius-50"
                :src="Math.random().toString() | avatar"
              />
            </template>
            <template #title>
              <div class="font-bold">Jerry</div>
            </template>
            <template #label>
              <div class="fs-12 fc-888">ID: 123a4sdf5</div>
            </template>
          </van-cell>
        </div>
      </div>
    </van-popup>

    <van-popup
      class="no-bg"
      style="margin-top:-2rem"
      v-model="showKeyboardModal"
    >
      <div
        class="vw-90 border-radius white-view padding position-re enter-trans-pwd box-shadow"
      >
        <van-icon
          size="0.52rem"
          name="cross"
          color="#432af5"
          class="position-ab close-icon"
          @click="showKeyboardModal = false"
        />
        <div class="fs-18 font-bold text-center margin-bottom">
          {{ $t("ENTER_TRANS_PWD", "输入交易密码") }}
        </div>
        <div
          class="flex fc-432af5 justify-center fs-30 money-number margin-bottom"
        >
          <money-number
            class="font-bold"
            :value="123555"
            :precision="0"
            :showSuffix="false"
          />
        </div>
        <div class="margin-bottom text-center fc-888 fs-16">
          {{ $t("TRANSFER_TO", "转账至") }} Jerry
        </div>

        <van-password-input
          class="margin-0"
          :value="transPwd"
          :mask="false"
          :gutter="10"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <van-number-keyboard
          v-model="transPwd"
          :show="showKeyboard"
          z-index="3000"
          get-container="body"
          @blur="showKeyboard = false"
          :safe-area-inset-bottom="false"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import MoneyNumber from "@/components/MoneyNumber";
import {
  Button,
  Icon,
  NavBar,
  Field,
  Cell,
  Popup,
  PasswordInput,
  NumberKeyboard,
} from "vant";
import { Base } from "@/mixins";
export default {
  components: {
    MoneyNumber,
    [NumberKeyboard.name]: NumberKeyboard,
    [PasswordInput.name]: PasswordInput,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Popup.name]: Popup,
  },
  data: () => {
    return {
      step: 1,
      transPwd: "",
      showContacts: false,
      showKeyboardModal: false,
      showKeyboard: false,
    };
  },
  mixins: [Base],
  methods: {
    backStep1() {
      // 重置 step2 界面的数据
      this.step = 1;
    },
    toFriendList() {
      this.$router.push({ name: "TeamList" });
    },
  },
};
</script>

<style lang="scss">
.friend-transfer-page {
  .close-icon {
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }

  .search-contacts-list {
    overflow-y: auto;
  }

  .van-password-input {
    margin: 0 !important;

    li {
      background: #f2f2f2;
      font-size: 33px;
      font-weight: bold;
      color: #432af5;
      border-radius: 6px;
    }
  }
}
</style>
