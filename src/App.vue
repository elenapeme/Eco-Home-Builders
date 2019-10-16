<template>
  <div id="app">
    <Header />
    <Dashboard/>
    <Ending />
  </div>
</template>

<script>
import Dashboard from './views/Dashboard/Dashboard.vue'
import Header from './components/Header'
import Ending from './components/Ending'

export default {
  name: 'app',
  components: {
    Dashboard,
    Header,
    Ending
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway|Roboto&display=swap');
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
