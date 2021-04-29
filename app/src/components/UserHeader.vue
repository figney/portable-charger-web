<template>
  <div class="flex align-center justify-between">
    <div class="font-bold fs-22 fc-fff">{{title}}</div>
    <div class="flex align-center" @click="$toRouter({name:'HomeUser'})">
      <div class="font-bold fs-16 fc-fff van-overflow-hidden text-ellipsis text-nowrap margin-right-xs" style="max-width:3.4rem" v-if="showName">
        {{user.name}}
      </div>
      <div class="avatar border-radius-50 size-36 flex align-center justify-center">

        <img class="border-radius-50 size-30" :src="user.name | avatar" v-if="user.unread_notifications_count==0">
        <van-badge :content="user.unread_notifications_count" :max="99" v-else>
          <img class="border-radius-50 size-30" :src="user.name | avatar">
        </van-badge>
      </div>
    </div>
  </div>
</template>

<script>
import {Base} from "@/mixins";
import {Badge} from "vant"

export default {
  components: {
    [Badge.name]:Badge
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    showName: {
      type: Boolean,
      default: true,
    }
  },
  mixins: [Base]
}
</script>

<style>

</style>