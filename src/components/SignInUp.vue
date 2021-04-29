<template>
      <!-- <van-nav-bar
          id="invest-nav-bar"
          class="fixed-tapbar"
          fixed
          left-arrow
          @click-left="$router.go(-1)"
      /> -->
  <van-popup
    position="bottom"
    class="vh-100 "
    close-icon-position="top-left"
    v-model="show"
    @click-left="$router.go(-1)"
    closeable
  >
    <template v-if="currentType == 'register'">
      <div class="flex flex-direction vh-100 margin-top-lg" style="overflow:auto">     
<!--            {{ $t("SIGN_UP", "注册") }}-->
        <div class="flex justify-center margin-top-xl" style="line-height:1rem;">
          <img src="../assets/images/icon_4@2x.png" alt="" style="height:1rem;"/>
          <span class="fc-2acd72 fs-30 font-900 margin-left-sm">Power</span>
        </div>
        <div
          class="flex-sub white-view border-radius-top-xl padding-lg flex flex-direction signInUpModel"
          
        >
          <div class="margin-bottom-xs fc-888">
            {{ $t("NICK_NAME", "昵称") }}
          </div>
          <van-field
            class="border-radius-xl margin-bottom-lg border focus-effect inputbox"
            v-model="register.nickName"
            clearable
            :placeholder="$t('ENTER_NICK_NAME', '请输入昵称')"
            style="border:1px solid #ccc;position:relative"
          />
            <van-button
              class="border-radius-xl text-nowrap fc-2acd72"
              :loading="isGetting"
              :disabled="isGetting"
              @click="getRandomNickname"
              style="position:absolute; border:none;left:7.8rem;top:1.35rem;height:1rem"
            >
              {{ $t("RANDOM", "随机") }}
            </van-button>
          <div class="margin-bottom-xs fc-888">{{ $t("PHONE", "手机号") }}</div>

          <van-field
            type="tel"
            class="border-radius-xl margin-bottom-lg border focus-effect"
            :label= '["+"]+this.currentCallingCode'
            v-model="register.phone"
            clearable
            :formatter="phoneFormatter"
            :maxlength="15"
            :placeholder="$t('ENTER_PHONE', '请输入手机号')"
            left-icon="smile-o"
            style="border:1px solid #ccc;"
          />

          <div class="margin-bottom-xs fc-888">
            {{ $t("PASSWORD", "密码") }}
          </div>
          <van-field
            type="password"
            class="border-radius-xl margin-bottom-lg border focus-effect"
            clearable
            v-model="register.password"
            :placeholder="$t('ENTER_PASSWORD', '请输入密码')"
            style="border:1px solid #ccc;"
          ></van-field>

          <template v-if="!system.is_sms_reg">
            <div class="margin-bottom-xs fc-888">
              {{ $t("PASSWORD_AGAIN", "确认密码") }}
            </div>
            <van-field
                type="password"
                class="border-radius-xl margin-bottom-lg border focus-effect"
                clearable
                v-model="register.passwordAgain"
                :placeholder="$t('ENTER_PASSWORD_AGAIN', '请输入确认密码')"
                style="border:1px solid #ccc;"
            ></van-field>
          </template>

          <!-- 验证码   <template v-if="system.is_sms_reg"> 
          <template>
            <div class="margin-bottom-xs fc-888">
              {{ $t("VERIFY_CODE", "验证码") }}
            </div>
            <div class="flex align-center margin-bottom" style="position:relative">
              <van-field
                class="border-radius-xl margin-bottom-lg border focus-effect"
                clearable
                v-model="register.verifyCode"
                :placeholder="$t('ENTER_VERIFY_CODE', '请输入验证码')"
                style="border:1px solid #ccc;"
              >
              </van-field>
              <van-button
                class="border-radius-xl text-nowrap"
                color="#432af5"
                plain
                v-if="sendTime > 0"
              >
                {{ sendTime }}
              </van-button>
              <van-button
                class="border-radius-xl text-nowrap fc-2acd72"
                :disabled="!register.phone"
                :loading="isSending"
                @click="sendVerifyCode"
                v-else
                style="position:absolute; border:none;left:7.3rem;top:0.1rem;height:1rem"
              >
                {{ $t("SEND", "发送") }}
              </van-button>
            </div>
          </template>-->
           <template v-if="source!='ad'">
            <div class="margin-bottom-xs fc-888">
              {{ $t("REFERRAL_CODE", "邀请码") }}
            </div>
            <van-field
                class="border-radius-xl margin-bottom-lg border focus-effect"
                clearable
                :readonly="register.inviteReadonly"
                v-model="register.inviteCode"
                :placeholder="$t('ENTER_REFERRAL_CODE', '请输入邀请码')"
                style="border:1px solid #ccc;"
            />
          </template>

          <p class="vw-90 text-center margin-top-sm margin-bottom-xs"  @click="changeCurrentType('login')">{{ $t("HAS_ACCOUNT_SIGN_IN", "已有账号，登录") }}</p>
          <van-button
            :disabled="!allowRegister"
            :loading="loadingRegister"
            :class="['margin-bottom-sm border-radius-xl font-bold fs-16 custom-btn',{'breath-btn':(allowRegister && !loadingRegister)}]"
            style="letter-spacing:0.05rem"
            color="#2acd72"
            size="large"
            @click="startRegister"
          >
