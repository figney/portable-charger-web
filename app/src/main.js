import Vue from "vue";
import VueBus from "vue-bus";
import VueNumber from "vue-number-animation";
import NProgress from "vue-nprogress";
import i18n from "./plugins/i18n";
import Snotify, { SnotifyPosition } from "vue-snotify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/flexible";
import "reset.css";
import "./styles/main.scss";
import http from "./plugins/axios";
import * as filters from "./plugins/filters";
import setClip from "./plugins/clip";
import {Toast} from "vant";
import VueAnime from "vue-animejs"
import scroll from 'vue-seamless-scroll'

Vue.prototype.$http = http;
Vue.prototype.$setClip = setClip;
Vue.config.productionTip = false;

Vue.use(VueBus);
Vue.use(VueNumber);
Vue.use(VueAnime);
Vue.use(scroll)

//通知
Vue.use(Snotify, {
  global: {
    maxOnScreen: 1,
  },
  toast: {
    position: SnotifyPosition.centerTop,
    showProgressBar: false,
    timeout: 4000,
  },
});

//加载条
Vue.use(NProgress, {
  latencyThreshold: 200,
  router: true,
  http: true,
  autoFinish: false,
});

Vue.prototype.$fixed = (number, digits = 8) => {
  return parseFloat(parseFloat(number).toFixed(digits));
};

Vue.prototype.$formatTime = (str = store.state.system.time_format, time) => {
  let t = time ? new Date(time) : new Date()
  let yyyy = t.getFullYear(),
      mm = (t.getMonth() + 1) > 9 ? (t.getMonth() + 1) : '0' + (t.getMonth() + 1),
      dd = t.getDate() > 9 ? t.getDate() : '0' + t.getDate(),
      HH = t.getHours() > 9 ? t.getHours() : '0' + t.getHours(),
      MM = t.getMinutes() > 9 ? t.getMinutes() : '0' + t.getMinutes(),
      SS = t.getSeconds() > 9 ? t.getSeconds() : '0' + t.getSeconds();

  if (isNaN(yyyy)) {
    return time
  }

  return str
      .replace('yyyy', yyyy)
      .replace('mm', mm)
      .replace('dd', dd)
      .replace('HH', HH)
      .replace('MM', MM)
      .replace('SS', SS)
}

// 复制文字
Vue.prototype.$copyText = (text) => {
  setClip(text).then(copied=>{
    if (copied) {
      Toast(i18n.t('COPY_SUCCESS','复制成功'))
    } else {
      Toast(i18n.t('COPY_FAILED','复制失败'))
    }
  }).catch(err=>{
    Toast(i18n.t('COPY_FAILED','复制失败'))
  })
}

// 关闭弹窗
Vue.prototype.$closeModel = (el) => {
  try {
    el.style.transition = 'all 0.3s'
    el.style.opacity = 0
    el.style.marginTop = '1em'
    let overlays = document.querySelectorAll('.van-overlay')
    for (let overlay of overlays) {
      overlay.style.transition = 'all 0.3s'
      overlay.style.opacity = 0.02
    }
  } catch (err) {
    console.log('close model err')
  }
}

// 用户行为记录
Vue.prototype.$webEvent = (rt, ev = "event") => {
  try {
    http.post("v1/deviceLog", {
      type: "event",
      event_name: rt,
      untitled_page: localStorage.getItem("TOROUTENAME"),
      untitled_url: location.href,
    });
    // _czc.push(["_trackEvent", ev, rt]);
  } catch (error) {}
};

// socket io
Vue.prototype.$socket = require("socket.io-client")(
    process.env.NODE_ENV == 'production' ? '' : 'ws://192.168.6.2:83',
    {
      transports: ["websocket"]
    },
    {
      reconnection: true
    }
);

// 跳转外部窗口
Vue.prototype.$openLink = (link) => {
  if ('MoneyBao' in window) {
    //  app 内的跳转
    window.open(link, '_blank')
  } else {
    window.open(link, '_blank')
  }
}

// 内部跳转
Vue.prototype.$toRouter = (rt) => {
  router.push(rt)
  // if (router.currentRoute.name != rt.name) {
  //   router.push(rt)
  // }
}

// 新人进入时
router.beforeEach((to, from, next)=>{
  // if (to.fullPath == from.fullPath) {
  //   return
  // }
  if (!localStorage.getItem('TOKEN') && to.name != 'Language' && to.name != 'Beginner') {
    next({
      name: 'Beginner'
    })
  } else if (localStorage.getItem('TOKEN') && to.name == 'Beginner') {
    next({
      name: 'HomeIndex'
    })
  } else {
    next()
  }
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // 记录页面访问轨迹
  try {
    localStorage.setItem("TOROUTENAME", to.name);
    setTimeout(()=>{
      http.post("v1/deviceLog", {
        type: "page",
        event_name: "Open page",
        untitled_page: to.name,
        untitled_url: location.href,
      });
    },1000)
  } catch (e) {
    console.log(e);
  }

  // 如果超过一个小时未刷新用户信息，则重新请求用户信息和未读通知
  let lastReload = localStorage.getItem('LastReload')
  let t = parseInt(lastReload)
  if (!isNaN(t)) {
    if (Date.now() - t >= 60 * 60 * 1000) {
      localStorage.setItem('LastReload', Date.now())
      Vue.bus.emit('refreshUserAndNotify')
    }
  }
});

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

const app = new Vue({
  router,
  store,
  i18n,
  nprogress: new NProgress(),
  render: (h) => h(App),
});

app.$mount("#app");
