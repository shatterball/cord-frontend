<template>
  <div class="container">
    <img class="profile-photo" :src="getProfilePhoto" />
    <h2 class="name">{{getName}}</h2>
    <h4 class="username">{{"@" + user.username}}</h4>
    <p class="email">
      {{user.email}}
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
        />
      </svg>
    </p>
    <div class="button-container">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  props: {
    user: {}
  },
  methods: {
    logout() {
      this.$emit("logout");
    }
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
}
.profile-photo {
  width: 15rem;
  margin-top: 2rem;
}
.name {
  font-weight: 400;
  margin: 2rem;
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
.button {
  border: 0;
  color: #666;
  background: #eee;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  outline: 0;
  transition: 0.2s;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.button-container {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.5rem;
}
</style>
