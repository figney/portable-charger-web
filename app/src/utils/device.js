import random from 'string-random'
import * as UAParser from "ua-parser-js"
import config from '@/config'
import * as mobile from "@/plugins/mobileApp"

let ua = UAParser(navigator.userAgent)

function formatLang(lang) {
    lang = lang.replace("-", "_");
    let v = lang.toLowerCase();
    if (v.indexOf('cn') >= 0 || v.indexOf('CN') >= 0 || v.indexOf('zh') >= 0) {
        v = 'CN'
    } else if (v.indexOf('en') >= 0) {
        v = 'EN'
    } else if (v.indexOf('id') >= 0) {
        v = 'ID'
    } else if (v.indexOf('th') >= 0) {
        v = 'TH'
    } else if (v.indexOf('vi') >= 0) {
        v = 'VI'
    } else if(v.indexOf('my') >= 0) {
        v = 'MY'
    } else if(v.indexOf('in') >= 0) {
        v = 'IN'
    } else {
        v = 'EN'
    }
    return v
}

export default {
    appVersion() {
        return config.version
    },
    phoneIMEI() {
        return localStorage.getItem("phoneIMEI") || this.setPhoneIMEI()
    },
    setPhoneIMEI() {
        let imei = mobile.getAndroidID() || random(16)
        localStorage.setItem("phoneIMEI", imei)
        return imei;
    },
    timeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    phoneLang() {
        let type = navigator.appName;
        let lang = mobile.getSystemLanguage() || ""
        if (!lang) {
            if (type === "Netscape") {
                lang = navigator.language === 'en' ? 'en_US' : navigator.language;
            } else {
                lang = navigator.userLanguage;
            }
            localStorage.setItem('language', formatLang(lang))
        }

        return formatLang(lang);
    },

    phoneScene() {
        return {
            height: mobile.getScreenHeight(),
            width: mobile.getScreenWidth(),
        }
    },
    getOsInfo() {

        let name = ua.os.name;
        let version = ua.os.version;

        return {name, version};
    }
}
