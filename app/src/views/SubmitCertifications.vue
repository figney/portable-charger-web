<template>
  <div class="certifications-page app-appbar">
    <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" />
    <template>
      <div
        class="white-view margin border-radius van-overflow-hidden flex flex-direction padding box-shadow"
      >
          <div class="fs-18 font-bold margin-bottom-sm flex ">
            <p class="round"> </p>
            <p>{{$t("OFFICIAL_DESIGNATION","官方指定收款人账户")}}</p>
          </div>
          <div class="fs-20 font-900 text-center">
            <p>00223159852.25</p>
            <p class="fs-15 fc-888 font-400">{{ $t("TRANSFER_AMOUNT", "转账金额") }}</p>
          </div>
          
          <div class="flex align-center  margin-bottom-sm fs-13">
            <div
                class="margin-right-sm van-overflow-hidden text-ellipsis text-nowrap"
                style="max-width:2rem;min-width:2rem"
            >
              {{$t("BENEFICIARY_BANK","收款银行")}}
            </div>
            <van-field
                readonly
                class=" border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
            >
              <template #right-icon>
                <img src="../assets/images/copy@2x (2).png" style="height:0.5rem">
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
                value="ygfdvbghbgkjkjglgdd"
                readonly
                class=" border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
                
            >
              <template #right-icon>
                <img src="../assets/images/copy@2x (2).png" style="height:0.5rem">
              </template>
            </van-field>
          </div>

          <div class="flex align-center  margin-bottom-sm fs-13">
            <div
                class="margin-right-sm van-overflow-hidden text-ellipsis text-nowrap"
                style="max-width:2rem;min-width:2rem"
            >
              {{ $t("RECEIVER_NAME", "收款人姓名") }}
            </div>
            <van-field
                readonly
                class=" border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
            >
              <template #right-icon>
                <img src="../assets/images/copy@2x (2).png" style="height:0.5rem">
              </template>
            </van-field>
          </div>
          <p class="fs-15 text-center" style="color:orange;">{{$t("AFTER_COMPLET","完成汇款后请填写下方表格提交审核")}}</p>
      </div>
    </template>



    <div
        class="white-view margin border-radius van-overflow-hidden flex flex-direction padding box-shadow"
        style="min-height:calc(100vh - 2.03rem)"
        v-if="!showSubmitSuccess"
    >
      <div class="font-bold fs-18 margin-bottom flex">
        <p class="round"> </p>
        <p>{{$t("FILL_REVIEW_INFORMATION","填写审核信息")}}</p>
      </div>

      <div class="flex align-center  margin-bottom fs-13">
        <div
            class="margin-right-sm van-overflow-hidden"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("FULLNAME_OF_BANK", "开户行全称") }}
        </div>
        <van-field
            v-model="transferor.bank"
            :placeholder="$t('ENTER_FULLNAME_OF_BANK', '请输入开户行全称')"
            class="bg-f2f2f6 border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
        />
      </div>

      <div class="flex align-center  margin-bottom fs-13">
        <div
            class="margin-right-sm van-overflow-hidden"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("TRANSFER_NAME", "汇款人姓名") }}
        </div>
        <van-field
            v-model="transferor.name"
            :placeholder="$t('ENTER_TRANSFER_NAME', '请输入汇款人姓名')"
            class="bg-f2f2f6 border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
        />
      </div>

      <div class="flex align-center  margin-bottom fs-13">
        <div
            class="margin-right-sm van-overflow-hidden"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("TRANSFER_ACCOUNT", "汇款人账户") }}
        </div>
        <van-field
            v-model="transferor.account"
            :placeholder="$t('ENTER_TRANSFER_ACCOUNT', '请输入汇款人账户')"
            class="bg-f2f2f6 border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
        />
      </div>

      <div class="flex align-center margin-bottom fs-13">
        <div
            class="margin-right-sm van-overflow-hidden"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("TRANSFER_AMOUNT", "汇款金额") }}
        </div>
        <van-field
            type="number"
            :formatter="$balanceFormat"
            v-model="transferor.amount"
            :placeholder="$t('ENTER_TRANSFER_AMOUNT', '请输入汇款金额')"
            class="bg-f2f2f6 border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
        />
      </div>

      <div class="flex align-center margin-bottom fs-13">
        <div
            class="margin-right-sm van-overflow-hidden"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("TRANSFER_TIME", "汇款时间") }}
        </div>
        <van-field
            readonly
            :value="transferor.time"
            :placeholder="$t('SELECT_TRANSFER_TIME', '请选择汇款时间')"
            class="bg-f2f2f6 border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
            right-icon="underway-o"
  
            @click="showSelectDate = true"
        />
      </div>

      <div class="flex align-stretch margin-bottom fs-13">
        <div class="flex align-start fs-13">
          <div
              class="margin-right-sm van-overflow-hidden"
              style="max-width:2rem;min-width:2rem"
          >
            {{ $t("TRANSFER_CERTIFICATION", "汇款凭证") }}
          </div>
          <!-- capture="camera" -->
          <van-uploader
              v-model="fileList"
              :max-size="10 * 1024 * 1024"
              upload-icon="plus"
              :max-count="1"
          />
        </div>
        <div class="margin-lr-xs"></div>
        <div class="flex align-center fs-13">
          <van-button plain size="small" class="border-radius-xs" color="#2acd72" @click="startShowDemo">{{$t('SEE_DEMO','查看示例')}}</van-button>
        </div>
      </div>

      <div
          class="flex align-start margin-bottom fs-12 padding-sm border-radius bg-f8ede5"
      >
        <img
            class="size-15 margin-right-xs"
            src="../assets/images/warning@2x.png"
            alt=""
        />
        <div>
          {{$t("UPLOAD_TIP",[receiverInfo.min_money.toString()+' '+system.default_currency],"请按照上述信息汇款并保留汇款截图，汇款成功后在存款记录中提交审核，最小汇款金额为{0}")}}
        </div>
      </div>

      <van-button
          class="margin-tb border-radius-xl"
          block
          color="#2acd72"
          
          @click="beforeSubmit"
      >
        {{$t("SUBMIT_REVIEW","提交审核")}}
      </van-button>
    </div>

    <!-- 提交成功显示 -->
    <div class="flex flex-direction submit-success" v-else>
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
          {{ $t("SUBMIT_SUCCESS", "提交成功") }}
        </div>
        <div class="margin-bottom fc-888 text-center padding-lr">
          {{ $t("ABOUT_5_MINS_ARRIVE", "预计1-5分钟到账，请您耐心等待") }}
        </div>
        <div class="margin-bottom flex align-stretch justify-between" style="width:8.4rem">
          <van-button class="border-radius-sm" color="#432af5" plain block @click="toDepositDetail">
            {{$t('SEE_DEPOSIT_DETAIL','查看存款明细')}}
          </van-button>
          <div class="margin-lr-xs"></div>
          <van-button class="border-radius-sm" color="#432af5" block @click="contact">
            {{$t('CONTACT_CUSTOM_SERVICE_QUICKLY','联系客服快速验证入账')}}
          </van-button>
        </div>
        <!--        <div class="margin padding-lr" style="width:100%">-->
        <!--          <van-button-->
        <!--            class="border-radius-xs font-bold"-->
        <!--            block-->
        <!--            color="#432af5"-->
        <!--            @click="finishSubmit"-->
        <!--            >{{ $t("FINISH", "完成") }}</van-button-->
        <!--          >-->
        <!--        </div>-->
      </div>
    </div>

    <!-- 选择汇款时间 -->
    <van-popup
        get-container=".wallet-history-page"
        v-model="showSelectDate"
        round
        position="bottom"
    >
      <div class="padding position-re white-view border-radius box-shadow">
        <van-icon
            @click="showSelectDate = false"
            size="0.5rem"
            color="#432af5"
            class="position-ab margin-right margin-top"
            style="font-weight:bold;right:0;top:0"
            name="cross"
        />
        <div class="flex flex-direction">
          <van-datetime-picker
              v-model="currentDate"
              type="datetime"
              :placeholder="$t('SELECT_TRANSFER_TIME', '请选择汇款时间')"
              :confirm-button-text="$t('SURE', '确定')"
              :cancel-button-text="$t('CANCEL', '取消')"
              @confirm="changeDate"
              @cancel="showSelectDate = false"
          />
        </div>
      </div>
    </van-popup>

    <!-- 二次确认弹窗 -->
    <van-dialog
        v-model="showConfirm"
        show-cancel-button
        class="border-radius confirm-certification-modal"
        :confirm-button-text="$t('SURE','确定')"
        :cancel-button-text="$t('CANCEL','取消')"
        width="90vw"
        @confirm="submit"
    >
      <template #title>
        <div class="font-bold fs-16 flex justify-start margin-left">
          <!-- {{
            $t(
                "CONFIRM_TRANSFEROR_INFO_AGAIN",
                "请确认您的汇款人信息，提交之后无法修改"
            )
          }} -->
          <p class="round" style="margin-top:0.1rem;"></p>
          <p>{{$t("CONFIRM_AUDIT_INFORMATION","确认审核信息")}}</p>
        </div>
      </template>
      <template #default>
        <div class="flex flex-direction padding confirm-certification-content">
          <div class="flex align-center fs-13 border-radius-xs padding-lr-sm">
            <div
                class="margin-right-sm van-overflow-hidden"
                style="max-width:2rem;min-width:2rem"
            >
              {{ $t("FULLNAME_OF_BANK", "开户行全称") }}:
            </div>
            <van-field
                :value="transferor.bank"
                class="border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
            />
          </div>

          <div class="flex align-center fs-13 border-radius-xs padding-lr-sm confirm-name font-bold">
            <div
                class="margin-right-sm van-overflow-hidden"
                style="max-width:2rem;min-width:2rem"
            >
              {{ $t("TRANSFER_NAME", "汇款人姓名") }}:
            </div>
            <van-field
                :value="transferor.name"
                readonly
                class="border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13 no-bg"
            />
          </div>

          <div class="flex align-center fs-13 border-radius-xs padding-lr-sm">
            <div
                class="margin-right-sm van-overflow-hidden"
                style="max-width:2rem;min-width:2rem"
            >
              {{ $t("TRANSFER_ACCOUNT", "汇款人账户") }}:
            </div>
            <van-field
                :value="transferor.account"
                class="border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
            />
          </div>

          <div class="flex align-center fs-13 border-radius-xs padding-lr-sm">
            <div
                class="margin-right-sm van-overflow-hidden"
                style="max-width:2rem;min-width:2rem"
            >
              {{ $t("TRANSFER_AMOUNT", "汇款金额") }}:
            </div>
            <van-field
                :value="transferor.amount"
                class="border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
            />
          </div>

          <div class="flex align-center fs-13 border-radius-xs padding-lr-sm">
            <div
                class="margin-right-sm van-overflow-hidden"
                style="max-width:2rem;min-width:2rem"
            >
              {{ $t("TRANSFER_TIME", "汇款时间") }}:
            </div>
            <van-field
                readonly
                :value="transferor.time"
                class="border-radius-sm padding-tb-xs padding-lr-sm font-bold fs-13"
            />
          </div>

          <div class="flex align-start fs-13 border-radius-xs padding-lr-sm" style="padding-top:0.1867rem">
            <div
                class="margin-right-sm van-overflow-hidden"
                style="max-width:2rem;min-width:2rem"
            >
              {{ $t("TRANSFER_CERTIFICATION", "汇款凭证") }}:
            </div>
            <img
                :src="getFileUrl(fileList[0].file)"
                v-if="fileList[0]"
                style="width:2.6rem"
                @click="showImg = true"
            />
          </div>

          <div class="fs-13 fc-ff3636 text-center font-bold margin-lr-xs margin-top-sm bounce">{{$t('CONFIRM_PAYEE_NAME','请务必填写正确的汇款人姓名，否则无法正写正确的汇款人姓名，否则无法正确入账。')}}</div>
        </div>
      </template>
    </van-dialog>

    <!-- 图片预览弹窗 -->
    <van-popup v-model="showImg" get-container="body" class="no-bg">
      <div
          class="vw-100 vh-100 flex align-center justify-center"
          @click="showImg = false"
          style="overflow:auto"
      >
        <img
            :src="getFileUrl(fileList[0].file)"
            v-if="fileList[0]"
            style="max-width:100vw;min-width:100vw"
        />
      </div>
    </van-popup>

    <!-- 案列预览 -->
    <van-popup v-model="showDemo" get-container="body">
      <div
          class="vw-100 vh-100 flex flex-direction position-re"
          style="overflow:hidden"
      >
        <van-icon
            @click="showDemo = false"
            size="0.5rem"
            color="#432af5"
            class="position-ab margin-right margin-top"
            style="font-weight:bold;right:0;top:0"
            name="cross"
        />

        <div class="padding fs-18 font-bold text-center box-shadow" style="width:100%">{{$t('SEE_DEMO','查看示例')}}</div>

        <div class="flex flex-direction" style="overflow:auto">
          <div class="padding" style="border-bottom:1px solid #eeecfa">
            <img
                src="../assets/images/transfer_demo/1.jpg"
                style="max-width:100%;min-width:100%"
            />
          </div>
          <div class="padding" style="border-bottom:1px solid #eeecfa">
            <img
                src="../assets/images/transfer_demo/2.jpg"
                style="max-width:100%;min-width:100%"
            />
          </div>
          <div class="padding" style="border-bottom:1px solid #eeecfa">
            <img
                src="../assets/images/transfer_demo/3.jpg"
                style="max-width:100%;min-width:100%"
            />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  Cell,
  NavBar,
  Field,
  DatetimePicker,
  Popup,
  Icon,
  Uploader,
  Button,
  Dialog,
} from "vant";
import { Base } from "@/mixins";
import { Toast } from "mand-mobile";
import Compressor from "compressorjs";

