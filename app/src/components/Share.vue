<template>
  <van-share-sheet
      class="share-popup"
      v-model="showShare"
      :cancel-text="$t('CANCEL','取消')"
  >
    <div class="flex flex-direction" slot="title">
      <div class="padding-bottom">{{$t('CLICK_COPY_YOUR_LINK','点击复制按钮，自动复制您的专属链接')}}</div>
      <div class="bg-view padding border-radius-sm fs-14 fc-6f flex justify-between align-center">
        <span>{{share.url}}</span>
        <van-button size="mini" color="#2acd72" class="padding-lr-xs" @click="copyLink">{{$t('COPY','复制')}}</van-button>
      </div>
      <div class="padding-tb margin-bottom-sm">{{$t('CLICK_AFTER_SHARE_FRIEND','点击下方图标分享给好友')}}</div>
      <div class="share-icons flex align-center margin-bottom">
        <div
            class="flex flex-direction align-center margin-right "
            v-for="(item,i) in options"
            :key="'share-item'+i"
            @click="onSelect(item)"
        >
          <img :src="item.icon" class="margin-bottom-xs border-radius-xs size-50">
          <div class="fc-666 fs-12">{{item.name}}</div>
        </div>
      </div>
      <!-- <div class="fc-ff3636 text-center bounce">
        {{flag?$t('INVITE_FRIEND_GET_MONEY','邀请好友并获取40000 VND'):$t('INVITE_FRIEND_GET_PROFIT','邀请好友并获取收益的25%')}}
      </div> -->
    </div>

  </van-share-sheet>
</template>

<script>
import {Button, ShareSheet} from "vant"
import {Base} from "@/mixins";
import {Toast} from "mand-mobile"

export default {
  components: {
    [ShareSheet.name]:ShareSheet,
    [Button.name]:Button,
  },
  data: ()=> {
    return {
      flag: false,
      flagInterval: null,
      showShare: false,
      options: [
        {
          name: 'Whatsapp',
          icon: require('../assets/images/whatsapp.png'),
          type: 'wa',
        },
        {
          name: 'Telegram',
          icon: require('../assets/images/telegram.png'),
          type: 'tg',
        },
        {
          name: 'Facebook',
          icon: require('../assets/images/facebook.png'),
          type: 'fb',
        },
      ],
    }
  },
  mounted() {
    this.startFlagInterval()
    this.$bus.on('share',()=>{
      if (!this.share.url) {
        this.getShareInfo()
      } else {
        this.$nextTick(()=>{
          this.handleOverlay()
          this.showShare = true
        })
      }
    })
  },
  beforeDestroy() {
    window.clearInterval(this.flagInterval)
  },
  mixins: [Base],
  methods: {
    startFlagInterval() {
      window.clearInterval(this.flagInterval)
      this.flagInterval = setInterval(()=>{
        this.flag = !this.flag
      }, 3500)
    },
    handleOverlay() {
      let overlays = document.querySelectorAll('.van-overlay')
      for (let overlay of overlays) {
        overlay.style.transition = ''
        overlay.style.opacity = ''
      }
    },
    copyLink() {
      let url = this.getShareUrl()
      this.$copyText(this.getShareText() + ' ' + url)
    },
    getShareInfo() {
      Toast.loading('loading')
      this.$http.get('v1/shareInfo')
        .then(res=>{
          Toast.hide()
          this.$store.commit('setState',{key:'share',value: {
            url: res.data.url,
            contents: res.data.contents
          }})

          this.showShare = true
        })
        .catch(err=>{
          Toast.failed(err.data.message)
        })
    },
    onSelect(item) {
      let url = ''
      let lang = localStorage.getItem('language')
      switch (item.name) {
        case 'Facebook':
          this.$webEvent('facebook分享点击', '分享活动页')
          url = encodeURIComponent(`${this.getShareUrl(item.type)}`)
          this.$openLink(`https://www.facebook.com/sharer.php?u=${url}`)
          break;
        case 'Twitter':
          this.$webEvent('twitter分享点击', '分享活动页')
          url = encodeURIComponent(`${this.getShareUrl(item.type)}`)
          this.$openLink(`https://twitter.com/intent/tweet?url=${url}`)
          break;
        case 'Telegram':
          this.$webEvent('Telegram分享点击', '分享活动页')
          url = encodeURIComponent(`${this.getShareText()} ${this.getShareUrl(item.type)}`)
          this.$openLink(`tg://msg_url?url=${url}`)
          break;
        case 'Whatsapp':
          this.$webEvent('Whatsapp分享点击', '分享活动页')
          url = encodeURIComponent(`${this.getShareText()} ${this.getShareUrl(item.type)}`)
          this.$openLink(`whatsapp://send?text=${url}`)
          break;
      }
    },
    getShareText() {
      let text = ''
      try {
        text = this.share.contents[Math.floor(Math.random() * (this.share.contents.length - 1))].title || ''
      } catch (e) {

      }
      return text
    },
    getShareUrl(type='cp') {
      let lang = localStorage.getItem('language')
      let url = `${this.share.url}&s=${type}&lang=${lang}`
      if (this.user.c_id) {
        url += `&ch=${this.user.c_id}`
      }
      if (this.user.l_id) {
        url += `&cl=${this.user.l_id}`
      }
      return url
    }
  }
}
</script>

<style lang="scss">
.share-popup {
  .van-share-sheet__options {
    padding: 0.2667rem !important;
  }
}
</style>