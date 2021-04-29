<template>
  <div class="language-page app-appbar">
    <van-nav-bar
      :title="$t('SELECT_LANGUAGE','选择语言')" 
      fixed 
      left-arrow 
      @click-left="$router.go(-1)"
    />
    <div class="white-view margin border-radius-sm van-overflow-hidden padding-tb-sm box-shadow">
      <van-cell
        center
        :border="false"
        :class="['padding',{'active-lang':(currentLang==lang.slug)}]"
        v-for="(lang,i) in system.lang_list"
        :key="'lang'+i"
        @click="changeLang(lang)"
      >
        <template #icon>
          <img class="margin-right" style="height:21px" :src="lang.icon">
        </template>
        <template #title>
          <span class="font-bold fs-16">{{lang.name}}</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import {Button, Cell, NavBar} from 'vant'
import {Base} from "@/mixins"
import {Toast} from "mand-mobile";

export default {
  components: {
    [Cell.name]:Cell,
    [NavBar.name]:NavBar,
    [Button.name]:Button
  },
  data: ()=> {
    return {
      currentLang: localStorage.getItem('language') || 'EN'
    }
  },
  mixins: [Base],
  methods: {
    changeLang(lang) {
      if (lang.slug !== this.currentLang) {
        localStorage.setItem('language', lang.slug)
        Toast.loading('loading')
        this.$http.get('v1/switchLanguage')
          .then(res=>{
            Toast.hide()
            location.href = location.origin + location.search
          })
          .catch(err=>{
            Toast.failed(err.data.message)
          })
      }
    }
  }
}
</script>

<style lang="scss">
.language-page {
  .van-cell {
    border-radius: 0.05rem;
    border-bottom: 0.02667rem solid #ebedf0;
    transition: all 0.3s;

    &:focus,&:active {
      background: rgba(67,42,245,0.1);
    }
  }

  .van-cell:last-child {
    border-bottom: none;
  }

  .active-lang {
    color: #fff;
    background: rgba(67,42,245,0.85);
  }
}
</style>
