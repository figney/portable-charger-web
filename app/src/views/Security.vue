<template>
  <div class="security-page app-appbar">
    <van-nav-bar
      :title="$t('SECURITY', '安全中心')"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div
      class="white-view margin border-radius van-overflow-hidden box-shadow"
      style="min-height:calc(100vh - 2.03rem)"
    >
      <van-cell
        center
        class="padding-tb fs-16"
        :title="user.name"
        to="update_name"
      >
        <span class="fc-432af5">{{ $t("MODIFY", "修改") }}</span>
      </van-cell>
<!--      <van-cell-->
<!--        class="padding-tb  fs-16"-->
<!--        :title="$t('TRANS_PWD', '交易密码')"-->
<!--        to="update_transpwd"-->
<!--      >-->
<!--        <span class="fc-432af5">{{ $t("MODIFY", "修改") }}</span>-->
<!--      </van-cell>-->
      <van-cell
        center
        class="padding-tb  fs-16"
        :title="$t('LOGIN_PWD', '登录密码')"
        to="update_loginpwd"
      >
        <span class="fc-432af5">{{ $t("RESET", "重置") }}</span>
      </van-cell>
<!--      <van-cell-->
<!--        class="padding-tb  fs-16"-->
<!--        :title="$t('TELEPHONE', '手机号')"-->
<!--        to="bind_telephone"-->
<!--      >-->
<!--        <span class="fc-432af5">{{ $t("BIND", "绑定") }}</span>-->
<!--      </van-cell>-->
    </div>
  </div>
</template>

<script>
import { Cell, NavBar } from "vant";
import { Base } from "@/mixins";

export default {
  components: {
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
  },
  mixins: [Base],
  methods: {},
};
</script>

<style lang="scss">
.security-page {
}
</style>
