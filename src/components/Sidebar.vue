<template>
  <div class="sidebar">
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel shadow">
        <div class="header">
          <button class="button" @click="closeSidebarPanel">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
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
  padding: 0 0.5rem;
  min-height: 3.5rem;
  align-items: center;
}
.button {
  color: #666;
  width: 2rem;
  outline: 0;
  padding: 0;
  border: 0;
  transition: 0.2s;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.button:hover {
  color: #444;
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