<!--            {{ $t("SIGN_UP", "注册") }}-->
            {{ $t("SIGN_UP", "注册") }}
          </van-button>

         
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex flex-direction vh-100" style="overflow:auto">
        <div><img src="../assets/images/bak_1@2x.png" alt="" class="vw-100"></div>
        <ul class="vh-100 vw-90 " style="margin:auto;">
          <p class="font-bold margin-top margin-bottom-lg fs-20 fc-666">{{$t("LOGIN_TO_ACCOUNT","登录到您的账户")}}</p>
            <li>
              
                <van-field
                  type="tel"
                  class="border-radius-xl margin-bottom-lg border focus-effect"
                  v-model="login.phone"
                  clearable
                  :formatter="phoneFormatter"
                  :maxlength="15"
                  :placeholder="$t('ENTER_PHONE', '请输入手机号')"
                  left-icon="smile-o"
                  :label= '["+"]+this.currentCallingCode'
                  style="border:1px solid #ccc;"
                />
                <van-field
                  
                  type="password"
                  class="border-radius-xl border focus-effect"
                  clearable
                  v-model="login.password"
                  :placeholder="$t('ENTER_PASSWORD', '请输入密码')"
                  style="border:1px solid #ccc;"
                />
              
              <div class="flex justify-between margin-top-xs fs-13">
                <span class="fc-2acd72" @click="changeCurrentType('register')">{{$t("RECHARGE_ACCOUNT","注册账户")}}</span>
                <!-- <p >忘记密码<span class="fc-2acd72 ">?点这里</span></p> -->
              </div>
              <van-button
                :disabled="!allowLogin"
                :loading="loadingLogin"
                :class="['margin-top-xl border-radius-xl font-bold fs-16 custom-btn',{'breath-btn':(allowLogin && !loadingLogin)}]"
                style="letter-spacing:0.05rem;"
                color="#2acd72"
                size="large"
                @click="startLogin"
                
                >{{ $t("SIGN_IN", "登录") }}</van-button
              >
            </li>
        </ul>
      </div>
    </template>

    
  </van-popup>
</template>


<script>
import { Popup, Field, Button, Popover } from "vant";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import { Base } from "@/mixins";
import { Toast } from "mand-mobile";

