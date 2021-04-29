<template>
  <div id="app" :class="system.default_currency">
    <nprogress-container/>
    <install-pwa/>

    <template v-if="isLoading">
      <div class="flex flex-direction align-center justify-center vw-100 vh-100">
        <div class="flex align-center justify-center">
          <template v-if="loadingRandom>=0">
            <div class="loader" v-if="loadingRandom<0.4">
              <svg viewBox="0 0 80 80">
                <circle id="test" cx="40" cy="40" r="32"></circle>
              </svg>
            </div>

            <div class="loader triangle" v-else-if="loadingRandom<0.7">
              <svg viewBox="0 0 86 80">
                <polygon points="43 8 79 72 7 72"></polygon>
              </svg>
            </div>

            <div class="loader" v-else>
              <svg viewBox="0 0 80 80">
                <rect x="8" y="8" width="64" height="64"></rect>
              </svg>
            </div>
          </template>
        </div>
        <h1 data-splitting class="loading-text">ANTS.MONEY</h1>
      </div>

    </template>

    <template v-else>
      <router-view v-if="$route.meta.no_cache===true"/>

      <keep-alive>
        <router-view v-if="!$route.meta.no_cache"/>
      </keep-alive>

      <custom-service v-if="isLogin"/>
      <share/>
      <set-invite-pop/>
      <sign-in-up/>
      <base-socket-io/>
      <usdt-deposit/>
      <beginner-model/>
      <select-identify/>
      <first-deposit/>
      <guide-first-deposit/>
    </template>
    <app-bottom-nav-bar v-if="$route.name=='HomeIndex' || $route.name=='HomeMoney' || $route.name=='HomeTask' || $route.name=='HomeTeam' || $route.name=='HomeUser'"/>
  </div>
  
</template>

<script>
import utils from "@/utils"
import {Base} from "@/mixins"
import {Toast} from "mand-mobile"
import Share from "@/components/Share";
import SignInUp from "@/components/SignInUp";
import InstallPwa from "@/components/InstallPwa";
import UsdtDeposit from "@/components/UsdtDeposit"
import BaseSocketIo from "@/components/BaseSocketIo";
import SetInvitePop from "@/components/SetInvitePop";
import CustomService from "@/components/CustomService";
import FirstDeposit from "@/components/guide/FirstDeposit";
import BeginnerModel from "@/components/guide/BeginnerModel";
import SelectIdentify from "@/components/guide/SelectIdentify";
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import GuideFirstDeposit from "@/components/guide/GuideFirstDeposit";
import AppBottomNavBar from "@/components/AppBottomNavBar";

export default {
  components: {
    GuideFirstDeposit,
    InstallPwa,
    BeginnerModel,
    BaseSocketIo,
    FirstDeposit,
    SelectIdentify,
    Share,
    SignInUp,
    SetInvitePop,
    UsdtDeposit,
    NprogressContainer,
    CustomService,
    AppBottomNavBar,
  },
  data: ()=>{
    return {
      isLoading: true,
      loadingRandom: -1,
    }
  },
  mixins: [Base],
  created() {
    this.loadingRandom = Math.random()
    const urlInfo = utils.getUrlKey(location.search)

    if (urlInfo.token) {
      let token = urlInfo.token
      localStorage.setItem('TOKEN',token)
      location.href = utils.updateQueryStringParameter(location.href,'token','')
      return
    }

    if (urlInfo.t) {
      // 邀请码
      localStorage.setItem('Invitation', urlInfo.t)
    }
    if (urlInfo.s) {
      // 来源
      localStorage.setItem('Source', urlInfo.s)
    }
    if (urlInfo.cl) {
      // 推广链接ID
      localStorage.setItem('PremoteLinkID', urlInfo.cl)
    }
    if (urlInfo.ch) {
      // 渠道ID
      localStorage.setItem('ChannelID', urlInfo.ch)
    }
    if (document.referrer) {
      // 来源地址
      localStorage.setItem('SourceUrl', document.referrer)
    }

    this.getToken()
  },
  mounted() {
    this.registerDevice()
    this.mountSocket()
  },
  methods: {
    checkYesterdayNotify() {
      let t = this.$formatTime('yyyymmdd')
      if (localStorage.getItem('GetLatestNotifyAt')!=t) {
        this.$http.get('v1/getYesterdayProfit')
            .then(res=>{
              localStorage.setItem('GetLatestNotifyAt',t)
            })
            .catch(err=>{
              Toast.failed(err.data.message)
            })
      }
    },
    mounteRecaptcha() {
      const scriptId = '__RECAPTCHA_SCRIPT'
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script')
        script.id = scriptId
        script.src = `https://www.google.com/recaptcha/api.js?render=${this.system.web_recaptcha_key}`
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }
    },
    mountSocket() {
      //socket
      this.$socket.on('connect', () => {
        this.$store.commit('setState', {key: 'dynamic_init', value: false})
        setTimeout(() => {
          this.$store.commit('setState', {key: 'dynamic_init', value: true})
        }, 500)

        //注册用户
        if (this.user.hash) {
          this.$socket.emit('init-user', this.user.hash)
        }
        console.log('socket connect')
      })

      this.$socket.on('disconnect', () => {
        console.log('socket disconnect')
      })
    },
    registerDevice() {
      if (!localStorage.getItem('isRegisterd')) {
        this.$http.post('v1/device',{
          channel_id: Number(localStorage.getItem('ChannelID') || 0),
          link_id: Number(localStorage.getItem('PremoteLinkID') || 0),
          invite_id: localStorage.getItem('Invitation') || 0,
          source: localStorage.getItem('Source') || '_',
          source_url: localStorage.getItem('SourceUrl') || '_'
        }).then(res=>{
          localStorage.setItem('isRegisterd', true)
        }).catch(err=>{})
      }
    },
    async getToken() {
      this.$http.get('v1/init', {
        // params: {
        //   channel_id: Number(localStorage.getItem('ChannelID') || 0),
        //   link_id: Number(localStorage.getItem('PremoteLinkID') || 0),
        // }
      })
        .then(res=>{

          if (res.data.user && res.data.user.hash) {
            this.$store.dispatch('updateUser',res.data.user)
            this.$socket.emit('init-user', res.data.user.hash)
             this.checkYesterdayNotify()
          }
          this.$store.commit('setState',{key:'money_bao_rate', value: res.data.money_bao_rate})
          this.$store.commit('setState',{key:'left_secs', value: Math.floor(res.data.left_secs)})
          this.$store.commit('setState', {key:'coin_unit', value: res.data.coin_unit})
          this.$i18n.mergeLocaleMessage('en', res.data.i18n)
          delete res.data.user
          delete res.data.money_bao_rate
          delete res.data.left_secs
          delete res.data.coin_unit
          delete res.data.i18n
          this.$store.commit('setState',{key:'system', value: res.data})
          this.$store.dispatch('startSystemTimer')
          this.mounteRecaptcha()
          this.checkLanguage()
          this.isLoading = false

          setTimeout(()=>{
            if (this.isLogin) {
              this.$bus.emit('getForceNotifications')
            }
          },100)
        })
        .catch(err=>{
          Toast.failed(err.data.message)
        })
    },
    checkLanguage() {
      let lang = localStorage.getItem('language')
      if (lang !== this.system.default_lang && !this.getLanguageName(lang)) {
        localStorage.setItem('language',this.system.default_lang)
        location.reload()
      }

    },
    getLanguageName(l) {
      for (let lang of this.system.lang_list) {
        if (l === lang.slug) {
          return lang.slug
        }
      }
      return ''
    }
  },
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.money-number,.money-number-small {
  display: flex;
  align-items: baseline;
  white-space: nowrap;
  font-family: din-pro;
}

