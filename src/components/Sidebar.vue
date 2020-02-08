<template>
  <div class="sidebar">
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <div class="header">
          <img src="@/assets/hamburger.svg" class="back-button" @click="closeSidebarPanel" />
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "idebar",
  props: {
    isPanelOpen: Boolean
  },
  methods: {
    closeSidebarPanel() {
      this.isPanelOpen = false;
    }
  }
};
</script>
<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 100ms ease-in 0s;
}

.sidebar-panel {
  overflow: auto;
  background-color: #ddd;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  width: 27rem;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  padding: 0 1rem;
  height: 3.5rem;
  /* justify-content: center; */
  align-items: center;
}
.back-button {
  height: 2rem;
  cursor: pointer;
}
.content {
  flex: 1;
  margin: 0 1rem;
}
@media screen and (max-width: 700px) {
  .sidebar-panel {
    width: 100%;
  }
}
</style>