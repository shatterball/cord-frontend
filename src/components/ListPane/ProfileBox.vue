<template>
  <div class="profile-box">
    <img class="image" :src="getProfilePhoto" alt="Profile" @click="openProfile" />
    <svg class="button" viewBox="0 0 24 24" @click="logout">
      <path
        fill="currentColor"
        d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
      />
    </svg>
  </div>
</template>
<script>
export default {
  name: "profileBox",
  props: {
    currentUser: {}
  },
  data: function() {
    return {
      showMenu: false
    };
  },
  computed: {
    getProfilePhoto() {
      var photo;
      if (this.currentUser.image == undefined) {
        photo = require("@/assets/profile.svg");
      }
      return photo;
    }
  },
  methods: {
    openProfile: function() {
      this.$emit("open-profile");
    },
    logout: function() {
      this.$emit("logout");
    },
    toggleMenu: function() {
      this.showMenu = !this.showMenu;
    },
    closeMenu: function() {
      this.showMenu = false;
    }
  }
};
</script>
<style scoped>
.show {
  opacity: 1;
  visibility: visible;
}
.hide {
  opacity: 0;
  visibility: hidden;
}
.profile-box {
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #e0e0e0;
  user-select: none;
  padding: 0 1rem;
}
.image {
  width: 3rem;
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.button {
  width: 1.5rem;
  color: #666;
  border: none;
  margin-right: 0.5rem;
  cursor: pointer;
}
</style>