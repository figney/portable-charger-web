<template>
  <div class="about-page app-appbar">
    <van-nav-bar
      :title="$t('ABOUT_US','关于我们')" 
      fixed 
      left-arrow 
      @click-left="$router.go(-1)"
    />
    <div
        style="min-height:calc(100vh - 2.027rem);"
        class="white-view margin padding border-radius box-shadow position-re"
    >
      <div class="render-html" v-html="about.content" v-if="!loadingAbout"/>
      <loading-view v-else/>
    </div>
  </div>
</template>

<script>
import {Cell,NavBar} from 'vant'
import {Base} from "@/mixins"
import {Toast} from "mand-mobile";
import LoadingView from "@/components/LoadingView";

export default {
  components: {
    LoadingView,
    [Cell.name]:Cell,
    [NavBar.name]:NavBar
  },
  data: ()=> {
    return {
      about: {},
      loadingAbout: false
    }
  },
  mixins: [Base],
  mounted() {
    this.getData()

    this.$http.get('v1/updateLang',{params: {
      local: 'EN'
      }})
      .then(res=>{
        console.log(JSON.stringify(res))
      })

    // let lang_map = {}
    
    // alert(Object.keys(lang_map).length)
    // for (let k of Object.keys(lang_map)) {
    //   this.$http.post('https://ydmin.film.bike/api/v1/updateLang',{
    //     slug: k,
    //     content: lang_map[k],
    //   }).catch(err=>{
    //     console.log('更新语言包失败:',k)
    //   })
    // }

  },
  methods: {
    getData() {
      this.loadingAbout = true
      this.$http.post('v1/getArticle',{
        slug: 'INDEX_ABOUT'
      }).then(res=>{
        this.about = res.data.articles
        this.loadingAbout = false
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    }
  }
}
</script>

<style lang="scss">
.about-page {

}
</style>
