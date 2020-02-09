<template>
  <div class="profile-box">
    <img :src="getProfilePhoto" @click="openProfile" class="profile-photo" />
    <div class="container">
      <p class="name">{{ currentUser.fname + " " + currentUser.lname}}</p>
      <p class="username">{{ "@" + currentUser.username}}</p>
    </div>
    <div class="menu" @click="toggleMenu">
      <img src="@/assets/hamburger.svg" alt="Photo" class="button" />
      <div :class="showMenu ? 'show' : 'hide'" class="dropdown shadow">
        <p class="option" @click="logout">Logout</p>
      </div>
    </div>
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
  height: 3.5rem;
  display: flex;
  align-items: center;
  background: #ddd;
}
.profile-photo {
  height: 3rem;
  margin: 0.5rem;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.container {
  flex: 1;
}
.name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
}
.username {
  margin: 0;
  font-size: 0.8rem;
  font-weight: bold;
  color: #268bd2;
}
.button {
  margin: 0.5rem;
  margin-right: 1rem;
  height: 1.5rem;
  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.menu {
  position: relative;
  margin-top: 0.3rem;
}
.dropdown {
  position: absolute;
  background: #eee;
  margin-left: -3rem;
  z-index: 1;
  /* width: 5rem; */
  border-radius: 0.3rem;
  transition: 0.2s;
  align-items: center;
}
.option {
  margin: 0.5rem 0;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  width: 3.5rem;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.option:hover {
  background: #ddd;
}
</style>