export default {
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
  },
  data: () => {
    return {
      currentDate: new Date(),
      showSelectDate: false,
      showConfirm: false,
      showImg: false,
      showSubmitSuccess: false,
      transferor: {
        name: "",
        account: "",
        bank: "",
        amount: "",
        time: "",
      },
      fileList: [],
      receiverInfo: {
        min_money: 0,
      },
      showDemo: false
    };
  },
  computed: {
    allowSubmit() {
      return (
          !!this.transferor.name &&
          !!this.transferor.account &&
          !!this.transferor.bank &&
          !!this.transferor.amount &&
          !!this.transferor.time &&
          !!this.fileList.length
      );
    },
  },
  mixins: [Base],
  mounted() {
    this.$nextTick(() => {
      const _data = localStorage.getItem("TransferCertifications");
      try {
        if (!_data) {
          Toast.failed(
              this.$t("BANK_CHANNEL_UNAVAILABLE", "银行户口转账暂不可用")
          );
          this.$router.go(-1);
        } else {
          this.receiverInfo = JSON.parse(_data);
        }
      } catch (err) {
        Toast.failed(
            this.$t("BANK_CHANNEL_UNAVAILABLE", "银行户口转账暂不可用")
        );
        this.$router.go(-1);
      }
    });
  },
  methods: {
    startShowDemo() {
      this.showDemo = true
    },
    contact() {
      this.$openLink(this.system.service.url)
    },
    toDepositDetail() {
      this.$router.push({ name: 'DepositHistory' })
    },
    getFileUrl(file) {
      return window.URL.createObjectURL(file);
    },
    changeDate(datetime) {
      this.transferor.time = this.$localTime(datetime);
      this.showSelectDate = false;
    },
    beforeSubmit() {
      // if (this.transferor.name == this.receiverInfo.card_user_name) {
      //   Toast.failed(
      //       this.$t("ENTER_TRANSFEROR_NAME_AGAIN", "请重新输入您的汇款人姓名")
      //   );
      //   return;
      // }
      // if (this.transferor.account == this.receiverInfo.card_number) {
      //   Toast.failed(
      //       this.$t("ENTER_TRANSFEROR_ACCOUNT_AGAIN", "请重新输入您的汇款人账号")
      //   );
      //   return;
      // }
      // if (this.transferor.amount < this.receiverInfo.min_money) {
      //   Toast.failed(
      //       this.$t("TRANSFER_AMOUNT_CANT_LESS_THAN_MIN",[this.receiverInfo.min_money.toString()], "汇款金额不能低于N")
      //   );
      //   return;
      // }
      this.showConfirm = true;
    },
    async submit() {
      const file = await this.compressImage(this.fileList[0].file)
      let formData = new FormData();
      formData.append("channel_item_id", this.receiverInfo.id);
      formData.append("next_action", this.receiverInfo.next_action);
      formData.append("next_id", this.receiverInfo.next_id);
      formData.append("user_name", this.transferor.name);
      formData.append("card_number", this.transferor.account);
      formData.append("bank_name", this.transferor.bank);
      formData.append("amount", this.transferor.amount);
      formData.append("time", this.transferor.time);
      formData.append("image", file);
      Toast.loading("loading");
      this.$http
          .post("v1/putInTransferVoucher", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.showSubmitSuccess = true;
            this.isSubmit = true;
            Toast.hide();
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
    },
    finishSubmit() {
      this.showSubmitSuccess = false;
      this.$router.go(-1);
    },
    async compressImage(file) {
      return await new Promise((resolve,reject)=>{
        new Compressor(file, {
          quality: 0.6,
          success(result) {
            resolve(result)
          },
          error(err) {
            console.log(err.message);
            resolve(file)
          },
        });
      })
    }
  },
};
</script>

<style lang="scss">
.certifications-page {
  .confirm-certification-modal {
    .van-dialog__header--isolated {
      padding: 15px 0;
    }

    .van-dialog__footer {
      button {
        height: 1.15rem;
      }

      .van-dialog__confirm {
        color: #432af5;
      }
      .van-dialog__cancel {
        color: #888;
      }
    }

    .confirm-certification-content {
      overflow: auto;
      max-height: 60vh;
    }
  }

  .submit-success {
    .van-button {
      height: unset;
      min-height: 44px;
      padding: 0.1333rem 0.2337rem;

    }
  }

  .confirm-name {
    background: #d7e9ff;
    animation: confirmName 1s linear infinite;
  }

  @keyframes confirmName {
    0%,100% {
      background: #d4e7ff;
    }

    50% {
      background: #88bdff;
    }
  }

}
</style>
