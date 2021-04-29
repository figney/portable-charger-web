import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: { name: "HomeIndex" },
  },
  {
    path: "/index",
    name: "HomeIndex",
    // meta: { no_cache: true },
    component: () => import("@/views/home/Index"),
    // component: () => import("@/views/SubmitCertifications"),
  },
  // {
  //   path: "/money",
  //   name: "HomeMoney",
  //   // meta: { no_cache: true },
  //   component: () => import("@/views/home/Money"),
  // },
  {
    path: "/task",
    name: "HomeTask",
    meta: { no_cache: true },
    component: () => import("@/views/home/Task"),
  },
  {
    path: "/team",
    name: "HomeTeam",
    // meta: { no_cache: true },
    component: () => import("@/views/home/Team"),
  },
  {
    path: "/team_list",
    name: "TeamList",
    meta: {no_cache: true},
    component: () => import("@/views/TeamList")
  },
  {
    path: "/user",
    name: "HomeUser",
    // meta: { no_cache: true },
    component: () => import("@/views/home/User"),
  },
  {
    path: "/beginner",
    name: "Beginner",
    // meta: { no_cache: true },
    component: () => import("@/views/Beginner")
  },
  {
    path: "/inviteFriend",
    name: "inviteFriend",
    meta: {no_cache: true},
    component: () => import("@/views/inviteFriend")
  },{
    path: "/Rent",
    name: "Rent",
    meta: {no_cache: true},
    component: () => import("@/views/Rent")
  },
  {
    path: "/about",
    name: "About",
    // meta: { no_cache: true },
    component: () => import("@/views/About")
  },
  // {
  //   path: "/security",
  //   name: "Security",
  //   // meta: { no_cache: true },
  //   component: () => import("@/views/Security")
  // },
  // {
  //   path: "/update_loginpwd",
  //   name: "UpdateLoginpwd",
  //   meta: { no_cache: true },
  //   component: () => import("@/views/UpdateLoginpwd")
  // }, {
  //   path: "/update_name",
  //   name: "UpdateName",
  //   meta: {no_cache: true},
  //   component: () => import("@/views/UpdateName")
  // },{
  //   path: "/update_transpwd",
  //   name: "UpdateTranspwd",
  //   meta: {no_cache: true},
  //   component: () => import("@/views/UpdateTranspwd")

  {
    path: "/help",
    name: "Help",
    // meta: {no_cache: true},
    component: () => import("@/views/Help")
  }
  // ,{
  //   path: "/contact",
  //   name: "Contact",
  //   // meta: {no_cache: true},
  //   component: () => import("@/views/Contact")
  // }

  ,{
    path: "/friend_list",
    name: "FriendList",
    meta: {no_cache: true},
    component: () => import("@/views/FriendList")
  },{
    path: "/invest_history",
    name: "InvestHistory",
    meta: {no_cache: true},
    component: () => import("@/views/InvestHistory")
  },{
    path: "/friend_deposit_history",
    name: "FriendDepositHistory",
    meta: {no_cache: true},
    component: () => import("@/views/FriendDepositHistory")
  },{
    path: "/withdraw_history",
    name: "WithdrawHistory",
    meta: {no_cache: true},
    component: () => import("@/views/WithdrawHistory")
  },{
    path: "/deposit_history",
    name: "DepositHistory",
    meta: {no_cache: true},
    component: () => import("@/views/DepositHistory")
  },{
    path: "/deposit",
    name: "Deposit",
    meta: {no_cache: true},
    component: () => import("@/views/Deposit")
  },{
    path: "/withdraw",
    name: "Withdraw",
    meta: {no_cache: true},
    component: () => import("@/views/Withdraw")
  },
  // {
  //   path: "/balance_transfer",
  //   name: "BalanceTransfer",
  //   meta: {no_cache: true},
  //   component: () => import("@/views/BalanceTransfer")
  // }
  // ,
  {
    path: "/invest_detail",
    name: "InvestDetail",
    meta: {no_cache: true},
    component: () => import("@/views/InvestDetail")
  },{
    path: "/language",
    name: "Language",
    // meta: {no_cache: true},
    component: () => import("@/views/Language")
  },
  {
    path: "/wallet",
    name: "Wallet",
    meta: {no_cache: true},
    component: () => import("@/views/Wallet")
  },
  {
    path: "/wallet_history",
    name: "WalletHistory",
    meta: {no_cache: true},
    component: () => import("@/views/WalletHistory")
  },
  //{

  //   path: "/bao_withdraw",
  //   name: "BaoWithdraw",
  //   meta: {no_cache: true},
  //   component: () => import("@/views/BaoWithdraw")
  // },
  // ,{
  //   path: "/transfer_history",
  //   name: "TransferHistory",
  //   meta: {no_cache: true},
  //   component: () => import("@/views/TransferHistory")
  // }
  {
    path: "/submit_certifications",
    name: "SubmitCertifications",
    meta: {no_cache: true},
    component: () => import("@/views/SubmitCertifications")
  }

  ,{
    path: "*",
    name: "Empty",
    redirect: { name: "HomeIndex" },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes,
});

export default router;
