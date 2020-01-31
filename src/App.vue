<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
* {
  font-family: sans-serif;
}
body {
  margin: 0;
  padding: 0;
}
.app {
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
