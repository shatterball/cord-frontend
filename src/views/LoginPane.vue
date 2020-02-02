<template>
  <div class="login_pane">
    <div class="top">
      <h1 class="banner">Login</h1>
      <div class="inputs">
        <input v-model="username" class="input" placeholder="username" type="text" required />
        <input v-model="passwd" class="input" placeholder="password" type="password" required />
      </div>
      <div v-if="showError" class="error shadow">{{ errorMessage }}</div>
      <div class="button_container">
        <button id="login" @click="login" class="button shadow">Login</button>
        <button id="register" @click="register" class="button shadow">Register</button>
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
      Axios.post("https://apicord.herokuapp.com/api/login/", {
        username: this.username,
        passwd: this.passwd
      })
        .catch(error => {
          this.showError = true;
          this.errorMessage = error.response.data.error;
          this.processRequest = false;
        })
        .then(res => {
          if (this.processRequest) {
            var decoded = jwtDecode(res.data.token);
            // eslint-disable-next-line no-console
            console.log(decoded);
            this.$store.commit("setCurrentUser", decoded.user);
            this.$store.commit("setToken", res.data.token);
            localStorage.setItem("jwt", res.data.token);
            this.$router.push({ name: "main" });
          }
          this.passwd = "";
        });
    },
    register() {
      this.$router.push({ name: "register" });
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
  margin: 1rem 0rem;
  font-size: 0.8rem;
  border-radius: 2rem;
  min-height: 2rem;
  color: #eee;
}
.login_pane {
  overflow: auto;
  height: 100vh;
  width: 100vw;
  background: #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.inputs {
  flex: 0 1 auto;
  min-height: 9rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button_container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.banner {
  color: #666;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
}
.inputs input {
  border-radius: 2rem;
  border: 0.1rem solid #fff;
  width: 100%;
  padding: 0 1rem;
  margin: 1rem;
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
  margin-top: 0.5rem;
  color: #eee;
  font-size: 1rem;
  border: none;
  outline: none;
  height: 2rem;
  width: 45%;
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
  height: 60%;
  display: flex;
  flex-direction: column;
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
    height: 3rem;
  }
  .button {
    height: 2.5rem;
  }
  .top {
    width: 80%;
  }
}
</style>
