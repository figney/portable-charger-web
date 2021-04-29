<template>
  <p class="mast__text" :id="elId"/>
</template>

<script>
import random from 'string-random'

export default {
  props: {
    text: {
      type: String,
      default: '',
    }
  },
  data: ()=> {
    return {
      elId: ''
    }
  },
  watch: {
    text() {
      this.$nextTick(()=>{
        this.loadTyping()
      })
    }
  },
  created() {
    this.elId = random(12);
  },
  mounted() {
    this.$nextTick(()=>{
      this.loadTyping()
    })
  },
  methods: {
    loadTyping() {
      let el = document.getElementById(this.elId)
      if (el) {
        let strs = this.splitText(this.text)
        setTimeout(()=>{
          this.$emit('end')
        }, 200 + 18 + 18 * strs.length)

        let html = '<span>' + strs.join('</span><span>') + '</span>'
        el.innerHTML = html
      }
    },
    splitText(s) {
      let strs = s.trim().split('')
      if (localStorage.getItem('language') == 'TH') {
        strs = [s.trim()]
      }
      return strs
    }
  }
}
</script>

<style lang="scss">
$delay_time: 0.018s;
$ease-cb: cubic-bezier(.19,1,.22,1);

@mixin nth-trans-delay($delay_items: 7){
  @for $i from 1 through $delay_items {
    &:nth-child(#{$i}) {
      transition-delay: $delay_time * $i;
    }
  }
}

@mixin nth-ani-delay($delay_items: 7){
  @for $i from 1 through $delay_items {
    &:nth-child(#{$i}) {
      animation-delay: $delay_time * $i;
    }
  }
}

@mixin bg-overlay($bg_hex: #111, $bg_opacity: 0.6, $top_layer: 'header') {
  &:after {
    z-index: 0;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba($bg_hex, $bg_opacity);
  }

  // Layer atop overlay
  & > #{$top_layer}{
    z-index: 2;
    position: relative;
  }
}

.sep{
  border: 0;
  width: 3em;
  height: 1px;
  margin: 1em 0;
  background-color: rgba(255,255,255,0.4);
}

.mast{
  position: relative;
  display:flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: #fff;
  background-color: #111;
  @include bg-overlay(#111, 0.9);

  &__bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-position: 50%;
  }

  &__header{
    padding: 5%;
  }
  // Letter animation
  &__title span{
    font-family: 'Noto Sans SC', sans-serif;
    animation: letter-glow 0.7s 0s ease both;
    @include nth-ani-delay(25);
  }
  //Letter animation
  &__text{
    font-family: 'Noto Sans SC', sans-serif;
    white-space: pre-wrap;
  }

  &__text span{
    font-family: 'Noto Sans SC', sans-serif;
    animation: letter-glow 0.7s 0s ease both;
    @include nth-ani-delay(180);
  }
}


// Letter Glow
@keyframes letter-glow{
  0%   { opacity: 0; text-shadow: 0px 0px 1px rgba(255,255,255,0.1)}
  66%  { opacity: 1; text-shadow: 0px 0px 20px rgba(255,255,255,0.9) }
  77%   { opacity: 1;  }
  100% { opacity:0.7; text-shadow: 0px 0px 20px rgba(255,255,255,0.0)}
}

</style>