.money-number::before {
  font-size: 100%;
  margin-right: 0.08rem;
  color: #00bcd4;
}

.money-number::after {
  font-size: 100%;
  margin-left: 0.08rem;
  color: #00bcd4;
}

.money-number-small::before {
  font-size: 60%;
  margin-right: 0.08rem;
  color: #00bcd4;
}

.money-number-small::after {
  font-size: 60%;
  margin-left: 0.08rem;
  color: #00bcd4;
}

.Rs {
  .money-number::after,.money-number-small::after {
    content: "Rs"
  }
}

// loading 动画
.loader {
  --path: #2F3545;
  --dot: #5628EE;
  --duration: 3s;
  width: 44px;
  height: 44px;
  position: relative;
  &:before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    position: absolute;
    display: block;
    background: var(--dot);
    top: 37px;
    left: 19px;
    transform: translate(-18px, -18px);
    animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
    rect,
    polygon,
    circle {
      fill: none;
      stroke: var(--path);
      stroke-width: 10px;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    polygon {
      stroke-dasharray: 145 (221 - 145) 145 (221 - 145);
      stroke-dashoffset: 0;
      animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
    rect {
      stroke-dasharray: (256 / 4 * 3) (256 / 4) (256 / 4 * 3) (256 / 4);
      stroke-dashoffset: 0;
      animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
    circle {
      stroke-dasharray: (200 / 4 * 3) (200 / 4) (200 / 4 * 3) (200 / 4);
      stroke-dashoffset: 75;
      animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
  }
  &.triangle {
    width: 48px;
    &:before {
      left: 21px;
      transform: translate(-10px, -18px);
      animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
  }
}

@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 74;
  }
  66% {
    stroke-dashoffset: 147;
  }
  100% {
    stroke-dashoffset: 221;
  }
}

@keyframes dotTriangle {
  33% {
    transform: translate(0, 0);
  }
  66% {
    transform: translate(10px, -18px);
  }
  100% {
    transform: translate(-10px, -18px);
  }
}

@keyframes pathRect {
  25% {
    stroke-dashoffset: 64;
  }
  50% {
    stroke-dashoffset: 128;
  }
  75% {
    stroke-dashoffset: 192;
  }
  100% {
    stroke-dashoffset: 256;
  }
}

@keyframes dotRect {
  25% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(18px, -18px);
  }
  75% {
    transform: translate(0, -36px);
  }
  100% {
    transform: translate(-18px, -18px);
  }
}

@keyframes pathCircle {
  25% {
    stroke-dashoffset: 125;
  }
  50% {
    stroke-dashoffset: 175;
  }
  75% {
    stroke-dashoffset: 225;
  }
  100% {
    stroke-dashoffset: 275;
  }
}

.loader {
  display: inline-block;
  margin: 0 16px;
  margin-bottom: 10px;
}

.loading-text {
  display: flex;
  align-items: center;
  font-size: 0.5rem;
}
</style>