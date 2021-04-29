<template>
  <div class="flex align-center justify-center loading-view">
    <md-activity-indicator type="spinner" vertical :size="20" :text-color="color">{{text}}</md-activity-indicator>
  </div>

</template>

<script>
import {ActivityIndicator} from 'mand-mobile'

export default {
  components: {
    [ActivityIndicator.name]: ActivityIndicator,
  },
  props: {
    color: {
      type: String,
      default: '#999'
    },
    text: {
      type: String,
      default: 'Loading'
    }
  },
}
</script>

<style lang="scss">
.loading-view {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
