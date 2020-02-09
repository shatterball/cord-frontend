<template>
  <div class="container">
    <img class="profile-photo" :src="getProfilePhoto" />
    <h2>{{getName}}</h2>
    <h4>{{"@" + user.username}}</h4>
    <p>Email: {{user.email}}</p>
    <div class="change-password">
      <h4 class="banner">Change Password</h4>
      <input class="password-box" type="password" placeholder="Old password" />
      <input class="password-box" type="password" placeholder="New password" />
      <input class="password-box" type="password" placeholder="Re-enter new password" />
      <button class="button" id="change-password">Change password</button>
    </div>
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container h2 {
  font-weight: 500;
  color: #333;
  margin: 0;
  margin-top: 1rem;
}
.container h4 {
  font-weight: 500;
  color: #555;
  margin: 0;
}
.profile-photo {
  height: 10rem;
}
.change-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  margin-top: 0;
}
.password-box {
  width: 15rem;
  border-radius: 2rem;
  border: none;
  height: 2rem;
  margin: 0.5rem;
  padding: 0 1rem;
}
.button {
  height: 2rem;
  width: 10rem;
  border-radius: 2rem;
  outline: none;
  border: none;
  color: #eee;
  margin-top: 0.5rem;
}
#delete {
  margin-top: 1rem;
  background: #dc322f;
}
#change-password {
  background: #268bd2;
}
.banner {
  margin-bottom: 1rem;
}
@media screen and (max-width: 700px) {
  .password-box {
    height: 2.5rem;
  }
}
</style>