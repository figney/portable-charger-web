<template>
  <div class="team-page flex flex-direction">
    <!-- 邀请好友 -->
    <div class="flex flex-direction vw-100 vh-70" style="background:#2ACD72;">
      <div class="flex margin-top-sm margin-bottom-sm margin-left margin-right">
        <img src="../../assets/images/image_6@2x.png" alt="" style="height:3rem;margin:0 0.3rem;">
        <p class="fc-fff fs-20 font-900 margin-top">{{ $t("INVITE_TOFETHER_INCOME","邀请好友一起赚钱可获得好友收益15%")}}</p>
      </div>
      <div class="flex flex-direction">
        <p class="text-center fc-fff margin-bottom-sm">{{ $t("MY_INVITE_LINK","我的邀请链接")}}</p>
        <div class="flex justify-around margin-bottom">
          <span class="white-view border-radius-xs" style="width:6.5rem;line-height:1rem;">{{share.url}}</span>
          <van-button class=" fc-fff " @click="copyLink" style="width:2rem;height:1rem;border:none;outline:none;background:#3D3A55;">{{$t('COPY','复制')}}</van-button>
        </div>
      </div>
      <div>
        <p class="text-center fc-fff margin-bottom">{{ $t("CLICK_ICON_SHAREIT","点击图标快速分享给朋友")}}</p>
        <ul class="flex justify-around margin-bottom">
          <li>
            <img src="../../assets/images/facebook@2x.png" alt="" style="height:1.5rem;">
            <p class="fc-fff fs-15 font-400 margin-top">facebook</p>
          </li>
          <li>
            <img src="../../assets/images/telegram@2x.png" alt="" style="height:1.5rem;">
            <p class="fc-fff fs-15 font-400 margin-top">telegram</p>

          </li>
          <li >
            <img src="../../assets/images/whatsapp@2x.png" alt="" style="height:1.5rem;">
            <p class="fc-fff fs-15 font-400 margin-top">whatapps</p>

          </li>
        </ul>
      </div>
    </div>
    <div class="content">
    <!-- 邀请收益 -->
      <div class="flex flex-direction vw-90 margin-auto border-radius-sm white-view box-shadow" >
        <div class="flex justify-between  margin-lr-sm margin-top-sm margin-bottom-sm fs-13">
          <p class="font-400 fs-18">{{ $t("INVITE_INCOME","邀请收益")}}</p>
          <p @click="$toRouter({name:'TeamList'})" class="fc-2acd72 margin-top-xs">{{ $t("VIEW_TEAM_MEMBERS","查看团队成员")}}<img src="../../assets/images/icon_5@2x.png" alt="" style="height:0.35rem;margin-left:0.1rem;margin-bottom:0.02rem;"/></p>
        </div>

        <div class="flex justify-between  margin-lr-sm margin-top-sm fs-13">
          <p class="fs-13">{{ $t("TEAM_NUMBER","团队人数")}}</p>
          <p>530人</p>
        </div>
        <div class="flex justify-between  margin-lr-sm margin-top-sm margin-bottom-lg fs-13">
          <p >{{ $t("TOTAL_REVENUE","总收益")}}</p>
          <p class="fs-15 fc-ff3636 font-900">2365744<span class="fs-10 ">VND</span></p>
        </div> 
      </div> 
    <!-- 邀请规则 -->
      <div
        class="fs-13 margin-lr margin-bottom-lg padding border-radius white-view box-shadow flex flex-direction position-re"
        style="line-height:18px !important;min-height:2rem"
      >
        <template v-if="!loadingTeam">
          <div class="fs-18 font-bold margin-bottom">
            {{inviteRule.title || $t('INVEITE_RULE','邀请规则')}}
          </div>
          <div class="margin-bottom-sm render-html" v-html="inviteRule.content || $t('NO_DESC','暂无描述')"/>
        </template>
        
      </div>
    </div>

  </div>
</template>

<script>
import { Button, Col, Row, Icon, ShareSheet } from "vant";
import { Base } from "@/mixins";
import {Toast} from "mand-mobile";

export default {
  components: {
    [ShareSheet.name]:ShareSheet,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
  },
  data: ()=> {
    return {
      inviteRule: {},
      loadingTeam: true,
    }
  },
  mixins: [Base],
  mounted() {
    this.getData()
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
  methods: {
    toFriendList() {
      this.$router.push({ name: "TeamList" });
    },
    copyLink() {
      let url = this.getShareUrl()
      this.$copyText(this.getShareText() + ' ' + url)
    },
    getData() {
      this.loadingTeam = true
      this.$http.post('v1/getArticle',{
        slug: 'INVITE_RULE'
      }).then(res=>{
        this.inviteRule = res.data.articles
        this.loadingTeam = false
      }).catch(err=>{
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
    },
    getShareText() {
      let text = ''
      try {
        text = this.share.contents[Math.floor(Math.random() * (this.share.contents.length - 1))].title || ''
      } catch (e) {

      }
      return text
    },
  },

};
</script>

<style lang="scss">
.team-page {
  min-height: calc(100vh - 2.35rem);
  margin-bottom: 2.35rem;
  .content{
    position: absolute;
    top:9.5rem;
  }
}
</style>
