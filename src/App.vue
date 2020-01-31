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
.shadow {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
}
.app {
  transition: 0.2s;
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
