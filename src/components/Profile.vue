<template>
  <div class="container">
    <img class="profile-photo" :src="getProfilePhoto" />
    <div class="name-container">
      <h3>Your Name</h3>
      <h2 class="name">{{getName}}</h2>
    </div>
    <p
      class="info-p"
    >This is not your username. This name will be visible to people in your contacts.</p>
    <div class="name-container">
      <h3>Username</h3>
      <h2 class="name">{{"@" + user.username}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  props: {
    user: {}
  },
  computed: {
    getName() {
      return this.user.fname + " " + this.user.lname;
    },
    getProfilePhoto() {
      var photo;
      if (this.user.image == undefined) {
        photo = require("@/assets/profile.svg");
      }
      return photo;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background: #fff;
}
.profile-photo {
  width: 13rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-radius: 50%;
}
.name {
  color: #3a3a3a;
  font-weight: 500;
  font-size: 1.2rem;
  margin-left: 2rem;
  margin-top: 0.75rem;
}
.username {
  margin: 0;
  margin-bottom: 2rem;
  font-weight: bold;
  color: #268bd2;
}
.email {
  margin-bottom: 2rem;
  font-size: 0.9rem;
}
.name-container {
  width: 100%;
  height: 5rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1);
  user-select: none;
}
.name-container h3 {
  margin-left: 2rem;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.75rem;
  color: #268bd2;
}
.info-p {
  margin: 0.5rem 2rem;
  margin-bottom: 1rem;
  color: #666;
}
</style>
