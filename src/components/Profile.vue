<template>
  <div class="container">
    <img class="profile-photo" :src="getProfilePhoto" />
    <h2>{{getName}}</h2>
    <h4>{{"@" + user.username}}</h4>
    <p>Email: {{user.email}}</p>
    <button class="button" id="delete">Delete Profile</button>
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

<style lang="sass" scoped>

</style>