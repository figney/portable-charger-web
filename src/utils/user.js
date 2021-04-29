export default {
    getToken() {
        return localStorage.getItem("TOKEN") || 'null'
    },
    setToken(token) {
        localStorage.setItem("TOKEN", token)
    },
    removeToken() {
        localStorage.removeItem("TOKEN")
    },
    isLogin() {

        let token = this.getToken();
        return token !== null && token.length > 20;
    }
}
