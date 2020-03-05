import Vue from 'vue'
import App from './App.vue'
<%_ if (modules.includes('router')) { -%>
import router from './router'
<%_ } -%>
<%_ if (modules.includes('vuex')) { -%>
import store from './store'
<%_ } -%>

Vue.config.productionTip = false

new Vue({
<%_ if (modules.includes('router')) { -%>
  router,
<%_ } -%>
<%_ if (modules.includes('vuex')) { -%>
  store,
<%_ } -%>
  render: function (h) { return h(App) },
}).$mount('#app')
