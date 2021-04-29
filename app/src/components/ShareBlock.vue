<template>
<div class="flex flex-direction align-center">
  <div class="margin-bottom fc-666 fs-12">{{$t('CLICK_AFTER_SHARE_FRIEND','点击下方图标分享给好友')}}</div>
  <div class="flex align-center position-re" style="min-height:1.3334rem;min-width:100%">
    <template v-if="!loadingShareBlock">
      <div class="border-radius-xs size-48 margin-lr-sm" v-for="(item,i) in options" :key="'share-block-item-'+i" @click="onSelect(item)">
        <img :src="item.icon" class="size-48"/>
      </div>
    </template>
    <loading-view v-else/>
  </div>
</div>
</template>

<script>
import {Base} from "@/mixins";
import {Toast} from "mand-mobile";
import LoadingView from "@/components/LoadingView";

export default {
  components: {LoadingView},
  data: ()=> {
    return {
      loadingShareBlock: false,
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
  mixins: [Base],
  mounted() {
    //this.$bus.on('share',()=>{n
      if (!this.share.url) {
        this.getShareInfo()
      }
    //})
  },
  methods: {
    getShareInfo() {
      this.loadingShareBlock = true
      this.$http.get('v1/shareInfo')
          .then(res=>{
            this.loadingShareBlock = false
            this.$store.commit('setState',{key:'share',value: {
                url: res.data.url,
                contents: res.data.contents
              }})
          })
          .catch(err=>{
            //console.log(err);
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

<style scoped>

</style>