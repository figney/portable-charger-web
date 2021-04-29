<template>
  <span class="inline text-nowrap text-center">
    <template v-if="day_dynamic">
      <div class="din-pro" :id="countToId"></div>
    </template>

    <template v-else>
      <md-amount
          class="din-pro"
          :value="calcValue"
          :has-separator="true"
          :separator="separator"
          :transition="showTransition"
          :duration="parseFloat(showDuration)"
          :precision="calcPrecision"
          :is-round-up="false"
      />
      <span class="din-pro" style="margin-left:0.05rem" v-if="showK">{{unit}}</span>
    </template>
  </span>
</template>

<script>
import {Amount} from "mand-mobile"
import {mapState} from "vuex"
import random from 'string-random'
import { CountUp } from 'countup.js'
import {Base} from "@/mixins";

export default {
  components: {
    [Amount.name]:Amount,
  },
  props: {
    value: {
      type: [Number,String],
      default: 0
    },
    transition: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [Number,String],
      default: 3000
    },
    precision: {
      type: [Number,String],
      default: 0,
    },
    separator: {
      type: String,
      default: ','
    },
    day_dynamic: {
      type: Boolean,
      default: false
    },
    ck: {
      type: Number,
      default: 0
    }
  },
  data: ()=> {
    return {
      unit: '',
      calcValue: 0,
      showK: false,
      showTransition: false,
      showDuration: 3000,
      inited_secs: false,
      countToId: random(12)
    }
  },
  mixins: [Base],
  watch: {
    left_secs() {
      if (this.day_dynamic && !this.inited_secs) {
        this.inited_secs = true
        this.calcDayDynamic()
      }
    },
    value() {
      this.$nextTick(()=>{
        this.updateShowValue()
        if (this.day_dynamic) {
          this.calcDayDynamic()
        }
      })
    },
    transition() {
      this.showTransition = this.transition
    },
    duration() {
      this.showDuration = this.duration
    },
    day_dynamic() {
      if (this.day_dynamic) {
        this.calcDayDynamic()
      }
    }
  },
  computed: {
    ...mapState(['left_secs']),
    calcPrecision() {
      let s = this.calcValue.toString()
      if (s.indexOf('.') == -1) {
        return 0
      } else {
           let len = s.substring(s.indexOf('.')+1).length
        return len < parseInt(this.precision) ? len : this.precision
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.updateShowValue()
      if (this.day_dynamic) {
        this.calcDayDynamic()
      }
    })
  },
  methods: {
    updateShowValue() {
      let value = parseFloat(this.value)
      // if (this.system.show_suffix && this.value >= 1000000) {
      //   this.calcValue = this.value / 1000000
      //   this.showK = true
      //   this.unit = 'M'
      // }
      if (this.system.show_suffix && value >= 1000) {
        this.calcValue = value / 1000
        this.showK = true
        this.unit = 'K'
      } else {
        this.calcValue = value
        this.unit = ''
      }
    },
    calcDayDynamic() {
      let total = this.value,
          step = total / 86400,
          passed = 86400 - this.left_secs,
          startVal = passed * step,
          decimalPlaces = this.calcDecimalPlaces(step);

      const countUp = new CountUp(this.countToId,this.value,{
        startVal: startVal,
        duration: this.left_secs,
        useEasing: false,
        decimalPlaces: decimalPlaces
      })

      if (!countUp.error) {
        countUp.start()
      } else {
        // console.log(countUp.error)
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
    }
  }
}
</script>