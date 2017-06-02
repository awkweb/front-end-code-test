<template>
  <div id="app">
    Merp
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './scss/_variables.scss';
@import './scss/_functions.scss';

body {
  margin: 0;
}

#app {
  color: palette(black);
  font: {
    family: $sans-serif;
    size: 20px;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  text-rendering: optimizeLegibility;
}
</style>
