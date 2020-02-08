<template>
  <div class="container">
    <img class="profile-photo" src="@/assets/profile.svg" alt />
    <h2>{{getName}}</h2>
    <h4>{{"@" + user.username}}</h4>
    <p>Email: {{"@" + user.email}}</p>
    <p>Gender: {{ }}</p>
    <h4>Change Password</h4>
    <input class="password-box" type="password" />
    <input class="password-box" type="password" />
    <input class="password-box" type="password" />
    <button>Delete Profile</button>
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
.password-input {
  display: flex;
  flex-direction: column;
}
.password-box {
  width: 15rem;
  border-radius: 2rem;
  border: none;
  height: 2rem;
  margin: 0.5rem;
}
</style>