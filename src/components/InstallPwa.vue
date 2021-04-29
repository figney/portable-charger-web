<template>
  <div></div>
</template>

<script>
export default {
  name: "InstallPwa",
  created() {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log("PWA")
      window.deferredPrompt = e;
      e.preventDefault();
      this.$store.commit('setState', {key: 'ifPwa', value: true})
      //window.deferredPrompt.prompt();
    });
  }
}
</script>

<style lang="scss">

</style>
