<template>
  <div id="app">
  <%_ if (modules.includes('router')) { -%>
    <router-view></router-view>
  <%_ } else { -%>
    <landing-page></landing-page>
  <%_ } -%>
  </div>
</template>

<script>
<%_ if (modules.includes('router')) { -%>
  export default {
    name: 'app'
  }
<%_ } else { -%>
  import LandingPage from '@/components/LandingPage'

  export default {
    name: 'electron-vue2-template',
    components: {
      LandingPage
    }
  }
<%_ } -%>
</script>
