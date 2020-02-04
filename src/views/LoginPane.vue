<template>
  <div class="login_pane">
    <div class="top">
      <h1 class="banner">Login</h1>
      <div class="inputs">
        <input
          v-model="username"
          class="input"
          placeholder="Username"
          type="text"
          @keyup.enter="login"
          autofocus
        />
        <input
          v-model="passwd"
          class="input"
          placeholder="Password"
          type="password"
          @keyup.enter="login"
        />
      </div>
      <div v-if="showError" class="error">{{ errorMessage }}</div>
      <div class="button_container">
        <button id="login" @click="login" class="button">Login</button>
      </div>
      <div>
        <p class="register">
          Don't have an account?
          <router-link to="register">Register</router-link>
        </p>
      </div>
      <div id="loader" class="loader"></div>
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
      tmp: undefined,
      errorMessage: undefined,
      showError: false,
      processRequest: true
    };
  },
  methods: {
    login() {
      if (this.username == "" || this.passwd == "") {
        this.showError = true;
        this.errorMessage = "Please enter valid username and password";
        return;
      }
      document.getElementById("loader").style = "visibility:visible";
      Axios.post("https://apicord.herokuapp.com/api/login/", {
        username: this.username.trim(),
        passwd: this.passwd
      })
        .catch(error => {
          this.showError = true;
          this.errorMessage = error.response.data.error;
          this.processRequest = false;
          this.showLoader = false;
          document.getElementById("loader").style = ":none";
        })
        .then(res => {
          if (this.processRequest) {
            document.getElementById("loader").style = "visibility:visible";
            var decoded = jwtDecode(res.data.token);
            this.$store.commit("setCurrentUser", decoded.user);
            this.$store.commit("setToken", res.data.token);
            localStorage.setItem("jwt", res.data.token);
            this.$router.push({ name: "root" });
          }
          this.passwd = "";
          this.processRequest = true;
        });
    },
    register() {
      this.$router.push({ name: "register" });
    }
  },
  beforeCreate() {
    if (localStorage.getItem("jwt") != undefined) {
      this.$router.push({ name: "root" });
    }
  }
};
</script>

<style scoped>
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dc322f;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  border-radius: 2rem;
  min-height: 2rem;
  color: #eee;
}
.login_pane {
  overflow: auto;
  height: 100%;
  width: 100%;
  background: #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button_container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.banner {
  color: #666;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
}
.inputs {
  flex: 0 1 auto;
  min-height: 5rem;
  padding: 1rem;
  padding-bottom: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.inputs input {
  border-radius: 2rem;
  border: 0.1rem solid #fff;
  width: 100%;
  padding: 0 1rem;
  margin: 0.5rem;
  outline: none;
  height: 2rem;
  transition: 0.2s;
}
.inputs input:focus {
  border: 0.1rem solid #268bd2;
}
.button {
  cursor: pointer;
  user-select: none;
  color: #eee;
  font-size: 1rem;
  border: none;
  outline: none;
  height: 2rem;
  width: 100%;
  border-radius: 2rem;
  transition: 0.2s;
  -webkit-tap-highlight-color: transparent;
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
  font-family: sans-serif;
  width: 30%;
  display: flex;
  flex-direction: column;
}
.register {
  text-align: center;
  margin: 0;
  margin-bottom: 1.5rem;
}
.loader {
  visibility: hidden;
  align-self: center;
  border: 0.3rem solid #f3f3f3; /* Light grey */
  border-top: 0.3rem solid #3498db; /* Blue */
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 700px) {
  .login_pane {
    width: 100vw;
    justify-content: flex-start;
  }
  .container {
    flex: 0 1 auto;
  }
  .inputs input {
    height: 2.5rem;
  }
  .button {
    height: 2.5rem;
  }
  .top {
    width: 80%;
  }
}
</style>
