// import Vue from "vue";
// import VueI18n from "vue-i18n";
// import http from "@/plugins/axios";

// Vue.use(VueI18n);

// //国际化
// const i18n = new VueI18n({
//   locale: "en",
//   messages: {
//     en: {},
//   },
//   silentTranslationWarn: process.env.NODE_ENV === 'production'
// });

// Vue.prototype.$t = (path, values, describe) => {
//   path = path.toUpperCase()

//   // http.post('v1/importLang',{
//   //   name: describe || values,
//   //   slug: path,
//   //   group: 'Default'
//   // }).catch(err=>{
//   //   console.log('import lang error:',err)
//   // })

//   if (describe) {
//     return i18n.t(path, values);
//   } else {
//     return i18n.t(path);
//   }
// };

// export default i18n;


// import Vue from "vue";
// import VueI18n from "vue-i18n";
// import http from "@/plugins/axios";

// Vue.use(VueI18n);

// //国际化
// const i18n = new VueI18n({
//   locale: "en",
//   messages: {
//     en: {},
//   },
//   silentTranslationWarn: process.env.NODE_ENV === 'production'
// });

// const transT = (path, values, describe) => {
//   path = path.toUpperCase()

//   // http.post('v1/importLang',{
//   //   name: describe || values,
//   //   slug: path,
//   //   group: 'Default'
//   // }).catch(err=>{
//   //   console.log('import lang error:',err)
//   // })

//   return describe ? describe : ( values ? values : path )

//   if (describe) {
//     return i18n.t(path, values);
//   } else {
//     return i18n.t(path);
//   }
// };

// Vue.prototype.$t = transT

// Vue.filter('i18n',(str)=>{
//   return str.startsWith('LANG_') ? transT(str) : str
// })

// export default i18n;


import Vue from "vue";
import VueI18n from "vue-i18n";
import http from "@/plugins/axios";

Vue.use(VueI18n);

//国际化
const i18n = new VueI18n({
  locale: "en",
  messages: {
    en: {},
  },
  silentTranslationWarn: process.env.NODE_ENV === 'production'
});

Vue.prototype.$t = (path, values, describe) => {
  path = path.toUpperCase()

  // http.post('v1/importLang',{
  //   name: describe || values,
  //   slug: path,
  //   group: 'Default'
  // }).catch(err=>{
  //   console.log('import lang error:',err)
  // })

  if (describe) {
    return i18n.t(path, values);
  } else {
    return i18n.t(path);
  }
};

export default i18n;
