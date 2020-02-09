<template>
  <div class="profile-box">
    <img :src="getProfilePhoto" alt="Profile Picture" class="profile-photo" />
    <div class="container">
      <p class="name">{{ currentUser.fname + " " + currentUser.lname}}</p>
      <p class="username">{{ "@" + currentUser.username}}</p>
    </div>
    <img @click="openProfile" src="@/assets/hamburger.svg" alt="Photo" class="button" />
  </div>
</template>
<script>
export default {
  name: "profileBox",
  props: {
    currentUser: {}
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
    }
  }
};
</script>
<style scoped>
.profile-box {
  height: 3.5rem;
  display: flex;
  align-items: center;
  background: #ddd;
}
.profile-photo {
  height: 3rem;
  margin: 0.5rem;
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
}
</style>