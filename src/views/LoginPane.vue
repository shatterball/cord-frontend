<template>
  <div class="login_pane">
    <div class="top">
      <div class="container">
        <h1>Login</h1>
      </div>
      <div class="inputs">
        <input v-model="username" class="input shadow" placeholder="username" type="text" />
        <input v-model="passwd" class="input shadow" placeholder="password" type="password" />
      </div>
      <div class="container">
        <button id="login" @click="login" class="button shadow">Login</button>
        <button id="register" @click="login" class="button shadow">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import jwtDecode from "jwt-decode";
export default {
  name: "loginPane",
  data: function() {
    return {
      username: "",
      passwd: "",
      tmp: undefined
    };
  },
  methods: {
    login() {
      Axios.post("http://1.1.0.10:3000/api/login/", {
        username: this.username,
        passwd: this.passwd
      }).then(res => {
        if (res.status == 401) {
          // TODO
        }
        var decoded = jwtDecode(res.data.token);
        this.$store.commit("setCurrentUser", decoded.user);
        this.$store.commit("setToken", res.data.token);
        localStorage.setItem("jwt", res.data.token);
        this.$router.push({ name: "main" });
      });
      this.passwd = "";
    }
  }
};
</script>

<style scoped>
.login_pane {
  height: 100vh;
  width: 100vw;
  background: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.inputs {
  flex: 0 1 auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  flex: 0 1 auto;
  display: flex;
  justify-content: space-evenly;
}
.container h1 {
  color: #666;
  font-family: Roboto;
  font-weight: 500;
}
.inputs input {
  border-radius: 2rem;
  width: 85%;
  padding: 0 1rem;
  margin: 1rem;
  border: none;
  outline: none;
  height: 2.5rem;
  transition: 0.2s;
}
.inputs input:focus {
  width: 90%;
}
.button {
  cursor: pointer;
  user-select: none;
  margin-top: 0.5rem;
  color: #eee;
  font-size: 1rem;
  border: none;
  outline: none;
  height: 2rem;
  width: 45%;
  border-radius: 2rem;
  transition: 0.2s;
}
.button:active {
  transform: scale(0.9);
}
#login {
  background: #268bd2;
}
#register {
  background: #d33682;
}
.top {
  width: 30%;
  height: 80%;
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 700px) {
  .login_pane {
    width: 100vw;
  }
  .container {
    flex: 0 1 auto;
  }
  .inputs input {
    height: 3rem;
  }
  .button {
    height: 2.5rem;
  }
  .top {
    width: 100%;
  }
}
</style>
