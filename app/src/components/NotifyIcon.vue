<template>
  <div class="notify-icon">
    <img
        src="../assets/images/icon12@2x.png"
        style="height:24px"
        @click="toNotify"
        v-if="user.unread_notifications_count == 0"
    />
    <van-badge
        :content="user.unread_notifications_count"
        :max="99"
        v-else
    >
      <img
          src="../assets/images/icon12@2x.png"
          style="height:24px"
          alt=""
          @click="$router.push({ name: 'Notification' })"
      />
    </van-badge>
  </div>
</template>

<script>
import {Badge} from "vant";
import {Base} from "@/mixins";

export default {
  components: {
    [Badge.name]: Badge,
  },
  mixins: [Base],
  methods: {
    toNotify() {
      this.$webEvent(`点击消息中心`, this.$route.name+'页面')
      this.$toRouter({ name: 'Notification' })
    }
  }
}
</script>

<style lang="scss">
.notify-icon {

}
</style>