export default {
  components: {
    // VuePhoneNumberInput,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popover.name]: Popover,
  },
  data: () => {
    return {
      show: false,
      showDropdown: false,
      currentType: "register",
      currentCallingCode: "",
      isGetting: false,
      isSending: false,
      sendTime: 0,
      sendVerifyCodeTimer: null,
      register: {
        phone: "",
        nickName: "",
        verifyCode: "",
        password: "",
        passwordAgain: "",
        inviteCode: "",
        inviteReadonly: false
      },
      login: {
        phone: "",
        password: "",
      },
      loadingLogin: false,
      loadingRegister: false,
      source: '',
    };
  },
  watch: {
    system() {
      if (this.system.country_code.length) {
        this.currentCallingCode = this.$getCallingCode(
          this.system.country_code[0]
        );
      }
    },
  },
  computed: {
    allowLogin() {
      return !!this.login.phone && !!this.login.password;
    },
    allowRegister() {
      if (this.system.is_sms_reg) {
        return (
            !!this.register.phone &&
            !!this.register.verifyCode &&
            !!this.register.nickName &&
            !!this.register.password
        );
      } else {
        return (
            !!this.register.phone &&
            !!this.register.nickName &&
            !!this.register.password &&
            this.register.password == this.register.passwordAgain
        );
      }
    },
    generateCountryCode() {
      let lst = [];
      if (this.system.country_code.length) {
        for (let code of this.system.country_code) {
          lst.push({
            text: this.$getCallingCode(code),
          });
        }
      }
      return lst;
    },
  },
  mixins: [Base],
  mounted() {
    this.$bus.on("login", () => {
      this.show = true
      this.loadOpenAnimate()
      // 是否注册过，如果注册过显示登录，否则显示注册
      const hasAccount = localStorage.getItem("REGISTERED");
      if (hasAccount) {
        this.currentType = "login";
        this.changeCurrentType('login',true)
      } else {
        this.changeCurrentType('register',true)
      }

      // 来源, 如果来源是ad的话，不需要填写邀请码， 其他的情况注册需要填写邀请码
      this.source = localStorage.getItem('Source')
    });

    this.$nextTick(()=>{
      if (this.system.country_code.length) {
        this.currentCallingCode = this.$getCallingCode(
            this.system.country_code[0]
        );
        this.register.inviteCode = localStorage.getItem('Invitation')
        if (this.register.inviteCode) {
          this.register.inviteReadonly=true
        }
      }
    })
  },
  methods: {
    showicon() {
      console.log("我是icon ")
      
    },
    loadOpenAnimate() {
      //  .signInUpModel
      this.$nextTick(()=>{
        let els = document.querySelectorAll('.signInUpModel')
        try {
          for (let el of els) {
            el.classList.add('bounce-up-btn')
            setTimeout(()=>{
              el.classList.remove('bounce-up-btn')
            }, 1000)
          }
        } catch (err) {
          // console.log('add animate error',err)
        }
      })
    },
    async sendVerifyCode() {
      if (this.sendTime > 0) {
        return;
      }
      this.$webEvent(`点击发送验证码`, this.$route.name+'页面')
      this.isSending = true;
      this.$startRecaptcha("verify_code").then((g_token) => {
        if (g_token) {
          this.$http
            .post("v1/sendRegisterSms", {
              national_number: this.register.phone,
              country_code: this.$getCountryCode(this.currentCallingCode),
              g_token: g_token,
            })
            .then((res) => {
              // if (res.data.code) {
              //   this.register.verifyCode = res.data.code
              //   Toast.info(res.data.code)
              // }
              this.startSendTimer();
            })
            .catch((err) => {
              Toast.failed(err.data.message);
            })
            .finally(() => {
              this.isSending = false;
            });
        }
      });
    },
    startSendTimer() {
      clearInterval(this.sendVerifyCodeTimer);
      this.sendTime = 60;
      this.sendVerifyCodeTimer = setInterval(() => {
        if (this.sendTime > 0) {
          --this.sendTime;
        } else {
          clearInterval(this.sendVerifyCodeTimer);
        }
      }, 1000);
    },
    getRandomNickname() {
      this.isGetting = true;
      this.$http
        .get("v1/getName")
        .then((res) => {
          this.register.nickName = res.data.name;
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        })
        .finally(() => {
          this.isGetting = false;
        });
    },
    phoneFormatter(mobile) {
      var value = mobile.replace(/\D/g, "");
      var valueLen = value.length;
      if (valueLen > 3 && valueLen < 8) {
        value = `${value.substr(0, 3)} ${value.substr(3)}`;
      } else if (valueLen >= 8) {
        value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(
          7
        )}`;
      }
      return value;
    },
    currentCountryChange(item) {
      this.currentCallingCode = item.text;
    },
    async startLogin() {
      if (!this.allowLogin) {
        return;
      }
      this.$webEvent(`点击登录`, this.$route.name+'页面')
      this.loadingLogin = true
      this.$startRecaptcha("login").then((g_token) => {
        if (g_token) {
          this.$http
            .post("v1/login", {
              national_number: this.login.phone,
              country_code: this.$getCountryCode(this.currentCallingCode),
              password: this.login.password,
              g_token: g_token,
            })
            .then((res) => {
              localStorage.setItem('WELCOME_TO',true)
              localStorage.setItem("REGISTERED", true);
              localStorage.setItem("TOKEN", res.data.token);
              location.reload()
            })
            .catch((err) => {
              Toast.failed(err.data.message);
            })
            .finally(()=>{
              this.loadingLogin = false
            })
        }
      });
    },
    async startRegister() {
      if (!this.allowRegister) {
        return;
      }
      this.$webEvent(`点击注册`, this.$route.name+'页面')
      this.loadingRegister = true
      this.$startRecaptcha("register").then((g_token) => {
        if (g_token) {
          let inviteId = this.register.inviteCode
          if (this.source=='ad') {
            inviteId = localStorage.getItem('Invitation') || 0
          }
          if (!inviteId && this.source != 'ad') {
            this.$webEvent(`注册时没有邀请ID`, this.$route.name+'页面')
          }
          this.$http
            .post("v1/register", {
              name: this.register.nickName,
              national_number: this.register.phone,
              country_calling_code: this.currentCallingCode,
              country_code: this.$getCountryCode(this.currentCallingCode),
              sms_code: this.system.is_sms_reg ? this.register.verifyCode : 0,
              invite_id: inviteId || 0,
              source: this.source || 0,
              channel_id: Number(localStorage.getItem('ChannelID') || 0),
              link_id: Number(localStorage.getItem('PremoteLinkID') || 0),
              password: this.register.password,
              password_confirmation: this.system.is_sms_reg ? this.register.password : this.register.passwordAgain,
              g_token: g_token,
            })
            .then((res) => {
              localStorage.setItem('WELCOME_TO',true)
              localStorage.setItem("REGISTERED", "1");
              localStorage.setItem("TOKEN", res.data.token);
              location.reload()
            })
            .catch((err) => {
              Toast.failed(err.data.message);
            })
            .finally(()=>{
              this.loadingRegister = false
            })
        }
      });
    },
    changeCurrentType(type,auto=false) {
      if (!auto) {
        this.$webEvent(`切换到${type=='register'?'注册':'登录'}`, this.$route.name+'页面')
      }
      this.currentType = type;
      if (type=='register') {
        this.login = {
          phone: "",
          password: "",
        }
        if (!this.register.nickName) {
          this.getRandomNickname()
        }
      } else {
        this.register = {
          phone: "",
          nickName: "",
          verifyCode: "",
          password: "",
        }
      }
    },
  },
};
</script>

<style lang="scss">
.van-popup {
  .van-popover__action {
    padding: 0;
    width: 2.4rem;
  }
}

.grecaptcha-badge {
  display: none !important;
}

.signInUpModel {
  //transform: translate3d(0, 100%, 0);
  position: relative;

  &::after {
    z-index: 1;
    content: "";
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    height: 2rem;
    bottom: 0;
    transform: translate3d(0,100%,0);
  }
}

.bounce-up-btn {
  animation-name: bounceInUpBtn;
  animation-duration: 1s;
}

.focus-effect {
  &:hover {
    //box-shadow: 0 0 5px 1px #2acd72 !important;
    border:2px solid #2acd72 !important;
  }
}

@keyframes bounceInUpBtn {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 3000px, 0) scaleY(3);
    transform: translate3d(0, 3000px, 0) scaleY(3);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0) scaleY(0.92);
    transform: translate3d(0, -20px, 0) scaleY(0.92);
  }

  75% {
    -webkit-transform: translate3d(0, 10px, 0) scaleY(0.95);
    transform: translate3d(0, 10px, 0) scaleY(0.95);
  }

  90% {
    -webkit-transform: translate3d(0, -5px, 0) scaleY(0.99);
    transform: translate3d(0, -5px, 0) scaleY(0.99);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.custom-btn {
  min-height: 44px;
  height: unset;
  line-height: 1.5;
  padding: 0.1333rem 0.2667rem;
}

.inputbox{
  
  .van-cell__value{
    justify-content: space-between;
  }
}

</style>
