<template>
<div class="flash-invite-btn padding-lr-xs" @click="clickBtn">
  <div class="padding-sm border-radius-sm font-bold fc-fff flash-btn text-center fs-12">{{text}}</div>
</div>
</template>

<script>
import {Button} from "vant"
import { Base } from "@/mixins";

export default {
  components: {
    [Button.name]:Button,
  },
  data: ()=>{
    return {
      text: '',
     
      flag: true,
    }
  },
  mixins: [Base],
  created() {
    this.text = this.$t('INVITE_NOW','立即邀请')
  },
  beforeDestroy() {
    window.clearInterval(this.changeInterval)
  },
  mounted() {
    window.clearInterval(this.changeInterval)
   
  },
  methods: {
    clickBtn() {
      if (!this.isLogin ) {
            return this.$bus.emit('login')
        }
      this.$bus.emit('share')
    }
  }
}
</script>

<style lang="scss">
.flash-invite-btn {

  .flash-btn {
    word-break: break-all;
    white-space: pre-wrap;
    animation: flashBtn 0.7s linear infinite;
  }

  @keyframes flashBtn {
    0%,100% {
      background: #544f7a;
      transform: scale(0.995);
    }
    50% {
      background: #302d46;
      transform: scale(1.01);
    }
  }
}
</style>