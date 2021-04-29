<template>
  <div class="help-page app-appbar flex flex-direction">
    <van-nav-bar
        :title="$t('HELP_CENTER', '帮助中心')"
        fixed
        left-arrow
        @click-left="$router.go(-1)"
    />

    <div class="margin">
      <div class="margin-bottom white-view box-shadow border-radius position-re" style="min-height:2rem">
        <template v-if="!loadingHelp">
          <div
              v-for="(item, j) in list"
              :key="'help' + j"
              style="border-bottom:1px solid rgba(67,42,245,0.06)"
              class="margin-lr padding-tb border-radius-sm"
              @click="showHelpDetail(item)"
          >
            <div class="margin-bottom-xs flex align-start justify-between">
              
              <div class=" flex ">
                  <div class="round"></div>
                  <p class="margin-top-xs">{{item.title || item.name}}</p>
              </div>
              <div>
                <img src="../assets/images/icon_5@2x.png" alt="" style="width:0.2rem;margin-top:0.1rem;"/>
              </div>
            </div>
                       <!-- <div class="fs-13 fc-888 render-html" v-html="item.describe || $t('NO_DESC','暂无描述')" style="padding:0 2px"/> -->
          </div>
        </template>
        
      </div>

      <div class="margin-bottom">
        <van-button class="border-radius-xl" block color="#2acd72" @click="contact">{{ $t("ONLINE_CONTACT","联系在线客服")}}</van-button>
      </div>

    </div>

    <van-popup
        class="vh-80"
        v-model="showDetail"
        position="bottom"
        round
        closeable
        :close-on-popstate="true"
    >
      <div class="vh-80 padding flex flex-direction">
        <div class="font-bold fs-16 margin-bottom">{{currentHelpItem.title}}</div>
        <div class="fc-888 render-html flex-sub padding-bottom-xl" style="overflow:auto" v-html="currentHelpItem.content"/>
        <div class="margin-bottom">
          <van-button class="border-radius-xl" block color="#2acd72" @click="contact">{{ $t("ONLINE_CONTACT","联系在线客服")}}</van-button>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { Field, Cell, NavBar, RadioGroup, Radio, Button, Popup } from "vant";
import { Base } from "@/mixins";
import {Toast} from "mand-mobile";
import LoadingView from "@/components/LoadingView";

export default {
  components: {
    LoadingView,
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup
  },
  data: () => {
    return {
      questionType: "",
      submitContent: "",
      list: [],
      showDetail: false,
      currentHelpItem: {},
      loadingHelp: true
    };
  },
  mixins: [Base],
  mounted() {
    this.getData()
  },
  methods: {
    showHelpDetail(item) {
      this.currentHelpItem = item
      this.showDetail = true
    },
    getData() {
      this.loadingHelp = true
      this.$http.get('v1/articles',{
        params: {
          type: 'help'
        }
      }).then(res=>{
        this.loadingHelp = false
        this.list = res.data.list
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    },
    contact() {
      this.$openLink(this.system.service.url)
    }
  },
};
</script>

<style lang="scss">

</style>
