<template>
  <van-popup
      :close-on-click-overlay="false"
      class="beginner-model no-bg vw-100 vh-100 flex align-center justify-center"
      v-model="show"
  >

    <div class="shine-area shine-area1">
      <span v-for="i in 16" :key="'shine1'+i" :style="'--i:'+i"/>
    </div>

    <div class="shine-area shine-area2">
      <span v-for="i in 16" :key="'shine1'+i" :style="'--i:'+i"/>
    </div>

    <div class="shine-area shine-area3">
      <span v-for="i in 16" :key="'shine1'+i" :style="'--i:'+i"/>
    </div>

    <div class="position-re flex">
      <img src="../../assets/images/pop_bg2@2x.png" style="width:8.4rem"/>
      <img class="beginner-coin" src="../../assets/images/pop_bg1@2x.png"/>
      <div class="beginner-title fs-20 font-bold" v-html="beginnerTask.title">
<!--        <span>Congratulations</span>-->
<!--        <span>you've got the gift money</span>-->
      </div>
      <div class="beginner-amount din-pro fs-40 font-bold">
        <money-number class="money-number" :value="beginnerTask.user_award_amount"/>
<!--        <span class="money-unit">{{system.default_currency}}</span>-->
      </div>
      <div class="beginner-tip" v-html="beginnerTask.content">
<!--        <span>Now click register to start the investment experience. Gain profit in two days</span>-->
<!--        <span class="font-bold fc-ff3636">Just do it</span>-->
      </div>
      <van-button class="beginner-btn font-bold fc-fff fs-16 border-radius-sm bounce" @click="getNow">
        <span>{{beginnerTask.btn_name}}</span>
        <!--        <span>Get Now</span>-->
      </van-button>
    </div>
  </van-popup>
</template>

<script>
import {Popup,Button} from "vant"
import {Toast} from "mand-mobile";
import MoneyNumber from "@/components/MoneyNumber";
import {Base} from "@/mixins";

export default {
  components: {
    MoneyNumber,
    [Popup.name]:Popup,
    [Button.name]:Button,
  },
  data: ()=> {
    return {
      show: false,
      beginnerTask: {}
    }
  },
  mixins: [Base],
  mounted() {
    this.$bus.on('showBeginner', ()=>{
      this.getBeginnerTask()
      this.show = true
    })
  },
  methods: {
    async getBeginnerTask() {
      this.$http.get('v1/getTaskInfo',{
        params: {
          hook: 'Register',
          task_target: 'First'
        }
      }).then(res=>{
        this.beginnerTask = res.data || {}
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    },
    getNow() {
      this.$bus.emit('login')
    }
  }
}
</script>

<style lang="scss">
.beginner-model {
  overflow: visible;

  .beginner-coin {
    height: 2.2rem;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -1.2rem);
  }

  .beginner-title {
    white-space: pre-wrap;
    color:#FFF9B9;
    position: absolute;
    width: 8rem;
    height: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    left: 50%;
    top: 1.1rem;
    transform: translate(-50%, 0);

    * {
      max-width: 100%;
    }
  }

  .beginner-amount {
    color: #FFFBD1;
    position: absolute;
    width: 8rem;
    text-align: center;
    left: 50%;
    top: 2.56rem;
    transform: translate(-50%, 0);
  }

  .beginner-tip {
    white-space: pre-wrap;
    position: absolute;
    width: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    left: 50%;
    bottom: 1.9rem;
    height: 2rem;
    transform: translate(-50%, 0);

    * {
      max-width: 100%;
    }
  }

  .beginner-btn {
    overflow: visible;
    position: absolute;
    width: 7.4rem;
    height: 1.28rem;
    left: 0.5rem;
    bottom: 0.42rem;
    background: url("../../assets/images/pop_but@2x.png") no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .shine-area {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shine-area1 {
    width: 1rem;
    height: 1rem;
    top: 1rem;
    left: 1rem;

    span {
      animation-delay: 1.7s !important;
    }
  }

  .shine-area2 {
    top: 3rem;
    right: 2.5rem;
    width: 1.4rem;
    height: 1.4rem;

    span {
      animation-delay: 1.1s !important;
    }
  }

  .shine-area3 {
    top: 1rem;
    right: 1.5rem;
    width: 0.8rem;
    height: 0.8rem;

    span {
      animation-delay: 2.5s !important;
    }
  }

  .shine-area span {
    opacity: 0;
    position: absolute;
    display: block;
    width: 4px;
    background-color: #ff5858;
    border-radius: 100%;
  }

  .shine-area span:nth-child(even) {
    height: 0.27rem;
    animation: ray_even 1.6s ease 1 both;
  }

  .shine-area span:nth-child(odd) {
    height: 7px;
    animation: ray_odd 1.6s ease 1 both;
  }

  @keyframes ray_even {
    /* 动画效果为，先旋转，然后Y轴位移，注意先后顺序 */
    0% {
      transform: rotate(calc(22.5deg * var(--i))) translateY(0px);
    }
    30% {
      opacity: 0.8;
      height: 10px;
    }
    50%,100% {
      transform: rotate(calc(22.5deg * var(--i))) translateY(40px);
      /* 变透明 */
      opacity: 0;
      /* 变小 */
      height: 4px;
    }
  }

  @keyframes ray_odd {
    /* 动画效果为，先旋转，然后Y轴位移，注意先后顺序 */
    0% {
      transform: rotate(calc(22.5deg * var(--i))) translateY(0px);
    }
    30% {
      opacity: 0.8;
      height: 7px;
    }
    50%,100% {
      transform: rotate(calc(22.5deg * var(--i))) translateY(45px);
      opacity: 0;
      height: 3px;
    }
  }

}
</style>