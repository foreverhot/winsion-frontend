<template>
  <div id="app">
  <%_ if (modules.includes('router')) { -%>
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  <%_ } else { -%>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  <%_ } -%>
  </div>
</template>

<script>
<%_ if (modules.includes('router')) { -%>
export default {
  name: 'App'
}
<%_ } else { -%>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App'
}
<%_ } -%>
</script>

<%_ if (modules.includes('sass')) { -%>
<style lang="scss">
<%_ } else { -%>
<style>
<%_ } -%>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

<%_ if (modules.includes('router')) { -%>
  <%_ if (modules.includes('sass')) { -%>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
  <%_ } else { -%>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
  <%_ } -%>
<%_ } -%>
</style>
