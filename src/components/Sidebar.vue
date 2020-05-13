<template>
  <div class="sidebar">
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <div class="header">
          <button class="button" @click="closeSidebarPanel">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z" />
            </svg>
          </button>
          <h1>{{ sidebarHeader }}</h1>
          <div class="button" style="cursor: default" />
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
    isPanelOpen: Boolean,
    sidebarHeader: String
  },
  methods: {
    closeSidebarPanel() {
      this.$emit("close-sidebar");
    }
  }
};
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 0.2s ease-in 0s;
}

.sidebar-panel {
  overflow: auto;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 30%;
  z-index: 999;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #cfcfcf;
}
.header {
  display: flex;
  height: 4rem;
  background: #e0e0e0;
  align-items: center;
  justify-content: space-between;
}
.header h1 {
  font-size: 1.2rem;
  font-weight: 500;
  user-select: none;
}
.button {
  color: #555;
  background: #e0e0e0;
  width: 1.5rem;
  height: 1.5rem;
  outline: 0;
  padding: 0;
  border: 0;
  margin: 0 1rem;
  transition: 0.2s;
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
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15), 0 3px 3px rgba(0, 0, 0, 0.25);
    border-right: 0;
  }
}
</style>
