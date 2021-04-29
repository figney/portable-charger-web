export default {
    updateQueryStringParameter(uri, key, value) {
        let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        let separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    },
    getUrlKey(url) {
        let params = {};
        try {
            let urls = url.split("?");
            let arr = urls[1].split("&");
            for (let i = 0, l = arr.length; i < l; i++) {
                let a = arr[i].split("=");
                params[a[0]] = a[1];
            }
            // eslint-disable-next-line no-empty
        } catch (e) {
        }
        return params;
    },
    replaceParamVal(paramName, replaceWith) {
        let oUrl = location.href.toString();
        let nUrl = this.updateQueryStringParameter(oUrl,paramName,replaceWith)+location.hash;
        console.log(nUrl)
        history.pushState({},'',nUrl);
        //this.location = nUrl;
        //window.location.href = nUrl
    }
}
