<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
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
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
@media screen and (min-width: 700px) {
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #fff;
  }
  ::-webkit-scrollbar-thumb {
    background: #aaa;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
}
</style>
