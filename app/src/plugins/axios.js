import axios from "axios";
import device from "@/utils/device";
import * as UAParser from "ua-parser-js";
import * as mobileApp from "@/plugins/mobileApp"
import route from '../router/index'

// axios 配置

axios.defaults.timeout = 20 * 1000;

axios.defaults.baseHOST = "";

axios.defaults.baseURL = process.env.BASE_URL + "api/";
 //axios.defaults.baseURL = "http://backend:83/api/";
//axios.defaults.baseURL = "/api/";

const ua = UAParser(navigator.userAgent)

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
      config.headers.Lang = device.phoneLang()
      config.headers.IMEI = device.phoneIMEI()
      config.headers.Version = device.appVersion()
      config.headers.BrowserName = ua.browser.name
      config.headers.BrowserVersion = ua.browser.version
      config.headers.Brand = ua.device.vendor
      config.headers.Model = ua.device.model
      config.headers.Width = mobileApp.getScreenWidth()
      config.headers.Height = mobileApp.getScreenHeight()
      config.headers.IsApp = false
      config.headers.Os = ua.os.name  // ios windows linux
      config.headers.Timezone = device.timeZone()

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
      return response.data;
  },
  (error) => {
      // if (error.config.url !== 'v1/deviceLog') {
      //     try {
      //         axios.post("v1/deviceLog", {
      //             type: (error.data && error.data.message) ? error.data.message : error,
      //             event_name: '接口请求失败',
      //             untitled_page: route.currentRoute.name,
      //             untitled_url: location.href,
      //         });
      //     } catch (error) {}
      // }
      if (error.response.status===401) {
          localStorage.removeItem('TOKEN');
          route.replace({name: 'HomeUser'}).catch(e => {})
      } else {
          return Promise.reject(error.response);
      }
  }
);

export default axios;
