<template>
  <div class="container">
    <img class="profile-photo" :src="getProfilePhoto" />
    <div class="name-container">
      <h3>Your Name</h3>
      <h2 class="name">{{getName}}</h2>
    </div>
    <p
      class="info-p"
    >This is not your username. This name will be visible to people in your contacts</p>
    <div class="name-container">
      <h3>Username</h3>
      <h2 class="name">{{"@" + user.username}}</h2>
    </div>
    <!-- <div class="button-container">
      <button class="button" id="settings">
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
          />
        </svg>
      </button>
      <button class="button" id="delete" @click="logout">
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
          />
        </svg>
      </button>
    </div>-->
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1);
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
