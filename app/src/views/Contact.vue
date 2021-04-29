<template>
  <div class="contact-page app-appbar">
    <van-nav-bar 
      :title="$t('CONTACT_US','联系我们')" 
      fixed 
      left-arrow 
      @click-left="$router.go(-1)"
    />

    <div class="white-view margin border-radius van-overflow-hidden box-shadow">
      <van-cell
          style="border-bottom: 1px solid #eee"
          class="padding-tb"
          :title="system.service.type"
          is-link
          @click="contact"
      >
        <template #icon>
          <img class="margin-right-xs" style="height:0.64rem" :src="system.service.avatar" alt="">
        </template>
        <template #default>
          <span class="margin-right-xs">{{system.service.name}}</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import {Cell,NavBar} from 'vant'
import {Base} from "@/mixins"

export default {
  components: {
    [Cell.name]:Cell,
    [NavBar.name]:NavBar
  },
  mixins: [Base],
  methods: {
    contact() {
      this.$openLink(this.system.service.url)
    }
  }
}
</script>

<style lang="scss">
.contact-page {
  min-height: calc(100vh - 1.23rem);
}
</style>
