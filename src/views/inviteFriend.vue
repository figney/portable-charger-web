<template>
  <div class="withdraw-page flex flex-direction">
    
      <!-- @click-left="$router.go(-1)" -->
    <div class="flex " >
        <div class="margin-lr margin-tb" @click="$router.go(-1)">
            <img src="../assets/images/icon_12@2x.png" alt="" style="width:0.8rem;"/> 
        </div>
        <div class="margin-lr-sm margin-tb flex">
            <img src="../assets/images/image_6@2x.png" alt="" style="height:4rem;"/>
            <p class=" fs-18 font-900" style="margin-top:1rem;line-height:0.8rem;">{{ $t("INVITEFRIEND","邀请好友")}}<br/>{{ $t("GET_FREE_LEASE_POWERBANK","领取免费租赁充电宝资格")}}</p>
        </div>
    </div>
    <div class="vw-100 white-view">
        <div class="scroll-banners">
            <vue-seamless-scroll
                :data="notice"
                :class-option="{hoverStop:true}"
                class="per-scroll-warp"
            >
            <ul class="item">
                <li v-for="(item, index) in notice" :key="index">
                <div class="flex align-center fc-default">
                    <img :src="item.who | avatar" class="size-36 margin-right-sm avatar border-radius-50 margin-top">
                    <div class="text-wrap">
                    <span v-if="item.action=='invite'">{{item.who}} {{$t('INVITED_SOMEONE',[item.friend],'邀请了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>
                    <span v-else-if="item.action=='deposit'">{{item.who}} {{$t('DEPOSIT_N_BALANCE',[item.amount+system.default_currency],'充值了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>
                    <span v-else-if="item.action=='profit'">{{item.who}} {{$t('GETTED_N_PROFIT',[item.fee+system.default_currency],'获得了N收益')}}</span>
                    <span v-else-if="item.action=='award'">{{item.who}} {{$t('GETTED_N_AWARD',[item.fee+system.default_currency],'获得了N奖励')}}</span>
                    <span v-else></span>
                    </div>
                </div>
                </li>
            </ul>
            </vue-seamless-scroll>
        </div>
    </div>
    <div class="flex vw-90 margin-auto border-radius bg-2acd72 flex-direction">
        <p class="fs-15 fc-fff margin-tb-sm margin-lr-sm">{{ $t("CURRENT_INVITE_PROGRESS","当前邀请进度")}}：<span>3</span></p>
        <div class="flex justify-around vw-80 margin-auto">
            <div class="avatar"></div>
            <div class="avatar"></div>
            <div class="avatar"></div>
            <div class="avatar"></div>
            <div class="avatar"></div>
        </div>
        <flash-invite-btn class=" margin-lr  vw-80 fc-fff fs-18 margin-auto"/>
        <div>
            <ul class="fc-fff margin-lr margin-bottom">
                <li class="fs-20">{{$t("ACTIVITY_RULES","活动规则")}}</li>
                <div class="margin-bottom-sm render-html margin-lr" v-html="inviteRule.content || $t('NO_DESC','暂无描述')"/>
            </ul>
        </div>   
    </div>
  </div>
  
</template>

<script>
import MoneyNumber from "@/components/MoneyNumber";
import { Button, Icon, NavBar, Field, RadioGroup, Radio, Popup, Divider, Stepper   } from "vant";
import { Base } from "@/mixins";
import {Swiper, SwiperItem, Toast} from "mand-mobile"
import vueSeamlessScroll from "vue-seamless-scroll";
import {mapState} from "vuex";
import FlashInviteBtn from "@/components/FlashInviteBtn";


export default {
  components: {
    vueSeamlessScroll,
    MoneyNumber,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup,
    [Divider.name]: Divider, 
    [Stepper .name]: Stepper ,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    FlashInviteBtn,

  },
  data: () => {
    return {
        inviteRule: {},
        showRend: false,
        value: 1,
        notice: [],
        inviteRule: {},

    }     
},
  mixins: [Base],
  computed: {
      ...mapState(['baseNotice']),
  },
  mounted() {
    this.getNotices()
    this.getData()
  },
  methods: {
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
    getNotices() {
      if (this.baseNotice.length>0) {
        this.notice = this.baseNotice
      } else {
        this.$http.get('v1/annunciation')
            .then(res=>{
              this.$store.commit('setState',{key:'baseNotice',value:res.data})
              res.data.forEach(e=>{
                if (e.action=='deposit') {
                  e.amount = e.amount ? e.amount : e.fee * this.randomInt()
                }
              })
              this.notice = res.data
            })
            .catch(err=>{
              Toast.failed(err.data.message)
            })
      }
    },
  },
};
</script>

<style lang="scss">
.withdraw-page {
  .withdraw-tip {
    display: flex;
    align-items: flex-start;
   }
   .avatar{
       height:1.5rem;
       width:1.5rem;
       background:#fff;
       border-radius:1rem;
       margin-bottom:0.5rem;
   }
   .scroll-banners {
      color: #122134;
      position: absolute;
      top: 50vw;
      left: 5vw;
      width: 90vw;
      height: 38vw;
      padding: 1.3vw 2.2vw;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      li {
        border-radius: 1rem;
        padding: 2vw 3vw;
        background: #d4f5e3;
        // backdrop-filter: blur(10px) saturate(2);
        display: flex;
        align-items: center;
        margin-bottom: 2.4vw !important;

        img {
          width: 36px;
          height: 36px;
          min-width: 36px;
        }
      }

      .notice-content {
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 1.44rem;
      }
    }

}
</style>
