import Vue from 'vue'
import App from './App'
<%_ if (modules.includes('router')) { -%>
import router from './router'
<%_ } -%>
<%_ if (modules.includes('vuex')) { -%>
import store from './store'
<%_ } -%>

Vue.config.productionTip = false

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
/* eslint-disable no-new */
new Vue({
  components: { App },
<%_ if (modules.includes('router')) { -%>
  router,
<%_ } -%>
<%_ if (modules.includes('vuex')) { -%>
  store,
<%_ } -%>
  template: '<App/>'
}).$mount('#app')
