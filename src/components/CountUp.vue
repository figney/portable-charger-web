<template>
  <span class="inline text-nowrap text-center">
    <template>
      <div class="din-pro" :id="countToId">{{formatNum(value)}}</div>
    </template>
  </span>
</template>

<script>
import random from 'string-random'
import { CountUp } from 'countup.js'

export default {
  props: {
    start: {
      type: [Number,String],
      default: 0
    },
    end: {
      type: [Number,String],
      default: 0
    },
    duration: {
      type: [Number,String],
      default: 0
    },
    precision: {
      type: Number,
      default: 0,
    }
  },
  data: ()=> {
    return {
      countToId: '',
      value: 0,
      step: 0,
      animation_s: 100, // 100 毫秒动一次
      countUpInterval: null
    }
  },
  watch: {
    end() {
      this.$nextTick(()=>{
        this.calcDayDynamic()
      })
    }
  },
  created() {
    this.countToId = random(11)
  },
  mounted() {
    this.$nextTick(()=>{
      this.calcDayDynamic()
    })
  },
  beforeDestroy() {
    window.clearInterval(this.countUpInterval)
  },
  methods: {
    calcDayDynamic() {
      window.clearInterval(this.countUpInterval)
      this.value = this.start;
      if (this.value) {
        this.step = (this.end - this.start) / this.duration;
        const step_value = this.step / (1000 / this.animation_s)
        this.countUpInterval = setInterval(()=>{
          this.value = this.value + step_value
        },this.animation_s)
      }
    },
    calcDecimalPlaces(n) {
      let count = this.precision;
      for (let i = 0; i<this.precision; i++) {
        if (n>=(1/10**i)) {
          count = i
          break
        }
      }
      return count
    },
    formatNum(v) {
      if (v) {
        let decimalPlaces = this.calcDecimalPlaces(this.step);
        return v.toFixed(decimalPlaces)
      }
      return v
    }
  },
}
</script>