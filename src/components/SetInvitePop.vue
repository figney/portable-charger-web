<template>
  <van-popup class="set-invite-pop" v-model="showPop" position="top" closeable :close-on-click-overlay="true" @closed="code=''"
             @opened="$refs.mdc.focus()">
    <div class="padding">
      <div class="fs-22 font-bold">{{$t('BIND_INVITOR','绑定邀请人')}}</div>

      <div class="margin-top-lg">
        <md-notice-bar
            icon="warn"
            type="activity"
        >{{$t('CANT_CHANGE_AFTER_BIND','邀请人绑定后无法修改')}}
        </md-notice-bar>
      </div>
      <div class="fs-14 font-bold margin-top">{{$t('ENTER_INVITOR_ID','输入邀请人ID')}}</div>
      <div class="padding-tb-lg margin-bottom-xs">
        <md-codebox
            ref="mdc"
            :maxlength="-1"
            autofocus
            v-model="code"
        />
<!--        <div class="fs-10 fc-999 margin-top-sm">{{$t('INVITOR_ID_MAX_LENGTH','邀请ID最大9位')}}</div>-->
      </div>
      <div>
        <van-button block color="#432af5" class="border-radius-sm" @click="bind" :loading="loading">{{$t('SUBMIT','提交')}}</van-button>
      </div>
    </div>
  </van-popup>
</template>

<script>
import {Popup, Button} from 'vant'
import {Codebox, NoticeBar, Toast} from 'mand-mobile'

export default {
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Codebox.name]: Codebox,
    [NoticeBar.name]: NoticeBar,
  },
  data() {
    return {
      showPop: false,
      loading: false,
      code: '',
    }
  },
  mounted() {
    this.$bus.on('setInvitor', this.show)
  },
  methods: {
    show() {
      this.showPop = true;
    },
    bind() {
      this.loading = true;
      this.$http.post('v1/setInvite', {
        invite_id: this.code
      }).then(res=>{
        this.$store.dispatch('refreshUser')
        this.showPop = false
      }).catch(err=>{
        Toast.failed(err.data.message)
        this.$refs.mdc.focus();
      }).finally(()=>{
        this.loading = false;
      })
    }
  }
}
</script>

<style lang="scss">
.set-invite-pop {

  .md-notice-bar-content {
    padding: 0.22rem 0;
    line-height: 1.6;
    white-space: pre-wrap;
    overflow: visible;
  }
}

.md-number-keyboard {
  .md-popup {
    z-index: 2021;
  }
}
</style>
