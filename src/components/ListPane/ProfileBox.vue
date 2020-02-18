<template>
  <div class="profile-box">
    <img :src="getProfilePhoto" @click="openProfile" class="profile-photo" />
    <div class="container">
      <p class="name">{{ currentUser.fname + " " + currentUser.lname}}</p>
      <p class="username">{{ "@" + currentUser.username}}</p>
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
  height: 3.5rem;
  display: flex;
  align-items: center;
  background: #ddd;
}
.profile-photo {
  height: 2.5rem;
  width: 2.5rem;
  margin: 1rem;
  /* margin-right: 1rem; */
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
}
.username {
  margin: 0;
  font-size: 0.8rem;
  font-weight: bold;
  color: #268bd2;
}
</style>