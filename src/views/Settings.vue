<template>
  <div class="settings-page app-appbar">
    <van-nav-bar 
      :title="$t('SETTINGS','设置')" 
      fixed 
      left-arrow 
      @click-left="$router.go(-1)"
    />
    <div class="white-view margin border-radius van-overflow-hidden box-shadow" style="min-height:calc(100vh - 2.03rem)">
     <van-cell class="padding-tb fs-16" :title="$t('SECURITY','安全中心')" is-link to="security" />
<!--      <van-cell class="padding-tb fs-16" :title="$t('PRIVACY','隐私协议')" is-link to="privacy" />-->
      <van-cell class="padding-tb fs-16" :title="$t('ABOUT_US','关于我们')" is-link to="about" />
    </div>
    <div class="margin logout padding-lr">
      <van-button class="margin-bottom border-radius-xs" color="#ff3636" @click="logout" block>{{$t('LOGOUT','退出登录')}}</van-button>
    </div>
  </div>
</template>

<script>
import {Button, Cell, NavBar} from 'vant'
import {Base} from "@/mixins"

export default {
  components: {
    [Cell.name]:Cell,
    [NavBar.name]:NavBar,
    [Button.name]:Button
  },
  mixins: [Base],
  methods: {
    logout() {
      localStorage.removeItem('TOKEN')
      this.$store.dispatch('updateUser',{})
      this.$router.back()
      setTimeout(()=>{
        location.reload()
      }, 200)
      // location.href = location.origin + "/#/user" + location.search
    }
  }
}
</script>

<style lang="scss">
.settings-page {

  .logout {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
