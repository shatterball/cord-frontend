<template>
  <div class="container">
    <img class="profile-photo" :src="getProfilePhoto" />
    <h2 class="name">{{getName}}</h2>
    <h4 class="username">{{"@" + user.username}}</h4>
    <p class="email">{{user.email}}</p>
    <div class="button-container">
      <button class="button" id="settings">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
      <button class="button" id="delete" @click="logout">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
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
  width: 10rem;
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
  width: 2rem;
  cursor: pointer;
  outline: 0;
  transition: 0.2s;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.button:hover {
  color: #444;
}
.button-container {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 2.5rem;
}
</style>
