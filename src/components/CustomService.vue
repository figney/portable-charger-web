<template>
<div :class="['custom-service','flash-contact']" @click="toCustomService">
  <div class="badge" v-if="needContacted">1</div>
  <img src="../assets/images/custom_service.png" alt="">
</div>
</template>

<script>
import {Base} from "@/mixins";

export default {
  mixins: [Base],
  data: ()=> {
    return {
      needContacted: false
    }
  },
  mounted() {
    this.$bus.on('needContact',()=>{
      this.needContacted = true
    })
  },
  methods: {
    toCustomService() {
      this.needContacted = false
      // this.$openLink(this.system.service.url)
      this.$toRouter({name:'Help'})
    }
  }
}
</script>

<style lang="scss">

.flash-contact {
  animation: flashCS 0.9s linear infinite;
}

.custom-service {
  position: fixed;
  bottom: 1.55rem;
  right: 0.25rem;
  z-index: 10;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 10px 1px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: all 0.16s;

  .badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(20%, -20%);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #FF3636;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    box-shadow: 1px 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    background: #E1F5FE;
    box-shadow: 0 1px 1px rgba(0,0,0,0.2);
  }

  img {
    margin: 0 auto;
    width: 0.8rem;
    animation: scaleCS 0.9s linear infinite;
  }

  @keyframes scaleCS {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.08);
    }
  }
}

@keyframes flashCS {
  0%, 100% {
    box-shadow: 0 2px 10px 1px rgba(0,0,0,0.2);
  }
  50% {
    background: #FBE9E7;
    box-shadow: 1px 2px 15px 1px #EF9A9A;
  }

}

</style>