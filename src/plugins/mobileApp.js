// 展示手机的loading动画
export function showMobileLoading() {
    if ('dog' in window) {
        try {
            window.dog.showLoading()
        } catch (error) {
            console.log('dog.showLoading error:', error)
        }
    }
}

// 关闭手机的loading动画
export function dismissMobileLoading() {
    if ('dog' in window) {
        try {
            window.dog.dismissLoading()
        } catch (error) {
            console.log('dog.dismissLoading error:', error)
        }
    }
}

// 获取token
export function getAndroidToken() {
    if ('dog' in window) {
        try {
            return window.dog.getToken()
        } catch (error) {
            console.log('dog.getToken error:', error)
        }
    }
    return ""
}

// 获取 AndroidID
export function getAndroidID() {
    if ('dog' in window) {
        try {
            return window.dog.getUniqueDeviceId()
        } catch (error) {
            console.log('dog.getUniqueDeviceId error:', error)
        }
    }
    return ""
}

// 获取 systemLanguage
export function getSystemLanguage() {

    if (localStorage.getItem('language')) {
        return localStorage.getItem('language');
    }

    if ('dog' in window) {
        try {
            return window.dog.getSystemLanguage()
        } catch (error) {
            console.log('dog.getSystemLanguage error:', error)
        }
    }
}

// getScreenWidth
export function getScreenWidth() {
    if ('dog' in window) {
        try {
            return window.dog.getScreenWidth()
        } catch (error) {
            console.log('dog.getScreenWidth error:', error)
        }
    }
    return window.innerWidth
}

// getScreenHeight
export function getScreenHeight() {
    if ('dog' in window) {
        try {
            return window.dog.getScreenHeight()
        } catch (error) {
            console.log('dog.getScreenHeight error:', error)
        }
    }
    return window.innerHeight
}


// getAppVersionName
export function getAppVersionName() {
    if ('dog' in window) {
        try {
            return window.dog.getAppVersionName()
        } catch (error) {
            console.log('dog.getAppVersionName error:', error)
        }
    }
    return ''
}

// getAppVersionCode
export function getAppVersionCode() {
    if ('dog' in window) {
        try {
            return window.dog.getAppVersionCode()
        } catch (error) {
            console.log('dog.getAppVersionCode error:', error)
        }
    }
    return ''
}

// getNetworkType
export function getNetworkType() {
    if ('dog' in window) {
        try {
            return window.dog.getNetworkType()
        } catch (error) {
            console.log('dog.getNetworkType error:', error)
        }
    }
    return ''
}
