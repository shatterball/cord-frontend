<template>
  <div class="profile-box">
    <p @click="openProfile" class="name">{{ currentUser.fname + " " + currentUser.lname}}</p>
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
  justify-content: center;
  background: #e0e0e0;
}
.name {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
}
</style>