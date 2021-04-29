<template>
  <van-popup
    :close-on-click-overlay="false"
    class="select-identify-model vw-100 vh-100  "
    v-model="show"
    v-if="show"
    ref="selectIdentify"
  >

    <md-popup :mask-closable="false" v-model="showmdPopup" >
      
      <div class="mdPopup" style="position: relative;">
        <img src="../../assets/images/blue1.png" alt="" style="width: 8rem;position: absolute;left: 0.04rem;top:-4.4rem;">
        <div class="flex flex-direction padding-top-sm">
         
          <div class="fs-18 font-bold margin-bottom centerText" style="margin:0.2rem 0;font-size:0.42rem;">
            <typeing :text="$t('WELCOME_TO_VIDEO_CAT','HI，欢迎来到电影猫!')"/>
          </div>
          
          <div class="margin-bottom fc-323233 line-height-18"  style="overflow-wrap: break-word;">
            
            <typeing :text="$t('HOME_ALERT')"  style="font-size:0.6rem;font-weight:900;color:#432af5;text-align: center;"/>
          </div>

          <div class="fade-in-down" style="width:100%;" >
            <van-button block class="border-radius-xs breath-btn" color="#432af5" @click="startNow">{{$t('LINK_RE')}}</van-button>
          </div>
        </div>
      </div>
    </md-popup>
  <vue-seamless-scroll :data="notice" class="seamless-warp" >
    <div class="content"> 
     <md-swiper-item v-for="(item,i) in notice" :key="i" class="flex align-center notice_item">
       
        <img class="size-18 margin-right-xs" src="../../assets/images/icon4@2x.png" alt="" >
        <div class="" style="max-width:8rem">
          <span v-if="item.action=='invite'">{{item.who}} {{$t('INVITED_SOMEONE',[item.friend],'邀请了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>
          <span v-else-if="item.action=='deposit'">{{item.who}} {{$t('DEPOSIT_N_BALANCE',[(item.amount?item.amount:item.fee*randomInt())+system.default_currency],'充值了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>
          <span v-else-if="item.action=='profit'">{{item.who}} {{$t('GETTED_N_PROFIT',[item.fee+system.default_currency],'获得了N收益')}} </span>
          <span v-else-if="item.action=='award'">{{item.who}} {{$t('GETTED_N_AWARD',[item.fee+system.default_currency],'获得了N奖励')}}</span>
          <span v-else>{{ item }}</span>
        </div>
      </md-swiper-item>
    </div>
    </vue-seamless-scroll>
  </van-popup>
</template>

<script>
import {NoticeBar} from 'vant'
import {Swiper, SwiperItem, Toast, Popup as mdPopup, PopupTitleBar } from 'mand-mobile'
import {Base} from "@/mixins";
import {mapState} from "vuex";
import { Popup, Button, Row, Col, Icon } from "vant";
import Typeing from "@/components/Typeing";

import scroll from 'vue-seamless-scroll'

export default {
  components: {
    Typeing,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Icon.name]: Icon,
     [NoticeBar.name]: NoticeBar,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [mdPopup.name]: mdPopup,
    
    
  },
  data: () => {
    return {
      show: false,
      
      showClose: false,
      beginnerFee: 0,
      notice:[],
      s_notice: [],
      showmdPopup:true
    };
  },
  mixins: [Base],
  mounted() {
    this.$bus.on("showWelcomeModel", () => {
      if (this.$route.name == "HomeIndex") {
        this.$webEvent("展示欢迎新人弹窗", this.$route.name + "页面");
        this.getBeginnerTask();
        this.show = true;
      }
    });
    this.indexPage();
  },
  methods: {
    replay() {
      this.notice = this.s_notice
    },
    indexPage(){
      this.$http.get('v1/annunciation')
          .then(res=>{
            this.$store.commit('setState',{key:'baseNotice',value:res.data})
            this.notice = res.data
            this.s_notice = this.notice
            //console.log(this.notice)
          })
          .catch(err=>{
            Toast.failed(err.data.message)
          })
      
    },
    closeModel() {
      this.$webEvent("点击关闭欢迎新人弹窗", this.$route.name + "页面");
      this.$closeModel(this.$refs.selectIdentify.$el);
      setTimeout(() => {
        this.show = false;
      }, 300);
    },
    startShowButton() {
      setTimeout(() => {
        this.showButton = true;
      }, 800);
      setTimeout(() => {
        this.showClose = true;
      }, 2000);
    },
    startNow() {
      this.$webEvent("点击立即领取", this.$route.name + "页面");
      this.$bus.emit("login");
    },
    randomInt(min=1, max=3) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    async getBeginnerTask() {
      this.$http
        .get("v1/getTaskInfo", {
          params: {
            hook: "Register",
            task_target: "First"
          }
        })
        .then(res => {
          this.beginnerFee = res.data.user_award_amount;
        })
        .catch(err => {
          if (err.data) {
            Toast.failed(err.data.message);
          } else {
            Toast.failed(this.$t("FAILED", "失败"));
          }
        });
    }
  }
};
</script>

<style lang="scss">

.md-popup-box{
  overflow: visible;
}
.centerText{
    position: absolute;
    top: -1.15rem;
    width: 7.1rem;
    text-align: center;
    color:#fff;
}

.seamless-warp{
  //width:8rem;
  max-height:14rem;
  position: fixed;
  top:6rem;
  overflow: hidden;
  left:1rem;
  right:1rem;
}

.select-identify-model {
  position: fixed;
  height: 100vh;
  overflow: hidden;
  background:url("../../assets/images/bk_yd.jpg" ) no-repeat ;
  background-size: 100% auto;
  .notice_wrap{
    flex-direction:column;
    position: absolute;
    overflow: auto;
    height: calc(100vh - 6.4rem);
    top: 6rem;
    left: 1rem;
    right: 1rem;
    background:#f7f7f9;
    color:#122134;

  }
  .notice_item{
    background:#eef0f6;
    min-height:0.54rem;
    line-height:0.54rem;
    //height: unset !important;
    padding:0.1rem 0.4rem;
    border:1px solid #fff;
    overflow: hidden;
  }
  .close-icon {
    z-index: 1;
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }

  .van-button {
    min-height: 44px;
    height: unset;
    padding: 1.1333rem 0.2667rem;
    line-height: 1.5;
  }
  .notice-swipe {
    height: 100px;
    line-height: 100px;
  }

  .select-identify-model{
    background-image: url(../../assets/images/bk_yd.jpg);
  }
  .mdPopup{
    color:#000;
    padding:0.2667rem 0.53rem;
    width:8rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    margin-top: 2rem;
    button{
      padding: 0.1rem 1.5rem;
      border: none;
      outline: none;
      background: purple;
      text-align: center;
      width: 7rem;
    }
  }
}
</style>