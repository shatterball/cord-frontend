<template>
  <div class="sidebar">
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel shadow">
        <div class="header">
          <img src="@/assets/back.svg" class="back-button" @click="closeSidebarPanel" />
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
  name: "Sidebar",
  props: {
    isPanelOpen: Boolean
  },
  methods: {
    closeSidebarPanel() {
      this.$emit("close-sidebar");
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
  transition: all 0.15s ease-in 0s;
}

.sidebar-panel {
  overflow: auto;
  background-color: #ddd;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  width: 30%;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  padding: 0 1rem;
  min-height: 3.5rem;
  align-items: center;
}
.back-button {
  height: 1.5rem;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.content {
  flex: 1;
  margin: 1rem;
}
@media screen and (max-width: 700px) {
  .sidebar-panel {
    width: 100%;
  }
}
</style>
